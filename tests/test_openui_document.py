"""The Python parse → model → validate pipeline passes the shared conformance suite."""

from __future__ import annotations

import json
import unittest
from pathlib import Path

from bin.openui_document import (
    Catalog,
    OpenUiParseError,
    default_catalog,
    parse,
    validate,
    validate_text,
    validate_value,
)

REPO_ROOT = Path(__file__).resolve().parents[1]
CONFORMANCE_DIR = REPO_ROOT / "spec" / "conformance"
EXAMPLES_DIR = REPO_ROOT / "spec" / "examples"
EXPECTED_SUFFIX = ".expected.json"


def _pairs(diagnostics: list) -> set[tuple[str, str]]:
    return {(diagnostic.code, diagnostic.path) for diagnostic in diagnostics}


class ConformanceSuiteTest(unittest.TestCase):
    def test_valid_documents_have_no_diagnostics(self) -> None:
        for path in sorted((CONFORMANCE_DIR / "valid").glob("*.json")):
            with self.subTest(case=path.name):
                self.assertEqual(validate_text(path.read_text(encoding="utf-8")), [])

    def test_invalid_documents_report_exactly_the_expected_diagnostics(self) -> None:
        for path in sorted((CONFORMANCE_DIR / "invalid").glob("*.json")):
            if path.name.endswith(EXPECTED_SUFFIX):
                continue
            expected_path = path.with_name(path.name.removesuffix(".json") + EXPECTED_SUFFIX)
            expected = json.loads(expected_path.read_text(encoding="utf-8"))["diagnostics"]
            with self.subTest(case=path.name):
                self.assertEqual(
                    _pairs(validate_text(path.read_text(encoding="utf-8"))),
                    {(item["code"], item["path"]) for item in expected},
                )


class ModelTest(unittest.TestCase):
    def test_parse_builds_the_typed_tree(self) -> None:
        document = parse(
            json.dumps(
                {
                    "id": "root",
                    "version": default_catalog().version,
                    "type": "html",
                    "children": [
                        {
                            "id": "confirmDialog",
                            "type": "Dialog",
                            "attrs": {
                                "uses.open": "isOpen",
                                "uses.modal": "true",
                                "title": '"Confirm"',
                            },
                        }
                    ],
                }
            )
        )
        dialog = document.root.children[0]
        self.assertEqual([element.id for element in document.elements()], ["root", "confirmDialog"])
        self.assertEqual(dialog.path, "/children/0")
        open_attribute = dialog.attribute("uses.open")
        self.assertEqual((open_attribute.category, open_attribute.name), ("uses", "open"))
        self.assertTrue(open_attribute.is_expression)
        modal = dialog.attribute("uses.modal")
        self.assertEqual((modal.literal, modal.is_expression), (None, True))
        title = dialog.attribute("title")
        self.assertEqual(
            (title.category, title.literal, title.is_expression), (None, "Confirm", False)
        )
        self.assertIsNone(dialog.attribute("missing"))

    def test_parse_raises_with_grammar_diagnostics(self) -> None:
        with self.assertRaises(OpenUiParseError) as raised:
            parse('{"id": "root", "type": "html"}')
        self.assertEqual(
            _pairs(raised.exception.diagnostics), {("grammar/missing-property", "/version")}
        )

    def test_catalog_contracts_cover_scope_and_instance_types(self) -> None:
        catalog = default_catalog()
        self.assertEqual(catalog.contracts["dialog"], catalog.contracts["Dialog"])
        self.assertEqual(catalog.contracts["NavItem"]["route"].value_type, "reference(Route)")
        self.assertIsNone(catalog.contracts["Report"]["sort"].value_type)

    def test_the_catalog_and_every_worked_example_validate(self) -> None:
        paths = [REPO_ROOT / "spec" / "openui.json", *sorted(EXAMPLES_DIR.rglob("*.example.json"))]
        for path in paths:
            with self.subTest(path=path.relative_to(REPO_ROOT).as_posix()):
                self.assertEqual(
                    [str(d) for d in validate_text(path.read_text(encoding="utf-8"))], []
                )

    def test_a_custom_catalog_sets_the_supported_version(self) -> None:
        catalog = Catalog.from_value({"id": "root", "version": "9.9.9", "type": "html"})
        document = parse('{"id": "root", "version": "9.9.9", "type": "html"}')
        self.assertEqual(validate(document, catalog), [])

    def test_validate_value_runs_every_stage(self) -> None:
        diagnostics = validate_value({"id": "root", "version": "0.0.0", "type": "Nope"})
        self.assertEqual(
            _pairs(diagnostics),
            {("document/unsupported-version", "/version"), ("catalog/unknown-type", "/type")},
        )


if __name__ == "__main__":
    unittest.main()
