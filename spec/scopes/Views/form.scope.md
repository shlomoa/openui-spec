# Form

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: form · type: Form · status: draft

## Purpose

A read-write data view, made of form fields and form groups, that lets the user
enter and edit business data with validation, submission and dirty-state
tracking.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `behaves.validate` — Behaves — checks the entered data against its rules.
- `behaves.submit` — Behaves — commits the entered data.
- `produces.dirtyChange` — Produces — emitted when the unsaved-changes (dirty) state
  changes.

## Child model

- group — fieldset — 0..n — a form group: a labelled set of related form fields.

## Accessibility

- Associates each field with its label and exposes validation state and messages
  to assistive technology.
- Submission and error feedback are announced so the user knows the outcome.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- The view is read-write. Form fields are the controls placed in the form or its
  groups; their constraints are attributes of those controls and of Input assistance.
