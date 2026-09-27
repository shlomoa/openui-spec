# B8 — group and order matched records

Groups the records that matched an existing spec object (B2-B6) by spec object, in the category order and per-category row order already established in `_classification_key.md` (itself built from `taxonomy_mapping.md` and each category's own `scope.md`). This is the grouping/ordering step only — no new judgment calls, no Description/Sources cells (that's Phase C's `*.survey.md` rendering, per PLAN.md §8 B8/B10).

**Regenerated twice since B8 originally ran (426 records):** once after B9's cross-library de-duplication check (see [`B9_DEDUP.md`](B9_DEDUP.md) — 426 → 422), and again after Phase C's C1 pilot-reconciliation step (see [`C1_RECONCILIATION.md`](C1_RECONCILIATION.md) — 422 → **424**, fixing 2 more B2/B3 gaps the §6 pilot had already caught by hand). This file always reflects the current, corrected grouping; the reasoning for each correction lives in the linked documents, not here.

Each spec object below will become one table (or one subsection table, for objects that gather several taxonomy aliases) in that category's eventual `*.survey.md` file. Class lists are sorted by library then class name for determinism; `match_method` is kept per-row for B9/Phase C traceability, not for display in the final tables.

## Application (8 matched)

### Routing — 0 matched

*Resolves navigation intents/locations to application content.* No OpenUI5 class matched this object.

### Navigation — 0 matched

*User-facing structures for moving between routes/pages/views.* No OpenUI5 class matched this object.

### Tool bars — 8 matched

*Application-level command surfaces for frequent actions.*

Libraries: sap.m (4), sap.ui.mdc (2), sap.uxap (1), sap.tnt (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.AssociativeOverflowToolbar` | sap.m | extends_chain |
| `sap.m.Bar` | sap.m | class_name |
| `sap.m.OverflowToolbar` | sap.m | extends_chain |
| `sap.m.Toolbar` | sap.m | class_name |
| `sap.tnt.ToolHeader` | sap.tnt | extends_chain |
| `sap.ui.mdc.ActionToolbar` | sap.ui.mdc | extends_chain |
| `sap.ui.mdc.table.utils.FilterInfoBar` | sap.ui.mdc | extends_chain |
| `sap.uxap.AnchorBar` | sap.uxap | extends_chain |

### favicon.ico — 0 matched

*Application icon asset for browser/shell identity.* No OpenUI5 class matched this object.

### index.html — 0 matched

*Application host document / bootstrap metadata.* No OpenUI5 class matched this object.

## Behaviors (7 matched)

### Drag and drop — 7 matched

*Moves elements via drag/drop.*

Libraries: sap.ui.core (3), sap.ui.mdc (3), sap.f (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.f.dnd.GridDropInfo` | sap.f | extends_chain |
| `sap.ui.core.dnd.DragDropInfo` | sap.ui.core | extends_chain |
| `sap.ui.core.dnd.DragInfo` | sap.ui.core | extends_chain |
| `sap.ui.core.dnd.DropInfo` | sap.ui.core | extends_chain |
| `sap.ui.mdc.list.DragDropConfig` | sap.ui.mdc | extends_chain |
| `sap.ui.mdc.table.DragDropConfig` | sap.ui.mdc | extends_chain |
| `sap.ui.mdc.util.DragDropConfigBase` | sap.ui.mdc | extends_chain |

### Resizable — 0 matched

*Lets user resize elements.* No OpenUI5 class matched this object.

### Collapsible — 0 matched

*Lets user collapse/expand elements.* No OpenUI5 class matched this object.

## Containers (41 matched)

### Grid — 3 matched

*Layout container arranging children in rows/columns.*

Libraries: sap.ui.layout (2), sap.f (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.f.GridContainer` | sap.f | B6_refinement |
| `sap.ui.layout.Grid` | sap.ui.layout | class_name |
| `sap.ui.layout.cssgrid.CSSGrid` | sap.ui.layout | B5_review |

### Expandable panels — 2 matched

*Container that expands/collapses to show/hide content.*

Libraries: sap.m (1), sap.ui.mdc (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.Panel` | sap.m | class_name |
| `sap.ui.mdc.link.Panel` | sap.ui.mdc | class_name |

### Tabs — 7 matched

*Tabbed container switching between views/content regions.*

Libraries: sap.m (7)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.IconTabBar` | sap.m | class_name |
| `sap.m.IconTabBarSelectList` | sap.m | B6_refinement |
| `sap.m.IconTabFilterExpandButtonBadge` | sap.m | B6_refinement |
| `sap.m.IconTabSeparator` | sap.m | B6_refinement |
| `sap.m.TabContainer` | sap.m | class_name |
| `sap.m.TabContainerItem` | sap.m | class_name |
| `sap.m.TabStrip` | sap.m | class_name |

### Surface containers — 2 matched

*Windows, screens, views, panels, cards, toolbar surfaces as visual regions.*

Libraries: sap.m (2)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.GenericTile` | sap.m | class_name |
| `sap.m.Page` | sap.m | class_name |

### Sheet containers — 1 matched

*Sidebars, sheets, side sheets, bottom sheets.*

Libraries: sap.f (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.f.SidePanel` | sap.f | B6_refinement |

### Overlay containers — 13 matched

*Popovers and modal overlays layered above the current surface.*

Libraries: sap.m (12), sap.ui.mdc (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.ColorPalettePopover` | sap.m | B5_review |
| `sap.m.Popover` | sap.m | class_name |
| `sap.m.QuickView` | sap.m | B5_review |
| `sap.m.QuickViewBase` | sap.m | B6_refinement |
| `sap.m.QuickViewCard` | sap.m | B6_refinement |
| `sap.m.QuickViewGroup` | sap.m | B6_refinement |
| `sap.m.QuickViewGroupElement` | sap.m | B6_refinement |
| `sap.m.QuickViewPage` | sap.m | B5_review |
| `sap.m.ResponsivePopover` | sap.m | class_name |
| `sap.m.SelectionDetails` | sap.m | B5_review |
| `sap.m.SuggestionsPopover` | sap.m | B5_review |
| `sap.m._overflowToolbarHelpers.OverflowToolbarAssociativePopover` | sap.m | extends_chain |
| `sap.ui.mdc.chart.ChartSelectionDetails` | sap.ui.mdc | B5_review |

### Structural containers — 4 matched

*Panes, rails, stacks, scaffolds, regions organizing content.*

Libraries: sap.m (3), sap.ui.layout (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.FlexBox` | sap.m | class_name |
| `sap.m.HBox` | sap.m | class_name |
| `sap.m.VBox` | sap.m | class_name |
| `sap.ui.layout.VerticalLayout` | sap.ui.layout | B5_review |

### Splitters — 9 matched

*Movable dividers between panes/regions.*

Libraries: sap.ui.layout (6), sap.m (2), sap.ui.unified (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.SplitApp` | sap.m | class_name |
| `sap.m.SplitContainer` | sap.m | class_name |
| `sap.ui.layout.AssociativeSplitter` | sap.ui.layout | B6_refinement |
| `sap.ui.layout.PaneContainer` | sap.ui.layout | B6_refinement |
| `sap.ui.layout.ResponsiveSplitter` | sap.ui.layout | B6_refinement |
| `sap.ui.layout.ResponsiveSplitterPage` | sap.ui.layout | B6_refinement |
| `sap.ui.layout.SplitPane` | sap.ui.layout | B6_refinement |
| `sap.ui.layout.Splitter` | sap.ui.layout | class_name |
| `sap.ui.unified.SplitContainer` | sap.ui.unified | class_name |

## Controls (221 matched)

### Native — 95 matched

*Standard browser/framework presentation/input capability, no custom control needed.*

Libraries: sap.html (92), sap.ui.core (3)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.html.A` | sap.html | B6_refinement |
| `sap.html.Abbr` | sap.html | B6_refinement |
| `sap.html.Address` | sap.html | B6_refinement |
| `sap.html.Area` | sap.html | B6_refinement |
| `sap.html.Article` | sap.html | B6_refinement |
| `sap.html.Aside` | sap.html | B6_refinement |
| `sap.html.B` | sap.html | B6_refinement |
| `sap.html.Bdi` | sap.html | B6_refinement |
| `sap.html.Bdo` | sap.html | B6_refinement |
| `sap.html.Blockquote` | sap.html | B6_refinement |
| `sap.html.Br` | sap.html | B6_refinement |
| `sap.html.Button` | sap.html | B9_consistency_fix |
| `sap.html.Canvas` | sap.html | B9_consistency_fix |
| `sap.html.Caption` | sap.html | B6_refinement |
| `sap.html.Cite` | sap.html | B6_refinement |
| `sap.html.Code` | sap.html | B6_refinement |
| `sap.html.Col` | sap.html | B6_refinement |
| `sap.html.Colgroup` | sap.html | B6_refinement |
| `sap.html.Data` | sap.html | B6_refinement |
| `sap.html.Datalist` | sap.html | B6_refinement |
| `sap.html.Dd` | sap.html | B6_refinement |
| `sap.html.Del` | sap.html | B6_refinement |
| `sap.html.Details` | sap.html | B6_refinement |
| `sap.html.Dfn` | sap.html | B6_refinement |
| `sap.html.Div` | sap.html | B6_refinement |
| `sap.html.Dl` | sap.html | B6_refinement |
| `sap.html.Dt` | sap.html | B6_refinement |
| `sap.html.Em` | sap.html | B6_refinement |
| `sap.html.Fieldset` | sap.html | B6_refinement |
| `sap.html.Figcaption` | sap.html | B6_refinement |
| `sap.html.Figure` | sap.html | B6_refinement |
| `sap.html.Footer` | sap.html | B6_refinement |
| `sap.html.Form` | sap.html | B6_refinement |
| `sap.html.H1` | sap.html | B6_refinement |
| `sap.html.H2` | sap.html | B6_refinement |
| `sap.html.H3` | sap.html | B6_refinement |
| `sap.html.H4` | sap.html | B6_refinement |
| `sap.html.H5` | sap.html | B6_refinement |
| `sap.html.H6` | sap.html | B6_refinement |
| `sap.html.Header` | sap.html | B6_refinement |
| `sap.html.Hgroup` | sap.html | B6_refinement |
| `sap.html.Hr` | sap.html | B6_refinement |
| `sap.html.I` | sap.html | B6_refinement |
| `sap.html.Img` | sap.html | B6_refinement |
| `sap.html.Input` | sap.html | B9_consistency_fix |
| `sap.html.Ins` | sap.html | B6_refinement |
| `sap.html.Kbd` | sap.html | B6_refinement |
| `sap.html.Label` | sap.html | B9_consistency_fix |
| `sap.html.Legend` | sap.html | B6_refinement |
| `sap.html.Li` | sap.html | B6_refinement |
| `sap.html.Main` | sap.html | B6_refinement |
| `sap.html.Map` | sap.html | B9_consistency_fix |
| `sap.html.Mark` | sap.html | B6_refinement |
| `sap.html.Menu` | sap.html | B9_consistency_fix |
| `sap.html.Meter` | sap.html | B6_refinement |
| `sap.html.Nav` | sap.html | B6_refinement |
| `sap.html.Ol` | sap.html | B6_refinement |
| `sap.html.Optgroup` | sap.html | B6_refinement |
| `sap.html.Option` | sap.html | B6_refinement |
| `sap.html.Output` | sap.html | B6_refinement |
| `sap.html.P` | sap.html | B6_refinement |
| `sap.html.Pre` | sap.html | B6_refinement |
| `sap.html.Progress` | sap.html | B6_refinement |
| `sap.html.Q` | sap.html | B6_refinement |
| `sap.html.Rp` | sap.html | B6_refinement |
| `sap.html.Rt` | sap.html | B6_refinement |
| `sap.html.Ruby` | sap.html | B6_refinement |
| `sap.html.S` | sap.html | B6_refinement |
| `sap.html.Samp` | sap.html | B6_refinement |
| `sap.html.Search` | sap.html | B6_refinement |
| `sap.html.Section` | sap.html | B6_refinement |
| `sap.html.Select` | sap.html | B9_consistency_fix |
| `sap.html.Selectedcontent` | sap.html | B6_refinement |
| `sap.html.Small` | sap.html | B6_refinement |
| `sap.html.Span` | sap.html | B6_refinement |
| `sap.html.Strong` | sap.html | B6_refinement |
| `sap.html.Sub` | sap.html | B6_refinement |
| `sap.html.Summary` | sap.html | B6_refinement |
| `sap.html.Sup` | sap.html | B6_refinement |
| `sap.html.Table` | sap.html | B9_consistency_fix |
| `sap.html.Tbody` | sap.html | B6_refinement |
| `sap.html.Td` | sap.html | B6_refinement |
| `sap.html.Textarea` | sap.html | B6_refinement |
| `sap.html.Tfoot` | sap.html | B6_refinement |
| `sap.html.Th` | sap.html | B6_refinement |
| `sap.html.Thead` | sap.html | B6_refinement |
| `sap.html.Time` | sap.html | B6_refinement |
| `sap.html.Tr` | sap.html | B6_refinement |
| `sap.html.U` | sap.html | B6_refinement |
| `sap.html.Ul` | sap.html | B6_refinement |
| `sap.html.Var` | sap.html | B6_refinement |
| `sap.html.Wbr` | sap.html | B6_refinement |
| `sap.ui.core.HTML` | sap.ui.core | B6_refinement |
| `sap.ui.core.html.HTMLElement` | sap.ui.core | B6_refinement |
| `sap.ui.core.html.TextContent` | sap.ui.core | B6_refinement |

### Action controls — 61 matched

*Controls triggering commands/state transitions.*

Libraries: sap.m (36), sap.f (23), sap.ui.mdc (1), sap.uxap (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.f.gen.ui5.webcomponents.dist.Button` | sap.f | class_name |
| `sap.f.semantic.AddAction` | sap.f | extends_chain |
| `sap.f.semantic.CloseAction` | sap.f | extends_chain |
| `sap.f.semantic.CopyAction` | sap.f | extends_chain |
| `sap.f.semantic.DeleteAction` | sap.f | extends_chain |
| `sap.f.semantic.DiscussInJamAction` | sap.f | extends_chain |
| `sap.f.semantic.EditAction` | sap.f | extends_chain |
| `sap.f.semantic.ExitFullScreenAction` | sap.f | extends_chain |
| `sap.f.semantic.FavoriteAction` | sap.f | extends_chain |
| `sap.f.semantic.FlagAction` | sap.f | extends_chain |
| `sap.f.semantic.FooterMainAction` | sap.f | extends_chain |
| `sap.f.semantic.FullScreenAction` | sap.f | extends_chain |
| `sap.f.semantic.MainAction` | sap.f | extends_chain |
| `sap.f.semantic.MessagesIndicator` | sap.f | extends_chain |
| `sap.f.semantic.NegativeAction` | sap.f | extends_chain |
| `sap.f.semantic.PositiveAction` | sap.f | extends_chain |
| `sap.f.semantic.PrintAction` | sap.f | extends_chain |
| `sap.f.semantic.SemanticButton` | sap.f | class_name |
| `sap.f.semantic.SemanticToggleButton` | sap.f | class_name |
| `sap.f.semantic.SendEmailAction` | sap.f | extends_chain |
| `sap.f.semantic.SendMessageAction` | sap.f | extends_chain |
| `sap.f.semantic.ShareInJamAction` | sap.f | extends_chain |
| `sap.f.semantic.TitleMainAction` | sap.f | extends_chain |
| `sap.m.AccButton` | sap.m | extends_chain |
| `sap.m.AdditionalTextButton` | sap.m | extends_chain |
| `sap.m.Button` | sap.m | class_name |
| `sap.m.OverflowToolbarButton` | sap.m | extends_chain |
| `sap.m.OverflowToolbarMenuButton` | sap.m | class_name |
| `sap.m.OverflowToolbarToggleButton` | sap.m | extends_chain |
| `sap.m.PagingButton` | sap.m | class_name |
| `sap.m.SegmentedButton` | sap.m | class_name |
| `sap.m.SplitButton` | sap.m | class_name |
| `sap.m.ToggleButton` | sap.m | extends_chain |
| `sap.m.semantic.AddAction` | sap.m | extends_chain |
| `sap.m.semantic.CancelAction` | sap.m | extends_chain |
| `sap.m.semantic.DeleteAction` | sap.m | extends_chain |
| `sap.m.semantic.DiscussInJamAction` | sap.m | extends_chain |
| `sap.m.semantic.EditAction` | sap.m | extends_chain |
| `sap.m.semantic.FavoriteAction` | sap.m | extends_chain |
| `sap.m.semantic.FilterAction` | sap.m | extends_chain |
| `sap.m.semantic.FlagAction` | sap.m | extends_chain |
| `sap.m.semantic.ForwardAction` | sap.m | extends_chain |
| `sap.m.semantic.GroupAction` | sap.m | extends_chain |
| `sap.m.semantic.MainAction` | sap.m | extends_chain |
| `sap.m.semantic.MessagesIndicator` | sap.m | extends_chain |
| `sap.m.semantic.MultiSelectAction` | sap.m | extends_chain |
| `sap.m.semantic.NegativeAction` | sap.m | extends_chain |
| `sap.m.semantic.OpenInAction` | sap.m | extends_chain |
| `sap.m.semantic.PositiveAction` | sap.m | extends_chain |
| `sap.m.semantic.PrintAction` | sap.m | extends_chain |
| `sap.m.semantic.SaveAction` | sap.m | extends_chain |
| `sap.m.semantic.SemanticButton` | sap.m | class_name |
| `sap.m.semantic.SemanticOverflowToolbarButton` | sap.m | extends_chain |
| `sap.m.semantic.SemanticOverflowToolbarToggleButton` | sap.m | extends_chain |
| `sap.m.semantic.SemanticToggleButton` | sap.m | extends_chain |
| `sap.m.semantic.SendEmailAction` | sap.m | extends_chain |
| `sap.m.semantic.SendMessageAction` | sap.m | extends_chain |
| `sap.m.semantic.ShareInJamAction` | sap.m | extends_chain |
| `sap.m.semantic.SortAction` | sap.m | extends_chain |
| `sap.ui.mdc.chart.SelectionButton` | sap.ui.mdc | extends_chain |
| `sap.uxap.ObjectPageHeaderActionButton` | sap.uxap | extends_chain |

### Text inputs — 7 matched

*Single/multi-line, password, search text-entry controls.*

Libraries: sap.m (4), sap.f (2), sap.tnt (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.f.gen.ui5.webcomponents_fiori.dist.SearchField` | sap.f | class_name |
| `sap.f.gen.ui5.webcomponents_fiori.dist.ShellBarSearch` | sap.f | B5_review |
| `sap.m.Input` | sap.m | class_name |
| `sap.m.MaskInput` | sap.m | class_name |
| `sap.m.SearchField` | sap.m | class_name |
| `sap.m.TextArea` | sap.m | class_name |
| `sap.tnt.SideNavigationSearchField` | sap.tnt | B5_review |

### Choice controls — 20 matched

*Checkbox, radio, switch/toggle, dropdown, list box, combo box.*

Libraries: sap.m (15), sap.ui.integration (3), sap.ui.mdc (1), sap.uxap (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.ActionSelect` | sap.m | extends_chain |
| `sap.m.CheckBox` | sap.m | class_name |
| `sap.m.ComboBox` | sap.m | extends_chain |
| `sap.m.ComboBoxBase` | sap.m | class_name |
| `sap.m.ComboBoxTextField` | sap.m | class_name |
| `sap.m.MultiComboBox` | sap.m | extends_chain |
| `sap.m.RadioButton` | sap.m | B6_refinement |
| `sap.m.RadioButtonGroup` | sap.m | class_name |
| `sap.m.Select` | sap.m | class_name |
| `sap.m.SelectDialogBase` | sap.m | class_name |
| `sap.m.SelectList` | sap.m | class_name |
| `sap.m.Switch` | sap.m | class_name |
| `sap.m.semantic.FilterSelect` | sap.m | extends_chain |
| `sap.m.semantic.GroupSelect` | sap.m | extends_chain |
| `sap.m.semantic.SortSelect` | sap.m | extends_chain |
| `sap.ui.integration.cards.filters.ComboBoxFilter` | sap.ui.integration | class_name |
| `sap.ui.integration.cards.filters.SelectFilter` | sap.ui.integration | class_name |
| `sap.ui.integration.controls.ComboBox` | sap.ui.integration | class_name |
| `sap.ui.mdc.field.FieldSelect` | sap.ui.mdc | extends_chain |
| `sap.uxap.HierarchicalSelect` | sap.uxap | extends_chain |

### Picker control — 3 matched

*Wheel picker, color picker, file picker.*

Libraries: sap.ui.unified (2), sap.m (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.WheelSlider` | sap.m | B5_review |
| `sap.ui.unified.ColorPicker` | sap.ui.unified | class_name |
| `sap.ui.unified.ColorPickerPopover` | sap.ui.unified | class_name |

### Range control — 8 matched

*Slider, spin box/stepper input, rating control.*

Libraries: sap.m (8)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.RangeSlider` | sap.m | class_name |
| `sap.m.RatingIndicator` | sap.m | class_name |
| `sap.m.ResponsiveScale` | sap.m | B5_review |
| `sap.m.Slider` | sap.m | class_name |
| `sap.m.SliderTooltip` | sap.m | B5_review |
| `sap.m.SliderTooltipBase` | sap.m | B5_review |
| `sap.m.SliderTooltipContainer` | sap.m | B5_review |
| `sap.m.StepInput` | sap.m | class_name |

### Drawing and capture controls — 0 matched

*Canvas/drawing area, microphone input, biometric prompt.* No OpenUI5 class matched this object.

### Display primitives — 17 matched

*Labels, text, images, icons, avatars, separators.*

Libraries: sap.m (8), sap.f (5), sap.ui.core (3), sap.tnt (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.f.Avatar` | sap.f | class_name |
| `sap.f.AvatarGroup` | sap.f | B6_refinement |
| `sap.f.AvatarGroupItem` | sap.f | B5_review |
| `sap.f.gen.ui5.webcomponents.dist.Avatar` | sap.f | class_name |
| `sap.f.gen.ui5.webcomponents.dist.Label` | sap.f | class_name |
| `sap.m.Avatar` | sap.m | class_name |
| `sap.m.ExpandableText` | sap.m | B5_review |
| `sap.m.Image` | sap.m | class_name |
| `sap.m.Label` | sap.m | class_name |
| `sap.m.ObjectAttribute` | sap.m | B5_review |
| `sap.m.ObjectNumber` | sap.m | class_name |
| `sap.m.Text` | sap.m | class_name |
| `sap.m.Title` | sap.m | B6_refinement |
| `sap.tnt.ToolHeaderUtilitySeparator` | sap.tnt | C1_pilot_reconciliation |
| `sap.ui.core.Icon` | sap.ui.core | class_name |
| `sap.ui.core.SeparatorItem` | sap.ui.core | B6_refinement |
| `sap.ui.core.Title` | sap.ui.core | B6_refinement |

### Status indicator — 6 matched

*Status bar, tag, badge, progress bar, loader/spinner.*

Libraries: sap.m (3), sap.ui.core (1), sap.ui.integration (1), sap.tnt (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.BusyIndicator` | sap.m | class_name |
| `sap.m.ObjectStatus` | sap.m | class_name |
| `sap.m.ProgressIndicator` | sap.m | class_name |
| `sap.tnt.InfoLabel` | sap.tnt | C1_pilot_reconciliation |
| `sap.ui.core.LocalBusyIndicator` | sap.ui.core | B6_refinement |
| `sap.ui.integration.controls.ObjectStatus` | sap.ui.integration | class_name |

### Link and scroll controls — 4 matched

*Links, scrollbars as primitive controls.*

Libraries: sap.m (2), sap.ui.core (1), sap.ui.mdc (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.Link` | sap.m | class_name |
| `sap.m.ScrollBar` | sap.m | class_name |
| `sap.ui.core.ScrollBar` | sap.ui.core | class_name |
| `sap.ui.mdc.Link` | sap.ui.mdc | class_name |

## Pages (0 matched)

### Dashboard — 0 matched

*Predefined page layout for overview metrics/summary content.* No OpenUI5 class matched this object.

### Shell page — 0 matched

*Page with no content, connects routing and navigation.* No OpenUI5 class matched this object.

### Empty page — 0 matched

*Page with no content and no routing/navigation.* No OpenUI5 class matched this object.

## Views (5 matched)

### Report — 0 matched

*Read-only data view: filter, sort, group, paginate.* No OpenUI5 class matched this object.

### Form — 5 matched

*Read-write data view: validate, submit, dirty-state.*

Libraries: sap.ui.layout (5)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.ui.layout.form.Form` | sap.ui.layout | B6_refinement |
| `sap.ui.layout.form.FormContainer` | sap.ui.layout | B6_refinement |
| `sap.ui.layout.form.FormElement` | sap.ui.layout | B6_refinement |
| `sap.ui.layout.form.SemanticFormElement` | sap.ui.layout | B6_refinement |
| `sap.ui.layout.form.SimpleForm` | sap.ui.layout | B6_refinement |

## Widgets (142 matched)

### Chart — 1 matched

*Visual data representation.*

Libraries: sap.ui.mdc (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.ui.mdc.Chart` | sap.ui.mdc | B6_refinement |

### Table — 13 matched

*Tabular data presentation.*

Libraries: sap.ui.table (8), sap.m (3), sap.ui.mdc (2)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.Column` | sap.m | class_name |
| `sap.m.Table` | sap.m | class_name |
| `sap.m.upload.Column` | sap.m | class_name |
| `sap.ui.mdc.Table` | sap.ui.mdc | class_name |
| `sap.ui.mdc.table.Column` | sap.ui.mdc | class_name |
| `sap.ui.table.AnalyticalColumn` | sap.ui.table | B6_refinement |
| `sap.ui.table.Column` | sap.ui.table | class_name |
| `sap.ui.table.CreationRow` | sap.ui.table | B6_refinement |
| `sap.ui.table.HeaderSelector` | sap.ui.table | B6_refinement |
| `sap.ui.table.Row` | sap.ui.table | B6_refinement |
| `sap.ui.table.RowAction` | sap.ui.table | B6_refinement |
| `sap.ui.table.RowActionItem` | sap.ui.table | B6_refinement |
| `sap.ui.table.Table` | sap.ui.table | class_name |

### Data grid — 2 matched

*Interactive tabular-data widget.*

Libraries: sap.ui.table (2)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.ui.table.AnalyticalTable` | sap.ui.table | extends_chain |
| `sap.ui.table.TreeTable` | sap.ui.table | extends_chain |

### List — 47 matched

*Ordered/unordered item collection.*

Libraries: sap.m (40), sap.f (3), sap.ui.mdc (2), sap.ui.core (1), sap.ui.integration (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.f.GridList` | sap.f | B6_refinement |
| `sap.f.GridListItem` | sap.f | extends_chain |
| `sap.f.gen.ui5.webcomponents.dist.ListItem` | sap.f | class_name |
| `sap.m.ActionListItem` | sap.m | extends_chain |
| `sap.m.ColumnListItem` | sap.m | extends_chain |
| `sap.m.CustomListItem` | sap.m | extends_chain |
| `sap.m.CustomTreeItem` | sap.m | extends_chain |
| `sap.m.DisplayListItem` | sap.m | extends_chain |
| `sap.m.FacetFilterItem` | sap.m | extends_chain |
| `sap.m.FeedListItem` | sap.m | extends_chain |
| `sap.m.GroupHeaderListItem` | sap.m | extends_chain |
| `sap.m.GrowingList` | sap.m | class_name |
| `sap.m.IconTabFilter` | sap.m | extends_chain |
| `sap.m.InputListItem` | sap.m | extends_chain |
| `sap.m.List` | sap.m | class_name |
| `sap.m.MenuListItem` | sap.m | extends_chain |
| `sap.m.MessageItem` | sap.m | extends_chain |
| `sap.m.MessageListItem` | sap.m | extends_chain |
| `sap.m.MessagePopoverItem` | sap.m | extends_chain |
| `sap.m.ObjectListItem` | sap.m | extends_chain |
| `sap.m.P13nAnyFilterItem` | sap.m | extends_chain |
| `sap.m.P13nColumnsItem` | sap.m | extends_chain |
| `sap.m.P13nDimMeasureItem` | sap.m | extends_chain |
| `sap.m.P13nFilterItem` | sap.m | extends_chain |
| `sap.m.P13nGroupItem` | sap.m | extends_chain |
| `sap.m.P13nSelectionItem` | sap.m | extends_chain |
| `sap.m.P13nSortItem` | sap.m | extends_chain |
| `sap.m.SegmentedButtonItem` | sap.m | extends_chain |
| `sap.m.SelectionDetailsListItem` | sap.m | extends_chain |
| `sap.m.StandardListItem` | sap.m | extends_chain |
| `sap.m.StandardTreeItem` | sap.m | extends_chain |
| `sap.m.SuggestionItem` | sap.m | extends_chain |
| `sap.m.TabStripItem` | sap.m | extends_chain |
| `sap.m.TreeItemBase` | sap.m | extends_chain |
| `sap.m.VariantItem` | sap.m | extends_chain |
| `sap.m.ViewSettingsCustomItem` | sap.m | extends_chain |
| `sap.m.ViewSettingsCustomTab` | sap.m | extends_chain |
| `sap.m.ViewSettingsFilterItem` | sap.m | extends_chain |
| `sap.m.ViewSettingsItem` | sap.m | extends_chain |
| `sap.m.VisibleItem` | sap.m | extends_chain |
| `sap.m.table.columnmenu.ActionItem` | sap.m | extends_chain |
| `sap.m.table.columnmenu.Item` | sap.m | extends_chain |
| `sap.m.table.columnmenu.ItemContainer` | sap.m | extends_chain |
| `sap.ui.core.ListItem` | sap.ui.core | class_name |
| `sap.ui.integration.controls.ListContentItem` | sap.ui.integration | extends_chain |
| `sap.ui.mdc.List` | sap.ui.mdc | class_name |
| `sap.ui.mdc.filterbar.p13n.FilterColumnLayout` | sap.ui.mdc | extends_chain |

### Feedback widgets — 12 matched

*Tooltip, alert, toast/snackbar, notification, narration.*

Libraries: sap.ui.core (5), sap.m (4), sap.f (3)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.f.gen.ui5.webcomponents_fiori.dist.NotificationList` | sap.f | B5_review |
| `sap.f.gen.ui5.webcomponents_fiori.dist.NotificationListGroupItem` | sap.f | B5_review |
| `sap.f.gen.ui5.webcomponents_fiori.dist.NotificationListItem` | sap.f | B5_review |
| `sap.m.MessagePopover` | sap.m | class_name |
| `sap.m.MessageStrip` | sap.m | class_name |
| `sap.m.MessageView` | sap.m | class_name |
| `sap.m.p13n.MessageStrip` | sap.m | class_name |
| `sap.ui.core.TooltipBase` | sap.ui.core | B5_review |
| `sap.ui.core.tooltip.Tooltip` | sap.ui.core | B5_review |
| `sap.ui.core.tooltip.TooltipEnablement` | sap.ui.core | B5_review |
| `sap.ui.core.tooltip.TooltipEventTrigger` | sap.ui.core | B5_review |
| `sap.ui.core.tooltip.TooltipFocusGuard` | sap.ui.core | B5_review |

### Media widgets — 2 matched

*Media player, camera preview, map.*

Libraries: sap.m (1), sap.ui.mdc (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.ImageContent` | sap.m | class_name |
| `sap.ui.mdc.Geomap` | sap.ui.mdc | B6_refinement |

### Navigation widgets — 13 matched

*Nav drawer/rail, hamburger menu, breadcrumb, tree, pagination, carousel.*

Libraries: sap.m (6), sap.tnt (6), sap.uxap (1)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.Breadcrumbs` | sap.m | class_name |
| `sap.m.Carousel` | sap.m | class_name |
| `sap.m.IconTabHeader` | sap.m | class_name |
| `sap.m.NavContainer` | sap.m | class_name |
| `sap.m.TileContainer` | sap.m | B5_review |
| `sap.m.Tree` | sap.m | class_name |
| `sap.tnt.NavigationList` | sap.tnt | B6_refinement |
| `sap.tnt.NavigationListGroup` | sap.tnt | B6_refinement |
| `sap.tnt.NavigationListItem` | sap.tnt | B6_refinement |
| `sap.tnt.NavigationListItemBase` | sap.tnt | B6_refinement |
| `sap.tnt.NavigationListMenuItem` | sap.tnt | B6_refinement |
| `sap.tnt.SideNavigation` | sap.tnt | B6_refinement |
| `sap.uxap.BreadCrumbs` | sap.uxap | B6_refinement |

### Menu widgets — 15 matched

*Menu, dropdown menu, context menu.*

Libraries: sap.m (6), sap.ui.unified (5), sap.f (2), sap.ui.table (2)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.f.gen.ui5.webcomponents.dist.Menu` | sap.f | class_name |
| `sap.f.gen.ui5.webcomponents.dist.MenuItem` | sap.f | class_name |
| `sap.m.Menu` | sap.m | class_name |
| `sap.m.MenuButton` | sap.m | B6_refinement |
| `sap.m.MenuItem` | sap.m | class_name |
| `sap.m.MenuItemGroup` | sap.m | B6_refinement |
| `sap.m.MenuWrapper` | sap.m | B6_refinement |
| `sap.m.table.columnmenu.Menu` | sap.m | extends_chain |
| `sap.ui.table.AnalyticalColumnMenu` | sap.ui.table | extends_chain |
| `sap.ui.table.ColumnMenu` | sap.ui.table | extends_chain |
| `sap.ui.unified.Menu` | sap.ui.unified | class_name |
| `sap.ui.unified.MenuItem` | sap.ui.unified | extends_chain |
| `sap.ui.unified.MenuItemBase` | sap.ui.unified | B6_refinement |
| `sap.ui.unified.MenuItemGroup` | sap.ui.unified | B6_refinement |
| `sap.ui.unified.MenuTextFieldItem` | sap.ui.unified | extends_chain |

### Date/Time pickers — 29 matched

*Calendar-based date/time/date-range selection.*

Libraries: sap.ui.unified (17), sap.m (12)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.DateHighZoomInputs` | sap.m | B5_review |
| `sap.m.DatePicker` | sap.m | extends_chain |
| `sap.m.DateRangeSelection` | sap.m | extends_chain |
| `sap.m.DateTimeField` | sap.m | B5_review |
| `sap.m.DateTimePicker` | sap.m | extends_chain |
| `sap.m.TimePicker` | sap.m | extends_chain |
| `sap.m.TimePickerClock` | sap.m | B6_refinement |
| `sap.m.TimePickerClocks` | sap.m | B6_refinement |
| `sap.m.TimePickerInputs` | sap.m | B6_refinement |
| `sap.m.TimePickerInternals` | sap.m | B6_refinement |
| `sap.m.TimePickerSlider` | sap.m | B6_refinement |
| `sap.m.TimePickerSliders` | sap.m | B6_refinement |
| `sap.ui.unified.Calendar` | sap.ui.unified | class_name |
| `sap.ui.unified.CalendarLegend` | sap.ui.unified | B5_review |
| `sap.ui.unified.CalendarMonthInterval` | sap.ui.unified | B5_review |
| `sap.ui.unified.CalendarTimeInterval` | sap.ui.unified | B5_review |
| `sap.ui.unified.DateTypeRange` | sap.ui.unified | B5_review |
| `sap.ui.unified.calendar.CalendarDate` | sap.ui.unified | B5_review |
| `sap.ui.unified.calendar.DatesRow` | sap.ui.unified | B5_review |
| `sap.ui.unified.calendar.Header` | sap.ui.unified | B5_review |
| `sap.ui.unified.calendar.IndexPicker` | sap.ui.unified | B5_review |
| `sap.ui.unified.calendar.Month` | sap.ui.unified | B5_review |
| `sap.ui.unified.calendar.MonthPicker` | sap.ui.unified | B5_review |
| `sap.ui.unified.calendar.MonthsRow` | sap.ui.unified | B5_review |
| `sap.ui.unified.calendar.OneMonthDatesRow` | sap.ui.unified | B5_review |
| `sap.ui.unified.calendar.TimesRow` | sap.ui.unified | B5_review |
| `sap.ui.unified.calendar.WeeksRow` | sap.ui.unified | B5_review |
| `sap.ui.unified.calendar.YearPicker` | sap.ui.unified | B5_review |
| `sap.ui.unified.calendar.YearRangePicker` | sap.ui.unified | B5_review |

### Stepper — 3 matched

*Guides user through an ordered multi-step process.*

Libraries: sap.m (3)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.Wizard` | sap.m | class_name |
| `sap.m.WizardProgressNavigator` | sap.m | B5_review |
| `sap.m.WizardStep` | sap.m | class_name |

### Dialog — 5 matched

*Modal/non-modal surface with title, content, actions.*

Libraries: sap.m (5)


| UI5 class | Library | Match method |
|---|---|---|
| `sap.m.Dialog` | sap.m | class_name |
| `sap.m.P13nDialog` | sap.m | extends_chain |
| `sap.m.TableSelectDialog` | sap.m | class_name |
| `sap.m.ViewSettingsDialog` | sap.m | class_name |
| `sap.m.upload.FilePreviewDialog` | sap.m | B5_review |

## Total

424 of 424 matched records placed (should equal 424).
