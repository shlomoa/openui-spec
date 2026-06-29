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
generator's expected output style.

## Example source

The canonical, framework-independent worked examples live under
[`spec/examples/`](../../../spec/examples/README.md) — one OpenUI document per
scope, mirroring [`spec/scopes/`](../../../spec/scopes). Those documents are the
source of truth for what this app documents; the app manifests them, it does not
regenerate them. The planned restructure that maps each `spec/examples/**`
document to an app entry one-to-one is tracked in
[generated-examples-app-update-plan.md](generated-examples-app-update-plan.md).

## Incremental generation

The Angular generator supports incremental operation: given a JSON specification
and an existing workspace, it reconciles the workspace to match the specification.
This app documents both generation modes through the test fixtures in
`generators/angular/generator/tests/fixtures/`:

- **From scratch** (`example_from_scratch/`) — full workspace generated from JSON
  when the output directory is empty.
- **Incremental** (`example_incremental/`) — existing workspace is reconciled to
  add, modify, or remove components based on JSON specification changes.

The reconciliation algorithm traverses the JSON tree and compares each node with
the workspace manifestation, determining per-node actions: Add, Delete, Modify,
or Match (no-op).

## Development server

```bash
npm start
```

Open `http://localhost:4200/` to browse the generated component catalog.

## Validation

```bash
npm run format:check
npm run lint
npm test
npm run build
```

Use `npm run format` to apply Prettier formatting.

These checks cover this app's vitest specs (data model, navigation, and the
component-viewer tabs). For the repository-wide test strategy — spec-contract,
generator, and examples-app suites — see the [test plan](../../../docs/TEST_PLAN.md).
