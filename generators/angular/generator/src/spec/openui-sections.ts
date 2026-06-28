import type { OpenUiDocument, OpenUiElement, OpenUiScopeNode } from "./openui-spec.types";

export function extractOpenUiScopeNodes(document: OpenUiDocument): OpenUiScopeNode[] {
  return (document.children ?? []).flatMap(collectScopeNodes);
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

function collectScopeNodes(node: OpenUiElement): OpenUiScopeNode[] {
  const ownScope = toScopeNode(node);
  const childScopes = (node.children ?? []).flatMap(collectScopeNodes);
  return ownScope ? [ownScope, ...childScopes] : childScopes;
}

function toScopeNode(node: OpenUiElement): OpenUiScopeNode | undefined {
  const document = stringAttr(node, "scopeDocument");
  if (!document) {
    return undefined;
  }

  const title = stringAttr(node, "title") ?? titleFromName(node.type || node.id);
  return {
    id: node.id,
    type: node.type,
    title,
    purpose: stringAttr(node, "purpose") ?? stringAttr(node, "description"),
    document,
    requirements: childScopeSummaries(node),
    tags: [],
    formalDefinitions: [],
    implementationNotes: [],
    examples: [],
  };
}

function childScopeSummaries(node: OpenUiElement): string[] {
  return (node.children ?? []).flatMap((child) => {
    const document = stringAttr(child, "scopeDocument");
    if (!document) {
      return [];
    }

    const title = stringAttr(child, "title") ?? titleFromName(child.type || child.id);
    const purpose = stringAttr(child, "purpose");
    return purpose ? [`${title}: ${purpose}`] : [title];
  });
}

function titleFromName(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
