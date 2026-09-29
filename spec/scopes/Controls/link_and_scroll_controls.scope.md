# Link and scroll controls

This leaf follows the [leaf scope template](../template.scope.md). It groups simple
navigation and viewport-control aliases from the generic UI taxonomy.

## Identity

- id: linkAndScrollControls · type: LinkAndScrollControls · status: draft

## Purpose

Link and scroll controls cover links and scrollbars when they are modeled as
primitive controls rather than application navigation structures or composite widgets.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.label` — Uses — string — the link text and accessible name.
- `uses.href` — Uses — url — the destination of a link.
- `uses.value` — Uses — number — the current position of a scrollbar.
- `uses.min` — Uses — number — the lowest scrollbar position.
- `uses.max` — Uses — number — the highest scrollbar position.
- `uses.orientation` — Uses — enum(horizontal|vertical) — the direction of a scrollbar.
- `produces.activate` — Produces — emitted when a link is followed.

## Accessibility

Links expose destination semantics and scrollbars expose viewport position and range,
with keyboard and assistive-technology behavior matching the selected platform control.

## Validation notes

- Use the Application navigation scope for route-oriented groups of links.
