# Examples

Worked OpenUI documents, one per scope, illustrating how each
[`scope`](../scopes/scope.md) translates into the JSON document format defined in
[`../README.md`](../README.md). Every file is a complete, schema-valid OpenUI
document (`id: "root"`, `version`, `type`, `children`) that exercises the
attributes its scope describes, using Angular-Material-style `[uses]` and
`(produces)` / `(behaves)` attribute keys for illustration only — the format is
framework-independent.
Vocabulary and aliases used by examples are defined in the
[spec glossary](../README.md#glossary); examples demonstrate usage and should not
redefine shared terms.

The folder mirrors [`../scopes`](../scopes/scope.md): each leaf scope has a
`<object>.example.json`, and each parent scope has a composite `scope.example.json`
that assembles its child objects into a realistic whole.

## Index

| Scope                                                                            | Example                                                                                          |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [Scopes](../scopes/scope.md)                                                     | [scope.example.json](scope.example.json)                                                         |
| [Application](../scopes/Application/scope.md)                                    | [Application/scope.example.json](Application/scope.example.json)                                 |
| [Routing](../scopes/Application/routing.scope.md)                                | [Application/routing.example.json](Application/routing.example.json)                             |
| [Navigation](../scopes/Application/navigation.scope.md)                          | [Application/navigation.example.json](Application/navigation.example.json)                       |
| [Tool bars](../scopes/Application/tool_bars.scope.md)                            | [Application/tool_bars.example.json](Application/tool_bars.example.json)                         |
| [favicon.ico](../scopes/Application/favicon.scope.md)                            | [Application/favicon.example.json](Application/favicon.example.json)                             |
| [index.html](../scopes/Application/index_html.scope.md)                          | [Application/index_html.example.json](Application/index_html.example.json)                       |
| [Controls](../scopes/Controls/scope.md)                                          | [Controls/scope.example.json](Controls/scope.example.json)                                       |
| [Native](../scopes/Controls/native.scope.md)                                     | [Controls/native.example.json](Controls/native.example.json)                                     |
| [Action controls](../scopes/Controls/action_controls.scope.md)                   | [Controls/action_controls.example.json](Controls/action_controls.example.json)                   |
| [Text inputs](../scopes/Controls/text_inputs.scope.md)                           | [Controls/text_inputs.example.json](Controls/text_inputs.example.json)                           |
| [Choice controls](../scopes/Controls/choice_controls.scope.md)                   | [Controls/choice_controls.example.json](Controls/choice_controls.example.json)                   |
| [Picker controls](../scopes/Controls/picker_controls.scope.md)                   | [Controls/picker_controls.example.json](Controls/picker_controls.example.json)                   |
| [Range controls](../scopes/Controls/range_controls.scope.md)                     | [Controls/range_controls.example.json](Controls/range_controls.example.json)                     |
| [Drawing and capture](../scopes/Controls/drawing_and_capture.scope.md)           | [Controls/drawing_and_capture.example.json](Controls/drawing_and_capture.example.json)           |
| [Display primitives](../scopes/Controls/display_primitives.scope.md)             | [Controls/display_primitives.example.json](Controls/display_primitives.example.json)             |
| [Status indicators](../scopes/Controls/status_indicators.scope.md)               | [Controls/status_indicators.example.json](Controls/status_indicators.example.json)               |
| [Link and scroll controls](../scopes/Controls/link_and_scroll_controls.scope.md) | [Controls/link_and_scroll_controls.example.json](Controls/link_and_scroll_controls.example.json) |
| [Behaviors](../scopes/Behaviors/scope.md)                                        | [Behaviors/scope.example.json](Behaviors/scope.example.json)                                     |
| [Drag and drop](../scopes/Behaviors/drag_and_drop.scope.md)                      | [Behaviors/drag_and_drop.example.json](Behaviors/drag_and_drop.example.json)                     |
| [Resizable](../scopes/Behaviors/resizable.scope.md)                              | [Behaviors/resizable.example.json](Behaviors/resizable.example.json)                             |
| [Collapsible](../scopes/Behaviors/collapsible.scope.md)                          | [Behaviors/collapsible.example.json](Behaviors/collapsible.example.json)                         |
| [Pages](../scopes/Pages/scope.md)                                                | [Pages/scope.example.json](Pages/scope.example.json)                                             |
| [Dashboard](../scopes/Pages/dashboard.scope.md)                                  | [Pages/dashboard.example.json](Pages/dashboard.example.json)                                     |
| [Shell page](../scopes/Pages/shell_page.scope.md)                                | [Pages/shell_page.example.json](Pages/shell_page.example.json)                                   |
| [Empty page](../scopes/Pages/empty_page.scope.md)                                | [Pages/empty_page.example.json](Pages/empty_page.example.json)                                   |
| [Views](../scopes/Views/scope.md)                                                | [Views/scope.example.json](Views/scope.example.json)                                             |
| [Report](../scopes/Views/report.scope.md)                                        | [Views/report.example.json](Views/report.example.json)                                           |
| [Form](../scopes/Views/form.scope.md)                                            | [Views/form.example.json](Views/form.example.json)                                               |
| [Containers](../scopes/Containers/scope.md)                                      | [Containers/scope.example.json](Containers/scope.example.json)                                   |
| [Grid](../scopes/Containers/grid.scope.md)                                       | [Containers/grid.example.json](Containers/grid.example.json)                                     |
| [Expandable panels](../scopes/Containers/expandable_panels.scope.md)             | [Containers/expandable_panels.example.json](Containers/expandable_panels.example.json)           |
| [Tabs](../scopes/Containers/tabs.scope.md)                                       | [Containers/tabs.example.json](Containers/tabs.example.json)                                     |
| [Surface containers](../scopes/Containers/surface_containers.scope.md)           | [Containers/surface_containers.example.json](Containers/surface_containers.example.json)         |
| [Sheet containers](../scopes/Containers/sheet_containers.scope.md)               | [Containers/sheet_containers.example.json](Containers/sheet_containers.example.json)             |
| [Overlay containers](../scopes/Containers/overlay_containers.scope.md)           | [Containers/overlay_containers.example.json](Containers/overlay_containers.example.json)         |
| [Structural containers](../scopes/Containers/structural_containers.scope.md)     | [Containers/structural_containers.example.json](Containers/structural_containers.example.json)   |
| [Splitters](../scopes/Containers/splitters.scope.md)                             | [Containers/splitters.example.json](Containers/splitters.example.json)                           |
| [Widgets](../scopes/Widgets/scope.md)                                            | [Widgets/scope.example.json](Widgets/scope.example.json)                                         |
| [Chart](../scopes/Widgets/chart.scope.md)                                        | [Widgets/chart.example.json](Widgets/chart.example.json)                                         |
| [Table](../scopes/Widgets/table.scope.md)                                        | [Widgets/table.example.json](Widgets/table.example.json)                                         |
| [List](../scopes/Widgets/list.scope.md)                                          | [Widgets/list.example.json](Widgets/list.example.json)                                           |
| [Date/Time pickers](../scopes/Widgets/date_time_pickers.scope.md)                | [Widgets/date_time_pickers.example.json](Widgets/date_time_pickers.example.json)                 |
| [Stepper](../scopes/Widgets/stepper.scope.md)                                    | [Widgets/stepper.example.json](Widgets/stepper.example.json)                                     |
| [Dialog](../scopes/Widgets/dialog.scope.md)                                      | [Widgets/dialog.example.json](Widgets/dialog.example.json)                                       |
| [Data grid](../scopes/Widgets/data_grid.scope.md)                                | [Widgets/data_grid.example.json](Widgets/data_grid.example.json)                                 |
| [Feedback widgets](../scopes/Widgets/feedback_widgets.scope.md)                  | [Widgets/feedback_widgets.example.json](Widgets/feedback_widgets.example.json)                   |
| [Media widgets](../scopes/Widgets/media_widgets.scope.md)                        | [Widgets/media_widgets.example.json](Widgets/media_widgets.example.json)                         |
| [Navigation widgets](../scopes/Widgets/navigation_widgets.scope.md)              | [Widgets/navigation_widgets.example.json](Widgets/navigation_widgets.example.json)               |
| [Menu widgets](../scopes/Widgets/menu_widgets.scope.md)                          | [Widgets/menu_widgets.example.json](Widgets/menu_widgets.example.json)                           |
| [Layout](../scopes/Layout/scope.md)                                              | [Layout/scope.example.json](Layout/scope.example.json)                                           |
| [Presentation](../scopes/Presentation/scope.md)                                  | [Presentation/scope.example.json](Presentation/scope.example.json)                               |
| [Internationalization](../scopes/Internationalization/scope.md)                  | [Internationalization/scope.example.json](Internationalization/scope.example.json)               |
| [Interaction](../scopes/Interaction/scope.md)                                    | [Interaction/scope.example.json](Interaction/scope.example.json)                                 |
