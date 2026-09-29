# Expandable panels

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the native HTML `details`/`summary` disclosure model and the
`spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: expandablePanels · type: details · status: draft

## Purpose

A container, such as an accordion or a disclosure, that expands or collapses to
show or hide its content while its summary stays visible.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.expanded` — Uses — boolean — whether the content is shown.
- `behaves.expand` — Behaves — reveals the panel's content.
- `behaves.collapse` — Behaves — hides the panel's content.
- `produces.expandedChange` — Produces — emitted when the panel expands or collapses.

## Child model

- summary — summary — 1 — the summary or header that stays visible and toggles the panel.
- content — section — 0..1 — the content the panel shows or hides.

## Accessibility

- Exposes its expanded or collapsed state to assistive technology.
- The toggle is operable by keyboard, and the content region is associated with
  its summary.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- The summary comes first. Whether one panel of an accordion closes when another
  opens needs an explicit owner decision before it gets an attribute.
