# OpenUI Specification

OpenUI is a technology-independent specification for Web UI frameworks. It defines the
structure, terminology and rules of a compliant Web UI description, independent of any
rendering technology, build tool or framework. This page is the entry point of the
specification: it holds parts 1, 2, 4 and 6 and links every other part.

## Outline

The specification has six parts and three annexes. Part 2 marks each one
[normative or informative](#23-normative-and-informative-parts).

1. [Introduction and scope](#1-introduction-and-scope)
2. [Conformance](#2-conformance), with the [conformance suite](conformance/README.md)
3. [Terminology](#3-terminology): the [glossary](scopes/scope.md#glossary)
4. [Document model and language](#4-document-model-and-language)
5. [Categories and objects](#5-categories-and-objects)
   1. [Generic UI taxonomy](taxonomy/generic-ui-taxonomy.md)
   2. [UI element taxonomy](taxonomy/ui-element-taxonomy.md)
   3. [Taxonomy mapping](scopes/taxonomy_mapping.md)
   4. [Scope tree and folder rules](#54-scope-tree-and-folder-rules)
   5. [Object contracts](#55-object-contracts)
6. [Catalog](#6-catalog)

- [Annex A, Grammar](#annex-a-grammar): [`EBNF.txt`](EBNF.txt) and
  [`openui.schema.json`](openui.schema.json)
- [Annex B, Survey mapping](#annex-b-survey-mapping): the
  [evidence register](scopes/evidence.md) and the [terminology decisions](scopes/terminology.md)
- [Annex C, Examples](#annex-c-examples): the [worked examples](examples/README.md)

## 1. Introduction and scope

### 1.1 Purpose and audience

The specification is an implementation-independent contract for Web UI frameworks. It
serves application developers, designers and UX owners, framework maintainers, and
generator and tooling authors, who all use the same public contract.

### 1.2 Scope

**Out of scope** means the specification does not address it. **Deferred** means a later
edition may address it.

#### In scope

- **Terminology:** the [glossary](scopes/scope.md#glossary), with one definition for each term.
- **Catalog:** the eleven [top-level scopes](scopes/scope.md#top-level-scopes) and their leaf
  scopes, each with its contract. Every catalog object is in scope.
- **Categorization:** the three [taxonomy documents](scopes/scope.md#taxonomy-documents).
- **Language:** the document format ([`EBNF.txt`](EBNF.txt) and its JSON Schema projection),
  including element, data-binding and event references.
- **Survey traceability:** the [evidence register](scopes/evidence.md), which links each
  leaf scope to the surveyed sources.
- **Utilities:** the Python and TypeScript [packages](#14-packages-and-tooling) that parse and
  validate OpenUI documents.
- **Compositions:** a UI pattern built from existing objects is in scope as a composition of
  them, for example a transfer list (two list boxes and buttons), a preview (an Image, a
  Media player or a Dialog), a walkthrough (Popovers) or a query builder (Value help).

#### Out of scope

- **Generators:** they consume the specification and are not part of it.
- **Browser and framework machinery:** HTML parsing, scheduling, storage, workers and
  communication; framework infrastructure and tooling classes.
- **Platform prompts:** prompts the browser or the operating system shows, such as a
  biometric or permission prompt, and speech entry.
- **Implementation techniques:** rendering content outside its place in the tree (a portal)
  and rendering only the visible part of a collection (virtualization).
- **Data that is not UI:** document metadata and resource declarations beyond
  `index.html` and `favicon.ico`, and stored application data such as a saved query.
- **Immersive views:** panoramic, AR and VR views.

#### Deferred

- **Host-shell presence, docking and multiple-document workspaces:** for example a
  notification-area icon, a main window, a dockable panel or a multiple-document workspace.
- **Accessibility and Composition top-level scopes.** Accessibility stays in scope as a
  property of every element: each leaf contract has an Accessibility section.
- **Ruby annotation.**
- **Duration selection** and **index navigation** (an A to Z rail).

### 1.3 How to read this specification

The specification says **what** a compliant Web UI description contains, not **how** a
framework implements it.

- Read the parts in order. Part 4 defines the document every other part talks about, and
  part 5 defines the objects a document may use.
- Each fact is written once. Other parts link to it instead of repeating it, so follow the
  link to read a rule in full.
- Words with a special meaning are defined in the [glossary](scopes/scope.md#glossary).
- The prose is the source: the scope files under `spec/scopes/` define the objects, and
  the catalog, `spec/openui.json`, is generated from them (part 6).
- The examples of Annex C illustrate the rules; they add none.

### 1.4 Packages and tooling

The packages and tools are not part of the specification. They implement it:

- **TypeScript / Node.js:** the [`@shlomoa/openui-spec`](https://www.npmjs.com/package/@shlomoa/openui-spec)
  package on npm provides the `OpenUiJson` document API, the bundled catalog and schema,
  TypeScript types and the `ng-openui-spec` CLI. See the
  [OpenUI JSON editing guide](tooling/editing.md).
- **Python:** the [`openui-spec`](https://pypi.org/project/openui-spec/) package on PyPI
  provides the `openui_spec` editing CLI, the `compare_openui_spec` comparison CLI and the
  importable `openui_spec.compare` API. See the
  [OpenUI JSON comparison guide](tooling/comparison.md).
- **Playground:** the [playground](playground.html) page validates a pasted document
  against the JSON Schema and the catalog and renders its element tree.

## 2. Conformance

### 2.1 Conformance targets

Three things can conform to this specification:

- A **[concrete UI document](scopes/scope.md#concrete-ui-document)** conforms when it
  satisfies the [grammar](#annex-a-grammar) and the rules of
  [part 4](#4-document-model-and-language): it declares the spec version, its ids are
  globally unique, every `type` is a [known object type](scopes/scope.md#known-object-type)
  and every attribute value fits its [declared value type](#46-value-types).
- The **[catalog](scopes/scope.md#catalog)**, `spec/openui.json`, conforms when it is
  generated from the scope files as [part 6](#6-catalog) states and satisfies the grammar.
- A **validator** conforms when it reports, for every document of the
  [conformance suite](#24-conformance-suite), exactly the expected diagnostics.

### 2.2 Requirement keywords

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this
specification are to be interpreted as described in BCP 14
([RFC 2119](https://www.rfc-editor.org/rfc/rfc2119),
[RFC 8174](https://www.rfc-editor.org/rfc/rfc8174)) when, and only when, they appear
in all capitals, as shown here.

- The keywords appear only in normative parts.
- The same words in lower case carry no requirement.
- Notes and examples inside a normative part are informative.

### 2.3 Normative and informative parts

| Part                          | Where                                                                                                                       | Status      |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 1 Introduction and scope      | This page's introduction, [Outline](#outline), 1.1, 1.3 and 1.4                                                             | Informative |
| 1 Introduction and scope      | [1.2 Scope](#12-scope)                                                                                                      | Normative   |
| 2 Conformance                 | [Part 2](#2-conformance) and the [conformance suite](conformance/README.md)                                                 | Normative   |
| 3 Terminology                 | The [glossary](scopes/scope.md#glossary)                                                                                    | Normative   |
| 4 Document model and language | [Part 4](#4-document-model-and-language)                                                                                    | Normative   |
| 5 Categories and objects      | The three taxonomy documents, the [scope tree](#54-scope-tree-and-folder-rules) and the [scope files](#55-object-contracts) | Normative   |
| 6 Catalog                     | [Part 6](#6-catalog), the [leaf scope template](scopes/template.scope.md) and the generated `openui.json`                   | Normative   |
| Annex A Grammar               | [`EBNF.txt`](EBNF.txt), which is authoritative, and its JSON Schema projection                                              | Normative   |
| Annex B Survey mapping        | The [evidence register](scopes/evidence.md) and the [terminology decisions](scopes/terminology.md)                          | Informative |
| Annex C Examples              | The [worked examples](examples/README.md)                                                                                   | Informative |
| Not a part                    | [Packages and tooling](#14-packages-and-tooling)                                                                            | Informative |

### 2.4 Conformance suite

The [conformance suite](conformance/README.md) is a shared set of valid and invalid
documents, with the diagnostics every validator MUST report for them. It defines the
validation stages and the format of the expected diagnostics.

## 3. Terminology

The [glossary](scopes/scope.md#glossary) defines every OpenUI term once, with its generic
aliases. The framework names of each taxonomy entry are in the
[taxonomy mapping](scopes/taxonomy_mapping.md).

## 4. Document model and language

### 4.1 Specification artifacts

Four artifacts take part in the language. They have the same JSON shape but different
roles:

- `EBNF.txt` is the authoritative definition of the OpenUI document format.
- `spec/openui.schema.json` is an executable JSON Schema projection of that format.
- `spec/openui.json` is the [catalog](scopes/scope.md#catalog): a document written in that
  format whose content is the set of objects the specification defines.
- A [concrete UI document](scopes/scope.md#concrete-ui-document), such as a generator's
  `input.json`, describes one UI with the objects of the catalog.

```text
EBNF.txt                 ← authoritative format
  │ projected as
openui.schema.json       ← validates both documents
  ┌────┴─────┐
openui.json   input.json
(catalog of    (one concrete UI
 what exists)   built from the catalog)
```

|              | `EBNF.txt`                   | `openui.schema.json`                       | `spec/openui.json`           |
| ------------ | ---------------------------- | ------------------------------------------ | ---------------------------- |
| Kind         | Format grammar               | JSON **Schema** projection                 | JSON **document** (instance) |
| Level        | normative syntax             | executable validation                      | content / catalog-level      |
| Knows about  | format and field cardinality | shapes, id/type/attrs rules                | exact known `type` literals  |
| Changes when | the _format_ changes         | the EBNF format changes                    | the _spec's objects_ change  |
| Validates    | defines valid documents      | every OpenUI doc, incl. `spec/openui.json` | nothing (it is data)         |

The grammar is content-blind: `"Charts"` is a well-formed PascalCase `type`, but only the
catalog can tell whether it is a known object type. The other rules are checked after the
grammar. Global ID uniqueness is enforced by OpenUI tooling, not by the EBNF or JSON Schema.
The [conformance suite](conformance/README.md#stages) names the stage that owns each rule:
grammar, document, catalog and contract.

The packages run the grammar stage against `openui.schema.json`, rather than restating the
document format in program code. Their JSON decoders additionally report malformed JSON and
duplicate object members before schema validation, because a JSON Schema receives an already
decoded value and cannot observe duplicate members.

### 4.2 Document structure

A document is one JSON object, the root element. Every element has these fields:

- **`id`** (REQUIRED): see [4.3](#43-identifiers). The root `id` MUST be `"root"`.
- **`version`** (REQUIRED on the root, not allowed on any other element): the spec version
  the document is written for, a semantic version string ([4.8](#48-versioning)).
- **`type`** (REQUIRED): see [4.4](#44-types).
- **`attrs`** (OPTIONAL): the element's attributes ([4.5](#45-attributes-and-their-categories)).
- **`children`** (OPTIONAL): an array of elements, which forms the document tree.

An element MUST NOT have any other field. JSON member order carries no meaning, and
trailing commas are not allowed. [Annex A](#annex-a-grammar) gives the exact grammar.

### 4.3 Identifiers

Every element `id` MUST be a camelCase alphanumeric string: a lowercase letter followed by
letters and digits. Ids MUST be globally unique within a document, not only among
siblings.

### 4.4 Types

The grammar accepts a `type` written as an HTML tag name, in kebab-case or in PascalCase.
In a concrete UI document, each `type` MUST also be a
[known object type](scopes/scope.md#known-object-type), which the glossary defines.

Framework selectors, directives, generated component names, implementation identifiers,
id-derived aliases, compatibility aliases and example-only pseudo-types MUST NOT be used as
types. Specialized UI uses the closest known type and expresses its distinctions through
`id`, `attrs` and known-type `children`.

### 4.5 Attributes and their categories

`attrs` holds all non-hierarchical configuration of an element as key-value pairs. The key
prefix names the attribute's category:

- **Uses:** `uses.<name>`, an input attribute. It provides data, configuration, state or
  a reference that the element consumes.
- **Produces:** `produces.<name>`, an output attribute. It exposes an event, an emitted
  value, a notification or a callback of the element.
- **Behaves:** `behaves.<name>`, a behavior attribute. It describes an action or a side
  effect, such as setting another attribute's value or running a callback on a button
  click. Behaviors generalize outputs: they describe what the element does, not only
  what it emits.
- A plain `<name>` carries no category, for example a native HTML attribute or catalog
  metadata such as `title`.

`<name>` MUST be a camelCase alphanumeric string. A category MUST be written in the key,
inside `attrs`, never as a separate field. A generator maps each category to its target
framework; the specification does not fix that mapping (the Angular generator's mapping is
in its [generation guide](https://github.com/shlomoa/openui-spec/blob/main/generators/angular/generator/docs/GENERATION.md#attribute-categories-in-angular)).

An attribute value is a JSON string, `null`, or a list of these, as in HTML, where an
attribute value is a quoted string or absent. A JSON number or Boolean is not a value.
`null` means the attribute is present without a value, and `"null"` is the string `null`.
A typed value is written as a string, for example `"true"` or `"25"`, and a type may be
annotated inside the string with a conversion in the target language, for example
`"(int)x"`; the specification defines no conversion syntax. A string value is either:

- a **literal**, quoted inside the string: `"\"Details\""` is the text `Details`; or
- a **binding or target-language expression**, unquoted: `orders`, `!isExpanded` or
  `onSubmit(form.value)`. The specification does not execute it; a generator may
  validate or transform it for its framework.

Produces and Behaves values MUST be target-language expressions or `null`.

### 4.6 Value types

A Uses attribute declares one value type in its scope's Attributes line, and the catalog
carries it as the attribute's string value (see [6.3](#63-field-mapping)). The syntax of a
value type is the `value_type` production of the [section grammar](#64-section-grammar). An
attribute value is a string, `null` or a list of these
([4.5](#45-attributes-and-their-categories)), so every value of a typed attribute is a string:

| Value type        | A value is written as                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| `string`          | a quoted string, `"\"Orders\""`                                                                  |
| `boolean`         | the unquoted string `true` or `false`, `"true"`                                                  |
| `integer`         | an unquoted string of digits, `"25"`                                                             |
| `number`          | an unquoted decimal string, `"0.5"`                                                              |
| `url`             | a quoted URI reference ([RFC 3986](https://www.rfc-editor.org/rfc/rfc3986)), `"\"favicon.ico\""` |
| `enum(a\|b)`      | one of the listed words, quoted, `"\"rtl\""`                                                     |
| `reference`       | an [element reference](#47-element-references), `"\"dashboardRoute\""`                           |
| `reference(A\|B)` | an element reference to an element whose `type` is `A` or `B`                                    |
| `list(type)`      | a JSON list of strings and `null` whose items are values of `type`                               |

An unquoted string is a binding or target-language expression, so a `boolean`, `integer` or
`number` value is an expression: the contract stage does not check it, and a conversion may
annotate it (`"(int)x"`, [4.5](#45-attributes-and-their-categories)). A quoted literal is
text, so it does not fit `boolean`, `integer` or `number`. `null` means the attribute is
present without a value, for every type. A value that does not fit its declared type is
invalid. A value of an attribute the contract does not declare is not type-checked.

The contract of a known type is the Attributes section of the leaf scope whose scope type
or instance type it is; in the catalog, those are the category-prefixed attributes of the
instance node.

### 4.7 Element references

An element reference is a Uses-attribute value that identifies another element of the same
document by its `id`. Its static form is a quoted string literal whose decoded value is
that id, for example `"uses.route": "\"dashboardRoute\""`. A consumer resolves the
reference across the whole document, not just among the referring element's siblings.

A literal `reference` value MUST name an element of the same document; for
`reference(A|B)`, that element's `type` MUST be `A` or `B`. The grammar and the JSON Schema
do not resolve references; the contract stage of a validator does, using the declared
value type. Framework selectors and generated identifiers stay implementation details:
their appearance as attribute data does not make them valid types.

For example, `Routing` `uses.defaultRoute`, `NavItem` `uses.route` and `Route`
`uses.redirectTo` are `reference(Route)`; the `uses.target` of every behavior references the
[controlled element](scopes/scope.md#controlled-element) the behavior acts on. The
following are `reference`, to an element of any type: `OverlayContainers`,
`FeedbackWidgets` and `MenuWidgets` `uses.anchor` (the element the overlay, the tooltip or
contextual help, or the menu is attached to), `DisplayPrimitives` `uses.for` (the element a
label names), `Collapsible` `uses.trigger` (the
[controlling element](scopes/scope.md#controlling-element)) and `ModalOverlay`
`uses.initialFocus` (the element inside the modal surface that receives focus first). Each
leaf contract declares the types its references accept.

### 4.8 Versioning

The spec version follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
(MAJOR.MINOR.PATCH, no pre-release suffix). Every specification change is a new version
and may break existing documents. A document declares the spec version it is written for
in its root `version`. A tool MUST accept only the spec version it implements; there is no
deprecation period. The npm and PyPI packages take the spec's version; a change to a
package alone takes a patch release, `0.x.y`
([RELEASING](https://github.com/shlomoa/openui-spec/blob/main/RELEASING.md#2-select-and-set-the-package-version)
gives the procedure).

## 5. Categories and objects

Part 5 defines the objects a document may use and how they are grouped. The taxonomy and
the scope tree are linked views of one vocabulary; the
[taxonomy documents](scopes/scope.md#taxonomy-documents) table states which document owns
each fact.

### 5.1 Generic UI taxonomy

The [generic UI taxonomy](taxonomy/generic-ui-taxonomy.md) holds the sections, the
subcategories with their inclusion rules and the entries.

### 5.2 UI element taxonomy

The [UI element taxonomy](taxonomy/ui-element-taxonomy.md) holds the abstract element
types and the classification rules.

### 5.3 Taxonomy mapping

The [taxonomy mapping](scopes/taxonomy_mapping.md) links each entry to its scope object,
with its abstraction level and framework names, and gives each leaf scope its primary
category.

### 5.4 Scope tree and folder rules

The scope tree is the folder `spec/scopes/`. Its [index](scopes/scope.md) lists the
[top-level scopes](scopes/scope.md#top-level-scopes) and states the
[folder and file convention](scopes/scope.md#folder-and-file-convention).

### 5.5 Object contracts

Each scope file is the contract of one object. A folder's `scope.md` describes the folder
and lists its objects; a leaf `*.scope.md` follows the [leaf template](#62-leaf-scope-source-format).
Each linked path is the scope's `attrs.scopeDocument` value in `spec/openui.json`.

| Scope                                                            | Objects                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Application](scopes/Application/scope.md)**                   | [Routing](scopes/Application/routing.scope.md), [Route](scopes/Application/route.scope.md), [Navigation](scopes/Application/navigation.scope.md), [Navigation item](scopes/Application/nav_item.scope.md), [Navigation group](scopes/Application/nav_group.scope.md), [Tool bars](scopes/Application/tool_bars.scope.md), [Tool bar row](scopes/Application/tool_bar_row.scope.md), [Tool action](scopes/Application/tool_action.scope.md), [favicon.ico](scopes/Application/favicon.scope.md), [index.html](scopes/Application/index_html.scope.md)                                                                               |
| **[Controls](scopes/Controls/scope.md)**                         | [Native](scopes/Controls/native.scope.md), [Action controls](scopes/Controls/action_controls.scope.md), [Text inputs](scopes/Controls/text_inputs.scope.md), [Choice controls](scopes/Controls/choice_controls.scope.md), [Picker control](scopes/Controls/picker_control.scope.md), [Range control](scopes/Controls/range_control.scope.md), [Drawing and capture](scopes/Controls/drawing_and_capture.scope.md), [Display primitives](scopes/Controls/display_primitives.scope.md), [Status indicator](scopes/Controls/status_indicator.scope.md), [Link and scroll controls](scopes/Controls/link_and_scroll_controls.scope.md) |
| **[Behaviors](scopes/Behaviors/scope.md)**                       | [Drag and drop](scopes/Behaviors/drag_and_drop.scope.md), [Resizable](scopes/Behaviors/resizable.scope.md), [Collapsible](scopes/Behaviors/collapsible.scope.md), [Input assistance](scopes/Behaviors/input_assistance.scope.md), [Modal overlay](scopes/Behaviors/modal_overlay.scope.md), [Viewport and focus control](scopes/Behaviors/viewport_and_focus_control.scope.md)                                                                                                                                                                                                                                                     |
| **[Pages](scopes/Pages/scope.md)**                               | [Dashboard](scopes/Pages/dashboard.scope.md), [Shell page](scopes/Pages/shell_page.scope.md), [Empty page](scopes/Pages/empty_page.scope.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **[Views](scopes/Views/scope.md)**                               | [Report](scopes/Views/report.scope.md), [Form](scopes/Views/form.scope.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **[Containers](scopes/Containers/scope.md)**                     | [Grid](scopes/Containers/grid.scope.md), [Expandable panels](scopes/Containers/expandable_panels.scope.md), [Tabs](scopes/Containers/tabs.scope.md), [Surface containers](scopes/Containers/surface_containers.scope.md), [Sheet containers](scopes/Containers/sheet_containers.scope.md), [Overlay containers](scopes/Containers/overlay_containers.scope.md), [Structural containers](scopes/Containers/structural_containers.scope.md), [Splitters](scopes/Containers/splitters.scope.md)                                                                                                                                       |
| **[Widgets](scopes/Widgets/scope.md)**                           | [Chart](scopes/Widgets/chart.scope.md), [Table](scopes/Widgets/table.scope.md), [Data grid](scopes/Widgets/data_grid.scope.md), [List](scopes/Widgets/list.scope.md), [Feedback widgets](scopes/Widgets/feedback_widgets.scope.md), [Media widgets](scopes/Widgets/media_widgets.scope.md), [Navigation widgets](scopes/Widgets/navigation_widgets.scope.md), [Menu widgets](scopes/Widgets/menu_widgets.scope.md), [Date/Time pickers](scopes/Widgets/date_time_pickers.scope.md), [Stepper](scopes/Widgets/stepper.scope.md), [Dialog](scopes/Widgets/dialog.scope.md)                                                           |
| **[Layout](scopes/Layout/scope.md)**                             | —                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **[Presentation](scopes/Presentation/scope.md)**                 | —                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **[Internationalization](scopes/Internationalization/scope.md)** | —                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **[Interaction](scopes/Interaction/scope.md)**                   | —                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

Layout, Presentation, Internationalization and Interaction are folder abstractions: they
name notions and have no leaf objects.

## 6. Catalog

### 6.1 Generation

`spec/openui.json` is **generated** from the `spec/scopes/**` prose, which is the source of
truth; it is not written by hand. The converter `spec/bin/to_json` builds it:

```bash
python -m spec.bin.to_json --spec-dir spec --output spec/openui.json
```

The catalog root MUST have `"id": "root"`, `"type": "html"` and a `"version"` equal to the
repository-root `SCHEMA_VERSION` file. Its children follow the scope tree: a folder becomes
a scope node with the folder's objects as children, and a leaf becomes a scope node with
one instance node (see [6.3](#63-field-mapping)). Every node carries the `attrs.scopeDocument`
path of its scope file, except an instance node, which gets its traceability from its
scope node.

The converter does not restate the line shapes and the value types of a leaf scope: it
derives its patterns from the `ebnf` block of [6.4](#64-section-grammar), which is their
single definition, and takes the id, type-name and attribute-name tokens from
`openui.schema.json`.

### 6.2 Leaf scope source format

Every leaf `*.scope.md` follows the shared [leaf template](scopes/template.scope.md). Three
of its sections are _machine-bearing_: **Identity**, **Attributes** and **Child model**.
They follow fixed line patterns ([6.4](#64-section-grammar)). **Purpose**,
**Accessibility** and **Validation notes** are free prose and are not parsed.

The template states the rules of each section, including which sections a leaf may omit.

### 6.3 Field mapping

A leaf produces a metadata-only **scope node** and a single **`<scopeId>Instance`** child:

| `spec/openui.json` field    | Source in the leaf                                        |
| --------------------------- | --------------------------------------------------------- |
| scope `id`                  | Identity `id:` (camelCase)                                |
| scope `type`                | derived: PascalCase of the scope `id`                     |
| scope `attrs.title`         | the `#` H1 heading                                        |
| scope `attrs.purpose`       | the Purpose section body                                  |
| scope `attrs.scopeDocument` | the leaf's path under `scopes/`                           |
| scope `attrs.status`        | Identity `status:`                                        |
| instance `id`               | derived: `<scopeId>Instance`                              |
| instance `type`             | Identity `type:` (the concrete or virtual primitive)      |
| instance `attrs` keys       | Attributes: each `key`, with its category prefix          |
| instance `attrs` values     | Attributes: the Uses value type; `null` otherwise         |
| instance `children`         | Child model: one node (`id`, `type`) per bullet, in order |

Separators are fixed: `·` (middot, U+00B7) between Identity fields, and `—` (em dash,
U+2014) between Attributes and Child-model fields. The Attributes **category** word is
authoritative, and the key prefix MUST agree with it (`uses.name` → `Uses`;
`produces.name` → `Produces`; `behaves.name` → `Behaves`). A Uses attribute MUST declare
one [value type](#46-value-types), and every `reference(Type)` MUST name a known object
type. Descriptions and multiplicity are recorded in prose only and are not serialized.

### 6.4 Section grammar

The converter translates this block into the patterns it matches the Identity, Attributes
and Child model lines with ([6.1](#61-generation)); notation or a production it does not
understand fails the build. It also rejects a bullet in those sections that matches no line,
and a Produces or Behaves line whose description starts with a value-type field.

```ebnf
(* OpenUI leaf scope (*.scope.md) — machine-bearing section grammar.
   Only Identity, Attributes, and Child model are parsed; Purpose,
   Accessibility, and Validation notes are free prose, matched as prose-line.
   "—" is U+2014 (em dash); "·" is U+00B7 (middot). *)

leaf_scope          = title_heading
                      { prose_line }
                      identity_section
                      { section } ;
section             = attributes_section | child_model_section | prose_section ;

title_heading       = "#" WS object_title NL ;

identity_section    = "## Identity" NL { prose_line } identity_line ;
identity_line       = "-" WS "id:" WS id_value WS "·" WS
                            "type:" WS type_value WS "·" WS
                            "status:" WS status_value NL ;

attributes_section  = "## Attributes" NL { prose_line }
                      attribute_line { attribute_line | prose_line } ;
attribute_line      = uses_line | output_line ;
uses_line           = "-" WS "`" "uses." attr_name "`" WS "—" WS
                            "Uses" WS "—" WS value_type WS "—" WS description NL ;
output_line         = "-" WS "`" output_prefix attr_name "`" WS "—" WS
                            output_category WS "—" WS description NL ;
output_prefix       = "produces." | "behaves." ;  (* MUST match the category *)
output_category     = "Produces" | "Behaves" ;
value_type          = scalar_type | "list(" scalar_type ")" ;
scalar_type         = "string" | "boolean" | "integer" | "number" | "url"
                    | "enum(" enum_word { "|" enum_word } ")"
                    | "reference" [ "(" type_name { "|" type_name } ")" ] ;
enum_word           = lowercase_letter { lowercase_letter | digit | "-" } ;

child_model_section = "## Child model" NL { prose_line }
                      child_line { child_line | prose_line } ;
child_line          = "-" WS child_id WS "—" WS
                            child_type WS "—" WS
                            multiplicity WS "—" WS description NL ;
multiplicity        = "1" | "0..1" | "0..n" | "1..n" ;

prose_section       = heading NL { prose_line } ;
heading             = "##" WS { character } ;

(* lexical — a scope line writes the id, type and attribute-name tokens of a document:
   type_name is the pattern of `$defs/typeName` in openui.schema.json, and camel_case is
   the pattern of an element id (`$defs/element`) and of an attribute name (`$defs/attrs`) *)
id_value            = camel_case ;
child_id            = camel_case ;
type_value          = type_name ;                (* per the document type grammar *)
child_type          = type_name ;
status_value        = "draft" | "review" | "stable" ;
attr_name           = camel_case ;
camel_case          = lowercase_letter { letter | digit } ;
letter              = lowercase_letter | uppercase_letter ;
lowercase_letter    = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l"
                    | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x"
                    | "y" | "z" ;
uppercase_letter    = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L"
                    | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X"
                    | "Y" | "Z" ;
digit               = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;
character           = ? any character except a line break ? ;
object_title        = { character } ;
description         = { character } ;             (* free prose; not interpreted *)
prose_line          = ? any line that is not an identity / attribute / child line ? ;
WS                  = ( " " | "\t" ) { " " | "\t" } ;
NL                  = ? line break ? ;
```

## Annex A. Grammar

[`EBNF.txt`](EBNF.txt) is the authoritative grammar of the OpenUI document format.
[`openui.schema.json`](openui.schema.json) is its JSON Schema (draft 2020-12) projection and
MUST accept and reject the same documents; `spec/bin/check_grammar_consistency` checks this
on the conformance suite. The schema's `$id`,
<https://raw.githubusercontent.com/shlomoa/openui-spec/main/spec/openui.schema.json>, is its
stable reference, for example as a `$schema` value.

The packages validate decoded document values against `openui.schema.json`. Their only grammar
checks before it are JSON decoding and duplicate-member detection; the conformance suite
defines how decoder and JSON Schema results map to grammar diagnostics.

EBNF blocks use `(* ... *)` for comments; comment text explains and is not part of the
grammar. Quoted punctuation terminals are literal: for example, `"-"` is a hyphen where a
production allows hyphenated names.

## Annex B. Survey mapping

The [evidence register](scopes/evidence.md) links each leaf scope to the surveyed sources
that justify it. The [terminology decisions](scopes/terminology.md) record the approved
term changes, with their evidence and the canonical-term rule.

## Annex C. Examples

The [worked examples](examples/README.md) give one complete OpenUI document per scope,
mirroring the scope tree: a `<object>.example.json` for each leaf scope and a composite
`scope.example.json` for each folder scope.
