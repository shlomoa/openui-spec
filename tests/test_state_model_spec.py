import json
import pathlib
import re
import unittest

REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
STATE_MODEL_MD = REPO_ROOT / "spec" / "10-state-model.md"


def load_section(section_id: str) -> dict:
    data = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
    for section in data["specification"]["sections"]:
        if section["id"] == section_id:
            return section
    raise AssertionError(f"Missing section: {section_id}")


class StateModelSpecTest(unittest.TestCase):
    def test_state_model_json_has_structured_details(self) -> None:
        section = load_section("10-state-model")

        self.assertGreaterEqual(len(section["requirements"]), 5)
        self.assertEqual(len(section["nonGoals"]), 3)
        self.assertEqual(
            {tag["name"] for tag in section["tags"]},
            {
                "metadata-property-state",
                "explicit-default-state",
                "public-state-contract",
                "hidden-internal-state",
                "derived-state-compatibility",
            },
        )
        self.assertGreaterEqual(len(section["formalDefinitions"]), 5)
        self.assertGreaterEqual(len(section["usage"]), 5)
        self.assertGreaterEqual(len(section["implementationNotes"]), 3)

    def test_state_model_json_examples_cover_state_variants(self) -> None:
        section = load_section("10-state-model")
        example_titles = [example["title"] for example in section["examples"]]

        self.assertEqual(
            example_titles,
            [
                "Public typed state with defaults example",
                "Hidden internal state example",
                "Derived validation state example",
            ],
        )

    def test_state_model_markdown_contains_examples(self) -> None:
        content = STATE_MODEL_MD.read_text(encoding="utf-8")

        self.assertIn("## Tags", content)
        self.assertIn("## Formal definitions", content)
        self.assertIn("## Usage and implementation guidance", content)
        self.assertIn("### Example 2 — hidden state excluded from the public contract", content)
        self.assertIn('"visibility": "hidden"', content)
        self.assertIn("effectiveValueState", content)

        example_match = re.search(
            r"### Example 1 — public typed state with defaults\s+```json\s*\n(.*?)\n```",
            content,
            re.DOTALL,
        )
        self.assertIsNotNone(example_match)
        example_json = json.loads(example_match.group(1))
        self.assertEqual(example_json["component"], "sample.library.Button")
        self.assertEqual(
            example_json["metadata"]["properties"]["enabled"],
            {"type": "boolean", "defaultValue": True},
        )


if __name__ == "__main__":
    unittest.main()
