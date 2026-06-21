import json
import pathlib
import unittest

REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
LAYOUT_SYSTEM_MD = REPO_ROOT / "spec" / "07-layout-system.md"
TEST_ACCEPTANCE_MD = REPO_ROOT / "spec" / "22-test-acceptance-criteria.md"
EXPECTED_MIN_LAYOUT_SYSTEM_EXAMPLES = 4


def load_section(section_id: str) -> dict:
    data = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
    for section in data["specification"]["sections"]:
        if section["id"] == section_id:
            return section
    raise AssertionError(f"Missing section: {section_id}")


class LayoutSystemSpecTest(unittest.TestCase):
    def test_layout_system_json_is_populated(self) -> None:
        section = load_section("07-layout-system")

        self.assertIn("nonGoals", section)
        self.assertIn("tags", section)
        self.assertIn("formalDefinitions", section)
        self.assertIn("usage", section)
        self.assertIn("implementationNotes", section)

        tag_names = [tag["name"] for tag in section["tags"]]
        self.assertIn("composition-region", tag_names)
        self.assertIn("responsive-behavior", tag_names)
        self.assertIn("breakpoint-model", tag_names)
        self.assertIn("layout-density", tag_names)
        self.assertIn("spacing-scale", tag_names)
        self.assertIn("container-dnd", tag_names)

        definition_terms = [item["term"] for item in section["formalDefinitions"]]
        self.assertIn("Composition region", definition_terms)
        self.assertIn("Breakpoint", definition_terms)
        self.assertIn("Density", definition_terms)
        self.assertIn("Spacing scale", definition_terms)
        self.assertIn("Responsive behavior", definition_terms)

        example_titles = [example["title"] for example in section["examples"]]
        self.assertIn("Responsive grid across breakpoints example", example_titles)
        self.assertGreaterEqual(len(section["examples"]), EXPECTED_MIN_LAYOUT_SYSTEM_EXAMPLES)

    def test_layout_system_markdown_documents_layout_contract(self) -> None:
        content = LAYOUT_SYSTEM_MD.read_text(encoding="utf-8")

        self.assertIn("## Tags", content)
        self.assertIn("## Formal definitions", content)
        self.assertIn("## Usage and implementation guidance", content)
        self.assertIn("### Example 1 — ordered and named composition regions", content)
        self.assertIn("### Example 2 — responsive grid across breakpoints", content)
        self.assertIn('"breakpoints"', content)
        self.assertIn('"dnd"', content)

    def test_acceptance_criteria_covers_layout_system(self) -> None:
        section = load_section("22-test-acceptance-criteria")
        content = TEST_ACCEPTANCE_MD.read_text(encoding="utf-8")

        example_titles = [example["title"] for example in section["examples"]]

        self.assertIn("Layout system acceptance test", example_titles)
        self.assertIn("### Example 3 — layout system acceptance test", content)
        self.assertIn("verify that named regions such as", content)


if __name__ == "__main__":
    unittest.main()
