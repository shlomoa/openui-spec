# 20. Extension Model

**Purpose:** Describe supported extension points.

**Derived from traversal nodes:** `library-interface-catalog`, `design-time-evidence`, `library-component-catalog`

## Specification

- The framework must allow new controls, elements, types, and interfaces to be introduced through the same catalog and metadata model.
- Design-time metadata may extend authoring semantics without redefining the runtime component contract.
- Extension points must preserve compatibility with theming, accessibility, and interaction rules.

## JSON Mapping

- `specification.sections[19]` in `/openui.json`
