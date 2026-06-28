# th

This leaf follows the [leaf scope template](../../scope.md). Its contract is drawn from the HTML `th` element, recorded technology-independently.

## Purpose

A header cell that labels a column or row of a table.

## Attributes

Grouped by the Uses / Produces / Behaves categories defined in [`../../scope.md`](../../scope.md):

- **Uses** — `[colspan]` (number of columns spanned), `[rowspan]` (number of rows spanned), `[scope]` (`col` / `row` / `colgroup` / `rowgroup`), `[headers]` (ids of associated header cells), `[abbr]` (abbreviated label).

## Child model

A `th` owns flow content: the header label.

## Accessibility

- Exposes the implicit `columnheader` or `rowheader` role, determined by `[scope]`.

## Validation notes

- `id` is a camelCase identifier and `type` is `th`.
- `[colspan]` and `[rowspan]` are positive integers; `[scope]` is one of `col`, `row`, `colgroup`, `rowgroup`.
