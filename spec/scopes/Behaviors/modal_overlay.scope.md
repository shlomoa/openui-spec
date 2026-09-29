# Modal overlay

This leaf follows the [leaf scope template](../template.scope.md). It was created by
the project owner's decision on plan task W1 9.5 and holds the modal behavior that
surfaces such as Dialog, sheets and overlays use.

## Identity

- id: modalOverlay · type: ModalOverlay · status: draft

## Purpose

A behavior that makes a referenced surface modal: while it is active, interaction
outside that surface is blocked until its task is completed or dismissed, and focus
stays inside the surface. Modal interaction is another name for it. The dimming layer
behind the surface is appearance (Backdrop, in Presentation), and background scroll
locking is Viewport and focus control.

## Attributes

- `uses.target` — Uses — reference — element reference to the surface the behavior makes modal (the [controlled element](../scope.md#controlled-element)).
- `uses.initialFocus` — Uses — reference — element reference to the element inside the surface that receives focus first.
- `uses.restoreFocus` — Uses — boolean — whether focus returns to the previously focused element when the behavior ends.
- `uses.dismissOnEscape` — Uses — boolean — whether the Escape key requests dismissal.
- `produces.dismissRequest` — Produces — emitted when the user asks to dismiss the surface; the target decides whether it closes.

## Accessibility

- While active, focus stays within the modal surface and background content is not
  available for interaction.
- The surface has an accessible name and a keyboard route to complete or dismiss it.
- When the behavior ends, focus returns to a meaningful element, such as the one
  that opened the surface.
- A backdrop or an ARIA property alone does not make a surface modal.

## Validation notes

- The behavior acts on its target and does not own it; it declares no Child model.
- The target decides whether a dismissal request closes it; the behavior does not keep
  its own open state.
