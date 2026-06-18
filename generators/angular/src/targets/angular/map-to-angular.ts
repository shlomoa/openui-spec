import type { UiApplication, UiPage } from "../../ir/ui-model.js";
import type { AngularPageModel, AngularProjectModel } from "./angular-model.js";

export function mapToAngularProject(uiModel: UiApplication): AngularProjectModel {
  return {
    appName: uiModel.name,
    packageName: toPackageName(uiModel.name),
    version: uiModel.version,
    pages: uiModel.pages.map(mapPage),
    themeTokens: uiModel.themeTokens,
  };
}

function mapPage(page: UiPage): AngularPageModel {
  const className = `${toPascalCase(page.route)}Page`;
  const imports = new Set(["CommonModule", "MatCardModule", "MatButtonModule"]);
  const componentImports = new Set([
    "import { CommonModule } from '@angular/common';",
    "import { Component } from '@angular/core';",
    "import { MatButtonModule } from '@angular/material/button';",
    "import { MatCardModule } from '@angular/material/card';",
  ]);
  const constructorParameters: string[] = [];
  const members: string[] = [];

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
    .map((requirement) => `      <li>${escapeHtml(requirement)}</li>`)
    .join("\n");
  const requirements = requirementItems ? `\n    <ul>\n${requirementItems}\n    </ul>` : "";
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

  return `<section class="spec-page" aria-labelledby="${titleId}">
  <mat-card>
    <mat-card-header>
      <mat-card-title id="${titleId}">${escapeHtml(page.title)}</mat-card-title>
      <mat-card-subtitle>${escapeHtml(page.id)}</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <p>${escapeHtml(page.summary)}</p>${requirements}${form}${navigation}${feedback}${accessibility}
    </mat-card-content>
  </mat-card>
</section>
`;
}

function buildStyles(page: UiPage): string {
  const themeStyles = page.features.includes("theme")
    ? "\n:host {\n  --openui-section-accent: var(--openui-theme-primary);\n}\n"
    : "";
  return `.spec-page {
  display: block;
  padding: 1rem;
}

mat-card {
  background: var(--openui-theme-surface);
  color: var(--openui-theme-on-surface);
}
${themeStyles}`;
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
