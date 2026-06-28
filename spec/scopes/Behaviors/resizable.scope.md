# Resizable

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: resizable · type: Resizable · status: draft

## Purpose

A behavior that lets the user change the size of an element within a page or view.

## Child model

The behavior applies to the scopes it can resize elements within:

- targetPage — page — 0..n — a page the behavior applies to.
- targetView — view — 0..n — a view the behavior applies to.

## Accessibility

- Provides a keyboard-operable alternative to pointer-based resizing.
- Announces the resulting size to assistive technology after a resize.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Only applicability is authorized by current evidence; resize handle, min/max,
  and default-size attributes require an explicit owner decision before they are
  added.
