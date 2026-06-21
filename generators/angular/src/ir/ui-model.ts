export type UiFeature =
  | "accessibility"
  | "acceptance"
  | "feedback"
  | "form"
  | "navigation"
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
  features: UiFeature[];
}

export interface UiThemeToken {
  name: string;
  value: string;
}
