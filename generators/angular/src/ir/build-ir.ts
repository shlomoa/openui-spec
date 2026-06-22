import type { FrameworkSpecDocument } from "../spec/framework-spec.types";
import { normalizeFeatures, normalizeRoute, normalizeSummary } from "./normalize-spec";
import type { UiApplication } from "./ui-model";

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
      formalDefinitions: (section.formalDefinitions ?? []).flatMap((definition) =>
        definition.term && definition.definition
          ? [{ term: definition.term, definition: definition.definition }]
          : [],
      ),
      features: normalizeFeatures(section),
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
