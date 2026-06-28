import type { OpenUiScopeNode } from "../spec/openui-spec.types";
import type { UiFeature } from "./ui-model";

const SCOPE_FEATURES: Record<string, UiFeature[]> = {
  application: ["application-structure"],
  routing: ["navigation"],
  navigation: ["navigation"],
  toolBars: ["navigation"],
  controls: ["component"],
  native: ["component"],
  dialog: ["component", "feedback"],
  behaviors: ["interaction"],
  dragAndDrop: ["interaction", "layout"],
  resizable: ["interaction", "layout"],
  collapsible: ["interaction"],
  predefinedPages: ["navigation"],
  dashboard: ["navigation", "layout"],
  shellPage: ["application-structure", "navigation"],
  emptyPage: ["navigation"],
  views: ["data-binding"],
  reports: ["data-binding"],
  forms: ["form", "data-binding"],
  containers: ["layout"],
  grid: ["layout"],
  expandablePanels: ["layout"],
  tabs: ["layout"],
  widgets: ["component"],
  charts: ["component", "data-binding"],
  tables: ["component", "data-binding"],
  lists: ["component", "data-binding"],
  dateTimePickers: ["component", "form"],
  stepper: ["component", "navigation"],
};

export function normalizeRoute(sectionId: string): string {
  return sectionId
    .replace(/^\d+-/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export function normalizeSummary(scope: OpenUiScopeNode): string {
  return scope.purpose ?? scope.requirements?.[0] ?? `Generated page for ${scope.title}.`;
}

export function normalizeFeatures(scope: OpenUiScopeNode): UiFeature[] {
  return SCOPE_FEATURES[scope.id] ?? [];
}
