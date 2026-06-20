import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
FEEDBACK_MODEL_MD = REPO_ROOT / "spec" / "14-feedback-model.md"
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


class FeedbackModelSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.spec = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        cls.markdown = FEEDBACK_MODEL_MD.read_text(encoding="utf-8")
        cls.section = next(
            section
            for section in cls.spec["specification"]["sections"]
            if section["id"] == "14-feedback-model"
        )

    def test_feedback_model_json_has_formal_contract(self):
        self.assertGreaterEqual(len(self.section["requirements"]), 7)
        self.assertEqual(len(self.section["nonGoals"]), 3)
        tag_names = {tag["name"] for tag in self.section["tags"]}
        expected_tags = {
            "busy-state-feedback",
            "message-severity",
            "dialog-feedback-contract",
            "empty-state-feedback",
            "feedback-live-region",
            "outcome-event-state",
        }
        self.assertTrue(
            expected_tags.issubset(tag_names),
            msg=f"Missing tags: {expected_tags - tag_names}",
        )
        definition_terms = {item["term"] for item in self.section["formalDefinitions"]}
        expected_terms = {"Busy state", "Message", "Severity", "Dialog feedback", "Empty state"}
        self.assertTrue(
            expected_terms.issubset(definition_terms),
            msg=f"Missing definitions: {expected_terms - definition_terms}",
        )
        self.assertGreaterEqual(len(self.section["usage"]), 5)
        self.assertEqual(len(self.section["implementationNotes"]), 3)

    def test_feedback_model_examples_define_busy_and_severity(self):
        example_titles = {example["title"] for example in self.section["examples"]}
        expected_titles = {
            "Busy-state feedback example",
            "Message severity example",
            "Dialog confirmation feedback example",
        }
        self.assertTrue(
            expected_titles.issubset(example_titles),
            msg=f"Missing examples: {expected_titles - example_titles}",
        )

        self.assertIn("## Tags", self.markdown)
        self.assertIn("## Formal definitions", self.markdown)
        self.assertIn("## Usage and implementation guidance", self.markdown)
        self.assertIn("### Example 1 — busy-state feedback", self.markdown)
        self.assertIn('"busy":', self.markdown)
        self.assertIn('"severity":', self.markdown)
        self.assertIn('"confirm":', self.markdown)
        self.assertIn('"cancel":', self.markdown)

        example_match = re.search(
            r"### Example 1 — busy-state feedback\s+```json\s*\n(.*?)\n```",
            self.markdown,
            re.DOTALL,
        )
        self.assertIsNotNone(example_match)
        example_json = json.loads(example_match.group(1))
        busy_property = example_json["metadata"]["properties"]["busy"]
        self.assertEqual(busy_property["type"], "boolean")
        self.assertTrue(busy_property["bindable"])

    def test_generated_examples_app_lists_feedback_example(self):
        docs_source = GENERATED_EXAMPLES_DOCS.read_text(encoding="utf-8")

        self.assertIn("id: 'feedback'", docs_source)
        self.assertIn("specPath: 'spec/14-feedback-model.md'", docs_source)
        self.assertIn("preview: 'feedback-busy'", docs_source)
        self.assertIn("preview: 'feedback-message'", docs_source)
        self.assertIn("preview: 'feedback-empty'", docs_source)


if __name__ == "__main__":
    unittest.main()
