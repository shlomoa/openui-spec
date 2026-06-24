# openui5-spec

`openui5-spec` is a technology-independent specification for a Web UI framework. Although not a fork, it is entirely based on [OpenUI5](https://github.com/UI5/openui5). It also includes an Angular TypeScript generator that produces a skeleton app from the spec. The goal is to use the specification as the basis for a standard.

## Where to go

- **Using the specification** — read the published docs on ReadTheDocs: <https://angular-django2.readthedocs.io/>
- **Contributing / developing** — start at the developer hub: [docs/README.md](docs/README.md)

## Repository map

| Path                                         | What's here                                                                                                    |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [`spec/`](spec/)                             | The specification — section documents and the ReadTheDocs source; start at [`spec/README.md`](spec/README.md). |
| [`openui.json`](openui.json)                 | Canonical machine-readable specification (single source of truth).                                             |
| [`generators/angular/`](generators/angular/) | Angular Material generator (TypeScript npm package).                                                           |
| [`docs/`](docs/)                             | Developer documentation hub — [`docs/README.md`](docs/README.md).                                              |
| [`origin/`](origin/)                         | Upstream-derivation / provenance (e.g. the traversal report).                                                  |
| `AGENTS.md` / `CLAUDE.md` / `GEMINI.md`      | AI coding-assistant guides.                                                                                    |
| [`CONTRIBUTING.md`](CONTRIBUTING.md)         | How to contribute.                                                                                             |

Local validation and build steps live in the [developer hub](docs/README.md).
