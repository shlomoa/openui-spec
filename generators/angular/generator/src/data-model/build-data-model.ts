import { extractOpenUiScopeNodes, stringAttr } from "../spec/openui-sections";
import type { OpenUiDocument, OpenUiElement } from "../spec/openui-spec.types";
import { buildElementTree } from "./element-model";
import { normalizeFeatures, normalizeRoute, normalizeSummary } from "./normalize-spec";
import type { DataModelApplication, DataModelFeature, DataModelThemeToken } from "./data-model";

/**
 * Builds the implementation-independent {@link DataModelApplication} from an
 * OpenUI document. When the document declares scope nodes, each scope becomes a
 * page; otherwise the document is treated as concrete input and modeled via
 * {@link buildConcreteInputModel}.
 */
export function buildDataModel(document: OpenUiDocument): DataModelApplication {
  const scopes = extractOpenUiScopeNodes(document);
  if (scopes.length === 0) {
    return buildConcreteInputModel(document);
  }

  return {
    name: typeof document.attrs?.name === "string" ? document.attrs.name : "OpenUI Specification",
    version: document.version,
    pages: scopes.map((scope) => ({
      id: scope.id,
      route: normalizeRoute(scope.id),
      title: scope.title,
      summary: normalizeSummary(scope),
      sourceDocument: scope.document,
      requirements: scope.requirements ?? [],
      tags: scope.tags,
      formalDefinitions: scope.formalDefinitions,
      features: normalizeFeatures(scope),
    })),
    themeTokens: defaultThemeTokens(),
  };
}

/**
 * Models a document that carries concrete UI input rather than scope nodes,
 * deriving a single page from its first child. The element tree of the whole
 * document is kept for the renderers, which emit the components its elements need.
 */
function buildConcreteInputModel(document: OpenUiDocument): DataModelApplication {
  const firstConcreteChild = document.children?.[0];
  const pageId = firstConcreteChild ? lowerFirst(firstConcreteChild.type) : document.id;
  const pageTitle = unquote(stringAttr(document, "title")) ?? titleFromName(pageId);
  const pages = firstConcreteChild
    ? [
        {
          id: pageId,
          route: normalizeRoute(pageId),
          title: pageTitle,
          summary: `Concrete ${document.type} input for ${firstConcreteChild.type}.`,
          requirements: concreteRequirements(firstConcreteChild),
          tags: [],
          formalDefinitions: [],
          features: ["component"] as DataModelFeature[],
          element: buildElementTree(firstConcreteChild),
        },
      ]
    : [];

  return {
    name: unquote(stringAttr(document, "name")) ?? pageTitle ?? "OpenUI Application",
    version: document.version,
    pages,
    element: buildElementTree(document),
    themeTokens: defaultThemeTokens(),
  };
}

/** Produces the human-readable requirements for a concrete input node: materialize the node itself and preserve each of its children. */
function concreteRequirements(node: OpenUiElement): string[] {
  return [
    `Materialize ${node.type} node '${node.id}'.`,
    ...(node.children ?? []).map((child) => `Preserve ${child.type} child '${child.id}'.`),
  ];
}

/** Returns the default theme tokens (color, spacing, and density custom properties) applied to every generated application. */
function defaultThemeTokens(): DataModelThemeToken[] {
  return [
    { name: "--openui-theme-primary", value: "#0a6ed1" },
    { name: "--openui-theme-surface", value: "#ffffff" },
    { name: "--openui-theme-on-surface", value: "#1f2937" },
    { name: "--openui-spacing-1", value: "0.25rem" },
    { name: "--openui-spacing-2", value: "0.5rem" },
    { name: "--openui-spacing-4", value: "1rem" },
    { name: "--openui-spacing-6", value: "1.5rem" },
    { name: "--openui-density-cozy-control-height", value: "3rem" },
    { name: "--openui-density-compact-control-height", value: "2rem" },
  ];
}

function unquote(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  return value.replace(/^"(.*)"$/, "$1");
}

function lowerFirst(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function titleFromName(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
