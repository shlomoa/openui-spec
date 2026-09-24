# Tool bar row

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule and toolbar patterns, recorded
technology-independently.

## Identity

- id: toolBarRow · type: ToolBarRow · status: draft

## Purpose

A tool bar row orders command actions within a tool bar.

## Child model

A tool bar row owns its command actions:

- toolAction — ToolAction — 0..n — an application command exposed in this row.

## Accessibility

- Actions are keyboard reachable in their visual order.

## Validation notes

- Title, text, and other non-action content are outside the row contract.
