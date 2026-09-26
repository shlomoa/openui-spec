# OpenUI5 survey: taxonomy mapping

[Survey README](README.md) · [Categories](category.md) · [Scopes proposal](scopes_proposal.md)

This file normalizes the OpenUI5 survey's seven category files (`inventory/*.survey.md`). Each row is one OpenUI5 class matched to an existing OpenUI spec object during Phase B. The 257 classes that did not match are proposed as 11 new subcategories; see [scopes_proposal.md](scopes_proposal.md).

All rows here are _Matched_: the class was classified to an existing spec object by base-class and description matching (steps B2–B5), then described from full source in Phase C.

Scope paths are relative to `spec/scopes/`. The mapping records survey proposals only; the canonical scope tree, [taxonomy mapping](../../scopes/taxonomy_mapping.md) and generated catalog are unchanged.

## Summary

424 source entries map to 31 OpenUI scopes. Classification totals: Matched 424.

| OpenUI scope                                                                                          | Primary entries | All mentions |
| ----------------------------------------------------------------------------------------------------- | --------------: | -----------: |
| [Application/tool_bars.scope.md](../../scopes/Application/tool_bars.scope.md)                         |               8 |            8 |
| [Behaviors/drag_and_drop.scope.md](../../scopes/Behaviors/drag_and_drop.scope.md)                     |               7 |            7 |
| [Containers/expandable_panels.scope.md](../../scopes/Containers/expandable_panels.scope.md)           |               2 |            2 |
| [Containers/grid.scope.md](../../scopes/Containers/grid.scope.md)                                     |               3 |            3 |
| [Containers/overlay_containers.scope.md](../../scopes/Containers/overlay_containers.scope.md)         |              13 |           13 |
| [Containers/sheet_containers.scope.md](../../scopes/Containers/sheet_containers.scope.md)             |               1 |            1 |
| [Containers/splitters.scope.md](../../scopes/Containers/splitters.scope.md)                           |               9 |            9 |
| [Containers/structural_containers.scope.md](../../scopes/Containers/structural_containers.scope.md)   |               4 |            4 |
| [Containers/surface_containers.scope.md](../../scopes/Containers/surface_containers.scope.md)         |               2 |            2 |
| [Containers/tabs.scope.md](../../scopes/Containers/tabs.scope.md)                                     |               7 |            7 |
| [Controls/action_controls.scope.md](../../scopes/Controls/action_controls.scope.md)                   |              61 |           61 |
| [Controls/choice_controls.scope.md](../../scopes/Controls/choice_controls.scope.md)                   |              20 |           20 |
| [Controls/display_primitives.scope.md](../../scopes/Controls/display_primitives.scope.md)             |              17 |           17 |
| [Controls/link_and_scroll_controls.scope.md](../../scopes/Controls/link_and_scroll_controls.scope.md) |               4 |            4 |
| [Controls/native.scope.md](../../scopes/Controls/native.scope.md)                                     |              95 |           95 |
| [Controls/picker_control.scope.md](../../scopes/Controls/picker_control.scope.md)                     |               3 |            3 |
| [Controls/range_control.scope.md](../../scopes/Controls/range_control.scope.md)                       |               8 |            8 |
| [Controls/status_indicator.scope.md](../../scopes/Controls/status_indicator.scope.md)                 |               6 |            6 |
| [Controls/text_inputs.scope.md](../../scopes/Controls/text_inputs.scope.md)                           |               7 |            7 |
| [Views/form.scope.md](../../scopes/Views/form.scope.md)                                               |               5 |            5 |
| [Widgets/chart.scope.md](../../scopes/Widgets/chart.scope.md)                                         |               1 |            1 |
| [Widgets/data_grid.scope.md](../../scopes/Widgets/data_grid.scope.md)                                 |               2 |            2 |
| [Widgets/date_time_pickers.scope.md](../../scopes/Widgets/date_time_pickers.scope.md)                 |              29 |           29 |
| [Widgets/dialog.scope.md](../../scopes/Widgets/dialog.scope.md)                                       |               5 |            5 |
| [Widgets/feedback_widgets.scope.md](../../scopes/Widgets/feedback_widgets.scope.md)                   |              12 |           12 |
| [Widgets/list.scope.md](../../scopes/Widgets/list.scope.md)                                           |              47 |           47 |
| [Widgets/media_widgets.scope.md](../../scopes/Widgets/media_widgets.scope.md)                         |               2 |            2 |
| [Widgets/menu_widgets.scope.md](../../scopes/Widgets/menu_widgets.scope.md)                           |              15 |           15 |
| [Widgets/navigation_widgets.scope.md](../../scopes/Widgets/navigation_widgets.scope.md)               |              13 |           13 |
| [Widgets/stepper.scope.md](../../scopes/Widgets/stepper.scope.md)                                     |               3 |            3 |
| [Widgets/table.scope.md](../../scopes/Widgets/table.scope.md)                                         |              13 |           13 |

## Entries by primary OpenUI scope

The first scope listed is the primary destination used for grouping; further scopes are secondary destinations named by the source row.

### Application/tool_bars.scope.md

| Source entry                         | Abstract concept | Other OpenUI scopes | Classification | Source row                                             |
| ------------------------------------ | ---------------- | ------------------- | -------------- | ------------------------------------------------------ |
| sap.m.AssociativeOverflowToolbar     | Tool bars        | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |
| sap.m.Bar                            | Tool bars        | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |
| sap.m.OverflowToolbar                | Tool bars        | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |
| sap.m.Toolbar                        | Tool bars        | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |
| sap.tnt.ToolHeader                   | Tool bars        | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |
| sap.ui.mdc.ActionToolbar             | Tool bars        | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |
| sap.ui.mdc.table.utils.FilterInfoBar | Tool bars        | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |
| sap.uxap.AnchorBar                   | Tool bars        | —                   | Matched        | [Tool bars](inventory/Application.survey.md#tool-bars) |

### Behaviors/drag_and_drop.scope.md

| Source entry                       | Abstract concept | Other OpenUI scopes | Classification | Source row                                                   |
| ---------------------------------- | ---------------- | ------------------- | -------------- | ------------------------------------------------------------ |
| sap.f.dnd.GridDropInfo             | Drag and drop    | —                   | Matched        | [Drag and drop](inventory/Behaviors.survey.md#drag-and-drop) |
| sap.ui.core.dnd.DragDropInfo       | Drag and drop    | —                   | Matched        | [Drag and drop](inventory/Behaviors.survey.md#drag-and-drop) |
| sap.ui.core.dnd.DragInfo           | Drag and drop    | —                   | Matched        | [Drag and drop](inventory/Behaviors.survey.md#drag-and-drop) |
| sap.ui.core.dnd.DropInfo           | Drag and drop    | —                   | Matched        | [Drag and drop](inventory/Behaviors.survey.md#drag-and-drop) |
| sap.ui.mdc.list.DragDropConfig     | Drag and drop    | —                   | Matched        | [Drag and drop](inventory/Behaviors.survey.md#drag-and-drop) |
| sap.ui.mdc.table.DragDropConfig    | Drag and drop    | —                   | Matched        | [Drag and drop](inventory/Behaviors.survey.md#drag-and-drop) |
| sap.ui.mdc.util.DragDropConfigBase | Drag and drop    | —                   | Matched        | [Drag and drop](inventory/Behaviors.survey.md#drag-and-drop) |

### Containers/expandable_panels.scope.md

| Source entry          | Abstract concept  | Other OpenUI scopes | Classification | Source row                                                            |
| --------------------- | ----------------- | ------------------- | -------------- | --------------------------------------------------------------------- |
| sap.m.Panel           | Expandable panels | —                   | Matched        | [Expandable panels](inventory/Containers.survey.md#expandable-panels) |
| sap.ui.mdc.link.Panel | Expandable panels | —                   | Matched        | [Expandable panels](inventory/Containers.survey.md#expandable-panels) |

### Containers/grid.scope.md

| Source entry                  | Abstract concept | Other OpenUI scopes | Classification | Source row                                  |
| ----------------------------- | ---------------- | ------------------- | -------------- | ------------------------------------------- |
| sap.f.GridContainer           | Grid             | —                   | Matched        | [Grid](inventory/Containers.survey.md#grid) |
| sap.ui.layout.cssgrid.CSSGrid | Grid             | —                   | Matched        | [Grid](inventory/Containers.survey.md#grid) |
| sap.ui.layout.Grid            | Grid             | —                   | Matched        | [Grid](inventory/Containers.survey.md#grid) |

### Containers/overlay_containers.scope.md

| Source entry                                                     | Abstract concept   | Other OpenUI scopes | Classification | Source row                                                              |
| ---------------------------------------------------------------- | ------------------ | ------------------- | -------------- | ----------------------------------------------------------------------- |
| sap.m.\_overflowToolbarHelpers.OverflowToolbarAssociativePopover | Overlay containers | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.ColorPalettePopover                                        | Overlay containers | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.Popover                                                    | Overlay containers | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.QuickView                                                  | Overlay containers | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.QuickViewBase                                              | Overlay containers | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.QuickViewCard                                              | Overlay containers | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.QuickViewGroup                                             | Overlay containers | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.QuickViewGroupElement                                      | Overlay containers | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.QuickViewPage                                              | Overlay containers | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.ResponsivePopover                                          | Overlay containers | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.SelectionDetails                                           | Overlay containers | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.m.SuggestionsPopover                                         | Overlay containers | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |
| sap.ui.mdc.chart.ChartSelectionDetails                           | Overlay containers | —                   | Matched        | [Overlay containers](inventory/Containers.survey.md#overlay-containers) |

### Containers/sheet_containers.scope.md

| Source entry    | Abstract concept | Other OpenUI scopes | Classification | Source row                                                          |
| --------------- | ---------------- | ------------------- | -------------- | ------------------------------------------------------------------- |
| sap.f.SidePanel | Sheet containers | —                   | Matched        | [Sheet containers](inventory/Containers.survey.md#sheet-containers) |

### Containers/splitters.scope.md

| Source entry                         | Abstract concept | Other OpenUI scopes | Classification | Source row                                            |
| ------------------------------------ | ---------------- | ------------------- | -------------- | ----------------------------------------------------- |
| sap.m.SplitApp                       | Splitters        | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.m.SplitContainer                 | Splitters        | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.ui.layout.AssociativeSplitter    | Splitters        | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.ui.layout.PaneContainer          | Splitters        | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.ui.layout.ResponsiveSplitter     | Splitters        | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.ui.layout.ResponsiveSplitterPage | Splitters        | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.ui.layout.SplitPane              | Splitters        | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.ui.layout.Splitter               | Splitters        | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |
| sap.ui.unified.SplitContainer        | Splitters        | —                   | Matched        | [Splitters](inventory/Containers.survey.md#splitters) |

### Containers/structural_containers.scope.md

| Source entry                 | Abstract concept      | Other OpenUI scopes | Classification | Source row                                                                    |
| ---------------------------- | --------------------- | ------------------- | -------------- | ----------------------------------------------------------------------------- |
| sap.m.FlexBox                | Structural containers | —                   | Matched        | [Structural containers](inventory/Containers.survey.md#structural-containers) |
| sap.m.HBox                   | Structural containers | —                   | Matched        | [Structural containers](inventory/Containers.survey.md#structural-containers) |
| sap.m.VBox                   | Structural containers | —                   | Matched        | [Structural containers](inventory/Containers.survey.md#structural-containers) |
| sap.ui.layout.VerticalLayout | Structural containers | —                   | Matched        | [Structural containers](inventory/Containers.survey.md#structural-containers) |

### Containers/surface_containers.scope.md

| Source entry      | Abstract concept   | Other OpenUI scopes | Classification | Source row                                                              |
| ----------------- | ------------------ | ------------------- | -------------- | ----------------------------------------------------------------------- |
| sap.m.GenericTile | Surface containers | —                   | Matched        | [Surface containers](inventory/Containers.survey.md#surface-containers) |
| sap.m.Page        | Surface containers | —                   | Matched        | [Surface containers](inventory/Containers.survey.md#surface-containers) |

### Containers/tabs.scope.md

| Source entry                         | Abstract concept | Other OpenUI scopes | Classification | Source row                                  |
| ------------------------------------ | ---------------- | ------------------- | -------------- | ------------------------------------------- |
| sap.m.IconTabBar                     | Tabs (Tab Bar)   | —                   | Matched        | [Tabs](inventory/Containers.survey.md#tabs) |
| sap.m.IconTabBarSelectList           | Tabs             | —                   | Matched        | [Tabs](inventory/Containers.survey.md#tabs) |
| sap.m.IconTabFilterExpandButtonBadge | Tabs             | —                   | Matched        | [Tabs](inventory/Containers.survey.md#tabs) |
| sap.m.IconTabSeparator               | Tabs             | —                   | Matched        | [Tabs](inventory/Containers.survey.md#tabs) |
| sap.m.TabContainer                   | Tabs             | —                   | Matched        | [Tabs](inventory/Containers.survey.md#tabs) |
| sap.m.TabContainerItem               | Tabs             | —                   | Matched        | [Tabs](inventory/Containers.survey.md#tabs) |
| sap.m.TabStrip                       | Tabs             | —                   | Matched        | [Tabs](inventory/Containers.survey.md#tabs) |

### Controls/action_controls.scope.md

| Source entry                                       | Abstract concept | Other OpenUI scopes | Classification | Source row                                                      |
| -------------------------------------------------- | ---------------- | ------------------- | -------------- | --------------------------------------------------------------- |
| sap.f.gen.ui5.webcomponents.dist.Button            | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.AddAction                           | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.CloseAction                         | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.CopyAction                          | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.DeleteAction                        | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.DiscussInJamAction                  | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.EditAction                          | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.ExitFullScreenAction                | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.FavoriteAction                      | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.FlagAction                          | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.FooterMainAction                    | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.FullScreenAction                    | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.MainAction                          | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.MessagesIndicator                   | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.NegativeAction                      | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.PositiveAction                      | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.PrintAction                         | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.SemanticButton                      | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.SemanticToggleButton                | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.SendEmailAction                     | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.SendMessageAction                   | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.ShareInJamAction                    | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.f.semantic.TitleMainAction                     | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.AccButton                                    | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.AdditionalTextButton                         | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.Button                                       | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.OverflowToolbarButton                        | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.OverflowToolbarMenuButton                    | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.OverflowToolbarToggleButton                  | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.PagingButton                                 | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.SegmentedButton                              | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.AddAction                           | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.CancelAction                        | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.DeleteAction                        | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.DiscussInJamAction                  | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.EditAction                          | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.FavoriteAction                      | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.FilterAction                        | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.FlagAction                          | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.ForwardAction                       | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.GroupAction                         | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.MainAction                          | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.MessagesIndicator                   | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.MultiSelectAction                   | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.NegativeAction                      | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.OpenInAction                        | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.PositiveAction                      | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.PrintAction                         | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SaveAction                          | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SemanticButton                      | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SemanticOverflowToolbarButton       | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SemanticOverflowToolbarToggleButton | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SemanticToggleButton                | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SendEmailAction                     | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SendMessageAction                   | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.ShareInJamAction                    | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.semantic.SortAction                          | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.SplitButton                                  | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.m.ToggleButton                                 | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.ui.mdc.chart.SelectionButton                   | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |
| sap.uxap.ObjectPageHeaderActionButton              | Action controls  | —                   | Matched        | [Action controls](inventory/Controls.survey.md#action-controls) |

### Controls/choice_controls.scope.md

| Source entry                                    | Abstract concept               | Other OpenUI scopes | Classification | Source row                                                      |
| ----------------------------------------------- | ------------------------------ | ------------------- | -------------- | --------------------------------------------------------------- |
| sap.m.ActionSelect                              | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.CheckBox                                  | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.ComboBox                                  | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.ComboBoxBase                              | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.ComboBoxTextField                         | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.MultiComboBox                             | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.RadioButton                               | Choice controls (Radio button) | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.RadioButtonGroup                          | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.Select                                    | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.SelectDialogBase                          | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.SelectList                                | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.semantic.FilterSelect                     | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.semantic.GroupSelect                      | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.semantic.SortSelect                       | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.m.Switch                                    | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.ui.integration.cards.filters.ComboBoxFilter | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.ui.integration.cards.filters.SelectFilter   | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.ui.integration.controls.ComboBox            | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.ui.mdc.field.FieldSelect                    | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |
| sap.uxap.HierarchicalSelect                     | Choice controls                | —                   | Matched        | [Choice controls](inventory/Controls.survey.md#choice-controls) |

### Controls/display_primitives.scope.md

| Source entry                            | Abstract concept                         | Other OpenUI scopes | Classification | Source row                                                            |
| --------------------------------------- | ---------------------------------------- | ------------------- | -------------- | --------------------------------------------------------------------- |
| sap.f.Avatar                            | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.f.AvatarGroup                       | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.f.AvatarGroupItem                   | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.f.gen.ui5.webcomponents.dist.Avatar | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.f.gen.ui5.webcomponents.dist.Label  | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.Avatar                            | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.ExpandableText                    | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.Image                             | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.Label                             | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.ObjectAttribute                   | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.ObjectNumber                      | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.Text                              | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.m.Title                             | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.tnt.ToolHeaderUtilitySeparator      | Display primitives (Separator / Divider) | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.ui.core.Icon                        | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.ui.core.SeparatorItem               | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |
| sap.ui.core.Title                       | Display primitives                       | —                   | Matched        | [Display primitives](inventory/Controls.survey.md#display-primitives) |

### Controls/link_and_scroll_controls.scope.md

| Source entry          | Abstract concept                | Other OpenUI scopes | Classification | Source row                                                                        |
| --------------------- | ------------------------------- | ------------------- | -------------- | --------------------------------------------------------------------------------- |
| sap.m.Link            | Link and scroll controls (Link) | —                   | Matched        | [Link and scroll controls](inventory/Controls.survey.md#link-and-scroll-controls) |
| sap.m.ScrollBar       | Link and scroll controls        | —                   | Matched        | [Link and scroll controls](inventory/Controls.survey.md#link-and-scroll-controls) |
| sap.ui.core.ScrollBar | Link and scroll controls        | —                   | Matched        | [Link and scroll controls](inventory/Controls.survey.md#link-and-scroll-controls) |
| sap.ui.mdc.Link       | Link and scroll controls        | —                   | Matched        | [Link and scroll controls](inventory/Controls.survey.md#link-and-scroll-controls) |

### Controls/native.scope.md

| Source entry                 | Abstract concept | Other OpenUI scopes | Classification | Source row                                    |
| ---------------------------- | ---------------- | ------------------- | -------------- | --------------------------------------------- |
| sap.html.A                   | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Abbr                | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Address             | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Area                | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Article             | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Aside               | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.B                   | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Bdi                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Bdo                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Blockquote          | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Br                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Button              | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Canvas              | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Caption             | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Cite                | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Code                | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Col                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Colgroup            | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Data                | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Datalist            | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Dd                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Del                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Details             | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Dfn                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Div                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Dl                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Dt                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Em                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Fieldset            | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Figcaption          | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Figure              | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Footer              | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Form                | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.H1                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.H2                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.H3                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.H4                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.H5                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.H6                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Header              | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Hgroup              | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Hr                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.I                   | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Img                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Input               | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Ins                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Kbd                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Label               | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Legend              | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Li                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Main                | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Map                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Mark                | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Menu                | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Meter               | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Nav                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Ol                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Optgroup            | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Option              | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Output              | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.P                   | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Pre                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Progress            | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Q                   | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Rp                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Rt                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Ruby                | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.S                   | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Samp                | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Search              | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Section             | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Select              | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Selectedcontent     | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Small               | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Span                | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Strong              | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Sub                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Summary             | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Sup                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Table               | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Tbody               | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Td                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Textarea            | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Tfoot               | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Th                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Thead               | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Time                | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Tr                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.U                   | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Ul                  | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Var                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.html.Wbr                 | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.ui.core.HTML             | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.ui.core.html.HTMLElement | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |
| sap.ui.core.html.TextContent | Native           | —                   | Matched        | [Native](inventory/Controls.survey.md#native) |

### Controls/picker_control.scope.md

| Source entry                      | Abstract concept | Other OpenUI scopes | Classification | Source row                                                    |
| --------------------------------- | ---------------- | ------------------- | -------------- | ------------------------------------------------------------- |
| sap.m.WheelSlider                 | Picker control   | —                   | Matched        | [Picker control](inventory/Controls.survey.md#picker-control) |
| sap.ui.unified.ColorPicker        | Picker control   | —                   | Matched        | [Picker control](inventory/Controls.survey.md#picker-control) |
| sap.ui.unified.ColorPickerPopover | Picker control   | —                   | Matched        | [Picker control](inventory/Controls.survey.md#picker-control) |

### Controls/range_control.scope.md

| Source entry                 | Abstract concept | Other OpenUI scopes | Classification | Source row                                                  |
| ---------------------------- | ---------------- | ------------------- | -------------- | ----------------------------------------------------------- |
| sap.m.RangeSlider            | Range control    | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |
| sap.m.RatingIndicator        | Range control    | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |
| sap.m.ResponsiveScale        | Range control    | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |
| sap.m.Slider                 | Range control    | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |
| sap.m.SliderTooltip          | Range control    | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |
| sap.m.SliderTooltipBase      | Range control    | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |
| sap.m.SliderTooltipContainer | Range control    | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |
| sap.m.StepInput              | Range control    | —                   | Matched        | [Range control](inventory/Controls.survey.md#range-control) |

### Controls/status_indicator.scope.md

| Source entry                             | Abstract concept       | Other OpenUI scopes | Classification | Source row                                                        |
| ---------------------------------------- | ---------------------- | ------------------- | -------------- | ----------------------------------------------------------------- |
| sap.m.BusyIndicator                      | Status indicator       | —                   | Matched        | [Status indicator](inventory/Controls.survey.md#status-indicator) |
| sap.m.ObjectStatus                       | Status indicator       | —                   | Matched        | [Status indicator](inventory/Controls.survey.md#status-indicator) |
| sap.m.ProgressIndicator                  | Status indicator       | —                   | Matched        | [Status indicator](inventory/Controls.survey.md#status-indicator) |
| sap.tnt.InfoLabel                        | Status indicator (Tag) | —                   | Matched        | [Status indicator](inventory/Controls.survey.md#status-indicator) |
| sap.ui.core.LocalBusyIndicator           | Status indicator       | —                   | Matched        | [Status indicator](inventory/Controls.survey.md#status-indicator) |
| sap.ui.integration.controls.ObjectStatus | Status indicator       | —                   | Matched        | [Status indicator](inventory/Controls.survey.md#status-indicator) |

### Controls/text_inputs.scope.md

| Source entry                                          | Abstract concept           | Other OpenUI scopes | Classification | Source row                                              |
| ----------------------------------------------------- | -------------------------- | ------------------- | -------------- | ------------------------------------------------------- |
| sap.f.gen.ui5.webcomponents_fiori.dist.SearchField    | Text inputs                | —                   | Matched        | [Text inputs](inventory/Controls.survey.md#text-inputs) |
| sap.f.gen.ui5.webcomponents_fiori.dist.ShellBarSearch | Text inputs                | —                   | Matched        | [Text inputs](inventory/Controls.survey.md#text-inputs) |
| sap.m.Input                                           | Text inputs (Text field)   | —                   | Matched        | [Text inputs](inventory/Controls.survey.md#text-inputs) |
| sap.m.MaskInput                                       | Text inputs                | —                   | Matched        | [Text inputs](inventory/Controls.survey.md#text-inputs) |
| sap.m.SearchField                                     | Text inputs                | —                   | Matched        | [Text inputs](inventory/Controls.survey.md#text-inputs) |
| sap.m.TextArea                                        | Text inputs (Text area)    | —                   | Matched        | [Text inputs](inventory/Controls.survey.md#text-inputs) |
| sap.tnt.SideNavigationSearchField                     | Text inputs (Search field) | —                   | Matched        | [Text inputs](inventory/Controls.survey.md#text-inputs) |

### Views/form.scope.md

| Source entry                           | Abstract concept | Other OpenUI scopes | Classification | Source row                             |
| -------------------------------------- | ---------------- | ------------------- | -------------- | -------------------------------------- |
| sap.ui.layout.form.Form                | Form             | —                   | Matched        | [Form](inventory/Views.survey.md#form) |
| sap.ui.layout.form.FormContainer       | Form             | —                   | Matched        | [Form](inventory/Views.survey.md#form) |
| sap.ui.layout.form.FormElement         | Form             | —                   | Matched        | [Form](inventory/Views.survey.md#form) |
| sap.ui.layout.form.SemanticFormElement | Form             | —                   | Matched        | [Form](inventory/Views.survey.md#form) |
| sap.ui.layout.form.SimpleForm          | Form             | —                   | Matched        | [Form](inventory/Views.survey.md#form) |

### Widgets/chart.scope.md

| Source entry     | Abstract concept | Other OpenUI scopes | Classification | Source row                                 |
| ---------------- | ---------------- | ------------------- | -------------- | ------------------------------------------ |
| sap.ui.mdc.Chart | Chart            | —                   | Matched        | [Chart](inventory/Widgets.survey.md#chart) |

### Widgets/data_grid.scope.md

| Source entry                 | Abstract concept | Other OpenUI scopes | Classification | Source row                                         |
| ---------------------------- | ---------------- | ------------------- | -------------- | -------------------------------------------------- |
| sap.ui.table.AnalyticalTable | Data grid        | —                   | Matched        | [Data grid](inventory/Widgets.survey.md#data-grid) |
| sap.ui.table.TreeTable       | Data grid        | —                   | Matched        | [Data grid](inventory/Widgets.survey.md#data-grid) |

### Widgets/date_time_pickers.scope.md

| Source entry                             | Abstract concept  | Other OpenUI scopes | Classification | Source row                                                        |
| ---------------------------------------- | ----------------- | ------------------- | -------------- | ----------------------------------------------------------------- |
| sap.m.DateHighZoomInputs                 | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.DatePicker                         | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.DateRangeSelection                 | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.DateTimeField                      | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.DateTimePicker                     | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.TimePicker                         | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.TimePickerClock                    | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.TimePickerClocks                   | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.TimePickerInputs                   | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.TimePickerInternals                | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.TimePickerSlider                   | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.m.TimePickerSliders                  | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.Calendar                  | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.CalendarDate     | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.DatesRow         | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.Header           | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.IndexPicker      | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.Month            | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.MonthPicker      | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.MonthsRow        | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.OneMonthDatesRow | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.TimesRow         | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.WeeksRow         | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.YearPicker       | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.calendar.YearRangePicker  | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.CalendarLegend            | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.CalendarMonthInterval     | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.CalendarTimeInterval      | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |
| sap.ui.unified.DateTypeRange             | Date/Time pickers | —                   | Matched        | [Date/Time pickers](inventory/Widgets.survey.md#datetime-pickers) |

### Widgets/dialog.scope.md

| Source entry                   | Abstract concept | Other OpenUI scopes | Classification | Source row                                   |
| ------------------------------ | ---------------- | ------------------- | -------------- | -------------------------------------------- |
| sap.m.Dialog                   | Dialog           | —                   | Matched        | [Dialog](inventory/Widgets.survey.md#dialog) |
| sap.m.P13nDialog               | Dialog           | —                   | Matched        | [Dialog](inventory/Widgets.survey.md#dialog) |
| sap.m.TableSelectDialog        | Dialog           | —                   | Matched        | [Dialog](inventory/Widgets.survey.md#dialog) |
| sap.m.upload.FilePreviewDialog | Dialog           | —                   | Matched        | [Dialog](inventory/Widgets.survey.md#dialog) |
| sap.m.ViewSettingsDialog       | Dialog           | —                   | Matched        | [Dialog](inventory/Widgets.survey.md#dialog) |

### Widgets/feedback_widgets.scope.md

| Source entry                                                     | Abstract concept | Other OpenUI scopes | Classification | Source row                                                       |
| ---------------------------------------------------------------- | ---------------- | ------------------- | -------------- | ---------------------------------------------------------------- |
| sap.f.gen.ui5.webcomponents_fiori.dist.NotificationList          | Feedback widgets | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.f.gen.ui5.webcomponents_fiori.dist.NotificationListGroupItem | Feedback widgets | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.f.gen.ui5.webcomponents_fiori.dist.NotificationListItem      | Feedback widgets | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.m.MessagePopover                                             | Feedback widgets | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.m.MessageStrip                                               | Feedback widgets | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.m.MessageView                                                | Feedback widgets | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.m.p13n.MessageStrip                                          | Feedback widgets | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.ui.core.tooltip.Tooltip                                      | Feedback widgets | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.ui.core.tooltip.TooltipEnablement                            | Feedback widgets | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.ui.core.tooltip.TooltipEventTrigger                          | Feedback widgets | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.ui.core.tooltip.TooltipFocusGuard                            | Feedback widgets | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |
| sap.ui.core.TooltipBase                                          | Feedback widgets | —                   | Matched        | [Feedback widgets](inventory/Widgets.survey.md#feedback-widgets) |

### Widgets/list.scope.md

| Source entry                                 | Abstract concept | Other OpenUI scopes | Classification | Source row                               |
| -------------------------------------------- | ---------------- | ------------------- | -------------- | ---------------------------------------- |
| sap.f.gen.ui5.webcomponents.dist.ListItem    | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.f.GridList                               | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.f.GridListItem                           | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.ActionListItem                         | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.ColumnListItem                         | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.CustomListItem                         | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.CustomTreeItem                         | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.DisplayListItem                        | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.FacetFilterItem                        | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.FeedListItem                           | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.GroupHeaderListItem                    | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.GrowingList                            | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.IconTabFilter                          | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.InputListItem                          | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.List                                   | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.MenuListItem                           | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.MessageItem                            | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.MessageListItem                        | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.MessagePopoverItem                     | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.ObjectListItem                         | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.P13nAnyFilterItem                      | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.P13nColumnsItem                        | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.P13nDimMeasureItem                     | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.P13nFilterItem                         | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.P13nGroupItem                          | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.P13nSelectionItem                      | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.P13nSortItem                           | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.SegmentedButtonItem                    | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.SelectionDetailsListItem               | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.StandardListItem                       | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.StandardTreeItem                       | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.SuggestionItem                         | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.table.columnmenu.ActionItem            | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.table.columnmenu.Item                  | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.table.columnmenu.ItemContainer         | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.TabStripItem                           | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.TreeItemBase                           | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.VariantItem                            | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.ViewSettingsCustomItem                 | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.ViewSettingsCustomTab                  | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.ViewSettingsFilterItem                 | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.ViewSettingsItem                       | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.m.VisibleItem                            | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.ui.core.ListItem                         | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.ui.integration.controls.ListContentItem  | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.ui.mdc.filterbar.p13n.FilterColumnLayout | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |
| sap.ui.mdc.List                              | List             | —                   | Matched        | [List](inventory/Widgets.survey.md#list) |

### Widgets/media_widgets.scope.md

| Source entry       | Abstract concept | Other OpenUI scopes | Classification | Source row                                                 |
| ------------------ | ---------------- | ------------------- | -------------- | ---------------------------------------------------------- |
| sap.m.ImageContent | Media widgets    | —                   | Matched        | [Media widgets](inventory/Widgets.survey.md#media-widgets) |
| sap.ui.mdc.Geomap  | Media widgets    | —                   | Matched        | [Media widgets](inventory/Widgets.survey.md#media-widgets) |

### Widgets/menu_widgets.scope.md

| Source entry                              | Abstract concept | Other OpenUI scopes | Classification | Source row                                               |
| ----------------------------------------- | ---------------- | ------------------- | -------------- | -------------------------------------------------------- |
| sap.f.gen.ui5.webcomponents.dist.Menu     | Menu widgets     | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.f.gen.ui5.webcomponents.dist.MenuItem | Menu widgets     | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.m.Menu                                | Menu widgets     | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.m.MenuButton                          | Menu widgets     | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.m.MenuItem                            | Menu widgets     | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.m.MenuItemGroup                       | Menu widgets     | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.m.MenuWrapper                         | Menu widgets     | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.m.table.columnmenu.Menu               | Menu widgets     | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.ui.table.AnalyticalColumnMenu         | Menu widgets     | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.ui.table.ColumnMenu                   | Menu widgets     | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.ui.unified.Menu                       | Menu widgets     | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.ui.unified.MenuItem                   | Menu widgets     | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.ui.unified.MenuItemBase               | Menu widgets     | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.ui.unified.MenuItemGroup              | Menu widgets     | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |
| sap.ui.unified.MenuTextFieldItem          | Menu widgets     | —                   | Matched        | [Menu widgets](inventory/Widgets.survey.md#menu-widgets) |

### Widgets/navigation_widgets.scope.md

| Source entry                   | Abstract concept                                       | Other OpenUI scopes | Classification | Source row                                                           |
| ------------------------------ | ------------------------------------------------------ | ------------------- | -------------- | -------------------------------------------------------------------- |
| sap.m.Breadcrumbs              | Navigation widgets                                     | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.m.Carousel                 | Navigation widgets                                     | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.m.IconTabHeader            | Navigation widgets                                     | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.m.NavContainer             | Navigation widgets                                     | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.m.TileContainer            | Navigation widgets                                     | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.m.Tree                     | Navigation widgets                                     | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.tnt.NavigationList         | Navigation widgets                                     | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.tnt.NavigationListGroup    | Navigation widgets — grouping child of NavigationList  | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.tnt.NavigationListItem     | Navigation widgets — item child of NavigationList      | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.tnt.NavigationListItemBase | Navigation widgets                                     | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.tnt.NavigationListMenuItem | Navigation widgets — **ambiguous, see Phase 0 report** | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.tnt.SideNavigation         | Navigation widgets (Navigation Drawer)                 | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |
| sap.uxap.BreadCrumbs           | Navigation widgets                                     | —                   | Matched        | [Navigation widgets](inventory/Widgets.survey.md#navigation-widgets) |

### Widgets/stepper.scope.md

| Source entry                  | Abstract concept | Other OpenUI scopes | Classification | Source row                                     |
| ----------------------------- | ---------------- | ------------------- | -------------- | ---------------------------------------------- |
| sap.m.Wizard                  | Stepper          | —                   | Matched        | [Stepper](inventory/Widgets.survey.md#stepper) |
| sap.m.WizardProgressNavigator | Stepper          | —                   | Matched        | [Stepper](inventory/Widgets.survey.md#stepper) |
| sap.m.WizardStep              | Stepper          | —                   | Matched        | [Stepper](inventory/Widgets.survey.md#stepper) |

### Widgets/table.scope.md

| Source entry                  | Abstract concept | Other OpenUI scopes | Classification | Source row                                 |
| ----------------------------- | ---------------- | ------------------- | -------------- | ------------------------------------------ |
| sap.m.Column                  | Table            | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.m.Table                   | Table            | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.m.upload.Column           | Table            | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.mdc.Table              | Table            | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.mdc.table.Column       | Table            | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.AnalyticalColumn | Table            | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.Column           | Table            | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.CreationRow      | Table            | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.HeaderSelector   | Table            | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.Row              | Table            | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.RowAction        | Table            | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.RowActionItem    | Table            | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
| sap.ui.table.Table            | Table            | —                   | Matched        | [Table](inventory/Widgets.survey.md#table) |
