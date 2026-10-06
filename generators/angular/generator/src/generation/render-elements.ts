import type { DataModelElement } from "../data-model/element-model";
import { getLogger } from "../logging/logger";
import { dialogFootprint, renderDialog } from "./renderers/dialog-renderer";
import { emptyRendering, mergeRendering, RendererRegistry, type ElementRendering } from "./renderer-registry";

const log = getLogger("amcg.render");

/**
 * The renderers of the implemented OpenUI types, keyed by exact catalog `type`. Each slice of
 * #203 adds the renderers of its object-type group here.
 */
export const defaultRendererRegistry: RendererRegistry = new RendererRegistry().register(
  "Dialog",
  renderDialog,
  dialogFootprint,
);

/** The OpenUI types the generator renders, sorted. */
export function implementedTypes(registry: RendererRegistry = defaultRendererRegistry): string[] {
  return registry.types;
}

/** The merged rendering of an element tree and the elements that fell back to the placeholder. */
export interface RenderedElementTree {
  rendering: ElementRendering;
  /** Types that could not be rendered, in order of first occurrence. */
  unrenderedTypes: string[];
}

/**
 * Renders {@link root} and its descendants. A registered renderer owns the subtree of its
 * element. An element whose type has no renderer, or whose renderer returns `undefined`, falls
 * back to the placeholder output: it contributes nothing, its children are visited, and a
 * warning names its type once.
 */
export function renderElementTree(
  root: DataModelElement,
  registry: RendererRegistry = defaultRendererRegistry,
): RenderedElementTree {
  const rendering = emptyRendering();
  const unrenderedTypes: string[] = [];

  const visit = (element: DataModelElement): void => {
    const rendered = registry.get(element.type)?.(element, { root });
    if (rendered) {
      mergeRendering(rendering, rendered);
      return;
    }

    if (!unrenderedTypes.includes(element.type)) {
      unrenderedTypes.push(element.type);
      log.warning(
        `No renderer output for OpenUI type '${element.type}' (element '${element.id}'); using placeholder output.`,
      );
    }
    element.children.forEach(visit);
  };

  visit(root);
  return { rendering, unrenderedTypes };
}
