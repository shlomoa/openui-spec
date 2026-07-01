# Generated Angular Material examples

Angular Material app that documents the representative components the OpenUI specification
Angular generator emits. The app is structured like the
[Angular Material Components documentation](https://material.angular.dev/components):

- A toolbar plus a side navigation list every documented component, grouped by category.
- `/components` shows the component catalog as cards.
- `/components/:id` opens a component with **API**, **Examples**, and **Styling** tabs.
  - **API** content is derived from the specification documents published to Read the Docs
    (the `spec/*.md` sources).
  - **Examples** includes more than one runnable Angular Material preview per component,
    each shown alongside its generated source.
  - **Styling** lists relevant styling guidance and the generated styles.

The previews intentionally use Angular Material components for the generated shell,
page, table, form, navigation, and action controls so the sample app reflects the
generator's expected output style. This app is documentation, not generator output:
its tests assert what the app presents, but they do not re-run the generator.
It is a derived artifact and must not replace or redefine the hand-authored
specification prose, scope documents, or framework-independent examples.

## Example source

The canonical, framework-independent worked examples live under
[`spec/examples/`](../../../spec/examples/README.md) — one OpenUI document per
scope, mirroring [`spec/scopes/`](../../../spec/scopes). Those documents are the
source of truth for what this app documents; the app manifests them, it does not
regenerate them. The planned restructure that maps each `spec/examples/**`
document to an app entry one-to-one is tracked in
[generated-examples-app-update-plan.md](generated-examples-app-update-plan.md).

## Incremental generation

The Angular generator supports incremental operation as defined in
[spec/README.md § Incremental generation](../../../spec/README.md#incremental-generation).
The test fixtures in `generators/angular/generator/tests/fixtures/` demonstrate
both generation modes (from-scratch and incremental reconciliation).

## Development server

```bash
npm start
```

Open `http://localhost:4200/` to browse the generated component catalog.

## Validation

Run from `generators/angular/generated-examples/`:

```bash
npm run format:check
npm run lint
npm test
npm run build
```

Use `npm run format` to apply Prettier formatting.

`npm test` runs `ng test --watch=false` (vitest). The specs cover the
documentation data model and the component-viewer routing/tabs:

- `app.spec.ts` — the app boots, renders the toolbar title, and renders a sidenav
  that lists components by category.
- `documentation/documentation-items.spec.ts` — components group into categories,
  every documented component is reachable by id, each provides more than one
  example, API content is derived from a spec document and styling is present,
  and specific specification sections (UI concept model, application structure,
  layout system, state model, acceptance criteria) are documented with generated
  examples.
- `components/component-viewer/component-viewer.spec.ts` — the `/components`
  landing lists components; a component renders API, Examples, and Styling tabs;
  the API tab is sourced from the spec by default; and the per-concept Examples
  previews (structure, layout, binding, interaction, accessibility, performance,
  compliance, internationalization, reference, extension) render correctly.

These app-specific checks are documented here as their SSOT. For the Angular
generator architecture and generator package validation strategy, see
[`generators/angular/generator/docs/GENERATION.md`](../generator/docs/GENERATION.md#validation-and-test-strategy).

### CI integration

`.github/workflows/build.yml` runs these generated-examples checks alongside the
repository's other validation on code-review events. The root contract test
(`tests/test_github_actions_build.py`) asserts the workflow keeps running the
Angular examples checks, lint/format checks, strict MkDocs builds, and pinned
action versions. Changing the local commands above should be reflected in the
workflow and will be caught by that contract test if it is not.
