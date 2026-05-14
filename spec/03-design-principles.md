# 03. Design Principles

**Purpose:** Capture the principles used to normalize OpenUI5 concepts into a reusable framework specification.

**Derived from traversal nodes:** `metadata-grammar-root`, `api-json-projection`

## Specification

- Prefer public library catalogs and runtime metadata over private implementation details, renderer internals, or undocumented helper code.
- Separate scope discovery (`library.js`) from semantic interpretation (metadata grammar) and from secondary API projections such as `api.json`.
- Normalize OpenUI5 concepts into canonical JSON without losing public names, types, multiplicity, defaults, visibility, or declared relationships.
- Specify observable framework capabilities and constraints rather than prescribing a specific renderer, widget lifecycle, build pipeline, or source layout.
- Treat design-time metadata, generated API projections, and automated tests as supporting evidence that can refine validation and documentation but cannot override the public runtime contract.
- Require opt-in semantics for specialized behavior: renderer linkage, drag-and-drop support, accessibility relationships, and similar features belong in the specification only when they are publicly declared.

## Non-goals

- The design principles do not require consumers to parse private source files, infer behavior from renderer code, or reverse-engineer undocumented conventions.
- The design principles do not standardize framework-internal class hierarchies, optimization strategies, or build-time packaging details unless those details are surfaced through the public contract.
- The design principles do not treat convenience projections such as `api.json` as a replacement for `library.js` discovery or managed object metadata.

## Tags

- `public-contract-first` — normative specification entries come from publicly declared libraries and metadata before any private implementation details or generated projections are considered.
- `layered-evidence-model` — library catalogs, metadata grammar, API projections, design-time metadata, and tests each have distinct roles and must not be conflated.
- `lossless-normalization` — extraction must preserve the meaning of public metadata when converting framework concepts into canonical JSON.
- `implementation-agnostic-semantics` — the specification defines observable framework behavior without binding compliant implementations to a specific rendering or build strategy.
- `declared-capabilities-only` — specialized behavior enters the specification only when it is explicitly declared in public metadata or equally authoritative public artifacts.

## Formal definitions

- **Public contract precedence** — the rule that publicly declared library and metadata artifacts outrank private code paths, renderer internals, and generated documentation when determining normative specification content.
- **Layered evidence model** — a source hierarchy in which `library.js` discovers scope, metadata grammar defines semantics, and projections such as `api.json`, design-time metadata, and tests provide corroborating evidence.
- **Lossless normalization** — the transformation of framework metadata into canonical JSON while preserving public names, typing, multiplicity, defaults, visibility, and declared relationships.
- **Implementation-agnostic semantics** — externally observable framework requirements expressed independently of any concrete rendering technology, lifecycle implementation, or source-code organization.
- **Declared capability** — a framework feature or behavior that is eligible for specification only because it is explicitly exposed through public metadata or another authoritative public contract artifact.

## Usage and implementation guidance

- Use these principles whenever extracting a new section from OpenUI5: determine scope from `library.js`, interpret meaning from metadata grammar, then use `api.json`, design-time metadata, or tests only to confirm or operationalize the extracted contract.
- When normalizing metadata into `/openui.json`, preserve authored identifiers, public types, multiplicity flags, defaults, visibility, associations, and events rather than replacing them with generator-specific abstractions.
- If a behavior appears only in renderer code, helper utilities, or undocumented conventions, treat it as non-normative unless an authoritative public artifact also declares it.
- Record specialized capabilities only when the public contract explicitly exposes them, so downstream generators and validators can rely on deterministic, opt-in semantics.
- Use the layered evidence model to resolve disagreements: public runtime metadata remains authoritative, while projections and tests help validate completeness, examples, or compliance rules.

## Examples

### Example 1 — layered evidence and precedence

```json
{
  "library": {
    "name": "sample.library",
    "controls": ["sample.library.Form"]
  },
  "component": {
    "name": "sample.library.Form",
    "metadata": {
      "properties": {
        "editable": {"type": "boolean", "defaultValue": false}
      }
    }
  }
}
```

If `api.json` also lists `editable`, the projection confirms the same public contract; if a private helper adds undocumented state, that helper does not expand the specification.

### Example 2 — lossless normalization

```json
{
  "component": "sample.library.Form",
  "normalizedMetadata": {
    "properties": {
      "editable": {"type": "boolean", "defaultValue": false}
    },
    "aggregations": {
      "content": {"type": "sample.library.FormElement", "multiple": true}
    },
    "associations": {
      "ariaLabelledBy": {"type": "sap.ui.core.Control", "multiple": true}
    }
  }
}
```

This normalized shape follows the principles because it preserves the public names, types, and multiplicity declared by metadata instead of collapsing them into generator-specific shortcuts.

### Example 3 — declared capabilities only

- A component may expose drag-and-drop behavior only when its public metadata declares drag-and-drop support.
- A renderer implementation detail such as a private DOM wrapper class is excluded because it is not part of the public contract.
- A design-time annotation may add authoring guidance, but it becomes normative only if it matches or supplements an authoritative public declaration instead of contradicting it.

## JSON Mapping

- `specification.sections[2]` in `/openui.json`
