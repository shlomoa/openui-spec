# Generated example fixture workspaces

This directory holds one input/output fixture workspace pair per source example
discovered under [`spec/examples/`](../../../../../spec/examples/) (Step 1 of
[`populating_test_use_cases.md`](populating_test_use_cases.md)).

For each `<object_name>.example.json` source example there is a
`<object_name>/` folder containing:

- `input_<object_name>/` — the source workspace (populated in later steps).
- `output_<object_name>/` — the expected generated workspace (populated in later steps).

Each composite `scope.example.json` shares the same `scope` stem, so it is
disambiguated by its category folder (for example `Application/scope.example.json`
becomes `application_scope/`); the top-level `scope.example.json` keeps the plain
`scope` name.

The scenario fixtures `example_from_scratch/` and `example_incremental/` are not
part of this generated inventory and are maintained separately.

## Inventory

| Fixture                       | Source example                                                                                                                                |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `action_controls/`            | [`spec/examples/Controls/action_controls.example.json`](../../../../../spec/examples/Controls/action_controls.example.json)                   |
| `application_scope/`          | [`spec/examples/Application/scope.example.json`](../../../../../spec/examples/Application/scope.example.json)                                 |
| `behaviors_scope/`            | [`spec/examples/Behaviors/scope.example.json`](../../../../../spec/examples/Behaviors/scope.example.json)                                     |
| `charts/`                     | [`spec/examples/Widgets/charts.example.json`](../../../../../spec/examples/Widgets/charts.example.json)                                       |
| `choice_controls/`            | [`spec/examples/Controls/choice_controls.example.json`](../../../../../spec/examples/Controls/choice_controls.example.json)                   |
| `collapsible/`                | [`spec/examples/Behaviors/collapsible.example.json`](../../../../../spec/examples/Behaviors/collapsible.example.json)                         |
| `containers_scope/`           | [`spec/examples/Containers/scope.example.json`](../../../../../spec/examples/Containers/scope.example.json)                                   |
| `controls_scope/`             | [`spec/examples/Controls/scope.example.json`](../../../../../spec/examples/Controls/scope.example.json)                                       |
| `dashboard/`                  | [`spec/examples/Pages/dashboard.example.json`](../../../../../spec/examples/Pages/dashboard.example.json)                                     |
| `data_grid/`                  | [`spec/examples/Widgets/data_grid.example.json`](../../../../../spec/examples/Widgets/data_grid.example.json)                                 |
| `date_time_pickers/`          | [`spec/examples/Widgets/date_time_pickers.example.json`](../../../../../spec/examples/Widgets/date_time_pickers.example.json)                 |
| `dialog/`                     | [`spec/examples/Widgets/dialog.example.json`](../../../../../spec/examples/Widgets/dialog.example.json)                                       |
| `display_primitives/`         | [`spec/examples/Controls/display_primitives.example.json`](../../../../../spec/examples/Controls/display_primitives.example.json)             |
| `drawing_and_capture/`        | [`spec/examples/Controls/drawing_and_capture.example.json`](../../../../../spec/examples/Controls/drawing_and_capture.example.json)           |
| `drag_and_drop/`              | [`spec/examples/Behaviors/drag_and_drop.example.json`](../../../../../spec/examples/Behaviors/drag_and_drop.example.json)                     |
| `empty_page/`                 | [`spec/examples/Pages/empty_page.example.json`](../../../../../spec/examples/Pages/empty_page.example.json)                                   |
| `expandable_panels/`          | [`spec/examples/Containers/expandable_panels.example.json`](../../../../../spec/examples/Containers/expandable_panels.example.json)           |
| `feedback_widgets/`           | [`spec/examples/Widgets/feedback_widgets.example.json`](../../../../../spec/examples/Widgets/feedback_widgets.example.json)                   |
| `favicon/`                    | [`spec/examples/Application/favicon.example.json`](../../../../../spec/examples/Application/favicon.example.json)                             |
| `forms/`                      | [`spec/examples/Views/forms.example.json`](../../../../../spec/examples/Views/forms.example.json)                                             |
| `grid/`                       | [`spec/examples/Containers/grid.example.json`](../../../../../spec/examples/Containers/grid.example.json)                                     |
| `index_html/`                 | [`spec/examples/Application/index_html.example.json`](../../../../../spec/examples/Application/index_html.example.json)                       |
| `interaction_scope/`          | [`spec/examples/Interaction/scope.example.json`](../../../../../spec/examples/Interaction/scope.example.json)                                 |
| `internationalization_scope/` | [`spec/examples/Internationalization/scope.example.json`](../../../../../spec/examples/Internationalization/scope.example.json)               |
| `layout_scope/`               | [`spec/examples/Layout/scope.example.json`](../../../../../spec/examples/Layout/scope.example.json)                                           |
| `link_and_scroll_controls/`   | [`spec/examples/Controls/link_and_scroll_controls.example.json`](../../../../../spec/examples/Controls/link_and_scroll_controls.example.json) |
| `lists/`                      | [`spec/examples/Widgets/lists.example.json`](../../../../../spec/examples/Widgets/lists.example.json)                                         |
| `media_widgets/`              | [`spec/examples/Widgets/media_widgets.example.json`](../../../../../spec/examples/Widgets/media_widgets.example.json)                         |
| `menu_widgets/`               | [`spec/examples/Widgets/menu_widgets.example.json`](../../../../../spec/examples/Widgets/menu_widgets.example.json)                           |
| `native/`                     | [`spec/examples/Controls/native.example.json`](../../../../../spec/examples/Controls/native.example.json)                                     |
| `navigation/`                 | [`spec/examples/Application/navigation.example.json`](../../../../../spec/examples/Application/navigation.example.json)                       |
| `navigation_widgets/`         | [`spec/examples/Widgets/navigation_widgets.example.json`](../../../../../spec/examples/Widgets/navigation_widgets.example.json)               |
| `overlay_containers/`         | [`spec/examples/Containers/overlay_containers.example.json`](../../../../../spec/examples/Containers/overlay_containers.example.json)         |
| `pages_scope/`                | [`spec/examples/Pages/scope.example.json`](../../../../../spec/examples/Pages/scope.example.json)                                             |
| `picker_controls/`            | [`spec/examples/Controls/picker_controls.example.json`](../../../../../spec/examples/Controls/picker_controls.example.json)                   |
| `presentation_scope/`         | [`spec/examples/Presentation/scope.example.json`](../../../../../spec/examples/Presentation/scope.example.json)                               |
| `range_controls/`             | [`spec/examples/Controls/range_controls.example.json`](../../../../../spec/examples/Controls/range_controls.example.json)                     |
| `reports/`                    | [`spec/examples/Views/reports.example.json`](../../../../../spec/examples/Views/reports.example.json)                                         |
| `resizable/`                  | [`spec/examples/Behaviors/resizable.example.json`](../../../../../spec/examples/Behaviors/resizable.example.json)                             |
| `routing/`                    | [`spec/examples/Application/routing.example.json`](../../../../../spec/examples/Application/routing.example.json)                             |
| `scope/`                      | [`spec/examples/scope.example.json`](../../../../../spec/examples/scope.example.json)                                                         |
| `sheet_containers/`           | [`spec/examples/Containers/sheet_containers.example.json`](../../../../../spec/examples/Containers/sheet_containers.example.json)             |
| `shell_page/`                 | [`spec/examples/Pages/shell_page.example.json`](../../../../../spec/examples/Pages/shell_page.example.json)                                   |
| `splitters/`                  | [`spec/examples/Containers/splitters.example.json`](../../../../../spec/examples/Containers/splitters.example.json)                           |
| `status_indicators/`          | [`spec/examples/Controls/status_indicators.example.json`](../../../../../spec/examples/Controls/status_indicators.example.json)               |
| `stepper/`                    | [`spec/examples/Widgets/stepper.example.json`](../../../../../spec/examples/Widgets/stepper.example.json)                                     |
| `structural_containers/`      | [`spec/examples/Containers/structural_containers.example.json`](../../../../../spec/examples/Containers/structural_containers.example.json)   |
| `surface_containers/`         | [`spec/examples/Containers/surface_containers.example.json`](../../../../../spec/examples/Containers/surface_containers.example.json)         |
| `table/`                      | [`spec/examples/Controls/Table/table.example.json`](../../../../../spec/examples/Controls/Table/table.example.json)                           |
| `table_scope/`                | [`spec/examples/Controls/Table/scope.example.json`](../../../../../spec/examples/Controls/Table/scope.example.json)                           |
| `tables/`                     | [`spec/examples/Widgets/tables.example.json`](../../../../../spec/examples/Widgets/tables.example.json)                                       |
| `tabs/`                       | [`spec/examples/Containers/tabs.example.json`](../../../../../spec/examples/Containers/tabs.example.json)                                     |
| `td/`                         | [`spec/examples/Controls/Table/td.example.json`](../../../../../spec/examples/Controls/Table/td.example.json)                                 |
| `text_inputs/`                | [`spec/examples/Controls/text_inputs.example.json`](../../../../../spec/examples/Controls/text_inputs.example.json)                           |
| `th/`                         | [`spec/examples/Controls/Table/th.example.json`](../../../../../spec/examples/Controls/Table/th.example.json)                                 |
| `tool_bars/`                  | [`spec/examples/Application/tool_bars.example.json`](../../../../../spec/examples/Application/tool_bars.example.json)                         |
| `tr/`                         | [`spec/examples/Controls/Table/tr.example.json`](../../../../../spec/examples/Controls/Table/tr.example.json)                                 |
| `views_scope/`                | [`spec/examples/Views/scope.example.json`](../../../../../spec/examples/Views/scope.example.json)                                             |
| `widgets_scope/`              | [`spec/examples/Widgets/scope.example.json`](../../../../../spec/examples/Widgets/scope.example.json)                                         |
