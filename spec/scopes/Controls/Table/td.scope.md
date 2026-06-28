# td

This leaf follows the [leaf scope template](../../template.scope.md). Its contract
is drawn from the HTML `td` element, recorded technology-independently.

## Identity

- id: td · type: td · status: draft

## Purpose

A data cell within a table row.

## Attributes

Categories are defined in [`../../scope.md`](../../scope.md):

- `[colspan]` — Uses — number of columns the cell spans.
- `[rowspan]` — Uses — number of rows the cell spans.
- `[headers]` — Uses — ids of header cells that describe this cell.

## Accessibility

- Exposes the implicit `cell` role.

## Validation notes

- `[colspan]` and `[rowspan]` are positive integers; `[headers]` references `th`
  ids. The cell owns flow content, not child scopes.
