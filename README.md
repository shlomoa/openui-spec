# OpenUI Specification

This repository contains a technology-independent specification for a Web UI framework. It also includes an Angular TypeScript generator that applies a UI description authored against the spec to an existing Angular workspace. The goal is to use the specification as the basis for a standard.

- **Using the specification** — read the published docs on ReadTheDocs: <https://openui-spec.readthedocs.io/>

## Developer docs

Contributor and developer entry points for this repository:

- [Contributing guide](CONTRIBUTING.md) — local setup and validation basics.

## OpenUI JSON API

The [`@openui-spec/openui-json`](package.json) package provides `OpenUiJson` for
loading, validating, and editing an OpenUI JSON document. It bundles
`spec/openui.schema.json` and `spec/openui.json`; validation checks both the
schema and the object types supported by the canonical catalog.

```bash
npm install @openui-spec/openui-json
```

```typescript
import { OpenUiJson } from "@openui-spec/openui-json";

const document = OpenUiJson.load("input.json");
document.validate();
document.add("root", { id: "newTable", type: "Table" });
document.save("output.json");
```

The published [OpenUI JSON editing](https://openui-spec.readthedocs.io/en/latest/tooling/editing/)
tooling page documents the API and command-line interface.

The package also installs an `openui-json` CLI to validate or apply one change
in place (pass `--output` to write to a different file):

```bash
openui-json validate --input spec/openui.json
openui-json add --input document.json --parent root --object '{"id":"newTable","type":"Table"}'
openui-json remove --input document.json --id newTable
openui-json modify --input document.json --id table --attrs '{"title":"Updated"}'
openui-json modify --input document.json --id table --object '{"id":"table","type":"Grid"}'
```
