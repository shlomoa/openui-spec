export interface AngularProjectModel {
  appName: string;
  packageName: string;
  version: string;
  pages: AngularPageModel[];
  themeTokens: Array<{ name: string; value: string }>;
  applicationStructure?: AngularApplicationStructureModel;
}

export interface AngularApplicationStructureModel {
  rootComponent: string;
  explicitDependencies: AngularApplicationDependencyModel[];
  shell: AngularApplicationShellModel;
  pageHierarchy: AngularApplicationPageNodeModel[];
  navigationContainer: AngularNavigationContainerModel;
}

export interface AngularApplicationDependencyModel {
  name: string;
  purpose: string;
}

export interface AngularApplicationShellModel {
  componentClass: string;
  selector: string;
  primitives: string[];
  regions: Array<{ name: string; aggregation: string; materialPrimitive: string }>;
  currentPageAssociation: string;
}

export interface AngularApplicationPageNodeModel {
  id: string;
  route: string;
  title: string;
  componentClass: string;
  children: AngularApplicationPageNodeModel[];
}

export interface AngularNavigationContainerModel {
  component: string;
  ownsAggregations: string[];
  routedContentOutlet: string;
}

export interface AngularPageModel {
  id: string;
  route: string;
  title: string;
  className: string;
  selector: string;
  fileName: string;
  summary: string;
  requirements: string[];
  imports: string[];
  componentImports: string[];
  constructorParameters: string[];
  members: string[];
  template: string;
  styles: string;
}
