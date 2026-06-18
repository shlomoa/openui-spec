import json
import pathlib
import unittest


REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
UI_CONCEPT_MODEL_MD = REPO_ROOT / "spec" / "05-ui-concept-model.md"
TEST_ACCEPTANCE_MD = REPO_ROOT / "spec" / "22-test-acceptance-criteria.md"
EXPECTED_MIN_UI_CONCEPT_MODEL_EXAMPLES = 4


def load_section(section_id: str) -> dict:
    data = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
    for section in data["specification"]["sections"]:
        if section["id"] == section_id:
            return section
    raise AssertionError(f"Missing section: {section_id}")


class UiConceptModelSpecTest(unittest.TestCase):
    def test_ui_concept_model_json_has_added_example(self) -> None:
        section = load_section("05-ui-concept-model")

        example_titles = [example["title"] for example in section["examples"]]

        self.assertIn("Dialog composition and semantic references example", example_titles)
        self.assertGreaterEqual(
            len(section["examples"]), EXPECTED_MIN_UI_CONCEPT_MODEL_EXAMPLES
        )
        self.assertIn("tags", section)
        self.assertIn("formalDefinitions", section)
        self.assertIn("implementationNotes", section)

    def test_ui_concept_model_markdown_has_dialog_example(self) -> None:
        content = UI_CONCEPT_MODEL_MD.read_text(encoding="utf-8")

        self.assertIn("### Example 4 — dialog composition and semantic references", content)
        self.assertIn('"beginButton": {"type": "sap.ui.core.Control", "multiple": false}', content)
        self.assertIn("ariaDescribedBy", content)

    def test_acceptance_criteria_covers_ui_concept_model_enhancement(self) -> None:
        section = load_section("22-test-acceptance-criteria")
        content = TEST_ACCEPTANCE_MD.read_text(encoding="utf-8")

        example_titles = [example["title"] for example in section["examples"]]

        self.assertIn("UI concept model acceptance test", example_titles)
        self.assertIn("verify that the published symbols are classified as controls or elements", content)
        self.assertIn("verify that `content`, `header`, `footer`, `beginButton`", content)
        self.assertIn("verify that semantic references such as `ariaLabelledBy`", content)


if __name__ == "__main__":
    unittest.main()
