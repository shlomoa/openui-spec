# Angular Material generator

This package contains the initial Angular Material generator. The roles of
`input.json`, `spec/openui.schema.json`, and root `openui.json` are defined in
[`spec/README.md` § Specification artifacts: grammar vs. catalog](../../../spec/README.md#specification-artifacts-grammar-vs-catalog).

```bash
npm install
npm run build
node dist/src/cli/main.js generate --spec ../../../openui.json --out /tmp/openui-angular-app
```

The generator follows the documented pipeline: load the specification, validate it,
build an implementation-independent UI model, map that model to Angular concepts,
and emit an Angular standalone application skeleton using Angular Material.

Generated applications are expected to use the latest Angular Material package set
supported by this repository. The current emitter pins Angular and Angular
Material packages to `22.0.2` and prefers Material primitives for shells, page
surfaces, requirement summaries, navigation, forms, and feedback.

## Incremental generation

The generator supports incremental operation as defined in
[spec/README.md § Incremental generation](../../../spec/README.md#incremental-generation).

### CLI usage for incremental generation

```bash
# Generate into an empty workspace (from scratch)
node dist/src/cli/main.js generate --spec input.json --out ./my-app

# Generate into an existing workspace (incremental)
node dist/src/cli/main.js generate --spec updated-input.json --out ./my-app
```

The `--out` directory may already contain a previously generated workspace. The
generator compares the specification tree against the existing workspace files
and applies only the necessary changes (add, modify, or delete).

### Test fixtures

Test fixtures demonstrating both modes are committed under `tests/fixtures/`:

- `example_from_scratch/` — input JSON generates a complete workspace from nothing.
- `example_incremental/` — input JSON adds `app-file-select` to a workspace
  that already contains `app-file-upload`.
- `example_backup/` — baseline workspace state before any generation.

## Dashboard reference implementation pattern

The Angular Material Dashboard schematic is a useful reference pattern for the
Angular generator target:

- Online
  [Dashboard Schematic](https://material.angular.dev/guide/schematics#dashboard-schematic)
  documentation.
- [GitHub Dashboard Schematic](https://github.com/angular/components/tree/main/src/material/schematics/ng-generate/dashboard)
  source.

The referenced schematic generates a component with a Material grid list, cards,
card titles, card content, card menu actions, and responsive card spans. The
Angular generator may use that pattern when translating the OpenUI Dashboard page
scope into Angular Material output, while the OpenUI specification remains
implementation-independent.

When the input specification includes `06-application-structure`, the generated
application also emits `src/app/application-structure.model.ts` and exposes the
resolved root component, explicit Angular dependencies, shell regions, routed
content outlet, page hierarchy, and navigation container in generated Angular
files.

When the input specification includes `07-layout-system`, the generated Layout
System page emits named and ordered aggregation-backed regions, breakpoint CSS,
density and spacing CSS custom properties, and Angular CDK drag/drop directives
only for metadata-declared drag-and-drop regions.

When the input specification includes `17-internationalization`, the generated
application emits `src/app/openui-i18n.service.ts` with message bundles,
specific-to-default locale fallback, message-key resolution, Angular `LOCALE_ID`
wiring, locale-aware number/currency/date formatting hooks, and active-locale
text-direction bindings.

When the input specification includes `20-extension-model`, the generated
application emits `src/app/openui-extension.model.ts`,
`src/app/openui-extension-samples.ts`, and
`src/app/openui-workspace-outlet.component.ts`. These artifacts provide a typed
extension outlet, compatibility gate filtering, optional design-time overlay
metadata, and declarative renderer plus drag-and-drop capability records without
turning authoring metadata into runtime component inputs.
