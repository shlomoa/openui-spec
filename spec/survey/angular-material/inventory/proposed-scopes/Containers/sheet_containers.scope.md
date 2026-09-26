# Sheet containers

Review copy for AM-E05, pending acceptance. See [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md). Existing identity and machine fields are preserved except changes explicitly identified in the proposal.

This leaf follows the [leaf scope template](../../../../../scopes/template.scope.md). It groups sheet and
side-surface aliases from the generic UI taxonomy.

## Identity

- id: sheetContainers · type: SheetContainers · status: draft

## Purpose

Sheet containers cover sidebars, sheets, side sheets, and bottom sheets that reveal
supplemental content from an edge or layered surface.

## Attributes

Categories are defined in [`../scope.md`](../../../../../scopes/scope.md). This family inherits concrete
open state, side, modality, breakpoint, and dismissal attributes from the selected
sheet implementation.

## Child model

Sheet containers do not define a fixed child model at this abstraction level.

## Accessibility

Sheet containers expose labels, focus behavior, modality, and dismissal semantics
consistent with their persistence and relationship to surrounding content.

## Validation notes

- Use Dialog for modal dialog semantics; use this family for edge-attached sheet
  surfaces.

A side or bottom sheet may contain arbitrary content. Navigation depends on that content. Explicitly modal sheets may compose Modal interaction; edge placement or a backdrop alone does not prove modal obligations are met.

Use Dialog only when dialog semantics are appropriate; do not require every modal sheet to become a Dialog object. Host open state, modal policy, page scroll locking and internal scrolling have separate owners.
