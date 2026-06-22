export interface AngularProjectModel {
  appName: string;
  packageName: string;
  version: string;
  pages: AngularPageModel[];
  themeTokens: Array<{ name: string; value: string }>;
  applicationStructure?: AngularApplicationStructureModel;
  extensionModel?: AngularExtensionModel;
  internationalization?: AngularInternationalizationModel;
}

export interface AngularExtensionModel {
  hostVersion: string;
  hostCapabilities: string[];
  extensionPoints: AngularExtensionPointModel[];
}

export interface AngularExtensionPointModel {
  propertyName: string;
  name: string;
  acceptedType: string;
  multiple: boolean;
  ownsContent: boolean;
  requiredCapabilities: string[];
  rendererModule: string;
  dragDrop: {
    aggregation: string;
    acceptedTypes: string[];
    dropEffects: string[];
    source: boolean;
    target: boolean;
  };
  designTime: {
    label: string;
    paletteGroup: string;
    editableProperties: string[];
    actions: string[];
    allowedDropTypes: string[];
  };
}

export interface AngularInternationalizationModel {
  activeLocale: string;
  angularLocale: string;
  defaultLocale: string;
  fallbackLocales: string[];
  messageBundles: Record<string, Record<string, string>>;
  rtlLocales: string[];
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
