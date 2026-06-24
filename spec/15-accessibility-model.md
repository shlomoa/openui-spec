# 15. Accessibility Model

**Purpose:** Capture accessibility requirements visible in the public contract.

## Specification

- Components must support accessible naming and description relationships through public associations or equivalent metadata.
- Accessibility roles, popup semantics, and text direction must be declarable as typed public state when applicable.
- Keyboard activation and focus behavior are compliance-relevant parts of the interaction contract.
- Accessible naming relationships use non-owning associations such as `ariaLabelledBy` and `ariaDescribedBy`, so a control can reference labelling or describing controls without owning them.
- The accessible name and accessible description are computed from public metadata first, falling back to associated controls, owned text, and finally a literal `tooltip` or label property when no association is present.
- Roles, landmark semantics, and popup semantics such as `ariaHasPopup` must be exposed as typed public state so assistive technology receives the same intent the application declared.
- Text direction must be a declarable public property with `LTR`, `RTL`, and `Inherit` values so bidirectional content renders predictably without reading renderer internals.
- Action controls must remain operable through keyboard activation and expose a visible, ordered focus target so pointer and keyboard users reach the same public interaction contract.

## Non-goals

- The accessibility model does not redefine ARIA roles, states, or properties; it maps the public contract onto the established accessibility semantics rather than inventing new ones.
- The accessibility model does not standardize private renderer markup, generated DOM attribute order, or platform screen-reader announcement wording.
- The accessibility model does not replace the interaction, form, navigation, or feedback rules, but it constrains how those contracts expose names, roles, focus, and direction to assistive technology.

## Tags

- `accessible-name-association` — `ariaLabelledBy` and `ariaDescribedBy` are non-owning associations that supply the accessible name and description from other controls.
- `semantic-role-state` — roles and landmark semantics are declared as typed public state rather than inferred from renderer markup.
- `popup-semantics` — controls that open overlays declare popup semantics such as `ariaHasPopup` so assistive technology can announce the expandable relationship.
- `text-direction` — text direction is a declarable public property with `LTR`, `RTL`, and `Inherit` values for bidirectional content.
- `keyboard-focus-contract` — keyboard activation and focus order are part of the public, compliance-relevant interaction contract.

## Formal definitions

- **Accessible name** — the short label exposed to assistive technology, computed from `ariaLabelledBy` associations, owned text, or a literal label property when no association is present.
- **Accessible description** — supplementary text exposed to assistive technology through `ariaDescribedBy` associations or an equivalent description property.
- **Labelling association** — a non-owning association such as `ariaLabelledBy` that references other controls supplying the accessible name without taking ownership of them.
- **Semantic role** — typed public state declaring the role, landmark, or popup semantics that assistive technology should report for the control.
- **Text direction** — a public property declaring `LTR`, `RTL`, or `Inherit` so bidirectional text renders deterministically from the public contract.

## Usage and implementation guidance

- Provide an accessible name through an `ariaLabelledBy` association when a visible label control exists, and reserve literal label or `tooltip` properties for controls that have no on-screen labelling control.
- Attach supplementary help, hint, or error text through `ariaDescribedBy` associations so the description stays linked to the control even when the text moves in the layout.
- Declare roles, landmark semantics, and popup semantics such as `ariaHasPopup` as typed public state so generators emit the correct ARIA attributes without inspecting renderer internals.
- Set `textDirection` to `Inherit` by default and only override it to `RTL` or `LTR` for content whose direction differs from the surrounding context.
- Keep keyboard activation equivalent to pointer activation for action controls, preserve a logical focus order, and ensure disabled controls drop out of the focus order in line with the interaction model enabled gate.

## Examples

### Example 1 — accessible name and description associations

```json
{
  "component": "sap.m.Input",
  "associations": {
    "ariaLabelledBy": ["customerNameLabel"],
    "ariaDescribedBy": ["customerNameHint"]
  },
  "accessibleName": "Customer name",
  "accessibleDescription": "Use the registered legal name."
}
```

The input owns neither the label nor the hint; `ariaLabelledBy` and `ariaDescribedBy` are non-owning associations that compute the accessible name and description from other controls.

### Example 2 — role and popup semantics as typed state

```json
{
  "component": "sap.m.Button",
  "state": {
    "role": "button",
    "ariaHasPopup": "menu"
  },
  "opens": "orderActionsMenu"
}
```

The button declares its role and popup semantics as typed public state, so assistive technology announces that activating it opens a menu without reading renderer markup.

### Example 3 — text direction as a typed public property

```json
{
  "component": "sap.m.Text",
  "properties": {
    "text": "מספר הזמנה 1000123",
    "textDirection": "RTL"
  }
}
```

`textDirection` is a declarable public property; setting it to `RTL` renders bidirectional content deterministically, while the default `Inherit` follows the surrounding context.

### Example 4 — generator output preserving the accessibility contract

```typescript
@Component({
  selector: "sample-customer-name",
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field appearance="outline">
      <mat-label id="customer-name-label">Customer name</mat-label>
      <input
        matInput
        [formControl]="customerName"
        [attr.aria-labelledby]="'customer-name-label'"
        [attr.aria-describedby]="'customer-name-hint'"
      />
      <mat-hint id="customer-name-hint"
        >Use the registered legal name.</mat-hint
      >
    </mat-form-field>
  `,
})
export class CustomerNameComponent {
  protected readonly customerName = new FormControl("", { nonNullable: true });
}
```

The generator maps the labelling and describing associations to `aria-labelledby` and `aria-describedby`, preserving the accessible name and description from the public contract.
