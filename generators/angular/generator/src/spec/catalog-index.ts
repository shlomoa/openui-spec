import { access } from "node:fs/promises";
import path from "node:path";

import type { OpenUiDocument, OpenUiElement } from "./openui-spec.types";
import { loadOpenUiDocument } from "./load-spec";

export class OpenUiCatalogIndex {
  private readonly types = new Set<string>();

  constructor(readonly version: string) {}

  add(type: string): void {
    this.types.add(type);
  }

  hasType(type: string): boolean {
    return this.types.has(type);
  }
}

export function createCatalogIndex(catalog: OpenUiDocument): OpenUiCatalogIndex {
  const index = new OpenUiCatalogIndex(catalog.version);
  visitCatalogNode(catalog, index);
  return index;
}

export async function loadDefaultOpenUiCatalog(anchorPath: string): Promise<OpenUiDocument> {
  const catalogPath = await findUp(path.join("spec", "openui.json"), anchorPath);
  return loadOpenUiDocument(catalogPath);
}

function visitCatalogNode(node: OpenUiElement, index: OpenUiCatalogIndex): void {
  index.add(node.type);
  (node.children ?? []).forEach((child) => visitCatalogNode(child, index));
}

async function findUp(fileName: string, anchorPath: string): Promise<string> {
  let directory = path.extname(anchorPath) ? path.dirname(path.resolve(anchorPath)) : path.resolve(anchorPath);

  while (true) {
    const candidate = path.join(directory, fileName);
    try {
      await access(candidate);
      return candidate;
    } catch {
      const parent = path.dirname(directory);
      if (parent === directory) {
        throw new Error(`Could not find ${fileName} from ${anchorPath}.`);
      }
      directory = parent;
    }
  }
}
