# Shell page

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: shellPage · type: ShellPage · status: draft

## Purpose

A page shell with no business-object content that connects application routing
and navigation.

## Child model

The shell page owns routing and navigation relationships, not business content:

- routing — Routing — 0..1 — the application routing relationship used by the shell page.
- navigation — Navigation — 0..1 — the user-facing navigation relationship exposed by the shell page.

## Accessibility

- Navigation supplied to the shell page is labelled so users can understand its
  destination set.
- Keyboard focus order moves through shell navigation before routed page or view
  content supplied by an implementation.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- The shell page owns no business-object content. Route outlet details, chrome
  regions, default-route attributes, and framework router bindings require an
  explicit owner decision before they are added as contract entries.
