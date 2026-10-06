# Dialog output fixture

`output_dialog/` is the expected workspace after running the generator on
[`input_dialog/dialog.example.json`](input_dialog/dialog.example.json). It is generated, never
written by hand ([`CONTRIBUTING.md` § Examples and fixtures](../../../../../../CONTRIBUTING.md#examples-and-fixtures)):

```bash
cd generators/angular/generator
npm run regenerate-fixtures -- dialog
```

`tests/fixture-output.test.ts` runs the generator on the input into a temporary folder and fails
when `output_dialog/` differs, so an output change shows up in the diff of the pull request that
causes it.

The `Dialog` element `confirmDialog` is emitted by the `Dialog` renderer as the standalone component
`src/components/app-confirm-dialog/`: a `mat-dialog-title`, `mat-dialog-content` and
`mat-dialog-actions` template, and a `close(result)` method typed with the results of its action
buttons (`'cancel' | 'confirm'`). The other dialogs of the example (`unsavedChangesDialog`, which is
a lowercase `dialog`, and `progressDialog`, which has no title, content or actions) have no
renderer output yet, so the generator logs a warning for each and emits only the placeholder page.

## Building the generated app

Requires the Node.js version the generated Angular workspace needs
([`CONTRIBUTING.md` § Local setup](../../../../../../CONTRIBUTING.md#local-setup)). Run it in a copy so
`node_modules` and `package-lock.json` do not enter the fixture:

```bash
cp -r output_dialog "$(mktemp -d)/dialog" && cd "$_" && npm install && npx ng build
```

The earlier hand-authored output (an Angular CLI scaffold with a hand-written component spec) was
replaced by generated output; the component files `app-confirm-dialog.component.{ts,html,scss}` are
byte-identical.
