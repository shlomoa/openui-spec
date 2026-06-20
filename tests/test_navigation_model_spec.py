import json
import pathlib
import unittest

REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
NAVIGATION_MODEL_MD = REPO_ROOT / "spec" / "13-navigation-model.md"


class NavigationModelSpecTest(unittest.TestCase):
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
                if section["id"] == "13-navigation-model"
            ),
            None,
        )
        if cls.section is None:
            raise AssertionError("Missing section: 13-navigation-model")
        cls.markdown = NAVIGATION_MODEL_MD.read_text(encoding="utf-8")

    def test_navigation_model_json_has_structured_details(self) -> None:
        self.assertGreaterEqual(len(self.section["requirements"]), 5)
        self.assertEqual(len(self.section["nonGoals"]), 3)
        self.assertEqual(
            {tag["name"] for tag in self.section["tags"]},
            {
                "navigable-container",
                "navigation-events",
                "overlay-navigation",
                "shell-composition",
                "route-deep-linking",
            },
        )
        self.assertGreaterEqual(len(self.section["formalDefinitions"]), 5)
        self.assertGreaterEqual(len(self.section["usage"]), 5)
        self.assertGreaterEqual(len(self.section["implementationNotes"]), 3)

    def test_navigation_model_json_examples_cover_navigation_variants(self) -> None:
        example_titles = [example["title"] for example in self.section["examples"]]

        self.assertEqual(
            example_titles,
            [
                "Navigable page container example",
                "Navigation events example",
                "Overlay navigation example",
                "Shell composition and deep-linking example",
            ],
        )

    def test_navigation_model_markdown_contains_examples(self) -> None:
        self.assertIn("## Tags", self.markdown)
        self.assertIn("## Formal definitions", self.markdown)
        self.assertIn("## Usage and implementation guidance", self.markdown)
        self.assertIn("### Example 1 — navigable page container", self.markdown)
        self.assertIn("### Example 3 — overlay navigation", self.markdown)
        self.assertIn('"open": { "type": "boolean", "defaultValue": false }', self.markdown)
        self.assertIn('"pattern": "orders/{orderId}"', self.markdown)
        self.assertIn("afterNavigate", self.markdown)


if __name__ == "__main__":
    unittest.main()
