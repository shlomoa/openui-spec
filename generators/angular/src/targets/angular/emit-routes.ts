import type { GeneratedFile } from "../../writers/file-writer";
import type { AngularProjectModel } from "./angular-model";
import { routedPageImportPath } from "./angular-paths";
import { escapeTsString } from "./emit-utils";

export function emitRoutes(project: AngularProjectModel): GeneratedFile {
  const routes = project.pages
    .map(
      (page) => `  {
    path: '${page.route}',
    loadComponent: () => import('${routedPageImportPath(page.route, page.fileName)}').then((m) => m.${page.className}),
    title: '${escapeTsString(page.title)}',
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
