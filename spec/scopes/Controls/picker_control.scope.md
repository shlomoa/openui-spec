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

Categories are defined in [`../scope.md`](../scope.md). This object inherits concrete
value, range, and source attributes from the selected picker implementation.

## Child model

A picker control does not define a fixed child model at this abstraction level.

## Accessibility

A picker control exposes the selected value, available choices or source, and an
accessible label for the control and any opened picker surface.

## Validation notes

- Use the existing Date/Time pickers widget for calendar-based date or time
  selection contracts.
- Choosing a file, folder or font does not grant access to it. A picker may be hosted in a dialog.
