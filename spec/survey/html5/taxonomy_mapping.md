# HTML Standard survey: taxonomy mapping

[Survey README](README.md) · [Categories](category.md) · [Scopes proposal](scopes_proposal.md)

This file normalizes the HTML survey's [taxonomy crosswalk](inventory/TAXONOMY_MAPPING.md). Each row is one entry of the existing OpenUI taxonomy mapping (TM-001–TM-151), matched to its HTML primitive and routed to an OpenUI scope. The reverse direction, from all 118 second-level HTML sections to scopes, is in the [source-section crosswalk](inventory/SURVEY_SCOPE_CROSSWALK.md).

The _HTML correspondence_ column keeps the survey's own labels (for example Direct primitive, Composed variant, Partial/composed, No direct match). It is a separate axis from the canonical abstraction level (Existing object, Alias, Grouped leaf, Folder abstraction).

Scope paths are relative to `spec/scopes/`. The mapping records survey proposals only; the canonical scope tree, [taxonomy mapping](../../scopes/taxonomy_mapping.md) and generated catalog are unchanged.

## Summary

151 source entries map to 37 OpenUI scopes. HTML correspondence totals: External dependency 50, Partial pattern 24, Direct primitive 17, Partial structure 10, Partial notions 10, No direct match 7, Composed variant 6, Semantic mismatch 5, Direct notion 5, Partial notion 4, Partial family 3, Behavior evidence 2, Direct primitive / partial presentation 2, Direct event evidence 2, Direct table / partial grid 1, Partial view 1, Direct disclosure / partial accordion 1, Direct behavior 1.

| OpenUI scope                                                                                          | Primary entries | All mentions |
| ----------------------------------------------------------------------------------------------------- | --------------: | -----------: |
| [Application/navigation.scope.md](../../scopes/Application/navigation.scope.md)                       |               1 |            1 |
| [Application/tool_bars.scope.md](../../scopes/Application/tool_bars.scope.md)                         |               1 |            1 |
| [Behaviors/drag_and_drop.scope.md](../../scopes/Behaviors/drag_and_drop.scope.md)                     |               2 |            2 |
| [Behaviors/resizable.scope.md](../../scopes/Behaviors/resizable.scope.md)                             |               1 |            1 |
| [Containers/expandable_panels.scope.md](../../scopes/Containers/expandable_panels.scope.md)           |               1 |            1 |
| [Containers/grid.scope.md](../../scopes/Containers/grid.scope.md)                                     |               1 |            1 |
| [Containers/overlay_containers.scope.md](../../scopes/Containers/overlay_containers.scope.md)         |               2 |            2 |
| [Containers/scope.md](../../scopes/Containers/scope.md)                                               |               1 |            1 |
| [Containers/sheet_containers.scope.md](../../scopes/Containers/sheet_containers.scope.md)             |               4 |            4 |
| [Containers/splitters.scope.md](../../scopes/Containers/splitters.scope.md)                           |               1 |            1 |
| [Containers/structural_containers.scope.md](../../scopes/Containers/structural_containers.scope.md)   |               5 |            5 |
| [Containers/surface_containers.scope.md](../../scopes/Containers/surface_containers.scope.md)         |               3 |            3 |
| [Containers/tabs.scope.md](../../scopes/Containers/tabs.scope.md)                                     |               2 |            2 |
| [Controls/action_controls.scope.md](../../scopes/Controls/action_controls.scope.md)                   |               2 |            2 |
| [Controls/choice_controls.scope.md](../../scopes/Controls/choice_controls.scope.md)                   |               6 |            6 |
| [Controls/display_primitives.scope.md](../../scopes/Controls/display_primitives.scope.md)             |               6 |            6 |
| [Controls/drawing_and_capture.scope.md](../../scopes/Controls/drawing_and_capture.scope.md)           |               3 |            3 |
| [Controls/link_and_scroll_controls.scope.md](../../scopes/Controls/link_and_scroll_controls.scope.md) |               2 |            2 |
| [Controls/picker_control.scope.md](../../scopes/Controls/picker_control.scope.md)                     |               3 |            3 |
| [Controls/range_control.scope.md](../../scopes/Controls/range_control.scope.md)                       |               3 |            3 |
| [Controls/status_indicator.scope.md](../../scopes/Controls/status_indicator.scope.md)                 |               5 |            5 |
| [Controls/text_inputs.scope.md](../../scopes/Controls/text_inputs.scope.md)                           |               4 |            4 |
| [Interaction/scope.md](../../scopes/Interaction/scope.md)                                             |              30 |           30 |
| [Internationalization/scope.md](../../scopes/Internationalization/scope.md)                           |              16 |           16 |
| [Layout/scope.md](../../scopes/Layout/scope.md)                                                       |               9 |            9 |
| [Presentation/scope.md](../../scopes/Presentation/scope.md)                                           |              12 |           12 |
| [Views/form.scope.md](../../scopes/Views/form.scope.md)                                               |               1 |            1 |
| [Views/scope.md](../../scopes/Views/scope.md)                                                         |               1 |            1 |
| [Widgets/data_grid.scope.md](../../scopes/Widgets/data_grid.scope.md)                                 |               0 |            1 |
| [Widgets/date_time_pickers.scope.md](../../scopes/Widgets/date_time_pickers.scope.md)                 |               2 |            2 |
| [Widgets/dialog.scope.md](../../scopes/Widgets/dialog.scope.md)                                       |               1 |            1 |
| [Widgets/feedback_widgets.scope.md](../../scopes/Widgets/feedback_widgets.scope.md)                   |               5 |            5 |
| [Widgets/list.scope.md](../../scopes/Widgets/list.scope.md)                                           |               1 |            1 |
| [Widgets/media_widgets.scope.md](../../scopes/Widgets/media_widgets.scope.md)                         |               3 |            3 |
| [Widgets/menu_widgets.scope.md](../../scopes/Widgets/menu_widgets.scope.md)                           |               3 |            3 |
| [Widgets/navigation_widgets.scope.md](../../scopes/Widgets/navigation_widgets.scope.md)               |               7 |            7 |
| [Widgets/table.scope.md](../../scopes/Widgets/table.scope.md)                                         |               1 |            1 |

## Entries by primary OpenUI scope

The first scope listed is the primary destination used for grouping; further scopes are secondary destinations named by the source row.

### Application/navigation.scope.md

| Source entry  | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                                   |
| ------------- | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------------- |
| nav; a; lists | Navigation bar   | —                   | Partial pattern     | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |

### Application/tool_bars.scope.md

| Source entry | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                             |
| ------------ | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------- |
| menu; button | Toolbar          | —                   | Partial structure   | [Container elements](inventory/TAXONOMY_MAPPING.md#container-elements) |

### Behaviors/drag_and_drop.scope.md

| Source entry                              | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                                       |
| ----------------------------------------- | ---------------- | ------------------- | ------------------- | -------------------------------------------------------------------------------- |
| draggable; drag/drop events; DataTransfer | Drag handle      | —                   | Behavior evidence   | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements)                   |
| draggable; drag/drop events; DataTransfer | Drag and drop    | —                   | Behavior evidence   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |

### Behaviors/resizable.scope.md

| Source entry                                   | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                     |
| ---------------------------------------------- | ---------------- | ------------------- | ------------------- | -------------------------------------------------------------- |
| No dedicated resize-handle or splitter element | Resize handle    | —                   | No direct match     | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |

### Containers/expandable_panels.scope.md

| Source entry     | Abstract concept | Other OpenUI scopes | HTML correspondence                   | Source row                                                             |
| ---------------- | ---------------- | ------------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| details; summary | Accordion        | —                   | Direct disclosure / partial accordion | [Container elements](inventory/TAXONOMY_MAPPING.md#container-elements) |

### Containers/grid.scope.md

| Source entry                                       | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                                                     |
| -------------------------------------------------- | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------------------------------- |
| No HTML layout-grid element; table is tabular data | Grid             | —                   | External dependency | [Layout and structural elements](inventory/TAXONOMY_MAPPING.md#layout-and-structural-elements) |

### Containers/overlay_containers.scope.md

| Source entry                                         | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                             |
| ---------------------------------------------------- | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------- |
| modal dialog and inertness                           | Modal overlay    | —                   | Partial pattern     | [Container elements](inventory/TAXONOMY_MAPPING.md#container-elements) |
| popover; popovertarget; show/hide popover operations | Popover          | —                   | Direct behavior     | [Container elements](inventory/TAXONOMY_MAPPING.md#container-elements) |

### Containers/scope.md

| Source entry                                       | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                             |
| -------------------------------------------------- | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------- |
| section; article; div; main; header; footer; aside | Container        | —                   | Partial structure   | [Container elements](inventory/TAXONOMY_MAPPING.md#container-elements) |

### Containers/sheet_containers.scope.md

| Source entry           | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                             |
| ---------------------- | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------- |
| aside; dialog; popover | Sidebar          | —                   | Partial pattern     | [Container elements](inventory/TAXONOMY_MAPPING.md#container-elements) |
| aside; dialog; popover | Sheet            | —                   | Partial pattern     | [Container elements](inventory/TAXONOMY_MAPPING.md#container-elements) |
| aside; dialog; popover | Side Sheet       | —                   | Partial pattern     | [Container elements](inventory/TAXONOMY_MAPPING.md#container-elements) |
| aside; dialog; popover | Bottom Sheet     | —                   | Partial pattern     | [Container elements](inventory/TAXONOMY_MAPPING.md#container-elements) |

### Containers/splitters.scope.md

| Source entry                                   | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                                                     |
| ---------------------------------------------- | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------------------------------- |
| No dedicated resize-handle or splitter element | Splitter         | —                   | No direct match     | [Layout and structural elements](inventory/TAXONOMY_MAPPING.md#layout-and-structural-elements) |

### Containers/structural_containers.scope.md

| Source entry                                       | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                                                     |
| -------------------------------------------------- | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------------------------------- |
| section; article; div; main; header; footer; aside | Pane             | —                   | Partial structure   | [Layout and structural elements](inventory/TAXONOMY_MAPPING.md#layout-and-structural-elements) |
| section; article; div; main; header; footer; aside | Rail             | —                   | Partial structure   | [Layout and structural elements](inventory/TAXONOMY_MAPPING.md#layout-and-structural-elements) |
| section; article; div; main; header; footer; aside | Stack            | —                   | Partial structure   | [Layout and structural elements](inventory/TAXONOMY_MAPPING.md#layout-and-structural-elements) |
| section; article; div; main; header; footer; aside | Scaffold         | —                   | Partial structure   | [Layout and structural elements](inventory/TAXONOMY_MAPPING.md#layout-and-structural-elements) |
| section; article; div; main; header; footer; aside | Region           | —                   | Partial structure   | [Layout and structural elements](inventory/TAXONOMY_MAPPING.md#layout-and-structural-elements) |

### Containers/surface_containers.scope.md

| Source entry                                       | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                             |
| -------------------------------------------------- | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------- |
| section; article; div; main; header; footer; aside | Panel            | —                   | Partial structure   | [Container elements](inventory/TAXONOMY_MAPPING.md#container-elements) |
| section; article; div; main; header; footer; aside | Card             | —                   | Partial structure   | [Container elements](inventory/TAXONOMY_MAPPING.md#container-elements) |
| Window interface is a browsing-context API         | Window           | —                   | Semantic mismatch   | [Container elements](inventory/TAXONOMY_MAPPING.md#container-elements) |

### Containers/tabs.scope.md

| Source entry                        | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                                   |
| ----------------------------------- | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------------- |
| No dedicated tab or tab-bar element | Tab              | —                   | No direct match     | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |
| No dedicated tab or tab-bar element | Tab Bar          | —                   | No direct match     | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |

### Controls/action_controls.scope.md

| Source entry                              | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                     |
| ----------------------------------------- | ---------------- | ------------------- | ------------------- | -------------------------------------------------------------- |
| button containing image/text content      | Icon button      | —                   | Composed variant    | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |
| button; input[type=button\|submit\|reset] | Button           | —                   | Direct primitive    | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |

### Controls/choice_controls.scope.md

| Source entry                                                     | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                     |
| ---------------------------------------------------------------- | ---------------- | ------------------- | ------------------- | -------------------------------------------------------------- |
| input[list]; datalist; select                                    | Combo box        | —                   | Partial pattern     | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |
| input[type=checkbox]                                             | Checkbox         | —                   | Direct primitive    | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |
| input[type=radio]                                                | Radio button     | —                   | Direct primitive    | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |
| No dedicated switch primitive in this snapshot                   | Switch / Toggle  | —                   | Partial pattern     | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |
| select rendered as a dropdown; option; optgroup                  | Dropdown         | —                   | Direct primitive    | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |
| select with multiple selection or list display; option; optgroup | List box         | —                   | Direct primitive    | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |

### Controls/display_primitives.scope.md

| Source entry                                          | Abstract concept    | Other OpenUI scopes | HTML correspondence | Source row                                                       |
| ----------------------------------------------------- | ------------------- | ------------------- | ------------------- | ---------------------------------------------------------------- |
| hr                                                    | Separator / Divider | —                   | Partial pattern     | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |
| img or textual content                                | Icon                | —                   | Composed variant    | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |
| img or textual content                                | Avatar              | —                   | Composed variant    | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |
| img; picture; source                                  | Image               | —                   | Direct primitive    | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |
| label for labelable controls; text for other captions | Label               | —                   | Partial family      | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |
| p; span; headings; text-level elements                | Text                | —                   | Partial family      | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |

### Controls/drawing_and_capture.scope.md

| Source entry                                                 | Abstract concept      | Other OpenUI scopes | HTML correspondence | Source row                                                     |
| ------------------------------------------------------------ | --------------------- | ------------------- | ------------------- | -------------------------------------------------------------- |
| canvas                                                       | Canvas / Drawing area | —                   | Partial pattern     | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |
| No HTML-only microphone-capture or biometric-prompt contract | Microphone input      | —                   | External dependency | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |
| No HTML-only microphone-capture or biometric-prompt contract | Biometric prompt      | —                   | External dependency | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |

### Controls/link_and_scroll_controls.scope.md

| Source entry                   | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                                   |
| ------------------------------ | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------------- |
| a[href]; area[href]            | Link             | —                   | Direct primitive    | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |
| No dedicated scrollbar element | Scrollbar        | —                   | External dependency | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |

### Controls/picker_control.scope.md

| Source entry                        | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                     |
| ----------------------------------- | ---------------- | ------------------- | ------------------- | -------------------------------------------------------------- |
| input[type=color]                   | Color picker     | —                   | Direct primitive    | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |
| input[type=file]                    | File picker      | —                   | Direct primitive    | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |
| No dedicated wheel-picker primitive | Wheel picker     | —                   | No direct match     | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |

### Controls/range_control.scope.md

| Source entry                                         | Abstract concept         | Other OpenUI scopes | HTML correspondence | Source row                                                     |
| ---------------------------------------------------- | ------------------------ | ------------------- | ------------------- | -------------------------------------------------------------- |
| input[type=number]                                   | Spin box / Stepper input | —                   | Direct primitive    | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |
| input[type=range]                                    | Slider                   | —                   | Direct primitive    | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |
| No dedicated rating-input primitive; meter is output | Rating control           | —                   | Partial pattern     | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |

### Controls/status_indicator.scope.md

| Source entry                                   | Abstract concept | Other OpenUI scopes | HTML correspondence                     | Source row                                                       |
| ---------------------------------------------- | ---------------- | ------------------- | --------------------------------------- | ---------------------------------------------------------------- |
| No dedicated status-bar, tag, or badge element | Status bar       | —                   | Composed variant                        | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |
| No dedicated status-bar, tag, or badge element | Tag              | —                   | Composed variant                        | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |
| No dedicated status-bar, tag, or badge element | Badge            | —                   | Composed variant                        | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |
| progress with a value                          | Progress bar     | —                   | Direct primitive / partial presentation | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |
| progress without a value                       | Loader / Spinner | —                   | Direct primitive / partial presentation | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |

### Controls/text_inputs.scope.md

| Source entry                      | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                                   |
| --------------------------------- | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------------- |
| input[type=password]              | Password field   | —                   | Direct primitive    | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements)               |
| input[type=search]                | Search field     | —                   | Direct primitive    | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |
| input[type=text\|email\|tel\|url] | Text field       | —                   | Direct primitive    | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements)               |
| textarea                          | Text area        | —                   | Direct primitive    | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements)               |

### Interaction/scope.md

| Source entry                                     | Abstract concept             | Other OpenUI scopes | HTML correspondence   | Source row                                                                       |
| ------------------------------------------------ | ---------------------------- | ------------------- | --------------------- | -------------------------------------------------------------------------------- |
| accesskey; keyboard shortcut assignment          | Modifier-key combination     | —                   | Partial notion        | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| activation behavior; click                       | Active / Pressed state       | —                   | Partial notion        | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| activation behavior; click                       | Click                        | —                   | Partial notion        | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| change event                                     | Change event                 | —                   | Direct event evidence | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| disabled; inert                                  | Disabled state               | —                   | Direct notion         | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| Event-handler integration points                 | Pointer/mouse button press   | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| Event-handler integration points                 | Pointer/mouse button release | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| Event-handler integration points                 | Pointer move                 | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| Event-handler integration points                 | Pointer enter/leave          | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| Event-handler integration points                 | Wheel/scroll event           | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| Event-handler integration points                 | Touch start/move/end         | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| Event-handler integration points                 | Key down                     | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| Event-handler integration points                 | Key up                       | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| Event-handler integration points                 | Standard character-key input | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| Event-handler integration points                 | Special-key input            | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| focus; tabindex; autofocus; focus operations     | Focus state                  | —                   | Direct notion         | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| focus; tabindex; autofocus; focus operations     | Focus event                  | —                   | Direct notion         | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| hover-related rendering/selector hooks           | Hover state                  | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| input event                                      | Input event                  | —                   | Direct event evidence | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| No complete HTML target-size or gesture contract | Touch target                 | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| No complete HTML target-size or gesture contract | Pointer hit area             | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| No complete HTML target-size or gesture contract | Minimum target size          | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| No complete HTML target-size or gesture contract | Target spacing               | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| No complete HTML target-size or gesture contract | Tap                          | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| No complete HTML target-size or gesture contract | Double-tap                   | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| No complete HTML target-size or gesture contract | Long-press                   | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| No complete HTML target-size or gesture contract | Swipe                        | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| No complete HTML target-size or gesture contract | Pinch                        | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| No complete HTML target-size or gesture contract | Rotate                       | —                   | External dependency   | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |
| option selectedness; checkedness                 | Selected state               | —                   | Direct notion         | [Interaction definitions](inventory/TAXONOMY_MAPPING.md#interaction-definitions) |

### Internationalization/scope.md

| Source entry                                    | Abstract concept                        | Other OpenUI scopes | HTML correspondence | Source row                                                                                                                           |
| ----------------------------------------------- | --------------------------------------- | ------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| date/time/number input states and microsyntaxes | Date/time/calendar formatting           | —                   | Partial notions     | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |
| date/time/number input states and microsyntaxes | Number/percentage/digit formatting      | —                   | Partial notions     | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |
| date/time/number input states and microsyntaxes | Localized input and validation          | —                   | Partial notions     | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |
| dir; bdi; bdo                                   | Text direction and writing mode         | —                   | Partial notions     | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |
| dir; bdi; bdo                                   | RTL layout adaptation                   | —                   | Partial notions     | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |
| dir; bdi; bdo                                   | Bidirectional text                      | —                   | Partial notions     | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |
| lang                                            | Language support                        | —                   | Direct notion       | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |
| lang; translate; dir                            | Internationalization (i18n)             | —                   | Partial notions     | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |
| lang; translate; dir                            | Localization (l10n)                     | —                   | Partial notions     | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |
| lang; translate; dir                            | Locale                                  | —                   | Partial notions     | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |
| No complete HTML-only contract                  | Pluralization and grammatical variation | —                   | External dependency | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |
| No complete HTML-only contract                  | Directional mirroring                   | —                   | External dependency | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |
| No complete HTML-only contract                  | Currency/measurement formatting         | —                   | External dependency | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |
| No complete HTML-only contract                  | Locale-aware sorting and search         | —                   | External dependency | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |
| No complete HTML-only contract                  | Font/glyph/text-metrics support         | —                   | External dependency | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |
| translate                                       | Translation                             | —                   | Partial notion      | [Internationalization and localization definitions](inventory/TAXONOMY_MAPPING.md#internationalization-and-localization-definitions) |

### Layout/scope.md

| Source entry                                            | Abstract concept  | Other OpenUI scopes | HTML correspondence | Source row                                                                                           |
| ------------------------------------------------------- | ----------------- | ------------------- | ------------------- | ---------------------------------------------------------------------------------------------------- |
| HTML rendering provides context; CSS layout is external | Containment       | —                   | External dependency | [Layout mechanisms and definitions](inventory/TAXONOMY_MAPPING.md#layout-mechanisms-and-definitions) |
| HTML rendering provides context; CSS layout is external | Flow              | —                   | External dependency | [Layout mechanisms and definitions](inventory/TAXONOMY_MAPPING.md#layout-mechanisms-and-definitions) |
| HTML rendering provides context; CSS layout is external | Alignment         | —                   | External dependency | [Layout mechanisms and definitions](inventory/TAXONOMY_MAPPING.md#layout-mechanisms-and-definitions) |
| HTML rendering provides context; CSS layout is external | Anchoring         | —                   | External dependency | [Layout mechanisms and definitions](inventory/TAXONOMY_MAPPING.md#layout-mechanisms-and-definitions) |
| HTML rendering provides context; CSS layout is external | Sizing            | —                   | External dependency | [Layout mechanisms and definitions](inventory/TAXONOMY_MAPPING.md#layout-mechanisms-and-definitions) |
| HTML rendering provides context; CSS layout is external | Spacing           | —                   | External dependency | [Layout mechanisms and definitions](inventory/TAXONOMY_MAPPING.md#layout-mechanisms-and-definitions) |
| HTML rendering provides context; CSS layout is external | Wrapping          | —                   | External dependency | [Layout mechanisms and definitions](inventory/TAXONOMY_MAPPING.md#layout-mechanisms-and-definitions) |
| HTML rendering provides context; CSS layout is external | Responsive Reflow | —                   | External dependency | [Layout mechanisms and definitions](inventory/TAXONOMY_MAPPING.md#layout-mechanisms-and-definitions) |
| HTML rendering provides context; CSS layout is external | Breakpoint        | —                   | External dependency | [Layout mechanisms and definitions](inventory/TAXONOMY_MAPPING.md#layout-mechanisms-and-definitions) |

### Presentation/scope.md

| Source entry                                              | Abstract concept    | Other OpenUI scopes | HTML correspondence | Source row                                                                                             |
| --------------------------------------------------------- | ------------------- | ------------------- | ------------------- | ------------------------------------------------------------------------------------------------------ |
| hidden; inert; document visibility                        | Visibility          | —                   | Partial notions     | [Presentation and style definitions](inventory/TAXONOMY_MAPPING.md#presentation-and-style-definitions) |
| HTML rendering/style hooks; no full design-token contract | Color               | —                   | External dependency | [Presentation and style definitions](inventory/TAXONOMY_MAPPING.md#presentation-and-style-definitions) |
| HTML rendering/style hooks; no full design-token contract | Typography          | —                   | External dependency | [Presentation and style definitions](inventory/TAXONOMY_MAPPING.md#presentation-and-style-definitions) |
| HTML rendering/style hooks; no full design-token contract | Shape               | —                   | External dependency | [Presentation and style definitions](inventory/TAXONOMY_MAPPING.md#presentation-and-style-definitions) |
| HTML rendering/style hooks; no full design-token contract | Border              | —                   | External dependency | [Presentation and style definitions](inventory/TAXONOMY_MAPPING.md#presentation-and-style-definitions) |
| HTML rendering/style hooks; no full design-token contract | Shadow / Elevation  | —                   | External dependency | [Presentation and style definitions](inventory/TAXONOMY_MAPPING.md#presentation-and-style-definitions) |
| HTML rendering/style hooks; no full design-token contract | Opacity             | —                   | External dependency | [Presentation and style definitions](inventory/TAXONOMY_MAPPING.md#presentation-and-style-definitions) |
| HTML rendering/style hooks; no full design-token contract | Icons / Iconography | —                   | External dependency | [Presentation and style definitions](inventory/TAXONOMY_MAPPING.md#presentation-and-style-definitions) |
| HTML rendering/style hooks; no full design-token contract | Spacing tokens      | —                   | External dependency | [Presentation and style definitions](inventory/TAXONOMY_MAPPING.md#presentation-and-style-definitions) |
| HTML rendering/style hooks; no full design-token contract | Visual states       | —                   | External dependency | [Presentation and style definitions](inventory/TAXONOMY_MAPPING.md#presentation-and-style-definitions) |
| HTML rendering/style hooks; no full design-token contract | Theme               | —                   | External dependency | [Presentation and style definitions](inventory/TAXONOMY_MAPPING.md#presentation-and-style-definitions) |
| HTML rendering/style hooks; no full design-token contract | Motion              | —                   | External dependency | [Presentation and style definitions](inventory/TAXONOMY_MAPPING.md#presentation-and-style-definitions) |

### Views/form.scope.md

| Source entry                                     | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                             |
| ------------------------------------------------ | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------- |
| form; fieldset; legend; form-associated controls | Form             | —                   | Partial view        | [Container elements](inventory/TAXONOMY_MAPPING.md#container-elements) |

### Views/scope.md

| Source entry                                       | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                             |
| -------------------------------------------------- | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------- |
| section; article; div; main; header; footer; aside | Screen / View    | —                   | Partial structure   | [Container elements](inventory/TAXONOMY_MAPPING.md#container-elements) |

### Widgets/date_time_pickers.scope.md

| Source entry                                  | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                     |
| --------------------------------------------- | ---------------- | ------------------- | ------------------- | -------------------------------------------------------------- |
| input[type=date\|month\|week\|datetime-local] | Date picker      | —                   | Partial pattern     | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |
| input[type=time]                              | Time picker      | —                   | Partial pattern     | [Input elements](inventory/TAXONOMY_MAPPING.md#input-elements) |

### Widgets/dialog.scope.md

| Source entry                                              | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                             |
| --------------------------------------------------------- | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------- |
| dialog; show(); showModal(); close(); cancel/close events | Dialog           | —                   | Direct primitive    | [Container elements](inventory/TAXONOMY_MAPPING.md#container-elements) |

### Widgets/feedback_widgets.scope.md

| Source entry                                              | Abstract concept              | Other OpenUI scopes | HTML correspondence | Source row                                                       |
| --------------------------------------------------------- | ----------------------------- | ------------------- | ------------------- | ---------------------------------------------------------------- |
| No dedicated application alert/toast/notification element | Alert                         | —                   | Partial pattern     | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |
| No dedicated application alert/toast/notification element | Toast / Snackbar              | —                   | Partial pattern     | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |
| No dedicated application alert/toast/notification element | Notification                  | —                   | Partial pattern     | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |
| title attribute; popover support                          | Tooltip                       | —                   | Partial pattern     | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |
| track; audio; video                                       | Narration / Audio Description | —                   | Partial pattern     | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |

### Widgets/list.scope.md

| Source entry           | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                       |
| ---------------------- | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------- |
| ul; ol; li; dl; dt; dd | List             | —                   | Partial family      | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |

### Widgets/media_widgets.scope.md

| Source entry                       | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                                   |
| ---------------------------------- | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------------- |
| audio; video; source; track        | Media player     | —                   | Direct primitive    | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements)             |
| map; area are image-map primitives | Map              | —                   | Semantic mismatch   | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |
| video with a media source          | Camera preview   | —                   | Partial pattern     | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements)             |

### Widgets/menu_widgets.scope.md

| Source entry                                                 | Abstract concept | Other OpenUI scopes | HTML correspondence | Source row                                                                   |
| ------------------------------------------------------------ | ---------------- | ------------------- | ------------------- | ---------------------------------------------------------------------------- |
| menu is an unordered command list; not a popup-menu contract | Menu             | —                   | Semantic mismatch   | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |
| menu is an unordered command list; not a popup-menu contract | Dropdown Menu    | —                   | Semantic mismatch   | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |
| menu is an unordered command list; not a popup-menu contract | Context menu     | —                   | Semantic mismatch   | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |

### Widgets/navigation_widgets.scope.md

| Source entry                               | Abstract concept   | Other OpenUI scopes | HTML correspondence | Source row                                                                   |
| ------------------------------------------ | ------------------ | ------------------- | ------------------- | ---------------------------------------------------------------------------- |
| nav; a; lists                              | Navigation Drawer  | —                   | Partial pattern     | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |
| nav; a; lists                              | Navigation Rail    | —                   | Partial pattern     | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |
| nav; a; lists                              | Hamburger Menu     | —                   | Partial pattern     | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |
| nav; a; lists                              | Breadcrumb         | —                   | Partial pattern     | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |
| nav; a; lists                              | Pagination control | —                   | Partial pattern     | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |
| No dedicated tree-view or carousel element | Tree view          | —                   | No direct match     | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |
| No dedicated tree-view or carousel element | Carousel           | —                   | No direct match     | [Navigational elements](inventory/TAXONOMY_MAPPING.md#navigational-elements) |

### Widgets/table.scope.md

| Source entry                                    | Abstract concept  | Other OpenUI scopes                                                   | HTML correspondence         | Source row                                                       |
| ----------------------------------------------- | ----------------- | --------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------- |
| table; caption; thead; tbody; tfoot; tr; th; td | Table / Data grid | [Widgets/data_grid.scope.md](../../scopes/Widgets/data_grid.scope.md) | Direct table / partial grid | [Output elements](inventory/TAXONOMY_MAPPING.md#output-elements) |
