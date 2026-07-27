import unittest
from pathlib import Path
from typing import cast

from spec.to_json.converter import parse_leaf_scope

REPO_ROOT = Path(__file__).resolve().parents[1]
SCOPES_DIR = REPO_ROOT / "spec" / "scopes"

ContractShape = tuple[str, tuple[str, ...], tuple[tuple[str, str], ...]]

REQUIRED_TEMPLATE_SECTIONS = (
    "## Identity",
    "## Purpose",
    "## Attributes",
    "## Child model",
)

NEW_GROUPED_LEAF_SCOPES = {
    "Containers/overlay_containers.scope.md",
    "Containers/sheet_containers.scope.md",
    "Containers/splitters.scope.md",
    "Containers/structural_containers.scope.md",
    "Containers/surface_containers.scope.md",
    "Controls/action_controls.scope.md",
    "Controls/choice_controls.scope.md",
    "Controls/display_primitives.scope.md",
    "Controls/drawing_and_capture.scope.md",
    "Controls/link_and_scroll_controls.scope.md",
    "Controls/picker_controls.scope.md",
    "Controls/range_controls.scope.md",
    "Controls/status_indicators.scope.md",
    "Controls/text_inputs.scope.md",
    "Widgets/data_grid.scope.md",
    "Widgets/feedback_widgets.scope.md",
    "Widgets/media_widgets.scope.md",
    "Widgets/menu_widgets.scope.md",
    "Widgets/navigation_widgets.scope.md",
}

EXPECTED_ENRICHED_CONTRACTS: dict[str, ContractShape] = {
    "Application/favicon.scope.md": (
        "link",
        ("[href]", "[media]", "[rel]", "[sizes]", "[type]"),
        (),
    ),
    "Application/index_html.scope.md": (
        "html",
        ("[dir]", "[lang]"),
        (("indexHtmlDocumentHead", "head"), ("indexHtmlDocumentBody", "body")),
    ),
    "Application/navigation.scope.md": (
        "Navigation",
        ("[ariaLabel]",),
        (("navigationItem", "NavItem"), ("navigationGroup", "NavGroup")),
    ),
    "Application/routing.scope.md": (
        "Routing",
        ("[defaultRoute]",),
        (("routingRoute", "Route"),),
    ),
    "Application/tool_bars.scope.md": (
        "ToolBar",
        (),
        (("toolBarsToolBarRow", "ToolBarRow"), ("toolBarsToolAction", "ToolAction")),
    ),
    "Behaviors/collapsible.scope.md": (
        "Collapsible",
        (),
        (("collapsibleTargetPage", "page"), ("collapsibleTargetView", "view")),
    ),
    "Behaviors/drag_and_drop.scope.md": (
        "DragAndDrop",
        (),
        (
            ("dragAndDropTargetPage", "page"),
            ("dragAndDropTargetView", "view"),
            ("dragAndDropTargetContainer", "container"),
            ("dragAndDropTargetWidget", "widget"),
        ),
    ),
    "Behaviors/resizable.scope.md": (
        "Resizable",
        (),
        (("resizableTargetPage", "page"), ("resizableTargetView", "view")),
    ),
    "Containers/expandable_panels.scope.md": (
        "details",
        ("(collapse)", "(expand)"),
        (),
    ),
    "Containers/grid.scope.md": ("Grid", (), (("gridItem", "section"),)),
    "Containers/overlay_containers.scope.md": ("OverlayContainers", (), ()),
    "Containers/sheet_containers.scope.md": ("SheetContainers", (), ()),
    "Containers/splitters.scope.md": ("Splitters", (), ()),
    "Containers/structural_containers.scope.md": ("StructuralContainers", (), ()),
    "Containers/surface_containers.scope.md": ("SurfaceContainers", (), ()),
    "Containers/tabs.scope.md": ("Tabs", (), (("tabsTab", "tab"),)),
    "Controls/action_controls.scope.md": ("ActionControls", (), ()),
    "Controls/choice_controls.scope.md": ("ChoiceControls", (), ()),
    "Controls/display_primitives.scope.md": ("DisplayPrimitives", (), ()),
    "Controls/drawing_and_capture.scope.md": ("DrawingAndCapture", (), ()),
    "Controls/link_and_scroll_controls.scope.md": ("LinkAndScrollControls", (), ()),
    "Controls/native.scope.md": (
        "input",
        ("[disabled]", "[placeholder]", "[type]", "[value]"),
        (),
    ),
    "Controls/picker_controls.scope.md": ("PickerControls", (), ()),
    "Controls/range_controls.scope.md": ("RangeControls", (), ()),
    "Controls/status_indicators.scope.md": ("StatusIndicators", (), ()),
    "Controls/Table/table.scope.md": ("table", (), (("tableRow", "tr"),)),
    "Controls/Table/td.scope.md": (
        "td",
        ("[colspan]", "[headers]", "[rowspan]"),
        (),
    ),
    "Controls/Table/th.scope.md": (
        "th",
        ("[abbr]", "[colspan]", "[headers]", "[rowspan]", "[scope]"),
        (),
    ),
    "Controls/Table/tr.scope.md": (
        "tr",
        (),
        (("trHeaderCell", "th"), ("trDataCell", "td")),
    ),
    "Controls/text_inputs.scope.md": ("TextInputs", (), ()),
    "Pages/dashboard.scope.md": ("DashboardPage", (), ()),
    "Pages/empty_page.scope.md": ("EmptyPage", (), ()),
    "Pages/shell_page.scope.md": (
        "ShellPage",
        (),
        (("shellPageRouting", "Routing"), ("shellPageNavigation", "Navigation")),
    ),
    "Views/forms.scope.md": (
        "Forms",
        ("(dirtyChange)", "(submit)", "(validate)"),
        (),
    ),
    "Views/reports.scope.md": (
        "Reports",
        ("(filter)", "(group)", "(paginate)", "(sort)"),
        (),
    ),
    "Widgets/charts.scope.md": ("Chart", (), ()),
    "Widgets/data_grid.scope.md": ("DataGrid", (), ()),
    "Widgets/date_time_pickers.scope.md": (
        "DateTimePicker",
        ("(dateChange)", "[end]", "[start]"),
        (),
    ),
    "Widgets/dialog.scope.md": (
        "dialog",
        ("(cancel)", "(close)", "[modal]", "[open]"),
        (
            ("dialogTitle", "header"),
            ("dialogContent", "section"),
            ("dialogActions", "footer"),
        ),
    ),
    "Widgets/feedback_widgets.scope.md": ("FeedbackWidgets", (), ()),
    "Widgets/lists.scope.md": (
        "ul",
        ("(filter)", "(paginate)", "(sort)"),
        (("listsListItem", "li"),),
    ),
    "Widgets/media_widgets.scope.md": ("MediaWidgets", (), ()),
    "Widgets/menu_widgets.scope.md": ("MenuWidgets", (), ()),
    "Widgets/navigation_widgets.scope.md": ("NavigationWidgets", (), ()),
    "Widgets/stepper.scope.md": ("Stepper", (), (("stepperStep", "step"),)),
    "Widgets/tables.scope.md": (
        "table",
        ("(filter)", "(paginate)", "(sort)"),
        (("tablesTableRow", "tr"),),
    ),
}


class EnrichedScopeContractCoverageTest(unittest.TestCase):
    """Every template-enriched leaf has an explicit public-contract assertion."""

    def test_new_grouped_leaf_scopes_use_template_and_required_sections(self) -> None:
        for relative_path in sorted(NEW_GROUPED_LEAF_SCOPES):
            path = SCOPES_DIR / relative_path
            text = path.read_text(encoding="utf-8")

            with self.subTest(scope=relative_path):
                self.assertIn("template.scope.md", text)
                for section in REQUIRED_TEMPLATE_SECTIONS:
                    self.assertIn(section, text)

    def test_guard_covers_every_template_enriched_leaf(self) -> None:
        enriched_leaves = {
            path.relative_to(SCOPES_DIR).as_posix()
            for path in SCOPES_DIR.rglob("*.scope.md")
            if path.name != "template.scope.md"
            and "template.scope.md" in path.read_text(encoding="utf-8")
        }

        self.assertEqual(set(EXPECTED_ENRICHED_CONTRACTS), enriched_leaves)

    def test_every_enriched_leaf_public_contract_is_asserted(self) -> None:
        for relative_path, expected_contract in EXPECTED_ENRICHED_CONTRACTS.items():
            with self.subTest(scope=relative_path):
                node = parse_leaf_scope(SCOPES_DIR / relative_path, scopes_dir=SCOPES_DIR)
                instance = node["children"][0]

                self.assertEqual(self._contract_shape(instance), expected_contract)

    def _contract_shape(self, instance: dict[str, object]) -> ContractShape:
        attrs = cast(dict[str, object], instance.get("attrs", {}))
        children = cast(list[dict[str, str]], instance.get("children", []))
        return (
            cast(str, instance["type"]),
            tuple(sorted(attrs.keys())),
            tuple((child["id"], child["type"]) for child in children),
        )


if __name__ == "__main__":
    unittest.main()
