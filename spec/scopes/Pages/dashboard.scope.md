# Dashboard

This leaf follows the [leaf scope template](../template.scope.md). Its purpose is
drawn from the `spec/README.md` scope rule; the Angular Material Dashboard
schematic is cited only as a reference pattern, recorded
technology-independently.

## Identity

- id: dashboard · type: DashboardPage · status: draft

## Purpose

A predefined page layout that presents overview metrics and summary content for
quick scanning.

## Accessibility

- Exposes a page title as a heading.
- Preserves keyboard reachability and meaningful labels for interactive summary
  content supplied by an implementation.
- Maintains a usable reading order when summary content is arranged
  responsively.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Only the Purpose is authorized by current evidence; dashboard attributes,
  layout regions, cards, metrics, and actions require an explicit owner decision
  before they are added as contract entries.
