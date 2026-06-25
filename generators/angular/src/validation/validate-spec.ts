import { childrenOfType, extractOpenUiSections, findElementsByType, stringAttr } from "../spec/openui-sections";
import type { OpenUiDocument } from "../spec/openui-spec.types";
import { type Diagnostic, SpecValidationError } from "./diagnostics";

const COMPLIANCE_SECTION_ID = "21-compliance-rules";

const REQUIRED_COMPLIANCE_TAGS = [
  "catalog-discoverability",
  "metadata-completeness",
  "contract-based-validation",
  "cross-cutting-evidence",
  "testable-conformance",
  "explicit-capability-scope",
] as const;

const REQUIRED_COMPLIANCE_DEFINITIONS = [
  "Compliant implementation",
  "Public surface",
  "Compliance evidence",
  "Conformance profile",
  "Compliance gap",
  "Validation artifact",
] as const;

const REQUIRED_COMPLIANCE_EXAMPLE_PHRASES = [
  "Catalog discoverability",
  "Metadata completeness",
  "Cross-cutting evidence",
  "Generator compliance guard",
] as const;

const REQUIRED_COMPLIANCE_TRAVERSAL_NODES = [
  "openui-root",
  "library-catalog-root",
  "library-component-catalog",
  "metadata-grammar-root",
  "property-model",
  "aggregation-model",
  "association-model",
  "event-model",
  "visibility-default-model",
  "renderer-dnd-model",
  "api-json-projection",
  "compliance-tests",
] as const;

const REQUIRED_COMPLIANCE_EVIDENCE_SECTIONS = [
  "08-component-model",
  "15-accessibility-model",
  "16-theming-design-tokens",
  "17-internationalization",
  "18-security-privacy-ui-rules",
  "19-performance-requirements",
  "20-extension-model",
  "22-test-acceptance-criteria",
] as const;

const ROOT_KEYS = new Set(["version", "id", "type", "attrs", "children"]);
const ELEMENT_KEYS = new Set(["id", "type", "attrs", "children"]);
const ID_PATTERN = /^[a-z][A-Za-z0-9]*$/;
const KEBAB_TYPE_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const PASCAL_TYPE_PATTERN = /^[A-Z][A-Za-z0-9]*(?:-[a-z][a-z0-9]*)?$/;
const HTML_TAGS = new Set([
  "html",
  "body",
  "main",
  "section",
  "article",
  "header",
  "footer",
  "nav",
  "div",
  "span",
  "input",
  "button",
  "table",
]);

export function validateOpenUiSpec(document: OpenUiDocument): void {
  const diagnostics: Diagnostic[] = [];
  validateElement(document, "root", true, new Set<string>(), diagnostics);

  if (diagnostics.length === 0) {
    validateSections(document, diagnostics);
    validateComplianceMaterialization(document, diagnostics);
  }

  if (diagnostics.length > 0) {
    throw new SpecValidationError(diagnostics);
  }
}

function validateElement(
  value: unknown,
  path: string,
  isRoot: boolean,
  seenIds: Set<string>,
  diagnostics: Diagnostic[],
): void {
  if (!isRecord(value)) {
    diagnostics.push({ path, message: "Expected an OpenUI element object." });
    return;
  }

  const allowedKeys = isRoot ? ROOT_KEYS : ELEMENT_KEYS;
  for (const key of Object.keys(value)) {
    if (!allowedKeys.has(key)) {
      diagnostics.push({
        path: `${path}.${key}`,
        message: "Loose properties are not allowed; put non-structural data under attrs.",
      });
    }
  }

  if (isRoot && value.version !== "0.0.1") {
    diagnostics.push({ path: `${path}.version`, message: 'Root version must be exactly "0.0.1".' });
  }
  if (isRoot && value.id !== "root") {
    diagnostics.push({ path: `${path}.id`, message: 'Root id must be exactly "root".' });
  }
  if (isRoot && value.type !== "html") {
    diagnostics.push({ path: `${path}.type`, message: 'Root type must be exactly "html".' });
  }

  if (typeof value.id !== "string") {
    diagnostics.push({ path: `${path}.id`, message: "Element id is required." });
  } else {
    if (!ID_PATTERN.test(value.id)) {
      diagnostics.push({ path: `${path}.id`, message: `Element id '${value.id}' must be camelCase alphanumeric.` });
    }
    if (seenIds.has(value.id)) {
      diagnostics.push({ path: `${path}.id`, message: `Duplicate element id '${value.id}'.` });
    }
    seenIds.add(value.id);
  }

  if (typeof value.type !== "string") {
    diagnostics.push({ path: `${path}.type`, message: "Element type is required." });
  } else if (!isValidType(value.type)) {
    diagnostics.push({ path: `${path}.type`, message: `Element type '${value.type}' is not a valid OpenUI type.` });
  }

  if (value.attrs !== undefined) {
    if (!isRecord(value.attrs)) {
      diagnostics.push({ path: `${path}.attrs`, message: "attrs must be an object." });
    } else {
      for (const [key, attrValue] of Object.entries(value.attrs)) {
        if (attrValue !== null && typeof attrValue !== "string") {
          diagnostics.push({ path: `${path}.attrs.${key}`, message: "Attribute values must be strings or null." });
        }
      }
    }
  }

  if (value.children !== undefined) {
    if (!Array.isArray(value.children)) {
      diagnostics.push({ path: `${path}.children`, message: "children must be an array." });
      return;
    }
    value.children.forEach((child, index) =>
      validateElement(child, `${path}.children[${index}]`, false, seenIds, diagnostics),
    );
  }
}

function validateSections(document: OpenUiDocument, diagnostics: Diagnostic[]): void {
  const sectionNodes = findElementsByType(document, "SpecSection");
  if (sectionNodes.length === 0) {
    diagnostics.push({ path: "root.children", message: "Expected at least one SpecSection child." });
  }

  const seenSectionIds = new Set<string>();
  sectionNodes.forEach((section, index) => {
    const path = `SpecSection[${index}]`;
    const sectionId = stringAttr(section, "sectionId");
    if (!sectionId) {
      diagnostics.push({ path: `${path}.attrs.sectionId`, message: "Section id is required in attrs.sectionId." });
    } else if (seenSectionIds.has(sectionId)) {
      diagnostics.push({ path: `${path}.attrs.sectionId`, message: `Duplicate section id '${sectionId}'.` });
    } else {
      seenSectionIds.add(sectionId);
    }

    if (!stringAttr(section, "title")) {
      diagnostics.push({ path: `${path}.attrs.title`, message: "Section title is required in attrs.title." });
    }
  });
}

function validateComplianceMaterialization(document: OpenUiDocument, diagnostics: Diagnostic[]): void {
  const sections = extractOpenUiSections(document);
  const section = sections.find((candidate) => candidate.id === COMPLIANCE_SECTION_ID);
  if (!section) {
    return;
  }

  const sectionPath = `SpecSection.${COMPLIANCE_SECTION_ID}`;
  const tagNames = new Set(section.tags);
  const definitionTerms = new Set(section.formalDefinitions.map((definition) => definition.term));
  const exampleTitles = section.examples.map((example) => example.title);

  if (section.document !== "spec/21-compliance-rules.md") {
    diagnostics.push({
      path: `${sectionPath}.attrs.document`,
      message:
        "Compliance Rules must synchronize the documentation artifact through document 'spec/21-compliance-rules.md'.",
    });
  }

  for (const tag of REQUIRED_COMPLIANCE_TAGS) {
    if (!tagNames.has(tag)) {
      diagnostics.push({
        path: `${sectionPath}.children.Tag`,
        message: `Compliance Rules missing required tag '${tag}' for generator compliance validation.`,
      });
    }
  }

  for (const term of REQUIRED_COMPLIANCE_DEFINITIONS) {
    if (!definitionTerms.has(term)) {
      diagnostics.push({
        path: `${sectionPath}.children.FormalDefinition`,
        message: `Compliance Rules missing formal definition '${term}' required for diagnostic metadata.`,
      });
    }
  }

  for (const phrase of REQUIRED_COMPLIANCE_EXAMPLE_PHRASES) {
    if (!exampleTitles.some((title) => title.includes(phrase))) {
      diagnostics.push({
        path: `${sectionPath}.children.Example`,
        message: `Compliance Rules missing synchronized evidence example '${phrase}'.`,
      });
    }
  }

  for (const keyword of ["catalog", "metadata", "evidence", "documentation", "generated projections"] as const) {
    if (!section.implementationNotes.some((note) => note.toLowerCase().includes(keyword))) {
      diagnostics.push({
        path: `${sectionPath}.children.ImplementationNote`,
        message: `Compliance Rules implementation notes must describe ${keyword} verification diagnostics.`,
      });
    }
  }

  validateTraversalEvidence(document, diagnostics);
  validateCrossCuttingEvidenceSections(sections, diagnostics);
}

function validateTraversalEvidence(document: OpenUiDocument, diagnostics: Diagnostic[]): void {
  const traversalNodes = findElementsByType(document, "TraversalNode");
  if (traversalNodes.length === 0) {
    diagnostics.push({
      path: "root.children.TraversalNode",
      message:
        "Compliance Rules cannot verify catalog discoverability; missing traversal evidence nodes for public catalog and metadata resolution.",
    });
    return;
  }

  const nodesById = new Map(
    traversalNodes.flatMap((node) => {
      const nodeId = stringAttr(node, "nodeId");
      return nodeId ? [[nodeId, node] as const] : [];
    }),
  );

  for (const nodeId of REQUIRED_COMPLIANCE_TRAVERSAL_NODES) {
    const node = nodesById.get(nodeId);
    if (!node) {
      diagnostics.push({
        path: "root.children.TraversalNode",
        message: `Compliance Rules cannot verify catalog discoverability; missing traversal node '${nodeId}'.`,
      });
      continue;
    }

    if (!childrenOfType(node, "Evidence").some((evidence) => stringAttr(evidence, "path"))) {
      diagnostics.push({
        path: `TraversalNode.${nodeId}.children.Evidence`,
        message: `Compliance Rules evidence is absent for traversal node '${nodeId}'.`,
      });
    }
  }
}

function validateCrossCuttingEvidenceSections(sections: Array<{ id: string }>, diagnostics: Diagnostic[]): void {
  const sectionIds = new Set(sections.map((section) => section.id));
  for (const sectionId of REQUIRED_COMPLIANCE_EVIDENCE_SECTIONS) {
    if (!sectionIds.has(sectionId)) {
      diagnostics.push({
        path: `SpecSection.${sectionId}`,
        message: `Compliance Rules missing synchronized cross-cutting evidence section '${sectionId}'.`,
      });
    }
  }
}

function isValidType(type: string): boolean {
  return HTML_TAGS.has(type) || KEBAB_TYPE_PATTERN.test(type) || PASCAL_TYPE_PATTERN.test(type);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
