# Surface containers

Review copy for AM-E08, pending acceptance. See [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md). Existing identity and machine fields are preserved except changes explicitly identified in the proposal.

This leaf follows the [leaf scope template](../../../../scopes/template.scope.md). It groups surface
container aliases from the generic UI taxonomy.

## Identity

- id: surfaceContainers · type: SurfaceContainers · status: draft

## Purpose

Surface containers cover windows, screens, views, panels, cards, and toolbar surfaces
when they are modeled as visual regions that hold related content or controls.

## Attributes

Categories are defined in [`../scope.md`](../../../../scopes/scope.md). This family inherits concrete
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

A card may group heading, supporting media, content and actions about one subject. A reusable toolbar surface belongs here when it is not the application-level command-placement contract.

Optional regions are descriptive examples, not required child types. Retain Application Tool bars for its existing row/action contract; do not duplicate pending OpenUI5 card proposals.
