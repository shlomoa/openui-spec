import json
import unittest
from pathlib import Path

from spec.to_json.converter import parse_leaf_scope

REPO_ROOT = Path(__file__).resolve().parents[1]
SCOPES_DIR = REPO_ROOT / "spec" / "scopes"
APPLICATION_DIR = SCOPES_DIR / "Application"
APPLICATION_EXAMPLES_DIR = REPO_ROOT / "spec" / "examples" / "Application"

APPLICATION_LEAVES = (
    APPLICATION_DIR / "routing.scope.md",
    APPLICATION_DIR / "navigation.scope.md",
    APPLICATION_DIR / "tool_bars.scope.md",
    APPLICATION_DIR / "favicon.scope.md",
    APPLICATION_DIR / "index_html.scope.md",
)
REQUIRED_TEMPLATE_SECTIONS = (
    "## Identity",
    "## Purpose",
    "## Accessibility",
    "## Validation notes",
)


class ApplicationScopeContractTest(unittest.TestCase):
    """Application batch contracts are authored in prose and emitted by the converter."""

    def test_application_leaves_use_required_template_sections(self) -> None:
        for path in APPLICATION_LEAVES:
            leaf = path.read_text(encoding="utf-8")
            with self.subTest(path=path.name):
                self.assertIn("template.scope.md", leaf)
                for section in REQUIRED_TEMPLATE_SECTIONS:
                    self.assertIn(section, leaf)

    def test_routing_contract_exposes_default_route_and_routes(self) -> None:
        instance = self._instance("routing.scope.md")

        self.assertEqual(instance["type"], "Routing")
        self.assertEqual(instance["attrs"], {"[defaultRoute]": None})
        self.assertEqual(instance["children"], [{"id": "routingRoute", "type": "Route"}])

    def test_navigation_contract_exposes_label_items_and_groups(self) -> None:
        instance = self._instance("navigation.scope.md")

        self.assertEqual(instance["type"], "Navigation")
        self.assertEqual(instance["attrs"], {"[ariaLabel]": None})
        self.assertEqual(
            instance["children"],
            [
                {"id": "navigationItem", "type": "NavItem"},
                {"id": "navigationGroup", "type": "NavGroup"},
            ],
        )

    def test_tool_bars_contract_exposes_rows_and_actions(self) -> None:
        instance = self._instance("tool_bars.scope.md")

        self.assertEqual(instance["type"], "ToolBar")
        self.assertNotIn("attrs", instance)
        self.assertEqual(
            instance["children"],
            [
                {"id": "toolBarsToolBarRow", "type": "ToolBarRow"},
                {"id": "toolBarsToolAction", "type": "ToolAction"},
            ],
        )

    def test_favicon_contract_materializes_icon_link(self) -> None:
        instance = self._instance("favicon.scope.md")

        self.assertEqual(instance["type"], "link")
        self.assertEqual(
            instance["attrs"],
            {
                "[rel]": None,
                "[href]": None,
                "[type]": None,
                "[sizes]": None,
                "[media]": None,
            },
        )
        self.assertNotIn("children", instance)

    def test_index_html_contract_materializes_html_host_document(self) -> None:
        instance = self._instance("index_html.scope.md")

        self.assertEqual(instance["type"], "html")
        self.assertEqual(instance["attrs"], {"[lang]": None, "[dir]": None})
        self.assertEqual(
            instance["children"],
            [
                {"id": "indexHtmlDocumentHead", "type": "head"},
                {"id": "indexHtmlDocumentBody", "type": "body"},
            ],
        )

    def test_application_examples_stay_within_current_contracts(self) -> None:
        self.assertEqual(
            self._example_child("routing.example.json"),
            {
                "id": "appRouting",
                "type": "Routing",
                "attrs": {"[defaultRoute]": '"dashboard"'},
                "children": [
                    {"id": "dashboardRoute", "type": "Route"},
                    {"id": "reportRoute", "type": "Route"},
                    {"id": "fallbackRoute", "type": "Route"},
                ],
            },
        )
        self.assertEqual(
            self._example_child("favicon.example.json"),
            {
                "id": "appFavicon",
                "type": "link",
                "attrs": {
                    "[rel]": '"icon"',
                    "[href]": '"/favicon.ico"',
                    "[type]": '"image/x-icon"',
                },
            },
        )

    def test_application_composite_example_uses_current_contract_entries(self) -> None:
        document = json.loads(
            (APPLICATION_EXAMPLES_DIR / "scope.example.json").read_text(encoding="utf-8")
        )

        self.assertEqual(document["type"], "Application")
        self.assertEqual(
            document["children"],
            [
                {
                    "id": "appHost",
                    "type": "html",
                    "attrs": {"[lang]": '"en"', "[dir]": '"ltr"'},
                    "children": [
                        {"id": "documentHead", "type": "head"},
                        {"id": "documentBody", "type": "body"},
                    ],
                },
                {
                    "id": "appFavicon",
                    "type": "link",
                    "attrs": {"[rel]": '"icon"', "[href]": '"/favicon.ico"'},
                },
                {
                    "id": "appRouting",
                    "type": "Routing",
                    "attrs": {"[defaultRoute]": '"home"'},
                    "children": [{"id": "homeRoute", "type": "Route"}],
                },
                {
                    "id": "appNavigation",
                    "type": "Navigation",
                    "attrs": {"[ariaLabel]": '"Primary"'},
                    "children": [{"id": "navHome", "type": "NavItem"}],
                },
                {
                    "id": "appToolbar",
                    "type": "ToolBar",
                    "children": [
                        {
                            "id": "toolbarRow",
                            "type": "ToolBarRow",
                            "children": [{"id": "helpAction", "type": "ToolAction"}],
                        }
                    ],
                },
            ],
        )

    def _instance(self, file_name: str) -> dict[str, object]:
        node = parse_leaf_scope(APPLICATION_DIR / file_name, scopes_dir=SCOPES_DIR)
        return node["children"][0]

    def _example_child(self, file_name: str) -> dict[str, object]:
        example_text = (APPLICATION_EXAMPLES_DIR / file_name).read_text(encoding="utf-8")
        document = json.loads(example_text)
        self.assertEqual(len(document["children"]), 1)
        return document["children"][0]


if __name__ == "__main__":
    unittest.main()
