import type { DataModelElement } from "../data-model/element-model";
import type { GeneratedFile } from "../writers/file-writer";
import { AngularImportCollector } from "./import-collector";

/**
 * What a renderer contributes for one element: the template fragment, the entries of the
 * hosting component's `imports: [...]`, the TypeScript imports, the class members and the
 * styles, plus the files of any standalone component the element is emitted as.
 */
export interface ElementRendering {
  template: string;
  /** Entries of the hosting component's `imports` array, for example `MatButtonModule`. */
  imports: Set<string>;
  /** TypeScript imports of the hosting component file. */
  typeImports: AngularImportCollector;
  /** Class members of the hosting component, each a complete member declaration. */
  members: string[];
  styles: string;
  /** Files of a standalone component the element is emitted as, such as a dialog. */
  files: GeneratedFile[];
}

/** What a renderer may read besides its element. */
export interface ElementRenderContext {
  /** The root element of the document, for resolving element references. */
  root: DataModelElement;
}

/**
 * Renders one element of the OpenUI type it is registered for. It returns `undefined` when it
 * cannot render this particular element (for example a `Dialog` without its parts), which
 * the caller handles like an unregistered type.
 */
export type ElementRenderer = (element: DataModelElement, context: ElementRenderContext) => ElementRendering | undefined;

/** Returns an {@link ElementRendering} that contributes nothing. */
export function emptyRendering(): ElementRendering {
  return { template: "", imports: new Set(), typeImports: new AngularImportCollector(), members: [], styles: "", files: [] };
}

/** Adds the contribution of {@link source} to {@link target}, keeping members and files free of duplicates. */
export function mergeRendering(target: ElementRendering, source: ElementRendering): void {
  target.template += source.template;
  target.styles += source.styles;
  source.imports.forEach((entry) => target.imports.add(entry));
  target.typeImports.merge(source.typeImports);
  source.members.filter((member) => !target.members.includes(member)).forEach((member) => target.members.push(member));
  source.files.filter((file) => !target.files.some((known) => known.path === file.path)).forEach((file) => target.files.push(file));
}

/** A set of renderers keyed by the exact catalog `type` of the elements they render. */
export class RendererRegistry {
  private readonly renderers = new Map<string, ElementRenderer>();

  /** Registers the renderer of {@link type}; a type has exactly one renderer. */
  register(type: string, renderer: ElementRenderer): this {
    if (this.renderers.has(type)) {
      throw new Error(`A renderer is already registered for OpenUI type '${type}'.`);
    }
    this.renderers.set(type, renderer);
    return this;
  }

  get(type: string): ElementRenderer | undefined {
    return this.renderers.get(type);
  }

  /** The registered types, sorted: the implemented-type list. */
  get types(): string[] {
    return [...this.renderers.keys()].sort();
  }
}
