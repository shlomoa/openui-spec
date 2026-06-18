import type { GeneratedFile } from "../../writers/file-writer.js";
import type { AngularPageModel } from "./angular-model.js";

export function emitPageComponent(page: AngularPageModel): GeneratedFile[] {
  const pageDirectory = `src/app/pages/${page.route}`;
  return [
    {
      path: `${pageDirectory}/${page.fileName}.ts`,
      content: `${page.componentImports.join("\n")}

@Component({
  selector: '${page.selector}',
  standalone: true,
  imports: [${page.imports.join(", ")}],
  templateUrl: './${page.fileName}.html',
  styleUrl: './${page.fileName}.scss',
})
export class ${page.className} {
${page.constructorParameters.length > 0 ? `  constructor(${page.constructorParameters.join(", ")}) {}\n` : ""}${page.members.map((member) => `  ${member}`).join("\n")}
}
`,
    },
    { path: `${pageDirectory}/${page.fileName}.html`, content: page.template },
    { path: `${pageDirectory}/${page.fileName}.scss`, content: page.styles },
  ];
}
