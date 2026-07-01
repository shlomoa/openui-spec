# Test Plan

This document describes the repository's root spec and CI automated test
strategy: what each root test surface protects, how the suites are organized,
and how to run them.

Root tests fall into two layers plus CI integration:

1. **Spec contract tests** (Python / `pytest`) — protect the golden source: the
   prose specification, scopes, schema, catalog, and published docs.
2. **Documentation validation** (`pre-commit`, `mkdocs`, `git diff --check`) —
   protects Markdown formatting, link consistency, and the published spec site.
3. **CI build workflow** (`.github/workflows/build.yml`) — runs root validation
   on every code-review event, and is itself asserted by a contract test.

Root validation treats the spec as authoritative and validates the prose,
schema, catalog, examples, and published docs without redefining their
contracts.

## Layer 1 — Spec contract tests (`tests/`, pytest)

The Python contract tests read the spec sources directly and fail when the
hand-authored golden source drifts from its own rules. Their implemented test
module matrix and local run command live in the
[root test-suite plan](../tests/TEST_PLAN.md).

Documentation validation runs alongside pytest in the same environment:

```powershell
./.venv/Scripts/pre-commit run --all-files
./.venv/Scripts/python -m mkdocs build --strict
git diff --check
```

## CI gate (`.github/workflows/build.yml`)

`build.yml` runs root validation on code-review events.
`test_github_actions_build.py` asserts the workflow keeps doing so: repository
checks, Python validation tooling, lint/format checks, strict MkDocs builds, and
pinned action versions.

## Conventions

- **Golden source is authoritative.** Root validation treats the prose spec,
  scopes, schema, examples, and catalog as the source of truth.
