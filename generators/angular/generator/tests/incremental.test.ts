import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

import { applyReconciliationPlan } from "../src/incremental/apply";
import { emitAngularFilesFromSpec, generateIncrementally } from "../src/incremental/generate";
import { reconcile } from "../src/incremental/reconcile";
import { isEmptyWorkspace, readWorkspaceIndex } from "../src/incremental/workspace-index";

const ANGULAR_GENERATOR_ROOT =
  path.basename(path.dirname(__dirname)) === "dist"
    ? path.resolve(__dirname, "..", "..")
    : path.resolve(__dirname, "..");
const REPOSITORY_ROOT = path.resolve(ANGULAR_GENERATOR_ROOT, "..", "..", "..");
const FIXTURE = path.join(ANGULAR_GENERATOR_ROOT, "tests", "fixtures", "minimal-openui.json");
const TEST_OUTPUT_ROOT = path.join(REPOSITORY_ROOT, "tmp");
const TEST_OUTPUT_PREFIX = path.join(TEST_OUTPUT_ROOT, "openui-incremental-");

async function createTestOutputDirectory(): Promise<string> {
  await mkdir(TEST_OUTPUT_ROOT, { recursive: true });
  return mkdtemp(TEST_OUTPUT_PREFIX);
}

async function fileModifiedTime(filePath: string): Promise<number> {
  return (await stat(filePath)).mtimeMs;
}

test("generates every file as Add into an empty workspace", async () => {
  const outDir = await createTestOutputDirectory();
  try {
    const emptyWorkspace = await readWorkspaceIndex(outDir);
    assert.equal(isEmptyWorkspace(emptyWorkspace), true);

    const result = await generateIncrementally(FIXTURE, outDir);

    assert.ok(result.added.length > 0, "Expected files to be added on a from-scratch run.");
    assert.equal(result.modified.length, 0);
    assert.equal(result.deleted.length, 0);
    assert.equal(result.matched.length, 0);
    assert.ok(result.added.includes("package.json"));
    assert.ok(result.added.includes("src/app/app.routes.ts"));

    const packageJson = await readFile(path.join(outDir, "package.json"), "utf8");
    assert.match(packageJson, /"@angular\/material": "22\.0\.2"/);
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
});

test("re-running on an up-to-date workspace is an all-Match no-op", async () => {
  const outDir = await createTestOutputDirectory();
  try {
    await generateIncrementally(FIXTURE, outDir);

    const routesPath = path.join(outDir, "src/app/app.routes.ts");
    const mtimeBefore = await fileModifiedTime(routesPath);

    const result = await generateIncrementally(FIXTURE, outDir);

    assert.equal(result.added.length, 0);
    assert.equal(result.modified.length, 0);
    assert.equal(result.deleted.length, 0);
    assert.ok(result.matched.length > 0, "Expected matched files on a no-op re-run.");

    const mtimeAfter = await fileModifiedTime(routesPath);
    assert.equal(mtimeAfter, mtimeBefore, "Matched files must not be rewritten.");
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
});

test("deletes workspace files that the specification no longer emits", async () => {
  const outDir = await createTestOutputDirectory();
  try {
    await generateIncrementally(FIXTURE, outDir);

    const straySource = "src/app/pages/removed-section/removed-section.page.ts";
    await mkdir(path.dirname(path.join(outDir, straySource)), { recursive: true });
    await writeFile(path.join(outDir, straySource), "export class RemovedSectionPage {}\n", "utf8");

    const generatedFiles = await emitAngularFilesFromSpec(FIXTURE);
    const workspace = await readWorkspaceIndex(outDir);
    const plan = reconcile(generatedFiles, workspace);

    const strayEntry = plan.entries.find((entry) => entry.path === straySource);
    assert.ok(strayEntry, "Expected the stray file to appear in the plan.");
    assert.equal(strayEntry?.action, "delete");

    const result = await applyReconciliationPlan(outDir, plan);
    assert.ok(result.deleted.includes(straySource));

    await assert.rejects(stat(path.join(outDir, straySource)));
    await assert.rejects(
      stat(path.join(outDir, "src/app/pages/removed-section")),
      "Emptied directories should be pruned after deletion.",
    );
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
});

test("modifies only the drifted file and leaves siblings matched", async () => {
  const outDir = await createTestOutputDirectory();
  try {
    await generateIncrementally(FIXTURE, outDir);

    const routesPath = path.join(outDir, "src/app/app.routes.ts");
    const tsConfigPath = path.join(outDir, "tsconfig.json");
    await writeFile(routesPath, "// drifted content\n", "utf8");
    const tsConfigMtimeBefore = await fileModifiedTime(tsConfigPath);

    const generatedFiles = await emitAngularFilesFromSpec(FIXTURE);
    const workspace = await readWorkspaceIndex(outDir);
    const plan = reconcile(generatedFiles, workspace);

    const routesEntry = plan.entries.find((entry) => entry.path === "src/app/app.routes.ts");
    const tsConfigEntry = plan.entries.find((entry) => entry.path === "tsconfig.json");
    assert.equal(routesEntry?.action, "modify");
    assert.equal(tsConfigEntry?.action, "match");

    const result = await applyReconciliationPlan(outDir, plan);
    assert.deepEqual(result.modified, ["src/app/app.routes.ts"]);
    assert.equal(result.added.length, 0);
    assert.equal(result.deleted.length, 0);

    const restoredRoutes = await readFile(routesPath, "utf8");
    assert.match(restoredRoutes, /path: 'application'/);

    const tsConfigMtimeAfter = await fileModifiedTime(tsConfigPath);
    assert.equal(tsConfigMtimeAfter, tsConfigMtimeBefore, "Untouched siblings must not be rewritten.");
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
});

test("refuses to apply a plan entry that escapes the output directory", async () => {
  const outDir = await createTestOutputDirectory();
  try {
    await assert.rejects(
      applyReconciliationPlan(outDir, {
        entries: [{ path: "../escape.ts", action: "add", content: "secret" }],
      }),
      /Refusing to write outside output directory/,
    );
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
});
