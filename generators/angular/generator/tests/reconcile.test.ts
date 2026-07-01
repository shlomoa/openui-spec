import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

import { buildSpecManifestationIndex } from "../src/incremental/classifier";
import { reconcileGeneratedFiles } from "../src/incremental/reconcile";
import { readWorkspaceIndex } from "../src/incremental/workspace-index";
import type { GeneratedFile } from "../src/writers/file-writer";
import type { OpenUiDocument, OpenUiElement } from "../src/spec/openui-spec.types";
import { cleanupTestOutput } from "./test-output";

const ANGULAR_GENERATOR_ROOT =
  path.basename(path.dirname(__dirname)) === "dist"
    ? path.resolve(__dirname, "..", "..")
    : path.resolve(__dirname, "..");
const REPOSITORY_ROOT = path.resolve(ANGULAR_GENERATOR_ROOT, "..", "..", "..");
const INCREMENTAL_FIXTURE = path.join(ANGULAR_GENERATOR_ROOT, "tests", "fixtures", "example_incremental");
const INPUT_WORKSPACE = path.join(INCREMENTAL_FIXTURE, "input_app-file-select");
const OUTPUT_WORKSPACE = path.join(INCREMENTAL_FIXTURE, "output_app-file-select");
const SPEC_FILE = path.join(OUTPUT_WORKSPACE, "app-file-select.example.json");
const TEST_OUTPUT_ROOT = path.join(REPOSITORY_ROOT, "tmp");
const TEST_OUTPUT_PREFIX = path.join(TEST_OUTPUT_ROOT, "openui-reconcile-");

const COMPONENT_FILES = [
  "src/components/app-file-select/app-file-select.component.ts",
  "src/components/app-file-select/app-file-select.component.html",
  "src/components/app-file-select/app-file-select.component.scss",
  "src/components/app-file-upload/app-file-upload.component.ts",
  "src/components/app-file-upload/app-file-upload.component.html",
  "src/components/app-file-upload/app-file-upload.component.scss",
];

async function loadIndex(): Promise<ReturnType<typeof buildSpecManifestationIndex>> {
  const document = JSON.parse(await readFile(SPEC_FILE, "utf8")) as OpenUiDocument;
  return buildSpecManifestationIndex(document);
}

async function createTestWorkspace(): Promise<string> {
  await mkdir(TEST_OUTPUT_ROOT, { recursive: true });
  return mkdtemp(TEST_OUTPUT_PREFIX);
}

/** The component files the generator would emit, sourced from the output fixture. */
async function generatedComponentFiles(): Promise<GeneratedFile[]> {
  return Promise.all(
    COMPONENT_FILES.map(async (relativePath) => ({
      path: relativePath,
      content: await readFile(path.join(OUTPUT_WORKSPACE, relativePath), "utf8"),
    })),
  );
}

/**
 * Seed a temporary workspace with the given files so it represents the
 * previously generated state the reconciler must reconcile a new spec against.
 */
async function seedWorkspace(files: GeneratedFile[]): Promise<string> {
  const workspace = await createTestWorkspace();
  for (const file of files) {
    const destination = path.join(workspace, file.path);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, file.content, "utf8");
  }
  return workspace;
}

/** The relative path of a component file for the given selector. */
function componentFile(selector: string, extension: "ts" | "html" | "scss"): string {
  return `src/components/${selector}/${selector}.component.${extension}`;
}

/** A bare component-template node carrying only the attrs the classifier reads. */
function componentTemplateNode(id: string, selector: string): OpenUiElement {
  return {
    id,
    type: "ComponentTemplate",
    attrs: {
      selector,
      sourceFile: componentFile(selector, "html"),
    },
  };
}

/** Wrap component-template nodes in a minimal valid OpenUI input document. */
function inputDocument(children: OpenUiElement[]): OpenUiDocument {
  return { id: "root", version: "0.0.1", type: "ApplicationExample", children };
}

function deletionFor(plan: Awaited<ReturnType<typeof reconcileGeneratedFiles>>, relativePath: string) {
  return plan.toDelete.find((entry) => entry.path === relativePath);
}

function actionFor(plan: Awaited<ReturnType<typeof reconcileGeneratedFiles>>, relativePath: string): string {
  const entry = plan.reconciled.find((candidate) => candidate.file.path === relativePath);
  assert.ok(entry, `Expected a reconciled entry for ${relativePath}.`);
  return entry.action;
}

test("reconciles incremental workspace: adds new component, rewires and matches the parent", async () => {
  const index = await loadIndex();
  const files = await generatedComponentFiles();

  const plan = await reconcileGeneratedFiles(INPUT_WORKSPACE, files, index);

  // app-file-select is described by the spec but absent from the workspace -> Add.
  assert.equal(actionFor(plan, "src/components/app-file-select/app-file-select.component.ts"), "add");
  assert.equal(actionFor(plan, "src/components/app-file-select/app-file-select.component.html"), "add");
  assert.equal(actionFor(plan, "src/components/app-file-select/app-file-select.component.scss"), "add");

  // The existing app-file-upload parent is re-wired to reference the new child:
  // its .ts/.html change (Modify) while its unchanged .scss stays a Match.
  assert.equal(actionFor(plan, "src/components/app-file-upload/app-file-upload.component.ts"), "modify");
  assert.equal(actionFor(plan, "src/components/app-file-upload/app-file-upload.component.html"), "modify");
  assert.equal(actionFor(plan, "src/components/app-file-upload/app-file-upload.component.scss"), "match");

  // Only the changed and added files are scheduled to write; the matched file is skipped.
  const writtenPaths = plan.toWrite.map((file) => file.path).sort();
  assert.deepEqual(writtenPaths, [
    "src/components/app-file-select/app-file-select.component.html",
    "src/components/app-file-select/app-file-select.component.scss",
    "src/components/app-file-select/app-file-select.component.ts",
    "src/components/app-file-upload/app-file-upload.component.html",
    "src/components/app-file-upload/app-file-upload.component.ts",
  ]);
});

test("attributes each reconciled file to its owning spec node", async () => {
  const index = await loadIndex();
  const files = await generatedComponentFiles();

  const plan = await reconcileGeneratedFiles(INPUT_WORKSPACE, files, index);
  const select = plan.reconciled.find(
    (entry) => entry.file.path === "src/components/app-file-select/app-file-select.component.ts",
  );
  assert.ok(select);
  assert.equal(select.classification.kind, "component");
  assert.equal(select.classification.nodeId, "appFileSelectTemplate");
});

test("an empty workspace yields an all-add plan (generation from scratch)", async () => {
  const index = await loadIndex();
  const files = await generatedComponentFiles();
  const emptyWorkspace = await createTestWorkspace();
  try {
    const plan = await reconcileGeneratedFiles(emptyWorkspace, files, index);
    assert.ok(plan.reconciled.every((entry) => entry.action === "add"));
    assert.equal(plan.toWrite.length, files.length);
  } finally {
    await cleanupTestOutput(emptyWorkspace);
  }
});

test("re-running on identical output is a no-op (all match)", async () => {
  const index = await loadIndex();
  const files = await generatedComponentFiles();

  const plan = await reconcileGeneratedFiles(OUTPUT_WORKSPACE, files, index);
  assert.ok(plan.reconciled.every((entry) => entry.action === "match"));
  assert.equal(plan.toWrite.length, 0);
});

test("a changed existing file is reconciled as modify", async () => {
  const index = await loadIndex();
  const files = await generatedComponentFiles();
  const workspace = await createTestWorkspace();
  try {
    const target = "src/components/app-file-upload/app-file-upload.component.ts";
    const destination = path.join(workspace, target);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, "// stale content\n", "utf8");

    const plan = await reconcileGeneratedFiles(workspace, files, index);
    assert.equal(actionFor(plan, target), "modify");
    assert.ok(plan.toWrite.some((file) => file.path === target));
  } finally {
    await cleanupTestOutput(workspace);
  }
});

// Issue-driven validation: the JSON specification itself drives each Add / Delete /
// Modify scenario by genuinely differing from the workspace it reconciles against.
// See spec/README.md § Incremental generation and generator/docs/GENERATION.md.

test("removal — an empty JSON deletes every previously generated component", async () => {
  // JSON with no component templates: nothing is emitted, so every existing
  // component file in the workspace must be reconciled as a Delete.
  const index = buildSpecManifestationIndex(inputDocument([]));
  const previousWorkspace = await generatedComponentFiles();
  const workspace = await seedWorkspace(previousWorkspace);
  try {
    const plan = await reconcileGeneratedFiles(workspace, [], index, await readWorkspaceIndex(workspace));

    assert.equal(plan.reconciled.length, 0, "An empty spec emits no files.");
    assert.equal(plan.toWrite.length, 0);

    const deletedPaths = plan.toDelete.map((entry) => entry.path).sort();
    assert.deepEqual(deletedPaths, [...COMPONENT_FILES].sort());
    for (const entry of plan.toDelete) {
      assert.equal(entry.action, "delete");
    }

    // An empty spec owns no manifestation, so the orphaned files classify as
    // unknown — the workspace footprint is reclaimed even without a spec node.
    const selectDeletion = deletionFor(plan, componentFile("app-file-select", "ts"));
    assert.equal(selectDeletion?.classification.kind, "unknown");
  } finally {
    await cleanupTestOutput(workspace);
  }
});

test("removal — dropping one child from the JSON deletes it and rewires the parent", async () => {
  // The new spec keeps only app-file-upload; app-file-select is removed from the
  // JSON. The emitted upload files are the parent rewired to drop every reference
  // to the removed child (its import statement, its imports-array entry, and its
  // template tag), modelling "delete the object and the reference from parent".
  const index = buildSpecManifestationIndex(inputDocument([componentTemplateNode("appFileUploadTemplate", "app-file-upload")]));
  const [parentTs, parentHtml, parentScss] = await Promise.all(
    (["ts", "html", "scss"] as const).map((extension) =>
      readFile(path.join(OUTPUT_WORKSPACE, componentFile("app-file-upload", extension)), "utf8"),
    ),
  );
  const rewiredTs = parentTs
    .replace("import { AppFileSelectComponent } from '../app-file-select/app-file-select.component';\n", "")
    .replace(", AppFileSelectComponent]", "]");
  const rewiredHtml = parentHtml.replace("<app-file-select></app-file-select>", "Place holder");
  const emitted: GeneratedFile[] = [
    { path: componentFile("app-file-upload", "ts"), content: rewiredTs },
    { path: componentFile("app-file-upload", "html"), content: rewiredHtml },
    { path: componentFile("app-file-upload", "scss"), content: parentScss },
  ];

  const workspace = await seedWorkspace(await generatedComponentFiles());
  try {
    const plan = await reconcileGeneratedFiles(workspace, emitted, index, await readWorkspaceIndex(workspace));

    // The removed child's files are deleted; the surviving spec owns nothing there.
    const selectFiles = COMPONENT_FILES.filter((file) => file.includes("app-file-select"));
    assert.deepEqual(
      plan.toDelete.map((entry) => entry.path).sort(),
      [...selectFiles].sort(),
    );

    // The parent is re-wired: its .ts and .html drift from the previous output
    // (which still referenced the child) and are modified; the .scss is unchanged.
    assert.equal(actionFor(plan, componentFile("app-file-upload", "ts")), "modify");
    assert.equal(actionFor(plan, componentFile("app-file-upload", "html")), "modify");
    assert.equal(actionFor(plan, componentFile("app-file-upload", "scss")), "match");

    // The rewired parent no longer references the removed child.
    const writtenParent = plan.toWrite.find((file) => file.path === componentFile("app-file-upload", "ts"));
    assert.ok(writtenParent && !writtenParent.content.includes("AppFileSelectComponent"));
  } finally {
    await cleanupTestOutput(workspace);
  }
});

test("modification — a simple child rename is reconciled as delete-old plus add-new", async () => {
  // Simple change: only the child's name (selector) changes from app-file-select
  // to app-file-picker. The renamed component is added under the new folder while
  // the old folder is removed, matching the spec's "rename → delete and re-add".
  const index = buildSpecManifestationIndex(
    inputDocument([
      componentTemplateNode("appFilePickerTemplate", "app-file-picker"),
      componentTemplateNode("appFileUploadTemplate", "app-file-upload"),
    ]),
  );

  const selectSource = await Promise.all(
    (["ts", "html", "scss"] as const).map(async (extension) => ({
      extension,
      content: await readFile(path.join(OUTPUT_WORKSPACE, componentFile("app-file-select", extension)), "utf8"),
    })),
  );
  const renamed: GeneratedFile[] = selectSource.map(({ extension, content }) => ({
    path: componentFile("app-file-picker", extension),
    content: content.replaceAll("app-file-select", "app-file-picker").replaceAll("AppFileSelect", "AppFilePicker"),
  }));
  const upload: GeneratedFile[] = await Promise.all(
    (["ts", "html", "scss"] as const).map(async (extension) => ({
      path: componentFile("app-file-upload", extension),
      content: await readFile(path.join(OUTPUT_WORKSPACE, componentFile("app-file-upload", extension)), "utf8"),
    })),
  );

  const workspace = await seedWorkspace(await generatedComponentFiles());
  try {
    const plan = await reconcileGeneratedFiles(workspace, [...renamed, ...upload], index, await readWorkspaceIndex(workspace));

    // New name added.
    assert.equal(actionFor(plan, componentFile("app-file-picker", "ts")), "add");
    assert.equal(actionFor(plan, componentFile("app-file-picker", "html")), "add");
    assert.equal(actionFor(plan, componentFile("app-file-picker", "scss")), "add");
    const pickerAdd = plan.reconciled.find((entry) => entry.file.path === componentFile("app-file-picker", "ts"));
    assert.equal(pickerAdd?.classification.selector, "app-file-picker");

    // Old name deleted.
    const oldSelectFiles = COMPONENT_FILES.filter((file) => file.includes("app-file-select"));
    for (const oldFile of oldSelectFiles) {
      assert.ok(deletionFor(plan, oldFile), `Expected ${oldFile} to be deleted after the rename.`);
    }
  } finally {
    await cleanupTestOutput(workspace);
  }
});

test("modification — a complex child type change rewrites only the affected file", async () => {
  // Complex change: a child node inside app-file-select changes type (its
  // <mat-icon> becomes a <span>), so the emitted .html differs while its sibling
  // .ts/.scss and the unrelated upload component stay byte-identical.
  const index = await loadIndex();
  const previous = await generatedComponentFiles();
  const emitted = previous.map((file) =>
    file.path === componentFile("app-file-select", "html")
      ? {
          path: file.path,
          content: file.content.replace("<mat-icon>attach_file</mat-icon>", '<span class="icon">attach_file</span>'),
        }
      : file,
  );

  const workspace = await seedWorkspace(previous);
  try {
    const plan = await reconcileGeneratedFiles(workspace, emitted, index, await readWorkspaceIndex(workspace));

    assert.equal(actionFor(plan, componentFile("app-file-select", "html")), "modify");
    assert.equal(actionFor(plan, componentFile("app-file-select", "ts")), "match");
    assert.equal(actionFor(plan, componentFile("app-file-select", "scss")), "match");
    for (const extension of ["ts", "html", "scss"] as const) {
      assert.equal(actionFor(plan, componentFile("app-file-upload", extension)), "match");
    }

    assert.deepEqual(
      plan.toWrite.map((file) => file.path),
      [componentFile("app-file-select", "html")],
    );
    assert.equal(plan.toDelete.length, 0);
  } finally {
    await cleanupTestOutput(workspace);
  }
});
