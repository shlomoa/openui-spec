# Feedback and overlays

Status, progress, transient messages, contextual help, and overlay interaction surfaces.

Status: consolidated and verified under Steps 6–7 at the fixed [baseline](BASELINE.md).
See the [final report](FINAL_REPORT.md) for coverage, checks, and known limitations.
This category contains 179 primary objects; this is an artifact-role survey,
not an exhaustive symbol-by-symbol API review or runtime test report.
Category boundaries and abstract names are survey interpretations.

## Direct objects

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/badge` | Status annotation library entry | Published runtime entry. Adds a small text or numeric status marker near a host element. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge) |
| `@angular/material/bottom-sheet` | Bottom overlay panel library entry | Published runtime entry. Opens an interaction panel at the lower edge of the viewport. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet) |
| `@angular/material/dialog` | Modal interaction window library entry | Published runtime entry. Opens component or template content in a dialog with configurable lifecycle and interaction behavior. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog) |
| `@angular/material/progress-bar` | Linear progress indicator library entry | Published runtime entry. Communicates activity through a horizontal indicator with determinate, indeterminate, buffer, and query modes. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar) |
| `@angular/material/progress-spinner` | Circular progress indicator library entry | Published runtime entry. Communicates known or ongoing activity through a circular indicator. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner) |
| `@angular/material/snack-bar` | Transient notification library entry | Published runtime entry. Displays a temporary notification using message text or custom content. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar) |
| `@angular/material/tooltip` | Contextual text hint library entry | Published runtime entry. Shows a short label associated with a host element during relevant user interactions. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip) |
| `src/material/badge/` | Status annotation source family | Source folder. Groups 11 direct files and 1 direct subfolder for status annotation. Adds a small text or numeric status marker near a host element. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge) |
| `src/material/bottom-sheet/` | Bottom overlay panel source family | Source folder. Groups 16 direct files and 1 direct subfolder for bottom overlay panel. Opens an interaction panel at the lower edge of the viewport. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet) |
| `src/material/dialog/` | Modal interaction window source family | Source folder. Groups 19 direct files and 1 direct subfolder for modal interaction window. Opens component or template content in a dialog with configurable lifecycle and interaction behavior. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog) |
| `src/material/progress-bar/` | Linear progress indicator source family | Source folder. Groups 13 direct files and 1 direct subfolder for linear progress indicator. Communicates activity through a horizontal indicator with determinate, indeterminate, buffer, and query modes. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar) |
| `src/material/progress-spinner/` | Circular progress indicator source family | Source folder. Groups 13 direct files and 1 direct subfolder for circular progress indicator. Communicates known or ongoing activity through a circular indicator. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner) |
| `src/material/snack-bar/` | Transient notification source family | Source folder. Groups 21 direct files and 1 direct subfolder for transient notification. Displays a temporary notification using message text or custom content. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar) |
| `src/material/tooltip/` | Contextual text hint source family | Source folder. Groups 14 direct files and 1 direct subfolder for contextual text hint. Shows a short label associated with a host element during relevant user interactions. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip) |

## Subcategory: Badge — Status annotation

Adds a small text or numeric status marker near a host element.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/badge.md), [live API navigation](https://material.angular.dev/components/badge/api). The live page is not the fixed-version evidence.

### Badge: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/badge/testing` | Status annotation test library entry | Published test-support entry. Exposes test drivers or contracts for status annotation, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/testing) |

### Badge: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/badge/testing/` | Status annotation testing folder | Source folder. Groups 6 direct files and 0 direct subfolders for status annotation. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/testing) |

### Badge: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/badge/badge.ts` | Badge behavior | Runtime declarations (Component, Directive). Attaches a small status marker to a host and maintains its content, position, and accessible description. Declares `MatBadgePosition`, `MatBadgeSize`, `MatBadgeConfig`, `MAT_BADGE_CONFIG`, `_MatBadgeStyleLoader`, `MatBadge` for status annotation. Methods or accessors include `color`, `content`, `description`, `isAbove`, `isAfter`, `getBadgeElement` and 3 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/badge.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/badge.md) |

### Badge: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/badge/badge-module.ts` | Badge integration module | Integration module. Declares `MatBadgeModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/badge-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/badge.md) |

### Badge: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/badge/index.ts` | Status annotation export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/index.ts) |
| `src/material/badge/public-api.ts` | Status annotation export surface | Export surface. Forwards declarations from `./badge-module`, `./badge`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/public-api.ts) |
| `src/material/badge/testing/index.ts` | Status annotation export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/testing/index.ts) |
| `src/material/badge/testing/public-api.ts` | Status annotation export surface | Export surface. Forwards declarations from `./badge-harness`, `./badge-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/testing/public-api.ts) |

### Badge: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/badge/_badge-theme.scss` | Badge theme theme adapter | Styles and tokens. Emits configurable styling for status annotation. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/_badge-theme.scss) |
| `src/material/badge/_m2-badge.scss` | Badge legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for badge. Functions include `get-tokens`, `private-get-color-palette-color-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/_m2-badge.scss) |
| `src/material/badge/_m3-badge.scss` | Badge design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for badge. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/_m3-badge.scss) |
| `src/material/badge/badge.scss` | Badge styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for badge. Mixins include `_badge-size`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/badge.scss) |

### Badge: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/badge/testing/badge-harness-filters.ts` | Badge test query filters | Test-driver contract. Declares `BadgeHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/testing/badge-harness-filters.ts) |
| `src/material/badge/testing/badge-harness.ts` | Badge test driver | Test driver. Declares `MatBadgeHarness`; operations include `with`, `getText`, `isOverlapping`, `getPosition`, `getSize`, `isHidden`, `isDisabled`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/testing/badge-harness.ts) |

### Badge: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/badge/badge.spec.ts` | Badge verification | Behavior tests. Contains 20 literal test declarations for `MatBadge`, `on an interative host`, `on an non-interactive host`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/badge.spec.ts) |
| `src/material/badge/testing/badge-harness.spec.ts` | Badge harness verification | Behavior tests. Contains 9 literal test declarations for `MatBadgeHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/testing/badge-harness.spec.ts) |

### Badge: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/badge/badge.md` | Status annotation usage guide | Documentation. Adds a small text or numeric status marker near a host element. Covers Badge position; Badge sizing; Badge visibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/badge.md) |

### Badge: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/badge/BUILD.bazel` | Status annotation build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `badge_css`, `badge`, `unit_test_sources`, `unit_tests`, `overview` and 2 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/BUILD.bazel) |
| `src/material/badge/testing/BUILD.bazel` | Status annotation build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/badge/testing/BUILD.bazel) |

## Subcategory: Bottom sheet — Bottom overlay panel

Opens an interaction panel at the lower edge of the viewport.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/bottom-sheet.md), [live API navigation](https://material.angular.dev/components/bottom-sheet/api). The live page is not the fixed-version evidence.

### Bottom sheet: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/bottom-sheet/testing` | Bottom overlay panel test library entry | Published test-support entry. Exposes test drivers or contracts for bottom overlay panel, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/testing) |

### Bottom sheet: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/bottom-sheet/testing/` | Bottom overlay panel testing folder | Source folder. Groups 6 direct files and 0 direct subfolders for bottom overlay panel. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/testing) |

### Bottom sheet: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/bottom-sheet/bottom-sheet-config.ts` | Bottom sheet config behavior | Implementation support. Carries panel configuration and the token for injected panel data. Declares `AutoFocusTarget`, `MAT_BOTTOM_SHEET_DATA`, `MatBottomSheetConfig` for bottom overlay panel. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/bottom-sheet-config.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/bottom-sheet.md) |
| `src/material/bottom-sheet/bottom-sheet-container.ts` | Bottom sheet container behavior | Runtime declarations (Component). Hosts panel content and manages entry and exit behavior. Declares `MatBottomSheetContainer` for bottom overlay panel. Methods or accessors include `enter`, `exit`, `ngOnDestroy`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/bottom-sheet-container.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/bottom-sheet.md) |
| `src/material/bottom-sheet/bottom-sheet-ref.ts` | Bottom sheet reference behavior | Implementation support. Exposes the opened panel instance, dismissal, lifecycle events, backdrop clicks, and key events. Declares `MatBottomSheetRef` for bottom overlay panel. Methods or accessors include `instance`, `componentRef`, `dismiss`, `afterDismissed`, `afterOpened`, `backdropClick` and 1 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/bottom-sheet-ref.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/bottom-sheet.md) |
| `src/material/bottom-sheet/bottom-sheet.ts` | Bottom sheet behavior | Implementation support. Opens and dismisses bottom-edge interaction panels. Declares `MAT_BOTTOM_SHEET_DEFAULT_OPTIONS`, `MatBottomSheet` for bottom overlay panel. Methods or accessors include `open`, `dismiss`, `ngOnDestroy`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/bottom-sheet.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/bottom-sheet.md) |

### Bottom sheet: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/bottom-sheet/bottom-sheet-module.ts` | Bottom sheet integration module | Integration module. Declares `MatBottomSheetModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/bottom-sheet-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/bottom-sheet.md) |

### Bottom sheet: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/bottom-sheet/index.ts` | Bottom overlay panel export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/index.ts) |
| `src/material/bottom-sheet/public-api.ts` | Bottom overlay panel export surface | Export surface. Forwards declarations from `./bottom-sheet-module`, `./bottom-sheet`, `./bottom-sheet-config`, `./bottom-sheet-container`, `./bottom-sheet-ref`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/public-api.ts) |
| `src/material/bottom-sheet/testing/index.ts` | Bottom overlay panel export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/testing/index.ts) |
| `src/material/bottom-sheet/testing/public-api.ts` | Bottom overlay panel export surface | Export surface. Forwards declarations from `./bottom-sheet-harness`, `./bottom-sheet-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/testing/public-api.ts) |

### Bottom sheet: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/bottom-sheet/bottom-sheet-container.html` | Bottom sheet container view template | Content template. Defines the internal view for bottom sheet container; rendered elements include `ng-template`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/bottom-sheet-container.html) |

### Bottom sheet: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/bottom-sheet/_bottom-sheet-theme.scss` | Bottom sheet theme theme adapter | Styles and tokens. Emits configurable styling for bottom overlay panel. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/_bottom-sheet-theme.scss) |
| `src/material/bottom-sheet/_m2-bottom-sheet.scss` | Bottom sheet legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for bottom sheet. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/_m2-bottom-sheet.scss) |
| `src/material/bottom-sheet/_m3-bottom-sheet.scss` | Bottom sheet design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for bottom sheet. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/_m3-bottom-sheet.scss) |
| `src/material/bottom-sheet/bottom-sheet-container.scss` | Bottom sheet container styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for bottom sheet container. Selectors include `.mat-bottom-sheet-container`, `.mat-bottom-sheet-container-animations-enabled`, `%_mat-bottom-sheet-container-border-radius`, `.mat-bottom-sheet-container-medium`, `.mat-bottom-sheet-container-large` and 1 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/bottom-sheet-container.scss) |

### Bottom sheet: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/bottom-sheet/testing/bottom-sheet-harness-filters.ts` | Bottom sheet test query filters | Test-driver contract. Declares `BottomSheetHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/testing/bottom-sheet-harness-filters.ts) |
| `src/material/bottom-sheet/testing/bottom-sheet-harness.ts` | Bottom sheet test driver | Test driver. Declares `MatBottomSheetHarness`; operations include `with`, `getAriaLabel`, `dismiss`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/testing/bottom-sheet-harness.ts) |

### Bottom sheet: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/bottom-sheet/bottom-sheet.spec.ts` | Bottom sheet verification | Behavior tests. Contains 59 literal test declarations for `MatBottomSheet`, `passing in data`, `disableClose option`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/bottom-sheet.spec.ts) |
| `src/material/bottom-sheet/testing/bottom-sheet-harness.spec.ts` | Bottom sheet harness verification | Behavior tests. Contains 3 literal test declarations for `MatBottomSheetHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/testing/bottom-sheet-harness.spec.ts) |

### Bottom sheet: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/bottom-sheet/README.md` | Bottom overlay panel documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/README.md) |
| `src/material/bottom-sheet/bottom-sheet.md` | Bottom overlay panel usage guide | Documentation. Opens an interaction panel at the lower edge of the viewport. Covers Sharing data with the bottom sheet component.; Specifying global configuration defaults; Accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/bottom-sheet.md) |

### Bottom sheet: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/bottom-sheet/BUILD.bazel` | Bottom overlay panel build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `bottom-sheet`, `unit_test_sources`, `unit_tests`, `overview` and 2 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/BUILD.bazel) |
| `src/material/bottom-sheet/testing/BUILD.bazel` | Bottom overlay panel build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/bottom-sheet/testing/BUILD.bazel) |

## Subcategory: Dialog — Modal interaction window

Opens component or template content in a dialog with configurable lifecycle and interaction behavior.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog.md), [live API navigation](https://material.angular.dev/components/dialog/api). The live page is not the fixed-version evidence.

### Dialog: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/dialog/testing` | Modal interaction window test library entry | Published test-support entry. Exposes test drivers or contracts for modal interaction window, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/testing) |

### Dialog: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/dialog/testing/` | Modal interaction window testing folder | Source folder. Groups 8 direct files and 0 direct subfolders for modal interaction window. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/testing) |

### Dialog: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/dialog/dialog-config.ts` | Dialog config behavior | Implementation support. Defines positioning, accessibility, focus, and other dialog-open options. Declares `AutoFocusTarget`, `DialogRole`, `DialogPosition`, `MatDialogConfig` for modal interaction window. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog-config.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog.md) |
| `src/material/dialog/dialog-container.ts` | Dialog container behavior | Runtime declarations (Component). Hosts dialog content and controls its animation and attachment lifecycle. Declares `OPEN_ANIMATION_DURATION`, `CLOSE_ANIMATION_DURATION`, `MatDialogContainer` for modal interaction window. Methods or accessors include `ngOnDestroy`, `attachComponentPortal`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog-container.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog.md) |
| `src/material/dialog/dialog-content-directives.ts` | Dialog content directives behavior | Runtime declarations (Directive). Identifies dialog title, content, actions, and close controls. Declares `MatDialogClose`, `MatDialogLayoutSection`, `MatDialogTitle`, `MatDialogContent`, `MatDialogActions` for modal interaction window. Methods or accessors include `ngOnInit`, `ngOnChanges`, `ngOnDestroy`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog-content-directives.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog.md) |
| `src/material/dialog/dialog-ref.ts` | Dialog reference behavior | Implementation support. Provides the opened-dialog handle, result closure, lifecycle notifications, and interaction events. Declares `MatDialogState`, `MatDialogRef`, `_closeDialogVia` for modal interaction window. Methods or accessors include `close`, `afterOpened`, `afterClosed`, `beforeClosed`, `backdropClick`, `keydownEvents` and 5 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog-ref.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog.md) |
| `src/material/dialog/dialog.ts` | Dialog behavior | Implementation support. Opens, locates, and closes modal dialogs while tracking open instances. Declares `MAT_DIALOG_DATA`, `MAT_DIALOG_DEFAULT_OPTIONS`, `MAT_DIALOG_SCROLL_STRATEGY`, `MatDialog` for modal interaction window. Methods or accessors include `openDialogs`, `afterOpened`, `open`, `closeAll`, `getDialogById`, `ngOnDestroy`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog.md) |

### Dialog: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/dialog/dialog-module.ts` | Dialog integration module | Integration module. Declares `MatDialogModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog.md) |

### Dialog: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/dialog/index.ts` | Modal interaction window export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/index.ts) |
| `src/material/dialog/public-api.ts` | Modal interaction window export surface | Export surface. Forwards declarations from `./dialog`, `./dialog-config`, `./dialog-ref`, `./dialog-content-directives`, `./dialog-container`, `./dialog-module`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/public-api.ts) |
| `src/material/dialog/testing/index.ts` | Modal interaction window export surface | Export surface. Forwards declarations from `./public-api`, `./dialog-harness`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/testing/index.ts) |
| `src/material/dialog/testing/public-api.ts` | Modal interaction window export surface | Export surface. Forwards declarations from `./dialog-harness-filters`, `./dialog-harness`, `./dialog-opener`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/testing/public-api.ts) |

### Dialog: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/dialog/dialog-container.html` | Dialog container view template | Content template. Defines the internal view for dialog container; rendered elements include `div`, `ng-template`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog-container.html) |

### Dialog: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/dialog/_dialog-legacy-padding.scss` | Dialog legacy padding styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for dialog legacy padding. Mixins include `legacy-padding`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/_dialog-legacy-padding.scss) |
| `src/material/dialog/_dialog-theme.scss` | Dialog theme theme adapter | Styles and tokens. Emits configurable styling for modal interaction window. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/_dialog-theme.scss) |
| `src/material/dialog/_m2-dialog.scss` | Dialog legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for dialog. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/_m2-dialog.scss) |
| `src/material/dialog/_m3-dialog.scss` | Dialog design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for dialog. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/_m3-dialog.scss) |
| `src/material/dialog/dialog.scss` | Dialog styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for dialog. Selectors include `.mat-mdc-dialog-container`, `.cdk-overlay-pane`, `.mat-mdc-dialog-inner-container`, `.mdc-dialog--closing`, `.mdc-dialog--open` and 8 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog.scss) |

### Dialog: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/dialog/testing/dialog-harness-filters.ts` | Dialog test query filters | Test-driver contract. Declares `DialogHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/testing/dialog-harness-filters.ts) |
| `src/material/dialog/testing/dialog-harness.ts` | Dialog test driver | Test driver. Declares `MatDialogSection`, `MatDialogHarness`; operations include `with`, `getId`, `getRole`, `getAriaLabel`, `getAriaLabelledby`, `getAriaDescribedby`, `close`, `getText`, `getTitleText` and 2 more. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/testing/dialog-harness.ts) |
| `src/material/dialog/testing/dialog-opener.ts` | Dialog test host | Test drivers. Provides a test component and module that open a configurable dialog component for integration tests. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/testing/dialog-opener.ts) |

### Dialog: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/dialog/dialog.spec.ts` | Dialog verification | Behavior tests. Contains 121 literal test declarations for `MatDialog`, `passing in data`, `disableClose option`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog.spec.ts) |
| `src/material/dialog/dialog.zone.spec.ts` | Dialog.zone verification | Behavior tests. Contains 1 literal test declarations for `MatDialog with Zone`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog.zone.spec.ts) |
| `src/material/dialog/testing/dialog-harness.spec.ts` | Dialog harness verification | Behavior tests. Contains 9 literal test declarations for `MatDialogHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/testing/dialog-harness.spec.ts) |
| `src/material/dialog/testing/dialog-opener.spec.ts` | Dialog opener verification | Behavior tests. Contains 4 literal test declarations for `MatTestDialogOpener`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/testing/dialog-opener.spec.ts) |

### Dialog: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/dialog/README.md` | Modal interaction window documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/README.md) |
| `src/material/dialog/dialog.md` | Modal interaction window usage guide | Documentation. Opens component or template content in a dialog with configurable lifecycle and interaction behavior. Covers Specifying global configuration defaults; Sharing data with the Dialog component.; Dialog content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/dialog.md) |

### Dialog: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/dialog/BUILD.bazel` | Modal interaction window build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `dialog_legacy_padding`, `css`, `dialog`, `dialog_tests_lib`, `unit_tests` and 3 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/BUILD.bazel) |
| `src/material/dialog/testing/BUILD.bazel` | Modal interaction window build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/dialog/testing/BUILD.bazel) |

## Subcategory: Progress bar — Linear progress indicator

Communicates activity through a horizontal indicator with determinate, indeterminate, buffer, and query modes.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/progress-bar.md), [live API navigation](https://material.angular.dev/components/progress-bar/api). The live page is not the fixed-version evidence.

### Progress bar: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/progress-bar/testing` | Linear progress indicator test library entry | Published test-support entry. Exposes test drivers or contracts for linear progress indicator, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/testing) |

### Progress bar: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-bar/testing/` | Linear progress indicator testing folder | Source folder. Groups 6 direct files and 0 direct subfolders for linear progress indicator. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/testing) |

### Progress bar: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-bar/progress-bar.ts` | Progress bar behavior | Runtime declarations (Component). Renders linear activity state and emits animation-end information. Declares `ProgressAnimationEnd`, `MatProgressBarDefaultOptions`, `MAT_PROGRESS_BAR_DEFAULT_OPTIONS`, `MAT_PROGRESS_BAR_LOCATION`, `MatProgressBarLocation`, `ProgressBarMode`, `MatProgressBar` for linear progress indicator. Methods or accessors include `color`, `value`, `bufferValue`, `mode`, `ngAfterViewInit`, `ngOnDestroy`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/progress-bar.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/progress-bar.md) |

### Progress bar: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-bar/progress-bar-module.ts` | Progress bar integration module | Integration module. Declares `MatProgressBarModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/progress-bar-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/progress-bar.md) |

### Progress bar: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-bar/index.ts` | Linear progress indicator export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/index.ts) |
| `src/material/progress-bar/public-api.ts` | Linear progress indicator export surface | Export surface. Forwards declarations from `./progress-bar`, `./progress-bar-module`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/public-api.ts) |
| `src/material/progress-bar/testing/index.ts` | Linear progress indicator export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/testing/index.ts) |
| `src/material/progress-bar/testing/public-api.ts` | Linear progress indicator export surface | Export surface. Forwards declarations from `./progress-bar-harness`, `./progress-bar-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/testing/public-api.ts) |

### Progress bar: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-bar/progress-bar.html` | Progress bar view template | Content template. Defines the internal view for progress bar; rendered elements include `div`, `span`. Includes conditional or repeated content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/progress-bar.html) |

### Progress bar: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-bar/_m2-progress-bar.scss` | Progress bar legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for progress bar. Functions include `get-tokens`, `private-get-color-palette-color-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/_m2-progress-bar.scss) |
| `src/material/progress-bar/_m3-progress-bar.scss` | Progress bar design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for progress bar. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/_m3-progress-bar.scss) |
| `src/material/progress-bar/_progress-bar-theme.scss` | Progress bar theme theme adapter | Styles and tokens. Emits configurable styling for linear progress indicator. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/_progress-bar-theme.scss) |
| `src/material/progress-bar/progress-bar.scss` | Progress bar styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for progress bar. Selectors include `.mat-mdc-progress-bar`, `.mdc-linear-progress__buffer-dots`, `.mdc-linear-progress__primary-bar`, `.mdc-linear-progress__secondary-bar`, `.mdc-linear-progress__bar-inner` and 6 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/progress-bar.scss) |

### Progress bar: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-bar/testing/progress-bar-harness-filters.ts` | Progress bar test query filters | Test-driver contract. Declares `ProgressBarHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/testing/progress-bar-harness-filters.ts) |
| `src/material/progress-bar/testing/progress-bar-harness.ts` | Progress bar test driver | Test driver. Declares `MatProgressBarHarness`; operations include `with`, `getValue`, `getMode`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/testing/progress-bar-harness.ts) |

### Progress bar: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-bar/progress-bar.spec.ts` | Progress bar verification | Behavior tests. Contains 15 literal test declarations for `MatProgressBar`, `with animation`, `basic progress-bar`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/progress-bar.spec.ts) |
| `src/material/progress-bar/testing/progress-bar-harness.spec.ts` | Progress bar harness verification | Behavior tests. Contains 3 literal test declarations for `MatProgressBarHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/testing/progress-bar-harness.spec.ts) |

### Progress bar: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-bar/README.md` | Linear progress indicator documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/README.md) |
| `src/material/progress-bar/progress-bar.md` | Linear progress indicator usage guide | Documentation. Communicates activity through a horizontal indicator with determinate, indeterminate, buffer, and query modes. Covers Progress mode; Determinate; Indeterminate. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/progress-bar.md) |

### Progress bar: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-bar/BUILD.bazel` | Linear progress indicator build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `progress-bar`, `progress_bar_tests_lib`, `unit_tests`, `overview` and 2 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/BUILD.bazel) |
| `src/material/progress-bar/testing/BUILD.bazel` | Linear progress indicator build definition | Build tooling. Declares `load`, `package`, `ng_project`, `ng_web_test_suite`, `filegroup` rules; named targets include `testing`, `unit_tests_lib`, `unit_tests`, `source-files`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-bar/testing/BUILD.bazel) |

## Subcategory: Progress spinner — Circular progress indicator

Communicates known or ongoing activity through a circular indicator.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/progress-spinner.md), [live API navigation](https://material.angular.dev/components/progress-spinner/api). The live page is not the fixed-version evidence.

### Progress spinner: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/progress-spinner/testing` | Circular progress indicator test library entry | Published test-support entry. Exposes test drivers or contracts for circular progress indicator, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/testing) |

### Progress spinner: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-spinner/testing/` | Circular progress indicator testing folder | Source folder. Groups 6 direct files and 0 direct subfolders for circular progress indicator. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/testing) |

### Progress spinner: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-spinner/progress-spinner.ts` | Progress spinner behavior | Runtime declarations (Component). Renders circular progress with configurable value, diameter, and stroke width. Declares `ProgressSpinnerMode`, `MatProgressSpinnerDefaultOptions`, `MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS`, `MatProgressSpinner`, `MatSpinner` for circular progress indicator. Methods or accessors include `color`, `value`, `diameter`, `strokeWidth`. Source includes deprecated declarations; consult the pinned source before treating every declaration as recommended API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/progress-spinner.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/progress-spinner.md) |

### Progress spinner: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-spinner/progress-spinner-module.ts` | Progress spinner integration module | Integration module. Declares `MatProgressSpinnerModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/progress-spinner-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/progress-spinner.md) |

### Progress spinner: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-spinner/index.ts` | Circular progress indicator export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/index.ts) |
| `src/material/progress-spinner/public-api.ts` | Circular progress indicator export surface | Export surface. Forwards declarations from `./progress-spinner`, `./progress-spinner-module`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/public-api.ts) |
| `src/material/progress-spinner/testing/index.ts` | Circular progress indicator export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/testing/index.ts) |
| `src/material/progress-spinner/testing/public-api.ts` | Circular progress indicator export surface | Export surface. Forwards declarations from `./progress-spinner-harness`, `./progress-spinner-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/testing/public-api.ts) |

### Progress spinner: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-spinner/progress-spinner.html` | Progress spinner view template | Content template. Defines the internal view for progress spinner; rendered elements include `ng-template`, `svg`, `circle`, `div`, `ng-container`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/progress-spinner.html) |

### Progress spinner: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-spinner/_m2-progress-spinner.scss` | Progress spinner legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for progress spinner. Functions include `get-tokens`, `private-get-color-palette-color-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/_m2-progress-spinner.scss) |
| `src/material/progress-spinner/_m3-progress-spinner.scss` | Progress spinner design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for progress spinner. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/_m3-progress-spinner.scss) |
| `src/material/progress-spinner/_progress-spinner-theme.scss` | Progress spinner theme theme adapter | Styles and tokens. Emits configurable styling for circular progress indicator. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/_progress-spinner-theme.scss) |
| `src/material/progress-spinner/progress-spinner.scss` | Progress spinner styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for progress spinner. Selectors include `.mat-mdc-progress-spinner`, `.mdc-circular-progress__indeterminate-circle-graphic`, `.mdc-circular-progress__spinner-layer`, `.mdc-circular-progress__indeterminate-container`, `.mdc-circular-progress__determinate-circle` and 7 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/progress-spinner.scss) |

### Progress spinner: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-spinner/testing/progress-spinner-harness-filters.ts` | Progress spinner test query filters | Test-driver contract. Declares `ProgressSpinnerHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/testing/progress-spinner-harness-filters.ts) |
| `src/material/progress-spinner/testing/progress-spinner-harness.ts` | Progress spinner test driver | Test driver. Declares `MatProgressSpinnerHarness`; operations include `with`, `getValue`, `getMode`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/testing/progress-spinner-harness.ts) |

### Progress spinner: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-spinner/progress-spinner.spec.ts` | Progress spinner verification | Behavior tests. Contains 25 literal test declarations for `MatProgressSpinner`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/progress-spinner.spec.ts) |
| `src/material/progress-spinner/testing/progress-spinner-harness.spec.ts` | Progress spinner harness verification | Behavior tests. Contains 3 literal test declarations for `MatProgressSpinnerHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/testing/progress-spinner-harness.spec.ts) |

### Progress spinner: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-spinner/README.md` | Circular progress indicator documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/README.md) |
| `src/material/progress-spinner/progress-spinner.md` | Circular progress indicator usage guide | Documentation. Communicates known or ongoing activity through a circular indicator. Covers Progress mode; Accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/progress-spinner.md) |

### Progress spinner: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/progress-spinner/BUILD.bazel` | Circular progress indicator build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `progress-spinner`, `progress_spinner_tests_lib`, `unit_tests`, `overview` and 2 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/BUILD.bazel) |
| `src/material/progress-spinner/testing/BUILD.bazel` | Circular progress indicator build definition | Build tooling. Declares `load`, `package`, `ng_project`, `filegroup`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/progress-spinner/testing/BUILD.bazel) |

## Subcategory: Snack bar — Transient notification

Displays a temporary notification using message text or custom content.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar.md), [live API navigation](https://material.angular.dev/components/snack-bar/api). The live page is not the fixed-version evidence.

### Snack bar: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/snack-bar/testing` | Transient notification test library entry | Published test-support entry. Exposes test drivers or contracts for transient notification, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/testing) |

### Snack bar: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/snack-bar/testing/` | Transient notification testing folder | Source folder. Groups 6 direct files and 0 direct subfolders for transient notification. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/testing) |

### Snack bar: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/snack-bar/simple-snack-bar.ts` | Simple snack bar behavior | Runtime declarations (Component). Provides the standard message-and-action notification content. Declares `TextOnlySnackBar`, `SimpleSnackBar` for transient notification. Methods or accessors include `action`, `hasAction`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/simple-snack-bar.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar.md) |
| `src/material/snack-bar/snack-bar-config.ts` | Snack bar config behavior | Implementation support. Defines notification placement, supplied data, and other open options. Declares `MAT_SNACK_BAR_DATA`, `MatSnackBarHorizontalPosition`, `MatSnackBarVerticalPosition`, `MatSnackBarConfig` for transient notification. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar-config.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar.md) |
| `src/material/snack-bar/snack-bar-container.ts` | Snack bar container behavior | Runtime declarations (Component). Hosts notification content and its entry and exit transitions. Declares `MatSnackBarContainer` for transient notification. Methods or accessors include `attachComponentPortal`, `attachTemplatePortal`, `onAnimationEnd`, `enter`, `exit`, `ngOnDestroy`. Source includes deprecated declarations; consult the pinned source before treating every declaration as recommended API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar-container.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar.md) |
| `src/material/snack-bar/snack-bar-content.ts` | Snack bar content behavior | Runtime declarations (Directive). Identifies notification labels and action regions. Declares `MatSnackBarLabel`, `MatSnackBarActions`, `MatSnackBarAction` for transient notification. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar-content.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar.md) |
| `src/material/snack-bar/snack-bar-ref.ts` | Snack bar reference behavior | Implementation support. Exposes dismissal, action, and lifecycle notifications for an opened message. Declares `MatSnackBarDismiss`, `MatSnackBarRef` for transient notification. Methods or accessors include `dismiss`, `dismissWithAction`, `closeWithAction`, `afterDismissed`, `afterOpened`, `onAction`. Source includes deprecated declarations; consult the pinned source before treating every declaration as recommended API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar-ref.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar.md) |
| `src/material/snack-bar/snack-bar.ts` | Snack bar behavior | Implementation support. Opens standard, component, or template notifications and dismisses them. Declares `MAT_SNACK_BAR_DEFAULT_OPTIONS`, `MatSnackBar` for transient notification. Methods or accessors include `openFromComponent`, `openFromTemplate`, `open`, `dismiss`, `ngOnDestroy`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar.md) |

### Snack bar: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/snack-bar/snack-bar-module.ts` | Snack bar integration module | Integration module. Declares `MatSnackBarModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar.md) |

### Snack bar: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/snack-bar/index.ts` | Transient notification export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/index.ts) |
| `src/material/snack-bar/public-api.ts` | Transient notification export surface | Export surface. Forwards declarations from `./simple-snack-bar`, `./snack-bar-container`, `./snack-bar-content`, `./snack-bar`, `./snack-bar-module`, `./snack-bar-config`, `./snack-bar-ref`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/public-api.ts) |
| `src/material/snack-bar/testing/index.ts` | Transient notification export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/testing/index.ts) |
| `src/material/snack-bar/testing/public-api.ts` | Transient notification export surface | Export surface. Forwards declarations from `./snack-bar-harness`, `./snack-bar-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/testing/public-api.ts) |

### Snack bar: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/snack-bar/simple-snack-bar.html` | Simple snack bar view template | Content template. Defines the internal view for simple snack bar; rendered elements include `div`, `button`. Includes conditional or repeated content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/simple-snack-bar.html) |
| `src/material/snack-bar/snack-bar-container.html` | Snack bar container view template | Content template. Defines the internal view for snack bar container; rendered elements include `div`, `ng-template`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar-container.html) |

### Snack bar: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/snack-bar/_m2-snack-bar.scss` | Snack bar legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for snack bar. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/_m2-snack-bar.scss) |
| `src/material/snack-bar/_m3-snack-bar.scss` | Snack bar design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for snack bar. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/_m3-snack-bar.scss) |
| `src/material/snack-bar/_snack-bar-theme.scss` | Snack bar theme theme adapter | Styles and tokens. Emits configurable styling for transient notification. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/_snack-bar-theme.scss) |
| `src/material/snack-bar/simple-snack-bar.scss` | Simple snack bar styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for simple snack bar. Selectors include `.mat-mdc-simple-snack-bar`, `.mat-mdc-snack-bar-label`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/simple-snack-bar.scss) |
| `src/material/snack-bar/snack-bar-container.scss` | Snack bar container styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for snack bar container. Selectors include `.mat-mdc-snack-bar-container`, `.mat-mdc-snack-bar-handset`, `.mat-snack-bar-container-animations-enabled`, `.mat-mdc-snackbar-surface`, `.mdc-snackbar__label` and 3 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar-container.scss) |

### Snack bar: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/snack-bar/testing/snack-bar-harness-filters.ts` | Snack bar test query filters | Test-driver contract. Declares `SnackBarHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/testing/snack-bar-harness-filters.ts) |
| `src/material/snack-bar/testing/snack-bar-harness.ts` | Snack bar test driver | Test driver. Declares `MatSnackBarHarness`; operations include `with`, `getRole`, `getAriaLive`, `hasAction`, `getActionDescription`, `dismissWithAction`, `getMessage`, `isDismissed`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/testing/snack-bar-harness.ts) |

### Snack bar: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/snack-bar/snack-bar.spec.ts` | Snack bar verification | Behavior tests. Contains 53 literal test declarations for `MatSnackBar`, `with custom component`, `with TemplateRef`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar.spec.ts) |
| `src/material/snack-bar/snack-bar.zone.spec.ts` | Snack bar.zone verification | Behavior tests. Contains 2 literal test declarations for `MatSnackBar Zone.js integration`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar.zone.spec.ts) |
| `src/material/snack-bar/testing/snack-bar-harness.spec.ts` | Snack bar harness verification | Behavior tests. Contains 13 literal test declarations for `MatSnackBarHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/testing/snack-bar-harness.spec.ts) |

### Snack bar: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/snack-bar/README.md` | Transient notification documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/README.md) |
| `src/material/snack-bar/snack-bar.md` | Transient notification usage guide | Documentation. Displays a temporary notification using message text or custom content. Covers Opening a snackbar; Dismissal; Sharing data with a custom snackbar. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/snack-bar.md) |

### Snack bar: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/snack-bar/BUILD.bazel` | Transient notification build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `container_css`, `css`, `snack-bar`, `unit_test_sources`, `unit_tests` and 3 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/BUILD.bazel) |
| `src/material/snack-bar/testing/BUILD.bazel` | Transient notification build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/snack-bar/testing/BUILD.bazel) |

## Subcategory: Tooltip — Contextual text hint

Shows a short label associated with a host element during relevant user interactions.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/tooltip.md), [live API navigation](https://material.angular.dev/components/tooltip/api). The live page is not the fixed-version evidence.

### Tooltip: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/tooltip/testing` | Contextual text hint test library entry | Published test-support entry. Exposes test drivers or contracts for contextual text hint, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/testing) |

### Tooltip: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tooltip/testing/` | Contextual text hint testing folder | Source folder. Groups 6 direct files and 0 direct subfolders for contextual text hint. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/testing) |

### Tooltip: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tooltip/tooltip.ts` | Tooltip behavior | Runtime declarations (Component, Directive). Coordinates trigger behavior, delays, position, and rendering of contextual help text. Declares `TooltipPosition`, `TooltipTouchGestures`, `TooltipVisibility`, `SCROLL_THROTTLE_MS`, `getMatTooltipInvalidPositionError`, `MAT_TOOLTIP_SCROLL_STRATEGY`, `MAT_TOOLTIP_DEFAULT_OPTIONS` and 4 more for contextual text hint. Methods or accessors include `position`, `positionAtOrigin`, `disabled`, `showDelay`, `hideDelay`, `message` and 8 more. Source includes deprecated declarations; consult the pinned source before treating every declaration as recommended API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/tooltip.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/tooltip.md) |

### Tooltip: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tooltip/tooltip-module.ts` | Tooltip integration module | Integration module. Declares `MatTooltipModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/tooltip-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/tooltip.md) |

### Tooltip: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tooltip/index.ts` | Contextual text hint export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/index.ts) |
| `src/material/tooltip/public-api.ts` | Contextual text hint export surface | Export surface. Forwards declarations from `./tooltip`, `./tooltip-module`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/public-api.ts) |
| `src/material/tooltip/testing/index.ts` | Contextual text hint export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/testing/index.ts) |
| `src/material/tooltip/testing/public-api.ts` | Contextual text hint export surface | Export surface. Forwards declarations from `./tooltip-harness`, `./tooltip-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/testing/public-api.ts) |

### Tooltip: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tooltip/tooltip.html` | Tooltip view template | Content template. Defines the internal view for tooltip; rendered elements include `div`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/tooltip.html) |

### Tooltip: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tooltip/_m2-tooltip.scss` | Tooltip legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for tooltip. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/_m2-tooltip.scss) |
| `src/material/tooltip/_m3-tooltip.scss` | Tooltip design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for tooltip. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/_m3-tooltip.scss) |
| `src/material/tooltip/_tooltip-theme.scss` | Tooltip theme theme adapter | Styles and tokens. Emits configurable styling for contextual text hint. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/_tooltip-theme.scss) |
| `src/material/tooltip/tooltip.scss` | Tooltip styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for tooltip. Selectors include `.mat-mdc-tooltip`, `.mat-mdc-tooltip-panel-below`, `.mat-mdc-tooltip-panel-above`, `.mat-mdc-tooltip-panel-right`, `.mat-mdc-tooltip-panel-left` and 5 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/tooltip.scss) |

### Tooltip: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tooltip/testing/tooltip-harness-filters.ts` | Tooltip test query filters | Test-driver contract. Declares `TooltipHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/testing/tooltip-harness-filters.ts) |
| `src/material/tooltip/testing/tooltip-harness.ts` | Tooltip test driver | Test driver. Declares `MatTooltipHarness`; operations include `with`, `show`, `hide`, `isOpen`, `isDisabled`, `getTooltipText`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/testing/tooltip-harness.ts) |

### Tooltip: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tooltip/testing/tooltip-harness.spec.ts` | Tooltip harness verification | Behavior tests. Contains 6 literal test declarations for `MatTooltipHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/testing/tooltip-harness.spec.ts) |
| `src/material/tooltip/tooltip.spec.ts` | Tooltip verification | Behavior tests. Contains 72 literal test declarations for `MatTooltip`, `basic usage`, `fallback positions`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/tooltip.spec.ts) |
| `src/material/tooltip/tooltip.zone.spec.ts` | Tooltip.zone verification | Behavior tests. Contains 1 literal test declarations for `MatTooltip Zone.js integration`, `scrollable usage`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/tooltip.zone.spec.ts) |

### Tooltip: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tooltip/README.md` | Contextual text hint documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/README.md) |
| `src/material/tooltip/tooltip.md` | Contextual text hint usage guide | Documentation. Shows a short label associated with a host element during relevant user interactions. Covers Positioning; Showing and hiding; Show and hide delays. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/tooltip.md) |

### Tooltip: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tooltip/BUILD.bazel` | Contextual text hint build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `tooltip`, `tooltip_tests_lib`, `unit_tests`, `overview` and 2 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/BUILD.bazel) |
| `src/material/tooltip/testing/BUILD.bazel` | Contextual text hint build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tooltip/testing/BUILD.bazel) |

## Classification notes

- Folder, file, and published export identities are distinct inventory objects.
- Symbol and operation lists summarize inspected declarations; they are not complete API contracts.
- Tests describe intended checks; no upstream test suite was executed.
- Supporting artifacts stay with their owning family; shared foundations are classified once.
