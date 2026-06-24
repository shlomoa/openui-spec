# Repository code generation starting point

## Goal

Find a practical starting point for code generation based on the table entries already documented in `docs/README.md`.

The issue specifically asks for:

- a parser for the JSON artifacts referenced there
- a generator that converts the parsed model into HTML, JS, and CSS files

## Relevant table entries reviewed

The most generator-relevant entries in `docs/README.md` are:

1. `lib/jsdoc/schemas/sap-ui-library-api.json`
2. `lib/jsdoc/schemas/sap-ui-library-api-index.json`
3. `lib/jsdoc/jsdoc-config-template.json`
4. `lib/jsdoc/transformApiJson.js`
5. `src/sap.ui.core/.dtsgenrc`
6. `docs/GENERATOR_STRUCTURE.md`

## Research outcome

### 1. Best parser starting point

The best **implementable parser starting point** is the generated `api.json` / `api-index.json` pipeline, not the raw runtime source files.

Why:

- `sap-ui-library-api.json` is an explicit JSON Schema for the generated `api.json` files.
- `sap-ui-library-api-index.json` is an explicit JSON Schema for the aggregated symbol index.
- `jsdoc-config-template.json` shows that OpenUI5 configures JSDoc to emit the `apijson` variant.
- `transformApiJson.js` proves there is already an upstream normalization step from raw JSDoc output into a structured JSON representation suitable for tooling.

This makes the `api.json` family the easiest machine-readable input for a first generator parser:

- stable JSON shape
- schema-backed validation
- library and symbol inventory already flattened
- easier to automate than parsing arbitrary JavaScript source files directly

### 2. Parser scope recommendation

The first parser should read:

1. one library `api.json`
2. optionally the aggregated `api-index.json`

The parser should extract at least:

- library name and version
- symbol list
- symbol kind (`class`, `interface`, `enum`, `typedef`, `namespace`, `function`)
- inheritance / implementation relationships
- public properties
- methods and parameters
- events
- UI5 metadata-derived information when present

Recommended first local module shape:

```text
src/spec/load-spec.ts
src/spec/framework-spec.types.ts
src/validation/validate-spec.ts
src/ir/build-ir.ts
```

In the terminology of `docs/GENERATOR_STRUCTURE.md`, this aligns with:

- `spec-loader`
- `validator`
- `normalizer`
- `ir`

### 3. Best generator starting point

The best **generator starting point** is not OpenUI5 runtime code generation, because no upstream generator was found that converts UI5 metadata directly into Angular or generic web UI files.

Instead, the strongest starting point in the current repo is the pipeline already documented in `docs/GENERATOR_STRUCTURE.md`:

```text
Framework Spec
        ↓
Parse / Load
        ↓
Validate
        ↓
Normalize
        ↓
Build Intermediate Model
        ↓
Map to Angular Model
        ↓
Generate TypeScript / HTML / SCSS
```

This means the first generator should begin after normalization and IR construction, not directly from raw JSON records.

### 4. First code generation slice to implement

The smallest useful generator slice is:

1. parse one `api.json` file
2. normalize one or more public UI symbols into an implementation-agnostic IR
3. map one page/component concept into an Angular component model
4. emit:
   - one `.ts` component file
   - one `.html` template file
   - one `.scss` or `.css` style file

Recommended first emitters:

```text
src/targets/angular/emit-component.ts
src/targets/angular/emit-angular-project.ts
src/targets/angular/emit-theme.ts
```

If the immediate target is described as HTML, JS, and CSS, the practical Angular equivalent is:

- TypeScript source for component behavior
- HTML for template structure
- SCSS/CSS for styling

### 5. Why `.dtsgenrc` still matters

`src/sap.ui.core/.dtsgenrc` is not itself the parser input, but it is an important supporting reference for the mapping phase.

It shows:

- how OpenUI5 adjusts generated types
- which symbols need overlays or exclusions
- where raw API data needs type corrections before code emission

For this reason, `.dtsgenrc` should be used as a **type-mapping reference**, not as the primary parser source.

## Recommended starting architecture

### Parser

Start here:

```text
generated api.json / api-index.json
  → schema validation
  → local normalized model
  → IR
```

Do **not** start by parsing raw OpenUI5 JavaScript source as the first implementation step.

That source remains the conceptual basis for the specification, but the JSON pipeline is the better starting point for an actual generator implementation.

### Generator

Start here:

```text
IR
  → Angular model
  → emit .ts + .html + .scss/.css
```

Do **not** generate files directly from raw `api.json` objects without an IR step.

## Final conclusion

- **Parser starting point:** the schema-backed `api.json` / `api-index.json` artifacts produced by the JSDoc pipeline.
- **Normalization reference:** `transformApiJson.js`.
- **Type-mapping support:** `.dtsgenrc`.
- **Generator starting point:** the IR-to-Angular emission pipeline already described in `docs/GENERATOR_STRUCTURE.md`.
- **First practical output:** a minimal Angular component/page triplet that emits behavior, template, and styling files.
