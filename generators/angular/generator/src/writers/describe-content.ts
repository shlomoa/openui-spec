/**
 * Produces a short, content-derived summary of a generated file for debug
 * logging, so logs describe what was written without dumping the full file.
 */
export function describeGeneratedContent(relativePath: string, content: string): string {
  const lineCount = content.split("\n").length;
  const extension = relativePath.slice(relativePath.lastIndexOf(".") + 1).toLowerCase();
  const detail = describeByExtension(extension, content);
  return `${detail} (${lineCount} line(s), ${content.length} char(s)).`;
}

function describeByExtension(extension: string, content: string): string {
  switch (extension) {
    case "ts":
      return describeTypeScript(content);
    case "html":
      return describeHtml(content);
    case "scss":
      return describeScss(content);
    case "json":
      return describeJson(content);
    default:
      return "Generated text file";
  }
}

function describeTypeScript(content: string): string {
  const classes = captureAll(content, /export class (\w+)/g);
  const consts = captureAll(content, /export const (\w+)/g);
  const importCount = (content.match(/^import\b/gm) ?? []).length;

  if (consts.includes("routes") && content.includes("Routes")) {
    const pathCount = (content.match(/path:/g) ?? []).length;
    return `Angular route configuration defining ${pathCount} route path(s)`;
  }

  let subject: string;
  if (content.includes("@Component") && classes.length > 0) {
    subject = `Angular standalone component '${classes[0]}'`;
  } else if (content.includes("@Injectable") && classes.length > 0) {
    subject = `Angular injectable service '${classes[0]}'`;
  } else if (classes.length > 0) {
    subject = `TypeScript class '${classes.join("', '")}'`;
  } else if (consts.length > 0) {
    subject = `TypeScript module exporting '${consts.join("', '")}'`;
  } else {
    subject = "TypeScript module";
  }

  return importCount > 0 ? `${subject} with ${importCount} import statement(s)` : subject;
}

function describeHtml(content: string): string {
  if (/<!doctype html>/i.test(content)) {
    return "HTML document shell hosting the Angular root element";
  }

  const materialElements = new Set(captureAll(content, /<(mat-[\w-]+)/g));
  const parts = ["Angular component template"];
  if (materialElements.size > 0) {
    const preview = [...materialElements].slice(0, 3).join(", ");
    const ellipsis = materialElements.size > 3 ? ", …" : "";
    parts.push(`using ${materialElements.size} Material element type(s) (${preview}${ellipsis})`);
  }
  if (/\*ngFor|@for\b/.test(content)) {
    parts.push("with list iteration");
  }
  return parts.join(" ");
}

function describeScss(content: string): string {
  const customProperties = (content.match(/--[\w-]+\s*:/g) ?? []).length;
  const suffix =
    customProperties > 0
      ? ` and ${customProperties} CSS custom propert${customProperties === 1 ? "y" : "ies"}`
      : "";
  return content.includes("@angular/material")
    ? `Global SCSS stylesheet applying the Angular Material theme${suffix}`
    : `SCSS stylesheet${suffix}`;
}

function describeJson(content: string): string {
  try {
    const keys = Object.keys(JSON.parse(content) as Record<string, unknown>);
    return `JSON configuration with top-level key(s): ${keys.join(", ")}`;
  } catch {
    return "JSON document";
  }
}

function captureAll(content: string, pattern: RegExp): string[] {
  return Array.from(content.matchAll(pattern), (match) => match[1]);
}
