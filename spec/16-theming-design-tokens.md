# 16. Theming / Design Tokens

**Purpose:** Describe visual customization requirements.

**Derived from traversal nodes:** `library-catalog-root`

## Specification

- Libraries must support theme-specific assets and shared theme-level styling resources.
- Theme composition must allow base styles plus theme overrides without changing the public component contract.
- Density-aware and theme-aware assets are part of the visual system and must remain externally configurable.
- Visual values must be expressed as named design tokens so themes can re-skin components without editing component markup or logic.
- Themes must be swappable at the application or root scope at runtime, and switching a theme must not require recompiling or changing any component's public contract.
- Density must be selected externally through a root-level mode such as cozy or compact rather than encoded as a per-component property.
- Design tokens must resolve to a defined fallback when a theme does not provide a value, so components render predictably under any theme.
- Theme-specific assets such as images and fonts must be referenced through theme-resolved paths rather than hard-coded URLs so the correct asset loads per theme.

## Non-goals

- The theming model does not define a specific color palette, typography scale, or the visual design of any individual theme; it standardizes how tokens and overrides are structured, not their values.
- The theming model does not standardize private CSS class names, generated stylesheet ordering, or renderer-internal markup used to apply a theme.
- The theming model does not replace the layout, component, or accessibility rules; it constrains how visual values are tokenized and themed without changing those public contracts.

## Tags

- `theme-asset-set` — libraries ship theme-specific assets and shared theme-level styling resources that vary by theme without touching the component contract.
- `theme-composition` — a theme is composed of base styles plus theme overrides, so switching themes never changes a component's public API.
- `design-token` — visual values are expressed as named design tokens, such as theming parameters or CSS custom properties, rather than hard-coded literals.
- `density-aware-styling` — density such as cozy or compact is an externally configurable visual mode applied at a root scope, not a per-component property.
- `external-theme-configuration` — theme and density selection are configured externally at the application or root level and remain swappable at runtime.

## Formal definitions

- **Theme** — a named collection of design-token values and assets that determines the visual appearance of all components without altering their public contract.
- **Design token** — a named, themeable styling value such as a color, spacing, typography, or elevation that is resolved at runtime so components reference the token instead of a literal value.
- **Base styles** — the theme-independent structural styles a component always carries, over which theme overrides are layered.
- **Theme override** — theme-specific token values or assets layered on top of base styles to produce a particular theme's appearance.
- **Density mode** — an externally configurable visual mode such as cozy or compact applied at a root scope to adjust spacing and sizing across components.

## Usage and implementation guidance

- Reference colors, spacing, typography, and elevation through design tokens, such as the Material system CSS custom properties `--mat-sys-primary` and `--mat-sys-on-primary`, instead of literal values so a new theme re-skins the component automatically.
- Keep theme-independent structure in base styles and layer only token values and assets as theme overrides, so the public component contract never changes between themes.
- Apply density at a root scope, for example a `cozy` or `compact` body class, rather than adding density properties to individual components.
- Provide a defined fallback for every design token so components stay legible when a theme omits a value.
- Resolve theme-specific assets through theme-aware paths or tokens so switching themes loads the matching image and font set without code changes.

## Examples

### Example 1 — design tokens instead of literal values

```json
{
  "component": "sap.m.Button",
  "styleTokens": {
    "background": "sapUiButtonBackground",
    "color": "sapUiButtonTextColor",
    "borderRadius": "sapUiButtonBorderCornerRadius"
  }
}
```

The button references named design tokens; switching the theme re-skins it because the tokens resolve to theme-specific values without changing the component contract.

### Example 2 — base styles plus theme override

```json
{
  "component": "sap.m.Panel",
  "baseStyles": {
    "padding": "sapUiContentPadding",
    "borderColor": "sapUiGroupContentBorderColor"
  },
  "themeOverrides": {
    "sap_horizon": { "sapUiGroupContentBorderColor": "#d9d9d9" },
    "sap_horizon_dark": { "sapUiGroupContentBorderColor": "#3a3a3a" }
  }
}
```

Base styles stay constant while each theme layers its own token values, so the panel's public contract is unchanged across the light and dark themes.

### Example 3 — density mode applied at the root scope

```json
{
  "root": "sap.m.App",
  "densityClass": "sapUiSizeCompact",
  "supportedDensities": ["sapUiSizeCozy", "sapUiSizeCompact"]
}
```

Density is selected once at the root scope; every descendant component adapts its spacing through density-aware tokens rather than exposing per-component density properties.

### Example 4 — generator output referencing design tokens

```scss
.app-primary-button {
  background: var(--mat-sys-primary);
  color: var(--mat-sys-on-primary);
  border-radius: var(--mat-sys-corner-full);
}

.compact .app-primary-button {
  padding-block: 0.25rem;
}
```

The generator emits design-token references, the Material system CSS custom properties, plus a density-scoped class, so the active theme and density re-skin the button without editing the component.

## JSON Mapping

- `specification.sections[15]` in `/openui.json`
