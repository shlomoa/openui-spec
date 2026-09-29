# Contributing

## Repository documentation structure

- [Requirements and goals](docs/REQUIREMENTS.md).
- [Specification](spec/README.md): the numbered outline (parts 1–6 and Annexes A–C),
  the [conformance](spec/README.md#2-conformance) rules and the
  [spec artifacts](spec/README.md#41-specification-artifacts).
- Angular generator: [generation architecture, flow, and validation](generators/angular/generator/docs/GENERATION.md).
- [Root Python test-suite plan](tests/TEST_PLAN.md) — the test modules under
  `tests/` and `spec/tests/`.
- [Repository validation](#repository-validation) — validation layers, commands,
  and the CI gate overview.
- [Releasing](RELEASING.md) — version rules, release validation, tagging and
  publishing.
- AI-agent guides: [AGENTS.md](AGENTS.md), the single source of AI-assistant guidance;
  [CLAUDE.md](CLAUDE.md), [GEMINI.md](GEMINI.md) and
  [copilot-instructions.md](.github/copilot-instructions.md) only reference it. The
  custom agents are in [`.github/agents/`](.github/agents/).

## Repository map

| Path                                                                                        | What's here                                                                                                                                                           |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`spec/`](spec/)                                                                            | The specification source of truth and the Read the Docs source; start at [`spec/README.md`](spec/README.md).                                                          |
| [`spec/scopes/`](spec/scopes/scope.md)                                                      | The glossary, the scope tree and the object contracts (`*.scope.md`), the taxonomy mapping and the evidence register.                                                 |
| [`spec/taxonomy/`](spec/taxonomy/)                                                          | The generic UI taxonomy, the UI element taxonomy, their images and the generated pages `generic-ui-taxonomy.html` and `taxonomy-tree.html`.                           |
| [`spec/EBNF.txt`](spec/EBNF.txt), [`spec/openui.schema.json`](spec/openui.schema.json)      | The authoritative document grammar and its JSON Schema projection.                                                                                                    |
| [`spec/openui.json`](spec/openui.json)                                                      | The generated catalog, built from `spec/scopes/`.                                                                                                                     |
| [`spec/conformance/`](spec/conformance/README.md)                                           | The conformance suite: valid and invalid documents with their expected diagnostics.                                                                                   |
| [`spec/examples/`](spec/examples/README.md)                                                 | The worked examples, one document per scope (generated, see [Examples and fixtures](#examples-and-fixtures)).                                                         |
| [`spec/playground.html`](spec/playground.html)                                              | The playground: paste a document, see its validation and element tree.                                                                                                |
| [`spec/bin/`](#spec-tools), [`spec/tests/`](spec/tests/)                                    | The spec tools and the EBNF parser tests.                                                                                                                             |
| [`spec/survey/`](spec/survey/)                                                              | The framework surveys, the v1 publish plan and the change records (`*.done.md` applied, `*.notdone.md` not applied). Excluded from pre-commit and the published site. |
| [`bin/`](bin/), [`pyproject.toml`](pyproject.toml)                                          | The `openui-spec` Python package, including the parse, model and validate API `bin/openui_document.py`.                                                               |
| [`src/`](src/), [`package.json`](package.json)                                              | The `@shlomoa/openui-spec` npm package, including the same API in `src/document.ts`.                                                                                  |
| [`tests/`](tests/TEST_PLAN.md)                                                              | The spec-contract Python tests and the npm package tests.                                                                                                             |
| [`generators/angular/generator/`](generators/angular/generator/)                            | The Angular Material generator (TypeScript npm package) and its fixtures.                                                                                             |
| [`generators/angular/generated-examples/`](generators/angular/generated-examples/README.md) | The Angular app that shows the generator's output style and the spec examples.                                                                                        |
| [`docs/`](docs/)                                                                            | Repository requirements.                                                                                                                                              |
| `AGENTS.md` / `CLAUDE.md` / `GEMINI.md`                                                     | AI coding-assistant guides.                                                                                                                                           |

---

## Specification changes

The specification sources are `spec/EBNF.txt` for the document format and
`spec/scopes/` for the catalog content. The schema, the catalog, the examples and
the fixtures are checked projections or generated artifacts of those sources.
Shared vocabulary is defined in the [spec glossary](spec/scopes/scope.md#glossary);
tests and docs reference it instead of repeating definitions.

Every specification change is a new spec version. Follow
[RELEASING § Schema and catalog version changes](RELEASING.md#schema-and-catalog-version-changes)
before the change is merged.

### Examples and fixtures

The worked examples under `spec/examples/` and the generator fixtures under
`generators/angular/generator/tests/fixtures/` are generated, never written by hand:

- New or changed content is generated with the
  [Spec JSON File Generator](.github/agents/spec-json-file-generator.agent.md) agent,
  from the scope contracts and the approved change records.
- A format change is applied with a tool, such as `python -m spec.bin.migrate`
  ([Spec tools](#spec-tools)).
- The input fixtures stay synchronized with their examples.

The tests check that every example and fixture is valid at the current spec version.

---

## Angular Material generator

The Angular Material generator lives in `generators/angular/generator`. It is a TypeScript npm package that reads an OpenUI input document, validates it, normalizes it into an implementation-independent UI model, and emits a standalone Angular Material application skeleton.

Use it locally from the package directory:

```bash
cd generators/angular/generator
npm ci
npm run build
npm test
node dist/src/main.js validate --input tests/fixtures/minimal-openui.json
node dist/src/main.js generate --input tests/fixtures/minimal-openui.json --out <output-folder>
```

The direct `node dist/src/main.js` commands need a successful `npm run build`, so the `dist` output exists. Re-run the build after changing generator source files.

Keep generator changes aligned with the compiler-style pipeline documented in `generators/angular/generator/docs/GENERATION.md`: load, validate, normalize, build the UI model, map to Angular, emit files, and verify.

---

## OpenUI JSON packages

Both packages parse, model and validate OpenUI documents with the same API and the
same diagnostics, and both pass the [conformance suite](spec/conformance/README.md):

- Python: `bin/openui_document.py` (`parse`, `validate`, `validate_text`, `Catalog`,
  `Document`, `Element`, `Attribute`, `Diagnostic`, `OpenUiParseError`).
- TypeScript: `src/document.ts`, exported from `@shlomoa/openui-spec` (`parse`,
  `validate`, `validateText` and the same classes).

The repository root is the `@shlomoa/openui-spec` npm package. Its build uses the
canonical files under `spec/` directly and must be run from the repository root
(`npm ci`, `npm test`).

---

## Local setup

- Python 3.12 or newer, in a repository-local virtual environment. Do not install
  Python packages globally.
- Node.js `^22.22.3`, `^24.15.0` or `>=26.0.0`, and npm 11 or newer (the `engines` of
  `package.json`). The `generated-examples` app needs the same Node versions, because
  Angular 22 requires them. CI uses Node 22.

Windows (PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install pre-commit==4.6.0 -r requirements-test.txt -r requirements-docs.txt
.\.venv\Scripts\pre-commit install
```

Linux or macOS (Bash):

```bash
python3 -m venv .venv
./.venv/bin/python -m pip install pre-commit==4.6.0 -r requirements-test.txt -r requirements-docs.txt
./.venv/bin/pre-commit install
```

---

## Repository validation

Repository validation has three root layers:

1. **Spec contract tests** (`tests/` and `spec/tests/`, Python `unittest`) — protect
   the golden source: the prose specification, scopes, schema, catalog, conformance
   suite, examples, and published docs. The test-module matrix lives in the
   [root Python test-suite plan](tests/TEST_PLAN.md).
2. **Documentation validation** (`pre-commit`, `mkdocs`, `git diff --check`) —
   protects formatting, links, the generated catalog and pages, and the published
   spec site. The pre-commit hooks are general file checks, ruff, yamllint,
   prettier (JSON and Markdown), markdownlint and the local hooks that run the
   [spec tools](#spec-tools).
3. **CI build workflow** (`.github/workflows/build.yml`) — runs every command below
   on Ubuntu, Windows, and macOS on every push and pull request.
   `tests/test_github_actions_build.py` checks that the workflow keeps doing so.

Run all of it from the repository root through the local virtual environment.

Windows (PowerShell):

```powershell
.\.venv\Scripts\pre-commit run --all-files
git diff --check
.\.venv\Scripts\python -m unittest discover -s tests -p 'test_*.py'
.\.venv\Scripts\python -m unittest discover -s spec\tests -p 'test_*.py'
.\.venv\Scripts\python -m mkdocs build --strict
npm ci
npm test
Push-Location generators\angular\generator
npm ci
npm run build
npm test
Pop-Location
Push-Location generators\angular\generated-examples
npm ci
npm run format:check
npm run lint
npm test
npm run build
Pop-Location
```

Linux or macOS (Bash):

```bash
./.venv/bin/pre-commit run --all-files
git diff --check
./.venv/bin/python -m unittest discover -s tests -p 'test_*.py'
./.venv/bin/python -m unittest discover -s spec/tests -p 'test_*.py'
./.venv/bin/python -m mkdocs build --strict
npm ci
npm test
(
  cd generators/angular/generator
  npm ci
  npm run build
  npm test
)
(
  cd generators/angular/generated-examples
  npm ci
  npm run format:check
  npm run lint
  npm test
  npm run build
)
```

### Spec tools

The spec converter, validators and renderers live in `spec/bin/`. Run each one from
the repository root with the virtual-environment Python (`python -m <module>`):

| Module                               | Pre-commit hook              | What it does                                                                                                                                                                                                                                                        |
| ------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `spec.bin.to_json`                   | —                            | Regenerates `spec/openui.json` from `spec/scopes/` (`--spec-dir spec --output spec/openui.json`).                                                                                                                                                                   |
| `spec.bin.check_grammar_consistency` | `openui-grammar-consistency` | Verifies that the EBNF and the schema accept and reject the same [conformance suite](spec/conformance/README.md) documents, validates the committed catalog against both formats, and ensures `spec/openui.json` is fresh from `spec/scopes/` and `SCHEMA_VERSION`. |
| `spec.bin.lint_spec`                 | `openui-spec-lint`           | Spec-content lint: every leaf `*.scope.md` has the template sections and exactly one `evidence.md` row; glossary terms are defined only in `spec/scopes/scope.md#glossary`. `--html <path>` also writes an HTML report.                                             |
| `spec.bin.render_taxonomy_html`      | `generic-taxonomy-html`      | Renders `spec/taxonomy/generic-ui-taxonomy.md` as the self-contained `spec/taxonomy/generic-ui-taxonomy.html` (images embedded). `--check` fails when the HTML is out of date.                                                                                      |
| `spec.bin.render_taxonomy_tree`      | `taxonomy-tree-html`         | Renders `spec/scopes/taxonomy_mapping.md` as the interactive `spec/taxonomy/taxonomy-tree.html`: a collapsible tree of sections, subcategories and entries, with the four alias columns as a per-source name overlay. `--check` fails when the page is out of date. |
| `spec.bin.migrate`                   | —                            | Migrates OpenUI documents from the 0.5 `[x]` / `(x)` attribute keys to the typed `uses.` / `produces.` / `behaves.` keys and typed literal values; a folder argument migrates every document in it. `--check` only reports.                                         |
| `spec.bin.check_links`               | `markdown-internal-links`    | Checks that relative Markdown links and `#anchors` (GitHub heading slugs) resolve. External links are not fetched. With no arguments it checks every tracked Markdown file.                                                                                         |

---
