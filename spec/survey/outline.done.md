# Specification outline

This record defines the numbered outline of the OpenUI specification v1.0 and places
every current spec document, or section of one, in it. It answers W4 task 16 in the
[v1 publish plan](specui_v1_publish_plan.md#w4-specification-structure).

- **Where it applies:** the order and numbering of the specification: the section index
  in `spec/README.md` and the `nav` of `mkdocs.yml`. W6 task 24 rewrites the text to
  this outline; W4 task 17 marks each part normative or informative.
- **Inputs:** the example outline of plan task W4 16; the directive that the three
  taxonomy documents are part of section 5; the [scope section](../README.md#12-scope)
  (W2 10), which is section 1; the current [`spec/README.md`](../README.md#openui-specification),
  [`spec/scopes/scope.md`](../scopes/scope.md#scopes) and the `mkdocs.yml` navigation.
- **Status:** settled by the plan and the spec (see [Sources](#sources)), and applied:
  `spec/README.md` has the numbered [outline](../README.md#outline), and the `mkdocs.yml`
  navigation follows it.

## 1. Outline

| Part    | Title                       | Holds                                                                                                                                                                             | Current source                                                                                                                                                                                                                                                                                                                |
| ------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1       | Introduction and scope      | Purpose, audience, scope (in, out, deferred), how to read the specification                                                                                                       | `spec/README.md`: title paragraphs, [Scope](../README.md#12-scope), [How to read this spec](../README.md#13-how-to-read-this-specification)                                                                                                                                                                                                  |
| 2       | Conformance                 | What conforms (a concrete UI document, the catalog, a validator), the requirement keywords, normative and informative parts, the conformance suite                                | [`spec/README.md` § Conformance](../README.md#2-conformance) (W4 17: the keywords and the normative and informative parts); the [conformance suite](../conformance/README.md)                                                                                                                                                   |
| 3       | Terminology                 | The glossary: one definition for each term, with its generic aliases                                                                                                              | [`spec/scopes/scope.md` § Glossary](../scopes/scope.md#glossary)                                                                                                                                                                                                                                                              |
| 4       | Document model and language | The artifact roles, the document format, ids and types, attributes and their categories, element references, the syntax rules                                                     | `spec/README.md`: [Specification artifacts](../README.md#41-specification-artifacts), [Spec format](../README.md#4-document-model-and-language) (all subsections)                                                                                                                                                               |
| 5       | Categories and objects      | 5.1 Generic UI taxonomy; 5.2 UI element taxonomy; 5.3 Taxonomy mapping; 5.4 Scope tree and folder rules; 5.5 Object contracts (the eleven top-level scopes and their leaf scopes) | [`generic-ui-taxonomy.md`](../taxonomy/generic-ui-taxonomy.md), [`ui-element-taxonomy.md`](../taxonomy/ui-element-taxonomy.md), [`taxonomy_mapping.md`](../scopes/taxonomy_mapping.md); `scope.md` without its glossary; [Spec folder structure](../README.md#55-object-contracts); the `*/scope.md` and `*.scope.md` files |
| 6       | Catalog                     | The generated `openui.json`: how it is built from the scope files, the leaf source format and its field mapping, the leaf template                                                | `spec/README.md`: [Leaf scope source format](../README.md#62-leaf-scope-source-format); [`template.scope.md`](../scopes/template.scope.md); `spec/openui.json`                                                                                                                                                           |
| Annex A | Grammar                     | The authoritative EBNF and its JSON Schema projection                                                                                                                             | [`EBNF.txt`](../EBNF.txt), `openui.schema.json`                                                                                                                                                                                                                                                                               |
| Annex B | Survey mapping              | The evidence register and the approved terminology decisions, with their sources                                                                                                  | [`evidence.md`](../scopes/evidence.md), [`terminology.md`](../scopes/terminology.md)                                                                                                                                                                                                                                          |
| Annex C | Examples                    | One worked example per scope                                                                                                                                                      | [`spec/examples/`](../examples/README.md); `spec/README.md`: [app.json examples](../README.md#annex-c-examples)                                                                                                                                                                                                               |

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

## Sources

Each point of the outline is already answered by the plan or the spec:

| Point                       | Answer                                                                                                                                                             | Source                                                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Parts and order             | The nine parts of section 1; the three taxonomy documents are part 5.                                                                                              | The outline of [plan task W4 16](specui_v1_publish_plan.md#w4-specification-structure)                                                      |
| Parts 5 and 6               | Part 6 "Catalog" holds the generated `openui.json` and how it is built; the scope tree and the object contracts are part 5 "Categories and objects".               | Plan task W4 16; [`spec/README.md` § 4.1 Specification artifacts](../README.md#41-specification-artifacts) |
| Place of `terminology.md`   | It records the approved term changes with their survey evidence, so it goes to Annex B "Survey mapping"; the glossary is part 3 "Terminology".                     | Plan task W4 16                                                                                                                             |
| Tooling outside the outline | The package and tooling guides are not part of the specification; part 1 links them.                                                                               | [Plan goal](specui_v1_publish_plan.md#goal-and-definition-of-done), item 4; task W4 18                                                      |
| File layout                 | No file moves now: W4 defines the outline and the file layout, and W6 24 rewrites the text to it. The numbered outline and the navigation order apply the outline. | [Plan tasks W4 16 and W6 24](specui_v1_publish_plan.md#w6-draft-first-spec)                                                                 |

Also settled: section 1 holds the scope section (W2 10). The conformance suite (W8 32)
belongs to part 2, because it fixes the result every conforming tool must give.

Nothing is open.
