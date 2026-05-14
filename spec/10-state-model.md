# 10. State Model

**Purpose:** Describe state held or exposed by components.

**Derived from traversal nodes:** `property-model`, `visibility-default-model`

## Specification

- Component state is represented by typed properties with explicit default values.
- State may be public or hidden, but only public state participates in the external component contract.
- Defaulted state and derived state must remain compatible with the declared metadata type system.

## JSON Mapping

- `specification.sections[9]` in `/openui.json`
