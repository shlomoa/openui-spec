# favicon.ico

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the HTML `link rel="icon"` link type and the `spec/README.md` scope
rule, recorded technology-independently. Angular asset handling is a build
reference pattern only.

## Identity

- id: favicon · type: link · status: draft

## Purpose

`favicon.ico` defines the application icon asset used for browser and shell
identity.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `[rel]` — Uses — link relationship identifying the resource as an icon.
- `[href]` — Uses — URL or path of the icon resource.
- `[type]` — Uses — optional MIME type hint for the icon resource.
- `[sizes]` — Uses — optional icon dimensions or scalable icon marker.
- `[media]` — Uses — optional media condition for choosing an icon variant.

## Accessibility

- The icon represents the page or site in browser and shell user interfaces.
- Human-visible application identity must not depend on the icon alone.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Build-tool asset copying, generated output location, non-standard mobile icon
  relations, and browser fallback fetching remain reference-pattern details until
  approved as OpenUI contract entries.
