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

- `uses.path` — Uses — string — location pattern matched relative to the parent route.
- `uses.target` — Uses — reference — reference to the page or content element resolved by this route.
- `uses.title` — Uses — string — title announced for the resolved route content.
- `uses.redirectTo` — Uses — reference(Route) — reference to the route selected instead of resolving content.
- `uses.access` — Uses — string — application access requirement for this route.

## Child model

A route may own nested route definitions:

- childRoute — Route — 0..n — a child route matched relative to this route.

## Accessibility

- The resolved content exposes the route title so assistive technologies can
  announce navigation changes.
- Focus management after route activation preserves a predictable keyboard path
  into the resolved content.

## Validation notes

- Exactly one of `uses.target` and `uses.redirectTo` is required.
- `uses.target` references a page or content element; `uses.redirectTo` references a
  `Route`. `uses.access` expresses policy without prescribing authentication,
  authorization, guard, or resolver mechanisms.
