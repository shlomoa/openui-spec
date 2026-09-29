# OpenUI5 survey: taxonomy mapping

[Survey README](README.md#contents) · [Categories](category.md#categories) · [Scopes proposal](scopes_proposal.md#overlaps-with-other-surveys)

This file normalizes the OpenUI5 survey's seven category files (`inventory/*.survey.md`). Each row is one OpenUI5 class matched to an existing OpenUI spec object during Phase B. The 257 classes that did not match are proposed as 11 new subcategories; see [scopes_proposal.md](scopes_proposal.md#overlaps-with-other-surveys).

All rows here are _Matched_: the class was classified to an existing spec object by base-class and description matching (steps B2–B5), then described from full source in Phase C.

The _Abstract concept_ column names the one [taxonomy entry](../../scopes/taxonomy_mapping.md#input-elements) each class matches, chosen from the class description in `inventory/*.survey.md` or [Appendix A](opens.md#appendix-a-unclustered-classes) (plan task W1 9.9, 2026-09-29). The former value is struck through. A class that fits no entry says "No entry" with the reason. These entries fill the OpenUI5 column of the taxonomy mapping.

Scope paths are relative to `spec/scopes/`. The mapping records survey proposals only; the canonical scope tree, [taxonomy mapping](../../scopes/taxonomy_mapping.md#input-elements) and generated catalog are unchanged.

## Summary

424 source entries map to 31 OpenUI scopes. Classification totals: Matched 424. The [class-by-class review](#proposed-by-the-class-by-class-review) proposes 156 more rows, from the unclustered leftovers, on 32 scopes.

| OpenUI scope                                                                                                  | Primary entries | All mentions |
| ------------------------------------------------------------------------------------------------------------- | --------------: | -----------: |
| [Application/tool_bars.scope.md](../../scopes/Application/tool_bars.scope.md#purpose)                         |               8 |            8 |
| [Behaviors/drag_and_drop.scope.md](../../scopes/Behaviors/drag_and_drop.scope.md#purpose)                     |               7 |            7 |
| [Containers/expandable_panels.scope.md](../../scopes/Containers/expandable_panels.scope.md#purpose)           |               2 |            2 |
| [Containers/grid.scope.md](../../scopes/Containers/grid.scope.md#purpose)                                     |               3 |            3 |
| [Containers/overlay_containers.scope.md](../../scopes/Containers/overlay_containers.scope.md#purpose)         |              13 |           13 |
| [Containers/sheet_containers.scope.md](../../scopes/Containers/sheet_containers.scope.md#purpose)             |               1 |            1 |
| [Containers/splitters.scope.md](../../scopes/Containers/splitters.scope.md#purpose)                           |               9 |            9 |
| [Containers/structural_containers.scope.md](../../scopes/Containers/structural_containers.scope.md#purpose)   |               4 |            4 |
| [Containers/surface_containers.scope.md](../../scopes/Containers/surface_containers.scope.md#purpose)         |               2 |            2 |
| [Containers/tabs.scope.md](../../scopes/Containers/tabs.scope.md#purpose)                                     |               7 |            7 |
| [Controls/action_controls.scope.md](../../scopes/Controls/action_controls.scope.md#purpose)                   |              61 |           61 |
| [Controls/choice_controls.scope.md](../../scopes/Controls/choice_controls.scope.md#purpose)                   |              20 |           20 |
| [Controls/display_primitives.scope.md](../../scopes/Controls/display_primitives.scope.md#purpose)             |              17 |           17 |
| [Controls/link_and_scroll_controls.scope.md](../../scopes/Controls/link_and_scroll_controls.scope.md#purpose) |               4 |            4 |
| [Controls/native.scope.md](../../scopes/Controls/native.scope.md#purpose)                                     |              95 |           95 |
| [Controls/picker_control.scope.md](../../scopes/Controls/picker_control.scope.md#purpose)                     |               3 |            3 |
| [Controls/range_control.scope.md](../../scopes/Controls/range_control.scope.md#purpose)                       |               8 |            8 |
| [Controls/status_indicator.scope.md](../../scopes/Controls/status_indicator.scope.md#purpose)                 |               6 |            6 |
| [Controls/text_inputs.scope.md](../../scopes/Controls/text_inputs.scope.md#purpose)                           |               7 |            7 |
| [Views/form.scope.md](../../scopes/Views/form.scope.md#purpose)                                               |               5 |            5 |
| [Widgets/chart.scope.md](../../scopes/Widgets/chart.scope.md#purpose)                                         |               1 |            1 |
| [Widgets/data_grid.scope.md](../../scopes/Widgets/data_grid.scope.md#purpose)                                 |               2 |            2 |
| [Widgets/date_time_pickers.scope.md](../../scopes/Widgets/date_time_pickers.scope.md#purpose)                 |              29 |           29 |
| [Widgets/dialog.scope.md](../../scopes/Widgets/dialog.scope.md#purpose)                                       |               5 |            5 |
| [Widgets/feedback_widgets.scope.md](../../scopes/Widgets/feedback_widgets.scope.md#purpose)                   |              12 |           12 |
| [Widgets/list.scope.md](../../scopes/Widgets/list.scope.md#purpose)                                           |              47 |           47 |
| [Widgets/media_widgets.scope.md](../../scopes/Widgets/media_widgets.scope.md#purpose)                         |               2 |            2 |
| [Widgets/menu_widgets.scope.md](../../scopes/Widgets/menu_widgets.scope.md#purpose)                           |              15 |           15 |
| [Widgets/navigation_widgets.scope.md](../../scopes/Widgets/navigation_widgets.scope.md#purpose)               |              13 |           13 |
| [Widgets/stepper.scope.md](../../scopes/Widgets/stepper.scope.md#purpose)                                     |               3 |            3 |
| [Widgets/table.scope.md](../../scopes/Widgets/table.scope.md#purpose)                                         |              13 |           13 |

## Entries by primary OpenUI scope

The first scope listed is the primary destination used for grouping; further scopes are secondary destinations named by the source row.

### Application/tool_bars.scope.md

| Source entry                         | Abstract concept | Other OpenUI scopes | Classification | Source row                                             |
| ------------------------------------ | ---------------- | ------------------- | -------------- | ------------------------------------------------------ |
| sap.m.AssociativeOverflowToolbar     | ~~Tool bars~~ Toolbar | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |
| sap.m.Bar                            | ~~Tool bars~~ Bar | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |
| sap.m.OverflowToolbar                | ~~Tool bars~~ Toolbar | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |
| sap.m.Toolbar                        | ~~Tool bars~~ Toolbar | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |
| sap.tnt.ToolHeader                   | ~~Tool bars~~ Toolbar | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |
| sap.ui.mdc.ActionToolbar             | ~~Tool bars~~ Toolbar | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |
| sap.ui.mdc.table.utils.FilterInfoBar | ~~Tool bars~~ Toolbar | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |
| sap.uxap.AnchorBar                   | ~~Tool bars~~ Toolbar | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |

### Behaviors/drag_and_drop.scope.md

| Source entry                       | Abstract concept | Other OpenUI scopes | Classification | Source row                                                   |
| ---------------------------------- | ---------------- | ------------------- | -------------- | ------------------------------------------------------------ |
| sap.f.dnd.GridDropInfo             | Drag and drop | —                   | Matched        | [Drag and drop](inventory/Behaviors.survey.md#drag-and-drop) |
| sap.ui.core.dnd.DragDropInfo       | Drag and drop | —                   | Matched        | [Drag and drop](inventory/Behaviors.survey.md#drag-and-drop) |
| sap.ui.core.dnd.DragInfo           | Drag and drop | —                   | Matched        | [Drag and drop](inventory/Behaviors.survey.md#drag-and-drop) |
| sap.ui.core.dnd.DropInfo           | Drag and drop | —                   | Matched        | [Drag and drop](inventory/Behaviors.survey.md#drag-and-drop) |
| sap.ui.mdc.list.DragDropConfig     | Drag and drop | —                   | Matched        | [Drag and drop](inventory/Behaviors.survey.md#drag-and-drop) |
| sap.ui.mdc.table.DragDropConfig    | Drag and drop | —                   | Matched        | [Drag and drop](inventory/Behaviors.survey.md#drag-and-drop) |
| sap.ui.mdc.util.DragDropConfigBase | Drag and drop | —                   | Matched        | [Drag and drop](inventory/Behaviors.survey.md#drag-and-drop) |

### Containers/expandable_panels.scope.md

| Source entry          | Abstract concept  | Other OpenUI scopes | Classification | Source row                                                            |
| --------------------- | ----------------- | ------------------- | -------------- | --------------------------------------------------------------------- |
| sap.m.Panel           | ~~Expandable panels~~ Disclosure | —                   | Matched        | [Expandable panels](inventory/Containers.survey.md#expandable-panels) |
| sap.ui.mdc.link.Panel | ~~Expandable panels~~ List | —                   | Matched        | [Expandable panels](inventory/Containers.survey.md#expandable-panels) |

### Containers/grid.scope.md

| Source entry                  | Abstract concept | Other OpenUI scopes | Classification | Source row                                  |
| ----------------------------- | ---------------- | ------------------- | -------------- | ------------------------------------------- |
| sap.f.GridContainer           | Grid | —                   | Matched        | [Grid](inventory/Containers.survey.md#grid) |
| sap.ui.layout.cssgrid.CSSGrid | Grid | —                   | Matched        | [Grid](inventory/Containers.survey.md#grid) |
| sap.ui.layout.Grid            | Grid | —                   | Matched        | [Grid](inventory/Containers.survey.md#grid) |

### Containers/overlay_containers.scope.md

| Source entry                                                     | Abstract concept   | Other OpenUI scopes | Classification | Source row                                                              |
| ---------------------------------------------------------------- | ------------------ | ------------------- | -------------- | ----------------------------------------------------------------------- |
| sap.m.\_overflowToolbarHelpers.OverflowToolbarAssociativePopover | ~~Overlay containers~~ Popover | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.ColorPalettePopover                                        | ~~Overlay containers~~ Color picker | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.Popover                                                    | ~~Overlay containers~~ Popover | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.QuickView                                                  | ~~Overlay containers~~ Popover | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.QuickViewBase                                              | ~~Overlay containers~~ Popover | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.QuickViewCard                                              | ~~Overlay containers~~ Card | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.QuickViewGroup                                             | ~~Overlay containers~~ Labelled group | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.QuickViewGroupElement                                      | ~~Overlay containers~~ Label | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.QuickViewPage                                              | ~~Overlay containers~~ Card | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.ResponsivePopover                                          | ~~Overlay containers~~ Popover | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.SelectionDetails                                           | ~~Overlay containers~~ Popover | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.SuggestionsPopover                                         | ~~Overlay containers~~ Popover | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.ui.mdc.chart.ChartSelectionDetails                           | ~~Overlay containers~~ Popover | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |

### Containers/sheet_containers.scope.md

| Source entry    | Abstract concept | Other OpenUI scopes | Classification | Source row                                                          |
| --------------- | ---------------- | ------------------- | -------------- | ------------------------------------------------------------------- |
| sap.f.SidePanel | ~~Sheet containers~~ Side Sheet | —                   | Matched        | [Sheet containers](inventory/Containers.survey.md#sheet-containers) |

### Containers/splitters.scope.md

| Source entry                         | Abstract concept | Other OpenUI scopes | Classification | Source row                                            |
| ------------------------------------ | ---------------- | ------------------- | -------------- | ----------------------------------------------------- |
| sap.m.SplitApp                       | ~~Splitters~~ Flexible column layout | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.m.SplitContainer                 | ~~Splitters~~ Flexible column layout | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.ui.layout.AssociativeSplitter    | ~~Splitters~~ Splitter | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.ui.layout.PaneContainer          | ~~Splitters~~ Splitter | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.ui.layout.ResponsiveSplitter     | ~~Splitters~~ Splitter | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.ui.layout.ResponsiveSplitterPage | ~~Splitters~~ Pane | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.ui.layout.SplitPane              | ~~Splitters~~ Pane | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.ui.layout.Splitter               | ~~Splitters~~ Splitter | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.ui.unified.SplitContainer        | ~~Splitters~~ Splitter | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |

### Containers/structural_containers.scope.md

| Source entry                 | Abstract concept      | Other OpenUI scopes | Classification | Source row                                                                    |
| ---------------------------- | --------------------- | ------------------- | -------------- | ----------------------------------------------------------------------------- |
| sap.m.FlexBox                | ~~Structural containers~~ Stack | —                   | Matched        | [Structural containers](inventory/Containers.survey.md#structural-containers) |
| sap.m.HBox                   | ~~Structural containers~~ Stack | —                   | Matched        | [Structural containers](inventory/Containers.survey.md#structural-containers) |
| sap.m.VBox                   | ~~Structural containers~~ Stack | —                   | Matched        | [Structural containers](inventory/Containers.survey.md#structural-containers) |
| sap.ui.layout.VerticalLayout | ~~Structural containers~~ Stack | —                   | Matched        | [Structural containers](inventory/Containers.survey.md#structural-containers) |

### Containers/surface_containers.scope.md

| Source entry      | Abstract concept   | Other OpenUI scopes | Classification | Source row                                                              |
| ----------------- | ------------------ | ------------------- | -------------- | ----------------------------------------------------------------------- |
| sap.m.GenericTile | ~~Surface containers~~ Tile | —                   | Matched        | [Surface containers](inventory/Containers.survey.md#surface-containers) |
| sap.m.Page        | ~~Surface containers~~ Scaffold | —                   | Matched        | [Surface containers](inventory/Containers.survey.md#surface-containers) |

### Containers/tabs.scope.md

| Source entry                         | Abstract concept | Other OpenUI scopes | Classification | Source row                                  |
| ------------------------------------ | ---------------- | ------------------- | -------------- | ------------------------------------------- |
| sap.m.IconTabBar                     | ~~Tabs (Tab Bar)~~ Tab Bar | —                   | Matched        | [Tabs](inventory/Containers.survey.md#tabs) |
| sap.m.IconTabBarSelectList           | ~~Tabs~~ Tab Bar | —                   | Matched        | [Tabs](inventory/Containers.survey.md#tabs) |
| sap.m.IconTabFilterExpandButtonBadge | ~~Tabs~~ Tab Bar | —                   | Matched        | [Tabs](inventory/Containers.survey.md#tabs) |
| sap.m.IconTabSeparator               | ~~Tabs~~ Separator | —                   | Matched        | [Tabs](inventory/Containers.survey.md#tabs) |
| sap.m.TabContainer                   | ~~Tabs~~ Tab | —                   | Matched        | [Tabs](inventory/Containers.survey.md#tabs) |
| sap.m.TabContainerItem               | ~~Tabs~~ Tab | —                   | Matched        | [Tabs](inventory/Containers.survey.md#tabs) |
| sap.m.TabStrip                       | ~~Tabs~~ Tab Bar | —                   | Matched        | [Tabs](inventory/Containers.survey.md#tabs) |

### Controls/action_controls.scope.md

| Source entry                                       | Abstract concept | Other OpenUI scopes | Classification | Source row                                                      |
| -------------------------------------------------- | ---------------- | ------------------- | -------------- | --------------------------------------------------------------- |
| sap.f.gen.ui5.webcomponents.dist.Button            | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.AddAction                           | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.CloseAction                         | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.CopyAction                          | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.DeleteAction                        | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.DiscussInJamAction                  | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.EditAction                          | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.ExitFullScreenAction                | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.FavoriteAction                      | ~~Action controls~~ Toggle button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.FlagAction                          | ~~Action controls~~ Toggle button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.FooterMainAction                    | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.FullScreenAction                    | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.MainAction                          | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.MessagesIndicator                   | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.NegativeAction                      | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.PositiveAction                      | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.PrintAction                         | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.SemanticButton                      | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.SemanticToggleButton                | ~~Action controls~~ Toggle button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.SendEmailAction                     | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.SendMessageAction                   | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.ShareInJamAction                    | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.TitleMainAction                     | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.AccButton                                    | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.AdditionalTextButton                         | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.Button                                       | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.OverflowToolbarButton                        | ~~Action controls~~ Tool button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.OverflowToolbarMenuButton                    | ~~Action controls~~ Menu button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.OverflowToolbarToggleButton                  | ~~Action controls~~ Toggle button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.PagingButton                                 | ~~Action controls~~ Pagination control | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.SegmentedButton                              | ~~Action controls~~ Exclusive selection coordination | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.AddAction                           | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.CancelAction                        | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.DeleteAction                        | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.DiscussInJamAction                  | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.EditAction                          | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.FavoriteAction                      | ~~Action controls~~ Toggle button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.FilterAction                        | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.FlagAction                          | ~~Action controls~~ Toggle button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.ForwardAction                       | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.GroupAction                         | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.MainAction                          | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.MessagesIndicator                   | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.MultiSelectAction                   | ~~Action controls~~ Toggle button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.NegativeAction                      | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.OpenInAction                        | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.PositiveAction                      | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.PrintAction                         | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SaveAction                          | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SemanticButton                      | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SemanticOverflowToolbarButton       | ~~Action controls~~ Tool button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SemanticOverflowToolbarToggleButton | ~~Action controls~~ Toggle button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SemanticToggleButton                | ~~Action controls~~ Toggle button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SendEmailAction                     | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SendMessageAction                   | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.ShareInJamAction                    | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SortAction                          | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.SplitButton                                  | ~~Action controls~~ Menu button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.ToggleButton                                 | ~~Action controls~~ Toggle button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.ui.mdc.chart.SelectionButton                   | ~~Action controls~~ Tool button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.uxap.ObjectPageHeaderActionButton              | ~~Action controls~~ Button | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |

### Controls/choice_controls.scope.md

| Source entry                                    | Abstract concept               | Other OpenUI scopes | Classification | Source row                                                      |
| ----------------------------------------------- | ------------------------------ | ------------------- | -------------- | --------------------------------------------------------------- |
| sap.m.ActionSelect                              | ~~Choice controls~~ Dropdown | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.CheckBox                                  | ~~Choice controls~~ Checkbox | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.ComboBox                                  | ~~Choice controls~~ Combo box | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.ComboBoxBase                              | ~~Choice controls~~ Combo box | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.ComboBoxTextField                         | ~~Choice controls~~ Combo box | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.MultiComboBox                             | ~~Choice controls~~ Multi-select combo box | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.RadioButton                               | ~~Choice controls (Radio button)~~ Radio button | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.RadioButtonGroup                          | ~~Choice controls~~ Exclusive selection coordination | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.Select                                    | ~~Choice controls~~ Dropdown | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.SelectDialogBase                          | ~~Choice controls~~ Value help | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.SelectList                                | ~~Choice controls~~ List box | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.semantic.FilterSelect                     | ~~Choice controls~~ Dropdown | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.semantic.GroupSelect                      | ~~Choice controls~~ Dropdown | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.semantic.SortSelect                       | ~~Choice controls~~ Dropdown | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.Switch                                    | ~~Choice controls~~ Switch | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.ui.integration.cards.filters.ComboBoxFilter | ~~Choice controls~~ Combo box | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.ui.integration.cards.filters.SelectFilter   | ~~Choice controls~~ Dropdown | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.ui.integration.controls.ComboBox            | ~~Choice controls~~ Combo box | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.ui.mdc.field.FieldSelect                    | ~~Choice controls~~ Metadata-driven field | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.uxap.HierarchicalSelect                     | ~~Choice controls~~ Dropdown | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |

### Controls/display_primitives.scope.md

| Source entry                            | Abstract concept                         | Other OpenUI scopes | Classification | Source row                                                            |
| --------------------------------------- | ---------------------------------------- | ------------------- | -------------- | --------------------------------------------------------------------- |
| sap.f.Avatar                            | ~~Display primitives~~ Avatar | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.f.AvatarGroup                       | ~~Display primitives~~ Avatar | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.f.AvatarGroupItem                   | ~~Display primitives~~ Avatar | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.f.gen.ui5.webcomponents.dist.Avatar | ~~Display primitives~~ Avatar | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.f.gen.ui5.webcomponents.dist.Label  | ~~Display primitives~~ Label | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.Avatar                            | ~~Display primitives~~ Avatar | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.ExpandableText                    | ~~Display primitives~~ Text | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.Image                             | ~~Display primitives~~ Image | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.Label                             | ~~Display primitives~~ Label | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.ObjectAttribute                   | ~~Display primitives~~ Text | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.ObjectNumber                      | ~~Display primitives~~ Text | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.Text                              | ~~Display primitives~~ Text | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.Title                             | ~~Display primitives~~ Text | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.tnt.ToolHeaderUtilitySeparator      | ~~Display primitives (Separator / Divider)~~ Separator | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.ui.core.Icon                        | ~~Display primitives~~ Icon | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.ui.core.SeparatorItem               | ~~Display primitives~~ Separator | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.ui.core.Title                       | ~~Display primitives~~ Text | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |

### Controls/link_and_scroll_controls.scope.md

| Source entry          | Abstract concept                | Other OpenUI scopes | Classification | Source row                                                                        |
| --------------------- | ------------------------------- | ------------------- | -------------- | --------------------------------------------------------------------------------- |
| sap.m.Link            | ~~Link and scroll controls (Link)~~ Link | —                   | Matched        | [Link and scroll controls](inventory/Controls.survey.md#link-and-scroll-controls) |
| sap.m.ScrollBar       | ~~Link and scroll controls~~ Scrollbar | —                   | Matched        | [Link and scroll controls](inventory/Controls.survey.md#link-and-scroll-controls) |
| sap.ui.core.ScrollBar | ~~Link and scroll controls~~ Scrollbar | —                   | Matched        | [Link and scroll controls](inventory/Controls.survey.md#link-and-scroll-controls) |
| sap.ui.mdc.Link       | ~~Link and scroll controls~~ Link | —                   | Matched        | [Link and scroll controls](inventory/Controls.survey.md#link-and-scroll-controls) |

### Controls/native.scope.md

| Source entry                 | Abstract concept | Other OpenUI scopes | Classification | Source row                                    |
| ---------------------------- | ---------------- | ------------------- | -------------- | --------------------------------------------- |
| sap.html.A                   | ~~Native~~ Link | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Abbr                | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Address             | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Area                | ~~Native~~ Link | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Article             | ~~Native~~ Region | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Aside               | ~~Native~~ Sidebar | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.B                   | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Bdi                 | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Bdo                 | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Blockquote          | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Br                  | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Button              | ~~Native~~ Button | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Canvas              | ~~Native~~ Canvas | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Caption             | ~~Native~~ Table | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Cite                | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Code                | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Col                 | ~~Native~~ Table | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Colgroup            | ~~Native~~ Table | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Data                | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Datalist            | ~~Native~~ Combo box | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Dd                  | ~~Native~~ Description list | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Del                 | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Details             | ~~Native~~ Disclosure | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Dfn                 | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Div                 | ~~Native~~ Container | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Dl                  | ~~Native~~ Description list | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Dt                  | ~~Native~~ Description list | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Em                  | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Fieldset            | ~~Native~~ Labelled group | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Figcaption          | ~~Native~~ Label | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Figure              | ~~Native~~ No entry: a self-contained figure with its caption; no taxonomy entry holds it | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Footer              | ~~Native~~ Region | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Form                | ~~Native~~ Form | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.H1                  | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.H2                  | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.H3                  | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.H4                  | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.H5                  | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.H6                  | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Header              | ~~Native~~ Region | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Hgroup              | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Hr                  | ~~Native~~ Separator | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.I                   | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Img                 | ~~Native~~ Image | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Input               | ~~Native~~ No entry: one element for many entries (text field, checkbox, radio button, slider and more), chosen by its type attribute | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Ins                 | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Kbd                 | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Label               | ~~Native~~ Label | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Legend              | ~~Native~~ Labelled group | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Li                  | ~~Native~~ List | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Main                | ~~Native~~ Region | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Map                 | ~~Native~~ No entry: an image-map definition; not a Geographic map | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Mark                | ~~Native~~ Highlighted text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Menu                | ~~Native~~ No entry: a plain list of commands without popup behavior; not a Menu | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Meter               | ~~Native~~ Meter | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Nav                 | ~~Native~~ Navigation bar | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Ol                  | ~~Native~~ List | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Optgroup            | ~~Native~~ Dropdown | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Option              | ~~Native~~ Dropdown | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Output              | ~~Native~~ Calculated output | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.P                   | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Pre                 | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Progress            | ~~Native~~ Progress bar | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Q                   | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Rp                  | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Rt                  | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Ruby                | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.S                   | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Samp                | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Search              | ~~Native~~ Region | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Section             | ~~Native~~ Region | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Select              | ~~Native~~ Dropdown | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Selectedcontent     | ~~Native~~ Dropdown | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Small               | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Span                | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Strong              | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Sub                 | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Summary             | ~~Native~~ Disclosure | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Sup                 | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Table               | ~~Native~~ Table | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Tbody               | ~~Native~~ Table | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Td                  | ~~Native~~ Table | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Textarea            | ~~Native~~ Text area | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Tfoot               | ~~Native~~ Table | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Th                  | ~~Native~~ Table | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Thead               | ~~Native~~ Table | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Time                | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Tr                  | ~~Native~~ Table | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.U                   | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Ul                  | ~~Native~~ List | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Var                 | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Wbr                 | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.ui.core.HTML             | ~~Native~~ No entry: embeds arbitrary HTML markup; no taxonomy entry holds it | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.ui.core.html.HTMLElement | ~~Native~~ No entry: abstract base class of the HTML element wrappers | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.ui.core.html.TextContent | ~~Native~~ Text | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |

### Controls/picker_control.scope.md

| Source entry                      | Abstract concept | Other OpenUI scopes | Classification | Source row                                                    |
| --------------------------------- | ---------------- | ------------------- | -------------- | ------------------------------------------------------------- |
| sap.m.WheelSlider                 | ~~Picker control~~ Wheel picker | —                   | Matched        | [Picker control](inventory/Controls.survey.md#picker-control) |
| sap.ui.unified.ColorPicker        | ~~Picker control~~ Color picker | —                   | Matched        | [Picker control](inventory/Controls.survey.md#picker-control) |
| sap.ui.unified.ColorPickerPopover | ~~Picker control~~ Color picker | —                   | Matched        | [Picker control](inventory/Controls.survey.md#picker-control) |

### Controls/range_control.scope.md

| Source entry                 | Abstract concept | Other OpenUI scopes | Classification | Source row                                                  |
| ---------------------------- | ---------------- | ------------------- | -------------- | ----------------------------------------------------------- |
| sap.m.RangeSlider            | ~~Range control~~ Range slider | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |
| sap.m.RatingIndicator        | ~~Range control~~ Rating control | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |
| sap.m.ResponsiveScale        | ~~Range control~~ Slider | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |
| sap.m.Slider                 | ~~Range control~~ Slider | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |
| sap.m.SliderTooltip          | ~~Range control~~ Slider | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |
| sap.m.SliderTooltipBase      | ~~Range control~~ Slider | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |
| sap.m.SliderTooltipContainer | ~~Range control~~ Slider | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |
| sap.m.StepInput              | ~~Range control~~ Step input | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |

### Controls/status_indicator.scope.md

| Source entry                             | Abstract concept       | Other OpenUI scopes | Classification | Source row                                                        |
| ---------------------------------------- | ---------------------- | ------------------- | -------------- | ----------------------------------------------------------------- |
| sap.m.BusyIndicator                      | ~~Status indicator~~ Loader | —                   | Matched        | [Status indicator](inventory/Controls.survey.md#status-indicator) |
| sap.m.ObjectStatus                       | ~~Status indicator~~ Tag | —                   | Matched        | [Status indicator](inventory/Controls.survey.md#status-indicator) |
| sap.m.ProgressIndicator                  | ~~Status indicator~~ Progress bar | —                   | Matched        | [Status indicator](inventory/Controls.survey.md#status-indicator) |
| sap.tnt.InfoLabel                        | ~~Status indicator (Tag)~~ Tag | —                   | Matched        | [Status indicator](inventory/Controls.survey.md#status-indicator) |
| sap.ui.core.LocalBusyIndicator           | ~~Status indicator~~ Loader | —                   | Matched        | [Status indicator](inventory/Controls.survey.md#status-indicator) |
| sap.ui.integration.controls.ObjectStatus | ~~Status indicator~~ Tag | —                   | Matched        | [Status indicator](inventory/Controls.survey.md#status-indicator) |

### Controls/text_inputs.scope.md

| Source entry                                          | Abstract concept           | Other OpenUI scopes | Classification | Source row                                              |
| ----------------------------------------------------- | -------------------------- | ------------------- | -------------- | ------------------------------------------------------- |
| sap.f.gen.ui5.webcomponents_fiori.dist.SearchField    | ~~Text inputs~~ Search field | —                   | Matched        | [Text inputs](inventory/Controls.survey.md#text-inputs) |
| sap.f.gen.ui5.webcomponents_fiori.dist.ShellBarSearch | ~~Text inputs~~ Search field | —                   | Matched        | [Text inputs](inventory/Controls.survey.md#text-inputs) |
| sap.m.Input                                           | ~~Text inputs (Text field)~~ Text field | —                   | Matched        | [Text inputs](inventory/Controls.survey.md#text-inputs) |
| sap.m.MaskInput                                       | ~~Text inputs~~ Text field | —                   | Matched        | [Text inputs](inventory/Controls.survey.md#text-inputs) |
| sap.m.SearchField                                     | ~~Text inputs~~ Search field | —                   | Matched        | [Text inputs](inventory/Controls.survey.md#text-inputs) |
| sap.m.TextArea                                        | ~~Text inputs (Text area)~~ Text area | —                   | Matched        | [Text inputs](inventory/Controls.survey.md#text-inputs) |
| sap.tnt.SideNavigationSearchField                     | ~~Text inputs (Search field)~~ Search field | —                   | Matched        | [Text inputs](inventory/Controls.survey.md#text-inputs) |

### Views/form.scope.md

| Source entry                           | Abstract concept | Other OpenUI scopes | Classification | Source row                             |
| -------------------------------------- | ---------------- | ------------------- | -------------- | -------------------------------------- |
| sap.ui.layout.form.Form                | Form | —                   | Matched        | [Form](inventory/Views.survey.md#form) |
| sap.ui.layout.form.FormContainer       | ~~Form~~ Form group | —                   | Matched        | [Form](inventory/Views.survey.md#form) |
| sap.ui.layout.form.FormElement         | ~~Form~~ Form field | —                   | Matched        | [Form](inventory/Views.survey.md#form) |
| sap.ui.layout.form.SemanticFormElement | ~~Form~~ Form field | —                   | Matched        | [Form](inventory/Views.survey.md#form) |
| sap.ui.layout.form.SimpleForm          | Form | —                   | Matched        | [Form](inventory/Views.survey.md#form) |

### Widgets/chart.scope.md

| Source entry     | Abstract concept | Other OpenUI scopes | Classification | Source row                                 |
| ---------------- | ---------------- | ------------------- | -------------- | ------------------------------------------ |
| sap.ui.mdc.Chart | Chart | —                   | Matched        | [Chart](inventory/Widgets.survey.md#chart) |

### Widgets/data_grid.scope.md

| Source entry                 | Abstract concept | Other OpenUI scopes | Classification | Source row                                         |
| ---------------------------- | ---------------- | ------------------- | -------------- | -------------------------------------------------- |
| sap.ui.table.AnalyticalTable | Data grid | —                   | Matched        | [Data grid](inventory/Widgets.survey.md#data-grid) |
| sap.ui.table.TreeTable       | ~~Data grid~~ Tree grid | —                   | Matched        | [Data grid](inventory/Widgets.survey.md#data-grid) |

### Widgets/date_time_pickers.scope.md

| Source entry                             | Abstract concept  | Other OpenUI scopes | Classification | Source row                                                        |
| ---------------------------------------- | ----------------- | ------------------- | -------------- | ----------------------------------------------------------------- |
| sap.m.DateHighZoomInputs                 | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.DatePicker                         | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.DateRangeSelection                 | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.DateTimeField                      | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.DateTimePicker                     | ~~Date/Time pickers~~ Date and time field | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.TimePicker                         | ~~Date/Time pickers~~ Time picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.TimePickerClock                    | ~~Date/Time pickers~~ Time picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.TimePickerClocks                   | ~~Date/Time pickers~~ Time picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.TimePickerInputs                   | ~~Date/Time pickers~~ Time picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.TimePickerInternals                | ~~Date/Time pickers~~ Time picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.TimePickerSlider                   | ~~Date/Time pickers~~ Time picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.TimePickerSliders                  | ~~Date/Time pickers~~ Time picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.Calendar                  | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.CalendarDate     | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.DatesRow         | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.Header           | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.IndexPicker      | ~~Date/Time pickers~~ Planning calendar | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.Month            | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.MonthPicker      | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.MonthsRow        | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.OneMonthDatesRow | ~~Date/Time pickers~~ Planning calendar | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.TimesRow         | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.WeeksRow         | ~~Date/Time pickers~~ Planning calendar | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.YearPicker       | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.YearRangePicker  | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.CalendarLegend            | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.CalendarMonthInterval     | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.CalendarTimeInterval      | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.DateTypeRange             | ~~Date/Time pickers~~ Date picker | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |

### Widgets/dialog.scope.md

| Source entry                   | Abstract concept | Other OpenUI scopes | Classification | Source row                                   |
| ------------------------------ | ---------------- | ------------------- | -------------- | -------------------------------------------- |
| sap.m.Dialog                   | Dialog | —                   | Matched        | [Dialog](inventory/Widgets.survey.md#dialog) |
| sap.m.P13nDialog               | ~~Dialog~~ Personalization panel | —                   | Matched        | [Dialog](inventory/Widgets.survey.md#dialog) |
| sap.m.TableSelectDialog        | ~~Dialog~~ Value help | —                   | Matched        | [Dialog](inventory/Widgets.survey.md#dialog) |
| sap.m.upload.FilePreviewDialog | Dialog | —                   | Matched        | [Dialog](inventory/Widgets.survey.md#dialog) |
| sap.m.ViewSettingsDialog       | ~~Dialog~~ Personalization panel | —                   | Matched        | [Dialog](inventory/Widgets.survey.md#dialog) |

### Widgets/feedback_widgets.scope.md

| Source entry                                                     | Abstract concept | Other OpenUI scopes | Classification | Source row                                                       |
| ---------------------------------------------------------------- | ---------------- | ------------------- | -------------- | ---------------------------------------------------------------- |
| sap.f.gen.ui5.webcomponents_fiori.dist.NotificationList          | ~~Feedback widgets~~ Notification | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.f.gen.ui5.webcomponents_fiori.dist.NotificationListGroupItem | ~~Feedback widgets~~ Notification | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.f.gen.ui5.webcomponents_fiori.dist.NotificationListItem      | ~~Feedback widgets~~ Notification | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.m.MessagePopover                                             | ~~Feedback widgets~~ Alert | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.m.MessageStrip                                               | ~~Feedback widgets~~ Alert | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.m.MessageView                                                | ~~Feedback widgets~~ Alert | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.m.p13n.MessageStrip                                          | ~~Feedback widgets~~ Alert | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.ui.core.tooltip.Tooltip                                      | ~~Feedback widgets~~ Tooltip | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.ui.core.tooltip.TooltipEnablement                            | ~~Feedback widgets~~ Tooltip | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.ui.core.tooltip.TooltipEventTrigger                          | ~~Feedback widgets~~ Tooltip | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.ui.core.tooltip.TooltipFocusGuard                            | ~~Feedback widgets~~ Tooltip | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.ui.core.TooltipBase                                          | ~~Feedback widgets~~ Tooltip | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |

### Widgets/list.scope.md

| Source entry                                 | Abstract concept | Other OpenUI scopes | Classification | Source row                               |
| -------------------------------------------- | ---------------- | ------------------- | -------------- | ---------------------------------------- |
| sap.f.gen.ui5.webcomponents.dist.ListItem    | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.f.GridList                               | ~~List~~ Icon collection | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.f.GridListItem                           | ~~List~~ Icon collection | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.ActionListItem                         | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.ColumnListItem                         | ~~List~~ Table | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.CustomListItem                         | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.CustomTreeItem                         | ~~List~~ Tree | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.DisplayListItem                        | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.FacetFilterItem                        | ~~List~~ Filter bar | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.FeedListItem                           | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.GroupHeaderListItem                    | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.GrowingList                            | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.IconTabFilter                          | ~~List~~ Tab | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.InputListItem                          | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.List                                   | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.MenuListItem                           | ~~List~~ Menu item | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.MessageItem                            | ~~List~~ Alert | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.MessageListItem                        | ~~List~~ Alert | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.MessagePopoverItem                     | ~~List~~ Alert | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.ObjectListItem                         | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.P13nAnyFilterItem                      | ~~List~~ Personalization panel | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.P13nColumnsItem                        | ~~List~~ Personalization panel | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.P13nDimMeasureItem                     | ~~List~~ Personalization panel | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.P13nFilterItem                         | ~~List~~ Personalization panel | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.P13nGroupItem                          | ~~List~~ Personalization panel | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.P13nSelectionItem                      | ~~List~~ Personalization panel | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.P13nSortItem                           | ~~List~~ Personalization panel | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.SegmentedButtonItem                    | ~~List~~ Exclusive selection coordination | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.SelectionDetailsListItem               | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.StandardListItem                       | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.StandardTreeItem                       | ~~List~~ Tree | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.SuggestionItem                         | ~~List~~ Text completion | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.table.columnmenu.ActionItem            | ~~List~~ Menu item | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.table.columnmenu.Item                  | ~~List~~ Menu item | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.table.columnmenu.ItemContainer         | ~~List~~ Menu item | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.TabStripItem                           | ~~List~~ Tab | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.TreeItemBase                           | ~~List~~ Tree | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.VariantItem                            | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.ViewSettingsCustomItem                 | ~~List~~ Personalization panel | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.ViewSettingsCustomTab                  | ~~List~~ Personalization panel | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.ViewSettingsFilterItem                 | ~~List~~ Personalization panel | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.ViewSettingsItem                       | ~~List~~ Personalization panel | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.VisibleItem                            | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.ui.core.ListItem                         | ~~List~~ Dropdown | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.ui.integration.controls.ListContentItem  | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.ui.mdc.filterbar.p13n.FilterColumnLayout | ~~List~~ Personalization panel | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.ui.mdc.List                              | List | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |

### Widgets/media_widgets.scope.md

| Source entry       | Abstract concept | Other OpenUI scopes | Classification | Source row                                                 |
| ------------------ | ---------------- | ------------------- | -------------- | ---------------------------------------------------------- |
| sap.m.ImageContent | ~~Media widgets~~ Image | —                   | Matched        | [Media widgets](inventory/Widgets.survey.md#media-widgets) |
| sap.ui.mdc.Geomap  | ~~Media widgets~~ Geographic map | —                   | Matched        | [Media widgets](inventory/Widgets.survey.md#media-widgets) |

### Widgets/menu_widgets.scope.md

| Source entry                              | Abstract concept | Other OpenUI scopes | Classification | Source row                                               |
| ----------------------------------------- | ---------------- | ------------------- | -------------- | -------------------------------------------------------- |
| sap.f.gen.ui5.webcomponents.dist.Menu     | ~~Menu widgets~~ Menu | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.f.gen.ui5.webcomponents.dist.MenuItem | ~~Menu widgets~~ Menu item | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.m.Menu                                | ~~Menu widgets~~ Menu | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.m.MenuButton                          | ~~Menu widgets~~ Menu button | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.m.MenuItem                            | ~~Menu widgets~~ Menu item | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.m.MenuItemGroup                       | ~~Menu widgets~~ Menu | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.m.MenuWrapper                         | ~~Menu widgets~~ Menu | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.m.table.columnmenu.Menu               | ~~Menu widgets~~ Context menu | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.ui.table.AnalyticalColumnMenu         | ~~Menu widgets~~ Context menu | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.ui.table.ColumnMenu                   | ~~Menu widgets~~ Context menu | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.ui.unified.Menu                       | ~~Menu widgets~~ Menu | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.ui.unified.MenuItem                   | ~~Menu widgets~~ Menu item | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.ui.unified.MenuItemBase               | ~~Menu widgets~~ Menu item | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.ui.unified.MenuItemGroup              | ~~Menu widgets~~ Menu | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.ui.unified.MenuTextFieldItem          | ~~Menu widgets~~ Menu item | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |

### Widgets/navigation_widgets.scope.md

| Source entry                   | Abstract concept                                       | Other OpenUI scopes | Classification | Source row                                                           |
| ------------------------------ | ------------------------------------------------------ | ------------------- | -------------- | -------------------------------------------------------------------- |
| sap.m.Breadcrumbs              | ~~Navigation widgets~~ Breadcrumb | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.m.Carousel                 | ~~Navigation widgets~~ Carousel | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.m.IconTabHeader            | ~~Navigation widgets~~ Tab Bar | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.m.NavContainer             | ~~Navigation widgets~~ Page stack | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.m.TileContainer            | ~~Navigation widgets~~ Carousel | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.m.Tree                     | ~~Navigation widgets~~ Tree view | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.tnt.NavigationList         | ~~Navigation widgets~~ Navigation bar | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.tnt.NavigationListGroup    | ~~Navigation widgets — grouping child of NavigationList~~ Navigation group | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.tnt.NavigationListItem     | ~~Navigation widgets — item child of NavigationList~~ Navigation item | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.tnt.NavigationListItemBase | ~~Navigation widgets~~ Navigation item | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.tnt.NavigationListMenuItem | ~~Navigation widgets — **ambiguous, see Phase 0 report**~~ Navigation item | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.tnt.SideNavigation         | ~~Navigation widgets (Navigation Drawer)~~ Navigation Drawer | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.uxap.BreadCrumbs           | ~~Navigation widgets~~ Breadcrumb | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |

### Widgets/stepper.scope.md

| Source entry                  | Abstract concept | Other OpenUI scopes | Classification | Source row                                     |
| ----------------------------- | ---------------- | ------------------- | -------------- | ---------------------------------------------- |
| sap.m.Wizard                  | ~~Stepper~~ Wizard | —                   | Matched        | [Stepper](inventory/Widgets.survey.md#stepper) |
| sap.m.WizardProgressNavigator | ~~Stepper~~ Wizard | —                   | Matched        | [Stepper](inventory/Widgets.survey.md#stepper) |
| sap.m.WizardStep              | ~~Stepper~~ Wizard | —                   | Matched        | [Stepper](inventory/Widgets.survey.md#stepper) |

### Widgets/table.scope.md

| Source entry                  | Abstract concept | Other OpenUI scopes | Classification | Source row                                 |
| ----------------------------- | ---------------- | ------------------- | -------------- | ------------------------------------------ |
| sap.m.Column                  | Table | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.m.Table                   | Table | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.m.upload.Column           | Table | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.mdc.Table              | Table | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.mdc.table.Column       | Table | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.AnalyticalColumn | ~~Table~~ Data grid | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.Column           | ~~Table~~ Data grid | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.CreationRow      | ~~Table~~ Data grid | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.HeaderSelector   | ~~Table~~ Data grid | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.Row              | ~~Table~~ Data grid | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.RowAction        | ~~Table~~ Data grid | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.RowActionItem    | ~~Table~~ Data grid | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.Table            | ~~Table~~ Data grid | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |

## Proposed by the class-by-class review

These 156 classes were unclustered leftovers of Phase B. The class-by-class review in [opens.md](opens.md#o3-261-unclustered-classes) maps them to existing OpenUI terms, as UI objects, parts of UI objects or behaviors. They are proposals at survey level, not Phase B matches, so their classification is _Proposed (review)_. Rows are grouped by the scope that holds the OpenUI term; approved terms without a scope file yet are grouped under their folder.

### Proposed: Application/index_html.scope.md

| Source entry         | Abstract concept         | Other OpenUI scopes | Classification                              | Source row                                            |
| -------------------- | ------------------------ | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.ui.core.Manifest | ~~index.html (Application)~~ No entry: the application descriptor; index.html is a spec object with no taxonomy entry | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Application/routing.scope.md

| Source entry                             | Abstract concept                | Other OpenUI scopes | Classification                              | Source row                                            |
| ---------------------------------------- | ------------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.ui.core.History                      | ~~Route and Routing (Application)~~ Routing | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.routing.HashChanger          | ~~Route and Routing (Application)~~ Routing | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.routing.HashChangerBase      | ~~Route and Routing (Application)~~ Routing | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.routing.Route                | ~~Route and Routing (Application)~~ Route | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.routing.Router               | ~~Route and Routing (Application)~~ Routing | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.routing.RouterHashChanger    | ~~Route and Routing (Application)~~ Routing | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.routing.Target.TitleProvider | ~~Route and Routing (Application)~~ Routing | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.routing.TargetCache          | ~~Route and Routing (Application)~~ Routing | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.routing.Targets              | ~~Route and Routing (Application)~~ Routing | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.routing.Views                | ~~Route and Routing (Application)~~ Routing | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Application/scope.md

| Source entry            | Abstract concept | Other OpenUI scopes | Classification                              | Source row                                            |
| ----------------------- | ---------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.f.ProductSwitch     | Shell bar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.f.ProductSwitchItem | Shell bar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.f.SearchManager     | Shell bar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Behaviors/drag_and_drop.scope.md

| Source entry                 | Abstract concept          | Other OpenUI scopes | Classification              | Source row                                            |
| ---------------------------- | ------------------------- | ------------------- | --------------------------- | ----------------------------------------------------- |
| sap.f.dnd.GridDragOver       | ~~Drag and drop (Behaviors)~~ Drag and drop | —                   | Proposed (review): behavior | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.dnd.DragDropBase | ~~Drag and drop (Behaviors)~~ Drag and drop | —                   | Proposed (review): behavior | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Behaviors/scope.md

| Source entry                               | Abstract concept                                | Other OpenUI scopes | Classification                              | Source row                                            |
| ------------------------------------------ | ----------------------------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.f.delegate.GridContainerItemNavigation | ~~Focus management (Viewport and focus control)~~ Focus management | —                   | Proposed (review): behavior                 | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.f.delegate.GridItemNavigation          | ~~Focus management (Viewport and focus control)~~ Focus management | —                   | Proposed (review): behavior                 | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.HeaderContainerItemNavigator         | ~~Focus management (Viewport and focus control)~~ Focus management | —                   | Proposed (review): behavior                 | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.MaskInputRule                        | ~~Constraint validation (Input assistance)~~ Constraint validation | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.ValueStateHeader                     | ~~Constraint validation (Input assistance)~~ Constraint validation | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.FocusHandler                   | ~~Focus management (Viewport and focus control)~~ Focus management | —                   | Proposed (review): behavior                 | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.Popup                          | ~~Modal overlay (Behaviors)~~ Modal overlay | —                   | Proposed (review): behavior                 | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.delegate.ItemNavigation        | ~~Focus management (Viewport and focus control)~~ Focus management | —                   | Proposed (review): behavior                 | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.delegate.ScrollEnablement      | ~~Viewport scrolling (Viewport and focus control)~~ Viewport scrolling | —                   | Proposed (review): behavior                 | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Containers/grid.scope.md

| Source entry                                         | Abstract concept  | Other OpenUI scopes | Classification                              | Source row                                            |
| ---------------------------------------------------- | ----------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.f.GridContainerItemLayoutData                    | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.f.GridContainerSettings                          | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.BlockLayout                            | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.BlockLayoutCell                        | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.BlockLayoutCellData                    | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.BlockLayoutRow                         | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.GridData                               | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.cssgrid.GridBasicLayout                | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.cssgrid.GridBoxLayout                  | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.cssgrid.GridItemLayoutData             | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.cssgrid.GridLayoutBase                 | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.cssgrid.GridLayoutDelegate             | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.cssgrid.GridResponsiveLayout           | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.cssgrid.GridSettings                   | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.cssgrid.ResponsiveColumnItemLayoutData | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.cssgrid.ResponsiveColumnLayout         | ~~Grid (Containers)~~ Grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Containers/overlay_containers.scope.md

| Source entry       | Abstract concept             | Other OpenUI scopes | Classification                              | Source row                                            |
| ------------------ | ---------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.m.LightBox     | ~~Popover (Overlay containers)~~ Popover | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.LightBoxItem | ~~Popover (Overlay containers)~~ Popover | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Containers/sheet_containers.scope.md

| Source entry                     | Abstract concept              | Other OpenUI scopes | Classification                              | Source row                                            |
| -------------------------------- | ----------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.f.SidePanelItem              | ~~Side Sheet (Sheet containers)~~ Side Sheet | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.DynamicSideContent | ~~Side Sheet (Sheet containers)~~ Side Sheet | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Containers/splitters.scope.md

| Source entry                     | Abstract concept     | Other OpenUI scopes | Classification                              | Source row                                            |
| -------------------------------- | -------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.ui.layout.SplitterLayoutData | ~~Splitter (Splitters)~~ Splitter | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Containers/structural_containers.scope.md

| Source entry                   | Abstract concept                         | Other OpenUI scopes | Classification                              | Source row                                            |
| ------------------------------ | ---------------------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.m.ScrollContainer          | ~~Scroll container (Structural containers)~~ Scroll container | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.HorizontalLayout | ~~Stack (Structural containers)~~ Stack | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Containers/surface_containers.scope.md

| Source entry                                      | Abstract concept                 | Other OpenUI scopes | Classification                              | Source row                                            |
| ------------------------------------------------- | -------------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.f.HeroBanner                                  | ~~Hero banner (Surface containers)~~ Hero banner | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.f.gen.ui5.webcomponents_fiori.dist.HeroBanner | ~~Hero banner (Surface containers)~~ Hero banner | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.ContentConfig                               | Tile | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Containers/tabs.scope.md

| Source entry                   | Abstract concept  | Other OpenUI scopes | Classification                              | Source row                                            |
| ------------------------------ | ----------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.ui.unified.ContentSwitcher | ~~Page stack (Tabs)~~ Page stack | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Controls/choice_controls.scope.md

| Source entry                  | Abstract concept           | Other OpenUI scopes | Classification                              | Source row                                            |
| ----------------------------- | -------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.m.MultiEditField          | ~~Dropdown (Choice controls)~~ Dropdown | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.semantic.SemanticSelect | ~~Dropdown (Choice controls)~~ Dropdown | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Controls/display_primitives.scope.md

| Source entry                       | Abstract concept               | Other OpenUI scopes | Classification                              | Source row                                            |
| ---------------------------------- | ------------------------------ | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.f.Illustration                 | ~~Image (Display primitives)~~ Image | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.FormattedText                | ~~Text (Display primitives)~~ Text | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.FormattedTextAnchorGenerator | ~~Text (Display primitives)~~ Text | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.Illustration                 | ~~Image (Display primitives)~~ Image | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.ImageCustomData              | ~~Image (Display primitives)~~ Image | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.ObjectIdentifier             | ~~Text (Display primitives)~~ Text | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.ToolbarSeparator             | ~~Separator (Display primitives)~~ Separator | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.Currency            | ~~Text (Display primitives)~~ Text | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Controls/link_and_scroll_controls.scope.md

| Source entry              | Abstract concept                | Other OpenUI scopes | Classification                              | Source row                                            |
| ------------------------- | ------------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.ui.mdc.link.LinkItem  | ~~Link (Link and scroll controls)~~ Link | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.mdc.link.PanelItem | ~~Link (Link and scroll controls)~~ Link | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Controls/picker_control.scope.md

| Source entry               | Abstract concept              | Other OpenUI scopes | Classification                              | Source row                                            |
| -------------------------- | ----------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.m.ColorPalette         | ~~Color picker (Picker control)~~ Color picker | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.WheelSliderContainer | ~~Wheel picker (Picker control)~~ Wheel picker | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Controls/range_control.scope.md

| Source entry       | Abstract concept           | Other OpenUI scopes | Classification                              | Source row                                            |
| ------------------ | -------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.m.NumericInput | ~~Step input (Range control)~~ Step input | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Controls/status_indicator.scope.md

| Source entry            | Abstract concept                 | Other OpenUI scopes | Classification                              | Source row                                            |
| ----------------------- | -------------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.m.BadgeCustomData   | ~~Tag and Badge (Status indicator)~~ Badge | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.DraftIndicator    | ~~Tag and Badge (Status indicator)~~ Tag | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.GenericTag        | ~~Tag and Badge (Status indicator)~~ Tag | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.ObjectMarker      | ~~Tag and Badge (Status indicator)~~ Tag | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.Placeholder | ~~Loader (Status indicator)~~ Loader | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Controls/text_inputs.scope.md

| Source entry                                              | Abstract concept                                     | Other OpenUI scopes | Classification                              | Source row                                            |
| --------------------------------------------------------- | ---------------------------------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.f.gen.ui5.webcomponents_fiori.dist.Search             | ~~Search field with Text completion (Input assistance)~~ Search field | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.f.gen.ui5.webcomponents_fiori.dist.SearchItem         | ~~Search field with Text completion (Input assistance)~~ Search field | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.f.gen.ui5.webcomponents_fiori.dist.SearchItemGroup    | ~~Search field with Text completion (Input assistance)~~ Search field | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.f.gen.ui5.webcomponents_fiori.dist.SearchItemShowMore | ~~Search field with Text completion (Input assistance)~~ Search field | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.f.gen.ui5.webcomponents_fiori.dist.SearchMessageArea  | ~~Search field with Text completion (Input assistance)~~ Search field | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.f.gen.ui5.webcomponents_fiori.dist.SearchScope        | ~~Search field with Text completion (Input assistance)~~ Search field | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.FeedInput                                           | ~~Text area (Text inputs)~~ Text area | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.SuggestionsList                                     | ~~Search field with Text completion (Input assistance)~~ Text completion | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.codeeditor.CodeEditor                              | ~~Text area (Text inputs)~~ Text area | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.search.OpenSearchProvider                     | ~~Search field with Text completion (Input assistance)~~ Text completion | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.search.SearchProvider                         | ~~Search field with Text completion (Input assistance)~~ Text completion | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Interaction/scope.md

| Source entry        | Abstract concept              | Other OpenUI scopes | Classification                              | Source row                                            |
| ------------------- | ----------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.m.PullToRefresh | ~~Pull to refresh (Interaction)~~ Pull to refresh | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Pages/scope.md

| Source entry                         | Abstract concept | Other OpenUI scopes | Classification                              | Source row                                            |
| ------------------------------------ | ---------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.m.ObjectHeader                   | Object page | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.semantic.SemanticConfiguration | Object page | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Views/form.scope.md

| Source entry                            | Abstract concept | Other OpenUI scopes | Classification                              | Source row                                            |
| --------------------------------------- | ---------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.ui.core.VariantLayoutData           | ~~Form (Views)~~ Form | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.form.ColumnContainerData  | ~~Form (Views)~~ Form | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.form.ColumnElementData    | ~~Form (Views)~~ Form | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.form.ColumnLayout         | ~~Form (Views)~~ Form | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.form.FormLayout           | ~~Form (Views)~~ Form | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.form.GridContainerData    | ~~Form (Views)~~ Form | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.form.GridElementData      | ~~Form (Views)~~ Form | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.form.GridLayout           | ~~Form (Views)~~ Form | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.form.ResponsiveGridLayout | ~~Form (Views)~~ Form | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.layout.form.ResponsiveLayout     | ~~Form (Views)~~ Form | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Widgets/chart.scope.md

| Source entry                             | Abstract concept | Other OpenUI scopes | Classification                              | Source row                                            |
| ---------------------------------------- | ---------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.m.SelectionDetailsItemLine           | Chart | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.mdc.chart.DrillBreadcrumbs        | Chart | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.mdc.chart.Item                    | Chart | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.mdc.chart.SelectionButtonItem     | Chart | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.mdc.chart.SelectionDetailsActions | Chart | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Widgets/date_time_pickers.scope.md

| Source entry                              | Abstract concept  | Other OpenUI scopes | Classification                              | Source row                                            |
| ----------------------------------------- | ----------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.m.DateTimeInput                       | ~~Date/Time pickers~~ Date and time field | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.DynamicDateOption                   | ~~Date/Time pickers~~ Date picker | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.DynamicDateRange                    | ~~Date/Time pickers~~ Date picker | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.DynamicDateValueHelpUIType          | ~~Date/Time pickers~~ Date picker | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.StandardDynamicDateOption           | ~~Date/Time pickers~~ Date picker | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.CalendarDateInterval       | ~~Date/Time pickers~~ Date picker | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.CalendarLegendItem         | ~~Date/Time pickers~~ Date picker | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.DateRange                  | ~~Date/Time pickers~~ Date picker | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.internal.CustomMonthPicker | ~~Date/Time pickers~~ Date picker | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.internal.CustomYearPicker  | ~~Date/Time pickers~~ Date picker | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Widgets/dialog.scope.md

| Source entry       | Abstract concept         | Other OpenUI scopes | Classification                              | Source row                                            |
| ------------------ | ------------------------ | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.m.BusyDialog   | ~~Progress dialog (Dialog)~~ Progress dialog | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.SelectDialog | ~~Dialog~~ Value help | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Widgets/feedback_widgets.scope.md

| Source entry                                              | Abstract concept                       | Other OpenUI scopes | Classification                              | Source row                                            |
| --------------------------------------------------------- | -------------------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.f.IllustratedMessage                                  | ~~Illustrated message (Feedback widgets)~~ Illustrated message | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.f.gen.ui5.webcomponents_fiori.dist.IllustratedMessage | ~~Illustrated message (Feedback widgets)~~ Illustrated message | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.IllustratedMessage                                  | ~~Illustrated message (Feedback widgets)~~ Illustrated message | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.InvisibleMessage                              | ~~Narration (Feedback widgets)~~ Narration | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.Message                                       | ~~Alert (Feedback widgets)~~ Alert | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.core.fieldhelp.FieldHelpCustomData                 | ~~Contextual help (Feedback widgets)~~ Contextual help | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Widgets/list.scope.md

| Source entry                                   | Abstract concept        | Other OpenUI scopes | Classification                              | Source row                                            |
| ---------------------------------------------- | ----------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.f.gen.ui5.webcomponents.dist.ListItemGroup | List | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.MultiInput                               | ~~Token collection (List)~~ Token collection | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.OverflowToolbarTokenizer                 | ~~Token collection (List)~~ Token collection | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.Token                                    | ~~Token collection (List)~~ Token collection | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.Tokenizer                                | ~~Token collection (List)~~ Token collection | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.mdc.list.ItemActionItem                 | List | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Widgets/media_widgets.scope.md

| Source entry    | Abstract concept | Other OpenUI scopes | Classification                              | Source row                                            |
| --------------- | ---------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.m.PDFViewer | ~~Media widgets~~ No entry: a PDF document viewer; no taxonomy entry holds a document viewer | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Widgets/menu_widgets.scope.md

| Source entry                                     | Abstract concept            | Other OpenUI scopes | Classification                              | Source row                                            |
| ------------------------------------------------ | --------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.m.ActionSheet                                | ~~Menu (Menu widgets)~~ Menu | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.mdc.table.menus.GroupHeaderRowContextMenu | ~~Context menu (Menu widgets)~~ Context menu | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Widgets/navigation_widgets.scope.md

| Source entry         | Abstract concept              | Other OpenUI scopes | Classification                              | Source row                                            |
| -------------------- | ----------------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.m.CarouselLayout | ~~Carousel (Navigation widgets)~~ Carousel | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Widgets/scope.md

| Source entry                                | Abstract concept  | Other OpenUI scopes | Classification                              | Source row                                            |
| ------------------------------------------- | ----------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.f.PlanningCalendarInCardLegend          | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.PlanningCalendarLegend                | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.PlanningCalendarRow                   | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.PlanningCalendarView                  | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.SinglePlanningCalendarDayView         | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.SinglePlanningCalendarGrid            | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.SinglePlanningCalendarMonthGrid       | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.SinglePlanningCalendarMonthView       | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.SinglePlanningCalendarView            | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.SinglePlanningCalendarWeekView        | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.m.SinglePlanningCalendarWorkWeekView    | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.mdc.util.InfoBar                     | Filter bar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.CalendarAppointment          | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.CalendarOneMonthInterval     | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.CalendarWeekInterval         | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.MonthlyRecurrenceRule        | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.NonWorkingPeriod             | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.RecurrenceRule               | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.RecurringCalendarAppointment | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.RecurringNonWorkingPeriod    | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.TimeRange                    | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.WeeklyRecurrenceRule         | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.unified.YearlyRecurrenceRule         | Planning calendar | —                   | Proposed (review): part of an approved term | [Appendix A](opens.md#appendix-a-unclustered-classes) |

### Proposed: Widgets/table.scope.md

| Source entry                                | Abstract concept    | Other OpenUI scopes | Classification                              | Source row                                            |
| ------------------------------------------- | ------------------- | ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| sap.ui.mdc.table.CreationRow                | ~~Table and Data grid~~ Table | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.mdc.table.RowActionItem              | ~~Table and Data grid~~ Table | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.mdc.table.menus.QuickActionContainer | ~~Table and Data grid~~ Table | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
| sap.ui.table.RowSettings                    | ~~Table and Data grid~~ Data grid | —                   | Proposed (review): matches an existing term | [Appendix A](opens.md#appendix-a-unclustered-classes) |
