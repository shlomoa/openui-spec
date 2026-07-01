# Angular Generation

This document is the single source of truth for the Angular Material Code
Generator (AMCG) architecture, code-generation pipeline, implementation
boundaries, validation strategy, and test conventions.

The roles of `input.json`, `spec/openui.schema.json`, and root `openui.json`
are defined only in
[`spec/README.md` § Specification artifacts: grammar vs. catalog](../../../../spec/README.md#specification-artifacts-grammar-vs-catalog).
This document explains how the Angular generator consumes those artifacts; it
must not redefine their contract.

The Angular generator lives in `generators/angular/generator/`. Keep it
structured as a **compiler pipeline**, not as a template script.

## Golden source boundary

The golden source for the OpenUI specification is the hand-authored prose:

- `spec/README.md` for the entry point and JSON format rules, and
- the `spec/scopes/**` Markdown scopes, authoritative for each object's
  contract.

Root `openui.json` is **generated** from that prose. It — together with
generator fixtures, generated examples, and Angular target models — is a derived
artifact that must not replace or redefine the golden source.

The repository-local converter for the generated catalog lives in
`spec/to_json/`. After changing scope prose or converter-relevant structure,
regenerate the root catalog with:

```powershell
./.venv/Scripts/python -m spec.to_json --spec-dir spec --output openui.json
```

The generated catalog keeps `attrs.scopeDocument` values relative to `spec/`,
for example `scopes/Widgets/dialog.scope.md`, so tests and tooling can resolve
them as `spec/<scopeDocument>`.

## Package overview

The repository has an Angular Material generator package:

```text
generators/angular/generator/
├─ src/main.ts
├─ src/spec/
├─ src/validation/
├─ src/ir/
├─ src/targets/angular/
├─ src/writers/
├─ src/incremental/
├─ tests/
└─ docs/
```

The Angular generator is implemented as a TypeScript compiler-style pipeline. It
must consume concrete `input.json` app documents, validate them against the
OpenUI grammar and catalog, build a UI IR, map that IR to an Angular project
model, and reconcile generated files into an existing Angular workspace.

The repository also has a Python scope catalog converter in `spec/to_json/`:

```text
spec/to_json/
├─ __init__.py
├─ __main__.py
└─ converter.py
```

The converter parses `spec/scopes/**/*.scope.md` and parent `scope.md` files into
the native OpenUI `id` / `type` / `attrs` / `children` tree. Leaf scope nodes are
metadata-only and contain one generated `<scopeId>Instance` child that carries
the object contract attributes and child model. Child-model ids are scoped by the
owning leaf when needed, so generated ids remain globally unique.

Code-generation work should extend this pipeline directly from the native OpenUI
`id` / `type` / `attrs` / `children` document model into the existing IR.
Transitional input definitions and adapters are not allowed.

## Generation pipeline

The roles of `input.json`, `spec/openui.schema.json`, and root `openui.json` are
defined once in
[`spec/README.md` § Specification artifacts: grammar vs. catalog](../../../../spec/README.md#specification-artifacts-grammar-vs-catalog).
The Angular generator consumes those artifacts according to the input, context,
and output contract in [REQUIREMENTS.md](../../../../docs/REQUIREMENTS.md) §2;
this document does not redefine either contract.

`input.json` uses the native OpenUI grammar directly; no transitional input
definitions or adapters are allowed. The required pipeline is:

```text
input.json
  ↓
validate against the OpenUI grammar and catalog
  ↓
build implementation-independent UI IR
  ↓
map to Angular project model
  ↓
emit TypeScript / HTML / SCSS / project files
  ↓
write safely
  ↓
build / test / verify
```

The parser must not feed Angular emitters directly. It should produce explicit
intermediate models:

```text
spec/README.md + spec/**/*.md + openui.json
  → golden-source validation
  → native OpenUI document model
  → UiApplication IR
  → AngularProjectModel
  → GeneratedFile[]
```

The native OpenUI document model is the only supported shape for generator input.
For generation, that document is the concrete `input.json` app description
defined by the artifact-role SSOT. Downstream generators must consume it directly
through validation, extraction, and IR construction.

## Specification and input

Do not duplicate the OpenUI artifact role definitions here. Use the canonical
definition in
[`spec/README.md` § Specification artifacts: grammar vs. catalog](../../../../spec/README.md#specification-artifacts-grammar-vs-catalog).

Test fixtures that stand in for the catalog must use the generated catalog
scope-tree shape. Fixtures that stand in for `input.json` must be valid concrete
app documents and must not need catalog traceability fields such as
`attrs.scopeDocument` on app nodes.

The native parser should read and validate the OpenUI document shape for every
input document:

- document `version`, `id`, `type`, `attrs`, and `children`,
- element id/type rules,
- `attrs` values as strings or `null`,
- parent/child relationships, and
- validation constraints documented in the spec.

Catalog-specific validation should verify catalog data derived from prose:

- scope and leaf-node identity,
- `attrs.scopeDocument` traceability,
- generated `<scopeId>Instance` nodes for leaf object contracts,
- `Pages` as the canonical page scope name, and
- current status values such as `draft`.

Concrete `input.json` validation should verify app documents against the catalog:

- node `type` values resolve to catalog vocabulary,
- attributes are legal for the referenced object contract,
- children satisfy the referenced child model, and
- concrete app nodes are not required to carry `attrs.scopeDocument`.

## Current package layout

```text
generators/angular/
├─ generator/
│  ├─ docs/
│  │  ├─ GENERATION.md
│  │  └─ TDD.md
│  ├─ src/
│  │  ├─ main.ts
│  │  ├─ spec/
│  │  │  ├─ catalog-index.ts
│  │  │  ├─ openui-sections.ts
│  │  │  ├─ openui-spec.types.ts
│  │  │  └─ load-spec.ts
│  │  ├─ validation/
│  │  │  ├─ diagnostics.ts
│  │  │  └─ validate-spec.ts
│  │  ├─ ir/
│  │  │  ├─ build-ir.ts
│  │  │  ├─ normalize-spec.ts
│  │  │  └─ ui-model.ts
│  │  ├─ targets/
│  │  │  └─ angular/
│  │  │     ├─ angular-model.ts
│  │  │     ├─ angular-paths.ts
│  │  │     ├─ emit-angular-project.ts
│  │  │     ├─ emit-component.ts
│  │  │     ├─ emit-routes.ts
│  │  │     ├─ emit-theme.ts
│  │  │     ├─ emit-utils.ts
│  │  │     ├─ import-collector.ts
│  │  │     ├─ map-to-angular.ts
│  │  │     └─ typescript-literals.ts
│  │  ├─ writers/
│  │  │  ├─ file-writer.ts
│  │  │  └─ safe-write.ts
│  │  └─ incremental/
│  │     ├─ apply.ts
│  │     ├─ classifier.ts
│  │     ├─ generate.ts
│  │     ├─ reconcile.ts
│  │     └─ workspace-index.ts
│  ├─ tests/
│  │  ├─ fixtures/
│  │  │  └─ minimal-openui.json
│  │  ├─ classifier.test.ts
│  │  ├─ incremental.test.ts
│  │  ├─ reconcile.test.ts
│  │  └─ generator.test.ts
│  ├─ package.json
│  └─ tsconfig.json
└─ generated-examples/
```

The catalog converter is outside the Angular package because it belongs to the
specification layer.

## Module responsibilities

| Module                                   | Current responsibility                                                                                                                                                                                      |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `main.ts`                                | Parses `generate` and `validate` commands, loads and validates native OpenUI JSON, emits the project, and reconciles it incrementally into the workspace.                                                   |
| `spec/load-spec.ts`                      | Reads JSON and parses it into the native OpenUI document type.                                                                                                                                              |
| `spec/openui-spec.types.ts`              | Defines the native OpenUI `id` / `type` / `attrs` / `children` input contract.                                                                                                                              |
| `spec/catalog-index.ts`                  | Builds catalog lookup structures used to validate concrete input nodes against the generated OpenUI catalog.                                                                                                |
| `spec/openui-sections.ts`                | Provides catalog helpers for scoped OpenUI nodes that carry `attrs.scopeDocument` traceability in the generated catalog tree.                                                                               |
| `validation/validate-spec.ts`            | Fails early for malformed OpenUI node data and compliance-rule synchronization gaps.                                                                                                                        |
| `validation/diagnostics.ts`              | Defines validation diagnostic and error reporting types.                                                                                                                                                    |
| `ir/normalize-spec.ts`                   | Converts native scope IDs into routes, summaries, and feature flags.                                                                                                                                        |
| `ir/build-ir.ts`                         | Builds the implementation-independent `UiApplication` model.                                                                                                                                                |
| `ir/ui-model.ts`                         | Defines implementation-independent application, page, and feature model types.                                                                                                                              |
| `targets/angular/angular-model.ts`       | Defines Angular-specific project, page, application-structure, internationalization, and extension model types.                                                                                             |
| `targets/angular/map-to-angular.ts`      | Maps `UiApplication` pages and features into an `AngularProjectModel`.                                                                                                                                      |
| `targets/angular/emit-*.ts`              | Emits Angular project files, routes, global theme styles, optional project-level support files, and standalone page component triplets.                                                                     |
| `targets/angular/angular-paths.ts`       | Centralizes the generated page directory, file, and import-path naming conventions used by the emitters.                                                                                                    |
| `targets/angular/import-collector.ts`    | Accumulates and de-duplicates Angular import symbols per module, emitting sorted `import` statements.                                                                                                       |
| `targets/angular/typescript-literals.ts` | Renders data values as TypeScript object, indented, and string-array literals for embedding in emitted source.                                                                                              |
| `targets/angular/emit-utils.ts`          | Shared HTML and TypeScript string-escaping helpers for the emitters.                                                                                                                                        |
| `writers/file-writer.ts`                 | Defines the `GeneratedFile` record shape shared by the emitters and the incremental apply layer.                                                                                                            |
| `writers/safe-write.ts`                  | Prevents path traversal by refusing to write outside the requested output directory, and prunes directories emptied by deletions.                                                                           |
| `incremental/classifier.ts`              | Indexes generated component, page, and known application-level manifestations and classifies a workspace folder/file back to the input node or application artifact that owns it.                           |
| `incremental/workspace-index.ts`         | Reads an existing workspace into a path→content index, ignoring `node_modules`/`dist`/`.git`/`.angular`; a missing directory is an empty workspace.                                                         |
| `incremental/reconcile.ts`               | Classifies emitted files against the existing workspace and plans per-file Add / Match / Modify / Delete actions for the incremental generate flow.                                                         |
| `incremental/apply.ts`                   | Applies a reconciliation plan through the guarded writer: writes Add/Modify files, removes Delete files, and leaves Match files untouched.                                                                  |
| `incremental/generate.ts`                | Orchestrates the incremental pipeline: emit, index the workspace, reconcile, and apply, degrading to generation from scratch for an empty workspace.                                                        |
| `tests/classifier.test.ts`               | Verifies the incremental classifier maps generated component fixtures, full-output routed page files, and application-level project files to the expected ownership classification.                         |
| `tests/reconcile.test.ts`                | Verifies the reconciler's Add / Match / Modify / Delete decisions against the incremental fixtures, including parent re-wiring and from-scratch.                                                            |
| `tests/incremental.test.ts`              | Verifies end-to-end incremental flow: from-scratch Add, no-op Match, Add/Delete/Modify changes, validation atomicity, ignored workspace dirs, full-output planning, and out-of-tree write/delete rejection. |
| `tests/generator.test.ts`                | Verifies CLI generation, Angular Material dependencies, routes, feature-specific page output, and compliance validation diagnostics.                                                                        |

## Core design rule

Do **not** generate Angular directly from raw `input.json` or `openui.json` nodes.

Use explicit model boundaries:

```text
input.json (validated against the catalog)
  → native OpenUI validation and extraction
  → UiApplication
  → AngularProjectModel
  → GeneratedFile[]
```

That keeps input parsing, validation, normalization, target mapping, and file
emission independently testable. It also preserves room for future targets:

```text
same OpenUI input
   ├─ Angular Material
   ├─ React
   ├─ Vue
   └─ Web Components
```

Separate these concerns:

```text
WHAT to build            → input.json (validated against the catalog) + UI IR
HOW Angular sees it      → Angular project/page model
HOW files look           → emitters
WHERE files are written  → writer
```

Avoid shortcuts that collapse these layers. For example, do not add a new OpenUI
concept by string-building Angular output directly from raw source JSON. Instead:

1. Update the golden source in `spec/README.md` and `spec/`.
2. Regenerate `openui.json` with `python -m spec.to_json`.
3. Validate the golden source, generated catalog, and schema constraints.
4. Adapt the native OpenUI source into the generator model or IR.
5. Map the IR into Angular model fields.
6. Emit files from the Angular model.
7. Add tests that verify generated TypeScript, HTML, SCSS, and diagnostics.

This distinction keeps the generator maintainable as the OpenUI specification
grows.

## Generator-specific scope-to-feature mapping

For catalog-driven page examples, `ir/normalize-spec.ts` maps selected catalog
scope IDs to `UiFeature` values. `map-to-angular.ts` then adds Angular imports,
component state, template fragments, styles, and optional project-level models.

This mapping documents the Angular generator implementation only. It must not be
used to redefine or constrain the canonical `openui.json` contract.

| Scope ID                         | Feature                 | Current Angular materialization                                                                                                      |
| -------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `application`, `shellPage`       | `application-structure` | Shell metadata, `APPLICATION_STRUCTURE`, `mat-toolbar`, `mat-sidenav-container`, navigation, `router-outlet`.                        |
| `routing`, `navigation`, `pages` | `navigation`            | Router link navigation example.                                                                                                      |
| `containers`, `grid`, `tabs`     | `layout`                | Named aggregation-backed regions, responsive grid styles, density tokens, declared CDK drag/drop only for drag/drop-enabled regions. |
| `controls`, `widgets`            | `component`             | Public metadata contract examples for properties, aggregations, associations, and events.                                            |
| `behaviors`, `dragAndDrop`       | `interaction`           | Semantic `press` activation mapped to Material button `(click)` without private DOM event plumbing.                                  |
| `views`, `reports`, `forms`      | `data-binding` / `form` | Property and aggregation binding contracts, typed async update example, and Reactive Forms materialization where applicable.         |

Future work should extend the native OpenUI extraction and IR mapping directly;
do not add adapter or compatibility shapes.

## Generated output shape

For each `generate` command, the emitter creates an Angular standalone
application skeleton:

```text
generated-angular-app/
├─ package.json
├─ angular.json
├─ tsconfig.json
└─ src/
   ├─ index.html
   ├─ main.ts
   ├─ styles.scss
   └─ app/
      ├─ app.component.ts
      ├─ app.routes.ts
      ├─ openui-i18n.service.ts
      ├─ application-structure.model.ts          conditional
      ├─ openui-extension.model.ts               conditional
      ├─ openui-extension-samples.ts             conditional
      ├─ openui-workspace-outlet.component.ts    conditional
      └─ pages/
         └─ <section-route>/
            ├─ <section-route>.page.ts
            ├─ <section-route>.page.html
            └─ <section-route>.page.scss
```

Project-level package versions are currently pinned by the emitter. As of this
revision, generated apps use Angular, Angular Material, Angular CDK, Angular CLI,
and Angular build package version `22.0.2` with TypeScript `6.0.3`.

## HTML, JS, and CSS output interpretation

If an issue asks for generated HTML, JS, and CSS, the Angular generator
equivalent is:

| Requested artifact | Angular generator artifact                                                               |
| ------------------ | ---------------------------------------------------------------------------------------- |
| HTML               | Standalone component template: `<route>.page.html`                                       |
| JS                 | TypeScript source compiled to JavaScript: `<route>.page.ts`, `main.ts`, routes, services |
| CSS                | SCSS/CSS source: `<route>.page.scss`, `src/styles.scss`                                  |

The generator should continue emitting TypeScript rather than handwritten
JavaScript because Angular source is TypeScript-first and the package already
compiles generated apps through Angular tooling.

## Incremental generation

The generator supports incremental operation as defined in
[spec/README.md § Incremental generation](../../../../spec/README.md#incremental-generation).

The generator extends the base pipeline to compare emitted files with workspace
manifestations before writing changes. This reconciliation is the default
`generate` flow — generation from scratch is simply the case where the workspace
is empty:

```text
input.json + existing workspace
  ↓
validate against the specification
  ↓
build implementation-independent UI IR
  ↓
emit the Angular files the spec describes
  ↓
index the existing workspace (path → content)
  ↓
classify + reconcile emitted files against the workspace
  ↓
determine per-file action (Add / Match / Modify / Delete)
  ↓
write added and modified files, remove deleted files, prune emptied directories
  ↓
build / test / verify
```

### Classifier

The reconciliation step is driven by the classifier in
`incremental/classifier.ts`. Given the generator's emitted model and source input
identity, it indexes each declared manifestation by its workspace footprint:

- a `ComponentTemplate` node with `attrs.selector` owns
  `src/components/<selector>/<selector>.component.{ts,html,scss}`,
- catalog-driven routed page coverage maps scoped catalog nodes with
  `attrs.scopeDocument` to the routed page files emitted from those catalog
  nodes,
  `src/app/pages/<route>/<route>.page.{ts,html,scss}`,
- explicit `PageScope` nodes remain supported for page-manifestation fixtures,
  and
- known generator-owned project files such as `package.json`, `angular.json`,
  `tsconfig.json`, `src/main.ts`, `src/index.html`, `src/styles.scss`,
  `src/app/app.component.ts`, `src/app/app.routes.ts`, and generated OpenUI
  support models/services classify as application-level artifacts.

`classifyWorkspacePath` then maps a workspace folder, file set, or single file
back to the owning input/catalog node (`id`, `type`, `selector`, `route`) or
application artifact. Artifacts the generator does not own are reported as
`unknown`. That classification is what attributes each generated file to the
input description that generated it.

### Workspace index

`incremental/workspace-index.ts` reads the existing output directory into a
`WorkspaceIndex`: a map from each workspace-relative POSIX path to its current
content. Installed packages and build output (`node_modules`, `dist`, `.git`,
`.angular`) are ignored, and a missing directory yields an empty index — the
generation-from-scratch case. Indexing the whole workspace, rather than only the
files the spec emits, is what lets the reconciler detect files that should be
deleted.

### Reconciler

`incremental/reconcile.ts` is where the classifier is consumed by the generate
flow. `reconcileGeneratedFiles` takes the files the emitters produced for a spec,
classifies each one, and compares it against the existing workspace:

- the workspace lacks the file → `add`,
- the workspace has it byte-identical → `match` (skipped, so the run is a
  no-op),
- the workspace has it but the content differs → `modify`, and
- a workspace file the spec no longer emits → `delete` (attributed, via the
  classifier, to the spec node that previously owned it).

When a `WorkspaceIndex` is supplied, the existing workspace is read once up front
and deletions are planned (`plan.toDelete`); when it is omitted, each emitted
file is read lazily from the output directory and no deletions are reported. The
plan therefore exposes `reconciled` (every Add/Match/Modify decision with its
classification), `toWrite` (the Add and Modify files), and `toDelete` (the stray
files to remove).

### Apply and orchestration

`incremental/apply.ts` applies a plan through the path-traversal-guarded writer:
it writes the `toWrite` files, removes the `toDelete` files, and leaves Match
files untouched so unchanged files keep their content and timestamps. Every
destination — writes and deletes alike — is validated before any mutation, so a
single out-of-tree path aborts the whole apply. Deleting the last file in a
component or page folder prunes the emptied directory.

`incremental/generate.ts` orchestrates the full pipeline
(`generateIncrementally`): emit the Angular files, index the workspace,
reconcile, and apply. The CLI (`main.ts`) runs this flow after validating the
spec, so `generate` adds and rewrites only what changed, removes artifacts the
spec dropped, and degrades to generation from scratch for an empty workspace.

### Test fixtures

The generator test fixtures demonstrate both scenarios:

```text
generators/angular/generator/tests/fixtures/
├─ example_from_scratch/       generation into an empty workspace
│  ├─ input_app-file-select/   input JSON only
│  └─ output_app-file-select/  expected full workspace after generation
├─ example_incremental/        generation into an existing workspace
│  ├─ input_app-file-select/   existing workspace with app-file-upload
│  └─ output_app-file-select/  workspace after adding app-file-select
└─ example_backup/             baseline workspace before any generation
```

## CLI contract

The CLI is intentionally small:

```bash
openui-angular-gen validate --input <input.json>
openui-angular-gen generate --input <input.json> --out <output-directory>
```

The generator implements the OpenUI grammar parser and Angular catalog mapping;
`spec/openui.schema.json` and root `openui.json` are not CLI inputs.

The source command implementation also accepts `--target angular`; `angular` is
the default and only supported target.

## Required concrete-input acceptance slice

The smallest useful generator slice should prove the documented `input.json`
contract end to end:

1. Keep regenerating `openui.json` from `spec/to_json` after scope changes.
2. Keep `spec/openui.schema.json` synchronized with the native `version` / `id` /
   `type` / `attrs` / `children` shape.
3. Keep Python validation that checks `openui.json`, schema rules,
   scope-document paths, converter behavior, and MkDocs navigation.
4. Validate a concrete fixture such as `dialog.example.json` against the grammar
   and catalog without adding `attrs.scopeDocument` to concrete app nodes.
5. Build an implementation-independent IR for the concrete dialog widget.
6. Map that IR into Angular Material model fields and generated files.
7. Reconcile the generated files into the dialog output workspace.
8. Add tests that assert parser output, catalog validation, IR construction,
   generated TypeScript/HTML/SCSS, diagnostics, and no-op Match behavior when
   the output workspace already matches the input description.

This keeps the work small while connecting the SSOT-defined input contract to
the existing Angular generator pipeline.

## Validation and test strategy

This section is the canonical home for Angular generator validation details,
including local commands, CI expectations, and conventions. The generated
examples app owns its app-specific validation details in
[`generators/angular/generated-examples/README.md`](../../generated-examples/README.md#validation).

Angular validation has one generator package layer plus CI integration:

1. **Angular generator tests** (`node:test`) — protect the generator pipeline
   from input validation through Angular emission.
2. **CI build workflow** (`.github/workflows/build.yml`) — runs these checks
   alongside repository validation on every code-review event.

The layering mirrors the [golden-source boundary](#golden-source-boundary): the
spec is authoritative, the generator consumes concrete `input.json` app
documents validated against the grammar and catalog defined by the SSOT, and the
examples app is a downstream documentation app that is never treated as
generator output. For generated-examples commands and vitest coverage, use the
[generated examples README](../../generated-examples/README.md#validation) as
the SSOT.

### Layer 1 — Angular generator tests (`generators/angular/generator/`, node:test)

Run from the generator package:

```powershell
Push-Location generators/angular/generator
npm run test
Pop-Location
```

`npm run test` compiles TypeScript first and then runs the Node test suite from
`dist/tests/*.test.js`. Existing tests include catalog/scope-tree regression
coverage against the committed `tests/fixtures/minimal-openui.json` catalog
fixture. Those tests protect the current catalog-driven page-generation slice;
they do not define the full generator input contract.

The generator input contract is the concrete `input.json` role defined in
[`spec/README.md` § Specification artifacts: grammar vs. catalog](../../../../spec/README.md#specification-artifacts-grammar-vs-catalog).
Concrete input fixtures must validate against the grammar and catalog without
requiring catalog traceability fields such as `attrs.scopeDocument` on app nodes.

Current catalog/scope-tree regression coverage:

| Test                                                                          | Verifies                                                                                                                                                                          |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| classifies every generated full-output page and application file              | The classifier maps generated routed page files to catalog scoped OpenUI nodes and project files to application-level ownership.                                                  |
| classifies every generated component folder and file in the fixture workspace | Component-template fixture folders and generated component files classify back to their owning selectors.                                                                         |
| builds the UI model from catalog scope-tree OpenUI nodes                      | `buildUiModel` produces the expected `UiApplication` name, version, and ordered pages for catalog regression coverage.                                                            |
| generates an Angular Material standalone app from catalog scope-tree OpenUI   | The `generate` CLI emits the expected Angular project skeleton and Angular Material dependencies for catalog regression coverage.                                                 |
| generates scope-specific Angular Material details from the catalog tree       | Feature-specific page output (structure, layout, i18n, extension, etc.) is emitted per catalog scope.                                                                             |
| validates canonical root values, attrs, and scoped document uniqueness        | `validateOpenUiSpec` raises `SpecValidationError` for malformed root values and duplicate scopes.                                                                                 |
| full-pipeline incremental acceptance scenarios                                | `generateIncrementally` covers from-scratch Add, no-op Match, incremental Add/Delete/Modify, validation atomicity, ignored workspace directories, and direct comparator planning. |

Required concrete `input.json` acceptance coverage:

| Acceptance target                                                    | Must verify                                                                                                                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| validates concrete app fixtures against grammar and catalog          | Concrete fixtures such as `dialog.example.json` are accepted without adding `attrs.scopeDocument` to app nodes.                                              |
| builds IR from concrete app documents                                | The IR represents concrete widgets/components, their attributes, child regions, behavior, and source input identity.                                         |
| maps concrete widgets to Angular Material                            | Dialog-like fixtures map to Angular Material components, templates, styles, host wiring, and required imports.                                               |
| reconciles concrete generated output incrementally                   | Re-running generation against an already matching output workspace produces Match/no-op behavior without timestamp churn.                                    |
| preserves evidence for unsupported paths until implementation exists | Fixture notes such as `output_generation.md` keep observed failure commands/messages until the corresponding generator support is implemented and validated. |

Generator tests write output only to the repo-local, git-ignored `tmp/`
directory (via `mkdtemp` under the repository root) — never to OS temp
directories.

### CI integration (`.github/workflows/build.yml`)

`build.yml` runs the Angular generator and generated-examples checks alongside
repository Python and documentation validation on code-review events. The root
contract test (`tests/test_github_actions_build.py`) asserts the workflow keeps
running Angular-generator checks, Angular-examples checks, lint/format checks,
strict MkDocs builds, and pinned action versions. Changing the local test
commands here or in the
[generated examples README](../../generated-examples/README.md#validation) should
be reflected in the workflow and will be caught by that contract test if it is
not.

### Test conventions

- **Repo-local temporary output only.** Tests must write transient output under
  the git-ignored repository `tmp/`, never to `%TEMP%`, `/tmp`, or `os.tmpdir()`.
  This keeps generated artifacts out of the working tree and off the OS temp
  paths the repository instructions disallow.
- **Inspectable generated output.** Set `OPENUI_KEEP_TEST_OUTPUT=1` before
  running generator tests to preserve temporary output under `tmp/`; the test
  run logs each kept directory path.
- **Golden source is authoritative.** Generator tests consume derived artifacts
  and must not redefine the prose spec, scopes, schema, or catalog contract.
- **Committed fixtures are expectations, not generated examples.** Fixture trees
  may include both input workspaces/specifications and expected output
  workspaces. Tests copy or compare those fixtures, but transient generator runs
  still write only under the repo-local, git-ignored `tmp/` directory.

### Incremental generation test strategy

Incremental generation (defined in
[spec/README.md § Incremental generation](../../../../spec/README.md#incremental-generation))
is covered by both committed input/expected-output fixtures and runtime
workspace mutations under `tmp/`. The fixtures under
`generators/angular/generator/tests/fixtures/` capture reusable baseline states.

#### Fixture layout

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

#### Scenarios to test

| Scenario               | Fixture / setup        | What is verified                                                                           |
| :--------------------- | :--------------------- | :----------------------------------------------------------------------------------------- |
| From scratch           | `example_from_scratch` | Empty workspace → full generated output                                                    |
| Incremental            | `example_incremental`  | Existing workspace → new component added, affected parent files rewired                    |
| Match                  | same-state input       | Re-running on matching workspace produces no changes or timestamp churn                    |
| Add                    | runtime temp workspace | New input children add only their generated files plus required wiring changes             |
| Delete one child       | runtime temp workspace | Removed input children delete generated files, prune empty dirs, and rewire refs           |
| Delete empty spec      | runtime temp workspace | Valid empty root removes previously generated owned child/page artifacts                   |
| Rename                 | runtime temp workspace | Route/name changes delete the old path, add the new path, and update parents               |
| Complex modification   | runtime temp workspace | Content-only spec changes modify affected files while siblings match                       |
| Validation atomicity   | runtime temp workspace | Invalid root/no-root input fails before touching the existing workspace                    |
| Ignored directories    | runtime temp workspace | `node_modules`, `dist`, `.git`, and `.angular` are neither indexed nor deleted             |
| Comparator/reconciler  | runtime temp workspace | Direct planning reports Add / Match / Modify / Delete and classifications without applying |
| Classifier full output | emitted full output    | Generated page/component files and application files classify as documented                |

#### Expected test assertions

- **Add**: new component files exist in the output workspace; parent references
  (imports, routes) include the new component.
- **Delete**: component files are absent from output; parent references no longer
  reference the deleted component.
- **Modify**: renamed or changed attributes produce updated file contents.
- **Match**: workspace files remain byte-identical when the specification has not
  changed.
- **Unaffected content preserved**: files that already match the desired output
  remain byte-identical and are not rewritten.
- **Atomic validation**: malformed input stops before index/reconcile/apply and
  leaves the existing workspace byte-identical.
- **Classifier attribution**: generated page/component files classify to the
  owning spec node, and known project-level generator files classify as
  application artifacts.
- **Comparator-only planning**: direct reconciler tests inspect the plan before
  applying it so Add / Match / Modify / Delete decisions are observable without
  mutating the workspace.

#### Specification-driven validation matrix

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

## Validation commands

Run generator package validation from `generators/angular/generator/`:

```powershell
Push-Location generators/angular/generator
npm run test
Pop-Location
```

That script runs TypeScript compilation first and then the Node test suite from
`dist/tests/*.test.js`.

Validate the generated-examples documentation app separately with the commands
documented in
[`generators/angular/generated-examples/README.md`](../../generated-examples/README.md#validation).

Run repository Python and documentation validation through the local `.venv`:

```powershell
./.venv/Scripts/python -m unittest discover -s tests
./.venv/Scripts/python -m ruff check .
./.venv/Scripts/python -m ruff format --check .
git diff --check
```

## Guardrails

- Do not treat generator fixtures or root `openui.json` as hand-authored source.
- Do not hand-edit generated catalog changes; update scope prose or converter
  logic, then rerun `python -m spec.to_json`.
- Do not generate Angular files directly from raw `openui.json` or `input.json`
  nodes.
- Do not bypass the golden source → native extraction → IR → Angular model →
  files separation.
- Do not write generated files outside the selected output directory; use the
  existing safe writer.
- Do not add a new target before the Angular pipeline has golden-source-backed
  fixtures and validation tests.
