import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";

import { run } from "../src/cli/main";
import { SpecValidationError } from "../src/validation/diagnostics";
import { validateFrameworkSpec } from "../src/validation/validate-spec";

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
    assert.match(routes, /path: 'state-model'/);
    assert.match(routes, /path: 'data-binding-model'/);
    assert.match(routes, /path: 'form-model'/);
    assert.match(routes, /path: 'component-model'/);
    assert.match(routes, /path: 'navigation-model'/);
    assert.match(routes, /path: 'feedback-model'/);
    assert.match(routes, /path: 'internationalization'/);
    assert.match(routes, /path: 'performance-requirements'/);
    assert.match(
      routes,
      /path: 'performance-requirements',[\s\S]*loadComponent: \(\) => import\('\.\/pages\/performance-requirements\/performance-requirements\.page'\)/,
    );
    assert.match(routes, /path: 'test-acceptance-criteria'/);
    assert.match(routes, /path: 'compliance-rules'/);
    assert.match(routes, /path: 'security-privacy-ui-rules'/);
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

    const i18nService = await readFile(path.join(outDir, "src/app/openui-i18n.service.ts"), "utf8");
    assert.match(i18nService, /OPENUI_I18N/);
    assert.match(i18nService, /activeLocale: "ar-EG"/);
    assert.match(i18nService, /fallbackLocales: \[/);
    assert.match(i18nService, /"ar-EG"/);
    assert.match(i18nService, /"ar"/);
    assert.match(i18nService, /"en"/);
    assert.match(i18nService, /"order.submit": "إرسال الطلب"/);
    assert.match(i18nService, /"order.cancel": "Cancel"/);
    assert.match(i18nService, /message\(key: string\)/);
    assert.match(i18nService, /textDirection\(\): 'ltr' \| 'rtl'/);

    const mainTs = await readFile(path.join(outDir, "src/main.ts"), "utf8");
    assert.match(mainTs, /LOCALE_ID/);
    assert.match(mainTs, /useValue: OPENUI_I18N\.angularLocale/);
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

    const stateModelPage = await readFile(
      path.join(outDir, "src/app/pages/state-model/state-model.page.ts"),
      "utf8",
    );
    assert.match(stateModelPage, /import \{ Component, computed, input \} from '@angular\/core';/);
    assert.match(stateModelPage, /MatChipsModule/);
    assert.match(stateModelPage, /MatFormFieldModule/);
    assert.match(stateModelPage, /MatInputModule/);
    assert.match(stateModelPage, /readonly text = input<string>\("Submit order"\);/);
    assert.match(stateModelPage, /readonly enabled = input<boolean>\(true\);/);
    assert.match(stateModelPage, /readonly visible = input<boolean>\(true\);/);
    assert.match(stateModelPage, /readonly type = input<"Default" \| "Emphasized" \| "Reject" \| "Accept">\("Default"\);/);
    assert.match(stateModelPage, /readonly valueState = input<"None" \| "Error" \| "Warning" \| "Success" \| "Information">\("None"\);/);
    assert.match(stateModelPage, /effectiveValueState = computed</);
    assert.match(stateModelPage, /publicStateInputs/);
    assert.match(stateModelPage, /property: "text"/);
    assert.match(stateModelPage, /metadataType: "string"/);
    assert.match(stateModelPage, /angularAccessor: "input<string>\(\\"Submit order\\"\)"/);
    assert.match(stateModelPage, /property: "enabled"/);
    assert.match(stateModelPage, /metadataType: "boolean"/);
    assert.match(stateModelPage, /defaultValue: "true"/);
    assert.match(stateModelPage, /hiddenStateExclusion/);
    assert.match(stateModelPage, /visibility: hidden metadata is not emitted as an Angular input/);
    assert.match(stateModelPage, /derivedStateContract/);
    assert.match(stateModelPage, /stateName: "effectiveValueState"/);
    assert.match(stateModelPage, /declaredType: "sample\.library\.ValueState"/);
    assert.match(stateModelPage, /compatibleValues: \[/);
    assert.doesNotMatch(stateModelPage, /_lastMeasuredWidth/);

    const stateModelTemplate = await readFile(
      path.join(outDir, "src/app/pages/state-model/state-model.page.html"),
      "utf8",
    );
    assert.match(stateModelTemplate, /aria-label="State model materialization"/);
    assert.match(stateModelTemplate, /aria-label="Public state input defaults"/);
    assert.match(stateModelTemplate, /\[attr\.data-openui-property\]="state\.property"/);
    assert.match(stateModelTemplate, /\[attr\.data-openui-type\]="state\.metadataType"/);
    assert.match(stateModelTemplate, /\[attr\.data-openui-default-value\]="state\.defaultValue"/);
    assert.match(stateModelTemplate, /data-openui-visibility="public"/);
    assert.match(stateModelTemplate, /data-openui-hidden-state-excluded="true"/);
    assert.match(stateModelTemplate, /Hidden state exclusion/);
    assert.match(stateModelTemplate, /data-openui-derived-state="effectiveValueState" data-openui-type="sample\.library\.ValueState"/);
    assert.match(stateModelTemplate, /Derived state remains type-compatible/);
    assert.match(stateModelTemplate, /data-openui-default-value="&quot;&quot;"/);
    assert.doesNotMatch(stateModelTemplate, /_lastMeasuredWidth/);

    const dataBindingPage = await readFile(
      path.join(outDir, "src/app/pages/data-binding-model/data-binding-model.page.ts"),
      "utf8",
    );
    assert.match(dataBindingPage, /MatFormFieldModule/);
    assert.match(dataBindingPage, /MatInputModule/);
    assert.match(dataBindingPage, /dataBindingContracts/);
    assert.match(dataBindingPage, /target: "value"/);
    assert.match(dataBindingPage, /kind: "property"/);
    assert.match(dataBindingPage, /model: "orders"/);
    assert.match(dataBindingPage, /path: "\/customer\/name"/);
    assert.match(dataBindingPage, /type: "string"/);
    assert.match(dataBindingPage, /angularBinding: "\[value\]=\\"ordersModel\.customer\.name\\""/);
    assert.match(dataBindingPage, /target: "items"/);
    assert.match(dataBindingPage, /kind: "aggregation"/);
    assert.match(dataBindingPage, /path: "\/orders"/);
    assert.match(dataBindingPage, /childType: "sample\.library\.ListItem"/);
    assert.match(dataBindingPage, /multiplicity: "0\.\.n"/);
    assert.match(dataBindingPage, /orders: ReadonlyArray<\{ id: string; title: string; quantity: number \}>/);
    assert.match(dataBindingPage, /typePreservingStatusUpdate: Promise<\{/);
    assert.match(dataBindingPage, /state: "None" \| "Success" \| "Warning" \| "Error"/);
    assert.doesNotMatch(dataBindingPage, /internalMeasurement|rendererCache/);

    const dataBindingTemplate = await readFile(
      path.join(outDir, "src/app/pages/data-binding-model/data-binding-model.page.html"),
      "utf8",
    );
    assert.match(dataBindingTemplate, /aria-label="Data binding model materialization"/);
    assert.match(dataBindingTemplate, /data-openui-binding-target="value"/);
    assert.match(dataBindingTemplate, /data-openui-binding-kind="property"/);
    assert.match(dataBindingTemplate, /data-openui-binding-model="orders"/);
    assert.match(dataBindingTemplate, /data-openui-binding-path="\/customer\/name"/);
    assert.match(dataBindingTemplate, /\[value\]="ordersModel\.customer\.name"/);
    assert.match(dataBindingTemplate, /data-openui-binding-target="items"/);
    assert.match(dataBindingTemplate, /data-openui-binding-kind="aggregation"/);
    assert.match(dataBindingTemplate, /data-openui-binding-path="\/orders"/);
    assert.match(dataBindingTemplate, /data-openui-binding-child-type="sample\.library\.ListItem"/);
    assert.match(dataBindingTemplate, /data-openui-binding-multiplicity="0\.\.n"/);
    assert.match(dataBindingTemplate, /@for \(order of ordersModel\.orders; track order\.id\)/);
    assert.match(dataBindingTemplate, /data-openui-async-update="type-preserving"/);
    assert.doesNotMatch(dataBindingTemplate, /data-openui-binding-target="internalMeasurement"/);
    assert.doesNotMatch(dataBindingTemplate, /data-openui-binding-target="rendererCache"/);

    const securityPage = await readFile(
      path.join(outDir, "src/app/pages/security-privacy-ui-rules/security-privacy-ui-rules.page.ts"),
      "utf8",
    );
    assert.match(securityPage, /MatChipsModule/);
    assert.match(securityPage, /MatDialogModule/);
    assert.match(securityPage, /MatFormFieldModule/);
    assert.match(securityPage, /MatInputModule/);
    assert.match(securityPage, /securityContracts/);
    assert.match(securityPage, /allowedUrlSchemes: \[\n\s+"http:",\n\s+"https:",\n\s+"mailto:"/);
    assert.match(securityPage, /validateAllowedUrl\(value: string\): string \| null/);
    assert.match(securityPage, /displayedSensitiveValue\(\): string/);
    assert.match(securityPage, /return this\.revealSensitiveValue \? this\.sensitiveValue : this\.sensitiveValueMask/);
    assert.match(securityPage, /protected readonly canDeleteOrder = false/);
    assert.match(securityPage, /protected requestDeleteConfirmation\(\): void \{\n\s+if \(!this\.canDeleteOrder\) \{\n\s+return;/);
    assert.match(securityPage, /\.open\(this\.deleteConfirmationDialog\(\), \{\n\s+ariaDescribedBy: "security-privacy-ui-rules-delete-confirmation-description"/);
    assert.match(securityPage, /role: "alertdialog"/);
    assert.match(securityPage, /\.afterClosed\(\)/);
    assert.match(securityPage, /protected completeDeleteAfterConfirmation\(confirmed: boolean\): void \{\n\s+if \(!confirmed \|\| !this\.canDeleteOrder\) \{\n\s+return;/);
    assert.doesNotMatch(securityPage, /bypassSecurityTrust|DomSanitizer|Renderer2|ElementRef/);

    const securityTemplate = await readFile(
      path.join(outDir, "src/app/pages/security-privacy-ui-rules/security-privacy-ui-rules.page.html"),
      "utf8",
    );
    assert.match(securityTemplate, /aria-label="Security and privacy UI materialization"/);
    assert.match(securityTemplate, /{{ untrustedDisplayText }}/);
    assert.match(securityTemplate, /\[href\]="validatedSupportHref"/);
    assert.match(securityTemplate, /data-openui-url-allow-list="http,https,mailto"/);
    assert.match(securityTemplate, /data-openui-url-rejected="true"/);
    assert.match(securityTemplate, /data-openui-masking-default="masked"/);
    assert.match(securityTemplate, /\[value\]="displayedSensitiveValue"/);
    assert.match(securityTemplate, /\(click\)="toggleSensitiveReveal\(\)"/);
    assert.match(securityTemplate, /@if \(canDeleteOrder\)/);
    assert.match(securityTemplate, /aria-haspopup="dialog"/);
    assert.match(securityTemplate, /data-openui-confirmation-required="true"/);
    assert.match(securityTemplate, /data-openui-permission-gate="canDeleteOrder"/);
    assert.match(securityTemplate, /mat-dialog-title/);
    assert.match(securityTemplate, /mat-dialog-content/);
    assert.match(securityTemplate, /\[mat-dialog-close\]="true"/);
    assert.match(securityTemplate, /data-openui-permission-gate="omitted"/);
    assert.doesNotMatch(securityTemplate, /\[innerHTML\]|\[outerHTML\]|srcdoc|\[style\]|javascript:/);

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

    const internationalizationPage = await readFile(
      path.join(outDir, "src/app/pages/internationalization/internationalization.page.ts"),
      "utf8",
    );
    assert.match(internationalizationPage, /OpenUiI18nService/);
    assert.match(internationalizationPage, /OPENUI_I18N/);
    assert.match(internationalizationPage, /CurrencyPipe/);
    assert.match(internationalizationPage, /DatePipe/);
    assert.match(internationalizationPage, /DecimalPipe/);
    assert.match(internationalizationPage, /orderTotal = 1234\.5/);

    const internationalizationTemplate = await readFile(
      path.join(outDir, "src/app/pages/internationalization/internationalization.page.html"),
      "utf8",
    );
    assert.match(internationalizationTemplate, /aria-label="Internationalization materialization"/);
    assert.match(internationalizationTemplate, /data-openui-message-key="order.submit"/);
    assert.match(internationalizationTemplate, /i18n\.message\('order.submit'\)/);
    assert.match(internationalizationTemplate, /i18n\.message\('order.cancel'\)/);
    assert.match(internationalizationTemplate, /i18n\.fallbackChain\(\)\.join/);
    assert.match(internationalizationTemplate, /\[attr\.dir\]="i18n\.textDirection\(\)"/);
    assert.match(internationalizationTemplate, /\[attr\.lang\]="i18n\.activeLocale"/);
    assert.match(internationalizationTemplate, /number:'1\.1-1':i18n\.angularLocale/);
    assert.match(internationalizationTemplate, /currency:'USD':'symbol':'1\.2-2':i18n\.angularLocale/);
    assert.match(internationalizationTemplate, /date:'mediumDate':undefined:i18n\.angularLocale/);

    const internationalizationStyles = await readFile(
      path.join(outDir, "src/app/pages/internationalization/internationalization.page.scss"),
      "utf8",
    );
    assert.match(internationalizationStyles, /\.internationalization-example\[dir='rtl'\]/);

    const performancePage = await readFile(
      path.join(outDir, "src/app/pages/performance-requirements/performance-requirements.page.ts"),
      "utf8",
    );
    assert.match(performancePage, /ScrollingModule/);
    assert.match(performancePage, /MatChipsModule/);
    assert.match(performancePage, /lazyDetailContract/);
    assert.match(performancePage, /detailLoading: "loadComponent"/);
    assert.match(performancePage, /routePath: "performance-requirements"/);
    assert.match(performancePage, /projectionCache/);
    assert.match(performancePage, /identity: "sample\.library@1\.4\.0#api-json"/);
    assert.match(performancePage, /immutable: true/);
    assert.match(performancePage, /virtualizationBudget/);
    assert.match(performancePage, /materialPrimitive: "cdk-virtual-scroll-viewport"/);
    assert.match(performancePage, /initialMaterializationBudget: 20/);
    assert.match(performancePage, /protected readonly virtualRows: Array<\{ id: string; customer: string; total: string \}>/);
    assert.match(performancePage, /trackVirtualOrder\(_index: number, order: \{ id: string \}\): string/);

    const performanceTemplate = await readFile(
      path.join(outDir, "src/app/pages/performance-requirements/performance-requirements.page.html"),
      "utf8",
    );
    assert.match(performanceTemplate, /aria-label="Performance requirements materialization"/);
    assert.match(performanceTemplate, /aria-label="Lazy detail loading"/);
    assert.match(performanceTemplate, /\[attr\.data-openui-lazy-route\]="lazyDetailContract\.routePath"/);
    assert.match(performanceTemplate, /\[attr\.data-openui-detail-loading\]="lazyDetailContract\.detailLoading"/);
    assert.match(performanceTemplate, /loadComponent/);
    assert.match(performanceTemplate, /\[attr\.data-openui-projection-cache-key\]="projectionCache\.identity"/);
    assert.match(performanceTemplate, /\[attr\.data-openui-projection-immutable\]="projectionCache\.immutable"/);
    assert.match(performanceTemplate, /<cdk-virtual-scroll-viewport/);
    assert.match(performanceTemplate, /\*cdkVirtualFor="let row of virtualRows; trackBy: trackVirtualOrder"/);
    assert.match(performanceTemplate, /\[attr\.data-openui-materialization-budget\]="virtualizationBudget\.initialMaterializationBudget"/);
    assert.match(performanceTemplate, /\[attr\.data-openui-child-type\]="virtualizationBudget\.childType"/);

    const performanceStyles = await readFile(
      path.join(outDir, "src/app/pages/performance-requirements/performance-requirements.page.scss"),
      "utf8",
    );
    assert.match(performanceStyles, /\.performance-viewport/);
    assert.match(performanceStyles, /height: 240px/);

    const compliancePage = await readFile(
      path.join(outDir, "src/app/pages/compliance-rules/compliance-rules.page.ts"),
      "utf8",
    );
    assert.match(compliancePage, /MatChipsModule/);
    assert.match(compliancePage, /complianceContracts/);
    assert.match(compliancePage, /catalogRoot: "library-catalog-root"/);
    assert.match(compliancePage, /component: "sample\.library\.Button"/);
    assert.match(compliancePage, /"properties",\n\s+"aggregations",\n\s+"associations",\n\s+"events",\n\s+"defaults",\n\s+"visibility",\n\s+"capability metadata"/);
    assert.match(compliancePage, /area: "generated examples"/);
    assert.match(compliancePage, /area: "security\/privacy"/);
    assert.match(compliancePage, /area: "extension"/);
    assert.match(compliancePage, /missing catalog entry identifies section and traversal node/);

    const complianceTemplate = await readFile(
      path.join(outDir, "src/app/pages/compliance-rules/compliance-rules.page.html"),
      "utf8",
    );
    assert.match(complianceTemplate, /aria-label="Compliance rules materialization"/);
    assert.match(complianceTemplate, /data-openui-compliance-section="21-compliance-rules"/);
    assert.match(complianceTemplate, /Catalog discoverability and public component resolution/);
    assert.match(complianceTemplate, /\[attr\.data-openui-catalog-root\]="complianceContracts\.catalogDiscoverability\.catalogRoot"/);
    assert.match(complianceTemplate, /aria-label="Metadata completeness gate"/);
    assert.match(complianceTemplate, /\[attr\.data-openui-component\]="complianceContracts\.metadataCompleteness\.component"/);
    assert.match(complianceTemplate, /aria-label="Synchronized cross-cutting evidence"/);
    assert.match(complianceTemplate, /\[attr\.data-openui-evidence-area\]="evidence\.area"/);
    assert.match(complianceTemplate, /aria-label="Generator compliance diagnostics"/);

    const complianceStyles = await readFile(
      path.join(outDir, "src/app/pages/compliance-rules/compliance-rules.page.scss"),
      "utf8",
    );
    assert.match(complianceStyles, /\.compliance-rules-example/);
    assert.match(complianceStyles, /\.compliance-metadata dt/);

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

test("validates compliance catalog, metadata, and evidence materialization", async () => {
  const fixture = JSON.parse(await readFile(FIXTURE, "utf8"));
  const sections = fixture.specification.sections as Array<{
    id: string;
    tags?: Array<{ name?: string; meaning?: string }>;
    examples?: Array<{ title?: string; description?: string }>;
  }>;
  const complianceSection = sections.find((section) => section.id === "21-compliance-rules");
  assert.ok(complianceSection);

  fixture.specification.traversal.nodes = fixture.specification.traversal.nodes.filter(
    (node: { id?: string }) => node.id !== "library-component-catalog",
  );
  complianceSection.tags = complianceSection.tags?.filter((tag) => tag.name !== "metadata-completeness");
  complianceSection.examples = complianceSection.examples?.filter(
    (example) => !example.title?.includes("Cross-cutting evidence"),
  );

  assert.throws(
    () => validateFrameworkSpec(fixture),
    (error) => {
      assert.ok(error instanceof SpecValidationError);
      assert.match(error.message, /missing required tag 'metadata-completeness'/);
      assert.match(error.message, /missing synchronized evidence example 'Cross-cutting evidence'/);
      assert.match(error.message, /missing traversal node 'library-component-catalog'/);
      return true;
    },
  );
});
