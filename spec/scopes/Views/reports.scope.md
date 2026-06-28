# Reports

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: reports · type: Reports · status: draft

## Purpose

A read-only data view that lets the user filter, sort, group, and page through
business data.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `(filter)` — Behaves — narrows the visible data by a predicate.
- `(sort)` — Behaves — orders the data by a chosen key.
- `(group)` — Behaves — groups the data by a chosen key.
- `(paginate)` — Behaves — splits the data into navigable pages.

## Accessibility

- Presents data in a read-only form and announces the active filter, sort, and
  grouping to assistive technology.
- Pagination controls are operable by keyboard with clear position information.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- The view is read-only; presentation primitives (table, grid, chart) require an
  explicit owner decision before they are added as a child model.
