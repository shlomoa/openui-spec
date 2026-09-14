# OpenUI Specification

This repository contains a technology-independent specification for a Web UI framework. It also includes an Angular TypeScript generator that applies a UI description authored against the spec to an existing Angular workspace. The goal is to use the specification as the basis for a standard.

- **Using the specification** — read the published docs on ReadTheDocs: <https://openui-spec.readthedocs.io/>

## Developer docs

Contributor and developer entry points for this repository:

- [Contributing guide](CONTRIBUTING.md) — local setup and validation basics.
- [Changelog](CHANGELOG.md) — release notes, breaking changes, and upgrade guidance.

## OpenUI JSON packages

Both implementations bundle `spec/openui.schema.json` and `spec/openui.json`.
Validation checks the document shape, exact
[known object type](https://openui-spec.readthedocs.io/en/latest/#known-object-type)
membership, and globally unique object IDs.

### Python

The [`openui-spec`](https://pypi.org/project/openui-spec/) package requires
Python 3.12 or newer and installs two command-line tools:

- `openui_spec` validates and edits documents with `validate`, `add`, `remove`,
  and `modify` commands.
- `compare_openui_spec` structurally compares two documents and emits a
  deterministic JSON changelog.

```bash
python -m pip install openui-spec
openui_spec validate --input document.json
openui_spec add --input document.json --parent root --object '{"id":"newTable","type":"Table"}'
compare_openui_spec reference.json updated.json --output changelog.json
```

### TypeScript and Node.js

The [`@shlomoa/openui-spec`](https://www.npmjs.com/package/@shlomoa/openui-spec)
package provides the typed `OpenUiJson` document API and the equivalent
`ng-openui-spec` editing CLI.

```bash
npm install @shlomoa/openui-spec
```

```typescript
import { OpenUiJson } from "@shlomoa/openui-spec";

const document = OpenUiJson.load("input.json");
document.validate();
document.add("root", { id: "newTable", type: "Table" });
document.updateAttributes("newTable", { title: "Updated" });
document.save("output.json");
```

```bash
ng-openui-spec validate --input document.json
```

### Essentials

- An OpenUI document is a tree with a root `id` of `root`; every node has a
  unique camelCase `id` and an exact, case-sensitive catalog `type`.
- Put non-hierarchical values in `attrs` as strings or `null`, and nested objects
  in `children`.
- Editing commands revalidate the result and update `--input` in place. Pass
  `--output` to preserve the source document.
- Values accepted by `--object` and `--attrs` can be inline JSON or paths to JSON
  files.

### Documentation

- [Specification overview and artifact model](https://openui-spec.readthedocs.io/en/latest/#specification-artifacts-grammar-vs-catalog)
- [OpenUI JSON editing API and CLI reference](https://openui-spec.readthedocs.io/en/latest/tooling/editing/)
- [OpenUI JSON comparison guide](https://openui-spec.readthedocs.io/en/latest/tooling/comparison/)
- [OpenUI document examples](https://openui-spec.readthedocs.io/en/latest/examples/)
