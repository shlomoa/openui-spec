import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
DIALOG_SCOPE = REPO_ROOT / "spec" / "scopes" / "Widgets" / "dialog.scope.md"

TEMPLATE_SECTIONS = (
    "## Purpose",
    "## Attributes",
    "## Child model",
    "## Accessibility",
    "## Validation notes",
)
CONTRACT_KEYS = ("[open]", "[modal]", "(close)", "(cancel)")


class DialogScopeContractTest(unittest.TestCase):
    """The dialog contract is authored in prose; openui.json is generated, not hand-edited."""

    def setUp(self) -> None:
        self.leaf = DIALOG_SCOPE.read_text(encoding="utf-8")

    def test_leaf_fills_every_template_section(self) -> None:
        for section in TEMPLATE_SECTIONS:
            with self.subTest(section=section):
                self.assertIn(section, self.leaf)

    def test_leaf_documents_attribute_contract(self) -> None:
        attributes = self.leaf.split("## Attributes", 1)[1]
        for key in CONTRACT_KEYS:
            with self.subTest(key=key):
                self.assertIn(key, attributes)


if __name__ == "__main__":
    unittest.main()
