import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
TABLE_DIR = REPO_ROOT / "spec" / "scopes" / "Controls" / "Table"

# Sections present in every Table tag leaf (template.scope.md EBNF format).
ALWAYS_SECTIONS = ("## Identity", "## Purpose", "## Accessibility", "## Validation notes")
TAGS = ("table", "tr", "th", "td")
CELL_ATTR_KEYS = {
    "th": ("[colspan]", "[rowspan]", "[scope]", "[headers]", "[abbr]"),
    "td": ("[colspan]", "[rowspan]", "[headers]"),
}
CONTAINER_CHILD_TYPES = {"table": ("tr",), "tr": ("th", "td")}


class TableFamilyContractTest(unittest.TestCase):
    def _leaf(self, tag: str) -> str:
        return (TABLE_DIR / f"{tag}.scope.md").read_text(encoding="utf-8")

    def test_every_tag_leaf_has_required_sections_and_identity(self) -> None:
        for tag in TAGS:
            text = self._leaf(tag)
            for section in ALWAYS_SECTIONS:
                with self.subTest(tag=tag, section=section):
                    self.assertIn(section, text)
            with self.subTest(tag=tag, check="identity"):
                self.assertIn(f"id: {tag} · type: {tag} · status:", text)

    def test_cell_tags_document_attributes(self) -> None:
        for tag, keys in CELL_ATTR_KEYS.items():
            attributes = self._leaf(tag).split("## Attributes", 1)[1]
            for key in keys:
                with self.subTest(tag=tag, key=key):
                    self.assertIn(f"`{key}` — Uses —", attributes)

    def test_container_tags_declare_child_types(self) -> None:
        for tag, child_types in CONTAINER_CHILD_TYPES.items():
            child_model = self._leaf(tag).split("## Child model", 1)[1]
            for child_type in child_types:
                with self.subTest(tag=tag, child_type=child_type):
                    self.assertIn(f" — {child_type} — ", child_model)


if __name__ == "__main__":
    unittest.main()
