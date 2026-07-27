# Structural containers

This leaf follows the [leaf scope template](../template.scope.md). It groups structural
layout aliases from the generic UI taxonomy.

## Identity

- id: structuralContainers · type: StructuralContainers · status: draft

## Purpose

Structural containers cover panes, rails, stacks, scaffolds, and regions that organize
page or view content without prescribing a concrete layout engine.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
region name, orientation, slot, order, and responsive attributes from the selected
container implementation.

## Child model

Structural containers do not define a fixed child model at this abstraction level.

## Accessibility

Structural containers use landmarks, headings, grouping, or presentational semantics
based on whether the region is meaningful to users and assistive technologies.

## Validation notes

- Use Layout for mechanism-level notions such as flow, alignment, sizing, and
  breakpoints.
