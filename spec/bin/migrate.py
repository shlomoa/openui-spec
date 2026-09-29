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

from bin.openui_document import Catalog

OLD_KEY = re.compile(r"^(?P<open>[\[(])(?P<name>[a-z][A-Za-z0-9]*)(?P<close>[\])])$")
NUMBER = re.compile(r"^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?$")
LITERAL_TYPES = {"boolean", "integer", "number"}


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


def migrate_text(text: str, catalog: Catalog) -> str:
    """Return the migrated JSON text of one document."""
    document = json.loads(text)
    migrate_element(document, catalog)
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

    pending = []
    for path in _documents(args.files):
        text = path.read_text(encoding="utf-8")
        migrated = migrate_text(text, catalog)
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
