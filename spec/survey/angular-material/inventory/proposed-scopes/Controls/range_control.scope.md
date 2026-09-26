# Range control

Review copy for AM-E02, pending acceptance. See [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md). Existing identity and machine fields are preserved except changes explicitly identified in the proposal.

This leaf follows the [leaf scope template](../../../../../scopes/template.scope.md). It covers range
and scalar-value control aliases from the generic UI taxonomy.

## Identity

- id: rangeControl · type: RangeControl · status: draft

## Purpose

A range control covers sliders, spin boxes, stepper inputs, and rating controls that
select or present a value within a bounded or discrete range.

## Attributes

Categories are defined in [`../scope.md`](../../../../../scopes/scope.md). This object inherits concrete
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

Range controls include single-value and bounded-interval variants. An interval variant exposes distinguishable endpoints and defines ordering and crossing behavior.

Bounds, steps, endpoint representation and accessible endpoint labels need a neutral contract decision before machine fields are added.
