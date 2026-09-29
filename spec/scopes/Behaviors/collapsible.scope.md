# Collapsible

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: collapsible · type: Collapsible · status: draft

## Purpose

A behavior that lets the user collapse and expand elements within a page or view.

## Attributes

- `uses.target` — Uses — reference — element reference to the element the behavior collapses and expands (the [controlled element](../scope.md#controlled-element)).
- `uses.trigger` — Uses — reference — element reference to the element the user operates to collapse or expand the target (the [controlling element](../scope.md#controlling-element)).
- `uses.expanded` — Uses — boolean — whether the target is expanded.
- `produces.expandedChange` — Produces — emitted when the target expands or collapses.

## Accessibility

- Exposes the expanded or collapsed state to assistive technology.
- The trigger is operable by keyboard and associated with its content region.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- The behavior acts on its target and does not own it; it declares no Child model.
