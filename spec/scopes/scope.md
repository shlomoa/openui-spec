# Scopes

The `scopes` folder is the hierarchical source for OpenUI scope objects. Each top-level folder is a scope, and each child object is either another scope folder or a snake_case `*.scope.md` leaf file.
Shared vocabulary, aliases, and canonical meanings for terms such as object,
element, control, widget, view, container, behavior, table, grid, and button are
defined in the [glossary](#glossary). Scope files specialize
those terms for concrete object contracts rather than redefining them.
The [taxonomy mapping](taxonomy_mapping.md) maps entries from
the [generic UI taxonomy](../generic-ui-taxonomy.md) to these scope objects and records whether each
entry is an existing object, alias, grouped leaf, or folder-level abstraction.
The [terminology](terminology.md) records the approved term changes, with their
evidence and the canonical-term rule. The taxonomy and the scope tree are linked views of one vocabulary. The taxonomy
groups terms by purpose; the scope tree organizes contracts. A new taxonomy section
or subcategory does not create a scope folder, type or contract.

## Top-level scopes

- [Application](Application/scope.md): application-level bootstrap artifacts and implementation-independent concepts such as routing, navigation, tool bars, `favicon.ico`, and `index.html`.
- [Controls](Controls/scope.md): reusable interaction and rendering primitives used in applications, pages, views, containers, and widgets.
- [Behaviors](Behaviors/scope.md): reusable behaviors that can be applied to any element, which the behavior references and does not own.
- [Pages](Pages/scope.md): predefined page-level layouts and page shells.
- [Views](Views/scope.md): user-facing views of business objects and workflows.
- [Containers](Containers/scope.md): layout containers that arrange child content.
- [Widgets](Widgets/scope.md): reusable components such as charts, tables, lists, date/time pickers, steppers, and dialogs.
- [Layout](Layout/scope.md): mechanism-level arrangement notions such as flow, alignment, sizing, and breakpoints.
- [Presentation](Presentation/scope.md): visual styling notions such as color, typography, visual states, theme, motion, and visibility.
- [Internationalization](Internationalization/scope.md): language, locale, writing-system, formatting, sorting, search, font, and localized validation notions.
- [Interaction](Interaction/scope.md): state, target, gesture, pointer, keyboard, focus, input, and change event notions.

## Folder and file convention

A scope with child objects is represented as a folder containing:

- `scope.md` for the parent scope description.
- child scope folders or snake_case `*.scope.md` leaf files.

A leaf object with no child objects is represented as:

- `<object_name>.scope.md`, where `<object_name>` is the snake_case object name.

Top-level scope folder names use Pascal Case. Leaf filenames use snake_case.

A broad grouped leaf may become a family folder with its own child contracts only with
an explicit map from old to new paths, ids and types. A folder and a leaf with the same
name must not produce the same id.

## Object serialization rules

Scope objects follow the JSON shape defined in `../README.md`:

- `id` is a camelCase alphanumeric identifier.
- `type` satisfies the grammar's kebab-case or PascalCase syntax. Each literal
  emitted from the scope sources becomes part of the catalog's exact
  [known-type set](#known-object-type).
- `attrs` contains all non-hierarchical configuration.
- `children` contains nested UI elements.
- No loose object properties are allowed outside `attrs` except the structural fields defined by the spec.

### Scope node and instance representation (generated `spec/openui.json`)

`spec/openui.json` is generated from the prose scopes; it is not hand-authored. A leaf's contract is authored in its `*.scope.md` Attributes and Child model sections. When generated, each scope node is metadata-only (its `attrs` carry `title`, `purpose`, `scopeDocument`, and `status`) and the scope's object contract is represented by a single child instance node:

- `id` is `<scopeId>Instance` (camelCase).
- `type` is the exact semantic-category literal the scope materializes (for
  example `dialog`, `input`, `table`, or a PascalCase category). The generated
  literal is a known catalog type; framework selectors and aliases are not
  substituted for it.
- `attrs` carry the contract attributes by category — Uses `[name]`, Produces `(name)`, Behaves `(name)` — using the Attribute categories below.
- `children` carry the instance's typed child model.
- The instance node has no `scopeDocument`; scope-document traceability stays on the scope node.

## Attribute categories

Scope object attributes are represented through `attrs` key syntax:

- **Uses:** input attributes. These provide data, configuration, state, or references consumed by the object.
- **Produces:** output attributes. These expose events, emitted values, notifications, or callbacks produced by the object.
- **Behaves:** behavior attributes. These describe actions or side effects, such as setting another attribute value, running a callback, or invoking target-framework logic.

For Angular Material examples, `[name]` represents a Uses/input binding and `(name)` represents a Produces/output or Behaves/action binding. The base OpenUI scope model records those keys as strings and does not execute their values.

## Leaf scope template

Every leaf `*.scope.md` (a scope with no child objects) uses the single shared
[`template.scope.md`](template.scope.md), which is the source of truth for leaf
structure: leaf files fill its sections and do not redefine them. The template's
three machine-bearing sections (Identity, Attributes, Child model) parse
deterministically into a scope node plus its `<scopeId>Instance`; the section
grammar and field mapping are documented in [`../README.md`](../README.md).

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
- Scope files under [`scopes/`](#scopes) define object contracts. This
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
It conforms to [`openui.schema.json`](../openui.schema.json) but serves a different
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
on their app nodes; those fields belong to catalog scope nodes. Every node in a
concrete UI document MUST use a [known object type](#known-object-type).

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

Framework meanings differ: OpenUI5 `sap.ui.core.Control` is the generic base
class of every UI class, not a primitive.

#### Controlled element

**Aliases:** controlled target, `aria-controls` target.

A controlled element is the element another element acts on. It is named by an
id reference and is not owned by the element that acts on it, such as the table
a Filter bar filters. See [Controlling element](#controlling-element) and
[Owner](#owner).

#### Controlling element

**Aliases:** controller.

A controlling element only makes sense acting on a
[controlled element](#controlled-element) it references. Its Purpose states how
it acts, for example filters, configures or supplies a value to. Examples:
Filter bar, Personalization panel, Value help.

#### Element

**Aliases:** UI element, node, object instance, component instance.

An element is one node in an OpenUI document tree. Every element has an `id` and
`type`, may have `attrs`, and may have `children`. Element is the generic word
for any concrete occurrence in a document. Its `type` is a semantic category
from the catalog; its `id`, `attrs`, and `children` describe that particular
instance.

Framework meanings differ: an HTML element is one markup tag, and OpenUI5
`sap.ui.core.Element` is a base class. An OpenUI element may be implemented by
many HTML elements.

#### Grammar

**Aliases:** schema, document grammar, JSON shape, meta-schema,
`openui.schema.json`.

The grammar defines the valid shape of an OpenUI JSON document: root fields,
element fields, id syntax, type syntax, `attrs` value shape, and `children`
nesting. The grammar is intentionally content-blind. It can decide whether a
document is well-formed; it cannot decide whether a `type` names a real OpenUI
object or whether that object is used in the right semantic context.

#### Known object type

**Aliases:** known type, catalog type, object type, supported type.

A known object type is an exact, case-sensitive string that occurs as the
literal `type` value of at least one node in the current canonical
`spec/openui.json` catalog. Every node in a concrete UI document MUST use a
known object type. Grammar-valid names that do not occur literally in the
catalog are unknown and MUST be rejected.

Membership is literal: framework selectors, implementation identifiers,
example-only pseudo-types, compatibility aliases, and names derived from a
catalog node's `id` are not object types unless that exact string independently
occurs as a catalog `type`. A type names a reusable semantic category, not a
particular instance or generated artifact. Instance identity belongs in `id`;
instance configuration belongs in `attrs`; hierarchy belongs in `children`;
generated framework selectors and class names are implementation details.

Known type membership does not impose per-type attribute or child restrictions.
Any number of elements may use the same known type while differing in globally
unique `id`, string-or-null `attrs`, and compositions of known-type `children`,
subject only to the common OpenUI grammar. Specialized or complex UI is modeled
by selecting the closest known semantic categories and preserving distinctions
through instance ids, attributes, and composition rather than inventing types.

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
scope object, component, UI component.

An object is a named contract in the OpenUI vocabulary. Objects are authored in
`spec/scopes/**` prose and generated into the catalog. An object defines an
implementation-independent purpose, optional attributes, optional child model,
accessibility expectations, and validation notes. In a concrete UI document, an
element whose `type` exactly matches a known object type is an instance of that
semantic category. Catalog descriptions do not restrict concrete instances to
per-type attribute or child allowlists.

#### Owner

**Aliases:** owning element, form owner.

An owner is the element that owns content and its lifecycle, such as a Dialog
that owns its title, content and actions and decides when it opens and closes.
Owned content is a child of its owner; content that is only acted on is a
[controlled element](#controlled-element) instead.

#### Page

**Aliases:** screen, route target, view state, page shell.

A page is a top-level navigable or addressable UI surface. It may contain views,
containers, widgets, controls, and behaviors, and may participate in routing and
navigation. A page is broader than a DOM page or framework route component: it is
the implementation-independent contract for a user-perceived screen or shell.

Framework meanings differ: OpenUI5 `sap.m.Page` is a container with a header, a
content area and a footer, which can appear inside a page.

#### Scope

**Aliases:** specification scope, category, domain, namespace, scope folder.

A scope groups related OpenUI objects under a specification domain such as
Application, Controls, Behaviors, Pages, Views, Containers, or Widgets. Scope
folders organize source prose, determine catalog hierarchy, and provide
`attrs.scopeDocument` traceability. A scope is not necessarily a concrete object
that appears in an app; it may be a grouping node for the vocabulary catalog.

#### Trigger

**Aliases:** activator, input trigger.

A trigger is an input or condition (gesture, key, pointer, hover, timer) that
starts a behavior. Behaviors are classified by their outcome, not by their
trigger.

#### View

**Aliases:** business-object view, workflow view, data view, representation.

A view is a user-facing representation of business objects or workflows. Views
usually coordinate data presentation, editing, validation, filtering, grouping,
or submission. A view can appear inside a page or container and can use widgets
and controls, but its primary purpose is to represent and operate on domain data
or workflow state.

#### Widget

**Aliases:** reusable component, composite control.

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
meaning of its label. A menu button opens a menu of commands; it is mapped to
[Menu widgets](Widgets/menu_widgets.scope.md). A submit button
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

In OpenUI, the Widgets/Table object (`table`) names a unified tabular data widget
that encapsulates column definitions, row models, cells, sorting, filtering, and pagination.
For interactive spreadsheet-like grids with cell selection and editing, see Data grid.

#### Window

**Aliases:** application window, framed window.

A window is a framed UI surface with its own title and window controls, for
example move, resize, minimize and close. In a web UI it is drawn by the
application; it is not the browser `Window` object.

### Abstraction levels

Abstraction levels:

- **Existing object** — the taxonomy entry already has a concrete scope object.
- **Alias** — the taxonomy entry is a synonym, variant, or narrower term for a linked
  scope object.
- **Grouped leaf** — the taxonomy entry belongs to a new family-level leaf scope.
- **Folder abstraction** — the taxonomy entry is a cross-cutting notion represented by
  a folder-level scope instead of a concrete UI object leaf.

### Source kinds

Source kinds: requirement · `spec/README.md` rule · explicit decision · HTML
standard primitive · external framework example. HTML primitives and
`spec/README.md` rules are technology-neutral and recorded as the actual
contract; framework examples (e.g., Angular Material) are reference patterns
only.

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
