# Input assistance

This leaf follows the [leaf scope template](../template.scope.md). It is a [Behaviors object](scope.md#objects) that groups the
behaviors that help or check what the user enters.

## Identity

- id: inputAssistance · type: InputAssistance · status: draft

## Purpose

Reusable behaviors that help or check what the user enters, and can attach to any
input control: text completion (offering and accepting suggestions while the user
types) and constraint validation (checking a value against declared rules and
reporting the result).

## Attributes

- `uses.target` — Uses — reference — element reference to the input control the behavior assists or checks (the [controlled element](../scope.md#controlled-element)).
- `uses.suggestions` — Uses — list(string) — the candidates offered while the user types.
- `uses.pattern` — Uses — string — a regular expression the value must match.
- `produces.suggestionSelect` — Produces — emitted when the user accepts a suggestion.
- `produces.invalid` — Produces — emitted when the value fails a declared rule.

## Accessibility

- Suggestions can be chosen and dismissed with the keyboard, without losing the
  typed text.
- A validation result is exposed to assistive technology and associated with the
  controlled input.

## Validation notes

- The behavior acts on its target and does not own it; it declares no Child model.
- Dismissing a suggestion keeps the typed value; accepting one does not submit or
  navigate.
- Form-wide validation stays with the `behaves.validate` action on Form.
- Whether a value is required is `uses.required` of the controlled input.
