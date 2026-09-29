# Tool action

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule and button patterns, recorded
technology-independently.

## Identity

- id: toolAction · type: ToolAction · status: draft

## Purpose

A tool action is a labelled application command exposed from a tool bar.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.label` — Uses — string — required visible text or accessible name for the command.
- `uses.icon` — Uses — string — optional technology-independent icon token for the command.
- `uses.disabled` — Uses — boolean — whether the command is unavailable.
- `produces.activate` — Produces — emitted when the command is invoked.

## Accessibility

- An icon-only action uses its required label as an accessible name.
- A disabled action is conveyed to assistive technologies and is not invoked.

## Validation notes

- Command-handler binding syntax remains an implementation detail.
