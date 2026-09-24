# Tool bars

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule and official Angular Material toolbar
overview/API docs, recorded technology-independently. Angular Material toolbar is
a reference pattern only.

## Identity

- id: toolBars · type: ToolBar · status: draft

## Purpose

Tool bars define application-level command surfaces for frequently used actions.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `[ariaLabel]` — Uses — accessible label for the toolbar command surface.

## Child model

Tool bars own ordered rows:

- toolBarRow — ToolBarRow — 0..n — an ordered row of toolbar content.

## Accessibility

- A toolbar used as a command surface is labelled and exposes an appropriate role
  for its use case.
- Actions remain keyboard reachable in visual and overflow presentations, and
  icons have text alternatives or associated labels.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- In a concrete document, an Application child uses the `ToolBar` instance type;
  `ToolBars` identifies only this catalog scope node.
- Placement, ordering, grouping, overflow behavior, responsive breakpoint, color,
  and concrete command-handler details remain reference-pattern details.
