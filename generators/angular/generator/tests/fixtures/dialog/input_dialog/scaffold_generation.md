# Dialog input fixture — scaffold generation

This document records every stage used to scaffold the `input_dialog` Angular
Material workspace (Step 3 of
[`populating_test_use_cases.md`](../../populating_test_use_cases.md)). The
workspace is the **input** side of the `dialog` fixture pair: a hand-authored
Angular Material app that already contains the manifestation described by
[`dialog.example.json`](dialog.example.json).

## 1. Read the example and derive the use case

[`dialog.example.json`](dialog.example.json) is a `WidgetExample` titled
`"Dialog example"`. Its single child is a `Dialog` describing a **confirm
deletion** modal:

| Example node               | Attributes                                                                                                          | Derived Angular Material manifestation                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `Dialog` (`confirmDialog`) | `[modal]=true`, `[open]=isOpen`, `[ariaLabel]="Confirm deletion"`, `[restoreFocus]=true`, `(close)=onClose($event)` | `MatDialog.open(...)` with `ariaLabel` + `restoreFocus` config       |
| `DialogTitle`              | `text="Delete item?"`                                                                                               | `<h2 mat-dialog-title>`                                              |
| `DialogContent`            | `text="This action cannot be undone."`                                                                              | `<mat-dialog-content>`                                               |
| `DialogActions`            | —                                                                                                                   | `<mat-dialog-actions>`                                               |
| `button` (`cancelDialog`)  | `text="Cancel"`, `(click)=close('cancel')`                                                                          | `<button mat-button (click)="close('cancel')">`                      |
| `button` (`confirmDelete`) | `text="Delete"`, `(click)=close('confirm')`                                                                         | `<button mat-raised-button color="warn" (click)="close('confirm')">` |

Required scaffold files derived from the use case:

- A baseline standalone Angular Material workspace (matching the sibling
  `example_incremental/input_app-file-select` fixture conventions).
- An `app-confirm-dialog` component holding the dialog title, content, and
  actions.
- An `app-root` host that opens the dialog via `MatDialog`, passing the
  `ariaLabel` and `restoreFocus` options and subscribing to `afterClosed()`
  (the `(close)` / `onClose($event)` binding).

## 2. Generate the baseline workspace (npm)

The baseline is a standalone Angular Material workspace equivalent to:

```bash
npm create @angular@22 demo -- --standalone --style=scss --routing=false --skip-tests
cd demo
npm install
```

To keep the fixture aligned with the existing
`example_incremental/input_app-file-select` workspace, the generated baseline is
trimmed to the same StackBlitz-style layout: an inline `app-root` in
`src/main.ts`, a single `src/global_styles.css`, and an `angular.json` `demo`
project that builds `src/main.ts` against `tsconfig.app.json`.

Baseline files:

- `package.json`, `package-lock.json`
- `angular.json`
- `tsconfig.json`, `tsconfig.app.json`
- `.gitignore`, `netlify.toml`
- `src/index.html`, `src/global_styles.css`, `src/main.ts`

## 3. Add structure and content (ng)

Add Angular Material and the dialog component:

```bash
ng add @angular/material
ng generate component components/app-confirm-dialog --standalone --inline-style=false
```

Then populate the component and wiring to match the example JSON:

- `src/components/app-confirm-dialog/app-confirm-dialog.component.ts` — imports
  `MatDialogTitle`, `MatDialogContent`, `MatDialogActions`, and `MatButtonModule`;
  injects `MatDialogRef`; exposes `close('cancel' | 'confirm')` which closes the
  dialog with the chosen result.
- `src/components/app-confirm-dialog/app-confirm-dialog.component.html` —
  `<h2 mat-dialog-title>Delete item?</h2>`, `<mat-dialog-content>This action
cannot be undone.</mat-dialog-content>`, and the Cancel / Delete actions.
- `src/components/app-confirm-dialog/app-confirm-dialog.component.scss` — minimal
  layout styling for the content and actions.
- `src/main.ts` — `app-root` injects `MatDialog`, tracks an `isOpen` signal
  (mirroring `[open]=isOpen`), opens `AppConfirmDialogComponent` with
  `{ ariaLabel: 'Confirm deletion', restoreFocus: true, disableClose: false }`,
  and wires `afterClosed()` to `onClose()`.

## 4. Wire everything

`provideAnimations()` is supplied in `bootstrapApplication` so the dialog
overlay animates. The host button (`Delete item`) triggers `openDialog()`,
which opens the modal; the dialog's Cancel/Delete buttons call `close(...)`,
resolving `afterClosed()` back into `onClose()`.

## 5. Validate

`node_modules/` and `dist/` are git-ignored (see `.gitignore`); only source and
lockfiles are committed.

```bash
cd generators/angular/generator/tests/fixtures/dialog/input_dialog
npm install
npx ng build --configuration development
```

The development build is used for offline validation because the production
build inlines the Google Fonts stylesheet referenced in `src/index.html`, which
requires network access.
