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
| [`docs/`](docs/)                                                 | Repository requirements and root validation strategy.                                                                              |
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
- [Root validation test plan](docs/TEST_PLAN.md) — spec-contract and repository
  CI validation suites and how to run them.
- [Root Python test-suite plan](tests/TEST_PLAN.md) — implemented Python test
  modules under `tests/` and their local run command.
- AI-agent guides: [AGENTS.md](AGENTS.md), [CLAUDE.md](CLAUDE.md), [GEMINI.md](GEMINI.md),
  and [copilot-instructions.md](.github/copilot-instructions.md).
