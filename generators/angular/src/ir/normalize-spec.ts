import type { FrameworkSpecSection } from "../spec/framework-spec.types";
import type { UiFeature } from "./ui-model";

const SECTION_FEATURES: Record<string, UiFeature> = {
  "05-ui-concept-model": "ui-concept",
  "06-application-structure": "application-structure",
  "07-layout-system": "layout",
  "08-component-model": "component",
  "09-interaction-model": "interaction",
  "12-form-model": "form",
  "13-navigation-model": "navigation",
  "14-feedback-model": "feedback",
  "15-accessibility-model": "accessibility",
  "16-theming-design-tokens": "theme",
  "22-test-acceptance-criteria": "acceptance",
  "23-reference-examples": "reference",
};

export function normalizeRoute(sectionId: string): string {
  return sectionId.replace(/^\d+-/, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
}

export function normalizeSummary(section: FrameworkSpecSection): string {
  return section.purpose ?? section.requirements?.[0] ?? `Generated page for ${section.title}.`;
}

export function normalizeFeatures(section: FrameworkSpecSection): UiFeature[] {
  const feature = SECTION_FEATURES[section.id];
  return feature ? [feature] : [];
}
