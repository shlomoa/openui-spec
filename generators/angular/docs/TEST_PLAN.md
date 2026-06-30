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

The layering mirrors the [golden-source boundary](GENERATION.md#golden-source-boundary):
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
- **Inspectable generated output.** Set `OPENUI_KEEP_TEST_OUTPUT=1` before
  running generator tests to preserve temporary output under `tmp/`; the test
  run logs each kept directory path.
- **Golden source is authoritative.** Generator tests consume derived artifacts
  and must not redefine the prose spec, scopes, schema, or catalog contract.
- **Committed fixtures are expectations, not generated examples.** Fixture trees
  may include both input workspaces/specifications and expected output
  workspaces. Tests copy or compare those fixtures, but transient generator runs
  still write only under the repo-local, git-ignored `tmp/` directory.

## Incremental generation test strategy

Incremental generation (defined in
[spec/README.md § Incremental generation](../../../spec/README.md#incremental-generation))
is covered by both committed input/expected-output fixtures and runtime
workspace mutations under `tmp/`. The fixtures under
`generators/angular/generator/tests/fixtures/` capture reusable baseline states:

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

| Scenario     | Fixture                | What is verified                                                        |
| :----------- | :--------------------- | :---------------------------------------------------------------------- |
| From scratch | `example_from_scratch` | Empty workspace → full generated output                                 |
| Incremental  | `example_incremental`  | Existing workspace → new component added, affected parent files rewired |
| Match        | (same-state input)     | Re-running on matching workspace produces no changes                    |
| Delete       | runtime temp workspace | Files no longer emitted by the current input are removed                |
| Modify       | runtime temp workspace | Drifted generated files are rewritten, matched siblings stay untouched  |

### Expected test assertions

- **Add**: new component files exist in the output workspace; parent references
  (imports, routes) include the new component.
- **Delete**: component files are absent from output; parent references no longer
  reference the deleted component.
- **Modify**: renamed or changed attributes produce updated file contents.
- **Match**: workspace files remain byte-identical when the specification has not
  changed.
- **Unaffected content preserved**: files that already match the desired output
  remain byte-identical and are not rewritten.

### Specification-driven validation matrix

The reconciler is the layer that compares each spec node against its
manifestation in the workspace, so the per-scenario validation cases below are
exercised in `tests/reconcile.test.ts` by varying the JSON specification itself
between reconciliations rather than by mutating files on disk. Each case proves
the planner reaches the documented Add / Delete / Modify / Match decision for a
genuine specification change.

| Category     | Specification change                                 | Expected plan                                                                      | Test                                                                                   |
| :----------- | :--------------------------------------------------- | :--------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| Addition     | Empty workspace, full specification                  | Every emitted file is an Add                                                       | `an empty workspace yields an all-add plan (generation from scratch)`                  |
| Addition     | Workspace missing a child the specification declares | The new child is added; the parent that references it is rewired (Modify)          | `reconciles incremental workspace: adds new component, rewires and matches the parent` |
| Removal      | Specification is empty                               | Every previously generated file is a Delete                                        | `removal — an empty JSON deletes every previously generated component`                 |
| Removal      | One child removed from the specification             | The dropped child's files are Deletes; the parent is rewired to drop the reference | `removal — dropping one child from the JSON deletes it and rewires the parent`         |
| Modification | Simple child change (selector/name only)             | The renamed child is Added under the new name and the old name's files are Deletes | `modification — a simple child rename is reconciled as delete-old plus add-new`        |
| Modification | Complex child change (a descendant changes type)     | Only the affected file is a Modify; unrelated siblings stay Match                  | `modification — a complex child type change rewrites only the affected file`           |
