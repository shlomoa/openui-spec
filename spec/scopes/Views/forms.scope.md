# Forms

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: forms · type: Forms · status: draft

## Purpose

A read-write data view that lets the user enter and edit business data with
validation, submission, and dirty-state tracking.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `(validate)` — Behaves — checks the entered data against its rules.
- `(submit)` — Behaves — commits the entered data.
- `(dirtyChange)` — Produces — emitted when the unsaved-changes (dirty) state
  changes.

## Accessibility

- Associates each field with its label and exposes validation state and messages
  to assistive technology.
- Submission and error feedback are announced so the user knows the outcome.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- The view is read-write; field-level constraints and a field child model require
  an explicit owner decision before they are added.
