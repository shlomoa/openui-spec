import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO_ROOT / "spec"
SPEC_README = SPEC_DIR / "README.md"
SCOPES_INDEX = SPEC_DIR / "scopes" / "scope.md"

TEMPLATE_HEADING = "## Leaf scope template"
TEMPLATE_SECTIONS = ("Purpose", "Attributes", "Child model", "Accessibility", "Validation notes")
ATTRIBUTE_CATEGORIES = ("Uses", "Produces", "Behaves")


class ScopeTemplateTest(unittest.TestCase):
    def setUp(self) -> None:
        self.index_text = SCOPES_INDEX.read_text(encoding="utf-8")

    def _template_body(self) -> str:
        self.assertIn(TEMPLATE_HEADING, self.index_text)
        return self.index_text.split(TEMPLATE_HEADING, 1)[1]

    def test_template_defines_every_section(self) -> None:
        template_body = self._template_body()
        for section in TEMPLATE_SECTIONS:
            with self.subTest(section=section):
                self.assertIn(f"**{section}**", template_body)

    def test_template_is_the_single_source_of_truth(self) -> None:
        files_with_heading = sorted(
            path.relative_to(SPEC_DIR).as_posix()
            for path in SPEC_DIR.rglob("*.md")
            if TEMPLATE_HEADING in path.read_text(encoding="utf-8")
        )

        self.assertEqual(files_with_heading, ["scopes/scope.md"])

    def test_attribute_vocabulary_matches_readme(self) -> None:
        readme_text = SPEC_README.read_text(encoding="utf-8")
        template_body = self._template_body()

        for category in ATTRIBUTE_CATEGORIES:
            with self.subTest(category=category):
                self.assertIn(f"**{category}:**", readme_text)
                self.assertIn(category, template_body)


if __name__ == "__main__":
    unittest.main()
