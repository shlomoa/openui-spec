# index.html

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the HTML `html`, `head`, `body`, `lang`, and `dir` primitives and the
`spec/README.md` scope rule, recorded technology-independently. Angular index
configuration is a build reference pattern only.

## Identity

- id: indexHtml · type: html · status: draft

## Purpose

`index.html` defines the application host document and static bootstrap
metadata.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `[lang]` — Uses — document language tag for the application host document.
- `[dir]` — Uses — document text direction for the application host document.

## Child model

The host document owns the standard metadata and body regions:

- documentHead — head — 1 — machine-readable metadata and bootstrap resource declarations.
- documentBody — body — 1 — visible document content and application mount content.

## Accessibility

- The document language is programmatically determinable so assistive
  technologies can select the correct pronunciation and metadata language.
- Directionality is declared when content requires left-to-right, right-to-left,
  or automatic text direction behavior.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Title, viewport, mount element, stylesheet links, script entry points, concrete
  framework bootstrap API, bundler, development server, and file emission details
  remain reference-pattern details until approved as OpenUI contract entries.
