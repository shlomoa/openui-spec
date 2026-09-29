"""Migrate OpenUI documents to the typed attributes and to the leaf contracts.

The conversion is mechanical and uses only the catalog (`spec/openui.json`) and the
leaf scopes (`spec/scopes/`). It has two steps.

Keys (0.5 to 0.6), for every document:

- `[name]` becomes `uses.name`;
- `(name)` becomes `behaves.name` when the element's type declares `name` as a
  Behaves attribute, and `produces.name` otherwise;
- a Uses value `"true"` or `"false"` becomes a JSON boolean, and an unquoted
  number becomes a JSON number, unless the type declares the attribute as
  `string`, `url`, `enum(...)`, `reference` or `list(...)`.

Contracts (0.10 to 0.11), for every worked example (`*.example.json`) the grammar
accepts:

- a key in `RENAMES` becomes the declared key that means the same, with its value
  mapped; a Produces or Behaves value that is not an expression becomes `null`;
- below the root, each child that a leaf's Child model requires (multiplicity `1` or
  `1..n`) and that is missing is added as an empty element with the id
  `<parentId><ChildId>`.

Nothing is removed: a contract does not restrict an element to its declared
attributes or to the children of its Child model (spec part 4.6; glossary, Object).
The root of an example is the example's scope node, so no child is added to it.
Running the tool twice changes nothing.

Usage: ``python -m spec.bin.migrate [--check] PATH...`` (a folder is searched for
JSON documents whose root id is ``root``).
"""

from __future__ import annotations

import argparse
import copy
import json
import re
import sys
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from bin.openui_document import SPEC_DIR, Catalog, grammar_diagnostics

from spec.bin.to_json.converter import parse_child_model, parse_leaf_scope

OLD_KEY = re.compile(r"^(?P<open>[\[(])(?P<name>[a-z][A-Za-z0-9]*)(?P<close>[\])])$")
NUMBER = re.compile(r"^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?$")
LITERAL_TYPES = {"boolean", "integer", "number"}
MULTIPLICITY = {"1": (1, 1), "0..1": (0, 1), "0..n": (0, sys.maxsize), "1..n": (1, sys.maxsize)}

# 0.10 to 0.11: example keys that a leaf contract declares under another name, per
# leaf scope type: old key -> (declared key, map of old literal values to new ones).
RENAMES: dict[str, dict[str, tuple[str, dict[Any, Any]]]] = {
    "ActionControls": {
        "text": ("uses.label", {}),
        "produces.click": ("produces.activate", {}),
        "produces.loadMore": ("produces.activate", {}),
    },
    "Chart": {
        "uses.chartType": (
            "uses.kind",
            {'"bar"': '"comparison"', '"line"': '"trend"', '"pie"': '"composition"'},
        ),
        "uses.ariaLabel": ("uses.title", {}),
    },
    "DataGrid": {"uses.sortable": ("behaves.sort", {})},
    "LinkAndScrollControls": {"uses.target": ("uses.href", {})},
    "List": {"uses.filter": ("behaves.filter", {}), "uses.sort": ("behaves.sort", {})},
    "StatusIndicator": {"uses.state": ("uses.mode", {'"loading"': '"indeterminate"'})},
    "Stepper": {
        "produces.completed": ("produces.complete", {}),
        "produces.stepChange": ("produces.selectionChange", {}),
    },
    "StructuralContainers": {"uses.label": ("uses.ariaLabel", {})},
    "SurfaceContainers": {"uses.label": ("uses.title", {})},
    "Table": {"uses.sort": ("behaves.sort", {})},
}


@dataclass(frozen=True)
class Contracts:
    """The declared attributes (from the catalog) and the Child models of the leaves."""

    catalog: Catalog
    leaf_of: dict[str, str]
    child_models: dict[str, list[tuple[str, str, str]]]

    @classmethod
    def load(cls, catalog: Catalog, scopes_dir: Path = SPEC_DIR / "scopes") -> Contracts:
        """Read every leaf scope; its scope type and its instance type share one contract."""
        leaf_of: dict[str, str] = {}
        child_models: dict[str, list[tuple[str, str, str]]] = {}
        for path in sorted(scopes_dir.rglob("*.scope.md")):
            if path.name == "template.scope.md":
                continue
            node = parse_leaf_scope(path, scopes_dir=scopes_dir)
            scope_type = node["type"]
            for literal in (scope_type, node["children"][0]["type"]):
                leaf_of[literal] = scope_type
            child_models[scope_type] = parse_child_model(path)
        return cls(catalog, leaf_of, child_models)


def _convert_value(value: Any, value_type: str | None) -> Any:
    if not isinstance(value, str):
        return value
    if value_type is not None and value_type not in LITERAL_TYPES:
        return value
    if value in {"true", "false"}:
        return value == "true"
    if NUMBER.fullmatch(value):
        return float(value) if "." in value else int(value)
    return value


def migrate_element(element: dict[str, Any], catalog: Catalog) -> None:
    """Migrate the attribute keys and values of *element* and its children in place."""
    attrs = element.get("attrs")
    if isinstance(attrs, dict):
        declared = catalog.contracts.get(element.get("type", ""), {})
        migrated: dict[str, Any] = {}
        for key, value in attrs.items():
            match = OLD_KEY.fullmatch(key)
            if match is None or (match.group("open") == "[") != (match.group("close") == "]"):
                migrated[key] = value
                continue
            name = match.group("name")
            declaration = declared.get(name)
            category = declaration.category if declaration else None
            if match.group("open") == "[":
                value_type = declaration.value_type if category == "uses" else None
                migrated[f"uses.{name}"] = _convert_value(value, value_type)
            else:
                prefix = "behaves" if category == "behaves" else "produces"
                migrated[f"{prefix}.{name}"] = value
        element["attrs"] = migrated
    for child in element.get("children", []):
        migrate_element(child, catalog)


def fit_document(document: dict[str, Any], contracts: Contracts) -> list[str]:
    """Rename keys and add missing required children in place; list each change."""
    changes: list[str] = []
    for element, path in _walk(document, ""):
        _rename_attrs(element, path, contracts, changes)
    changes.extend(_add_required_children(document, contracts))
    return changes


def missing_required_children(document: dict[str, Any], contracts: Contracts) -> list[str]:
    """Return each required child (Child model minimum) that *document* lacks."""
    return _add_required_children(copy.deepcopy(document), contracts)


def _rename_attrs(
    element: dict[str, Any], path: str, contracts: Contracts, changes: list[str]
) -> None:
    renames = RENAMES.get(contracts.leaf_of.get(element["type"], ""), {})
    attrs = element.get("attrs")
    if not attrs or not renames.keys() & attrs.keys():
        return
    fitted: dict[str, Any] = {}
    for key, value in attrs.items():
        if key not in renames:
            fitted.setdefault(key, value)
            continue
        new_key, values = renames[key]
        new_value = values.get(value, value) if isinstance(value, (str, bool)) else value
        if not new_key.startswith("uses.") and not _is_expression(new_value):
            new_value = None
        changes.append(f"{_where(element, path)}: {key} -> {new_key}")
        fitted.setdefault(new_key, new_value)
    element["attrs"] = fitted


def _add_required_children(document: dict[str, Any], contracts: Contracts) -> list[str]:
    """Below the root, add each missing required child as an empty element."""
    ids = set(_ids(document))
    changes: list[str] = []
    for element, path in _walk(document, ""):
        scope_type = contracts.leaf_of.get(element["type"])
        if element is document or scope_type is None:
            continue
        model = contracts.child_models[scope_type]
        order = {child_type: index for index, (_, child_type, _) in enumerate(model)}
        counts = Counter(child["type"] for child in element.get("children", []))
        for child_id, child_type, multiplicity in model:
            if MULTIPLICITY[multiplicity][0] == 0 or counts[child_type] > 0:
                continue
            new_id = f"{element['id']}{child_id[:1].upper()}{child_id[1:]}"
            if new_id in ids:
                raise ValueError(f"{_where(element, path)}: cannot add {new_id}: the id is taken")
            ids.add(new_id)
            counts[child_type] += 1
            children = element.setdefault("children", [])
            position = next(
                (
                    index
                    for index, child in enumerate(children)
                    if order.get(child["type"], len(order)) > order[child_type]
                ),
                len(children),
            )
            children.insert(position, {"id": new_id, "type": child_type})
            changes.append(f"{_where(element, path)}: adds required child {new_id} ({child_type})")
    return changes


def _walk(element: dict[str, Any], path: str) -> list[tuple[dict[str, Any], str]]:
    return [
        (element, path),
        *(
            pair
            for index, child in enumerate(element.get("children", []))
            for pair in _walk(child, f"{path}/children/{index}")
        ),
    ]


def _where(element: dict[str, Any], path: str) -> str:
    return f"{path or '/'} ({element['id']}, {element['type']})"


def _is_expression(value: Any) -> bool:
    return value is None or (isinstance(value, str) and not value.startswith('"'))


def _ids(element: dict[str, Any]) -> list[str]:
    return [element["id"], *(i for child in element.get("children", []) for i in _ids(child))]


def migrate_text(text: str, catalog: Catalog, contracts: Contracts | None = None) -> str:
    """Return the migrated JSON text of one document; with *contracts*, also fit it."""
    document = json.loads(text)
    migrate_element(document, catalog)
    if contracts is not None and not grammar_diagnostics(document):
        fit_document(document, contracts)
    return json.dumps(document, ensure_ascii=False, indent=2) + "\n"


def _documents(paths: list[Path]) -> list[Path]:
    """Expand directories to the OpenUI documents (JSON objects with id "root") they hold."""
    documents: list[Path] = []
    for path in paths:
        if not path.is_dir():
            documents.append(path)
            continue
        for candidate in sorted(path.rglob("*.json")):
            if "node_modules" in candidate.parts:
                continue
            try:
                value = json.loads(candidate.read_text(encoding="utf-8"))
            except (UnicodeDecodeError, json.JSONDecodeError):
                continue
            if isinstance(value, dict) and value.get("id") == "root":
                documents.append(candidate)
    return documents


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument(
        "files", nargs="+", type=Path, help="OpenUI JSON documents, or folders that hold them"
    )
    parser.add_argument(
        "--check", action="store_true", help="report files that need migration; change nothing"
    )
    args = parser.parse_args(argv)
    catalog = Catalog.load()
    contracts = Contracts.load(catalog)

    pending = []
    for path in _documents(args.files):
        text = path.read_text(encoding="utf-8")
        is_example = path.name.endswith(".example.json")
        migrated = migrate_text(text, catalog, contracts if is_example else None)
        if json.loads(migrated) == json.loads(text):
            continue
        pending.append(path)
        if not args.check:
            path.write_text(migrated, encoding="utf-8")
    for path in pending:
        print(f"{'needs migration' if args.check else 'migrated'}: {path}")
    return 1 if args.check and pending else 0


if __name__ == "__main__":
    sys.exit(main())
