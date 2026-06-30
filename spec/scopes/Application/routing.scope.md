# Routing

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule and official Angular routing docs,
recorded technology-independently. Angular route configuration is a reference
pattern only.

## Identity

- id: routing · type: Routing · status: draft

## Purpose

Routing defines how an application resolves navigation intents or locations to
application content.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `[defaultRoute]` — Uses — optional initial route used when the application does not receive a more specific navigation target.

## Child model

Routing owns route definitions:

- route — Route — 0..n — a route entry that maps a navigation pattern to application content.

## Accessibility

- Route targets expose meaningful page or view titles so assistive technologies
  can announce navigation changes.
- Focus management after route activation is supplied by the implementation and
  must preserve a predictable keyboard path into the routed content.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Router implementation details, URL strategy, lazy loading, guards, resolvers,
  and concrete framework route object fields remain reference-pattern details
  until approved as OpenUI contract entries.
