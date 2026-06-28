# tr

This leaf follows the [leaf scope template](../../template.scope.md). Its contract
is drawn from the HTML `tr` element, recorded technology-independently.

## Identity

- id: tr · type: tr · status: draft

## Purpose

A single row of cells within a table.

## Child model

- trHeaderCell — th — 0..n — header cells in the row.
- trDataCell — td — 0..n — data cells in the row.

## Accessibility

- Exposes the implicit `row` role.

## Validation notes

- Children are `th` or `td` cells; the element carries no authored attributes.
