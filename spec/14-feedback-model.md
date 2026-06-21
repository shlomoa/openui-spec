# 14. Feedback Model

**Purpose:** Define how user-visible feedback is modeled.

**Derived from traversal nodes:** `library-component-catalog`, `event-model`

## Specification

- The framework must expose components for busy, message, dialog, and empty-state feedback patterns.
- Feedback components must be addressable through the same public metadata contract as all other components.
- Action completion, failure, and warning scenarios must be representable through public events and state.
- Busy and loading feedback must be modeled as public component state, such as a `busy` property and an optional `busyIndicatorDelay`, rather than hidden renderer behavior.
- Message feedback must declare a semantic severity (`information`, `success`, `warning`, or `error`) so applications and assistive technology can convey outcome meaning.
- Dialog-based feedback must expose owned content aggregations and public `confirm` and `cancel` action events so the resolution of a blocking decision is observable.
- Empty-state feedback must be a public, addressable component that communicates the absence of data and any optional recovery actions.
- Feedback components must declare accessibility live-region semantics so outcomes are announced to assistive technology without custom DOM scripting.

## Non-goals

- The feedback model does not prescribe a specific renderer, animation, timing curve, or visual styling for feedback surfaces.
- The feedback model does not define application-specific message text, severity thresholds, or business rules for when feedback is triggered.
- The feedback model does not replace the interaction, state, accessibility, or component-model sections; it reuses their contracts for events, state, live regions, and public metadata.

## Tags

- `busy-state-feedback` — busy and loading feedback is modeled as public component state, such as a busy property and busy-indicator delay, instead of hidden renderer behavior.
- `message-severity` — message feedback declares a semantic severity (`information`, `success`, `warning`, or `error`) that conveys the outcome meaning of an action.
- `dialog-feedback-contract` — dialog feedback exposes owned content aggregations and public `confirm` and `cancel` events for resolving blocking decisions.
- `empty-state-feedback` — empty-state feedback is a public, addressable component that communicates the absence of data and optional recovery actions.
- `feedback-live-region` — feedback components declare accessibility live-region semantics so outcomes are announced to assistive technology.
- `outcome-event-state` — action completion, failure, and warning outcomes are representable through public events and public state.

## Formal definitions

- **Feedback component** — a public, catalog-addressable component whose purpose is to communicate the status or outcome of an operation to the user.
- **Busy state** — a public boolean component state indicating that an operation is in progress and that interaction with the affected region is suspended.
- **Message** — a feedback notification carrying a severity and text that reports the outcome of an action to the user.
- **Severity** — the semantic level of a message, one of `information`, `success`, `warning`, or `error`.
- **Dialog feedback** — a modal feedback component that owns its content through aggregations and resolves a blocking decision through public `confirm` and `cancel` events.
- **Empty state** — a feedback component that communicates the absence of data and may offer recovery actions.
- **Live region** — an accessibility contract describing how a feedback component's updates are announced, such as `polite` or `assertive` politeness.

## Usage and implementation guidance

- Model loading and in-flight operations through a public busy state instead of hidden spinners, and pair long operations with a busy-indicator delay to avoid flicker.
- Choose message severity from the outcome of an action: `success` for completion, `warning` for recoverable issues, `error` for failure, and `information` for neutral status.
- Use dialog feedback for blocking decisions that must be resolved before continuing, and expose the resolution through public `confirm` and `cancel` events.
- Use empty-state feedback when a data region has no content, and offer a recovery action so the user can proceed.
- Declare live-region politeness and roles in metadata so transient messages are announced by assistive technology without custom DOM scripting.
- Reuse existing contracts: feedback events follow the interaction model, busy follows the state model, and announcements follow the accessibility model.

## Examples

### Example 1 — busy-state feedback

```json
{
  "component": "sample.library.BusyContainer",
  "metadata": {
    "properties": {
      "busy": { "type": "boolean", "defaultValue": false, "bindable": true },
      "busyIndicatorDelay": { "type": "int", "defaultValue": 1000 }
    },
    "aggregations": {
      "content": { "type": "sap.ui.core.Control", "multiple": true }
    }
  }
}
```

Busy feedback is modeled as public state: applications toggle the bindable `busy` property while an operation is in flight, and the `busyIndicatorDelay` avoids flicker for fast operations instead of relying on hidden renderer spinners.

### Example 2 — message severity and live region

```json
{
  "component": "sample.library.Message",
  "metadata": {
    "properties": {
      "severity": {
        "type": "sample.library.MessageSeverity",
        "defaultValue": "information",
        "visibility": "public"
      },
      "text": { "type": "string", "defaultValue": "", "bindable": true },
      "ariaLive": {
        "type": "sample.library.AriaLive",
        "defaultValue": "polite"
      }
    },
    "events": {
      "close": { "parameters": {} }
    }
  }
}
```

A message declares its `severity` so success, warning, error, and information outcomes are distinguishable, and an `ariaLive` politeness so assistive technology announces the message text without custom DOM scripting.

### Example 3 — dialog confirmation feedback

```json
{
  "component": "sample.library.ConfirmationDialog",
  "metadata": {
    "properties": {
      "title": { "type": "string", "defaultValue": "" },
      "open": { "type": "boolean", "defaultValue": false, "bindable": true }
    },
    "aggregations": {
      "content": { "type": "sap.ui.core.Control", "multiple": true },
      "actions": { "type": "sap.ui.core.Control", "multiple": true }
    },
    "events": {
      "confirm": { "parameters": {} },
      "cancel": { "parameters": {} }
    }
  }
}
```

A confirmation dialog owns its `content` and `actions` through aggregations and resolves the blocking decision through public `confirm` and `cancel` events, so the outcome is observable without depending on renderer-specific callbacks.

### Example 4 — generator empty-state and notification

```typescript
@Component({
  selector: "sample-orders-view",
  imports: [MatButtonModule, MatProgressBarModule, MatSnackBarModule],
  template: `
    @if (busy()) {
      <mat-progress-bar mode="indeterminate" aria-label="Loading orders" />
    } @else if (orders().length === 0) {
      <div class="empty-state" role="status">
        <p>No orders found.</p>
        <button mat-stroked-button type="button" (click)="createOrder()">
          Create order
        </button>
      </div>
    }
  `,
})
export class OrdersViewComponent {
  protected readonly busy = signal(false);
  protected readonly orders = signal<readonly Order[]>([]);

  constructor(private readonly snackBar: MatSnackBar) {}

  protected createOrder(): void {
    this.snackBar.open("Order created", undefined, {
      politeness: "polite",
    });
  }
}
```

A generator maps the busy, empty-state, and message feedback contracts onto the host framework: busy state drives a loading affordance, the empty state is a public no-data view with a recovery action, and a success message becomes a live-region notification.

## JSON Mapping

- `specification.sections[13]` in `/openui.json`
