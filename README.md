# OpenUI Specification

This repository contains a technology-independent specification for a Web UI framework. It also includes an Angular TypeScript generator that applies a UI description authored against the spec to an existing Angular workspace. The goal is to use the specification as the basis for a standard.

## Where to go

- **Using the specification** — read the published docs on ReadTheDocs: <https://openui-spec.readthedocs.io/>
- **Contributing / developing** — start with the [developer docs](#developer-docs).

## Repository map

| Path                                                             | What's here                                                                                                                        |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [`spec/`](spec/)                                                 | The specification source of truth — prose scope documents and the ReadTheDocs source; start at [`spec/README.md`](spec/README.md). |
| [`openui.json`](openui.json)                                     | Generated canonical machine-readable specification, built from `spec/scopes/`.                                                     |
| [`generators/angular/generator/`](generators/angular/generator/) | Angular Material generator (TypeScript npm package).                                                                               |
| [`docs/`](docs/)                                                 | Repository requirements and supporting documentation.                                                                              |
| `AGENTS.md` / `CLAUDE.md` / `GEMINI.md`                          | AI coding-assistant guides.                                                                                                        |
| [`CONTRIBUTING.md`](CONTRIBUTING.md)                             | How to contribute.                                                                                                                 |

## Developer docs

Contributor and developer entry points for this repository:

- [Contributing guide](CONTRIBUTING.md) — local setup and validation basics.
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

Run repository validation from the root through the local virtual environment:

```powershell
./.venv/Scripts/pre-commit run --all-files
./.venv/Scripts/python -m unittest discover -s tests -p "test_*.py"
./.venv/Scripts/python -m mkdocs build --strict
git diff --check
```

Root validation treats the prose spec, scopes, schema, examples, and generated
catalog as the source of truth for repository checks. Shared vocabulary is
defined in the [spec glossary](spec/README.md#glossary); tests and docs should
reference that vocabulary instead of duplicating definitions.
