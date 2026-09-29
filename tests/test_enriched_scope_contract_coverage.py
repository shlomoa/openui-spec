import unittest
from pathlib import Path
from typing import cast

from spec.bin.to_json.converter import parse_leaf_scope

REPO_ROOT = Path(__file__).resolve().parents[1]
SCOPES_DIR = REPO_ROOT / "spec" / "scopes"

ContractShape = tuple[str, tuple[str, ...], tuple[tuple[str, str], ...]]

# Attributes and Child model may be omitted when the sources support none (template).
REQUIRED_TEMPLATE_SECTIONS = (
    "## Identity",
    "## Purpose",
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
    "Controls/picker_control.scope.md",
    "Controls/range_control.scope.md",
    "Controls/status_indicator.scope.md",
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
        ("uses.href", "uses.media", "uses.rel", "uses.sizes", "uses.type"),
        (),
    ),
    "Application/index_html.scope.md": (
        "html",
        ("uses.dir", "uses.lang", "uses.title"),
        (("indexHtmlDocumentHead", "head"), ("indexHtmlDocumentBody", "body")),
    ),
    "Application/nav_group.scope.md": (
        "NavGroup",
        ("uses.expanded", "uses.label"),
        (("navGroupNavigationItem", "NavItem"), ("navGroupNavigationGroup", "NavGroup")),
    ),
    "Application/nav_item.scope.md": (
        "NavItem",
        ("uses.disabled", "uses.icon", "uses.label", "uses.route"),
        (),
    ),
    "Application/navigation.scope.md": (
        "Navigation",
        ("uses.ariaLabel",),
        (("navigationItem", "NavItem"), ("navigationGroup", "NavGroup")),
    ),
    "Application/route.scope.md": (
        "Route",
        ("uses.access", "uses.path", "uses.redirectTo", "uses.target", "uses.title"),
        (("routeChildRoute", "Route"),),
    ),
    "Application/routing.scope.md": (
        "Routing",
        ("uses.defaultRoute",),
        (("routingRoute", "Route"),),
    ),
    "Application/tool_action.scope.md": (
        "ToolAction",
        ("produces.activate", "uses.disabled", "uses.icon", "uses.label"),
        (),
    ),
    "Application/tool_bar_row.scope.md": (
        "ToolBarRow",
        (),
        (("toolBarRowToolAction", "ToolAction"),),
    ),
    "Application/tool_bars.scope.md": (
        "ToolBar",
        ("uses.ariaLabel",),
        (("toolBarsToolBarRow", "ToolBarRow"),),
    ),
    "Behaviors/collapsible.scope.md": ("Collapsible", ("uses.target",), ()),
    "Behaviors/drag_and_drop.scope.md": ("DragAndDrop", ("uses.target",), ()),
    "Behaviors/input_assistance.scope.md": ("InputAssistance", ("uses.target",), ()),
    "Behaviors/modal_overlay.scope.md": ("ModalOverlay", ("uses.target",), ()),
    "Behaviors/resizable.scope.md": ("Resizable", ("uses.target",), ()),
    "Behaviors/viewport_and_focus_control.scope.md": (
        "ViewportAndFocusControl",
        ("uses.target",),
        (),
    ),
    "Containers/expandable_panels.scope.md": (
        "details",
        ("behaves.collapse", "behaves.expand", "produces.expandedChange", "uses.expanded"),
        (("expandablePanelsSummary", "summary"), ("expandablePanelsContent", "section")),
    ),
    "Containers/grid.scope.md": (
        "Grid",
        ("uses.columnGap", "uses.columns", "uses.rowGap"),
        (("gridItem", "section"),),
    ),
    "Containers/overlay_containers.scope.md": (
        "OverlayContainers",
        ("produces.close", "uses.anchor", "uses.open", "uses.placement"),
        (),
    ),
    "Containers/sheet_containers.scope.md": (
        "SheetContainers",
        ("produces.close", "uses.open", "uses.position"),
        (),
    ),
    "Containers/splitters.scope.md": (
        "Splitters",
        ("produces.resize", "uses.orientation"),
        (("splittersPane", "section"), ("splittersHandle", "separator")),
    ),
    "Containers/structural_containers.scope.md": (
        "StructuralContainers",
        ("uses.ariaLabel", "uses.orientation"),
        (),
    ),
    "Containers/surface_containers.scope.md": (
        "SurfaceContainers",
        ("uses.checkable", "uses.checked", "uses.title"),
        (("surfaceContainersContent", "section"), ("surfaceContainersActions", "footer")),
    ),
    "Containers/tabs.scope.md": (
        "Tabs",
        ("produces.selectedTabChange", "uses.orientation", "uses.selectedIndex"),
        (("tabsTab", "tab"),),
    ),
    "Controls/action_controls.scope.md": (
        "ActionControls",
        (
            "produces.activate",
            "uses.autoRepeat",
            "uses.disabled",
            "uses.icon",
            "uses.label",
            "uses.pressed",
        ),
        (),
    ),
    "Controls/choice_controls.scope.md": (
        "ChoiceControls",
        (
            "produces.selectionChange",
            "uses.checked",
            "uses.disabled",
            "uses.indeterminate",
            "uses.label",
            "uses.required",
            "uses.selection",
            "uses.value",
        ),
        (("choiceControlsOption", "option"),),
    ),
    "Controls/display_primitives.scope.md": (
        "DisplayPrimitives",
        ("uses.alt", "uses.decorative", "uses.for", "uses.orientation", "uses.src", "uses.text"),
        (),
    ),
    "Controls/drawing_and_capture.scope.md": (
        "DrawingAndCapture",
        ("uses.height", "uses.label", "uses.width"),
        (),
    ),
    "Controls/link_and_scroll_controls.scope.md": (
        "LinkAndScrollControls",
        (
            "produces.activate",
            "uses.href",
            "uses.label",
            "uses.max",
            "uses.min",
            "uses.orientation",
            "uses.value",
        ),
        (),
    ),
    "Controls/native.scope.md": (
        "input",
        ("uses.disabled", "uses.placeholder", "uses.type", "uses.value"),
        (),
    ),
    "Controls/picker_control.scope.md": (
        "PickerControl",
        (
            "produces.valueChange",
            "uses.accept",
            "uses.disabled",
            "uses.kind",
            "uses.label",
            "uses.multiple",
            "uses.value",
        ),
        (),
    ),
    "Controls/range_control.scope.md": (
        "RangeControl",
        (
            "produces.valueChange",
            "uses.disabled",
            "uses.end",
            "uses.label",
            "uses.max",
            "uses.min",
            "uses.orientation",
            "uses.start",
            "uses.step",
            "uses.value",
            "uses.wrapping",
        ),
        (),
    ),
    "Controls/status_indicator.scope.md": (
        "StatusIndicator",
        ("uses.label", "uses.max", "uses.min", "uses.mode", "uses.severity", "uses.value"),
        (),
    ),
    "Controls/text_inputs.scope.md": (
        "TextInputs",
        (
            "produces.valueChange",
            "uses.disabled",
            "uses.label",
            "uses.maxLength",
            "uses.multiline",
            "uses.placeholder",
            "uses.readOnly",
            "uses.required",
            "uses.type",
            "uses.value",
        ),
        (),
    ),
    "Pages/dashboard.scope.md": ("DashboardPage", (), ()),
    "Pages/empty_page.scope.md": ("EmptyPage", (), ()),
    "Pages/shell_page.scope.md": (
        "ShellPage",
        (),
        (("shellPageRouting", "Routing"), ("shellPageNavigation", "Navigation")),
    ),
    "Views/form.scope.md": (
        "Form",
        ("behaves.submit", "behaves.validate", "produces.dirtyChange"),
        (),
    ),
    "Views/report.scope.md": (
        "Report",
        ("behaves.filter", "behaves.group", "behaves.paginate", "behaves.sort"),
        (),
    ),
    "Widgets/chart.scope.md": (
        "Chart",
        ("uses.kind", "uses.legend", "uses.series", "uses.title"),
        (("chartAnnotation", "annotation"),),
    ),
    "Widgets/data_grid.scope.md": (
        "DataGrid",
        (
            "behaves.filter",
            "behaves.paginate",
            "behaves.sort",
            "produces.selectionChange",
            "uses.editable",
            "uses.reorderableColumns",
            "uses.resizableColumns",
            "uses.selection",
        ),
        (("dataGridHeader", "thead"), ("dataGridRow", "tr")),
    ),
    "Widgets/date_time_pickers.scope.md": (
        "DateTimePicker",
        ("produces.dateChange", "uses.disabled", "uses.end", "uses.label", "uses.start"),
        (),
    ),
    "Widgets/dialog.scope.md": (
        "dialog",
        ("produces.cancel", "produces.close", "uses.modal", "uses.open"),
        (("dialogTitle", "header"), ("dialogContent", "section"), ("dialogActions", "footer")),
    ),
    "Widgets/feedback_widgets.scope.md": (
        "FeedbackWidgets",
        ("produces.close", "uses.anchor", "uses.duration", "uses.message", "uses.severity"),
        (),
    ),
    "Widgets/list.scope.md": (
        "ul",
        (
            "behaves.filter",
            "behaves.paginate",
            "behaves.sort",
            "produces.selectionChange",
            "uses.selection",
        ),
        (("listItem", "li"),),
    ),
    "Widgets/media_widgets.scope.md": (
        "MediaWidgets",
        ("uses.controls", "uses.src"),
        (("mediaWidgetsCaptions", "track"),),
    ),
    "Widgets/menu_widgets.scope.md": (
        "MenuWidgets",
        ("produces.select", "uses.anchor", "uses.label", "uses.open", "uses.orientation"),
        (("menuWidgetsItem", "menuitem"), ("menuWidgetsSubmenu", "MenuWidgets")),
    ),
    "Widgets/navigation_widgets.scope.md": (
        "NavigationWidgets",
        (
            "produces.pageChange",
            "produces.selectionChange",
            "uses.ariaLabel",
            "uses.orientation",
            "uses.pageSize",
            "uses.selected",
            "uses.total",
        ),
        (),
    ),
    "Widgets/stepper.scope.md": (
        "Stepper",
        (
            "produces.complete",
            "produces.selectionChange",
            "uses.branching",
            "uses.linear",
            "uses.orientation",
            "uses.selectedIndex",
        ),
        (("stepperStep", "step"),),
    ),
    "Widgets/table.scope.md": (
        "table",
        ("behaves.filter", "behaves.paginate", "behaves.sort"),
        (("tableCaption", "caption"), ("tableHeader", "thead"), ("tableRow", "tr")),
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
