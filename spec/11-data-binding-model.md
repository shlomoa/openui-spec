# 11. Data Binding Model

**Purpose:** Describe how component state binds to external models.

**Derived from traversal nodes:** `property-model`, `aggregation-model`

## Specification

- Bindable properties and aggregations are part of the component contract and must be explicitly declared with a bindable flag.
- Bindings may target scalar properties or compositional collections depending on the metadata kind: property bindings connect a single typed value, while aggregation bindings connect a model collection to an owned aggregation through a template.
- Every binding resolves against a model and an addressable path within that model; a binding may use the default model or a named model.
- Async or reactive model updates must preserve the declared property and aggregation types so bound values stay compatible with the component contract.
- Members that are not declared bindable, or that are hidden, are not part of the public binding contract and must not be relied on as binding targets.

## Non-goals

- The data binding model does not standardize a single model implementation, query language, or transport protocol such as JSON, OData, or REST.
- The data binding model does not define expression-language grammar, formatter syntax, or two-way change-detection internals; it only requires that updates preserve declared types.
- The data binding model does not describe form-level validation or submission semantics, which belong to the form model, nor renderer or DOM details used to display bound values.

## Tags

- `bindable-contract` — only metadata members explicitly declared bindable participate in the public data binding contract.
- `property-binding` — a property binding connects a single addressable model value to one typed, scalar property.
- `aggregation-binding` — an aggregation binding connects a model collection to an owned aggregation by repeating a template for each entry.
- `binding-path-context` — every binding resolves a path against a default or named model, optionally relative to a binding context.
- `type-preserving-updates` — async or reactive model updates must keep bound values compatible with the declared property and aggregation types.

## Formal definitions

- **Binding** — a declared connection between a bindable component member and a value or collection addressed in a model.
- **Model** — an external, addressable source of state that a binding reads from and, for two-way bindings, writes back to.
- **Binding path** — the address, optionally qualified by a model name and relative to a binding context, that selects the value or collection a binding targets.
- **Property binding** — a binding whose target is a single scalar property and whose value must remain compatible with the declared property type.
- **Aggregation binding** — a binding whose target is an owned aggregation, expanding a model collection into child instances through a declared template while preserving the aggregation's child type and multiplicity.

## Usage and implementation guidance

- Declare a property or aggregation as bindable in metadata before treating it as a binding target; non-bindable and hidden members are not part of the binding contract.
- Bind scalar configuration values, such as `text`, `value`, or `selected`, with property bindings, and bind owned collections, such as `items` or `content`, with aggregation bindings driven by a template.
- Qualify each binding path with the default model or an explicit named model, and resolve relative paths against the active binding context so list templates address per-entry values.
- Preserve the declared metadata type when normalizing bindings into `/openui.json`: record the bound member, its kind (property or aggregation), the bindable flag, the model, and the path so generators can reconstruct the binding.
- Keep binding semantics separate from interaction and state: a binding describes where a value comes from, while events describe transitions and state describes the current condition, and async updates must not change the declared type.

## Examples

### Example 1 — scalar property binding

```json
{
  "component": "sample.library.Input",
  "metadata": {
    "properties": {
      "value": { "type": "string", "defaultValue": "", "bindable": true }
    }
  },
  "binding": {
    "value": { "kind": "property", "model": "orders", "path": "/customer/name" }
  }
}
```

The bindable `value` property is connected to a single addressable path in the named `orders` model. The bound value must remain a `string`, so async model updates preserve the declared property type.

### Example 2 — aggregation list binding with a template

```json
{
  "component": "sample.library.List",
  "metadata": {
    "defaultAggregation": "items",
    "aggregations": {
      "items": {
        "type": "sample.library.ListItem",
        "multiple": true,
        "bindable": true
      }
    }
  },
  "binding": {
    "items": {
      "kind": "aggregation",
      "model": "orders",
      "path": "/orders",
      "template": {
        "component": "sample.library.ListItem",
        "binding": {
          "title": { "kind": "property", "path": "title" }
        }
      }
    }
  }
}
```

The bindable `items` aggregation is bound to the `/orders` collection. The template is instantiated once per entry, and each item's relative `title` path resolves against the per-entry binding context, preserving the aggregation's `0..n` multiplicity and child type.

### Example 3 — type-preserving async update

```json
{
  "component": "sample.library.ObjectStatus",
  "metadata": {
    "properties": {
      "text": { "type": "string", "defaultValue": "", "bindable": true },
      "state": {
        "type": "sample.library.ValueState",
        "defaultValue": "None",
        "bindable": true
      }
    }
  },
  "binding": {
    "text": { "kind": "property", "model": "status", "path": "/label" },
    "state": { "kind": "property", "model": "status", "path": "/valueState" }
  }
}
```

When the named `status` model resolves asynchronously, the bound `text` stays a `string` and the bound `state` stays a `ValueState` enum value. The declared types are preserved, so the bound component never receives an incompatible value.

## JSON Mapping

- `specification.sections[10]` in `/openui.json`
