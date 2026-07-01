# Root Test Suite Plan

This document describes the Python tests implemented under `tests/`: what each
module protects and how to run the suite locally. The repository-level
validation strategy, documentation-validation commands, and CI gate overview
live in the [root validation test plan](../docs/TEST_PLAN.md).

Run from the repository root through the local virtual environment:

```powershell
./.venv/Scripts/python -m pytest
```

These tests read the spec sources directly and fail when the hand-authored
golden source drifts from its own rules. Each file is a `unittest.TestCase`
discovered by `pytest`.

| Test file                                  | Class                               | Protects                                                                                                                                                                                                                                              |
| ------------------------------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test_application_scope_contract.py`       | `ApplicationScopeContractTest`      | Application scopes (`routing`, `navigation`, `tool_bars`, `favicon`, and `index_html`) fill required template sections, expose their current attribute and child contracts, and keep Application worked examples within those contracts.              |
| `test_dialog_scope_contract.py`            | `DialogScopeContractTest`           | `Widgets/dialog.scope.md` fills every template section and documents its attribute contract.                                                                                                                                                          |
| `test_enriched_scope_contract_coverage.py` | `EnrichedScopeContractCoverageTest` | Every template-enriched leaf is covered by the guard list, and each covered leaf asserts its public attribute and child-type contract.                                                                                                                |
| `test_github_actions_build.py`             | `GitHubActionsBuildWorkflowTest`    | `build.yml` runs on code-review events, installs Python validation tools, runs repository and documentation checks, delegates to Angular validation, and pins its actions.                                                                            |
| `test_openui_spec_contract.py`             | `OpenUiSpecContractTest`            | `openui.schema.json` is a valid draft 2020-12 schema; `openui.json` validates against it, uses the required root values, matches the document shape, and references scope documents that exist; `SCHEMA_VERSION` matches the grammar version pattern. |
| `test_pages_scope_contract.py`             | `PagesScopeContractTest`            | Page scopes (`dashboard`, `shell_page`, and `empty_page`) fill required template sections, expose their current relationships, and keep Pages worked examples within those contracts.                                                                 |
| `test_readthedocs_config.py`               | `ReadTheDocsConfigTest`             | Read the Docs builds via the mkdocs configuration and the mkdocs nav points only to existing spec docs.                                                                                                                                               |
| `test_scope_evidence.py`                   | `ScopeEvidenceRegisterTest`         | `spec/scopes/evidence.md` covers every leaf one-to-one and every entry cites a source and citation.                                                                                                                                                   |
| `test_scope_template.py`                   | `ScopeTemplateTest`                 | `spec/scopes/template.scope.md` defines every required section; the scope index points at the single template; the attribute vocabulary matches the README.                                                                                           |
| `test_scope_to_json_converter.py`          | `ScopeToJsonConverterTest`          | The `spec.to_json` converter parses leaf scopes, builds the scope tree and `openui.json` document, writes requested output, parses every leaf scope, and fails fast on malformed object links, identity, attribute, or child-model entries.           |
| `test_spec_examples_format.py`             | `SpecExamplesFormatTest`            | Every worked example document under `spec/examples/**/*.example.json` validates against `openui.schema.json`, including the canonical root values expected by the schema.                                                                             |
| `test_spec_readme_spec.py`                 | `SpecReadmeSpecTest`                | `spec/` contains exactly the expected Markdown set; `spec/README.md` documents the minimal contract; the scope table links every scope document; `mkdocs` navigation points at the expected spec Markdown.                                            |
| `test_table_family_contract.py`            | `TableFamilyContractTest`           | The `Controls/Table` family (`table` / `tr` / `th` / `td`) carries required sections and identity, cell tags document attributes, and container tags declare child types.                                                                             |

The worked example documents under `spec/examples/**` are covered for presence
and indexing by the README/spec contract tests (`examples/README.md` is part of
the expected spec set). The examples-format contract tests also load every
`*.example.json` document and validate it against `openui.schema.json`, closing
the loop between examples and the catalog grammar.

## Conventions

- **Golden source is authoritative.** These tests treat the prose spec, scopes,
  schema, examples, and catalog as the source of truth; downstream generator
  validation must not redefine the contract.
