# Overlay containers

This leaf follows the [leaf scope template](../template.scope.md). It groups overlay
aliases from the generic UI taxonomy.

## Identity

- id: overlayContainers · type: OverlayContainers · status: draft

## Purpose

Overlay containers cover popovers and modal overlays that layer content above the
current surface without necessarily becoming a full dialog widget.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
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
