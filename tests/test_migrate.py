"""The spec.bin.migrate tool converts attribute keys and values mechanically."""

from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from bin.openui_document import Catalog
from spec.bin.migrate import Contracts, fit_document, main, migrate_text

REPO_ROOT = Path(__file__).resolve().parents[1]
MIGRATED_FOLDERS = (
    REPO_ROOT / "spec" / "examples",
    REPO_ROOT / "generators" / "angular" / "generator" / "tests" / "fixtures",
)


class MigrateTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.catalog = Catalog.load()
        cls.contracts = Contracts.load(cls.catalog)

    def _migrate(self, element: dict[str, object]) -> dict[str, object]:
        document = {"id": "root", "version": "0.5.0", "type": "html", "children": [element]}
        return json.loads(migrate_text(json.dumps(document), self.catalog))["children"][0]

    def test_keys_take_their_category_prefix(self) -> None:
        migrated = self._migrate(
            {
                "id": "ordersTable",
                "type": "table",
                "attrs": {"[data]": "orders", "(sort)": "onSort($event)", "(rowClick)": "go()"},
            }
        )
        self.assertEqual(
            migrated["attrs"],
            {"uses.data": "orders", "behaves.sort": "onSort($event)", "produces.rowClick": "go()"},
        )

    def test_the_scope_type_shares_its_instance_contract(self) -> None:
        migrated = self._migrate({"id": "orders", "type": "Table", "attrs": {"(sort)": "s()"}})
        self.assertEqual(migrated["attrs"], {"behaves.sort": "s()"})

    def test_old_string_values_stay_strings(self) -> None:
        migrated = self._migrate(
            {
                "id": "nameInput",
                "type": "input",
                "attrs": {
                    "[disabled]": "true",
                    "[value]": "42",
                    "[step]": "0.5",
                    "[placeholder]": '"Name"',
                    "[readOnly]": "isLocked",
                    "title": "true",
                    "hidden": None,
                },
            }
        )
        self.assertEqual(
            migrated["attrs"],
            {
                "uses.disabled": "true",
                "uses.value": "42",
                "uses.step": "0.5",
                "uses.placeholder": '"Name"',
                "uses.readOnly": "isLocked",
                "title": "true",
                "hidden": None,
            },
        )

    def test_json_booleans_and_numbers_become_strings(self) -> None:
        migrated = self._migrate(
            {
                "id": "nameInput",
                "type": "input",
                "attrs": {
                    "uses.disabled": True,
                    "uses.readOnly": False,
                    "uses.maxLength": 80,
                    "uses.step": 0.5,
                    "uses.sizes": [10, 25, None, "50"],
                    "uses.label": '"Name"',
                    "hidden": None,
                },
            }
        )
        self.assertEqual(
            migrated["attrs"],
            {
                "uses.disabled": "true",
                "uses.readOnly": "false",
                "uses.maxLength": "80",
                "uses.step": "0.5",
                "uses.sizes": ["10", "25", None, "50"],
                "uses.label": '"Name"',
                "hidden": None,
            },
        )

    def test_migration_is_idempotent(self) -> None:
        document = json.dumps(
            {
                "id": "root",
                "version": "0.5.0",
                "type": "html",
                "attrs": {"[open]": "true", "uses.size": 25, "uses.modal": True},
            }
        )
        once = migrate_text(document, self.catalog)
        self.assertEqual(migrate_text(once, self.catalog), once)

    def test_check_mode_reports_and_keeps_old_documents(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "old.json"
            text = '{"id": "root", "version": "0.5.0", "type": "html", "attrs": {"[a]": "1"}}'
            path.write_text(text, encoding="utf-8")
            self.assertEqual(main(["--check", str(path)]), 1)
            self.assertEqual(path.read_text(encoding="utf-8"), text)
            self.assertEqual(main([directory]), 0)
            self.assertEqual(json.loads(path.read_text(encoding="utf-8"))["attrs"], {"uses.a": "1"})

    def _fit(self, *children: dict[str, object]) -> dict[str, object]:
        document = {
            "id": "root",
            "version": self.catalog.version,
            "type": "Widgets",
            "children": children,
        }
        document = json.loads(json.dumps(document))
        fit_document(document, self.contracts)
        return document

    def test_renamed_keys_take_the_declared_key_and_value(self) -> None:
        [chart, grid] = self._fit(
            {"id": "sales", "type": "Chart", "attrs": {"uses.chartType": '"bar"', "title": "t"}},
            {"id": "orders", "type": "DataGrid", "attrs": {"uses.sortable": "\"yes\""}},
        )["children"]
        self.assertEqual(chart["attrs"], {"uses.kind": '"comparison"', "title": "t"})
        self.assertEqual(grid["attrs"], {"behaves.sort": None})

    def test_undeclared_keys_and_extra_children_are_kept(self) -> None:
        chart = {
            "id": "sales",
            "type": "Chart",
            "attrs": {"uses.xAxis": '"month"'},
            "children": [{"id": "salesEmpty", "type": "FeedbackWidgets"}],
        }
        [fitted] = self._fit(chart)["children"]
        self.assertEqual(fitted, chart)

    def test_missing_required_children_are_added(self) -> None:
        [panel] = self._fit(
            {
                "id": "filters",
                "type": "ExpandablePanels",
                "children": [
                    {"id": "filtersContent", "type": "section"},
                    {"id": "inner", "type": "ExpandablePanels"},
                ],
            }
        )["children"]
        self.assertEqual(
            panel["children"],
            [
                {"id": "filtersSummary", "type": "summary"},
                {"id": "filtersContent", "type": "section"},
                {
                    "id": "inner",
                    "type": "ExpandablePanels",
                    "children": [{"id": "innerSummary", "type": "summary"}],
                },
            ],
        )

    def test_contract_fitting_is_idempotent(self) -> None:
        text = json.dumps(
            self._fit({"id": "sales", "type": "Chart", "children": [{"id": "x", "type": "li"}]})
        )
        once = migrate_text(text, self.catalog, self.contracts)
        self.assertEqual(migrate_text(once, self.catalog, self.contracts), once)

    def test_examples_and_generator_fixtures_are_migrated(self) -> None:
        self.assertEqual(main(["--check", *map(str, MIGRATED_FOLDERS)]), 0)


if __name__ == "__main__":
    unittest.main()
