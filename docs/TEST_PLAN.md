# Test Plan

This document describes the repository's automated test strategy: what each test
surface protects, how the suites are organized, and how to run them. It replaces
the earlier generator-only `generator_test_examples.md` execution plan with a
description of the tests that exist today.

Tests fall into three layers plus a CI gate:

1. **Spec contract tests** (Python / `pytest`) — protect the golden source: the
   prose specification, scopes, schema, catalog, and published docs.
2. **Angular generator tests** (`node:test`) — protect the generator pipeline
   from input validation through Angular emission.
3. **Generated-examples app tests** (`vitest`) — protect the documentation app
   that showcases representative generator output.
4. **CI build workflow** (`.github/workflows/build.yml`) — runs the layers above
   on every code-review event, and is itself asserted by a contract test.

The layering mirrors the [golden-source boundary](GENERATOR_STRUCTURE.md#golden-source-boundary):
the spec is authoritative, the generator consumes it, and the examples app is a
downstream illustration that is never treated as generator output.

## Layer 1 — Spec contract tests (`tests/`, pytest)

Run from the repository root through the local virtual environment:

```powershell
./.venv/Scripts/python -m pytest
```

These tests read the spec sources directly and fail when the hand-authored
golden source drifts from its own rules. Each file is a `unittest.TestCase`
discovered by `pytest`.

| Test file                       | Class                            | Protects                                                                                                                                                                                                                                              |
| ------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test_openui_spec_contract.py`  | `OpenUiSpecContractTest`         | `openui.schema.json` is a valid draft 2020-12 schema; `openui.json` validates against it, uses the required root values, matches the document shape, and references scope documents that exist; `SCHEMA_VERSION` matches the grammar version pattern. |
| `test_spec_readme_spec.py`      | `SpecReadmeSpecTest`             | `spec/` contains exactly the expected Markdown set; `spec/README.md` documents the minimal contract; the scope table links every scope document; `mkdocs` navigation points at the expected spec Markdown.                                            |
| `test_scope_template.py`        | `ScopeTemplateTest`              | `spec/scopes/template.scope.md` defines every required section; the scope index points at the single template; the attribute vocabulary matches the README.                                                                                           |
| `test_scope_evidence.py`        | `ScopeEvidenceRegisterTest`      | `spec/scopes/evidence.md` covers every leaf one-to-one and every entry cites a source and citation.                                                                                                                                                   |
| `test_dialog_scope_contract.py` | `DialogScopeContractTest`        | `Widgets/dialog.scope.md` fills every template section and documents its attribute contract.                                                                                                                                                          |
| `test_table_family_contract.py` | `TableFamilyContractTest`        | The `Controls/Table` family (`table` / `tr` / `th` / `td`) carries required sections and identity, cell tags document attributes, and container tags declare child types.                                                                             |
| `test_readthedocs_config.py`    | `ReadTheDocsConfigTest`          | Read the Docs builds via the mkdocs configuration and the mkdocs nav points only to existing spec docs.                                                                                                                                               |
| `test_github_actions_build.py`  | `GitHubActionsBuildWorkflowTest` | `build.yml` runs on code-review events, runs repository checks, installs Python validation tools, runs lint and Angular-examples checks, and pins its actions.                                                                                        |

The worked example documents under `spec/examples/**` (31 schema-shaped OpenUI
documents, one per scope plus composite `scope.example.json` parents) are
currently covered for presence and indexing by `test_spec_readme_spec.py`
(`examples/README.md` is part of the expected spec set). Deep per-example schema
validation is not yet wired up; see [the gap note](#known-gaps).

Documentation validation runs alongside pytest in the same environment:

```powershell
./.venv/Scripts/pre-commit run --all-files
./.venv/Scripts/python -m mkdocs build --strict
git diff --check
```

## Layer 2 — Angular generator tests (`generators/angular/generator/`, node:test)

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

## Layer 3 — Generated-examples app tests (`generators/angular/generated-examples/`, vitest)

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

## CI gate (`.github/workflows/build.yml`)

`build.yml` runs the three layers on code-review events. `test_github_actions_build.py`
asserts the workflow keeps doing so: repository checks, Python validation tooling,
lint, Angular-examples checks, and pinned action versions. Changing the local
test commands above should be reflected in the workflow and will be caught by
that contract test if it is not.

## Conventions

- **Repo-local temporary output only.** Tests must write transient output under
  the git-ignored repository `tmp/`, never to `%TEMP%`, `/tmp`, or
  `os.tmpdir()`. This keeps generated artifacts out of the working tree and off
  the OS temp paths the repository instructions disallow.
- **Golden source is authoritative.** Layer 1 tests treat the prose spec, scopes,
  schema, and catalog as the source of truth; Layers 2 and 3 consume derived
  artifacts and must not redefine the contract.
- **No committed generator output workspaces.** Only input fixtures are committed;
  generated application workspaces are produced during test runs and discarded.

## Known gaps

- The `spec/examples/**` worked documents are validated for presence and indexing
  but not yet individually parsed against `openui.schema.json`. Adding a contract
  test that loads each `*.example.json` and validates it against the schema would
  close the loop between the examples and the catalog grammar.

## Incremental generation test strategy

Incremental generation introduces workspace reconciliation scenarios that extend
the existing Layer 2 test surface. The test fixtures under
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

| Scenario     | Fixture               | What is verified                                       |
|:-------------|:----------------------|:-------------------------------------------------------|
| From scratch | `example_from_scratch`| Empty workspace → full generated output                |
| Incremental  | `example_incremental` | Existing workspace → new component added, existing preserved |
| Match        | (same-state input)    | Re-running on matching workspace produces no changes   |
| Delete       | (future fixture)      | Removing a node from JSON removes the generated files  |

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
