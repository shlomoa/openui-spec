# Resizable

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: resizable · type: Resizable · status: draft

## Purpose

A behavior that lets the user change the size of an element within a page or view.

## Attributes

- `uses.target` — Uses — reference — element reference to the element the behavior resizes (the [controlled element](../scope.md#controlled-element)).

## Accessibility

- Provides a keyboard-operable alternative to pointer-based resizing.
- Announces the resulting size to assistive technology after a resize.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- The behavior acts on its target and does not own it; it declares no Child model.
- Only the target reference is authorized by current evidence; resize handle, min/max,
  and default-size attributes require an explicit owner decision before they are
  added.
