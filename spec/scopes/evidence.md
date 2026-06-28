# Scope evidence register

This register is the single source of truth for scope-to-source traceability.
Each leaf `*.scope.md` under `scopes/` has exactly one entry recording the
approved source(s) that authorize its enrichment against the
[leaf scope template](scope.md).

Source kinds: requirement · `spec/README.md` rule · explicit decision · HTML
standard primitive · external framework example. HTML primitives and
`spec/README.md` rules are technology-neutral and recorded as the actual
contract; framework examples (e.g., Angular Material) are reference patterns
only.

| Leaf scope | Source | Citation | Authorizes |
| --- | --- | --- | --- |
| `scopes/Application/routing.scope.md` | `spec/README.md` rule | "Application-level route definitions and route resolution." | Purpose; Child model (route definitions). |
| `scopes/Application/navigation.scope.md` | `spec/README.md` rule | "User-facing navigation exposing routes, pages, and views." | Purpose; Child model (exposes routes, pages, views). |
| `scopes/Application/tool_bars.scope.md` | `spec/README.md` rule | "Application-level command surfaces and action placement." | Purpose; Child model (commands and actions). |
| `scopes/Application/favicon.scope.md` | `spec/README.md` rule | "Application icon asset for browser and shell identity." | Purpose (icon asset contract: path, sizes, variants, fallback). |
| `scopes/Application/index_html.scope.md` | `spec/README.md` rule; HTML primitive (`html`) | "Application host document and static bootstrap metadata." | Purpose; Attributes (host-document metadata) from the HTML standard. |
| `scopes/Controls/native.scope.md` | HTML primitive (`input`); `spec/README.md` rule | "Native controls and presentation (scroll bars, fonts, color schemes)." | Purpose; Attributes from the HTML standard (`input` `type`, `value`, `placeholder`, `disabled`). |
| `scopes/Controls/Table/table.scope.md` | HTML primitive (`table`) | Standard `table` element (tabular data container) | Purpose; Child model (`tr` rows). |
| `scopes/Controls/Table/tr.scope.md` | HTML primitive (`tr`) | Standard `tr` element (table row) | Purpose; Child model (`th` / `td` cells). |
| `scopes/Controls/Table/th.scope.md` | HTML primitive (`th`) | Standard `th` attributes (`colspan`, `rowspan`, `scope`, `headers`, `abbr`) | Purpose; Attributes; Child model (flow content). |
| `scopes/Controls/Table/td.scope.md` | HTML primitive (`td`) | Standard `td` attributes (`colspan`, `rowspan`, `headers`) | Purpose; Attributes; Child model (flow content). |
| `scopes/Behaviors/drag_and_drop.scope.md` | `spec/README.md` rule | "Move elements within a page, view, container, or widget." | Purpose; Child model (applies to page, view, container, widget). |
| `scopes/Behaviors/resizable.scope.md` | `spec/README.md` rule | "Resize elements within a page or view." | Purpose; Child model (applies to page, view). |
| `scopes/Behaviors/collapsible.scope.md` | `spec/README.md` rule | "Collapse and expand elements within a page or view." | Purpose; Child model (applies to page, view). |
| `scopes/Pages/dashboard.scope.md` | `spec/README.md` rule; external framework example (Angular Material Dashboard schematic) | "Overview metrics and summary content layout." | Purpose (Dashboard schematic as reference pattern). |
| `scopes/Pages/shell_page.scope.md` | `spec/README.md` rule | "A page with no content but with routing and navigation." | Purpose; Child model (no content; routing and navigation). |
| `scopes/Pages/empty_page.scope.md` | `spec/README.md` rule | "A page with no content and no routing or navigation." | Purpose; Child model (no content, no routing or navigation). |
| `scopes/Views/reports.scope.md` | `spec/README.md` rule | "Read-only data with filtering, sorting, grouping, and pagination." | Purpose; Behaves (filter, sort, group, paginate; read-only). |
| `scopes/Views/forms.scope.md` | `spec/README.md` rule | "Read-write data with validation, submission, and dirty state." | Purpose; Behaves (validation, submission, dirty state; read-write). |
| `scopes/Containers/grid.scope.md` | `spec/README.md` rule | "Arranges children in rows and columns." | Purpose; Child model (children in rows and columns). |
| `scopes/Containers/expandable_panels.scope.md` | `spec/README.md` rule | "Panels that expand or collapse to show or hide content." | Purpose; Behaves (expand, collapse). |
| `scopes/Containers/tabs.scope.md` | `spec/README.md` rule | "Tabbed interface switching between views or content." | Purpose; Child model (tabs of views or content). |
| `scopes/Widgets/charts.scope.md` | `spec/README.md` rule; external framework example | "Visual data representations (bar, line, pie)." | Purpose (chart variants; framework chart component as reference pattern). |
| `scopes/Widgets/tables.scope.md` | HTML primitive (`table`); `spec/README.md` rule | "Tabular data with sorting, filtering, and pagination." | Purpose; Child model (rows and cells from the HTML `table` model); Behaves (sort, filter, paginate). |
| `scopes/Widgets/lists.scope.md` | HTML primitive (`ul`/`li`); `spec/README.md` rule | "Lists of items with sorting, filtering, and pagination." | Purpose; Child model (list items); Behaves (sort, filter, paginate). |
| `scopes/Widgets/date_time_pickers.scope.md` | external framework example (Angular Material `mat-date-range-input`); `spec/README.md` rule | "Calendar-based date and time selection." | Purpose; Attributes (Angular Material binding as reference pattern only). |
| `scopes/Widgets/stepper.scope.md` | `spec/README.md` rule; external framework example (Angular Material stepper) | "Guides users through a multi-step process." | Purpose; Child model (ordered steps; framework stepper as reference pattern). |
| `scopes/Widgets/dialog.scope.md` | HTML primitive (`dialog`); `spec/README.md` rule | "Modal or non-modal dialog with title, content, and actions." | Purpose; Attributes (`[open]`, `[modal]`, `(close)`, `(cancel)` from the HTML `dialog` element); Child model (title, content, actions). |
