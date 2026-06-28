# table

This leaf follows the [leaf scope template](../../scope.md). Its contract is drawn from the HTML `table` element, recorded technology-independently.

## Purpose

The container element for tabular data, presenting rows of cells arranged in columns.

## Attributes

Grouped by the Uses / Produces / Behaves categories defined in [`../../scope.md`](../../scope.md):

- **Uses** — none. The HTML `table` element has no standard content attributes; presentation is governed by CSS.

## Child model

A `table` owns table rows:

- `tr` rows (`0..n`), optionally grouped into sections.

## Accessibility

- Exposes the implicit `table` role.
- Row and column relationships are conveyed by the `tr` / `th` / `td` structure, not by visual layout alone.

## Validation notes

- `id` is a camelCase identifier and `type` is `table`.
- `children` are `tr` rows.
