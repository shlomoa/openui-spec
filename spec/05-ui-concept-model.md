# 05. UI Concept Model

**Purpose:** Define the abstract building blocks of the framework UI.

**Derived from traversal nodes:** `library-component-catalog`, `library-element-catalog`, `aggregation-model`

## Specification

- The public UI surface is composed from libraries that publish named controls and elements as reusable building blocks.
- Controls are standalone renderable components that provide presentation and interaction behavior; elements are reusable supporting units that contribute structure or semantics through a parent component.
- Composition is expressed declaratively through public metadata, primarily aggregations that define owned child content, named regions, and allowed child types.
- Associations complement aggregations by expressing non-owning references such as labels, descriptions, and other semantic relationships between UI objects.
- Higher-level concepts such as pages, dialogs, forms, lists, toolbars, and actions are modeled as specialized controls and elements rather than as framework primitives outside the metadata contract.

## Non-goals

- The UI concept model does not prescribe a specific visual design, renderer implementation, DOM structure, or styling strategy.
- The UI concept model does not require every public symbol to be independently renderable; supporting elements may exist only as composition units within parent controls.
- The UI concept model does not infer normative composition rules from private implementation code when those rules are not declared in public metadata.

## Tags

- `library-published-building-blocks` — libraries publish the controls and elements that define the reusable public UI surface.
- `control-element-distinction` — controls are standalone renderable units, while elements are subordinate reusable units composed through parents.
- `metadata-declared-composition` — parent-child UI structure is normative only when declared in public metadata, especially through aggregations.
- `owned-ui-content` — aggregated children belong to the parent component's public composition contract and lifecycle.
- `named-ui-regions` — aggregations may define semantic regions such as header, content, footer, items, or actions without prescribing renderer internals.

## Formal definitions

- **UI building block** — a public control or element that participates in the framework's reusable UI surface and can be discovered from library metadata.
- **Control** — a public component type intended to represent a standalone renderable UI unit with presentation and, where applicable, interaction behavior.
- **Element** — a public reusable UI unit that contributes structure, semantics, or configuration to a parent component without needing to stand alone as a renderable surface.
- **Aggregation-based composition** — a parent-owned composition relationship declared in metadata that specifies child types, multiplicity, and semantic role within the UI.
- **UI region** — a semantically named composition area, such as `header`, `content`, `footer`, or `items`, represented through an aggregation in public metadata.

## Usage and implementation guidance

- Use this model to classify public symbols as controls or elements before applying more specific rules from component, layout, form, interaction, or accessibility sections.
- Model owned UI structure through aggregations and reserve associations for cross-references that do not transfer ownership, such as labels, descriptions, or semantic links.
- Describe higher-level constructs such as pages, dialogs, forms, and list rows as compositions of controls and elements connected through named regions rather than through renderer-specific DOM assumptions.
- When normalizing metadata into `/openui.json`, preserve aggregation names, child types, multiplicity, and semantic roles so tooling can reconstruct the UI concept hierarchy without reverse-engineering runtime code.

## Examples

### Example 1 — library-published building blocks

```json
{
  "library": {
    "name": "sample.library",
    "controls": [
      "sample.library.Page",
      "sample.library.Button",
      "sample.library.Form"
    ],
    "elements": [
      "sample.library.FormContainer",
      "sample.library.FormElement"
    ]
  }
}
```

This declaration shows the public UI surface as a set of reusable controls and elements published by a library.

### Example 2 — named composition regions

```json
{
  "component": "sample.library.Page",
  "metadata": {
    "aggregations": {
      "header": {"type": "sap.ui.core.Control", "multiple": false},
      "content": {"type": "sap.ui.core.Control", "multiple": true},
      "footer": {"type": "sap.ui.core.Control", "multiple": false},
      "actions": {"type": "sap.ui.core.Control", "multiple": true}
    }
  }
}
```

The `Page` control models its UI structure through named aggregations, making regions such as header, content, footer, and actions explicit in public metadata.

### Example 3 — form hierarchy through controls and elements

```json
{
  "components": [
    {
      "name": "sample.library.Form",
      "kind": "control",
      "aggregations": {
        "containers": {"type": "sample.library.FormContainer", "multiple": true}
      }
    },
    {
      "name": "sample.library.FormContainer",
      "kind": "element",
      "aggregations": {
        "elements": {"type": "sample.library.FormElement", "multiple": true}
      }
    },
    {
      "name": "sample.library.FormElement",
      "kind": "element",
      "aggregations": {
        "fields": {"type": "sap.ui.core.Control", "multiple": true}
      },
      "associations": {
        "label": {"type": "sap.ui.core.Label", "multiple": false}
      }
    }
  ]
}
```

This hierarchy shows how a form can be modeled as a control that owns element-based structure, while field controls and label associations remain explicit parts of the public composition contract.

### Example 4 — dialog composition and semantic references

```json
{
  "component": "sample.library.Dialog",
  "metadata": {
    "aggregations": {
      "content": {"type": "sap.ui.core.Control", "multiple": true},
      "beginButton": {"type": "sap.ui.core.Control", "multiple": false},
      "endButton": {"type": "sap.ui.core.Control", "multiple": false}
    },
    "associations": {
      "ariaLabelledBy": {"type": "sap.ui.core.Control", "multiple": true},
      "ariaDescribedBy": {"type": "sap.ui.core.Control", "multiple": true}
    }
  }
}
```

This dialog example shows that owned composition stays in aggregations, while semantic references such as accessible labels and descriptions remain non-owning associations.

## JSON Mapping

- `specification.sections[4]` in `/openui.json`
