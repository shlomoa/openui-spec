# Proposed TDD approach

## 1. Start with issue-level acceptance tests

Add tests before touching implementation. Prefer black-box/full-pipeline tests in incremental.test.ts, with planner-level detail tests in reconcile.test.ts only when needed.

The key missing “full generation” tests should drive `generateIncrementally(...)` or the CLI twice against the same output directory using different input specs.

Because parts of incremental generation may already be implemented, each new test should be treated as an acceptance test first: if it fails, follow red-green-refactor; if it passes immediately, record it as regression coverage for already-implemented behavior.

Recommended test cases:

1.1. ✅ **From scratch**
   - Empty workspace + non-empty JSON.
   - Expect all emitted files to be added.
   - Assert key project files exist: `package.json`, `src/app/app.routes.ts`, page/component files.
   - Covered by `tests/incremental.test.ts`: `from scratch — generates every emitted file as Add into an empty workspace`.

1.2. ✅ **No-op match**
   - Generate once, then generate again with identical JSON.
   - Expect no added/modified/deleted files.
   - Assert matched files keep their previous `mtime`.
   - Covered by `tests/incremental.test.ts`: `no-op match — re-running on an up-to-date workspace matches every emitted file`.

1.3. ✅ **Incremental add**
   - Start with input A containing one child.
   - Generate.
   - Run again with input B adding a child.
   - Expect new child files added.
   - Expect parent/router/reference files modified only where wiring changes.
   - Expect unrelated files matched/not rewritten.
   - Covered by `tests/incremental.test.ts`: `incremental add — adds a new child and rewires generated parent files`.

1.4. ✅ **Incremental delete — one child**
   - Start with input containing two children/pages/components.
   - Run again with one child removed.
   - Expect removed child files deleted.
   - Expect parent references/routes/templates no longer mention the removed child.
   - Expect emptied directories pruned.
   - Covered by `tests/incremental.test.ts`: `incremental delete — removes a child and rewires generated parent files`.

1.5. ✅ **Incremental delete — empty JSON**
   - Start with generated workspace.
   - Run with valid root JSON containing no generated children.
   - Expect previously generated owned files removed.
   - Confirm no partial leftovers in component/page directories.
   - Covered by `tests/incremental.test.ts`: `incremental delete — empty JSON removes every previously generated child page`.
   - Green step: allow structurally valid empty root documents for incremental deletion while preserving validation for non-empty trees with no scoped nodes.

1.6. ✅ **Simple modification / rename**
   - Change a child selector/route/name.
   - Expect old path deleted and new path added.
   - Expect parent references updated.
   - This matches the issue’s “simple rename” behavior.
   - Covered by `tests/incremental.test.ts`: `simple modification — renaming a child deletes the old route, adds the new route, and rewires parents`.

1.7. ✅ **Complex modification**
   - Change a type/attribute/child shape that affects generated output content but not path.
   - Expect affected files modified.
   - Expect unaffected siblings matched and timestamps unchanged.
   - Covered by `tests/incremental.test.ts`: `complex modification — changing a child attribute rewrites only affected generated content`.

1.8. **Validation failure is atomic**
   - Generate valid workspace.
   - Run with invalid JSON/no root.
   - Expect validation error.
   - Assert existing workspace is unchanged.
   - This protects the “Having no root is invalid” issue requirement.

1.9. **Workspace indexing ignores non-contract directories**
   - Seed `node_modules`, `dist`, `.git`, `.angular`.
   - Generate incrementally.
   - Assert those directories are neither deleted nor considered part of the plan.

1.10. **Comparator/reconciler coverage for full output**
   - Build the desired emitted-file set for an input JSON.
   - Index an existing workspace generated from a different input JSON.
   - Run the comparator/reconciler directly, without applying the plan.
   - Assert the plan classifies Add / Match / Modify / Delete decisions correctly and attributes each decision to classifier output.
   - This proves the comparator required by issue #97 is useful independently of the apply layer.

1.11. **Classifier coverage for full output**
   - For every generated page/component file, assert classification is expected.
   - For project-level files, assert `application` or documented behavior.
   - This proves the classifier is actually useful for the full generator, not just isolated fixtures.

## 2. Run tests and confirm red-or-covered state

For each new test or small group of tests:

- Run the generator suite.
- If the new test fails, confirm it fails for the expected reason before implementing.
- If the new test passes immediately, mark the scenario as already implemented and covered.
- Avoid implementation changes until a failing acceptance test proves a gap. Tiny red bar first when the gap exists; otherwise keep the green bar as regression coverage.

Validation command:

```powershell
Push-Location generators/angular/generator
npm run test
Pop-Location
```

## 3. Implement only the smallest green step

Implementation should stay inside the existing pipeline unless a test proves a gap:

- Prefer updates to:
  - `src/incremental/generate.ts`
  - `src/incremental/reconcile.ts`
  - `src/incremental/apply.ts`
  - `src/incremental/workspace-index.ts`
  - `src/incremental/classifier.ts`
- Avoid bypassing the existing IR/model/emitter layers.
- Do not write files directly from the CLI.
- Do not introduce a second comparator abstraction unless the tests show `reconcileGeneratedFiles` is insufficient.

A useful refactor, if tests need plan inspection repeatedly, would be a small pure helper:

- `planIncrementalGeneration(inputPath, outDirectory): Promise<IncrementalPlan>`

Then `generateIncrementally` can call that helper and apply the result. This keeps tests precise without duplicating the load/validate/emit/index/reconcile sequence.

## 4. Refactor after green

After each green test group:

- Remove fixture duplication.
- Keep scenario builders small and readable.
- Keep expected files deterministic/sorted.
- Keep temp output under repo-local `tmp`, matching existing test conventions.
- Preserve cross-platform path behavior; assert POSIX-style generated paths but use `path.join` for actual filesystem access.

## 5. Update docs only after behavior is stable

Once behavior is covered by tests, update docs only if the tests reveal behavior not already documented.

Likely docs to touch:

- `generators/angular/docs/GENERATION.md`
- `generators/angular/docs/TEST_PLAN.md`
- `generators/angular/generator/README.md`

Keep `spec/README.md` as the SSOT for the incremental-generation algorithm; other docs should reference it rather than duplicate the scenario table.

## Suggested implementation order

1. Add full-pipeline tests for **from scratch**, **no-op**, and **incremental add**.
2. Add full-pipeline tests for **delete one child** and **delete all generated children**.
3. Add full-pipeline tests for **rename** and **complex content modification**.
4. Add atomicity/validation test for invalid root/no root.
5. Add workspace-index ignore test for generated-app build directories.
6. Add explicit comparator/reconciler and classifier coverage tests for full output.
7. Refactor helper code only after repeated setup becomes painful.
8. Update generator docs/test plan if needed.
9. Run full validation.

## Validation target

At minimum for `#97`:

```powershell
Push-Location generators/angular/generator
npm run test
Pop-Location
```

For a PR-ready finish, also run the broader repo checks when practical:

```powershell
Push-Location generators/angular/generated-examples
npm run format:check
npm run lint
npm test
npm run build
Pop-Location
```

```powershell
./.venv/Scripts/pre-commit run --all-files
```
