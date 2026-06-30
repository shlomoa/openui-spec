# Test Plan

This document describes the repository's spec and CI automated test strategy:
what each root test surface protects, how the suites are organized, and how to
run them. Angular generator and generated-examples validation lives in the
[Angular generator test plan](../generators/angular/docs/TEST_PLAN.md).

Root tests fall into two layers plus CI integration:

1. **Spec contract tests** (Python / `pytest`) — protect the golden source: the
   prose specification, scopes, schema, catalog, and published docs.
2. **Documentation validation** (`pre-commit`, `mkdocs`, `git diff --check`) —
   protects Markdown formatting, link consistency, and the published spec site.
3. **CI build workflow** (`.github/workflows/build.yml`) — runs root validation
   and Angular validation on every code-review event, and is itself asserted by a
   contract test.

The layering mirrors the [golden-source boundary](../generators/angular/docs/GENERATOR_STRUCTURE.md#golden-source-boundary):
the spec is authoritative, and downstream generators consume it rather than
redefining it.

## Layer 1 — Spec contract tests (`tests/`, pytest)

Run from the repository root through the local virtual environment:

```powershell
./.venv/Scripts/python -m pytest
```

These tests read the spec sources directly and fail when the hand-authored
golden source drifts from its own rules. Each file is a `unittest.TestCase`
discovered by `pytest`.

| Test file                       | Class                            | Protects                                                                                                                                                                                                                                              |
| ------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test_openui_spec_contract.py`  | `OpenUiSpecContractTest`         | `openui.schema.json` is a valid draft 2020-12 schema; `openui.json` validates against it, uses the required root values, matches the document shape, and references scope documents that exist; `SCHEMA_VERSION` matches the grammar version pattern. |
| `test_spec_readme_spec.py`      | `SpecReadmeSpecTest`             | `spec/` contains exactly the expected Markdown set; `spec/README.md` documents the minimal contract; the scope table links every scope document; `mkdocs` navigation points at the expected spec Markdown.                                            |
| `test_scope_template.py`        | `ScopeTemplateTest`              | `spec/scopes/template.scope.md` defines every required section; the scope index points at the single template; the attribute vocabulary matches the README.                                                                                           |
| `test_scope_evidence.py`        | `ScopeEvidenceRegisterTest`      | `spec/scopes/evidence.md` covers every leaf one-to-one and every entry cites a source and citation.                                                                                                                                                   |
| `test_dialog_scope_contract.py` | `DialogScopeContractTest`        | `Widgets/dialog.scope.md` fills every template section and documents its attribute contract.                                                                                                                                                          |
| `test_table_family_contract.py` | `TableFamilyContractTest`        | The `Controls/Table` family (`table` / `tr` / `th` / `td`) carries required sections and identity, cell tags document attributes, and container tags declare child types.                                                                             |
| `test_readthedocs_config.py`    | `ReadTheDocsConfigTest`          | Read the Docs builds via the mkdocs configuration and the mkdocs nav points only to existing spec docs.                                                                                                                                               |
| `test_github_actions_build.py`  | `GitHubActionsBuildWorkflowTest` | `build.yml` runs on code-review events, installs Python validation tools, runs repository and documentation checks, delegates to Angular validation, and pins its actions.                                                                            |

The worked example documents under `spec/examples/**` (31 schema-shaped OpenUI
documents, one per scope plus composite `scope.example.json` parents) are
currently covered for presence and indexing by `test_spec_readme_spec.py`
(`examples/README.md` is part of the expected spec set). Deep per-example schema
validation is not yet wired up; see [the gap note](#known-gaps).

Documentation validation runs alongside pytest in the same environment:

```powershell
./.venv/Scripts/pre-commit run --all-files
./.venv/Scripts/python -m mkdocs build --strict
git diff --check
```

## CI gate (`.github/workflows/build.yml`)

`build.yml` runs root validation and Angular validation on code-review events.
`test_github_actions_build.py` asserts the workflow keeps doing so: repository
checks, Python validation tooling, lint/format checks, strict MkDocs builds,
delegated Angular checks, and pinned action versions. Angular-specific local
commands and expectations are documented in the
[Angular generator test plan](../generators/angular/docs/TEST_PLAN.md).

## Conventions

- **Golden source is authoritative.** Layer 1 tests treat the prose spec, scopes,
  schema, and catalog as the source of truth; downstream validation must not
  redefine the contract.

## Known gaps

- The `spec/examples/**` worked documents are validated for presence and indexing
  but not yet individually parsed against `openui.schema.json`. Adding a contract
  test that loads each `*.example.json` and validates it against the schema would
  close the loop between the examples and the catalog grammar.
