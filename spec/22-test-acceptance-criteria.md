# 22. Test & Acceptance Criteria

**Purpose:** Describe how the specification should be verified.

**Derived from traversal nodes:** `compliance-tests`, `api-json-projection`, `reference-component-button`

## Specification

- Every public metadata contract should be verifiable by automated tests that exercise properties, events, and rendering-facing semantics.
- Acceptance criteria should cover unit behavior, visual states, accessibility semantics, and responsive or theme-sensitive presentation.
- Machine-readable projections such as `api.json` should remain consistent with runtime metadata and documented behavior.

## Examples

The following examples show how acceptance criteria can exercise specification additions in a concrete, implementation-independent way.

### Example 1 — UI concept model acceptance test

Given a normalized specification entry for a library that publishes `Page`, `Dialog`, and `Form` controls together with `FormContainer` and `FormElement` elements:

- verify that the published symbols are classified as controls or elements in the library catalog;
- verify that `content`, `header`, `footer`, `beginButton`, and similar owned child regions are represented as aggregations with declared multiplicity and child types;
- verify that semantic references such as `ariaLabelledBy`, `ariaDescribedBy`, and form labels are represented as associations instead of owned aggregations;
- verify that higher-level concepts such as dialogs and forms are described as specialized controls and elements composed through metadata, not as renderer-specific primitives.

### Example 2 — application structure acceptance test

Given a normalized application entry that declares its library dependencies and a root `Shell` control hosting `Page` and `SplitContainer` containers:

- verify that every component referenced by the application structure resolves to a public control or element published by a declared library dependency;
- verify that the shell exposes global navigation and owned pages through aggregations such as `navigation`, `header`, and `pages`;
- verify that non-owning references such as `currentPage` are represented as associations instead of owned aggregations;
- verify that the page hierarchy, including nested `subPages` and split-container master and detail pages, is resolvable from public metadata without reading component internals.

### Example 3 — layout system acceptance test

Given a normalized specification entry for a `Page`, `Grid`, `Form`, and `Board` layout contract:

- verify that named regions such as `header`, `content`, and `footer` are represented as aggregations with declared multiplicity and child types;
- verify that ordered `0..n` regions preserve their declared document order as the normative visual order before responsive adaptation;
- verify that responsive breakpoints change region arrangement without adding, removing, or reparenting owned content;
- verify that density and spacing values are drawn from a shared, theme-driven scale instead of ad-hoc per-component measurements;
- verify that drag-and-drop is present only where a container declares `dnd` metadata and stays within the target aggregation's child type and multiplicity.

### Example 4 — component model acceptance test

Given a normalized specification entry for a `Button`, `Panel`, `Input`, and `Card` component contract:

- verify that each component exposes a stable identity through a `component` identifier and owning `library`;
- verify that properties declare a `type` and, where applicable, a `defaultValue` and `bindable` flag;
- verify that aggregations declare a child `type` and a multiplicity through `multiple: true` (`0..n`) or `multiple: false` (`0..1`);
- verify that associations such as `ariaLabelledBy` and `ariaDescribedBy` remain non-owning references instead of aggregations;
- verify that events such as `change` and `liveChange` declare typed `parameters`;
- verify that `renderer`, `designtime`, and `dnd` metadata remain optional capability hints and do not replace the property, aggregation, association, and event contract.

## JSON Mapping

- `specification.sections[21]` in `/openui.json`
