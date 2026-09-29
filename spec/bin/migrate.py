"""Migrate OpenUI documents from the 0.5 attribute keys to the typed attribute form.

The conversion is mechanical and uses only the catalog (`spec/openui.json`):

- `[name]` becomes `uses.name`;
- `(name)` becomes `behaves.name` when the element's type declares `name` as a
  Behaves attribute, and `produces.name` otherwise;
- a Uses value `"true"` or `"false"` becomes a JSON boolean, and an unquoted
  number becomes a JSON number, unless the type declares the attribute as
  `string`, `url`, `enum(...)`, `reference` or `list(...)`.

Every other key and value is kept. Running the tool twice changes nothing.

Usage: ``python -m spec.bin.migrate [--check] PATH...`` (a folder is searched for
JSON documents whose root id is ``root``).
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parents[2]
CATALOG_PATH = REPO_ROOT / "spec" / "openui.json"
OLD_KEY = re.compile(r"^(?P<open>[\[(])(?P<name>[a-z][A-Za-z0-9]*)(?P<close>[\])])$")
NUMBER = re.compile(r"^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?$")
LITERAL_TYPES = {"boolean", "integer", "number"}

# type literal -> attribute name -> (category prefix, declared value type or None)
Contracts = dict[str, dict[str, tuple[str, str | None]]]


def catalog_contracts(catalog: dict[str, Any]) -> Contracts:
    """Return the declared attributes of every known type in the catalog.

    A leaf's attributes sit on its instance node; they also apply to the leaf's
    scope type, which names the same object.
    """
    contracts: Contracts = {}

    def visit(node: dict[str, Any], parent: dict[str, Any] | None) -> None:
        declared = {
            key.split(".", 1)[1]: (key.split(".", 1)[0], value)
            for key, value in (node.get("attrs") or {}).items()
            if "." in key
        }
        if declared:
            contracts.setdefault(node["type"], {}).update(declared)
            if parent is not None and node["id"] == f"{parent['id']}Instance":
                contracts.setdefault(parent["type"], {}).update(declared)
        for child in node.get("children", []):
            visit(child, node)

    visit(catalog, None)
    return contracts


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


def migrate_element(element: dict[str, Any], contracts: Contracts) -> None:
    """Migrate the attribute keys and values of *element* and its children in place."""
    attrs = element.get("attrs")
    if isinstance(attrs, dict):
        declared = contracts.get(element.get("type", ""), {})
        migrated: dict[str, Any] = {}
        for key, value in attrs.items():
            match = OLD_KEY.fullmatch(key)
            if match is None or (match.group("open") == "[") != (match.group("close") == "]"):
                migrated[key] = value
                continue
            name = match.group("name")
            category, value_type = declared.get(name, (None, None))
            if match.group("open") == "[":
                migrated[f"uses.{name}"] = _convert_value(
                    value, value_type if category == "uses" else None
                )
            else:
                prefix = "behaves" if category == "behaves" else "produces"
                migrated[f"{prefix}.{name}"] = value
        element["attrs"] = migrated
    for child in element.get("children", []):
        migrate_element(child, contracts)


def migrate_text(text: str, contracts: Contracts) -> str:
    """Return the migrated JSON text of one document."""
    document = json.loads(text)
    migrate_element(document, contracts)
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
    contracts = catalog_contracts(json.loads(CATALOG_PATH.read_text(encoding="utf-8")))

    pending = []
    for path in _documents(args.files):
        text = path.read_text(encoding="utf-8")
        migrated = migrate_text(text, contracts)
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
