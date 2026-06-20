import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
FORM_MODEL_MD = REPO_ROOT / "spec" / "12-form-model.md"
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


class FormModelSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.spec = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        cls.markdown = FORM_MODEL_MD.read_text(encoding="utf-8")
        cls.section = next(
            section
            for section in cls.spec["specification"]["sections"]
            if section["id"] == "12-form-model"
        )

    def test_form_model_json_has_formal_contract(self):
        self.assertGreaterEqual(len(self.section["requirements"]), 7)
        self.assertEqual(len(self.section["nonGoals"]), 4)
        tag_names = {tag["name"] for tag in self.section["tags"]}
        expected_tags = {
            "form-content-interface",
            "label-association",
            "form-grouping",
            "validation-value-state",
            "submission-contract",
            "editable-enabled-gating",
        }
        self.assertTrue(
            expected_tags.issubset(tag_names),
            msg=f"Missing tags: {expected_tags - tag_names}",
        )
        definition_terms = {item["term"] for item in self.section["formalDefinitions"]}
        expected_terms = {
            "Form",
            "Form container",
            "Form element",
            "Form-content interface",
            "Label association",
            "Value state",
            "Submission event",
        }
        self.assertTrue(
            expected_terms.issubset(definition_terms),
            msg=f"Missing definitions: {expected_terms - definition_terms}",
        )
        self.assertEqual(len(self.section["usage"]), 5)
        self.assertEqual(len(self.section["implementationNotes"]), 3)

    def test_form_model_examples_define_structure_and_value_state(self):
        example_titles = {example["title"] for example in self.section["examples"]}
        expected_titles = {
            "Form structure and form-content interface example",
            "Label association and value-state example",
            "Submission and reset event contract example",
            "Generator output typed reactive form example",
        }
        self.assertTrue(
            expected_titles.issubset(example_titles),
            msg=f"Missing examples: {expected_titles - example_titles}",
        )
        self.assertGreaterEqual(len(example_titles), 4)

        self.assertIn("## Tags", self.markdown)
        self.assertIn("## Formal definitions", self.markdown)
        self.assertIn("## Usage and implementation guidance", self.markdown)
        self.assertIn("### Example 1 — form structure and form-content interface", self.markdown)
        self.assertIn("sap.ui.core.IFormContent", self.markdown)
        self.assertIn('"valueState"', self.markdown)
        self.assertIn('"submit"', self.markdown)

        example_match = re.search(
            r"### Example 1 — form structure and form-content interface\s+```json\s*\n(.*?)\n```",
            self.markdown,
            re.DOTALL,
        )
        self.assertIsNotNone(example_match)
        example_json = json.loads(example_match.group(1))
        field = example_json["formContainers"][0]["formElements"][0]["fields"][0]
        self.assertIn("sap.ui.core.IFormContent", field["interfaces"])

    def test_generated_examples_app_lists_form_example(self):
        docs_source = GENERATED_EXAMPLES_DOCS.read_text(encoding="utf-8")

        self.assertIn("id: 'form'", docs_source)
        self.assertIn("specPath: 'spec/12-form-model.md'", docs_source)
        self.assertIn("preview: 'form-order'", docs_source)
        self.assertIn("preview: 'form-filter'", docs_source)


if __name__ == "__main__":
    unittest.main()
