import type { GeneratedFile } from "../writers/file-writer";
import type { AngularDialogComponentModel } from "./angular-model";
import { escapeHtml, escapeTsString } from "./emit-utils";

export function emitDialogComponent(component: AngularDialogComponentModel): GeneratedFile[] {
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
