# Icons and graphics

Vector icon display and icon resource management.

Status: consolidated and verified under Steps 6–7 at the fixed [baseline](BASELINE.md).
See the [final report](FINAL_REPORT.md) for coverage, checks, and known limitations.
This category contains 25 primary objects; this is an artifact-role survey,
not an exhaustive symbol-by-symbol API review or runtime test report.
Category boundaries and abstract names are survey interpretations.

## Direct objects

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/icon` | Vector icon library entry | Published runtime entry. Displays icon-font or SVG graphics, with registry support for named icon resources. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon) |
| `src/material/icon/` | Vector icon source family | Source folder. Groups 14 direct files and 1 direct subfolder for vector icon. Displays icon-font or SVG graphics, with registry support for named icon resources. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon) |

## Subcategory: Icon — Vector icon

Displays icon-font or SVG graphics, with registry support for named icon resources.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/icon.md), [live API navigation](https://material.angular.dev/components/icon/api). The live page is not the fixed-version evidence.

### Icon: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/icon/testing` | Vector icon test library entry | Published test-support entry. Exposes test drivers or contracts for vector icon, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/testing) |

### Icon: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/icon/testing/` | Vector icon testing folder | Source folder. Groups 7 direct files and 0 direct subfolders for vector icon. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/testing) |

### Icon: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/icon/icon-registry.ts` | Icon registry behavior | Runtime declarations (Injectable). Registers and resolves SVG resources, icon sets, and font aliases. Declares `getMatIconNameNotFoundError`, `getMatIconNoHttpProviderError`, `getMatIconFailedToSanitizeUrlError`, `getMatIconFailedToSanitizeLiteralError`, `IconOptions`, `IconResolver`, `SafeResourceUrlWithIconOptions` and 1 more for vector icon. Methods or accessors include `addSvgIcon`, `addSvgIconLiteral`, `addSvgIconInNamespace`, `addSvgIconResolver`, `addSvgIconLiteralInNamespace`, `addSvgIconSet` and 10 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/icon-registry.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/icon.md) |
| `src/material/icon/icon.ts` | Icon behavior | Runtime declarations (Component). Displays a configured font or SVG icon and applies icon defaults. Declares `MatIconDefaultOptions`, `MAT_ICON_DEFAULT_OPTIONS`, `MAT_ICON_LOCATION`, `MatIconLocation`, `MatIcon` for vector icon. Methods or accessors include `color`, `svgIcon`, `fontSet`, `fontIcon`, `ngOnInit`, `ngAfterViewChecked` and 1 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/icon.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/icon.md) |
| `src/material/icon/testing/fake-icon-registry.ts` | Fake icon registry behavior | Implementation support. Declares `FakeMatIconRegistry`, `MatIconTestingModule` for vector icon. Methods or accessors include `addSvgIcon`, `addSvgIconLiteral`, `addSvgIconInNamespace`, `addSvgIconLiteralInNamespace`, `addSvgIconSet`, `addSvgIconSetLiteral` and 10 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/testing/fake-icon-registry.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/icon.md) |

### Icon: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/icon/icon-module.ts` | Icon integration module | Integration module. Declares `MatIconModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/icon-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/icon.md) |

### Icon: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/icon/index.ts` | Vector icon export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/index.ts) |
| `src/material/icon/public-api.ts` | Vector icon export surface | Export surface. Forwards declarations from `./icon-module`, `./icon`, `./icon-registry`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/public-api.ts) |
| `src/material/icon/testing/index.ts` | Vector icon export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/testing/index.ts) |
| `src/material/icon/testing/public-api.ts` | Vector icon export surface | Export surface. Forwards declarations from `./icon-harness`, `./icon-harness-filters`, `./fake-icon-registry`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/testing/public-api.ts) |

### Icon: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/icon/_icon-theme.scss` | Icon theme theme adapter | Styles and tokens. Emits configurable styling for vector icon. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/_icon-theme.scss) |
| `src/material/icon/_m2-icon.scss` | Icon legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for icon. Functions include `get-tokens`, `private-get-icon-color-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/_m2-icon.scss) |
| `src/material/icon/_m3-icon.scss` | Icon design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for icon. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/_m3-icon.scss) |
| `src/material/icon/icon.scss` | Icon styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for icon. Selectors include `.mat-icon`, `.mat-form-field`, `.mat-form-field-prefix`, `.mat-form-field-suffix`, `.mat-icon-button`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/icon.scss) |

### Icon: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/icon/testing/icon-harness-filters.ts` | Icon test query filters | Test-driver contract. Declares `IconType`, `IconHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/testing/icon-harness-filters.ts) |
| `src/material/icon/testing/icon-harness.ts` | Icon test driver | Test driver. Declares `MatIconHarness`; operations include `with`, `getType`, `getName`, `getNamespace`, `isInline`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/testing/icon-harness.ts) |

### Icon: test fixtures

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/icon/fake-svgs.ts` | Icon response fixtures | Test fixtures. Provides fake URLs and SVG documents for icon tests; these are test data, not application icon assets. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/fake-svgs.ts) |

### Icon: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/icon/icon.spec.ts` | Icon verification | Behavior tests. Contains 60 literal test declarations for `MatIcon`, `Ligature icons`, `Ligature icons by attribute`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/icon.spec.ts) |
| `src/material/icon/testing/icon-harness.spec.ts` | Icon harness verification | Behavior tests. Contains 8 literal test declarations for `MatIconHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/testing/icon-harness.spec.ts) |

### Icon: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/icon/README.md` | Vector icon documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/README.md) |
| `src/material/icon/icon.md` | Vector icon usage guide | Documentation. Displays icon-font or SVG graphics, with registry support for named icon resources. Covers Registering icons; Font icons with ligatures; Font icons with CSS. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/icon.md) |

### Icon: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/icon/BUILD.bazel` | Vector icon build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `icon`, `unit_test_sources`, `unit_tests`, `overview` and 2 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/BUILD.bazel) |
| `src/material/icon/testing/BUILD.bazel` | Vector icon build definition | Build tooling. Declares `load`, `package`, `ng_project`, `filegroup`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/icon/testing/BUILD.bazel) |

## Classification notes

- Folder, file, and published export identities are distinct inventory objects.
- Symbol and operation lists summarize inspected declarations; they are not complete API contracts.
- Tests describe intended checks; no upstream test suite was executed.
- Supporting artifacts stay with their owning family; shared foundations are classified once.
