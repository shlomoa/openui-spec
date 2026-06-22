# Angular Material generator

This package contains the initial Angular Material generator for `openui.json`.

```bash
npm install
npm run build
node dist/src/cli/main.js generate --spec ../../openui.json --out /tmp/openui-angular-app
```

The generator follows the documented pipeline: load the specification, validate it,
build an implementation-independent UI model, map that model to Angular concepts,
and emit an Angular standalone application skeleton using Angular Material.

Generated applications are expected to use the latest Angular Material package set
supported by this repository. The current emitter pins Angular and Angular
Material packages to `22.0.2` and prefers Material primitives for shells, page
surfaces, requirement summaries, navigation, forms, and feedback.

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
