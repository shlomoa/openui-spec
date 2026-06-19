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

### Example 2 — layout system acceptance test

Given a normalized specification entry for layout container components such as `Grid`, `SplitContainer`, and `FlowContainer`:

- verify that layout containers declare aggregations for spatial regions that children are placed into;
- verify that arrangement strategy properties (columns, orientation, wrap) are typed public properties, not renderer-internal configuration;
- verify that spacing properties (gap, margin) are declared as typed public properties on containers;
- verify that breakpoint-aware behavior is expressed through public properties (such as `columnsS`, `columnsM`, `columnsL`, `columnsXL`) rather than hidden media query logic;
- verify that drag-and-drop layout behavior is only present when explicitly declared in `dnd` metadata;
- verify that responsive adaptations do not alter the composition tree or the logical reading order of aggregated children.

## JSON Mapping

- `specification.sections[21]` in `/openui.json`
