# Conformance suite

The conformance suite is a shared set of OpenUI documents. Every OpenUI tool
that parses or validates documents, in any language, must give the same result
for each of them. The Python and TypeScript packages both run it.

This page defines the layout of the suite and the format of the expected
diagnostics. The suite is finished after the grammar is frozen (plan task W5 23);
until then it holds the cases of the current document format.

## Layout

```text
spec/conformance/
  README.md                      this page
  diagnostics.schema.json        the format of an expected-diagnostics file
  valid/<case>.json              documents a tool must accept
  invalid/<case>.json            documents a tool must reject
  invalid/<case>.expected.json   the diagnostics a tool must report for <case>.json
```

- A case name is kebab-case and says what the document shows, for example
  `invalid-child-id`.
- A valid document conforms to the [grammar](../EBNF.txt), has globally unique
  ids and uses only [known object types](../scopes/scope.md#known-object-type).
- An invalid document breaks exactly one rule, so that a failure points to one
  cause.
- Every invalid document has one `<case>.expected.json` file next to it. A valid
  document has none, because a tool must report no diagnostics for it.
- A document file is read as raw UTF-8 text. An invalid document may be invalid
  JSON on purpose, so the JSON formatters and checks of the repository do not
  touch `invalid/<case>.json`.

## Expected diagnostics

An expected-diagnostics file is a JSON object with one member, `diagnostics`: a
list of the diagnostics a tool must report. The file must validate against
[`diagnostics.schema.json`](diagnostics.schema.json), which is the only list of
diagnostic codes.

```json
{
  "diagnostics": [{ "code": "grammar/invalid-id", "path": "/children/0/id" }]
}
```

Each diagnostic has two members:

- `code` names the broken rule. Its prefix is the validation stage that owns the
  rule:
  - `grammar/`: the document format of [`EBNF.txt`](../EBNF.txt) and its JSON
    Schema projection;
  - `document/`: rules over the whole document, such as globally unique ids;
  - `catalog/`: membership of the object catalog, `spec/openui.json`;
  - `contract/`: the object contracts of the scope files (added when the suite
    is finished).
- `path` is a [JSON Pointer](https://www.rfc-editor.org/rfc/rfc6901) to the
  place of the fault in the document. A missing member points to where the
  member belongs, for example `/version`. A document that is not JSON points to
  the whole document, `""`.

A tool passes a case when it reports exactly the expected diagnostics: the same
set of `code` and `path` pairs, in any order. Messages are free text and are
not compared.

## Checks

- `python -m spec.bin.check_grammar_consistency` runs every case against the
  EBNF and the JSON Schema. Both must accept every valid document and every
  invalid document whose diagnostics are not `grammar/`, and both must reject
  every document with a `grammar/` diagnostic.
- `tests/test_conformance_suite.py` checks the layout: every file is in its
  place, every invalid document has its expected diagnostics, and every
  expected-diagnostics file validates against the schema.
