import type { GeneratedFile } from "../../writers/file-writer.js";
import type { AngularProjectModel } from "./angular-model.js";

export function emitRoutes(project: AngularProjectModel): GeneratedFile {
  const routes = project.pages
    .map(
      (page) => `  {
    path: '${page.route}',
    loadComponent: () => import('./pages/${page.route}/${page.fileName}').then((m) => m.${page.className}),
    title: '${escapeTs(page.title)}',
  }`,
    )
    .join(",\n");

  return {
    path: "src/app/app.routes.ts",
    content: `import { Routes } from '@angular/router';

export const routes: Routes = [
${routes},
  { path: '', pathMatch: 'full', redirectTo: '${project.pages[0]?.route ?? ""}' },
  { path: '**', redirectTo: '${project.pages[0]?.route ?? ""}' },
];
`,
  };
}

function escapeTs(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}
