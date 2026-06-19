import json
import pathlib
import unittest

REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
STATE_MODEL_MD = REPO_ROOT / "spec" / "10-state-model.md"


class StateModelSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        spec = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        cls.section = next(
            section
            for section in spec["specification"]["sections"]
            if section["id"] == "10-state-model"
        )
        cls.markdown = STATE_MODEL_MD.read_text(encoding="utf-8")

    def test_state_model_json_has_structured_details(self) -> None:
        self.assertGreaterEqual(len(self.section["requirements"]), 5)
        self.assertEqual(len(self.section["nonGoals"]), 3)
        self.assertEqual(
            {tag["name"] for tag in self.section["tags"]},
            {
                "metadata-property-state",
                "explicit-default-state",
                "public-state-contract",
                "hidden-internal-state",
                "derived-state-compatibility",
            },
        )
        self.assertGreaterEqual(len(self.section["formalDefinitions"]), 5)
        self.assertGreaterEqual(len(self.section["usage"]), 5)
        self.assertGreaterEqual(len(self.section["implementationNotes"]), 3)

    def test_state_model_json_examples_cover_state_variants(self) -> None:
        example_titles = [example["title"] for example in self.section["examples"]]

        self.assertEqual(
            example_titles,
            [
                "Public typed state with defaults example",
                "Hidden internal state example",
                "Derived validation state example",
            ],
        )

    def test_state_model_markdown_contains_examples(self) -> None:
        self.assertIn("## Tags", self.markdown)
        self.assertIn("## Formal definitions", self.markdown)
        self.assertIn("## Usage and implementation guidance", self.markdown)
        self.assertIn(
            "### Example 2 — hidden state excluded from the public contract",
            self.markdown,
        )
        self.assertIn('"text": { "type": "string", "defaultValue": "" }', self.markdown)
        self.assertIn('"visibility": "hidden"', self.markdown)
        self.assertIn("effectiveValueState", self.markdown)


if __name__ == "__main__":
    unittest.main()
