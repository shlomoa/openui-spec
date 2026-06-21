import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
EXTENSION_MODEL_MD = REPO_ROOT / "spec" / "20-extension-model.md"
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


class ExtensionModelSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.spec = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        cls.markdown = EXTENSION_MODEL_MD.read_text(encoding="utf-8")
        cls.section = next(
            section
            for section in cls.spec["specification"]["sections"]
            if section["id"] == "20-extension-model"
        )

    def test_extension_model_json_has_formal_contract(self):
        self.assertGreaterEqual(len(self.section["requirements"]), 9)
        self.assertEqual(len(self.section["nonGoals"]), 4)
        tag_names = {tag["name"] for tag in self.section["tags"]}
        expected_tags = {
            "extension-artifact",
            "extension-point-contract",
            "metadata-extension",
            "design-time-extension",
            "renderer-extension",
            "drag-drop-extension",
            "compatibility-gate",
        }
        self.assertTrue(
            expected_tags.issubset(tag_names),
            msg=f"Missing tags: {expected_tags - tag_names}",
        )
        definition_terms = {item["term"] for item in self.section["formalDefinitions"]}
        expected_terms = {
            "Extension artifact",
            "Extension point",
            "Metadata extension",
            "Design-time extension",
            "Renderer extension",
            "Drag-and-drop extension",
            "Compatibility gate",
        }
        self.assertTrue(
            expected_terms.issubset(definition_terms),
            msg=f"Missing definitions: {expected_terms - definition_terms}",
        )
        self.assertEqual(len(self.section["usage"]), 7)
        self.assertEqual(len(self.section["implementationNotes"]), 3)

    def test_extension_model_examples_define_extension_points_and_design_time(self):
        example_titles = {example["title"] for example in self.section["examples"]}
        expected_titles = {
            "Extension artifact and public extension point example",
            "Design-time metadata overlay example",
            "Renderer and drag-and-drop extension contract example",
            "Generator extension outlet example",
        }
        self.assertTrue(
            expected_titles.issubset(example_titles),
            msg=f"Missing examples: {expected_titles - example_titles}",
        )

        self.assertIn("## Tags", self.markdown)
        self.assertIn("## Formal definitions", self.markdown)
        self.assertIn("## Usage and implementation guidance", self.markdown)
        self.assertIn(
            "### Example 1 — extension artifact and public extension point",
            self.markdown,
        )
        self.assertIn('"extensionPoints"', self.markdown)
        self.assertIn('"designTime"', self.markdown)
        self.assertIn('"dragDrop"', self.markdown)
        self.assertIn("NgComponentOutlet", self.markdown)

        example_match = re.search(
            r"### Example 1 — extension artifact and public extension point"
            r"\s+```json\s*\n(.*?)\n```",
            self.markdown,
            re.DOTALL,
        )
        self.assertIsNotNone(example_match)
        example_json = json.loads(example_match.group(1))
        extension_point = example_json["extensionPoints"][0]
        self.assertEqual(extension_point["name"], "workspace.cards")
        self.assertTrue(extension_point["multiple"])

    def test_generated_examples_app_lists_extension_example(self):
        docs_source = GENERATED_EXAMPLES_DOCS.read_text(encoding="utf-8")

        self.assertIn("id: 'extension-point'", docs_source)
        self.assertIn("specPath: 'spec/20-extension-model.md'", docs_source)
        self.assertIn("preview: 'extension-slot'", docs_source)
        self.assertIn("preview: 'extension-design-time'", docs_source)
        self.assertIn("preview: 'extension-dnd'", docs_source)


if __name__ == "__main__":
    unittest.main()
