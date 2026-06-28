# Implementation plan

This plan restructures the generated-examples documentation app so it manifests
the **same** example set that now lives under
[`spec/examples/`](../../../spec/examples/README.md): one app entry per worked
OpenUI document, mirroring the `spec/examples/**` hierarchy one-to-one. The
example JSON documents are the source of truth — the app documents them, it does
not regenerate them or invent generator behavior.

1. **Protect current workspace state**
   - Check `git status`.
   - Identify and preserve unrelated staged/uncommitted changes, especially current mkdocs.yml / requirements-test.txt changes if still present.
   - Do not modify generator files under `generators/angular/src/**`.

2. **Inventory the scope and example hierarchy**
   - Read all files under `spec/scopes/**` and `spec/examples/**`.
   - Build the expected documentation hierarchy from the filesystem, which the
     two trees share one-to-one:
     - `scopes/scope.md` ↔ `examples/scope.example.json`
     - `Application/scope.md` ↔ `Application/scope.example.json`
     - `Application/*.scope.md` ↔ `Application/*.example.json`
     - `Controls/scope.md` ↔ `Controls/scope.example.json`
     - etc.
   - Every scope now has a concrete worked example under `spec/examples/**`
     (see the [examples index](../../../spec/examples/README.md)), so fake or
     invented examples are unnecessary.
   - Reserve the textual-explanation fallback for the rare entry whose example
     document has no meaningful rendered form.

3. **Inventory the existing generated-examples app**
   - Review current app structure under app.
   - Identify existing reusable parts:
     - route structure,
     - side navigation/list,
     - component viewer,
     - examples tab,
     - styling/API tabs,
     - current documentation-items.ts data model,
     - current preview rendering components.
   - Determine the smallest app-level changes needed to support scope hierarchy and before/after example panels.

4. **Define the updated documentation data model**
   - Extend or replace the current component-oriented model so it can represent scope hierarchy.
   - Proposed model shape:
     - category/scope node:
       - `id`
       - `title`
       - `specPath`
       - `children`
       - `examples`
     - example:
       - `id`
       - `title`
       - `description`
       - `before`
       - `after`
       - `explanationOnly`
     - code bundle:
       - `html`
       - `css` or `scss`
       - `ts`
       - preview/render key if available
   - Keep each example traceable to its source scope file.

5. **Map example documents to documented app entries**
   - For each `*.example.json` under `spec/examples/**`, create exactly one app
     entry, traceable back to both its example document and its scope file.
   - The `spec/examples/**` document supplies the framework-independent **before**
     content; the Angular Material rendering is the **after**. Each entry decides
     one of:
     - has a before/after example (neutral document + Angular Material rendering),
     - has generated TS/SCSS but no HTML preview,
     - has textual explanation only (rare — when the example has no meaningful
       rendered form).
   - Avoid inventing generator behavior.
   - Use the `spec/examples/**` documents and current app preview code as source
     material — the app must manifest the same set, in the same order.

6. **Update navigation to preserve scopes hierarchy**
   - Change the generated-examples app navigation from flat component categories to a nested scope tree.
   - Preserve folder order matching the spec hierarchy:
     - Scopes
       - Application
       - Controls
       - Behaviors
       - Pages
       - Views
       - Containers
       - Widgets
   - Ensure routes are stable and readable, for example:
     - `/scopes/application/routing`
     - `/scopes/widgets/tables`

7. **Implement before/after example display**
   - Update the examples UI to show two side-by-side panels:
     - left: Before
     - right: After
   - Inside each panel, show:
     - rendered/compiled preview,
     - source tabs for HTML, CSS/SCSS, TS.
   - Reuse existing preview rendering components where possible.
   - Add clear labels so users understand whether they are seeing source or rendered output.

8. **Implement no-HTML fallback**
   - If an example has no generated HTML:
     - do not show empty visual panels,
     - show textual explanation instead,
     - still show TS/CSS if useful and available.
   - Keep this behavior data-driven so each example declares whether it has HTML output.

9. **Populate examples incrementally**
   - Start with the composite parents (`scope.example.json` per folder):
     - `Application`
     - `Controls`
     - `Behaviors`
     - `Pages`
     - `Views`
     - `Containers`
     - `Widgets`
   - Then fill each leaf `*.example.json` (Routing, Navigation, Tool bars,
     favicon.ico, index.html, Native, Drag and drop, Resizable, Collapsible,
     Dashboard, Shell page, Empty page, Reports, Forms, Grid, Expandable panels,
     Tabs, Charts, Tables, Lists, Date/Time pickers, Stepper, Dialog), matching
     the [examples index](../../../spec/examples/README.md).
   - For each entry, add:
     - scope path and example path,
     - summary,
     - before code (the `spec/examples/**` document),
     - after code (the Angular Material rendering),
     - preview mapping or explanation fallback.

10. **Update or add tests**

- Add tests for the documentation data model:
  - every `spec/examples/**` document is represented one-to-one (or intentionally
    marked as not sensible/applicable),
  - every example has either before/after code or explanation-only content,
  - examples with HTML include preview/code data for both before and after,
  - examples without HTML include textual explanation.
- Add component tests where practical for:
  - nested navigation rendering,
  - before/after panel rendering,
  - no-HTML fallback rendering.

11. **Validate generated-examples only**

- From generated-examples, run:
  - `npm run format:check`
  - `npm run lint`
  - `npm test`
  - `npm run build`
- If formatting fails, run the app’s formatter and rerun checks.
- Do not run or change the Angular generator unless explicitly requested.

12. **Validate repository docs/tests only if affected**

- If no root docs/spec files are changed, avoid unrelated repo-wide edits.
- If shared repo validation is needed, run it using the local .venv.
- Do not accept incidental hook changes unless they are directly necessary or explicitly approved.

13. **Final review**

- Confirm changed files are limited to `generators/angular/generated-examples/**`, unless tests/config in that app require otherwise.
- Summarize:
  - scope hierarchy support,
  - example coverage,
  - before/after panel behavior,
  - no-HTML fallback behavior,
  - validations run.

## One remaining implementation note

The phrase **“for each scope file generate an example”** is clear enough with your clarification as:

> Use the worked documents under `spec/examples/**` and document them per scope
> file, manifesting the same set one-to-one when possible and sensible.

I would not interpret it as:

> Run or modify the Angular generator to produce the entire app.

So the implementation should stay inside the documentation app unless you explicitly approve otherwise.
