import type { FrameworkSpecDocument } from "../spec/framework-spec.types.js";
import { normalizeFeatures, normalizeRoute, normalizeSummary } from "./normalize-spec.js";
import type { UiApplication } from "./ui-model.js";

export function buildUiModel(document: FrameworkSpecDocument): UiApplication {
  const specification = document.specification;
  return {
    name: specification.name ?? specification.id ?? "OpenUI Specification",
    version: specification.version ?? "0.0.0",
    pages: specification.sections.map((section) => ({
      id: section.id,
      route: normalizeRoute(section.id),
      title: section.title,
      summary: normalizeSummary(section),
      sourceDocument: section.document,
      requirements: section.requirements ?? [],
      tags: section.tags ?? [],
      features: normalizeFeatures(section),
    })),
    themeTokens: [
      { name: "--openui-theme-primary", value: "#0a6ed1" },
      { name: "--openui-theme-surface", value: "#ffffff" },
      { name: "--openui-theme-on-surface", value: "#1f2937" },
    ],
  };
}
