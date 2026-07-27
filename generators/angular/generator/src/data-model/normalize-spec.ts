import type { OpenUiScopeNode } from "../spec/openui-spec.types";
import type { DataModelFeature } from "./data-model";

const SCOPE_FEATURES: Record<string, DataModelFeature[]> = {
  scopes: ["ui-concept"],
  application: ["application-structure"],
  routing: ["navigation"],
  navigation: ["navigation"],
  toolBars: ["navigation"],
  favicon: ["application-structure", "theme"],
  indexHtml: ["application-structure"],
  controls: ["component"],
  native: ["component"],
  actionControls: ["component", "interaction"],
  textInputs: ["component", "form", "state-model"],
  choiceControls: ["component", "form", "state-model"],
  pickerControls: ["component", "form"],
  rangeControls: ["component", "state-model"],
  drawingAndCapture: ["component", "interaction"],
  displayPrimitives: ["component", "theme"],
  statusIndicators: ["component", "feedback"],
  linkAndScrollControls: ["component", "navigation", "interaction"],
  tableScope: ["component", "data-binding"],
  table: ["component", "data-binding"],
  tr: ["component", "data-binding"],
  th: ["component", "data-binding"],
  td: ["component", "data-binding"],
  dialog: ["component", "feedback"],
  behaviors: ["interaction"],
  dragAndDrop: ["interaction", "layout"],
  resizable: ["interaction", "layout"],
  collapsible: ["interaction"],
  pages: ["navigation"],
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
  surfaceContainers: ["layout"],
  sheetContainers: ["layout"],
  overlayContainers: ["layout", "feedback"],
  structuralContainers: ["layout"],
  splitters: ["layout", "interaction"],
  interaction: ["interaction"],
  internationalization: ["internationalization"],
  layout: ["layout"],
  presentation: ["theme"],
  widgets: ["component"],
  charts: ["component", "data-binding"],
  tables: ["component", "data-binding"],
  lists: ["component", "data-binding"],
  dateTimePickers: ["component", "form"],
  stepper: ["component", "navigation"],
  dataGrid: ["component", "data-binding", "interaction"],
  feedbackWidgets: ["component", "feedback"],
  mediaWidgets: ["component"],
  navigationWidgets: ["component", "navigation"],
  menuWidgets: ["component", "navigation", "interaction"],
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

export function normalizeFeatures(scope: OpenUiScopeNode): DataModelFeature[] {
  return SCOPE_FEATURES[scope.id] ?? [];
}
