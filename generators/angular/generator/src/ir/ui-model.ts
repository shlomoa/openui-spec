export type UiFeature =
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

export interface UiApplication {
  name: string;
  version: string;
  pages: UiPage[];
  dialogComponents?: UiDialogComponent[];
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

export interface UiDialogComponent {
  id: string;
  selector: string;
  className: string;
  directoryName: string;
  fileName: string;
  title: string;
  content: string;
  actions: UiDialogAction[];
}

export interface UiDialogAction {
  id: string;
  text: string;
  result: string;
  emphasis: "default" | "warn";
}
