# Angular Material Generator

The Angular Material generator is the first executable consumer of the OpenUI specification. It demonstrates how `openui.json` can be validated and projected into a real application target instead of remaining only a prose specification.

## What it does

The generator package is located at `generators/angular` and is published in the repository as a TypeScript npm package. It:

- loads an OpenUI JSON specification file;
- validates that the required specification sections are present;
- normalizes the specification into an implementation-independent UI model;
- maps that UI model to Angular concepts; and
- writes a standalone Angular Material application skeleton.

The generated application includes:

- `package.json`, `angular.json`, `tsconfig.json`, and `src/main.ts`;
- Angular routes derived from specification sections;
- a standalone root component with Angular Material toolbar, sidenav, navigation links, and generated application-structure metadata;
- a generated `src/app/application-structure.model.ts` artifact when `spec/06-application-structure.md` is present, exposing root component resolution, explicit Angular library dependencies, shell regions, page hierarchy, and navigation container structure;
- generated `src/app/openui-extension.model.ts`, `src/app/openui-extension-samples.ts`, and `src/app/openui-workspace-outlet.component.ts` artifacts when `spec/20-extension-model.md` is present, exposing typed extension outlets, compatibility gates, optional design-time overlays, and declared renderer/drag-and-drop capabilities;
- global theme styles; and
- generated page components for specification sections, including section-specific application-structure, layout-system, state-model, data-binding, performance, extension-model, compliance-rules, form, navigation, feedback, accessibility, theming, and UI concept details where mappings exist.

When `spec/05-ui-concept-model.md` is present, the generated UI Concept Model page emits Angular Material content that distinguishes controls from elements, shows named regions such as header/content/footer/actions, renders action controls, and documents forms, dialogs, owned aggregation relationships, and non-owning associations as visible generated output.

When `spec/07-layout-system.md` is present, the generated Layout System page emits aggregation-backed named regions, an ordered content region whose document order is preserved with Angular control flow, breakpoint-driven CSS reflow, density and spacing custom properties, and Angular CDK drag/drop directives only for the region whose metadata declares drag-and-drop.

When `spec/09-interaction-model.md` is present, the generated Interaction Model page emits a semantic activation contract for `press`, preserves the owning component and stable handler path in generated metadata, maps the activation to a Material button `(click)` binding, binds `[disabled]` to the enabled gate, and guards the generated handler so disabled controls cannot invoke application behavior through alternate activation paths. The generated page documents that Angular Material and the native button element normalize pointer, touch, keyboard, and assistive-technology activation for the enabled control without depending on private DOM events, renderer internals, or browser-specific event ordering.

When `spec/10-state-model.md` is present, the generated State Model page emits public metadata properties as typed Angular signal inputs or equivalent generated accessors with declared defaults, filters hidden/internal metadata out of generated public APIs and runnable examples, and documents derived-state compatibility by keeping computed values within the declared metadata type before surfacing them through Angular Material validation feedback.

When `spec/11-data-binding-model.md` is present, the generated Data Binding Model page emits scalar property binding metadata for a named model path, renders that value through a typed Angular Material input binding, emits aggregation/list binding metadata for a collection path, and renders child entries through Angular control-flow repetition. The generated contract records model names, paths, target members, bindable and hidden flags, scalar value types, aggregation child type, multiplicity, and a typed async update example while excluding non-bindable or hidden members from generated binding targets.

When `spec/19-performance-requirements.md` is present, the generated Performance Requirements page emits a concrete performance contract: route-level lazy detail loading metadata that points at Angular Router `loadComponent`, a stable cache identity for immutable API projections, and an Angular CDK virtual-scroll viewport for a large aggregation with observable budget metadata such as item size and initial materialization budget.

When `spec/17-internationalization.md` is present, the generated Internationalization page emits a shared `OpenUiI18nService` and `OPENUI_I18N` configuration with message bundles, a deterministic locale fallback chain, message-key resolution, Angular `LOCALE_ID` wiring, locale-aware number/currency/date formatting hooks, and `dir`/`lang` bindings derived from the active locale.

When `spec/20-extension-model.md` is present, the generated Extension Model page emits a typed `OpenUiWorkspaceOutletComponent` backed by `WorkspaceCardExtension` artifacts. The outlet filters candidates through declared extension-point type and host-capability gates before rendering compatible components with `NgComponentOutlet`. Runtime metadata, design-time overlays, renderer linkage, and drag-and-drop declarations are generated as separate typed records so authoring metadata never becomes a runtime Angular input or private DOM dependency.

When `spec/21-compliance-rules.md` is present, the generator validates catalog discoverability, public component resolution, metadata completeness, synchronized evidence, and cross-cutting compliance gates before generation succeeds. The generated Compliance Rules page renders the same validation contract through Angular Material chips and lists, including catalog evidence, required public metadata members, documentation/generated-example/projection evidence, and diagnostics for missing or stale compliance artifacts.

## Expected Angular Material output

Generated Angular applications must target the latest Angular Material package set supported by this repository. The current generator emits Angular and Angular Material `22.0.2` dependencies and should keep those pins current when the repository upgrades its Angular toolchain.

The generated UI should prefer Angular Material components and directives wherever Angular Material provides an equivalent:

- application shells use `MatToolbarModule`, `MatSidenavModule`, and `MatListModule`;
- application-structure materialization emits a typed model for the root component, explicit dependencies, shell regions, navigation container, routed content outlet, and page hierarchy;
- layout-system materialization uses Material toolbar/card/list/chip primitives, CSS grid breakpoints, theme spacing tokens, density-scoped CSS variables, and CDK drag/drop only for declared drag-and-drop aggregations;
- interaction-model materialization uses a semantic `press` activation contract, Material button binding, generated enabled-state gating, and no private pointer, touch, or keyboard listener assumptions;
- state-model materialization uses typed Angular signal inputs or equivalent accessors with declared defaults, excludes hidden/internal state from public APIs and examples, and constrains derived state to declared metadata types;
- data-binding materialization uses Material input/list/chip primitives, typed scalar value bindings, template-driven aggregation repetition, explicit model names and paths, bindable/hidden flags, child type and multiplicity metadata, and typed async update examples;
- performance materialization uses Angular Router `loadComponent` for lazy page detail, Material chips/lists for observable contract metadata, stable projection cache keys for immutable public API projections, and Angular CDK `ScrollingModule` / `cdk-virtual-scroll-viewport` for virtualized aggregations with public budget metadata;
- internationalization materialization emits message resource wiring, specific-to-default locale fallback, Angular locale formatting hooks, and active-locale text direction bindings;
- extension-model materialization emits typed extension artifacts, a compatible-only outlet, optional design-time overlay records, compatibility gates, renderer declarations, and drag-and-drop capability metadata without changing runtime component APIs;
- compliance-rules materialization validates catalog discovery, public component resolution, metadata completeness, synchronized documentation/example/projection evidence, and cross-cutting accessibility, theming, internationalization, security/privacy, performance, extension, and acceptance-test coverage before emitting a generated compliance page;
- UI concept materialization uses Material cards, chips, lists, and buttons to show controls vs. elements, named composition regions, actions, form/dialog composition, owned aggregations, and non-owning associations;
- generated pages use `MatCardModule` for page surfaces and `MatListModule` for requirement summaries;
- generated forms use reactive forms with `MatFormFieldModule`, `MatInputModule`, `MatSelectModule`, and Material buttons;
- generated navigation uses Material list or button navigation patterns; and
- generated feedback uses `MatSnackBarModule`.

Semantic HTML remains appropriate for document structure and accessibility landmarks, such as `main`, `section`, `form`, headings, and the native `table` element when it is enhanced with `mat-table`.

## Examples

The examples below start from the repository root and use only repository-local files. Replace `generated-openui-angular-app` with any workspace-local output directory when you want to keep multiple generated applications side by side.

### Example 1 — validate `openui.json` with the current CLI

Build the generator package first so the CLI exists at `dist/src/cli/main.js`, then validate the canonical specification:

```bash
cd generators/angular
npm ci
npm run build
node dist/src/cli/main.js validate --spec ../../openui.json --target angular
```

Expected result: validation exits with status code `0`. The command is intentionally quiet on success; it prints an error and returns a non-zero status when `openui.json` cannot be loaded, required sections are missing, or an unsupported `--target` is requested.

### Example 2 — generate an Angular Material application

After the generator has been built, generate an Angular Material app from the canonical specification:

```bash
node dist/src/cli/main.js generate --spec ../../openui.json --target angular --out generated-openui-angular-app
```

Expected result: the output directory contains a standalone Angular Material project. The first generated artifacts to inspect are:

- `generated-openui-angular-app/package.json` with Angular, Angular Material, and Angular CDK dependencies pinned to the repository-supported package set;
- `generated-openui-angular-app/angular.json` and `generated-openui-angular-app/tsconfig.json` for the generated Angular workspace configuration;
- `generated-openui-angular-app/src/main.ts` for `bootstrapApplication`, `provideRouter`, and locale provider wiring;
- `generated-openui-angular-app/src/app/app.component.ts` for the Material toolbar, sidenav shell, and routed content outlet;
- `generated-openui-angular-app/src/app/app.routes.ts` for routes derived from the specification sections; and
- `generated-openui-angular-app/src/styles.scss` plus generated page components under `generated-openui-angular-app/src/app/pages/`.

The generated `package.json` currently pins `@angular/material` and `@angular/cdk` to `22.0.2`, matching the generator's emitted Angular Material package expectations.

### Example 3 — verify the generated output

Use the generator's repository-supported build and CLI workflow, then verify the generated project artifacts:

```bash
npm run build
node dist/src/cli/main.js validate --spec ../../openui.json --target angular
node dist/src/cli/main.js generate --spec ../../openui.json --target angular --out generated-openui-angular-app
node -e "const fs = require('node:fs'); const path = require('node:path'); const out = 'generated-openui-angular-app'; const required = ['package.json', 'angular.json', 'tsconfig.json', 'src/main.ts', 'src/app/app.component.ts', 'src/app/app.routes.ts', 'src/styles.scss']; for (const file of required) { if (!fs.existsSync(path.join(out, file))) throw new Error('Missing generated artifact: ' + file); } const pkg = JSON.parse(fs.readFileSync(path.join(out, 'package.json'), 'utf8')); if (pkg.dependencies['@angular/material'] !== '22.0.2') throw new Error('Expected @angular/material 22.0.2'); if (pkg.dependencies['@angular/cdk'] !== '22.0.2') throw new Error('Expected @angular/cdk 22.0.2'); console.log('Generated Angular Material artifacts verified.');"
```

Expected result: the generator builds, validation stays quiet with status code `0`, generation creates the output directory, and the artifact check prints `Generated Angular Material artifacts verified.`.

To compile the generated app itself, install dependencies inside the generated project and run its Angular build:

```bash
cd generated-openui-angular-app
npm install
npm run build
```

Expected result: the generated application builds successfully with the emitted Angular Material dependencies.

## Install and build the generator

From the repository root:

```bash
cd generators/angular
npm ci
npm run build
```

## Validate a specification

After `npm run build` completes successfully and creates `dist/src/cli/main.js`, run `validate` to check that a specification can be loaded and satisfies the generator's required section structure:

```bash
node dist/src/cli/main.js validate --spec ../../openui.json
```

The command exits without output when validation succeeds. It prints an error and exits with a non-zero status when the specification cannot be loaded or does not meet the required structure.

## Generate an Angular Material app

Run `generate` with the input specification and an output directory:

```bash
node dist/src/cli/main.js generate \
  --spec ../../openui.json \
  --out /tmp/openui-angular-app
```

The output directory receives the generated Angular project files. After generation, install and run the generated app with the normal Angular workflow:

```bash
cd /tmp/openui-angular-app
npm install
npm run build
npm start
```

## Current scope

This generator is intentionally an initial implementation. It is useful for exercising the specification, reviewing the shape of Angular Material output, and validating that specification sections can be transformed into a runnable application skeleton. It is not yet a complete implementation of every OpenUI specification section.
