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

### Step 1 — Extend focused tests with each batch

Add at least one public-contract assertion per enriched scope.

Acceptance criteria:

- Every enriched leaf is covered by at least one contract assertion.
- Spec tests assert no technology-specific detail.

Test: a coverage-guard test fails if an enriched leaf (a Step 1 `complete` group)
has no associated contract assertion.

### Step 2 — Full validation and review

Run the complete suite and review the enriched set.

Acceptance criteria:

- `pre-commit`, `mkdocs build --strict`, `pytest`, and the Angular generator
  tests pass; `git diff --check` is clean.
- The enriched set satisfies the global invariants above.

Test: `tests/test_github_actions_build.py` confirms the CI workflow runs the full
sequence (`pre-commit`, `mkdocs build --strict`, `pytest`, generator tests).
