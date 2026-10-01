"""Verify that the JSON Schema projection and README match the EBNF format SSOT."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from bin.openui_document import decode, grammar_diagnostics
from jsonschema import Draft202012Validator
from tatsu import parse
from tatsu.exceptions import FailedParse

from spec.bin.to_json.converter import build_openui_document

REPO_ROOT = Path(__file__).resolve().parents[3]
SPEC_DIR = REPO_ROOT / "spec"
EBNF_PATH = SPEC_DIR / "EBNF.txt"
README_PATH = SPEC_DIR / "README.md"
SCHEMA_PATH = SPEC_DIR / "openui.schema.json"
CATALOG_PATH = SPEC_DIR / "openui.json"

REQUIRED_README_STATEMENTS = (
    "`EBNF.txt` is the authoritative definition of the OpenUI document format.",
    "`spec/openui.schema.json` is an executable JSON Schema projection of that format.",
    "Global ID uniqueness is enforced by OpenUI tooling, not by the EBNF or JSON Schema.",
)

CONFORMANCE_DIR = SPEC_DIR / "conformance"
GRAMMAR_CODE_PREFIX = "grammar/"

# Declared value types the grammar and the schema must treat the same way, besides every
# type the catalog declares. Samples carry no whitespace: TatSu skips it between tokens.
VALUE_TYPES_ACCEPTED = (
    "string",
    "boolean",
    "integer",
    "number",
    "url",
    "enum(a|b-c)",
    "reference",
    "reference(Route)",
    "reference(Route|NavItem)",
    "reference(html)",
    "list(string)",
    "list(enum(a|b))",
    "list(reference(Route))",
)
VALUE_TYPES_REJECTED = (
    "",
    "String",
    "list",
    "list()",
    "list(list(string))",
    "enum",
    "enum()",
    "enum(A)",
    "enum(a|)",
    "reference()",
    "reference(Route|)",
    "reference(1x)",
    "foo(bar)",
    "bar",
    "string)",
    "(string)",
)


def grammar_cases() -> dict[str, tuple[str, bool]]:
    """Return each conformance case as (document text, whether the grammar accepts it).

    The grammar accepts every valid document and every invalid document whose
    expected diagnostics are all outside the grammar stage.
    """
    cases: dict[str, tuple[str, bool]] = {}
    for path in sorted((CONFORMANCE_DIR / "valid").glob("*.json")):
        cases[f"valid/{path.name}"] = (path.read_text(encoding="utf-8"), True)
    for path in sorted((CONFORMANCE_DIR / "invalid").glob("*.json")):
        if path.name.endswith(".expected.json"):
            continue
        expected_path = path.with_name(f"{path.stem}.expected.json")
        expected = json.loads(expected_path.read_text(encoding="utf-8"))
        grammar_rejects = any(
            diagnostic["code"].startswith(GRAMMAR_CODE_PREFIX)
            for diagnostic in expected["diagnostics"]
        )
        cases[f"invalid/{path.name}"] = (path.read_text(encoding="utf-8"), not grammar_rejects)
    if not cases:
        raise AssertionError(f"no conformance cases found in {CONFORMANCE_DIR}")
    return cases


def ebnf_accepts(text: str, grammar: str) -> bool:
    """Return whether text satisfies EBNF syntax and its schema-projected constraints.

    TatSu parses the EBNF productions; `grammar_diagnostics` validates the
    decoded value against the JSON Schema that projects its cardinality and
    pattern rules.
    """
    try:
        parse(grammar, text, parseinfo=True)
    except FailedParse:
        return False
    value, diagnostics = decode(text)
    return not diagnostics and not grammar_diagnostics(value)


def value_type_ebnf_accepts(text: str, grammar: str) -> bool:
    """Return whether the whole of text is a `value_type` of the EBNF."""
    try:
        parse(f"{grammar}\nvalue_type_text = value_type $ ;\n", text, start="value_type_text")
    except FailedParse:
        return False
    return True


def value_type_schema_accepts(text: str, schema: dict) -> bool:
    """Return whether text satisfies `$defs/valueType` of the schema."""
    validator = Draft202012Validator({"$ref": "#/$defs/valueType", "$defs": schema["$defs"]})
    return not any(validator.iter_errors(text))


def declared_value_types(catalog: dict) -> list[str]:
    """Return every value type a Uses attribute of the catalog declares."""
    found: list[str] = []

    def visit(node: dict) -> None:
        found.extend(
            value
            for key, value in (node.get("attrs") or {}).items()
            if key.startswith("uses.") and isinstance(value, str)
        )
        for child in node.get("children", []):
            visit(child)

    visit(catalog)
    return sorted(set(found))


def schema_accepts(text: str, validator: Draft202012Validator) -> bool:
    """Return whether text is JSON without duplicate members and satisfies the schema."""
    value, diagnostics = decode(text)
    return not diagnostics and not any(validator.iter_errors(value))


def check() -> None:
    """Raise AssertionError when OpenUI format or catalog artifacts drift."""
    grammar = EBNF_PATH.read_text(encoding="utf-8")
    schema = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
    validator = Draft202012Validator(schema)

    for name, (text, expected) in grammar_cases().items():
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

    catalog_text = CATALOG_PATH.read_text(encoding="utf-8")
    if not ebnf_accepts(catalog_text, grammar):
        raise AssertionError("spec/openui.json does not satisfy spec/EBNF.txt")
    if not schema_accepts(catalog_text, validator):
        raise AssertionError("spec/openui.json does not satisfy spec/openui.schema.json")

    catalog = json.loads(catalog_text)
    value_type_cases = {
        **{text: True for text in (*VALUE_TYPES_ACCEPTED, *declared_value_types(catalog))},
        **{text: False for text in VALUE_TYPES_REJECTED},
    }
    for text, expected in value_type_cases.items():
        ebnf_result = value_type_ebnf_accepts(text, grammar)
        schema_result = value_type_schema_accepts(text, schema)
        if ebnf_result != expected or schema_result != expected:
            raise AssertionError(
                f"value type {text!r}: expected {expected}, EBNF={ebnf_result}, "
                f"schema={schema_result}"
            )

    generated_catalog = build_openui_document(spec_dir=SPEC_DIR)
    if catalog != generated_catalog:
        raise AssertionError(
            "spec/openui.json is stale; regenerate it from spec/scopes/ and SCHEMA_VERSION"
        )


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
