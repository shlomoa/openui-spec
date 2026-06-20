import json
import pathlib
import unittest

REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
APPLICATION_STRUCTURE_MD = REPO_ROOT / "spec" / "06-application-structure.md"
TEST_ACCEPTANCE_MD = REPO_ROOT / "spec" / "22-test-acceptance-criteria.md"
EXPECTED_MIN_APPLICATION_STRUCTURE_EXAMPLES = 4


def load_section(section_id: str) -> dict:
    data = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
    for section in data["specification"]["sections"]:
        if section["id"] == section_id:
            return section
    raise AssertionError(f"Missing section: {section_id}")


class ApplicationStructureSpecTest(unittest.TestCase):
    def test_application_structure_section_has_enhanced_structure(self) -> None:
        section = load_section("06-application-structure")

        self.assertGreaterEqual(len(section["requirements"]), 6)
        self.assertEqual(len(section["nonGoals"]), 3)
        self.assertGreaterEqual(len(section["tags"]), 5)
        self.assertGreaterEqual(len(section["formalDefinitions"]), 5)
        self.assertGreaterEqual(len(section["usage"]), 5)
        self.assertGreaterEqual(len(section["implementationNotes"]), 3)
        self.assertGreaterEqual(
            len(section["examples"]), EXPECTED_MIN_APPLICATION_STRUCTURE_EXAMPLES
        )

    def test_application_structure_json_has_expected_examples(self) -> None:
        section = load_section("06-application-structure")

        example_titles = [example["title"] for example in section["examples"]]

        self.assertIn("Explicit library dependencies example", example_titles)
        self.assertIn("Shell-level structure example", example_titles)
        self.assertIn("Page hierarchy example", example_titles)
        self.assertIn("Resolved application structure tree example", example_titles)

    def test_application_structure_markdown_has_enhanced_sections(self) -> None:
        content = APPLICATION_STRUCTURE_MD.read_text(encoding="utf-8")

        self.assertIn("## Non-goals", content)
        self.assertIn("## Tags", content)
        self.assertIn("## Formal definitions", content)
        self.assertIn("## Usage and implementation guidance", content)
        self.assertIn(
            "### Example 2 — shell-level structure with global navigation".casefold(),
            content.casefold(),
        )
        self.assertIn(
            '"navigation": { "type": "sample.library.NavList", "multiple": false }', content
        )
        self.assertIn('"currentPage"', content)

    def test_acceptance_criteria_covers_application_structure(self) -> None:
        section = load_section("22-test-acceptance-criteria")
        content = TEST_ACCEPTANCE_MD.read_text(encoding="utf-8")

        example_titles = [example["title"] for example in section["examples"]]

        self.assertIn("Application structure acceptance test", example_titles)
        self.assertIn(
            "verify that every component referenced by the application structure resolves",
            content,
        )
        self.assertIn("verify that the shell exposes global navigation and owned pages", content)
        self.assertIn("verify that non-owning references such as `currentPage`", content)


if __name__ == "__main__":
    unittest.main()
