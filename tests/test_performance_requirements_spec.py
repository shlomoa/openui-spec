import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
PERFORMANCE_MODEL_MD = REPO_ROOT / "spec" / "19-performance-requirements.md"
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


class PerformanceRequirementsSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.spec = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        cls.markdown = PERFORMANCE_MODEL_MD.read_text(encoding="utf-8")
        cls.section = next(
            section
            for section in cls.spec["specification"]["sections"]
            if section["id"] == "19-performance-requirements"
        )

    def test_performance_requirements_json_has_formal_contract(self):
        self.assertGreaterEqual(len(self.section["requirements"]), 7)
        self.assertEqual(len(self.section["nonGoals"]), 4)
        tag_names = {tag["name"] for tag in self.section["tags"]}
        expected_tags = {
            "eager-discovery-lazy-detail",
            "api-projection-cacheable",
            "lazy-conditional-loading",
            "aggregation-virtualization",
            "projection-caching",
            "observable-performance-state",
        }
        self.assertTrue(
            expected_tags.issubset(tag_names),
            msg=f"Missing tags: {expected_tags - tag_names}",
        )
        definition_terms = {item["term"] for item in self.section["formalDefinitions"]}
        expected_terms = {
            "Performance budget",
            "Eager discovery",
            "Lazy loading",
            "Conditional loading",
            "Virtualization",
            "API projection",
            "Projection cache",
        }
        self.assertTrue(
            expected_terms.issubset(definition_terms),
            msg=f"Missing definitions: {expected_terms - definition_terms}",
        )
        self.assertGreaterEqual(len(self.section["usage"]), 5)
        self.assertEqual(len(self.section["implementationNotes"]), 3)

    def test_performance_requirements_examples_define_lazy_and_virtualization(self):
        example_titles = {example["title"] for example in self.section["examples"]}
        expected_titles = {
            "Eager discovery with lazy detail example",
            "Cacheable API projection example",
            "Aggregation virtualization budget example",
            "Generator output lazy route and virtual scroll example",
        }
        self.assertTrue(
            expected_titles.issubset(example_titles),
            msg=f"Missing examples: {expected_titles - example_titles}",
        )

        self.assertIn("## Tags", self.markdown)
        self.assertIn("## Formal definitions", self.markdown)
        self.assertIn("## Usage and implementation guidance", self.markdown)
        self.assertIn("### Example 1 — eager discovery with lazy detail", self.markdown)
        self.assertIn('"lazy":', self.markdown)
        self.assertIn('"on-demand"', self.markdown)
        self.assertIn('"immutable":', self.markdown)
        self.assertIn('"virtualized":', self.markdown)
        self.assertIn("cdk-virtual-scroll-viewport", self.markdown)

        example_match = re.search(
            r"### Example 1 — eager discovery with lazy detail\s+```json\s*\n(.*?)\n```",
            self.markdown,
            re.DOTALL,
        )
        self.assertIsNotNone(example_match)
        example_json = json.loads(example_match.group(1))
        self.assertEqual(example_json["detail"]["load"], "on-demand")
        self.assertTrue(all(component["lazy"] for component in example_json["components"]))

    def test_generated_examples_app_lists_performance_example(self):
        docs_source = GENERATED_EXAMPLES_DOCS.read_text(encoding="utf-8")

        self.assertIn("id: 'performance-budgets'", docs_source)
        self.assertIn("specPath: 'spec/19-performance-requirements.md'", docs_source)
        self.assertIn("preview: 'performance-lazy'", docs_source)
        self.assertIn("preview: 'performance-virtualization'", docs_source)
        self.assertIn("preview: 'performance-projection'", docs_source)


if __name__ == "__main__":
    unittest.main()
