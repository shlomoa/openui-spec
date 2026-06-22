import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";

import { run } from "../src/cli/main";

const FIXTURE = path.resolve("tests/fixtures/minimal-openui.json");

test("generates an Angular Material standalone app from the specification", async () => {
  const outDir = await mkdtemp(path.join(tmpdir(), "openui-angular-generator-"));
  try {
    await run(["generate", "--spec", FIXTURE, "--out", outDir]);

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
    assert.match(routes, /path: 'ui-concept-model'/);
    assert.match(routes, /path: 'application-structure'/);
    assert.match(routes, /path: 'layout-system'/);
    assert.match(routes, /path: 'interaction-model'/);
    assert.match(routes, /path: 'form-model'/);
    assert.match(routes, /path: 'component-model'/);
    assert.match(routes, /path: 'navigation-model'/);
    assert.match(routes, /path: 'feedback-model'/);
    assert.match(routes, /path: 'test-acceptance-criteria'/);
    assert.match(routes, /path: 'reference-examples'/);

    const appComponent = await readFile(path.join(outDir, "src/app/app.component.ts"), "utf8");
    assert.match(appComponent, /APPLICATION_STRUCTURE/);
    assert.match(appComponent, /MatSidenavModule/);
    assert.match(appComponent, /Root component: {{ applicationStructure\.rootComponent }}/);
    assert.match(appComponent, /routerLink="\/form-model"/);

    const applicationStructureModel = await readFile(
      path.join(outDir, "src/app/application-structure.model.ts"),
      "utf8",
    );
    assert.match(applicationStructureModel, /rootComponent/);
    assert.match(applicationStructureModel, /openui-root/);
    assert.match(applicationStructureModel, /@angular\/material\/toolbar/);
    assert.match(applicationStructureModel, /MatSidenavContainer/);
    assert.match(applicationStructureModel, /ApplicationStructurePage/);
    assert.match(applicationStructureModel, /LayoutSystemPage/);
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
});

test("generates section-specific Angular Material details for implemented specs", async () => {
  const outDir = await mkdtemp(path.join(tmpdir(), "openui-angular-generator-"));
  try {
    await run(["generate", "--spec", FIXTURE, "--out", outDir]);

    const uiConceptPage = await readFile(
      path.join(outDir, "src/app/pages/ui-concept-model/ui-concept-model.page.ts"),
      "utf8",
    );
    assert.match(uiConceptPage, /MatChipsModule/);
    assert.match(uiConceptPage, /uiConceptBlocks/);
    assert.match(uiConceptPage, /uiConceptRegions/);
    assert.match(uiConceptPage, /uiConceptRelationships/);

    const uiConceptTemplate = await readFile(
      path.join(outDir, "src/app/pages/ui-concept-model/ui-concept-model.page.html"),
      "utf8",
    );
    assert.match(uiConceptTemplate, /aria-label="UI concept model materialization"/);
    assert.match(uiConceptTemplate, /Controls and elements/);
    assert.match(uiConceptTemplate, /Named regions and actions/);
    assert.match(uiConceptTemplate, /Form control owns FormContainer/);
    assert.match(uiConceptTemplate, /Dialog control owns content/);
    assert.match(uiConceptTemplate, /aggregation owns child content/);
    assert.match(uiConceptTemplate, /association references labelled-by controls/);

    const applicationStructurePage = await readFile(
      path.join(outDir, "src/app/pages/application-structure/application-structure.page.ts"),
      "utf8",
    );
    assert.match(applicationStructurePage, /MatChipsModule/);
    assert.match(applicationStructurePage, /applicationDependencies/);
    assert.match(applicationStructurePage, /shellRegions/);
    assert.match(applicationStructurePage, /pageHierarchy/);

    const applicationStructureTemplate = await readFile(
      path.join(outDir, "src/app/pages/application-structure/application-structure.page.html"),
      "utf8",
    );
    assert.match(applicationStructureTemplate, /aria-label="Application structure materialization"/);
    assert.match(applicationStructureTemplate, /Explicit library dependencies/);
    assert.match(applicationStructureTemplate, /Root component resolution/);
    assert.match(applicationStructureTemplate, /mat-sidenav-container owns mat-sidenav navigation/);
    assert.match(applicationStructureTemplate, /router-outlet resolves page hierarchy nodes/);

    const layoutPage = await readFile(
      path.join(outDir, "src/app/pages/layout-system/layout-system.page.ts"),
      "utf8",
    );
    assert.match(layoutPage, /CdkDrag/);
    assert.match(layoutPage, /CdkDropList/);
    assert.match(layoutPage, /MatToolbarModule/);
    assert.match(layoutPage, /layoutRegions/);
    assert.match(layoutPage, /aggregation: "content"/);
    assert.match(layoutPage, /multiple: true/);
    assert.match(layoutPage, /ordered: true/);
    assert.match(layoutPage, /dragDrop: null/);
    assert.match(layoutPage, /dragDrop: \{\n\s+draggable: true,\n\s+droppable: true,\n\s+layout: "Horizontal"/);
    assert.match(layoutPage, /dragDropRegions = this\.layoutRegions\.filter\(\(region\) => region\.dragDrop !== null\)/);

    const layoutTemplate = await readFile(
      path.join(outDir, "src/app/pages/layout-system/layout-system.page.html"),
      "utf8",
    );
    assert.match(layoutTemplate, /aria-label="Layout system materialization"/);
    assert.match(layoutTemplate, /data-openui-region="header" data-openui-aggregation="header"/);
    assert.match(layoutTemplate, /data-openui-region="content" data-openui-aggregation="content"/);
    assert.match(layoutTemplate, /@for \(item of orderedContent; track item\)/);
    assert.match(layoutTemplate, /data-openui-region="columns" data-openui-aggregation="columns" cdkDropList/);
    assert.match(layoutTemplate, /<mat-card class="layout-board-column" cdkDrag>/);
    assert.doesNotMatch(layoutTemplate, /data-openui-region="header"[^\n]*cdkDropList/);
    assert.doesNotMatch(layoutTemplate, /data-openui-region="content"[^\n]*cdkDropList/);
    assert.doesNotMatch(layoutTemplate, /data-openui-region="footer"[^\n]*cdkDropList/);

    const layoutStyles = await readFile(
      path.join(outDir, "src/app/pages/layout-system/layout-system.page.scss"),
      "utf8",
    );
    assert.match(layoutStyles, /--layout-gap: var\(--openui-spacing-4\)/);
    assert.match(layoutStyles, /--layout-control-height: var\(--openui-density-cozy-control-height\)/);
    assert.match(layoutStyles, /\.layout-density--compact/);
    assert.match(layoutStyles, /@media \(max-width: 599px\)/);
    assert.match(layoutStyles, /@media \(min-width: 1024px\)/);
    assert.match(layoutStyles, /grid-template-areas:\n\s+"header header"\n\s+"content footer"/);

    const globalStyles = await readFile(path.join(outDir, "src/styles.scss"), "utf8");
    assert.match(globalStyles, /--openui-spacing-4: 1rem/);
    assert.match(globalStyles, /--openui-density-compact-control-height: 2rem/);

    const formPage = await readFile(
      path.join(outDir, "src/app/pages/form-model/form-model.page.ts"),
      "utf8",
    );
    assert.match(formPage, /ReactiveFormsModule/);
    assert.match(formPage, /MatFormFieldModule/);
    assert.match(formPage, /MatListModule/);

    const formTemplate = await readFile(
      path.join(outDir, "src/app/pages/form-model/form-model.page.html"),
      "utf8",
    );
    assert.match(formTemplate, /<mat-list aria-label="Key requirements">/);
    assert.match(formTemplate, /<mat-list-item>/);
    assert.doesNotMatch(formTemplate, /<ul>|<li>/);

    const feedbackPage = await readFile(
      path.join(outDir, "src/app/pages/feedback-model/feedback-model.page.ts"),
      "utf8",
    );
    assert.match(feedbackPage, /MatSnackBarModule/);
    assert.match(feedbackPage, /showFeedback\(\)/);

    const componentPage = await readFile(
      path.join(outDir, "src/app/pages/component-model/component-model.page.ts"),
      "utf8",
    );
    assert.match(componentPage, /MatChipsModule/);
    assert.match(componentPage, /componentContract/);

    const componentTemplate = await readFile(
      path.join(outDir, "src/app/pages/component-model/component-model.page.html"),
      "utf8",
    );
    assert.match(componentTemplate, /aria-label="Component metadata contract"/);
    assert.match(componentTemplate, /sample\.library\.SearchInput/);
    assert.match(componentTemplate, /liveChange\(value: string\)/);

    const interactionPage = await readFile(
      path.join(outDir, "src/app/pages/interaction-model/interaction-model.page.ts"),
      "utf8",
    );
    assert.match(interactionPage, /MatChipsModule/);
    assert.match(interactionPage, /eventName: "press"/);
    assert.match(interactionPage, /owner: "sample\.library\.Button"/);
    assert.match(interactionPage, /kind: "activation"/);
    assert.match(interactionPage, /angularMaterialBinding: "\(click\)=\\"handlePressActivation\(\)\\""/);
    assert.match(interactionPage, /enabledPrecondition: "isActionEnabled === true"/);
    assert.match(interactionPage, /handlerPath: "handlePressActivation"/);
    assert.match(interactionPage, /sources: \[\n\s+"pointer",\n\s+"touch",\n\s+"keyboard",\n\s+"assistive-technology"/);
    assert.match(interactionPage, /protected handlePressActivation\(\): void \{\n\s+if \(!this\.isActionEnabled\) \{\n\s+return;\n\s+\}/);
    assert.doesNotMatch(interactionPage, /KeyboardEvent|PointerEvent|TouchEvent|Renderer2|ElementRef/);

    const interactionTemplate = await readFile(
      path.join(outDir, "src/app/pages/interaction-model/interaction-model.page.html"),
      "utf8",
    );
    assert.match(interactionTemplate, /aria-label="Interaction model materialization"/);
    assert.match(interactionTemplate, /data-openui-event="press"/);
    assert.match(interactionTemplate, /data-openui-event-kind="activation"/);
    assert.match(interactionTemplate, /data-openui-enabled-required="true"/);
    assert.match(interactionTemplate, /\[disabled\]="!isActionEnabled"/);
    assert.match(interactionTemplate, /\(click\)="handlePressActivation\(\)"/);
    assert.match(interactionTemplate, /pointer, touch, keyboard, and assistive-technology activation/);
    assert.match(interactionTemplate, /{{ activationEvent\.handlerPath }}/);
    assert.doesNotMatch(interactionTemplate, /\(keydown\)|\(keyup\)|\(pointerdown\)|\(pointerup\)|\(touchstart\)|\(touchend\)/);

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

    const acceptancePage = await readFile(
      path.join(outDir, "src/app/pages/test-acceptance-criteria/test-acceptance-criteria.page.ts"),
      "utf8",
    );
    assert.match(acceptancePage, /MatChipsModule/);

    const acceptanceTemplate = await readFile(
      path.join(outDir, "src/app/pages/test-acceptance-criteria/test-acceptance-criteria.page.html"),
      "utf8",
    );
    assert.match(acceptanceTemplate, /aria-label="Acceptance criteria workflow"/);
    assert.match(acceptanceTemplate, /Traceability matrix/);
    assert.match(acceptanceTemplate, /Generated acceptance checks/);

    const referencePage = await readFile(
      path.join(outDir, "src/app/pages/reference-examples/reference-examples.page.ts"),
      "utf8",
    );
    assert.match(referencePage, /MatChipsModule/);
    assert.match(referencePage, /referenceProperties/);

    const referenceTemplate = await readFile(
      path.join(outDir, "src/app/pages/reference-examples/reference-examples.page.html"),
      "utf8",
    );
    assert.match(referenceTemplate, /Reference action component example/);
    assert.match(referenceTemplate, /press activation event/);
    assert.match(referenceTemplate, /aria-describedby="reference-examples-description"/);
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
});
