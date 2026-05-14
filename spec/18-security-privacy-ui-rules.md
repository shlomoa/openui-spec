# 18. Security / Privacy UI Rules

**Purpose:** State UI-facing security and privacy constraints.

**Derived from traversal nodes:** `renderer-dnd-model`, `reference-component-button`

## Specification

- Public component contracts must not rely on unsafe renderer side effects for user-visible semantics.
- Components that open or reference popups must declare that relationship explicitly through public metadata.
- Implementations should encode or sanitize user-provided visual values before they affect rendering or styling.

## JSON Mapping

- `specification.sections[17]` in `/openui.json`
