import type { GeneratedFile } from "../writers/file-writer";
import type { AngularDialogComponentModel, AngularProjectModel } from "./angular-model";
import { escapeHtml, escapeTsString } from "./emit-utils";
import { emitPageComponent } from "./emit-component";
import { emitRoutes } from "./emit-routes";
import { emitTheme } from "./emit-theme";
import { toTypeScriptObjectLiteral } from "./typescript-literals";

export function emitAngularProject(project: AngularProjectModel): GeneratedFile[] {
  return [
    emitPackageJson(project),
    emitAngularJson(project),
    emitTsConfig(),
    emitIndexHtml(project),
    emitMain(),
    emitAppComponent(project),
    ...emitApplicationStructureModel(project),
    ...emitExtensionFiles(project),
    ...emitInternationalizationFiles(project),
    emitRoutes(project),
    emitTheme(project),
    ...project.dialogComponents.flatMap(emitDialogComponent),
    ...project.pages.flatMap(emitPageComponent),
  ];
}

function emitDialogComponent(component: AngularDialogComponentModel): GeneratedFile[] {
  const directory = `src/components/${component.directoryName}`;
  return [
    {
      path: `${directory}/${component.fileName}.ts`,
      content: `import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: '${component.selector}',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './${component.fileName}.html',
  styleUrl: './${component.fileName}.scss',
})
export class ${component.className} {
  private readonly dialogRef = inject(MatDialogRef<${component.className}>);

  close(result: ${dialogResultUnion(component)}): void {
    this.dialogRef.close(result);
  }
}
`,
    },
    {
      path: `${directory}/${component.fileName}.html`,
      content: `<h2 mat-dialog-title>${escapeHtml(component.title)}</h2>

<mat-dialog-content>
  ${escapeHtml(component.content)}
</mat-dialog-content>

<mat-dialog-actions align="end">
${component.actions.map(emitDialogAction).join("\n")}
</mat-dialog-actions>
`,
    },
    {
      path: `${directory}/${component.fileName}.scss`,
      content: `:host {
  display: block;
}
`,
    },
  ];
}

function emitDialogAction(action: AngularDialogComponentModel["actions"][number]): string {
  const button = action.emphasis === "warn" ? 'mat-raised-button color="warn"' : "mat-button";
  return `  <button ${button} (click)="close('${escapeTsString(action.result)}')">${escapeHtml(action.text)}</button>`;
}

function dialogResultUnion(component: AngularDialogComponentModel): string {
  const results = [...new Set(component.actions.map((action) => action.result))];
  return results.length > 0 ? results.map((result) => `'${escapeTsString(result)}'`).join(" | ") : "string";
}

function emitIndexHtml(project: AngularProjectModel): GeneratedFile {
  return {
    path: "src/index.html",
    content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${escapeHtml(project.appName)}</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <openui-root></openui-root>
  </body>
</html>
`,
  };
}

function emitPackageJson(project: AngularProjectModel): GeneratedFile {
  return {
    path: "package.json",
    content: `${JSON.stringify(
      {
        name: project.packageName,
        version: "0.0.0",
        private: true,
        scripts: {
          start: "ng serve",
          build: "ng build",
          test: "ng test --watch=false",
        },
        dependencies: {
          "@angular/animations": "^22.0.0",
          "@angular/cdk": "^22.0.2",
          "@angular/common": "^22.0.0",
          "@angular/compiler": "^22.0.0",
          "@angular/core": "^22.0.0",
          "@angular/material": "^22.0.2",
          "@angular/platform-browser": "^22.0.0",
          "@angular/router": "^22.0.0",
          rxjs: "~7.8.0",
          tslib: "^2.3.0",
        },
        devDependencies: {
          "@angular/build": "^22.0.3",
          "@angular/cli": "^22.0.3",
          "@angular/compiler-cli": "^22.0.0",
          typescript: "~6.0.2",
        },
      },
      null,
      2,
    )}\n`,
  };
}

function emitAngularJson(project: AngularProjectModel): GeneratedFile {
  return {
    path: "angular.json",
    content: `${JSON.stringify(
      {
        version: 1,
        projects: {
          [project.packageName]: {
            projectType: "application",
            root: "",
            sourceRoot: "src",
            architect: {
              build: {
                builder: "@angular/build:application",
                options: {
                  browser: "src/main.ts",
                  tsConfig: "tsconfig.json",
                  styles: ["src/styles.scss"],
                },
              },
              serve: {
                builder: "@angular/build:dev-server",
                options: { buildTarget: `${project.packageName}:build` },
              },
            },
          },
        },
      },
      null,
      2,
    )}\n`,
  };
}

function emitTsConfig(): GeneratedFile {
  return {
    path: "tsconfig.json",
    content: `${JSON.stringify(
      {
        compileOnSave: false,
        compilerOptions: {
          strict: true,
          outDir: "./dist/out-tsc",
          forceConsistentCasingInFileNames: true,
          skipLibCheck: true,
          target: "ES2022",
          module: "ES2022",
          moduleResolution: "bundler",
          useDefineForClassFields: false,
          lib: ["ES2022", "dom"],
        },
        angularCompilerOptions: {
          strictTemplates: true,
        },
        files: ["src/main.ts"],
        include: ["src/**/*.ts"],
      },
      null,
      2,
    )}\n`,
  };
}

function emitMain(): GeneratedFile {
  return {
    path: "src/main.ts",
    content: `import { LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { OPENUI_I18N } from './app/openui-i18n.service';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: OPENUI_I18N.angularLocale },
  ],
}).catch((error) => console.error(error));
`,
  };
}

function emitApplicationStructureModel(project: AngularProjectModel): GeneratedFile[] {
  if (!project.applicationStructure) {
    return [];
  }

  return [
    {
      path: "src/app/application-structure.model.ts",
      content: `export const APPLICATION_STRUCTURE = ${JSON.stringify(project.applicationStructure, null, 2)} as const;
`,
    },
  ];
}

function emitExtensionFiles(project: AngularProjectModel): GeneratedFile[] {
  if (!project.extensionModel) {
    return [];
  }

  const extensionModel = project.extensionModel;
  const workspaceCardsPoint = extensionModel.extensionPoints[0];
  const extensionPointsLiteral = Object.fromEntries(
    extensionModel.extensionPoints.map((point) => [
      point.propertyName,
      {
        name: point.name,
        acceptedType: point.acceptedType,
        multiple: point.multiple,
        ownsContent: point.ownsContent,
        compatibilityGate: {
          requires: point.requiredCapabilities,
          minHostVersion: extensionModel.hostVersion,
        },
        renderer: {
          module: point.rendererModule,
          declared: true,
        },
        dragDrop: point.dragDrop,
        designTime: point.designTime,
      },
    ]),
  );

  return [
    {
      path: "src/app/openui-extension.model.ts",
      content: `import type { Type } from '@angular/core';

export const OPENUI_EXTENSION_HOST = ${toTypeScriptObjectLiteral({
        version: extensionModel.hostVersion,
        capabilities: extensionModel.hostCapabilities,
      })} as const;

export const OPENUI_EXTENSION_POINTS = ${toTypeScriptObjectLiteral(extensionPointsLiteral)} as const;

export type OpenUiExtensionCapability = typeof OPENUI_EXTENSION_HOST.capabilities[number];
export type WorkspaceCardArtifactType = ${JSON.stringify(workspaceCardsPoint?.acceptedType ?? "sample.extensions.IWorkspaceCard")};

export interface OpenUiDesignTimeOverlay {
  readonly label: string;
  readonly paletteGroup: string;
  readonly editableProperties: readonly string[];
  readonly aggregations: Record<
    string,
    {
      readonly actions: readonly string[];
      readonly allowedDropTypes: readonly string[];
    }
  >;
}

export interface OpenUiRuntimeMetadata {
  readonly properties: Record<string, { readonly type: string; readonly defaultValue?: unknown }>;
  readonly aggregations: Record<string, { readonly type: string; readonly multiple: boolean }>;
  readonly events: Record<string, { readonly parameters: Record<string, string> }>;
}

export interface OpenUiExtensionPoint<TAcceptedType extends string> {
  readonly name: string;
  readonly acceptedType: TAcceptedType;
  readonly multiple: boolean;
  readonly ownsContent: boolean;
  readonly compatibilityGate: {
    readonly requires: readonly OpenUiExtensionCapability[];
    readonly minHostVersion: string;
  };
  readonly renderer: {
    readonly module: string;
    readonly declared: true;
  };
  readonly dragDrop: {
    readonly aggregation: string;
    readonly acceptedTypes: readonly TAcceptedType[];
    readonly dropEffects: readonly string[];
    readonly source: boolean;
    readonly target: boolean;
  };
  readonly designTime: {
    readonly label: string;
    readonly paletteGroup: string;
    readonly editableProperties: readonly string[];
    readonly actions: readonly string[];
    readonly allowedDropTypes: readonly string[];
  };
}

export interface OpenUiExtensionArtifact<TArtifactType extends string> {
  readonly id: string;
  readonly library: string;
  readonly version: string;
  readonly extensionPoint: string;
  readonly artifactType: TArtifactType;
  readonly component: Type<unknown>;
  readonly capabilities: readonly OpenUiExtensionCapability[];
  readonly runtimeMetadata: OpenUiRuntimeMetadata;
  readonly designTime?: OpenUiDesignTimeOverlay;
  readonly renderer?: { readonly module: string };
  readonly dragDrop?: {
    readonly aggregation: string;
    readonly acceptedTypes: readonly string[];
    readonly dropEffects: readonly string[];
    readonly source: boolean;
    readonly target: boolean;
  };
  readonly compatibility: {
    readonly since: string;
    readonly requires: readonly OpenUiExtensionCapability[];
  };
}

export type WorkspaceCardExtension = OpenUiExtensionArtifact<WorkspaceCardArtifactType>;

export function satisfiesExtensionPoint(
  extension: OpenUiExtensionArtifact<string>,
  extensionPoint: OpenUiExtensionPoint<WorkspaceCardArtifactType>,
  hostCapabilities: readonly OpenUiExtensionCapability[] = OPENUI_EXTENSION_HOST.capabilities,
): extension is WorkspaceCardExtension {
  const hostSatisfiesGate = extensionPoint.compatibilityGate.requires.every((capability) =>
    hostCapabilities.includes(capability),
  );
  const extensionSatisfiesGate = extension.compatibility.requires.every((capability) =>
    hostCapabilities.includes(capability),
  );

  return (
    hostSatisfiesGate &&
    extensionSatisfiesGate &&
    extension.extensionPoint === extensionPoint.name &&
    extension.artifactType === extensionPoint.acceptedType &&
    (extensionPoint.dragDrop.acceptedTypes as readonly string[]).includes(extension.artifactType)
  );
}

export function filterCompatibleExtensions(
  extensions: readonly OpenUiExtensionArtifact<string>[],
  extensionPoint: OpenUiExtensionPoint<WorkspaceCardArtifactType>,
): readonly WorkspaceCardExtension[] {
  return extensions.filter((extension): extension is WorkspaceCardExtension =>
    satisfiesExtensionPoint(extension, extensionPoint),
  );
}
`,
    },
    {
      path: "src/app/openui-extension-samples.ts",
      content: `import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import type { OpenUiExtensionArtifact, WorkspaceCardExtension } from './openui-extension.model';

@Component({
  selector: 'openui-analytics-panel-extension',
  standalone: true,
  imports: [MatCardModule],
  template: \`
    <mat-card appearance="outlined">
      <mat-card-title>Analytics panel</mat-card-title>
      <mat-card-content>Runtime component rendered through the typed workspace.cards outlet.</mat-card-content>
    </mat-card>
  \`,
})
export class OpenUiAnalyticsPanelExtensionComponent {}

export const OPENUI_SAMPLE_WORKSPACE_CARD_EXTENSIONS: readonly WorkspaceCardExtension[] = [
  {
    id: 'sample.extensions.AnalyticsPanel',
    library: 'sample.extensions',
    version: '1.2.0',
    extensionPoint: 'workspace.cards',
    artifactType: 'sample.extensions.IWorkspaceCard',
    component: OpenUiAnalyticsPanelExtensionComponent,
    capabilities: ['extension-artifact', 'design-time-extension', 'renderer-extension', 'drag-drop-extension', 'theme-token-v1'],
    runtimeMetadata: {
      properties: {
        title: { type: 'string', defaultValue: 'Analytics' },
      },
      aggregations: {
        content: { type: 'sap.ui.core.Control', multiple: true },
      },
      events: {
        refresh: { parameters: { reason: 'string' } },
      },
    },
    designTime: {
      label: 'Analytics panel',
      paletteGroup: 'Workspace extensions',
      editableProperties: ['title'],
      aggregations: {
        content: {
          actions: ['move', 'remove'],
          allowedDropTypes: ['sap.ui.core.Control'],
        },
      },
    },
    renderer: { module: 'sample.extensions.WorkspaceColumnRenderer' },
    dragDrop: {
      aggregation: 'cards',
      acceptedTypes: ['sample.extensions.IWorkspaceCard'],
      dropEffects: ['move', 'copy'],
      source: true,
      target: true,
    },
    compatibility: {
      since: '1.2.0',
      requires: ['extension-artifact', 'theme-token-v1'],
    },
  },
] as const;

export const OPENUI_INCOMPATIBLE_WORKSPACE_CARD_EXTENSION = {
  id: 'sample.extensions.RawControl',
  library: 'sample.extensions',
  version: '1.0.0',
  extensionPoint: 'workspace.cards',
  artifactType: 'sap.ui.core.Control',
  component: OpenUiAnalyticsPanelExtensionComponent,
  capabilities: ['extension-artifact'],
  runtimeMetadata: {
    properties: {},
    aggregations: {},
    events: {},
  },
  compatibility: {
    since: '1.0.0',
    requires: ['extension-artifact'],
  },
} as const satisfies OpenUiExtensionArtifact<'sap.ui.core.Control'>;
`,
    },
    {
      path: "src/app/openui-workspace-outlet.component.ts",
      content: `import { NgComponentOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';

import {
  OPENUI_EXTENSION_POINTS,
  filterCompatibleExtensions,
  type WorkspaceCardExtension,
} from './openui-extension.model';

@Component({
  selector: 'openui-workspace-outlet',
  standalone: true,
  imports: [NgComponentOutlet],
  template: \`
    <section class="workspace-extension-outlet" aria-label="Workspace cards extension point" data-openui-extension-point="workspace.cards">
      @for (extension of compatibleExtensions(); track extension.id) {
        <article
          class="workspace-extension-outlet__entry"
          [attr.data-openui-extension-artifact]="extension.id"
          [attr.data-openui-extension-type]="extension.artifactType"
          [attr.data-openui-renderer-extension]="extension.renderer?.module ?? null"
          [attr.data-openui-drag-drop-extension]="extension.dragDrop?.aggregation ?? null"
        >
          <ng-container *ngComponentOutlet="extension.component" />
        </article>
      }
    </section>
  \`,
})
export class OpenUiWorkspaceOutletComponent {
  readonly extensions = input<readonly WorkspaceCardExtension[]>([]);

  protected readonly compatibleExtensions = computed(() =>
    filterCompatibleExtensions(this.extensions(), OPENUI_EXTENSION_POINTS.workspaceCards),
  );
}
`,
    },
  ];
}

function emitInternationalizationFiles(project: AngularProjectModel): GeneratedFile[] {
  if (!project.internationalization) {
    return [
      {
        path: "src/app/openui-i18n.service.ts",
        content: `export const OPENUI_I18N = {
  activeLocale: 'en',
  angularLocale: 'en-US',
  defaultLocale: 'en',
  fallbackLocales: ['en'],
  messageBundles: { en: {} },
  rtlLocales: [],
} as const;
`,
      },
    ];
  }

  return [
    {
      path: "src/app/openui-i18n.service.ts",
      content: `import { Injectable } from '@angular/core';

export const OPENUI_I18N = ${toTypeScriptObjectLiteral(project.internationalization)} as const;

type MessageBundles = typeof OPENUI_I18N.messageBundles;
type Locale = keyof MessageBundles;

@Injectable({ providedIn: 'root' })
export class OpenUiI18nService {
  readonly activeLocale = OPENUI_I18N.activeLocale;
  readonly angularLocale = OPENUI_I18N.angularLocale;

  fallbackChain(): string[] {
    return [...OPENUI_I18N.fallbackLocales];
  }

  message(key: string): string {
    for (const locale of this.fallbackChain()) {
      const bundle = OPENUI_I18N.messageBundles[locale as Locale];
      const value = bundle?.[key as keyof typeof bundle];
      if (value) {
        return value;
      }
    }

    return key;
  }

  textDirection(): 'ltr' | 'rtl' {
    const rtlLocales = OPENUI_I18N.rtlLocales as readonly string[];
    return rtlLocales.includes(this.activeLocale) || rtlLocales.includes(this.activeLocale.split('-')[0])
      ? 'rtl'
      : 'ltr';
  }
}
`,
    },
  ];
}

function emitAppComponent(project: AngularProjectModel): GeneratedFile {
  const navItems = project.pages
    .map((page) => `      <a mat-list-item routerLink="/${page.route}">${escapeHtml(page.title)}</a>`)
    .join("\n");
  const applicationStructureImport = project.applicationStructure
    ? "import { APPLICATION_STRUCTURE } from './application-structure.model';\n"
    : "";
  const applicationStructureMetadata = project.applicationStructure
    ? `
        <mat-list class="shell-metadata" aria-label="Resolved application structure">
          <mat-list-item>Root component: {{ applicationStructure.rootComponent }}</mat-list-item>
          <mat-list-item>Navigation container: {{ applicationStructure.navigationContainer.component }}</mat-list-item>
        </mat-list>`
    : "";
  const applicationStructureMember = project.applicationStructure
    ? "\n  protected readonly applicationStructure = APPLICATION_STRUCTURE;"
    : "";
  return {
    path: "src/app/app.component.ts",
    content: `${applicationStructureImport}import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'openui-root',
  standalone: true,
  imports: [MatListModule, MatSidenavModule, MatToolbarModule, RouterLink, RouterOutlet],
  template: \`
    <mat-toolbar color="primary">${escapeHtml(project.appName)}</mat-toolbar>
    <mat-sidenav-container class="shell">
      <mat-sidenav mode="side" opened>
${applicationStructureMetadata}
${navItems}
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  \`,
  styles: [\`
    .shell { min-height: calc(100vh - 64px); }
    .shell-metadata { font-size: 0.875rem; }
    mat-sidenav { width: 18rem; }
  \`],
})
export class AppComponent {${applicationStructureMember}
}
`,
  };
}
