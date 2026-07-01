import type { GeneratedFile } from "../writers/file-writer";
import type { AngularProjectModel } from "./angular-model";

export function emitTheme(project: AngularProjectModel): GeneratedFile {
  const tokens = project.themeTokens.map((token) => `  ${token.name}: ${token.value};`).join("\n");
  return {
    path: "src/styles.scss",
    content: `@use '@angular/material' as mat;

html {
  @include mat.theme((
    color: (
      primary: mat.$azure-palette,
      tertiary: mat.$blue-palette,
    ),
    typography: Roboto,
    density: 0,
  ));
}

:root {
${tokens}
}

body {
  margin: 0;
  font-family: Roboto, Arial, sans-serif;
}
`,
  };
}
