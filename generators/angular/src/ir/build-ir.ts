import { extractOpenUiScopeNodes } from "../spec/openui-sections";
import type { OpenUiDocument } from "../spec/openui-spec.types";
import { normalizeFeatures, normalizeRoute, normalizeSummary } from "./normalize-spec";
import type { UiApplication } from "./ui-model";

export function buildUiModel(document: OpenUiDocument): UiApplication {
  const scopes = extractOpenUiScopeNodes(document);
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
    themeTokens: [
      { name: "--openui-theme-primary", value: "#0a6ed1" },
      { name: "--openui-theme-surface", value: "#ffffff" },
      { name: "--openui-theme-on-surface", value: "#1f2937" },
      { name: "--openui-spacing-1", value: "0.25rem" },
      { name: "--openui-spacing-2", value: "0.5rem" },
      { name: "--openui-spacing-4", value: "1rem" },
      { name: "--openui-spacing-6", value: "1.5rem" },
      { name: "--openui-density-cozy-control-height", value: "3rem" },
      { name: "--openui-density-compact-control-height", value: "2rem" },
    ],
  };
}
