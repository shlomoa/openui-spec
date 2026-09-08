# Table

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from technology-independent tabular data presentation and the `spec/README.md`
scope rule.

## Identity

- id: table · type: table · status: draft

## Purpose

A tabular presentation of data with column definitions, row models, and optional
sorting, filtering, and pagination.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `(sort)` — Behaves — orders rows by a chosen column.
- `(filter)` — Behaves — narrows the visible rows by a predicate.
- `(paginate)` — Behaves — splits rows into navigable pages.

## Child model

A table defines its structural rows and column specifications:

- tableRow — tr — 0..n — a row of data or header cells.

## Accessibility

- Exposes the `table` role with rows and cells exposing `row` and `cell` roles.
- Header cells label their column or row so assistive technology can associate
  data cells with their headers.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Column definitions, row models, and tabular behaviors (sorting, filtering, pagination)
  are attributes and facets of the Table concept.
