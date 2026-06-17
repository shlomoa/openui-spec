import json
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
DESIGN_PRINCIPLES_MD = REPO_ROOT / "spec" / "03-design-principles.md"


class DesignPrinciplesSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.spec = json.loads(OPENUI_JSON.read_text())
        cls.markdown = DESIGN_PRINCIPLES_MD.read_text()
        cls.section = next(
            section
            for section in cls.spec["specification"]["sections"]
            if section["id"] == "03-design-principles"
        )

    def test_design_principles_section_has_enhanced_structure(self):
        self.assertGreaterEqual(len(self.section["requirements"]), 6)
        self.assertEqual(len(self.section["nonGoals"]), 3)
        self.assertGreaterEqual(len(self.section["tags"]), 5)
        self.assertGreaterEqual(len(self.section["formalDefinitions"]), 5)
        self.assertGreaterEqual(len(self.section["usage"]), 5)
        self.assertGreaterEqual(len(self.section["implementationNotes"]), 3)

    def test_design_principles_json_contains_new_conflicting_evidence_example(self):
        example_titles = {example["title"] for example in self.section["examples"]}
        self.assertIn("Conflicting evidence resolution example", example_titles)

    def test_markdown_contains_enhanced_sections_and_example(self):
        self.assertIn("## Non-goals", self.markdown)
        self.assertIn("## Tags", self.markdown)
        self.assertIn("## Formal definitions", self.markdown)
        self.assertIn("## Usage and implementation guidance", self.markdown)
        self.assertIn(
            "### Example 4 — conflicting evidence resolution".casefold(),
            self.markdown.casefold(),
        )


if __name__ == "__main__":
    unittest.main()
