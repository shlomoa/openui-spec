# Surface containers

This leaf follows the [leaf scope template](../template.scope.md). It groups surface
container aliases from the generic UI taxonomy.

## Identity

- id: surfaceContainers · type: SurfaceContainers · status: draft

## Purpose

Surface containers cover windows, panels, cards, tiles, labelled groups, checkable groups, hero
banners and toolbar surfaces when they are modeled as visual regions that hold
related content or controls.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.title` — Uses — string — the visible title of the surface, such as a group, card or panel title.
- `uses.checkable` — Uses — boolean — whether a labelled group has a checkbox in its title.
- `uses.checked` — Uses — boolean — whether the contents of a checkable group are enabled.

## Child model

- content — section — 0..1 — the content region of the surface.
- actions — footer — 0..1 — the actions region of the surface.

## Accessibility

Surface containers provide labels, headings, landmarks, or grouping semantics when the
surface is significant for navigation or understanding.

## Validation notes

- Use Pages and Views for route-level or workflow-level surfaces; use this family for
  reusable visual containers.
- A checkable group enables or disables its contents; it does not collapse them.
