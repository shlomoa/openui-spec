# Link and scroll controls

This leaf follows the [leaf scope template](../template.scope.md). It groups simple
navigation and viewport-control aliases from the generic UI taxonomy.

## Identity

- id: linkAndScrollControls · type: LinkAndScrollControls · status: draft

## Purpose

Link and scroll controls cover links and scrollbars when they are modeled as
primitive controls rather than application navigation structures or composite widgets.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
target, current position, and range attributes from the selected platform control.

## Child model

Link and scroll controls do not define a fixed child model at this abstraction level.

## Accessibility

Links expose destination semantics and scrollbars expose viewport position and range,
with keyboard and assistive-technology behavior matching the selected platform control.

## Validation notes

- Use the Application navigation scope for route-oriented groups of links.
