# Stepper

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule; the Angular Material stepper is cited
only as a reference pattern, recorded technology-independently.

## Identity

- id: stepper · type: Stepper · status: draft

## Purpose

A control that guides the user through a multi-step process as an ordered sequence
of steps.

## Child model

A stepper owns its ordered steps:

- step — step — 1..n — a single step in the ordered sequence.

## Accessibility

- Announces the current step and the total number of steps to assistive
  technology.
- Step navigation is operable by keyboard, with focus following the active step.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Steps are ordered; the framework stepper is a reference pattern only and is not
  part of the contract.
