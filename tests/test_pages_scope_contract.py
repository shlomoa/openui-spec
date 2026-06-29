import json
import unittest
from pathlib import Path

from spec.to_json.converter import parse_leaf_scope

REPO_ROOT = Path(__file__).resolve().parents[1]
SCOPES_DIR = REPO_ROOT / "spec" / "scopes"
PAGES_DIR = SCOPES_DIR / "Pages"
PAGE_EXAMPLES_DIR = REPO_ROOT / "spec" / "examples" / "Pages"

PAGE_LEAVES = (
    PAGES_DIR / "dashboard.scope.md",
    PAGES_DIR / "shell_page.scope.md",
    PAGES_DIR / "empty_page.scope.md",
)
REQUIRED_TEMPLATE_SECTIONS = (
    "## Identity",
    "## Purpose",
    "## Accessibility",
    "## Validation notes",
)


class PagesScopeContractTest(unittest.TestCase):
    """Pages batch contracts are authored in prose and emitted by the converter."""

    def test_page_leaves_use_required_template_sections(self) -> None:
        for path in PAGE_LEAVES:
            leaf = path.read_text(encoding="utf-8")
            with self.subTest(path=path.name):
                self.assertIn("template.scope.md", leaf)
                for section in REQUIRED_TEMPLATE_SECTIONS:
                    self.assertIn(section, leaf)

    def test_dashboard_purpose_only_contract_has_no_instance_attrs_or_children(self) -> None:
        node = parse_leaf_scope(PAGES_DIR / "dashboard.scope.md", scopes_dir=SCOPES_DIR)
        instance = node["children"][0]

        self.assertEqual(node["id"], "dashboard")
        self.assertEqual(instance["type"], "DashboardPage")
        self.assertNotIn("attrs", instance)
        self.assertNotIn("children", instance)

    def test_shell_page_contract_exposes_routing_and_navigation_relationships(self) -> None:
        node = parse_leaf_scope(PAGES_DIR / "shell_page.scope.md", scopes_dir=SCOPES_DIR)
        instance = node["children"][0]

        self.assertEqual(node["id"], "shellPage")
        self.assertEqual(instance["type"], "ShellPage")
        self.assertEqual(
            instance["children"],
            [
                {"id": "shellPageRouting", "type": "Routing"},
                {"id": "shellPageNavigation", "type": "Navigation"},
            ],
        )

    def test_empty_page_contract_has_no_instance_attrs_or_children(self) -> None:
        node = parse_leaf_scope(PAGES_DIR / "empty_page.scope.md", scopes_dir=SCOPES_DIR)
        instance = node["children"][0]

        self.assertEqual(node["id"], "emptyPage")
        self.assertEqual(instance["type"], "EmptyPage")
        self.assertNotIn("attrs", instance)
        self.assertNotIn("children", instance)

    def test_page_examples_stay_within_current_page_contracts(self) -> None:
        dashboard = self._example_child("dashboard.example.json")
        shell_page = self._example_child("shell_page.example.json")
        empty_page = self._example_child("empty_page.example.json")

        self.assertEqual(dashboard, {"id": "dashboardPage", "type": "DashboardPage"})
        self.assertEqual(empty_page, {"id": "emptyPage", "type": "EmptyPage"})
        self.assertEqual(
            shell_page,
            {
                "id": "shellPage",
                "type": "ShellPage",
                "children": [
                    {"id": "shellPageRouting", "type": "Routing"},
                    {"id": "shellPageNavigation", "type": "Navigation"},
                ],
            },
        )

    def test_pages_composite_example_uses_only_current_page_contract_entries(self) -> None:
        document = json.loads(
            (PAGE_EXAMPLES_DIR / "scope.example.json").read_text(encoding="utf-8")
        )

        self.assertEqual(document["type"], "Pages")
        self.assertEqual(
            document["children"],
            [
                {
                    "id": "appShell",
                    "type": "ShellPage",
                    "children": [
                        {"id": "appShellRouting", "type": "Routing"},
                        {"id": "appShellNavigation", "type": "Navigation"},
                    ],
                },
                {"id": "homeDashboard", "type": "DashboardPage"},
                {"id": "notFound", "type": "EmptyPage"},
            ],
        )

    def _example_child(self, file_name: str) -> dict[str, object]:
        example_text = (PAGE_EXAMPLES_DIR / file_name).read_text(encoding="utf-8")
        document = json.loads(example_text)
        self.assertEqual(len(document["children"]), 1)
        return document["children"][0]


if __name__ == "__main__":
    unittest.main()
