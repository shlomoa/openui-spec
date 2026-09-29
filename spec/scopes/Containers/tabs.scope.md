# Tabs

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule and the ARIA tablist pattern, recorded
technology-independently.

## Identity

- id: tabs · type: Tabs · status: draft

## Purpose

A tabbed container that switches between views or content regions, including a
page stack that shows one region without a visible tab strip. A tab strip may
reference content it does not own.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.selectedIndex` — Uses — integer — the position of the selected tab, counted from zero.
- `uses.orientation` — Uses — enum(horizontal|vertical) — the direction of the tab strip.
- `produces.selectedTabChange` — Produces — emitted when another tab is selected.

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
- Tabs are ordered. The label and disabled state of one tab belong to that tab, not
  to the tabs contract.
