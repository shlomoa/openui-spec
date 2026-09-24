# Shell page

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: shellPage · type: ShellPage · status: draft

## Purpose

A page shell with no business-object content that presents application routing
and navigation.

## Child model

The shell page may place the application's single routing and navigation models;
it does not define competing route or navigation facts:

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
- The shell page owns no business-object content. Routing and navigation use the
  Application ownership and placement rules; route outlet details, chrome regions,
  and framework router bindings remain implementation details.
