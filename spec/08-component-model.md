# 08. Component Model

**Purpose:** Define the normative component contract.

**Derived from traversal nodes:** `library-component-catalog`, `property-model`, `aggregation-model`, `association-model`, `event-model`

## Specification

- Each component must expose a stable identity, owning library, supported interfaces, and public metadata.
- Component metadata consists of properties, aggregations, associations, and events with defaults, visibility, multiplicity, and types.
- Components may additionally expose renderer linkage, design-time hooks, and drag-and-drop capabilities.

## JSON Mapping

- `specification.sections[7]` in `/openui.json`
