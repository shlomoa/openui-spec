# 20. Extension Model

**Purpose:** Describe supported extension points.

**Derived from traversal nodes:** `library-interface-catalog`, `design-time-evidence`, `library-component-catalog`

## Specification

- The framework must allow new controls, elements, types, and interfaces to be introduced through the same catalog and metadata model.
- Design-time metadata may extend authoring semantics without redefining the runtime component contract.
- Extension points must preserve compatibility with theming, accessibility, and interaction rules.
- Extension artifacts must publish a stable identity, owning library, version, dependencies, and metadata so tooling can discover them without reading implementation code.
- Runtime extensions must use public metadata members such as properties, aggregations, associations, events, interfaces, and types rather than private renderer state or DOM structure.
- Extension points must declare their allowed content type, multiplicity, lifecycle ownership, and compatibility constraints before applications inject or replace content.
- Design-time extensions must be optional metadata overlays that describe palette placement, authoring labels, allowed drops, and edit actions while preserving the runtime contract.
- Renderer and drag-and-drop extensions must remain declarative: renderer modules, drop targets, drag sources, and drop effects are named in metadata and must not require consumers to patch internal control code.
- Extension contracts must be versioned and additive by default; incompatible changes require a new artifact identity, major version, or explicitly declared compatibility gate.

## Non-goals

- The extension model does not define a plug-in package manager, transport format, marketplace, or deployment mechanism.
- The extension model does not allow applications to depend on private renderer DOM, private state, or undocumented lifecycle hooks.
- The extension model does not prescribe a specific design-time tool, IDE, visual editor, or palette layout.
- The extension model does not override the component, theming, accessibility, interaction, security, or performance sections; extensions must satisfy those contracts.

## Tags

- `extension-artifact` — a catalog-published control, element, type, interface, renderer, or design-time overlay that can be discovered and versioned independently.
- `extension-point-contract` — a named public slot or capability that declares allowed content type, multiplicity, ownership, and compatibility constraints.
- `metadata-extension` — an additive metadata contribution that introduces properties, aggregations, associations, events, interfaces, or types through the standard component model.
- `design-time-extension` — optional authoring metadata for labels, palette placement, edit actions, and drag-and-drop hints that does not change runtime behavior.
- `renderer-extension` — a declarative renderer linkage or renderer hook that remains compatible with theming, accessibility, and performance rules.
- `drag-drop-extension` — a declarative drag source or drop target capability associated with public aggregations and typed drop effects.
- `compatibility-gate` — version, feature, or capability metadata that prevents incompatible extension contracts from being consumed silently.

## Formal definitions

- **Extension artifact** — a catalog-addressable item published by a library to extend the framework, such as a control, element, type, interface, renderer, or design-time overlay.
- **Extension point** — a named public location or capability where extension artifacts may contribute content or behavior under declared type, multiplicity, and lifecycle constraints.
- **Metadata extension** — an additive contribution to the public metadata contract using the same property, aggregation, association, event, type, and interface structures as built-in components.
- **Design-time extension** — metadata consumed by authoring tools to describe labels, palette grouping, editable properties, allowed drops, and contextual actions without changing runtime APIs.
- **Renderer extension** — declarative renderer linkage that controls how an artifact is rendered while preserving public theming, accessibility, and interaction contracts.
- **Drag-and-drop extension** — metadata that declares which public aggregation can act as a drag source or drop target and which drop effects are supported.
- **Compatibility gate** — a version, feature flag, required capability, or peer dependency that determines whether a consumer can safely load an extension artifact.

## Usage and implementation guidance

- Publish extensions through the same library catalog as built-in artifacts so generators, validators, and documentation tools resolve them from one source of truth.
- Prefer explicit extension-point aggregations or interfaces over ad-hoc callbacks; consumers should know the accepted child type, multiplicity, ownership, and supported events before injecting content.
- Keep runtime metadata and design-time metadata separate: design-time overlays may add authoring labels or drag-and-drop hints, but they must not introduce runtime-only behavior.
- Treat renderer linkage as an implementation detail behind a public metadata contract; renderer extensions must keep stable theming tokens, accessible names, keyboard semantics, and performance constraints intact.
- Declare drag-and-drop capabilities against public aggregations and include accepted types and drop effects so generators can map them to host-framework primitives safely.
- Version extension artifacts additively and use compatibility gates for breaking changes, optional features, or host-framework capability requirements.
- Validate extension artifacts with the same compliance tests as built-in controls, including metadata shape, accessibility, theming, interaction, security, and performance checks.

## Examples

### Example 1 — extension artifact and public extension point

```json
{
  "library": "sample.extensions",
  "version": "1.2.0",
  "components": [
    {
      "name": "sample.extensions.AnalyticsPanel",
      "extends": "sap.ui.core.Control",
      "interfaces": ["sample.extensions.IWorkspaceCard"],
      "metadata": {
        "properties": {
          "title": { "type": "string", "defaultValue": "Analytics" }
        },
        "aggregations": {
          "content": {
            "type": "sap.ui.core.Control",
            "multiple": true,
            "visibility": "public"
          }
        },
        "events": {
          "refresh": { "parameters": { "reason": "string" } }
        }
      }
    }
  ],
  "extensionPoints": [
    {
      "name": "workspace.cards",
      "type": "sample.extensions.IWorkspaceCard",
      "multiple": true,
      "ownsContent": true
    }
  ]
}
```

The extension artifact is discoverable from the library catalog and contributes to a named `workspace.cards` extension point. The extension point declares the required interface, multiplicity, and ownership semantics before applications inject content.

### Example 2 — design-time metadata overlay

```json
{
  "artifact": "sample.extensions.AnalyticsPanel",
  "designTime": {
    "label": "Analytics panel",
    "paletteGroup": "Workspace extensions",
    "editableProperties": ["title"],
    "aggregations": {
      "content": {
        "domRef": ":sap-domref .analytics-panel-content",
        "actions": ["move", "remove"],
        "allowedDropTypes": ["sap.ui.core.Control"]
      }
    }
  }
}
```

Design-time metadata enriches authoring tools with labels, palette grouping, editable properties, and drop hints. It is an optional overlay: the runtime component contract remains the metadata declared by the extension artifact.

### Example 3 — renderer and drag-and-drop extension contract

```json
{
  "artifact": "sample.extensions.WorkspaceColumn",
  "metadata": {
    "renderer": "sample.extensions.WorkspaceColumnRenderer",
    "aggregations": {
      "cards": {
        "type": "sample.extensions.IWorkspaceCard",
        "multiple": true,
        "dragDrop": {
          "source": true,
          "target": true,
          "dropEffects": ["move", "copy"]
        }
      }
    },
    "compatibility": {
      "requires": ["drag-drop-extension", "theme-token-v1"],
      "since": "1.2.0"
    }
  }
}
```

Renderer and drag-and-drop extension behavior is declarative. The renderer module is linked by name, drag-and-drop is scoped to the public `cards` aggregation, and compatibility gates state the capabilities required by a consumer.

### Example 4 — generator extension outlet

```typescript
@Component({
  selector: "app-workspace-outlet",
  imports: [NgComponentOutlet],
  template: `
    @for (extension of extensions(); track extension.id) {
      <ng-container *ngComponentOutlet="extension.component" />
    }
  `,
})
export class WorkspaceOutletComponent {
  // extension point workspace.cards accepts IWorkspaceCard-compatible components.
  readonly extensions = input<readonly WorkspaceCardExtension[]>([]);
}
```

A generator maps the extension point to a typed outlet in the host framework. The outlet accepts only registry entries that satisfy the declared extension-point contract, keeping injected content discoverable and testable.

## JSON Mapping

- `specification.sections[19]` in `/openui.json`
