# Collapsible

Review copy for AM-E10, pending acceptance. See [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md). Existing identity and machine fields are preserved except changes explicitly identified in the proposal.

This leaf follows the [leaf scope template](../../../../../scopes/template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: collapsible · type: Collapsible · status: draft

## Purpose

A behavior that lets the user collapse and expand elements within a page, view, container, or widget.

## Child model

The behavior applies to the scopes it can collapse or expand elements within:

- targetPage — page — 0..n — a page the behavior applies to.
- targetView — view — 0..n — a view the behavior applies to.
- targetContainer — container — 0..n — a container the behavior applies to.
- targetWidget — widget — 0..n — a widget the behavior applies to.

## Accessibility

- Exposes the expanded or collapsed state to assistive technology.
- The trigger is operable by keyboard and associated with its content region.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Only applicability is authorized by current evidence; default state and trigger
  attributes require an explicit owner decision before they are added.

AM-E10 adds applicability only, following the existing behavior target-entry convention. The host remains the single owner of expanded state; trigger actions delegate to it. Group exclusivity, recursive tree traversal and lazy rendering are independent host policies. This change does not resolve the general distinction between an applicability marker and owned child content; that encoding requires cross-spec review before a broader behavior-reference migration.
