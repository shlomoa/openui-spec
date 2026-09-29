# Native

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the native HTML `input` element and the `spec/README.md` scope rule,
recorded technology-independently.

## Identity

- id: native · type: input · status: draft

## Purpose

A standard platform input, identified by its `uses.type`, used where no more
specific control family applies.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.type` — Uses — string — the input kind (e.g. text, number, checkbox).
- `uses.value` — Uses — string — the current value held by the control.
- `uses.placeholder` — Uses — string — hint text shown when the control is empty.
- `uses.disabled` — Uses — boolean — whether the control is interactive.

## Accessibility

- Inherits the native role of the underlying platform control (e.g. `textbox`).
- Labelled by an associated label and reflects its `uses.disabled` state to assistive
  technology.
- Focus, pointer, and keyboard input follow platform-provided behavior.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Attributes are recorded from the HTML standard and stay technology-independent;
  the platform supplies the implementation mechanism.
