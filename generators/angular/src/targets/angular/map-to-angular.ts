import type { UiApplication, UiPage } from "../../ir/ui-model";
import type {
  AngularApplicationStructureModel,
  AngularPageModel,
  AngularProjectModel,
} from "./angular-model";

export function mapToAngularProject(uiModel: UiApplication): AngularProjectModel {
  const pages = uiModel.pages.map(mapPage);
  return {
    appName: uiModel.name,
    packageName: toPackageName(uiModel.name),
    version: uiModel.version,
    pages,
    themeTokens: uiModel.themeTokens,
    applicationStructure: uiModel.pages.some((page) => page.features.includes("application-structure"))
      ? buildApplicationStructure(pages)
      : undefined,
  };
}

function mapPage(page: UiPage): AngularPageModel {
  const className = `${toPascalCase(page.route)}Page`;
  const imports = new Set(["CommonModule", "MatCardModule", "MatButtonModule", "MatListModule"]);
  const componentImports = new Set([
    "import { CommonModule } from '@angular/common';",
    "import { Component } from '@angular/core';",
    "import { MatButtonModule } from '@angular/material/button';",
    "import { MatCardModule } from '@angular/material/card';",
    "import { MatListModule } from '@angular/material/list';",
  ]);
  const constructorParameters: string[] = [];
  const members: string[] = [];
  const contractItems = buildComponentContractItems(page);

  if (page.features.includes("form")) {
    imports.add("ReactiveFormsModule");
    imports.add("MatFormFieldModule");
    imports.add("MatInputModule");
    componentImports.add("import { ReactiveFormsModule, FormControl } from '@angular/forms';");
    componentImports.add("import { MatFormFieldModule } from '@angular/material/form-field';");
    componentImports.add("import { MatInputModule } from '@angular/material/input';");
    members.push("readonly sampleControl = new FormControl('');");
  }

  if (page.features.includes("navigation")) {
    imports.add("RouterLink");
    imports.add("MatListModule");
    componentImports.add("import { RouterLink } from '@angular/router';");
    componentImports.add("import { MatListModule } from '@angular/material/list';");
  }

  if (page.features.includes("feedback")) {
    imports.add("MatSnackBarModule");
    componentImports.add("import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';");
    constructorParameters.push("private readonly snackBar: MatSnackBar");
    members.push("showFeedback(): void { this.snackBar.open('OpenUI feedback action', 'Dismiss', { duration: 3000 }); }");
  }

  if (page.features.includes("acceptance")) {
    imports.add("MatChipsModule");
    componentImports.add("import { MatChipsModule } from '@angular/material/chips';");
  }

  if (page.features.includes("component")) {
    imports.add("MatChipsModule");
    componentImports.add("import { MatChipsModule } from '@angular/material/chips';");
    members.push(`protected readonly componentContract = ${toTypeScriptStringArray(contractItems)};`);
  }

  if (page.features.includes("interaction")) {
    imports.add("MatChipsModule");
    componentImports.add("import { MatChipsModule } from '@angular/material/chips';");
    members.push(`protected readonly activationEvent = ${toTypeScriptLiteral(buildActivationEventContract())} as const;`);
    members.push("protected isActionEnabled = true;");
    members.push("protected pressActivations = 0;");
    members.push(`protected handlePressActivation(): void {
    if (!this.isActionEnabled) {
      return;
    }

    this.pressActivations += 1;
  }`);
  }

  if (page.features.includes("layout")) {
    imports.add("CdkDrag");
    imports.add("CdkDropList");
    imports.add("MatChipsModule");
    imports.add("MatToolbarModule");
    componentImports.add("import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';");
    componentImports.add("import { MatChipsModule } from '@angular/material/chips';");
    componentImports.add("import { MatToolbarModule } from '@angular/material/toolbar';");
    members.push(`protected readonly layoutRegions = ${toTypeScriptLiteral(buildLayoutRegions())};`);
    members.push("protected readonly orderedContent = ['Summary card', 'Metrics card', 'Activity card'];");
    members.push("protected readonly layoutBoardColumns = ['Backlog', 'In progress', 'Done'];");
    members.push(
      "protected readonly dragDropRegions = this.layoutRegions.filter((region) => region.dragDrop !== null);",
    );
  }

  if (page.features.includes("application-structure")) {
    imports.add("MatChipsModule");
    componentImports.add("import { MatChipsModule } from '@angular/material/chips';");
    members.push(
      "protected readonly applicationDependencies = ['@angular/material/toolbar: shell header', '@angular/material/sidenav: navigation container', '@angular/router: routed content outlet'];",
    );
    members.push("protected readonly shellRegions = ['header', 'navigation', 'content'];");
    members.push(
      "protected readonly pageHierarchy = ['openui-root', 'application-structure route', 'nested routed specification pages'];",
    );
  }

  if (page.features.includes("ui-concept")) {
    imports.add("MatChipsModule");
    componentImports.add("import { MatChipsModule } from '@angular/material/chips';");
    members.push(
      "protected readonly uiConceptBlocks = ['Control: sample.library.Page', 'Control: sample.library.Button', 'Element: sample.library.FormElement'];",
    );
    members.push("protected readonly uiConceptRegions = ['header', 'content', 'footer', 'actions'];");
    members.push(
      "protected readonly uiConceptRelationships = ['aggregation owns child content', 'association references labelled-by controls'];",
    );
  }

  if (page.features.includes("reference")) {
    imports.add("MatChipsModule");
    componentImports.add("import { MatChipsModule } from '@angular/material/chips';");
    members.push("protected readonly referenceProperties = ['text', 'type', 'enabled', 'icon', 'ariaHasPopup'];");
  }

  return {
    id: page.id,
    route: page.route,
    title: page.title,
    className,
    selector: `openui-${page.route}`,
    fileName: `${page.route}.page`,
    summary: page.summary,
    requirements: page.requirements,
    imports: Array.from(imports),
    componentImports: Array.from(componentImports).sort(),
    constructorParameters,
    members,
    template: buildTemplate(page),
    styles: buildStyles(page),
  };
}

function buildTemplate(page: UiPage): string {
  const titleId = `${page.route}-title`;
  const requirementItems = page.requirements
    .slice(0, 4)
    .map((requirement) => `      <mat-list-item>${escapeHtml(requirement)}</mat-list-item>`)
    .join("\n");
  const requirements = requirementItems
    ? `\n    <mat-list aria-label="Key requirements">\n${requirementItems}\n    </mat-list>`
    : "";
  const accessibility = page.features.includes("accessibility")
    ? '\n    <p class="accessibility-note">Generated regions include semantic labels and keyboard-visible focus states.</p>'
    : "";
  const form = page.features.includes("form")
    ? '\n    <mat-form-field appearance="outline">\n      <mat-label>Sample field</mat-label>\n      <input matInput [formControl]="sampleControl" />\n    </mat-form-field>'
    : "";
  const navigation = page.features.includes("navigation")
    ? '\n    <mat-nav-list aria-label="Specification navigation example">\n      <a mat-list-item routerLink="/">Application shell route</a>\n    </mat-nav-list>'
    : "";
  const feedback = page.features.includes("feedback")
    ? '\n    <button mat-raised-button color="primary" type="button" (click)="showFeedback()">Show feedback</button>'
    : "";
  const acceptance = page.features.includes("acceptance") ? buildAcceptanceTemplate() : "";
  const applicationStructure = page.features.includes("application-structure")
    ? buildApplicationStructureTemplate()
    : "";
  const component = page.features.includes("component") ? buildComponentTemplate(page) : "";
  const interaction = page.features.includes("interaction") ? buildInteractionTemplate(page) : "";
  const layout = page.features.includes("layout") ? buildLayoutTemplate(page) : "";
  const uiConcept = page.features.includes("ui-concept") ? buildUiConceptTemplate() : "";
  const reference = page.features.includes("reference")
    ? `\n    <div class="reference-example" aria-label="Reference action component example">
      <button mat-raised-button color="primary" type="button" aria-describedby="${page.route}-description">
        Save order
      </button>
      <p id="${page.route}-description">
        The reference action component preserves public properties, accessibility associations, and the press activation event.
      </p>
      <mat-chip-set aria-label="Reference public properties">
        @for (property of referenceProperties; track property) {
          <mat-chip>{{ property }}</mat-chip>
        }
      </mat-chip-set>
    </div>`
    : "";

  return `<section class="spec-page" aria-labelledby="${titleId}">
  <mat-card>
    <mat-card-header>
      <mat-card-title id="${titleId}">${escapeHtml(page.title)}</mat-card-title>
      <mat-card-subtitle>${escapeHtml(page.id)}</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <p>${escapeHtml(page.summary)}</p>${requirements}${form}${navigation}${feedback}${acceptance}${applicationStructure}${component}${interaction}${layout}${uiConcept}${reference}${accessibility}
    </mat-card-content>
  </mat-card>
</section>
`;
}

function buildStyles(page: UiPage): string {
  const themeStyles = page.features.includes("theme")
    ? "\n:host {\n  --openui-section-accent: var(--openui-theme-primary);\n}\n"
    : "";
  const acceptanceStyles = page.features.includes("acceptance") ? buildAcceptanceStyles() : "";
  const applicationStructureStyles = page.features.includes("application-structure")
    ? buildApplicationStructureStyles()
    : "";
  const componentStyles = page.features.includes("component") ? buildComponentStyles() : "";
  const interactionStyles = page.features.includes("interaction") ? buildInteractionStyles() : "";
  const layoutStyles = page.features.includes("layout") ? buildLayoutStyles() : "";
  const uiConceptStyles = page.features.includes("ui-concept") ? buildUiConceptStyles() : "";
  return `.spec-page {
  display: block;
  padding: 1rem;
}

mat-card {
  background: var(--openui-theme-surface);
  color: var(--openui-theme-on-surface);
}

.reference-example {
  display: grid;
  gap: 0.75rem;
  justify-items: start;
  margin-top: 1rem;
}
${themeStyles}${acceptanceStyles}${applicationStructureStyles}${componentStyles}${interactionStyles}${layoutStyles}${uiConceptStyles}`;
}

function buildActivationEventContract(): {
  eventName: string;
  owner: string;
  kind: string;
  angularMaterialBinding: string;
  enabledPrecondition: string;
  handlerPath: string;
  sources: string[];
} {
  return {
    eventName: "press",
    owner: "sample.library.Button",
    kind: "activation",
    angularMaterialBinding: '(click)="handlePressActivation()"',
    enabledPrecondition: "isActionEnabled === true",
    handlerPath: "handlePressActivation",
    sources: ["pointer", "touch", "keyboard", "assistive-technology"],
  };
}

function buildInteractionTemplate(page: UiPage): string {
  return `
    <section class="interaction-model-example" aria-label="Interaction model materialization">
      <h2>Semantic activation event</h2>
      <button
        mat-raised-button
        color="primary"
        type="button"
        [disabled]="!isActionEnabled"
        (click)="handlePressActivation()"
        aria-describedby="${page.route}-activation-contract"
        data-openui-event="press"
        data-openui-event-kind="activation"
        data-openui-enabled-required="true"
      >
        Save order
      </button>
      <p id="${page.route}-activation-contract">
        The public press activation event maps to one Angular Material button binding. Native button and Material behavior keep pointer, touch, keyboard, and assistive-technology activation on the same enabled control path.
      </p>
      <mat-chip-set aria-label="Activation event sources">
        @for (source of activationEvent.sources; track source) {
          <mat-chip>{{ source }}</mat-chip>
        }
      </mat-chip-set>
      <dl>
        <div>
          <dt>Public event</dt>
          <dd>{{ activationEvent.eventName }}</dd>
        </div>
        <div>
          <dt>Owner</dt>
          <dd>{{ activationEvent.owner }}</dd>
        </div>
        <div>
          <dt>Handler path</dt>
          <dd>{{ activationEvent.handlerPath }}</dd>
        </div>
        <div>
          <dt>Enabled gate</dt>
          <dd>{{ activationEvent.enabledPrecondition }}</dd>
        </div>
      </dl>
    </section>`;
}

function buildInteractionStyles(): string {
  return `
.interaction-model-example {
  border: 1px solid var(--openui-theme-primary);
  border-radius: 0.75rem;
  display: grid;
  gap: 1rem;
  justify-items: start;
  margin-top: 1rem;
  padding: 1rem;
}

.interaction-model-example h2,
.interaction-model-example dl {
  margin: 0;
}

.interaction-model-example dl {
  display: grid;
  gap: 0.5rem;
}

.interaction-model-example dt {
  color: var(--openui-theme-primary);
  font-weight: 600;
}

.interaction-model-example dd {
  margin: 0;
}
`;
}

function buildLayoutRegions(): Array<{
  name: string;
  aggregation: string;
  owner: string;
  childType: string;
  multiple: boolean;
  ordered: boolean;
  materialPrimitive: string;
  dragDrop: { draggable: boolean; droppable: boolean; layout: string } | null;
}> {
  return [
    {
      name: "header",
      aggregation: "header",
      owner: "sample.layout.Page",
      childType: "sap.ui.core.Control",
      multiple: false,
      ordered: false,
      materialPrimitive: "mat-toolbar",
      dragDrop: null,
    },
    {
      name: "content",
      aggregation: "content",
      owner: "sample.layout.Page",
      childType: "sap.ui.core.Control",
      multiple: true,
      ordered: true,
      materialPrimitive: "mat-card-content",
      dragDrop: null,
    },
    {
      name: "footer",
      aggregation: "footer",
      owner: "sample.layout.Page",
      childType: "sap.ui.core.Control",
      multiple: false,
      ordered: false,
      materialPrimitive: "mat-card-actions",
      dragDrop: null,
    },
    {
      name: "columns",
      aggregation: "columns",
      owner: "sample.layout.Board",
      childType: "sample.layout.BoardColumn",
      multiple: true,
      ordered: true,
      materialPrimitive: "cdkDropList + mat-card",
      dragDrop: { draggable: true, droppable: true, layout: "Horizontal" },
    },
  ];
}

function buildLayoutTemplate(page: UiPage): string {
  return `
    <section class="layout-system-example" aria-label="Layout system materialization">
      <h2>Metadata-backed composition regions</h2>
      <mat-chip-set aria-label="Layout region metadata">
        @for (region of layoutRegions; track region.aggregation) {
          <mat-chip>{{ region.name }} → {{ region.aggregation }} {{ region.multiple ? '[0..n]' : '[0..1]' }}</mat-chip>
        }
      </mat-chip-set>
      <div class="layout-page layout-density--cozy" aria-describedby="${page.route}-layout-semantics">
        <mat-toolbar class="layout-region layout-region--header" data-openui-region="header" data-openui-aggregation="header">
          Header region owns one sap.ui.core.Control child
        </mat-toolbar>
        <section class="layout-region layout-region--content" data-openui-region="content" data-openui-aggregation="content" aria-label="Ordered content aggregation">
          @for (item of orderedContent; track item) {
            <mat-card class="layout-content-card">{{ item }}</mat-card>
          }
        </section>
        <section class="layout-region layout-region--footer" data-openui-region="footer" data-openui-aggregation="footer">
          Footer region remains owned when breakpoints reflow the grid
        </section>
      </div>
      <p id="${page.route}-layout-semantics">
        Breakpoints reflow the same named regions; density classes only change token-backed spacing and sizing.
      </p>
      <section class="layout-board" aria-label="Declared drag-and-drop aggregation">
        <h3>Declared drag-and-drop constraint</h3>
        <div class="layout-board-columns" data-openui-region="columns" data-openui-aggregation="columns" cdkDropList [cdkDropListData]="layoutBoardColumns" cdkDropListOrientation="horizontal">
          @for (column of layoutBoardColumns; track column) {
            <mat-card class="layout-board-column" cdkDrag>{{ column }}</mat-card>
          }
        </div>
        <mat-list aria-label="Drag-and-drop enabled regions">
          @for (region of dragDropRegions; track region.aggregation) {
            <mat-list-item>{{ region.aggregation }} accepts {{ region.childType }} via {{ region.dragDrop.layout }} drag-and-drop.</mat-list-item>
          }
        </mat-list>
      </section>
    </section>`;
}

function buildLayoutStyles(): string {
  return `
.layout-system-example {
  --layout-gap: var(--openui-spacing-4);
  --layout-control-height: var(--openui-density-cozy-control-height);
  border: 1px solid var(--openui-theme-primary);
  border-radius: var(--openui-spacing-2);
  display: grid;
  gap: var(--layout-gap);
  margin-top: var(--openui-spacing-4);
  padding: var(--openui-spacing-4);
}

.layout-system-example h2,
.layout-system-example h3 {
  margin: 0;
}

.layout-page {
  display: grid;
  gap: var(--layout-gap);
  grid-template-areas:
    "header header"
    "content footer";
  grid-template-columns: minmax(0, 2fr) minmax(12rem, 1fr);
}

.layout-density--compact {
  --layout-gap: var(--openui-spacing-2);
  --layout-control-height: var(--openui-density-compact-control-height);
}

.layout-region {
  min-height: var(--layout-control-height);
}

.layout-region--header { grid-area: header; }
.layout-region--content { grid-area: content; }
.layout-region--footer { grid-area: footer; }

.layout-region--content,
.layout-board-columns {
  display: grid;
  gap: var(--layout-gap);
  grid-auto-flow: column;
  grid-auto-columns: minmax(10rem, 1fr);
}

.layout-content-card,
.layout-board-column {
  padding: var(--openui-spacing-4);
}

.layout-board {
  display: grid;
  gap: var(--layout-gap);
}

@media (max-width: 599px) {
  .layout-page {
    grid-template-areas:
      "header"
      "content"
      "footer";
    grid-template-columns: 1fr;
  }

  .layout-region--content,
  .layout-board-columns {
    grid-auto-flow: row;
    grid-auto-columns: initial;
  }
}

@media (min-width: 1024px) {
  .layout-page {
    grid-template-columns: minmax(0, 3fr) minmax(14rem, 1fr);
  }
}
`;
}

function buildApplicationStructure(pages: AngularPageModel[]): AngularApplicationStructureModel {
  return {
    rootComponent: "openui-root",
    explicitDependencies: [
      { name: "@angular/material/toolbar", purpose: "renders the shell header aggregation" },
      { name: "@angular/material/sidenav", purpose: "renders the navigation container" },
      { name: "@angular/material/list", purpose: "renders global navigation entries" },
      { name: "@angular/router", purpose: "resolves routed page content" },
    ],
    shell: {
      componentClass: "AppComponent",
      selector: "openui-root",
      primitives: ["mat-toolbar", "mat-sidenav-container", "mat-sidenav", "router-outlet"],
      regions: [
        { name: "header", aggregation: "header", materialPrimitive: "mat-toolbar" },
        { name: "navigation", aggregation: "navigation", materialPrimitive: "mat-sidenav" },
        { name: "content", aggregation: "pages", materialPrimitive: "router-outlet" },
      ],
      currentPageAssociation: "activeRoute",
    },
    pageHierarchy: pages.map((page) => ({
      id: page.id,
      route: page.route,
      title: page.title,
      componentClass: page.className,
      children: [],
    })),
    navigationContainer: {
      component: "MatSidenavContainer",
      ownsAggregations: ["navigation", "content"],
      routedContentOutlet: "RouterOutlet",
    },
  };
}

function buildAcceptanceTemplate(): string {
  return `
    <section class="acceptance-criteria" aria-label="Acceptance criteria workflow">
      <h2>Acceptance coverage</h2>
      <mat-chip-set aria-label="Criteria evidence types">
        <mat-chip>Traceability matrix</mat-chip>
        <mat-chip>Metadata projection</mat-chip>
        <mat-chip>Runtime behavior</mat-chip>
        <mat-chip>Visual evidence</mat-chip>
      </mat-chip-set>
      <mat-list aria-label="Generated acceptance checks">
        <mat-list-item>Link each criterion to the source specification section, tag, fixture, and evidence artifact.</mat-list-item>
        <mat-list-item>Compare runtime metadata, /openui.json, and generated API projections before emitting examples.</mat-list-item>
        <mat-list-item>Record deterministic DOM, accessibility, or screenshot evidence for visual-facing behavior.</mat-list-item>
      </mat-list>
    </section>`;
}

function buildAcceptanceStyles(): string {
  return `
.acceptance-criteria {
  border: 1px solid var(--openui-theme-primary);
  border-radius: 0.75rem;
  margin-top: 1rem;
  padding: 1rem;
}

.acceptance-criteria h2 {
  margin-top: 0;
}
`;
}

function buildApplicationStructureTemplate(): string {
  return `
    <section class="application-structure-example" aria-label="Application structure materialization">
      <h2>Generated application structure</h2>
      <mat-list aria-label="Explicit library dependencies">
        @for (dependency of applicationDependencies; track dependency) {
          <mat-list-item>{{ dependency }}</mat-list-item>
        }
      </mat-list>
      <div class="application-shell-primitives" aria-label="Application shell primitives">
        <mat-card class="application-shell-region">
          <mat-card-title>Root component resolution</mat-card-title>
          <mat-card-content>openui-root resolves to AppComponent.</mat-card-content>
        </mat-card>
        <mat-card class="application-shell-region">
          <mat-card-title>Navigation container</mat-card-title>
          <mat-card-content>mat-sidenav-container owns mat-sidenav navigation and routed content.</mat-card-content>
        </mat-card>
        <mat-card class="application-shell-region">
          <mat-card-title>Shell content</mat-card-title>
          <mat-card-content>mat-toolbar frames the header and router-outlet resolves page hierarchy nodes.</mat-card-content>
        </mat-card>
      </div>
      <mat-chip-set aria-label="Shell regions">
        @for (region of shellRegions; track region) {
          <mat-chip>{{ region }}</mat-chip>
        }
      </mat-chip-set>
      <mat-list aria-label="Page hierarchy model">
        @for (node of pageHierarchy; track node) {
          <mat-list-item>{{ node }}</mat-list-item>
        }
      </mat-list>
    </section>`;
}

function buildApplicationStructureStyles(): string {
  return `
.application-structure-example {
  border: 1px solid var(--openui-theme-primary);
  border-radius: 0.75rem;
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
}

.application-structure-example h2 {
  margin: 0;
}

.application-shell-primitives {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}
`;
}

function buildComponentTemplate(page: UiPage): string {
  const contractItems = buildComponentContractItems(page)
    .map((item) => `          <mat-chip>${escapeHtml(item)}</mat-chip>`)
    .join("\n");
  return `
    <section class="component-contract-example" aria-label="Component metadata contract">
      <h2>Component contract projection</h2>
      <mat-chip-set aria-label="Public metadata definitions">
${contractItems}
      </mat-chip-set>
      <dl>
        <div>
          <dt>Stable identity</dt>
          <dd>sample.library.SearchInput</dd>
        </div>
        <div>
          <dt>Public property</dt>
          <dd>value: string = "" (bindable)</dd>
        </div>
        <div>
          <dt>Owned aggregation</dt>
          <dd>content: sap.ui.core.Control [0..n]</dd>
        </div>
        <div>
          <dt>Association</dt>
          <dd>ariaLabelledBy: sap.ui.core.Control [0..n]</dd>
        </div>
        <div>
          <dt>Event output</dt>
          <dd>liveChange(value: string)</dd>
        </div>
      </dl>
      <mat-list aria-label="Generated Angular projection">
        @for (item of componentContract; track item) {
          <mat-list-item>{{ item }}</mat-list-item>
        }
      </mat-list>
    </section>`;
}

function buildComponentContractItems(page: UiPage): string[] {
  return page.formalDefinitions
    .filter((definition) =>
      ["Component", "Property", "Aggregation", "Association", "Event"].includes(definition.term),
    )
    .map((definition) => `${definition.term}: ${definition.definition}`);
}

function buildComponentStyles(): string {
  return `
.component-contract-example {
  border: 1px solid var(--openui-theme-primary);
  border-radius: 0.75rem;
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
}

.component-contract-example h2 {
  margin: 0;
}

.component-contract-example dl {
  display: grid;
  gap: 0.5rem;
  margin: 0;
}

.component-contract-example div {
  display: grid;
  gap: 0.25rem;
}

.component-contract-example dt {
  color: var(--openui-theme-primary);
  font-weight: 600;
}

.component-contract-example dd {
  margin: 0;
}
`;
}

function buildUiConceptTemplate(): string {
  return `
    <section class="ui-concept-example" aria-label="UI concept model materialization">
      <h2>UI concept materialization</h2>
      <mat-chip-set aria-label="Controls and elements">
        @for (block of uiConceptBlocks; track block) {
          <mat-chip>{{ block }}</mat-chip>
        }
      </mat-chip-set>
      <div class="ui-concept-regions" aria-label="Named regions and actions">
        @for (region of uiConceptRegions; track region) {
          <mat-card class="ui-concept-region">
            <mat-card-title>{{ region }}</mat-card-title>
            <mat-card-content>
              @if (region === 'actions') {
                <button mat-raised-button color="primary" type="button">Save order</button>
              } @else {
                Owned aggregation region for public child controls.
              }
            </mat-card-content>
          </mat-card>
        }
      </div>
      <mat-list aria-label="Forms, dialogs, aggregations, and associations">
        <mat-list-item>Form control owns FormContainer and FormElement supporting elements.</mat-list-item>
        <mat-list-item>Dialog control owns content, beginButton, and endButton aggregations.</mat-list-item>
        <mat-list-item>Owned aggregation owns child content in the parent lifecycle.</mat-list-item>
        <mat-list-item>Non-owning association references labelled-by controls for semantics.</mat-list-item>
        @for (relationship of uiConceptRelationships; track relationship) {
          <mat-list-item>{{ relationship }}</mat-list-item>
        }
      </mat-list>
    </section>`;
}

function buildUiConceptStyles(): string {
  return `
.ui-concept-example {
  border: 1px solid var(--openui-theme-primary);
  border-radius: 0.75rem;
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
}

.ui-concept-example h2 {
  margin: 0;
}

.ui-concept-regions {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}

.ui-concept-region mat-card-title {
  text-transform: capitalize;
}
`;
}

function toPascalCase(value: string): string {
  return value
    .split(/[^a-z0-9]+/i)
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join("");
}

function toPackageName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "openui-app";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toTypeScriptStringArray(values: string[]): string {
  return `[${values.map((value) => JSON.stringify(value)).join(", ")}]`;
}

function toTypeScriptLiteral(value: unknown): string {
  return JSON.stringify(value, null, 2)
    .replace(/"([^"\\]*(?:\\.[^"\\]*)*)":/g, "$1:")
    .replace(/\n/g, "\n  ");
}
