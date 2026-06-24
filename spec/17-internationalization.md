# 17. Internationalization

**Purpose:** Describe locale and translation requirements.

## Specification

- Libraries must provide translatable message resources for public UI text.
- Locale-aware rendering must support right-to-left and left-to-right presentation where applicable.
- Public text-bearing components must expose text direction and translatable labels through explicit metadata.
- Translatable public text must be referenced through stable message keys resolved from locale-specific message resource bundles rather than hard-coded literals.
- Message resource bundles must resolve through a deterministic locale fallback chain from the most specific locale to a default bundle.
- Locale-sensitive values such as dates, numbers, and currencies must render through typed, locale-aware formatting rather than fixed presentation.
- The active locale and text direction must be externally configurable application-level settings that components inherit rather than hard-code.
- Translatable properties must be marked in public metadata so tooling can extract message keys and reconstruct localized output without reading renderer internals.

## Non-goals

- The internationalization model does not mandate a specific message-bundle file format, translation workflow, or translation management system.
- The internationalization model does not define how translated strings are authored, reviewed, or stored; it only constrains how they are referenced and resolved through the public contract.
- The internationalization model does not replace the accessibility, theming, or layout rules, but it constrains how those contracts expose translatable text, locale, and direction.

## Tags

- `translatable-text` — public text-bearing properties reference translatable message keys instead of hard-coded literals.
- `message-resource-bundle` — locale-specific message bundles supply translated text resolved by message key.
- `locale-fallback` — message resolution follows a deterministic fallback chain from the most specific locale to a default bundle.
- `locale-aware-formatting` — typed values such as dates, numbers, and currencies render according to the active locale.
- `text-direction` — text direction is a declarable public property with `LTR`, `RTL`, and `Inherit` values for bidirectional content.
- `locale-configuration` — the active locale and direction are externally configurable application settings that components inherit.

## Formal definitions

- **Message resource bundle** — a locale-specific set of key-to-text entries that supplies translated public text resolved by message key.
- **Message key** — a stable identifier that references a translatable string in a message resource bundle, decoupling the public text from any single literal.
- **Locale** — the language and regional identifier (such as `en`, `de`, or `ar-EG`) that selects message bundles and locale-aware formatting.
- **Locale fallback** — the deterministic resolution order from the most specific locale to a default bundle, used when a key is missing for the active locale.
- **Translatable property** — a property marked in public metadata as carrying user-facing text, signalling that its value is a message key resolved from a bundle.
- **Text direction** — a public property declaring `LTR`, `RTL`, or `Inherit` so bidirectional text renders deterministically from the public contract.

## Usage and implementation guidance

- Reference user-facing text through message keys resolved from message resource bundles, and reserve literal text for non-translatable technical identifiers.
- Mark text-bearing properties as translatable in public metadata so extractors can collect message keys without scraping rendered output.
- Ship one message bundle per supported locale and rely on the locale fallback chain so a missing translation degrades to a less specific bundle rather than failing.
- Render dates, numbers, and currencies through typed locale-aware formatting bound to the active locale instead of formatting values with fixed patterns.
- Inherit the active locale and `textDirection` from application-level configuration, overriding direction only for content whose direction differs from its surrounding context.

## Examples

### Example 1 — translatable property and message bundle

```json
{
  "component": "sap.m.Button",
  "properties": {
    "text": { "value": "order.submit", "translatable": true }
  },
  "messageBundle": {
    "en": { "order.submit": "Submit order" },
    "de": { "order.submit": "Bestellung absenden" }
  }
}
```

The button's `text` property is marked `translatable` and carries a message key; each locale bundle resolves the key to localized text instead of hard-coding a literal.

### Example 2 — locale fallback resolution

```json
{
  "locale": "de-AT",
  "fallback": ["de-AT", "de", "en"],
  "messageBundles": {
    "de": { "order.submit": "Bestellung absenden" },
    "en": { "order.submit": "Submit order", "order.cancel": "Cancel" }
  },
  "resolved": {
    "order.submit": "Bestellung absenden",
    "order.cancel": "Cancel"
  }
}
```

With active locale `de-AT`, resolution walks the fallback chain: `order.submit` resolves from the `de` bundle, while the missing `order.cancel` degrades to the `en` default rather than failing.

### Example 3 — locale-aware value formatting

```json
{
  "component": "sap.m.Text",
  "properties": {
    "text": { "value": 1234.5, "type": "Float", "formatLocale": "de-DE" }
  },
  "rendered": "1.234,5"
}
```

A numeric value renders through typed locale-aware formatting: under `de-DE` the same `1234.5` becomes `1.234,5`, so presentation follows the active locale instead of a fixed pattern.

### Example 4 — generator internationalization binding

```typescript
@Component({
  selector: "app-order-actions",
  imports: [MatButtonModule],
  template: `
    <button
      mat-raised-button
      color="primary"
      type="button"
      [attr.dir]="direction()"
    >
      {{ messages.submit() }}
    </button>
  `,
})
export class OrderActionsComponent {
  // property text: string (translatable: message key "order.submit")
  protected readonly messages = inject(OrderMessages);
  // textDirection inherited from the active locale (RTL for ar, LTR otherwise)
  readonly direction = input<"ltr" | "rtl">("ltr");
}
```

The generator maps the translatable `text` property to a resolved message accessor and binds text direction to the active locale, preserving the localized text and direction from the public contract.
