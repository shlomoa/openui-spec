# Drag and drop

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: dragAndDrop · type: DragAndDrop · status: draft

## Purpose

A behavior that moves elements within a page, view, container, or widget by
dragging and dropping them.

## Attributes

- `uses.target` — Uses — reference — element reference to the page, view, container or widget whose elements the behavior moves (the [controlled element](../scope.md#controlled-element)).
- `uses.dropEffect` — Uses — enum(move|copy|link) — what a drop does with the dragged element.
- `uses.disabled` — Uses — boolean — whether dragging is turned off.
- `produces.drop` — Produces — emitted when an element is dropped on a valid place.

## Accessibility

- Provides a keyboard-operable alternative to pointer-based dragging.
- Announces drag start, valid targets, and drop outcome to assistive technology.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- The behavior acts on its target and does not own it; it declares no Child model.
