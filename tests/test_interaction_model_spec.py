import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
INTERACTION_MODEL_MD = REPO_ROOT / "spec" / "09-interaction-model.md"
GENERATED_EXAMPLES_APP = (
    REPO_ROOT / "generators" / "angular" / "generated-examples" / "src" / "app" / "app.ts"
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
        self.assertEqual(
            {tag["name"] for tag in self.section["tags"]},
            {
                "semantic-interaction-event",
                "activation-event-contract",
                "enabled-state-gating",
                "pointer-keyboard-equivalence",
                "compatibility-alias",
            },
        )
        self.assertEqual(len(self.section["formalDefinitions"]), 5)
        self.assertEqual(len(self.section["usage"]), 5)
        self.assertEqual(len(self.section["implementationNotes"]), 3)

    def test_interaction_model_examples_define_press_and_disabled_gate(self):
        example_titles = [example["title"] for example in self.section["examples"]]

        self.assertEqual(
            example_titles,
            [
                "Button activation event contract example",
                "Enabled-state gating example",
                "Generated handler binding example",
            ],
        )
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
        app_source = GENERATED_EXAMPLES_APP.read_text(encoding="utf-8")

        self.assertIn("Generated interaction", app_source)
        self.assertIn("Interaction Model + Button press", app_source)
        self.assertIn("previewType: 'interaction'", app_source)


if __name__ == "__main__":
    unittest.main()
