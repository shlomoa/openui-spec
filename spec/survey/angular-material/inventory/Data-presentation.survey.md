# Data presentation

Item collections, hierarchies, and tabular presentation with paging and sorting controls.

Status: consolidated and verified under Steps 6–7 at the fixed [baseline](BASELINE.md).
See the [final report](FINAL_REPORT.md) for coverage, checks, and known limitations.
This category contains 153 primary objects; this is an artifact-role survey,
not an exhaustive symbol-by-symbol API review or runtime test report.
Category boundaries and abstract names are survey interpretations.

## Direct objects

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/list` | Item list library entry | Published runtime entry. Presents items in list, navigation, action, and selection variants. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list) |
| `@angular/material/paginator` | Page navigator library entry | Published runtime entry. Controls the current page and page size for a larger collection. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator) |
| `@angular/material/sort` | Sort controller library entry | Published runtime entry. Maintains sort state and exposes interactive sort headers; consumers apply the resulting ordering. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort) |
| `@angular/material/table` | Data table library entry | Published runtime entry. Renders rows and columns over the underlying table infrastructure, with separate data-source support. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table) |
| `@angular/material/tree` | Hierarchy view library entry | Published runtime entry. Presents parent-child data through tree nodes and expansion controls. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree) |
| `src/material/list/` | Item list source family | Source folder. Groups 27 direct files and 1 direct subfolder for item list. Presents items in list, navigation, action, and selection variants. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list) |
| `src/material/paginator/` | Page navigator source family | Source folder. Groups 13 direct files and 1 direct subfolder for page navigator. Controls the current page and page size for a larger collection. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator) |
| `src/material/sort/` | Sort controller source family | Source folder. Groups 16 direct files and 1 direct subfolder for sort controller. Maintains sort state and exposes interactive sort headers; consumers apply the resulting ordering. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort) |
| `src/material/table/` | Data table source family | Source folder. Groups 18 direct files and 1 direct subfolder for data table. Renders rows and columns over the underlying table infrastructure, with separate data-source support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table) |
| `src/material/tree/` | Hierarchy view source family | Source folder. Groups 17 direct files and 2 direct subfolders for hierarchy view. Presents parent-child data through tree nodes and expansion controls. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree) |

## Subcategory: List — Item list

Presents items in list, navigation, action, and selection variants.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.md), [live API navigation](https://material.angular.dev/components/list/api). The live page is not the fixed-version evidence.

### List: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/list/testing` | Item list test library entry | Published test-support entry. Exposes test drivers or contracts for item list, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/testing) |

### List: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/list/testing/` | Item list testing folder | Source folder. Groups 11 direct files and 0 direct subfolders for item list. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/testing) |

### List: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/list/action-list.ts` | Action list behavior | Runtime declarations (Component). Provides the container for a list of action items. Declares `MatActionList` for item list. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/action-list.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.md) |
| `src/material/list/list-item-sections.ts` | List item sections behavior | Runtime declarations (Directive). Marks item title and secondary text lines. Declares `MatListItemTitle`, `MatListItemLine`, `MatListItemMeta`, `_MatListItemGraphicBase`, `MatListItemAvatar`, `MatListItemIcon` for item list. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list-item-sections.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.md) |
| `src/material/list/list-option-types.ts` | List option types contract | Types, constants, or helpers. Defines selection-item placement and coordination contracts. Declares `MatListOptionTogglePosition`, `ListOption`, `LIST_OPTION` for item list. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list-option-types.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.md) |
| `src/material/list/list-option.ts` | List option behavior | Runtime declarations (Component). Implements a selectable list item and its relation to the containing selection list. Declares `SELECTION_LIST`, `SelectionList`, `MatListOption` for item list. Methods or accessors include `color`, `value`, `selected`, `ngOnInit`, `ngOnDestroy`, `toggle` and 2 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list-option.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.md) |
| `src/material/list/list.ts` | List behavior | Runtime declarations (Component). Defines basic list and item presentation. Declares `MAT_LIST`, `MatList`, `MatListItem` for item list. Methods or accessors include `activated`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.md) |
| `src/material/list/nav-list.ts` | Nav list behavior | Runtime declarations (Component). Provides a list container for navigation links. Declares `MAT_NAV_LIST`, `MatNavList` for item list. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/nav-list.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.md) |
| `src/material/list/selection-list.ts` | Selection list behavior | Runtime declarations (Component). Coordinates selected items and selection-change events. Declares `MAT_SELECTION_LIST_VALUE_ACCESSOR`, `MatSelectionListChange`, `MatSelectionList` for item list. Methods or accessors include `multiple`, `hideSingleSelectionIndicator`, `ngAfterViewInit`, `ngOnChanges`, `ngOnDestroy`, `focus` and 8 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/selection-list.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.md) |
| `src/material/list/subheader.ts` | Subheader behavior | Runtime declarations (Directive). Applies list-subheader presentation. Declares `MatListSubheaderCssMatStyler` for item list. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/subheader.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.md) |
| `src/material/list/tokens.ts` | Tokens contract | Types, constants, or helpers. Defines default list configuration and its injection token. Declares `MatListConfig`, `MAT_LIST_CONFIG` for item list. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/tokens.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.md) |

### List: internal support

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/list/list-base.ts` | List base behavior | Runtime declarations (Directive). Shares list and list-item interaction and presentation behavior. Declares `MatListBase`, `MatListItemBase` for item list. Methods or accessors include `disableRipple`, `disabled`, `lines`, `rippleDisabled`, `ngAfterViewInit`, `ngOnDestroy`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list-base.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.md) |

### List: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/list/list-module.ts` | List integration module | Integration module. Declares `MatListModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.md) |

### List: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/list/index.ts` | Item list export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/index.ts) |
| `src/material/list/public-api.ts` | Item list export surface | Export surface. Forwards declarations from `./action-list`, `./list`, `./list-module`, `./nav-list`, `./selection-list`, `./list-option`, `./subheader`, `./list-item-sections` and 2 more. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/public-api.ts) |
| `src/material/list/testing/index.ts` | Item list export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/testing/index.ts) |
| `src/material/list/testing/public-api.ts` | Item list export surface | Export surface. Forwards declarations from `./action-list-harness`, `./list-harness`, `./list-harness-filters`, `./nav-list-harness`, `./selection-list-harness`, `./list-item-harness-base`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/testing/public-api.ts) |

### List: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/list/list-item.html` | List item view template | Content template. Defines the internal view for list item; rendered elements include `ng-content`, `span`, `div`. Projects content through `[matListItemAvatar],[matListItemIcon]`, `[matListItemTitle]`, `[matListItemLine]` and 2 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list-item.html) |
| `src/material/list/list-option.html` | List option view template | Content template. Defines the internal view for list option; rendered elements include `ng-template`, `ng-content`, `div`, `input`, `svg`, `path`, `span`. Projects content through `[matListItemAvatar],[matListItemIcon]`, `[matListItemTitle]`, `[matListItemLine]` and 1 more. Includes conditional or repeated content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list-option.html) |

### List: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/list/_list-inherited-structure.scss` | List inherited structure styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for list inherited structure. Mixins include `private-list-inherited-structural-styles`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/_list-inherited-structure.scss) |
| `src/material/list/_list-item-hcm-indicator.scss` | List item hcm indicator styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for list item hcm indicator. Mixins include `private-high-contrast-list-item-indicator`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/_list-item-hcm-indicator.scss) |
| `src/material/list/_list-theme.scss` | List theme theme adapter | Styles and tokens. Emits configurable styling for item list. Mixins include `base`, `color`, `density`, `typography`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/_list-theme.scss) |
| `src/material/list/_m2-list.scss` | List legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for list. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/_m2-list.scss) |
| `src/material/list/_m3-list.scss` | List design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for list. Functions include `get-tokens`, `get-density-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/_m3-list.scss) |
| `src/material/list/list-option.scss` | List option styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for list option. Selectors include `.mat-mdc-list-option-with-trailing-avatar`, `.mdc-list-item__end`, `.mdc-list-item__primary-text`, `.mat-mdc-list-option`, `.mdc-checkbox__native-control`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list-option.scss) |
| `src/material/list/list.scss` | List styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for list. Selectors include `.mdc-list-item`, `.mdc-list-item--disabled`, `.mdc-radio`, `.mdc-checkbox`, `.mdc-list-item--with-leading-avatar` and 14 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.scss) |

### List: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/list/testing/action-list-harness.ts` | Action list test driver | Test driver. Declares `MatActionListHarness`, `MatActionListItemHarness`; operations include `with`, `click`, `focus`, `blur`, `isFocused`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/testing/action-list-harness.ts) |
| `src/material/list/testing/list-harness-base.ts` | List test driver base | Test driver. Declares `ListSection`, `MatListHarnessBase`; operations include `getItems`, `getItemsGroupedBySubheader`, `getItemsGroupedByDividers`, `getItemsWithSubheadersAndDividers`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/testing/list-harness-base.ts) |
| `src/material/list/testing/list-harness-filters.ts` | List test query filters | Test-driver contract. Declares `ListHarnessFilters`, `ActionListHarnessFilters`, `NavListHarnessFilters`, `SelectionListHarnessFilters`, `BaseListItemHarnessFilters`, `ListItemHarnessFilters` and 4 more to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/testing/list-harness-filters.ts) |
| `src/material/list/testing/list-harness.ts` | List test driver | Test driver. Declares `MatListHarness`, `MatListItemHarness`; operations include `with`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/testing/list-harness.ts) |
| `src/material/list/testing/list-item-harness-base.ts` | List item test driver base | Test driver. Declares `getListItemPredicate`, `MatSubheaderHarness`, `MatListItemSection`, `MatListItemType`, `MatListItemHarnessBase`; operations include `with`, `getText`, `getType`, `getFullText`, `getTitle`, `isDisabled`, `getSecondaryText`, `getTertiaryText`, `hasAvatar` and 1 more. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/testing/list-item-harness-base.ts) |
| `src/material/list/testing/nav-list-harness.ts` | Nav list test driver | Test driver. Declares `MatNavListHarness`, `MatNavListItemHarness`; operations include `with`, `getHref`, `click`, `focus`, `blur`, `isFocused`, `isActivated`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/testing/nav-list-harness.ts) |
| `src/material/list/testing/selection-list-harness.ts` | Selection list test driver | Test driver. Declares `MatSelectionListHarness`, `MatListOptionHarness`; operations include `with`, `isDisabled`, `selectItems`, `deselectItems`, `getCheckboxPosition`, `getRadioPosition`, `isSelected`, `focus`, `blur` and 4 more. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/testing/selection-list-harness.ts) |

### List: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/list/list.spec.ts` | List verification | Behavior tests. Contains 28 literal test declarations for `MatList`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.spec.ts) |
| `src/material/list/selection-list.spec.ts` | Selection list verification | Behavior tests. Contains 90 literal test declarations for `MatSelectionList without forms`, `with list option`, `multiple-selection with list option selected`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/selection-list.spec.ts) |
| `src/material/list/testing/list-harness.spec.ts` | List harness verification | Behavior tests. Contains 33 literal test declarations for `base list functionality`, `MatListHarness`, `MatActionListHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/testing/list-harness.spec.ts) |

### List: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/list/README.md` | Item list documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/README.md) |
| `src/material/list/list.md` | Item list usage guide | Documentation. Presents items in list, navigation, action, and selection variants. Covers Simple lists; Multi-line lists; Navigation lists. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/list.md) |

### List: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/list/BUILD.bazel` | Item list build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `list_item_hcm_indicator`, `list_inherited_structure`, `option_css`, `list` and 5 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/BUILD.bazel) |
| `src/material/list/testing/BUILD.bazel` | Item list build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/list/testing/BUILD.bazel) |

## Subcategory: Paginator — Page navigator

Controls the current page and page size for a larger collection.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/paginator.md), [live API navigation](https://material.angular.dev/components/paginator/api). The live page is not the fixed-version evidence.

### Paginator: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/paginator/testing` | Page navigator test library entry | Published test-support entry. Exposes test drivers or contracts for page navigator, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/testing) |

### Paginator: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/paginator/testing/` | Page navigator testing folder | Source folder. Groups 6 direct files and 0 direct subfolders for page navigator. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/testing) |

### Paginator: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/paginator/paginator-intl.ts` | Paginator localized labels behavior | Implementation support. Supplies localizable paging labels and range text. Declares `MatPaginatorIntl` for page navigator. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/paginator-intl.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/paginator.md) |
| `src/material/paginator/paginator.ts` | Paginator behavior | Runtime declarations (Component). Controls page index, page size, total length, and page-change events. Declares `MatPaginatorSelectConfig`, `PageEvent`, `MatPaginatorDefaultOptions`, `MAT_PAGINATOR_DEFAULT_OPTIONS`, `MatPaginator` for page navigator. Methods or accessors include `pageIndex`, `length`, `pageSize`, `pageSizeOptions`, `ngOnInit`, `ngOnDestroy` and 7 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/paginator.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/paginator.md) |

### Paginator: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/paginator/paginator-module.ts` | Paginator integration module | Integration module. Declares `MatPaginatorModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/paginator-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/paginator.md) |

### Paginator: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/paginator/index.ts` | Page navigator export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/index.ts) |
| `src/material/paginator/public-api.ts` | Page navigator export surface | Export surface. Forwards declarations from `./paginator-module`, `./paginator`, `./paginator-intl`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/public-api.ts) |
| `src/material/paginator/testing/index.ts` | Page navigator export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/testing/index.ts) |
| `src/material/paginator/testing/public-api.ts` | Page navigator export surface | Export surface. Forwards declarations from `./paginator-harness`, `./paginator-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/testing/public-api.ts) |

### Paginator: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/paginator/paginator.html` | Paginator view template | Content template. Defines the internal view for paginator; rendered elements include `div`, `mat-form-field`, `mat-select`, `mat-option`, `button`, `svg`, `path`. Includes conditional or repeated content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/paginator.html) |

### Paginator: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/paginator/_m2-paginator.scss` | Paginator legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for paginator. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/_m2-paginator.scss) |
| `src/material/paginator/_m3-paginator.scss` | Paginator design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for paginator. Functions include `get-tokens`, `get-density-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/_m3-paginator.scss) |
| `src/material/paginator/_paginator-theme.scss` | Paginator theme theme adapter | Styles and tokens. Emits configurable styling for page navigator. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/_paginator-theme.scss) |
| `src/material/paginator/paginator.scss` | Paginator styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for paginator. Selectors include `.mat-mdc-paginator`, `.mat-mdc-select-value`, `.mat-mdc-form-field-subscript-wrapper`, `.mat-mdc-select`, `.mat-mdc-paginator-outer-container` and 9 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/paginator.scss) |

### Paginator: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/paginator/testing/paginator-harness-filters.ts` | Paginator test query filters | Test-driver contract. Declares `PaginatorHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/testing/paginator-harness-filters.ts) |
| `src/material/paginator/testing/paginator-harness.ts` | Paginator test driver | Test driver. Declares `MatPaginatorHarness`; operations include `with`, `goToNextPage`, `isNextPageDisabled`, `isPreviousPageDisabled`, `goToPreviousPage`, `goToFirstPage`, `goToLastPage`, `setPageSize`, `getPageSize` and 1 more. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/testing/paginator-harness.ts) |

### Paginator: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/paginator/paginator.spec.ts` | Paginator verification | Behavior tests. Contains 38 literal test declarations for `MatPaginator`, `with the default internationalization provider`, `showing the right range text`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/paginator.spec.ts) |
| `src/material/paginator/testing/paginator-harness.spec.ts` | Paginator harness verification | Behavior tests. Contains 13 literal test declarations for `MatPaginatorHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/testing/paginator-harness.spec.ts) |

### Paginator: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/paginator/paginator.md` | Page navigator usage guide | Documentation. Controls the current page and page size for a larger collection. Covers Basic use; Page size options; Internationalization. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/paginator.md) |

### Paginator: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/paginator/BUILD.bazel` | Page navigator build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `paginator`, `paginator_tests_lib`, `unit_tests`, `overview` and 2 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/BUILD.bazel) |
| `src/material/paginator/testing/BUILD.bazel` | Page navigator build definition | Build tooling. Declares `load`, `package`, `ts_project`, `ng_project`, `ng_web_test_suite`, `filegroup` rules; named targets include `testing`, `unit_tests_lib`, `unit_tests`, `source-files`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/paginator/testing/BUILD.bazel) |

## Subcategory: Sort — Sort controller

Maintains sort state and exposes interactive sort headers; consumers apply the resulting ordering.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort.md), [live API navigation](https://material.angular.dev/components/sort/api). The live page is not the fixed-version evidence.

### Sort: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/sort/testing` | Sort controller test library entry | Published test-support entry. Exposes test drivers or contracts for sort controller, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/testing) |

### Sort: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sort/testing/` | Sort controller testing folder | Source folder. Groups 7 direct files and 0 direct subfolders for sort controller. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/testing) |

### Sort: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sort/sort-direction.ts` | Sort direction contract | Types, constants, or helpers. Defines the supported sort-direction values. Declares `SortDirection` for sort controller. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort-direction.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort.md) |
| `src/material/sort/sort-errors.ts` | Sort errors contract | Types, constants, or helpers. Creates diagnostics for invalid or duplicate sort-header configuration. Declares `getSortDuplicateSortableIdError`, `getSortHeaderNotContainedWithinSortError`, `getSortHeaderMissingIdError`, `getSortInvalidDirectionError` for sort controller. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort-errors.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort.md) |
| `src/material/sort/sort-header-intl.ts` | Sort header localized labels behavior | Implementation support. Provides sort-header internationalization change notification. Declares `MatSortHeaderIntl` for sort controller. Source includes deprecated declarations; consult the pinned source before treating every declaration as recommended API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort-header-intl.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort.md) |
| `src/material/sort/sort-header.ts` | Sort header behavior | Runtime declarations (Component). Implements the interactive sort header and its accessible action description. Declares `MatSortHeader` for sort controller. Methods or accessors include `sortActionDescription`, `ngOnInit`, `ngAfterViewInit`, `ngOnDestroy`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort-header.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort.md) |
| `src/material/sort/sort.ts` | Sort behavior | Runtime declarations (Directive). Registers sortables and determines their next ordering direction. Declares `SortHeaderArrowPosition`, `MatSortable`, `Sort`, `MatSortDefaultOptions`, `MAT_SORT_DEFAULT_OPTIONS`, `MatSort` for sort controller. Methods or accessors include `direction`, `register`, `deregister`, `sort`, `getNextSortDirection`, `ngOnInit` and 2 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort.md) |

### Sort: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sort/sort-module.ts` | Sort integration module | Integration module. Declares `MatSortModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort.md) |

### Sort: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sort/index.ts` | Sort controller export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/index.ts) |
| `src/material/sort/public-api.ts` | Sort controller export surface | Export surface. Forwards declarations from `./sort-module`, `./sort-direction`, `./sort-header`, `./sort-header-intl`, `./sort`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/public-api.ts) |
| `src/material/sort/testing/index.ts` | Sort controller export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/testing/index.ts) |
| `src/material/sort/testing/public-api.ts` | Sort controller export surface | Export surface. Forwards declarations from `./sort-harness`, `./sort-header-harness`, `./sort-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/testing/public-api.ts) |

### Sort: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sort/sort-header.html` | Sort header view template | Content template. Defines the internal view for sort header; rendered elements include `div`, `ng-content`, `svg`, `path`. Projects content through `[matSortHeaderIcon]`. Includes conditional or repeated content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort-header.html) |

### Sort: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sort/_m2-sort.scss` | Sort legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for sort. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/_m2-sort.scss) |
| `src/material/sort/_m3-sort.scss` | Sort design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for sort. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/_m3-sort.scss) |
| `src/material/sort/_sort-theme.scss` | Sort theme theme adapter | Styles and tokens. Emits configurable styling for sort controller. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/_sort-theme.scss) |
| `src/material/sort/sort-header.scss` | Sort header styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for sort header. Selectors include `.mat-sort-header`, `.mat-sort-header-disabled`, `.mat-sort-header-container`, `.mat-sort-header-content`, `.mat-sort-header-position-before` and 5 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort-header.scss) |

### Sort: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sort/testing/sort-harness-filters.ts` | Sort test query filters | Test-driver contract. Declares `SortHarnessFilters`, `SortHeaderHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/testing/sort-harness-filters.ts) |
| `src/material/sort/testing/sort-harness.ts` | Sort test driver | Test driver. Declares `MatSortHarness`; operations include `with`, `getSortHeaders`, `getActiveHeader`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/testing/sort-harness.ts) |
| `src/material/sort/testing/sort-header-harness.ts` | Sort header test driver | Test driver. Declares `MatSortHeaderHarness`; operations include `with`, `getLabel`, `getSortDirection`, `isActive`, `isDisabled`, `click`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/testing/sort-header-harness.ts) |

### Sort: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sort/sort.spec.ts` | Sort verification | Behavior tests. Contains 26 literal test declarations for `MatSort`, `without default options`, `with default options`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort.spec.ts) |
| `src/material/sort/testing/sort-harness.spec.ts` | Sort harness verification | Behavior tests. Contains 10 literal test declarations for `MatSortHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/testing/sort-harness.spec.ts) |

### Sort: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sort/sort.md` | Sort controller usage guide | Documentation. Maintains sort state and exposes interactive sort headers; consumers apply the resulting ordering. Covers Adding sort to table headers; Changing the sort order; Disabling sorting. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/sort.md) |

### Sort: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sort/BUILD.bazel` | Sort controller build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `sort`, `unit_test_sources`, `unit_tests`, `overview` and 2 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/BUILD.bazel) |
| `src/material/sort/testing/BUILD.bazel` | Sort controller build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sort/testing/BUILD.bazel) |

## Subcategory: Table — Data table

Renders rows and columns over the underlying table infrastructure, with separate data-source support.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/table.md), [live API navigation](https://material.angular.dev/components/table/api). The live page is not the fixed-version evidence.

### Table: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/table/testing` | Data table test library entry | Published test-support entry. Exposes test drivers or contracts for data table, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/testing) |

### Table: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/table/testing/` | Data table testing folder | Source folder. Groups 8 direct files and 0 direct subfolders for data table. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/testing) |

### Table: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/table/cell.ts` | Cell behavior | Runtime declarations (Directive). Defines data, header, and footer cell templates and column identities. Declares `MatCellDef`, `MatHeaderCellDef`, `MatFooterCellDef`, `MatColumnDef`, `MatHeaderCell`, `MatFooterCell`, `MatCell` for data table. Methods or accessors include `name`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/cell.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/table.md) |
| `src/material/table/row.ts` | Row behavior | Runtime declarations (Component, Directive). Defines row templates and containers, including an empty-data row. Declares `MatHeaderRowDef`, `MatFooterRowDef`, `MatRowDef`, `MatHeaderRow`, `MatFooterRow`, `MatRow`, `MatNoDataRow` for data table. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/row.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/table.md) |
| `src/material/table/table-data-source.ts` | Table data source behavior | Implementation support. Provides client-side array data handling with filtering, sorting, and pagination. Declares `MatTableDataSource` for data table. Methods or accessors include `data`, `filter`, `sort`, `paginator`, `connect`, `disconnect`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/table-data-source.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/table.md) |
| `src/material/table/table.ts` | Table behavior | Runtime declarations (Component, Directive). Styles the underlying data-table implementation; also contains a deprecated no-op row-recycling directive. Declares `MatRecycleRows`, `MatTable` for data table. Source includes deprecated declarations; consult the pinned source before treating every declaration as recommended API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/table.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/table.md) |
| `src/material/table/text-column.ts` | Text column behavior | Runtime declarations (Component). Defines a simple text column with configurable header and value access. Declares `MatTextColumn` for data table. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/text-column.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/table.md) |

### Table: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/table/table-module.ts` | Table integration module | Integration module. Declares `MatTableModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/table-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/table.md) |

### Table: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/table/index.ts` | Data table export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/index.ts) |
| `src/material/table/public-api.ts` | Data table export surface | Export surface. Forwards declarations from `./table`, `./table-module`, `./cell`, `./row`, `./table-data-source`, `./text-column`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/public-api.ts) |
| `src/material/table/testing/index.ts` | Data table export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/testing/index.ts) |
| `src/material/table/testing/public-api.ts` | Data table export surface | Export surface. Forwards declarations from `./table-harness`, `./row-harness`, `./cell-harness`, `./table-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/testing/public-api.ts) |

### Table: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/table/_m2-table.scss` | Table legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for table. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/_m2-table.scss) |
| `src/material/table/_m3-table.scss` | Table design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for table. Functions include `get-tokens`, `get-density-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/_m3-table.scss) |
| `src/material/table/_table-flex-styles.scss` | Table flex styles styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for table flex styles. Mixins include `private-table-flex-styles`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/_table-flex-styles.scss) |
| `src/material/table/_table-theme.scss` | Table theme theme adapter | Styles and tokens. Emits configurable styling for data table. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/_table-theme.scss) |
| `src/material/table/table.scss` | Table styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for table. Mixins include `_cell-border`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/table.scss) |

### Table: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/table/testing/cell-harness.ts` | Cell test driver | Test driver. Declares `_MatCellHarnessBase`, `MatCellHarness`, `MatHeaderCellHarness`, `MatFooterCellHarness`, `MatNoDataCellHarness`; operations include `getText`, `getColumnName`, `with`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/testing/cell-harness.ts) |
| `src/material/table/testing/row-harness.ts` | Row test driver | Test driver. Declares `MatRowHarnessColumnsText`, `_MatRowHarnessBase`, `MatRowHarness`, `MatHeaderRowHarness`, `MatFooterRowHarness`, `MatNoDataRowHarness`; operations include `getCells`, `getCellTextByIndex`, `getCellTextByColumnName`, `with`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/testing/row-harness.ts) |
| `src/material/table/testing/table-harness-filters.ts` | Table test query filters | Test-driver contract. Declares `CellHarnessFilters`, `RowHarnessFilters`, `TableHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/testing/table-harness-filters.ts) |
| `src/material/table/testing/table-harness.ts` | Table test driver | Test driver. Declares `MatTableHarnessColumnsText`, `MatTableHarness`; operations include `with`, `getHeaderRows`, `getRows`, `getFooterRows`, `getNoDataRow`, `getCellTextByIndex`, `getCellTextByColumnName`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/testing/table-harness.ts) |

### Table: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/table/table-data-source.spec.ts` | Table data source verification | Behavior tests. Contains 10 literal test declarations for `MatTableDataSource`, `sort`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/table-data-source.spec.ts) |
| `src/material/table/table.spec.ts` | Table verification | Behavior tests. Contains 26 literal test declarations for `MatTable`, `with basic data source`, `with MatTableDataSource and sort/pagination/filter`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/table.spec.ts) |
| `src/material/table/testing/table-harness.spec.ts` | Table harness verification | Behavior tests. Contains 13 literal test declarations for `MatTableHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/testing/table-harness.spec.ts) |

### Table: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/table/README.md` | Data table documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/README.md) |
| `src/material/table/table.md` | Data table usage guide | Documentation. Renders rows and columns over the underlying table infrastructure, with separate data-source support. Covers Getting Started; 1. Write your mat-table and provide data; 2. Define the column templates. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/table.md) |

### Table: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/table/BUILD.bazel` | Data table build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `flex_sass`, `css`, `table`, `table_tests_lib`, `unit_tests` and 3 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/BUILD.bazel) |
| `src/material/table/testing/BUILD.bazel` | Data table build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/table/testing/BUILD.bazel) |

## Subcategory: Tree — Hierarchy view

Presents parent-child data through tree nodes and expansion controls.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree.md), [live API navigation](https://material.angular.dev/components/tree/api). The live page is not the fixed-version evidence.

### Tree: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/tree/testing` | Hierarchy view test library entry | Published test-support entry. Exposes test drivers or contracts for hierarchy view, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/testing) |

### Tree: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tree/data-source/` | Hierarchy view data source folder | Source folder. Groups 2 direct files and 0 direct subfolders for hierarchy view. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/data-source) |
| `src/material/tree/testing/` | Hierarchy view testing folder | Source folder. Groups 7 direct files and 0 direct subfolders for hierarchy view. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/testing) |

### Tree: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tree/data-source/flat-data-source.ts` | Flat data source behavior | Implementation support. Flattens hierarchical nodes and supplies the expanded flat data view. Declares `MatTreeFlattener`, `MatTreeFlatDataSource` for hierarchy view. Methods or accessors include `flattenNodes`, `expandFlattenedNodes`, `data`, `connect`, `disconnect`. Source includes deprecated declarations; consult the pinned source before treating every declaration as recommended API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/data-source/flat-data-source.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree.md) |
| `src/material/tree/data-source/nested-data-source.ts` | Nested data source behavior | Implementation support. Supplies nested tree data without flattening it. Declares `MatTreeNestedDataSource` for hierarchy view. Methods or accessors include `data`, `connect`, `disconnect`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/data-source/nested-data-source.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree.md) |
| `src/material/tree/node.ts` | Node behavior | Runtime declarations (Directive). Adapts underlying tree nodes and node templates with Material presentation. Declares `MatTreeNode`, `MatTreeNodeDef`, `MatNestedTreeNode` for hierarchy view. Methods or accessors include `tabIndexInputBinding`, `disabled`, `ngOnInit`, `ngOnDestroy`, `tabIndex`, `ngAfterContentInit`. Source includes deprecated declarations; consult the pinned source before treating every declaration as recommended API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/node.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree.md) |
| `src/material/tree/outlet.ts` | Outlet behavior | Runtime declarations (Directive). Provides an insertion location for child tree nodes. Declares `MatTreeNodeOutlet` for hierarchy view. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/outlet.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree.md) |
| `src/material/tree/padding.ts` | Padding behavior | Runtime declarations (Directive). Calculates indentation from node depth and the configured indent amount. Declares `MatTreeNodePadding` for hierarchy view. Methods or accessors include `level`, `indent`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/padding.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree.md) |
| `src/material/tree/toggle.ts` | Toggle behavior | Runtime declarations (Directive). Adapts tree-node expansion toggles. Declares `MatTreeNodeToggle` for hierarchy view. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/toggle.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree.md) |
| `src/material/tree/tree.ts` | Tree behavior | Runtime declarations (Component). Wraps the underlying hierarchical tree implementation with Material styling. Declares `MatTree` for hierarchy view. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree.md) |

### Tree: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tree/tree-module.ts` | Tree integration module | Integration module. Declares `MatTreeModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree.md) |

### Tree: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tree/index.ts` | Hierarchy view export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/index.ts) |
| `src/material/tree/public-api.ts` | Hierarchy view export surface | Export surface. Forwards declarations from `./node`, `./padding`, `./tree`, `./tree-module`, `./toggle`, `./outlet`, `./data-source/flat-data-source`, `./data-source/nested-data-source`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/public-api.ts) |
| `src/material/tree/testing/index.ts` | Hierarchy view export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/testing/index.ts) |
| `src/material/tree/testing/public-api.ts` | Hierarchy view export surface | Export surface. Forwards declarations from `./node-harness`, `./tree-harness`, `./tree-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/testing/public-api.ts) |

### Tree: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tree/_m2-tree.scss` | Tree legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for tree. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/_m2-tree.scss) |
| `src/material/tree/_m3-tree.scss` | Tree design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for tree. Functions include `get-tokens`, `get-density-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/_m3-tree.scss) |
| `src/material/tree/_tree-theme.scss` | Tree theme theme adapter | Styles and tokens. Emits configurable styling for hierarchy view. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/_tree-theme.scss) |
| `src/material/tree/tree.scss` | Tree styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for tree. Selectors include `.mat-tree`, `.mat-tree-node`, `.mat-nested-tree-node`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree.scss) |

### Tree: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tree/testing/node-harness.ts` | Node test driver | Test driver. Declares `MatTreeNodeHarness`; operations include `with`, `isExpanded`, `isExpandable`, `isDisabled`, `getLevel`, `getText`, `toggle`, `expand`, `collapse`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/testing/node-harness.ts) |
| `src/material/tree/testing/tree-harness-filters.ts` | Tree test query filters | Test-driver contract. Declares `TreeHarnessFilters`, `TreeNodeHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/testing/tree-harness-filters.ts) |
| `src/material/tree/testing/tree-harness.ts` | Tree test driver | Test driver. Declares `TextTree`, `MatTreeHarness`; operations include `with`, `getNodes`, `getTreeStructure`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/testing/tree-harness.ts) |

### Tree: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tree/testing/tree-harness.spec.ts` | Tree harness verification | Behavior tests. Contains 7 literal test declarations for `MatTreeHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/testing/tree-harness.spec.ts) |
| `src/material/tree/tree-using-legacy-key-manager.spec.ts` | Tree using legacy key manager verification | Behavior tests. Contains 5 literal test declarations for `MatTree when provided LegacyTreeKeyManager`, `when nodes have default options`, `when pressing down arrow key`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree-using-legacy-key-manager.spec.ts) |
| `src/material/tree/tree-using-tree-control.spec.ts` | Tree using tree control verification | Behavior tests. Contains 26 literal test declarations for `MatTree using TreeControl`, `flat tree`, `flat tree should initialize`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree-using-tree-control.spec.ts) |
| `src/material/tree/tree.spec.ts` | Tree verification | Behavior tests. Contains 26 literal test declarations for `MatTree`, `flat tree`, `flat tree should initialize`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree.spec.ts) |

### Tree: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tree/tree.md` | Hierarchy view usage guide | Documentation. Presents parent-child data through tree nodes and expansion controls. Covers Flat tree; Nested tree; Usage. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/tree.md) |

### Tree: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tree/BUILD.bazel` | Hierarchy view build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `tree`, `unit_test_sources`, `unit_tests`, `overview` and 2 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/BUILD.bazel) |
| `src/material/tree/testing/BUILD.bazel` | Hierarchy view build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tree/testing/BUILD.bazel) |

## Classification notes

- Folder, file, and published export identities are distinct inventory objects.
- Symbol and operation lists summarize inspected declarations; they are not complete API contracts.
- Tests describe intended checks; no upstream test suite was executed.
- Supporting artifacts stay with their owning family; shared foundations are classified once.
