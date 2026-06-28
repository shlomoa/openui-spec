# Lists

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the native HTML `ul`/`li` model and the `spec/README.md` scope rule,
recorded technology-independently.

## Identity

- id: lists · type: ul · status: draft

## Purpose

An ordered or unordered collection of items with optional sorting, filtering, and
pagination, following the HTML `ul`/`li` model.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `(sort)` — Behaves — orders the items by a chosen key.
- `(filter)` — Behaves — narrows the visible items by a predicate.
- `(paginate)` — Behaves — splits the items into navigable pages.

## Child model

A list owns its items, following the HTML `ul`/`li` model:

- listItem — li — 0..n — a single item in the collection.

## Accessibility

- Exposes the `list` role with each item exposing the `listitem` role.
- Items are announced in order so assistive technology conveys the collection's
  sequence.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Items follow the HTML `ul`/`li` model.
