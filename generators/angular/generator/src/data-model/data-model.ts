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
  dialogComponents?: DataModelDialogComponent[];
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
}

export interface DataModelFormalDefinition {
  term: string;
  definition: string;
}

export interface DataModelThemeToken {
  name: string;
  value: string;
}

export interface DataModelDialogComponent {
  id: string;
  selector: string;
  className: string;
  directoryName: string;
  fileName: string;
  title: string;
  content: string;
  actions: DataModelDialogAction[];
}

export interface DataModelDialogAction {
  id: string;
  text: string;
  result: string;
  emphasis: "default" | "warn";
}