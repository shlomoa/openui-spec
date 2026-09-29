# Picker control

This leaf follows the [leaf scope template](../template.scope.md). It covers picker
control aliases from the generic UI taxonomy.

## Identity

- id: pickerControl · type: PickerControl · status: draft

## Purpose

A picker control covers specialized selection affordances such as wheel pickers,
color pickers, file pickers, folder pickers and font pickers. Date and time entry
maps to the Date/Time pickers widget.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.label` — Uses — string — accessible name of the picker.
- `uses.kind` — Uses — enum(wheel|color|file|folder|font) — what the picker chooses.
- `uses.value` — Uses — string — the chosen value, color, file, folder or font.
- `uses.accept` — Uses — string — the file types a file picker offers, as media types or file extensions.
- `uses.multiple` — Uses — boolean — whether a file picker accepts more than one file.
- `uses.disabled` — Uses — boolean — whether the picker is unavailable.
- `produces.valueChange` — Produces — emitted when the chosen value changes.

## Accessibility

A picker control exposes the selected value, available choices or source, and an
accessible label for the control and any opened picker surface.

## Validation notes

- Use the existing Date/Time pickers widget for date or time entry contracts,
  with or without a calendar.
- Choosing a file, folder or font does not grant access to it. A picker may be hosted in a dialog.
