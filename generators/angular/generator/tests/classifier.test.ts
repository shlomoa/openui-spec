import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

import { buildSpecManifestationIndex, classifyWorkspacePath } from "../src/generation/classifier";
import { normalizeRoute } from "../src/data-model/normalize-spec";
import { extractOpenUiScopeNodes } from "../src/spec/openui-sections";
import type { OpenUiDocument } from "../src/spec/openui-spec.types";
import { emitAngularFilesFromInput } from "./emit-angular-files";

const ANGULAR_GENERATOR_ROOT =
  path.basename(path.dirname(__dirname)) === "dist"
    ? path.resolve(__dirname, "..", "..")
    : path.resolve(__dirname, "..");
const INCREMENTAL_FIXTURE = path.join(
  ANGULAR_GENERATOR_ROOT,
  "tests",
  "fixtures",
  "example_incremental",
  "output_app-file-select",
);
const SPEC_FILE = path.join(INCREMENTAL_FIXTURE, "app-file-select.example.json");
const FULL_GENERATOR_FIXTURE = path.join(ANGULAR_GENERATOR_ROOT, "tests", "fixtures", "minimal-openui.json");
const DIALOG_FIXTURE = path.join(
  ANGULAR_GENERATOR_ROOT,
  "tests",
  "fixtures",
  "dialog",
  "input_dialog",
  "dialog.example.json",
);

async function loadIndex(): Promise<ReturnType<typeof buildSpecManifestationIndex>> {
  const document = JSON.parse(await readFile(SPEC_FILE, "utf8")) as OpenUiDocument;
  return buildSpecManifestationIndex(document);
}

test("indexes component-template manifestations from the input spec", async () => {
  const index = await loadIndex();
  assert.deepEqual(index.directories.sort(), ["src/components/app-file-select", "src/components/app-file-upload"]);
});

test("classifies a component folder back to its spec node", async () => {
  const index = await loadIndex();
  const classification = classifyWorkspacePath("src/components/app-file-select", index);

  assert.equal(classification.kind, "component");
  assert.equal(classification.nodeId, "appFileSelectTemplate");
  assert.equal(classification.nodeType, "ComponentTemplate");
  assert.equal(classification.selector, "app-file-select");
  assert.equal(classification.sourceFile, "src/components/app-file-select/app-file-select.component.html");
});

test("classifies component files inside the canonical folder", async () => {
  const index = await loadIndex();
  for (const extension of ["ts", "html", "scss"]) {
    const classification = classifyWorkspacePath(
      `src/components/app-file-upload/app-file-upload.component.${extension}`,
      index,
    );
    assert.equal(classification.kind, "component");
    assert.equal(classification.nodeId, "appFileUploadTemplate");
    assert.equal(classification.selector, "app-file-upload");
  }
});

test("classifies a component file by selector outside the canonical folder", async () => {
  const index = await loadIndex();
  const classification = classifyWorkspacePath("src/somewhere-else/app-file-upload.component.ts", index);
  assert.equal(classification.kind, "component");
  assert.equal(classification.nodeId, "appFileUploadTemplate");
  assert.equal(classification.selector, "app-file-upload");
});

test("classifies the workspace src root as application scope", async () => {
  const index = await loadIndex();
  assert.equal(classifyWorkspacePath("src", index).kind, "application");
});

test("classifies a page folder and page file back to its scope node", () => {
  const document: OpenUiDocument = {
    id: "root",
    type: "html",
    version: "0.0.1",
    children: [{ id: "dashboardPage", type: "PageScope", attrs: { route: "dashboard" } }],
  };
  const index = buildSpecManifestationIndex(document);

  const folder = classifyWorkspacePath("src/app/pages/dashboard", index);
  assert.equal(folder.kind, "page");
  assert.equal(folder.nodeId, "dashboardPage");
  assert.equal(folder.route, "dashboard");

  const file = classifyWorkspacePath("src/app/pages/dashboard/dashboard.page.ts", index);
  assert.equal(file.kind, "page");
  assert.equal(file.nodeId, "dashboardPage");
});

test("reports unknown for unmatched workspace artifacts", async () => {
  const index = await loadIndex();
  assert.equal(classifyWorkspacePath("src/components/file-upload", index).kind, "unknown");
});

test("classifies every generated component folder and file in the fixture workspace", async () => {
  const index = await loadIndex();
  const componentsDir = path.join(INCREMENTAL_FIXTURE, "src", "components");
  const entries = await readdir(componentsDir, { withFileTypes: true });
  const componentFolders = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);

  for (const folder of componentFolders) {
    const classification = classifyWorkspacePath(`src/components/${folder}`, index);
    assert.equal(classification.kind, "component", `Expected ${folder} to classify as a component.`);
    assert.equal(classification.selector, folder);

    for (const extension of ["ts", "html", "scss"] as const) {
      const fileClassification = classifyWorkspacePath(`src/components/${folder}/${folder}.component.${extension}`, index);
      assert.equal(fileClassification.kind, "component", `Expected ${folder}.${extension} to classify as a component.`);
      assert.equal(fileClassification.selector, folder);
    }
  }
});

test("normalizes Windows-style workspace separators", async () => {
  const index = await loadIndex();
  const windowsStyle = classifyWorkspacePath("src\\components\\app-file-select", index);
  assert.equal(windowsStyle.nodeId, "appFileSelectTemplate");
});

test("classifies every generated full-output page and application file", async () => {
  const document = JSON.parse(await readFile(FULL_GENERATOR_FIXTURE, "utf8")) as OpenUiDocument;
  const index = buildSpecManifestationIndex(document);
  const emittedFiles = await emitAngularFilesFromInput(FULL_GENERATOR_FIXTURE);
  const scopesByRoute = new Map(extractOpenUiScopeNodes(document).map((scope) => [normalizeRoute(scope.id), scope]));
  const classifiedPageFiles = new Set<string>();
  const applicationFiles: string[] = [];

  for (const file of emittedFiles) {
    const pageMatch = /^src\/app\/pages\/([^/]+)\/\1\.page\.(ts|html|scss)$/.exec(file.path);
    const classification = classifyWorkspacePath(file.path, index);

    if (pageMatch) {
      const route = pageMatch[1];
      const scope = scopesByRoute.get(route);
      assert.ok(scope, `Expected ${file.path} to correspond to a scoped OpenUI node.`);
      assert.equal(classification.kind, "page", `Expected ${file.path} to classify as a page.`);
      assert.equal(classification.nodeId, scope.id);
      assert.equal(classification.nodeType, scope.type);
      assert.equal(classification.route, route);
      assert.equal(classification.selector, `openui-${route}`);
      assert.equal(classification.sourceFile, scope.document);
      classifiedPageFiles.add(file.path);
      continue;
    }

    assert.equal(classification.kind, "application", `Expected ${file.path} to classify as application-level output.`);
    applicationFiles.push(file.path);
  }

  assert.equal(classifiedPageFiles.size, scopesByRoute.size * 3, "Each generated scope page should emit ts/html/scss files.");
  assert.ok(applicationFiles.includes("package.json"));
  assert.ok(applicationFiles.includes("src/app/app.routes.ts"));
  assert.ok(applicationFiles.includes("src/main.ts"));
});

test("classifies concrete dialog page and component files without scopeDocument", async () => {
  const document = JSON.parse(await readFile(DIALOG_FIXTURE, "utf8")) as OpenUiDocument;
  const index = buildSpecManifestationIndex(document);
  const emittedFiles = await emitAngularFilesFromInput(DIALOG_FIXTURE);
  const classifiedDialogFiles = new Set<string>();

  for (const file of emittedFiles) {
    const classification = classifyWorkspacePath(file.path, index);

    if (/^src\/app\/pages\/dialog\/dialog\.page\.(ts|html|scss)$/.test(file.path)) {
      assert.equal(classification.kind, "page", `Expected ${file.path} to classify as the concrete dialog page.`);
      assert.equal(classification.nodeId, "confirmDialog");
      assert.equal(classification.nodeType, "Dialog");
      assert.equal(classification.route, "dialog");
      assert.equal(classification.selector, "openui-dialog");
      assert.equal(classification.sourceFile, undefined);
      classifiedDialogFiles.add(file.path);
      continue;
    }

    if (/^src\/components\/app-confirm-dialog\/app-confirm-dialog\.component\.(ts|html|scss)$/.test(file.path)) {
      assert.equal(classification.kind, "component", `Expected ${file.path} to classify as the concrete dialog component.`);
      assert.equal(classification.nodeId, "confirmDialog");
      assert.equal(classification.nodeType, "Dialog");
      assert.equal(classification.selector, "app-confirm-dialog");
      assert.equal(classification.sourceFile, undefined);
      classifiedDialogFiles.add(file.path);
      continue;
    }

    assert.equal(classification.kind, "application", `Expected ${file.path} to classify as application-level output.`);
  }

  assert.deepEqual(
    [...classifiedDialogFiles].sort(),
    [
      "src/app/pages/dialog/dialog.page.html",
      "src/app/pages/dialog/dialog.page.scss",
      "src/app/pages/dialog/dialog.page.ts",
      "src/components/app-confirm-dialog/app-confirm-dialog.component.html",
      "src/components/app-confirm-dialog/app-confirm-dialog.component.scss",
      "src/components/app-confirm-dialog/app-confirm-dialog.component.ts",
    ],
  );
});
