# Navigation

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule and official Angular Material sidenav
and navigation schematic docs, recorded technology-independently. Angular
Material side navigation is a reference pattern only.

## Identity

- id: navigation · type: Navigation · status: draft

## Purpose

Navigation defines user-facing structures that let users move between
application routes, pages, views, and major work areas.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `[ariaLabel]` — Uses — accessible label for the navigation landmark or region.

## Child model

Navigation owns user-facing entries and grouping nodes:

- navigationItem — NavItem — 0..n — a selectable destination exposed to users.
- navigationGroup — NavGroup — 0..n — a grouping node for related destinations.

## Accessibility

- A navigation surface that contains links to application destinations exposes a
  navigation landmark or an equivalent labelled region.
- The active destination is perceivable without relying on color alone, and
  hidden or disabled destinations are not keyboard traps.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Menu, side navigation, tab navigation, router-link, responsive breakpoint,
  focus-capture, and concrete framework component details remain
  reference-pattern details until approved as OpenUI contract entries.
