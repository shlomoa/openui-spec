# Consolidated taxonomy mapping change proposal

This proposal turns the taxonomy mapping findings of the four UI surveys into concrete
changes to the canonical [taxonomy mapping](../scopes/taxonomy_mapping.md#input-elements).
It uses the terms approved in the [terminology proposal](../scopes/terminology.md#summary)
and the categories approved in the
[category change proposal](category.md#summary). Each
recommendation is one of four actions on a specific mapping row.

| Action               | Meaning                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| **Change A to B**    | Same taxonomy entry; its spec object, abstraction level or note changes from A to B.               |
| **Replace A with B** | Row A is removed and one or more rows B take over its content.                                     |
| **Delete A**         | Row A is removed with no successor.                                                                |
| **Add C**            | C is a new row: a taxonomy entry with its spec object, abstraction level, section and subcategory. |

- **Mapping row:** one row of the taxonomy mapping: taxonomy entry, spec object, abstraction
  level (Existing object, Alias, Grouped leaf, Folder abstraction) and note.
- **Where each change applies:** `spec/scopes/taxonomy_mapping.md`, and the same entry in
  the [generic UI taxonomy](../../docs/generic-ui-taxonomy.md#input-elements).
- **Inputs:** the taxonomy mapping of each survey
  ([Angular Material](angular-material/taxonomy_mapping.md#summary),
  [HTML Standard](html5/taxonomy_mapping.md#summary),
  [OpenUI5](openui5/taxonomy_mapping.md#summary), [Qt Widgets](qt/taxonomy_mapping.md#summary))
  and the canonical scope tree. [Appendix A](#appendix-a-what-each-survey-mapping-contributes)
  lists what each survey mapping contributes.
- **Status:** approved (2026-09-27), not yet applied: C1–C4, A1–A14 and the entries not
  added. It is applied with terminology step
  9.2 in the [v1 publish plan](specui_v1_publish_plan.md#w1-terminology).
- **Naming rule used:** the approved [canonical-term rule](../scopes/terminology.md#appendix-a-canonical-term-rule).
  New entries take the name of their existing scope object (rule 1).
- **Already decided:** the terminology and category proposals already change many mapping
  rows. They are listed once in [section 0](#0-already-decided), not repeated here.

## Summary

| Action  | Count | Examples                                                                                    |
| ------- | ----: | ------------------------------------------------------------------------------------------- |
| Change  |     4 | Drag handle and Resize handle: Existing object → Alias; notes for Menu and Window           |
| Replace |     0 | Not needed.                                                                                 |
| Delete  |     0 | Not needed.                                                                                 |
| Add     |    14 | Chart, Collapsible, Report, Dashboard, Route, Navigation item, Tool action, Tree, Tree grid |

After these changes every leaf scope has at least one taxonomy entry, except favicon.ico,
index.html and Native. Today 16 of the 47 leaves have none; see [section 4](#4-add).

## 0. Already decided

These approved changes edit the taxonomy mapping. They are applied as written in their
own proposal.

| Source                                               | Rows                 | Effect on the taxonomy mapping                                                      |
| ---------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------- |
| [Terminology: Change](../scopes/terminology.md#1-change)       | C1–C5                | Renames or moves five rows (C6 changes the glossary only).                          |
| [Terminology: Replace](../scopes/terminology.md#2-replace)     | R1–R11               | Splits eleven "A / B" rows.                                                         |
| [Terminology: Delete](../scopes/terminology.md#3-delete)       | D1                   | Removes Biometric prompt (D2 changes the glossary only).                            |
| [Terminology: Add](../scopes/terminology.md#42-input-elements) | A6–A76 (A68 dropped) | Adds the new entries with their scope and level (A1–A5 are glossary terms).         |
| [Category: Change](category.md#1-change)             | C1–C6                | Splits the four folder-abstraction sections into their subcategory tables.          |
| [Category: Add](category.md#4-add)                   | A1–A22               | Adds the Behaviors section and splits the element sections into subcategory tables. |

## 1. Change

| #   | Change                                           | To                                                                                                               | Where                                                           | Why                                                                                                                                                                                                                            | Evidence                                                                                                                                                                                                                                                                      | Source URL                                                                                                                           |
| --- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| C1  | Drag handle: abstraction level Existing object   | Alias                                                                                                            | Input elements: Manipulation handles; spec object Drag and drop | "Existing object" means the entry is the scope object itself. A handle is a visible part of the drag-and-drop behavior, as the row's own note says. The approved Splitter handle is an Alias of Splitters for the same reason. | [Qt Splitters: owned part](qt/taxonomy_mapping.md#containerssplittersscopemd); [HTML Drag and drop](html5/taxonomy_mapping.md#behaviorsdrag_and_dropscopemd); [Terminology: Splitter handle](../scopes/terminology.md#46-layout-and-structural-elements)                                | [Qt: QSplitterHandle](https://doc.qt.io/qt-6/qsplitterhandle.html#details)                                                           |
| C2  | Resize handle: abstraction level Existing object | Alias                                                                                                            | Input elements: Manipulation handles; spec object Resizable     | Same as C1. HTML has no resize-handle element, and Qt maps its size grip to Resizable as a reused part.                                                                                                                        | [Qt Resizable](qt/taxonomy_mapping.md#behaviorsresizablescopemd); [HTML Resizable](html5/taxonomy_mapping.md#behaviorsresizablescopemd); [OpenUI5 review: survey gap](openui5/opens.md#o6-spec-objects-without-a-match) (`sap.m.plugins.ColumnResizer` resizes table columns) | [Qt: QSizeGrip](https://doc.qt.io/qt-6/qsizegrip.html#details)                                                                       |
| C3  | Menu note: "Command or choice menu."             | "Command or choice menu. Not the HTML `menu` element, which is a plain list of commands without popup behavior." | Navigational elements: Command menus                            | HTML records Menu, Dropdown Menu and Context menu as a semantic mismatch: its `menu` element is not a popup menu. One note on Menu covers its aliases.                                                                         | [HTML Menu widgets](html5/taxonomy_mapping.md#widgetsmenu_widgetsscopemd)                                                                                                                                                                                                     | [HTML: menu element](https://html.spec.whatwg.org/#the-menu-element); [WAI-ARIA 1.2: menu](https://www.w3.org/TR/wai-aria-1.2/#menu) |
| C4  | Window note: "Top-level or sub-window surface."  | "Top-level or sub-window surface; see the glossary term Window. Not the HTML `Window` browsing-context object."  | Container elements: Workspace surfaces                          | HTML records Window as a semantic mismatch. The approved glossary term Window (terminology A5) holds the definition; the note links to it instead of repeating it.                                                             | [HTML Surface containers](html5/taxonomy_mapping.md#containerssurface_containersscopemd); [Terminology: Glossary terms](../scopes/terminology.md#41-glossary-terms)                                                                                                                     | [HTML: Window object](https://html.spec.whatwg.org/#the-window-object)                                                               |

## 2. Replace

Not needed.

## 3. Delete

Not needed.

## Kept

| Kept                                                                                           | Why                                                                                                                                                                                                                                                                                             | Evidence                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Every scope target of the 151 existing entries, except those changed by the approved proposals | The HTML survey routes all 151 entries to the same scope as the canonical mapping. Qt, Angular Material and OpenUI5 map their own objects; where one of them names a canonical entry it agrees with it or is covered by an approved term change. The one exception is Navigation Drawer, below. | [HTML summary](html5/taxonomy_mapping.md#summary); [Qt summary](qt/taxonomy_mapping.md#summary); [Angular Material summary](angular-material/taxonomy_mapping.md#summary) |
| Navigation Drawer → Navigation widgets                                                         | Angular Material maps its `sidenav` family first to Sheet containers, with Navigation widgets second, because the same component is also a side sheet. The entry names the navigation purpose, and Sidebar and Side Sheet already map to Sheet containers, so both readings are covered.        | [Angular Material Sheet containers](angular-material/taxonomy_mapping.md#containerssheet_containersscopemd)                                                               |
| One spec object per row                                                                        | Angular Material names secondary scopes for twelve families (for example Bottom sheet also Dialog). A second column would duplicate what the scope files and notes say. Secondary relations stay in the notes or scope contracts.                                                               | [Angular Material entries by scope](angular-material/taxonomy_mapping.md#entries-by-primary-openui-scope)                                                                 |
| The four abstraction levels                                                                    | Qt's "Owned part" is mapped as Alias (C1, C2 and the approved Splitter handle), so no fifth level is needed.                                                                                                                                                                                    | [Qt Splitters](qt/taxonomy_mapping.md#containerssplittersscopemd)                                                                                                         |

## 4. Add

Leaves without a taxonomy entry today: favicon, index.html, Navigation group, Navigation
item, Route, Routing, Tool action, Tool bar row, Collapsible, Native, Dashboard, Empty
page, Shell page, Report, Chart and Stepper. Stepper is covered by the approved Workflow
stepper (terminology A48). Twelve get an entry here; the other three are under
[Not added](#not-added).

| #   | Add              | Spec object                                                          | Level           | Section: subcategory                               | Evidence                                                                                                                                                                                                                                                                           | Source URL                                                                                           |
| --- | ---------------- | -------------------------------------------------------------------- | --------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| A1  | Chart            | [Chart](../scopes/Widgets/chart.scope.md#purpose)                    | Existing object | Output elements: Collections and data presentation | [OpenUI5 Chart](openui5/inventory/Widgets.survey.md#chart); [UI element taxonomy: Data-Visualization](../../docs/ui-element-taxonomy.md#7-data-visualization-elements); [Category: Not added](category.md#not-added)                                                               | Not needed.                                                                                          |
| A2  | Collapsible      | [Collapsible](../scopes/Behaviors/collapsible.scope.md#purpose)      | Existing object | Behaviors                                          | [Angular Material: Disclosure and content activation](angular-material/inventory/BEHAVIORS.survey.md#subcategory-disclosure-and-content-activation); [OpenUI5 Behaviors](openui5/category.md#subcategories)                                                                        | [HTML: details element](https://html.spec.whatwg.org/#the-details-element)                           |
| A3  | Report           | [Report](../scopes/Views/report.scope.md#purpose)                    | Existing object | Container elements: Workspace surfaces             | [OpenUI5 Views](openui5/category.md#subcategories)                                                                                                                                                                                                                                 | Not needed.                                                                                          |
| A4  | Dashboard        | [Dashboard](../scopes/Pages/dashboard.scope.md#purpose)              | Existing object | Container elements: Workspace surfaces             | [OpenUI5 Pages: Dashboard](openui5/inventory/Pages.survey.md#dashboard)                                                                                                                                                                                                            | Not needed.                                                                                          |
| A5  | Shell page       | [Shell page](../scopes/Pages/shell_page.scope.md#purpose)            | Existing object | Container elements: Workspace surfaces             | [OpenUI5 Pages: Shell page](openui5/inventory/Pages.survey.md#shell-page)                                                                                                                                                                                                          | Not needed.                                                                                          |
| A6  | Empty page       | [Empty page](../scopes/Pages/empty_page.scope.md#purpose)            | Existing object | Container elements: Workspace surfaces             | [OpenUI5 Pages: Empty page](openui5/inventory/Pages.survey.md#empty-page)                                                                                                                                                                                                          | Not needed.                                                                                          |
| A7  | Navigation item  | [Navigation item](../scopes/Application/nav_item.scope.md#purpose)   | Existing object | Navigational elements: Application navigation      | [Angular Material Navigation and workflow](angular-material/inventory/Navigation-and-workflow.survey.md#direct-objects)                                                                                                                                                            | [HTML: nav element](https://html.spec.whatwg.org/#the-nav-element)                                   |
| A8  | Navigation group | [Navigation group](../scopes/Application/nav_group.scope.md#purpose) | Existing object | Navigational elements: Application navigation      | [Angular Material Navigation and workflow](angular-material/inventory/Navigation-and-workflow.survey.md#direct-objects)                                                                                                                                                            | [HTML: nav element](https://html.spec.whatwg.org/#the-nav-element)                                   |
| A9  | Tool action      | [Tool action](../scopes/Application/tool_action.scope.md#purpose)    | Existing object | Container elements: Workspace surfaces             | [OpenUI5 Tool bars](openui5/inventory/Application.survey.md#tool-bars); [Qt Tool bars](qt/taxonomy_mapping.md#applicationtool_barsscopemd)                                                                                                                                         | [Qt: QToolBar](https://doc.qt.io/qt-6/qtoolbar.html#details)                                         |
| A10 | Tool bar row     | [Tool bar row](../scopes/Application/tool_bar_row.scope.md#purpose)  | Existing object | Container elements: Workspace surfaces             | [OpenUI5 Tool bars](openui5/inventory/Application.survey.md#tool-bars); [Angular Material toolbar](angular-material/taxonomy_mapping.md#applicationtool_barsscopemd)                                                                                                               | [Qt: QToolBar](https://doc.qt.io/qt-6/qtoolbar.html#details)                                         |
| A11 | Route            | [Route](../scopes/Application/route.scope.md#purpose)                | Existing object | Navigational elements: Application navigation      | [OpenUI5 Application](openui5/category.md#subcategories); [Application navigation scope](../scopes/Application/navigation.scope.md#purpose); [OpenUI5 review: survey gap](openui5/opens.md#o6-spec-objects-without-a-match) (`sap.ui.core.routing.Route`)                          | [HTML: navigation and session history](https://html.spec.whatwg.org/#navigation-and-session-history) |
| A12 | Routing          | [Routing](../scopes/Application/routing.scope.md#purpose)            | Existing object | Navigational elements: Application navigation      | [OpenUI5 Application](openui5/category.md#subcategories); [Application navigation scope](../scopes/Application/navigation.scope.md#purpose); [OpenUI5 review: survey gap](openui5/opens.md#o6-spec-objects-without-a-match) (`sap.ui.core.routing.Router`, `sap.m.routing.Router`) | [HTML: navigation and session history](https://html.spec.whatwg.org/#navigation-and-session-history) |

Navigation item and group, Route and Routing join Navigation bar, and Tool action and Tool
bar row join Toolbar, so each part sits in the same subcategory as the element that owns
it.

### Data trees

Approved (2026-09-27). Tree view covers trees used to navigate. A tree that only shows
hierarchical data is presentation, so it gets its own entry next to List and Table. The
names are the WAI-ARIA role names (canonical-term rule 2).

| #   | Add       | Spec object                                               | Level | Section: subcategory                               | Evidence                                                                                                                                                                                                                                                              | Source URL                                                             |
| --- | --------- | --------------------------------------------------------- | ----- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| A13 | Tree      | [List](../scopes/Widgets/list.scope.md#purpose)           | Alias | Output elements: Collections and data presentation | [OpenUI5 List](openui5/taxonomy_mapping.md#widgetslistscopemd) (`sap.m.StandardTreeItem`, `sap.m.CustomTreeItem`); [OpenUI5 Navigation widgets](openui5/taxonomy_mapping.md#widgetsnavigation_widgetsscopemd) (`sap.m.Tree`, built on the list base `sap.m.ListBase`) | [WAI-ARIA 1.2: tree](https://www.w3.org/TR/wai-aria-1.2/#tree)         |
| A14 | Tree grid | [Data grid](../scopes/Widgets/data_grid.scope.md#purpose) | Alias | Output elements: Collections and data presentation | [OpenUI5 Data grid](openui5/taxonomy_mapping.md#widgetsdata_gridscopemd) (`sap.ui.table.TreeTable`)                                                                                                                                                                   | [WAI-ARIA 1.2: treegrid](https://www.w3.org/TR/wai-aria-1.2/#treegrid) |

### Not added

- **favicon.ico and index.html:** content, not UI elements. index.html is also the
  manifest of a page, which its scope contract already describes.
- **Native:** a marker for a standard platform capability, not a UI concept. OpenUI5 matched
  95 classes to it; they already fall under the Input and Output subcategories.
- **Per-framework names** (for example Qt `QComboBox` for Dropdown): they belong in the alias
  table (W1 step 9.9) and the cross-source matrix (W0 task 5), not in the mapping.
- **Qt "Enhance" rows** (71): they ask for richer contracts of existing scopes, not a
  different mapping. They go to W0 task 6 and W6 task 25.
- **Survey labels** (HTML correspondence, Qt merge disposition, OpenUI5 classification):
  they describe the survey evidence, not the specification.
- **OpenUI5 clusters and the proposed scopes** of Qt and Angular Material: settled by the
  approved terminology Add rows and the
  [structure change](structure_change.md#add).

## Appendix A: What each survey mapping contributes

| Survey mapping                                                   | Maps                                                    | Label axis                                                                             | Used here for                                                                                                                                                                         |
| ---------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [HTML Standard](html5/taxonomy_mapping.md#summary)               | each canonical entry to an HTML primitive and a scope   | HTML correspondence (for example Direct primitive, No direct match, Semantic mismatch) | Confirming every scope target (Kept); semantic mismatches C3, C4; missing handle primitives C1, C2                                                                                    |
| [Qt Widgets](qt/taxonomy_mapping.md#summary)                     | each Qt class to its best scope                         | Merge disposition (Reuse, Enhance, Owned part, Folder notion, New leaf, Deferred)      | Owned parts C1, C2; tool bar parts A9, A10; Enhance rows routed out (Not added)                                                                                                       |
| [Angular Material](angular-material/taxonomy_mapping.md#summary) | each component family to a primary and secondary scopes | Abstraction level                                                                      | One spec object per row (Kept); navigation and tool bar parts A7, A8, A10; Collapsible A2                                                                                             |
| [OpenUI5](openui5/taxonomy_mapping.md#summary)                   | each matched class to a scope                           | Classification (all Matched)                                                           | Chart, Report, the Pages entries, Route and Routing A1, A3–A6, A11, A12; Native (Not added); routing classes and a column resizer found by the review of its leftovers (A11, A12, C2) |
