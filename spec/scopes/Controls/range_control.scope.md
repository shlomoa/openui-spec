# Range control

This leaf follows the [leaf scope template](../template.scope.md). It covers range
and scalar-value control aliases from the generic UI taxonomy.

## Identity

- id: rangeControl · type: RangeControl · status: draft

## Purpose

A range control covers sliders, range sliders, rotary value controls, spin boxes,
step inputs and rating controls that select or present a value within a bounded or
discrete range.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.label` — Uses — string — accessible name of the control.
- `uses.value` — Uses — number — the current value.
- `uses.min` — Uses — number — the lower bound.
- `uses.max` — Uses — number — the upper bound.
- `uses.step` — Uses — number — the increment between allowed values.
- `uses.start` — Uses — number — the lower end of the interval a range slider selects.
- `uses.end` — Uses — number — the upper end of the interval a range slider selects.
- `uses.wrapping` — Uses — boolean — whether stepping past one bound continues from the other.
- `uses.orientation` — Uses — enum(horizontal|vertical) — the direction of a slider.
- `uses.disabled` — Uses — boolean — whether the control is unavailable.
- `produces.valueChange` — Produces — emitted when the value or the interval changes.

## Accessibility

A range control exposes value, bounds, orientation when relevant, and keyboard
increment/decrement behavior appropriate to the selected platform control.

## Validation notes

- Use this object for value controls; use status indicators when the value is
  display-only progress or loading feedback.
- Bounds, step and wrapping are optional capabilities. A range slider selects an interval with two thumbs.
