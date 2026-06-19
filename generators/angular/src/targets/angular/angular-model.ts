export interface AngularProjectModel {
  appName: string;
  packageName: string;
  version: string;
  pages: AngularPageModel[];
  themeTokens: Array<{ name: string; value: string }>;
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
