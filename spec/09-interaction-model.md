# 09. Interaction Model

**Purpose:** Describe how user interaction is represented in the specification.

**Derived from traversal nodes:** `event-model`, `reference-component-button`

## Specification

- User-triggered behavior is modeled as named events with stable semantics, such as `press` for activation.
- Interaction rules must account for enabled and disabled states, pointer activation, and keyboard activation.
- Deprecated interaction aliases may be documented for compatibility but must not replace the current public event contract.
- Interaction events describe component-level intent rather than raw browser gestures, so a single event can normalize pointer, touch, keyboard, and assistive-technology activation.
- Event metadata must declare the event name, owning component, optional parameters, cancellation semantics, and the state preconditions that allow the event to fire.
- Controls that expose action semantics must document how default activation keys and pointer gestures map to the public event while preserving accessibility expectations.
- Application handlers attach to the public event contract and must not depend on private DOM events, renderer internals, or browser-specific event ordering.

## Non-goals

- The interaction model does not standardize private browser event listeners, renderer implementation details, or DOM event propagation order.
- The interaction model does not require every component to expose an activation event; passive display controls may have no user-triggered behavior.
- The interaction model does not replace accessibility, form validation, navigation, or feedback rules, but it supplies the event contract those sections can reference.

## Tags

- `semantic-interaction-event` — public events describe framework-level user intent rather than raw DOM gestures.
- `activation-event-contract` — action controls expose a stable activation event such as `press` for application handlers.
- `enabled-state-gating` — disabled controls suppress public interaction events for pointer, touch, keyboard, and assistive activation paths.
- `pointer-keyboard-equivalence` — equivalent pointer and keyboard activation paths produce the same public event when the control is enabled.
- `compatibility-alias` — legacy or deprecated event names may be documented as aliases, but the current public event remains normative.

## Formal definitions

- **Interaction event** — a public component event that represents user-triggered intent in framework terms rather than a raw browser event.
- **Activation event** — an interaction event that represents intentional activation of an action control, commonly named `press` for button-like controls.
- **Interaction source** — the input path that caused an interaction event, such as pointer click, touch tap, keyboard activation, or assistive technology action.
- **Enabled gate** — the state precondition that allows a control to translate an interaction source into a public interaction event.
- **Compatibility alias** — a legacy event name or interaction term retained for documentation or migration while delegating normative behavior to the current event contract.

## Usage and implementation guidance

- Use interaction events when documenting application-observable behavior, and reserve raw DOM event names for implementation notes or test fixtures.
- Define action controls around a single public activation event so applications can handle pointer, touch, keyboard, and assistive activation consistently.
- Check enabled and disabled state before dispatching public interaction events; disabled controls must not call application handlers through alternate activation paths.
- Preserve event parameter names, types, optionality, and cancellation semantics in `/openui.json` so generators and tests can create stable handler signatures.
- Document compatibility aliases only when they are part of the supported public surface, and point consumers to the current event name for new implementations.

## Examples

### Example 1 — button activation event contract

```json
{
  "component": "sap.m.Button",
  "events": {
    "press": {
      "kind": "activation",
      "description": "Fired when the enabled button is activated by pointer, touch, keyboard, or assistive technology.",
      "sources": ["pointer", "touch", "keyboard", "assistive-technology"],
      "enabledRequired": true,
      "parameters": {}
    }
  }
}
```

The `press` event is the public interaction contract. Applications handle `press` instead of depending on browser-specific `click`, `keydown`, or touch listeners.

### Example 2 — enabled-state gating for activation

```json
{
  "component": "sap.m.Button",
  "state": {
    "enabled": false
  },
  "interaction": {
    "source": "keyboard",
    "key": "Enter",
    "publicEvent": null,
    "reason": "Disabled controls do not dispatch activation events."
  }
}
```

This example shows that the disabled state blocks public event dispatch regardless of the input source.

### Example 3 — generated handler binding

```typescript
@Component({
  selector: "sample-save-action",
  template: `
    <button type="button" [disabled]="isSaving" (click)="save()">Save</button>
  `,
})
export class SaveActionComponent {
  protected isSaving = false;

  protected save(): void {
    if (this.isSaving) {
      return;
    }

    this.isSaving = true;
  }
}
```

A generator may map the specification's activation event to the host framework's canonical binding, provided it preserves the enabled gate and exposes one stable application handler path.

## JSON Mapping

- `specification.sections[8]` in `/openui.json`
