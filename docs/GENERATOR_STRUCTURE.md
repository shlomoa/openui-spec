# Angular Generator Structure

The Angular generator lives in `generators/angular/`. Keep it structured as a
**compiler pipeline**, not as a template script.

## Golden source boundary

The golden source for the OpenUI specification is:

- `spec/README.md` for the prose entry point and format rules,
- the Markdown files under `spec/` for the synchronized prose scopes, and
- root `openui.json` for the canonical machine-readable representation.

Generator fixtures, generated examples, and Angular target models are derived
artifacts. They must not replace or redefine the golden source.

The Angular generator consumes the native `openui.json` shape directly. No
transitional input definitions or adapters are allowed. The required pipeline is:

```text
spec/README.md + spec/**/*.md + openui.json
  ↓
validate golden source
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
├─ src/
│  ├─ cli/
│  │  └─ main.ts
│  ├─ spec/
│  │  ├─ openui-sections.ts
│  │  ├─ openui-spec.types.ts
│  │  └─ load-spec.ts
│  ├─ validation/
│  │  ├─ diagnostics.ts
│  │  └─ validate-spec.ts
│  ├─ ir/
│  │  ├─ build-ir.ts
│  │  ├─ normalize-spec.ts
│  │  └─ ui-model.ts
│  ├─ targets/
│  │  └─ angular/
│  │     ├─ angular-model.ts
│  │     ├─ emit-angular-project.ts
│  │     ├─ emit-component.ts
│  │     ├─ emit-routes.ts
│  │     ├─ emit-theme.ts
│  │     └─ map-to-angular.ts
│  └─ writers/
│     ├─ file-writer.ts
│     └─ safe-write.ts
├─ tests/
│  ├─ fixtures/
│  │  └─ minimal-openui.json
│  └─ generator.test.ts
├─ generated-examples/
├─ package.json
└─ tsconfig.json
```

## Module responsibilities

| Module                              | Current responsibility                                                                                                                  |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `cli/main.ts`                       | Parses `generate` and `validate` commands, loads native OpenUI JSON, validates it, and orchestrates generation.                         |
| `spec/load-spec.ts`                 | Reads JSON and parses it into the native OpenUI document type.                                                                          |
| `spec/openui-spec.types.ts`         | Defines the native OpenUI `id` / `type` / `attrs` / `children` input contract.                                                          |
| `spec/openui-sections.ts`           | Extracts scoped OpenUI nodes that carry `attrs.scopeDocument` traceability from the canonical scope tree.                               |
| `validation/validate-spec.ts`       | Fails early for malformed OpenUI node data and compliance-rule synchronization gaps.                                                    |
| `ir/normalize-spec.ts`              | Converts native scope IDs into routes, summaries, and feature flags.                                                                    |
| `ir/build-ir.ts`                    | Builds the implementation-independent `UiApplication` model.                                                                            |
| `targets/angular/angular-model.ts`  | Defines Angular-specific project, page, application-structure, internationalization, and extension model types.                         |
| `targets/angular/map-to-angular.ts` | Maps `UiApplication` pages and features into an `AngularProjectModel`.                                                                  |
| `targets/angular/emit-*.ts`         | Emits Angular project files, routes, global theme styles, optional project-level support files, and standalone page component triplets. |
| `writers/file-writer.ts`            | Writes generated file records.                                                                                                          |
| `writers/safe-write.ts`             | Prevents path traversal by refusing to write outside the requested output directory.                                                    |
| `tests/generator.test.ts`           | Verifies CLI generation, Angular Material dependencies, routes, feature-specific page output, and compliance validation diagnostics.    |

## Core design rule

Do **not** generate Angular directly from raw `openui.json` nodes.

Use explicit model boundaries:

```text
Golden OpenUI source
  → native OpenUI validation and extraction
  → UiApplication
  → AngularProjectModel
  → GeneratedFile[]
```

That keeps source parsing, validation, normalization, target mapping, and file
emission independently testable. It also preserves room for future targets:

```text
same OpenUI specification
   ├─ Angular Material
   ├─ React
   ├─ Vue
   └─ Web Components
```

## Canonical input model

The canonical repository input is root `openui.json` plus synchronized Markdown
under `spec/`. The repository root document uses exact root values:

```text
id: "root"
type: "html"
version: "0.0.1"
```

Scope coverage is represented by native OpenUI nodes whose `attrs.scopeDocument`
values point to Markdown files under `spec/`, including the scope documents under
`spec/scopes/`. Generator fixtures must use this same scope-tree shape.

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

## CLI contract

The CLI is intentionally small:

```bash
openui-angular-gen validate --spec <spec.json>
openui-angular-gen generate --spec <spec.json> --out <output-directory>
```

The source command implementation also accepts `--target angular`; `angular` is
the default and only supported target.

## Validation and tests

Run generator package validation from `generators/angular/`:

```powershell
Push-Location generators/angular
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
./.venv/Scripts/python -m pytest
./.venv/Scripts/pre-commit run --all-files
./.venv/Scripts/python -m mkdocs build --strict
git diff --check
```

## Implementation principles

Separate these concerns:

```text
WHAT exists              → golden source + UI IR
HOW Angular sees it      → Angular project/page model
HOW files look           → emitters
WHERE files are written  → writer
```

Avoid shortcuts that collapse these layers. For example, do not add a new
OpenUI concept by string-building Angular output directly from raw source JSON.
Instead:

1. Update the golden source in `spec/README.md`, `spec/`, and `openui.json`.
2. Validate the golden source and schema constraints.
3. Adapt the native OpenUI source into the generator model or IR.
4. Map the IR into Angular model fields.
5. Emit files from the Angular model.
6. Add tests that verify generated TypeScript, HTML, SCSS, and diagnostics.

This distinction keeps the generator maintainable as the OpenUI specification
grows.
