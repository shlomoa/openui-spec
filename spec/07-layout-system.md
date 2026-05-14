# 07. Layout System

**Purpose:** Describe the abstract layout and composition requirements.

**Derived from traversal nodes:** `aggregation-model`, `renderer-dnd-model`

## Specification

- Layout is expressed as ordered or named composition regions exposed through aggregations.
- Responsive behavior must preserve component composition semantics when layout density, theme, or viewport changes.
- Container components may expose drag-and-drop semantics only when declared in metadata.

## JSON Mapping

- `specification.sections[6]` in `/openui.json`
