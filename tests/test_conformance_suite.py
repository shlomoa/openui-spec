"""Check the layout of the shared conformance suite in spec/conformance/."""

from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

from jsonschema import Draft202012Validator

REPO_ROOT = Path(__file__).resolve().parents[1]
CONFORMANCE_DIR = REPO_ROOT / "spec" / "conformance"
DIAGNOSTICS_SCHEMA = CONFORMANCE_DIR / "diagnostics.schema.json"
EXPECTED_SUFFIX = ".expected.json"
CASE_NAME = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
TOP_LEVEL_ENTRIES = {"README.md", "diagnostics.schema.json", "valid", "invalid"}
CODE_STAGES = ("grammar/", "document/", "catalog/", "contract/")
VERSION_CODES = {"grammar/invalid-version", "document/unsupported-version"}
VERSION_MEMBER = re.compile(r'"version"\s*:\s*"([^"]*)"')


def _case_name(path: Path) -> str:
    return path.name.removesuffix(EXPECTED_SUFFIX).removesuffix(".json")


class ConformanceSuiteLayoutTest(unittest.TestCase):
    def test_top_level_holds_only_the_documented_entries(self) -> None:
        self.assertEqual({path.name for path in CONFORMANCE_DIR.iterdir()}, TOP_LEVEL_ENTRIES)

    def test_valid_folder_holds_only_documents(self) -> None:
        paths = sorted((CONFORMANCE_DIR / "valid").iterdir())
        self.assertTrue(paths, "the suite needs at least one valid document")
        for path in paths:
            with self.subTest(path=path.name):
                self.assertTrue(path.is_file())
                self.assertTrue(path.name.endswith(".json"))
                self.assertFalse(path.name.endswith(EXPECTED_SUFFIX))
                self.assertRegex(_case_name(path), CASE_NAME)
                json.loads(path.read_text(encoding="utf-8"))

    def test_every_invalid_document_has_its_expected_diagnostics(self) -> None:
        paths = sorted((CONFORMANCE_DIR / "invalid").iterdir())
        documents = {_case_name(p) for p in paths if not p.name.endswith(EXPECTED_SUFFIX)}
        expected = {_case_name(p) for p in paths if p.name.endswith(EXPECTED_SUFFIX)}
        self.assertTrue(documents, "the suite needs at least one invalid document")
        self.assertEqual(documents, expected)
        for path in paths:
            with self.subTest(path=path.name):
                self.assertTrue(path.is_file())
                self.assertTrue(path.name.endswith(".json"))
                self.assertRegex(_case_name(path), CASE_NAME)

    def test_case_names_are_unique_across_valid_and_invalid(self) -> None:
        valid = {_case_name(p) for p in (CONFORMANCE_DIR / "valid").glob("*.json")}
        invalid = {_case_name(p) for p in (CONFORMANCE_DIR / "invalid").glob("*.json")}
        self.assertFalse(valid & invalid)

    def test_expected_diagnostics_validate_against_the_schema(self) -> None:
        schema = json.loads(DIAGNOSTICS_SCHEMA.read_text(encoding="utf-8"))
        Draft202012Validator.check_schema(schema)
        validator = Draft202012Validator(schema)
        for path in sorted((CONFORMANCE_DIR / "invalid").glob(f"*{EXPECTED_SUFFIX}")):
            with self.subTest(path=path.name):
                expected = json.loads(path.read_text(encoding="utf-8"))
                errors = [error.message for error in validator.iter_errors(expected)]
                self.assertEqual(errors, [])

    def test_every_code_has_an_invalid_case(self) -> None:
        schema = json.loads(DIAGNOSTICS_SCHEMA.read_text(encoding="utf-8"))
        codes = {option["const"] for option in schema["$defs"]["code"]["oneOf"]}
        used = {
            diagnostic["code"]
            for path in (CONFORMANCE_DIR / "invalid").glob(f"*{EXPECTED_SUFFIX}")
            for diagnostic in json.loads(path.read_text(encoding="utf-8"))["diagnostics"]
        }
        self.assertEqual(codes, used)

    def test_documents_carry_the_current_spec_version(self) -> None:
        version = (REPO_ROOT / "SCHEMA_VERSION").read_text(encoding="utf-8").strip()
        for folder in ("valid", "invalid"):
            for path in sorted((CONFORMANCE_DIR / folder).glob("*.json")):
                if path.name.endswith(EXPECTED_SUFFIX):
                    continue
                expected = path.with_name(f"{_case_name(path)}{EXPECTED_SUFFIX}")
                diagnostics = (
                    json.loads(expected.read_text(encoding="utf-8"))["diagnostics"]
                    if expected.is_file()
                    else []
                )
                if VERSION_CODES & {diagnostic["code"] for diagnostic in diagnostics}:
                    continue
                with self.subTest(path=f"{folder}/{path.name}"):
                    for found in VERSION_MEMBER.findall(path.read_text(encoding="utf-8")):
                        self.assertEqual(found, version)

    def test_every_code_names_its_stage(self) -> None:
        schema = json.loads(DIAGNOSTICS_SCHEMA.read_text(encoding="utf-8"))
        codes = [option["const"] for option in schema["$defs"]["code"]["oneOf"]]
        self.assertEqual(len(codes), len(set(codes)))
        for code in codes:
            with self.subTest(code=code):
                self.assertTrue(code.startswith(CODE_STAGES))
                self.assertRegex(code.split("/", 1)[1], CASE_NAME)


if __name__ == "__main__":
    unittest.main()
