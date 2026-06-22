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
- global theme styles; and
- generated page components for specification sections, including section-specific application-structure, layout-system, form, navigation, feedback, accessibility, theming, and UI concept details where mappings exist.

When `spec/05-ui-concept-model.md` is present, the generated UI Concept Model page emits Angular Material content that distinguishes controls from elements, shows named regions such as header/content/footer/actions, renders action controls, and documents forms, dialogs, owned aggregation relationships, and non-owning associations as visible generated output.

When `spec/07-layout-system.md` is present, the generated Layout System page emits aggregation-backed named regions, an ordered content region whose document order is preserved with Angular control flow, breakpoint-driven CSS reflow, density and spacing custom properties, and Angular CDK drag/drop directives only for the region whose metadata declares drag-and-drop.

When `spec/09-interaction-model.md` is present, the generated Interaction Model page emits a semantic activation contract for `press`, preserves the owning component and stable handler path in generated metadata, maps the activation to a Material button `(click)` binding, binds `[disabled]` to the enabled gate, and guards the generated handler so disabled controls cannot invoke application behavior through alternate activation paths. The generated page documents that Angular Material and the native button element normalize pointer, touch, keyboard, and assistive-technology activation for the enabled control without depending on private DOM events, renderer internals, or browser-specific event ordering.

## Expected Angular Material output

Generated Angular applications must target the latest Angular Material package set supported by this repository. The current generator emits Angular and Angular Material `22.0.2` dependencies and should keep those pins current when the repository upgrades its Angular toolchain.

The generated UI should prefer Angular Material components and directives wherever Angular Material provides an equivalent:

- application shells use `MatToolbarModule`, `MatSidenavModule`, and `MatListModule`;
- application-structure materialization emits a typed model for the root component, explicit dependencies, shell regions, navigation container, routed content outlet, and page hierarchy;
- layout-system materialization uses Material toolbar/card/list/chip primitives, CSS grid breakpoints, theme spacing tokens, density-scoped CSS variables, and CDK drag/drop only for declared drag-and-drop aggregations;
- interaction-model materialization uses a semantic `press` activation contract, Material button binding, generated enabled-state gating, and no private pointer, touch, or keyboard listener assumptions;
- UI concept materialization uses Material cards, chips, lists, and buttons to show controls vs. elements, named composition regions, actions, form/dialog composition, owned aggregations, and non-owning associations;
- generated pages use `MatCardModule` for page surfaces and `MatListModule` for requirement summaries;
- generated forms use reactive forms with `MatFormFieldModule`, `MatInputModule`, `MatSelectModule`, and Material buttons;
- generated navigation uses Material list or button navigation patterns; and
- generated feedback uses `MatSnackBarModule`.

Semantic HTML remains appropriate for document structure and accessibility landmarks, such as `main`, `section`, `form`, headings, and the native `table` element when it is enhanced with `mat-table`.

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
