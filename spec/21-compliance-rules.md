# 21. Compliance Rules

**Purpose:** Summarize what every implementation must satisfy.

**Derived from traversal nodes:** `openui-root`, `library-catalog-root`, `metadata-grammar-root`, `compliance-tests`

## Specification

- A compliant implementation must publish its public surface through a discoverable library catalog.
- A compliant implementation must describe every public component with typed metadata for properties, composition, relationships, and events.
- A compliant implementation must preserve accessibility, theming, internationalization, and testing evidence as part of the public contract lifecycle.

## JSON Mapping

- `specification.sections[20]` in `/openui.json`
