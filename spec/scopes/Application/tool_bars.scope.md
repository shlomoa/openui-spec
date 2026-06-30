# Tool bars

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule and official Angular Material toolbar
overview/API docs, recorded technology-independently. Angular Material toolbar is
a reference pattern only.

## Identity

- id: toolBars · type: ToolBar · status: draft

## Purpose

Tool bars define application-level command surfaces for frequently used actions.

## Child model

Tool bars own rows and command actions:

- toolBarRow — ToolBarRow — 0..n — an ordered row of toolbar content.
- toolAction — ToolAction — 0..n — an application command exposed in the toolbar.

## Accessibility

- A toolbar used as a command surface is labelled and exposes an appropriate role
  for its use case.
- Actions remain keyboard reachable in visual and overflow presentations, and
  icons have text alternatives or associated labels.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Placement, ordering, grouping, overflow behavior, responsive breakpoint, color,
  and concrete command-handler details remain reference-pattern details until
  approved as OpenUI contract entries.
