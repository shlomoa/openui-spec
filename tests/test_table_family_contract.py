import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
TABLE_DIR = REPO_ROOT / "spec" / "scopes" / "Controls" / "Table"

TEMPLATE_SECTIONS = (
    "## Purpose",
    "## Attributes",
    "## Child model",
    "## Accessibility",
    "## Validation notes",
)
TAGS = ("table", "tr", "th", "td")
CELL_ATTR_KEYS = {
    "th": ("[colspan]", "[rowspan]", "[scope]", "[headers]"),
    "td": ("[colspan]", "[rowspan]", "[headers]"),
}


class TableFamilyContractTest(unittest.TestCase):
    def _leaf(self, tag: str) -> str:
        return (TABLE_DIR / f"{tag}.scope.md").read_text(encoding="utf-8")

    def test_every_tag_leaf_fills_template_sections(self) -> None:
        for tag in TAGS:
            text = self._leaf(tag)
            for section in TEMPLATE_SECTIONS:
                with self.subTest(tag=tag, section=section):
                    self.assertIn(section, text)

    def test_cell_tags_document_their_attributes(self) -> None:
        for tag, keys in CELL_ATTR_KEYS.items():
            attributes = self._leaf(tag).split("## Attributes", 1)[1]
            for key in keys:
                with self.subTest(tag=tag, key=key):
                    self.assertIn(key, attributes)


if __name__ == "__main__":
    unittest.main()
