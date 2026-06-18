import type { GeneratedFile } from "../../writers/file-writer.js";
import type { AngularProjectModel } from "./angular-model.js";
import { emitPageComponent } from "./emit-component.js";
import { emitRoutes } from "./emit-routes.js";
import { emitTheme } from "./emit-theme.js";

export function emitAngularProject(project: AngularProjectModel): GeneratedFile[] {
  return [
    emitPackageJson(project),
    emitAngularJson(project),
    emitTsConfig(),
    emitMain(),
    emitAppComponent(project),
    emitRoutes(project),
    emitTheme(project),
    ...project.pages.flatMap(emitPageComponent),
  ];
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
          "@angular/cli": "22.0.2",
          typescript: "6.0.3",
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

function emitAppComponent(project: AngularProjectModel): GeneratedFile {
  const navItems = project.pages
    .map((page) => `      <a mat-list-item routerLink="/${page.route}">${escapeHtml(page.title)}</a>`)
    .join("\n");
  return {
    path: "src/app/app.component.ts",
    content: `import { Component } from '@angular/core';
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
${navItems}
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  \`,
  styles: [\`
    .shell { min-height: calc(100vh - 64px); }
    mat-sidenav { width: 18rem; }
  \`],
})
export class AppComponent {}
`,
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
