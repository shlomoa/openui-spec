# 02. Design Goals

**Purpose:** Describe the outcomes a compliant web UI framework must enable.

**Derived from traversal nodes:** `library-catalog-root`, `metadata-grammar-root`

## Specification

- Enable library-based discovery of the public UI surface through a stable catalog of controls, elements, interfaces, and types.
- Define components with declarative metadata instead of framework-specific implementation details.
- Preserve a portable public contract that different implementations, tooling pipelines, and generators can consume without depending on a specific renderer or runtime internals.
- Support generator and automation use cases by keeping the contract machine-readable, hierarchical, and normalization-friendly.
- Make component capabilities, composition rules, types, and interaction hooks explicit enough to support validation, documentation, and interoperability across libraries.

## Non-goals

- The design goals do not require implementations to share a specific rendering engine, widget lifecycle, build pipeline, or source-code structure.
- The design goals do not elevate private helper APIs, undocumented behavior, or framework-internal optimizations into normative specification requirements.
- The design goals do not require a generator to reproduce OpenUI5 internals; they require only enough structured contract data to produce compatible framework abstractions.

## Tags

- `discoverable-public-surface` — the framework must expose its public libraries, controls, elements, interfaces, and types through stable catalog metadata that tools can enumerate.
- `declarative-component-contract` — component shape and capabilities must be expressed as metadata, not inferred from private implementation code.
- `implementation-independent-contract` — the specification must capture what compliant implementations provide without coupling that contract to a renderer, build stack, or framework-internal class design.
- `generator-ready-structure` — the contract must stay structured enough for validation, normalization, transformation, and code generation workflows.
- `interoperable-library-ecosystem` — libraries and components must publish enough typed information to support composition, documentation, and tooling across package boundaries.

## Formal definitions

- **Public surface discovery** — the ability to enumerate the framework's public libraries, controls, elements, interfaces, dependencies, and types from stable library-level declarations.
- **Declarative component contract** — a public metadata description of a component's properties, composition, relationships, events, defaults, and capabilities, independent of private implementation details.
- **Implementation-independent contract** — a specification record that defines externally observable framework semantics without requiring a specific renderer, runtime architecture, or build pipeline.
- **Generator-ready structure** — a machine-readable, hierarchical, and normalization-friendly representation of the framework contract that can be consumed by tooling, validators, or code generators.
- **Interoperability evidence** — typed component and library metadata that allows other libraries, applications, and tools to compose against the public contract without inspecting internals.

## Usage and implementation guidance

- Use these goals to judge whether a proposed specification entry improves discoverability, declarative clarity, portability, or tooling readiness; if it does not, it likely belongs in implementation notes rather than the normative contract.
- When extracting framework data, enumerate the public surface from `library.js` first, then normalize component semantics from metadata grammar so that discovery and interpretation remain separate concerns.
- Preserve typed names, multiplicity, defaults, and public relationships in the canonical JSON contract so validators and generators can operate without reverse-engineering runtime code.
- Treat generated API projections, design-time metadata, and tests as supporting inputs that help operationalize these goals, while keeping the public metadata contract authoritative.

## Examples

### Example 1 — discoverable public surface

```json
{
  "library": {
    "name": "sample.library",
    "dependencies": ["sap.ui.core"],
    "types": ["sample.library.Priority"],
    "interfaces": ["sample.library.FormContent"],
    "controls": ["sample.library.Button", "sample.library.Form"],
    "elements": ["sample.library.Item"]
  }
}
```

This kind of declaration satisfies the discovery goal because applications and tools can enumerate the public surface without scanning private source files.

### Example 2 — declarative component contract

```json
{
  "component": "sample.library.Form",
  "metadata": {
    "properties": {
      "editable": {"type": "boolean", "defaultValue": false}
    },
    "aggregations": {
      "content": {"type": "sample.library.FormElement", "multiple": true}
    },
    "associations": {
      "ariaLabelledBy": {"type": "sap.ui.core.Control", "multiple": true}
    },
    "events": {
      "submit": {}
    }
  }
}
```

This metadata satisfies the declarative contract goal because composition, accessibility relationships, and interaction hooks are expressed directly in public metadata.

### Example 3 — generator-ready structure

- A validator can confirm that every public component declares typed metadata members and library ownership.
- A documentation pipeline can render the same contract into prose, tables, and API indexes.
- A generator can transform the normalized metadata into framework-specific component scaffolding without parsing renderer internals.

## JSON Mapping

- `specification.sections[1]` in `/openui.json`
