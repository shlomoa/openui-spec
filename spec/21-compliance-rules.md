# 21. Compliance Rules

**Purpose:** Summarize what every implementation must satisfy.

**Derived from traversal nodes:** `openui-root`, `library-catalog-root`, `metadata-grammar-root`, `compliance-tests`

## Specification

- A compliant implementation must publish its public surface through a discoverable library catalog.
- A compliant implementation must describe every public component with typed metadata for properties, composition, relationships, and events.
- A compliant implementation must preserve accessibility, theming, internationalization, and testing evidence as part of the public contract lifecycle.
- Compliance is evaluated against the normalized public contract, not against private source files, renderer internals, generated DOM structure, or framework-specific implementation details.
- Every public library, component, element, type, and interface must be reachable from the catalog with a stable identifier, ownership information, version scope, and documented visibility.
- Component metadata must include enough typed information for validators and generators to reconstruct properties, aggregations, associations, events, extension hooks, and design-time hints without reverse-engineering runtime behavior.
- Cross-cutting rules for accessibility, theming, internationalization, security, performance, and extension compatibility must be traceable to public metadata or documented evidence.
- Automated compliance tests must verify that `/openui.json`, generated API projections, documentation, examples, and implementation behavior remain synchronized for every normative public contract.
- When an implementation intentionally omits an optional capability, the omission must be explicit and must not weaken required baseline metadata, interaction, accessibility, or evidence rules.

## Non-goals

- Compliance rules do not prescribe a specific renderer, build system, test runner, package format, or host framework.
- Compliance rules do not require implementations to expose private members, internal DOM nodes, renderer helper APIs, or source-code-only conventions.
- Compliance rules do not redefine section-specific requirements; they aggregate the mandatory checks from the catalog, component, interaction, state, accessibility, theming, internationalization, and testing sections.
- Compliance rules do not certify application-specific business logic, visual design choices, or data schemas beyond their use of the public UI contract.

## Tags

- `catalog-discoverability` — every public library member is reachable from a stable, machine-readable catalog entry.
- `metadata-completeness` — every public component declares typed properties, aggregations, associations, events, and relevant capability metadata.
- `contract-based-validation` — compliance is evaluated from public metadata, documentation, generated projections, and observable behavior rather than private implementation details.
- `cross-cutting-evidence` — accessibility, theming, internationalization, security, privacy, performance, and extension requirements are backed by public metadata or documented evidence.
- `testable-conformance` — every normative rule has an automated or reviewable acceptance check that can be repeated by implementers and validators.
- `explicit-capability-scope` — optional capabilities are declared as supported or intentionally absent without weakening required baseline conformance.

## Formal definitions

- **Compliant implementation** — a framework, library, generator, or projection that satisfies the required public contract rules for the specification sections it claims to implement.
- **Public surface** — the catalog-addressable libraries, controls, elements, types, interfaces, metadata members, events, examples, and generated projections exposed to consumers.
- **Compliance evidence** — machine-readable metadata, API projections, documentation, examples, test results, or reviewable records that demonstrate a rule is satisfied.
- **Conformance profile** — the declared scope of sections, libraries, components, and optional capabilities that an implementation claims to support.
- **Compliance gap** — any missing, inconsistent, private-only, or untested part of a claimed public contract.
- **Validation artifact** — a repeatable test, generated file, documentation page, screenshot, or report used to verify conformance.

## Usage and implementation guidance

- Start compliance validation from the catalog root and walk only public entries; any component that cannot be discovered from the catalog is outside the compliant public surface.
- Validate metadata completeness before validating behavior so downstream checks can rely on declared property types, aggregation multiplicity, association targets, event parameters, defaults, visibility, and capability flags.
- Treat documentation, `/openui.json`, generated `api.json`-style projections, generated examples, and runtime metadata as synchronized views of the same public contract.
- Record cross-cutting evidence next to the public contract it supports, such as accessibility associations, theme token usage, localized text handling, popup relationships, or lazy-loading declarations.
- Make optional capability support explicit: a component may omit drag-and-drop, design-time metadata, or a generator mapping only when the conformance profile says the capability is not claimed.
- Fail compliance when an implementation relies on private renderer details for behavior that the specification requires to be public, even if the visible UI appears correct.
- Keep validation artifacts deterministic and versioned so maintainers can compare compliance before and after library, metadata, or generator changes.

## Examples

### Example 1 — catalog discoverability checklist

```json
{
  "conformanceProfile": "core-ui",
  "catalog": {
    "libraries": [
      {
        "name": "sample.library",
        "version": "1.0.0",
        "components": ["sample.library.Button", "sample.library.Form"],
        "types": ["sample.library.ButtonType"],
        "interfaces": ["sample.library.IFormContent"]
      }
    ]
  },
  "checks": [
    "library is discoverable from the catalog root",
    "public components resolve to owning libraries",
    "public types and interfaces are reachable by stable identifiers"
  ]
}
```

The checklist validates discoverability before behavior: every claimed public member must resolve from the catalog with a stable identifier and an owning library.

### Example 2 — metadata completeness gate

```json
{
  "component": "sample.library.Button",
  "metadata": {
    "properties": {
      "text": { "type": "string", "defaultValue": "", "visibility": "public" },
      "enabled": {
        "type": "boolean",
        "defaultValue": true,
        "visibility": "public"
      }
    },
    "aggregations": {},
    "associations": {
      "ariaLabelledBy": { "type": "sap.ui.core.Control", "multiple": true }
    },
    "events": {
      "press": { "parameters": {} }
    }
  },
  "compliance": {
    "metadataComplete": true,
    "usesPrivateRendererContract": false
  }
}
```

The gate confirms that the public action component exposes typed properties, non-owning accessibility associations, and the activation event through metadata instead of requiring validators to inspect renderer internals.

### Example 3 — cross-cutting evidence record

```json
{
  "component": "sample.library.Input",
  "evidence": {
    "accessibility": [
      "ariaLabelledBy association",
      "ariaDescribedBy association"
    ],
    "theming": ["uses theme token: field.border.color"],
    "internationalization": ["textDirection: Inherit", "localized placeholder"],
    "tests": [
      "metadata contract test",
      "keyboard activation test",
      "rtl rendering test"
    ]
  }
}
```

Cross-cutting evidence keeps accessibility, theming, internationalization, and tests tied to the same component contract so a compliance report can explain why each required rule passed.

### Example 4 — generator compliance guard

```typescript
export function assertGeneratedComponentCompliance(
  component: GeneratedComponent,
): void {
  assertCatalogEntry(component.catalogId);
  assertMetadataProjection(component.metadata);
  assertPublicInputsMatchProperties(
    component.inputs,
    component.metadata.properties,
  );
  assertOutputsMatchEvents(component.outputs, component.metadata.events);
  assertAccessibilityBindings(
    component.template,
    component.metadata.associations,
  );
}
```

A generator compliance guard checks that generated code remains a projection of the public contract: inputs come from properties, outputs come from events, and accessibility bindings come from associations.

## JSON Mapping

- `specification.sections[20]` in `/openui.json`
