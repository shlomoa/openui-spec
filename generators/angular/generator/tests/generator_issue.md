## Actionable generator fix plan

1. **Add executable input-contract assertions for concrete fixtures.**

   - Edit `tests/generator.test.ts` or a shared test helper used by that file.
   - Add a recursive assertion helper that walks a concrete fixture and fails if
     any app/example node contains `attrs.scopeDocument`.
   - Apply the helper to
     `tests/fixtures/dialog/input_dialog/dialog.example.json` before adding the
     dialog validation/generation acceptance tests.
   - Assert that the fixture root is a concrete app/example document, such as
     `WidgetExample`, rather than an `openui.json` catalog scope node.
   - Document the assertion source with a short test comment pointing to
     [`spec/README.md`](../../../../spec/README.md), section
     **Specification artifacts: grammar vs. catalog**.
   - Expected result: attempts to “fix” the dialog failure by adding
     `attrs.scopeDocument` to concrete app nodes fail immediately in tests.

2. **Add a failing concrete-input acceptance test for the dialog fixture.**

   - Edit `tests/generator.test.ts`.
   - Add a fixture constant for
     `tests/fixtures/dialog/input_dialog/dialog.example.json`.
   - Add a test proving `validateOpenUiSpec()` accepts that fixture without
     `attrs.scopeDocument` on `WidgetExample`, `Dialog`, `DialogTitle`,
     `DialogContent`, `DialogActions`, or `button` nodes.
   - Add a generation test using `run(["generate", "--input", DIALOG_FIXTURE,
"--out", outDir])`.
   - Assert the generated output contains the expected dialog Angular Material
     surface, including `MatDialogModule` / dialog markup or whichever generated
     files are already represented in
     `tests/fixtures/dialog/output_dialog/`.
   - Expected initial result: the test fails with the current diagnostic:

     ```text
     root.children: Expected at least one scoped OpenUI node with attrs.scopeDocument.
     ```

3. **Split structural validation from catalog/scope-tree validation.**

   - Edit `src/validation/validate-spec.ts`.
   - Keep `validateElement()` as the generic OpenUI grammar/shape validator for
     both catalog and concrete inputs.
   - Stop calling `validateScopeCoverage()` unconditionally from
     `validateOpenUiSpec()`.
   - Either:
     - introduce `validateOpenUiCatalog()` for catalog fixtures that must contain
       scoped nodes with unique `attrs.scopeDocument`, or
     - gate `validateScopeCoverage()` behind an explicit validation mode such as
       `"catalog"`.
   - Update existing catalog tests to call the catalog validation path where
     they intentionally assert duplicate or missing `attrs.scopeDocument`.
   - Concrete-input validation must allow non-empty documents with no scoped
     nodes when the nodes are valid OpenUI elements.

4. **Introduce catalog lookup for concrete app nodes.**

   - Add a small catalog index module near `src/spec/`, for example
     `src/spec/catalog-index.ts`.
   - Index the generated catalog by OpenUI `type` and any stable aliases needed
     by current fixtures.
   - Use the repository root `openui.json` as the default catalog source for CLI
     generation unless a future option supplies a different catalog path.
   - Validate concrete input nodes against this catalog after grammar validation:
     - known OpenUI component/control/container/widget types should resolve,
     - native HTML tags such as `button` should continue to be allowed, and
     - unknown non-native types should produce diagnostics that identify the
       failing node path and type.

5. **Replace scope-only IR construction with concrete-input IR construction.**

   - Edit `src/ir/build-ir.ts`.
   - Keep the existing scope-node path available for catalog regression tests,
     but do not make it the only generation path.
   - Add a concrete-input builder that turns a concrete root such as
     `WidgetExample` into at least one `UiPage`.
   - For the dialog fixture, derive a deterministic page model from the concrete
     document:
     - page id from the root or fixture intent, for example `dialog`,
     - route `dialog`,
     - title from `root.attrs.title` after normalizing quotes, and
     - features/component hints from the resolved catalog entries for `Dialog`,
       `DialogTitle`, `DialogContent`, `DialogActions`, and `button`.
   - Preserve existing catalog-driven page generation for
     `tests/fixtures/minimal-openui.json` so current catalog regression coverage
     remains useful.

6. **Teach the Angular mapper/emitter to materialize concrete dialog nodes.**

   - Edit `src/targets/angular/map-to-angular.ts` and related emitters only as
     needed.
   - Map concrete `Dialog` trees to Angular Material dialog primitives instead
     of relying only on scope-derived feature strings.
   - Ensure generated TypeScript imports the required Angular Material modules
     and any Angular primitives needed by the emitted dialog template.
   - Ensure generated HTML preserves the concrete fixture semantics:
     - title text `Delete item?`,
     - content text `This action cannot be undone.`,
     - cancel and delete actions, and
     - event/property bindings represented in fixture attrs where supported.

7. **Update incremental ownership/classification for concrete inputs.**

   - Edit `src/incremental/classifier.ts`.
   - Keep catalog scoped-node page manifestations for catalog regression tests.
   - Add concrete-input page/component manifestations that do not depend on
     `attrs.scopeDocument`.
   - Ensure `buildSpecManifestationIndex(dialogFixture)` classifies emitted
     dialog files as `page` or `component` with `nodeId` / `nodeType` from the
     concrete app node that owns them.
   - Update comments in `src/incremental/generate.ts` so the pipeline is no
     longer described as scope-tree-only.

8. **Broaden concrete fixture coverage after dialog passes.**

   - Add parameterized acceptance tests for representative existing concrete
     fixtures under `tests/fixtures/*/input_*/*.example.json`.
   - Start with fixtures that were called out by the original failure analysis:
     - charts,
     - lists,
     - tables,
     - stepper,
     - date/time pickers.
   - Each fixture must validate and generate without adding
     `attrs.scopeDocument` to concrete app/example nodes.
   - Keep failures actionable by asserting which fixture failed and whether the
     failure happened during grammar validation, catalog resolution, IR building,
     Angular mapping, or reconciliation.

9. **Preserve catalog regression tests separately.**

   - Keep `tests/fixtures/minimal-openui.json` tests, but name them as catalog or
     scope-tree regression coverage.
   - Ensure duplicate `attrs.scopeDocument` detection still runs against catalog
     fixtures.
   - Do not let catalog tests redefine the concrete `input.json` contract.

10. **Refresh expected dialog output only after the generator produces it.**

    - Do not hide the recorded failure in
      `tests/fixtures/dialog/output_dialog/output_generation.md` while the
      generator is still failing.
    - After the dialog acceptance test passes, regenerate the dialog output
      fixture from the generator.
    - Compare generated files with `tests/fixtures/dialog/output_dialog/` and
      update expected output only for real generator output changes.
    - Replace the failure note with a successful command transcript only when
      the command actually succeeds.

11. **Run validation gates after each implementation slice.**

    - From `generators/angular/generator`, run the generator test suite with
      `npm test`.
    - From the repository root, run `git diff --check`.
    - From the repository root, run `.\.venv\Scripts\pre-commit run --all-files`.
    - If generated examples are touched, run the generated-examples validation
      documented in `generators/angular/docs/TEST_PLAN.md`.

12. **Completion criteria.**

    - `dialog.example.json` validates as a concrete `input.json` document with no
      `attrs.scopeDocument` added to app/example nodes.
    - The dialog fixture generates Angular Material output matching the expected
      dialog workspace fixture.
    - Existing `minimal-openui.json` catalog/scope-tree regression tests still
      pass.
    - Incremental reconciliation classifies generated dialog artifacts without
      requiring catalog traceability metadata on concrete input nodes.
    - Documentation continues to point artifact-role definitions back to
      `spec/README.md` instead of creating another generator-specific contract.
