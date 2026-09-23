# Navigation and workflow

Navigation surfaces, view selection, and staged user workflows.

Status: consolidated and verified under Steps 6–7 at the fixed [baseline](BASELINE.md).
See the [final report](FINAL_REPORT.md) for coverage, checks, and known limitations.
This category contains 177 primary objects; this is an artifact-role survey,
not an exhaustive symbol-by-symbol API review or runtime test report.
Category boundaries and abstract names are survey interpretations.

## Direct objects

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/menu` | Command menu library entry | Published runtime entry. Opens a panel of options through a trigger, including nested menus. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu) |
| `@angular/material/sidenav` | Side content panel library entry | Published runtime entry. Arranges collapsible side content beside a main content area; navigation is one possible use. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav) |
| `@angular/material/stepper` | Staged workflow library entry | Published runtime entry. Divides a workflow into selectable steps with step headers and progression behavior. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper) |
| `@angular/material/tabs` | Tabbed view selector library entry | Published runtime entry. Selects one content view through a tab header and supports tab-based navigation. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs) |
| `@angular/material/toolbar` | Header action container library entry | Published runtime entry. Groups application titles and actions in one or more header rows. Resolves types and JavaScript through the package export map. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar) |
| `src/material/menu/` | Command menu source family | Source folder. Groups 23 direct files and 1 direct subfolder for command menu. Opens a panel of options through a trigger, including nested menus. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu) |
| `src/material/sidenav/` | Side content panel source family | Source folder. Groups 17 direct files and 1 direct subfolder for side content panel. Arranges collapsible side content beside a main content area; navigation is one possible use. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav) |
| `src/material/stepper/` | Staged workflow source family | Source folder. Groups 22 direct files and 1 direct subfolder for staged workflow. Divides a workflow into selectable steps with step headers and progression behavior. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper) |
| `src/material/tabs/` | Tabbed view selector source family | Source folder. Groups 30 direct files and 2 direct subfolders for tabbed view selector. Selects one content view through a tab header and supports tab-based navigation. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs) |
| `src/material/toolbar/` | Header action container source family | Source folder. Groups 14 direct files and 1 direct subfolder for header action container. Groups application titles and actions in one or more header rows. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar) |

## Subcategory: Menu — Command menu

Opens a panel of options through a trigger, including nested menus.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.md), [live API navigation](https://material.angular.dev/components/menu/api). The live page is not the fixed-version evidence.

### Menu: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/menu/testing` | Command menu test library entry | Published test-support entry. Exposes test drivers or contracts for command menu, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/testing) |

### Menu: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/menu/testing/` | Command menu testing folder | Source folder. Groups 8 direct files and 0 direct subfolders for command menu. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/testing) |

### Menu: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/menu/context-menu-trigger.ts` | Context menu trigger behavior | Runtime declarations (Directive). Opens an associated menu through context-menu interaction. Declares `MatContextMenuTrigger` for command menu. Methods or accessors include `menu`, `ngOnDestroy`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/context-menu-trigger.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.md) |
| `src/material/menu/menu-content.ts` | Menu content behavior | Runtime declarations (Directive). Attaches and detaches deferred menu content. Declares `MAT_MENU_CONTENT`, `MatMenuContent` for command menu. Methods or accessors include `attach`, `detach`, `ngOnDestroy`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu-content.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.md) |
| `src/material/menu/menu-errors.ts` | Menu errors contract | Types, constants, or helpers. Creates diagnostics for invalid positioning and recursive menu configuration. Declares `throwMatMenuInvalidPositionX`, `throwMatMenuInvalidPositionY`, `throwMatMenuRecursiveError` for command menu. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu-errors.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.md) |
| `src/material/menu/menu-item.ts` | Menu item behavior | Runtime declarations (Component). Provides focusable menu-item behavior and label extraction. Declares `MatMenuItem` for command menu. Methods or accessors include `focus`, `ngAfterViewInit`, `ngOnDestroy`, `getLabel`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu-item.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.md) |
| `src/material/menu/menu-panel.ts` | Menu panel contract | Types, constants, or helpers. Defines the menu panel contract and injection identity. Declares `MAT_MENU_PANEL`, `MatMenuPanel` for command menu. Source includes deprecated declarations; consult the pinned source before treating every declaration as recommended API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu-panel.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.md) |
| `src/material/menu/menu-positions.ts` | Menu positions contract | Types, constants, or helpers. Defines horizontal and vertical menu-placement choices. Declares `MenuPositionX`, `MenuPositionY` for command menu. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu-positions.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.md) |
| `src/material/menu/menu-trigger.ts` | Menu trigger behavior | Runtime declarations (Directive). Opens, closes, toggles, and repositions an attached menu. Declares `MatMenuTrigger` for command menu. Methods or accessors include `menu`, `triggersSubmenu`, `toggleMenu`, `openMenu`, `closeMenu`, `updatePosition` and 2 more. Source includes deprecated declarations; consult the pinned source before treating every declaration as recommended API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu-trigger.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.md) |
| `src/material/menu/menu.ts` | Menu behavior | Runtime declarations (Component). Coordinates menu items, panel settings, and menu lifecycle. Declares `MenuCloseReason`, `MatMenuDefaultOptions`, `MAT_MENU_DEFAULT_OPTIONS`, `MatMenu` for command menu. Methods or accessors include `xPosition`, `yPosition`, `panelClass`, `classList`, `ngOnInit`, `ngAfterContentInit` and 7 more. Source includes deprecated declarations; consult the pinned source before treating every declaration as recommended API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.md) |

### Menu: internal support

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/menu/menu-trigger-base.ts` | Menu trigger base behavior | Runtime declarations (Directive). Shares trigger focus, scroll, and open-state infrastructure. Declares `MAT_MENU_SCROLL_STRATEGY`, `MENU_PANEL_TOP_PADDING`, `MatMenuTriggerBase` for command menu. Methods or accessors include `ngOnDestroy`, `menuOpen`, `dir`, `focus`. Source includes deprecated declarations; consult the pinned source before treating every declaration as recommended API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu-trigger-base.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.md) |

### Menu: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/menu/menu-module.ts` | Menu integration module | Integration module. Declares `MatMenuModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.md) |

### Menu: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/menu/index.ts` | Command menu export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/index.ts) |
| `src/material/menu/public-api.ts` | Command menu export surface | Export surface. Forwards declarations from `./menu`, `./menu-item`, `./menu-content`, `./menu-trigger`, `./menu-trigger-base`, `./menu-module`, `./menu-positions`, `./menu-panel` and 1 more. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/public-api.ts) |
| `src/material/menu/testing/index.ts` | Command menu export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/testing/index.ts) |
| `src/material/menu/testing/public-api.ts` | Command menu export surface | Export surface. Forwards declarations from `./menu-harness`, `./context-menu-harness`, `./menu-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/testing/public-api.ts) |

### Menu: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/menu/menu-item.html` | Menu item view template | Content template. Defines the internal view for menu item; rendered elements include `ng-content`, `span`, `div`, `svg`, `polygon`. Projects content through `mat-icon, [matMenuItemIcon]`. Includes conditional or repeated content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu-item.html) |
| `src/material/menu/menu.html` | Menu view template | Content template. Defines the internal view for menu; rendered elements include `ng-template`, `div`, `ng-content`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.html) |

### Menu: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/menu/_m2-menu.scss` | Menu legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for menu. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/_m2-menu.scss) |
| `src/material/menu/_m3-menu.scss` | Menu design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for menu. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/_m3-menu.scss) |
| `src/material/menu/_menu-theme.scss` | Menu theme theme adapter | Styles and tokens. Emits configurable styling for command menu. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/_menu-theme.scss) |
| `src/material/menu/menu.scss` | Menu styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for menu. Selectors include `.mat-mdc-menu-content`, `.mat-mdc-menu-item`, `.mat-mdc-menu-panel`, `.mat-divider`, `.mat-icon-no-color` and 2 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.scss) |

### Menu: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/menu/testing/context-menu-harness.ts` | Context menu test driver | Test driver. Declares `MatContextMenuHarness`; operations include `with`, `isOpen`, `open`, `close`, `isDisabled`, `getItems`, `clickItem`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/testing/context-menu-harness.ts) |
| `src/material/menu/testing/menu-harness-filters.ts` | Menu test query filters | Test-driver contract. Declares `MenuHarnessFilters`, `MenuItemHarnessFilters`, `ContextMenuHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/testing/menu-harness-filters.ts) |
| `src/material/menu/testing/menu-harness.ts` | Menu test driver | Test driver. Declares `MatMenuHarness`, `MatMenuItemHarness`, `clickItemImplementation`; operations include `with`, `isDisabled`, `isOpen`, `getTriggerText`, `focus`, `blur`, `isFocused`, `open`, `close` and 6 more. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/testing/menu-harness.ts) |

### Menu: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/menu/context-menu-trigger.spec.ts` | Context menu trigger verification | Behavior tests. Contains 13 literal test declarations for `context menu trigger`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/context-menu-trigger.spec.ts) |
| `src/material/menu/menu.spec.ts` | Menu verification | Behavior tests. Contains 124 literal test declarations for `MatMenu`, `lazy rendering`, `positions`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.spec.ts) |
| `src/material/menu/testing/context-menu-harness.spec.ts` | Context menu harness verification | Behavior tests. Contains 5 literal test declarations for `MatContextMenuHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/testing/context-menu-harness.spec.ts) |
| `src/material/menu/testing/menu-harness.spec.ts` | Menu harness verification | Behavior tests. Contains 15 literal test declarations for `MatMenuHarness`, `single-level menu`, `multi-level menu`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/testing/menu-harness.spec.ts) |

### Menu: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/menu/README.md` | Command menu documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/README.md) |
| `src/material/menu/menu.md` | Command menu usage guide | Documentation. Opens a panel of options through a trigger, including nested menus. Covers Toggling the menu programmatically; Icons; Customizing menu position. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/menu.md) |

### Menu: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/menu/BUILD.bazel` | Command menu build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `menu`, `menu_tests_lib`, `unit_tests`, `overview` and 2 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/BUILD.bazel) |
| `src/material/menu/testing/BUILD.bazel` | Command menu build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/menu/testing/BUILD.bazel) |

## Subcategory: Sidenav — Side content panel

Arranges collapsible side content beside a main content area; navigation is one possible use.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/sidenav.md), [live API navigation](https://material.angular.dev/components/sidenav/api). The live page is not the fixed-version evidence.

### Sidenav: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/sidenav/testing` | Side content panel test library entry | Published test-support entry. Exposes test drivers or contracts for side content panel, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/testing) |

### Sidenav: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sidenav/testing/` | Side content panel testing folder | Source folder. Groups 11 direct files and 0 direct subfolders for side content panel. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/testing) |

### Sidenav: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sidenav/drawer.ts` | Drawer behavior | Runtime declarations (Component). Provides generic side-content drawers and their content container. Declares `throwMatDuplicatedDrawerError`, `AutoFocusTarget`, `MatDrawerToggleResult`, `MatDrawerMode`, `MAT_DRAWER_DEFAULT_AUTOSIZE`, `MAT_DRAWER_CONTAINER`, `MatDrawerContent` and 2 more for side content panel. Methods or accessors include `ngAfterContentInit`, `position`, `mode`, `disableClose`, `autoFocus`, `opened` and 12 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/drawer.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/sidenav.md) |
| `src/material/sidenav/sidenav.ts` | Sidenav behavior | Runtime declarations (Component). Adapts drawers to application side navigation, including viewport-fixed settings. Declares `MatSidenavContent`, `MatSidenav`, `MatSidenavContainer` for side content panel. Methods or accessors include `fixedInViewport`, `fixedTopGap`, `fixedBottomGap`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/sidenav.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/sidenav.md) |

### Sidenav: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sidenav/sidenav-module.ts` | Sidenav integration module | Integration module. Declares `MatSidenavModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/sidenav-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/sidenav.md) |

### Sidenav: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sidenav/index.ts` | Side content panel export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/index.ts) |
| `src/material/sidenav/public-api.ts` | Side content panel export surface | Export surface. Forwards declarations from `./sidenav-module`, `./drawer`, `./sidenav`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/public-api.ts) |
| `src/material/sidenav/testing/index.ts` | Side content panel export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/testing/index.ts) |
| `src/material/sidenav/testing/public-api.ts` | Side content panel export surface | Export surface. Forwards declarations from `./drawer-harness`, `./drawer-container-harness`, `./drawer-content-harness`, `./drawer-harness-filters`, `./sidenav-container-harness`, `./sidenav-content-harness`, `./sidenav-harness`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/testing/public-api.ts) |

### Sidenav: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sidenav/drawer-container.html` | Drawer container view template | Content template. Defines the internal view for drawer container; rendered elements include `div`, `ng-content`, `mat-drawer-content`. Projects content through `mat-drawer, mat-sidenav`, `mat-drawer-content, mat-sidenav-content`. Includes conditional or repeated content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/drawer-container.html) |
| `src/material/sidenav/drawer.html` | Drawer view template | Content template. Defines the internal view for drawer; rendered elements include `div`, `ng-content`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/drawer.html) |
| `src/material/sidenav/sidenav-container.html` | Sidenav container view template | Content template. Defines the internal view for sidenav container; rendered elements include `div`, `ng-content`, `mat-sidenav-content`. Projects content through `mat-drawer, mat-sidenav`, `mat-drawer-content, mat-sidenav-content`. Includes conditional or repeated content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/sidenav-container.html) |

### Sidenav: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sidenav/_m2-sidenav.scss` | Sidenav legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for sidenav. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/_m2-sidenav.scss) |
| `src/material/sidenav/_m3-sidenav.scss` | Sidenav design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for sidenav. Functions include `get-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/_m3-sidenav.scss) |
| `src/material/sidenav/_sidenav-theme.scss` | Sidenav theme theme adapter | Styles and tokens. Emits configurable styling for side content panel. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/_sidenav-theme.scss) |
| `src/material/sidenav/drawer.scss` | Drawer styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for drawer. Mixins include `drawer-stacking-context`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/drawer.scss) |

### Sidenav: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sidenav/testing/drawer-container-harness.ts` | Drawer container test driver | Test driver. Declares `MatDrawerContainerHarness`; operations include `with`, `getDrawers`, `getContent`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/testing/drawer-container-harness.ts) |
| `src/material/sidenav/testing/drawer-content-harness.ts` | Drawer content test driver | Test driver. Declares `MatDrawerContentHarness`; operations include `with`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/testing/drawer-content-harness.ts) |
| `src/material/sidenav/testing/drawer-harness-filters.ts` | Drawer test query filters | Test-driver contract. Declares `DrawerHarnessFilters`, `DrawerContainerHarnessFilters`, `DrawerContentHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/testing/drawer-harness-filters.ts) |
| `src/material/sidenav/testing/drawer-harness.ts` | Drawer test driver | Test driver. Declares `MatDrawerHarnessBase`, `MatDrawerHarness`; operations include `isOpen`, `getPosition`, `getMode`, `with`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/testing/drawer-harness.ts) |
| `src/material/sidenav/testing/sidenav-container-harness.ts` | Sidenav container test driver | Test driver. Declares `MatSidenavContainerHarness`; operations include `with`, `getSidenavs`, `getContent`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/testing/sidenav-container-harness.ts) |
| `src/material/sidenav/testing/sidenav-content-harness.ts` | Sidenav content test driver | Test driver. Declares `MatSidenavContentHarness`; operations include `with`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/testing/sidenav-content-harness.ts) |
| `src/material/sidenav/testing/sidenav-harness.ts` | Sidenav test driver | Test driver. Declares `MatSidenavHarness`; operations include `with`, `isFixedInViewport`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/testing/sidenav-harness.ts) |

### Sidenav: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sidenav/drawer.spec.ts` | Drawer verification | Behavior tests. Contains 58 literal test declarations for `MatDrawer`, `methods`, `attributes`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/drawer.spec.ts) |
| `src/material/sidenav/sidenav.spec.ts` | Sidenav verification | Behavior tests. Contains 4 literal test declarations for `MatSidenav`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/sidenav.spec.ts) |
| `src/material/sidenav/testing/sidenav-harness.spec.ts` | Sidenav harness verification | Behavior tests. Contains 14 literal test declarations for `MatSidenavHarness`, `drawer`, `sidenav`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/testing/sidenav-harness.spec.ts) |

### Sidenav: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sidenav/README.md` | Side content panel documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/README.md) |
| `src/material/sidenav/sidenav.md` | Side content panel usage guide | Documentation. Arranges collapsible side content beside a main content area; navigation is one possible use. Covers Specifying the main and side content; Opening and closing a sidenav; Changing the sidenav's behavior. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/sidenav.md) |

### Sidenav: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/sidenav/BUILD.bazel` | Side content panel build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `sidenav`, `unit_test_sources`, `unit_tests`, `overview` and 2 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/BUILD.bazel) |
| `src/material/sidenav/testing/BUILD.bazel` | Side content panel build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/sidenav/testing/BUILD.bazel) |

## Subcategory: Stepper — Staged workflow

Divides a workflow into selectable steps with step headers and progression behavior.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper.md), [live API navigation](https://material.angular.dev/components/stepper/api). The live page is not the fixed-version evidence.

### Stepper: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/stepper/testing` | Staged workflow test library entry | Published test-support entry. Exposes test drivers or contracts for staged workflow, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/testing) |

### Stepper: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/stepper/testing/` | Staged workflow testing folder | Source folder. Groups 8 direct files and 0 direct subfolders for staged workflow. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/testing) |

### Stepper: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/stepper/step-content.ts` | Step content behavior | Runtime declarations (Directive). Captures lazily rendered step content. Declares `MatStepContent` for staged workflow. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/step-content.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper.md) |
| `src/material/stepper/step-header.ts` | Step header behavior | Runtime declarations (Component). Renders and focuses the step header. Declares `MatStepHeader` for staged workflow. Methods or accessors include `ngAfterViewInit`, `ngOnDestroy`, `focus`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/step-header.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper.md) |
| `src/material/stepper/step-label.ts` | Step label behavior | Runtime declarations (Directive). Captures a custom label template for a step. Declares `MatStepLabel` for staged workflow. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/step-label.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper.md) |
| `src/material/stepper/stepper-button.ts` | Stepper button behavior | Runtime declarations (Directive). Provides next-step and previous-step control directives. Declares `MatStepperNext`, `MatStepperPrevious` for staged workflow. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper-button.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper.md) |
| `src/material/stepper/stepper-icon.ts` | Stepper icon behavior | Runtime declarations (Directive). Captures custom step-icon templates and their context. Declares `MatStepperIconContext`, `MatStepperIcon` for staged workflow. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper-icon.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper.md) |
| `src/material/stepper/stepper-intl.ts` | Stepper localized labels behavior | Implementation support. Supplies localizable labels for the workflow controls. Declares `MatStepperIntl` for staged workflow. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper-intl.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper.md) |
| `src/material/stepper/stepper.ts` | Stepper behavior | Runtime declarations (Component). Coordinates steps, selected content, error presentation, and transitions. Declares `MatStep`, `MatStepper` for staged workflow. Methods or accessors include `ngAfterContentInit`, `ngOnDestroy`, `isErrorState`, `isSignalErrorState`, `animationDuration`, `ngAfterViewInit`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper.md) |

### Stepper: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/stepper/stepper-module.ts` | Stepper integration module | Integration module. Declares `MatStepperModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper.md) |

### Stepper: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/stepper/index.ts` | Staged workflow export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/index.ts) |
| `src/material/stepper/public-api.ts` | Staged workflow export surface | Export surface. Forwards declarations from `@angular/cdk/stepper`, `./stepper-module`, `./step-label`, `./stepper`, `./stepper-button`, `./step-header`, `./stepper-intl`, `./stepper-icon` and 1 more. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/public-api.ts) |
| `src/material/stepper/testing/index.ts` | Staged workflow export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/testing/index.ts) |
| `src/material/stepper/testing/public-api.ts` | Staged workflow export surface | Export surface. Forwards declarations from `./stepper-harness`, `./step-harness`, `./step-harness-filters`, `./stepper-button-harnesses`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/testing/public-api.ts) |

### Stepper: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/stepper/step-header.html` | Step header view template | Content template. Defines the internal view for step header; rendered elements include `div`, `ng-container`, `span`, `mat-icon`. Includes conditional or repeated content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/step-header.html) |
| `src/material/stepper/step.html` | Step view template | Content template. Defines the internal view for step; rendered elements include `ng-template`, `ng-content`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/step.html) |
| `src/material/stepper/stepper.html` | Stepper view template | Content template. Defines the internal view for stepper; rendered elements include `ng-content`, `div`, `ng-container`, `ng-template`, `mat-step-header`. Includes conditional or repeated content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper.html) |

### Stepper: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/stepper/_m2-stepper.scss` | Stepper legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for stepper. Functions include `get-tokens`, `private-get-color-palette-color-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/_m2-stepper.scss) |
| `src/material/stepper/_m3-stepper.scss` | Stepper design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for stepper. Functions include `get-tokens`, `get-density-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/_m3-stepper.scss) |
| `src/material/stepper/_stepper-theme.scss` | Stepper theme theme adapter | Styles and tokens. Emits configurable styling for staged workflow. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/_stepper-theme.scss) |
| `src/material/stepper/_stepper-variables.scss` | Stepper variables styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for stepper variables. Declares `header-height`, `header-minimum-height`, `header-maximum-height`, `density-config`, `label-header-height` and 8 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/_stepper-variables.scss) |
| `src/material/stepper/step-header.scss` | Step header styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for step header. Selectors include `.mat-step-header`, `.mat-step-header-ripple`, `.mat-step-label`, `.mat-step-icon`, `.mat-step-optional` and 9 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/step-header.scss) |
| `src/material/stepper/stepper.scss` | Stepper styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for stepper. Functions include `_get-vertical-padding-calc`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper.scss) |

### Stepper: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/stepper/testing/step-harness-filters.ts` | Step test query filters | Test-driver contract. Declares `StepperOrientation`, `StepHarnessFilters`, `StepperHarnessFilters`, `StepperButtonHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/testing/step-harness-filters.ts) |
| `src/material/stepper/testing/step-harness.ts` | Step test driver | Test driver. Declares `MatStepHarness`; operations include `with`, `getLabel`, `getAriaLabel`, `getAriaLabelledby`, `isSelected`, `isCompleted`, `hasErrors`, `isOptional`, `select`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/testing/step-harness.ts) |
| `src/material/stepper/testing/stepper-button-harnesses.ts` | Stepper button test driveres | Test driver. Declares `MatStepperNextHarness`, `MatStepperPreviousHarness`; operations include `getText`, `click`, `with`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/testing/stepper-button-harnesses.ts) |
| `src/material/stepper/testing/stepper-harness.ts` | Stepper test driver | Test driver. Declares `MatStepperHarness`; operations include `with`, `getSteps`, `getOrientation`, `selectStep`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/testing/stepper-harness.ts) |

### Stepper: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/stepper/stepper.spec.ts` | Stepper verification | Behavior tests. Contains 93 literal test declarations for `MatStepper`, `basic stepper`, `basic stepper with i18n label change`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper.spec.ts) |
| `src/material/stepper/testing/stepper-harness.spec.ts` | Stepper harness verification | Behavior tests. Contains 18 literal test declarations for `MatStepperHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/testing/stepper-harness.spec.ts) |

### Stepper: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/stepper/stepper.md` | Staged workflow usage guide | Documentation. Divides a workflow into selectable steps with step headers and progression behavior. Covers Stepper variants; Labels; Label position. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/stepper.md) |

### Stepper: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/stepper/BUILD.bazel` | Staged workflow build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `header_css`, `variables`, `stepper`, `unit_test_sources` and 4 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/BUILD.bazel) |
| `src/material/stepper/testing/BUILD.bazel` | Staged workflow build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/stepper/testing/BUILD.bazel) |

## Subcategory: Tabs — Tabbed view selector

Selects one content view through a tab header and supports tab-based navigation.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tabs.md), [live API navigation](https://material.angular.dev/components/tabs/api). The live page is not the fixed-version evidence.

### Tabs: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/tabs/testing` | Tabbed view selector test library entry | Published test-support entry. Exposes test drivers or contracts for tabbed view selector, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/testing) |

### Tabs: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tabs/tab-nav-bar/` | Tabbed view selector tab nav bar folder | Source folder. Groups 6 direct files and 0 direct subfolders for tabbed view selector. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-nav-bar) |
| `src/material/tabs/testing/` | Tabbed view selector testing folder | Source folder. Groups 11 direct files and 0 direct subfolders for tabbed view selector. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/testing) |

### Tabs: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tabs/ink-bar.ts` | Ink bar behavior | Runtime declarations (Directive). Positions and activates the visual indicator associated with the selected tab. Declares `MatInkBarItem`, `MatInkBar`, `InkBarItem`, `_MatInkBarPositioner`, `_MAT_INK_BAR_POSITIONER` for tabbed view selector. Methods or accessors include `activateInkBar`, `deactivateInkBar`, `hide`, `alignToElement`, `fitInkBarToContent`, `ngOnInit` and 1 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/ink-bar.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tabs.md) |
| `src/material/tabs/paginated-tab-header.ts` | Paginated tab header behavior | Runtime declarations (Directive). Shares header scrolling and pagination when labels exceed available width. Declares `ScrollDirection`, `MatPaginatedTabHeaderItem`, `normalizeDuration`, `MatPaginatedTabHeader` for tabbed view selector. Methods or accessors include `selectedIndex`, `ngAfterViewInit`, `ngAfterContentInit`, `ngAfterContentChecked`, `ngOnDestroy`, `updatePagination` and 2 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/paginated-tab-header.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tabs.md) |
| `src/material/tabs/tab-body.ts` | Tab body behavior | Runtime declarations (Component, Directive). Hosts selected tab content and its positioning lifecycle. Declares `MatTabBodyPortal`, `MatTabBodyPositionState`, `MatTabBodyOriginState`, `MatTabBody` for tabbed view selector. Methods or accessors include `ngOnInit`, `ngOnDestroy`, `position`. Source includes deprecated declarations; consult the pinned source before treating every declaration as recommended API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-body.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tabs.md) |
| `src/material/tabs/tab-config.ts` | Tab config contract | Types, constants, or helpers. Defines default tab configuration such as animation behavior. Declares `MatTabsConfig`, `MAT_TABS_CONFIG` for tabbed view selector. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-config.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tabs.md) |
| `src/material/tabs/tab-content.ts` | Tab content behavior | Runtime declarations (Directive). Captures deferred tab content. Declares `MAT_TAB_CONTENT`, `MatTabContent` for tabbed view selector. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-content.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tabs.md) |
| `src/material/tabs/tab-group.ts` | Tab group behavior | Runtime declarations (Component). Coordinates tab selection, header placement, content sizing, and selection events. Declares `MatTabGroupBaseHeader`, `MatTabHeaderPosition`, `MatTabGroupAnimationDuration`, `MatTabGroup`, `MatTabChangeEvent` for tabbed view selector. Methods or accessors include `updatePagination`, `fitInkBarToContent`, `selectedIndex`, `animationDuration`, `contentTabIndex`, `backgroundColor` and 6 more. Source includes deprecated declarations; consult the pinned source before treating every declaration as recommended API. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-group.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tabs.md) |
| `src/material/tabs/tab-header.ts` | Tab header behavior | Runtime declarations (Component). Displays tab labels with the selection indicator and overflow controls. Declares `MatTabHeader` for tabbed view selector. Methods or accessors include `ngAfterContentInit`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-header.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tabs.md) |
| `src/material/tabs/tab-label-wrapper.ts` | Tab label wrapper behavior | Runtime declarations (Directive). Provides the focusable label wrapper and its dimensions. Declares `MatTabLabelWrapper` for tabbed view selector. Methods or accessors include `focus`, `getOffsetLeft`, `getOffsetWidth`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-label-wrapper.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tabs.md) |
| `src/material/tabs/tab-label.ts` | Tab label behavior | Runtime declarations (Directive). Captures a custom tab label and related injection identities. Declares `MAT_TAB_LABEL`, `MAT_TAB`, `MatTabLabel` for tabbed view selector. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-label.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tabs.md) |
| `src/material/tabs/tab-nav-bar/tab-nav-bar.ts` | Tab nav bar behavior | Runtime declarations (Component). Provides anchor-based tab navigation and the associated panel. Declares `MatTabNav`, `MatTabLink`, `MatTabNavPanel` for tabbed view selector. Methods or accessors include `fitInkBarToContent`, `backgroundColor`, `disableRipple`, `ngAfterContentInit`, `ngAfterViewInit`, `updateActiveLink` and 4 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-nav-bar/tab-nav-bar.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tabs.md) |
| `src/material/tabs/tab.ts` | Tab behavior | Runtime declarations (Component). Represents an individual tab and its label and content templates. Declares `MAT_TAB_GROUP`, `MatTab` for tabbed view selector. Methods or accessors include `templateLabel`, `content`, `ngOnChanges`, `ngOnDestroy`, `ngOnInit`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tabs.md) |

### Tabs: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tabs/tabs-module.ts` | Tabs integration module | Integration module. Declares `MatTabsModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tabs-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tabs.md) |

### Tabs: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tabs/index.ts` | Tabbed view selector export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/index.ts) |
| `src/material/tabs/public-api.ts` | Tabbed view selector export surface | Export surface. Forwards declarations from `./tabs-module`, `./paginated-tab-header`, `./tab-body`, `./tab-config`, `./tab-content`, `./tab-label`, `./tab`, `./ink-bar` and 4 more. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/public-api.ts) |
| `src/material/tabs/testing/index.ts` | Tabbed view selector export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/testing/index.ts) |
| `src/material/tabs/testing/public-api.ts` | Tabbed view selector export surface | Export surface. Forwards declarations from `./tab-group-harness`, `./tab-harness`, `./tab-harness-filters`, `./tab-nav-bar-harness`, `./tab-link-harness`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/testing/public-api.ts) |

### Tabs: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tabs/tab-body.html` | Tab body view template | Content template. Defines the internal view for tab body; rendered elements include `div`, `ng-template`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-body.html) |
| `src/material/tabs/tab-group.html` | Tab group view template | Content template. Defines the internal view for tab group; rendered elements include `mat-tab-header`, `div`, `span`, `ng-template`, `ng-content`, `mat-tab-body`. Includes conditional or repeated content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-group.html) |
| `src/material/tabs/tab-header.html` | Tab header view template | Content template. Defines the internal view for tab header; rendered elements include `div`, `ng-content`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-header.html) |
| `src/material/tabs/tab-nav-bar/tab-link.html` | Tab link view template | Content template. Defines the internal view for tab link; rendered elements include `span`, `div`, `ng-content`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-nav-bar/tab-link.html) |
| `src/material/tabs/tab-nav-bar/tab-nav-bar.html` | Tab nav bar view template | Content template. Defines the internal view for tab nav bar; rendered elements include `div`, `ng-content`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-nav-bar/tab-nav-bar.html) |
| `src/material/tabs/tab.html` | Tab view template | Content template. Defines the internal view for tab; rendered elements include `mat-tab`, `ng-template`, `ng-content`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab.html) |

### Tabs: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tabs/_m2-tabs.scss` | Tabs legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for tabs. Functions include `get-tokens`, `private-get-color-palette-color-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/_m2-tabs.scss) |
| `src/material/tabs/_m3-tabs.scss` | Tabs design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for tabs. Functions include `get-tokens`, `get-density-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/_m3-tabs.scss) |
| `src/material/tabs/_tabs-common.scss` | Tabs common styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for tabs common. Mixins include `structural-styles`, `tab`, `paginated-tab-header`, `paginated-tab-header-item-wrapper`, `paginated-tab-header-container`, `paginated-tab-header-with-background`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/_tabs-common.scss) |
| `src/material/tabs/_tabs-theme.scss` | Tabs theme theme adapter | Styles and tokens. Emits configurable styling for tabbed view selector. Mixins include `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/_tabs-theme.scss) |
| `src/material/tabs/tab-body.scss` | Tab body styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for tab body. Selectors include `.mat-mdc-tab-body`, `.mat-mdc-tab-group`, `.mat-mdc-tab-body-content`, `.mat-tab-body-animating`, `.mat-mdc-tab-body-active` and 5 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-body.scss) |
| `src/material/tabs/tab-group.scss` | Tab group styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for tab group. Selectors include `.mat-mdc-tab`, `.mat-mdc-tab-group`, `.mdc-tab-indicator__content--underline`, `.mat-mdc-tab-body-wrapper`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-group.scss) |
| `src/material/tabs/tab-header.scss` | Tab header styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for tab header. Selectors include `.mat-mdc-tab-label-container`, `.mat-mdc-tab-labels`, `.mat-mdc-tab`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-header.scss) |
| `src/material/tabs/tab-nav-bar/tab-link.scss` | Tab link styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for tab link. Selectors include `.mat-mdc-tab-link`, `.mat-mdc-tab-header`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-nav-bar/tab-link.scss) |
| `src/material/tabs/tab-nav-bar/tab-nav-bar.scss` | Tab nav bar styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for tab nav bar. Selectors include `.mat-mdc-tab-links`, `.mat-mdc-tab-link-container`, `.mat-mdc-tab-nav-bar`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-nav-bar/tab-nav-bar.scss) |

### Tabs: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tabs/testing/tab-group-harness.ts` | Tab group test driver | Test driver. Declares `MatTabGroupHarness`; operations include `with`, `getTabs`, `getSelectedTab`, `selectTab`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/testing/tab-group-harness.ts) |
| `src/material/tabs/testing/tab-harness-filters.ts` | Tab test query filters | Test-driver contract. Declares `TabHarnessFilters`, `TabGroupHarnessFilters`, `TabLinkHarnessFilters`, `TabNavBarHarnessFilters`, `TabNavPanelHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/testing/tab-harness-filters.ts) |
| `src/material/tabs/testing/tab-harness.ts` | Tab test driver | Test driver. Declares `MatTabHarness`; operations include `with`, `getLabel`, `getAriaLabel`, `getAriaLabelledby`, `isSelected`, `isDisabled`, `select`, `getTextContent`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/testing/tab-harness.ts) |
| `src/material/tabs/testing/tab-link-harness.ts` | Tab link test driver | Test driver. Declares `MatTabLinkHarness`; operations include `with`, `getLabel`, `isActive`, `isDisabled`, `click`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/testing/tab-link-harness.ts) |
| `src/material/tabs/testing/tab-nav-bar-harness.ts` | Tab nav bar test driver | Test driver. Declares `MatTabNavBarHarness`; operations include `with`, `getLinks`, `getActiveLink`, `clickLink`, `getPanel`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/testing/tab-nav-bar-harness.ts) |
| `src/material/tabs/testing/tab-nav-panel-harness.ts` | Tab nav panel test driver | Test driver. Declares `MatTabNavPanelHarness`; operations include `with`, `getTextContent`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/testing/tab-nav-panel-harness.ts) |

### Tabs: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tabs/tab-body.spec.ts` | Tab body verification | Behavior tests. Contains 9 literal test declarations for `MatTabBody`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-body.spec.ts) |
| `src/material/tabs/tab-group.spec.ts` | Tab group verification | Behavior tests. Contains 71 literal test declarations for `MatTabGroup`, `basic behavior`, `animation duration`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-group.spec.ts) |
| `src/material/tabs/tab-header.spec.ts` | Tab header verification | Behavior tests. Contains 33 literal test declarations for `MatTabHeader`, `focusing`, `pagination`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-header.spec.ts) |
| `src/material/tabs/tab-nav-bar/tab-nav-bar.spec.ts` | Tab nav bar verification | Behavior tests. Contains 34 literal test declarations for `MatTabNavBar`, `basic behavior`, `ripples`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tab-nav-bar/tab-nav-bar.spec.ts) |
| `src/material/tabs/testing/tab-group-harness.spec.ts` | Tab group harness verification | Behavior tests. Contains 14 literal test declarations for `MatTabGroupHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/testing/tab-group-harness.spec.ts) |
| `src/material/tabs/testing/tab-nav-bar-harness.spec.ts` | Tab nav bar harness verification | Behavior tests. Contains 9 literal test declarations for `MatTabNavBarHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/testing/tab-nav-bar-harness.spec.ts) |

### Tabs: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tabs/README.md` | Tabbed view selector documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/README.md) |
| `src/material/tabs/tabs.md` | Tabbed view selector usage guide | Documentation. Selects one content view through a tab header and supports tab-based navigation. Covers Events; Labels; Dynamic Height. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/tabs.md) |

### Tabs: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/tabs/BUILD.bazel` | Tabbed view selector build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `sass`, `tab_group_css`, `tab_nav_bar_css`, `tab_link_css`, `tab_header_css` and 7 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/BUILD.bazel) |
| `src/material/tabs/testing/BUILD.bazel` | Tabbed view selector build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/tabs/testing/BUILD.bazel) |

## Subcategory: Toolbar — Header action container

Groups application titles and actions in one or more header rows.

Sources: [release overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/toolbar.md), [live API navigation](https://material.angular.dev/components/toolbar/api). The live page is not the fixed-version evidence.

### Toolbar: published entries

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `@angular/material/toolbar/testing` | Header action container test library entry | Published test-support entry. Exposes test drivers or contracts for header action container, with separate type and JavaScript targets. | [Package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7), [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/testing) |

### Toolbar: folders

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/toolbar/testing/` | Header action container testing folder | Source folder. Groups 6 direct files and 0 direct subfolders for header action container. Holds test-driver APIs and their verification support. | [Folder](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/testing) |

### Toolbar: runtime declarations

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/toolbar/toolbar.ts` | Toolbar behavior | Runtime declarations (Component, Directive). Coordinates one or more toolbar rows and detects incompatible row usage. Declares `MatToolbarRow`, `MatToolbar`, `throwToolbarMixedModesError` for header action container. Methods or accessors include `ngAfterViewInit`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/toolbar.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/toolbar.md) |

### Toolbar: integration modules

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/toolbar/toolbar-module.ts` | Toolbar integration module | Integration module. Declares `MatToolbarModule` and configures the component or directive imports and exports consumed by applications. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/toolbar-module.ts), [Overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/toolbar.md) |

### Toolbar: export surfaces

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/toolbar/index.ts` | Header action container export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/index.ts) |
| `src/material/toolbar/public-api.ts` | Header action container export surface | Export surface. Forwards declarations from `./toolbar-module`, `./toolbar`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/public-api.ts) |
| `src/material/toolbar/testing/index.ts` | Header action container export surface | Export surface. Forwards declarations from `./public-api`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/testing/index.ts) |
| `src/material/toolbar/testing/public-api.ts` | Header action container export surface | Export surface. Forwards declarations from `./toolbar-harness`, `./toolbar-harness-filters`. This barrel is distinct from a published package entry; source exports alone do not establish package accessibility. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/testing/public-api.ts) |

### Toolbar: content templates

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/toolbar/toolbar.html` | Toolbar view template | Content template. Defines the internal view for toolbar; rendered elements include `ng-content`. Projects content through `mat-toolbar-row`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/toolbar.html) |

### Toolbar: styles and tokens

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/toolbar/_m2-toolbar.scss` | Toolbar legacy design tokens | Styles and tokens. Defines Material 2 token values or token-generation helpers for toolbar. Functions include `get-tokens`, `private-get-color-palette-color-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/_m2-toolbar.scss) |
| `src/material/toolbar/_m3-toolbar.scss` | Toolbar design tokens | Styles and tokens. Defines Material 3 token values or token-generation helpers for toolbar. Functions include `get-tokens`, `get-density-tokens`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/_m3-toolbar.scss) |
| `src/material/toolbar/_toolbar-theme.scss` | Toolbar theme theme adapter | Styles and tokens. Emits configurable styling for header action container. Mixins include `_palette-styles`, `base`, `color`, `typography`, `density`, `overrides`, `theme`. Functions include `_define-overrides`. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/_toolbar-theme.scss) |
| `src/material/toolbar/_toolbar-variables.scss` | Toolbar variables styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for toolbar variables. Declares `minimum-height`, `height-desktop`, `maximum-height-desktop`, `minimum-height-desktop`, `height-mobile` and 4 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/_toolbar-variables.scss) |
| `src/material/toolbar/toolbar.scss` | Toolbar styling support | Styles and tokens. Defines presentation rules or shared Sass helpers for toolbar. Selectors include `.mat-toolbar`, `.mat-form-field-underline`, `.mat-form-field-ripple`, `.mat-focused`, `.mat-form-field-label` and 7 more. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/toolbar.scss) |

### Toolbar: test drivers

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/toolbar/testing/toolbar-harness-filters.ts` | Toolbar test query filters | Test-driver contract. Declares `ToolbarHarnessFilters` to constrain harness searches and supported test interactions. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/testing/toolbar-harness-filters.ts) |
| `src/material/toolbar/testing/toolbar-harness.ts` | Toolbar test driver | Test driver. Declares `MatToolbarSection`, `MatToolbarHarness`; operations include `with`, `hasMultipleRows`, `getRowsAsText`. Provides test-facing interaction rather than a rendered UI component. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/testing/toolbar-harness.ts) |

### Toolbar: behavior tests

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/toolbar/testing/toolbar-harness.spec.ts` | Toolbar harness verification | Behavior tests. Contains 5 literal test declarations for `MatToolbarHarness`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/testing/toolbar-harness.spec.ts) |
| `src/material/toolbar/toolbar.spec.ts` | Toolbar verification | Behavior tests. Contains 5 literal test declarations for `MatToolbar`, `with single row`, `with multiple rows`; this count excludes dynamically generated cases. Tests were inspected as source, not executed. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/toolbar.spec.ts) |

### Toolbar: documentation

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/toolbar/README.md` | Header action container documentation pointer | Documentation. Redirects readers to the component website; the release overview and source files provide the reproducible evidence used by this survey. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/README.md) |
| `src/material/toolbar/toolbar.md` | Header action container usage guide | Documentation. Groups application titles and actions in one or more header rows. Covers Single row; Multiple rows; Positioning toolbar content. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/toolbar.md) |

### Toolbar: build tooling

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| `src/material/toolbar/BUILD.bazel` | Header action container build definition | Build tooling. Declares `load`, `package`, `sass_library`, `sass_binary`, `ng_project`, `ng_web_test_suite`, `markdown_to_html`, `extract_tokens`, `filegroup` rules; named targets include `m3`, `m2`, `theme`, `css`, `toolbar`, `unit_test_sources`, `unit_tests`, `overview` and 2 more. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/BUILD.bazel) |
| `src/material/toolbar/testing/BUILD.bazel` | Header action container build definition | Build tooling. Declares `load`, `package`, `ts_project`, `filegroup`, `ng_project`, `ng_web_test_suite` rules; named targets include `testing`, `source-files`, `unit_tests_lib`, `unit_tests`. These targets assemble or test artifacts rather than render a UI object. | [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/toolbar/testing/BUILD.bazel) |

## Classification notes

- Folder, file, and published export identities are distinct inventory objects.
- Symbol and operation lists summarize inspected declarations; they are not complete API contracts.
- Tests describe intended checks; no upstream test suite was executed.
- Supporting artifacts stay with their owning family; shared foundations are classified once.
