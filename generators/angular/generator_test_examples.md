# Generated example test plan

## Goal

Close the gap that caused confusion around generated examples by adding committed,
per-scope generator test inputs and repeatable tests. The tests prove what the
Angular Material generator produces for each scope file without treating
`generators/angular/generated-examples` as generator output.

Executable implementation steps use stable IDs so they can be referenced
directly, for example `GTE-M001`, `GTE-T004`, or `GTE-S010`.

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

## Scope coverage

1. Enumerate every scope file under `spec/scopes`:
   - `spec/scopes/scope.md`
   - every nested `scope.md`
   - every `*.scope.md` leaf file

2. Create a stable fixture slug for each scope file:
   - `spec/scopes/scope.md` → `scopes`
   - `spec/scopes/Application/scope.md` → `application`
   - `spec/scopes/Application/routing.scope.md` → `application-routing`
   - `spec/scopes/Widgets/date_time_pickers.scope.md` → `widgets-date-time-pickers`

3. Record all scope-file decisions in `manifest.json`.

4. Each manifest entry should include:
   - source scope file path
   - fixture slug
   - input JSON path
   - input workspace path
   - expected generated files
   - whether generated HTML is expected
   - explanation text for no-HTML cases

## Scope tree matching steps

Use the actual `spec/scopes` folder and file tree as the source of truth for
the generated example fixture manifest. Do not hand-pick scope files from prose
or from `openui.json` only.

1. **GTE-M001 — Start from the canonical scope directory.** Start at
   `spec/scopes` from the repository root.
2. **GTE-M002 — Collect root, folder, and leaf scope files.** Collect every
   Markdown file matching one of these patterns:
   - `spec/scopes/scope.md`
   - `spec/scopes/**/scope.md`
   - `spec/scopes/**/*.scope.md`
3. **GTE-M003 — Normalize paths.** Convert each path to a
   repository-relative POSIX path, for example
   `spec/scopes/Application/routing.scope.md`.
4. **GTE-M004 — Sort paths deterministically.** Sort paths by folder hierarchy
   and filename so manifest diffs are stable.
5. **GTE-M005 — Classify each scope path.** Classify each path:
   - `scope.md` represents the folder scope itself.
   - `*.scope.md` represents a leaf scope object inside its parent folder.
6. **GTE-M006 — Derive the fixture slug.** Derive the fixture slug from the
   path:
   - remove the leading `spec/scopes/` prefix,
   - remove the trailing `/scope.md` for folder scopes,
   - remove the trailing `.scope.md` for leaf scopes,
   - convert path separators to `-`,
   - convert folder names and snake-case filenames to kebab-case,
   - use `scopes` for the root `spec/scopes/scope.md` file.
7. **GTE-M007 — Create exactly one manifest entry per scope file.** Create
   exactly one manifest entry per collected scope file.
8. **GTE-M008 — Create the scope fixture directory.** Create the fixture
   directory at
   `generators/angular/tests/generated-example-fixtures/<scope-slug>/`.
9. **GTE-M009 — Create the scope fixture JSON.** Create the fixture
   `openui.json` at
   `generators/angular/tests/generated-example-fixtures/<scope-slug>/openui.json`.
10. **GTE-M010 — Bind fixture JSON to the matched scope document.** Ensure the
    fixture `openui.json` references the matched Markdown file through
    `attrs.scopeDocument`.
11. **GTE-M011 — Create the scope input workspace.** Create the fixture input
    workspace at
    `generators/angular/tests/generated-example-fixtures/<scope-slug>/input-workspace/`.
12. **GTE-M012 — Record manifest paths.** Record the same `scopeDocument`,
    `scopeSlug`, `openui.json`, and `input-workspace/` paths in
    `manifest.json`.
13. **GTE-M013 — Add manifest coverage failures.** Fail the coverage test when:
    - a `spec/scopes` Markdown file has no manifest entry,
    - a manifest entry points to a missing `spec/scopes` Markdown file,
    - two manifest entries point to the same scope file,
    - two manifest entries use the same fixture slug,
    - the fixture `openui.json` references a different `scopeDocument` than the
      manifest entry.

## Current scope file checklist

The current `spec/scopes` tree contains 31 Markdown scope files. The fixture
manifest must contain these exact path-to-slug entries until the scope tree is
changed:

| Scope document                                      | Fixture slug                   |
| --------------------------------------------------- | ------------------------------ |
| `spec/scopes/scope.md`                              | `scopes`                       |
| `spec/scopes/Application/scope.md`                  | `application`                  |
| `spec/scopes/Application/favicon.scope.md`          | `application-favicon`          |
| `spec/scopes/Application/index_html.scope.md`       | `application-index-html`       |
| `spec/scopes/Application/navigation.scope.md`       | `application-navigation`       |
| `spec/scopes/Application/routing.scope.md`          | `application-routing`          |
| `spec/scopes/Application/tool_bars.scope.md`        | `application-tool-bars`        |
| `spec/scopes/Behaviors/scope.md`                    | `behaviors`                    |
| `spec/scopes/Behaviors/collapsible.scope.md`        | `behaviors-collapsible`        |
| `spec/scopes/Behaviors/drag_and_drop.scope.md`      | `behaviors-drag-and-drop`      |
| `spec/scopes/Behaviors/resizable.scope.md`          | `behaviors-resizable`          |
| `spec/scopes/Containers/scope.md`                   | `containers`                   |
| `spec/scopes/Containers/expandable_panels.scope.md` | `containers-expandable-panels` |
| `spec/scopes/Containers/grid.scope.md`              | `containers-grid`              |
| `spec/scopes/Containers/tabs.scope.md`              | `containers-tabs`              |
| `spec/scopes/Controls/scope.md`                     | `controls`                     |
| `spec/scopes/Controls/native.scope.md`              | `controls-native`              |
| `spec/scopes/Pages/scope.md`                        | `pages`                        |
| `spec/scopes/Pages/dashboard.scope.md`              | `pages-dashboard`              |
| `spec/scopes/Pages/empty_page.scope.md`             | `pages-empty-page`             |
| `spec/scopes/Pages/shell_page.scope.md`             | `pages-shell-page`             |
| `spec/scopes/Views/scope.md`                        | `views`                        |
| `spec/scopes/Views/forms.scope.md`                  | `views-forms`                  |
| `spec/scopes/Views/reports.scope.md`                | `views-reports`                |
| `spec/scopes/Widgets/scope.md`                      | `widgets`                      |
| `spec/scopes/Widgets/charts.scope.md`               | `widgets-charts`               |
| `spec/scopes/Widgets/date_time_pickers.scope.md`    | `widgets-date-time-pickers`    |
| `spec/scopes/Widgets/dialog.scope.md`               | `widgets-dialog`               |
| `spec/scopes/Widgets/lists.scope.md`                | `widgets-lists`                |
| `spec/scopes/Widgets/stepper.scope.md`              | `widgets-stepper`              |
| `spec/scopes/Widgets/tables.scope.md`               | `widgets-tables`               |

## Per-scope test generation plan

Create a dedicated test file,
`generators/angular/tests/generated-example-fixtures.test.ts`, that generates
one test case for each row in the current scope file checklist. Each test case
must:

1. **GTE-T001 — Read the manifest entry.** Read that scope's manifest entry.
2. **GTE-T002 — Validate the fixture JSON.** Validate the fixture `openui.json`.
3. **GTE-T003 — Copy the input workspace.** Copy that scope's
   `input-workspace/` to a repo-local temporary output directory under
   `generators/angular/tests/.tmp/`.
4. **GTE-T004 — Run the generator.** Run the Angular generator with that
   fixture `openui.json`.
5. **GTE-T005 — Assert generated output.** Assert the listed generated files and
   generated source markers.
6. **GTE-T006 — Clean up generated output.** Delete the temporary output
   directory after the test.

Do not mark a scope complete because it appears in the manifest. Mark it
complete only after its generated test exists and passes.

### Root and folder-scope executable steps

1. **GTE-S001 — Implement `scopes`.** Generate test
   `generated example: scopes covers the scope index` for
   `spec/scopes/scope.md` with fixture slug `scopes`; assert `package.json`,
   `src/index.html`, `src/app/app.routes.ts`, and `src/app/app.component.ts`
   exist, and assert generated output exposes Application, Controls, Behaviors,
   Pages, Views, Containers, and Widgets.
2. **GTE-S002 — Implement `application`.** Generate test
   `generated example: application materializes application structure` for
   `spec/scopes/Application/scope.md` with fixture slug `application`; assert
   `src/app/app.component.ts`, `src/app/app.routes.ts`, and
   `src/app/application-structure.model.ts` exist, and assert root component,
   navigation shell, route outlet, and application-structure model markers.
3. **GTE-S003 — Implement `behaviors`.** Generate test
   `generated example: behaviors lists reusable behaviors` for
   `spec/scopes/Behaviors/scope.md` with fixture slug `behaviors`; assert page
   files exist and generated HTML names Drag and drop, Resizable, and
   Collapsible as child behavior options.
4. **GTE-S004 — Implement `containers`.** Generate test
   `generated example: containers lists layout containers` for
   `spec/scopes/Containers/scope.md` with fixture slug `containers`; assert page
   files exist and generated HTML names Grid, Expandable panels, and Tabs.
5. **GTE-S005 — Implement `controls`.** Generate test
   `generated example: controls materializes control metadata` for
   `spec/scopes/Controls/scope.md` with fixture slug `controls`; assert page
   files exist and generated HTML includes the component metadata contract plus
   a link or reference to Native controls.
6. **GTE-S006 — Implement `pages`.** Generate test
   `generated example: pages lists predefined page patterns` for
   `spec/scopes/Pages/scope.md` with fixture slug `pages`; assert page files
   exist and generated HTML names Dashboard, Shell page, and Empty page.
7. **GTE-S007 — Implement `views`.** Generate test
   `generated example: views lists user-facing views` for
   `spec/scopes/Views/scope.md` with fixture slug `views`; assert page files
   exist and generated HTML names Reports and Forms.
8. **GTE-S008 — Implement `widgets`.** Generate test
   `generated example: widgets lists reusable widgets` for
   `spec/scopes/Widgets/scope.md` with fixture slug `widgets`; assert page files
   exist and generated HTML names Charts, Tables, Lists, Date/Time pickers,
   Stepper, and Dialog.

### Application leaf-scope executable steps

1. **GTE-S009 — Implement `application-favicon`.** Generate test
   `generated example: application-favicon documents favicon handling` for
   `spec/scopes/Application/favicon.scope.md` with fixture slug
   `application-favicon`; assert the favicon artifact exists or an explicit
   no-HTML explanation exists, and assert the manifest records whether the
   generator writes `src/favicon.ico` or leaves favicon handling to the input
   workspace.
2. **GTE-S010 — Implement `application-index-html`.** Generate test
   `generated example: application-index-html materializes index html` for
   `spec/scopes/Application/index_html.scope.md` with fixture slug
   `application-index-html`; assert generated `src/index.html` exists and
   contains the generated root element, document title, and configured metadata.
3. **GTE-S011 — Implement `application-navigation`.** Generate test
   `generated example: application-navigation materializes navigation` for
   `spec/scopes/Application/navigation.scope.md` with fixture slug
   `application-navigation`; assert generated `src/app/app.component.ts` and its
   template exist, and assert navigation links, active route binding, and Angular
   Material navigation or sidenav imports.
4. **GTE-S012 — Implement `application-routing`.** Generate test
   `generated example: application-routing materializes routes` for
   `spec/scopes/Application/routing.scope.md` with fixture slug
   `application-routing`; assert `src/app/app.routes.ts` exists and contains the
   route paths, redirect route, and lazy component imports expected by the
   fixture.
5. **GTE-S013 — Implement `application-tool-bars`.** Generate test
   `generated example: application-tool-bars materializes toolbar` for
   `spec/scopes/Application/tool_bars.scope.md` with fixture slug
   `application-tool-bars`; assert app component source imports or references
   `MatToolbarModule`, and assert generated HTML contains a toolbar region and
   configured title or action labels.

### Behavior leaf-scope executable steps

1. **GTE-S014 — Implement `behaviors-collapsible`.** Generate test
   `generated example: behaviors-collapsible materializes collapsible behavior`
   for `spec/scopes/Behaviors/collapsible.scope.md` with fixture slug
   `behaviors-collapsible`; assert generated TypeScript contains collapse state
   and a toggle handler, and assert generated HTML contains the collapsible
   region, expanded/collapsed state binding, and accessible toggle control.
2. **GTE-S015 — Implement `behaviors-drag-and-drop`.** Generate test
   `generated example: behaviors-drag-and-drop materializes CDK drag and drop`
   for `spec/scopes/Behaviors/drag_and_drop.scope.md` with fixture slug
   `behaviors-drag-and-drop`; assert generated TypeScript imports or references
   `CdkDrag` and `CdkDropList`, includes the configured drag/drop event handler
   such as `handlePressActivation` or a fixture-specific drop callback, and
   generated HTML contains `cdkDropList`, `cdkDrag`, an OpenUI event marker such
   as `data-openui-event="press"`, and the configured drop region marker.
3. **GTE-S016 — Implement `behaviors-resizable`.** Generate test
   `generated example: behaviors-resizable materializes resizable behavior` for
   `spec/scopes/Behaviors/resizable.scope.md` with fixture slug
   `behaviors-resizable`; assert page files exist and generated HTML or
   TypeScript contains resize handles, resize state, and configured resize
   behavior markers.

### Container leaf-scope executable steps

1. **GTE-S017 — Implement `containers-expandable-panels`.** Generate test
   `generated example: containers-expandable-panels materializes expansion panels`
   for `spec/scopes/Containers/expandable_panels.scope.md` with fixture slug
   `containers-expandable-panels`; assert TypeScript imports or references
   `MatExpansionModule`, and generated HTML contains `mat-accordion` or
   `mat-expansion-panel`, panel title text, and expanded/collapsed content.
2. **GTE-S018 — Implement `containers-grid`.** Generate test
   `generated example: containers-grid materializes grid layout` for
   `spec/scopes/Containers/grid.scope.md` with fixture slug `containers-grid`;
   assert page files exist and generated HTML contains the grid region,
   row/column markers, and configured responsive layout classes or attributes.
3. **GTE-S019 — Implement `containers-tabs`.** Generate test
   `generated example: containers-tabs materializes tabs` for
   `spec/scopes/Containers/tabs.scope.md` with fixture slug `containers-tabs`;
   assert TypeScript imports or references `MatTabsModule`, and generated HTML
   contains `mat-tab-group`, expected tab labels, and tab content panels.

### Control leaf-scope executable steps

1. **GTE-S020 — Implement `controls-native`.** Generate test
   `generated example: controls-native materializes native controls` for
   `spec/scopes/Controls/native.scope.md` with fixture slug `controls-native`;
   assert page files exist and generated HTML contains native HTML controls such
   as `button`, `input`, or the specific controls described by the fixture.

### Page leaf-scope executable steps

1. **GTE-S021 — Implement `pages-dashboard`.** Generate test
   `generated example: pages-dashboard materializes dashboard page` for
   `spec/scopes/Pages/dashboard.scope.md` with fixture slug `pages-dashboard`;
   assert dashboard page files exist and generated HTML contains dashboard
   cards, summary metric regions, and Angular Material card/grid markers.
2. **GTE-S022 — Implement `pages-empty-page`.** Generate test
   `generated example: pages-empty-page materializes empty page` for
   `spec/scopes/Pages/empty_page.scope.md` with fixture slug `pages-empty-page`;
   assert empty page files exist and generated HTML contains an empty-page shell
   or explanation without unrelated navigation or content regions.
3. **GTE-S023 — Implement `pages-shell-page`.** Generate test
   `generated example: pages-shell-page materializes shell page` for
   `spec/scopes/Pages/shell_page.scope.md` with fixture slug `pages-shell-page`;
   assert shell page files exist and generated HTML contains shell navigation,
   routing outlet region, and no unrelated business content.

### View leaf-scope executable steps

1. **GTE-S024 — Implement `views-forms`.** Generate test
   `generated example: views-forms materializes reactive form view` for
   `spec/scopes/Views/forms.scope.md` with fixture slug `views-forms`; assert
   TypeScript imports or references `ReactiveFormsModule` and
   `MatFormFieldModule`, and generated HTML contains `mat-form-field`, form
   controls, validation markers, and data-binding materialization text.
2. **GTE-S025 — Implement `views-reports`.** Generate test
   `generated example: views-reports materializes report view` for
   `spec/scopes/Views/reports.scope.md` with fixture slug `views-reports`;
   assert page files exist and generated HTML or TypeScript contains table/list
   output, read-only data markers, filtering, sorting, grouping, or pagination
   markers required by the fixture.

### Widget leaf-scope executable steps

1. **GTE-S026 — Implement `widgets-charts`.** Generate test
   `generated example: widgets-charts materializes chart widget` for
   `spec/scopes/Widgets/charts.scope.md` with fixture slug `widgets-charts`;
   assert page files exist and generated HTML contains a chart placeholder,
   dataset labels, and configured chart type or an explicit no-renderer
   explanation.
2. **GTE-S027 — Implement `widgets-date-time-pickers`.** Generate test
   `generated example: widgets-date-time-pickers materializes date time picker`
   for `spec/scopes/Widgets/date_time_pickers.scope.md` with fixture slug
   `widgets-date-time-pickers`; assert TypeScript imports or references
   datepicker-related Angular Material modules, and generated HTML contains
   date/time input controls, picker trigger, and configured form binding
   markers.
3. **GTE-S028 — Implement `widgets-dialog`.** Generate test
   `generated example: widgets-dialog materializes dialog widget` for
   `spec/scopes/Widgets/dialog.scope.md` with fixture slug `widgets-dialog`;
   assert TypeScript imports or references dialog or feedback modules such as
   `MatDialogModule`, `MatChipsModule`, or `MatSnackBarModule`, and generated
   source contains dialog open action, title/content/action markers, and
   feedback handler such as `showFeedback()` when configured.
4. **GTE-S029 — Implement `widgets-lists`.** Generate test
   `generated example: widgets-lists materializes list widget` for
   `spec/scopes/Widgets/lists.scope.md` with fixture slug `widgets-lists`;
   assert TypeScript imports or references `MatListModule`, and generated HTML
   contains list item regions, item labels, and sorting, filtering, or
   pagination markers when configured.
5. **GTE-S030 — Implement `widgets-stepper`.** Generate test
   `generated example: widgets-stepper materializes stepper widget` for
   `spec/scopes/Widgets/stepper.scope.md` with fixture slug `widgets-stepper`;
   assert TypeScript imports or references `MatStepperModule`, and generated
   HTML contains `mat-stepper` or `mat-step`, step labels, and next/back action
   markers.
6. **GTE-S031 — Implement `widgets-tables`.** Generate test
   `generated example: widgets-tables materializes table widget` for
   `spec/scopes/Widgets/tables.scope.md` with fixture slug `widgets-tables`;
   assert TypeScript imports or references `MatTableModule`, and generated HTML
   contains table columns, header cells, data rows, and
   sorting/filtering/pagination markers required by the fixture.

## Fixture requirements

For each scope file, add a fixture directory under
`generators/angular/tests/generated-example-fixtures/<scope-slug>/`.

Each fixture must include:

1. **GTE-F001 — Add the scope `openui.json` fixture.** `openui.json`
   - Minimal OpenUI input for that scope example.
   - Traceable to the source scope file through `attrs.scopeDocument` or the
     equivalent existing input contract.
   - Small enough to make the expected generator behavior clear.

2. **GTE-F002 — Add the scope `input-workspace/` fixture.** `input-workspace/`
   - A simple Angular app representing the before state.
   - Contains only the files needed by the example.
   - Includes HTML/CSS/TS before applying the generator when those artifacts are
     sensible for the scope.

3. **GTE-F003 — Keep generated output uncommitted.** No committed output
   workspace.
   - Output is always produced in a repo-local temporary copied workspace during
     tests.
   - The repo-local temporary workspace lives under
     `generators/angular/tests/.tmp/` and is ignored by git.

## Test plan

### GTE-T007 — Scope coverage test

Add a test under `generators/angular/tests` that:

1. reads the actual `spec/scopes` tree,
2. collects every `scope.md` and `*.scope.md`,
3. reads `generated-example-fixtures/manifest.json`,
4. asserts every scope file has exactly one manifest entry,
5. asserts every manifest entry points to an existing scope file.

### GTE-T008 — Input JSON fixture validation test

For each manifest entry:

1. read the fixture `openui.json`,
2. parse it using the existing spec loading path,
3. validate it using the existing OpenUI validation path,
4. assert it references the expected scope file,
5. assert the fixture ID/metadata are stable and unique.

### GTE-T009 — Input workspace validation test

For each manifest entry:

1. assert `input-workspace/` exists,
2. assert required workspace files exist,
3. assert the before app has a minimal Angular entry point,
4. assert expected before HTML/CSS/TS files exist when the manifest says they are
   expected,
5. assert no output files are committed inside the fixture directory.

### GTE-T010 — Generator execution test

For each manifest entry:

1. create a repo-local temporary directory under
   `generators/angular/tests/.tmp/`,
2. copy `input-workspace/` into that repo-local temporary directory as
   `output-workspace/`,
3. run the existing generator against `output-workspace/` using the fixture
   `openui.json`,
4. assert the expected generated files exist in `output-workspace/`,
5. assert no writes occurred outside `output-workspace/`,
6. assert no writes occurred outside the repository,
7. clean up the repo-local temporary directory after the test.

### GTE-T011 — Before/after material test

For each manifest entry:

1. collect before HTML/CSS/TS from the committed input workspace,
2. collect after HTML/CSS/TS from the repo-local temporary generated output
   workspace,
3. assert both sides are available when HTML generation is expected,
4. assert explanation text exists when no generated HTML is expected,
5. fail the test if an example has neither generated output nor explanation text.

## Generated-examples app integration plan

After the tests and fixtures exist, update the hand-maintained
`generators/angular/generated-examples` documentation app to consume the fixture
metadata and source snippets.

The app should:

1. **GTE-D001 — Preserve scope hierarchy.** Preserve the hierarchy under
   `spec/scopes`.
2. **GTE-D002 — Add one documentation entry per scope.** Provide one
   documentation entry per scope file when possible and sensible.
3. **GTE-D003 — Show before/after panels.** Show before and after panels for
   examples with generated HTML.
4. **GTE-D004 — Show rendered before result.** Show the compiled/rendered before
   result on the left.
5. **GTE-D005 — Show rendered after result.** Show the compiled/rendered after
   result on the right.
6. **GTE-D006 — Show source tabs.** Expose source tabs for HTML, CSS/SCSS, and
   TS.
7. **GTE-D007 — Show explanation-only content.** Replace visual panels with
   textual explanation when no HTML is generated.

The app must not run the generator at runtime.

## Validation commands

Run generator tests from `generators/angular`:

```powershell
npm test
```

Run generated-examples app validation from
`generators/angular/generated-examples` after app integration changes:

```powershell
npm run format:check
npm run lint
npm test
npm run build
```

Use repository-local Python validation only when repo-level docs, Python tests,
or root configuration are affected.

Executable validation references:

1. **GTE-V001 — Run Angular generator validation.** Run `npm test` from
   `generators/angular` after fixture or generator-test changes.
2. **GTE-V002 — Run generated-examples formatting.** Run `npm run format:check`
   from `generators/angular/generated-examples` after generated-examples app
   changes.
3. **GTE-V003 — Run generated-examples lint.** Run `npm run lint` from
   `generators/angular/generated-examples` after generated-examples app changes.
4. **GTE-V004 — Run generated-examples tests.** Run `npm test` from
   `generators/angular/generated-examples` after generated-examples app changes.
5. **GTE-V005 — Run generated-examples build.** Run `npm run build` from
   `generators/angular/generated-examples` after generated-examples app changes.
6. **GTE-V006 — Run repo-level Python validation when affected.** Use the
   repository-local `.venv` only when repo-level docs, Python tests, or root
   configuration are affected.
7. **GTE-V007 — Format this plan after edits.** Run the configured Prettier hook
   for `generators/angular/generator_test_examples.md`.
8. **GTE-V008 — Check this plan for whitespace errors.** Run
   `git diff --check -- generators/angular/generator_test_examples.md`.

## Completion criteria

The gap is closed when:

1. **GTE-C001 — Manifest coverage is complete.** Every scope file under
   `spec/scopes` has a manifest entry.
2. **GTE-C002 — JSON fixture coverage is complete.** Every manifest entry has a
   committed input JSON fixture.
3. **GTE-C003 — Workspace fixture coverage is complete.** Every manifest entry
   has a committed input workspace fixture.
4. **GTE-C004 — Repo-local execution is implemented.** Tests copy each input
   workspace into a repo-local temporary output workspace.
5. **GTE-C005 — Generator execution is implemented.** Tests run the generator in
   the copied workspace using the fixture JSON.
6. **GTE-C006 — Generated-file assertions are implemented.** Tests validate
   expected generated files.
7. **GTE-C007 — Generated output remains uncommitted.** Generated output
   workspaces are not committed.
8. **GTE-C008 — Test output stays under `.tmp/`.** All test-generated output
   stays under `generators/angular/tests/.tmp/`.
9. **GTE-C009 — Documentation app can consume covered examples.** The
   documentation app can show before/after examples or explanation-only content
   for each covered scope.
10. **GTE-C010 — Generator behavior remains stable.** Generator behavior remains
    unchanged unless separately requested.
