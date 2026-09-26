"""Verify that the JSON Schema projection and README match the EBNF format SSOT."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator
from tatsu import parse
from tatsu.exceptions import FailedParse

REPO_ROOT = Path(__file__).resolve().parents[2]
SPEC_DIR = REPO_ROOT / "spec"
EBNF_PATH = SPEC_DIR / "EBNF.txt"
README_PATH = SPEC_DIR / "README.md"
SCHEMA_PATH = SPEC_DIR / "openui.schema.json"

ID_PATTERN = re.compile(r"^[a-z][A-Za-z0-9]*$")
TYPE_PATTERN = re.compile(
    r"^(?:[a-z][a-z0-9]*(?:-[a-z0-9]+)*|[A-Z][A-Za-z0-9]*(?:-[a-z][a-z0-9]*)?)$"
)
VERSION_PATTERN = re.compile(r"^[0-9]+\.[0-9]+\.[0-9]+$")
REQUIRED_README_STATEMENTS = (
    "`EBNF.txt` is the authoritative definition of the OpenUI document format.",
    "`spec/openui.schema.json` is an executable JSON Schema projection of that format.",
    "Global ID uniqueness is enforced by OpenUI tooling, not by the EBNF or JSON Schema.",
)

VALID_DOCUMENT = """{
  "type": "html",
  "children": [{"type": "Button", "id": "child"}],
  "version": "0.3.1",
  "id": "root"
}"""

CONSISTENCY_CASES = {
    "valid unordered document": (VALID_DOCUMENT, True),
    "root id is not root": (
        '{"version": "0.3.1", "id": "notRoot", "type": "html"}',
        False,
    ),
    "missing root version": ('{"id": "root", "type": "html"}', False),
    "invalid version": ('{"id": "root", "version": "0.3", "type": "html"}', False),
    "invalid child id": (
        '{"id": "root", "version": "0.3.1", "type": "html", '
        '"children": [{"id": "Child", "type": "Button"}]}',
        False,
    ),
    "invalid type": ('{"id": "root", "version": "0.3.1", "type": "bad--type"}', False),
    "unknown property": (
        '{"id": "root", "version": "0.3.1", "type": "html", "unknown": true}',
        False,
    ),
    "invalid attribute value": (
        '{"id": "root", "version": "0.3.1", "type": "html", "attrs": {"count": 1}}',
        False,
    ),
    "trailing comma": ('{"id": "root", "version": "0.3.1", "type": "html",}', False),
    "duplicate member": (
        '{"id": "root", "version": "0.3.1", "type": "html", "type": "body"}',
        False,
    ),
}


def _load_json_without_duplicate_members(text: str) -> Any:
    def object_from_pairs(pairs: list[tuple[str, Any]]) -> dict[str, Any]:
        value: dict[str, Any] = {}
        for key, item in pairs:
            if key in value:
                raise ValueError(f"duplicate object member: {key}")
            value[key] = item
        return value

    return json.loads(text, object_pairs_hook=object_from_pairs)


def _validate_ebnf_semantics(value: Any, *, is_root: bool) -> None:
    if not isinstance(value, dict):
        raise ValueError("element must be an object")

    allowed_keys = {"id", "type", "attrs", "children"}
    if is_root:
        allowed_keys.add("version")
    if set(value) - allowed_keys:
        raise ValueError("element has an unknown property")

    required_keys = {"id", "type"}
    if is_root:
        required_keys.add("version")
    if missing_keys := required_keys - set(value):
        raise ValueError(f"element is missing required properties: {sorted(missing_keys)}")

    if is_root and value["id"] != "root":
        raise ValueError('root id must be "root"')
    if not is_root and not isinstance(value["id"], str):
        raise ValueError("element id must be a string")
    if not is_root and not ID_PATTERN.fullmatch(value["id"]):
        raise ValueError("element id must be camelCase")
    if not isinstance(value["type"], str) or not TYPE_PATTERN.fullmatch(value["type"]):
        raise ValueError("element type is invalid")
    if is_root and (
        not isinstance(value["version"], str) or not VERSION_PATTERN.fullmatch(value["version"])
    ):
        raise ValueError("root version is invalid")

    if "attrs" in value:
        attrs = value["attrs"]
        if not isinstance(attrs, dict) or any(
            not isinstance(attribute_value, str) and attribute_value is not None
            for attribute_value in attrs.values()
        ):
            raise ValueError("attrs values must be strings or null")
    if "children" in value:
        children = value["children"]
        if not isinstance(children, list):
            raise ValueError("children must be an array")
        for child in children:
            _validate_ebnf_semantics(child, is_root=False)


def ebnf_accepts(text: str, grammar: str) -> bool:
    """Return whether text satisfies the EBNF syntax and its cardinality constraints."""
    try:
        parse(grammar, text, parseinfo=True)
        _validate_ebnf_semantics(_load_json_without_duplicate_members(text), is_root=True)
    except (json.JSONDecodeError, ValueError, FailedParse):
        return False
    return True


def schema_accepts(text: str, validator: Draft202012Validator) -> bool:
    """Return whether text is JSON without duplicate members and satisfies the schema."""
    try:
        value = _load_json_without_duplicate_members(text)
    except (json.JSONDecodeError, ValueError):
        return False
    return not any(validator.iter_errors(value))


def check() -> None:
    """Raise AssertionError when the EBNF, schema, or README contracts drift."""
    grammar = EBNF_PATH.read_text(encoding="utf-8")
    schema = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
    validator = Draft202012Validator(schema)

    for name, (text, expected) in CONSISTENCY_CASES.items():
        ebnf_result = ebnf_accepts(text, grammar)
        schema_result = schema_accepts(text, validator)
        if ebnf_result != expected or schema_result != expected or ebnf_result != schema_result:
            raise AssertionError(
                f"{name}: expected {expected}, EBNF={ebnf_result}, schema={schema_result}"
            )

    readme = " ".join(README_PATH.read_text(encoding="utf-8").split())
    missing_statements = [
        statement for statement in REQUIRED_README_STATEMENTS if statement not in readme
    ]
    if missing_statements:
        raise AssertionError(f"README is missing format-contract statements: {missing_statements}")


def main() -> int:
    try:
        check()
    except AssertionError as error:
        print(f"Grammar consistency check failed: {error}", file=sys.stderr)
        return 1
    print("Grammar consistency check passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
