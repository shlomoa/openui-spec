# 09. Interaction Model

**Purpose:** Describe how user interaction is represented in the specification.

**Derived from traversal nodes:** `event-model`, `reference-component-button`

## Specification

- User-triggered behavior is modeled as named events with stable semantics, such as `press` for activation.
- Interaction rules must account for enabled and disabled states, pointer activation, and keyboard activation.
- Deprecated interaction aliases may be documented for compatibility but must not replace the current public event contract.

## JSON Mapping

- `specification.sections[8]` in `/openui.json`
