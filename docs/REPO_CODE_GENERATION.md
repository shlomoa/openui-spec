# Repository Code Generation Starting Point

This document describes how repository-local OpenUI specification artifacts
become generator input and, eventually, generated Angular files. It complements
`docs/GENERATOR_STRUCTURE.md`, which documents the implemented Angular generator
package in `generators/angular/`.

For the immediate spec-population sequence, see
`../initial_spec_population.md`.

## Golden source

The golden source for code generation is the repository OpenUI specification:

- `spec/README.md` for the prose entry point and JSON format rules,
- Markdown files under `spec/` for synchronized prose scopes, and
- root `openui.json` for the canonical machine-readable specification.

Generator fixtures, generated examples, and Angular target models are derived
artifacts. They must not redefine the specification.

## Current status

The repository has an initial Angular Material generator:

```text
generators/angular/
├─ src/cli/main.ts
├─ src/spec/
├─ src/validation/
├─ src/ir/
├─ src/targets/angular/
├─ src/writers/
└─ tests/
```

The implemented generator consumes the native OpenUI scope-tree shape in
`generators/angular/tests/fixtures/minimal-openui.json`, validates it, builds a
UI IR, maps it to an Angular project model, and emits a standalone Angular
Material application skeleton.

The next code-generation work should extend this pipeline directly from native
OpenUI nodes into the existing IR. Transitional input definitions and adapters
are not allowed.

## Native OpenUI input scope

The native parser should read:

1. root `openui.json`,
2. `spec/README.md`, and
3. the Markdown scope documents under `spec/`.

It should extract or verify at least:

- document `version`, `id`, `type`, `attrs`, and `children`,
- scope and leaf-node identity,
- `attrs.scopeDocument` traceability,
- `Pages` as the short folder/navigation name,
- `PredefinedPages` as the long semantic JSON type name,
- current status values such as `draft`,
- parent/child relationships, and
- validation constraints documented in the spec.

## Parser output

The parser must not feed Angular emitters directly. It should produce explicit
intermediate models.

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

## Existing generator entry points

Use these implemented modules as the starting architecture:

| Concern                    | Existing file                                                                                                         |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| CLI orchestration          | `generators/angular/src/cli/main.ts`                                                                                  |
| JSON loading               | `generators/angular/src/spec/load-spec.ts`                                                                            |
| Native input types         | `generators/angular/src/spec/openui-spec.types.ts`, `generators/angular/src/spec/openui-sections.ts`                  |
| Validation and diagnostics | `generators/angular/src/validation/validate-spec.ts`, `generators/angular/src/validation/diagnostics.ts`              |
| Normalization              | `generators/angular/src/ir/normalize-spec.ts`                                                                         |
| UI IR construction         | `generators/angular/src/ir/build-ir.ts`, `generators/angular/src/ir/ui-model.ts`                                      |
| Angular model mapping      | `generators/angular/src/targets/angular/map-to-angular.ts`, `generators/angular/src/targets/angular/angular-model.ts` |
| Project emission           | `generators/angular/src/targets/angular/emit-angular-project.ts`                                                      |
| Page component triplets    | `generators/angular/src/targets/angular/emit-component.ts`                                                            |
| Routes                     | `generators/angular/src/targets/angular/emit-routes.ts`                                                               |
| Theme tokens               | `generators/angular/src/targets/angular/emit-theme.ts`                                                                |
| Safe file writes           | `generators/angular/src/writers/file-writer.ts`, `generators/angular/src/writers/safe-write.ts`                       |
| Tests                      | `generators/angular/tests/generator.test.ts`                                                                          |

## Recommended next implementation slice

The smallest useful golden-source-to-generator slice is:

1. Populate `openui.json` from the current scope model.
2. Keep `spec/openui.schema.json` synchronized with the native `version` / `id` /
   `type` / `attrs` / `children` shape.
3. Add Python validation that checks `openui.json`, schema rules, scope document
   paths, and MkDocs navigation.
4. Map at least one native scope/page node directly into `UiApplication`.
5. Generate one Angular Material page/component triplet from that IR model:
   - `.page.ts` for behavior and typed state,
   - `.page.html` for Material-backed template structure,
   - `.page.scss` for token-backed styling.
6. Add tests that assert parser output, native extraction behavior, diagnostics, and
   generated Angular files.

This keeps the work small while connecting the golden source to the existing
Angular generator pipeline.

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

## Validation strategy

Run repository Python and documentation validation through the local `.venv`:

```powershell
./.venv/Scripts/python -m pytest
./.venv/Scripts/pre-commit run --all-files
./.venv/Scripts/python -m mkdocs build --strict
git diff --check
```

Run generator validation from `generators/angular/`:

```powershell
Push-Location generators/angular
npm run test
Pop-Location
```

Validate generated example applications separately:

```powershell
Push-Location generators/angular/generated-examples
npm run build
npm run test
Pop-Location
```

## Guardrails

- Do not treat generator fixtures as the source of truth.
- Do not generate Angular files directly from raw `openui.json` nodes.
- Do not bypass the golden source → native extraction → IR → Angular model → files
  separation.
- Do not write generated files outside the selected output directory; use the
  existing safe writer.
- Do not add a new target before the Angular pipeline has golden-source-backed
  fixtures and validation tests.
- Keep `Pages` as the short folder/navigation name and `PredefinedPages` as the
  long semantic JSON type name.

## Final conclusion

- **Golden source:** `spec/README.md`, Markdown under `spec/`, and root
  `openui.json`.
- **Immediate parser starting point:** native OpenUI `id` / `type` / `attrs` /
  `children` records from `openui.json` plus scope-document traceability.
- **Generator bridge:** direct native OpenUI extraction into `UiApplication`.
- **Generator starting point:** the existing Angular IR-to-emitter pipeline in
  `generators/angular/`.
- **Next practical output:** golden-source-backed generation of one Angular
  Material component/page triplet with tests for parsed metadata, diagnostics,
  and emitted TypeScript/HTML/SCSS.
