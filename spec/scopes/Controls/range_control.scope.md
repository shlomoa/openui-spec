# Range control

This leaf follows the [leaf scope template](../template.scope.md). It covers range
and scalar-value control aliases from the generic UI taxonomy.

## Identity

- id: rangeControl · type: RangeControl · status: draft

## Purpose

A range control covers sliders, spin boxes, stepper inputs, and rating controls that
select or present a value within a bounded or discrete range.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This object inherits concrete
minimum, maximum, step, current value, and orientation attributes from the selected
control implementation.

## Child model

A range control does not define a fixed child model at this abstraction level.

## Accessibility

A range control exposes value, bounds, orientation when relevant, and keyboard
increment/decrement behavior appropriate to the selected platform control.

## Validation notes

- Use this object for value controls; use status indicators when the value is
  display-only progress or loading feedback.
