# Application — OpenUI5 survey

Scope: [`scopes/Application/scope.md`](../../scopes/Application/scope.md).
Full survey of the Application category against the pinned OpenUI5 commit
(`5165c20cff6de9d79604008a76c56322aa721bf5`) — 8 matched classes, all under
Tool bars; Routing, Navigation, `favicon.ico`, and `index.html` have no
OpenUI5 class match (they are app-config/asset-level objects, not classes).

## Tool bars

| UI5 object | Abstract object | Description | Sources |
| --- | --- | --- | --- |
| `sap.m.AssociativeOverflowToolbar` | [Tool bars](../../scopes/Application/tool_bars.scope.md) | Internal variant of `OverflowToolbar` that tracks its items through an association alongside the normal aggregation, used for cases where a control needs to be referenced from more than one place. | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/AssociativeOverflowToolbar.js) · [API ref](https://ui5.sap.com/#/api/sap.m.AssociativeOverflowToolbar) |
| `sap.m.Bar` | [Tool bars](../../scopes/Application/tool_bars.scope.md) | Generic container used as a page header, sub-header, or footer, with left/center/right areas that can center content such as a title while other controls sit on either side. | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/Bar.js) · [API ref](https://ui5.sap.com/#/api/sap.m.Bar) |
| `sap.m.OverflowToolbar` | [Tool bars](../../scopes/Application/tool_bars.scope.md) | Toolbar built on top of `Toolbar` that automatically moves content it cannot fit into a popover accessed via an overflow button, with per-control overflow priority and behavior configurable through layout data. | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/OverflowToolbar.js) · [API ref](https://ui5.sap.com/#/api/sap.m.OverflowToolbar) |
| `sap.m.Toolbar` | [Tool bars](../../scopes/Application/tool_bars.scope.md) | General-purpose horizontal command surface for buttons, labels, and inputs, with shrink-priority-based overflow handling. | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/Toolbar.js) · [API ref](https://ui5.sap.com/#/api/sap.m.Toolbar) |
| `sap.tnt.ToolHeader` | [Tool bars](../../scopes/Application/tool_bars.scope.md) | Toolbar-family control specialized as an application's top-level header bar for actions and utilities. | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.tnt/src/sap/tnt/ToolHeader.js) · [API ref](https://ui5.sap.com/#/api/sap.tnt.ToolHeader) |
| `sap.ui.mdc.ActionToolbar` | [Tool bars](../../scopes/Application/tool_bars.scope.md) | Toolbar used inside the MDC `Chart` and `Table` controls to surface actions, handling key-user adaptation and positioning of those actions according to supplied layout information. | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/ActionToolbar.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.ActionToolbar) |
| `sap.ui.mdc.table.utils.FilterInfoBar` | [Tool bars](../../scopes/Application/tool_bars.scope.md) | Internal toolbar-based bar that surfaces a summary of the currently applied filters above an MDC table. | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/table/utils/FilterInfoBar.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.table.utils.FilterInfoBar) |
| `sap.uxap.AnchorBar` | [Tool bars](../../scopes/Application/tool_bars.scope.md) | Toolbar automatically generated inside `ObjectPageLayout` that lists the page's sections and subsections as a menu and lets the user jump to them, while remaining pinned below the page header as the user scrolls. | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.uxap/src/sap/uxap/AnchorBar.js) · [API ref](https://ui5.sap.com/#/api/sap.uxap.AnchorBar) |

**Note:** both `sap.m.Toolbar` and `sap.tnt.ToolHeader` are reusable
controls, not strictly "application-level" only (`sap.m.Toolbar` is usable
inside any Bar, Page footer, or Dialog) — see the Phase 0 report for this
as an open taxonomy-scope question, not something this stage resolves.
