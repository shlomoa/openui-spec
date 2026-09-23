# Expandable panels

Review copy for AM-E13, pending acceptance. See [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md). Existing identity and machine fields are preserved except changes explicitly identified in the proposal.

This leaf follows the [leaf scope template](../../../../scopes/template.scope.md). Its contract is
drawn from the native HTML `details`/`summary` disclosure model and the
`spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: expandablePanels · type: details · status: draft

## Purpose

A container that expands or collapses to show or hide its content.

## Attributes

Categories are defined in [`../scope.md`](../../../../scopes/scope.md):

- `(expand)` — Behaves — reveals the panel's content.
- `(collapse)` — Behaves — hides the panel's content.

## Accessibility

- Exposes its expanded or collapsed state to assistive technology.
- The toggle is operable by keyboard, and the content region is associated with
  its summary.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Only expand/collapse behavior is authorized by current evidence; default state
  and grouping require an explicit owner decision before they are added.

The panel remains the owner of its expanded state. Existing expand/collapse actions delegate to that owner; an attached Collapsible capability must not maintain a second expanded value or emit duplicate transition notifications. The proposed broader Collapsible applicability allows this container use. Group exclusivity, disabled user activation versus programmatic changes, and lazy content creation remain separately selected policies.
