# OpenUI Specification

This repository contains a technology-independent specification for a Web UI framework. It also includes an Angular TypeScript generator that applies a UI description authored against the spec to an existing Angular workspace. The goal is to use the specification as the basis for a standard.

- **Using the specification** — read the published docs on ReadTheDocs: <https://openui-spec.readthedocs.io/>

## Developer docs

Contributor and developer entry points for this repository:

- [Contributing guide](CONTRIBUTING.md) — local setup and validation basics.

## OpenUI JSON API

The [`@shlomoa/openui-spec`](package.json) package provides `OpenUiJson` for
loading, validating, and editing an OpenUI JSON document. It bundles
`spec/openui.schema.json` and `spec/openui.json`; validation checks both the
schema and the object types supported by the canonical catalog.

```bash
npm install @shlomoa/openui-spec
```

```typescript
import { OpenUiJson } from "@shlomoa/openui-spec";

const document = OpenUiJson.load("input.json");
document.validate();
document.add("root", { id: "newTable", type: "Table" });
document.save("output.json");
```

The published [OpenUI JSON editing](https://openui-spec.readthedocs.io/en/latest/tooling/editing/)
tooling page documents the API and command-line interface.

The package also installs an `ng-openui-spec` CLI to validate or apply one change
in place (pass `--output` to write to a different file):

```bash
ng-openui-spec validate --input spec/openui.json
ng-openui-spec add --input document.json --parent root --object '{"id":"newTable","type":"Table"}'
ng-openui-spec remove --input document.json --id newTable
ng-openui-spec modify --input document.json --id table --attrs '{"title":"Updated"}'
ng-openui-spec modify --input document.json --id table --object '{"id":"table","type":"Grid"}'
```
