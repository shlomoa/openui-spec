# Empty page

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: emptyPage · type: EmptyPage · status: draft

## Purpose

A page with no content and no routing or navigation.

## Accessibility

- Exposes enough label or status context for users to understand that the page is
  intentionally empty.
- Does not introduce navigation or routed-content expectations.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- The empty page owns no child entries. Placeholder content, empty-state widgets,
  routing, and navigation require an explicit owner decision before they are
  added as contract entries.
