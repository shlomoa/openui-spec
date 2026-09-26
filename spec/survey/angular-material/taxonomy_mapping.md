# Angular Material survey: taxonomy mapping

[Survey README](README.md) · [Categories](category.md) · [Scopes proposal](scopes_proposal.md)

This file normalizes the Angular Material survey's [taxonomy crosswalk](inventory/TAXONOMY_MAPPING.md). Each row is one component family mapped to an OpenUI scope. Category-level and artifact-role mappings stay in the source crosswalk; capability relationships are in [BEHAVIOR_MAPPING.md](inventory/BEHAVIOR_MAPPING.md).

The _Abstraction level_ column keeps the canonical labels (Existing object, Alias, Grouped leaf, Folder abstraction), with "proposed" marking candidate additions. Two families have no UI scope and are omitted here: `testing` (5 objects) and `schematics` (121 objects), which are implementation evidence only.

Scope paths are relative to `spec/scopes/`. The mapping records survey proposals only; the canonical scope tree, [taxonomy mapping](../../scopes/taxonomy_mapping.md) and generated catalog are unchanged.

## Summary

37 source entries map to 29 OpenUI scopes. Abstraction level totals: Alias 22, Existing object 5, Existing object; Alias 3, Existing object; Folder abstraction 2, Grouped leaf (proposed); Alias (existing variants) 1, Grouped leaf (proposed) 1, Alias; Folder abstraction 1, Folder abstraction; Alias 1, Folder abstraction 1.

| OpenUI scope                                                                                                | Primary entries | All mentions |
| ----------------------------------------------------------------------------------------------------------- | --------------: | -----------: |
| [Containers/form_field.scope.md (proposed)](inventory/proposed-scopes/Containers/form_field.scope.md)       |               1 |            1 |
| [Widgets/token_collection.scope.md (proposed)](inventory/proposed-scopes/Widgets/token_collection.scope.md) |               1 |            1 |
| [Application/navigation.scope.md](../../scopes/Application/navigation.scope.md)                             |               0 |            1 |
| [Application/tool_bars.scope.md](../../scopes/Application/tool_bars.scope.md)                               |               1 |            1 |
| [Containers/expandable_panels.scope.md](../../scopes/Containers/expandable_panels.scope.md)                 |               1 |            1 |
| [Containers/grid.scope.md](../../scopes/Containers/grid.scope.md)                                           |               1 |            1 |
| [Containers/overlay_containers.scope.md](../../scopes/Containers/overlay_containers.scope.md)               |               0 |            1 |
| [Containers/sheet_containers.scope.md](../../scopes/Containers/sheet_containers.scope.md)                   |               2 |            2 |
| [Containers/surface_containers.scope.md](../../scopes/Containers/surface_containers.scope.md)               |               1 |            2 |
| [Containers/tabs.scope.md](../../scopes/Containers/tabs.scope.md)                                           |               1 |            1 |
| [Controls/action_controls.scope.md](../../scopes/Controls/action_controls.scope.md)                         |               1 |            1 |
| [Controls/choice_controls.scope.md](../../scopes/Controls/choice_controls.scope.md)                         |               5 |            9 |
| [Controls/display_primitives.scope.md](../../scopes/Controls/display_primitives.scope.md)                   |               2 |            2 |
| [Controls/link_and_scroll_controls.scope.md](../../scopes/Controls/link_and_scroll_controls.scope.md)       |               0 |            2 |
| [Controls/range_control.scope.md](../../scopes/Controls/range_control.scope.md)                             |               1 |            1 |
| [Controls/status_indicator.scope.md](../../scopes/Controls/status_indicator.scope.md)                       |               3 |            4 |
| [Controls/text_inputs.scope.md](../../scopes/Controls/text_inputs.scope.md)                                 |               2 |            2 |
| [Interaction/scope.md](../../scopes/Interaction/scope.md)                                                   |               0 |            2 |
| [Internationalization/scope.md](../../scopes/Internationalization/scope.md)                                 |               0 |            1 |
| [Layout/scope.md](../../scopes/Layout/scope.md)                                                             |               0 |            1 |
| [Presentation/scope.md](../../scopes/Presentation/scope.md)                                                 |               2 |            3 |
| [Widgets/date_time_pickers.scope.md](../../scopes/Widgets/date_time_pickers.scope.md)                       |               2 |            2 |
| [Widgets/dialog.scope.md](../../scopes/Widgets/dialog.scope.md)                                             |               1 |            2 |
| [Widgets/feedback_widgets.scope.md](../../scopes/Widgets/feedback_widgets.scope.md)                         |               2 |            2 |
| [Widgets/list.scope.md](../../scopes/Widgets/list.scope.md)                                                 |               1 |            1 |
| [Widgets/menu_widgets.scope.md](../../scopes/Widgets/menu_widgets.scope.md)                                 |               1 |            1 |
| [Widgets/navigation_widgets.scope.md](../../scopes/Widgets/navigation_widgets.scope.md)                     |               2 |            3 |
| [Widgets/stepper.scope.md](../../scopes/Widgets/stepper.scope.md)                                           |               1 |            1 |
| [Widgets/table.scope.md](../../scopes/Widgets/table.scope.md)                                               |               2 |            2 |

## Entries by primary OpenUI scope

The first scope listed is the primary destination used for grouping; further scopes are secondary destinations named by the source row.

### Proposed: angular-material:Containers/form_field.scope.md

| Source entry            | Abstract concept               | Other OpenUI scopes | Abstraction level       | Source row                                                         |
| ----------------------- | ------------------------------ | ------------------- | ----------------------- | ------------------------------------------------------------------ |
| form-field (51 objects) | Form-field wrapper (new entry) | —                   | Grouped leaf (proposed) | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Proposed: angular-material:Widgets/token_collection.scope.md

| Source entry       | Abstract concept                 | Other OpenUI scopes                                                                                                                                                        | Abstraction level                                  | Source row                                                         |
| ------------------ | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------ |
| chips (61 objects) | Token collection; Tag / List box | [Controls/status_indicator.scope.md](../../scopes/Controls/status_indicator.scope.md); [Controls/choice_controls.scope.md](../../scopes/Controls/choice_controls.scope.md) | Grouped leaf (proposed); Alias (existing variants) | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Application/tool_bars.scope.md

| Source entry         | Abstract concept | Other OpenUI scopes                                                                           | Abstraction level      | Source row                                                         |
| -------------------- | ---------------- | --------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------ |
| toolbar (24 objects) | Toolbar          | [Containers/surface_containers.scope.md](../../scopes/Containers/surface_containers.scope.md) | Existing object; Alias | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Containers/expandable_panels.scope.md

| Source entry           | Abstract concept | Other OpenUI scopes | Abstraction level | Source row                                                         |
| ---------------------- | ---------------- | ------------------- | ----------------- | ------------------------------------------------------------------ |
| expansion (32 objects) | Accordion        | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Containers/grid.scope.md

| Source entry           | Abstract concept        | Other OpenUI scopes                             | Abstraction level                   | Source row                                                         |
| ---------------------- | ----------------------- | ----------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| grid-list (30 objects) | Grid / Sizing / Spacing | [Layout/scope.md](../../scopes/Layout/scope.md) | Existing object; Folder abstraction | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Containers/sheet_containers.scope.md

| Source entry              | Abstract concept                         | Other OpenUI scopes                                                                                                                                                      | Abstraction level | Source row                                                         |
| ------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ------------------------------------------------------------------ |
| bottom-sheet (26 objects) | Bottom sheet                             | [Widgets/dialog.scope.md](../../scopes/Widgets/dialog.scope.md)                                                                                                          | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |
| sidenav (32 objects)      | Sidebar / Side sheet / Navigation drawer | [Widgets/navigation_widgets.scope.md](../../scopes/Widgets/navigation_widgets.scope.md); [Application/navigation.scope.md](../../scopes/Application/navigation.scope.md) | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Containers/surface_containers.scope.md

| Source entry      | Abstract concept | Other OpenUI scopes | Abstraction level | Source row                                                         |
| ----------------- | ---------------- | ------------------- | ----------------- | ------------------------------------------------------------------ |
| card (26 objects) | Card             | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Containers/tabs.scope.md

| Source entry      | Abstract concept | Other OpenUI scopes | Abstraction level | Source row                                                         |
| ----------------- | ---------------- | ------------------- | ----------------- | ------------------------------------------------------------------ |
| tabs (52 objects) | Tab / Tab bar    | —                   | Existing object   | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Controls/action_controls.scope.md

| Source entry        | Abstract concept            | Other OpenUI scopes                                                                                   | Abstraction level | Source row                                                         |
| ------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------ |
| button (36 objects) | Button / Icon button / Link | [Controls/link_and_scroll_controls.scope.md](../../scopes/Controls/link_and_scroll_controls.scope.md) | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Controls/choice_controls.scope.md

| Source entry               | Abstract concept                | Other OpenUI scopes | Abstraction level | Source row                                                         |
| -------------------------- | ------------------------------- | ------------------- | ----------------- | ------------------------------------------------------------------ |
| button-toggle (26 objects) | Switch / Toggle                 | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |
| checkbox (25 objects)      | Checkbox                        | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |
| radio (24 objects)         | Radio button                    | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |
| select (24 objects)        | Dropdown / List box / Combo box | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |
| slide-toggle (24 objects)  | Switch / Toggle                 | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Controls/display_primitives.scope.md

| Source entry         | Abstract concept    | Other OpenUI scopes                                         | Abstraction level         | Source row                                                         |
| -------------------- | ------------------- | ----------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------ |
| divider (23 objects) | Divider / Separator | —                                                           | Alias                     | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |
| icon (25 objects)    | Icon / Iconography  | [Presentation/scope.md](../../scopes/Presentation/scope.md) | Alias; Folder abstraction | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Controls/range_control.scope.md

| Source entry        | Abstract concept | Other OpenUI scopes | Abstraction level | Source row                                                         |
| ------------------- | ---------------- | ------------------- | ----------------- | ------------------------------------------------------------------ |
| slider (30 objects) | Slider           | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Controls/status_indicator.scope.md

| Source entry                  | Abstract concept            | Other OpenUI scopes | Abstraction level | Source row                                                         |
| ----------------------------- | --------------------------- | ------------------- | ----------------- | ------------------------------------------------------------------ |
| badge (21 objects)            | Badge                       | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |
| progress-bar (23 objects)     | Progress bar                | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |
| progress-spinner (23 objects) | Loader / Progress indicator | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Controls/text_inputs.scope.md

| Source entry              | Abstract concept       | Other OpenUI scopes                                                                 | Abstraction level | Source row                                                         |
| ------------------------- | ---------------------- | ----------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------ |
| autocomplete (26 objects) | Text field / Combo box | [Controls/choice_controls.scope.md](../../scopes/Controls/choice_controls.scope.md) | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |
| input (25 objects)        | Text field / Text area | —                                                                                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Presentation/scope.md

| Source entry                 | Abstract concept                           | Other OpenUI scopes                                                                                                                                                                                                         | Abstraction level         | Source row                                                         |
| ---------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------ |
| core (201 objects)           | Theme / Focus / Formatting / Shared option | [Interaction/scope.md](../../scopes/Interaction/scope.md); [Internationalization/scope.md](../../scopes/Internationalization/scope.md); [Controls/choice_controls.scope.md](../../scopes/Controls/choice_controls.scope.md) | Folder abstraction; Alias | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |
| prebuilt-themes (11 objects) | Theme                                      | —                                                                                                                                                                                                                           | Folder abstraction        | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Widgets/date_time_pickers.scope.md

| Source entry            | Abstract concept | Other OpenUI scopes | Abstraction level | Source row                                                         |
| ----------------------- | ---------------- | ------------------- | ----------------- | ------------------------------------------------------------------ |
| datepicker (76 objects) | Date picker      | —                   | Existing object   | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |
| timepicker (32 objects) | Time picker      | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Widgets/dialog.scope.md

| Source entry        | Abstract concept       | Other OpenUI scopes                                                                           | Abstraction level      | Source row                                                         |
| ------------------- | ---------------------- | --------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------ |
| dialog (31 objects) | Dialog / Modal overlay | [Containers/overlay_containers.scope.md](../../scopes/Containers/overlay_containers.scope.md) | Existing object; Alias | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Widgets/feedback_widgets.scope.md

| Source entry           | Abstract concept | Other OpenUI scopes | Abstraction level | Source row                                                         |
| ---------------------- | ---------------- | ------------------- | ----------------- | ------------------------------------------------------------------ |
| snack-bar (31 objects) | Snackbar / Toast | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |
| tooltip (24 objects)   | Tooltip          | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Widgets/list.scope.md

| Source entry      | Abstract concept       | Other OpenUI scopes                                                                                                                                                                        | Abstraction level      | Source row                                                         |
| ----------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------ |
| list (42 objects) | List / List box / Link | [Controls/choice_controls.scope.md](../../scopes/Controls/choice_controls.scope.md); [Controls/link_and_scroll_controls.scope.md](../../scopes/Controls/link_and_scroll_controls.scope.md) | Existing object; Alias | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Widgets/menu_widgets.scope.md

| Source entry      | Abstract concept    | Other OpenUI scopes | Abstraction level | Source row                                                         |
| ----------------- | ------------------- | ------------------- | ----------------- | ------------------------------------------------------------------ |
| menu (35 objects) | Menu / Context menu | —                   | Existing object   | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Widgets/navigation_widgets.scope.md

| Source entry           | Abstract concept | Other OpenUI scopes | Abstraction level | Source row                                                         |
| ---------------------- | ---------------- | ------------------- | ----------------- | ------------------------------------------------------------------ |
| paginator (23 objects) | Pagination       | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |
| tree (31 objects)      | Tree view        | —                   | Alias             | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Widgets/stepper.scope.md

| Source entry         | Abstract concept                    | Other OpenUI scopes | Abstraction level | Source row                                                         |
| -------------------- | ----------------------------------- | ------------------- | ----------------- | ------------------------------------------------------------------ |
| stepper (34 objects) | Workflow stepper (additional alias) | —                   | Existing object   | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |

### Widgets/table.scope.md

| Source entry       | Abstract concept      | Other OpenUI scopes                                       | Abstraction level                   | Source row                                                         |
| ------------------ | --------------------- | --------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| sort (27 objects)  | Table sorting (facet) | [Interaction/scope.md](../../scopes/Interaction/scope.md) | Existing object; Folder abstraction | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |
| table (30 objects) | Table                 | —                                                         | Existing object                     | [Family crosswalk](inventory/TAXONOMY_MAPPING.md#family-crosswalk) |
