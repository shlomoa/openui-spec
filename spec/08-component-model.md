# 08. Component Model

**Purpose:** Define the normative component contract.

## Specification

- Each component must expose a stable identity, owning library, supported interfaces, and public metadata.
- Component metadata consists of properties, aggregations, associations, and events, each declared with a name, a type, and the modifiers that describe its public contract.
- Properties declare typed configuration values with a data type, an optional default value, visibility, and an optional bindable flag; properties are the primary inputs that configure a component instance.
- Aggregations declare owned child content with a child type, a multiplicity (`0..1` or `0..n`), visibility, and optional cardinality and binding semantics; aggregations express the parent-owned composition tree and lifecycle.
- Associations declare non-owning references to other components by a target type and multiplicity; associations express semantic links such as labels, ARIA references, and related controls without transferring ownership.
- Events declare named notifications that a component emits, together with the typed parameters delivered to listeners; events are the primary outputs through which a component reports interaction and state changes.
- Visibility (`public` or `hidden`) and default values are part of the contract: only public metadata is normative, and declared defaults define the initial state when no value is supplied.
- Components may additionally expose renderer linkage, design-time hooks, and drag-and-drop capabilities as optional, non-behavioral extensions of the contract.

## Non-goals

- The component model does not prescribe a specific renderer implementation, DOM structure, CSS strategy, or runtime framework.
- The component model does not treat private or internal members as part of the contract; only public metadata is normative.
- The component model does not require every component to declare every metadata category; a component may expose only the properties, aggregations, associations, or events that its contract needs.
- The component model does not define the higher-level composition of pages, forms, or dialogs; those are described in the UI concept, layout, and form sections as specialized components built from this contract.

## Tags

- `component-identity` — every component exposes a stable name and owning library that uniquely identify it within the public catalog.
- `property-contract` — properties are typed, optionally default-valued, visibility-scoped configuration inputs declared in metadata.
- `aggregation-contract` — aggregations are typed, multiplicity-constrained, parent-owned composition relationships declared in metadata.
- `association-contract` — associations are typed, multiplicity-constrained, non-owning references between components declared in metadata.
- `event-contract` — events are named, typed-parameter notifications a component emits to its listeners.
- `visibility-and-defaults` — visibility (`public`/`hidden`) and declared default values define which members are normative and what the initial state is.
- `renderer-designtime-dnd` — renderer linkage, design-time hooks, and drag-and-drop flags are optional capabilities layered onto the core metadata contract.

## Formal definitions

- **Component** — a public, named unit published by a library that exposes a metadata contract of properties, aggregations, associations, and events.
- **Property** — a metadata member declaring a typed configuration value with a data type, optional default value, visibility, and optional bindable flag.
- **Aggregation** — a metadata member declaring owned child content with a child type, multiplicity (`0..1` or `0..n`), and visibility, forming part of the parent's composition tree and lifecycle.
- **Association** — a metadata member declaring a non-owning reference to one or more components of a target type, used for semantic links rather than ownership.
- **Event** — a metadata member declaring a named notification, together with the typed parameters delivered to listeners when the component emits it.
- **Multiplicity** — the cardinality of an aggregation or association, expressed as `0..1` (single, `multiple: false`) or `0..n` (collection, `multiple: true`).
- **Visibility** — the contract scope of a metadata member, `public` when it is part of the normative contract or `hidden` when it is excluded from it.
- **Default value** — the value a property assumes when no explicit value is supplied, defining the initial state of a component instance.

## Usage and implementation guidance

- Use this model as the normative contract for every public component before applying domain-specific rules from the interaction, state, data-binding, form, or accessibility sections.
- Declare configuration inputs as properties with explicit types and defaults; reserve aggregations for owned child content and associations for non-owning semantic references.
- Express outputs as events with named, typed parameters so consumers can react to interaction and state changes without inspecting internal implementation.
- Mark members that are not part of the public contract as `hidden`, and treat only public metadata as normative for validation, documentation, and generation.
- When normalizing metadata into `/openui.json`, preserve each member's name, type, multiplicity, visibility, default value, and bindable flag so tooling can reconstruct the full component contract without reverse-engineering runtime code.
- Treat renderer linkage, design-time hooks, and drag-and-drop flags as optional capability metadata that augments, but never replaces, the core property, aggregation, association, and event contract.

## Examples

### Example 1 — component identity and properties

```json
{
  "component": "sample.library.Button",
  "library": "sample.library",
  "interfaces": ["sap.ui.core.IFormContent"],
  "metadata": {
    "properties": {
      "text": { "type": "string", "defaultValue": "", "bindable": true },
      "enabled": { "type": "boolean", "defaultValue": true },
      "type": {
        "type": "sample.library.ButtonType",
        "defaultValue": "Default",
        "visibility": "public"
      }
    }
  }
}
```

A button declares its identity, owning library, and supported interfaces, then exposes typed properties with default values and visibility as its primary configuration inputs.

### Example 2 — aggregations and multiplicity

```json
{
  "component": "sample.library.Panel",
  "metadata": {
    "defaultAggregation": "content",
    "aggregations": {
      "content": {
        "type": "sap.ui.core.Control",
        "multiple": true,
        "visibility": "public"
      },
      "header": {
        "type": "sap.ui.core.Control",
        "multiple": false,
        "visibility": "public"
      }
    }
  }
}
```

A panel owns its child content through aggregations: `content` is a `0..n` collection and `header` is a `0..1` single child, with the default aggregation naming where unnamed children are placed.

### Example 3 — associations and events

```json
{
  "component": "sample.library.Input",
  "metadata": {
    "properties": {
      "value": { "type": "string", "defaultValue": "", "bindable": true }
    },
    "associations": {
      "ariaLabelledBy": { "type": "sap.ui.core.Control", "multiple": true },
      "ariaDescribedBy": { "type": "sap.ui.core.Control", "multiple": true }
    },
    "events": {
      "change": {
        "parameters": { "value": { "type": "string" } }
      },
      "liveChange": {
        "parameters": { "value": { "type": "string" } }
      }
    }
  }
}
```

An input exposes a bindable `value` property as input, semantic `ariaLabelledBy` and `ariaDescribedBy` associations as non-owning references, and `change` and `liveChange` events with typed parameters as outputs.

### Example 4 — renderer linkage, design-time hooks, and drag-and-drop

```json
{
  "component": "sample.library.Card",
  "metadata": {
    "aggregations": {
      "content": { "type": "sap.ui.core.Control", "multiple": true }
    },
    "renderer": "sample.library.CardRenderer",
    "dnd": { "draggable": true, "droppable": true },
    "designtime": "sample/library/designtime/Card.designtime"
  }
}
```

A card augments its core aggregation contract with optional capability metadata: a renderer linkage, drag-and-drop flags, and a design-time reference, none of which change the normative property, aggregation, association, or event contract.
