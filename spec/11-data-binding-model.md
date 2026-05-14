# 11. Data Binding Model

**Purpose:** Describe how component state binds to external models.

**Derived from traversal nodes:** `property-model`, `aggregation-model`

## Specification

- Bindable properties and aggregations are part of the component contract and must be explicitly declared.
- Bindings may target scalar properties or compositional collections depending on the metadata kind.
- Async model updates must preserve declared property and aggregation types.

## JSON Mapping

- `specification.sections[10]` in `/openui.json`
