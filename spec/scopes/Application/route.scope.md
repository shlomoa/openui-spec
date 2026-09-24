# Route

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule and official routing documentation,
recorded technology-independently. Framework route configuration is a reference
pattern only.

## Identity

- id: route · type: Route · status: draft

## Purpose

A route maps a location pattern to application content or redirects the location
to another route.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `[path]` — Uses — location pattern matched relative to the parent route.
- `[target]` — Uses — reference to the page or content element resolved by this route.
- `[title]` — Uses — title announced for the resolved route content.
- `[redirectTo]` — Uses — reference to the route selected instead of resolving content.
- `[access]` — Uses — application access requirement for this route.

## Child model

A route may own nested route definitions:

- route — Route — 0..n — a child route matched relative to this route.

## Accessibility

- The resolved content exposes the route title so assistive technologies can
  announce navigation changes.
- Focus management after route activation preserves a predictable keyboard path
  into the resolved content.

## Validation notes

- Exactly one of `[target]` and `[redirectTo]` is required.
- `[target]` references a page or content element; `[redirectTo]` references a
  `Route`. `[access]` expresses policy without prescribing authentication,
  authorization, guard, or resolver mechanisms.
