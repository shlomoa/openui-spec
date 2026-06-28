export function pageDirectory(route: string): string {
  return `src/app/pages/${route}`;
}

export function pageFilePath(route: string, fileName: string, extension: "ts" | "html" | "scss"): string {
  return `${pageDirectory(route)}/${fileName}.${extension}`;
}

export function routedPageImportPath(route: string, fileName: string): string {
  return `./pages/${route}/${fileName}`;
}
