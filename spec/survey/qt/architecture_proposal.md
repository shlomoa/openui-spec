# Qt Widgets survey: architecture proposal

[Survey README](README.md) · Sources: [TAXONOMY_STRUCTURE_PROPOSAL.md](inventory/TAXONOMY_STRUCTURE_PROPOSAL.md), [BEHAVIOR_TAXONOMY_PROPOSAL.md](inventory/BEHAVIOR_TAXONOMY_PROPOSAL.md)

Status: proposal for review. The canonical taxonomy, scope tree and catalog are
unchanged.

## Recommendation

- Extend the existing [generic UI taxonomy](../../../docs/generic-ui-taxonomy.md) within
  its current nine main sections. A replacement taxonomy or a new top-level Graphics
  category is not required.
- Keep the eleven top-level scopes. Six new leaves fit under existing roots; see
  [scopes_proposal.md](scopes_proposal.md).
- Treat the taxonomy and the [scope tree](../../scopes/scope.md) as **linked views of one
  vocabulary**, not identical hierarchies. The taxonomy groups concepts by primary
  purpose and the scope tree organizes specification contracts. A new browsing group in
  the taxonomy does not by itself authorize a new scope folder, type or contract.

## Taxonomy extension

The survey proposes grouping headings (for example Command activation, Text and shortcut
entry, Temporal entry) and new terms under existing sections, plus a **Reusable
behaviors** browsing group with 8 categories and 21 subcategories. The Behaviors,
Interaction, Layout and Presentation scope boundaries stay as they are. Both are
delta trees, not replacement lists:

- [Proposed extension tree](inventory/TAXONOMY_STRUCTURE_PROPOSAL.md#proposed-extension-tree)
- [Proposed behavior hierarchy](inventory/BEHAVIOR_TAXONOMY_PROPOSAL.md#proposed-hierarchy)

## Conditional host-integration branch

If the specification later accepts desktop or host-shell integration, add an optional
**Host integration → Application presence** branch (identity icon, activation, context
actions, notification delivery) under the existing `Application` scope. Until that
decision, system-tray presence stays Deferred and must not be mapped to favicon. This is
plan question Q9, deferred to scope workstream W2.

## When a new tree would be justified

Only for host-shell integration, and only after it is accepted as a supported domain.
See [when a new tree would be justified](inventory/TAXONOMY_STRUCTURE_PROPOSAL.md#when-a-new-tree-would-be-justified).
