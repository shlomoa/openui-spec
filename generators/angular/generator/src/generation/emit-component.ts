import type { GeneratedFile } from "../writers/file-writer";
import type { AngularPageModel } from "./angular-model";
import { pageFilePath } from "./angular-paths";

export function emitPageComponent(page: AngularPageModel): GeneratedFile[] {
  return [
    {
      path: pageFilePath(page.route, page.fileName, "ts"),
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
    { path: pageFilePath(page.route, page.fileName, "html"), content: page.template },
    { path: pageFilePath(page.route, page.fileName, "scss"), content: page.styles },
  ];
}
