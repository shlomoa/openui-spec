export type OpenUiAttributeValue = string | null;

export interface OpenUiElement {
  id: string;
  type: string;
  attrs?: Record<string, OpenUiAttributeValue>;
  children?: OpenUiElement[];
}

export interface OpenUiDocument extends OpenUiElement {
  id: "root";
  version: "0.1.0";
}

export interface OpenUiScopeNode {
  id: string;
  type: string;
  title: string;
  purpose?: string;
  document?: string;
  requirements: string[];
  tags: string[];
  formalDefinitions: OpenUiFormalDefinition[];
  implementationNotes: string[];
  examples: OpenUiExample[];
}

export interface OpenUiFormalDefinition {
  term: string;
  definition: string;
}

export interface OpenUiExample {
  title: string;
  description?: string;
}
