import type { OpenUiElement } from "../spec/openui-spec.types";
import { type DataModelAttributeValue, parseAttributeValue } from "./attribute-value";

/** The attribute category named by an `attrs` key prefix (spec `README.md` § 4.5). */
export type DataModelAttributeCategory = "uses" | "produces" | "behaves" | "plain";

/** One attribute of an element: its category, its name without the category prefix, and its parsed value. */
export interface DataModelAttribute {
  /** The key as written in `attrs`, for example `uses.label`. */
  key: string;
  category: DataModelAttributeCategory;
  /** The key without its category prefix, for example `label`. */
  name: string;
  value: DataModelAttributeValue;
}

/**
 * An element of a concrete OpenUI document in implementation-independent form:
 * identity, type, categorized attributes in document order and child elements.
 */
export interface DataModelElement {
  id: string;
  type: string;
  attributes: DataModelAttribute[];
  children: DataModelElement[];
}

/**
 * Builds the {@link DataModelElement} tree of an OpenUI element. Attribute order follows the
 * document, so the model is deterministic. {@link declaredValueTypes} optionally maps an
 * attribute key to its declared value type (spec `README.md` § 4.6).
 */
export function buildElementTree(
  element: OpenUiElement,
  declaredValueTypes: (type: string, key: string) => string | undefined = () => undefined,
): DataModelElement {
  return {
    id: element.id,
    type: element.type,
    attributes: Object.entries(element.attrs ?? {}).map(([key, value]) => {
      const { category, name } = splitAttributeKey(key);
      return { key, category, name, value: parseAttributeValue(value, declaredValueTypes(element.type, key)) };
    }),
    children: (element.children ?? []).map((child) => buildElementTree(child, declaredValueTypes)),
  };
}

/** Splits an `attrs` key into its category and name; a key without a category prefix is `plain`. */
export function splitAttributeKey(key: string): { category: DataModelAttributeCategory; name: string } {
  for (const category of ["uses", "produces", "behaves"] as const) {
    if (key.startsWith(`${category}.`)) {
      return { category, name: key.slice(category.length + 1) };
    }
  }

  return { category: "plain", name: key };
}

/** Returns the first attribute of {@link element} with the given category and name. */
export function findAttribute(
  element: DataModelElement,
  category: DataModelAttributeCategory,
  name: string,
): DataModelAttribute | undefined {
  return element.attributes.find((attribute) => attribute.category === category && attribute.name === name);
}
