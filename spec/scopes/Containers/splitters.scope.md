# Splitters

This leaf follows the [leaf scope template](../template.scope.md). It groups splitter
aliases from the generic UI taxonomy.

## Identity

- id: splitters · type: Splitters · status: draft

## Purpose

Splitters cover movable dividers, with their splitter handles, between panes or
regions that let users adjust the relative size of adjacent containers.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.orientation` — Uses — enum(horizontal|vertical) — the direction in which the panes are placed.
- `produces.resize` — Produces — emitted when a divider moves and the pane sizes change.

## Child model

- pane — section — 1..n — a pane whose size the dividers adjust.
- handle — separator — 0..n — the divider handle between two adjacent panes.

## Accessibility

Splitters expose separator or splitter semantics, current value, orientation, and
keyboard resizing behavior for the adjacent regions they control.

## Validation notes

- Use Resizable for generic resizing behavior; use this family when the splitter is a
  visible structural control between panes.
- A handle sits between the two panes it resizes and has a keyboard alternative to dragging.
