# table

This leaf follows the [leaf scope template](../../template.scope.md). Its contract
is drawn from the HTML `table` element, recorded technology-independently.

## Identity

- id: table · type: table · status: draft

## Purpose

The container element for tabular data, presenting rows of cells arranged in
columns.

## Child model

- tableRow — tr — 0..n — table rows, optionally grouped into sections.

## Accessibility

- Exposes the implicit `table` role; row and column relationships come from the
  `tr` / `th` / `td` structure, not visual layout alone.

## Validation notes

- Children are `tr` rows; presentation is governed by CSS, so the element carries
  no authored attributes.
