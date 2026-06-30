# Dialog output fixture — generation and validation

This document records Step 5 of
[`populating_test_use_cases.md`](../../populating_test_use_cases.md): populating
the **output** side of the `dialog` fixture pair. The output workspace is the
_expected_ Angular Material workspace after running the generator on
[`dialog.example.json`](dialog.example.json).

## 5.1 Create output fixture placeholders

The output workspace is seeded by copying every committed file from the sibling
`input_dialog` workspace:

```bash
cp generators/angular/generator/tests/fixtures/dialog/input_dialog/* \
   generators/angular/generator/tests/fixtures/dialog/output_dialog/
```

For the `dialog` example this copy is the expected generated result: the input
workspace was hand-authored in Step 3 to already manifest the confirm-deletion
dialog described by `dialog.example.json`, so an idempotent generation run
leaves the workspace unchanged (the **Match** scenario in
[spec/README.md § Incremental generation](../../../../../../../spec/README.md#incremental-generation)).

## 5.2 Add app validation tests

App-level validation tests assert that the generated workspace reflects the
example JSON. They are wired with the same Angular unit-test setup used by the
[`generated-examples`](../../../../generated-examples/) app:

- `package.json` — adds the `test` script (`ng test --watch=false`) and the
  `vitest` + `jsdom` dev dependencies.
- `angular.json` — adds the `test` architect target
  (`@angular/build:unit-test`).
- `tsconfig.spec.json` — compiles `src/**/*.spec.ts` with `vitest/globals`.
- `src/components/app-confirm-dialog/app-confirm-dialog.component.spec.ts` —
  validates the generated `app-confirm-dialog` component against
  `dialog.example.json`:

  | Example node    | Validated expectation                                    |
  | --------------- | -------------------------------------------------------- |
  | `DialogTitle`   | Renders the title text `Delete item?`                    |
  | `DialogContent` | Renders the content text `This action cannot be undone.` |
  | `DialogActions` | Renders `Cancel` and `Delete` action buttons             |
  | `button` Cancel | Clicking it closes the dialog with `'cancel'`            |
  | `button` Delete | Clicking it closes the dialog with `'confirm'`           |

## 5.3 Run the generator

Run the generator against the example JSON, writing into this output workspace:

```bash
cd generators/angular/generator
npm run build
node dist/src/cli/main.js generate \
  --input tests/fixtures/dialog/output_dialog/dialog.example.json \
  --out tests/fixtures/dialog/output_dialog
```

**Result (reported, not fixed):** the run currently fails with

```text
root.children: Expected at least one scoped OpenUI node with attrs.scopeDocument.
```

`dialog.example.json` is authored in the `WidgetExample` / `Dialog` grammar
(`Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`, `button`), whereas
the generator's emission pipeline (`buildUiModel` → `mapToAngular` → emit) only
consumes the canonical scope-tree grammar (nodes carrying
`attrs.scopeDocument`). The widget grammar is therefore not yet implemented in
the generator, so the output workspace remains the Step 5.1 copy of the input
workspace (the expected Match result). Per the Step 5 validation note, this
gap is reported and left unfixed.

## 5.4 Run the generator validation

Install the workspace and run the validation tests:

```bash
cd generators/angular/generator/tests/fixtures/dialog/output_dialog
npm install
npm test
```

`node_modules/` and `dist/` are git-ignored (see `.gitignore`); only source,
configuration, and the lockfile are committed.
