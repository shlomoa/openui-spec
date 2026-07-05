import { childrenOfType, extractOpenUiScopeNodes, findElementsByType, stringAttr } from "../spec/openui-sections";
import type { OpenUiDocument, OpenUiElement } from "../spec/openui-spec.types";
import { normalizeFeatures, normalizeRoute, normalizeSummary } from "./normalize-spec";
import type {
  DataModelApplication,
  DataModelDialogAction,
  DataModelDialogComponent,
  DataModelFeature,
  DataModelThemeToken,
} from "./data-model";

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

function buildConcreteInputModel(document: OpenUiDocument): DataModelApplication {
  const firstConcreteChild = document.children?.[0];
  const pageId = firstConcreteChild ? lowerFirst(firstConcreteChild.type) : document.id;
  const pageTitle = unquote(stringAttr(document, "title")) ?? titleFromName(pageId);
  const dialog = findElementsByType(document, "Dialog")[0];
  const dialogComponents = dialog ? [buildDialogComponent(dialog)] : [];
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
        },
      ]
    : [];

  return {
    name: unquote(stringAttr(document, "name")) ?? pageTitle ?? "OpenUI Application",
    version: document.version,
    pages,
    dialogComponents,
    themeTokens: defaultThemeTokens(),
  };
}

function buildDialogComponent(dialog: OpenUiElement): DataModelDialogComponent {
  const title = unquote(stringAttr(childrenOfType(dialog, "DialogTitle")[0] ?? dialog, "text")) ?? "Dialog";
  const content = unquote(stringAttr(childrenOfType(dialog, "DialogContent")[0] ?? dialog, "text")) ?? "";
  const actions = childrenOfType(dialog, "DialogActions").flatMap((actionsNode) =>
    (actionsNode.children ?? []).filter((child) => child.type === "button").map(buildDialogAction),
  );
  const directoryName = `app-${normalizeRoute(dialog.id)}`;

  return {
    id: dialog.id,
    selector: directoryName,
    className: `${toPascalCase(directoryName)}Component`,
    directoryName,
    fileName: `${directoryName}.component`,
    title,
    content,
    actions,
  };
}

function buildDialogAction(action: OpenUiElement): DataModelDialogAction {
  const text = unquote(stringAttr(action, "text")) ?? titleFromName(action.id);
  const result = resultFromClick(stringAttr(action, "(click)")) ?? normalizeRoute(action.id);
  const lowerText = text.toLowerCase();
  return {
    id: action.id,
    text,
    result,
    emphasis: result === "confirm" || lowerText.includes("delete") ? "warn" : "default",
  };
}

function concreteRequirements(node: OpenUiElement): string[] {
  return [
    `Materialize ${node.type} node '${node.id}'.`,
    ...(node.children ?? []).map((child) => `Preserve ${child.type} child '${child.id}'.`),
  ];
}

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

function resultFromClick(value: string | undefined): string | undefined {
  return value?.match(/^close\('([^']+)'\)$/)?.[1];
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

function toPascalCase(value: string): string {
  return value
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function titleFromName(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
