# Date/Time pickers

Review copy for AM-E03, pending acceptance. See [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md). Existing identity and machine fields are preserved except changes explicitly identified in the proposal.

This leaf follows the [leaf scope template](../../../../scopes/template.scope.md). Its attribute
contract is drawn from the `spec/README.md` scope rule; the Angular Material
`mat-date-range-input` binding is cited only as a reference pattern and recorded
technology-independently.

## Identity

- id: dateTimePickers · type: DateTimePicker · status: draft

## Purpose

A control for entering or selecting a date, a time, or a date range, using presentation appropriate to the temporal value.

## Attributes

Categories are defined in [`../scope.md`](../../../../scopes/scope.md). The Angular Material
`mat-date-range-input` inputs/outputs are shown only as reference patterns:

- `[start]` — Uses — the selected start date (Angular Material `matStartDate`).
- `[end]` — Uses — the selected end date (Angular Material `matEndDate`).
- `(dateChange)` — Produces — emitted when the selected date or range changes.

## Accessibility

- Exposes accessible labels for the date and range inputs and announces the
  selected value.
- When a calendar is present, its navigation is operable by keyboard, with focus following the active date.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Attribute keys are recorded technology-independently; the Angular Material
  binding is a reference pattern only and is not part of the contract.

Preserve current range bindings and event. Choose single-time value format, timezone policy and event semantics separately; do not copy Material date-object storage. Overlaps the Qt temporal proposal.
