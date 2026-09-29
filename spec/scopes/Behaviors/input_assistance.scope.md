# Input assistance

This leaf follows the [leaf scope template](../template.scope.md). It was created by
the approved structure change as a new [Behaviors object](scope.md#objects) and groups the
behaviors that help or check what the user enters.

## Identity

- id: inputAssistance · type: InputAssistance · status: draft

## Purpose

Reusable behaviors that help or check what the user enters, and can attach to any
input control: text completion (offering and accepting suggestions while the user
types) and constraint validation (checking a value against declared rules and
reporting the result).

## Attributes

- `[target]` — Uses — element reference to the input control the behavior assists or checks (the [controlled element](../scope.md#controlled-element)).

## Accessibility

- Suggestions can be chosen and dismissed with the keyboard, without losing the
  typed text.
- A validation result is exposed to assistive technology and associated with the
  controlled input.

## Validation notes

- The behavior acts on its target and does not own it; it declares no Child model.
- Dismissing a suggestion keeps the typed value; accepting one does not submit or
  navigate.
- Form-wide validation stays with the `(validate)` action on Form.
- Other attributes, such as the candidate source or the rules to check, need an
  explicit owner decision before they are added.
