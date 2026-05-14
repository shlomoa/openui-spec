# 01. Introduction

**Purpose:** Define the scope of the OpenUI specification as an implementation-independent contract derived from OpenUI5 public metadata and library declarations.

**Derived from traversal nodes:** `openui-root`, `library-catalog-root`, `metadata-grammar-root`

## Specification

- The master specification is `/openui.json`; the markdown files under `spec/` are synchronized prose views of the same contract.
- The normative scope is the public runtime UI framework contract: libraries, public symbols, component metadata, interaction semantics, and compliance evidence tied to that contract.
- Scope discovery starts from `library.js` catalogs, while normative interpretation of component shape comes from metadata grammar such as properties, aggregations, associations, events, defaults, visibility, renderer linkage, and drag-and-drop declarations.
- Machine-readable API projections such as `api.json`, design-time metadata, and automated tests are supporting evidence that refine, validate, or operationalize the contract without replacing the runtime metadata model.
- Build-time-only artifacts such as `.library` files may help locate dependencies, documentation resources, and packaging context, but they do not define the runtime contract by themselves.

## Non-goals

- The introduction does not standardize framework-internal implementation details, private members, or undocumented runtime behavior.
- The introduction does not prescribe a rendering technology, build tool, or generator implementation strategy beyond requiring compatibility with the public contract.
- The introduction does not treat build-time manifests or documentation-only assets as normative unless they are confirmed by the public runtime metadata model.

## Tags

- `single-source-of-truth` — `/openui.json` is the canonical specification record; markdown and generated artifacts must remain consistent with it.
- `public-runtime-contract` — only publicly declared libraries, symbols, metadata members, and interaction semantics belong to the normative surface.
- `scope-discovery` — `library.js` establishes which libraries, dependencies, controls, elements, interfaces, and types enter specification scope.
- `metadata-grammar` — managed object metadata defines how properties, aggregations, associations, events, defaults, visibility, renderer linkage, and drag-and-drop semantics are interpreted.
- `supporting-evidence` — `api.json`, design-time metadata, and automated tests confirm or operationalize the contract but do not replace it.

## Formal definitions

- **OpenUI Specification** — an implementation-independent specification derived from OpenUI5 public library catalogs and metadata grammar, expressed canonically in `/openui.json` and rendered into prose under `spec/`.
- **Public runtime contract** — the externally visible framework surface formed by public libraries, symbols, component metadata, interaction semantics, and compliance-relevant behavior that implementations must preserve.
- **Scope discovery** — the process of enumerating which libraries, dependencies, controls, elements, interfaces, and types belong to the specification, primarily by reading `library.js` declarations.
- **Metadata grammar** — the normative rule set that explains how component metadata is interpreted, including properties, aggregations, associations, events, default values, visibility, renderer linkage, and drag-and-drop declarations.
- **Supporting evidence** — secondary sources such as `api.json`, design-time metadata, and automated tests that corroborate, project, or validate the public contract without becoming the contract themselves.

## Usage and implementation guidance

- Use this section first to classify upstream artifacts as normative scope, supporting evidence, or build-time context before extracting details into later sections.
- Extraction or generator pipelines should enumerate libraries and symbols from `library.js`, then interpret component structure through metadata grammar before consulting `api.json`, design-time metadata, or tests.
- If supporting evidence conflicts with runtime metadata, the public runtime metadata model remains authoritative and the conflicting artifact should be recorded only as validation or documentation context.

## Examples

### Example 1 — scope discovery

```json
{
  "library": {
    "name": "sample.library",
    "dependencies": ["sap.ui.core"],
    "types": ["sample.library.Priority"],
    "interfaces": ["sample.library.FormContent"],
    "controls": ["sample.library.Button"],
    "elements": ["sample.library.Item"]
  }
}
```

This kind of library declaration determines which public symbols belong in the specification scope before any component-level details are normalized.

### Example 2 — metadata grammar

```json
{
  "component": "sample.library.Button",
  "metadata": {
    "properties": {
      "text": {"type": "string"},
      "enabled": {"type": "boolean", "defaultValue": true}
    },
    "associations": {
      "ariaLabelledBy": {"type": "sap.ui.core.Control", "multiple": true}
    },
    "events": {
      "press": {}
    }
  }
}
```

The metadata block expresses the formal contract that later specification sections reuse for component, state, interaction, and accessibility rules.

### Example 3 — supporting evidence

- `api.json` may project the same `press` event and `enabled` property into a machine-readable format for tooling.
- Automated tests may verify that disabling the button suppresses activation behavior.
- Neither artifact may expand the contract beyond what the public runtime metadata already declares.

## JSON Mapping

- `specification.sections[0]` in `/openui.json`
