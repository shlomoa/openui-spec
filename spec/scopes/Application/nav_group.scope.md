# Navigation group

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule and navigation landmark patterns,
recorded technology-independently.

## Identity

- id: navGroup · type: NavGroup · status: draft

## Purpose

A navigation group labels and organizes related navigation destinations.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `[label]` — Uses — required visible and accessible name for the group.
- `[expanded]` — Uses — boolean: initial state of the group's contained entries.

## Child model

A navigation group may own navigation entries and nested groups:

- navigationItem — NavItem — 0..n — a destination in the group.
- navigationGroup — NavGroup — 0..n — a nested group of related destinations.

## Accessibility

- The group label identifies its contained destination set.
- Its expanded state is perceivable and operable by keyboard.

## Validation notes

- Groups organize destinations only; the child items retain ownership of their
  route references, labels, and icons.
