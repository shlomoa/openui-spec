# OpenUI Specification

This repository contains a technology-independent specification for a Web UI framework. It also includes an Angular TypeScript generator that applies a UI description authored against the spec to an existing Angular workspace. The goal is to use the specification as the basis for a standard.

## Where to go

- **Using the specification** — read the published docs on ReadTheDocs: <https://openui5-spec.readthedocs.io/>
- **Contributing / developing** — start at the developer hub: [docs/README.md](docs/README.md)

## Repository map

| Path                                                             | What's here                                                                                                                        |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [`spec/`](spec/)                                                 | The specification source of truth — prose scope documents and the ReadTheDocs source; start at [`spec/README.md`](spec/README.md). |
| [`openui.json`](openui.json)                                     | Generated canonical machine-readable specification, built from `spec/scopes/`.                                                     |
| [`generators/angular/generator/`](generators/angular/generator/) | Angular Material generator (TypeScript npm package).                                                                               |
| [`docs/`](docs/)                                                 | Developer documentation hub — [`docs/README.md`](docs/README.md).                                                                  |
| [`origin/`](origin/)                                             | Upstream-derivation / provenance (e.g. the traversal report).                                                                      |
| `AGENTS.md` / `CLAUDE.md` / `GEMINI.md`                          | AI coding-assistant guides.                                                                                                        |
| [`CONTRIBUTING.md`](CONTRIBUTING.md)                             | How to contribute.                                                                                                                 |

Local validation and build steps live in the [developer hub](docs/README.md).
