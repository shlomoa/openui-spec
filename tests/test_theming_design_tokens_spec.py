import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
THEMING_MD = REPO_ROOT / "spec" / "16-theming-design-tokens.md"
GENERATED_EXAMPLES_DOCS = (
    REPO_ROOT
    / "generators"
    / "angular"
    / "generated-examples"
    / "src"
    / "app"
    / "documentation"
    / "documentation-items.ts"
)


class ThemingDesignTokensSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.spec = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        cls.markdown = THEMING_MD.read_text(encoding="utf-8")
        cls.section = next(
            section
            for section in cls.spec["specification"]["sections"]
            if section["id"] == "16-theming-design-tokens"
        )

    def test_theming_json_has_formal_contract(self):
        self.assertGreaterEqual(len(self.section["requirements"]), 7)
        self.assertEqual(len(self.section["nonGoals"]), 3)
        tag_names = {tag["name"] for tag in self.section["tags"]}
        expected_tags = {
            "theme-asset-set",
            "theme-composition",
            "design-token",
            "density-aware-styling",
            "external-theme-configuration",
        }
        self.assertTrue(
            expected_tags.issubset(tag_names),
            msg=f"Missing tags: {expected_tags - tag_names}",
        )
        self.assertGreaterEqual(len(tag_names), 5)
        self.assertEqual(len(self.section["formalDefinitions"]), 5)
        self.assertEqual(len(self.section["usage"]), 5)
        self.assertEqual(len(self.section["implementationNotes"]), 3)

    def test_theming_examples_define_tokens_overrides_and_density(self):
        example_titles = {example["title"] for example in self.section["examples"]}

        expected_titles = {
            "Design tokens instead of literal values example",
            "Base styles plus theme override example",
            "Density mode example",
        }
        self.assertTrue(
            expected_titles.issubset(example_titles),
            msg=f"Missing examples: {expected_titles - example_titles}",
        )
        self.assertGreaterEqual(len(example_titles), 3)
        self.assertIn(
            "### Example 1 — design tokens instead of literal values",
            self.markdown,
        )
        self.assertIn('"sapUiSizeCompact"', self.markdown)
        self.assertIn("--mat-sys-primary", self.markdown)

        example_match = re.search(
            r"### Example 1 — design tokens instead of literal values"
            r"\s+```json\s*\n(.*?)\n```",
            self.markdown,
            re.DOTALL,
        )
        self.assertIsNotNone(example_match)
        example_json = json.loads(example_match.group(1))
        style_tokens = example_json["styleTokens"]
        self.assertEqual(style_tokens["background"], "sapUiButtonBackground")
        self.assertEqual(style_tokens["color"], "sapUiButtonTextColor")

    def test_generated_examples_app_lists_theming_example(self):
        docs_source = GENERATED_EXAMPLES_DOCS.read_text(encoding="utf-8")

        self.assertIn("id: 'theming'", docs_source)
        self.assertIn("id: 'themed-button'", docs_source)
        self.assertIn("specPath: 'spec/16-theming-design-tokens.md'", docs_source)
        self.assertIn("preview: 'theme-tokens'", docs_source)
        self.assertIn("preview: 'theme-override'", docs_source)
        self.assertIn("preview: 'theme-density'", docs_source)
        self.assertIn("--mat-sys-primary", docs_source)


if __name__ == "__main__":
    unittest.main()
