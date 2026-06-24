# Repository Code Generation Starting Point

This document records the practical starting point for repository code generation. It complements `docs/GENERATOR_STRUCTURE.md`, which describes the implemented Angular generator package in `generators/angular/`.

## Current status

The repository now has a working initial Angular Material generator:

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

The implemented generator currently consumes an OpenUI specification document shaped like `generators/angular/tests/fixtures/minimal-openui.json`, validates it, builds a UI IR, maps it to an Angular project model, and emits a standalone Angular Material application skeleton.

This means the next code-generation work should extend the existing pipeline rather than create a second generator path.

## Parser input scope

This document does **not** define the final source of truth for the OpenUI specification. It only identifies a practical, implementable parser input for the next code-generation slice.

Based on the generator-related entries already recorded in `docs/README.md`, the first parser should target schema-backed JSON artifacts such as `api.json` and `api-index.json`. Those artifacts are useful because they are structured, deterministic, and easier to validate than raw framework source files.

Other upstream artifacts may still be relevant as supporting references when a specific generator feature needs them:

| Supporting reference | Typical use |
| --- | --- |
| `transformApiJson.js` | Understand existing upstream normalization of generated API JSON. |
| `.dtsgenrc` | Understand TypeScript overlays, exclusions, and type-shaping constraints. |
| Runtime metadata and design-time metadata files | Fill gaps only when the JSON projection lacks metadata required by a generator feature. |
| Tests and examples | Provide acceptance evidence for generated behavior and compatibility. |

Do not infer normative source-of-truth rules from this document alone; keep those decisions in the specification documents and their validation tests.

## Practical parser starting point

For implementation work, start with JSON artifacts because they are deterministic and schema-backed.

### First parser scope

Read:

1. one library-level `api.json`
2. optionally the aggregated `api-index.json`

Extract at least:

- library name and version
- symbol inventory
- symbol kind (`class`, `interface`, `enum`, `typedef`, `namespace`, `function`)
- inheritance and implementation relationships
- public properties
- methods and parameters
- events
- metadata-derived properties, aggregations, associations, defaults, visibility, and bindability when present

### Parser output

The parser should not feed Angular emitters directly. It should produce a local normalized model that can be validated and then converted into the generator IR.

```text
upstream api.json / api-index.json
  → schema validation
  → local normalized OpenUI source model
  → FrameworkSpecDocument or equivalent spec artifact
  → UiApplication IR
  → AngularProjectModel
  → GeneratedFile[]
```

If the parser produces or updates repository-level `openui.json`, keep that file synchronized with `spec/` prose and the validation tests.

## Existing generator entry points

Use these implemented modules as the starting architecture:

| Concern | Existing file |
| --- | --- |
| CLI orchestration | `generators/angular/src/cli/main.ts` |
| JSON loading | `generators/angular/src/spec/load-spec.ts` |
| Input types | `generators/angular/src/spec/framework-spec.types.ts` |
| Validation and diagnostics | `generators/angular/src/validation/validate-spec.ts`, `generators/angular/src/validation/diagnostics.ts` |
| Normalization | `generators/angular/src/ir/normalize-spec.ts` |
| UI IR construction | `generators/angular/src/ir/build-ir.ts`, `generators/angular/src/ir/ui-model.ts` |
| Angular model mapping | `generators/angular/src/targets/angular/map-to-angular.ts`, `generators/angular/src/targets/angular/angular-model.ts` |
| Project emission | `generators/angular/src/targets/angular/emit-angular-project.ts` |
| Page component triplets | `generators/angular/src/targets/angular/emit-component.ts` |
| Routes | `generators/angular/src/targets/angular/emit-routes.ts` |
| Theme tokens | `generators/angular/src/targets/angular/emit-theme.ts` |
| Safe file writes | `generators/angular/src/writers/file-writer.ts`, `generators/angular/src/writers/safe-write.ts` |
| Tests | `generators/angular/tests/generator.test.ts` |

## Recommended next implementation slice

The smallest useful next parser-to-generator slice is:

1. Add a parser for one schema-backed `api.json` fixture.
2. Normalize one public component contract into the local spec or IR shape.
3. Validate required metadata: identity, library, public properties, aggregations, associations, events, defaults, and visibility.
4. Map the normalized contract into an Angular page or component model.
5. Emit the existing Angular triplet:
   - `.page.ts` for behavior and typed state
   - `.page.html` for Material-backed template structure
   - `.page.scss` for token-backed styling
6. Add tests that assert the parser output, diagnostics, and generated Angular files.

This keeps the work small while connecting the upstream machine-readable projection to the already implemented generator.

## HTML, JS, and CSS output interpretation

If an issue asks for generated HTML, JS, and CSS, the Angular generator equivalent is:

| Requested artifact | Angular generator artifact |
| --- | --- |
| HTML | Standalone component template: `<route>.page.html` |
| JS | TypeScript source compiled to JavaScript: `<route>.page.ts`, `main.ts`, routes, services |
| CSS | SCSS/CSS source: `<route>.page.scss`, `src/styles.scss` |

The generator should continue emitting TypeScript rather than handwritten JavaScript because Angular source is TypeScript-first and the package already compiles generated apps through Angular tooling.

## Validation strategy

For generator changes, run the generator package test command from `generators/angular/`:

```bash
npm run test
```

That command type-checks the TypeScript generator and runs the Node test suite.

For generated example applications, validate from `generators/angular/generated-examples/` with its configured Angular build and test scripts.

For repository-wide checks, use the local Python virtual environment as required by repository instructions and run the configured pre-commit checks when available.

## Guardrails

- Do not treat `api.json` or `api-index.json` as the complete standard by themselves; use them as the first parser input.
- Do not parse raw framework JavaScript source as the first generator implementation path unless the JSON artifacts lack metadata required by a specific feature.
- Do not generate Angular files directly from raw `api.json` records.
- Do not bypass the `FrameworkSpecDocument → UiApplication → AngularProjectModel → GeneratedFile[]` separation.
- Do not write generated files outside the selected output directory; use the existing safe writer.
- Do not add a new target before the Angular pipeline has parser-backed fixtures and tests.

## Final conclusion

- **Practical parser starting point:** schema-backed `api.json` / `api-index.json` artifacts.
- **Normalization reference:** upstream `transformApiJson.js` and local `ir/normalize-spec.ts`.
- **Type-mapping support:** upstream `.dtsgenrc` behavior.
- **Generator starting point:** the existing Angular IR-to-emitter pipeline in `generators/angular/`.
- **Next practical output:** parser-backed generation of one Angular Material component/page triplet with tests for parsed metadata, diagnostics, and emitted TypeScript/HTML/SCSS.
