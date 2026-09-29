"""Every worked example, and every generator input fixture copied from one, follows the contracts.

A leaf contract (spec part 4.6) declares the category-prefixed attributes of its type
and their value types; its Child model lists the children the type owns. In an example:

- every category-prefixed attribute is declared by the element's type, with a value of
  the declared type, and every literal element reference resolves to an allowed type;
- below the root, the children of a leaf type are the ones its Child model allows,
  within their multiplicity.

The root of an example is its scope node, so its own children are free.
"""

from __future__ import annotations

import json
import unittest
from pathlib import Path
from typing import Any

from bin.openui_document import Catalog, grammar_diagnostics, validate_value
from spec.bin.migrate import Contracts, contract_problems

REPO_ROOT = Path(__file__).resolve().parents[1]
EXAMPLES_DIR = REPO_ROOT / "spec" / "examples"
FIXTURES_DIR = REPO_ROOT / "generators" / "angular" / "generator" / "tests" / "fixtures"


class ExampleContractsTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.catalog = Catalog.load()
        cls.contracts = Contracts.load(cls.catalog)

    def _problems(self, document: dict[str, Any]) -> list[str]:
        diagnostics = [str(diagnostic) for diagnostic in validate_value(document, self.catalog)]
        return diagnostics + contract_problems(document, self.contracts)

    def _document(self, *children: dict[str, Any]) -> dict[str, Any]:
        version = self.catalog.version
        return {"id": "root", "version": version, "type": "Widgets", "children": list(children)}

    def test_every_example_and_fixture_copy_follows_its_contracts(self) -> None:
        paths = [
            *sorted(EXAMPLES_DIR.rglob("*.example.json")),
            *sorted(FIXTURES_DIR.glob("*/input_*/*.example.json")),
        ]
        checked = 0
        for path in paths:
            document = json.loads(path.read_text(encoding="utf-8"))
            if path.is_relative_to(FIXTURES_DIR) and grammar_diagnostics(document):
                continue  # A scenario fixture that is not an OpenUI document (fixtures README).
            with self.subTest(path=path.relative_to(REPO_ROOT).as_posix()):
                self.assertEqual(self._problems(document), [])
                checked += 1
        self.assertGreater(checked, 120)

    def test_a_valid_element_has_no_problem(self) -> None:
        chart = {"id": "sales", "type": "Chart", "attrs": {"uses.kind": '"trend"'}}
        self.assertEqual(self._problems(self._document(chart)), [])

    def test_an_undeclared_attribute_is_a_problem(self) -> None:
        chart = {"id": "sales", "type": "Chart", "attrs": {"uses.xAxis": '"month"'}}
        self.assertEqual(
            self._problems(self._document(chart)),
            ["/children/0 (sales, Chart): removes uses.xAxis"],
        )

    def test_a_value_of_the_wrong_type_is_a_problem(self) -> None:
        chart = {"id": "sales", "type": "Chart", "attrs": {"uses.kind": '"bar"'}}
        [problem] = self._problems(self._document(chart))
        self.assertIn("contract/wrong-value-type", problem)

    def test_a_child_the_child_model_does_not_allow_is_a_problem(self) -> None:
        empty = {"id": "chartEmpty", "type": "FeedbackWidgets"}
        chart = {"id": "sales", "type": "Chart", "children": [empty]}
        self.assertEqual(
            self._problems(self._document(chart)),
            ["/children/0 (sales, Chart): removes child chartEmpty (FeedbackWidgets)"],
        )

    def test_a_missing_required_child_is_a_problem(self) -> None:
        panel = {"id": "filters", "type": "ExpandablePanels"}
        where = "/children/0 (filters, ExpandablePanels)"
        self.assertEqual(
            self._problems(self._document(panel)),
            [f"{where}: adds required child filtersSummary (summary)"],
        )

    def test_the_root_holds_any_children(self) -> None:
        document = self._document({"id": "note", "type": "FeedbackWidgets"})
        document["type"] = "Chart"
        self.assertEqual(self._problems(document), [])


if __name__ == "__main__":
    unittest.main()
