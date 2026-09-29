# Text inputs

This leaf follows the [leaf scope template](../template.scope.md). It groups text-entry
control aliases from the generic UI taxonomy.

## Identity

- id: textInputs · type: TextInputs · status: draft

## Purpose

Text inputs cover single-line, multi-line, password, search, rich text, keyboard
shortcut and metadata-driven entry controls that accept textual user input.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.label` — Uses — string — accessible name of the input.
- `uses.value` — Uses — string — the entered text or the recorded key combination.
- `uses.placeholder` — Uses — string — hint text shown while the input is empty.
- `uses.type` — Uses — enum(text|password|search|email|tel|url) — the kind of single-line text entered.
- `uses.multiline` — Uses — boolean — whether the input accepts several lines.
- `uses.maxLength` — Uses — integer — the maximum number of characters.
- `uses.readOnly` — Uses — boolean — whether the text can be read and selected but not changed.
- `uses.required` — Uses — boolean — whether a value is required.
- `uses.disabled` — Uses — boolean — whether the input is unavailable.
- `produces.valueChange` — Produces — emitted when the entered value changes.

## Accessibility

Text inputs require an accessible label, expose editing state, and preserve expected
keyboard text-entry behavior for the selected platform control.

## Validation notes

- Map text field, text area, password field, and search field aliases here unless a
  more specialized scope defines the concrete contract.
- A keyboard shortcut field records a key combination; it does not run it. Rich text content needs a representation decision before `uses.value` can hold it.
