import json
import re
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
OPENUI_JSON = REPO_ROOT / "openui.json"
TARGET_USERS_MD = REPO_ROOT / "spec" / "04-target-users.md"


class TargetUsersSpecTest(unittest.TestCase):
    EXPECTED_FORMAL_DEFINITION_COUNT = 5
    EXPECTED_USAGE_COUNT = 3
    EXPECTED_IMPLEMENTATION_NOTE_COUNT = 3

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
        expected_requirement_concepts = {
            "Application developers": "stable component contracts",
            "Designers and UX owners": "accessibility, and theming expectations",
            "Framework maintainers": "compatibility baseline",
            "Generator and tooling maintainers": "canonical JSON contract",
            "Documentation and compliance authors": "acceptance criteria",
        }
        for audience, key_phrase in expected_requirement_concepts.items():
            self.assertTrue(
                any(
                    audience in requirement and key_phrase in requirement
                    for requirement in requirements
                ),
                msg=(
                    f"Missing requirement covering audience '{audience}' "
                    f"with key phrase '{key_phrase}'"
                ),
            )

    def test_target_users_section_has_expected_structured_metadata(self):
        self.assertEqual(
            {tag["name"] for tag in self.section["tags"]},
            {
                "application-consumer",
                "design-consumer",
                "implementation-consumer",
                "tooling-consumer",
                "shared-contract",
            },
        )
        self.assertEqual(
            len(self.section["formalDefinitions"]),
            self.EXPECTED_FORMAL_DEFINITION_COUNT,
        )
        self.assertEqual(len(self.section["usage"]), self.EXPECTED_USAGE_COUNT)
        self.assertEqual(
            len(self.section["implementationNotes"]),
            self.EXPECTED_IMPLEMENTATION_NOTE_COUNT,
        )

    def test_target_users_examples_cover_all_audiences(self):
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
        example_match = re.search(
            r"### Example 4 — documentation and compliance author usage\s+```json\s*\n(.*?)\n```",
            self.markdown,
            re.DOTALL,
        )
        self.assertIsNotNone(example_match)
        example_json = json.loads(example_match.group(1))
        self.assertEqual(example_json["section"], "04-target-users")
        self.assertEqual(example_json["audience"], "documentation-and-compliance")
        self.assertEqual(example_json["sourceOfTruth"], "/openui.json")
        self.assertEqual(
            example_json["artifacts"],
            [
                "authoring-guidance",
                "acceptance-criteria",
                "compliance-evidence",
            ],
        )


if __name__ == "__main__":
    unittest.main()
