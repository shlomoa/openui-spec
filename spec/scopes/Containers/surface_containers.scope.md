# Surface containers

This leaf follows the [leaf scope template](../template.scope.md). It groups surface
container aliases from the generic UI taxonomy.

## Identity

- id: surfaceContainers · type: SurfaceContainers · status: draft

## Purpose

Surface containers cover windows, screens, views, panels, cards, and toolbar surfaces
when they are modeled as visual regions that hold related content or controls.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
surface, title, elevation, density, and layout attributes from the selected container
implementation.

## Child model

Surface containers do not define a fixed child model at this abstraction level.

## Accessibility

Surface containers provide labels, headings, landmarks, or grouping semantics when the
surface is significant for navigation or understanding.

## Validation notes

- Use Pages and Views for route-level or workflow-level surfaces; use this family for
  reusable visual containers.
