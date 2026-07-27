# Picker controls

This leaf follows the [leaf scope template](../template.scope.md). It groups picker
control aliases from the generic UI taxonomy.

## Identity

- id: pickerControls · type: PickerControls · status: draft

## Purpose

Picker controls cover specialized selection affordances such as wheel picker, color
picker, and file picker. Date and time picker aliases map to the existing
Date/Time pickers widget when calendar semantics are required.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
value, range, and source attributes from the selected picker implementation.

## Child model

Picker controls do not define a fixed child model at this abstraction level.

## Accessibility

Picker controls expose the selected value, available choices or source, and an
accessible label for the control and any opened picker surface.

## Validation notes

- Use the existing Date/Time pickers widget for calendar-based date or time
  selection contracts.
