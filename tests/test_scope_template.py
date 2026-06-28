import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"
SPEC_README = SPEC_DIR / "README.md"
SCOPES_INDEX = SPEC_DIR / "scopes" / "scope.md"
TEMPLATE = SPEC_DIR / "scopes" / "template.scope.md"

TEMPLATE_SECTIONS = (
    "## Identity",
    "## Purpose",
    "## Attributes",
    "## Child model",
    "## Accessibility",
    "## Validation notes",
)
ATTRIBUTE_CATEGORIES = ("Uses", "Produces", "Behaves")


class ScopeTemplateTest(unittest.TestCase):
    def setUp(self) -> None:
        self.template = TEMPLATE.read_text(encoding="utf-8")

    def test_template_defines_every_section(self) -> None:
        for section in TEMPLATE_SECTIONS:
            with self.subTest(section=section):
                self.assertIn(section, self.template)

    def test_scope_index_points_at_the_single_template(self) -> None:
        # The scopes index is the single place that designates the leaf template;
        # it references template.scope.md rather than restating the structure.
        index = SCOPES_INDEX.read_text(encoding="utf-8")
        self.assertIn("template.scope.md", index)

    def test_attribute_vocabulary_matches_readme(self) -> None:
        readme = SPEC_README.read_text(encoding="utf-8")
        attributes = self.template.split("## Attributes", 1)[1]
        for category in ATTRIBUTE_CATEGORIES:
            with self.subTest(category=category):
                self.assertIn(f"**{category}:**", readme)
                self.assertIn(category, attributes)


if __name__ == "__main__":
    unittest.main()
