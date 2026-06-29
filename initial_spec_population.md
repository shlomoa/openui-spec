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

### Step 1 — Roll out by top-level group in approved batches

Enrich leaves group by group, ordered by evidence availability (best-sourced
first, most abstract last). Each sub-step below is one batch: enrich every leaf in
the group from the registered evidence, regenerate `openui.json`, then approve
and validate before starting the next sub-step.

Per-batch acceptance criteria (apply to every sub-step):

- Every leaf in the group fills all template sections from registered evidence.
- Each leaf's `*.scope.md` prose documents its attribute keys (Uses / Produces /
  Behaves) and child model, per the leaf template; `openui.json` is not
  hand-edited for contracts.
- Groups not yet started remain concise and are not partially enriched.

Per-batch test: a parametrized group test marks the group `complete`; every leaf
in a `complete` group must pass the enriched-leaf contract assertions, and
`pending` groups are skipped.

Sub-steps (batches):

- **1.1 Controls** — `native`. HTML `input`; native presentation contract to
  confirm with the owner.
- **1.2 Widgets** — `charts`, `tables`, `lists`, `date_time_pickers`, `stepper`
  (`dialog` already piloted). HTML `table` / `ul` / `li`; Angular Material
  reference for pickers, stepper, and charts.
- **1.3 Containers** — `grid`, `expandable_panels`, `tabs`. HTML
  `details`/`summary`; ARIA tablist pattern.
- **1.4 Views** — `reports`, `forms`. HTML form controls and tabular data.
- **1.5 Behaviors** — `drag_and_drop`, `resizable`, `collapsible`. HTML
  drag-and-drop; owner decisions likely.
- **1.6 Pages** — `dashboard`, `shell_page`, `empty_page`. Layout composition;
  some abstract.
- **1.7 Application** — `favicon` (HTML `link rel="icon"`), `index_html` (HTML
  document head); `routing`, `navigation`, `tool_bars` require owner decisions.

### Step 2 — Extend focused tests with each batch

Add at least one public-contract assertion per enriched scope.

Acceptance criteria:

- Every enriched leaf is covered by at least one contract assertion.
- Spec tests assert no technology-specific detail.

Test: a coverage-guard test fails if an enriched leaf (a Step 1 `complete` group)
has no associated contract assertion.

### Step 3 — Full validation and review

Run the complete suite and review the enriched set.

Acceptance criteria:

- `pre-commit`, `mkdocs build --strict`, `pytest`, and the Angular generator
  tests pass; `git diff --check` is clean.
- The enriched set satisfies the global invariants above.

Test: `tests/test_github_actions_build.py` confirms the CI workflow runs the full
sequence (`pre-commit`, `mkdocs build --strict`, `pytest`, generator tests).
