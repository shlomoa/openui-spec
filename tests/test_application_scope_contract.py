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
    APPLICATION_DIR / "route.scope.md",
    APPLICATION_DIR / "navigation.scope.md",
    APPLICATION_DIR / "nav_item.scope.md",
    APPLICATION_DIR / "nav_group.scope.md",
    APPLICATION_DIR / "tool_bars.scope.md",
    APPLICATION_DIR / "tool_bar_row.scope.md",
    APPLICATION_DIR / "tool_action.scope.md",
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

    def test_application_child_contracts_materialize_typed_instances(self) -> None:
        expected_contracts = {
            "route.scope.md": (
                "Route",
                {"[path]", "[target]", "[title]", "[redirectTo]", "[access]"},
                [{"id": "routeChildRoute", "type": "Route"}],
            ),
            "nav_item.scope.md": (
                "NavItem",
                {"[label]", "[route]", "[icon]", "[disabled]"},
                [],
            ),
            "nav_group.scope.md": (
                "NavGroup",
                {"[label]", "[expanded]"},
                [
                    {"id": "navGroupNavigationItem", "type": "NavItem"},
                    {"id": "navGroupNavigationGroup", "type": "NavGroup"},
                ],
            ),
            "tool_bar_row.scope.md": (
                "ToolBarRow",
                set(),
                [{"id": "toolBarRowToolAction", "type": "ToolAction"}],
            ),
            "tool_action.scope.md": (
                "ToolAction",
                {"[label]", "[icon]", "[disabled]", "(activate)"},
                [],
            ),
        }

        for file_name, (object_type, attributes, children) in expected_contracts.items():
            with self.subTest(file_name=file_name):
                instance = self._instance(file_name)
                self.assertEqual(instance["type"], object_type)
                self.assertEqual(set(instance.get("attrs", {})), attributes)
                self.assertEqual(instance.get("children", []), children)

    def test_tool_bars_contract_exposes_rows_and_actions(self) -> None:
        instance = self._instance("tool_bars.scope.md")

        self.assertEqual(instance["type"], "ToolBar")
        self.assertEqual(instance["attrs"], {"[ariaLabel]": None})
        self.assertEqual(
            instance["children"],
            [{"id": "toolBarsToolBarRow", "type": "ToolBarRow"}],
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
        self.assertEqual(instance["attrs"], {"[lang]": None, "[dir]": None, "[title]": None})
        self.assertEqual(
            instance["children"],
            [
                {"id": "indexHtmlDocumentHead", "type": "head"},
                {"id": "indexHtmlDocumentBody", "type": "body"},
            ],
        )

    def test_application_examples_use_contract_attributes(self) -> None:
        routing = self._example_child("routing.example.json", "appRouting")
        self.assertEqual(routing["attrs"], {"[defaultRoute]": '"dashboardRoute"'})
        self.assertEqual(routing["children"][0]["attrs"]["[target]"], '"dashboardPage"')
        self.assertEqual(routing["children"][2]["attrs"]["[redirectTo]"], '"dashboardRoute"')

        navigation = self._example_child("navigation.example.json", "primaryNav")
        nav_group = navigation["children"][1]
        self.assertEqual(nav_group["attrs"], {"[label]": '"Reports"', "[expanded]": "true"})
        self.assertEqual(nav_group["children"][1]["attrs"]["[disabled]"], "true")

        toolbar = self._example_child("tool_bars.example.json", "appToolbar")
        self.assertEqual(toolbar["type"], "ToolBar")
        self.assertEqual(toolbar["attrs"], {"[ariaLabel]": '"Application commands"'})
        self.assertEqual(
            toolbar["children"][0]["children"][0]["attrs"]["(activate)"], "createNew()"
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
        children = {child["id"]: child for child in document["children"]}
        self.assertEqual(children["appHost"]["attrs"]["[title]"], '"Application bootstrap example"')
        self.assertEqual(children["appRouting"]["attrs"]["[defaultRoute]"], '"homeRoute"')
        self.assertEqual(
            children["appNavigation"]["children"][0]["attrs"]["[route]"], '"homeRoute"'
        )
        self.assertEqual(children["appToolbar"]["type"], "ToolBar")
        self.assertEqual(
            children["appToolbar"]["children"][0]["children"][0]["attrs"]["(activate)"],
            "openHelp()",
        )

    def _instance(self, file_name: str) -> dict[str, object]:
        node = parse_leaf_scope(APPLICATION_DIR / file_name, scopes_dir=SCOPES_DIR)
        return node["children"][0]

    def _example_child(self, file_name: str, object_id: str | None = None) -> dict[str, object]:
        example_text = (APPLICATION_EXAMPLES_DIR / file_name).read_text(encoding="utf-8")
        document = json.loads(example_text)
        children = document["children"]
        if object_id is None:
            self.assertEqual(len(children), 1)
            return children[0]
        for child in children:
            if child["id"] == object_id:
                return child
        self.fail(f"missing child {object_id}")


if __name__ == "__main__":
    unittest.main()
