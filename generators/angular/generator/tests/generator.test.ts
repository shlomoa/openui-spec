import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

import { buildUiModel } from "../src/ir/build-ir";
import type { UiPage } from "../src/ir/ui-model";
import { run } from "../src/cli/main";
import { createCatalogIndex } from "../src/spec/catalog-index";
import type { OpenUiElement } from "../src/spec/openui-spec.types";
import { SpecValidationError } from "../src/validation/diagnostics";
import { validateOpenUiCatalog, validateOpenUiSpec } from "../src/validation/validate-spec";
import { cleanupTestOutput } from "./test-output";

const ANGULAR_GENERATOR_ROOT =
  path.basename(path.dirname(__dirname)) === "dist"
    ? path.resolve(__dirname, "..", "..")
    : path.resolve(__dirname, "..");
const REPOSITORY_ROOT = path.resolve(ANGULAR_GENERATOR_ROOT, "..", "..", "..");
const CATALOG_FIXTURE = path.join(REPOSITORY_ROOT, "openui.json");
const FIXTURE = path.join(ANGULAR_GENERATOR_ROOT, "tests", "fixtures", "minimal-openui.json");
const DIALOG_FIXTURE = path.join(
  ANGULAR_GENERATOR_ROOT,
  "tests",
  "fixtures",
  "dialog",
  "input_dialog",
  "dialog.example.json",
);
const TEST_OUTPUT_ROOT = path.join(REPOSITORY_ROOT, "tmp");
const TEST_OUTPUT_PREFIX = path.join(TEST_OUTPUT_ROOT, "openui-angular-generator-");

async function createTestOutputDirectory(): Promise<string> {
  await mkdir(TEST_OUTPUT_ROOT, { recursive: true });
  return mkdtemp(TEST_OUTPUT_PREFIX);
}

function pageById(pages: UiPage[], id: string): UiPage {
  const page = pages.find((candidate) => candidate.id === id);
  if (!page) {
    throw new assert.AssertionError({ message: `Expected page '${id}' to exist.` });
  }
  return page;
}

function firstChild(node: OpenUiElement, message: string): OpenUiElement {
  const child = node.children?.[0];
  if (!child) {
    throw new assert.AssertionError({ message });
  }
  return child;
}

function assertNoScopeDocumentAttrs(node: OpenUiElement, nodePath = "root"): void {
  assert.equal(
    node.attrs?.scopeDocument,
    undefined,
    `${nodePath} must not carry attrs.scopeDocument in concrete input fixtures.`,
  );

  (node.children ?? []).forEach((child, index) => assertNoScopeDocumentAttrs(child, `${nodePath}.children[${index}]`));
}

function specValidationMessage(error: unknown): string {
  assert.ok(error instanceof SpecValidationError);
  return error.message;
}

test("treats the dialog fixture as concrete input without catalog traceability attrs", async () => {
  const fixture = JSON.parse(await readFile(DIALOG_FIXTURE, "utf8"));

  // Artifact roles are defined by spec/README.md, section
  // "Specification artifacts: grammar vs. catalog": concrete input nodes do not
  // carry generated catalog traceability such as attrs.scopeDocument.
  assert.equal(fixture.type, "WidgetExample");
  assertNoScopeDocumentAttrs(fixture);
});

test("validates the dialog fixture as concrete input against the OpenUI catalog", async () => {
  const fixture = JSON.parse(await readFile(DIALOG_FIXTURE, "utf8"));
  const catalog = createCatalogIndex(JSON.parse(await readFile(CATALOG_FIXTURE, "utf8")));

  assert.doesNotThrow(() => validateOpenUiSpec(fixture, { catalog }));
  await assert.doesNotReject(() => run(["validate", "--input", DIALOG_FIXTURE]));
});

test("rejects unknown non-native concrete input types during catalog validation", async () => {
  const fixture = JSON.parse(await readFile(DIALOG_FIXTURE, "utf8"));
  const catalog = createCatalogIndex(JSON.parse(await readFile(CATALOG_FIXTURE, "utf8")));
  fixture.children[0].type = "MissingWidget";

  assert.throws(
    () => validateOpenUiSpec(fixture, { catalog }),
    (error: unknown) => {
      assert.match(specValidationMessage(error), /root\.children\[0\]\.type: Unknown OpenUI type 'MissingWidget'\./);
      return true;
    },
  );
});

test(
  "generates Angular Material dialog output from the concrete dialog fixture",
  { todo: "Requires concrete-input IR and Angular dialog emission from Steps 5 and 6." },
  async () => {
    const outDir = await createTestOutputDirectory();
    try {
      await run(["generate", "--input", DIALOG_FIXTURE, "--out", outDir]);

      const component = await readFile(
        path.join(outDir, "src/components/app-confirm-dialog/app-confirm-dialog.component.ts"),
        "utf8",
      );
      assert.match(component, /MatDialogTitle/);
      assert.match(component, /MatDialogContent/);
      assert.match(component, /MatDialogActions/);
      assert.match(component, /MatButtonModule/);

      const template = await readFile(
        path.join(outDir, "src/components/app-confirm-dialog/app-confirm-dialog.component.html"),
        "utf8",
      );
      assert.match(template, /Delete item\?/);
      assert.match(template, /This action cannot be undone\./);
      assert.match(template, /close\('cancel'\)/);
      assert.match(template, /close\('confirm'\)/);
    } finally {
      await cleanupTestOutput(outDir);
    }
  },
);

test("builds the UI model from canonical scope-tree OpenUI nodes", async () => {
  const fixture = JSON.parse(await readFile(FIXTURE, "utf8"));

  const uiModel = buildUiModel(fixture);

  assert.equal(uiModel.name, "OpenUI");
  assert.equal(uiModel.version, "0.0.1");
  assert.deepEqual(
    uiModel.pages.map((page) => page.id),
    [
      "application",
      "routing",
      "navigation",
      "toolBars",
      "controls",
      "native",
      "behaviors",
      "dragAndDrop",
      "resizable",
      "collapsible",
      "pages",
      "dashboard",
      "shellPage",
      "emptyPage",
      "views",
      "reports",
      "forms",
      "containers",
      "grid",
      "expandablePanels",
      "tabs",
      "widgets",
      "charts",
      "tables",
      "lists",
      "dateTimePickers",
      "stepper",
      "dialog",
    ],
  );

  const application = pageById(uiModel.pages, "application");
  assert.equal(application.route, "application");
  assert.equal(application.title, "Application");
  assert.equal(application.sourceDocument, "scopes/Application/scope.md");
  assert.deepEqual(application.features, ["application-structure"]);
  assert.match(application.requirements[0], /Routing: Application-level route definitions/);

  const dragAndDrop = pageById(uiModel.pages, "dragAndDrop");
  assert.equal(dragAndDrop.route, "drag-and-drop");
  assert.deepEqual(dragAndDrop.features, ["interaction", "layout"]);

  const pages = pageById(uiModel.pages, "pages");
  assert.deepEqual(pages.features, ["navigation"]);

  const forms = pageById(uiModel.pages, "forms");
  assert.deepEqual(forms.features, ["form", "data-binding"]);

  const dialog = pageById(uiModel.pages, "dialog");
  assert.equal(dialog.sourceDocument, "scopes/Widgets/dialog.scope.md");
});

test("generates an Angular Material standalone app from canonical scope-tree OpenUI", async () => {
  const outDir = await createTestOutputDirectory();
  try {
    await run(["generate", "--input", FIXTURE, "--out", outDir]);

    const packageJson = JSON.parse(await readFile(path.join(outDir, "package.json"), "utf8")) as {
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
      overrides: Record<string, string>;
    };
    assert.equal(packageJson.dependencies["@angular/material"], "22.0.2");
    assert.equal(packageJson.dependencies["@angular/core"], "22.0.2");
    assert.equal(packageJson.devDependencies["@angular/build"], "22.0.2");
    assert.equal(packageJson.overrides.esbuild, "0.28.1");
    assert.equal(packageJson.overrides.vite, "7.3.5");

    const indexHtml = await readFile(path.join(outDir, "src/index.html"), "utf8");
    assert.match(indexHtml, /<openui-root><\/openui-root>/);

    const routes = await readFile(path.join(outDir, "src/app/app.routes.ts"), "utf8");
    assert.match(routes, /path: 'application'/);
    assert.match(routes, /path: 'routing'/);
    assert.match(routes, /path: 'navigation'/);
    assert.match(routes, /path: 'tool-bars'/);
    assert.match(routes, /path: 'drag-and-drop'/);
    assert.match(routes, /path: 'shell-page'/);
    assert.match(routes, /path: 'date-time-pickers'/);
    assert.match(routes, /path: '', pathMatch: 'full', redirectTo: 'application'/);

    const appComponent = await readFile(path.join(outDir, "src/app/app.component.ts"), "utf8");
    assert.match(appComponent, /APPLICATION_STRUCTURE/);
    assert.match(appComponent, /MatSidenavModule/);
    assert.match(appComponent, /Root component: {{ applicationStructure\.rootComponent }}/);
    assert.match(appComponent, /routerLink="\/forms"/);

    const applicationStructureModel = await readFile(
      path.join(outDir, "src/app/application-structure.model.ts"),
      "utf8",
    );
    assert.match(applicationStructureModel, /rootComponent/);
    assert.match(applicationStructureModel, /openui-root/);
    assert.match(applicationStructureModel, /@angular\/material\/toolbar/);
    assert.match(applicationStructureModel, /MatSidenavContainer/);
    assert.match(applicationStructureModel, /ApplicationPage/);
    assert.match(applicationStructureModel, /ShellPagePage/);

    const i18nService = await readFile(path.join(outDir, "src/app/openui-i18n.service.ts"), "utf8");
    assert.match(i18nService, /activeLocale: 'en'/);
    assert.match(i18nService, /messageBundles: \{ en: \{\} \}/);
  } finally {
    await cleanupTestOutput(outDir);
  }
});

test("generates scope-specific Angular Material details from the canonical tree", async () => {
  const outDir = await createTestOutputDirectory();
  try {
    await run(["generate", "--input", FIXTURE, "--out", outDir]);

    const applicationTemplate = await readFile(
      path.join(outDir, "src/app/pages/application/application.page.html"),
      "utf8",
    );
    assert.match(applicationTemplate, /aria-label="Application structure materialization"/);
    assert.match(applicationTemplate, /Routing: Application-level route definitions and route resolution behavior\./);
    assert.match(applicationTemplate, /mat-sidenav-container owns mat-sidenav navigation/);

    const dragAndDropPage = await readFile(
      path.join(outDir, "src/app/pages/drag-and-drop/drag-and-drop.page.ts"),
      "utf8",
    );
    assert.match(dragAndDropPage, /CdkDrag/);
    assert.match(dragAndDropPage, /CdkDropList/);
    assert.match(dragAndDropPage, /eventName: "press"/);
    assert.match(dragAndDropPage, /handlePressActivation/);

    const dragAndDropTemplate = await readFile(
      path.join(outDir, "src/app/pages/drag-and-drop/drag-and-drop.page.html"),
      "utf8",
    );
    assert.match(dragAndDropTemplate, /aria-label="Interaction model materialization"/);
    assert.match(dragAndDropTemplate, /aria-label="Layout system materialization"/);
    assert.match(dragAndDropTemplate, /data-openui-event="press"/);
    assert.match(dragAndDropTemplate, /data-openui-region="columns" data-openui-aggregation="columns" cdkDropList/);

    const formsPage = await readFile(path.join(outDir, "src/app/pages/forms/forms.page.ts"), "utf8");
    assert.match(formsPage, /ReactiveFormsModule/);
    assert.match(formsPage, /MatFormFieldModule/);
    assert.match(formsPage, /dataBindingContracts/);

    const formsTemplate = await readFile(path.join(outDir, "src/app/pages/forms/forms.page.html"), "utf8");
    assert.match(formsTemplate, /<mat-form-field appearance="outline">/);
    assert.match(formsTemplate, /aria-label="Data binding model materialization"/);
    assert.match(formsTemplate, /Read-write data including validation, submission, and dirty state\./);

    const dialogPage = await readFile(path.join(outDir, "src/app/pages/dialog/dialog.page.ts"), "utf8");
    assert.match(dialogPage, /MatChipsModule/);
    assert.match(dialogPage, /MatSnackBarModule/);
    assert.match(dialogPage, /showFeedback\(\)/);

    const controlsTemplate = await readFile(path.join(outDir, "src/app/pages/controls/controls.page.html"), "utf8");
    assert.match(controlsTemplate, /aria-label="Component metadata contract"/);
    assert.match(controlsTemplate, /Native: Browser and framework-provided native controls/);
  } finally {
    await cleanupTestOutput(outDir);
  }
});

test("validates canonical root values, attrs, and scoped document uniqueness", async () => {
  const fixture = JSON.parse(await readFile(FIXTURE, "utf8"));
  const scopes = (fixture.children as OpenUiElement[])[0];
  const firstScope = firstChild(scopes, "Expected at least one scoped child.");

  firstScope.attrs = {
    ...firstScope.attrs,
    scopeDocument: "scopes/Controls/scope.md",
    invalidAttr: 42 as never,
  };

  assert.throws(
    () => validateOpenUiCatalog(fixture),
    (error: unknown) => {
      assert.match(specValidationMessage(error), /Attribute values must be strings or null/);
      return true;
    },
  );

  const duplicateFixture = JSON.parse(await readFile(FIXTURE, "utf8"));
  const duplicateScopes = (duplicateFixture.children as OpenUiElement[])[0];
  const duplicateFirstScope = firstChild(duplicateScopes, "Expected at least one scoped child.");

  duplicateFirstScope.attrs = {
    ...duplicateFirstScope.attrs,
    scopeDocument: "scopes/Controls/scope.md",
  };

  assert.throws(
    () => validateOpenUiCatalog(duplicateFixture),
    (error: unknown) => {
      assert.match(specValidationMessage(error), /Duplicate scope document 'scopes\/Controls\/scope\.md'/);
      return true;
    },
  );
});

test("allows any valid OpenUI type at the document root", async () => {
  const fixture = JSON.parse(await readFile(FIXTURE, "utf8"));
  fixture.type = "ApplicationRoot";

  assert.doesNotThrow(() => validateOpenUiSpec(fixture));
});

test("allows a valid empty root document for incremental deletion", () => {
  assert.doesNotThrow(() =>
    validateOpenUiSpec({
      id: "root",
      version: "0.0.1",
      type: "html",
      children: [],
    }),
  );
});
