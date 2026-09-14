import { createCatalogIndex, OpenUiCatalogIndex } from "./catalog-index";
import { extractOpenUiScopeNodes } from "./openui-sections";
import type { OpenUiDocument, OpenUiElement } from "./openui-spec.types";
import { type Diagnostic, SpecValidationError } from "./diagnostics";

export interface ValidateOpenUiSpecOptions {
  catalog?: OpenUiCatalogIndex | OpenUiDocument;
  mode?: "input" | "catalog";
}

const ROOT_KEYS = new Set(["version", "id", "type", "attrs", "children"]);
const ELEMENT_KEYS = new Set(["id", "type", "attrs", "children"]);
const ID_PATTERN = /^[a-z][A-Za-z0-9]*$/;
const VERSION_PATTERN = /^[0-9]+\.[0-9]+\.[0-9]+$/;
const KEBAB_TYPE_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const PASCAL_TYPE_PATTERN = /^[A-Z][A-Za-z0-9]*(?:-[a-z][a-z0-9]*)?$/;

export function validateOpenUiSpec(document: OpenUiDocument, options: ValidateOpenUiSpecOptions = {}): void {
  const diagnostics: Diagnostic[] = [];
  validateElement(document, "root", true, new Set<string>(), diagnostics);

  if (diagnostics.length === 0 && options.mode === "catalog") {
    validateScopeCoverage(document, diagnostics);
  }

  if (diagnostics.length === 0 && options.catalog) {
    const catalog = toCatalogIndex(options.catalog);
    validateCatalogVersion(document, catalog, diagnostics);
    validateCatalogReferences(document, catalog, diagnostics);
  }

  if (diagnostics.length > 0) {
    throw new SpecValidationError(diagnostics);
  }
}

export function validateOpenUiCatalog(
  document: OpenUiDocument,
  catalog?: OpenUiCatalogIndex | OpenUiDocument,
): void {
  validateOpenUiSpec(document, { mode: "catalog", catalog });
}

export function validateOpenUiGeneratorInput(
  document: OpenUiDocument,
  catalog: OpenUiCatalogIndex | OpenUiDocument,
): void {
  if (extractOpenUiScopeNodes(document).length > 0) {
    validateOpenUiCatalog(document, catalog);
    return;
  }

  validateOpenUiSpec(document, { catalog });
}

function validateElement(
  value: unknown,
  path: string,
  isRoot: boolean,
  seenIds: Set<string>,
  diagnostics: Diagnostic[],
): void {
  if (!isRecord(value)) {
    diagnostics.push({ path, message: "Expected an OpenUI element object." });
    return;
  }

  const allowedKeys = isRoot ? ROOT_KEYS : ELEMENT_KEYS;
  for (const key of Object.keys(value)) {
    if (!allowedKeys.has(key)) {
      diagnostics.push({
        path: `${path}.${key}`,
        message: "Loose properties are not allowed; put non-structural data under attrs.",
      });
    }
  }

  if (isRoot && (typeof value.version !== "string" || !VERSION_PATTERN.test(value.version))) {
    diagnostics.push({ path: `${path}.version`, message: 'Root version must use "major.minor.patch" format.' });
  }
  if (isRoot && value.id !== "root") {
    diagnostics.push({ path: `${path}.id`, message: 'Root id must be exactly "root".' });
  }

  if (typeof value.id !== "string") {
    diagnostics.push({ path: `${path}.id`, message: "Element id is required." });
  } else {
    if (!ID_PATTERN.test(value.id)) {
      diagnostics.push({ path: `${path}.id`, message: `Element id '${value.id}' must be camelCase alphanumeric.` });
    }
    if (seenIds.has(value.id)) {
      diagnostics.push({ path: `${path}.id`, message: `Duplicate element id '${value.id}'.` });
    }
    seenIds.add(value.id);
  }

  if (typeof value.type !== "string") {
    diagnostics.push({ path: `${path}.type`, message: "Element type is required." });
  } else if (!isValidType(value.type)) {
    diagnostics.push({ path: `${path}.type`, message: `Element type '${value.type}' is not a valid OpenUI type.` });
  }

  if (value.attrs !== undefined) {
    if (!isRecord(value.attrs)) {
      diagnostics.push({ path: `${path}.attrs`, message: "attrs must be an object." });
    } else {
      for (const [key, attrValue] of Object.entries(value.attrs)) {
        if (attrValue !== null && typeof attrValue !== "string") {
          diagnostics.push({ path: `${path}.attrs.${key}`, message: "Attribute values must be strings or null." });
        }
      }
    }
  }

  if (value.children !== undefined) {
    if (!Array.isArray(value.children)) {
      diagnostics.push({ path: `${path}.children`, message: "children must be an array." });
      return;
    }
    value.children.forEach((child, index) =>
      validateElement(child, `${path}.children[${index}]`, false, seenIds, diagnostics),
    );
  }
}

function validateScopeCoverage(document: OpenUiDocument, diagnostics: Diagnostic[]): void {
  const scopeNodes = extractOpenUiScopeNodes(document);
  if (scopeNodes.length === 0) {
    if ((document.children ?? []).length === 0) {
      return;
    }

    diagnostics.push({ path: "root.children", message: "Expected at least one scoped OpenUI node with attrs.scopeDocument." });
    return;
  }

  const seenDocuments = new Set<string>();
  scopeNodes.forEach((scope, index) => {
    const path = `scope[${index}]`;
    if (!scope.title) {
      diagnostics.push({ path: `${path}.attrs.title`, message: "Scoped OpenUI nodes require attrs.title or a usable type name." });
    }

    if (!scope.document) {
      diagnostics.push({ path: `${path}.attrs.scopeDocument`, message: "Scoped OpenUI nodes require attrs.scopeDocument." });
    } else if (seenDocuments.has(scope.document)) {
      diagnostics.push({ path: `${path}.attrs.scopeDocument`, message: `Duplicate scope document '${scope.document}'.` });
    } else {
      seenDocuments.add(scope.document);
    }
  });
}

function validateCatalogReferences(
  node: OpenUiDocument,
  catalog: OpenUiCatalogIndex,
  diagnostics: Diagnostic[],
): void {
  validateCatalogReference(node, "root", catalog, diagnostics);
}

function validateCatalogVersion(
  document: OpenUiDocument,
  catalog: OpenUiCatalogIndex,
  diagnostics: Diagnostic[],
): void {
  if (document.version !== catalog.version) {
    diagnostics.push({
      path: "root.version",
      message: `Root version '${document.version}' does not match catalog version '${catalog.version}'.`,
    });
  }
}

function validateCatalogReference(
  node: OpenUiElement,
  path: string,
  catalog: OpenUiCatalogIndex,
  diagnostics: Diagnostic[],
): void {
  if (!catalog.hasType(node.type)) {
    diagnostics.push({ path: `${path}.type`, message: `Unknown OpenUI object type '${node.type}'.` });
  }

  (node.children ?? []).forEach((child, index) =>
    validateCatalogReference(child, `${path}.children[${index}]`, catalog, diagnostics),
  );
}

function toCatalogIndex(catalog: OpenUiCatalogIndex | OpenUiDocument): OpenUiCatalogIndex {
  return catalog instanceof OpenUiCatalogIndex ? catalog : createCatalogIndex(catalog);
}

function isValidType(type: string): boolean {
  return KEBAB_TYPE_PATTERN.test(type) || PASCAL_TYPE_PATTERN.test(type);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
