# Initial Spec Population Follow-up Plan

This document tracks only open decisions, partially completed work, and ongoing maintenance items that can still change the spec contract. Completed tasks are intentionally omitted.

## 1. Expand scope details only from approved source material

Status: **Planned; per-step execution gated on approved source material**.

Follow-up rule:

- Do not invent deep behavior just to make files longer.
- Add details only when supported by `spec/README.md`, requirements, source
  evidence, tests, or an explicit project decision.

Global invariants (every step must hold these):

- Single source of truth is critical: as `spec/README.md`, `spec/scopes/**`,
  `openui.json`, and `openui.schema.json` are continually reconciled, every
  definition lives in exactly one file and every other use references it — never
  a second copy that can drift.
- Enriched files stay technology-independent; Angular Material appears only as
  clearly marked reference patterns.
- `openui.json`, `spec/scopes/**`, the README scope table, and `mkdocs.yml` do
  not disagree about scopes.
- Each step ends green: `pre-commit`, `mkdocs build --strict`, and `pytest` pass.

Authored contract vs generated `openui.json`: each leaf's contract is authored
**only** in its `*.scope.md` prose (Attributes + Child model). `openui.json` is a
derived artifact generated from that prose — it is never hand-edited for
contracts. The generated `openui.json` represents each contract as a typed
instance child under the metadata-only scope node, per the serialization rule in
`spec/scopes/scope.md`.

### Step 1 — Define the shared leaf-scope template

There is exactly one shared leaf-scope template, and it is the single source of
truth for how every leaf `*.scope.md` is structured. Define it once in
`spec/scopes/scope.md` with fixed sections (Purpose; Attributes as Uses
`[value]` / Produces `(selectionChange)` / Behaves `(click)`; Child model;
Accessibility; Validation notes), derived by reference — not by copy — from the
`attrs` categories in `spec/README.md` and the `openui.schema.json` element
shape.

Acceptance criteria:

- The template is defined once in `spec/scopes/scope.md`; no other file restates
  its section list or attribute vocabulary.
- Each section references its single source (a `spec/README.md` `attrs` category
  or an `openui.schema.json` field) rather than redefining it; the template
  introduces no new concept.
- Leaf files reference the template instead of duplicating its structure.

Test: `tests/test_scope_template.py` asserts the template section set is declared
only in `spec/scopes/scope.md` (no other spec file restates it) and that its
attribute vocabulary matches the Uses/Produces/Behaves categories in
`spec/README.md`.

### Step 2 — Register approved source evidence per leaf

For each leaf `*.scope.md`, record the supporting source (a requirement, a
`spec/README.md` rule, an explicit decision, an HTML standard primitive such as
`input` or `table`, or an external framework implementation example such as
Angular Material) in a single evidence register file, `spec/scopes/evidence.md` —
the one source of truth for scope-to-source traceability, kept beside `scope.md`
and the leaves. When a leaf has no approved
source, request evidence from the project owner before it is enriched — leaves
are never marked deferred and never enriched without supplied evidence. Add no
enrichment content in this step.

Example evidence entries:

| Leaf scope | Source | Citation | Authorizes |
| --- | --- | --- | --- |
| `scopes/Behaviors/drag_and_drop.scope.md` | `spec/README.md` scope table | "Move elements within a page, view, container, or widget." | Purpose; Child model = applies to page, view, container, and widget scopes. Specific attribute keys require an explicit owner decision. |
| `scopes/Widgets/date_time_pickers.scope.md` | Angular Material reference (`mat-date-range-input`) | `matStartDate` / `matEndDate` inputs and the `(dateChange)` output | Attributes, recorded technology-independently with the Angular Material binding shown only as a reference pattern |
| `scopes/Controls/native.scope.md` | HTML primitive (`input`) | Standard `input` element attributes (`type`, `value`, `placeholder`, `disabled`) | Attributes, drawn from the HTML standard and recorded technology-independently |

Acceptance criteria:

- All evidence lives in the single register file `spec/scopes/evidence.md`; it is
  not scattered across leaves, and is wired into `mkdocs.yml` nav and the
  expected spec-markdown set.
- Every leaf under `spec/scopes/**` has exactly one evidence entry; none is
  marked deferred.
- Each entry cites a concrete source (requirement, `spec/README.md` rule,
  recorded decision, HTML standard primitive, or external framework example) and
  states what it authorizes.
- Framework-sourced evidence (e.g., Angular Material) is marked as a reference
  pattern only; the authorized content stays technology-independent, per the
  global invariants.
- The register references no scope that is absent from `spec/scopes/**`.

Test: a contract test asserts the evidence register and the `spec/scopes/**` leaf
set are in exact one-to-one correspondence, and that every entry has a non-empty
source citation.

### Step 3 — Enrich one pilot leaf end-to-end

Fully populate the template for one approved leaf in its `*.scope.md` prose — the
authored contract — and set the reference pattern. `openui.json` is not
hand-edited; it is generated from the prose.

Acceptance criteria:

- The pilot leaf fills every template section from registered evidence only.
- The pilot leaf's Attributes and Child model document the contract (Uses /
  Produces / Behaves keys and child types) from neutral evidence; no contract is
  hand-written into `openui.json`.

Test: a focused contract test asserts the pilot leaf contains all template
sections and documents the attribute contract.

### Step 4 — Roll out by top-level group in approved batches

Enrich leaves group by group, ordered by evidence availability (best-sourced
first, most abstract last). Each sub-step below is one batch: enrich every leaf in
the group (leaf template + `openui.json` instance node + register update), then
approve and validate before starting the next sub-step.

Per-batch acceptance criteria (apply to every sub-step):

- Every leaf in the group fills all template sections from registered evidence.
- Each leaf's `*.scope.md` prose documents its attribute keys (Uses / Produces /
  Behaves) and child model, per the leaf template; `openui.json` is not
  hand-edited for contracts.
- Groups not yet started remain concise and are not partially enriched.

Per-batch test: a parametrized group test marks the group `complete`; every leaf
in a `complete` group must pass the Step 3 contract assertions, and `pending`
groups are skipped.

Sub-steps (batches):

- **4.1 Controls** — `native`. HTML `input`; native presentation contract to
  confirm with the owner.
- **4.2 Widgets** — `charts`, `tables`, `lists`, `date_time_pickers`, `stepper`
  (`dialog` already piloted). HTML `table` / `ul` / `li`; Angular Material
  reference for pickers, stepper, and charts.
- **4.3 Containers** — `grid`, `expandable_panels`, `tabs`. HTML
  `details`/`summary`; ARIA tablist pattern.
- **4.4 Views** — `reports`, `forms`. HTML form controls and tabular data.
- **4.5 Behaviors** — `drag_and_drop`, `resizable`, `collapsible`. HTML
  drag-and-drop; owner decisions likely.
- **4.6 Pages** — `dashboard`, `shell_page`, `empty_page`. Layout composition;
  some abstract.
- **4.7 Application** — `favicon` (HTML `link rel="icon"`), `index_html` (HTML
  document head); `routing`, `navigation`, `tool_bars` require owner decisions.

### Step 5 — Regenerate `openui.json` from the enriched prose

`openui.json` is a derived artifact generated from the prose scopes; it is not
hand-edited for contracts. Once the prose→`openui.json` generator exists,
regenerate it so every enriched leaf's contract appears as its instance node.

Acceptance criteria:

- `openui.json` is produced from the prose, not hand-authored; the generated tree
  validates against `openui.schema.json` with no scope drift.
- Until the generator exists, `openui.json` carries scope metadata only and is not
  hand-edited with contracts.

Test: extend `tests/test_openui_spec_contract.py` (with the generator) to assert
the generated `openui.json` matches the prose contracts.

### Step 6 — Extend focused tests with each batch

Add at least one public-contract assertion per enriched scope.

Acceptance criteria:

- Every enriched leaf is covered by at least one contract assertion.
- Spec tests assert no technology-specific detail.

Test: a coverage-guard test fails if an enriched leaf (a Step 4 `complete` group)
has no associated contract assertion.

### Step 7 — Full validation and review

Run the complete suite and review the enriched set.

Acceptance criteria:

- `pre-commit`, `mkdocs build --strict`, `pytest`, and the Angular generator
  tests pass; `git diff --check` is clean.
- The enriched set satisfies the global invariants above.

Test: `tests/test_github_actions_build.py` confirms the CI workflow runs the full
sequence (`pre-commit`, `mkdocs build --strict`, `pytest`, generator tests).
