# Implementation plan

1. **Protect current workspace state**
   - Check `git status`.
   - Identify and preserve unrelated staged/uncommitted changes, especially current mkdocs.yml / requirements-test.txt changes if still present.
   - Do not modify generator files under `generators/angular/src/**`.

2. **Inventory the scope hierarchy**
   - Read all files under scopes.
   - Build the expected documentation hierarchy from the filesystem:
     - `scopes/scope.md`
     - `Application/scope.md`
     - `Application/*.scope.md`
     - `Controls/scope.md`
     - etc.
   - Define which files are “sensible” to document with examples.
   - For files where no concrete generated example exists, mark them for textual explanation instead of fake examples.

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

5. **Map scope files to documented examples**
   - For each scope file under scopes, decide one of:
     - has before/after generated example,
     - has generated TS/CSS but no HTML,
     - has no sensible generated example and should show textual explanation.
   - Avoid inventing generator behavior.
   - Use existing generated examples and current app preview code as source material.

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
   - Start with a representative top-level set:
     - `Application`
     - `Controls`
     - `Behaviors`
     - `Pages`
     - `Views`
     - `Containers`
     - `Widgets`
   - Then fill each leaf `*.scope.md`.
   - For each entry, add:
     - spec path,
     - summary,
     - before code,
     - after code,
     - preview mapping or explanation fallback.

10. **Update or add tests**

- Add tests for the documentation data model:
  - every expected scope file is represented or intentionally marked as not sensible/applicable,
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

> Use existing generated examples and document them per scope file when possible and sensible.

I would not interpret it as:

> Run or modify the Angular generator to produce the entire app.

So the implementation should stay inside the documentation app unless you explicitly approve otherwise.
