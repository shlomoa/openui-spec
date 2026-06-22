import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
INTERACTION_MODEL_MD = REPO_ROOT / "spec" / "09-interaction-model.md"
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


class InteractionModelSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.spec = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        cls.markdown = INTERACTION_MODEL_MD.read_text(encoding="utf-8")
        cls.section = next(
            section
            for section in cls.spec["specification"]["sections"]
            if section["id"] == "09-interaction-model"
        )

    def test_interaction_model_json_has_formal_contract(self):
        self.assertGreaterEqual(len(self.section["requirements"]), 7)
        self.assertEqual(len(self.section["nonGoals"]), 3)
        tag_names = {tag["name"] for tag in self.section["tags"]}
        expected_tags = {
            "semantic-interaction-event",
            "activation-event-contract",
            "enabled-state-gating",
            "pointer-keyboard-equivalence",
            "compatibility-alias",
        }
        self.assertTrue(
            expected_tags.issubset(tag_names),
            msg=f"Missing tags: {expected_tags - tag_names}",
        )
        self.assertGreaterEqual(len(tag_names), 5)
        self.assertEqual(len(self.section["formalDefinitions"]), 5)
        self.assertEqual(len(self.section["usage"]), 5)
        self.assertEqual(len(self.section["implementationNotes"]), 3)
        self.assertIn("## Implementation notes", self.markdown)
        self.assertIn(
            "private renderer listeners as normative events",
            self.markdown,
        )

    def test_interaction_model_examples_define_press_and_disabled_gate(self):
        example_titles = {example["title"] for example in self.section["examples"]}

        expected_titles = {
            "Button activation event contract example",
            "Enabled-state gating example",
            "Generator output handler binding example",
        }
        self.assertTrue(
            expected_titles.issubset(example_titles),
            msg=f"Missing examples: {expected_titles - example_titles}",
        )
        self.assertGreaterEqual(len(example_titles), 3)
        self.assertIn("### Example 1 — button activation event contract", self.markdown)
        self.assertIn('"press": {', self.markdown)
        self.assertIn('"enabledRequired": true', self.markdown)
        self.assertIn('"publicEvent": null', self.markdown)

        example_match = re.search(
            r"### Example 1 — button activation event contract\s+```json\s*\n(.*?)\n```",
            self.markdown,
            re.DOTALL,
        )
        self.assertIsNotNone(example_match)
        example_json = json.loads(example_match.group(1))
        press_event = example_json["events"]["press"]
        self.assertEqual(press_event["kind"], "activation")
        self.assertIn("keyboard", press_event["sources"])
        self.assertTrue(press_event["enabledRequired"])

    def test_generated_examples_app_lists_interaction_example(self):
        docs_source = GENERATED_EXAMPLES_DOCS.read_text(encoding="utf-8")

        self.assertIn("id: 'interaction'", docs_source)
        self.assertIn("id: 'action'", docs_source)
        self.assertIn("specPath: 'spec/09-interaction-model.md'", docs_source)
        self.assertIn("preview: 'action-enabled'", docs_source)
        self.assertIn("preview: 'action-disabled'", docs_source)
        self.assertIn('[disabled]="isSaving()"', docs_source)


if __name__ == "__main__":
    unittest.main()
