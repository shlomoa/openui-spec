# 15. Accessibility Model

**Purpose:** Capture accessibility requirements visible in the public contract.

**Derived from traversal nodes:** `association-model`, `reference-component-button`, `renderer-dnd-model`

## Specification

- Components must support accessible naming and description relationships through public associations or equivalent metadata.
- Accessibility roles, popup semantics, and text direction must be declarable as typed public state when applicable.
- Keyboard activation and focus behavior are compliance-relevant parts of the interaction contract.

## JSON Mapping

- `specification.sections[14]` in `/openui.json`
