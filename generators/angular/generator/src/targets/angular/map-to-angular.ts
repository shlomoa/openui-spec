import type { DataModelApplication, DataModelDialogComponent, DataModelPage } from "../../data-model/data-model";
import type {
  AngularApplicationStructureModel,
  AngularDialogComponentModel,
  AngularInternationalizationModel,
  AngularPageModel,
  AngularProjectModel,
} from "./angular-model";
import { routedPageImportPath } from "./angular-paths";
import { escapeHtml } from "./emit-utils";
import { AngularImportCollector } from "./import-collector";
import { toIndentedTypeScriptLiteral as toTypeScriptLiteral, toTypeScriptStringArray } from "./typescript-literals";

export function mapToAngularProject(dataModel: DataModelApplication): AngularProjectModel {
  const pages = dataModel.pages.map(mapPage);
  return {
    appName: dataModel.name,
    packageName: toPackageName(dataModel.name),
    version: dataModel.version,
    pages,
    dialogComponents: (dataModel.dialogComponents ?? []).map(mapDialogComponent),
    themeTokens: dataModel.themeTokens,
    applicationStructure: dataModel.pages.some((page) => page.features.includes("application-structure"))
      ? buildApplicationStructure(pages)
      : undefined,
    internationalization: dataModel.pages.some((page) => page.features.includes("internationalization"))
      ? buildInternationalizationModel()
      : undefined,
  };
}

function mapDialogComponent(component: DataModelDialogComponent): AngularDialogComponentModel {
  return {
    selector: component.selector,
    className: component.className,
    directoryName: component.directoryName,
    fileName: component.fileName,
    title: component.title,
    content: component.content,
    actions: component.actions.map((action) => ({
      text: action.text,
      result: action.result,
      emphasis: action.emphasis,
    })),
  };
}

function mapPage(page: DataModelPage): AngularPageModel {
  const className = `${toPascalCase(page.route)}Page`;
  const imports = new Set(["CommonModule", "MatCardModule", "MatButtonModule", "MatListModule"]);
  const componentImports = new AngularImportCollector();
  componentImports.add("@angular/common", "CommonModule");
  componentImports.add("@angular/core", "Component");
  componentImports.add("@angular/material/button", "MatButtonModule");
  componentImports.add("@angular/material/card", "MatCardModule");
  componentImports.add("@angular/material/list", "MatListModule");
  const constructorParameters: string[] = [];
  const members: string[] = [];
  const contractItems = buildComponentContractItems(page);

  if (page.features.includes("form")) {
    imports.add("ReactiveFormsModule");
    imports.add("MatFormFieldModule");
    imports.add("MatInputModule");
    componentImports.add("@angular/forms", "FormControl", "ReactiveFormsModule");
    componentImports.add("@angular/material/form-field", "MatFormFieldModule");
    componentImports.add("@angular/material/input", "MatInputModule");
    members.push("readonly sampleControl = new FormControl('');");
  }

  if (page.features.includes("navigation")) {
    imports.add("RouterLink");
    imports.add("MatListModule");
    componentImports.add("@angular/router", "RouterLink");
    componentImports.add("@angular/material/list", "MatListModule");
  }

  if (page.features.includes("feedback")) {
    imports.add("MatSnackBarModule");
    componentImports.add("@angular/material/snack-bar", "MatSnackBar", "MatSnackBarModule");
    constructorParameters.push("private readonly snackBar: MatSnackBar");
    members.push("showFeedback(): void { this.snackBar.open('OpenUI feedback action', 'Dismiss', { duration: 3000 }); }");
  }

  if (page.features.includes("acceptance")) {
    imports.add("MatChipsModule");
    componentImports.add("@angular/material/chips", "MatChipsModule");
  }

  if (page.features.includes("component")) {
    imports.add("MatChipsModule");
    componentImports.add("@angular/material/chips", "MatChipsModule");
    members.push(`protected readonly componentContract = ${toTypeScriptStringArray(contractItems)};`);
  }

  if (page.features.includes("interaction")) {
    imports.add("MatChipsModule");
    componentImports.add("@angular/material/chips", "MatChipsModule");
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

  if (page.features.includes("state-model")) {
    imports.add("MatChipsModule");
    imports.add("MatFormFieldModule");
    imports.add("MatInputModule");
    componentImports.add("@angular/core", "computed", "input");
    componentImports.add("@angular/material/chips", "MatChipsModule");
    componentImports.add("@angular/material/form-field", "MatFormFieldModule");
    componentImports.add("@angular/material/input", "MatInputModule");
    members.push(`readonly text = input<string>("Submit order");`);
    members.push("readonly enabled = input<boolean>(true);");
    members.push("readonly visible = input<boolean>(true);");
    members.push(`readonly type = input<"Default" | "Emphasized" | "Reject" | "Accept">("Default");`);
    members.push(`readonly value = input<string>("");`);
    members.push("readonly required = input<boolean>(true);");
    members.push(
      `readonly valueState = input<"None" | "Error" | "Warning" | "Success" | "Information">("None");`,
    );
    members.push(`protected readonly effectiveValueState = computed<
    "None" | "Error" | "Warning" | "Success" | "Information"
  >(() => (this.required() && this.value() === "" ? "Error" : this.valueState()));`);
    members.push(`protected readonly publicStateInputs = ${toTypeScriptLiteral(buildPublicStateInputs())} as const;`);
    members.push(`protected readonly hiddenStateExclusion = ${toTypeScriptLiteral(buildHiddenStateExclusion())} as const;`);
    members.push(`protected readonly derivedStateContract = ${toTypeScriptLiteral(buildDerivedStateContract())} as const;`);
  }

  if (page.features.includes("data-binding")) {
    imports.add("MatChipsModule");
    imports.add("MatFormFieldModule");
    imports.add("MatInputModule");
    componentImports.add("@angular/material/chips", "MatChipsModule");
    componentImports.add("@angular/material/form-field", "MatFormFieldModule");
    componentImports.add("@angular/material/input", "MatInputModule");
    members.push(`protected readonly dataBindingContracts = ${toTypeScriptLiteral(buildDataBindingContracts())} as const;`);
    members.push(`protected readonly ordersModel: {
    customer: { name: string };
    orders: ReadonlyArray<{ id: string; title: string; quantity: number }>;
  } = {
    customer: { name: "Ada Lovelace" },
    orders: [
      { id: "order-100", title: "Notebook", quantity: 2 },
      { id: "order-101", title: "Keyboard", quantity: 1 },
    ],
  };`);
    members.push(`protected readonly typePreservingStatusUpdate: Promise<{
    text: string;
    state: "None" | "Success" | "Warning" | "Error";
  }> = Promise.resolve({ text: "Loaded", state: "Success" });`);
  }

  if (page.features.includes("security")) {
    imports.add("MatChipsModule");
    imports.add("MatDialogModule");
    imports.add("MatFormFieldModule");
    imports.add("MatInputModule");
    componentImports.add("@angular/core", "TemplateRef", "inject", "viewChild");
    componentImports.add("@angular/material/chips", "MatChipsModule");
    componentImports.add("@angular/material/dialog", "MatDialog", "MatDialogModule");
    componentImports.add("@angular/material/form-field", "MatFormFieldModule");
    componentImports.add("@angular/material/input", "MatInputModule");
    members.push("private readonly dialog = inject(MatDialog);");
    members.push(
      `private readonly deleteConfirmationDialog = viewChild.required<TemplateRef<unknown>>("deleteConfirmationDialog");`,
    );
    members.push(`protected readonly securityContracts = ${toTypeScriptLiteral(buildSecurityContracts())} as const;`);
    members.push("protected readonly untrustedDisplayText = '<script>alert(1)</script> is rendered as text, not markup.';");
    members.push("protected readonly supportHref = 'https://support.example/orders/100';");
    members.push("protected readonly blockedHref = 'ftp://support.example/private-dump';");
    members.push("protected revealSensitiveValue = false;");
    members.push("protected readonly sensitiveValueMask = '••••••••••••';");
    members.push("private readonly sensitiveValue = 'sample-sensitive-token';");
    members.push("protected readonly canDeleteOrder = false;");
    members.push("protected confirmationRequests = 0;");
    members.push("protected confirmedDeleteCount = 0;");
    members.push(`protected get validatedSupportHref(): string | null {
    return this.validateAllowedUrl(this.supportHref);
  }`);
    members.push(`protected get rejectedSupportHref(): string | null {
    return this.validateAllowedUrl(this.blockedHref);
  }`);
    members.push(`protected get displayedSensitiveValue(): string {
    return this.revealSensitiveValue ? this.sensitiveValue : this.sensitiveValueMask;
  }`);
    members.push(`protected toggleSensitiveReveal(): void {
    this.revealSensitiveValue = !this.revealSensitiveValue;
  }`);
    members.push(`protected requestDeleteConfirmation(): void {
    if (!this.canDeleteOrder) {
      return;
    }

    this.confirmationRequests += 1;
    this.dialog
      .open(this.deleteConfirmationDialog(), {
        ariaDescribedBy: "${page.route}-delete-confirmation-description",
        ariaLabelledBy: "${page.route}-delete-confirmation-title",
        role: "alertdialog",
      })
      .afterClosed()
      .subscribe((confirmed) => this.completeDeleteAfterConfirmation(confirmed === true));
  }`);
    members.push(`protected completeDeleteAfterConfirmation(confirmed: boolean): void {
    if (!confirmed || !this.canDeleteOrder) {
      return;
    }

    this.confirmedDeleteCount += 1;
  }`);
    members.push(`private validateAllowedUrl(value: string): string | null {
    try {
      const url = new URL(value, "https://example.invalid");
      const allowedSchemes: readonly string[] = this.securityContracts.allowedUrlSchemes;
      return allowedSchemes.includes(url.protocol) ? value : null;
    } catch {
      return null;
    }
  }`);
  }

  if (page.features.includes("performance")) {
    imports.add("ScrollingModule");
    imports.add("MatChipsModule");
    componentImports.add("@angular/cdk/scrolling", "ScrollingModule");
    componentImports.add("@angular/material/chips", "MatChipsModule");
    members.push(`protected readonly lazyDetailContract = ${toTypeScriptLiteral(buildLazyDetailContract(page))} as const;`);
    members.push(`protected readonly projectionCache = ${toTypeScriptLiteral(buildProjectionCacheContract())} as const;`);
    members.push(`protected readonly virtualizationBudget = ${toTypeScriptLiteral(buildVirtualizationBudgetContract())} as const;`);
    members.push(`protected readonly virtualRows: Array<{ id: string; customer: string; total: string }> = Array.from(
    { length: 120 },
    (_, index) => ({
      id: \`ORD-\${String(index + 1).padStart(3, "0")}\`,
      customer: index % 2 === 0 ? "Ada Lovelace" : "Grace Hopper",
      total: \`$\${(125 + index).toFixed(2)}\`,
    }),
  );`);
    members.push("protected trackVirtualOrder(_index: number, order: { id: string }): string { return order.id; }");
  }

  if (page.features.includes("layout")) {
    imports.add("CdkDrag");
    imports.add("CdkDropList");
    imports.add("MatChipsModule");
    imports.add("MatToolbarModule");
    componentImports.add("@angular/cdk/drag-drop", "CdkDrag", "CdkDropList");
    componentImports.add("@angular/material/chips", "MatChipsModule");
    componentImports.add("@angular/material/toolbar", "MatToolbarModule");
    members.push(`protected readonly layoutRegions = ${toTypeScriptLiteral(buildLayoutRegions())};`);
    members.push("protected readonly orderedContent = ['Summary card', 'Metrics card', 'Activity card'];");
    members.push("protected readonly layoutBoardColumns = ['Backlog', 'In progress', 'Done'];");
    members.push(
      "protected readonly dragDropRegions = this.layoutRegions.filter((region) => region.dragDrop !== null);",
    );
  }

  if (page.features.includes("application-structure")) {
    imports.add("MatChipsModule");
    componentImports.add("@angular/material/chips", "MatChipsModule");
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
    componentImports.add("@angular/material/chips", "MatChipsModule");
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
    componentImports.add("@angular/material/chips", "MatChipsModule");
    members.push("protected readonly referenceProperties = ['text', 'type', 'enabled', 'icon', 'ariaHasPopup'];");
  }

  if (page.features.includes("compliance")) {
    imports.add("MatChipsModule");
    componentImports.add("@angular/material/chips", "MatChipsModule");
    members.push(`protected readonly complianceContracts = ${toTypeScriptLiteral(buildComplianceContracts())} as const;`);
  }

  if (page.features.includes("internationalization")) {
    imports.add("CurrencyPipe");
    imports.add("DatePipe");
    imports.add("DecimalPipe");
    imports.add("MatChipsModule");
    componentImports.add("@angular/common", "CurrencyPipe", "DatePipe", "DecimalPipe");
    componentImports.add("@angular/core", "inject");
    componentImports.add("@angular/material/chips", "MatChipsModule");
    componentImports.add("../../openui-i18n.service", "OPENUI_I18N", "OpenUiI18nService");
    members.push("protected readonly i18n = inject(OpenUiI18nService);");
    members.push("protected readonly i18nConfig = OPENUI_I18N;");
    members.push("protected readonly orderTotal = 1234.5;");
    members.push("protected readonly deliveryDate = new Date('2026-06-22T00:00:00.000Z');");
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
    componentImports: componentImports.toImportStatements(),
    constructorParameters,
    members,
    template: buildTemplate(page),
    styles: buildStyles(page),
  };
}

function buildTemplate(page: DataModelPage): string {
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
  const dataBinding = page.features.includes("data-binding") ? buildDataBindingTemplate(page) : "";
  const security = page.features.includes("security") ? buildSecurityTemplate(page) : "";
  const layout = page.features.includes("layout") ? buildLayoutTemplate(page) : "";
  const stateModel = page.features.includes("state-model") ? buildStateModelTemplate(page) : "";
  const performance = page.features.includes("performance") ? buildPerformanceTemplate(page) : "";
  const uiConcept = page.features.includes("ui-concept") ? buildUiConceptTemplate() : "";
  const internationalization = page.features.includes("internationalization")
    ? buildInternationalizationTemplate(page)
    : "";
  const compliance = page.features.includes("compliance") ? buildComplianceTemplate() : "";
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
      <p>${escapeHtml(page.summary)}</p>${requirements}${form}${navigation}${feedback}${acceptance}${applicationStructure}${component}${interaction}${dataBinding}${security}${layout}${stateModel}${performance}${uiConcept}${internationalization}${compliance}${reference}${accessibility}
    </mat-card-content>
  </mat-card>
</section>
`;
}

function buildStyles(page: DataModelPage): string {
  const themeStyles = page.features.includes("theme")
    ? "\n:host {\n  --openui-section-accent: var(--openui-theme-primary);\n}\n"
    : "";
  const acceptanceStyles = page.features.includes("acceptance") ? buildAcceptanceStyles() : "";
  const applicationStructureStyles = page.features.includes("application-structure")
    ? buildApplicationStructureStyles()
    : "";
  const componentStyles = page.features.includes("component") ? buildComponentStyles() : "";
  const interactionStyles = page.features.includes("interaction") ? buildInteractionStyles() : "";
  const dataBindingStyles = page.features.includes("data-binding") ? buildDataBindingStyles() : "";
  const securityStyles = page.features.includes("security") ? buildSecurityStyles() : "";
  const layoutStyles = page.features.includes("layout") ? buildLayoutStyles() : "";
  const stateModelStyles = page.features.includes("state-model") ? buildStateModelStyles() : "";
  const performanceStyles = page.features.includes("performance") ? buildPerformanceStyles() : "";
  const uiConceptStyles = page.features.includes("ui-concept") ? buildUiConceptStyles() : "";
  const internationalizationStyles = page.features.includes("internationalization")
    ? buildInternationalizationStyles()
    : "";
  const complianceStyles = page.features.includes("compliance") ? buildComplianceStyles() : "";
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
${themeStyles}${acceptanceStyles}${applicationStructureStyles}${componentStyles}${interactionStyles}${dataBindingStyles}${securityStyles}${layoutStyles}${stateModelStyles}${performanceStyles}${uiConceptStyles}${internationalizationStyles}${complianceStyles}`;
}

function buildSecurityContracts(): {
  allowedUrlSchemes: string[];
  rendering: { text: string; html: string; unsafeApi: string };
  masking: { defaultMode: "masked"; revealRequiresAction: true };
  confirmation: { popup: "dialog"; firstActivation: "request-confirmation"; finalActivation: "confirmed-only" };
  permissionGate: { deniedBehavior: "omit"; preventsValueActionAndPopupLeakage: true };
} {
  return {
    allowedUrlSchemes: ["http:", "https:", "mailto:"],
    rendering: {
      text: "Angular interpolation",
      html: "not generated for untrusted values",
      unsafeApi: "unsafe trust APIs are not emitted",
    },
    masking: { defaultMode: "masked", revealRequiresAction: true },
    confirmation: {
      popup: "dialog",
      firstActivation: "request-confirmation",
      finalActivation: "confirmed-only",
    },
    permissionGate: { deniedBehavior: "omit", preventsValueActionAndPopupLeakage: true },
  };
}

function buildSecurityTemplate(page: DataModelPage): string {
  return `
    <section class="security-privacy-example" aria-label="Security and privacy UI materialization">
      <h2>Safe rendering and privacy gates</h2>
      <mat-chip-set aria-label="Allowed URL schemes">
        @for (scheme of securityContracts.allowedUrlSchemes; track scheme) {
          <mat-chip>{{ scheme }}</mat-chip>
        }
      </mat-chip-set>
      <section class="safe-rendering-contract" aria-labelledby="${page.route}-safe-rendering">
        <h3 id="${page.route}-safe-rendering">Safe text and URL rendering</h3>
        <p class="encoded-text" data-openui-rendering="encoded-text">{{ untrustedDisplayText }}</p>
        <a
          mat-button
          [href]="validatedSupportHref"
          rel="noopener noreferrer"
          target="_blank"
          data-openui-url-allow-list="http,https,mailto"
        >
          Validated support link
        </a>
        @if (rejectedSupportHref === null) {
          <p class="blocked-url" data-openui-url-rejected="true">
            Disallowed URL schemes are omitted before a value reaches href binding.
          </p>
        }
      </section>
      <section class="masking-contract" aria-labelledby="${page.route}-masking">
        <h3 id="${page.route}-masking">Sensitive-value masking</h3>
        <mat-form-field appearance="outline" data-openui-masking-default="masked">
          <mat-label>API token</mat-label>
          <input matInput readonly [value]="displayedSensitiveValue" aria-describedby="${page.route}-masking-help" />
        </mat-form-field>
        <button mat-button type="button" (click)="toggleSensitiveReveal()" aria-controls="${page.route}-masking-help">
          {{ revealSensitiveValue ? 'Mask value' : 'Reveal value' }}
        </button>
        <p id="${page.route}-masking-help">
          The generated field defaults to a masked value and cleartext appears only after an explicit reveal action.
        </p>
      </section>
      <section class="permission-contract" aria-labelledby="${page.route}-permission">
        <h3 id="${page.route}-permission">Confirmation and permission gates</h3>
        @if (canDeleteOrder) {
          <button
            mat-raised-button
            color="warn"
            type="button"
            aria-haspopup="dialog"
            data-openui-confirmation-required="true"
            data-openui-permission-gate="canDeleteOrder"
            (click)="requestDeleteConfirmation()"
          >
            Delete order
          </button>
          <ng-template #deleteConfirmationDialog>
            <h4 id="${page.route}-delete-confirmation-title" mat-dialog-title>Confirm irreversible delete</h4>
            <mat-dialog-content id="${page.route}-delete-confirmation-description">
              Deleting the order cannot be undone. The generated handler runs only after explicit confirmation.
            </mat-dialog-content>
            <mat-dialog-actions align="end">
              <button mat-button type="button" [mat-dialog-close]="false">Cancel</button>
              <button mat-button color="warn" type="button" [mat-dialog-close]="true">Confirm delete</button>
            </mat-dialog-actions>
          </ng-template>
        } @else {
          <p class="permission-omission" data-openui-permission-gate="omitted">
            Restricted action, value, and popup target are omitted for denied permissions.
          </p>
        }
      </section>
    </section>`;
}

function buildSecurityStyles(): string {
  return `
.security-privacy-example {
  border: 1px solid var(--openui-theme-primary);
  border-radius: 0.75rem;
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
}

.security-privacy-example h2,
.security-privacy-example h3 {
  margin: 0;
}

.safe-rendering-contract,
.masking-contract,
.permission-contract {
  display: grid;
  gap: 0.75rem;
  justify-items: start;
}

.encoded-text,
.blocked-url,
.permission-omission {
  border-inline-start: 0.25rem solid var(--openui-theme-primary);
  margin: 0;
  padding-inline-start: 0.75rem;
}
`;
}

function buildLazyDetailContract(page: DataModelPage): {
  catalog: string;
  routePath: string;
  angularRoute: string;
  detailLoading: "loadComponent";
  eagerDiscovery: true;
  lazy: true;
} {
  return {
    catalog: "sample.library",
    routePath: page.route,
    angularRoute: `loadComponent: () => import('${routedPageImportPath(page.route, `${page.route}.page`)}').then((m) => m.${toPascalCase(page.route)}Page)`,
    detailLoading: "loadComponent",
    eagerDiscovery: true,
    lazy: true,
  };
}

function buildProjectionCacheContract(): {
  projection: "api-json";
  derivedFrom: "public-contract";
  library: string;
  version: string;
  identity: string;
  immutable: true;
  cacheKeyMembers: string[];
} {
  return {
    projection: "api-json",
    derivedFrom: "public-contract",
    library: "sample.library",
    version: "1.4.0",
    identity: "sample.library@1.4.0#api-json",
    immutable: true,
    cacheKeyMembers: ["library", "version", "projection"],
  };
}

function buildVirtualizationBudgetContract(): {
  component: string;
  aggregation: string;
  childType: string;
  multiple: true;
  virtualized: true;
  materialPrimitive: "cdk-virtual-scroll-viewport";
  itemSize: number;
  viewportHeightPx: number;
  initialMaterializationBudget: number;
} {
  return {
    component: "sample.library.OrderTable",
    aggregation: "items",
    childType: "sample.library.OrderRow",
    multiple: true,
    virtualized: true,
    materialPrimitive: "cdk-virtual-scroll-viewport",
    itemSize: 48,
    viewportHeightPx: 240,
    initialMaterializationBudget: 20,
  };
}

function buildPerformanceTemplate(page: DataModelPage): string {
  return `
    <section class="performance-requirements-example" aria-label="Performance requirements materialization">
      <h2>Eager discovery, lazy detail, and measurable budgets</h2>
      <section class="performance-lazy-detail" aria-label="Lazy detail loading" [attr.data-openui-lazy-route]="lazyDetailContract.routePath" [attr.data-openui-detail-loading]="lazyDetailContract.detailLoading">
        <h3>Route-level lazy detail</h3>
        <p>
          The generated route keeps catalog discovery eager while loading this page through Angular Router <code>loadComponent</code> only when the route activates.
        </p>
        <mat-chip-set aria-label="Lazy detail contract">
          <mat-chip>{{ lazyDetailContract.catalog }}</mat-chip>
          <mat-chip>route: {{ lazyDetailContract.routePath }}</mat-chip>
          <mat-chip>lazy: {{ lazyDetailContract.lazy }}</mat-chip>
        </mat-chip-set>
      </section>
      <section class="performance-projection-cache" aria-label="Cacheable projection identity" [attr.data-openui-projection-cache-key]="projectionCache.identity" [attr.data-openui-projection-immutable]="projectionCache.immutable">
        <h3>Cacheable API projection</h3>
        <dl>
          <div>
            <dt>Projection</dt>
            <dd>{{ projectionCache.projection }}</dd>
          </div>
          <div>
            <dt>Derived from</dt>
            <dd>{{ projectionCache.derivedFrom }}</dd>
          </div>
          <div>
            <dt>Stable cache key</dt>
            <dd>{{ projectionCache.identity }}</dd>
          </div>
        </dl>
      </section>
      <section class="performance-virtualization" aria-label="Aggregation virtualization budget">
        <h3>Virtualized aggregation</h3>
        <p id="${page.route}-virtualization-budget">
          The unbounded items aggregation is emitted as a CDK virtual-scroll viewport with an observable materialization budget.
        </p>
        <cdk-virtual-scroll-viewport
          class="performance-viewport"
          [itemSize]="virtualizationBudget.itemSize"
          [attr.data-openui-component]="virtualizationBudget.component"
          [attr.data-openui-aggregation]="virtualizationBudget.aggregation"
          [attr.data-openui-child-type]="virtualizationBudget.childType"
          [attr.data-openui-virtualized]="virtualizationBudget.virtualized"
          [attr.data-openui-materialization-budget]="virtualizationBudget.initialMaterializationBudget"
          aria-describedby="${page.route}-virtualization-budget"
        >
          <mat-list>
            <mat-list-item *cdkVirtualFor="let row of virtualRows; trackBy: trackVirtualOrder">
              {{ row.id }} — {{ row.customer }} — {{ row.total }}
            </mat-list-item>
          </mat-list>
        </cdk-virtual-scroll-viewport>
      </section>
    </section>`;
}

function buildPerformanceStyles(): string {
  return `
.performance-requirements-example {
  border: 1px solid var(--openui-theme-primary);
  border-radius: 0.75rem;
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
}

.performance-requirements-example h2,
.performance-requirements-example h3,
.performance-requirements-example p,
.performance-requirements-example dl {
  margin: 0;
}

.performance-lazy-detail,
.performance-projection-cache,
.performance-virtualization {
  display: grid;
  gap: 0.75rem;
}

.performance-projection-cache dl {
  display: grid;
  gap: 0.5rem;
}

.performance-projection-cache dt {
  color: var(--openui-theme-primary);
  font-weight: 600;
}

.performance-projection-cache dd {
  font-family: ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', monospace;
  margin: 0;
}

.performance-viewport {
  border: 1px solid color-mix(in srgb, var(--openui-theme-primary) 35%, transparent);
  border-radius: 0.5rem;
  height: 240px;
  max-width: 36rem;
}
`;
}

function buildInternationalizationModel(): AngularInternationalizationModel {
  return {
    activeLocale: "ar-EG",
    angularLocale: "en-US",
    defaultLocale: "en",
    fallbackLocales: ["ar-EG", "ar", "en"],
    messageBundles: {
      ar: {
        "order.submit": "إرسال الطلب",
      },
      en: {
        "order.cancel": "Cancel",
        "order.submit": "Submit order",
        "order.total": "Order total",
      },
    },
    rtlLocales: ["ar", "ar-EG", "fa", "he", "ur"],
  };
}

function buildInternationalizationTemplate(page: DataModelPage): string {
  return `
    <section
      class="internationalization-example"
      aria-label="Internationalization materialization"
      [attr.dir]="i18n.textDirection()"
      [attr.lang]="i18n.activeLocale"
      data-openui-locale-fallback="specific-to-default"
    >
      <h2>Locale resource wiring</h2>
      <button mat-raised-button color="primary" type="button" data-openui-message-key="order.submit">
        {{ i18n.message('order.submit') }}
      </button>
      <p id="${page.route}-fallback">
        Fallback chain: {{ i18n.fallbackChain().join(' → ') }}. Missing regional keys degrade to the default {{ i18nConfig.defaultLocale }} bundle.
      </p>
      <mat-list aria-label="Resolved translatable message keys">
        <mat-list-item>order.submit → {{ i18n.message('order.submit') }}</mat-list-item>
        <mat-list-item>order.cancel → {{ i18n.message('order.cancel') }}</mat-list-item>
      </mat-list>
      <dl>
        <div>
          <dt>Text direction</dt>
          <dd>{{ i18n.textDirection() }}</dd>
        </div>
        <div>
          <dt>Locale-aware number</dt>
          <dd>{{ orderTotal | number:'1.1-1':i18n.angularLocale }}</dd>
        </div>
        <div>
          <dt>Locale-aware currency</dt>
          <dd>{{ orderTotal | currency:'USD':'symbol':'1.2-2':i18n.angularLocale }}</dd>
        </div>
        <div>
          <dt>Locale-aware date</dt>
          <dd>{{ deliveryDate | date:'mediumDate':undefined:i18n.angularLocale }}</dd>
        </div>
      </dl>
      <mat-chip-set aria-label="Locale fallback chain">
        @for (locale of i18n.fallbackChain(); track locale) {
          <mat-chip>{{ locale }}</mat-chip>
        }
      </mat-chip-set>
    </section>`;
}

function buildInternationalizationStyles(): string {
  return `
.internationalization-example {
  border: 1px solid var(--openui-theme-primary);
  border-radius: 0.75rem;
  display: grid;
  gap: 1rem;
  justify-items: start;
  margin-top: 1rem;
  padding: 1rem;
}

.internationalization-example h2,
.internationalization-example dl {
  margin: 0;
}

.internationalization-example dl {
  display: grid;
  gap: 0.5rem;
}

.internationalization-example dt {
  color: var(--openui-theme-primary);
  font-weight: 600;
}

.internationalization-example dd {
  margin: 0;
}

.internationalization-example[dir='rtl'] {
  text-align: right;
}
`;
}

function buildComplianceContracts(): {
  catalogDiscoverability: {
    catalogRoot: string;
    component: string;
    traversalNodes: string[];
  };
  metadataCompleteness: {
    component: string;
    requiredMembers: string[];
  };
  synchronizedEvidence: Array<{ area: string; source: string; generatedArtifact: string }>;
  diagnostics: string[];
} {
  return {
    catalogDiscoverability: {
      catalogRoot: "library-catalog-root",
      component: "sample.library.Button",
      traversalNodes: ["openui-root", "library-catalog-root", "library-component-catalog"],
    },
    metadataCompleteness: {
      component: "sample.library.Button",
      requiredMembers: [
        "properties",
        "aggregations",
        "associations",
        "events",
        "defaults",
        "visibility",
        "capability metadata",
      ],
    },
    synchronizedEvidence: [
      { area: "documentation", source: "spec/21-compliance-rules.md", generatedArtifact: "compliance page" },
      { area: "generated examples", source: "generators/angular/generator/tests/fixtures/minimal-openui.json", generatedArtifact: "Angular Material page" },
      { area: "security/privacy", source: "18-security-privacy-ui-rules", generatedArtifact: "safe rendering guards" },
      { area: "extension", source: "20-extension-model", generatedArtifact: "extension compatibility gates" },
    ],
    diagnostics: [
      "missing catalog entry identifies section and traversal node",
      "missing public metadata identifies component and member group",
      "stale evidence identifies documentation, generated example, and projection artifact",
    ],
  };
}

function buildComplianceTemplate(): string {
  return `
    <section class="compliance-rules-example" aria-label="Compliance rules materialization" data-openui-compliance-section="21-compliance-rules">
      <h2>Catalog discoverability and public component resolution</h2>
      <section class="compliance-catalog" aria-label="Catalog discoverability" [attr.data-openui-catalog-root]="complianceContracts.catalogDiscoverability.catalogRoot">
        <p>
          The generated compliance gate starts from the public catalog root and requires each component to resolve through traversal evidence before examples are emitted.
        </p>
        <mat-chip-set aria-label="Catalog traversal nodes">
          @for (node of complianceContracts.catalogDiscoverability.traversalNodes; track node) {
            <mat-chip>{{ node }}</mat-chip>
          }
        </mat-chip-set>
      </section>
      <section class="compliance-metadata" aria-label="Metadata completeness gate" [attr.data-openui-component]="complianceContracts.metadataCompleteness.component">
        <h3>Metadata completeness gate</h3>
        <dl>
          <div>
            <dt>Component</dt>
            <dd>{{ complianceContracts.metadataCompleteness.component }}</dd>
          </div>
          <div>
            <dt>Required members</dt>
            <dd>{{ complianceContracts.metadataCompleteness.requiredMembers.join(', ') }}</dd>
          </div>
        </dl>
      </section>
      <section class="compliance-evidence" aria-label="Synchronized cross-cutting evidence">
        <h3>Synchronized evidence</h3>
        @for (evidence of complianceContracts.synchronizedEvidence; track evidence.area) {
          <mat-card [attr.data-openui-evidence-area]="evidence.area">
            <mat-card-title>{{ evidence.area }}</mat-card-title>
            <mat-card-content>{{ evidence.source }} → {{ evidence.generatedArtifact }}</mat-card-content>
          </mat-card>
        }
      </section>
      <section class="compliance-diagnostics" aria-label="Generator compliance diagnostics">
        <h3>Generator compliance diagnostics</h3>
        <mat-list>
          @for (diagnostic of complianceContracts.diagnostics; track diagnostic) {
            <mat-list-item>{{ diagnostic }}</mat-list-item>
          }
        </mat-list>
      </section>
    </section>`;
}

function buildComplianceStyles(): string {
  return `
.compliance-rules-example {
  border: 1px solid var(--openui-theme-primary);
  border-radius: 0.75rem;
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
}

.compliance-rules-example h2,
.compliance-rules-example h3,
.compliance-rules-example p,
.compliance-rules-example dl {
  margin: 0;
}

.compliance-catalog,
.compliance-diagnostics,
.compliance-evidence,
.compliance-metadata {
  display: grid;
  gap: 0.75rem;
}

.compliance-evidence {
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}

.compliance-metadata dt {
  color: var(--openui-theme-primary);
  font-weight: 600;
}

.compliance-metadata dd {
  margin: 0;
}
`;
}

function buildDataBindingContracts(): Array<
  | {
      target: string;
      kind: "property";
      model: string;
      path: string;
      type: string;
      bindable: true;
      hidden: false;
      angularBinding: string;
      asyncUpdate: string;
    }
  | {
      target: string;
      kind: "aggregation";
      model: string;
      path: string;
      childType: string;
      multiple: true;
      multiplicity: "0..n";
      bindable: true;
      hidden: false;
      angularBinding: string;
      template: {
        component: string;
        contextPath: string;
        relativeBindings: Array<{ target: string; path: string; type: string }>;
      };
    }
> {
  return [
    {
      target: "value",
      kind: "property",
      model: "orders",
      path: "/customer/name",
      type: "string",
      bindable: true,
      hidden: false,
      angularBinding: '[value]="ordersModel.customer.name"',
      asyncUpdate: "Promise<string>",
    },
    {
      target: "items",
      kind: "aggregation",
      model: "orders",
      path: "/orders",
      childType: "sample.library.ListItem",
      multiple: true,
      multiplicity: "0..n",
      bindable: true,
      hidden: false,
      angularBinding: "@for (order of ordersModel.orders; track order.id)",
      template: {
        component: "sample.library.ListItem",
        contextPath: "orders:/orders[]",
        relativeBindings: [{ target: "title", path: "title", type: "string" }],
      },
    },
  ];
}

function buildDataBindingTemplate(page: DataModelPage): string {
  return `
    <section class="data-binding-example" aria-label="Data binding model materialization">
      <h2>Bindable metadata projection</h2>
      <mat-chip-set aria-label="Generated binding contracts">
        @for (binding of dataBindingContracts; track binding.target) {
          <mat-chip>{{ binding.kind }}: {{ binding.model }}{{ binding.path }} → {{ binding.target }}</mat-chip>
        }
      </mat-chip-set>
      <mat-form-field appearance="outline" data-openui-binding-target="value" data-openui-binding-kind="property" data-openui-binding-model="orders" data-openui-binding-path="/customer/name" data-openui-binding-type="string" data-openui-bindable="true">
        <mat-label>Customer name</mat-label>
        <input matInput readonly [value]="ordersModel.customer.name" aria-describedby="${page.route}-scalar-binding" />
      </mat-form-field>
      <p id="${page.route}-scalar-binding">
        The scalar property binding maps the named orders model path /customer/name to the typed Angular input binding [value]="ordersModel.customer.name".
      </p>
      <mat-list aria-label="Generated aggregation binding" data-openui-binding-target="items" data-openui-binding-kind="aggregation" data-openui-binding-model="orders" data-openui-binding-path="/orders" data-openui-binding-child-type="sample.library.ListItem" data-openui-binding-multiplicity="0..n" data-openui-bindable="true">
        @for (order of ordersModel.orders; track order.id) {
          <mat-list-item data-openui-template-context="orders:/orders[]" data-openui-template-child-type="sample.library.ListItem">
            {{ order.title }} × {{ order.quantity }}
          </mat-list-item>
        }
      </mat-list>
      @if (typePreservingStatusUpdate | async; as statusUpdate) {
        <p class="async-update" data-openui-async-update="type-preserving">
          Async status update: {{ statusUpdate.text }} / {{ statusUpdate.state }}
        </p>
      }
      <p>
        Non-bindable or hidden metadata members are intentionally absent from generated binding targets; only entries with bindable="true" and hidden="false" are emitted.
      </p>
    </section>`;
}

function buildDataBindingStyles(): string {
  return `
.data-binding-example {
  border: 1px solid var(--openui-theme-primary);
  border-radius: 0.75rem;
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
}

.data-binding-example h2 {
  margin: 0;
}

.data-binding-example mat-form-field,
.data-binding-example mat-list {
  max-width: 32rem;
}

.async-update {
  font-weight: 600;
}
`;
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

function buildInteractionTemplate(page: DataModelPage): string {
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

function buildPublicStateInputs(): Array<{
  property: string;
  metadataType: string;
  angularType: string;
  defaultValue: string;
  angularAccessor: string;
  materialBinding: string;
}> {
  return [
    {
      property: "text",
      metadataType: "string",
      angularType: "string",
      defaultValue: '"Submit order"',
      angularAccessor: 'input<string>("Submit order")',
      materialBinding: "button text content",
    },
    {
      property: "enabled",
      metadataType: "boolean",
      angularType: "boolean",
      defaultValue: "true",
      angularAccessor: "input<boolean>(true)",
      materialBinding: '[disabled]="!enabled()"',
    },
    {
      property: "visible",
      metadataType: "boolean",
      angularType: "boolean",
      defaultValue: "true",
      angularAccessor: "input<boolean>(true)",
      materialBinding: "@if (visible())",
    },
    {
      property: "type",
      metadataType: "sample.library.ButtonType",
      angularType: '"Default" | "Emphasized" | "Reject" | "Accept"',
      defaultValue: '"Default"',
      angularAccessor: 'input<"Default" | "Emphasized" | "Reject" | "Accept">("Default")',
      materialBinding: "Material button variant mapping",
    },
  ];
}

function buildHiddenStateExclusion(): {
  policy: string;
  omittedFrom: string[];
  retainedAs: string;
} {
  return {
    policy: "visibility: hidden metadata is not emitted as an Angular input, public accessor, API row, or runnable example",
    omittedFrom: ["Angular inputs", "public accessors", "API examples", "runnable examples"],
    retainedAs: "private implementation evidence only",
  };
}

function buildDerivedStateContract(): {
  stateName: string;
  from: string[];
  declaredType: string;
  defaultValue: string;
  compatibleValues: string[];
  angularAccessor: string;
} {
  return {
    stateName: "effectiveValueState",
    from: ["required", "value", "valueState"],
    declaredType: "sample.library.ValueState",
    defaultValue: '"None"',
    compatibleValues: ["None", "Error", "Warning", "Success", "Information"],
    angularAccessor: 'computed<ValueState>(() => required() && value() === "" ? "Error" : valueState())',
  };
}

function buildStateModelTemplate(page: DataModelPage): string {
  return `
    <section class="state-model-example" aria-label="State model materialization">
      <h2>Public state inputs with declared defaults</h2>
      <p id="${page.route}-state-contract">
        Public metadata properties become typed Angular signal inputs with declared defaults. Hidden metadata is filtered before public API and example emission.
      </p>
      <mat-chip-set aria-label="Public state input defaults">
        @for (state of publicStateInputs; track state.property) {
          <mat-chip
            [attr.data-openui-property]="state.property"
            [attr.data-openui-type]="state.metadataType"
            [attr.data-openui-default-value]="state.defaultValue"
            data-openui-visibility="public"
          >
            {{ state.property }}: {{ state.angularType }} = {{ state.defaultValue }}
          </mat-chip>
        }
      </mat-chip-set>
      @if (visible()) {
        <button
          mat-raised-button
          color="primary"
          type="button"
          [disabled]="!enabled()"
          aria-describedby="${page.route}-state-contract"
          data-openui-property="enabled"
          data-openui-type="boolean"
          data-openui-default-value="true"
        >
          {{ text() }} ({{ type() }})
        </button>
      }
      <dl class="state-accessors" aria-label="Generated Angular state accessors">
        @for (state of publicStateInputs; track state.property) {
          <div>
            <dt>{{ state.property }}</dt>
            <dd>{{ state.angularAccessor }} → {{ state.materialBinding }}</dd>
          </div>
        }
      </dl>
      <section class="state-hidden-exclusion" aria-label="Hidden state exclusion" data-openui-hidden-state-excluded="true">
        <h3>Hidden state exclusion</h3>
        <p>{{ hiddenStateExclusion.policy }}; it is retained as {{ hiddenStateExclusion.retainedAs }}.</p>
        <mat-chip-set aria-label="Hidden state omitted from generated surfaces">
          @for (target of hiddenStateExclusion.omittedFrom; track target) {
            <mat-chip>{{ target }}</mat-chip>
          }
        </mat-chip-set>
      </section>
      <section class="state-derived-compatibility" aria-label="Derived state compatibility">
        <h3>Derived state remains type-compatible</h3>
        <mat-form-field appearance="outline" data-openui-derived-state="effectiveValueState" data-openui-type="sample.library.ValueState">
          <mat-label>Amount</mat-label>
          <input matInput [value]="value()" readonly [attr.aria-invalid]="effectiveValueState() === 'Error'" data-openui-property="value" data-openui-type="string" data-openui-default-value="&quot;&quot;" />
          @if (effectiveValueState() === 'Error') {
            <mat-error>Value is required</mat-error>
          }
        </mat-form-field>
        <dl class="state-accessors">
          <div>
            <dt>Derived state</dt>
            <dd>{{ derivedStateContract.stateName }}</dd>
          </div>
          <div>
            <dt>Source properties</dt>
            <dd>{{ derivedStateContract.from.join(', ') }}</dd>
          </div>
          <div>
            <dt>Declared type</dt>
            <dd>{{ derivedStateContract.declaredType }}</dd>
          </div>
          <div>
            <dt>Computed value</dt>
            <dd>{{ effectiveValueState() }}</dd>
          </div>
        </dl>
        <mat-chip-set aria-label="Derived state compatible values">
          @for (value of derivedStateContract.compatibleValues; track value) {
            <mat-chip>{{ value }}</mat-chip>
          }
        </mat-chip-set>
      </section>
    </section>`;
}

function buildStateModelStyles(): string {
  return `
.state-model-example {
  border: 1px solid var(--openui-theme-primary);
  border-radius: 0.75rem;
  display: grid;
  gap: 1rem;
  justify-items: start;
  margin-top: 1rem;
  padding: 1rem;
}

.state-model-example h2,
.state-model-example h3,
.state-model-example p,
.state-model-example dl {
  margin: 0;
}

.state-accessors,
.state-derived-compatibility,
.state-hidden-exclusion {
  display: grid;
  gap: 0.5rem;
}

.state-accessors div {
  display: grid;
  gap: 0.25rem;
}

.state-accessors dt {
  color: var(--openui-theme-primary);
  font-weight: 600;
}

.state-accessors dd {
  font-family: ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', monospace;
  margin: 0;
}

.state-hidden-exclusion {
  border-inline-start: 0.25rem solid var(--openui-theme-primary);
  padding-inline-start: 1rem;
}

.state-derived-compatibility mat-form-field {
  width: min(100%, 24rem);
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

function buildLayoutTemplate(page: DataModelPage): string {
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

function buildComponentTemplate(page: DataModelPage): string {
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

function buildComponentContractItems(page: DataModelPage): string[] {
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
