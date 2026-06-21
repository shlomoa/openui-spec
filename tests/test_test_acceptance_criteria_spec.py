import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
TEST_ACCEPTANCE_MD = REPO_ROOT / "spec" / "22-test-acceptance-criteria.md"


class TestAcceptanceCriteriaSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.spec = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        cls.markdown = TEST_ACCEPTANCE_MD.read_text(encoding="utf-8")
        cls.section = next(
            section
            for section in cls.spec["specification"]["sections"]
            if section["id"] == "22-test-acceptance-criteria"
        )

    def test_acceptance_criteria_json_has_formal_contract(self):
        self.assertGreaterEqual(len(self.section["requirements"]), 7)
        self.assertEqual(len(self.section["nonGoals"]), 4)

        tag_names = {tag["name"] for tag in self.section["tags"]}
        expected_tags = {
            "acceptance-criterion",
            "conformance-suite",
            "metadata-projection-test",
            "runtime-behavior-test",
            "visual-accessibility-evidence",
            "traceability-matrix",
        }
        self.assertTrue(
            expected_tags.issubset(tag_names),
            msg=f"Missing tags: {expected_tags - tag_names}",
        )

        definition_terms = {item["term"] for item in self.section["formalDefinitions"]}
        expected_terms = {
            "Acceptance criterion",
            "Conformance suite",
            "Test fixture",
            "Metadata projection",
            "Evidence artifact",
            "Traceability matrix",
        }
        self.assertTrue(
            expected_terms.issubset(definition_terms),
            msg=f"Missing definitions: {expected_terms - definition_terms}",
        )
        self.assertGreaterEqual(len(self.section["usage"]), 8)
        self.assertEqual(len(self.section["implementationNotes"]), 4)

    def test_acceptance_criteria_markdown_documents_verification_contract(self):
        self.assertIn("## Non-goals", self.markdown)
        self.assertIn("## Tags", self.markdown)
        self.assertIn("## Formal definitions", self.markdown)
        self.assertIn("## Usage and implementation guidance", self.markdown)
        self.assertIn("## Implementation notes", self.markdown)
        self.assertIn("traceability matrix", self.markdown)
        self.assertIn("metadata projections", self.markdown)
        self.assertIn("visual and accessibility evidence", self.markdown)
        self.assertIn("generated examples", self.markdown)

    def test_acceptance_examples_cover_traceability_projection_and_evidence(self):
        example_titles = {example["title"] for example in self.section["examples"]}
        expected_titles = {
            "Traceability matrix for acceptance coverage",
            "Metadata projection consistency criterion",
            "Visual and accessibility evidence criterion",
        }
        self.assertTrue(
            expected_titles.issubset(example_titles),
            msg=f"Missing examples: {expected_titles - example_titles}",
        )
        self.assertGreaterEqual(len(example_titles), 7)

        example_match = re.search(
            r"### Example 5 — traceability matrix for acceptance coverage\s+```json\s*\n(.*?)\n```",
            self.markdown,
            re.DOTALL,
        )
        self.assertIsNotNone(example_match)
        example_json = json.loads(example_match.group(1))
        criteria = example_json["criteria"]
        self.assertEqual(criteria[0]["id"], "AC-METADATA-PROJECTION")
        self.assertIn("08-component-model#property-contract", criteria[0]["covers"])
        self.assertIn("screenshots/accessible-field.png", criteria[1]["evidence"])


if __name__ == "__main__":
    unittest.main()
