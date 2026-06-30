import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

import { buildSpecManifestationIndex, classifyWorkspacePath } from "../src/incremental/classifier";
import type { OpenUiDocument } from "../src/spec/openui-spec.types";

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

test("classifies every generated component folder in the fixture workspace", async () => {
  const index = await loadIndex();
  const componentsDir = path.join(INCREMENTAL_FIXTURE, "src", "components");
  const entries = await readdir(componentsDir, { withFileTypes: true });
  const componentFolders = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);

  for (const folder of componentFolders) {
    const classification = classifyWorkspacePath(`src/components/${folder}`, index);
    assert.equal(classification.kind, "component", `Expected ${folder} to classify as a component.`);
    assert.equal(classification.selector, folder);
  }
});

test("normalizes Windows-style workspace separators", async () => {
  const index = await loadIndex();
  const windowsStyle = classifyWorkspacePath("src\\components\\app-file-select", index);
  assert.equal(windowsStyle.nodeId, "appFileSelectTemplate");
});
