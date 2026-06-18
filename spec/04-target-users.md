# 04. Target Users

**Purpose:** Identify the intended consumers of the specification.

**Derived from traversal nodes:** `openui-root`

## Specification

- Application developers use the specification to discover stable component contracts, supported composition patterns, interaction semantics, and state behavior before building application features.
- Designers and UX owners use the specification to align component behavior, layout, feedback, accessibility, and theming expectations across libraries and applications.
- Framework maintainers use the specification as the compatibility baseline that implementation changes must preserve at the public contract level.
- Generator and tooling maintainers use the canonical JSON contract to validate metadata, generate framework-specific scaffolding, and keep derived artifacts synchronized.
- Documentation and compliance authors use the specification to produce consistent guidance, acceptance criteria, and evidence tied to the same public contract.

## Non-goals

- The target users section does not redefine implementation internals for framework contributors working on private runtime code paths.
- The target users section does not replace audience-specific tutorials, design systems, or generator manuals; it identifies how each audience consumes the shared contract.
- The target users section does not authorize one audience to extend the normative contract beyond what `/openui.json` and the synchronized markdown sections declare.

## Tags

- `application-consumer` — application developers consume the specification to understand which public components, states, events, and composition rules they can rely on.
- `design-consumer` — designers and UX owners consume the specification to align interaction, feedback, accessibility, and theming behavior with the documented contract.
- `implementation-consumer` — framework maintainers consume the specification as a compatibility boundary for public runtime behavior.
- `tooling-consumer` — generator, validation, and documentation tooling consume the canonical JSON contract as structured input.
- `shared-contract` — all target users depend on the same normative contract even when they view it through different audience-specific workflows.

## Formal definitions

- **Application developer** — a consumer who builds end-user features by composing public components, states, events, and layout patterns exposed by the specification.
- **Designer / UX owner** — a consumer who uses the specification to align user experience semantics such as labels, feedback, responsiveness, accessibility, and theming expectations.
- **Framework maintainer** — a consumer who evolves an implementation while preserving the externally visible contract defined by the specification.
- **Generator / tooling maintainer** — a consumer who transforms the canonical JSON contract into validation rules, documentation, code generation, or other derived artifacts.
- **Shared contract** — the single normative framework description that all target users reference, regardless of whether they consume it through prose, validation, or tooling workflows.

## Usage and implementation guidance

- Use this section to identify the primary audience for each later specification rule so the level of abstraction stays focused on public behavior rather than internal implementation details.
- When adding or changing entries in `/openui.json`, ensure the canonical JSON remains structured enough for tooling consumers while the markdown prose remains understandable for application and design consumers.
- Treat audience-specific documents, generated APIs, and design references as derived material that must remain consistent with the shared contract instead of redefining it.

## Examples

### Example 1 — application developer usage

```json
{
  "component": "sample.library.Button",
  "metadata": {
    "properties": {
      "text": { "type": "string" },
      "enabled": { "type": "boolean", "defaultValue": true }
    },
    "events": {
      "press": {}
    }
  }
}
```

An application developer uses this contract to know that a button exposes stable text, enabled state, and activation semantics without reading private implementation code.

### Example 2 — designer and UX owner usage

```json
{
  "component": "sample.library.Input",
  "metadata": {
    "properties": {
      "valueState": {
        "type": "sample.library.ValueState",
        "defaultValue": "None"
      }
    },
    "associations": {
      "ariaLabelledBy": { "type": "sap.ui.core.Control", "multiple": true }
    }
  }
}
```

A designer or UX owner uses this contract to align validation feedback and labeling behavior with accessibility and visual design expectations.

### Example 3 — framework and tooling maintainer usage

- A framework maintainer uses the documented `press` event and `enabled` property as compatibility requirements when refactoring runtime internals.
- A generator maintainer maps the same metadata into framework-specific inputs, outputs, and validation helpers.
- A documentation pipeline renders the same canonical section into audience-specific prose without changing the underlying contract.

### Example 4 — documentation and compliance author usage

```json
{
  "section": "04-target-users",
  "audience": "documentation-and-compliance",
  "sourceOfTruth": "/openui.json",
  "artifacts": [
    "authoring-guidance",
    "acceptance-criteria",
    "compliance-evidence"
  ]
}
```

Documentation and compliance authors use the canonical section to derive consistent guidance and trace review or acceptance evidence back to the same normative contract used by other audiences.

## JSON Mapping

- `specification.sections[3]` in `/openui.json`
