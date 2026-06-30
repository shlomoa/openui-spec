import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

import { applyIncrementalPlan } from "../src/incremental/apply";
import { buildSpecManifestationIndex } from "../src/incremental/classifier";
import { emitAngularFilesFromInput, generateIncrementally } from "../src/incremental/generate";
import { reconcileGeneratedFiles } from "../src/incremental/reconcile";
import { isEmptyWorkspace, readWorkspaceIndex } from "../src/incremental/workspace-index";
import { loadOpenUiDocument } from "../src/spec/load-spec";
import type { OpenUiDocument, OpenUiElement } from "../src/spec/openui-spec.types";
import { cleanupTestOutput } from "./test-output";

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

async function writeJsonFile(filePath: string, value: unknown): Promise<string> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  return filePath;
}

async function fileModifiedTime(filePath: string): Promise<number> {
  return (await stat(filePath)).mtimeMs;
}

async function fileModifiedTimes(root: string, relativePaths: string[]): Promise<Map<string, number>> {
  const entries = await Promise.all(
    relativePaths.map(
      async (relativePath) => [relativePath, await fileModifiedTime(path.join(root, relativePath))] as const,
    ),
  );
  return new Map(entries);
}

async function planAgainstWorkspace(inputPath: string, outDirectory: string) {
  const input = await loadOpenUiDocument(inputPath);
  const index = buildSpecManifestationIndex(input);
  const generatedFiles = await emitAngularFilesFromInput(inputPath);
  const workspace = await readWorkspaceIndex(outDirectory);
  return reconcileGeneratedFiles(outDirectory, generatedFiles, index, workspace);
}

async function applicationOnlyInput(applicationChildIds: string[]): Promise<OpenUiDocument> {
  const fixture = JSON.parse(await readFile(FIXTURE, "utf8")) as OpenUiDocument;
  const scopes = fixture.children?.[0];
  assert.ok(scopes, "Expected fixture to include a Scopes root child.");

  const application = scopes.children?.find((child) => child.id === "application");
  assert.ok(application, "Expected fixture to include the Application scope.");

  const selectedChildren = applicationChildIds.map((childId): OpenUiElement => {
    const child = application.children?.find((candidate) => candidate.id === childId);
    assert.ok(child, `Expected Application scope to include child ${childId}.`);
    return child;
  });

  return {
    ...fixture,
    children: [
      {
        ...scopes,
        children: [
          {
            ...application,
            children: selectedChildren,
          },
        ],
      },
    ],
  };
}

test("from scratch — generates every emitted file as Add into an empty workspace", async () => {
  const outDir = await createTestOutputDirectory();
  try {
    const emittedFiles = await emitAngularFilesFromInput(FIXTURE);
    const emittedPaths = emittedFiles.map((file) => file.path).sort();
    const emptyWorkspace = await readWorkspaceIndex(outDir);
    assert.equal(isEmptyWorkspace(emptyWorkspace), true);

    const result = await generateIncrementally(FIXTURE, outDir);

    assert.deepEqual([...result.added].sort(), emittedPaths, "Every emitted file should be added from scratch.");
    assert.equal(result.modified.length, 0);
    assert.equal(result.deleted.length, 0);
    assert.equal(result.matched.length, 0);

    for (const expectedPath of [
      "package.json",
      "angular.json",
      "src/app/app.routes.ts",
      "src/app/pages/application/application.page.ts",
      "src/app/pages/application/application.page.html",
      "src/app/pages/application/application.page.scss",
    ]) {
      assert.ok(result.added.includes(expectedPath), `Expected ${expectedPath} to be reported as added.`);
      await assert.doesNotReject(readFile(path.join(outDir, expectedPath), "utf8"));
    }

    const packageJson = await readFile(path.join(outDir, "package.json"), "utf8");
    assert.match(packageJson, /"@angular\/material": "22\.0\.2"/);
  } finally {
    await cleanupTestOutput(outDir);
  }
});

test("no-op match — re-running on an up-to-date workspace matches every emitted file", async () => {
  const outDir = await createTestOutputDirectory();
  try {
    const emittedFiles = await emitAngularFilesFromInput(FIXTURE);
    const emittedPaths = emittedFiles.map((file) => file.path).sort();

    await generateIncrementally(FIXTURE, outDir);
    const mtimesBefore = await fileModifiedTimes(outDir, emittedPaths);

    const result = await generateIncrementally(FIXTURE, outDir);

    assert.equal(result.added.length, 0);
    assert.equal(result.modified.length, 0);
    assert.equal(result.deleted.length, 0);
    assert.deepEqual([...result.matched].sort(), emittedPaths, "Every emitted file should match on a no-op re-run.");

    for (const matchedPath of emittedPaths) {
      const mtimeAfter = await fileModifiedTime(path.join(outDir, matchedPath));
      assert.equal(mtimeAfter, mtimesBefore.get(matchedPath), `Matched file ${matchedPath} must not be rewritten.`);
    }
  } finally {
    await cleanupTestOutput(outDir);
  }
});

test("incremental add — adds a new child and rewires generated parent files", async () => {
  const tempRoot = await createTestOutputDirectory();
  try {
    const outDir = path.join(tempRoot, "workspace");
    const initialInput = await writeJsonFile(
      path.join(tempRoot, "inputs", "application-routing.json"),
      await applicationOnlyInput(["routing"]),
    );
    const updatedInput = await writeJsonFile(
      path.join(tempRoot, "inputs", "application-routing-navigation.json"),
      await applicationOnlyInput(["routing", "navigation"]),
    );

    const initialResult = await generateIncrementally(initialInput, outDir);
    assert.ok(initialResult.added.includes("src/app/pages/routing/routing.page.ts"));
    assert.equal(initialResult.modified.length, 0);
    assert.equal(initialResult.deleted.length, 0);

    const initialEmittedPaths = (await emitAngularFilesFromInput(initialInput)).map((file) => file.path).sort();
    const initialMtimes = await fileModifiedTimes(outDir, initialEmittedPaths);

    const updatedResult = await generateIncrementally(updatedInput, outDir);

    const addedNavigationFiles = [
      "src/app/pages/navigation/navigation.page.ts",
      "src/app/pages/navigation/navigation.page.html",
      "src/app/pages/navigation/navigation.page.scss",
    ];
    assert.deepEqual([...updatedResult.added].sort(), addedNavigationFiles.sort());
    assert.equal(updatedResult.deleted.length, 0);

    for (const addedPath of addedNavigationFiles) {
      await assert.doesNotReject(readFile(path.join(outDir, addedPath), "utf8"));
    }

    const modifiedForRewiring = [
      "src/app/app.component.ts",
      "src/app/app.routes.ts",
      "src/app/application-structure.model.ts",
      "src/app/pages/application/application.page.html",
    ];
    assert.deepEqual([...updatedResult.modified].sort(), modifiedForRewiring.sort());
    assert.ok(updatedResult.modified.includes("src/app/app.routes.ts"), "Routes should be rewired for the added child.");
    assert.ok(updatedResult.modified.includes("src/app/app.component.ts"), "Navigation shell should link the added child.");
    assert.ok(
      updatedResult.modified.includes("src/app/pages/application/application.page.html"),
      "Parent page content should summarize the added child.",
    );

    const routes = await readFile(path.join(outDir, "src/app/app.routes.ts"), "utf8");
    assert.match(routes, /path: 'navigation'/);
    const appComponent = await readFile(path.join(outDir, "src/app/app.component.ts"), "utf8");
    assert.match(appComponent, /routerLink="\/navigation"/);
    const applicationPage = await readFile(path.join(outDir, "src/app/pages/application/application.page.html"), "utf8");
    assert.match(applicationPage, /Navigation: User-facing navigation structures that expose routes, pages, and views\./);

    assert.ok(updatedResult.matched.includes("package.json"), "Unrelated project files should match.");
    assert.ok(updatedResult.matched.includes("src/app/pages/routing/routing.page.ts"), "Unchanged sibling page should match.");
    for (const matchedPath of ["package.json", "src/app/pages/routing/routing.page.ts"] as const) {
      const mtimeAfter = await fileModifiedTime(path.join(outDir, matchedPath));
      assert.equal(mtimeAfter, initialMtimes.get(matchedPath), `Matched file ${matchedPath} must not be rewritten.`);
    }
  } finally {
    await cleanupTestOutput(tempRoot);
  }
});

test("incremental delete — removes a child and rewires generated parent files", async () => {
  const tempRoot = await createTestOutputDirectory();
  try {
    const outDir = path.join(tempRoot, "workspace");
    const initialInput = await writeJsonFile(
      path.join(tempRoot, "inputs", "application-routing-navigation.json"),
      await applicationOnlyInput(["routing", "navigation"]),
    );
    const updatedInput = await writeJsonFile(
      path.join(tempRoot, "inputs", "application-routing.json"),
      await applicationOnlyInput(["routing"]),
    );

    const initialResult = await generateIncrementally(initialInput, outDir);
    assert.ok(initialResult.added.includes("src/app/pages/navigation/navigation.page.ts"));
    assert.equal(initialResult.modified.length, 0);
    assert.equal(initialResult.deleted.length, 0);

    const initialEmittedPaths = (await emitAngularFilesFromInput(initialInput)).map((file) => file.path).sort();
    const initialMtimes = await fileModifiedTimes(outDir, initialEmittedPaths);

    const updatedResult = await generateIncrementally(updatedInput, outDir);

    const removedNavigationFiles = [
      "src/app/pages/navigation/navigation.page.ts",
      "src/app/pages/navigation/navigation.page.html",
      "src/app/pages/navigation/navigation.page.scss",
    ];
    assert.equal(updatedResult.added.length, 0);
    assert.deepEqual([...updatedResult.deleted].sort(), [...removedNavigationFiles].sort());

    for (const removedPath of removedNavigationFiles) {
      await assert.rejects(stat(path.join(outDir, removedPath)), `Expected ${removedPath} to be deleted.`);
    }
    await assert.rejects(
      stat(path.join(outDir, "src/app/pages/navigation")),
      "Removed child page directory should be pruned.",
    );

    const modifiedForRewiring = [
      "src/app/app.component.ts",
      "src/app/app.routes.ts",
      "src/app/application-structure.model.ts",
      "src/app/pages/application/application.page.html",
    ];
    assert.deepEqual([...updatedResult.modified].sort(), modifiedForRewiring.sort());

    const routes = await readFile(path.join(outDir, "src/app/app.routes.ts"), "utf8");
    assert.doesNotMatch(routes, /path: 'navigation'/);
    const appComponent = await readFile(path.join(outDir, "src/app/app.component.ts"), "utf8");
    assert.doesNotMatch(appComponent, /routerLink="\/navigation"/);
    const applicationPage = await readFile(path.join(outDir, "src/app/pages/application/application.page.html"), "utf8");
    assert.doesNotMatch(applicationPage, /Navigation: User-facing navigation structures that expose routes, pages, and views\./);

    assert.ok(updatedResult.matched.includes("package.json"), "Unrelated project files should match.");
    assert.ok(updatedResult.matched.includes("src/app/pages/routing/routing.page.ts"), "Remaining sibling page should match.");
    for (const matchedPath of ["package.json", "src/app/pages/routing/routing.page.ts"] as const) {
      const mtimeAfter = await fileModifiedTime(path.join(outDir, matchedPath));
      assert.equal(mtimeAfter, initialMtimes.get(matchedPath), `Matched file ${matchedPath} must not be rewritten.`);
    }
  } finally {
    await cleanupTestOutput(tempRoot);
  }
});

test("deletes workspace files that the specification no longer emits", async () => {
  const outDir = await createTestOutputDirectory();
  try {
    await generateIncrementally(FIXTURE, outDir);

    const straySource = "src/app/pages/removed-section/removed-section.page.ts";
    await mkdir(path.dirname(path.join(outDir, straySource)), { recursive: true });
    await writeFile(path.join(outDir, straySource), "export class RemovedSectionPage {}\n", "utf8");

    const plan = await planAgainstWorkspace(FIXTURE, outDir);

    const strayEntry = plan.toDelete.find((entry) => entry.path === straySource);
    assert.ok(strayEntry, "Expected the stray file to appear in the plan's deletions.");
    assert.equal(strayEntry?.action, "delete");

    const result = await applyIncrementalPlan(outDir, plan);
    assert.ok(result.deleted.includes(straySource));

    await assert.rejects(stat(path.join(outDir, straySource)));
    await assert.rejects(
      stat(path.join(outDir, "src/app/pages/removed-section")),
      "Emptied directories should be pruned after deletion.",
    );
  } finally {
    await cleanupTestOutput(outDir);
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

    const plan = await planAgainstWorkspace(FIXTURE, outDir);

    const routesEntry = plan.reconciled.find((entry) => entry.file.path === "src/app/app.routes.ts");
    const tsConfigEntry = plan.reconciled.find((entry) => entry.file.path === "tsconfig.json");
    assert.equal(routesEntry?.action, "modify");
    assert.equal(tsConfigEntry?.action, "match");

    const result = await applyIncrementalPlan(outDir, plan);
    assert.deepEqual(result.modified, ["src/app/app.routes.ts"]);
    assert.equal(result.added.length, 0);
    assert.equal(result.deleted.length, 0);

    const restoredRoutes = await readFile(routesPath, "utf8");
    assert.match(restoredRoutes, /path: 'application'/);

    const tsConfigMtimeAfter = await fileModifiedTime(tsConfigPath);
    assert.equal(tsConfigMtimeAfter, tsConfigMtimeBefore, "Untouched siblings must not be rewritten.");
  } finally {
    await cleanupTestOutput(outDir);
  }
});

test("refuses to apply a plan that writes outside the output directory", async () => {
  const outDir = await createTestOutputDirectory();
  try {
    await assert.rejects(
      applyIncrementalPlan(outDir, {
        reconciled: [
          {
            file: { path: "../escape.ts", content: "secret" },
            action: "add",
            classification: { kind: "unknown" },
          },
        ],
        toWrite: [{ path: "../escape.ts", content: "secret" }],
        toDelete: [],
      }),
      /Refusing to write outside output directory/,
    );
  } finally {
    await cleanupTestOutput(outDir);
  }
});

test("refuses to apply a plan that deletes outside the output directory", async () => {
  const outDir = await createTestOutputDirectory();
  try {
    await assert.rejects(
      applyIncrementalPlan(outDir, {
        reconciled: [],
        toWrite: [],
        toDelete: [{ path: "../escape.ts", action: "delete", classification: { kind: "unknown" } }],
      }),
      /Refusing to write outside output directory/,
    );
  } finally {
    await cleanupTestOutput(outDir);
  }
});
