# Overlay containers

Review copy for AM-E12, pending acceptance. See [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md). Existing identity and machine fields are preserved except changes explicitly identified in the proposal.

This leaf follows the [leaf scope template](../../../../scopes/template.scope.md). It groups overlay
aliases from the generic UI taxonomy.

## Identity

- id: overlayContainers · type: OverlayContainers · status: draft

## Purpose

Overlay containers cover popovers and modal overlays that layer content above the
current surface without necessarily becoming a full dialog widget.

## Attributes

Categories are defined in [`../scope.md`](../../../../scopes/scope.md). This family inherits concrete
open state, anchor, modality, backdrop, and dismissal attributes from the selected
overlay implementation.

## Child model

Overlay containers do not define a fixed child model at this abstraction level.

## Accessibility

Overlay containers expose focus containment, labelling, dismissal, and background
interaction rules according to whether the overlay is modal or non-modal.

## Validation notes

- Use the Dialog widget when the overlay has dialog semantics with title, content,
  and actions.

Anchored repositioning, clipping response and scroll strategy are separate host policies. A backdrop does not by itself establish modal isolation, and an ARIA flag is not an implementation switch for all modal behavior. Explicitly modal hosts may compose Modal interaction; page scroll locking is separately requested. Menus, tooltips and option popups must retain their own focus/activation semantics instead of acquiring a modal trap by default.
