# Structural containers

This leaf follows the [leaf scope template](../template.scope.md). It groups structural
layout aliases from the generic UI taxonomy.

## Identity

- id: structuralContainers · type: StructuralContainers · status: draft

## Purpose

Structural containers cover panes, rails, stacks, scaffolds, regions, bars and scroll
containers that organize page or view content without prescribing a concrete layout
engine.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.ariaLabel` — Uses — string — accessible name of a region that is meaningful to users.
- `uses.orientation` — Uses — enum(horizontal|vertical) — the direction in which a stack, rail or bar arranges its content.

## Accessibility

Structural containers use landmarks, headings, grouping, or presentational semantics
based on whether the region is meaningful to users and assistive technologies.

## Validation notes

- Use Layout for mechanism-level notions such as flow, alignment, sizing, and
  breakpoints.
