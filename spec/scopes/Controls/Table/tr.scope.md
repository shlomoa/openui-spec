# tr

This leaf follows the [leaf scope template](../../scope.md). Its contract is drawn from the HTML `tr` element, recorded technology-independently.

## Purpose

A single row of cells within a table.

## Attributes

Grouped by the Uses / Produces / Behaves categories defined in [`../../scope.md`](../../scope.md):

- **Uses** — none. The HTML `tr` element has no standard content attributes; presentation is governed by CSS.

## Child model

A `tr` owns cells:

- `th` header cells and `td` data cells (`0..n`), in document order.

## Accessibility

- Exposes the implicit `row` role.

## Validation notes

- `id` is a camelCase identifier and `type` is `tr`.
- `children` are `th` or `td` cells.
