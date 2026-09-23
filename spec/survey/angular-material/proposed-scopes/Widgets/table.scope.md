# Table

Review copy for AM-E07, pending acceptance. See [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md). Existing identity and machine fields are preserved except changes explicitly identified in the proposal.

This leaf follows the [leaf scope template](../../../../scopes/template.scope.md). Its contract is
drawn from technology-independent tabular data presentation and the `spec/README.md`
scope rule.

## Identity

- id: table · type: table · status: draft

## Purpose

A tabular presentation of data with column definitions, row models, and optional
sorting, filtering, and pagination.

## Attributes

Categories are defined in [`../scope.md`](../../../../scopes/scope.md):

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

A sort header indicates the active ordering and requests a change through table sorting behavior. Applying that order to a local or remote data source is an integration responsibility.

Retain the existing sort behavior key and row contract. Data grid is reserved for the corresponding interactive contract; no SortHeader leaf. The existing sort action must actually arrange rows through its data owner; merely emitting a sort-state request does not fulfill it.
