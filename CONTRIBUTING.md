# Contributing

## Repository documentation structure

- [Requirements and goals](docs/REQUIREMENTS.md).
- [Spec artifacts: grammar vs. catalog](spec/README.md#specification-artifacts-grammar-vs-catalog)
  — how the authoritative `EBNF.txt`, its `openui.schema.json` projection, and
  `openui.json` catalog differ.
- Angular generator: [generation architecture, flow, and validation](generators/angular/generator/docs/GENERATION.md).
- [Root Python test-suite plan](tests/TEST_PLAN.md) — implemented Python test
  modules under `tests/` and their local run command.
- [Repository validation](#repository-validation) — validation layers, commands,
  and the CI gate overview.
- AI-agent guides: [AGENTS.md](AGENTS.md), [CLAUDE.md](CLAUDE.md), [GEMINI.md](GEMINI.md),
  and [copilot-instructions.md](.github/copilot-instructions.md).

## Repository map

| Path                                                             | What's here                                                                                                                        |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [`spec/`](spec/)                                                 | The specification source of truth — prose scope documents and the ReadTheDocs source; start at [`spec/README.md`](spec/README.md). |
| [`spec/openui.json`](spec/openui.json)                           | Generated canonical machine-readable specification, built from `spec/scopes/`.                                                     |
| [`package.json`](package.json)                                   | Framework-neutral TypeScript/npm package for OpenUI JSON documents.                                                                |
| [`generators/angular/generator/`](generators/angular/generator/) | Angular Material generator (TypeScript npm package).                                                                               |
| [`docs/`](docs/)                                                 | Repository requirements and supporting documentation.                                                                              |
| `AGENTS.md` / `CLAUDE.md` / `GEMINI.md`                          | AI coding-assistant guides.                                                                                                        |
| [`CONTRIBUTING.md`](CONTRIBUTING.md)                             | How to contribute.                                                                                                                 |

---

## Angular Material generator

The initial Angular Material generator lives in `generators/angular/generator`. It is a TypeScript npm package that reads an OpenUI input document, validates it, normalizes it into an implementation-independent UI model, and emits a standalone Angular Material application skeleton.

Use it locally from the package directory:

```bash
cd generators/angular/generator
npm ci
npm run build
npm test
node dist/src/cli/main.js validate --input tests/fixtures/minimal-openui.json
node dist/src/cli/main.js generate --input tests/fixtures/minimal-openui.json --out /tmp/openui-angular-app
```

The direct `node dist/src/cli/main.js` commands require `npm run build` to complete successfully first so the `dist` output exists. Re-run the build after changing generator source files.

The generated app includes Angular routing, a Material shell and navigation, global theme styles, and per-section pages for the specification areas currently mapped by the generator. Keep generator changes aligned with the compiler-style pipeline documented in `generators/angular/generator/docs/GENERATION.md`: load, validate, normalize, build the UI model, map to Angular, emit files, and verify.

---

## OpenUI JSON npm package

The repository root is the `@shlomoa/openui-spec` npm package. Its build
uses the canonical files under `spec/` directly and must be run from the
repository root:

```bash
npm ci
npm test
```

---

## Local validation

Use a repository-local Python virtual environment for validation tooling.

Windows (PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install pre-commit==4.6.0 -r requirements-test.txt
.\.venv\Scripts\pre-commit install
.\.venv\Scripts\python -m unittest discover -s tests -p 'test_*.py'
.\.venv\Scripts\pre-commit run --all-files
```

Linux or macOS (Bash):

```bash
python3 -m venv .venv
./.venv/bin/python -m pip install pre-commit==4.6.0 -r requirements-test.txt
./.venv/bin/pre-commit install
./.venv/bin/python -m unittest discover -s tests -p 'test_*.py'
./.venv/bin/pre-commit run --all-files
```

---

## Repository validation

Repository validation has three root layers:

1. **Spec contract tests** (`tests/`, Python `unittest`) — protect the golden
   source: the prose specification, scopes, schema, catalog, examples, and
   published docs. The implemented test-module matrix lives in the
   [root Python test-suite plan](tests/TEST_PLAN.md).
2. **Documentation validation** (`pre-commit`, `mkdocs`, `git diff --check`) —
   protects Markdown formatting, link consistency, generated examples, and the
   published spec site. The local pre-commit hooks run the validation tools in
   `spec/bin/` (see [Spec tools](#spec-tools)).
3. **CI build workflow** (`.github/workflows/build.yml`) — runs root validation
   on code-review events. `tests/test_github_actions_build.py` asserts the
   workflow keeps running repository checks, Python validation tooling,
   lint/format checks, strict MkDocs builds, the OpenUI JSON package, Angular
   generator validation, and pinned action versions.

Run repository validation from the root through the local virtual environment.

Windows (PowerShell):

```powershell
.\.venv\Scripts\pre-commit run --all-files
.\.venv\Scripts\python -m unittest discover -s tests -p "test_*.py"
.\.venv\Scripts\python -m mkdocs build --strict
git diff --check
```

Linux or macOS (Bash):

```bash
./.venv/bin/pre-commit run --all-files
./.venv/bin/python -m unittest discover -s tests -p "test_*.py"
./.venv/bin/python -m mkdocs build --strict
git diff --check
```

CI runs this validation on Ubuntu, Windows, and macOS.

### Spec tools

The spec converter and validators live in `spec/bin/`. Run each one from the
repository root with the virtual-environment Python (`python -m <module>`):

| Module                               | Pre-commit hook              | What it does                                                                                                                                                                                                            |
| ------------------------------------ | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `spec.bin.to_json`                   | —                            | Regenerates `spec/openui.json` from `spec/scopes/` (`--spec-dir spec --output spec/openui.json`).                                                                                                                       |
| `spec.bin.check_grammar_consistency` | `openui-grammar-consistency` | Verifies EBNF/schema consistency, validates the committed catalog against both formats, and ensures `spec/openui.json` is fresh from `spec/scopes/` and `SCHEMA_VERSION`.                                               |
| `spec.bin.lint_spec`                 | `openui-spec-lint`           | Spec-content lint: every leaf `*.scope.md` has the template sections and exactly one `evidence.md` row; glossary terms are defined only in `spec/scopes/scope.md#glossary`. `--html <path>` also writes an HTML report. |
| `spec.bin.check_links`               | `markdown-internal-links`    | Checks that relative Markdown links and `#anchors` (GitHub heading slugs) resolve. External links are not fetched. With no arguments it checks every tracked Markdown file.                                             |

`spec/EBNF.txt` is the source of truth for the OpenUI document format, while
`spec/scopes/` is the source of truth for catalog content. The schema, examples,
and generated catalog are checked projections or artifacts of those sources.
Shared vocabulary is defined in the [spec glossary](spec/scopes/scope.md#glossary);
tests and docs should reference that vocabulary instead of duplicating
definitions.

---
