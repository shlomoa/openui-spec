# OpenUI Specification

**Purpose:** Define the scope of the OpenUI specification as an implementation-independent contract for Web UI frameworks.

OpenUI is a technology-independent specification for a Web UI framework. It defines the required behavior, structure, terminology, and compliance rules for a compliant Web UI implementation, independent of any specific rendering technology, build tool, or framework. The prose scopes under `spec/scopes/` are the source of truth; the machine-readable `spec/openui.json` is generated from them. This README is the prose entry point for the specification.

It serves application developers, designers and UX owners, framework maintainers, and generator/tooling authors, who all consume the same public contract.

## Glossary

This glossary is the repository source of truth for OpenUI vocabulary. Other
documents may classify, specialize, or illustrate these terms, but should link
here instead of redefining them. A term may have several aliases in product,
framework, accessibility, or platform language; the canonical term below is the
preferred OpenUI wording.

### Glossary usage rules

- Use **Canonical term** names in normative spec prose when possible.
- Use **Aliases** to recognize equivalent names from frameworks, platforms,
  design systems, accessibility APIs, and user-facing product language.
- When a document needs a narrower meaning, state the specialization and link to
  the canonical term instead of creating a parallel definition.
- Scope files under [`scopes/`](scopes/scope.md) define object contracts. This
  glossary defines shared vocabulary used by those contracts.

### Core specification terms

#### Application

**Aliases:** app, web app, UI application, product shell.

An application is the top-level user-facing software experience described by an
OpenUI document. It includes bootstrap artifacts, navigation, routing, shell
surfaces, pages, views, widgets, controls, and behaviors needed to present and
operate the UI. In OpenUI, Application-scope objects describe application-level
contracts such as routing and host-document concerns, not a specific deployment
technology or framework project structure.

#### Attribute

**Aliases:** property, input, output, event, binding, parameter, option.

An attribute is non-hierarchical configuration or behavior metadata stored under
an element's `attrs` object. OpenUI distinguishes Uses attributes (`[name]`),
Produces attributes (`(name)`), and Behaves attributes (`(name)` with action or
side-effect meaning). The base format records attribute keys and string-or-null
values; target generators may interpret values as framework expressions, static
literals, events, callbacks, or bindings.

#### Behavior

**Aliases:** interaction behavior, capability, action model, affordance.

A behavior is a reusable interaction capability that can be applied to pages,
views, containers, widgets, or controls. Behaviors describe what a user or system
can cause the UI to do, such as dragging, resizing, collapsing, sorting,
filtering, paginating, opening, dismissing, or submitting. A behavior is not
necessarily a visible element; it may be represented by attributes, event
bindings, keyboard handling, pointer handling, or generated target-framework
logic.

#### Catalog

**Aliases:** object catalog, vocabulary catalog, specification catalog,
`spec/openui.json`.

The catalog is the machine-readable vocabulary of objects defined by the prose
specification. In this repository, `spec/openui.json` is the generated catalog.
It conforms to [`openui.schema.json`](openui.schema.json) but serves a different
role: the schema validates document shape, while the catalog enumerates
available OpenUI objects and links them to their `spec/scopes/**` source
documents.

#### Concrete UI document

**Aliases:** app document, generator input, `input.json`, concrete app spec,
OpenUI input document.

A concrete UI document describes one UI to build or validate. It uses the same
JSON grammar as the catalog, but its role is different: it represents an app,
page, view, or widget tree using vocabulary from the catalog. Concrete UI
documents do not need catalog traceability fields such as `attrs.scopeDocument`
on their app nodes; those fields belong to catalog scope nodes.

#### Container

**Aliases:** layout container, region, panel, structural wrapper, holder.

A container is an object whose primary purpose is to group, arrange, bound,
clip, scroll, or visually organize child content. Containers may have visible
surfaces, such as panels or cards, or may be visible only through layout effects,
such as a grid or stack. In OpenUI, Containers-scope objects describe
arrangement patterns; they do not prescribe CSS, DOM, or component-library
implementation details.

#### Control

**Aliases:** primitive control, native control, form control, interactive
primitive, rendering primitive.

A control is a reusable interaction or rendering primitive supplied by a
browser, framework, runtime, platform, or target UI toolkit. Controls are the
low-level vocabulary that pages, views, containers, and widgets can use. A
control may be interactive, such as an input or button, or structural/rendering
oriented, such as native table tags. A control is classified by primitive
semantics, not by whether it is visually simple.

#### Element

**Aliases:** UI element, node, object instance, component instance, widget
instance.

An element is one node in an OpenUI document tree. Every element has an `id` and
`type`, may have `attrs`, and may have `children`. Element is the generic word
for any concrete occurrence in a document, whether its type is a native HTML tag,
a framework tag, a PascalCase OpenUI object, or a custom implementation type.

#### Grammar

**Aliases:** schema, document grammar, JSON shape, meta-schema,
`openui.schema.json`.

The grammar defines the valid shape of an OpenUI JSON document: root fields,
element fields, id syntax, type syntax, `attrs` value shape, and `children`
nesting. The grammar is intentionally content-blind. It can decide whether a
document is well-formed; it cannot decide whether a `type` names a real OpenUI
object or whether that object is used in the right semantic context.

#### Node

**Aliases:** element node, tree node, JSON element, document node.

A node is the tree-structure view of an element. Use node when discussing
parent/child traversal, validation paths, manifests, reconciliation, or generated
document structure. Use element when discussing UI semantics or user-facing
meaning. The same JSON object can be both an element and a node, depending on
the discussion.

#### Notion

**Aliases:** concept, abstract concept, definition, vocabulary concept.

A notion is an abstract idea that the specification needs to name but that may
not be a concrete UI element. Examples include localization, focus state,
target spacing, responsive reflow, or a behavior such as drag and drop. A notion
may influence generated UI, validation, accessibility, or documentation without
necessarily appearing as a concrete emitted component.

#### Object

**Aliases:** OpenUI object, spec object, vocabulary object, component contract,
scope object.

An object is a named contract in the OpenUI vocabulary. Objects are authored in
`spec/scopes/**` prose and generated into the catalog. An object defines an
implementation-independent purpose, optional attributes, optional child model,
accessibility expectations, and validation notes. In a concrete UI document, an
element whose `type` resolves to that object is an instance of the object.

#### Page

**Aliases:** screen, route target, view state, page shell.

A page is a top-level navigable or addressable UI surface. It may contain views,
containers, widgets, controls, and behaviors, and may participate in routing and
navigation. A page is broader than a DOM page or framework route component: it is
the implementation-independent contract for a user-perceived screen or shell.

#### Scope

**Aliases:** specification scope, category, domain, namespace, scope folder.

A scope groups related OpenUI objects under a specification domain such as
Application, Controls, Behaviors, Pages, Views, Containers, or Widgets. Scope
folders organize source prose, determine catalog hierarchy, and provide
`attrs.scopeDocument` traceability. A scope is not necessarily a concrete object
that appears in an app; it may be a grouping node for the vocabulary catalog.

#### View

**Aliases:** business-object view, workflow view, data view, representation.

A view is a user-facing representation of business objects or workflows. Views
usually coordinate data presentation, editing, validation, filtering, grouping,
or submission. A view can appear inside a page or container and can use widgets
and controls, but its primary purpose is to represent and operate on domain data
or workflow state.

#### Widget

**Aliases:** component, reusable component, UI component, composite control.

A widget is a reusable UI object that can appear across pages or views and
usually combines controls, structure, behavior, state, and accessibility
semantics into a higher-level contract. A widget may render as one target
framework component or as many primitives. In OpenUI, widget means reusable
specification object, not a particular framework class or package artifact.

### UI vocabulary terms

#### Button

**Aliases:** command button, action button, push button, submit button, reset
button, icon button, toggle button, menu button, floating action button, FAB,
call-to-action, CTA.

A button is an interactive control whose primary purpose is to let the user
request an action. The action may be immediate, such as deleting an item or
copying text; contextual, such as opening a dialog or menu; form-related, such
as submitting or resetting data; stateful, such as toggling mute; or
workflow-oriented, such as moving to the next step. A button is activated by
input modalities such as pointer click, touch tap, keyboard activation, voice
command, switch device, or assistive technology command.

A button is different from a link: a link navigates to a resource or location,
while a button performs an operation in the current context. A button may look
like a link, and a link may look like a button, but the semantic role should
match the function. A button must expose an accessible name that describes the
operation; icon-only buttons therefore need text, an accessibility label, or an
equivalent name source. Keyboard users expect buttons to activate with Enter and
Space. If the action is unavailable, the disabled state must be communicated and
the action must not be invoked.

Button variants refine the same base concept. An icon button is a button whose
visible label is primarily an icon. A toggle button represents a persistent
pressed/unpressed state and should expose that state without changing the
meaning of its label. A menu button opens a menu of choices. A submit button
commits form data. A destructive button performs a risky action and often needs
confirmation or careful emphasis. A floating action button is a prominent
contextual action surfaced as a design-system variant, not a separate semantic
primitive.

#### Data grid

**Aliases:** interactive table, grid widget, editable grid, spreadsheet,
sortable grid, tabular widget.

A data grid presents information in rows and columns and adds interactive grid
behavior such as cell focus, row or cell selection, editing, sorting, filtering,
column hiding, virtual scrolling, or spreadsheet-like keyboard navigation. A
data grid is a composite widget: it manages focus inside the grid and normally
keeps only one grid entry point in the page tab sequence. Use data grid when the
tabular structure itself is interactive. Use table when the tabular structure is
primarily static data presentation, even if some cells contain independent
widgets.

#### Dialog

**Aliases:** modal dialog, non-modal dialog, dialog window, confirmation dialog,
alert dialog, prompt.

A dialog is an overlaid UI surface that asks the user to read information,
provide input, confirm a decision, or complete a focused task. A modal dialog
makes content outside the active dialog inert until the dialog closes; a
non-modal dialog permits continued interaction outside it. Dialogs require a
label, predictable focus placement when opened, contained keyboard traversal for
modal operation, and a clear way to close or cancel when appropriate.

#### Grid

**Aliases:** layout grid, CSS grid, ARIA grid, focus grid, row-column layout.

Grid is an overloaded term. In layout terminology, a grid is a structural
arrangement of rows and columns used to align and size child content. In ARIA
terminology, a grid is an interactive composite widget that provides directional
keyboard navigation among cells and may represent either tabular data or a
layout grouping of widgets. OpenUI documents must qualify the intended meaning
when the distinction matters: layout grid for arrangement, data grid for
interactive tabular data, and table for static tabular data.

#### Link

**Aliases:** hyperlink, anchor, navigation link, text link, deep link.

A link is an interactive reference that navigates to another resource,
location, route, document fragment, or application state. Its expected operation
is navigation rather than command execution. Links should identify their target
or purpose, support keyboard activation, and use native link semantics when the
target platform provides them.

#### Table

**Aliases:** data table, HTML table, tabular data, matrix, row-column data
structure.

A table presents data with meaningful relationships across rows and columns.
The table structure communicates associations among row headers, column headers,
and data cells, not merely visual alignment. Accessible tables require structural
markup or equivalent semantics that identify header cells and data cells and
programmatically associate them. Captions, header scope, row and column groups,
and explicit header references help users and assistive technologies understand
the table's purpose and cell relationships. Tables must not be used as a generic
layout mechanism; use layout containers for visual arrangement without tabular
data semantics.

In OpenUI, the Controls/Table family names the primitive HTML table vocabulary
(`table`, `tr`, `th`, `td`). The Widgets/Tables object names a higher-level
tabular data widget that builds on table semantics and may add sorting,
filtering, or pagination.

### External references used for vocabulary alignment

- [MDN `<button>` HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
- [MDN `<table>` HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)
- [MDN HTML table accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Table_accessibility)
- [WAI-ARIA Authoring Practices: Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [WAI-ARIA Authoring Practices: Table Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/)
- [WAI-ARIA Authoring Practices: Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- [WAI-ARIA Authoring Practices: Link Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/link/)
- [WAI-ARIA Authoring Practices: Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [W3C WAI Tables Tutorial](https://www.w3.org/WAI/tutorials/tables/)

## Specification artifacts: grammar vs. catalog

This section is the repository source of truth for the roles of `input.json`,
`spec/openui.schema.json`, and `spec/openui.json`. Other documents
should reference this section instead of redefining those roles. The files are
easy to confuse — they are all JSON or JSON-related OpenUI artifacts — but they
sit at **different levels of abstraction**.

### TL;DR

- `spec/openui.schema.json` is the **grammar**: a JSON Schema that validates the
  _shape_ of any OpenUI document.
- `spec/openui.json` is a **document written in that grammar** whose _content_ is the
  specification's object **catalog**.
- `input.json` is a **concrete UI/app document** that conforms to the grammar and
  uses object vocabulary from the catalog.

`spec/openui.json` is to `openui.schema.json` as an XML file is to its XSD, or a
`package.json` to its JSON Schema.

### `spec/openui.schema.json` — the grammar (meta-level)

A standard [JSON Schema](https://json-schema.org/) (draft 2020-12). It defines
the shape every OpenUI document must have, and nothing about content:

- the root object requires `version` + `id` + `type`; `id` must be the literal
  `"root"`;
- a recursive `element`: each node requires `id` + `type`, optionally `attrs` +
  `children`;
- `id` rules (camelCase `^[a-z][A-Za-z0-9]*$`), `type` rules (html enum |
  kebab-case | PascalCase), `attrs` as a `string | null` map, with
  `additionalProperties: false` everywhere.

It is **generic and content-blind**. It has no idea what `Charts`, `Dashboard`,
or `Application` are — it only knows that `"Charts"` is a syntactically legal
PascalCase `type`.

**Purpose:** validate that any OpenUI JSON is well-formed.

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
defines_, and the trace links to their prose.

> `spec/openui.json` is **generated** from the `spec/scopes/**` prose, which is the
> source of truth. It is canonical as the machine-readable form, but it is a
> derived artifact, not hand-authored.

### The relationship

```text
openui.schema.json   ← grammar / meta-schema (validates shape)
        ▲ validates
openui.json          ← the spec's catalog of available objects (vocabulary)
```

|              | `openui.schema.json`                       | `spec/openui.json`              |
| ------------ | ------------------------------------------ | ------------------------------- |
| Kind         | JSON **Schema** (grammar)                  | JSON **document** (instance)    |
| Level        | meta / type-level                          | content / catalog-level         |
| Knows about  | shapes, id/type/attrs rules                | `Charts`, `Dashboard`, `Forms`… |
| Changes when | the _format_ changes                       | the _spec's objects_ change     |
| Validates    | every OpenUI doc, incl. `spec/openui.json` | nothing (it is data)            |

### Where `input.json` fits

A generator `input.json` is a concrete UI/app document, e.g. a dashboard with
three charts. It conforms to the **same grammar** as `spec/openui.json` and uses
object vocabulary from the `spec/openui.json` catalog. The two documents are
distinguished by _role_, not by _shape_:

```text
openui.schema.json   ← grammar
        ▲ validates both
   ┌────┴─────┐
openui.json   input.json
(catalog of    (one concrete app
 what exists)   built from the catalog)
```

- `spec/openui.json` = "here is the **vocabulary** of objects you may use" (the
  catalog).
- `input.json` = "here is the **app** I want, using that vocabulary."
- `openui.schema.json` = "here is the **syntax** both must obey."

The grammar alone cannot tell whether `input.json` uses a _real_ object in a
_legal place_ — that check is against the **catalog**, not the schema.

Generators use the three files together:

- validate `input.json` against the grammar defined by
  `spec/openui.schema.json`,
- validate and interpret `input.json` content against the object catalog defined
  by `spec/openui.json`, and
- generate target-framework output from the validated `input.json`.

## Spec folder structure

The `scopes` folder is structured hierarchically. Each top-level scope is a folder; each object is either a child scope folder or a snake_case `*.scope.md` leaf file.
The [taxonomy mapping](scopes/taxonomy_mapping.md) maps the abstract entries in
`docs/generic-ui-taxonomy.md` to the concrete scope object or alias that owns
each term.

| Scope                                                            | Object                                                                        | Description                                                                    |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **[Application](scopes/Application/scope.md)**                   |                                                                               | Application-level bootstrap artifacts and implementation-independent concepts. |
|                                                                  | [Routing](scopes/Application/routing.scope.md)                                | Application-level route definitions and route resolution.                      |
|                                                                  | [Navigation](scopes/Application/navigation.scope.md)                          | User-facing navigation exposing routes, pages, and views.                      |
|                                                                  | [Tool bars](scopes/Application/tool_bars.scope.md)                            | Application-level command surfaces and action placement.                       |
|                                                                  | [favicon.ico](scopes/Application/favicon.scope.md)                            | Application icon asset for browser and shell identity.                         |
|                                                                  | [index.html](scopes/Application/index_html.scope.md)                          | Application host document and static bootstrap metadata.                       |
| **[Controls](scopes/Controls/scope.md)**                         |                                                                               | Browser, framework, or runtime-provided native controls.                       |
|                                                                  | [Native](scopes/Controls/native.scope.md)                                     | Native controls and presentation (scroll bars, fonts, color schemes).          |
|                                                                  | [Action controls](scopes/Controls/action_controls.scope.md)                   | Command controls such as buttons and icon buttons.                             |
|                                                                  | [Text inputs](scopes/Controls/text_inputs.scope.md)                           | Text-entry controls such as text fields, text areas, and search fields.        |
|                                                                  | [Choice controls](scopes/Controls/choice_controls.scope.md)                   | Selection controls such as checkboxes, radio buttons, and combo boxes.         |
|                                                                  | [Picker controls](scopes/Controls/picker_controls.scope.md)                   | Specialized picker controls such as wheel, color, and file pickers.            |
|                                                                  | [Range controls](scopes/Controls/range_controls.scope.md)                     | Scalar value controls such as sliders, spin boxes, and rating controls.        |
|                                                                  | [Drawing and capture](scopes/Controls/drawing_and_capture.scope.md)           | Canvas, drawing, microphone, and biometric capture controls.                   |
|                                                                  | [Display primitives](scopes/Controls/display_primitives.scope.md)             | Render-only primitives such as labels, text, images, icons, and separators.    |
|                                                                  | [Status indicators](scopes/Controls/status_indicators.scope.md)               | Passive state feedback such as status bars, badges, progress, and loaders.     |
|                                                                  | [Link and scroll controls](scopes/Controls/link_and_scroll_controls.scope.md) | Primitive links and scrollbars.                                                |
|                                                                  | [Table](scopes/Controls/Table/scope.md)                                       | HTML5 tabular data tags (`table`, `tr`, `th`, `td`).                           |
| **[Behaviors](scopes/Behaviors/scope.md)**                       |                                                                               | Reusable behaviors applied to pages, views, containers, and widgets.           |
|                                                                  | [Drag and drop](scopes/Behaviors/drag_and_drop.scope.md)                      | Move elements within a page, view, container, or widget.                       |
|                                                                  | [Resizable](scopes/Behaviors/resizable.scope.md)                              | Resize elements within a page or view.                                         |
|                                                                  | [Collapsible](scopes/Behaviors/collapsible.scope.md)                          | Collapse and expand elements within a page or view.                            |
| **[Pages](scopes/Pages/scope.md)**                               |                                                                               | Predefined page-level layouts and page shells.                                 |
|                                                                  | [Dashboard](scopes/Pages/dashboard.scope.md)                                  | Overview metrics and summary content layout.                                   |
|                                                                  | [Shell page](scopes/Pages/shell_page.scope.md)                                | A page with no content but with routing and navigation.                        |
|                                                                  | [Empty page](scopes/Pages/empty_page.scope.md)                                | A page with no content and no routing or navigation.                           |
| **[Views](scopes/Views/scope.md)**                               |                                                                               | User-facing views of business objects.                                         |
|                                                                  | [Reports](scopes/Views/reports.scope.md)                                      | Read-only data with filtering, sorting, grouping, and pagination.              |
|                                                                  | [Forms](scopes/Views/forms.scope.md)                                          | Read-write data with validation, submission, and dirty state.                  |
| **[Containers](scopes/Containers/scope.md)**                     |                                                                               | Layout containers that arrange child content.                                  |
|                                                                  | [Grid](scopes/Containers/grid.scope.md)                                       | Arranges children in rows and columns.                                         |
|                                                                  | [Expandable panels](scopes/Containers/expandable_panels.scope.md)             | Panels that expand or collapse to show or hide content.                        |
|                                                                  | [Tabs](scopes/Containers/tabs.scope.md)                                       | Tabbed interface switching between views or content.                           |
|                                                                  | [Surface containers](scopes/Containers/surface_containers.scope.md)           | Windows, screens, views, panels, cards, and toolbar surfaces.                  |
|                                                                  | [Sheet containers](scopes/Containers/sheet_containers.scope.md)               | Sidebars, sheets, side sheets, and bottom sheets.                              |
|                                                                  | [Overlay containers](scopes/Containers/overlay_containers.scope.md)           | Popovers and modal overlays.                                                   |
|                                                                  | [Structural containers](scopes/Containers/structural_containers.scope.md)     | Panes, rails, stacks, scaffolds, and regions.                                  |
|                                                                  | [Splitters](scopes/Containers/splitters.scope.md)                             | Movable dividers between panes or regions.                                     |
| **[Widgets](scopes/Widgets/scope.md)**                           |                                                                               | Reusable components usable across pages or views.                              |
|                                                                  | [Charts](scopes/Widgets/charts.scope.md)                                      | Visual data representations (bar, line, pie).                                  |
|                                                                  | [Tables](scopes/Widgets/tables.scope.md)                                      | Tabular data with sorting, filtering, and pagination.                          |
|                                                                  | [Data grid](scopes/Widgets/data_grid.scope.md)                                | Interactive tabular data with grid navigation, selection, or editing.          |
|                                                                  | [Lists](scopes/Widgets/lists.scope.md)                                        | Lists of items with sorting, filtering, and pagination.                        |
|                                                                  | [Feedback widgets](scopes/Widgets/feedback_widgets.scope.md)                  | Tooltips, alerts, toasts, notifications, and audio-description surfaces.       |
|                                                                  | [Media widgets](scopes/Widgets/media_widgets.scope.md)                        | Media players, camera previews, and map surfaces.                              |
|                                                                  | [Navigation widgets](scopes/Widgets/navigation_widgets.scope.md)              | Navigation bars, drawers, rails, breadcrumbs, tree views, and carousels.       |
|                                                                  | [Menu widgets](scopes/Widgets/menu_widgets.scope.md)                          | Menus, dropdown menus, and context menus.                                      |
|                                                                  | [Date/Time pickers](scopes/Widgets/date_time_pickers.scope.md)                | Calendar-based date and time selection.                                        |
|                                                                  | [Stepper](scopes/Widgets/stepper.scope.md)                                    | Guides users through a multi-step process.                                     |
|                                                                  | [Dialog](scopes/Widgets/dialog.scope.md)                                      | Modal or non-modal dialog with title, content, and actions.                    |
| **[Layout](scopes/Layout/scope.md)**                             |                                                                               | Arrangement notions such as flow, alignment, sizing, and breakpoints.          |
| **[Presentation](scopes/Presentation/scope.md)**                 |                                                                               | Visual notions such as color, typography, theme, motion, and visibility.       |
| **[Internationalization](scopes/Internationalization/scope.md)** |                                                                               | Language, locale, writing-system, formatting, sorting, search, and fonts.      |
| **[Interaction](scopes/Interaction/scope.md)**                   |                                                                               | State, target, gesture, pointer, keyboard, focus, input, and change notions.   |

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

`spec/openui.json` MUST satisfy these top-level root rules:

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

The EBNF blocks use `(* ... *)` for comments; comment text is explanatory and
is not part of the grammar. Quoted punctuation terminals are literal: for
example, `"-"` is a hyphen character where a production allows hyphenated
names.

The format itself is in [EBNF](./EBNF.txt)

### Syntax rules

- **Version field (top-level only):** Required semantic version string (e.g., "0.0.1") identifying the spec version
- **ID field:** Must be a camelCase alphanumeric string (starts with lowercase letter, can contain uppercase letters and digits)
- **Type field:** Can be HTML tag names, kebab-case names (e.g., `mat-date-range-input`), or PascalCase names (e.g., `MainPage`)
- **Attributes field:** Key-value pairs where values are strings or null. Attribute key syntax identifies input, output, and behavior categories; all such categories must stay inside the `attrs` object.
- **Children field:** Array of UI elements forming a hierarchical tree structure
- **No loose properties:** All properties must be contained within the `attrs` object

## Leaf scope source format (`*.scope.md`)

`spec/openui.json` is **generated** from the `spec/scopes/**` prose; the prose is the
source of truth. Every leaf
`*.scope.md` follows the shared
[`scopes/template.scope.md`](scopes/template.scope.md). Three of its sections are
_machine-bearing_ — **Identity**, **Attributes**, **Child model** — and follow
fixed line patterns; **Purpose**, **Accessibility**, and **Validation notes** are
free prose and are not parsed. The converter lives in
`to_json/` and walks the tree.

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
