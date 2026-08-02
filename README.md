# OpenUI Specification

This repository contains a technology-independent specification for a Web UI framework. It also includes an Angular TypeScript generator that applies a UI description authored against the spec to an existing Angular workspace. The goal is to use the specification as the basis for a standard.

- **Using the specification** — read the published docs on ReadTheDocs: <https://openui-spec.readthedocs.io/>

## Developer docs

Contributor and developer entry points for this repository:

- [Contributing guide](CONTRIBUTING.md) — local setup and validation basics.

## OpenUI JSON API

The `bin` package provides `OpenUiJson` for loading, validating, and editing an
OpenUI JSON document. Validation checks both `spec/openui.schema.json` and the
object types supported by the canonical `openui.json` catalog. The published
[OpenUI JSON editing](https://openui-spec.readthedocs.io/en/latest/tooling/editing/)
tooling page documents these commands for spec users.

Use the CLI to validate or apply one change in place (pass `--output` to write
to a different file):

```bash
python bin/openui_json_cli.py validate --input openui.json
python bin/openui_json_cli.py add --input document.json --parent root --object '{"id":"newTable","type":"Table"}'
python bin/openui_json_cli.py remove --input document.json --id newTable
python bin/openui_json_cli.py modify --input document.json --id table --attrs '{"title":"Updated"}'
python bin/openui_json_cli.py modify --input document.json --id table --object '{"id":"table","type":"Grid"}'
```
