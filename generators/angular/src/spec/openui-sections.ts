import type { OpenUiDocument, OpenUiElement, OpenUiExample, OpenUiSpecSection } from "./openui-spec.types";

const SPEC_SECTION_TYPE = "SpecSection";

export function extractOpenUiSections(document: OpenUiDocument): OpenUiSpecSection[] {
  return findElementsByType(document, SPEC_SECTION_TYPE).flatMap((node) => {
    const sectionId = stringAttr(node, "sectionId");
    const title = stringAttr(node, "title");
    if (!sectionId || !title) {
      return [];
    }

    return [
      {
        id: sectionId,
        title,
        purpose: stringAttr(node, "purpose"),
        document: stringAttr(node, "document"),
        requirements: childTextValues(node, "Requirement"),
        tags: childrenOfType(node, "Tag").flatMap((tag) => attrValues(tag, "name")),
        formalDefinitions: childrenOfType(node, "FormalDefinition").flatMap((definition) => {
          const term = stringAttr(definition, "term");
          const definitionText = stringAttr(definition, "definition");
          return term && definitionText ? [{ term, definition: definitionText }] : [];
        }),
        implementationNotes: childTextValues(node, "ImplementationNote"),
        examples: childrenOfType(node, "Example").flatMap((example): OpenUiExample[] => {
          const titleText = stringAttr(example, "title");
          return titleText
            ? [
                {
                  title: titleText,
                  description: stringAttr(example, "description"),
                },
              ]
            : [];
        }),
      },
    ];
  });
}

export function findElementsByType(root: OpenUiElement, type: string): OpenUiElement[] {
  const matches = root.type === type ? [root] : [];
  return matches.concat((root.children ?? []).flatMap((child) => findElementsByType(child, type)));
}

export function childrenOfType(root: OpenUiElement, type: string): OpenUiElement[] {
  return (root.children ?? []).filter((child) => child.type === type);
}

export function stringAttr(node: OpenUiElement, key: string): string | undefined {
  const value = node.attrs?.[key];
  return typeof value === "string" ? value : undefined;
}

function childTextValues(root: OpenUiElement, type: string): string[] {
  return childrenOfType(root, type).flatMap((child) => attrValues(child, "text"));
}

function attrValues(node: OpenUiElement, key: string): string[] {
  const value = stringAttr(node, key);
  return value ? [value] : [];
}
