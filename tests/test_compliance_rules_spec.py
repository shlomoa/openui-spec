import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
COMPLIANCE_RULES_MD = REPO_ROOT / "spec" / "21-compliance-rules.md"
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


class ComplianceRulesSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.spec = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        cls.markdown = COMPLIANCE_RULES_MD.read_text(encoding="utf-8")
        cls.section = next(
            section
            for section in cls.spec["specification"]["sections"]
            if section["id"] == "21-compliance-rules"
        )

    def test_compliance_rules_json_has_formal_contract(self):
        self.assertGreaterEqual(len(self.section["requirements"]), 8)
        self.assertEqual(len(self.section["nonGoals"]), 4)
        tag_names = {tag["name"] for tag in self.section["tags"]}
        expected_tags = {
            "catalog-discoverability",
            "metadata-completeness",
            "contract-based-validation",
            "cross-cutting-evidence",
            "testable-conformance",
            "explicit-capability-scope",
        }
        self.assertTrue(
            expected_tags.issubset(tag_names),
            msg=f"Missing tags: {expected_tags - tag_names}",
        )
        definition_terms = {item["term"] for item in self.section["formalDefinitions"]}
        expected_terms = {
            "Compliant implementation",
            "Public surface",
            "Compliance evidence",
            "Conformance profile",
            "Compliance gap",
            "Validation artifact",
        }
        self.assertTrue(
            expected_terms.issubset(definition_terms),
            msg=f"Missing definitions: {expected_terms - definition_terms}",
        )
        self.assertGreaterEqual(len(self.section["usage"]), 6)
        self.assertEqual(len(self.section["implementationNotes"]), 3)

    def test_compliance_rules_examples_define_catalog_metadata_and_evidence(self):
        example_titles = {example["title"] for example in self.section["examples"]}
        expected_titles = {
            "Catalog discoverability checklist example",
            "Metadata completeness gate example",
            "Cross-cutting evidence record example",
            "Generator compliance guard example",
        }
        self.assertTrue(
            expected_titles.issubset(example_titles),
            msg=f"Missing examples: {expected_titles - example_titles}",
        )
        self.assertIn("## Tags", self.markdown)
        self.assertIn("## Formal definitions", self.markdown)
        self.assertIn("## Usage and implementation guidance", self.markdown)
        self.assertIn("### Example 1 — catalog discoverability checklist", self.markdown)
        self.assertIn('"conformanceProfile": "core-ui"', self.markdown)
        self.assertIn('"metadataComplete": true', self.markdown)
        self.assertIn("assertGeneratedComponentCompliance", self.markdown)

        example_match = re.search(
            r"### Example 1 — catalog discoverability checklist\s+```json\s*\n(.*?)\n```",
            self.markdown,
            re.DOTALL,
        )
        self.assertIsNotNone(example_match)
        example_json = json.loads(example_match.group(1))
        self.assertEqual(example_json["conformanceProfile"], "core-ui")
        self.assertIn(
            "sample.library.Button",
            example_json["catalog"]["libraries"][0]["components"],
        )

    def test_generated_examples_app_lists_compliance_example(self):
        docs_source = GENERATED_EXAMPLES_DOCS.read_text(encoding="utf-8")

        self.assertIn("id: 'compliance'", docs_source)
        self.assertIn("id: 'compliance-rules'", docs_source)
        self.assertIn("specPath: 'spec/21-compliance-rules.md'", docs_source)
        self.assertIn("preview: 'compliance-catalog'", docs_source)
        self.assertIn("preview: 'compliance-metadata'", docs_source)
        self.assertIn("preview: 'compliance-evidence'", docs_source)


if __name__ == "__main__":
    unittest.main()
