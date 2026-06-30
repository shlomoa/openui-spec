# Spec-to-generator alignment

## Verdict

Mostly **clear and directionally aligned**, but **not fully aligned yet**. The generator docs consistently explain the golden-source boundary — `spec/**/*.md` → generated openui.json catalog → generator consumption — which matches the spec. Completed cleanups are tracked below; the active gaps still need clarification or alignment before treating the docs as authoritative.

## What is clear

- The architecture requirement is clear: keep a compiler-style pipeline, not direct template string generation.
- The golden-source boundary is clear: spec prose is authoritative; openui.json, fixtures, generated examples, and Angular models are derived.
- The intended model layers are clear: OpenUI document → validation/extraction → `UiApplication` → Angular model → generated files.
- Validation ownership is mostly clear: root spec validation is documented in TEST_PLAN.md; Angular generator validation is documented in TEST_PLAN.md.

## Alignment gaps

Active gaps are 4 and 6. Gap 5 is kept here as a resolved historical item so
the cleanup trail remains visible.

### 4. Existing-workspace requirement needs sharper boundaries

REQUIREMENTS.md says the generator applies a UI description to an **existing Angular workspace** and reads its conventions, structure, and configuration.

`GENERATION.md` says the generator emits a standalone Angular application skeleton into an output directory.

Those can coexist, but the docs do not define the boundary clearly:

- Is the generator expected to adapt to arbitrary Angular workspaces?
- Or only reconcile files that the generator owns inside a generated/known workspace shape?
- Which files are owned by OpenUI, and which existing files must be preserved?

**Recommendation:** add an explicit “workspace ownership contract” section.

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

## One extra implementation-adjacent note

The docs correctly state that root `type` is **not pinned** by the spec. However, the current generator validation code pins root `type` to `"html"`. That is not a docs problem directly, but it is an implementation/spec alignment issue worth tracking.

## Recommended next cleanup order

1. Align the generator CLI naming with the artifact roles (`--input`, `--catalog`, and optionally `--schema`).
2. Add a short workspace ownership contract.

## Completed cleanup

- Removed the broken `initial_spec_population.md` references from the legacy split generator docs.
- Consolidated the split generator architecture/code-generation docs into `generators/angular/docs/GENERATION.md`.
- Centralized the `input.json` / grammar / catalog file-role definitions in `spec/README.md` and replaced duplicates with references.
- Replaced duplicated legacy page-scope definitions with the canonical `pages` / `Pages` scope identity from `spec/README.md` and `openui.json`.
- Refreshed `generators/angular/docs/TEST_PLAN.md` so incremental fixture/test wording matches the committed expected-output fixtures and current add/match/delete/modify coverage.
- Verified with `git diff --check` and a targeted grep over `generators/angular/docs/*.md`.
