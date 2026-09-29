"""The spec.bin.migrate tool converts 0.5 attribute keys and values mechanically."""

from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from bin.openui_document import Catalog
from spec.bin.migrate import main, migrate_text

REPO_ROOT = Path(__file__).resolve().parents[1]
MIGRATED_FOLDERS = (
    REPO_ROOT / "spec" / "examples",
    REPO_ROOT / "generators" / "angular" / "generator" / "tests" / "fixtures",
)


class MigrateTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.catalog = Catalog.load()

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

    def test_literal_values_follow_the_declared_type(self) -> None:
        migrated = self._migrate(
            {
                "id": "nameInput",
                "type": "input",
                "attrs": {
                    "[disabled]": "true",
                    "[value]": "42",
                    "[maxLength]": "80",
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
                "uses.disabled": True,
                "uses.value": "42",
                "uses.maxLength": 80,
                "uses.step": 0.5,
                "uses.placeholder": '"Name"',
                "uses.readOnly": "isLocked",
                "title": "true",
                "hidden": None,
            },
        )

    def test_migration_is_idempotent(self) -> None:
        document = json.dumps(
            {"id": "root", "version": "0.5.0", "type": "html", "attrs": {"[open]": "true"}}
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
            self.assertEqual(json.loads(path.read_text(encoding="utf-8"))["attrs"], {"uses.a": 1})

    def test_examples_and_generator_fixtures_are_migrated(self) -> None:
        self.assertEqual(main(["--check", *map(str, MIGRATED_FOLDERS)]), 0)


if __name__ == "__main__":
    unittest.main()
