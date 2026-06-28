# Repository Code Generation Starting Point

This document describes how repository-local OpenUI specification artifacts
become generator input and, eventually, generated Angular files. It complements
`GENERATOR_STRUCTURE.md`, which documents the implemented Angular generator
package in `generators/angular/generator/`.

For the immediate spec-population sequence, see
`../initial_spec_population.md`.

## Golden source

The golden source for code generation is the repository OpenUI specification:

- `spec/README.md` for the prose entry point and JSON format rules,
- Markdown files under `spec/` for synchronized prose scopes,
- `spec/to_json/` for deterministic Markdown-to-JSON conversion, and
- root `openui.json` for the generated machine-readable specification catalog.

Generator fixtures, generated examples, and Angular target models are derived
artifacts. They must not redefine the specification.

Regenerate the catalog after changing scope prose or schema-relevant structure:

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
└─ tests/
```

The implemented generator consumes the native OpenUI scope-tree shape in
`generators/angular/generator/tests/fixtures/minimal-openui.json`, validates it, builds a
UI IR, maps it to an Angular project model, and emits a standalone Angular
Material application skeleton.

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

The next code-generation work should extend this pipeline directly from native
OpenUI nodes into the existing IR. Transitional input definitions and adapters
are not allowed.

## Native OpenUI input scope

The native parser and catalog converter should read:

1. root `openui.json`,
2. `spec/README.md`, and
3. the Markdown scope documents under `spec/`.

It should extract or verify at least:

- document `version`, `id`, `type`, `attrs`, and `children`,
- scope and leaf-node identity,
- `attrs.scopeDocument` traceability,
- generated `<scopeId>Instance` nodes for leaf object contracts,
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

| Concern                    | Existing file                                                                                                                             |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| CLI orchestration          | `generators/angular/generator/src/cli/main.ts`                                                                                            |
| JSON loading               | `generators/angular/generator/src/spec/load-spec.ts`                                                                                      |
| Native input types         | `generators/angular/generator/src/spec/openui-spec.types.ts`, `generators/angular/generator/src/spec/openui-sections.ts`                  |
| Validation and diagnostics | `generators/angular/generator/src/validation/validate-spec.ts`, `generators/angular/generator/src/validation/diagnostics.ts`              |
| Normalization              | `generators/angular/generator/src/ir/normalize-spec.ts`                                                                                   |
| UI IR construction         | `generators/angular/generator/src/ir/build-ir.ts`, `generators/angular/generator/src/ir/ui-model.ts`                                      |
| Angular model mapping      | `generators/angular/generator/src/targets/angular/map-to-angular.ts`, `generators/angular/generator/src/targets/angular/angular-model.ts` |
| Project emission           | `generators/angular/generator/src/targets/angular/emit-angular-project.ts`                                                                |
| Page component triplets    | `generators/angular/generator/src/targets/angular/emit-component.ts`                                                                      |
| Routes                     | `generators/angular/generator/src/targets/angular/emit-routes.ts`                                                                         |
| Theme tokens               | `generators/angular/generator/src/targets/angular/emit-theme.ts`                                                                          |
| Safe file writes           | `generators/angular/generator/src/writers/file-writer.ts`, `generators/angular/generator/src/writers/safe-write.ts`                       |
| Tests                      | `generators/angular/generator/tests/generator.test.ts`                                                                                    |

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
./.venv/Scripts/python -m unittest discover -s tests
./.venv/Scripts/python -m ruff check .
./.venv/Scripts/python -m ruff format --check .
git diff --check
```

Run generator validation from `generators/angular/generator/`:

```powershell
Push-Location generators/angular/generator
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

- Do not treat generator fixtures or root `openui.json` as hand-authored source.
- Do not hand-edit generated catalog changes; update scope prose or converter
  logic, then rerun `python -m spec.to_json`.
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
