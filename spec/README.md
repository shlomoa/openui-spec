# OpenUI Specification

**Purpose:** Define the scope of the OpenUI specification as an implementation-independent contract for Web UI frameworks.

OpenUI is a technology-independent specification for a Web UI framework. It defines the required behavior, structure, terminology, and compliance rules for a compliant Web UI implementation, independent of any specific rendering technology, build tool, or framework. The prose scopes under `spec/scopes/` are the source of truth; the machine-readable `openui.json` at the repository root is generated from them. This README is the prose entry point for the specification.

It serves application developers, designers and UX owners, framework maintainers, and generator/tooling authors, who all consume the same public contract.

## Spec folder structure

The `scopes` folder is structured hierarchically. Each top-level scope is a folder; each object is either a child scope folder or a snake_case `*.scope.md` leaf file.

| Scope                                          | Object                                                            | Description                                                                    |
| ---------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **[Application](scopes/Application/scope.md)** |                                                                   | Application-level bootstrap artifacts and implementation-independent concepts. |
|                                                | [Routing](scopes/Application/routing.scope.md)                    | Application-level route definitions and route resolution.                      |
|                                                | [Navigation](scopes/Application/navigation.scope.md)              | User-facing navigation exposing routes, pages, and views.                      |
|                                                | [Tool bars](scopes/Application/tool_bars.scope.md)                | Application-level command surfaces and action placement.                       |
|                                                | [favicon.ico](scopes/Application/favicon.scope.md)                | Application icon asset for browser and shell identity.                         |
|                                                | [index.html](scopes/Application/index_html.scope.md)              | Application host document and static bootstrap metadata.                       |
| **[Controls](scopes/Controls/scope.md)**       |                                                                   | Browser, framework, or runtime-provided native controls.                       |
|                                                | [Native](scopes/Controls/native.scope.md)                         | Native controls and presentation (scroll bars, fonts, color schemes).          |
|                                                | [Table](scopes/Controls/Table/scope.md)                           | HTML5 tabular data tags (`table`, `tr`, `th`, `td`).                           |
| **[Behaviors](scopes/Behaviors/scope.md)**     |                                                                   | Reusable behaviors applied to pages, views, containers, and widgets.           |
|                                                | [Drag and drop](scopes/Behaviors/drag_and_drop.scope.md)          | Move elements within a page, view, container, or widget.                       |
|                                                | [Resizable](scopes/Behaviors/resizable.scope.md)                  | Resize elements within a page or view.                                         |
|                                                | [Collapsible](scopes/Behaviors/collapsible.scope.md)              | Collapse and expand elements within a page or view.                            |
| **[Pages](scopes/Pages/scope.md)**             |                                                                   | Predefined page-level layouts and page shells.                                 |
|                                                | [Dashboard](scopes/Pages/dashboard.scope.md)                      | Overview metrics and summary content layout.                                   |
|                                                | [Shell page](scopes/Pages/shell_page.scope.md)                    | A page with no content but with routing and navigation.                        |
|                                                | [Empty page](scopes/Pages/empty_page.scope.md)                    | A page with no content and no routing or navigation.                           |
| **[Views](scopes/Views/scope.md)**             |                                                                   | User-facing views of business objects.                                         |
|                                                | [Reports](scopes/Views/reports.scope.md)                          | Read-only data with filtering, sorting, grouping, and pagination.              |
|                                                | [Forms](scopes/Views/forms.scope.md)                              | Read-write data with validation, submission, and dirty state.                  |
| **[Containers](scopes/Containers/scope.md)**   |                                                                   | Layout containers that arrange child content.                                  |
|                                                | [Grid](scopes/Containers/grid.scope.md)                           | Arranges children in rows and columns.                                         |
|                                                | [Expandable panels](scopes/Containers/expandable_panels.scope.md) | Panels that expand or collapse to show or hide content.                        |
|                                                | [Tabs](scopes/Containers/tabs.scope.md)                           | Tabbed interface switching between views or content.                           |
| **[Widgets](scopes/Widgets/scope.md)**         |                                                                   | Reusable components usable across pages or views.                              |
|                                                | [Charts](scopes/Widgets/charts.scope.md)                          | Visual data representations (bar, line, pie).                                  |
|                                                | [Tables](scopes/Widgets/tables.scope.md)                          | Tabular data with sorting, filtering, and pagination.                          |
|                                                | [Lists](scopes/Widgets/lists.scope.md)                            | Lists of items with sorting, filtering, and pagination.                        |
|                                                | [Date/Time pickers](scopes/Widgets/date_time_pickers.scope.md)    | Calendar-based date and time selection.                                        |
|                                                | [Stepper](scopes/Widgets/stepper.scope.md)                        | Guides users through a multi-step process.                                     |
|                                                | [Dialog](scopes/Widgets/dialog.scope.md)                          | Modal or non-modal dialog with title, content, and actions.                    |

Each linked path is the scope's `attrs.scopeDocument` value in the root `openui.json`, which maps every `spec/scopes/**` document to its machine-readable node.

### Scope folder

Structured hierarchically, named in Pascal Case for folders and snake case for files of the object name, each 'level' is a scope and is structured in one of two ways:

- If it has child objects:
  - scope.md
  - Every child scope will have the same structure (either .md file or a folder).
- If it has no child objects:
  - <object_name>.scope.md object-name will be a snake case version of the object name, e.g. "myObject" becomes "my_object.scope.md".

---

## Spec format

### Canonical root document

The repository root `openui.json` MUST satisfy these top-level root rules:

- `"id"` MUST be `"root"`.
- `"version"` is REQUIRED (top-level only) and MUST equal the current value in
  the repository-root `SCHEMA_VERSION` file (currently `0.0.1`).
- `"type"` follows the general type rules below and is not pinned to a specific
  value.

These rules are enforced by `openui.schema.json`, the machine-readable grammar
for OpenUI documents.

### Naming conventions

the "id" field is a unique identifier for each element, and it must be a camelCase alphanumeric string.

### types - "type" field

Types are names that are either:

- following the kebab-case naming convention, e.g. "my-component".
- PascalCase virtual/spec names, e.g. "MyComponent". PascalCase names do not require a concrete tag name in this document.

Types are categorized to these groups:

- html tags
- Framework specific tags: for example Angular Material
  - Angular Material CDK directives: <table cdk\*\/>
  - Angular Material tags: mat-\*
- Other names: either native names in kebab-case or PascalCase virtual/spec names, e.g. "app-_", "my-_", "custom-\*"

### attributes - "attrs" field

`attrs` contains all non-hierarchical object configuration as key-value pairs.
An attribute with no value appears as having `null` value. Attribute keys and
values should align with the selected framework's attribute naming convention or
with the HTML standard when targeting native HTML.

Each object in the scopes may declare one or more attribute categories:

- **Uses:** input attributes. These provide data, configuration, state, or
  references consumed by the object.
- **Produces:** output attributes. These expose events, emitted values,
  notifications, or callbacks produced by the object.
- **Behaves:** behavior attributes. These describe actions or side effects, such
  as setting another attribute value, running a callback on a button click, or
  invoking target-framework logic. Behaviors generalize the notion of outputs:
  they use output-style binding syntax but describe what the object does rather
  than only what it emits.

The category is represented by the attribute key syntax, not by adding loose
properties outside `attrs`.

For a framework-specific target such as Angular Material:

- `[var1]` represents an input binding named `var1`.
- `(var2)` represents an output binding named `var2`.
- behavior bindings use the same parenthesized form as outputs, because a
  behavior is handled as output-triggered target logic.

Attribute values are strings or `null`. String values may be literals, binding
expressions, JavaScript code snippets, or function calls, depending on the target
framework. The OpenUI specification treats those values as target-language
expressions; generators may validate or transform them for a specific framework,
but the base JSON format does not execute them.

### EBNF notation

```ebnf
(* OpenUI specification in EBNF notation *)

openui-document = "{"
  version-field ","
  id-field ","
  type-field ","
  [ attrs-field "," ]
  [ children-field [ "," ] ]
"}" ;

ui-element = "{"
  id-field ","
  type-field ","
  [ attrs-field "," ]
  [ children-field [ "," ] ]
"}" ;

version-field = '"version"' ":" version-value ;
version-value = '"' version-string '"' ;
version-string = digit+ "." digit+ "." digit+ ;

id-field = '"id"' ":" id-value ;
type-field = '"type"' ":" type-value ;
attrs-field = '"attrs"' ":" "{" [ attribute-list ] "}" ;
children-field = '"children"' ":" "[" [ ui-element-list ] "]" ;

(* ID: camelCase alphanumeric string *)
id-value = '"' lowercase-letter { id-char } '"' ;
id-char = lowercase-letter | uppercase-letter | digit ;
lowercase-letter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" ;
uppercase-letter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" ;

(* Type: html tags, kebab-case, or PascalCase *)
type-value = '"' type-name '"' ;
type-name = html-tag | kebab-case-name | pascal-case-name ;
html-tag = "div" | "span" | "input" | "button" | "table" | ? other standard html elements ? ;
kebab-case-name = lowercase-letter { lowercase-letter | digit | "-" } ;
pascal-case-name = uppercase-letter { letter | digit } [ "-" lowercase-letter { lowercase-letter | digit } ] ;
uppercase-letter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" ;
letter = lowercase-letter | uppercase-letter ;

(* Attributes: key-value pairs. Attribute key syntax identifies input,
   output, or behavior categories. Values are strings or null. *)
attribute-list = attribute-pair { "," attribute-pair } [ "," ] ;
attribute-pair = attr-key ":" attr-value ;
attr-key = '"' characters '"' ;
attr-value = string | null ;

ui-element-list = ui-element { "," ui-element } [ "," ] ;

string = '"' characters '"' ;
null = "null" ;

characters = { character } ;
character = ? any unicode character except quotes and backslash ? | escaped-character ;
escaped-character = "\" ( '"' | "\" | "/" | "b" | "f" | "n" | "r" | "t" | "u" hex hex hex hex ) ;
hex = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "a" | "b" | "c" | "d" | "e" | "f" | "A" | "B" | "C" | "D" | "E" | "F" ;
digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;
```

### Syntax rules

- **Version field (top-level only):** Required semantic version string (e.g., "0.0.1") identifying the spec version
- **ID field:** Must be a camelCase alphanumeric string (starts with lowercase letter, can contain uppercase letters and digits)
- **Type field:** Can be HTML tag names, kebab-case names (e.g., `mat-date-range-input`), or PascalCase names (e.g., `MainPage`)
- **Attributes field:** Key-value pairs where values are strings or null. Attribute key syntax identifies input, output, and behavior categories; all such categories must stay inside the `attrs` object.
- **Children field:** Array of UI elements forming a hierarchical tree structure
- **No loose properties:** All properties must be contained within the `attrs` object

## Leaf scope source format (`*.scope.md`)

`openui.json` is **generated** from the `spec/scopes/**` prose; the prose is the
source of truth ([DECISIONS.md](../docs/DECISIONS.md) DEC-2). Every leaf
`*.scope.md` follows the shared
[`scopes/template.scope.md`](scopes/template.scope.md). Three of its sections are
*machine-bearing* — **Identity**, **Attributes**, **Child model** — and follow
fixed line patterns; **Purpose**, **Accessibility**, and **Validation notes** are
free prose and are not parsed. The converter lives in
[`to_json/`](to_json/) and walks the tree per DEC-6.

### Field mapping

A leaf produces a metadata-only **scope node** plus a single **`<scopeId>Instance`**
child (see [`scopes/scope.md`](scopes/scope.md)). Fields come from:

| `openui.json` field | Source in the leaf |
| --- | --- |
| scope `id` | Identity `id:` (camelCase) |
| scope `type` | derived: PascalCase of the scope `id` |
| scope `attrs.title` | the `#` H1 heading |
| scope `attrs.purpose` | the Purpose section body |
| scope `attrs.scopeDocument` | the leaf's path under `scopes/` |
| scope `attrs.status` | Identity `status:` |
| instance `id` | derived: `<scopeId>Instance` |
| instance `type` | Identity `type:` (the concrete/virtual primitive) |
| instance `attrs` keys | Attributes — each `key` by category, value `null` (DEC-4) |
| instance `children` | Child model — one node (`id`, `type`) per bullet, in order |

Separators are fixed: ` · ` (middot, U+00B7) between Identity fields, and ` — `
(em dash, U+2014) between Attributes and Child-model fields. The Attributes
**category** word is authoritative; its key bracket must agree (`[name]` → `Uses`;
`(name)` → `Produces` or `Behaves`). Value-types, descriptions, and multiplicity
are recorded in prose only and are not serialized into the grammar (DEC-4).
Machine-bearing sections are the **sole enumerators** of ids, keys, types,
categories, and multiplicity; prose sections may reference those names but must not
re-list them (DEC-2).

### Section EBNF

```ebnf
(* OpenUI leaf scope (*.scope.md) — machine-bearing section grammar.
   Only Identity, Attributes, and Child model are parsed; Purpose,
   Accessibility, and Validation notes are free prose, matched as prose-line.
   "—" is U+2014 (em dash); "·" is U+00B7 (middot). *)

leaf-scope          = title-heading
                      { prose-line }
                      identity-section
                      { section } ;
section             = attributes-section | child-model-section | prose-section ;

title-heading       = "#" WS object-title NL ;

identity-section    = "## Identity" NL { prose-line } identity-line ;
identity-line       = "-" WS "id:" WS id-value WS "·" WS
                            "type:" WS type-value WS "·" WS
                            "status:" WS status-value NL ;

attributes-section  = "## Attributes" NL { prose-line }
                      attribute-line { attribute-line | prose-line } ;
attribute-line      = "-" WS "`" attr-key "`" WS "—" WS
                            category WS "—" WS description NL ;
attr-key            = uses-key | output-key ;
uses-key            = "[" attr-name "]" ;        (* category MUST be "Uses" *)
output-key          = "(" attr-name ")" ;        (* category MUST be "Produces" | "Behaves" *)
category            = "Uses" | "Produces" | "Behaves" ;

child-model-section = "## Child model" NL { prose-line }
                      child-line { child-line | prose-line } ;
child-line          = "-" WS child-id WS "—" WS
                            child-type WS "—" WS
                            multiplicity WS "—" WS description NL ;
multiplicity        = "1" | "0..1" | "0..n" | "1..n" ;

prose-section       = heading NL { prose-line } ;
heading             = "##" WS { character } ;

(* lexical — id/type/attr rules reuse the document grammar above *)
id-value            = camel-case ;
child-id            = camel-case ;
type-value          = type-name ;                (* per the document type grammar *)
child-type          = type-name ;
status-value        = "draft" | "review" | "stable" ;
attr-name           = letter { letter | digit } ;
camel-case          = lowercase-letter { letter | digit } ;
object-title        = { character } ;
description         = { character } ;             (* free prose; not interpreted *)
prose-line          = ? any line that is not an identity / attribute / child line ? ;
WS                  = ( " " | "\t" ) { " " | "\t" } ;
NL                  = ? line break ? ;
```

## app.json examples

A worked example per scope lives in [`examples/`](examples/README.md), mirroring
the `scopes` tree: a `<object>.example.json` for each leaf scope and a composite
`scope.example.json` for each parent scope.

### Example: Main page with a date range input

```json
{
  "id": "root",
  "version": "1.0.0",
  "type": "MainPage",
  "attrs": {
    "size": "1960x1080",
    "text": "App navigation demo"
  },
  "children": [
    {
      "id": "dateRangeInput",
      "type": "mat-date-range-input",
      "attrs": {
        "[formGroup]": "\"campaignTwo\"",
        "[rangePicker]": "\"campaignTwoPicker\"",
        "[comparisonStart]": "\"campaignOne.value.start\"",
        "[comparisonEnd]": "\"campaignOne.value.end\""
      },
      "children": [
        {
          "id": "startDateInput",
          "type": "input",
          "attrs": {
            "matStartDate": null,
            "placeholder": "\"Start date\"",
            "formControlName": "\"start\""
          }
        },
        {
          "id": "endDateInput",
          "type": "input",
          "attrs": {
            "matEndDate": null,
            "placeholder": "\"End date\"",
            "formControlName": "\"end\""
          }
        }
      ]
    }
  ]
}
```

---

## How to read this spec

The specification defines **what** a compliant Web UI implementation must provide, without saying **how** it is implemented. For example:

<!--
### Example: Hierarchical structure of a page

### Example: Data binding

### Example: User interaction model
-->
