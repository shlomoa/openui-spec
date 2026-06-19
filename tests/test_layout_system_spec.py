import json
import pathlib
import unittest

REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
LAYOUT_SYSTEM_MD = REPO_ROOT / "spec" / "07-layout-system.md"
TEST_ACCEPTANCE_MD = REPO_ROOT / "spec" / "22-test-acceptance-criteria.md"
EXPECTED_MIN_LAYOUT_SYSTEM_EXAMPLES = 5


def load_section(section_id: str) -> dict:
    data = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
    for section in data["specification"]["sections"]:
        if section["id"] == section_id:
            return section
    raise AssertionError(f"Missing section: {section_id}")


class LayoutSystemSpecTest(unittest.TestCase):
    def test_layout_system_json_has_required_fields(self) -> None:
        section = load_section("07-layout-system")

        self.assertIn("tags", section)
        self.assertIn("formalDefinitions", section)
        self.assertIn("implementationNotes", section)
        self.assertIn("usage", section)
        self.assertIn("examples", section)
        self.assertIn("nonGoals", section)

    def test_layout_system_json_has_minimum_examples(self) -> None:
        section = load_section("07-layout-system")

        self.assertGreaterEqual(len(section["examples"]), EXPECTED_MIN_LAYOUT_SYSTEM_EXAMPLES)

    def test_layout_system_json_has_expected_tags(self) -> None:
        section = load_section("07-layout-system")

        tag_names = [tag["name"] for tag in section["tags"]]

        self.assertIn("aggregation-based-layout", tag_names)
        self.assertIn("responsive-layout-contract", tag_names)
        self.assertIn("container-arrangement-strategy", tag_names)
        self.assertIn("spacing-and-sizing-properties", tag_names)
        self.assertIn("breakpoint-awareness", tag_names)
        self.assertIn("drag-and-drop-layout", tag_names)

    def test_layout_system_json_has_expected_formal_definitions(self) -> None:
        section = load_section("07-layout-system")

        terms = [d["term"] for d in section["formalDefinitions"]]

        self.assertIn("Layout container", terms)
        self.assertIn("Composition region", terms)
        self.assertIn("Arrangement strategy", terms)
        self.assertIn("Breakpoint", terms)
        self.assertIn("Drag-and-drop layout declaration", terms)

    def test_layout_system_json_has_dnd_example(self) -> None:
        section = load_section("07-layout-system")

        example_titles = [example["title"] for example in section["examples"]]

        self.assertIn("Drag-and-drop layout declaration example", example_titles)

    def test_layout_system_markdown_has_grid_example(self) -> None:
        content = LAYOUT_SYSTEM_MD.read_text(encoding="utf-8")

        self.assertIn("### Example 1 — grid layout container", content)
        self.assertIn('"columnsXL": { "type": "int", "defaultValue": 4 }', content)
        self.assertIn('"gap": { "type": "sap.ui.core.CSSSize"', content)

    def test_layout_system_markdown_has_dnd_example(self) -> None:
        content = LAYOUT_SYSTEM_MD.read_text(encoding="utf-8")

        self.assertIn("### Example 4 — drag-and-drop layout declaration", content)
        self.assertIn('"droppable": true', content)
        self.assertIn('"draggable": false', content)

    def test_layout_system_markdown_has_tags_section(self) -> None:
        content = LAYOUT_SYSTEM_MD.read_text(encoding="utf-8")

        self.assertIn("## Tags", content)
        self.assertIn("`aggregation-based-layout`", content)
        self.assertIn("`responsive-layout-contract`", content)
        self.assertIn("`breakpoint-awareness`", content)

    def test_layout_system_markdown_has_formal_definitions(self) -> None:
        content = LAYOUT_SYSTEM_MD.read_text(encoding="utf-8")

        self.assertIn("## Formal definitions", content)
        self.assertIn("**Layout container**", content)
        self.assertIn("**Arrangement strategy**", content)
        self.assertIn("**Breakpoint**", content)

    def test_acceptance_criteria_covers_layout_system(self) -> None:
        section = load_section("22-test-acceptance-criteria")
        content = TEST_ACCEPTANCE_MD.read_text(encoding="utf-8")

        example_titles = [example["title"] for example in section["examples"]]

        self.assertIn("Layout system acceptance test", example_titles)
        self.assertIn(
            "verify that layout containers declare aggregations for spatial regions",
            content,
        )
        self.assertIn(
            "verify that drag-and-drop layout behavior is only present when explicitly declared",
            content,
        )


if __name__ == "__main__":
    unittest.main()
