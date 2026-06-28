# Expandable panels

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the native HTML `details`/`summary` disclosure model and the
`spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: expandablePanels · type: details · status: draft

## Purpose

A container that expands or collapses to show or hide its content.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `(expand)` — Behaves — reveals the panel's content.
- `(collapse)` — Behaves — hides the panel's content.

## Accessibility

- Exposes its expanded or collapsed state to assistive technology.
- The toggle is operable by keyboard, and the content region is associated with
  its summary.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Only expand/collapse behavior is authorized by current evidence; default state
  and grouping require an explicit owner decision before they are added.
