import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";

import { run } from "../src/cli/main.js";

const FIXTURE = path.resolve("tests/fixtures/minimal-openui.json");

test("generates an Angular Material standalone app from the specification", async () => {
  const outDir = await mkdtemp(path.join(tmpdir(), "openui-angular-generator-"));
  try {
    await run(["generate", "--spec", FIXTURE, "--out", outDir]);

    const packageJson = JSON.parse(await readFile(path.join(outDir, "package.json"), "utf8")) as {
      dependencies: Record<string, string>;
    };
    assert.equal(packageJson.dependencies["@angular/material"], "22.0.2");
    assert.equal(packageJson.dependencies["@angular/core"], "22.0.2");

    const routes = await readFile(path.join(outDir, "src/app/app.routes.ts"), "utf8");
    assert.match(routes, /path: 'form-model'/);
    assert.match(routes, /path: 'navigation-model'/);
    assert.match(routes, /path: 'feedback-model'/);

    const appComponent = await readFile(path.join(outDir, "src/app/app.component.ts"), "utf8");
    assert.match(appComponent, /MatSidenavModule/);
    assert.match(appComponent, /routerLink="\/form-model"/);
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
});

test("generates section-specific Angular Material details for implemented specs", async () => {
  const outDir = await mkdtemp(path.join(tmpdir(), "openui-angular-generator-"));
  try {
    await run(["generate", "--spec", FIXTURE, "--out", outDir]);

    const formPage = await readFile(
      path.join(outDir, "src/app/pages/form-model/form-model.page.ts"),
      "utf8",
    );
    assert.match(formPage, /ReactiveFormsModule/);
    assert.match(formPage, /MatFormFieldModule/);

    const feedbackPage = await readFile(
      path.join(outDir, "src/app/pages/feedback-model/feedback-model.page.ts"),
      "utf8",
    );
    assert.match(feedbackPage, /MatSnackBarModule/);
    assert.match(feedbackPage, /showFeedback\(\)/);

    const accessibilityTemplate = await readFile(
      path.join(outDir, "src/app/pages/accessibility-model/accessibility-model.page.html"),
      "utf8",
    );
    assert.match(accessibilityTemplate, /aria-labelledby="accessibility-model-title"/);
    assert.match(accessibilityTemplate, /keyboard-visible focus states/);

    const themeStyles = await readFile(
      path.join(outDir, "src/app/pages/theming-design-tokens/theming-design-tokens.page.scss"),
      "utf8",
    );
    assert.match(themeStyles, /--openui-section-accent: var\(--openui-theme-primary\)/);
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
});
