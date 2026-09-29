# Specification outline proposal

This proposal defines the numbered outline of the OpenUI specification v1.0 and places
every current spec document, or section of one, in it. It answers W4 task 16 in the
[v1 publish plan](specui_v1_publish_plan.md#w4-specification-structure).

- **Where it applies:** the order and numbering of the specification: the section index
  in `spec/README.md` and the `nav` of `mkdocs.yml`. W6 task 24 rewrites the text to
  this outline; W4 task 17 marks each part normative or informative.
- **Inputs:** the example outline of plan task W4 16; the directive that the three
  taxonomy documents are part of section 5; the [scope section](../README.md#scope)
  (W2 10), which is section 1; the current [`spec/README.md`](../README.md#openui-specification),
  [`spec/scopes/scope.md`](../scopes/scope.md#scopes) and the `mkdocs.yml` navigation.
- **Status:** proposal for review; nothing is applied. The Decisions table lists what
  the owner approves.

## 1. Proposed outline

| Part    | Title                       | Holds                                                                                                                                                                             | Current source                                                                                                                                                                                                                                                                                                                |
| ------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1       | Introduction and scope      | Purpose, audience, scope (in, out, deferred), how to read the specification                                                                                                       | `spec/README.md`: title paragraphs, [Scope](../README.md#scope), [How to read this spec](../README.md#how-to-read-this-spec)                                                                                                                                                                                                  |
| 2       | Conformance                 | What conforms (a concrete UI document, the catalog, a validator), the requirement keywords, normative and informative parts                                                       | New; W4 17 defines the keywords and the marking. Today only the MUST rules of [Canonical root document](../README.md#canonical-root-document) exist                                                                                                                                                                           |
| 3       | Terminology                 | The glossary: one definition for each term, with its generic aliases                                                                                                              | [`spec/scopes/scope.md` § Glossary](../scopes/scope.md#glossary)                                                                                                                                                                                                                                                              |
| 4       | Document model and language | The artifact roles, the document format, ids and types, attributes and their categories, element references, the syntax rules                                                     | `spec/README.md`: [Specification artifacts](../README.md#specification-artifacts-grammar-vs-catalog), [Spec format](../README.md#spec-format) (all subsections)                                                                                                                                                               |
| 5       | Categories and objects      | 5.1 Generic UI taxonomy; 5.2 UI element taxonomy; 5.3 Taxonomy mapping; 5.4 Scope tree and folder rules; 5.5 Object contracts (the eleven top-level scopes and their leaf scopes) | [`generic-ui-taxonomy.md`](../taxonomy/generic-ui-taxonomy.md), [`ui-element-taxonomy.md`](../taxonomy/ui-element-taxonomy.md), [`taxonomy_mapping.md`](../scopes/taxonomy_mapping.md); `scope.md` without its glossary; [Spec folder structure](../README.md#spec-folder-structure); the `*/scope.md` and `*.scope.md` files |
| 6       | Catalog                     | The generated `openui.json`: how it is built from the scope files, the leaf source format and its field mapping, the leaf template                                                | `spec/README.md`: [Leaf scope source format](../README.md#leaf-scope-source-format-scopemd); [`template.scope.md`](../scopes/template.scope.md); `spec/openui.json`                                                                                                                                                           |
| Annex A | Grammar                     | The authoritative EBNF and its JSON Schema projection                                                                                                                             | [`EBNF.txt`](../EBNF.txt), `openui.schema.json`                                                                                                                                                                                                                                                                               |
| Annex B | Survey mapping              | The evidence register and the approved terminology decisions, with their sources                                                                                                  | [`evidence.md`](../scopes/evidence.md), [`terminology.md`](../scopes/terminology.md)                                                                                                                                                                                                                                          |
| Annex C | Examples                    | One worked example per scope                                                                                                                                                      | [`spec/examples/`](../examples/README.md); `spec/README.md`: [app.json examples](../README.md#appjson-examples)                                                                                                                                                                                                               |

Not in the outline:

- **Packages and tooling** (`spec/README.md` § Packages and Tooling, `spec/tooling/`): they
  document the utilities, not the specification. They stay linked from part 1.
- **Survey records** (`spec/survey/`): working records of how the specification was
  decided. Annex B cites them; they stay out of the published site, as today.

## 2. File layout

The outline orders and numbers the existing files; it does not merge or split them. Each
fact keeps its one owner, as the [taxonomy documents](../scopes/scope.md#taxonomy-documents)
rule already requires for the taxonomy. `spec/README.md` keeps parts 1, 4 and 6 as its
own sections and gets a numbered section index that links every part. The `mkdocs.yml`
navigation follows the same order. The glossary stays in `spec/scopes/scope.md`, so no
link or lint rule changes (the `glossary-single-definition` lint rule reads it there).

## Decisions

For the project owner to approve:

| #   | Decision                           | Proposal                                                                                                                                                                                               |
| --- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Parts and order                    | The nine parts of section 1, which follow the example of plan task W4 16.                                                                                                                              |
| 2   | Split of parts 5 and 6             | Part 5 holds the categorization and the object contracts; part 6 holds only the generated catalog and how it is built from the scope files.                                                            |
| 3   | Place of the terminology decisions | `terminology.md` goes to Annex B with the evidence register: it records why each term was chosen, while the definitions themselves are part 3.                                                         |
| 4   | Tooling outside the outline        | The package and tooling guides are not a part of the specification; part 1 links them.                                                                                                                 |
| 5   | File layout                        | Keep the current files, add a numbered section index to `spec/README.md` and order the `mkdocs.yml` navigation by part (section 2). No file moves now; W6 24 may split `spec/README.md` by part later. |

Already decided, not open here: section 1 holds the scope section (W2 10); the three
taxonomy documents are part of section 5 (plan task W4 16).
