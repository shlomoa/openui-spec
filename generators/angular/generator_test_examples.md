# Generated example test plan

## Goal

Close the gap that caused confusion around generated examples by adding committed,
per-scope generator test inputs and repeatable tests. The tests prove what the
Angular Material generator produces for each scope file without treating
`generators/angular/generated-examples` as generator output.

This is an execution plan. Steps use explicit hierarchical numbers such as
`1.2.4` so each step can be directly referenced. Every executable step ends with
a new test to run.

## Guardrails

1. Do not regenerate `generators/angular/generated-examples` wholesale.
2. Do not treat `generators/angular/generated-examples` as generator output.
3. Do not modify generator behavior unless a separate task explicitly requests it.
4. Add tests and committed test fixtures under `generators/angular/tests`.
5. Commit input JSON fixtures and input workspace fixtures.
6. Do not commit generated output workspaces.
7. Do not write test output outside the repository; use repo-local temporary
   directories only.
8. Add or maintain a git ignore rule for `generators/angular/tests/.tmp/` before
   tests create output workspaces there.

## Directory layout

Use a dedicated test-example area under `generators/angular/tests`:

```text
generators/angular/tests/
├─ generator.test.ts
├─ generated-example-fixtures.test.ts
├─ fixtures/
│  └─ minimal-openui.json
├─ generated-example-fixtures/
│  ├─ manifest.json
│  └─ <scope-slug>/
│     ├─ openui.json
│     └─ input-workspace/
│        ├─ package.json
│        ├─ angular.json
│        ├─ tsconfig.json
│        └─ src/
│           ├─ index.html
│           ├─ main.ts
│           ├─ styles.scss
│           └─ app/
│              └─ ...simple before app files...
└─ .tmp/                    # git-ignored repo-local test output
```

The output workspace is created only during test execution in a repo-local,
git-ignored temporary directory:

```text
generators/angular/tests/.tmp/generated-example-fixtures/<scope-slug>/output-workspace/
```

The `.tmp/` directory must be created by tests when needed, ignored by git, and
removed during test cleanup. Tests must not use OS-level temporary directories
such as `%TEMP%`, `/tmp`, or `node:os tmpdir()` because repository instructions
require writes to stay inside the repo.

## 1. Build the generated-example fixture test harness

### 1.1 Create the test file and manifest loader

1.1.1 Create `generators/angular/tests/generated-example-fixtures.test.ts`.
The test file must load
`generators/angular/tests/generated-example-fixtures/manifest.json`, parse it,
and fail clearly when the manifest is missing, invalid JSON, or not an array.

New test to run: `generated example fixtures: manifest loads`.

### 1.2 Add scope-tree discovery

1.2.1 Add a helper that reads the actual `spec/scopes` tree from the repository
root. It must collect:

- `spec/scopes/scope.md`
- every `spec/scopes/**/scope.md`
- every `spec/scopes/**/*.scope.md`

New test to run: `generated example fixtures: discovers scope documents`.

1.2.2 Normalize every discovered scope document to a repository-relative POSIX
path, for example `spec/scopes/Application/routing.scope.md`.

New test to run: `generated example fixtures: normalizes scope document paths`.

1.2.3 Derive a fixture slug for every discovered scope document by removing the
`spec/scopes/` prefix, removing `/scope.md` or `.scope.md`, converting path
separators to `-`, converting folder and snake-case names to kebab-case, and
using `scopes` for `spec/scopes/scope.md`.

New test to run: `generated example fixtures: derives stable fixture slugs`.

### 1.3 Add manifest coverage validation

1.3.1 Validate that every discovered scope document has exactly one manifest
entry.

New test to run: `generated example fixtures: manifest covers every scope document`.

1.3.2 Validate that every manifest entry points to an existing scope document.

New test to run: `generated example fixtures: manifest entries point to existing scope documents`.

1.3.3 Validate that no two manifest entries use the same scope document or the
same fixture slug.

New test to run: `generated example fixtures: manifest entries are unique`.

### 1.4 Add fixture-shape validation

1.4.1 Validate that every manifest entry has a fixture directory at
`generators/angular/tests/generated-example-fixtures/<scope-slug>/`.

New test to run: `generated example fixtures: every fixture directory exists`.

1.4.2 Validate that every fixture directory contains an `openui.json` fixture.

New test to run: `generated example fixtures: every fixture has openui json`.

1.4.3 Validate that every fixture directory contains an `input-workspace/`
fixture.

New test to run: `generated example fixtures: every fixture has an input workspace`.

1.4.4 Validate that each `input-workspace/` contains `package.json`,
`angular.json`, `tsconfig.json`, `src/index.html`, `src/main.ts`,
`src/styles.scss`, and the minimal `src/app/` files required by that fixture.

New test to run: `generated example fixtures: every input workspace has required files`.

### 1.5 Add fixture JSON validation

1.5.1 Validate every fixture `openui.json` with the existing OpenUI validation
path.

New test to run: `generated example fixtures: every openui json validates`.

1.5.2 Validate that every fixture `openui.json` references the manifest scope
document through `attrs.scopeDocument`.

New test to run: `generated example fixtures: every openui json references its scope document`.

### 1.6 Add generator execution support

1.6.1 Add a helper that copies a fixture `input-workspace/` to
`generators/angular/tests/.tmp/generated-example-fixtures/<scope-slug>/output-workspace/`.

New test to run: `generated example fixtures: copies input workspace to repo-local output`.

1.6.2 Add a helper that runs the Angular generator against the copied output
workspace using the fixture `openui.json`.

New test to run: `generated example fixtures: runs generator for one manifest entry`.

1.6.3 Add output-boundary assertions that fail if generated output is written
outside the copied output workspace or outside the repository.

New test to run: `generated example fixtures: generator writes only inside repo-local output`.

1.6.4 Add cleanup that deletes the repo-local temporary output directory after
each test.

New test to run: `generated example fixtures: cleans repo-local output after execution`.

## 2. Implement one generated-example test per scope document

Each step in this section creates or updates exactly one fixture directory,
exactly one manifest entry, and exactly one generated-example test case. The
step is not complete until the named test exists and passes.

### 2.1 Root and folder scopes

2.1.1 Implement `scopes` for `spec/scopes/scope.md` with fixture slug `scopes`.
Assert `package.json`, `src/index.html`, `src/app/app.routes.ts`, and
`src/app/app.component.ts` exist, and assert generated output exposes
Application, Controls, Behaviors, Pages, Views, Containers, and Widgets.

New test to run: `generated example: scopes covers the scope index`.

2.1.2 Implement `application` for `spec/scopes/Application/scope.md` with fixture
slug `application`. Assert `src/app/app.component.ts`, `src/app/app.routes.ts`,
and `src/app/application-structure.model.ts` exist, and assert root component,
navigation shell, route outlet, and application-structure model markers.

New test to run: `generated example: application materializes application structure`.

2.1.3 Implement `behaviors` for `spec/scopes/Behaviors/scope.md` with fixture
slug `behaviors`. Assert page files exist and generated HTML names Drag and
drop, Resizable, and Collapsible as child behavior options.

New test to run: `generated example: behaviors lists reusable behaviors`.

2.1.4 Implement `containers` for `spec/scopes/Containers/scope.md` with fixture
slug `containers`. Assert page files exist and generated HTML names Grid,
Expandable panels, and Tabs.

New test to run: `generated example: containers lists layout containers`.

2.1.5 Implement `controls` for `spec/scopes/Controls/scope.md` with fixture slug
`controls`. Assert page files exist and generated HTML includes the component
metadata contract plus a link or reference to Native controls.

New test to run: `generated example: controls materializes control metadata`.

2.1.6 Implement `pages` for `spec/scopes/Pages/scope.md` with fixture slug
`pages`. Assert page files exist and generated HTML names Dashboard, Shell page,
and Empty page.

New test to run: `generated example: pages lists predefined page patterns`.

2.1.7 Implement `views` for `spec/scopes/Views/scope.md` with fixture slug
`views`. Assert page files exist and generated HTML names Reports and Forms.

New test to run: `generated example: views lists user-facing views`.

2.1.8 Implement `widgets` for `spec/scopes/Widgets/scope.md` with fixture slug
`widgets`. Assert page files exist and generated HTML names Charts, Tables,
Lists, Date/Time pickers, Stepper, and Dialog.

New test to run: `generated example: widgets lists reusable widgets`.

### 2.2 Application leaf scopes

2.2.1 Implement `application-favicon` for
`spec/scopes/Application/favicon.scope.md` with fixture slug
`application-favicon`. Assert the favicon artifact exists or an explicit no-HTML
explanation exists, and assert the manifest records whether the generator writes
`src/favicon.ico` or leaves favicon handling to the input workspace.

New test to run: `generated example: application-favicon documents favicon handling`.

2.2.2 Implement `application-index-html` for
`spec/scopes/Application/index_html.scope.md` with fixture slug
`application-index-html`. Assert generated `src/index.html` exists and contains
the generated root element, document title, and configured metadata.

New test to run: `generated example: application-index-html materializes index html`.

2.2.3 Implement `application-navigation` for
`spec/scopes/Application/navigation.scope.md` with fixture slug
`application-navigation`. Assert generated `src/app/app.component.ts` and its
template exist, and assert navigation links, active route binding, and Angular
Material navigation or sidenav imports.

New test to run: `generated example: application-navigation materializes navigation`.

2.2.4 Implement `application-routing` for
`spec/scopes/Application/routing.scope.md` with fixture slug
`application-routing`. Assert `src/app/app.routes.ts` exists and contains route
paths, redirect route, and lazy component imports expected by the fixture.

New test to run: `generated example: application-routing materializes routes`.

2.2.5 Implement `application-tool-bars` for
`spec/scopes/Application/tool_bars.scope.md` with fixture slug
`application-tool-bars`. Assert app component source imports or references
`MatToolbarModule`, and assert generated HTML contains a toolbar region and
configured title or action labels.

New test to run: `generated example: application-tool-bars materializes toolbar`.

### 2.3 Behavior leaf scopes

2.3.1 Implement `behaviors-collapsible` for
`spec/scopes/Behaviors/collapsible.scope.md` with fixture slug
`behaviors-collapsible`. Assert generated TypeScript contains collapse state and
a toggle handler, and assert generated HTML contains the collapsible region,
expanded/collapsed state binding, and accessible toggle control.

New test to run: `generated example: behaviors-collapsible materializes collapsible behavior`.

2.3.2 Implement `behaviors-drag-and-drop` for
`spec/scopes/Behaviors/drag_and_drop.scope.md` with fixture slug
`behaviors-drag-and-drop`. Assert generated TypeScript imports or references
`CdkDrag` and `CdkDropList`, includes the configured drag/drop event handler such
as `handlePressActivation` or a fixture-specific drop callback, and generated
HTML contains `cdkDropList`, `cdkDrag`, an OpenUI event marker such as
`data-openui-event="press"`, and the configured drop region marker.

New test to run: `generated example: behaviors-drag-and-drop materializes CDK drag and drop`.

2.3.3 Implement `behaviors-resizable` for
`spec/scopes/Behaviors/resizable.scope.md` with fixture slug
`behaviors-resizable`. Assert page files exist and generated HTML or TypeScript
contains resize handles, resize state, and configured resize behavior markers.

New test to run: `generated example: behaviors-resizable materializes resizable behavior`.

### 2.4 Container leaf scopes

2.4.1 Implement `containers-expandable-panels` for
`spec/scopes/Containers/expandable_panels.scope.md` with fixture slug
`containers-expandable-panels`. Assert TypeScript imports or references
`MatExpansionModule`, and generated HTML contains `mat-accordion` or
`mat-expansion-panel`, panel title text, and expanded/collapsed content.

New test to run: `generated example: containers-expandable-panels materializes expansion panels`.

2.4.2 Implement `containers-grid` for `spec/scopes/Containers/grid.scope.md`
with fixture slug `containers-grid`. Assert page files exist and generated HTML
contains the grid region, row/column markers, and configured responsive layout
classes or attributes.

New test to run: `generated example: containers-grid materializes grid layout`.

2.4.3 Implement `containers-tabs` for `spec/scopes/Containers/tabs.scope.md`
with fixture slug `containers-tabs`. Assert TypeScript imports or references
`MatTabsModule`, and generated HTML contains `mat-tab-group`, expected tab
labels, and tab content panels.

New test to run: `generated example: containers-tabs materializes tabs`.

### 2.5 Control leaf scopes

2.5.1 Implement `controls-native` for `spec/scopes/Controls/native.scope.md`
with fixture slug `controls-native`. Assert page files exist and generated HTML
contains native HTML controls such as `button`, `input`, or the specific controls
described by the fixture.

New test to run: `generated example: controls-native materializes native controls`.

### 2.6 Page leaf scopes

2.6.1 Implement `pages-dashboard` for `spec/scopes/Pages/dashboard.scope.md`
with fixture slug `pages-dashboard`. Assert dashboard page files exist and
generated HTML contains dashboard cards, summary metric regions, and Angular
Material card/grid markers.

New test to run: `generated example: pages-dashboard materializes dashboard page`.

2.6.2 Implement `pages-empty-page` for `spec/scopes/Pages/empty_page.scope.md`
with fixture slug `pages-empty-page`. Assert empty page files exist and generated
HTML contains an empty-page shell or explanation without unrelated navigation or
content regions.

New test to run: `generated example: pages-empty-page materializes empty page`.

2.6.3 Implement `pages-shell-page` for `spec/scopes/Pages/shell_page.scope.md`
with fixture slug `pages-shell-page`. Assert shell page files exist and generated
HTML contains shell navigation, routing outlet region, and no unrelated business
content.

New test to run: `generated example: pages-shell-page materializes shell page`.

### 2.7 View leaf scopes

2.7.1 Implement `views-forms` for `spec/scopes/Views/forms.scope.md` with
fixture slug `views-forms`. Assert TypeScript imports or references
`ReactiveFormsModule` and `MatFormFieldModule`, and generated HTML contains
`mat-form-field`, form controls, validation markers, and data-binding
materialization text.

New test to run: `generated example: views-forms materializes reactive form view`.

2.7.2 Implement `views-reports` for `spec/scopes/Views/reports.scope.md` with
fixture slug `views-reports`. Assert page files exist and generated HTML or
TypeScript contains table/list output, read-only data markers, filtering,
sorting, grouping, or pagination markers required by the fixture.

New test to run: `generated example: views-reports materializes report view`.

### 2.8 Widget leaf scopes

2.8.1 Implement `widgets-charts` for `spec/scopes/Widgets/charts.scope.md` with
fixture slug `widgets-charts`. Assert page files exist and generated HTML
contains a chart placeholder, dataset labels, and configured chart type or an
explicit no-renderer explanation.

New test to run: `generated example: widgets-charts materializes chart widget`.

2.8.2 Implement `widgets-date-time-pickers` for
`spec/scopes/Widgets/date_time_pickers.scope.md` with fixture slug
`widgets-date-time-pickers`. Assert TypeScript imports or references
datepicker-related Angular Material modules, and generated HTML contains
date/time input controls, picker trigger, and configured form binding markers.

New test to run: `generated example: widgets-date-time-pickers materializes date time picker`.

2.8.3 Implement `widgets-dialog` for `spec/scopes/Widgets/dialog.scope.md` with
fixture slug `widgets-dialog`. Assert TypeScript imports or references dialog or
feedback modules such as `MatDialogModule`, `MatChipsModule`, or
`MatSnackBarModule`, and generated source contains dialog open action,
title/content/action markers, and feedback handler such as `showFeedback()` when
configured.

New test to run: `generated example: widgets-dialog materializes dialog widget`.

2.8.4 Implement `widgets-lists` for `spec/scopes/Widgets/lists.scope.md` with
fixture slug `widgets-lists`. Assert TypeScript imports or references
`MatListModule`, and generated HTML contains list item regions, item labels, and
sorting, filtering, or pagination markers when configured.

New test to run: `generated example: widgets-lists materializes list widget`.

2.8.5 Implement `widgets-stepper` for `spec/scopes/Widgets/stepper.scope.md`
with fixture slug `widgets-stepper`. Assert TypeScript imports or references
`MatStepperModule`, and generated HTML contains `mat-stepper` or `mat-step`, step
labels, and next/back action markers.

New test to run: `generated example: widgets-stepper materializes stepper widget`.

2.8.6 Implement `widgets-tables` for `spec/scopes/Widgets/tables.scope.md` with
fixture slug `widgets-tables`. Assert TypeScript imports or references
`MatTableModule`, and generated HTML contains table columns, header cells, data
rows, and sorting/filtering/pagination markers required by the fixture.

New test to run: `generated example: widgets-tables materializes table widget`.

## 3. Integrate generated-example fixtures into documentation app

### 3.1 Add fixture metadata consumption

3.1.1 Update `generators/angular/generated-examples` to consume the committed
fixture manifest and source snippets after section 2 tests exist and pass. The
app must not run the generator at runtime.

New test to run: `generated examples app: loads fixture metadata without running generator`.

### 3.2 Preserve the scope hierarchy in the app

3.2.1 Render documentation entries using the same hierarchy and slugs as
`spec/scopes` and the fixture manifest.

New test to run: `generated examples app: preserves spec scopes hierarchy`.

### 3.3 Render before/after examples

3.3.1 For examples with generated HTML, show the compiled/rendered before result
on the left and the compiled/rendered after result on the right.

New test to run: `generated examples app: renders before and after panels`.

3.3.2 Expose source tabs for HTML, CSS/SCSS, and TypeScript when those artifacts
exist.

New test to run: `generated examples app: exposes source tabs for example artifacts`.

3.3.3 Replace visual panels with textual explanation when no generated HTML is
expected.

New test to run: `generated examples app: shows explanation for no-html examples`.

## 4. Validate completion

### 4.1 Run generator validation

4.1.1 Run the Angular generator test suite after fixture or generator-test
changes.

New test to run: `npm test` from `generators/angular`.

### 4.2 Run generated-examples app validation

4.2.1 Run generated-examples format, lint, test, and build validation after app
changes.

New tests to run from `generators/angular/generated-examples`:

- `npm run format:check`
- `npm run lint`
- `npm test`
- `npm run build`

### 4.3 Confirm repository constraints

4.3.1 Confirm generated output workspaces are not committed and all test output
stays under `generators/angular/tests/.tmp/`.

New test to run: `generated example fixtures: generated output remains repo-local and uncommitted`.
