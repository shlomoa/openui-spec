"""Every worked example, and every generator input fixture copied from one, follows the contracts.

In an example (spec part 4.6 and the leaf Child models):

- a declared attribute has a value of its declared type;
- a literal element reference resolves to an element of the declared type;
- below the root, every element has the children its leaf's Child model requires.

A contract does not restrict an element to its declared attributes or to the children
of its Child model (glossary, Object), so neither is rejected. The root of an example
is its scope node, so no child is required of it.
"""

from __future__ import annotations

import json
import unittest
from pathlib import Path
from typing import Any

from bin.openui_document import Catalog, grammar_diagnostics, validate_value
from spec.bin.migrate import Contracts, missing_required_children

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
        return diagnostics + missing_required_children(document, self.contracts)

    def _document(self, *children: dict[str, Any]) -> dict[str, Any]:
        version = self.catalog.version
        return {"id": "root", "version": version, "type": "Widgets", "children": list(children)}

    def test_every_example_and_input_fixture_follows_its_contracts(self) -> None:
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

    def test_undeclared_attributes_and_extra_children_are_allowed(self) -> None:
        empty = {"id": "chartEmpty", "type": "FeedbackWidgets"}
        chart = {"id": "sales", "type": "Chart", "attrs": {"uses.xAxis": '"month"'}}
        chart["children"] = [empty]
        self.assertEqual(self._problems(self._document(chart)), [])

    def test_a_value_of_the_wrong_type_is_a_problem(self) -> None:
        chart = {"id": "sales", "type": "Chart", "attrs": {"uses.kind": '"bar"'}}
        [problem] = self._problems(self._document(chart))
        self.assertIn("contract/wrong-value-type", problem)

    def test_an_unresolved_or_wrongly_typed_reference_is_a_problem(self) -> None:
        item = {"id": "home", "type": "NavItem", "attrs": {"uses.route": '"missing"'}}
        [problem] = self._problems(self._document(item))
        self.assertIn("contract/unresolved-reference", problem)
        item["attrs"]["uses.route"] = '"sales"'
        [problem] = self._problems(self._document(item, {"id": "sales", "type": "Chart"}))
        self.assertIn("contract/wrong-reference-type", problem)

    def test_a_missing_required_child_is_a_problem(self) -> None:
        panel = {"id": "filters", "type": "ExpandablePanels"}
        where = "/children/0 (filters, ExpandablePanels)"
        self.assertEqual(
            self._problems(self._document(panel)),
            [f"{where}: adds required child filtersSummary (summary)"],
        )

    def test_the_root_needs_no_required_child(self) -> None:
        document = self._document({"id": "note", "type": "FeedbackWidgets"})
        document["type"] = "ExpandablePanels"
        self.assertEqual(self._problems(document), [])


if __name__ == "__main__":
    unittest.main()
