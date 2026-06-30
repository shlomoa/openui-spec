## Artifact-role source of truth

The artifact-role contract must remain defined once in
[`spec/README.md`](../../../../spec/README.md), especially the section
**Specification artifacts: grammar vs. catalog**.

That source of truth defines the roles as:

- `spec/openui.schema.json` — the grammar for OpenUI document shape.
- `openui.json` — the generated catalog/vocabulary of OpenUI objects, including
  prose traceability such as `attrs.scopeDocument`.
- `input.json` — a concrete UI/app document that uses catalog vocabulary and is
  generated into a target workspace.

`docs/REQUIREMENTS.md` and `generators/angular/docs/GENERATION.md` should both
reference this contract. They should document the required behavior and
validation expectations, not normalize the current implementation limitation as
an alternate generator contract.

## Required generator contract

The Angular generator requirement is to materialize a concrete OpenUI UI/app
description into an existing Angular workspace.

For generator input, that means:

- accept concrete `input.json` documents that satisfy the OpenUI grammar,
- interpret node `type`, `attrs`, and `children` against the catalog in
  `openui.json`,
- generate Angular Material output that implements the concrete app description,
- reconcile that output incrementally with the target Angular workspace, and
- avoid requiring catalog-only traceability fields on concrete app nodes.

PR #109 populated the dialog output fixture and documented a generator run in
`tests/fixtures/dialog/output_dialog/output_generation.md`.

The dialog fixture JSON is a concrete app/example document:

```text
type: "WidgetExample"
children: Dialog, DialogTitle, DialogContent, DialogActions, button
```

That shape is consistent with the required `input.json` role from the
artifact-role SSOT: it describes the app/widget instance to build using catalog
vocabulary.

Therefore the generator should be able to validate, interpret, and generate the
dialog fixture without requiring `attrs.scopeDocument` on the concrete app nodes.

## Current non-compliance

The current Angular generator implementation does not yet follow that complete
`input.json` flow. It still implements a scope-tree/catalog-oriented slice:

- `validateOpenUiSpec()` calls `extractOpenUiScopeNodes()`.
- `extractOpenUiScopeNodes()` treats only nodes with `attrs.scopeDocument` as
  generator-relevant scoped nodes.
- `buildUiModel()` builds pages from those extracted scoped nodes.
- The Angular mapper/emitter then produces routed page output from that page IR.

As a result, when `dialog.example.json` is used as generator input, validation
fails with:

```text
root.children: Expected at least one scoped OpenUI node with attrs.scopeDocument.
```

That diagnostic describes the current implementation expectation, not the
required `input.json` contract.

## Required fix

The generator must remove the stale input-model assumption that scoped catalog
nodes with `attrs.scopeDocument` are the only effective generation input.

In the SSOT model, `attrs.scopeDocument` is catalog traceability metadata for
`openui.json`, not a field that concrete app/example nodes must carry.

Therefore the fix is not to add `attrs.scopeDocument` to `dialog.example.json`.
Doing so would blur the boundary between:

- catalog entries that define available objects and link back to prose, and
- concrete app documents that request an implementation of those objects.

The required generator behavior is:

> The Angular generator must consume concrete `input.json` app/example documents
> such as the dialog `WidgetExample`, validate them against the grammar and
> catalog, and generate the corresponding Angular Material workspace changes.

PR #109 exposed this gap because the expected Angular Material output exists and
the app-level validation tests describe the desired behavior, but the generator
did not produce that output.

The same requirement likely applies to other concrete `WidgetExample` fixtures
too, including charts, lists, tables, stepper, and date/time pickers.

## Documents using the term scope-tree behavior

I found these source Markdown documents describing or referencing the scope-tree behavior. I’m excluding generated site output and JSON data files like openui.json / minimal-openui.json.

| File                                       | What it describes                                                                                                                                                                                                                                                    | Keep / fix?                                                                                                                         |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| README.md                                  | Legitimate SSOT description of openui.json as the generated catalog tree with scope nodes carrying `attrs.scopeDocument`.                                                                                                                                            | **Keep.** This is correct for catalog behavior.                                                                                     |
| scope.md                                   | Explains generated openui.json scope node + instance representation. Scope nodes carry `scopeDocument`; instance nodes do not.                                                                                                                                       | **Keep.** Correct catalog-generation detail.                                                                                        |
| template.scope.md                          | Explains that `scopeDocument` is derived from the source file path, not authored in each scope file.                                                                                                                                                                 | **Keep.** Correct source-to-catalog rule.                                                                                           |
| REQUIREMENTS.md                            | Says generated catalog links back to prose through `attrs.scopeDocument`.                                                                                                                                                                                            | **Keep.** Correct, and already referential to README.md.                                                                            |
| GENERATION.md                              | Describes current generator consuming minimal-openui.json scope-tree shape; mentions catalog fixtures must use scope-tree shape; says openui-sections.ts extracts scoped nodes with `attrs.scopeDocument`; incremental classifier maps scoped nodes to routed pages. | **Fix.** This is the main place where implementation status can be mistaken for generator contract.                                 |
| TEST_PLAN.md                               | Describes generator tests around canonical scope-tree OpenUI nodes and minimal-openui.json.                                                                                                                                                                          | **Fix / reframe.** Should say these are legacy/current coverage or catalog-slice coverage, not the full required `input.json` path. |
| tdd_based_generator_implementation_plan.md | Mentions validating non-empty trees with no scoped nodes and classifying routed pages from scoped OpenUI nodes with `attrs.scopeDocument`.                                                                                                                           | **Fix or archive.** This is stale planning language if it implies current requirements.                                             |
| output_generation.md                       | Documents PR #109 failure and says generator consumes “canonical scope-tree grammar” while widget grammar is not implemented.                                                                                                                                        | **Fix wording.** Good as a failure record, but should call it stale implementation/non-compliance, not a second grammar contract.   |
| generator_issue.md                         | The working analysis document we updated; describes scope-tree behavior as current non-compliance.                                                                                                                                                                   | **Keep as temporary analysis**, or later replace with actual issue/implementation docs.                                             |
| spec-json-generator-developer.agent.md     | Mentions keeping scope IDs aligned with the scope tree described in README.md.                                                                                                                                                                                       | **Keep.** It concerns spec JSON/catalog generation, not Angular generator input.                                                    |

### The main problematic documents

If the goal is to remove documentation inconsistency, prioritize these:

1. GENERATION.md
2. TEST_PLAN.md
3. tdd_based_generator_implementation_plan.md
4. output_generation.md

Those are the docs most likely to make the scope-tree implementation look like the generator contract.

### Legitimate scope-tree docs

These should **not** be removed, because they describe the catalog model correctly:

- README.md
- scope.md
- template.scope.md
- REQUIREMENTS.md

The distinction is:

- **Correct:** scope-tree / `attrs.scopeDocument` describes openui.json catalog traceability.
- **Incorrect:** scope-tree / `attrs.scopeDocument` is required for concrete generator `input.json`.

### Also relevant non-doc references

Not Markdown docs, but they reinforce the same current behavior:

- validate-spec.ts
  - Emits `Expected at least one scoped OpenUI node with attrs.scopeDocument.`
- openui-sections.ts
  - Extracts only nodes with `scopeDocument`.
- generate.ts
  - Has a comment referring to the `scope-tree pipeline`.
- generator.test.ts
  - Test names mention “canonical scope-tree OpenUI”.

Those will need code/test updates when the generator is fixed.

## Documentation consistency fix plan

Fix the inconsistency by editing only the documents that currently make the
scope-tree implementation look like the generator input contract. Do not create
a new SSOT; all artifact-role wording must point back to
`spec/README.md` → **Specification artifacts: grammar vs. catalog**.

### 1. Rewrite `generators/angular/docs/GENERATION.md`

Make `GENERATION.md` describe the required generator contract and architecture,
not the stale scope-tree implementation as a contract.

Required edits:

- Replace wording that says or implies the generator input is the scope-tree
  fixture shape.
- Add/keep a single reference to `spec/README.md` for artifact roles instead of
  restating those roles in Angular-specific language.
- State the required generator flow:
  `input.json` → grammar validation → catalog validation → UI IR → Angular model
  → generated files → incremental reconciliation.
- State that catalog/scope-tree fixtures are catalog fixtures only; they are not
  the generator input contract.
- State acceptance criteria: concrete fixtures such as `dialog.example.json`
  must generate and reconcile without adding `attrs.scopeDocument` to concrete
  app nodes.

Required wording principle:

- Good: “Catalog fixtures use scope nodes with `attrs.scopeDocument` as defined
  by `spec/README.md`.”
- Bad: “Generator input must contain scoped nodes with `attrs.scopeDocument`.”

### 2. Rewrite `generators/angular/docs/TEST_PLAN.md`

Make the test plan distinguish existing catalog/scope-tree regression coverage
from required concrete `input.json` acceptance coverage.

Required edits:

- Rename or reframe the `minimal-openui.json` tests as catalog/scope-tree
  regression coverage.
- Add a concrete input acceptance-test category for fixtures such as
  `dialog.example.json`.
- State that scope-tree tests do not define the generator input contract.
- State that concrete `input.json` fixtures must not need `attrs.scopeDocument`
  on app nodes.

### 3. Verify documentation consistency

After the edits, verify the documentation with search/review:

- Only `spec/README.md` defines the artifact roles.
- `docs/REQUIREMENTS.md` references the SSOT instead of redefining it.
- `generators/angular/docs/GENERATION.md` references the SSOT for the required
  input contract.
- No Angular generator doc states or implies that concrete `input.json` nodes
  must carry `attrs.scopeDocument`.
- Scope-tree language appears only in catalog, fixture, legacy implementation,
  or regression-test contexts.
- `output_generation.md` still preserves the PR #109 generator command and
  failure message as evidence; do not edit it only to hide the failure.

Suggested verification searches:

- Search Angular docs for `scope-tree`, `scoped OpenUI`, and `scopeDocument`.
- Search for the phrase `Generator input must contain scoped` or equivalent
  wording.
- Search for `dialog.example.json` references and confirm they describe a
  concrete `input.json` acceptance fixture.

### 4. Validate the documentation edit

Run validation after the edits:

- `git diff --check`
- repository Markdown/link checks if configured
- repository pre-commit checks when practical
