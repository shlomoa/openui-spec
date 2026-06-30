# Spec-to-generator alignment

## Verdict

Mostly **clear and directionally aligned**, but **not fully aligned yet**. The generator docs consistently explain the golden-source boundary — `spec/**/*.md` → generated openui.json catalog → generator consumption — which matches the spec. One stale-reference cleanup has been completed; the remaining items below still need clarification or alignment before treating the docs as authoritative.

## What is clear

- The architecture requirement is clear: keep a compiler-style pipeline, not direct template string generation.
- The golden-source boundary is clear: spec prose is authoritative; openui.json, fixtures, generated examples, and Angular models are derived.
- The intended model layers are clear: OpenUI document → validation/extraction → `UiApplication` → Angular model → generated files.
- Validation ownership is mostly clear: root spec validation is documented in TEST_PLAN.md; Angular generator validation is documented in TEST_PLAN.md.

## Alignment gaps

### 2. Resolved: `Pages` is the canonical page scope name

The canonical openui.json currently has:

- `id: "pages"`
- `type: "Pages"`
- `scopeDocument: "scopes/Pages/scope.md"`

The drift was caused by duplicating the page-scope identity outside the
specification source of truth. The entire solution now uses the canonical spec
name:

- `pages`
- `Pages`

Spec evidence:

- scope.md title is `# Pages`
- openui.json page-related scope node is `("pages", "Pages", "scopes/Pages/scope.md")`

Previously affected locations:

- minimal-openui.json
- normalize-spec.ts
- generator.test.ts
- spec-json-generator-developer.agent.md

**Status:** completed. The fixture, feature map, generator tests, and agent
guidance now use `pages` / `Pages`; a repository grep found no remaining legacy
page-scope identifier references.

### 3. Resolved: missing `initial_spec_population.md` references

Previously, the split generator docs referenced:

- `../../../initial_spec_population.md`

That file does not exist in the repository.

**Status:** completed. The broken references were removed before the generator docs were consolidated into `generators/angular/docs/GENERATION.md`. A follow-up grep found no remaining `initial_spec_population.md` references under `generators/angular/docs/*.md`.

### 4. Existing-workspace requirement needs sharper boundaries

REQUIREMENTS.md says the generator applies a UI description to an **existing Angular workspace** and reads its conventions, structure, and configuration.

`GENERATION.md` says the generator emits a standalone Angular application skeleton into an output directory.

Those can coexist, but the docs do not define the boundary clearly:

- Is the generator expected to adapt to arbitrary Angular workspaces?
- Or only reconcile files that the generator owns inside a generated/known workspace shape?
- Which files are owned by OpenUI, and which existing files must be preserved?

**Recommendation:** add an explicit “workspace ownership contract” section.

### 5. Incremental generation test-plan wording is stale

TEST_PLAN.md says:

- “No committed generator output workspaces. Only input fixtures are committed…”
- Delete scenario uses a “future fixture”

But the fixture tree contains committed `output_app-file-select` directories, and incremental.test.ts already covers deletion behavior.

**Recommendation:** update the test plan wording to match the actual fixture/test strategy.

### 6. Validation “against `spec/**/*.md`” is too broad as written

The docs say validation uses:

- openui.json
- openui.schema.json
- `spec/**/*.md`

That is directionally right, but not operationally precise. Some Markdown sections are machine-bearing, while others are prose-only.

**Recommendation:** state which parts are machine-validated:

- schema grammar
- catalog scope nodes
- `attrs.scopeDocument` traceability
- leaf Identity / Attributes / Child model parser rules
- possibly prose-only sections checked for presence, not semantic execution

## Spec alignment summary

Aligned:

- Grammar/catalog/prose distinction
- `attrs` as the only place for non-structural data
- `id` / `type` / `attrs` / `children` OpenUI shape
- generated catalog is derived, not source-of-truth
- incremental generation concept: Add / Delete / Modify / Match
- safe writer / no out-of-tree writes

Not aligned or unclear:

- CLI option naming still collapses `input.json` and catalog/spec roles
- current generator behavior vs “existing workspace conventions” requirement
- stale incremental test-plan wording

## One extra implementation-adjacent note

The docs correctly state that root `type` is **not pinned** by the spec. However, the current generator validation code pins root `type` to `"html"`. That is not a docs problem directly, but it is an implementation/spec alignment issue worth tracking.

## Recommended next cleanup order

1. Align the generator CLI naming with the artifact roles (`--input`, `--catalog`, and optionally `--schema`).
2. Add a short workspace ownership contract.
3. Refresh TEST_PLAN.md to match actual fixtures/tests.

## Completed cleanup

- Removed the broken `initial_spec_population.md` references from the legacy split generator docs.
- Consolidated the split generator architecture/code-generation docs into `generators/angular/docs/GENERATION.md`.
- Centralized the `input.json` / grammar / catalog file-role definitions in `spec/README.md` and replaced duplicates with references.
- Replaced duplicated legacy page-scope definitions with the canonical `pages` / `Pages` scope identity from `spec/README.md` and `openui.json`.
- Verified with `git diff --check` and a targeted grep over `generators/angular/docs/*.md`.
