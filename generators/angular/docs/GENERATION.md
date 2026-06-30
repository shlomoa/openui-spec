# Angular Generation

This document describes how repository-local OpenUI specification artifacts become
Angular generator input and, eventually, generated Angular files. It is the
single source of truth for the Angular generator architecture, code-generation
pipeline, implementation guardrails, and validation commands.

The Angular generator lives in `generators/angular/generator/`. Keep it structured
as a **compiler pipeline**, not as a template script.

## Golden source boundary

The golden source for the OpenUI specification is the hand-authored prose:

- `spec/README.md` for the entry point and JSON format rules, and
- the `spec/scopes/**` Markdown scopes, authoritative for each object's contract.

Root `openui.json` is **generated** from that prose. It — together with generator
fixtures, generated examples, and Angular target models — is a derived artifact
that must not replace or redefine the golden source.

The repository-local converter for the generated catalog lives in `spec/to_json/`.
After changing scope prose or converter-relevant structure, regenerate the root
catalog with:

```powershell
./.venv/Scripts/python -m spec.to_json --spec-dir spec --output openui.json
```

The generated catalog keeps `attrs.scopeDocument` values relative to `spec/`, for
example `scopes/Widgets/dialog.scope.md`, so tests and tooling can resolve them
as `spec/<scopeDocument>`.

## Current status

The repository has an initial Angular Material generator:

```text
generators/angular/generator/
├─ src/cli/main.ts
├─ src/spec/
├─ src/validation/
├─ src/ir/
├─ src/targets/angular/
├─ src/writers/
├─ src/incremental/
└─ tests/
```

The implemented generator consumes the native OpenUI scope-tree shape in
`generators/angular/generator/tests/fixtures/minimal-openui.json`, validates it,
builds a UI IR, maps it to an Angular project model, and emits a standalone
Angular Material application skeleton.

The repository also has a Python scope catalog converter in `spec/to_json/`:

```text
spec/to_json/
├─ __init__.py
├─ __main__.py
└─ converter.py
```

The converter parses `spec/scopes/**/*.scope.md` and parent `scope.md` files into
the native OpenUI `id` / `type` / `attrs` / `children` tree. Leaf scope nodes are
metadata-only and contain one generated `<scopeId>Instance` child that carries the
object contract attributes and child model. Child-model ids are scoped by the
owning leaf when needed, so generated ids remain globally unique.

Future code-generation work should extend this pipeline directly from native
OpenUI nodes into the existing IR. Transitional input definitions and adapters
are not allowed.

## Generation pipeline

The roles of `input.json`, `spec/openui.schema.json`, and root `openui.json` are
defined once in
[`spec/README.md` § Specification artifacts: grammar vs. catalog](../../../spec/README.md#specification-artifacts-grammar-vs-catalog).
The Angular generator consumes those artifacts according to the input, context,
and output contract in [REQUIREMENTS.md](../../../docs/REQUIREMENTS.md) §2; this
document does not redefine either contract.

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

The native OpenUI document model is the only supported generator input shape.
Downstream generators must consume it directly through validation, extraction,
and IR construction.

## Specification and input

Do not duplicate the OpenUI artifact role definitions here. Use the canonical
definition in
[`spec/README.md` § Specification artifacts: grammar vs. catalog](../../../spec/README.md#specification-artifacts-grammar-vs-catalog).

Test fixtures that stand in for the catalog must use this scope-tree shape;
fixtures that stand in for `input.json` must be valid input documents.

The native parser and catalog converter should read or verify:

- document `version`, `id`, `type`, `attrs`, and `children`,
- scope and leaf-node identity,
- `attrs.scopeDocument` traceability,
- generated `<scopeId>Instance` nodes for leaf object contracts,
- `Pages` as the canonical page scope name,
- current status values such as `draft`,
- parent/child relationships, and
- validation constraints documented in the spec.

## Current package layout

```text
generators/angular/
├─ generator/
│  ├─ src/
│  │  ├─ cli/
│  │  │  └─ main.ts
│  │  ├─ spec/
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

| Module                                   | Current responsibility                                                                                                                                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cli/main.ts`                            | Parses `generate` and `validate` commands, loads and validates native OpenUI JSON, emits the project, and reconciles it incrementally into the workspace.                                     |
| `spec/load-spec.ts`                      | Reads JSON and parses it into the native OpenUI document type.                                                                                                                                |
| `spec/openui-spec.types.ts`              | Defines the native OpenUI `id` / `type` / `attrs` / `children` input contract.                                                                                                                |
| `spec/openui-sections.ts`                | Extracts scoped OpenUI nodes that carry `attrs.scopeDocument` traceability from the canonical scope tree.                                                                                     |
| `validation/validate-spec.ts`            | Fails early for malformed OpenUI node data and compliance-rule synchronization gaps.                                                                                                          |
| `validation/diagnostics.ts`              | Defines validation diagnostic and error reporting types.                                                                                                                                      |
| `ir/normalize-spec.ts`                   | Converts native scope IDs into routes, summaries, and feature flags.                                                                                                                          |
| `ir/build-ir.ts`                         | Builds the implementation-independent `UiApplication` model.                                                                                                                                  |
| `ir/ui-model.ts`                         | Defines implementation-independent application, page, and feature model types.                                                                                                                |
| `targets/angular/angular-model.ts`       | Defines Angular-specific project, page, application-structure, internationalization, and extension model types.                                                                               |
| `targets/angular/map-to-angular.ts`      | Maps `UiApplication` pages and features into an `AngularProjectModel`.                                                                                                                        |
| `targets/angular/emit-*.ts`              | Emits Angular project files, routes, global theme styles, optional project-level support files, and standalone page component triplets.                                                       |
| `targets/angular/angular-paths.ts`       | Centralizes the generated page directory, file, and import-path naming conventions used by the emitters.                                                                                      |
| `targets/angular/import-collector.ts`    | Accumulates and de-duplicates Angular import symbols per module, emitting sorted `import` statements.                                                                                         |
| `targets/angular/typescript-literals.ts` | Renders data values as TypeScript object, indented, and string-array literals for embedding in emitted source.                                                                                |
| `targets/angular/emit-utils.ts`          | Shared HTML and TypeScript string-escaping helpers for the emitters.                                                                                                                          |
| `writers/file-writer.ts`                 | Defines the `GeneratedFile` record shape shared by the emitters and the incremental apply layer.                                                                                              |
| `writers/safe-write.ts`                  | Prevents path traversal by refusing to write outside the requested output directory, and prunes directories emptied by deletions.                                                             |
| `incremental/classifier.ts`              | Indexes an input document's component and page manifestations and classifies a workspace folder/file back to the spec node that owns it.                                                      |
| `incremental/workspace-index.ts`         | Reads an existing workspace into a path→content index, ignoring `node_modules`/`dist`/`.git`/`.angular`; a missing directory is an empty workspace.                                           |
| `incremental/reconcile.ts`               | Classifies emitted files against the existing workspace and plans per-file Add / Match / Modify / Delete actions for the incremental generate flow.                                           |
| `incremental/apply.ts`                   | Applies a reconciliation plan through the guarded writer: writes Add/Modify files, removes Delete files, and leaves Match files untouched.                                                    |
| `incremental/generate.ts`                | Orchestrates the incremental pipeline: emit, index the workspace, reconcile, and apply, degrading to generation from scratch for an empty workspace.                                          |
| `tests/classifier.test.ts`               | Verifies the incremental classifier maps fixture workspace artifacts back to their spec nodes.                                                                                                |
| `tests/reconcile.test.ts`                | Verifies the reconciler's Add / Match / Modify decisions against the incremental fixtures, including parent re-wiring and from-scratch.                                                       |
| `tests/incremental.test.ts`              | Verifies the end-to-end incremental flow over the scope-tree fixture: from-scratch Add, no-op Match, Delete with directory pruning, selective Modify, and out-of-tree write/delete rejection. |
| `tests/generator.test.ts`                | Verifies CLI generation, Angular Material dependencies, routes, feature-specific page output, and compliance validation diagnostics.                                                          |

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

Avoid shortcuts that collapse these layers. For example, do not add a new
OpenUI concept by string-building Angular output directly from raw source JSON.
Instead:

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

For scoped OpenUI records, `ir/normalize-spec.ts` maps selected scope IDs to
`UiFeature` values. `map-to-angular.ts` then adds Angular imports, component
state, template fragments, styles, and optional project-level models.

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
[spec/README.md § Incremental generation](../../../spec/README.md#incremental-generation).

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
`incremental/classifier.ts`. Given an `input.json` document, it indexes each
declared manifestation by its workspace footprint:

- a `ComponentTemplate` node with `attrs.selector` owns
  `src/components/<selector>/<selector>.component.{ts,html,scss}`, and
- a page scope (route) owns `src/app/pages/<route>/<route>.page.{ts,html,scss}`.

`classifyWorkspacePath` then maps a workspace folder, file set, or single file
back to the owning spec node (`id`, `type`, `selector`, `route`). Artifacts the
spec does not own are reported as `unknown`, and the workspace `src` root is
reported as `application`. That classification is what attributes each generated
file to "the spec that generated this part".

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
- the workspace has it byte-identical → `match` (skipped, so the run is a no-op),
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
reconcile, and apply. The CLI (`cli/main.ts`) runs this flow after validating the
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

## Recommended next implementation slice

The smallest useful golden-source-to-generator slice is:

1. Keep regenerating `openui.json` from `spec/to_json` after scope changes.
2. Keep `spec/openui.schema.json` synchronized with the native `version` / `id` /
   `type` / `attrs` / `children` shape.
3. Keep Python validation that checks `openui.json`, schema rules, scope document
   paths, converter behavior, and MkDocs navigation.
4. Map at least one native scope/page node directly into `UiApplication`.
5. Generate one Angular Material page/component triplet from that IR model:
   - `.page.ts` for behavior and typed state,
   - `.page.html` for Material-backed template structure,
   - `.page.scss` for token-backed styling.
6. Add tests that assert parser output, native extraction behavior, diagnostics,
   and generated Angular files.

This keeps the work small while connecting the golden source to the existing
Angular generator pipeline.

## Validation and tests

Run generator package validation from `generators/angular/generator/`:

```powershell
Push-Location generators/angular/generator
npm run test
Pop-Location
```

That script runs TypeScript compilation first and then the Node test suite from
`dist/tests/*.test.js`.

Validate generated example applications separately:

```powershell
Push-Location generators/angular/generated-examples
npm run build
npm run test
Pop-Location
```

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
- Do not bypass the golden source → native extraction → IR → Angular model → files
  separation.
- Do not write generated files outside the selected output directory; use the
  existing safe writer.
- Do not add a new target before the Angular pipeline has golden-source-backed
  fixtures and validation tests.

## Final conclusion

- **Golden source:** `spec/README.md` and Markdown under `spec/`; root
  `openui.json` is generated from that source.
- **Immediate parser starting point:** native OpenUI `id` / `type` / `attrs` /
  `children` records from `openui.json` plus scope-document traceability.
- **Generator bridge:** direct native OpenUI extraction into `UiApplication`.
- **Generator starting point:** the existing Angular IR-to-emitter pipeline in
  `generators/angular/generator/`.
- **Next practical output:** golden-source-backed generation of one Angular
  Material component/page triplet with tests for parsed metadata, diagnostics,
  and emitted TypeScript/HTML/SCSS.
