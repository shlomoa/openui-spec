import unittest
import json
from pathlib import Path

from spec.to_json.converter import parse_leaf_scope

REPO_ROOT = Path(__file__).resolve().parents[1]
WIDGETS_DIR = REPO_ROOT / "spec" / "scopes" / "Widgets"
CONTROLS_TABLE_DIR = REPO_ROOT / "spec" / "scopes" / "Controls" / "Table"
TABLE_EXAMPLE_PATH = REPO_ROOT / "spec" / "examples" / "Widgets" / "table.example.json"

ALWAYS_SECTIONS = (
    "## Identity",
    "## Purpose",
    "## Attributes",
    "## Child model",
    "## Accessibility",
    "## Validation notes",
)
EXPECTED_BEHAVES_KEYS = ("(sort)", "(filter)", "(paginate)")


class TableContractTest(unittest.TestCase):
    def test_controls_table_directory_is_retired(self) -> None:
        self.assertFalse(
            CONTROLS_TABLE_DIR.exists(),
            f"Expected {CONTROLS_TABLE_DIR} to be retired, but it still exists.",
        )

    def test_table_widget_leaf_has_required_sections_and_identity(self) -> None:
        table_path = WIDGETS_DIR / "table.scope.md"
        self.assertTrue(table_path.exists(), f"Expected {table_path} to exist.")
        text = table_path.read_text(encoding="utf-8")

        for section in ALWAYS_SECTIONS:
            with self.subTest(section=section):
                self.assertIn(section, text)

        self.assertIn("id: table · type: table · status:", text)

    def test_table_widget_documents_behavior_attributes(self) -> None:
        table_path = WIDGETS_DIR / "table.scope.md"
        text = table_path.read_text(encoding="utf-8")
        attributes = text.split("## Attributes", 1)[1].split("## Child model", 1)[0]

        for key in EXPECTED_BEHAVES_KEYS:
            with self.subTest(key=key):
                self.assertIn(f"`{key}` — Behaves —", attributes)

    def test_table_widget_declares_child_model(self) -> None:
        table_path = WIDGETS_DIR / "table.scope.md"
        text = table_path.read_text(encoding="utf-8")
        child_model = text.split("## Child model", 1)[1].split("## Accessibility", 1)[0]

        self.assertIn("tableRow — tr — 0..n", child_model)

    def test_table_example_stays_within_current_table_contract(self) -> None:
        contract = parse_leaf_scope(WIDGETS_DIR / "table.scope.md", scopes_dir=WIDGETS_DIR.parent)
        table_contract = contract["children"][0]
        document = json.loads(TABLE_EXAMPLE_PATH.read_text(encoding="utf-8"))
        table = document["children"][0]

        self.assertEqual(table["type"], table_contract["type"])
        self.assertEqual(set(table["attrs"]), set(table_contract["attrs"]))
        self.assertEqual(
            table["children"],
            [{"id": "ordersTableRow", "type": table_contract["children"][0]["type"]}],
        )


if __name__ == "__main__":
    unittest.main()
