import path from "node:path";

import { childrenOfType, extractOpenUiScopeNodes, findElementsByType, stringAttr } from "../spec/openui-sections";
import type { OpenUiDocument, OpenUiElement } from "../spec/openui-spec.types";
import { normalizeRoute } from "../ir/normalize-spec";
import { pageDirectory } from "../targets/angular/angular-paths";

/**
 * Kinds of workspace artifact the classifier recognizes.
 *
 * - `component`: a generated Angular component folder or one of its files
 *   (`src/components/<selector>/<selector>.component.{ts,html,scss}`).
 * - `page`: a generated routed page folder or one of its files
 *   (`src/app/pages/<route>/<route>.page.{ts,html,scss}`).
 * - `application`: a top-level workspace artifact that has no scoped owner.
 * - `unknown`: nothing in the spec generated this artifact.
 */
export type WorkspaceArtifactKind = "component" | "page" | "application" | "unknown";

/**
 * Result of classifying a workspace artifact back to the spec node that
 * generated it. `nodeId`/`nodeType` are present when a matching OpenUI node
 * is found; `selector` and `route` identify the manifestation.
 */
export interface Classification {
  kind: WorkspaceArtifactKind;
  nodeId?: string;
  nodeType?: string;
  selector?: string;
  route?: string;
  sourceFile?: string;
}

/** A spec node manifestation keyed by its workspace footprint. */
interface SpecManifestation {
  kind: "component" | "page";
  nodeId: string;
  nodeType: string;
  selector: string;
  route?: string;
  directory: string;
  sourceFile?: string;
}

const APPLICATION_ARTIFACTS: ReadonlySet<string> = new Set([
  ".",
  "",
  "angular.json",
  "package.json",
  "tsconfig.json",
  "src",
  "src/app",
  "src/app/app.component.ts",
  "src/app/app.routes.ts",
  "src/app/application-structure.model.ts",
  "src/app/openui-extension.model.ts",
  "src/app/openui-extension-samples.ts",
  "src/app/openui-i18n.service.ts",
  "src/app/openui-workspace-outlet.component.ts",
  "src/index.html",
  "src/main.ts",
  "src/styles.scss",
]);

/**
 * Index of every workspace manifestation declared by an `input.json` spec.
 * Use {@link classifyWorkspacePath} to map a workspace folder or file back to
 * the spec node that owns it.
 */
export class SpecManifestationIndex {
  private readonly byDirectory = new Map<string, SpecManifestation>();
  private readonly bySelector = new Map<string, SpecManifestation>();

  constructor(manifestations: SpecManifestation[]) {
    for (const manifestation of manifestations) {
      this.byDirectory.set(manifestation.directory, manifestation);
      this.bySelector.set(manifestation.selector, manifestation);
    }
  }

  get directories(): string[] {
    return [...this.byDirectory.keys()];
  }

  matchDirectory(directory: string): SpecManifestation | undefined {
    return this.byDirectory.get(normalizeWorkspacePath(directory));
  }

  matchSelector(selector: string): SpecManifestation | undefined {
    return this.bySelector.get(selector);
  }
}

/**
 * Build the manifestation index for the components and pages declared by an
 * OpenUI input document. Component templates contribute
 * `src/components/<selector>` footprints; page scopes contribute
 * `src/app/pages/<route>` footprints.
 */
export function buildSpecManifestationIndex(document: OpenUiDocument): SpecManifestationIndex {
  const components = findElementsByType(document, "ComponentTemplate")
    .map(toComponentManifestation)
    .filter((manifestation): manifestation is SpecManifestation => manifestation !== undefined);

  const pages = collectPageManifestations(document);

  return new SpecManifestationIndex([...components, ...pages]);
}

/**
 * Classify a single workspace path (a folder or a generated file) back to the
 * spec node that generated it, using the spec manifestation index. The path is
 * interpreted relative to the workspace root, so callers may pass either an
 * absolute path under the workspace or a workspace-relative path.
 */
export function classifyWorkspacePath(relativePath: string, index: SpecManifestationIndex): Classification {
  const normalized = normalizeWorkspacePath(relativePath);
  const directory = normalized.endsWith(".ts") || normalized.endsWith(".html") || normalized.endsWith(".scss")
    ? path.posix.dirname(normalized)
    : normalized;

  const directMatch = index.matchDirectory(directory);
  if (directMatch) {
    return toClassification(directMatch);
  }

  if (isApplicationArtifact(normalized, directory)) {
    return { kind: "application" };
  }

  const selectorMatch = matchSelectorFromComponentFile(normalized, index);
  if (selectorMatch) {
    return toClassification(selectorMatch);
  }

  return { kind: "unknown" };
}

function toClassification(manifestation: SpecManifestation): Classification {
  return {
    kind: manifestation.kind,
    nodeId: manifestation.nodeId,
    nodeType: manifestation.nodeType,
    selector: manifestation.selector,
    route: manifestation.route,
    sourceFile: manifestation.sourceFile,
  };
}

function toComponentManifestation(node: OpenUiElement): SpecManifestation | undefined {
  const selector = stringAttr(node, "selector");
  if (!selector) {
    return undefined;
  }

  const sourceFile = stringAttr(node, "sourceFile");
  return {
    kind: "component",
    nodeId: node.id,
    nodeType: node.type,
    selector,
    directory: `src/components/${selector}`,
    sourceFile,
  };
}

function collectPageManifestations(document: OpenUiDocument): SpecManifestation[] {
  return [
    ...collectScopedNodePageManifestations(document),
    ...collectExplicitPageScopeManifestations(document),
    ...collectConcreteInputPageManifestations(document),
  ];
}

function collectScopedNodePageManifestations(document: OpenUiDocument): SpecManifestation[] {
  return extractOpenUiScopeNodes(document).map((scope) => {
    const route = normalizeRoute(scope.id);
    return {
      kind: "page",
      nodeId: scope.id,
      nodeType: scope.type,
      selector: `openui-${route}`,
      route,
      directory: normalizeWorkspacePath(pageDirectory(route)),
      sourceFile: scope.document,
    };
  });
}

function collectExplicitPageScopeManifestations(document: OpenUiDocument): SpecManifestation[] {
  return childrenOfType(document, "PageScope").map((node): SpecManifestation => {
    const route = stringAttr(node, "route") ?? normalizeRoute(node.id);
    return {
      kind: "page",
      nodeId: node.id,
      nodeType: node.type,
      selector: `openui-${route}`,
      route,
      directory: normalizeWorkspacePath(pageDirectory(route)),
      sourceFile: stringAttr(node, "sourceFile"),
    };
  });
}

function collectConcreteInputPageManifestations(document: OpenUiDocument): SpecManifestation[] {
  if (extractOpenUiScopeNodes(document).length > 0 || findElementsByType(document, "ComponentTemplate").length > 0) {
    return [];
  }

  const firstConcreteChild = document.children?.[0];
  if (!firstConcreteChild) {
    return [];
  }

  const route = normalizeRoute(lowerFirst(firstConcreteChild.type));
  return [
    {
      kind: "page",
      nodeId: firstConcreteChild.id,
      nodeType: firstConcreteChild.type,
      selector: `openui-${route}`,
      route,
      directory: normalizeWorkspacePath(pageDirectory(route)),
    },
    ...findElementsByType(document, "Dialog").map(toConcreteDialogComponentManifestation),
  ];
}

function toConcreteDialogComponentManifestation(node: OpenUiElement): SpecManifestation {
  const selector = `app-${normalizeRoute(node.id)}`;
  return {
    kind: "component",
    nodeId: node.id,
    nodeType: node.type,
    selector,
    directory: `src/components/${selector}`,
  };
}

function matchSelectorFromComponentFile(
  normalizedPath: string,
  index: SpecManifestationIndex,
): SpecManifestation | undefined {
  const base = path.posix.basename(normalizedPath);
  const selector = base.replace(/\.component\.(ts|html|scss)$/, "");
  if (selector === base) {
    return undefined;
  }
  return index.matchSelector(selector);
}

function isApplicationArtifact(normalizedPath: string, directory: string): boolean {
  return APPLICATION_ARTIFACTS.has(normalizedPath) || APPLICATION_ARTIFACTS.has(directory);
}

function normalizeWorkspacePath(value: string): string {
  return value.replace(/\\/g, "/").replace(/\/+$/, "");
}

function lowerFirst(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1);
}
