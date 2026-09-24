# Navigation item

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule and navigation landmark and link
patterns, recorded technology-independently.

## Identity

- id: navItem · type: NavItem · status: draft

## Purpose

A navigation item presents one labelled application route as a user-selectable
destination.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `[label]` — Uses — required visible text and accessible name for the destination.
- `[route]` — Uses — reference to the `Route` selected by this item.
- `[icon]` — Uses — optional technology-independent icon token for the destination.
- `[disabled]` — Uses — boolean: whether the destination is unavailable.

## Accessibility

- The required label remains the accessible name when an icon is present.
- A disabled destination is conveyed to assistive technologies and cannot be
  activated.

## Validation notes

- `[route]` references a `Route`; external URLs are outside this application-route
  contract and use a link control instead.
