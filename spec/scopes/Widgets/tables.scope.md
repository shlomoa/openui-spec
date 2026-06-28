# Tables

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the native HTML `table` model and the `spec/README.md` scope rule,
recorded technology-independently.

## Identity

- id: tables · type: table · status: draft

## Purpose

A tabular presentation of data with optional sorting, filtering, and pagination,
following the HTML `table` row-and-cell model.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `(sort)` — Behaves — orders rows by a chosen column.
- `(filter)` — Behaves — narrows the visible rows by a predicate.
- `(paginate)` — Behaves — splits rows into navigable pages.

## Child model

A table owns its rows, following the HTML `table` model:

- tableRow — tr — 0..n — a row of cells (`th` / `td`), per the Table family.

## Accessibility

- Exposes the `table` role with rows and cells exposing `row` and `cell` roles.
- Header cells label their column or row so assistive technology can associate
  data cells with their headers.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Rows follow the HTML `table` row-and-cell model defined by the Table family.
