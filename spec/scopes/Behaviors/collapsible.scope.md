# Collapsible

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: collapsible · type: Collapsible · status: draft

## Purpose

A behavior that lets the user collapse and expand elements within a page or view.

## Child model

The behavior applies to the scopes it can collapse or expand elements within:

- targetPage — page — 0..n — a page the behavior applies to.
- targetView — view — 0..n — a view the behavior applies to.

## Accessibility

- Exposes the expanded or collapsed state to assistive technology.
- The trigger is operable by keyboard and associated with its content region.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Only applicability is authorized by current evidence; default state and trigger
  attributes require an explicit owner decision before they are added.
