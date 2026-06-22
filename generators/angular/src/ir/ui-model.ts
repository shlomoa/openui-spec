export type UiFeature =
  | "accessibility"
  | "acceptance"
  | "application-structure"
  | "component"
  | "feedback"
  | "form"
  | "interaction"
  | "layout"
  | "navigation"
  | "reference"
  | "theme"
  | "ui-concept";

export interface UiApplication {
  name: string;
  version: string;
  pages: UiPage[];
  themeTokens: UiThemeToken[];
}

export interface UiPage {
  id: string;
  route: string;
  title: string;
  summary: string;
  sourceDocument?: string;
  requirements: string[];
  tags: string[];
  formalDefinitions: UiFormalDefinition[];
  features: UiFeature[];
}

export interface UiFormalDefinition {
  term: string;
  definition: string;
}

export interface UiThemeToken {
  name: string;
  value: string;
}
