# th

This leaf follows the [leaf scope template](../../template.scope.md). Its contract
is drawn from the HTML `th` element, recorded technology-independently.

## Identity

- id: th · type: th · status: draft

## Purpose

A header cell that labels a column or row of a table.

## Attributes

Categories are defined in [`../../scope.md`](../../scope.md):

- `[colspan]` — Uses — number of columns the cell spans.
- `[rowspan]` — Uses — number of rows the cell spans.
- `[scope]` — Uses — association direction: col, row, colgroup, or rowgroup.
- `[headers]` — Uses — ids of header cells that describe this cell.
- `[abbr]` — Uses — abbreviated label used by assistive technology.

## Accessibility

- Exposes the implicit `columnheader` or `rowheader` role, determined by `[scope]`.

## Validation notes

- `[colspan]` and `[rowspan]` are positive integers; `[scope]` is one of `col`,
  `row`, `colgroup`, `rowgroup`. The cell owns flow content, not child scopes.
