# Date/Time pickers

This leaf follows the [leaf scope template](../template.scope.md). Its attribute
contract is drawn from the `spec/README.md` scope rule; the Angular Material
`mat-date-range-input` binding is cited only as a reference pattern and recorded
technology-independently.

## Identity

- id: dateTimePickers · type: DateTimePicker · status: draft

## Purpose

A calendar-based control for selecting a date, a time, or a date range from the
user.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). The Angular Material
`mat-date-range-input` inputs/outputs are shown only as reference patterns:

- `[start]` — Uses — the selected start date (Angular Material `matStartDate`).
- `[end]` — Uses — the selected end date (Angular Material `matEndDate`).
- `(dateChange)` — Produces — emitted when the selected date or range changes.

## Accessibility

- Exposes accessible labels for the date and range inputs and announces the
  selected value.
- Calendar navigation is operable by keyboard, with focus following the active
  date.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Attribute keys are recorded technology-independently; the Angular Material
  binding is a reference pattern only and is not part of the contract.
