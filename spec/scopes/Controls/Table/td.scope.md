# td

This leaf follows the [leaf scope template](../../scope.md). Its contract is drawn from the HTML `td` element, recorded technology-independently.

## Purpose

A data cell within a table row.

## Attributes

Grouped by the Uses / Produces / Behaves categories defined in [`../../scope.md`](../../scope.md):

- **Uses** — `[colspan]` (number of columns spanned), `[rowspan]` (number of rows spanned), `[headers]` (ids of associated header cells).

## Child model

A `td` owns flow content: the cell content.

## Accessibility

- Exposes the implicit `cell` role.

## Validation notes

- `id` is a camelCase identifier and `type` is `td`.
- `[colspan]` and `[rowspan]` are positive integers; `[headers]` references `th` ids.
