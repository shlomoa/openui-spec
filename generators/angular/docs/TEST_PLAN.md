# Angular Generator Test Plan

This document describes the Angular-specific automated test strategy: what each
Angular test surface protects, how the suites are organized, and how to run them.
Repository-level spec contract and documentation validation are documented in the
[root test plan](../../../docs/TEST_PLAN.md).

Angular validation has two primary layers plus CI integration:

1. **Angular generator tests** (`node:test`) — protect the generator pipeline
   from input validation through Angular emission.
2. **Generated-examples app tests** (`vitest`) — protect the documentation app
   that showcases representative generator output.
3. **CI build workflow** (`.github/workflows/build.yml`) — runs these checks
   alongside repository validation on every code-review event.

The layering mirrors the [golden-source boundary](GENERATOR_STRUCTURE.md#golden-source-boundary):
the spec is authoritative, the generator consumes it, and the examples app is a
downstream illustration that is never treated as generator output.

## Layer 1 — Angular generator tests (`generators/angular/generator/`, node:test)

Run from the generator package:

```powershell
Push-Location generators/angular/generator
npm run test
Pop-Location
```

`npm run test` compiles TypeScript first and then runs the Node test suite from
`dist/tests/*.test.js`. The suite (`tests/generator.test.ts`) drives the full
pipeline against the committed `tests/fixtures/minimal-openui.json` catalog
fixture:

| Test                                                                          | Verifies                                                                                          |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| builds the UI model from canonical scope-tree OpenUI nodes                    | `buildUiModel` produces the expected `UiApplication` name, version, and ordered pages.            |
| generates an Angular Material standalone app from canonical scope-tree OpenUI | The `generate` CLI emits the expected Angular project skeleton and Angular Material dependencies. |
| generates scope-specific Angular Material details from the canonical tree     | Feature-specific page output (structure, layout, i18n, extension, etc.) is emitted per scope.     |
| validates canonical root values, attrs, and scoped document uniqueness        | `validateOpenUiSpec` raises `SpecValidationError` for malformed root values and duplicate scopes. |

Generator tests write output only to the repo-local, git-ignored `tmp/`
directory (via `mkdtemp` under the repository root) — never to OS temp
directories.

## Layer 2 — Generated-examples app tests (`generators/angular/generated-examples/`, vitest)

Run from the examples app:

```powershell
Push-Location generators/angular/generated-examples
npm run format:check
npm run lint
npm test
npm run build
Pop-Location
```

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

The app is documentation, not generator output, so these tests assert what the
app presents — they do not re-run the generator.

## CI integration (`.github/workflows/build.yml`)

`build.yml` runs the Angular generator and generated-examples checks alongside
repository Python and documentation validation on code-review events. The root
contract test (`tests/test_github_actions_build.py`) asserts the workflow keeps
running Angular-generator checks, Angular-examples checks, lint/format checks,
strict MkDocs builds, and pinned action versions. Changing the local test
commands above should be reflected in the workflow and will be caught by that
contract test if it is not.

## Conventions

- **Repo-local temporary output only.** Tests must write transient output under
  the git-ignored repository `tmp/`, never to `%TEMP%`, `/tmp`, or
  `os.tmpdir()`. This keeps generated artifacts out of the working tree and off
  the OS temp paths the repository instructions disallow.
- **Golden source is authoritative.** Generator tests consume derived artifacts
  and must not redefine the prose spec, scopes, schema, or catalog contract.
- **No committed generator output workspaces.** Only input fixtures are committed;
  generated application workspaces are produced during test runs and discarded.

## Incremental generation test strategy

Incremental generation (defined in
[spec/README.md § Incremental generation](../../../spec/README.md#incremental-generation))
introduces workspace reconciliation scenarios that extend the existing generator
test surface. The test fixtures under
`generators/angular/generator/tests/fixtures/` capture the expected behavior:

### Fixture layout

```text
generators/angular/generator/tests/fixtures/
├─ example_from_scratch/         generation into an empty workspace
│  ├─ input_app-file-select/     JSON specification (input only)
│  └─ output_app-file-select/    expected full workspace after generation
├─ example_incremental/          generation into an existing workspace
│  ├─ input_app-file-select/     existing workspace with app-file-upload only
│  └─ output_app-file-select/    workspace after app-file-select is added
└─ example_backup/               baseline workspace state before generation
```

### Scenarios to test

| Scenario     | Fixture                | What is verified                                             |
| :----------- | :--------------------- | :----------------------------------------------------------- |
| From scratch | `example_from_scratch` | Empty workspace → full generated output                      |
| Incremental  | `example_incremental`  | Existing workspace → new component added, existing preserved |
| Match        | (same-state input)     | Re-running on matching workspace produces no changes         |
| Delete       | (future fixture)       | Removing a node from JSON removes the generated files        |

### Expected test assertions

- **Add**: new component files exist in the output workspace; parent references
  (imports, routes) include the new component.
- **Delete**: component files are absent from output; parent references no longer
  reference the deleted component.
- **Modify**: renamed or changed attributes produce updated file contents.
- **Match**: workspace files remain byte-identical when the specification has not
  changed.
- **Existing content preserved**: components not mentioned in the diff remain
  unchanged (e.g. `app-file-upload` stays intact in the incremental example).
