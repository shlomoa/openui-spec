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

  return applicationInputWithChildren(selectedChildren);
}

async function applicationInputWithChildren(applicationChildren: OpenUiElement[]): Promise<OpenUiDocument> {
  const fixture = JSON.parse(await readFile(FIXTURE, "utf8")) as OpenUiDocument;
  const scopes = fixture.children?.[0];
  assert.ok(scopes, "Expected fixture to include a Scopes root child.");

  const application = scopes.children?.find((child) => child.id === "application");
  assert.ok(application, "Expected fixture to include the Application scope.");

  return {
    ...fixture,
    children: [
      {
        ...scopes,
        children: [
          {
            ...application,
            children: applicationChildren,
          },
        ],
      },
    ],
  };
}

async function emptyRootInput(): Promise<OpenUiDocument> {
  const fixture = JSON.parse(await readFile(FIXTURE, "utf8")) as OpenUiDocument;
  return {
    ...fixture,
    children: [],
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

test("incremental delete — empty JSON removes every previously generated child page", async () => {
  const tempRoot = await createTestOutputDirectory();
  try {
    const outDir = path.join(tempRoot, "workspace");
    const initialInput = await writeJsonFile(
      path.join(tempRoot, "inputs", "application-routing-navigation.json"),
      await applicationOnlyInput(["routing", "navigation"]),
    );
    const emptyInput = await writeJsonFile(path.join(tempRoot, "inputs", "empty-root.json"), await emptyRootInput());

    const initialResult = await generateIncrementally(initialInput, outDir);
    assert.ok(initialResult.added.includes("src/app/pages/application/application.page.ts"));
    assert.ok(initialResult.added.includes("src/app/pages/routing/routing.page.ts"));
    assert.ok(initialResult.added.includes("src/app/pages/navigation/navigation.page.ts"));

    const emptyResult = await generateIncrementally(emptyInput, outDir);

    const deletedPageFiles = ["application", "routing", "navigation"].flatMap((route) => [
      `src/app/pages/${route}/${route}.page.ts`,
      `src/app/pages/${route}/${route}.page.html`,
      `src/app/pages/${route}/${route}.page.scss`,
    ]);
    assert.equal(emptyResult.added.length, 0);
    assert.deepEqual(
      [...emptyResult.deleted].sort(),
      [...deletedPageFiles, "src/app/application-structure.model.ts"].sort(),
    );

    for (const deletedPath of deletedPageFiles) {
      await assert.rejects(stat(path.join(outDir, deletedPath)), `Expected ${deletedPath} to be deleted.`);
    }
    await assert.rejects(stat(path.join(outDir, "src/app/application-structure.model.ts")));
    await assert.rejects(stat(path.join(outDir, "src/app/pages")), "Empty pages directory should be pruned.");

    const routes = await readFile(path.join(outDir, "src/app/app.routes.ts"), "utf8");
    assert.doesNotMatch(routes, /path: 'application'/);
    assert.doesNotMatch(routes, /path: 'routing'/);
    assert.doesNotMatch(routes, /path: 'navigation'/);
    assert.match(routes, /redirectTo: ''/);

    const appComponent = await readFile(path.join(outDir, "src/app/app.component.ts"), "utf8");
    assert.doesNotMatch(appComponent, /APPLICATION_STRUCTURE/);
    assert.doesNotMatch(appComponent, /routerLink="\/application"/);
    assert.doesNotMatch(appComponent, /routerLink="\/routing"/);
    assert.doesNotMatch(appComponent, /routerLink="\/navigation"/);

    assert.ok(emptyResult.matched.includes("package.json"), "Unrelated project files should match.");
    assert.ok(emptyResult.modified.includes("src/app/app.routes.ts"), "Routes should be rewired for an empty page set.");
    assert.ok(emptyResult.modified.includes("src/app/app.component.ts"), "Shell navigation should be rewired for an empty page set.");
  } finally {
    await cleanupTestOutput(tempRoot);
  }
});

test("simple modification — renaming a child deletes the old route, adds the new route, and rewires parents", async () => {
  const tempRoot = await createTestOutputDirectory();
  try {
    const outDir = path.join(tempRoot, "workspace");
    const initialSpec = await applicationOnlyInput(["routing", "navigation"]);
    const application = initialSpec.children?.[0]?.children?.[0];
    assert.ok(application, "Expected generated test spec to include the Application scope.");
    const routing = application.children?.find((child) => child.id === "routing");
    const navigation = application.children?.find((child) => child.id === "navigation");
    assert.ok(routing, "Expected Application scope to include routing.");
    assert.ok(navigation, "Expected Application scope to include navigation.");

    const renamedNavigation: OpenUiElement = {
      ...navigation,
      id: "siteNavigation",
      attrs: {
        ...navigation.attrs,
        title: "Site navigation",
      },
    };

    const initialInput = await writeJsonFile(path.join(tempRoot, "inputs", "application-navigation.json"), initialSpec);
    const renamedInput = await writeJsonFile(
      path.join(tempRoot, "inputs", "application-site-navigation.json"),
      await applicationInputWithChildren([routing, renamedNavigation]),
    );

    const initialResult = await generateIncrementally(initialInput, outDir);
    assert.ok(initialResult.added.includes("src/app/pages/navigation/navigation.page.ts"));
    assert.equal(initialResult.modified.length, 0);
    assert.equal(initialResult.deleted.length, 0);

    const initialEmittedPaths = (await emitAngularFilesFromInput(initialInput)).map((file) => file.path).sort();
    const initialMtimes = await fileModifiedTimes(outDir, initialEmittedPaths);

    const renamedResult = await generateIncrementally(renamedInput, outDir);

    const oldNavigationFiles = [
      "src/app/pages/navigation/navigation.page.ts",
      "src/app/pages/navigation/navigation.page.html",
      "src/app/pages/navigation/navigation.page.scss",
    ];
    const newSiteNavigationFiles = [
      "src/app/pages/site-navigation/site-navigation.page.ts",
      "src/app/pages/site-navigation/site-navigation.page.html",
      "src/app/pages/site-navigation/site-navigation.page.scss",
    ];
    assert.deepEqual([...renamedResult.deleted].sort(), oldNavigationFiles.sort());
    assert.deepEqual([...renamedResult.added].sort(), newSiteNavigationFiles.sort());

    for (const oldPath of oldNavigationFiles) {
      await assert.rejects(stat(path.join(outDir, oldPath)), `Expected ${oldPath} to be deleted after rename.`);
    }
    await assert.rejects(stat(path.join(outDir, "src/app/pages/navigation")));
    for (const newPath of newSiteNavigationFiles) {
      await assert.doesNotReject(readFile(path.join(outDir, newPath), "utf8"));
    }

    const modifiedForRewiring = [
      "src/app/app.component.ts",
      "src/app/app.routes.ts",
      "src/app/application-structure.model.ts",
      "src/app/pages/application/application.page.html",
    ];
    assert.deepEqual([...renamedResult.modified].sort(), modifiedForRewiring.sort());

    const routes = await readFile(path.join(outDir, "src/app/app.routes.ts"), "utf8");
    assert.doesNotMatch(routes, /path: 'navigation'/);
    assert.match(routes, /path: 'site-navigation'/);
    const appComponent = await readFile(path.join(outDir, "src/app/app.component.ts"), "utf8");
    assert.doesNotMatch(appComponent, /routerLink="\/navigation"/);
    assert.match(appComponent, /routerLink="\/site-navigation"/);
    assert.match(appComponent, />Site navigation<\/a>/);
    const applicationPage = await readFile(path.join(outDir, "src/app/pages/application/application.page.html"), "utf8");
    assert.doesNotMatch(applicationPage, /Navigation: User-facing navigation structures that expose routes, pages, and views\./);
    assert.match(applicationPage, /Site navigation: User-facing navigation structures that expose routes, pages, and views\./);

    assert.ok(renamedResult.matched.includes("package.json"), "Unrelated project files should match.");
    assert.ok(renamedResult.matched.includes("src/app/pages/routing/routing.page.ts"), "Unchanged sibling page should match.");
    for (const matchedPath of ["package.json", "src/app/pages/routing/routing.page.ts"] as const) {
      const mtimeAfter = await fileModifiedTime(path.join(outDir, matchedPath));
      assert.equal(mtimeAfter, initialMtimes.get(matchedPath), `Matched file ${matchedPath} must not be rewritten.`);
    }
  } finally {
    await cleanupTestOutput(tempRoot);
  }
});

test("complex modification — changing a child attribute rewrites only affected generated content", async () => {
  const tempRoot = await createTestOutputDirectory();
  try {
    const outDir = path.join(tempRoot, "workspace");
    const initialSpec = await applicationOnlyInput(["routing", "navigation"]);
    const application = initialSpec.children?.[0]?.children?.[0];
    assert.ok(application, "Expected generated test spec to include the Application scope.");
    const routing = application.children?.find((child) => child.id === "routing");
    const navigation = application.children?.find((child) => child.id === "navigation");
    assert.ok(routing, "Expected Application scope to include routing.");
    assert.ok(navigation, "Expected Application scope to include navigation.");

    const updatedPurpose = "User-facing navigation structures with a revised incremental-generation summary.";
    const updatedNavigation: OpenUiElement = {
      ...navigation,
      attrs: {
        ...navigation.attrs,
        purpose: updatedPurpose,
      },
    };

    const initialInput = await writeJsonFile(path.join(tempRoot, "inputs", "application-navigation.json"), initialSpec);
    const updatedInput = await writeJsonFile(
      path.join(tempRoot, "inputs", "application-navigation-updated-purpose.json"),
      await applicationInputWithChildren([routing, updatedNavigation]),
    );

    const initialResult = await generateIncrementally(initialInput, outDir);
    assert.ok(initialResult.added.includes("src/app/pages/navigation/navigation.page.html"));
    assert.equal(initialResult.modified.length, 0);
    assert.equal(initialResult.deleted.length, 0);

    const initialEmittedPaths = (await emitAngularFilesFromInput(initialInput)).map((file) => file.path).sort();
    const initialMtimes = await fileModifiedTimes(outDir, initialEmittedPaths);

    const updatedResult = await generateIncrementally(updatedInput, outDir);

    const modifiedForAttributeChange = [
      "src/app/pages/application/application.page.html",
      "src/app/pages/navigation/navigation.page.html",
    ];
    assert.equal(updatedResult.added.length, 0);
    assert.equal(updatedResult.deleted.length, 0);
    assert.deepEqual([...updatedResult.modified].sort(), modifiedForAttributeChange.sort());

    const navigationPage = await readFile(path.join(outDir, "src/app/pages/navigation/navigation.page.html"), "utf8");
    assert.ok(navigationPage.includes(updatedPurpose));
    const applicationPage = await readFile(path.join(outDir, "src/app/pages/application/application.page.html"), "utf8");
    assert.match(applicationPage, /Navigation: User-facing navigation structures with a revised incremental-generation summary\./);

    for (const matchedPath of [
      "package.json",
      "src/app/app.routes.ts",
      "src/app/app.component.ts",
      "src/app/pages/routing/routing.page.ts",
      "src/app/pages/routing/routing.page.html",
      "src/app/pages/navigation/navigation.page.ts",
      "src/app/pages/navigation/navigation.page.scss",
    ] as const) {
      assert.ok(updatedResult.matched.includes(matchedPath), `Expected ${matchedPath} to match.`);
      const mtimeAfter = await fileModifiedTime(path.join(outDir, matchedPath));
      assert.equal(mtimeAfter, initialMtimes.get(matchedPath), `Matched file ${matchedPath} must not be rewritten.`);
    }
  } finally {
    await cleanupTestOutput(tempRoot);
  }
});

test("validation failure is atomic — invalid root leaves existing workspace untouched", async () => {
  const tempRoot = await createTestOutputDirectory();
  try {
    const outDir = path.join(tempRoot, "workspace");
    const validInput = await writeJsonFile(
      path.join(tempRoot, "inputs", "application-routing-navigation.json"),
      await applicationOnlyInput(["routing", "navigation"]),
    );
    const invalidInput = await writeJsonFile(path.join(tempRoot, "inputs", "no-root.json"), {
      version: "0.0.1",
      id: "notRoot",
      type: "html",
      children: [],
    });

    await generateIncrementally(validInput, outDir);
    const initialEmittedPaths = (await emitAngularFilesFromInput(validInput)).map((file) => file.path).sort();
    const workspaceBefore = new Map(
      await Promise.all(
        initialEmittedPaths.map(async (relativePath) => [
          relativePath,
          {
            content: await readFile(path.join(outDir, relativePath), "utf8"),
            mtime: await fileModifiedTime(path.join(outDir, relativePath)),
          },
        ] as const),
      ),
    );

    await assert.rejects(
      generateIncrementally(invalidInput, outDir),
      /root\.id: Root id must be exactly "root"\./,
    );

    for (const relativePath of initialEmittedPaths) {
      const before = workspaceBefore.get(relativePath);
      assert.ok(before, `Expected ${relativePath} in the pre-failure workspace snapshot.`);
      assert.equal(await readFile(path.join(outDir, relativePath), "utf8"), before.content);
      assert.equal(
        await fileModifiedTime(path.join(outDir, relativePath)),
        before.mtime,
        `Validation failure must not rewrite ${relativePath}.`,
      );
    }
  } finally {
    await cleanupTestOutput(tempRoot);
  }
});

test("workspace indexing ignores non-contract directories during incremental generation", async () => {
  const outDir = await createTestOutputDirectory();
  try {
    const ignoredSentinels = [
      "node_modules/example-package/index.js",
      "dist/browser/main.js",
      ".git/HEAD",
      ".angular/cache/build-cache.bin",
    ];
    for (const relativePath of ignoredSentinels) {
      const absolutePath = path.join(outDir, relativePath);
      await mkdir(path.dirname(absolutePath), { recursive: true });
      await writeFile(absolutePath, `ignored workspace artifact: ${relativePath}\n`, "utf8");
    }

    const seededWorkspace = await readWorkspaceIndex(outDir);
    assert.equal(isEmptyWorkspace(seededWorkspace), true, "Ignored directories must not make the workspace non-empty.");
    for (const ignoredPath of ignoredSentinels) {
      assert.equal(seededWorkspace.files.has(ignoredPath), false, `Expected ${ignoredPath} to be ignored by the index.`);
    }

    const emittedPaths = (await emitAngularFilesFromInput(FIXTURE)).map((file) => file.path).sort();
    const generatedResult = await generateIncrementally(FIXTURE, outDir);

    assert.deepEqual([...generatedResult.added].sort(), emittedPaths);
    assert.equal(generatedResult.modified.length, 0);
    assert.equal(generatedResult.deleted.length, 0);
    assert.equal(generatedResult.matched.length, 0);

    const noOpResult = await generateIncrementally(FIXTURE, outDir);
    assert.equal(noOpResult.added.length, 0);
    assert.equal(noOpResult.modified.length, 0);
    assert.equal(noOpResult.deleted.length, 0);
    assert.deepEqual([...noOpResult.matched].sort(), emittedPaths);

    for (const ignoredPath of ignoredSentinels) {
      const ignoredContent = await readFile(path.join(outDir, ignoredPath), "utf8");
      assert.equal(ignoredContent, `ignored workspace artifact: ${ignoredPath}\n`);
      assert.equal(generatedResult.deleted.includes(ignoredPath), false, `Initial generation must not delete ${ignoredPath}.`);
      assert.equal(noOpResult.deleted.includes(ignoredPath), false, `No-op generation must not delete ${ignoredPath}.`);
    }
  } finally {
    await cleanupTestOutput(outDir);
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
