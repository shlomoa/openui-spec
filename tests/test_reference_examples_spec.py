import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
REFERENCE_EXAMPLES_MD = REPO_ROOT / "spec" / "23-reference-examples.md"


class ReferenceExamplesSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.spec = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        cls.markdown = REFERENCE_EXAMPLES_MD.read_text(encoding="utf-8")
        cls.section = next(
            section
            for section in cls.spec["specification"]["sections"]
            if section["id"] == "23-reference-examples"
        )

    def test_reference_examples_json_has_formal_contract(self):
        self.assertGreaterEqual(len(self.section["requirements"]), 8)
        self.assertEqual(len(self.section["nonGoals"]), 4)

        tag_names = {tag["name"] for tag in self.section["tags"]}
        expected_tags = {
            "reference-component-evidence",
            "action-component-contract",
            "public-property-surface",
            "accessibility-association-surface",
            "activation-event-surface",
            "optional-capability-evidence",
            "behavioral-validation-evidence",
        }
        self.assertTrue(
            expected_tags.issubset(tag_names),
            msg=f"Missing tags: {expected_tags - tag_names}",
        )

        definition_terms = {item["term"] for item in self.section["formalDefinitions"]}
        expected_terms = {
            "Reference example",
            "Reference action component",
            "Evidence metadata",
            "Public property surface",
            "Compatibility event alias",
            "Optional capability",
            "Reference validation expectation",
        }
        self.assertTrue(
            expected_terms.issubset(definition_terms),
            msg=f"Missing definitions: {expected_terms - definition_terms}",
        )
        self.assertEqual(len(self.section["usage"]), 7)
        self.assertEqual(len(self.section["implementationNotes"]), 3)

    def test_reference_examples_define_button_contract(self):
        example_titles = {example["title"] for example in self.section["examples"]}
        expected_titles = {
            "Reference action component metadata example",
            "Accessibility associations and activation event example",
            "Optional capabilities and hidden evidence example",
            "Behavioral validation expectations example",
        }
        self.assertTrue(
            expected_titles.issubset(example_titles),
            msg=f"Missing examples: {expected_titles - example_titles}",
        )

        self.assertIn("## Tags", self.markdown)
        self.assertIn("## Formal definitions", self.markdown)
        self.assertIn("## Usage and implementation guidance", self.markdown)
        self.assertIn("### Example 1 — reference action component metadata", self.markdown)
        self.assertIn("sap.m.Button", self.markdown)
        self.assertIn('"press"', self.markdown)
        self.assertIn('"ariaLabelledBy"', self.markdown)
        self.assertIn('"draggable": true', self.markdown)

        example_match = re.search(
            r"### Example 1 — reference action component metadata\s+```json\s*\n(.*?)\n```",
            self.markdown,
            re.DOTALL,
        )
        self.assertIsNotNone(example_match)
        example_json = json.loads(example_match.group(1))
        properties = example_json["metadata"]["properties"]
        self.assertEqual(example_json["component"], "sap.m.Button")
        self.assertEqual(properties["enabled"]["defaultValue"], True)
        self.assertEqual(properties["ariaHasPopup"]["defaultValue"], "None")


if __name__ == "__main__":
    unittest.main()
