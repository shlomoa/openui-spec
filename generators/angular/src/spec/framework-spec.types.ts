export interface FrameworkSpecDocument {
  specification: FrameworkSpecification;
}

export interface FrameworkSpecification {
  id?: string;
  name?: string;
  version?: string;
  description?: string;
  traversal?: FrameworkTraversal;
  sections: FrameworkSpecSection[];
}

export interface FrameworkTraversal {
  nodes?: FrameworkTraversalNode[];
}

export interface FrameworkTraversalNode {
  id?: string;
  title?: string;
  parent?: string | null;
  children?: string[];
  evidence?: string[];
  mappedSections?: string[];
}

export interface FrameworkSpecSection {
  id: string;
  title: string;
  purpose?: string;
  document?: string;
  requirements?: string[];
  tags?: Array<string | { name?: string; meaning?: string }>;
  formalDefinitions?: Array<{ term?: string; definition?: string }>;
  usage?: string[];
  implementationNotes?: string[];
  examples?: Array<{ title?: string; description?: string }>;
}
