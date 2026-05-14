# 05. UI Concept Model

**Purpose:** Define the abstract building blocks of the framework UI.

**Derived from traversal nodes:** `library-component-catalog`, `library-element-catalog`, `aggregation-model`

## Specification

- A UI is composed from libraries that publish controls and elements.
- Controls are interactive or presentational components; elements are reusable structural or supporting composition units.
- Composition is expressed declaratively through metadata-defined relationships such as child content, labels, descriptions, and actions.

## JSON Mapping

- `specification.sections[4]` in `/openui.json`
