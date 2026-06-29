# Angular Generator Structure

The Angular generator lives in `generators/angular/generator/`. Keep it structured
as a **compiler pipeline**, not as a template script.

## Golden source boundary

The golden source for the OpenUI specification is the hand-authored prose:

- `spec/README.md` for the entry point and format rules, and
- the `spec/scopes/**` Markdown scopes (authoritative for each object's contract).

Root `openui.json` is **generated** from that prose. It — together with generator
fixtures, generated examples, and Angular target models — is a derived artifact
that must not replace or redefine the golden source.

The repository-local converter for the generated catalog lives in `spec/to_json/`.
After changing scope prose or converter-relevant structure, regenerate the root
catalog with:

```powershell
./.venv/Scripts/python -m spec.to_json --spec-dir spec --output openui.json
```

The Angular generator's runtime input is an `input.json` UI description authored
against the OpenUI specification; the specification itself — root `openui.json`
(catalog), `spec/openui.schema.json` (grammar), and the `spec/**/*.md` prose — is
the rule set the generator validates and interprets that input against. See
[REQUIREMENTS.md](REQUIREMENTS.md) §1–§2 for the authoritative input, context, and
output contract; this document does not redefine it.

`input.json` uses the native OpenUI grammar directly; no transitional input
definitions or adapters are allowed. The required pipeline is:

```text
input.json
  ↓
validate against the specification (openui.json + openui.schema.json + spec/**/*.md)
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

For the initial golden-source population plan, see
`initial_spec_population.md`.

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
│  │  └─ writers/
│  │     ├─ file-writer.ts
│  │     └─ safe-write.ts
│  ├─ tests/
│  │  ├─ fixtures/
│  │  │  └─ minimal-openui.json
│  │  └─ generator.test.ts
│  ├─ package.json
│  └─ tsconfig.json
└─ generated-examples/
```

The catalog converter is outside the Angular package because it belongs to the
specification layer:

```text
spec/to_json/
├─ __init__.py
├─ __main__.py
└─ converter.py
```

## Module responsibilities

| Module                                   | Current responsibility                                                                                                                  |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `cli/main.ts`                            | Parses `generate` and `validate` commands, loads native OpenUI JSON, validates it, and orchestrates generation.                         |
| `spec/load-spec.ts`                      | Reads JSON and parses it into the native OpenUI document type.                                                                          |
| `spec/openui-spec.types.ts`              | Defines the native OpenUI `id` / `type` / `attrs` / `children` input contract.                                                          |
| `spec/openui-sections.ts`                | Extracts scoped OpenUI nodes that carry `attrs.scopeDocument` traceability from the canonical scope tree.                               |
| `validation/validate-spec.ts`            | Fails early for malformed OpenUI node data and compliance-rule synchronization gaps.                                                    |
| `ir/normalize-spec.ts`                   | Converts native scope IDs into routes, summaries, and feature flags.                                                                    |
| `ir/build-ir.ts`                         | Builds the implementation-independent `UiApplication` model.                                                                            |
| `targets/angular/angular-model.ts`       | Defines Angular-specific project, page, application-structure, internationalization, and extension model types.                         |
| `targets/angular/map-to-angular.ts`      | Maps `UiApplication` pages and features into an `AngularProjectModel`.                                                                  |
| `targets/angular/emit-*.ts`              | Emits Angular project files, routes, global theme styles, optional project-level support files, and standalone page component triplets. |
| `targets/angular/angular-paths.ts`       | Centralizes the generated page directory, file, and import-path naming conventions used by the emitters.                                |
| `targets/angular/import-collector.ts`    | Accumulates and de-duplicates Angular import symbols per module, emitting sorted `import` statements.                                   |
| `targets/angular/typescript-literals.ts` | Renders data values as TypeScript object, indented, and string-array literals for embedding in emitted source.                          |
| `targets/angular/emit-utils.ts`          | Shared HTML and TypeScript string-escaping helpers for the emitters.                                                                    |
| `writers/file-writer.ts`                 | Writes generated file records.                                                                                                          |
| `writers/safe-write.ts`                  | Prevents path traversal by refusing to write outside the requested output directory.                                                    |
| `tests/generator.test.ts`                | Verifies CLI generation, Angular Material dependencies, routes, feature-specific page output, and compliance validation diagnostics.    |

## Core design rule

Do **not** generate Angular directly from raw `input.json` nodes.

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

## Specification and input

The generator's runtime input is an `input.json` document; the OpenUI
specification is the rule set it is validated and interpreted against. See
[REQUIREMENTS.md](REQUIREMENTS.md) §1–§2 for the authoritative definitions — this
document does not redefine them. For the generator's purposes:

- **Catalog** — root `openui.json`. Its root `id` is `root` and `version` is
  required (its current value is tracked by the repository-root `SCHEMA_VERSION`
  file); the root `type` follows the general type rules and is not pinned. See
  `spec/README.md` and `openui.schema.json` for the authoritative root contract.

  Scope coverage is represented by native OpenUI nodes whose `attrs.scopeDocument`
  values are relative to `spec/`, for example `scopes/Widgets/dialog.scope.md`.
  Scope nodes are metadata-only; each scope's object contract is carried by a
  single typed instance child (`<scopeId>Instance`) that has no `scopeDocument`.
  Generated child-model ids are scoped by the owning leaf when needed so ids stay
  globally unique. See `spec/scopes/scope.md` for the serialization rule.

- **Input** — an `input.json` authored against the catalog: a well-formed OpenUI
  document (per `openui.schema.json`) whose every `type` is a real catalog object
  used in a legal place.

Test fixtures that stand in for the catalog must use this scope-tree shape;
fixtures that stand in for `input.json` must be valid input documents.

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
revision, generated apps use Angular, Angular Material, Angular CDK, Angular
CLI, and Angular build package version `22.0.2` with TypeScript `6.0.3`.

## Incremental generation

The generator supports incremental operation as defined in
[spec/README.md § Incremental generation](../spec/README.md#incremental-generation).

The generator extends the base pipeline to compare IR nodes with workspace
manifestations before emitting changes:

```text
input.json + existing workspace
  ↓
validate against the specification
  ↓
build implementation-independent UI IR
  ↓
compare IR nodes with workspace manifestations
  ↓
determine per-node action (Add / Delete / Modify / Match)
  ↓
apply changes to workspace
  ↓
build / test / verify
```

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
openui-angular-gen validate --spec <spec.json>
openui-angular-gen generate --spec <spec.json> --out <output-directory>
```

The source command implementation also accepts `--target angular`; `angular` is
the default and only supported target.

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

## Implementation principles

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
