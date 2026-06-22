import type { GeneratedFile } from "../../writers/file-writer";
import type { AngularProjectModel } from "./angular-model";
import { emitPageComponent } from "./emit-component";
import { emitRoutes } from "./emit-routes";
import { emitTheme } from "./emit-theme";

export function emitAngularProject(project: AngularProjectModel): GeneratedFile[] {
  return [
    emitPackageJson(project),
    emitAngularJson(project),
    emitTsConfig(),
    emitIndexHtml(project),
    emitMain(),
    emitAppComponent(project),
    ...emitApplicationStructureModel(project),
    emitRoutes(project),
    emitTheme(project),
    ...project.pages.flatMap(emitPageComponent),
  ];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
          "@angular/animations": "22.0.2",
          "@angular/cdk": "22.0.2",
          "@angular/common": "22.0.2",
          "@angular/compiler": "22.0.2",
          "@angular/core": "22.0.2",
          "@angular/material": "22.0.2",
          "@angular/platform-browser": "22.0.2",
          "@angular/router": "22.0.2",
          rxjs: "7.8.2",
          tslib: "2.8.1",
          "zone.js": "0.16.2",
        },
        devDependencies: {
          "@angular/build": "22.0.2",
          "@angular/cli": "22.0.2",
          typescript: "6.0.3",
        },
        overrides: {
          "@babel/core": "7.29.7",
          esbuild: "0.28.1",
          vite: "7.3.5",
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
    content: `import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), provideRouter(routes)],
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
