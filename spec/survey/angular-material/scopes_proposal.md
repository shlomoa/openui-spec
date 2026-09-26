# Angular Material survey: scopes proposal

[Survey README](README.md) · Source: [SCOPE_EXTENSION_PROPOSAL.md](inventory/SCOPE_EXTENSION_PROPOSAL.md)

Status: review proposal only; no approval is recorded. Paths are relative to
`spec/scopes/`. All 18 leaf review copies are in
[inventory/proposed-scopes/](inventory/proposed-scopes/).

## New leaves

| Id     | Draft                                                                                         | Responsibility                                                                          |
| ------ | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| AM-P01 | [Containers/form_field](inventory/proposed-scopes/Containers/form_field.scope.md)             | Relationship between a value control, its label and supporting feedback                 |
| AM-P02 | [Widgets/token_collection](inventory/proposed-scopes/Widgets/token_collection.scope.md)       | Coordinated token entry, removal and collection interaction                             |
| AM-P03 | [Behaviors/modal_interaction](inventory/proposed-scopes/Behaviors/modal_interaction.scope.md) | Reusable modal policy; the host owns lifecycle, the behavior reports dismissal requests |
| AM-P04 | [Behaviors/scrollable](inventory/proposed-scopes/Behaviors/scrollable.scope.md)               | Scroll an existing constrained region without owning its content                        |
| AM-P05 | [Behaviors/scroll_lock](inventory/proposed-scopes/Behaviors/scroll_lock.scope.md)             | Suspend background page scrolling                                                       |

AM-P01 and AM-P02 deliberately declare no attributes or children yet. AM-P03–P05 are not
merge-ready until decisions D01–D04 are made; see
[openui_schema_proposal.md](openui_schema_proposal.md).

## Amendments to existing leaves

| Id     | Leaf                                                                                   | Change                                                               |
| ------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| AM-E01 | [Choice controls](inventory/proposed-scopes/Controls/choice_controls.scope.md)         | Autocomplete-backed choice and retained toggle groups                |
| AM-E02 | [Range control](inventory/proposed-scopes/Controls/range_control.scope.md)             | Single-value and two-thumb interval variants                         |
| AM-E03 | [Date/time pickers](inventory/proposed-scopes/Widgets/date_time_pickers.scope.md)      | Not every temporal picker needs a calendar                           |
| AM-E04 | [Navigation widgets](inventory/proposed-scopes/Widgets/navigation_widgets.scope.md)    | Hierarchical data and paging without route navigation                |
| AM-E05 | [Sheet containers](inventory/proposed-scopes/Containers/sheet_containers.scope.md)     | Separate edge placement, navigation content and modality             |
| AM-E06 | [Status indicator](inventory/proposed-scopes/Controls/status_indicator.scope.md)       | Attached status versus determinate and indeterminate progress        |
| AM-E07 | [Table](inventory/proposed-scopes/Widgets/table.scope.md)                              | Sort state and sort-header affordances                               |
| AM-E08 | [Surface containers](inventory/proposed-scopes/Containers/surface_containers.scope.md) | Card composition and reusable toolbar surfaces                       |
| AM-E09 | [List](inventory/proposed-scopes/Widgets/list.scope.md)                                | Display, selection and link-list variants                            |
| AM-E10 | [Collapsible](inventory/proposed-scopes/Behaviors/collapsible.scope.md)                | Container and widget applicability                                   |
| AM-E11 | [Dialog](inventory/proposed-scopes/Widgets/dialog.scope.md)                            | Explicit modal focus and host-authorized dismissal                   |
| AM-E12 | [Overlay containers](inventory/proposed-scopes/Containers/overlay_containers.scope.md) | Separate attachment, clipping, modality, scroll locking and backdrop |
| AM-E13 | [Expandable panels](inventory/proposed-scopes/Containers/expandable_panels.scope.md)   | Expanded state and actions on one host                               |

The Behaviors parent index is updated in the
[Behaviors review copy](inventory/proposed-scopes/Behaviors/scope.md).

## New taxonomy entries on acceptance

Form-field wrapper, Token collection, Editable chip collection, Suggestion-backed combo
box, Range slider, Workflow stepper, Modal interaction, Scrollable and Scroll lock. See
[candidate canonical mapping additions](inventory/SCOPE_EXTENSION_PROPOSAL.md#candidate-canonical-mapping-additions).

## Overlaps with other surveys

The survey's own [cross-survey reconciliation](inventory/SCOPE_EXTENSION_PROPOSAL.md#cross-survey-reconciliation)
records these overlaps:

- AM-E02, E03, E04 and E06 overlap the Qt temporal, range, progress and
  hierarchical-data enhancements.
- AM-P03, P04 and P05 overlap Qt P05 Modal interaction, P02 Scroll container and P06
  Viewport scrolling.
- AM-E01 overlaps Qt P03 Text completion.
- AM-E08 must be reconciled with the OpenUI5 Cards subcategory proposal.

Reconciliation into one accept, defer or reject list is plan task 6.
