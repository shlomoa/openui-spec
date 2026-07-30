/**
 * The complete, emit-ready description of the Angular application produced from
 * the implementation-independent data model. Every field maps directly to files
 * the emitters generate (pages, dialogs, theme, and optional application-shell,
 * extension, and internationalization artifacts).
 */
export interface AngularProjectModel {
  appName: string;
  packageName: string;
  version: string;
  pages: AngularPageModel[];
  dialogComponents: AngularDialogComponentModel[];
  themeTokens: Array<{ name: string; value: string }>;
  applicationStructure?: AngularApplicationStructureModel;
  extensionModel?: AngularExtensionModel;
  internationalization?: AngularInternationalizationModel;
}

/** Host-side extension configuration: the host version, its declared capabilities, and the extension points it exposes. */
export interface AngularExtensionModel {
  hostVersion: string;
  hostCapabilities: string[];
  extensionPoints: AngularExtensionPointModel[];
}

/** A single extension point: the accepted artifact type plus its compatibility gate, drag-and-drop wiring, and design-time metadata. */
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

/** Internationalization configuration: active/default/fallback locales, per-locale message bundles, and the set of right-to-left locales. */
export interface AngularInternationalizationModel {
  activeLocale: string;
  angularLocale: string;
  defaultLocale: string;
  fallbackLocales: string[];
  messageBundles: Record<string, Record<string, string>>;
  rtlLocales: string[];
}

/** The application's overall structure: its root component, explicit dependencies, shell layout, routed page hierarchy, and navigation container. */
export interface AngularApplicationStructureModel {
  rootComponent: string;
  explicitDependencies: AngularApplicationDependencyModel[];
  shell: AngularApplicationShellModel;
  pageHierarchy: AngularApplicationPageNodeModel[];
  navigationContainer: AngularNavigationContainerModel;
}

/** A named application-level dependency together with the purpose it serves. */
export interface AngularApplicationDependencyModel {
  name: string;
  purpose: string;
}

/** The application shell component: its class, selector, Material primitives, layout regions, and how it tracks the current page. */
export interface AngularApplicationShellModel {
  componentClass: string;
  selector: string;
  primitives: string[];
  regions: Array<{ name: string; aggregation: string; materialPrimitive: string }>;
  currentPageAssociation: string;
}

/** One node in the routed page hierarchy, linking a route and title to its component class and any child pages. */
export interface AngularApplicationPageNodeModel {
  id: string;
  route: string;
  title: string;
  componentClass: string;
  children: AngularApplicationPageNodeModel[];
}

/** The navigation container component, the aggregations it owns, and the outlet where routed page content is rendered. */
export interface AngularNavigationContainerModel {
  component: string;
  ownsAggregations: string[];
  routedContentOutlet: string;
}

/**
 * A single routed page component, carrying everything the component emitter
 * needs: identity and routing (id, route, class, selector, file name), its
 * imports and class members, and the rendered template and styles.
 */
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

/** A Material dialog component: its identity (selector, class, directory, file name), title, content, and action buttons. */
export interface AngularDialogComponentModel {
  selector: string;
  className: string;
  directoryName: string;
  fileName: string;
  title: string;
  content: string;
  actions: AngularDialogActionModel[];
}

/** A single dialog action button: its label, the result it closes the dialog with, and its visual emphasis. */
export interface AngularDialogActionModel {
  text: string;
  result: string;
  emphasis: "default" | "warn";
}
