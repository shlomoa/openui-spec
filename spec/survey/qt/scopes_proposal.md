# Qt Widgets survey: scopes proposal

[Survey README](README.md) · Source: [SCOPE_EXTENSION_PROPOSAL.md](inventory/SCOPE_EXTENSION_PROPOSAL.md)

Status: steps 1–14 complete as a proposal package. Paths are relative to
`spec/scopes/`. Review drafts are in [inventory/proposed-scopes/](inventory/proposed-scopes/),
and each draft was parsed successfully with the repository converter.

## New leaves

| Id  | Draft                                                                                           | Responsibility                                                            | Behavior contracts |
| --- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------ |
| P01 | [Containers/page_stack](inventory/proposed-scopes/Containers/page_stack.scope.md)               | Own alternative content and select one current region                     | B18                |
| P02 | [Containers/scroll_container](inventory/proposed-scopes/Containers/scroll_container.scope.md)   | Own content and viewport/bar presentation                                 | B21                |
| P03 | [Behaviors/text_completion](inventory/proposed-scopes/Behaviors/text_completion.scope.md)       | Assist entry on a referenced text target                                  | B14                |
| P04 | [Widgets/graphics_viewport](inventory/proposed-scopes/Widgets/graphics_viewport.scope.md)       | Present borrowed scene data                                               | B11, B28           |
| P05 | [Behaviors/modal_interaction](inventory/proposed-scopes/Behaviors/modal_interaction.scope.md)   | Restrict interaction and manage modal focus                               | B04, B06           |
| P06 | [Behaviors/viewport_scrolling](inventory/proposed-scopes/Behaviors/viewport_scrolling.scope.md) | Control viewport position, with optional kinetic motion and target reveal | B21, B22, B23      |

Existing Collapsible, Resizable and Drag and drop leaves are reused. No Swipe or Hover
leaf is proposed.

## Enhancements to existing leaves

The survey stages prose-only enhancements for 21 existing leaves: Action controls,
Text inputs, Choice controls, Range control, Date/time pickers, Picker control, Display
primitives, Status indicator, List, Table and Data grid, Navigation widgets, Menu widgets,
Tabs, Surface containers, Structural containers, Splitters, Dialog, Stepper, Feedback
widgets and Media widgets. Each change and its merge condition is in
[enhance existing leaves](inventory/SCOPE_EXTENSION_PROPOSAL.md#enhance-existing-leaves-before-splitting-more-families).
Existing identifiers and instance types are preserved.

## Overlaps with other surveys

| Qt proposal                                                   | Overlapping proposal                                   | Needed reconciliation                                                                                      |
| ------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| P05 Modal interaction                                         | Angular Material AM-P03 Modal interaction              | One leaf and one contract. Qt combines modal focus into the leaf; Angular Material splits out scroll lock. |
| P02 Scroll container, P06 Viewport scrolling                  | Angular Material AM-P04 Scrollable, AM-P05 Scroll lock | Ownership: Qt's container owns the viewport; AM-P04 references an existing viewport host.                  |
| P03 Text completion                                           | Angular Material AM-E01 (autocomplete-backed choice)   | Pending joint review; do not duplicate the type.                                                           |
| Date/time, range, progress and hierarchical-data enhancements | Angular Material AM-E02, E03, E04, E06                 | One amendment and one evidence row per canonical leaf.                                                     |

Reconciliation into one accept, defer or reject list is plan task 6.

## Evidence

One candidate evidence row per new leaf, with existing-leaf evidence kept for
enhancements: [PROPOSED_EVIDENCE.md](inventory/PROPOSED_EVIDENCE.md).
