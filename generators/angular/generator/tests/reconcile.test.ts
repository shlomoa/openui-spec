import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

import { buildSpecManifestationIndex } from "../src/incremental/classifier";
import { reconcileGeneratedFiles } from "../src/incremental/reconcile";
import type { GeneratedFile } from "../src/writers/file-writer";
import type { OpenUiDocument } from "../src/spec/openui-spec.types";

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
    await rm(emptyWorkspace, { recursive: true, force: true });
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
    await rm(workspace, { recursive: true, force: true });
  }
});
