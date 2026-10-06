import { findAttribute, type DataModelElement } from "../../data-model/element-model";
import { normalizeRoute } from "../../data-model/normalize-spec";
import type { AngularDialogActionModel, AngularDialogComponentModel } from "../angular-model";
import { emitDialogComponent } from "../emit-dialog";
import { titleFromName, toPascalCase } from "../names";
import { emptyRendering, type ElementRenderer } from "../renderer-registry";

/**
 * Renders a `Dialog` element as a standalone Angular Material dialog component under
 * `src/components/app-<id>/`. A dialog is identified by its stable part ids
 * (`dialogTitle`, `dialogContent`, `dialogActions`) rather than example-only pseudo-types;
 * a `Dialog` without them is not rendered.
 */
export const renderDialog: ElementRenderer = (element) => {
  const component = buildDialogComponentModel(element);
  if (!component) {
    return undefined;
  }

  return { ...emptyRendering(), files: emitDialogComponent(component) };
};

/** Derives the Angular dialog component model from a `Dialog` element, or `undefined` when it lacks the dialog parts. */
export function buildDialogComponentModel(dialog: DataModelElement): AngularDialogComponentModel | undefined {
  if (!["dialogTitle", "dialogContent", "dialogActions"].every((id) => findChildById(dialog, id))) {
    return undefined;
  }

  const directoryName = `app-${normalizeRoute(dialog.id)}`;
  return {
    selector: directoryName,
    className: `${toPascalCase(directoryName)}Component`,
    directoryName,
    fileName: `${directoryName}.component`,
    title: textOf(findChildById(dialog, "dialogTitle") ?? dialog) ?? "Dialog",
    content: textOf(findChildById(dialog, "dialogContent") ?? dialog) ?? "",
    actions: (findChildById(dialog, "dialogActions")?.children ?? [])
      .filter((child) => child.type === "ActionControls")
      .map(buildDialogAction),
  };
}

function buildDialogAction(action: DataModelElement): AngularDialogActionModel {
  const text = attributeText(action, "uses", "label") ?? titleFromName(action.id);
  const result = resultFromClose(attributeText(action, "produces", "activate")) ?? normalizeRoute(action.id);
  return {
    text,
    result,
    emphasis: result === "confirm" || text.toLowerCase().includes("delete") ? "warn" : "default",
  };
}

function findChildById(parent: DataModelElement, id: string): DataModelElement | undefined {
  return parent.children.find((child) => child.id === id);
}

function textOf(element: DataModelElement): string | undefined {
  return attributeText(element, "plain", "text");
}

/** The text of a literal attribute, or the source of an expression one; other values have no text. */
function attributeText(element: DataModelElement, category: "uses" | "produces" | "plain", name: string): string | undefined {
  const value = findAttribute(element, category, name)?.value;
  return value?.kind === "literal" ? value.text : value?.kind === "expression" ? value.source : undefined;
}

function resultFromClose(value: string | undefined): string | undefined {
  return value?.match(/^close\('([^']+)'\)$/)?.[1];
}
