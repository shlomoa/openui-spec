# Angular Generator Structure

The Angular generator is implemented in `generators/angular/`. Keep it structured as a **compiler pipeline**, not as a template script.

```text
OpenUI specification JSON
  ↓
Load
  ↓
Validate
  ↓
Normalize
  ↓
Build implementation-independent UI IR
  ↓
Map to Angular project model
  ↓
Emit TypeScript / HTML / SCSS / project files
  ↓
Write safely
  ↓
Build / test / verify
```

## Current package layout

```text
generators/angular/
├─ src/
│  ├─ cli/
│  │  └─ main.ts
│  ├─ spec/
│  │  ├─ framework-spec.types.ts
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

| Module | Current responsibility |
| --- | --- |
| `cli/main.ts` | Parses `generate` and `validate` commands, loads the spec, validates it, and orchestrates generation. |
| `spec/load-spec.ts` | Reads an OpenUI JSON document and parses it into `FrameworkSpecDocument`. |
| `spec/framework-spec.types.ts` | Defines the current input contract: `specification`, `sections`, optional traversal evidence, requirements, tags, definitions, and examples. |
| `validation/validate-spec.ts` | Fails early for malformed section data and compliance-rule synchronization gaps. |
| `ir/normalize-spec.ts` | Converts section IDs into routes, summaries, and feature flags. |
| `ir/build-ir.ts` | Builds the implementation-independent `UiApplication` model. |
| `targets/angular/angular-model.ts` | Defines Angular-specific project, page, application-structure, internationalization, and extension model types. |
| `targets/angular/map-to-angular.ts` | Maps `UiApplication` pages and features into an `AngularProjectModel`. |
| `targets/angular/emit-*.ts` | Emits Angular project files, routes, global theme styles, and standalone page component triplets. |
| `writers/file-writer.ts` | Writes generated file records. |
| `writers/safe-write.ts` | Prevents path traversal by refusing to write outside the requested output directory. |
| `tests/generator.test.ts` | Verifies CLI generation, generated Angular Material dependencies, routes, feature-specific page output, and compliance validation diagnostics. |

## Core design rule

Do **not** generate Angular directly from raw specification sections.

Use the current model sequence:

```text
FrameworkSpecDocument → UiApplication → AngularProjectModel → GeneratedFile[]
```

That keeps source parsing, normalization, target mapping, and file emission independently testable. It also preserves room for future targets:

```text
same OpenUI specification
   ├─ Angular Material
   ├─ React
   ├─ Vue
   └─ Web Components
```

## Current input model

The generator currently consumes JSON shaped like `tests/fixtures/minimal-openui.json`:

```text
specification
├─ id / name / version
├─ traversal.nodes[]                 optional compliance evidence
└─ sections[]
   ├─ id                             required
   ├─ title                          required
   ├─ purpose                        used as page summary
   ├─ document                       used for traceability
   ├─ requirements[]                 rendered as page requirements
   ├─ tags[]                         used by compliance validation
   ├─ formalDefinitions[]            used by component-contract examples
   ├─ implementationNotes[]          used by compliance validation
   └─ examples[]                     used by compliance validation
```

The repository root `openui.json` is intended to be the canonical machine-readable specification, but generator tests should use focused fixtures so they remain deterministic.

## Current feature mapping

`ir/normalize-spec.ts` maps specification section IDs to `UiFeature` values. `map-to-angular.ts` then adds Angular imports, component state, template fragments, styles, and optional project-level models.

| Section ID | Feature | Current Angular materialization |
| --- | --- | --- |
| `05-ui-concept-model` | `ui-concept` | Control/element concept chips, regions, actions, aggregation/association examples. |
| `06-application-structure` | `application-structure` | Shell metadata, `APPLICATION_STRUCTURE`, `mat-toolbar`, `mat-sidenav-container`, navigation, `router-outlet`. |
| `07-layout-system` | `layout` | Named aggregation-backed regions, responsive grid styles, density tokens, declared CDK drag/drop only for drag/drop-enabled regions. |
| `08-component-model` | `component` | Public metadata contract examples for properties, aggregations, associations, and events. |
| `09-interaction-model` | `interaction` | Semantic `press` activation mapped to Material button `(click)` without private DOM event plumbing. |
| `10-state-model` | `state-model` | Angular signal inputs, default values, hidden-state exclusion, derived state compatibility. |
| `11-data-binding-model` | `data-binding` | Property and aggregation binding contracts, typed async update example, hidden/non-bindable filtering. |
| `12-form-model` | `form` | Reactive Forms import, `FormControl`, Material form field and input. |
| `13-navigation-model` | `navigation` | Router link navigation example. |
| `14-feedback-model` | `feedback` | Material snackbar action. |
| `15-accessibility-model` | `accessibility` | Semantic labels and focus-state note in generated page markup. |
| `16-theming-design-tokens` | `theme` | CSS custom properties and section accent style. |
| `17-internationalization` | `internationalization` | `OpenUiI18nService`, locale fallback, `LOCALE_ID`, direction binding, date/number/currency pipes. |
| `18-security-privacy-ui-rules` | `security` | Safe text rendering, URL scheme allow-listing, masked values, permission and confirmation gates. |
| `19-performance-requirements` | `performance` | Lazy route detail, cacheable projection identity, CDK virtual scroll budget. |
| `21-compliance-rules` | `compliance` | Compliance tags, metadata completeness, cross-cutting evidence, diagnostics. |
| `22-test-acceptance-criteria` | `acceptance` | Acceptance traceability and evidence checklist. |
| `23-reference-examples` | `reference` | Reference action component example and public property chips. |

The model and emitter include extension-related types and file emission support. At the time of this revision, `map-to-angular.ts` does not populate `extensionModel`; enabling `20-extension-model` generation requires adding the mapper logic and corresponding tests.

## Generated output shape

For each `generate` command, the emitter creates an Angular standalone application skeleton:

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
      ├─ application-structure.model.ts       conditional
      └─ pages/
        └─ <section-route>/
          ├─ <section-route>.page.ts
          ├─ <section-route>.page.html
          └─ <section-route>.page.scss
```

Project-level package versions are currently pinned by the emitter. As of this revision, generated apps use Angular, Angular Material, Angular CDK, Angular CLI, and Angular build package version `22.0.2` with TypeScript `6.0.3`.

## CLI contract

The CLI is intentionally small:

```bash
openui-angular-gen validate --spec <spec.json>
openui-angular-gen generate --spec <spec.json> --out <output-directory>
```

The source command implementation also accepts `--target angular`; `angular` is the default and only supported target.

## Validation and tests

The generator package validates itself with:

```bash
npm run test
```

That script runs TypeScript compilation first and then the Node test suite from `dist/tests/*.test.js`.

Generated example applications are validated separately from `generators/angular/generated-examples/` with their own Angular build and test scripts.

## Implementation principles

Separate these concerns:

```text
WHAT exists              → UI IR
HOW Angular sees it      → Angular project/page model
HOW files look           → emitters
WHERE files are written  → writer
```

Avoid shortcuts that collapse these layers. For example, do not add a new specification section by string-building Angular output directly from `FrameworkSpecSection`. Instead:

1. Add or update the input type if the spec shape changed.
2. Validate required structure and cross-references.
3. Normalize the section into a `UiFeature` or IR field.
4. Map the IR into Angular model fields.
5. Emit files from the Angular model.
6. Add tests that verify generated TypeScript, HTML, SCSS, and diagnostics where relevant.

This distinction is what keeps the generator maintainable as the OpenUI specification grows.
