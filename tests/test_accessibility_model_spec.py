import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
ACCESSIBILITY_MODEL_MD = REPO_ROOT / "spec" / "15-accessibility-model.md"
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


class AccessibilityModelSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.spec = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        cls.markdown = ACCESSIBILITY_MODEL_MD.read_text(encoding="utf-8")
        cls.section = next(
            section
            for section in cls.spec["specification"]["sections"]
            if section["id"] == "15-accessibility-model"
        )

    def test_accessibility_model_json_has_formal_contract(self):
        self.assertGreaterEqual(len(self.section["requirements"]), 7)
        self.assertEqual(len(self.section["nonGoals"]), 3)
        tag_names = {tag["name"] for tag in self.section["tags"]}
        expected_tags = {
            "accessible-name-association",
            "semantic-role-state",
            "popup-semantics",
            "text-direction",
            "keyboard-focus-contract",
        }
        self.assertTrue(
            expected_tags.issubset(tag_names),
            msg=f"Missing tags: {expected_tags - tag_names}",
        )
        self.assertGreaterEqual(len(tag_names), 5)
        self.assertEqual(len(self.section["formalDefinitions"]), 5)
        self.assertEqual(len(self.section["usage"]), 5)
        self.assertEqual(len(self.section["implementationNotes"]), 3)

    def test_accessibility_model_examples_define_associations_and_direction(self):
        example_titles = {example["title"] for example in self.section["examples"]}

        expected_titles = {
            "Accessible name and description associations example",
            "Role and popup semantics example",
            "Text direction property example",
        }
        self.assertTrue(
            expected_titles.issubset(example_titles),
            msg=f"Missing examples: {expected_titles - example_titles}",
        )
        self.assertGreaterEqual(len(example_titles), 3)
        self.assertIn(
            "### Example 1 — accessible name and description associations",
            self.markdown,
        )
        self.assertIn('"ariaLabelledBy": ["customerNameLabel"]', self.markdown)
        self.assertIn('"ariaHasPopup": "menu"', self.markdown)
        self.assertIn('"textDirection": "RTL"', self.markdown)

        example_match = re.search(
            r"### Example 1 — accessible name and description associations"
            r"\s+```json\s*\n(.*?)\n```",
            self.markdown,
            re.DOTALL,
        )
        self.assertIsNotNone(example_match)
        example_json = json.loads(example_match.group(1))
        associations = example_json["associations"]
        self.assertIn("customerNameLabel", associations["ariaLabelledBy"])
        self.assertIn("customerNameHint", associations["ariaDescribedBy"])

    def test_generated_examples_app_lists_accessibility_example(self):
        docs_source = GENERATED_EXAMPLES_DOCS.read_text(encoding="utf-8")

        self.assertIn("id: 'accessibility'", docs_source)
        self.assertIn("id: 'accessible-field'", docs_source)
        self.assertIn("specPath: 'spec/15-accessibility-model.md'", docs_source)
        self.assertIn("preview: 'a11y-labelled'", docs_source)
        self.assertIn("preview: 'a11y-popup'", docs_source)
        self.assertIn("preview: 'a11y-direction'", docs_source)
        self.assertIn("aria-labelledby", docs_source)


if __name__ == "__main__":
    unittest.main()
