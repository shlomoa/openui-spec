# Range controls

This leaf follows the [leaf scope template](../template.scope.md). It groups range
and scalar-value control aliases from the generic UI taxonomy.

## Identity

- id: rangeControls · type: RangeControls · status: draft

## Purpose

Range controls cover sliders, spin boxes, stepper inputs, and rating controls that
select or present a value within a bounded or discrete range.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
minimum, maximum, step, current value, and orientation attributes from the selected
control implementation.

## Child model

Range controls do not define a fixed child model at this abstraction level.

## Accessibility

Range controls expose value, bounds, orientation when relevant, and keyboard
increment/decrement behavior appropriate to the selected platform control.

## Validation notes

- Use this family for value controls; use status indicators when the value is
  display-only progress or loading feedback.
