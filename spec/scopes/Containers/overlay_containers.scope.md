# Overlay containers

This leaf follows the [leaf scope template](../template.scope.md). It groups overlay
aliases from the generic UI taxonomy.

## Identity

- id: overlayContainers · type: OverlayContainers · status: draft

## Purpose

Overlay containers cover popovers that layer content above the current surface
without necessarily becoming a full dialog widget. Modality comes from the Modal
overlay behavior, scroll locking from Viewport and focus control, and the
backdrop from Presentation.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.open` — Uses — boolean — whether the overlay is shown.
- `uses.anchor` — Uses — reference — the element the overlay is positioned against.
- `uses.placement` — Uses — enum(top|bottom|start|end|auto) — where the overlay appears relative to its anchor.
- `produces.close` — Produces — emitted when the overlay closes.

## Accessibility

Overlay containers expose focus containment, labelling, dismissal, and background
interaction rules according to whether the overlay is modal or non-modal.

## Validation notes

- Use the Dialog widget when the overlay has dialog semantics with title, content,
  and actions.
