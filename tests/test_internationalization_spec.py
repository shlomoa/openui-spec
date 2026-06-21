import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
INTERNATIONALIZATION_MD = REPO_ROOT / "spec" / "17-internationalization.md"
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


class InternationalizationSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.spec = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        cls.markdown = INTERNATIONALIZATION_MD.read_text(encoding="utf-8")
        cls.section = next(
            section
            for section in cls.spec["specification"]["sections"]
            if section["id"] == "17-internationalization"
        )

    def test_internationalization_json_has_formal_contract(self):
        self.assertGreaterEqual(len(self.section["requirements"]), 7)
        self.assertEqual(len(self.section["nonGoals"]), 3)
        tag_names = {tag["name"] for tag in self.section["tags"]}
        expected_tags = {
            "translatable-text",
            "message-resource-bundle",
            "locale-fallback",
            "locale-aware-formatting",
            "text-direction",
            "locale-configuration",
        }
        self.assertTrue(
            expected_tags.issubset(tag_names),
            msg=f"Missing tags: {expected_tags - tag_names}",
        )
        self.assertGreaterEqual(len(tag_names), 6)
        self.assertEqual(len(self.section["formalDefinitions"]), 6)
        self.assertEqual(len(self.section["usage"]), 5)
        self.assertEqual(len(self.section["implementationNotes"]), 3)

    def test_internationalization_examples_define_keys_and_direction(self):
        example_titles = {example["title"] for example in self.section["examples"]}

        expected_titles = {
            "Translatable property and message bundle example",
            "Locale fallback resolution example",
            "Locale-aware value formatting example",
        }
        self.assertTrue(
            expected_titles.issubset(example_titles),
            msg=f"Missing examples: {expected_titles - example_titles}",
        )
        self.assertGreaterEqual(len(example_titles), 4)
        self.assertIn(
            "### Example 1 — translatable property and message bundle",
            self.markdown,
        )
        self.assertIn('"text": { "value": "order.submit", "translatable": true }', self.markdown)
        self.assertIn('"fallback": ["de-AT", "de", "en"]', self.markdown)
        self.assertIn('"rendered": "1.234,5"', self.markdown)

        example_match = re.search(
            r"### Example 1 — translatable property and message bundle"
            r"\s+```json\s*\n(.*?)\n```",
            self.markdown,
            re.DOTALL,
        )
        self.assertIsNotNone(example_match)
        example_json = json.loads(example_match.group(1))
        self.assertTrue(example_json["properties"]["text"]["translatable"])
        self.assertEqual(example_json["messageBundle"]["de"]["order.submit"], "Bestellung absenden")

    def test_generated_examples_app_lists_internationalization_example(self):
        docs_source = GENERATED_EXAMPLES_DOCS.read_text(encoding="utf-8")

        self.assertIn("id: 'internationalization'", docs_source)
        self.assertIn("id: 'localized-field'", docs_source)
        self.assertIn("specPath: 'spec/17-internationalization.md'", docs_source)
        self.assertIn("preview: 'i18n-translatable'", docs_source)
        self.assertIn("preview: 'i18n-fallback'", docs_source)
        self.assertIn("preview: 'i18n-direction'", docs_source)
        self.assertIn("order.submit", docs_source)


if __name__ == "__main__":
    unittest.main()
