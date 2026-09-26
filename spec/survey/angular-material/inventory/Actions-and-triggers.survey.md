# Actions and triggers

Controls that initiate actions or retain a pressed selection state.

Status: consolidated and verified under Steps 6–7 at the fixed [baseline](BASELINE.md).
See the [final report](FINAL_REPORT.md) for coverage, checks, and known limitations.
This category contains 62 primary objects; this is an artifact-role survey,
not an exhaustive symbol-by-symbol API review or runtime test report.
Category boundaries and abstract names are survey interpretations.

## Direct objects

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/button` | Action control library entry | Published runtime entry. Performs an action through a native button or navigation through a styled anchor; supports several visual appearances. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button) |
| `@angular/material/button-toggle` | Toggle action library entry | Published runtime entry. Represents a pressed or unpressed option, with grouped exclusive or multiple selection. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle) |
| `src/material/button-toggle/` | Toggle action source family | Source folder. Groups 13 direct files and 1 direct subfolder for toggle action. Represents a pressed or unpressed option, with grouped exclusive or multiple selection. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle) |
| `src/material/button/` | Action control source family | Source folder. Groups 26 direct files and 1 direct subfolder for action control. Performs an action through a native button or navigation through a styled anchor; supports several visual appearances. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button) |

## Subcategory: Button — Action control

Performs an action through a native button or navigation through a styled anchor; supports several visual appearances.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.md), [live API navigation](https://material.angular.dev/components/button/api). The live page is not the fixed-version evidence.

### Button: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/button/testing` | Action control test library entry | Published test-support entry. Exposes test drivers or contracts for action control, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/testing) |

### Button: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button/testing/` | Action control testing folder | Source folder. Groups 6 direct files and 0 direct subfolders for action control. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/testing) |

### Button: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button/button.ts` | Action or navigation control | Runtime declarations. Defines MatButton on native buttons and anchors, switches text, filled, elevated, outlined, and tonal appearances, and aliases MatAnchor to the same implementation. Shared control behavior is inherited from MatButtonBase. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.md) |
| `src/material/button/fab.ts` | Floating action control | Runtime declarations. Defines full-size and small floating action buttons, their anchor variants, and shared defaults. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/fab.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.md) |
| `src/material/button/icon-button.ts` | Icon action control | Runtime declarations. Defines icon-only button and anchor variants for actions and navigation. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/icon-button.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.md) |

### Button: internal support

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button/button-base.ts` | Action control shared behavior | Internal support. Provides the shared Button base, configuration tokens, disabled-state handling, focus support, and ripple integration. The interactive-disabled option preserves interaction while exposing disabled state. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button-base.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.md) |

### Button: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button/button-module.ts` | Action control integration module | Integration modules. Defines MatButtonModule, imports the button variants and ripple support, and exports the variants plus CDK BidiModule. The CDK dependency is outside the Material inventory. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.md) |

### Button: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button/index.ts` | Action control export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/index.ts) |
| `src/material/button/public-api.ts` | Action control export surface | Export surface. Forwards declarations from `./button`, `./fab`, `./icon-button`, `./button-module`, `./button-base`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/public-api.ts) |
| `src/material/button/testing/index.ts` | Action control export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/testing/index.ts) |
| `src/material/button/testing/public-api.ts` | Action control export surface | Export surface. Forwards declarations from `./button-harness`, `./button-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/testing/public-api.ts) |

### Button: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button/button.html` | Action control content template | Content templates. Projects leading and trailing icons and label content, conditionally displays a progress indicator, and includes ripple, focus, and touch-target elements. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.html) |
| `src/material/button/icon-button.html` | Icon button view template | Content template. Defines the internal view for icon button; rendered elements include `span`, `ng-content`, `div`. Projects content through `[progressIndicator]`. Includes conditional or repeated content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/icon-button.html) |

### Button: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button/_button-base.scss` | Button base styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for button base. Mixins include `mat-private-button-interactive`, `mat-private-button-ripple`, `mat-private-button-disabled`, `mat-private-button-touch-target`, `mat-private-button-horizontal-layout`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/_button-base.scss) |
| `src/material/button/_button-theme.scss` | Action control theme adapter | Styles and tokens. Provides base, color, typography, density, override, and combined theme mixins, choosing Material 2 or Material 3 tokens according to the theme version. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/_button-theme.scss) |
| `src/material/button/_fab-theme.scss` | Floating action button theme theme adapter | Styles and tokens. Emits configurable styling for action control. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/_fab-theme.scss) |
| `src/material/button/_icon-button-theme.scss` | Icon button theme theme adapter | Styles and tokens. Emits configurable styling for action control. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/_icon-button-theme.scss) |
| `src/material/button/_m2-button.scss` | Button legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for button. Functions include `get-tokens`, `private-get-color-palette-color-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/_m2-button.scss) |
| `src/material/button/_m2-fab.scss` | Floating action button legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for floating action button. Functions include `get-tokens`, `private-get-color-palette-color-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/_m2-fab.scss) |
| `src/material/button/_m2-icon-button.scss` | Icon button legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for icon button. Functions include `get-tokens`, `private-get-color-palette-color-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/_m2-icon-button.scss) |
| `src/material/button/_m3-button.scss` | Button design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for button. Functions include `get-tokens`, `get-density-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/_m3-button.scss) |
| `src/material/button/_m3-fab.scss` | Floating action button design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for floating action button. Functions include `get-tokens`, `get-density-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/_m3-fab.scss) |
| `src/material/button/_m3-icon-button.scss` | Icon button design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for icon button. Functions include `get-tokens`, `get-density-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/_m3-icon-button.scss) |
| `src/material/button/button-high-contrast.scss` | Button high contrast styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for button high contrast. Selectors include `.mat-mdc-button`, `.mat-mdc-unelevated-button`, `.mat-mdc-raised-button`, `.mat-mdc-outlined-button`, `.mat-mdc-button-base` and 1 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button-high-contrast.scss) |
| `src/material/button/button.scss` | Button styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for button. Selectors include `.mat-mdc-button-base`, `.mdc-button`, `.mdc-button__label`, `.mat-mdc-button`, `.mat-mdc-unelevated-button` and 6 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.scss) |
| `src/material/button/fab.scss` | Floating action button styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for floating action button. Selectors include `.mat-mdc-fab-base`, `.mat-icon`, `.mat-focus-indicator`, `.mat-mdc-fab`, `.mat-mdc-mini-fab` and 5 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/fab.scss) |
| `src/material/button/icon-button.scss` | Icon button styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for icon button. Selectors include `.mat-mdc-icon-button`, `.mat-mdc-button-progress-indicator-container`, `.mdc-circular-progress__determinate-circle-graphic`, `.mdc-circular-progress__indeterminate-circle-graphic`, `.mat-mdc-button-persistent-ripple` and 1 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/icon-button.scss) |

### Button: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button/testing/button-harness-filters.ts` | Button test query filters | Test-driver contract. Declares `ButtonVariant`, `ButtonAppearance`, `ButtonType`, `ButtonHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/testing/button-harness-filters.ts) |
| `src/material/button/testing/button-harness.ts` | Action control test driver | Test drivers. Defines MatButtonHarness using CDK testing facilities. Supports locating, clicking, focus, text, disabled state, variant, appearance, native button type, and progress visibility. MatIconHarness is a related test-driver dependency. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/testing/button-harness.ts) |

### Button: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button/button.spec.ts` | Action control behavior verification | Behavior tests. Tests appearance, disabled behavior, clicks, anchor navigation prevention and accessibility attributes, focus indicators, progress content, and Button-family defaults. Inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.spec.ts) |
| `src/material/button/testing/button-harness.spec.ts` | Button harness verification | Behavior tests. Contains 18 literal test declarations for `MatButtonHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/testing/button-harness.spec.ts) |

### Button: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button/button.md` | Action control usage guide | Documentation. Explains action versus navigation semantics, variants and appearances, icon placement, interactive disabled controls, progress content, and accessibility. Interactive disabled controls can still dispatch events; their visual state is not an interaction prohibition. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.md) |

### Button: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button/BUILD.bazel` | Action control build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `fab_theme`, `icon_button_theme`, `icon_button_css`, `fab_css`, `button_high_contrast` and 8 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/BUILD.bazel) |
| `src/material/button/testing/BUILD.bazel` | Action control build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/testing/BUILD.bazel) |

## Subcategory: Button toggle — Toggle action

Represents a pressed or unpressed option, with grouped exclusive or multiple selection.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/button-toggle.md), [live API navigation](https://material.angular.dev/components/button-toggle/api). The live page is not the fixed-version evidence.

### Button toggle: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/button-toggle/testing` | Toggle action test library entry | Published test-support entry. Exposes test drivers or contracts for toggle action, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/testing) |

### Button toggle: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button-toggle/testing/` | Toggle action testing folder | Source folder. Groups 9 direct files and 0 direct subfolders for toggle action. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/testing) |

### Button toggle: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button-toggle/button-toggle.ts` | Button toggle behavior | Runtime declarations (Component, Directive). Implements standalone and grouped pressed-state choices with exclusive or multiple selection. Declares `ToggleType`, `MatButtonToggleAppearance`, `MatButtonToggleDefaultOptions`, `MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS`, `MAT_BUTTON_TOGGLE_GROUP`, `MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR`, `MatButtonToggleChange` and 2 more for toggle action. Methods or accessors include `name`, `value`, `selected`, `multiple`, `disabled`, `disabledInteractive` and 17 more. Source includes deprecated declarations; consult the pinned source before treating every declaration as recommended API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/button-toggle.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/button-toggle.md) |

### Button toggle: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button-toggle/button-toggle-module.ts` | Button toggle integration module | Integration module. Declares `MatButtonToggleModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/button-toggle-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/button-toggle.md) |

### Button toggle: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button-toggle/index.ts` | Toggle action export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/index.ts) |
| `src/material/button-toggle/public-api.ts` | Toggle action export surface | Export surface. Forwards declarations from `./button-toggle`, `./button-toggle-module`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/public-api.ts) |
| `src/material/button-toggle/testing/index.ts` | Toggle action export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/testing/index.ts) |
| `src/material/button-toggle/testing/public-api.ts` | Toggle action export surface | Export surface. Forwards declarations from `./button-toggle-harness`, `./button-toggle-harness-filters`, `./button-toggle-group-harness`, `./button-toggle-group-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/testing/public-api.ts) |

### Button toggle: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button-toggle/button-toggle.html` | Button toggle view template | Content template. Defines the internal view for button toggle; rendered elements include `button`, `div`, `mat-pseudo-checkbox`, `span`, `ng-content`. Includes conditional or repeated content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/button-toggle.html) |

### Button toggle: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button-toggle/_button-toggle-theme.scss` | Button toggle theme theme adapter | Styles and tokens. Emits configurable styling for toggle action. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/_button-toggle-theme.scss) |
| `src/material/button-toggle/_m2-button-toggle.scss` | Button toggle legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for button toggle. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/_m2-button-toggle.scss) |
| `src/material/button-toggle/_m3-button-toggle.scss` | Button toggle design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for button toggle. Functions include `get-tokens`, `get-density-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/_m3-button-toggle.scss) |
| `src/material/button-toggle/button-toggle.scss` | Button toggle styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for button toggle. Selectors include `.mat-button-toggle-standalone`, `.mat-button-toggle-group`, `.mat-button-toggle-group-appearance-standard`, `.mat-pseudo-checkbox`, `.mat-button-toggle-vertical` and 11 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/button-toggle.scss) |

### Button toggle: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button-toggle/testing/button-toggle-group-harness-filters.ts` | Button toggle group test query filters | Test-driver contract. Declares `ButtonToggleGroupHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/testing/button-toggle-group-harness-filters.ts) |
| `src/material/button-toggle/testing/button-toggle-group-harness.ts` | Button toggle group test driver | Test driver. Declares `MatButtonToggleGroupHarness`; operations include `with`, `getToggles`, `isDisabled`, `isVertical`, `getAppearance`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/testing/button-toggle-group-harness.ts) |
| `src/material/button-toggle/testing/button-toggle-harness-filters.ts` | Button toggle test query filters | Test-driver contract. Declares `ButtonToggleHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/testing/button-toggle-harness-filters.ts) |
| `src/material/button-toggle/testing/button-toggle-harness.ts` | Button toggle test driver | Test driver. Declares `MatButtonToggleHarness`; operations include `with`, `isChecked`, `isDisabled`, `getName`, `getAriaLabel`, `getAriaLabelledby`, `getText`, `getAppearance`, `focus` and 5 more. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/testing/button-toggle-harness.ts) |

### Button toggle: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button-toggle/button-toggle.spec.ts` | Button toggle verification | Behavior tests. Contains 73 literal test declarations for `MatButtonToggle with forms`, `using FormControl`, `MatButtonToggle without forms`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/button-toggle.spec.ts) |
| `src/material/button-toggle/testing/button-toggle-group.spec.ts` | Button toggle group verification | Behavior tests. Contains 6 literal test declarations for `MatButtonToggleGroupHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/testing/button-toggle-group.spec.ts) |
| `src/material/button-toggle/testing/button-toggle-harness.spec.ts` | Button toggle harness verification | Behavior tests. Contains 17 literal test declarations for `MatButtonToggleHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/testing/button-toggle-harness.spec.ts) |

### Button toggle: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button-toggle/README.md` | Toggle action documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/README.md) |
| `src/material/button-toggle/button-toggle.md` | Toggle action usage guide | Documentation. Represents a pressed or unpressed option, with grouped exclusive or multiple selection. Covers Exclusive selection vs. multiple selection; Appearance; Use with Angular Forms. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/button-toggle.md) |

### Button toggle: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/button-toggle/BUILD.bazel` | Toggle action build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `button-toggle`, `unit_test_sources`, `unit_tests`, `overview` and 2 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/BUILD.bazel) |
| `src/material/button-toggle/testing/BUILD.bazel` | Toggle action build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button-toggle/testing/BUILD.bazel) |

## Classification notes

- Folder, file, and published export identities are distinct inventory objects.
- Symbol and operation lists summarize inspected declarations; they are not complete API contracts.
- Tests describe intended checks; no upstream test suite was executed.
- Supporting artifacts stay with their owning family; shared foundations are classified once.
- This expands the pilot file. Its 12 objects are retained in the complete inventory; the POC report records their earlier limited coverage.
- Styled anchors retain navigation semantics. Toggle actions also support selection; primary ownership here follows the Button family.
