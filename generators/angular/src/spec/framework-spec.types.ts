export interface FrameworkSpecDocument {
  specification: FrameworkSpecification;
}

export interface FrameworkSpecification {
  id?: string;
  name?: string;
  version?: string;
  description?: string;
  sections: FrameworkSpecSection[];
}

export interface FrameworkSpecSection {
  id: string;
  title: string;
  purpose?: string;
  document?: string;
  requirements?: string[];
  tags?: string[];
  formalDefinitions?: Array<{ term?: string; definition?: string }>;
  implementationNotes?: string[];
  examples?: Array<{ title?: string; description?: string }>;
}
