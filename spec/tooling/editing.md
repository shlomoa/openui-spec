# OpenUI JSON editing

**Purpose:** Load, validate, and edit an OpenUI JSON document with a small
command-line tool that keeps the document valid after every change.

The editing tool answers a common question when working with an OpenUI document:
_how do I add, remove, or change an object without hand-editing JSON and risking
an invalid document?_ It loads a document, applies one change, revalidates the
result, and writes it back out.

The tool lives at [`bin/openui_json_cli.py`](https://github.com/shlomoa/openui-spec/blob/main/bin/openui_json_cli.py)
and is built on the `OpenUiJson` class in
[`bin/openui_json.py`](https://github.com/shlomoa/openui-spec/blob/main/bin/openui_json.py).

## What it validates

Every command validates the resulting document against two sources of truth:

- **Shape** — the document is checked against
  [`spec/openui.schema.json`](https://github.com/shlomoa/openui-spec/blob/main/spec/openui.schema.json),
  which defines the required structure of any OpenUI document.
- **Object types** — each object's `type` must be one of the types supported by
  the canonical [`openui.json`](https://github.com/shlomoa/openui-spec/blob/main/openui.json)
  catalog. Unknown types are rejected.

The tool also rejects duplicate object `id` values, so every object in the
document remains uniquely addressable.

## Usage

Run the tool with the repository-local Python interpreter. Each command takes an
`--input` document; the `add`, `remove`, and `modify` commands write the result
back to `--input` in place unless you pass `--output` to write to a different
file.

Windows (PowerShell):

```powershell
.\.venv\Scripts\python bin\openui_json_cli.py validate --input openui.json
```

Linux or macOS (Bash):

```bash
./.venv/bin/python bin/openui_json_cli.py validate --input openui.json
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
./.venv/bin/python bin/openui_json_cli.py validate --input openui.json
```

Add a new object to a parent:

```bash
./.venv/bin/python bin/openui_json_cli.py add --input document.json \
  --parent root --object '{"id":"newTable","type":"Table"}'
```

Remove an object by `id`:

```bash
./.venv/bin/python bin/openui_json_cli.py remove --input document.json --id newTable
```

Change an object's attributes without touching its children:

```bash
./.venv/bin/python bin/openui_json_cli.py modify --input document.json \
  --id table --attrs '{"title":"Updated"}'
```

Replace an object entirely, including any children it contains:

```bash
./.venv/bin/python bin/openui_json_cli.py modify --input document.json \
  --id table --object '{"id":"table","type":"Grid"}'
```

To preview a change without overwriting the source, add `--output`:

```bash
./.venv/bin/python bin/openui_json_cli.py add --input document.json \
  --parent root --object '{"id":"newTable","type":"Table"}' --output updated.json
```
