import json
import pathlib
import unittest

REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
COMPONENT_MODEL_MD = REPO_ROOT / "spec" / "08-component-model.md"
TEST_ACCEPTANCE_MD = REPO_ROOT / "spec" / "22-test-acceptance-criteria.md"
EXPECTED_MIN_COMPONENT_MODEL_EXAMPLES = 4


def load_section(section_id: str) -> dict:
    data = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
    for section in data["specification"]["sections"]:
        if section["id"] == section_id:
            return section
    raise AssertionError(f"Missing section: {section_id}")


class ComponentModelSpecTest(unittest.TestCase):
    def test_component_model_json_is_populated(self) -> None:
        section = load_section("08-component-model")

        self.assertIn("nonGoals", section)
        self.assertIn("tags", section)
        self.assertIn("formalDefinitions", section)
        self.assertIn("usage", section)
        self.assertIn("implementationNotes", section)

        tag_names = [tag["name"] for tag in section["tags"]]
        self.assertIn("property-contract", tag_names)
        self.assertIn("aggregation-contract", tag_names)
        self.assertIn("association-contract", tag_names)
        self.assertIn("event-contract", tag_names)

        definition_terms = [item["term"] for item in section["formalDefinitions"]]
        self.assertIn("Property", definition_terms)
        self.assertIn("Aggregation", definition_terms)
        self.assertIn("Association", definition_terms)
        self.assertIn("Event", definition_terms)
        self.assertIn("Multiplicity", definition_terms)

        example_titles = [example["title"] for example in section["examples"]]
        self.assertIn("Aggregations and multiplicity example", example_titles)
        self.assertGreaterEqual(len(section["examples"]), EXPECTED_MIN_COMPONENT_MODEL_EXAMPLES)

    def test_component_model_markdown_documents_metadata_contract(self) -> None:
        content = COMPONENT_MODEL_MD.read_text(encoding="utf-8")

        self.assertIn("## Tags", content)
        self.assertIn("## Formal definitions", content)
        self.assertIn("## Usage and implementation guidance", content)
        self.assertIn("### Example 2 — aggregations and multiplicity", content)
        self.assertIn('"multiple": true', content)
        self.assertIn("ariaLabelledBy", content)
        self.assertIn('"liveChange"', content)

    def test_acceptance_criteria_covers_component_model(self) -> None:
        section = load_section("22-test-acceptance-criteria")
        content = TEST_ACCEPTANCE_MD.read_text(encoding="utf-8")

        example_titles = [example["title"] for example in section["examples"]]

        self.assertIn("Component model acceptance test", example_titles)
        self.assertIn("### Example 3 — component model acceptance test", content)
        self.assertIn("verify that each component exposes a stable identity", content)


if __name__ == "__main__":
    unittest.main()
