import { createCatalogIndex, OpenUiCatalogIndex } from "./catalog-index";
import { extractOpenUiScopeNodes } from "./openui-sections";
import type { OpenUiDocument, OpenUiElement } from "./openui-spec.types";
import { type Diagnostic, SpecValidationError } from "./diagnostics";
import { grammarDiagnostics } from "./document-schema";

export interface ValidateOpenUiSpecOptions {
  catalog?: OpenUiCatalogIndex | OpenUiDocument;
  mode?: "input" | "catalog";
}

export function validateOpenUiSpec(document: OpenUiDocument, options: ValidateOpenUiSpecOptions = {}): void {
  // The grammar stage stops the later stages: they need a well-formed document.
  const diagnostics = grammarDiagnostics(document);
  if (diagnostics.length === 0) {
    validateUniqueIds(document, "", new Set<string>(), diagnostics);
  }

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

function validateUniqueIds(node: OpenUiElement, pointer: string, seenIds: Set<string>, diagnostics: Diagnostic[]): void {
  if (seenIds.has(node.id)) {
    diagnostics.push({ code: "document/duplicate-id", path: `${pointer}/id`, message: `Duplicate element id '${node.id}'.` });
  }
  seenIds.add(node.id);

  (node.children ?? []).forEach((child, index) =>
    validateUniqueIds(child, `${pointer}/children/${index}`, seenIds, diagnostics),
  );
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
  validateCatalogReference(node, "", catalog, diagnostics);
}

function validateCatalogVersion(
  document: OpenUiDocument,
  catalog: OpenUiCatalogIndex,
  diagnostics: Diagnostic[],
): void {
  if (document.version !== catalog.version) {
    diagnostics.push({
      code: "document/unsupported-version",
      path: "/version",
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
    diagnostics.push({ code: "catalog/unknown-type", path: `${path}/type`, message: `Unknown OpenUI object type '${node.type}'.` });
  }

  (node.children ?? []).forEach((child, index) =>
    validateCatalogReference(child, `${path}/children/${index}`, catalog, diagnostics),
  );
}

function toCatalogIndex(catalog: OpenUiCatalogIndex | OpenUiDocument): OpenUiCatalogIndex {
  return catalog instanceof OpenUiCatalogIndex ? catalog : createCatalogIndex(catalog);
}
