# Tabs

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule and the ARIA tablist pattern, recorded
technology-independently.

## Identity

- id: tabs · type: Tabs · status: draft

## Purpose

A tabbed container that switches between views or content regions.

## Child model

A tabs container owns its ordered tabs:

- tab — tab — 1..n — a tab exposing a view or content region.

## Accessibility

- Exposes the `tablist` role with each tab exposing the `tab` role and its
  associated panel the `tabpanel` role.
- Tab selection is operable by keyboard, with focus following the active tab.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Tabs are ordered; selected and disabled state require an explicit owner decision
  before they are added as attributes.
