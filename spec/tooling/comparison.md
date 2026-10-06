# OpenUI JSON comparison

**Purpose:** Compare two OpenUI JSON specifications and emit a deterministic,
hierarchical changelog of what was added, removed, or changed between them.

The comparison tool answers a common question when the specification evolves:
_what actually changed between an earlier `spec/openui.json` and a newer one?_ It walks
both documents together and reports differences as a stable JSON changelog that is
safe to diff, review, and store in version control. Tools that act on a change between two
OpenUI documents, such as a code generator that derives its edits from them, use the same
changelog, so [its output contract](#output-contract) is pinned by the
[comparison cases](../conformance/README.md#comparison-cases) of the conformance suite.

## Entry points

The `openui-spec` Python package provides the comparison in two forms. Both give the same
result and depend only on the Python standard library:

- The importable API, `openui_spec.compare(reference, new)`, takes the two decoded JSON values
  and returns the changelog as a `dict`. The package's `openui_spec.__version__` is the
  package version; its major and minor numbers are those of the OpenUI spec version the
  package implements ([RELEASING](https://github.com/shlomoa/openui-spec/blob/main/RELEASING.md#2-select-and-set-the-package-version)).
  The implementation is `openui_spec/comparison.py`; the package does not need any top-level
  package named `bin`.
- The command line. The installed command is `compare_openui_spec`. It reads and writes JSON
  files.

```python
import json
from openui_spec import compare

changes = compare(json.loads(reference_text), json.loads(new_text))
```

Import `openui_spec.compare`. The earlier import location, `bin.compare_openui_spec`, no
longer exists.

## How it compares

The comparison is structural, not textual, so it ignores formatting and key or
list order and reports only meaningful differences:

- **Objects** are matched by key. Keys only in the reference are removals, keys
  only in the new document are additions, and shared keys are compared
  recursively.
- **Identified lists**, such as `children`, are matched by `id` rather than by
  position, so reordering elements is not reported as a change.
- **Other lists and scalars** are canonicalized before comparison, so reordering
  a list of scalar values or object items is treated as equal.

## Output contract

This section defines the changelog exactly. The conformance cases pin every statement in it,
and a consumer can rely on all of them.

### Entries

The changelog is one JSON object with three lists, `remove`, `add` and `change`, always all
present, each possibly empty:

| List     | Entry members              | Meaning                                      |
| -------- | -------------------------- | -------------------------------------------- |
| `remove` | `path`, `reference`        | A value only the reference has, as it was.   |
| `add`    | `path`, `new`              | A value only the new document has, as it is. |
| `change` | `path`, `reference`, `new` | A value both have, in two different states.  |

A `reference` or `new` member holds the whole value at the path, not a difference of it. A
removed or added element carries its whole subtree, and the descendants of that element have
no entries of their own.

### Paths

A path is a [JSON Pointer](https://www.rfc-editor.org/rfc/rfc6901) from the root of the
document: a `/` before each segment, so the first segment follows a leading `/`. A segment
is one of two kinds, and the value at the position tells which:

- **A member name**, when the value is an object. The segment is the member name, so the
  root-level paths are `/id`, `/type`, `/version`, `/attrs` and `/children`, and an
  attribute is `/children/ordersTable/attrs/uses.pageSizes`.
- **An element id**, when the value is an [identified list](#identity). The segment is the
  `id` of the item, not its position: `/children/ordersTable`. A list has no positional
  segments.

In a segment, `~` is written `~0` and `/` is written `~1`, as RFC 6901 requires. Ids and
attribute names of an OpenUI document contain neither character, so the escapes appear only
when other JSON, such as a catalog with free keys, is compared.

A path always names the shallowest place at which the two documents differ in a way the
comparison can describe:

- an object member present on one side only is a `remove` or an `add` at the member itself
  (`/attrs` or `/children` when a whole object or list appears or disappears; never one entry
  per item);
- an element present on one side only is a `remove` or an `add` at `<list>/<id>`;
- two values that cannot be compared member by member or item by item, because they are
  scalars, because their kinds differ (scalar, list, object) or because a list is not
  identified, give one `change` at their path (the [whole-list fallback](#identity)).

OpenUI documents are always objects, so the contract covers two objects as input; what
the comparison reports for any other root is outside it.

### Identity

A list is **identified** when every item is an object with a string `id` member and no two
items have the same `id`. An empty list is identified. Two lists are compared by `id` only
when both are identified. Then:

- an item whose `id` only the reference list has is a `remove`, and one whose `id` only the
  new list has is an `add`, at `<list>/<id>`;
- an item whose `id` is in both lists is compared recursively, whatever its position;
- the order of the items of either list never matters, so **reordering siblings gives no
  entry**;
- the `id` is the identity of an item **in its list**: moving an element to another parent
  is a `remove` at its old path plus an `add` at its new path, with the whole element in
  both, even when the element did not change otherwise. There is no move entry. An element
  whose `type` changes keeps its identity: it is a `change` at `<list>/<id>/type`.

Every other pair of lists is not identified, which includes a list with an item that is not
an object, an object without an `id`, an `id` that is not a string, a repeated `id`, and a
pair in which only one list is identified. Such a pair is compared as a whole: each list is
canonicalized, that is, its items are canonicalized and sorted, and object members are
ordered by key, at every depth. Equal canonical forms give no entry, so reordering such a
list gives none either, and repeated items count: `["10", "10"]` differs from `["10"]`. Different
canonical forms give one `change` at the list path, with both lists as they were written.
The attribute values that are lists (`["10", null]`) are always compared this way. A list
attribute that becomes empty is a `change`, never a removal of its items, because its other
state is not identified.

The ids of an OpenUI document are unique across the whole document, so the identified-list
case is the normal one for `children`. A document that breaks that rule or the grammar can
still be compared, and the whole-list fallback then applies.

### Order

The three lists are in the order of a depth-first walk, the same on every run. At an object
or an identified list, the walk first appends the removals sorted by key or id, then the
additions sorted by key or id, then continues into the shared keys or ids in sorted order.
Keys and ids sort by Unicode code point. So the entries of a node precede the entries below
it, and a list is not sorted by path as a whole: `/children/zeta` can precede
`/children/beta/children/two`.

The command prints the changelog with its keys sorted and two-space indentation, ending with
a newline, so the same pair of inputs always gives byte-for-byte identical output.

## Usage

Install `openui-spec` in a virtual environment, then run `compare_openui_spec`,
passing the reference document first and the new document second. For a cloned
copy of this repository, create the environment and install the current checkout
as follows.

Windows (PowerShell):

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install .
compare_openui_spec reference.json new.json
```

Linux or macOS (Bash):

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install .
compare_openui_spec reference.json new.json
```

After activation, the virtual environment adds `compare_openui_spec` to `PATH`.
Without activation, invoke its executable directly:

```powershell
.\.venv\Scripts\compare_openui_spec.exe reference.json new.json
```

```bash
./.venv/bin/compare_openui_spec reference.json new.json
```

By default the changelog is printed to standard output. Use `--output` (or `-o`)
to write it to a file instead:

```bash
compare_openui_spec reference.json new.json --output changelog.json
```

### Arguments

| Argument         | Required | Description                                         |
| ---------------- | -------- | --------------------------------------------------- |
| `reference`      | Yes      | Path to the reference (older) OpenUI JSON document. |
| `new`            | Yes      | Path to the new (updated) OpenUI JSON document.     |
| `--output`, `-o` | No       | Write the changelog to this file instead of stdout. |

## Example

Given a reference document:

```json
{
  "id": "root",
  "version": "0.12.0",
  "type": "Dialog",
  "attrs": { "title": "Reference", "obsolete": "true" },
  "children": [{ "id": "page", "type": "page", "attrs": { "title": "Old" } }]
}
```

and a new document:

```json
{
  "id": "root",
  "version": "0.12.0",
  "type": "Dialog",
  "attrs": { "title": "New", "introduced": "true" },
  "children": [
    { "id": "dialog", "type": "Dialog" },
    { "id": "page", "type": "page", "attrs": { "title": "New" } }
  ]
}
```

the tool produces:

```json
{
  "add": [
    { "new": "true", "path": "/attrs/introduced" },
    { "new": { "id": "dialog", "type": "Dialog" }, "path": "/children/dialog" }
  ],
  "change": [
    { "new": "New", "path": "/attrs/title", "reference": "Reference" },
    { "new": "New", "path": "/children/page/attrs/title", "reference": "Old" }
  ],
  "remove": [{ "path": "/attrs/obsolete", "reference": "true" }]
}
```

Note that the new `dialog` child is reported by its `id` (`/children/dialog`)
rather than by list position, and that reordering the `children` list would not
produce a change entry.
