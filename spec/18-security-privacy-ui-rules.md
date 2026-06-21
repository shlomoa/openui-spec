# 18. Security / Privacy UI Rules

**Purpose:** State UI-facing security and privacy constraints.

**Derived from traversal nodes:** `renderer-dnd-model`, `reference-component-button`

## Specification

- Public component contracts must not rely on unsafe renderer side effects for user-visible semantics.
- Components that open or reference popups must declare that relationship explicitly through public metadata.
- Implementations should encode or sanitize user-provided visual values before they affect rendering or styling.
- User-provided text, URLs, and style values are untrusted input: text is encoded, URLs are validated against an allow list, and style or class values are constrained to a known vocabulary before they affect rendering.
- Components that reveal sensitive values must expose a public masking contract, such as a masked display mode, so the rendered output does not disclose the underlying value by default.
- Actions that delete data, send data to a third party, or are otherwise irreversible must request explicit confirmation through a public confirmation contract rather than acting on first activation.
- Visibility and enablement driven by permissions are part of the public contract: a component hidden or disabled for authorization reasons must not expose its restricted value, action, or popup target to the user.

## Non-goals

- The security model does not define an authentication, authorization, session, or transport-security protocol; it constrains only how the resulting decisions are reflected in the UI contract.
- The security model does not standardize a specific sanitizer, content-security-policy header, or cryptographic algorithm; it requires that untrusted values are encoded or validated, not which library performs it.
- The security model does not replace server-side authorization checks; client-side visibility, masking, and confirmation are UI safeguards layered on top of enforced server rules, never a substitute for them.
- The security model does not redefine the accessibility, feedback, or navigation contracts; it adds security and privacy constraints to the names, states, popups, and overlays those sections already describe.

## Tags

- `safe-rendering` — user-visible semantics come from the public contract and encoded values, never from unsafe renderer side effects such as injecting unescaped HTML.
- `untrusted-input-encoding` — user-provided text, URLs, and style values are encoded, validated against an allow list, or constrained to a known vocabulary before they affect rendering or styling.
- `popup-disclosure` — components that open or reference popups, menus, or external targets declare that relationship through public metadata so navigation away from or over the current context is never hidden.
- `sensitive-value-masking` — components that present sensitive values expose a public masking mode so the rendered output does not disclose the underlying value by default.
- `confirmation-contract` — irreversible or sensitive actions request explicit confirmation through a public contract instead of acting on first activation.
- `permission-gating` — permission-driven visibility and enablement are part of the public contract, and a restricted component must not leak its value, action, or popup target.

## Formal definitions

- **Unsafe renderer side effect** — any renderer behavior that produces user-visible semantics outside the public contract, such as writing unescaped user input as markup, that the specification forbids for contractually meaningful output.
- **Untrusted value** — a text, URL, style, or class value that originates from user input or an external model and must be encoded, validated, or constrained before it affects rendering.
- **Popup disclosure** — public metadata, such as a popup semantics property or an `opens` reference, that declares a component opens or references a popup, menu, or external target.
- **Masking mode** — a public property that controls whether a sensitive value is rendered in cleartext or in a masked representation that does not disclose the underlying value.
- **Confirmation contract** — the public properties and events through which a component requests and receives explicit confirmation before performing an irreversible or sensitive action.
- **Permission gate** — the public visibility and enablement state derived from an authorization decision, which removes a restricted value, action, or popup target from the user-facing contract.

## Usage and implementation guidance

- Render user-provided text through encoded output and never as raw markup; reserve any raw-HTML rendering for values the application has already sanitized and treat that path as opt-in, not the default.
- Validate user-provided or model-provided URLs against an allow list of permitted schemes before binding them to navigation, image, or link targets, and constrain user-provided style or class values to a fixed vocabulary instead of interpolating arbitrary strings.
- Declare popup, menu, and external-target relationships through public metadata such as `ariaHasPopup` and an `opens` reference so the disclosure is part of the contract and assistive technology and tests can detect it.
- Expose a masking mode for components that present passwords, tokens, or other sensitive values, default it to masked, and require explicit user action to reveal the value.
- Gate irreversible or sensitive actions behind a confirmation contract, and gate restricted values, actions, and popup targets on the permission-driven visibility and enablement state so a hidden or disabled control never exposes what it protects.

## Examples

### Example 1 — safe rendering of untrusted text and URLs

```json
{
  "component": "sap.m.Text",
  "properties": {
    "text": { "type": "string", "value": "<script>alert(1)</script>" },
    "rendering": { "encode": "text" }
  }
}
```

```json
{
  "component": "sap.m.Link",
  "properties": {
    "href": { "type": "sap.ui.core.URI", "value": "javascript:alert(1)" },
    "validation": { "urlAllowList": ["http", "https", "mailto"] }
  }
}
```

User-provided text is rendered through encoded output (`encode: "text"`), so markup such as `<script>` is shown literally instead of executed. A user-provided URL is checked against an allow list of permitted schemes, so a `javascript:` URL is rejected before it reaches the rendered `href`.

### Example 2 — popup disclosure through public metadata

```json
{
  "component": "sample.library.OrderActions",
  "metadata": {
    "properties": {
      "ariaHasPopup": {
        "type": "sap.ui.core.aria.HasPopup",
        "defaultValue": "None"
      }
    }
  },
  "state": {
    "ariaHasPopup": "menu"
  },
  "opens": "orderActionsMenu"
}
```

The component declares through public metadata that activation opens a popup: `ariaHasPopup` is `menu` and an `opens` reference names the menu it controls. The relationship is part of the contract, so the user is never silently taken into a popup or external target.

### Example 3 — sensitive-value masking contract

```json
{
  "component": "sap.m.Input",
  "metadata": {
    "properties": {
      "value": { "type": "string", "defaultValue": "" },
      "masked": { "type": "boolean", "defaultValue": true }
    }
  },
  "state": {
    "value": "S3cret-Token",
    "masked": true
  },
  "rendered": "••••••••••••"
}
```

A field that presents a sensitive value exposes a public `masked` property that defaults to `true`, so the rendered output (`••••••••••••`) does not disclose the underlying value. Revealing the value requires an explicit change to the public masking state.

### Example 4 — confirmation and permission gating

```json
{
  "component": "sample.library.DeleteOrderButton",
  "metadata": {
    "properties": {
      "visible": { "type": "boolean", "defaultValue": true },
      "enabled": { "type": "boolean", "defaultValue": true },
      "requiresConfirmation": { "type": "boolean", "defaultValue": true }
    },
    "events": {
      "confirm": {
        "description": "Fired after the user explicitly confirms the irreversible action.",
        "parameters": {}
      }
    }
  },
  "permission": {
    "canDelete": false,
    "visible": false
  }
}
```

The destructive action declares `requiresConfirmation`, so first activation requests confirmation and only the public `confirm` event performs the deletion. Because the permission decision (`canDelete: false`) drives `visible` to `false`, the restricted action and its target are removed from the user-facing contract rather than merely styled as disabled.

### Example 5 — generator output enforcing the security contract

```typescript
@Component({
  selector: "sample-order-actions",
  imports: [MatButtonModule, MatDialogModule],
  template: `
    @if (canDelete()) {
      <button
        mat-raised-button
        color="warn"
        type="button"
        aria-haspopup="dialog"
        (click)="requestDelete()"
      >
        Delete order
      </button>
    }
  `,
})
export class OrderActionsComponent {
  // Permission gate: the restricted action is omitted, not just disabled.
  readonly canDelete = input(false);

  private readonly dialog = inject(MatDialog);

  requestDelete(): void {
    // Confirmation contract: the irreversible action runs only after explicit confirmation.
    this.dialog
      .open(ConfirmDeleteDialogComponent)
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.deleteOrder();
        }
      });
  }

  private deleteOrder(): void {}
}
```

The generator preserves the security contract: the permission gate omits the restricted control with `@if`, the popup disclosure maps to `aria-haspopup`, and the confirmation contract routes the irreversible action through an explicit confirmation dialog before it runs.

## JSON Mapping

- `specification.sections[17]` in `/openui.json`
