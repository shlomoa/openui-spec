import { access } from "node:fs/promises";
import path from "node:path";

import type { OpenUiDocument, OpenUiElement } from "./openui-spec.types";
import { loadOpenUiDocument } from "./load-spec";

export interface CatalogEntry {
  id: string;
  type: string;
  path: string;
}

export class OpenUiCatalogIndex {
  private readonly entriesByType = new Map<string, CatalogEntry[]>();

  add(type: string, entry: CatalogEntry): void {
    const entries = this.entriesByType.get(type) ?? [];
    entries.push(entry);
    this.entriesByType.set(type, entries);
  }

  hasType(type: string): boolean {
    return this.entriesByType.has(type);
  }

  entriesForType(type: string): CatalogEntry[] {
    return this.entriesByType.get(type) ?? [];
  }
}

const CONCRETE_EXAMPLE_ROOT_TYPES = new Set([
  "ApplicationExample",
  "BehaviorExample",
  "ContainerExample",
  "PageExample",
  "WidgetExample",
]);

const CONCRETE_FIXTURE_TYPE_ALIASES: Readonly<Record<string, string>> = {
  Column: "table",
  DateTimePicker: "DateTimePicker",
  EmptyState: "html",
  List: "ul",
  ListItem: "li",
  LoadMore: "button",
  Pagination: "table",
  Step: "step",
  "mat-datetime-picker": "DateTimePicker",
};

const NATIVE_ALIAS_TARGETS = new Set(["button"]);

export function createCatalogIndex(catalog: OpenUiDocument): OpenUiCatalogIndex {
  const index = new OpenUiCatalogIndex();
  visitCatalogNode(catalog, "root", index);
  addConcreteFixtureAliases(index);
  return index;
}

export function isConcreteExampleRootType(type: string): boolean {
  return CONCRETE_EXAMPLE_ROOT_TYPES.has(type);
}

export async function loadDefaultOpenUiCatalog(anchorPath: string): Promise<OpenUiDocument> {
  const catalogPath = await findUp("openui.json", anchorPath);
  return loadOpenUiDocument(catalogPath);
}

function visitCatalogNode(node: OpenUiElement, nodePath: string, index: OpenUiCatalogIndex): void {
  const entry: CatalogEntry = { id: node.id, type: node.type, path: nodePath };
  index.add(node.type, entry);

  const idAlias = aliasFromId(node.id);
  if (idAlias && idAlias !== node.type) {
    index.add(idAlias, entry);
  }

  (node.children ?? []).forEach((child, indexInParent) =>
    visitCatalogNode(child, `${nodePath}.children[${indexInParent}]`, index),
  );
}

function aliasFromId(id: string): string | undefined {
  if (!id || id === "root") {
    return undefined;
  }

  return id.charAt(0).toUpperCase() + id.slice(1);
}

function addConcreteFixtureAliases(index: OpenUiCatalogIndex): void {
  for (const [alias, catalogType] of Object.entries(CONCRETE_FIXTURE_TYPE_ALIASES)) {
    const entries = index.entriesForType(catalogType);
    if (entries.length > 0 && !index.hasType(alias)) {
      entries.forEach((entry) => index.add(alias, entry));
    } else if (NATIVE_ALIAS_TARGETS.has(catalogType) && !index.hasType(alias)) {
      index.add(alias, { id: alias, type: catalogType, path: `native:${catalogType}` });
    }
  }
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
