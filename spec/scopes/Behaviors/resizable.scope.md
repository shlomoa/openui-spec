# Resizable

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: resizable · type: Resizable · status: draft

## Purpose

A behavior that lets the user change the size of an element within a page or view.

## Attributes

- `uses.target` — Uses — reference — element reference to the element the behavior resizes (the [controlled element](../scope.md#controlled-element)).
- `uses.axis` — Uses — enum(horizontal|vertical|both) — the directions in which the target can be resized.
- `produces.resize` — Produces — emitted when the size of the target changes.

## Accessibility

- Provides a keyboard-operable alternative to pointer-based resizing.
- Announces the resulting size to assistive technology after a resize.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- The behavior acts on its target and does not own it; it declares no Child model.
- Size limits and default size belong to the target, not to this behavior.
