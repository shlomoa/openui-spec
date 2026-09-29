# Grid

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: grid · type: Grid · status: draft

## Purpose

A layout container that arranges its child content in rows and columns.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.columns` — Uses — integer — the number of columns.
- `uses.rowGap` — Uses — string — the space between rows, as a CSS length.
- `uses.columnGap` — Uses — string — the space between columns, as a CSS length.

## Child model

A grid owns the items it arranges in rows and columns:

- gridItem — section — 0..n — a child region placed in the grid.

## Accessibility

- Exposes a presentational layout role and does not alter the semantics of the
  content it arranges.
- Reading order follows the arranged children so assistive technology conveys the
  intended sequence.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Children are arranged in rows and columns. The row and column span of an item
  belongs to the item, not to the grid contract.
