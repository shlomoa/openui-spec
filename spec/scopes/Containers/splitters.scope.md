# Splitters

This leaf follows the [leaf scope template](../template.scope.md). It groups splitter
aliases from the generic UI taxonomy.

## Identity

- id: splitters · type: Splitters · status: draft

## Purpose

Splitters cover movable dividers between panes or regions that let users adjust the
relative size of adjacent containers.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
orientation, value, minimum, maximum, and target-pane attributes from the selected
splitter implementation.

## Child model

Splitters do not define a fixed child model at this abstraction level.

## Accessibility

Splitters expose separator or splitter semantics, current value, orientation, and
keyboard resizing behavior for the adjacent regions they control.

## Validation notes

- Use Resizable for generic resizing behavior; use this family when the splitter is a
  visible structural control between panes.
