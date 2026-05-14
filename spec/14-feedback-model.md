# 14. Feedback Model

**Purpose:** Define how user-visible feedback is modeled.

**Derived from traversal nodes:** `library-component-catalog`, `event-model`

## Specification

- The framework must expose components for busy, message, dialog, and empty-state feedback patterns.
- Feedback components must be addressable through the same public metadata contract as all other components.
- Action completion, failure, and warning scenarios must be representable through public events and state.

## JSON Mapping

- `specification.sections[13]` in `/openui.json`
