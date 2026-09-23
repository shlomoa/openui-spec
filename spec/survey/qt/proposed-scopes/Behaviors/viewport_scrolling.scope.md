# Viewport scrolling

Review draft for future canonical merge. Follow [the shared template](../../../../scopes/template.scope.md) and [attribute categories](../../../../scopes/scope.md). See [decisions](../../BEHAVIOR_DECISIONS.md), [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [evidence](../../PROPOSED_EVIDENCE.md).

## Identity

- id: viewportScrolling · type: ViewportScrolling · status: draft

## Purpose

A behavior that changes the visible position of content within a viewport, with optional kinetic continuation and reveal-target actions.

## Attributes

- `[target]` — Uses — ID reference to an eligible viewport.
- `[axes]` — Uses — horizontal, vertical or both; limited to axes supported by the target.
- `[horizontalPosition]` — Uses — Normalized position 0–1; zero when horizontal scroll range is zero.
- `[verticalPosition]` — Uses — Normalized position 0–1; zero when vertical scroll range is zero.
- `[kinetic]` — Uses — Enable supported motion continuation; default false in this proposal.
- `(scrollTo)` — Behaves — Request normalized position; clamp to the supported bounds under D03.
- `(revealTarget)` — Behaves — Expose an ID-referenced descendant where possible without changing focus.
- `(stop)` — Behaves — Interrupt ongoing motion and retain the effective position.
- `(positionChanged)` — Produces — Effective normalized viewport position changed.

## Accessibility

Provide keyboard motion and non-gesture alternatives. Keep significant overflowed content reachable even if bars are hidden. Reduce or disable kinetic motion under the selected accessibility/motion policy.

## Validation notes

D01/D03/D09 apply. A target must expose extent and effective position; a plain clipped region or scrollbar by itself does not satisfy the viewport contract. Reveal references must lie in the target content. Recompute normalized position when ranges change, clamp invalid input and reject unsupported axes. New conflicting input stops prior motion. B21/B22/B23 share this contract; bar presentation and content ownership remain with the component.
