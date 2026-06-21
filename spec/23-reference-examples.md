# 23. Reference Examples

**Purpose:** Provide concrete reference components abstracted from upstream OpenUI5 evidence.

**Derived from traversal nodes:** `reference-component-button`

## Specification

- Reference examples translate concrete upstream component evidence into implementation-neutral specification examples.
- A reference action component must preserve its stable identity, owning library, advertised interfaces, public properties, associations, events, and optional capability metadata.
- Public properties define the component's configurable state, including text, visual type, width, enabled state, icon configuration, icon ordering, icon density behavior, text direction, accessibility popup state, accessibility role, and badge style.
- Hidden properties may be recorded as implementation evidence, but they must not be treated as public API in generated documentation or conformance tests.
- Accessibility relationships are represented through non-owning associations such as `ariaLabelledBy` and `ariaDescribedBy`.
- User activation is represented by the current public `press` event; deprecated compatibility aliases such as `tap` may be recorded but must not replace the normative activation event.
- Optional renderer, design-time, drag-and-drop, badge, and theme-aware visual metadata may be retained as capabilities when they are present in upstream evidence.
- Reference examples must include validation expectations that connect the component contract to observable behavior such as state accessors, text direction, activation events, enabled-state gating, visibility, and accessibility metadata.

## Non-goals

- Reference examples do not standardize OpenUI5 runtime internals, renderer DOM structure, CSS class names, or event ordering.
- Reference examples do not require every implementation to expose a button component with the exact same API; they provide concrete evidence for applying the abstract specification models.
- Reference examples do not make hidden or deprecated members normative for new generated APIs.
- Reference examples do not replace the component, interaction, state, form, accessibility, or theming sections; they demonstrate those sections working together.

## Tags

- `reference-component-evidence` — a concrete upstream component is captured as evidence for the abstract metadata model.
- `action-component-contract` — a button-like component combines configurable state, accessibility associations, and a public activation event.
- `public-property-surface` — public properties such as `text`, `type`, `width`, `enabled`, and icon settings define the supported configuration surface.
- `accessibility-association-surface` — label and description relationships are represented through associations instead of owned content.
- `activation-event-surface` — the current public activation event is normative, while deprecated aliases are compatibility evidence only.
- `optional-capability-evidence` — renderer, design-time, drag-and-drop, badge, and theme-aware metadata are recorded as optional capabilities.
- `behavioral-validation-evidence` — reference examples include observable expectations that conformance tests can validate.

## Formal definitions

- **Reference example** — a concrete, evidence-backed example used to show how the abstract specification models apply to a real component while remaining implementation-neutral.
- **Reference action component** — a button-like component that exposes configurable state, accessibility relationships, and an activation event for application handlers.
- **Evidence metadata** — upstream metadata captured for a reference example, including identity, interfaces, properties, associations, events, renderer, design-time, and capability flags.
- **Public property surface** — the set of public properties that applications and generators may use as the component's supported configuration contract.
- **Compatibility event alias** — a deprecated event retained for migration or historical evidence while the current event remains normative.
- **Optional capability** — metadata that may be preserved when present, such as drag capability, badge styling, renderer linkage, design-time hints, or theme-aware visuals, without becoming mandatory for all components.
- **Reference validation expectation** — an observable behavior or conformance check derived from the reference example, such as enabled-state gating or text-direction preservation.

## Usage and implementation guidance

- Use reference examples to verify that the abstract section models can represent a real component without depending on private framework internals.
- Preserve identity (`sap.m.Button`), library (`sap.m`), and interface evidence so generated catalogs can link the example back to the component and form/access-key/toolbar contracts it advertises.
- Normalize public properties with their declared types, groups, defaults, visibility, and deprecation state; keep hidden properties out of generated public APIs unless a diagnostic view explicitly asks for evidence metadata.
- Model `ariaLabelledBy` and `ariaDescribedBy` as multiple non-owning associations so accessibility tooling can resolve labels and descriptions without assuming DOM proximity.
- Treat `press` as the normative activation event for new examples and tests; record `tap` only as a deprecated compatibility alias when preserving upstream evidence.
- Retain optional renderer, design-time, drag-and-drop, badge, and theme-aware icon metadata as capabilities that enrich documentation and tests without changing the core component contract.
- Derive behavioral tests from public behavior: property accessors return normalized values, disabled controls do not dispatch activation, text direction is preserved, visibility follows the public state, and accessibility popup metadata maps to the declared value.

## Examples

### Example 1 — reference action component metadata

```json
{
  "component": "sap.m.Button",
  "library": "sap.m",
  "interfaces": [
    "sap.ui.core.IFormContent",
    "sap.ui.core.IAccessKeySupport",
    "sap.m.IToolbarInteractiveControl"
  ],
  "metadata": {
    "properties": {
      "text": { "type": "string", "group": "Misc", "defaultValue": "" },
      "type": {
        "type": "sap.m.ButtonType",
        "group": "Appearance",
        "defaultValue": "Default"
      },
      "width": {
        "type": "sap.ui.core.CSSSize",
        "group": "Misc",
        "defaultValue": null
      },
      "enabled": {
        "type": "boolean",
        "group": "Behavior",
        "defaultValue": true
      },
      "icon": {
        "type": "sap.ui.core.URI",
        "group": "Appearance",
        "defaultValue": ""
      },
      "iconFirst": {
        "type": "boolean",
        "group": "Appearance",
        "defaultValue": true
      },
      "activeIcon": {
        "type": "sap.ui.core.URI",
        "group": "Misc",
        "defaultValue": null
      },
      "iconDensityAware": {
        "type": "boolean",
        "group": "Misc",
        "defaultValue": true
      },
      "textDirection": {
        "type": "sap.ui.core.TextDirection",
        "group": "Appearance",
        "defaultValue": "Inherit"
      },
      "ariaHasPopup": {
        "type": "sap.ui.core.aria.HasPopup",
        "group": "Accessibility",
        "defaultValue": "None"
      },
      "accessibleRole": {
        "type": "sap.m.ButtonAccessibleRole",
        "group": "Accessibility",
        "defaultValue": "Default"
      },
      "badgeStyle": {
        "type": "sap.m.BadgeStyle",
        "group": "Misc",
        "defaultValue": "Default"
      }
    }
  }
}
```

The reference button demonstrates how a real action component maps to the component and state models: public properties retain types, default values, groups, and accessibility-relevant configuration without requiring a specific renderer.

### Example 2 — accessibility associations and activation event

```json
{
  "component": "sap.m.Button",
  "metadata": {
    "associations": {
      "ariaDescribedBy": {
        "type": "sap.ui.core.Control",
        "multiple": true,
        "singularName": "ariaDescribedBy"
      },
      "ariaLabelledBy": {
        "type": "sap.ui.core.Control",
        "multiple": true,
        "singularName": "ariaLabelledBy"
      }
    },
    "events": {
      "tap": {
        "deprecated": true,
        "replacement": "press"
      },
      "press": {
        "kind": "activation",
        "parameters": {},
        "enabledRequired": true
      }
    }
  }
}
```

Associations provide non-owning label and description relationships for accessibility. The `press` event is the normative activation event, while `tap` is retained only as deprecated compatibility evidence.

### Example 3 — optional capabilities and hidden evidence

```json
{
  "component": "sap.m.Button",
  "metadata": {
    "hiddenProperties": {
      "highlightAccKeysRef": {
        "type": "boolean",
        "defaultValue": false,
        "visibility": "hidden"
      },
      "accesskey": {
        "type": "string",
        "defaultValue": "",
        "visibility": "hidden"
      }
    },
    "renderer": "sap.m.ButtonRenderer",
    "designtime": "sap/m/designtime/Button.designtime",
    "dnd": {
      "draggable": true,
      "droppable": false
    },
    "themeAwareVisuals": {
      "type": "sap.m.ButtonType",
      "iconDensityAware": true,
      "badgeStyle": "Default"
    }
  }
}
```

Optional evidence records capabilities that generators may use for documentation, diagnostics, or richer examples. Hidden properties remain evidence-only and do not become part of the generated public API.

### Example 4 — behavioral validation expectations

```json
{
  "component": "sap.m.Button",
  "validation": [
    {
      "name": "enabled activation gate",
      "given": { "enabled": false },
      "when": { "interaction": "press" },
      "expect": { "event": null }
    },
    {
      "name": "text direction preservation",
      "given": { "text": "Save", "textDirection": "RTL" },
      "expect": { "renderedTextDirection": "RTL" }
    },
    {
      "name": "accessibility popup state",
      "given": { "ariaHasPopup": "Menu" },
      "expect": { "aria-haspopup": "menu" }
    },
    {
      "name": "visibility follows public state",
      "given": { "visible": true },
      "expect": { "isVisible": true }
    }
  ]
}
```

Reference validation expectations connect metadata to observable behavior. They are intentionally framed in implementation-neutral terms so any conforming generator or runtime can test the same public contract.

## JSON Mapping

- `specification.sections[22]` in `/openui.json`
