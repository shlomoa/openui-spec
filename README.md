# OpenUI Specification

This repository contains a technology-independent specification for a Web UI framework. It also includes an Angular TypeScript generator that applies a UI description authored against the spec to an existing Angular workspace. The goal is to use the specification as the basis for a standard.

- **Using the specification** — read the published docs on ReadTheDocs: <https://openui-spec.readthedocs.io/>

## Developer docs

Contributor and developer entry points for this repository:

- [Contributing guide](CONTRIBUTING.md) — repository map, local setup and validation.
- [Releasing](RELEASING.md) — version rules, release validation and publishing.
- [Requirements](docs/REQUIREMENTS.md) — what the solution must provide.
- [Changelog](CHANGELOG.md) — release notes, breaking changes, and upgrade guidance.
- [AGENTS.md](AGENTS.md) — guidance for AI coding assistants.

## OpenUI JSON packages

Both implementations bundle `spec/openui.schema.json` and `spec/openui.json`, and
parse, model and validate documents with the same API and the same diagnostics. Their
grammar stage validates decoded values against the bundled JSON Schema; JSON decoding
supplies the syntax and duplicate-member diagnostics the schema cannot observe.
Validation runs the four stages of the
[conformance suite](https://openui-spec.readthedocs.io/en/latest/conformance/#stages):
grammar, document (globally unique ids and the spec version), catalog (every `type` is a
[known object type](https://openui-spec.readthedocs.io/en/latest/scopes/scope/#known-object-type))
and contract (every attribute value fits its declared value type).

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

The parse, model and validate API is the `bin.openui_document` module (`parse`,
`validate`, `validate_text`, `Document`, `Element`, `Attribute`, `Diagnostic`).

The comparison API is `openui_spec.compare(reference, new)`, which returns the same
changelog as `compare_openui_spec`; its
[output contract](https://openui-spec.readthedocs.io/en/latest/tooling/comparison/#output-contract)
is pinned by the conformance suite's comparison cases.

### TypeScript and Node.js

The [`@shlomoa/openui-spec`](https://www.npmjs.com/package/@shlomoa/openui-spec)
package provides the typed `OpenUiJson` document API, the equivalent
`ng-openui-spec` editing CLI, and the same parse, model and validate API as the
Python package (`parse`, `validate`, `validateText`, `Document`, `Element`,
`Attribute`, `Diagnostic`).

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
- Put non-hierarchical values in `attrs` and nested objects in `children`. An
  attribute key names its category, `uses.<name>`, `produces.<name>` or
  `behaves.<name>`, and its value is typed; see
  [attributes](https://openui-spec.readthedocs.io/en/latest/#45-attributes-and-their-categories)
  and [value types](https://openui-spec.readthedocs.io/en/latest/#46-value-types).
- Editing commands revalidate the result and update `--input` in place. Pass
  `--output` to preserve the source document.
- Values accepted by `--object` and `--attrs` can be inline JSON or paths to JSON
  files.

### Documentation

- [Specification outline](https://openui-spec.readthedocs.io/en/latest/#outline) and
  [artifact model](https://openui-spec.readthedocs.io/en/latest/#41-specification-artifacts)
- [Glossary](https://openui-spec.readthedocs.io/en/latest/scopes/scope/#glossary)
- [Conformance suite](https://openui-spec.readthedocs.io/en/latest/conformance/)
- [Interactive taxonomy tree](https://openui-spec.readthedocs.io/en/latest/taxonomy/taxonomy-tree.html)
- [Playground](https://openui-spec.readthedocs.io/en/latest/playground.html) — paste a
  document, see its validation and element tree
- [OpenUI JSON editing API and CLI reference](https://openui-spec.readthedocs.io/en/latest/tooling/editing/)
- [OpenUI JSON comparison guide](https://openui-spec.readthedocs.io/en/latest/tooling/comparison/)
- [OpenUI document examples](https://openui-spec.readthedocs.io/en/latest/examples/)
