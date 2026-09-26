# Schema change proposal

**Result: no schema change is needed.** None of the four UI surveys requires a change to
the OpenUI document grammar ([`EBNF.txt`](../EBNF.txt)) or its JSON Schema projection
([`openui.schema.json`](../openui.schema.json)).

## What was checked

The current format is:

- a tree of elements with `id`, `type`, optional `attrs` and optional `children`;
- `attrs` values are `string | null`.

Every attribute the surveys propose was checked against it. The source is the
Attributes section of each draft scope, plus each survey's schema proposal:

| Survey           | Survey's own conclusion                                                                      | Source                                                                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| HTML Standard    | "No change to the grammar (`EBNF.txt`), the JSON Schema or the scope converter is proposed." | [openui_schema_proposal.md](html5/openui_schema_proposal.md)                                                                   |
| Qt Widgets       | "No base-schema change is claimed." All six draft scopes parse with the existing converter.  | [openui_schema_proposal.md](qt/openui_schema_proposal.md), [drafts](qt/inventory/proposed-scopes/)                             |
| Angular Material | "No grammar or schema change is made."                                                       | [openui_schema_proposal.md](angular-material/openui_schema_proposal.md), [drafts](angular-material/inventory/proposed-scopes/) |
| OpenUI5          | No schema change proposed; no attributes or child models are drafted.                        | [README.md](openui5/README.md)                                                                                                 |

## Why the current format is sufficient

Every proposed attribute can be written as a string value in `attrs`:

| Kind of value in the drafts | Examples                                                                     | Encoding in the current format                                                |
| --------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Element reference           | `[target]`, `[boundary]`, `[initialFocus]`, `[scrolling]`                    | A quoted element id, the same-document reference form defined in 0.3.0.       |
| Boolean                     | `[active]`, `[kinetic]`, `[enabled]`, `[restorePosition]`, `[caseSensitive]` | `"true"` or `"false"`.                                                        |
| Number                      | `[horizontalPosition]` (0–1), `[currentIndex]`                               | A numeric string, such as `"0.5"`.                                            |
| Enumeration                 | `[axes]`, `[mode]`, `[dragMode]`, `[horizontalPolicy]`                       | One of the allowed words, such as `"both"`.                                   |
| Resource reference          | `[scene]`                                                                    | An opaque string resolved by the target adapter.                              |
| List                        | `[candidates]` (ordered strings)                                             | A string that the target interprets, typically a binding to application data. |
| Events and actions          | `(activeChanged)`, `(scrollTo)`, `(dismissRequested)`                        | Existing `(name)` keys.                                                       |

No survey adds a document field, changes `children`, or changes the `[name]` / `(name)`
key syntax. The recommendation that behavior targets be references rather than owned
children is met by the existing reference form, because references go in `attrs` and
`children` stays for owned content.

## What the surveys do need instead

These are outside the schema:

- **Validator rules:** check that a referenced id exists, has the right kind and forms no
  cycle; check boolean, number and enumeration values against each scope's contract.
- **Scope contracts:** describe each attribute's allowed values, defaults, event
  payloads and lifecycle in the scope files.

Typed attribute values (plan question Q6) are already scheduled for a later W5 grammar
revision. The surveys neither require nor block that change.
