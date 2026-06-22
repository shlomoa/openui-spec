import json
import pathlib
import unittest

REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
DATA_BINDING_MODEL_MD = REPO_ROOT / "spec" / "11-data-binding-model.md"


class DataBindingModelSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        try:
            spec = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        except json.JSONDecodeError as error:
            raise AssertionError(f"Invalid openui.json: {error}") from error
        cls.section = next(
            (
                section
                for section in spec["specification"]["sections"]
                if section["id"] == "11-data-binding-model"
            ),
            None,
        )
        if cls.section is None:
            raise AssertionError("Missing section: 11-data-binding-model")
        cls.markdown = DATA_BINDING_MODEL_MD.read_text(encoding="utf-8")

    def test_data_binding_model_json_has_structured_details(self) -> None:
        self.assertGreaterEqual(len(self.section["requirements"]), 5)
        self.assertEqual(len(self.section["nonGoals"]), 3)
        self.assertEqual(
            {tag["name"] for tag in self.section["tags"]},
            {
                "bindable-contract",
                "property-binding",
                "aggregation-binding",
                "binding-path-context",
                "type-preserving-updates",
            },
        )
        self.assertGreaterEqual(len(self.section["formalDefinitions"]), 5)
        self.assertGreaterEqual(len(self.section["usage"]), 5)
        self.assertGreaterEqual(len(self.section["implementationNotes"]), 3)

    def test_data_binding_model_json_examples_cover_binding_variants(self) -> None:
        example_titles = [example["title"] for example in self.section["examples"]]

        self.assertEqual(
            example_titles,
            [
                "Scalar property binding example",
                "Aggregation list binding example",
                "Type-preserving async update example",
            ],
        )

    def test_data_binding_model_markdown_contains_examples(self) -> None:
        self.assertIn("## Tags", self.markdown)
        self.assertIn("## Formal definitions", self.markdown)
        self.assertIn("## Usage and implementation guidance", self.markdown)
        self.assertIn("## Angular Material generator materialization", self.markdown)
        self.assertIn(
            "### Example 2 — aggregation list binding with a template",
            self.markdown,
        )
        self.assertIn('"bindable": true', self.markdown)
        self.assertIn('"kind": "aggregation"', self.markdown)
        self.assertIn("ValueState", self.markdown)


if __name__ == "__main__":
    unittest.main()
