# OpenUI JSON comparison

**Purpose:** Compare two OpenUI JSON specifications and emit a deterministic,
hierarchical changelog of what was added, removed, or changed between them.

The comparison tool answers a common question when the specification evolves:
_what actually changed between an earlier `spec/openui.json` and a newer one?_ It walks
both documents together and reports differences as a stable JSON changelog that is
safe to diff, review, and store in version control.

The tool lives at [`bin/compare_openui_json.py`](https://github.com/shlomoa/openui-spec/blob/main/bin/compare_openui_json.py)
and depends only on the Python standard library.

## How it compares

The comparison is structural, not textual, so it ignores formatting and key or
list order and reports only meaningful differences:

- **Objects** are matched by key. Keys only in the reference are removals, keys
  only in the new document are additions, and shared keys are compared
  recursively.
- **Identified lists** — lists whose items are all objects with unique `id`
  values, such as `children` — are matched by `id` rather than by position, so
  reordering elements is not reported as a change.
- **Other lists and scalars** are canonicalized before comparison, so reordering
  a list of scalar values or object items is treated as equal.

Every difference is reported with a [JSON Pointer](https://www.rfc-editor.org/rfc/rfc6901)-style
path (using `~0` for `~` and `~1` for `/` in keys and `id` values), so each entry
points at the exact location in the document tree.

## Usage

Run the tool with the repository-local Python interpreter, passing the reference
document first and the new document second.

Windows (PowerShell):

```powershell
.\.venv\Scripts\python bin\compare_openui_json.py reference.json new.json
```

Linux or macOS (Bash):

```bash
./.venv/bin/python bin/compare_openui_json.py reference.json new.json
```

By default the changelog is printed to standard output. Use `--output` (or `-o`)
to write it to a file instead:

```bash
./.venv/bin/python bin/compare_openui_json.py reference.json new.json --output changelog.json
```

### Arguments

| Argument         | Required | Description                                         |
| ---------------- | -------- | --------------------------------------------------- |
| `reference`      | Yes      | Path to the reference (older) OpenUI JSON document. |
| `new`            | Yes      | Path to the new (updated) OpenUI JSON document.     |
| `--output`, `-o` | No       | Write the changelog to this file instead of stdout. |

## Output format

The tool emits a single JSON object with three sorted lists:

- `remove` — entries present in the reference but missing from the new document.
  Each entry has a `path` and the removed `reference` value.
- `add` — entries present in the new document but missing from the reference.
  Each entry has a `path` and the added `new` value.
- `change` — entries present in both but with different values. Each entry has a
  `path`, the old `reference` value, and the new `new` value.

The output is deterministic: keys are sorted and entries are ordered, so the same
pair of inputs always produces byte-for-byte identical output.

## Example

Given a reference document:

```json
{
  "id": "root",
  "attrs": { "title": "Reference", "obsolete": true },
  "children": [{ "id": "page", "type": "Page", "attrs": { "title": "Old" } }]
}
```

and a new document:

```json
{
  "id": "root",
  "attrs": { "title": "New", "introduced": true },
  "children": [
    { "id": "dialog", "type": "Dialog" },
    { "id": "page", "type": "Page", "attrs": { "title": "New" } }
  ]
}
```

the tool produces:

```json
{
  "add": [
    { "new": true, "path": "/attrs/introduced" },
    { "new": { "id": "dialog", "type": "Dialog" }, "path": "/children/dialog" }
  ],
  "change": [
    { "new": "New", "path": "/attrs/title", "reference": "Reference" },
    { "new": "New", "path": "/children/page/attrs/title", "reference": "Old" }
  ],
  "remove": [{ "path": "/attrs/obsolete", "reference": true }]
}
```

Note that the new `dialog` child is reported by its `id` (`/children/dialog`)
rather than by list position, and that reordering the `children` list would not
produce a change entry.
