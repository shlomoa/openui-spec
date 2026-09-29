# OpenUI JSON editing

**Purpose:** Load, validate, and edit an OpenUI JSON document with a small
command-line tool that keeps the document valid after every change.

The editing tool answers a common question when working with an OpenUI document:
_how do I add, remove, or change an object without hand-editing JSON and risking
an invalid document?_ It loads a document, applies one change, revalidates the
result, and writes it back out.

The Python implementation lives at
[`bin/openui_spec_cli.py`](https://github.com/shlomoa/openui-spec/blob/main/bin/openui_spec_cli.py)
and installs the `openui_spec` CLI.
The `@shlomoa/openui-spec` package installs an equivalent `ng-openui-spec`
CLI for Node.js consumers.

## TypeScript package: `@shlomoa/openui-spec`

The official TypeScript and Node.js package is published to npm at:
<https://www.npmjs.com/package/@shlomoa/openui-spec>

It provides a framework-neutral document loading, validation, and mutation API
for Node.js consumers along with the `ng-openui-spec` command-line tool.

### Installation

```bash
npm install @shlomoa/openui-spec
```

### Key features

- **Bundled canonical assets** — includes `spec/openui.schema.json` and
  `spec/openui.json` directly within the distribution; no external path configuration
  is required.
- **Strict document validation** — validates the grammar, unique ids, the spec
  version, exact known-type membership in the catalog and the declared attribute
  value types ([what it validates](#what-it-validates)).
- **Safe programmatic mutations** — provides strongly-typed methods to add, remove,
  modify attributes, and replace objects in OpenUI documents.
- **Command-line interface** — installs the `ng-openui-spec` binary for
  terminal and CI/CD validation and updates.

### TypeScript and JavaScript API

```typescript
import { OpenUiJson, OpenUiValidationError } from "@shlomoa/openui-spec";

// Load from a file or instantiate with an existing OpenUI document
const document = OpenUiJson.load("input.json");

// Validate against canonical schema and catalog
try {
  document.validate();
} catch (error) {
  if (error instanceof OpenUiValidationError) {
    console.error("Validation failed:", error.diagnostics);
  }
}

// Add an object to a parent
document.add("root", { id: "newTable", type: "Table" });

// Update attributes in place
document.updateAttributes("newTable", { title: "Updated" });

// Replace an object
document.replace(
  "newTable",
  { id: "newTable", type: "Grid" },
  { parentId: "root" },
);

// Remove an object
document.remove("newTable", { parentId: "root" });

// Save modifications back to disk
document.save("output.json");
```

### Node.js CLI: `ng-openui-spec`

Use the package CLI directly after installing `@shlomoa/openui-spec`:

```bash
ng-openui-spec validate --input ./spec/openui.json
ng-openui-spec add --input document.json --parent root --object '{"id":"newTable","type":"Table"}'
ng-openui-spec modify --input document.json --id newTable --attrs '{"title":"Updated"}'
ng-openui-spec remove --input document.json --id newTable
```

## What it validates

Every command validates the resulting document in the four stages of the
[conformance suite](../conformance/README.md#stages):

- **Grammar** — the document format of [`EBNF.txt`](../EBNF.txt) and its projection
  [`spec/openui.schema.json`](https://github.com/shlomoa/openui-spec/blob/main/spec/openui.schema.json).
- **Document** — every object `id` is unique, and the root `version` is the spec
  version the tool implements.
- **Catalog** — each object's `type` must exactly equal a literal `type`
  present in the canonical
  [`spec/openui.json`](https://github.com/shlomoa/openui-spec/blob/main/spec/openui.json)
  catalog. Unknown types, aliases, selectors, and implementation identifiers are
  rejected. The normative definition and instance-flexibility rules live in the
  [`Known object type`](../scopes/scope.md#known-object-type) glossary entry.
- **Contract** — every attribute an object's type declares fits its
  [value type](../README.md#46-value-types), and every literal element reference
  names an element of an allowed type.

Each problem is a diagnostic: a stage-prefixed code (such as
`catalog/unknown-type`), a JSON Pointer to the place and a message.

## Parse, model and validate API

The Python and TypeScript packages expose the same API, and both pass the
[conformance suite](../conformance/README.md#conformance-suite) with identical
diagnostics:

| Python (`bin.openui_document`) | TypeScript (`@shlomoa/openui-spec`) | What it does                                                                              |
| ------------------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------- |
| `parse(text)`                  | `parse(text)`                       | Parses the text into a `Document`, or raises `OpenUiParseError` with grammar diagnostics. |
| `validate(document, catalog)`  | `validate(document, catalog)`       | Runs the document, catalog and contract stages; returns diagnostics.                      |
| `validate_text(text, catalog)` | `validateText(text, catalog)`       | Runs every stage on text; a grammar diagnostic stops it.                                  |
| `Catalog.load(path)`           | `Catalog.load(path)`                | Loads a catalog; the default is the bundled `spec/openui.json`.                           |

`OpenUiJson.validate()` in both packages runs the same pipeline and raises
`OpenUiValidationError` with the diagnostics.

A `Document` has a `version` and a `root` `Element`. An `Element` has an `id`, a
`type`, a JSON Pointer `path`, its `attributes` and its `children`. An `Attribute`
has its `key`, `category` (`uses`, `produces`, `behaves` or none), `name`, raw
`value` and `path`, and tells whether the value is an expression or a literal.

```python
from bin.openui_document import parse, validate

document = parse(open("input.json", encoding="utf-8").read())
for diagnostic in validate(document):
    print(diagnostic.code, diagnostic.path, diagnostic.message)
```

```typescript
import { readFileSync } from "node:fs";
import { parse, validate } from "@shlomoa/openui-spec";

const document = parse(readFileSync("input.json", "utf8"));
for (const diagnostic of validate(document)) {
  console.log(diagnostic.code, diagnostic.path, diagnostic.message);
}
```

## Usage

Each command takes an `--input` document; the `add`, `remove`, and `modify`
commands write the result back to `--input` in place unless you pass `--output`
to write to a different file. Use the package CLI after installing
`@shlomoa/openui-spec`:

```bash
ng-openui-spec validate --input ./spec/openui.json
```

The same commands are available from the Python implementation with the
repository-local interpreter:

Windows (PowerShell):

```powershell
.\.venv\Scripts\python bin\openui_spec_cli.py validate --input .\spec\openui.json
```

Linux or macOS (Bash):

```bash
./.venv/bin/python bin/openui_spec_cli.py validate --input ./spec/openui.json
```

Wherever a command accepts a JSON value (`--object`, `--attrs`), you may pass the
JSON inline as a string or a path to a file that contains it.

## Commands

| Command    | Description                                           |
| ---------- | ----------------------------------------------------- |
| `validate` | Validate an OpenUI JSON document.                     |
| `add`      | Append an object to the children of a parent object.  |
| `remove`   | Remove an object from the document.                   |
| `modify`   | Change an object's attributes or replace it entirely. |

### Arguments

| Argument   | Commands                             | Required | Description                                                                              |
| ---------- | ------------------------------------ | -------- | ---------------------------------------------------------------------------------------- |
| `--input`  | all                                  | Yes      | Path to the OpenUI JSON document to read.                                                |
| `--output` | `add`, `remove`, `modify`            | No       | Write the result here instead of overwriting `--input`.                                  |
| `--parent` | `add` (required), `remove`, `modify` | Varies   | Parent object `id`. For `remove`/`modify`, requires the object to belong to this parent. |
| `--id`     | `remove`, `modify`                   | Yes      | `id` of the object to remove or modify.                                                  |
| `--object` | `add`, `modify`                      | Varies   | JSON object to append (`add`) or the full replacement object (`modify`).                 |
| `--attrs`  | `modify`                             | Varies   | JSON object of attribute changes; `null` removes an attribute.                           |

For `modify`, pass exactly one of `--attrs` or `--object`.

## Examples

Validate a document:

```bash
# Using npm CLI
ng-openui-spec validate --input ./spec/openui.json

# Using Python CLI
openui_spec validate --input ./spec/openui.json
```

Add a new object to a parent:

```bash
ng-openui-spec add --input document.json \
  --parent root --object '{"id":"newTable","type":"Table"}'
```

Remove an object by `id`:

```bash
ng-openui-spec remove --input document.json --id newTable
```

Change an object's attributes without touching its children:

```bash
ng-openui-spec modify --input document.json \
  --id table --attrs '{"title":"Updated"}'
```

Replace an object entirely, including any children it contains:

```bash
ng-openui-spec modify --input document.json \
  --id table --object '{"id":"table","type":"Grid"}'
```

To preview a change without overwriting the source, add `--output`:

```bash
ng-openui-spec add --input document.json \
  --parent root --object '{"id":"newTable","type":"Table"}' --output updated.json
```
