# Examples

Worked OpenUI documents, one per scope, illustrating how each
[`scope`](../scopes/scope.md) translates into the JSON document format defined in
[`../README.md`](../README.md). Every file is a complete, schema-valid OpenUI
document (`id: "root"`, `version`, `type`, `children`) that exercises the
attributes its scope describes, using Angular-Material-style `[uses]` and
`(produces)` / `(behaves)` attribute keys for illustration only — the format is
framework-independent.

The folder mirrors [`../scopes`](../scopes/scope.md): each leaf scope has a
`<object>.example.json`, and each parent scope has a composite `scope.example.json`
that assembles its child objects into a realistic whole.

## Index

| Scope                                                                | Example                                                                                |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [Scopes](../scopes/scope.md)                                         | [scope.example.json](scope.example.json)                                               |
| [Application](../scopes/Application/scope.md)                        | [Application/scope.example.json](Application/scope.example.json)                       |
| [Routing](../scopes/Application/routing.scope.md)                    | [Application/routing.example.json](Application/routing.example.json)                   |
| [Navigation](../scopes/Application/navigation.scope.md)              | [Application/navigation.example.json](Application/navigation.example.json)             |
| [Tool bars](../scopes/Application/tool_bars.scope.md)                | [Application/tool_bars.example.json](Application/tool_bars.example.json)               |
| [favicon.ico](../scopes/Application/favicon.scope.md)                | [Application/favicon.example.json](Application/favicon.example.json)                   |
| [index.html](../scopes/Application/index_html.scope.md)              | [Application/index_html.example.json](Application/index_html.example.json)             |
| [Controls](../scopes/Controls/scope.md)                              | [Controls/scope.example.json](Controls/scope.example.json)                             |
| [Native](../scopes/Controls/native.scope.md)                         | [Controls/native.example.json](Controls/native.example.json)                           |
| [Behaviors](../scopes/Behaviors/scope.md)                            | [Behaviors/scope.example.json](Behaviors/scope.example.json)                           |
| [Drag and drop](../scopes/Behaviors/drag_and_drop.scope.md)          | [Behaviors/drag_and_drop.example.json](Behaviors/drag_and_drop.example.json)           |
| [Resizable](../scopes/Behaviors/resizable.scope.md)                  | [Behaviors/resizable.example.json](Behaviors/resizable.example.json)                   |
| [Collapsible](../scopes/Behaviors/collapsible.scope.md)              | [Behaviors/collapsible.example.json](Behaviors/collapsible.example.json)               |
| [Pages](../scopes/Pages/scope.md)                                    | [Pages/scope.example.json](Pages/scope.example.json)                                   |
| [Dashboard](../scopes/Pages/dashboard.scope.md)                      | [Pages/dashboard.example.json](Pages/dashboard.example.json)                           |
| [Shell page](../scopes/Pages/shell_page.scope.md)                    | [Pages/shell_page.example.json](Pages/shell_page.example.json)                         |
| [Empty page](../scopes/Pages/empty_page.scope.md)                    | [Pages/empty_page.example.json](Pages/empty_page.example.json)                         |
| [Views](../scopes/Views/scope.md)                                    | [Views/scope.example.json](Views/scope.example.json)                                   |
| [Reports](../scopes/Views/reports.scope.md)                          | [Views/reports.example.json](Views/reports.example.json)                               |
| [Forms](../scopes/Views/forms.scope.md)                              | [Views/forms.example.json](Views/forms.example.json)                                   |
| [Containers](../scopes/Containers/scope.md)                          | [Containers/scope.example.json](Containers/scope.example.json)                         |
| [Grid](../scopes/Containers/grid.scope.md)                           | [Containers/grid.example.json](Containers/grid.example.json)                           |
| [Expandable panels](../scopes/Containers/expandable_panels.scope.md) | [Containers/expandable_panels.example.json](Containers/expandable_panels.example.json) |
| [Tabs](../scopes/Containers/tabs.scope.md)                           | [Containers/tabs.example.json](Containers/tabs.example.json)                           |
| [Widgets](../scopes/Widgets/scope.md)                                | [Widgets/scope.example.json](Widgets/scope.example.json)                               |
| [Charts](../scopes/Widgets/charts.scope.md)                          | [Widgets/charts.example.json](Widgets/charts.example.json)                             |
| [Tables](../scopes/Widgets/tables.scope.md)                          | [Widgets/tables.example.json](Widgets/tables.example.json)                             |
| [Lists](../scopes/Widgets/lists.scope.md)                            | [Widgets/lists.example.json](Widgets/lists.example.json)                               |
| [Date/Time pickers](../scopes/Widgets/date_time_pickers.scope.md)    | [Widgets/date_time_pickers.example.json](Widgets/date_time_pickers.example.json)       |
| [Stepper](../scopes/Widgets/stepper.scope.md)                        | [Widgets/stepper.example.json](Widgets/stepper.example.json)                           |
| [Dialog](../scopes/Widgets/dialog.scope.md)                          | [Widgets/dialog.example.json](Widgets/dialog.example.json)                             |
