# Contributing

## Repository documentation structure

- [Requirements and goals](docs/REQUIREMENTS.md).
- [Spec artifacts: grammar vs. catalog](spec/README.md#specification-artifacts-grammar-vs-catalog)
  — how `openui.schema.json` and `openui.json` differ.
- Angular generator: [generation architecture, flow, and validation](generators/angular/generator/docs/GENERATION.md)
  and [AMCG TDD workflow](generators/angular/generator/docs/TDD.md).
- [Root Python test-suite plan](tests/TEST_PLAN.md) — implemented Python test
  modules under `tests/` and their local run command.
- [Validation routing note](docs/TEST_PLAN.md) — pointers to the validation
  documentation sources of truth.
- AI-agent guides: [AGENTS.md](AGENTS.md), [CLAUDE.md](CLAUDE.md), [GEMINI.md](GEMINI.md),
  and [copilot-instructions.md](.github/copilot-instructions.md).

## Repository map

| Path                                                             | What's here                                                                                                                        |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [`spec/`](spec/)                                                 | The specification source of truth — prose scope documents and the ReadTheDocs source; start at [`spec/README.md`](spec/README.md). |
| [`spec/openui.json`](spec/openui.json)                           | Generated canonical machine-readable specification, built from `spec/scopes/`.                                                     |
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

## Local validation

Use a repository-local Python virtual environment for validation tooling.

Windows (PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install pre-commit==4.6.0 -r requirements-test.txt
.\.venv\Scripts\python -m unittest discover -s tests -p 'test_*.py'
.\.venv\Scripts\pre-commit run --all-files
```

Linux or macOS (Bash):

```bash
python3 -m venv .venv
./.venv/bin/python -m pip install pre-commit==4.6.0 -r requirements-test.txt
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
   published spec site.
3. **CI build workflow** (`.github/workflows/build.yml`) — runs root validation
   on code-review events. `tests/test_github_actions_build.py` asserts the
   workflow keeps running repository checks, Python validation tooling,
   lint/format checks, strict MkDocs builds, Angular generator validation, and
   pinned action versions.

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

CI runs this validation on both Windows and Linux.

Root validation treats the prose spec, scopes, schema, examples, and generated
catalog as the source of truth for repository checks. Shared vocabulary is
defined in the [spec glossary](spec/README.md#glossary); tests and docs should
reference that vocabulary instead of duplicating definitions.

---
