# OpenUI Specification

**Purpose:** Define the scope of the OpenUI specification as an implementation-independent contract for Web UI frameworks.

OpenUI is a technology-independent specification for a Web UI framework. It defines the required behavior, structure, terminology, and compliance rules for a compliant Web UI implementation, independent of any specific rendering technology, build tool, or framework. The prose scopes under `spec/scopes/` are the source of truth; the machine-readable `spec/openui.json` is generated from them. This README is the prose entry point for the specification.

It serves application developers, designers and UX owners, framework maintainers, and generator/tooling authors, who all consume the same public contract.

## Packages and Tooling

- **TypeScript / Node.js**: The [`@shlomoa/openui-spec`](https://www.npmjs.com/package/@shlomoa/openui-spec) package on npm provides the `OpenUiJson` document API, bundled canonical catalog/schema, TypeScript types, and the `ng-openui-spec` CLI. See the [OpenUI JSON editing guide](tooling/editing.md) for full usage.
- **Python**: The [`openui-spec`](https://pypi.org/project/openui-spec/) package on PyPI provides the `openui_spec` editing CLI and the `compare_openui_spec` comparison CLI. See the [OpenUI JSON comparison guide](tooling/comparison.md) for changelog tooling.

## Glossary

OpenUI vocabulary (canonical terms, aliases, and definitions) is defined once in
the [scopes glossary](scopes/scope.md#glossary).

## Specification artifacts: grammar vs. catalog

This section is the repository source of truth for the roles of `EBNF.txt`,
`input.json`, `spec/openui.schema.json`, and `spec/openui.json`. Other documents
should reference this section instead of redefining those roles. The files are
easy to confuse — they are all JSON or JSON-related OpenUI artifacts — but they
sit at **different levels of abstraction**.

### TL;DR

- `EBNF.txt` is the authoritative definition of the OpenUI document format.
- `spec/openui.schema.json` is an executable JSON Schema projection of that format.
- `spec/openui.json` is a **document written in that grammar** whose _content_ is the
  specification's object **catalog** and exact known-type set.
- `input.json` is a **concrete UI/app document** that conforms to the grammar and
  uses only exact known object type literals from the catalog.

`spec/openui.json` is to `EBNF.txt` as an XML file is to its DTD, or a
`package.json` to its JSON Schema.

### `EBNF.txt` — the format grammar

`EBNF.txt` is the authoritative source for OpenUI document syntax: root and
element fields, required and optional field cardinality, JSON member ordering,
id and type syntax, attributes, and child nesting. It defines JSON object member
order as insignificant and forbids trailing commas.

### `spec/openui.schema.json` — executable grammar projection

A standard [JSON Schema](https://json-schema.org/) (draft 2020-12) that projects
the EBNF format into validator rules. It validates the shape every OpenUI
document must have, and nothing about content:

- the root object requires `version` + `id` + `type`; `id` must be the literal
  `"root"`;
- a recursive `element`: each node requires `id` + `type`, optionally `attrs` +
  `children`;
- `id` rules (camelCase `^[a-z][A-Za-z0-9]*$`), kebab-case or PascalCase
  `type` syntax, `attrs` as a `string | null` map, with
  `additionalProperties: false` everywhere.

It is **generic and content-blind**. It has no idea what `Charts`, `Dashboard`,
or `Application` are — it only knows that `"Charts"` is a syntactically legal
PascalCase `type`. Syntactic validity does not make `Charts` a known object type.

**Purpose:** validate that any OpenUI JSON is well-formed according to the EBNF
format.

**Canonical location:** the schema's `$id` is
<https://raw.githubusercontent.com/shlomoa/openui-spec/main/spec/openui.schema.json>.
Use this URL as the stable reference when validating an OpenUI document against
the current grammar (for example, as a `$schema` value or in a validator
configuration).

### `spec/openui.json` — the spec catalog (an _instance_ of the grammar)

A concrete document that **conforms to** `openui.schema.json`. Its _content_ is
the authoritative catalog of the specification's scopes:
`Scopes → Application / Controls / Behaviors / Pages / Views / Containers /
Widgets → …`, each node carrying `attrs.scopeDocument` pointers into the prose
`spec/**` files.

**Purpose:** be the machine-readable vocabulary of _what objects the spec
defines_, the exact literal set of known object types, and the trace links to
their prose.

> `spec/openui.json` is **generated** from the `spec/scopes/**` prose, which is the
> source of truth. It is canonical as the machine-readable form, but it is a
> derived artifact, not hand-authored.

### The relationship

```text
EBNF.txt             ← authoritative document format
  │ projected as
openui.schema.json   ← executable shape validator
  ▲ validates
openui.json          ← the spec's catalog of available objects (vocabulary)
```

|              | `EBNF.txt`                   | `openui.schema.json`                       | `spec/openui.json`           |
| ------------ | ---------------------------- | ------------------------------------------ | ---------------------------- |
| Kind         | Format grammar               | JSON **Schema** projection                 | JSON **document** (instance) |
| Level        | normative syntax             | executable validation                      | content / catalog-level      |
| Knows about  | format and field cardinality | shapes, id/type/attrs rules                | exact known `type` literals  |
| Changes when | the _format_ changes         | the EBNF format changes                    | the _spec's objects_ change  |
| Validates    | defines valid documents      | every OpenUI doc, incl. `spec/openui.json` | nothing (it is data)         |

### Where `input.json` fits

A generator `input.json` is a concrete UI/app document, e.g. a dashboard with
three charts. It conforms to the **same grammar** as `spec/openui.json` and uses
object vocabulary from the `spec/openui.json` catalog. The two documents are
distinguished by _role_, not by _shape_:

```text
EBNF.txt                 ← authoritative format
  │ projected as
openui.schema.json       ← validates both documents
  ┌────┴─────┐
openui.json   input.json
(catalog of    (one concrete app
 what exists)   built from the catalog)
```

- `spec/openui.json` = "here are the exact **type literals** you may use" (the
  catalog).
- `input.json` = "here is the **app** I want, using that vocabulary."
- `EBNF.txt` = "here is the **format** both must obey."
- `openui.schema.json` = "here is the executable validator for that format."

The format alone cannot tell whether `input.json` uses a known object type —
that exact-membership check is against the **catalog**, not the EBNF or schema.
Global ID uniqueness is enforced by OpenUI tooling, not by the EBNF or JSON Schema.
Once a type is known, the common format governs its instance; the catalog does
not impose per-type attribute or child restrictions. The base validator also
does not resolve element references or enforce required, exclusive, or
target-type constraints documented by individual object contracts. Consumers
that need those checks must implement them for their target until
catalog-driven contract validation is specified.

Generators use the three artifacts together:

- define and maintain `input.json` format against `EBNF.txt`,
- validate `input.json` against the executable projection in
  `spec/openui.schema.json`,
- validate every `input.json` node's exact `type` literal against the object
  catalog defined by `spec/openui.json`, and
- generate target-framework output from the validated `input.json`.

## Spec folder structure

The `scopes` folder is structured hierarchically. Each top-level scope is a folder; each object is either a child scope folder or a snake_case `*.scope.md` leaf file.
The [taxonomy mapping](scopes/taxonomy_mapping.md) maps the abstract entries in
`docs/generic-ui-taxonomy.md` to the concrete scope object or alias that owns
each term.

| Scope                                                            | Object                                                                        | Description                                                                                           |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **[Application](scopes/Application/scope.md)**                   |                                                                               | Application-level bootstrap artifacts and implementation-independent concepts.                        |
|                                                                  | [Routing](scopes/Application/routing.scope.md)                                | Application-level route definitions and route resolution.                                             |
|                                                                  | [Route](scopes/Application/route.scope.md)                                    | Location pattern resolving to application content or another route.                                   |
|                                                                  | [Navigation](scopes/Application/navigation.scope.md)                          | User-facing navigation exposing routes, pages, and views.                                             |
|                                                                  | [Navigation item](scopes/Application/nav_item.scope.md)                       | Labelled destination for an application route.                                                        |
|                                                                  | [Navigation group](scopes/Application/nav_group.scope.md)                     | Labelled hierarchical collection of navigation destinations.                                          |
|                                                                  | [Tool bars](scopes/Application/tool_bars.scope.md)                            | Application-level command surfaces and action placement.                                              |
|                                                                  | [Tool bar row](scopes/Application/tool_bar_row.scope.md)                      | Ordered collection of toolbar actions.                                                                |
|                                                                  | [Tool action](scopes/Application/tool_action.scope.md)                        | Labelled application command exposed from a toolbar.                                                  |
|                                                                  | [favicon.ico](scopes/Application/favicon.scope.md)                            | Application icon asset for browser and shell identity.                                                |
|                                                                  | [index.html](scopes/Application/index_html.scope.md)                          | Application host document and static bootstrap metadata.                                              |
| **[Controls](scopes/Controls/scope.md)**                         |                                                                               | Browser, framework, or runtime-provided native controls.                                              |
|                                                                  | [Native](scopes/Controls/native.scope.md)                                     | Native controls and presentation (scroll bars, fonts, color schemes).                                 |
|                                                                  | [Action controls](scopes/Controls/action_controls.scope.md)                   | Command controls such as buttons and icon buttons.                                                    |
|                                                                  | [Text inputs](scopes/Controls/text_inputs.scope.md)                           | Text-entry controls such as text fields, text areas, and search fields.                               |
|                                                                  | [Choice controls](scopes/Controls/choice_controls.scope.md)                   | Selection controls such as checkboxes, radio buttons, and combo boxes.                                |
|                                                                  | [Picker control](scopes/Controls/picker_control.scope.md)                     | Specialized picker controls such as wheel, color, and file pickers.                                   |
|                                                                  | [Range control](scopes/Controls/range_control.scope.md)                       | Scalar value controls such as sliders, spin boxes, and rating controls.                               |
|                                                                  | [Drawing and capture](scopes/Controls/drawing_and_capture.scope.md)           | Canvas, drawing, microphone, and biometric capture controls.                                          |
|                                                                  | [Display primitives](scopes/Controls/display_primitives.scope.md)             | Render-only primitives such as labels, text, images, icons, and separators.                           |
|                                                                  | [Status indicator](scopes/Controls/status_indicator.scope.md)                 | Passive state feedback such as status bars, badges, progress, and loaders.                            |
|                                                                  | [Link and scroll controls](scopes/Controls/link_and_scroll_controls.scope.md) | Primitive links and scrollbars.                                                                       |
| **[Behaviors](scopes/Behaviors/scope.md)**                       |                                                                               | Reusable behaviors applied to pages, views, containers, and widgets.                                  |
|                                                                  | [Drag and drop](scopes/Behaviors/drag_and_drop.scope.md)                      | Move elements within a page, view, container, or widget.                                              |
|                                                                  | [Resizable](scopes/Behaviors/resizable.scope.md)                              | Resize elements within a page or view.                                                                |
|                                                                  | [Collapsible](scopes/Behaviors/collapsible.scope.md)                          | Collapse and expand elements within a page or view.                                                   |
| **[Pages](scopes/Pages/scope.md)**                               |                                                                               | Predefined page-level layouts and page shells.                                                        |
|                                                                  | [Dashboard](scopes/Pages/dashboard.scope.md)                                  | Overview metrics and summary content layout.                                                          |
|                                                                  | [Shell page](scopes/Pages/shell_page.scope.md)                                | A page with no content but with routing and navigation.                                               |
|                                                                  | [Empty page](scopes/Pages/empty_page.scope.md)                                | A page with no content and no routing or navigation.                                                  |
| **[Views](scopes/Views/scope.md)**                               |                                                                               | User-facing views of business objects.                                                                |
|                                                                  | [Report](scopes/Views/report.scope.md)                                        | Read-only data with filtering, sorting, grouping, and pagination.                                     |
|                                                                  | [Form](scopes/Views/form.scope.md)                                            | Read-write data with validation, submission, and dirty state.                                         |
| **[Containers](scopes/Containers/scope.md)**                     |                                                                               | Layout containers that arrange child content.                                                         |
|                                                                  | [Grid](scopes/Containers/grid.scope.md)                                       | Arranges children in rows and columns.                                                                |
|                                                                  | [Expandable panels](scopes/Containers/expandable_panels.scope.md)             | Panels that expand or collapse to show or hide content.                                               |
|                                                                  | [Tabs](scopes/Containers/tabs.scope.md)                                       | Tabbed interface switching between views or content.                                                  |
|                                                                  | [Surface containers](scopes/Containers/surface_containers.scope.md)           | Windows, screens, views, panels, cards, and toolbar surfaces.                                         |
|                                                                  | [Sheet containers](scopes/Containers/sheet_containers.scope.md)               | Sidebars, sheets, side sheets, and bottom sheets.                                                     |
|                                                                  | [Overlay containers](scopes/Containers/overlay_containers.scope.md)           | Popovers and modal overlays.                                                                          |
|                                                                  | [Structural containers](scopes/Containers/structural_containers.scope.md)     | Panes, rails, stacks, scaffolds, and regions.                                                         |
|                                                                  | [Splitters](scopes/Containers/splitters.scope.md)                             | Movable dividers between panes or regions.                                                            |
| **[Widgets](scopes/Widgets/scope.md)**                           |                                                                               | Reusable components usable across pages or views.                                                     |
|                                                                  | [Chart](scopes/Widgets/chart.scope.md)                                        | Visual data representations (bar, line, pie).                                                         |
|                                                                  | [Table](scopes/Widgets/table.scope.md)                                        | Tabular presentation of data with column definitions, row models, sorting, filtering, and pagination. |
|                                                                  | [Data grid](scopes/Widgets/data_grid.scope.md)                                | Interactive tabular data with grid navigation, selection, or editing.                                 |
|                                                                  | [List](scopes/Widgets/list.scope.md)                                          | An ordered or unordered collection of items with sorting, filtering, and pagination.                  |
|                                                                  | [Feedback widgets](scopes/Widgets/feedback_widgets.scope.md)                  | Tooltips, alerts, toasts, notifications, and audio-description surfaces.                              |
|                                                                  | [Media widgets](scopes/Widgets/media_widgets.scope.md)                        | Media players, camera previews, and map surfaces.                                                     |
|                                                                  | [Navigation widgets](scopes/Widgets/navigation_widgets.scope.md)              | Navigation bars, drawers, rails, breadcrumbs, tree views, and carousels.                              |
|                                                                  | [Menu widgets](scopes/Widgets/menu_widgets.scope.md)                          | Menus, dropdown menus, and context menus.                                                             |
|                                                                  | [Date/Time pickers](scopes/Widgets/date_time_pickers.scope.md)                | Calendar-based date and time selection.                                                               |
|                                                                  | [Stepper](scopes/Widgets/stepper.scope.md)                                    | Guides users through a multi-step process.                                                            |
|                                                                  | [Dialog](scopes/Widgets/dialog.scope.md)                                      | Modal or non-modal dialog with title, content, and actions.                                           |
| **[Layout](scopes/Layout/scope.md)**                             |                                                                               | Arrangement notions such as flow, alignment, sizing, and breakpoints.                                 |
| **[Presentation](scopes/Presentation/scope.md)**                 |                                                                               | Visual notions such as color, typography, theme, motion, and visibility.                              |
| **[Internationalization](scopes/Internationalization/scope.md)** |                                                                               | Language, locale, writing-system, formatting, sorting, search, and fonts.                             |
| **[Interaction](scopes/Interaction/scope.md)**                   |                                                                               | State, target, gesture, pointer, keyboard, focus, input, and change notions.                          |

Each linked path is the scope's `attrs.scopeDocument` value in `spec/openui.json`, which maps every `spec/scopes/**` document to its machine-readable node.

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

The generated `spec/openui.json` catalog MUST satisfy these top-level root
rules:

- `"id"` MUST be `"root"`.
- `"version"` is REQUIRED (top-level only) and MUST equal the current value in
  the repository-root `SCHEMA_VERSION` file (currently `0.3.1`).
- `"type"` MUST be `"html"`.

`EBNF.txt` defines the required root fields, literal root id, version syntax,
and type-name syntax; `openui.schema.json` is its executable projection. The
converter and repository contract tests enforce the catalog-specific
`SCHEMA_VERSION` and `html` values.
A concrete UI document uses the same grammar, but its root `type`, like every
other node type, may be any [known object type](scopes/scope.md#known-object-type).

### Naming conventions

Every element `id` is a camelCase alphanumeric string. IDs must be globally
unique within a document; OpenUI tooling enforces that document-wide constraint.

### types - "type" field

The EBNF format recognizes standard HTML tag syntax, kebab-case names, and
PascalCase names. That syntax rule only determines whether a `type` string is
well formed. For a concrete UI document, the value MUST also be a
[known object type](scopes/scope.md#known-object-type): an exact literal `type` present in the
canonical catalog.

Do not use framework selectors, directives, generated component names,
implementation identifiers, id-derived aliases, compatibility aliases, or
example-only pseudo-types as document types. Represent specialized UI with the
closest known semantic category, then express instance distinctions through
`id`, `attrs`, and known-type `children`.

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

### Element references

An element reference is a Uses-attribute value that identifies another element in
the same concrete document by its globally unique `id`. Its static form is a
quoted string literal whose decoded value is that id; for example,
`"[route]": "\"dashboardRoute\""`. A consumer resolves the reference across the
whole document, not just among the referring node's siblings.

`Routing[defaultRoute]` and `NavItem[route]` reference a `Route`;
`Route[redirectTo]` references a `Route`; and `Route[target]` references the
page or content element selected by that route. The referenced contract defines
any additional permitted type. The base grammar, catalog validator, and
`OpenUiJson.validate()` do not currently parse, resolve, or type-check reference
values; they continue to validate only document shape, globally unique ids, and
known type literals.

Framework selectors and generated identifiers remain implementation details;
their possible appearance as attribute data does not make them valid `type`
values.

### EBNF notation

[`EBNF.txt`](./EBNF.txt) is the authoritative definition of the OpenUI document
format. The JSON Schema is an executable projection that must remain aligned
with it. EBNF blocks use `(* ... *)` for comments; comment text is explanatory
and is not part of the grammar. Quoted punctuation terminals are literal: for
example, `"-"` is a hyphen character where a production allows hyphenated names.

The format itself is in [EBNF](./EBNF.txt)

### Syntax rules

- **Version field (top-level only):** Required semantic version string (e.g., "0.3.1") identifying the spec version
- **ID field:** Must be a camelCase alphanumeric string (starts with lowercase letter, can contain uppercase letters and digits)
- **Type field:** Must satisfy the grammar's HTML/kebab-case/PascalCase syntax and, in a concrete UI document, exactly match a literal `type` in `spec/openui.json`
- **Attributes field:** Key-value pairs where values are strings or null. Attribute key syntax identifies input, output, and behavior categories; all such categories must stay inside the `attrs` object.
- **Children field:** Array of UI elements forming a hierarchical tree structure
- **No unknown properties:** Objects contain only the fields defined by the EBNF format.

## Leaf scope source format (`*.scope.md`)

`spec/openui.json` is **generated** from the `spec/scopes/**` prose; the prose is the
source of truth. Every leaf
`*.scope.md` follows the shared
[`scopes/template.scope.md`](scopes/template.scope.md). Three of its sections are
_machine-bearing_ — **Identity**, **Attributes**, **Child model** — and follow
fixed line patterns; **Purpose**, **Accessibility**, and **Validation notes** are
free prose and are not parsed. The converter lives in
`bin/to_json/` and walks the tree.

### Field mapping

A leaf produces a metadata-only **scope node** plus a single **`<scopeId>Instance`**
child (see [`scopes/scope.md`](scopes/scope.md)). Fields come from:

| `spec/openui.json` field    | Source in the leaf                                         |
| --------------------------- | ---------------------------------------------------------- |
| scope `id`                  | Identity `id:` (camelCase)                                 |
| scope `type`                | derived: PascalCase of the scope `id`                      |
| scope `attrs.title`         | the `#` H1 heading                                         |
| scope `attrs.purpose`       | the Purpose section body                                   |
| scope `attrs.scopeDocument` | the leaf's path under `scopes/`                            |
| scope `attrs.status`        | Identity `status:`                                         |
| instance `id`               | derived: `<scopeId>Instance`                               |
| instance `type`             | Identity `type:` (the concrete/virtual primitive)          |
| instance `attrs` keys       | Attributes — each `key` by category, value `null`          |
| instance `children`         | Child model — one node (`id`, `type`) per bullet, in order |

Separators are fixed: `·` (middot, U+00B7) between Identity fields, and `—`
(em dash, U+2014) between Attributes and Child-model fields. The Attributes
**category** word is authoritative; its key bracket must agree (`[name]` → `Uses`;
`(name)` → `Produces` or `Behaves`). Value-types, descriptions, and multiplicity
are recorded in prose only and are not serialized into the grammar.
Machine-bearing sections are the **sole enumerators** of ids, keys, types,
categories, and multiplicity; prose sections may reference those names but must not
re-list them.

### Section EBNF

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
attribute_line      = "-" WS "`" attr_key "`" WS "—" WS
                            category WS "—" WS description NL ;
attr_key            = uses_key | output_key ;
uses_key            = "[" attr_name "]" ;        (* category MUST be "Uses" *)
output_key          = "(" attr_name ")" ;        (* category MUST be "Produces" | "Behaves" *)
category            = "Uses" | "Produces" | "Behaves" ;

child_model_section = "## Child model" NL { prose_line }
                      child_line { child_line | prose_line } ;
child_line          = "-" WS child_id WS "—" WS
                            child_type WS "—" WS
                            multiplicity WS "—" WS description NL ;
multiplicity        = "1" | "0..1" | "0..n" | "1..n" ;

prose_section       = heading NL { prose_line } ;
heading             = "##" WS { character } ;

(* lexical — id/type/attr rules reuse the document grammar above *)
id_value            = camel_case ;
child_id            = camel_case ;
type_value          = type_name ;                (* per the document type grammar *)
child_type          = type_name ;
status_value        = "draft" | "review" | "stable" ;
attr_name           = letter { letter | digit } ;
camel_case          = lowercase_letter { letter | digit } ;
object_title        = { character } ;
description         = { character } ;             (* free prose; not interpreted *)
prose_line          = ? any line that is not an identity / attribute / child line ? ;
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
  "version": "0.3.1",
  "type": "Pages",
  "attrs": {
    "size": "1960x1080",
    "text": "App navigation demo"
  },
  "children": [
    {
      "id": "dateRangeInput",
      "type": "DateTimePicker",
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

## Incremental generation

Generation is usually incremental: given a JSON specification file and an existing
workspace, the generator reconciles the workspace to match the specification
rather than regenerating from scratch every time.

### Scenarios

| JSON | Workspace | Scenario     | Details                                                                                     |
| :--- | :-------- | :----------- | :------------------------------------------------------------------------------------------ |
| Yes  | No        | Add          | Implement the object as a child of the current parent and wire it in                        |
| No   | Yes       | Delete       | Delete the object and the reference from parent                                             |
| Yes  | Yes       | Match        | Do nothing — the node content including children is identical                               |
| Yes  | Yes       | Not matching | Fix those non-matching parts (attribute added/removed/changed, child added/removed/changed) |

### Algorithm

The JSON is traversed parent (node) to child (node) starting at the root.
Having no root is an invalid case.

1. First node is defined to be the root.
2. Compare each JSON node with the manifestation in the workspace:
   - **Add** — the generator generates the object as defined.
   - **Modify** — either make the modification if simple (e.g. a rename), or
     delete and re-add.
   - **Delete** — remove the part and the references to it.
   - **Match** — do nothing.

Generation from scratch is the special case where the workspace is empty.
Deletion is the special case where objects are removed from the JSON file.

## How to read this spec

The specification defines **what** a compliant Web UI implementation must provide, without saying **how** it is implemented. For example:

<!--
### Example: Hierarchical structure of a page

### Example: Data binding

### Example: User interaction model
-->
