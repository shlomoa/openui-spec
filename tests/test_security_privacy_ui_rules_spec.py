import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
SECURITY_PRIVACY_MD = REPO_ROOT / "spec" / "18-security-privacy-ui-rules.md"
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


class SecurityPrivacyUiRulesSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.spec = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        cls.markdown = SECURITY_PRIVACY_MD.read_text(encoding="utf-8")
        cls.section = next(
            section
            for section in cls.spec["specification"]["sections"]
            if section["id"] == "18-security-privacy-ui-rules"
        )

    def test_security_privacy_json_has_formal_contract(self):
        self.assertGreaterEqual(len(self.section["requirements"]), 7)
        self.assertEqual(len(self.section["nonGoals"]), 4)
        tag_names = {tag["name"] for tag in self.section["tags"]}
        expected_tags = {
            "safe-rendering",
            "untrusted-input-encoding",
            "popup-disclosure",
            "sensitive-value-masking",
            "confirmation-contract",
            "permission-gating",
        }
        self.assertTrue(
            expected_tags.issubset(tag_names),
            msg=f"Missing tags: {expected_tags - tag_names}",
        )
        self.assertGreaterEqual(len(tag_names), 6)
        self.assertEqual(len(self.section["formalDefinitions"]), 6)
        self.assertEqual(len(self.section["usage"]), 5)
        self.assertEqual(len(self.section["implementationNotes"]), 3)

    def test_security_privacy_markdown_has_full_sections(self):
        self.assertIn("## Tags", self.markdown)
        self.assertIn("## Formal definitions", self.markdown)
        self.assertIn("## Usage and implementation guidance", self.markdown)
        self.assertIn("### Example 1 — safe rendering of untrusted text and URLs", self.markdown)
        self.assertIn('"encode": "text"', self.markdown)
        self.assertIn('"urlAllowList": ["http", "https", "mailto"]', self.markdown)
        self.assertIn('"masked": true', self.markdown)
        self.assertIn('"requiresConfirmation"', self.markdown)

    def test_security_privacy_examples_define_encoding_and_masking(self):
        example_titles = {example["title"] for example in self.section["examples"]}

        expected_titles = {
            "Safe rendering of untrusted text and URLs example",
            "Sensitive-value masking contract example",
            "Confirmation and permission gating example",
        }
        self.assertTrue(
            expected_titles.issubset(example_titles),
            msg=f"Missing examples: {expected_titles - example_titles}",
        )
        self.assertGreaterEqual(len(example_titles), 5)

        example_match = re.search(
            r"### Example 3 — sensitive-value masking contract\s+```json\s*\n(.*?)\n```",
            self.markdown,
            re.DOTALL,
        )
        self.assertIsNotNone(example_match)
        example_json = json.loads(example_match.group(1))
        self.assertTrue(example_json["metadata"]["properties"]["masked"]["defaultValue"])
        self.assertTrue(example_json["state"]["masked"])

    def test_generated_examples_app_lists_security_example(self):
        docs_source = GENERATED_EXAMPLES_DOCS.read_text(encoding="utf-8")

        self.assertIn("id: 'security'", docs_source)
        self.assertIn("id: 'security-controls'", docs_source)
        self.assertIn("specPath: 'spec/18-security-privacy-ui-rules.md'", docs_source)
        self.assertIn("preview: 'security-encoding'", docs_source)
        self.assertIn("preview: 'security-masking'", docs_source)
        self.assertIn("preview: 'security-confirmation'", docs_source)
        self.assertIn("aria-haspopup", docs_source)


if __name__ == "__main__":
    unittest.main()
