# Layout and containers

Content grouping, separation, disclosure, and spatial arrangement.

Status: consolidated and verified under Steps 6–7 at the fixed [baseline](BASELINE.md).
See the [final report](FINAL_REPORT.md) for coverage, checks, and known limitations.
This category contains 111 primary objects; this is an artifact-role survey,
not an exhaustive symbol-by-symbol API review or runtime test report.
Category boundaries and abstract names are survey interpretations.

## Direct objects

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/card` | Content card library entry | Published runtime entry. Groups content about one subject with optional title, media, and action sections. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card) |
| `@angular/material/divider` | Visual separator library entry | Published runtime entry. Separates content using a horizontal or vertical line. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider) |
| `@angular/material/expansion` | Disclosure panel library entry | Published runtime entry. Pairs a summary header with content that can be expanded or collapsed. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion) |
| `@angular/material/grid-list` | Tiled layout library entry | Published runtime entry. Arranges tiles in a grid with configured columns, sizes, and spacing. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list) |
| `src/material/card/` | Content card source family | Source folder. Groups 16 direct files and 1 direct subfolder for content card. Groups content about one subject with optional title, media, and action sections. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card) |
| `src/material/divider/` | Visual separator source family | Source folder. Groups 13 direct files and 1 direct subfolder for visual separator. Separates content using a horizontal or vertical line. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider) |
| `src/material/expansion/` | Disclosure panel source family | Source folder. Groups 21 direct files and 1 direct subfolder for disclosure panel. Pairs a summary header with content that can be expanded or collapsed. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion) |
| `src/material/grid-list/` | Tiled layout source family | Source folder. Groups 19 direct files and 1 direct subfolder for tiled layout. Arranges tiles in a grid with configured columns, sizes, and spacing. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list) |

## Subcategory: Card — Content card

Groups content about one subject with optional title, media, and action sections.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/card.md), [live API navigation](https://material.angular.dev/components/card/api). The live page is not the fixed-version evidence.

### Card: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/card/testing` | Content card test library entry | Published test-support entry. Exposes test drivers or contracts for content card, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/testing) |

### Card: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/card/testing/` | Content card testing folder | Source folder. Groups 6 direct files and 0 direct subfolders for content card. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/testing) |

### Card: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/card/card.ts` | Card behavior | Runtime declarations (Component, Directive). Defines the card container and its title, subtitle, media, content, footer, and action sections. Declares `MatCardAppearance`, `MatCardConfig`, `MAT_CARD_CONFIG`, `MatCard`, `MatCardTitle`, `MatCardTitleGroup`, `MatCardContent` and 10 more for content card. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/card.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/card.md) |

### Card: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/card/card-module.ts` | Card integration module | Integration module. Declares `MatCardModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/card-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/card.md) |

### Card: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/card/index.ts` | Content card export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/index.ts) |
| `src/material/card/public-api.ts` | Content card export surface | Export surface. Forwards declarations from `./card`, `./card-module`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/public-api.ts) |
| `src/material/card/testing/index.ts` | Content card export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/testing/index.ts) |
| `src/material/card/testing/public-api.ts` | Content card export surface | Export surface. Forwards declarations from `./card-harness`, `./card-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/testing/public-api.ts) |

### Card: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/card/card-header.html` | Card header view template | Content template. Defines the internal view for card header; rendered elements include `ng-content`, `div`. Projects content through `[mat-card-avatar], [matCardAvatar]`, `mat-card-title, mat-card-subtitle,       [mat-card-title], [mat-card-subtitle],       [matCardTitle], [matCardSubtitle]`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/card-header.html) |
| `src/material/card/card-title-group.html` | Card title group view template | Content template. Defines the internal view for card title group; rendered elements include `div`, `ng-content`. Projects content through `mat-card-title, mat-card-subtitle,       [mat-card-title], [mat-card-subtitle],       [matCardTitle], [matCardSubtitle]`, `[mat-card-image], [matCardImage],                     [mat-card-sm-image], [matCardImageSmall],                     [mat-card-md-image], [matCardImageMedium],                     [mat-card-lg-image], [matCardImageLarge],                     [mat-card-xl-image], [matCardImageXLarge]`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/card-title-group.html) |
| `src/material/card/card.html` | Card view template | Content template. Defines the internal view for card; rendered elements include `ng-content`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/card.html) |

### Card: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/card/_card-theme.scss` | Card theme theme adapter | Styles and tokens. Emits configurable styling for content card. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/_card-theme.scss) |
| `src/material/card/_m2-card.scss` | Card legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for card. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/_m2-card.scss) |
| `src/material/card/_m3-card.scss` | Card design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for card. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/_m3-card.scss) |
| `src/material/card/card.scss` | Card styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for card. Selectors include `.mat-mdc-card`, `.mat-mdc-card-outlined`, `.mat-mdc-card-filled`, `.mdc-card__media`, `.mat-mdc-card-actions` and 11 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/card.scss) |

### Card: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/card/testing/card-harness-filters.ts` | Card test query filters | Test-driver contract. Declares `CardHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/testing/card-harness-filters.ts) |
| `src/material/card/testing/card-harness.ts` | Card test driver | Test driver. Declares `MatCardSection`, `MatCardHarness`; operations include `with`, `getText`, `getTitleText`, `getSubtitleText`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/testing/card-harness.ts) |

### Card: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/card/card.spec.ts` | Card verification | Behavior tests. Contains 3 literal test declarations for `MatCard`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/card.spec.ts) |
| `src/material/card/testing/card-harness.spec.ts` | Card harness verification | Behavior tests. Contains 12 literal test declarations for `MatCardHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/testing/card-harness.spec.ts) |

### Card: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/card/README.md` | Content card documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/README.md) |
| `src/material/card/card.md` | Content card usage guide | Documentation. Groups content about one subject with optional title, media, and action sections. Covers Basic card sections; Card padding; Card headers. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/card.md) |
| `src/material/card/migration.md` | Content card migration notes | Documentation. Describes compatibility changes in the component migration; historical migration notes are not a new public API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/migration.md) |

### Card: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/card/BUILD.bazel` | Content card build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `card`, `unit_test_sources`, `unit_tests`, `overview` and 2 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/BUILD.bazel) |
| `src/material/card/testing/BUILD.bazel` | Content card build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/card/testing/BUILD.bazel) |

## Subcategory: Divider — Visual separator

Separates content using a horizontal or vertical line.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/divider.md), [live API navigation](https://material.angular.dev/components/divider/api). The live page is not the fixed-version evidence.

### Divider: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/divider/testing` | Visual separator test library entry | Published test-support entry. Exposes test drivers or contracts for visual separator, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/testing) |

### Divider: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/divider/testing/` | Visual separator testing folder | Source folder. Groups 6 direct files and 0 direct subfolders for visual separator. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/testing) |

### Divider: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/divider/divider.ts` | Divider behavior | Runtime declarations (Component). Configures the orientation and inset of a visual separator. Declares `MatDivider` for visual separator. Methods or accessors include `vertical`, `inset`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/divider.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/divider.md) |

### Divider: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/divider/divider-module.ts` | Divider integration module | Integration module. Declares `MatDividerModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/divider-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/divider.md) |

### Divider: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/divider/index.ts` | Visual separator export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/index.ts) |
| `src/material/divider/public-api.ts` | Visual separator export surface | Export surface. Forwards declarations from `./divider`, `./divider-module`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/public-api.ts) |
| `src/material/divider/testing/index.ts` | Visual separator export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/testing/index.ts) |
| `src/material/divider/testing/public-api.ts` | Visual separator export surface | Export surface. Forwards declarations from `./divider-harness`, `./divider-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/testing/public-api.ts) |

### Divider: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/divider/_divider-offset.scss` | Divider offset styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for divider offset. Mixins include `inset-divider-offset`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/_divider-offset.scss) |
| `src/material/divider/_divider-theme.scss` | Divider theme theme adapter | Styles and tokens. Emits configurable styling for visual separator. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/_divider-theme.scss) |
| `src/material/divider/_m2-divider.scss` | Divider legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for divider. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/_m2-divider.scss) |
| `src/material/divider/_m3-divider.scss` | Divider design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for divider. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/_m3-divider.scss) |
| `src/material/divider/divider.scss` | Divider styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for divider. Selectors include `.mat-divider`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/divider.scss) |

### Divider: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/divider/testing/divider-harness-filters.ts` | Divider test query filters | Test-driver contract. Declares `DividerHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/testing/divider-harness-filters.ts) |
| `src/material/divider/testing/divider-harness.ts` | Divider test driver | Test driver. Declares `MatDividerHarness`; operations include `with`, `getOrientation`, `isInset`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/testing/divider-harness.ts) |

### Divider: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/divider/divider.spec.ts` | Divider verification | Behavior tests. Contains 5 literal test declarations for `MatDivider`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/divider.spec.ts) |
| `src/material/divider/testing/divider-harness.spec.ts` | Divider harness verification | Behavior tests. Contains 3 literal test declarations for `MatLegacyButtonHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/testing/divider-harness.spec.ts) |

### Divider: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/divider/README.md` | Visual separator documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/README.md) |
| `src/material/divider/divider.md` | Visual separator usage guide | Documentation. Separates content using a horizontal or vertical line. Covers Simple divider; Inset divider; Vertical divider. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/divider.md) |

### Divider: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/divider/BUILD.bazel` | Visual separator build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `offset_sass`, `css`, `divider`, `unit_test_sources`, `unit_tests` and 3 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/BUILD.bazel) |
| `src/material/divider/testing/BUILD.bazel` | Visual separator build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/divider/testing/BUILD.bazel) |

## Subcategory: Expansion — Disclosure panel

Pairs a summary header with content that can be expanded or collapsed.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion.md), [live API navigation](https://material.angular.dev/components/expansion/api). The live page is not the fixed-version evidence.

### Expansion: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/expansion/testing` | Disclosure panel test library entry | Published test-support entry. Exposes test drivers or contracts for disclosure panel, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/testing) |

### Expansion: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/expansion/testing/` | Disclosure panel testing folder | Source folder. Groups 7 direct files and 0 direct subfolders for disclosure panel. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/testing) |

### Expansion: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/expansion/accordion.ts` | Accordion behavior | Runtime declarations (Directive). Coordinates a group of expansion panels. Declares `MatAccordion` for disclosure panel. Methods or accessors include `ngAfterContentInit`, `ngOnDestroy`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/accordion.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion.md) |
| `src/material/expansion/expansion-panel-content.ts` | Expansion panel content behavior | Runtime declarations (Directive). Captures content for deferred rendering inside an expansion panel. Declares `MatExpansionPanelContent` for disclosure panel. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion-panel-content.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion.md) |
| `src/material/expansion/expansion-panel-header.ts` | Expansion panel header behavior | Runtime declarations (Component, Directive). Provides the interactive summary header, title, and description. Declares `MatExpansionPanelHeader`, `MatExpansionPanelDescription`, `MatExpansionPanelTitle` for disclosure panel. Methods or accessors include `disabled`, `focus`, `ngAfterViewInit`, `ngOnDestroy`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion-panel-header.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion.md) |
| `src/material/expansion/expansion-panel.ts` | Expansion panel behavior | Runtime declarations (Component, Directive). Implements panel expansion, collapse, configuration, and action content. Declares `MatExpansionPanelState`, `MatExpansionPanelDefaultOptions`, `MAT_EXPANSION_PANEL_DEFAULT_OPTIONS`, `MatExpansionPanel`, `MatExpansionPanelActionRow` for disclosure panel. Methods or accessors include `hideToggle`, `togglePosition`, `toggle`, `close`, `open`, `ngAfterContentInit` and 2 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion-panel.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion.md) |

### Expansion: internal support

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/expansion/accordion-base.ts` | Accordion base contract | Types, constants, or helpers. Defines the shared accordion contract and dependency-injection identity. Declares `MatAccordionDisplayMode`, `MatAccordionTogglePosition`, `MatAccordionBase`, `MAT_ACCORDION` for disclosure panel. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/accordion-base.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion.md) |
| `src/material/expansion/expansion-panel-base.ts` | Expansion panel base contract | Types, constants, or helpers. Defines the expansion-panel contract used to avoid circular dependencies. Declares `MatExpansionPanelBase`, `MAT_EXPANSION_PANEL` for disclosure panel. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion-panel-base.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion.md) |

### Expansion: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/expansion/expansion-module.ts` | Expansion integration module | Integration module. Declares `MatExpansionModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion.md) |

### Expansion: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/expansion/index.ts` | Disclosure panel export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/index.ts) |
| `src/material/expansion/public-api.ts` | Disclosure panel export surface | Export surface. Forwards declarations from `./expansion-module`, `./accordion`, `./accordion-base`, `./expansion-panel`, `./expansion-panel-header`, `./expansion-panel-content`, `./expansion-panel-base`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/public-api.ts) |
| `src/material/expansion/testing/index.ts` | Disclosure panel export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/testing/index.ts) |
| `src/material/expansion/testing/public-api.ts` | Disclosure panel export surface | Export surface. Forwards declarations from `./accordion-harness`, `./expansion-harness`, `./expansion-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/testing/public-api.ts) |

### Expansion: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/expansion/expansion-panel-header.html` | Expansion panel header view template | Content template. Defines the internal view for expansion panel header; rendered elements include `span`, `ng-content`, `svg`, `path`. Projects content through `mat-panel-title`, `mat-panel-description`. Includes conditional or repeated content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion-panel-header.html) |
| `src/material/expansion/expansion-panel.html` | Expansion panel view template | Content template. Defines the internal view for expansion panel; rendered elements include `ng-content`, `div`, `ng-template`. Projects content through `mat-expansion-panel-header`, `mat-action-row`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion-panel.html) |

### Expansion: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/expansion/_expansion-theme.scss` | Expansion theme theme adapter | Styles and tokens. Emits configurable styling for disclosure panel. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/_expansion-theme.scss) |
| `src/material/expansion/_expansion-variables.scss` | Expansion variables styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for expansion variables. Declares `header-collapsed-height`, `header-collapsed-minimum-height`, `header-collapsed-maximum-height`, `header-expanded-height`, `header-expanded-minimum-height` and 3 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/_expansion-variables.scss) |
| `src/material/expansion/_m2-expansion.scss` | Expansion legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for expansion. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/_m2-expansion.scss) |
| `src/material/expansion/_m3-expansion.scss` | Expansion design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for expansion. Functions include `get-tokens`, `get-density-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/_m3-expansion.scss) |
| `src/material/expansion/expansion-panel-header.scss` | Expansion panel header styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for expansion panel header. Selectors include `.mat-expansion-panel-header`, `.mat-expansion-panel-animations-enabled`, `.mat-expansion-panel`, `.mat-expansion-indicator`, `.mat-content` and 4 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion-panel-header.scss) |
| `src/material/expansion/expansion-panel.scss` | Expansion panel styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for expansion panel. Mixins include `_fallback-styles`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion-panel.scss) |

### Expansion: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/expansion/testing/accordion-harness.ts` | Accordion test driver | Test driver. Declares `MatAccordionHarness`; operations include `with`, `getExpansionPanels`, `isMulti`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/testing/accordion-harness.ts) |
| `src/material/expansion/testing/expansion-harness-filters.ts` | Expansion test query filters | Test-driver contract. Declares `AccordionHarnessFilters`, `ExpansionPanelHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/testing/expansion-harness-filters.ts) |
| `src/material/expansion/testing/expansion-harness.ts` | Expansion test driver | Test driver. Declares `MatExpansionPanelSection`, `MatExpansionPanelHarness`; operations include `with`, `isExpanded`, `getTitle`, `getDescription`, `isDisabled`, `toggle`, `expand`, `collapse`, `getTextContent` and 6 more. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/testing/expansion-harness.ts) |

### Expansion: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/expansion/accordion.spec.ts` | Accordion verification | Behavior tests. Contains 15 literal test declarations for `MatAccordion`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/accordion.spec.ts) |
| `src/material/expansion/expansion.spec.ts` | Expansion verification | Behavior tests. Contains 29 literal test declarations for `MatExpansionPanel`, `disabled state`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion.spec.ts) |
| `src/material/expansion/testing/expansion-harness.spec.ts` | Expansion harness verification | Behavior tests. Contains 30 literal test declarations for `MatExpansionHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/testing/expansion-harness.spec.ts) |

### Expansion: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/expansion/expansion.md` | Disclosure panel usage guide | Documentation. Pairs a summary header with content that can be expanded or collapsed. Covers Expansion-panel content; Header; Action bar. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/expansion.md) |

### Expansion: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/expansion/BUILD.bazel` | Disclosure panel build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `header_css`, `variables`, `expansion`, `unit_test_sources` and 4 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/BUILD.bazel) |
| `src/material/expansion/testing/BUILD.bazel` | Disclosure panel build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/expansion/testing/BUILD.bazel) |

## Subcategory: Grid list — Tiled layout

Arranges tiles in a grid with configured columns, sizes, and spacing.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-list.md), [live API navigation](https://material.angular.dev/components/grid-list/api). The live page is not the fixed-version evidence.

### Grid list: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/grid-list/testing` | Tiled layout test library entry | Published test-support entry. Exposes test drivers or contracts for tiled layout, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/testing) |

### Grid list: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/grid-list/testing/` | Tiled layout testing folder | Source folder. Groups 7 direct files and 0 direct subfolders for tiled layout. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/testing) |

### Grid list: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/grid-list/grid-list.ts` | Grid list behavior | Runtime declarations (Component). Coordinates column layout and tile positioning. Declares `MatGridList` for tiled layout. Methods or accessors include `cols`, `gutterSize`, `rowHeight`, `ngOnInit`, `ngAfterContentChecked`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-list.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-list.md) |
| `src/material/grid-list/grid-tile.ts` | Grid tile behavior | Runtime declarations (Component, Directive). Defines a tile with row and column spans plus optional header and footer sections. Declares `MatGridTile`, `MatGridTileText`, `MatGridAvatarCssMatStyler`, `MatGridTileHeaderCssMatStyler`, `MatGridTileFooterCssMatStyler` for tiled layout. Methods or accessors include `rowspan`, `colspan`, `ngAfterContentInit`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-tile.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-list.md) |
| `src/material/grid-list/tile-coordinator.ts` | Tile coordinator behavior | Implementation support. Computes tile placement within a grid. Declares `Tile`, `TileCoordinator`, `TilePosition` for tiled layout. Methods or accessors include `rowCount`, `rowspan`, `update`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/tile-coordinator.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-list.md) |
| `src/material/grid-list/tile-styler.ts` | Tile styler behavior | Implementation support. Applies tile layout styling for the supported sizing strategies. Declares `TileStyleTarget`, `TileStyler`, `FixedTileStyler`, `RatioTileStyler`, `FitTileStyler` for tiled layout. Methods or accessors include `init`, `getBaseTileSize`, `getTilePosition`, `getTileSize`, `setStyle`, `setColStyles` and 5 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/tile-styler.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-list.md) |

### Grid list: internal support

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/grid-list/grid-list-base.ts` | Grid list base contract | Types, constants, or helpers. Defines the grid contract used by its tiles. Declares `MAT_GRID_LIST`, `MatGridListBase` for tiled layout. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-list-base.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-list.md) |

### Grid list: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/grid-list/grid-list-module.ts` | Grid list integration module | Integration module. Declares `MatGridListModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-list-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-list.md) |

### Grid list: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/grid-list/index.ts` | Tiled layout export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/index.ts) |
| `src/material/grid-list/public-api.ts` | Tiled layout export surface | Export surface. Forwards declarations from `./grid-list-module`, `./grid-list`, `./grid-tile`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/public-api.ts) |
| `src/material/grid-list/testing/index.ts` | Tiled layout export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/testing/index.ts) |
| `src/material/grid-list/testing/public-api.ts` | Tiled layout export surface | Export surface. Forwards declarations from `./grid-tile-harness`, `./grid-list-harness`, `./grid-list-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/testing/public-api.ts) |

### Grid list: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/grid-list/grid-list.html` | Grid list view template | Content template. Defines the internal view for grid list; rendered elements include `div`, `ng-content`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-list.html) |
| `src/material/grid-list/grid-tile-text.html` | Grid tile text view template | Content template. Defines the internal view for grid tile text; rendered elements include `ng-content`, `div`. Projects content through `[mat-grid-avatar], [matGridAvatar]`, `[mat-line], [matLine]`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-tile-text.html) |
| `src/material/grid-list/grid-tile.html` | Grid tile view template | Content template. Defines the internal view for grid tile; rendered elements include `div`, `ng-content`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-tile.html) |

### Grid list: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/grid-list/_grid-list-theme.scss` | Grid list theme theme adapter | Styles and tokens. Emits configurable styling for tiled layout. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/_grid-list-theme.scss) |
| `src/material/grid-list/_m2-grid-list.scss` | Grid list legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for grid list. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/_m2-grid-list.scss) |
| `src/material/grid-list/_m3-grid-list.scss` | Grid list design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for grid list. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/_m3-grid-list.scss) |
| `src/material/grid-list/grid-list.scss` | Grid list styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for grid list. Selectors include `.mat-grid-list`, `.mat-grid-tile`, `.mat-grid-tile-header`, `.mat-grid-tile-footer`, `.mat-grid-list-text` and 2 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-list.scss) |

### Grid list: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/grid-list/testing/grid-list-harness-filters.ts` | Grid list test query filters | Test-driver contract. Declares `GridListHarnessFilters`, `GridTileHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/testing/grid-list-harness-filters.ts) |
| `src/material/grid-list/testing/grid-list-harness.ts` | Grid list test driver | Test driver. Declares `MatGridListHarness`; operations include `with`, `getTiles`, `getColumns`, `getTileAtPosition`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/testing/grid-list-harness.ts) |
| `src/material/grid-list/testing/grid-tile-harness.ts` | Grid tile test driver | Test driver. Declares `MatGridTileSection`, `MatGridTileHarness`; operations include `with`, `getRowspan`, `getColspan`, `hasHeader`, `hasFooter`, `hasAvatar`, `getHeaderText`, `getFooterText`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/testing/grid-tile-harness.ts) |

### Grid list: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/grid-list/grid-list.spec.ts` | Grid list verification | Behavior tests. Contains 34 literal test declarations for `MatGridList`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-list.spec.ts) |
| `src/material/grid-list/testing/grid-list-harness.spec.ts` | Grid list harness verification | Behavior tests. Contains 16 literal test declarations for `MatGridListHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/testing/grid-list-harness.spec.ts) |

### Grid list: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/grid-list/README.md` | Tiled layout documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/README.md) |
| `src/material/grid-list/grid-list.md` | Tiled layout usage guide | Documentation. Arranges tiles in a grid with configured columns, sizes, and spacing. Covers Setting the number of columns; Setting the row height; Setting the gutter size. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-list.md) |

### Grid list: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/grid-list/BUILD.bazel` | Tiled layout build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `grid-list`, `unit_test_sources`, `unit_tests`, `overview` and 2 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/BUILD.bazel) |
| `src/material/grid-list/testing/BUILD.bazel` | Tiled layout build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/testing/BUILD.bazel) |

## Classification notes

- Folder, file, and published export identities are distinct inventory objects.
- Symbol and operation lists summarize inspected declarations; they are not complete API contracts.
- Tests describe intended checks; no upstream test suite was executed.
- Supporting artifacts stay with their owning family; shared foundations are classified once.
