# 10. State Model

**Purpose:** Describe state held or exposed by components.

**Derived from traversal nodes:** `property-model`, `visibility-default-model`

## Specification

- Component state is represented by typed properties with explicit default values.
- State may be public or hidden, but only public state participates in the external component contract.
- Defaulted state and derived state must remain compatible with the declared metadata type system.
- State-related metadata must preserve property type, default value, visibility, and deprecation information so generators can produce safe accessors and validators.
- Hidden or derived implementation state must not be used as the only source for application-visible behavior when an equivalent public property is declared.

## Non-goals

- The state model does not define data-binding syntax, binding lifecycle, or model update timing; those rules belong to the data binding model.
- The state model does not prescribe renderer internals, DOM attributes, or CSS classes used to realize a public state.
- The state model does not require hidden state to be documented as part of the public API.

## Tags

- `metadata-property-state` — component state is declared through metadata properties rather than inferred from private fields.
- `explicit-default-state` — every normalized state property records the value used before applications set a different value.
- `public-state-contract` — public state defines the accessor, binding, documentation, and compatibility surface exposed to applications.
- `hidden-internal-state` — hidden state may support implementation details but does not become part of the external component contract.
- `derived-state-compatibility` — computed or normalized state remains valid only when it is compatible with the declared property type and default.

## Formal definitions

- **Component state** — the observable configuration or condition of a component represented by metadata-declared properties and their current values.
- **Public state** — component state with public visibility, including properties that omit an explicit visibility value when the metadata grammar treats public as the default.
- **Hidden state** — metadata-declared state marked as hidden or otherwise internal so it can be used by implementations without becoming application-facing API.
- **Default value** — the initial value for a state property before application code, binding, or framework logic assigns another compatible value.
- **Derived state** — state computed from one or more declared values, such as normalized enabled, visible, or validation state, that must remain type-compatible with the public contract it reflects.

## Usage and implementation guidance

- Use typed properties for component states such as `text`, `enabled`, `visible`, `selected`, `value`, `valueState`, `busy`, or `width` whenever those states are part of the public contract.
- Preserve explicit defaults when normalizing metadata into `/openui.json`; if source metadata relies on a framework default, record the resolved value used by conforming implementations.
- Treat `visibility: "hidden"` state as implementation detail: generators may keep it out of public APIs, documentation, and examples unless a compliance rule explicitly requires otherwise.
- Validate default values, assigned values, and derived values against the declared metadata type so boolean, string, enum, numeric, object, and array states remain predictable.
- Keep state semantics separate from events: a state property describes the current condition, while events describe the interaction or lifecycle transitions that may change it.

## Examples

### Example 1 — public typed state with defaults

```json
{
  "component": "sample.library.Button",
  "metadata": {
    "properties": {
      "text": { "type": "string", "defaultValue": "" },
      "enabled": { "type": "boolean", "defaultValue": true },
      "visible": { "type": "boolean", "defaultValue": true },
      "type": {
        "type": "sample.library.ButtonType",
        "defaultValue": "Default"
      }
    }
  }
}
```

This component exposes public state through typed properties. The empty `text`, enabled and visible boolean values, and default button type all define stable initial behavior for applications and generators.

### Example 2 — hidden state excluded from the public contract

```json
{
  "component": "sample.library.Tokenizer",
  "metadata": {
    "properties": {
      "selected": { "type": "boolean", "defaultValue": false },
      "_lastMeasuredWidth": {
        "type": "int",
        "defaultValue": 0,
        "visibility": "hidden"
      }
    }
  }
}
```

The `selected` property is public state. The hidden `_lastMeasuredWidth` value may support rendering or layout optimization, but tooling must not treat it as application-facing API.

### Example 3 — derived validation state remains type-compatible

```json
{
  "component": "sample.library.Input",
  "metadata": {
    "properties": {
      "value": { "type": "string", "defaultValue": "" },
      "required": { "type": "boolean", "defaultValue": false },
      "valueState": {
        "type": "sample.library.ValueState",
        "defaultValue": "None"
      }
    },
    "derivedState": {
      "effectiveValueState": {
        "from": ["required", "value", "valueState"],
        "type": "sample.library.ValueState"
      }
    }
  }
}
```

The derived `effectiveValueState` can combine required-field and explicit validation state, but it still returns the declared `ValueState` enum so consumers receive a predictable state value.

## JSON Mapping

- `specification.sections[9]` in `/openui.json`
