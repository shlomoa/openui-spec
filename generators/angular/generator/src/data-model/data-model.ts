import type { DataModelElement } from "./element-model";

export type DataModelFeature =
  | "accessibility"
  | "acceptance"
  | "application-structure"
  | "component"
  | "compliance"
  | "data-binding"
  | "extension"
  | "feedback"
  | "form"
  | "internationalization"
  | "interaction"
  | "layout"
  | "navigation"
  | "performance"
  | "reference"
  | "security"
  | "state-model"
  | "theme"
  | "ui-concept";

export interface DataModelApplication {
  name: string;
  version: string;
  pages: DataModelPage[];
  /** The element tree of the whole document; present for concrete input only. */
  element?: DataModelElement;
  themeTokens: DataModelThemeToken[];
}

export interface DataModelPage {
  id: string;
  route: string;
  title: string;
  summary: string;
  sourceDocument?: string;
  requirements: string[];
  tags: string[];
  formalDefinitions: DataModelFormalDefinition[];
  features: DataModelFeature[];
  /** The element tree of the page's root element; present for concrete input only. */
  element?: DataModelElement;
}

export interface DataModelFormalDefinition {
  term: string;
  definition: string;
}

export interface DataModelThemeToken {
  name: string;
  value: string;
}
