import json
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
TARGET_USERS_MD = REPO_ROOT / "spec" / "04-target-users.md"


class TargetUsersSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.spec = json.loads(OPENUI_JSON.read_text(encoding="utf-8"))
        cls.markdown = TARGET_USERS_MD.read_text(encoding="utf-8")
        cls.section = next(
            section
            for section in cls.spec["specification"]["sections"]
            if section["id"] == "04-target-users"
        )

    def test_target_users_section_lists_expected_audiences(self):
        requirements = self.section["requirements"]
        self.assertEqual(len(requirements), 5)
        self.assertTrue(
            any("Application developers" in requirement for requirement in requirements)
        )
        self.assertTrue(
            any("Designers and UX owners" in requirement for requirement in requirements)
        )
        self.assertTrue(
            any("Framework maintainers" in requirement for requirement in requirements)
        )
        self.assertTrue(
            any(
                "Generator and tooling maintainers" in requirement
                for requirement in requirements
            )
        )
        self.assertTrue(
            any(
                "Documentation and compliance authors" in requirement
                for requirement in requirements
            )
        )

    def test_target_users_section_has_expected_structured_metadata(self):
        self.assertEqual(
            [tag["name"] for tag in self.section["tags"]],
            [
                "application-consumer",
                "design-consumer",
                "implementation-consumer",
                "tooling-consumer",
                "shared-contract",
            ],
        )
        self.assertEqual(len(self.section["formalDefinitions"]), 5)
        self.assertEqual(len(self.section["usage"]), 3)
        self.assertEqual(len(self.section["implementationNotes"]), 3)

    def test_target_users_examples_cover_all_added_audiences(self):
        example_titles = [example["title"] for example in self.section["examples"]]
        self.assertEqual(
            example_titles,
            [
                "Application developer usage example",
                "Designer and UX owner usage example",
                "Framework and tooling maintainer usage example",
                "Documentation and compliance author usage example",
            ],
        )
        self.assertIn(
            "### Example 4 — documentation and compliance author usage",
            self.markdown,
        )
        self.assertIn('"audience": "documentation-and-compliance"', self.markdown)


if __name__ == "__main__":
    unittest.main()
