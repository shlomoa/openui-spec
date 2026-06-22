import type { FrameworkSpecDocument } from "../spec/framework-spec.types";
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

export function validateFrameworkSpec(document: FrameworkSpecDocument): void {
  const diagnostics: Diagnostic[] = [];
  const sections = document.specification?.sections;

  if (!Array.isArray(sections)) {
    throw new SpecValidationError([
      { path: "specification.sections", message: "Expected a sections array." },
    ]);
  }

  const seenSectionIds = new Set<string>();
  sections.forEach((section, index) => {
    const path = `specification.sections[${index}]`;
    if (!section.id) {
      diagnostics.push({ path: `${path}.id`, message: "Section id is required." });
    }
    if (!section.title) {
      diagnostics.push({ path: `${path}.title`, message: "Section title is required." });
    }
    if (section.id && seenSectionIds.has(section.id)) {
      diagnostics.push({ path: `${path}.id`, message: `Duplicate section id '${section.id}'.` });
    }
    seenSectionIds.add(section.id);
  });

  validateComplianceMaterialization(document, diagnostics);

  if (diagnostics.length > 0) {
    throw new SpecValidationError(diagnostics);
  }
}

function validateComplianceMaterialization(document: FrameworkSpecDocument, diagnostics: Diagnostic[]): void {
  const sections = document.specification.sections;
  const sectionIndex = sections.findIndex((section) => section.id === COMPLIANCE_SECTION_ID);
  if (sectionIndex < 0) {
    return;
  }

  const section = sections[sectionIndex];
  const sectionPath = `specification.sections[${sectionIndex}]`;
  const tagNames = new Set(
    (section.tags ?? []).flatMap((tag) => {
      if (typeof tag === "string") {
        return [tag];
      }
      return tag.name ? [tag.name] : [];
    }),
  );
  const definitionTerms = new Set(
    (section.formalDefinitions ?? []).flatMap((definition) => (definition.term ? [definition.term] : [])),
  );
  const exampleTitles = (section.examples ?? []).map((example) => example.title ?? "");
  const implementationNotes = section.implementationNotes ?? [];

  if (section.document !== "spec/21-compliance-rules.md") {
    diagnostics.push({
      path: `${sectionPath}.document`,
      message:
        "Compliance Rules must synchronize the documentation artifact through document 'spec/21-compliance-rules.md'.",
    });
  }

  for (const tag of REQUIRED_COMPLIANCE_TAGS) {
    if (!tagNames.has(tag)) {
      diagnostics.push({
        path: `${sectionPath}.tags`,
        message: `Compliance Rules missing required tag '${tag}' for generator compliance validation.`,
      });
    }
  }

  for (const term of REQUIRED_COMPLIANCE_DEFINITIONS) {
    if (!definitionTerms.has(term)) {
      diagnostics.push({
        path: `${sectionPath}.formalDefinitions`,
        message: `Compliance Rules missing formal definition '${term}' required for diagnostic metadata.`,
      });
    }
  }

  for (const phrase of REQUIRED_COMPLIANCE_EXAMPLE_PHRASES) {
    if (!exampleTitles.some((title) => title.includes(phrase))) {
      diagnostics.push({
        path: `${sectionPath}.examples`,
        message: `Compliance Rules missing synchronized evidence example '${phrase}'.`,
      });
    }
  }

  for (const keyword of ["catalog", "metadata", "evidence", "documentation", "generated projections"] as const) {
    if (!implementationNotes.some((note) => note.toLowerCase().includes(keyword))) {
      diagnostics.push({
        path: `${sectionPath}.implementationNotes`,
        message: `Compliance Rules implementation notes must describe ${keyword} verification diagnostics.`,
      });
    }
  }

  validateTraversalEvidence(document, diagnostics);
  validateCrossCuttingEvidenceSections(sections, diagnostics);
}

function validateTraversalEvidence(document: FrameworkSpecDocument, diagnostics: Diagnostic[]): void {
  const traversalNodes = document.specification.traversal?.nodes;
  if (!Array.isArray(traversalNodes)) {
    diagnostics.push({
      path: "specification.traversal.nodes",
      message:
        "Compliance Rules cannot verify catalog discoverability; missing traversal evidence nodes for public catalog and metadata resolution.",
    });
    return;
  }

  const nodesById = new Map(traversalNodes.flatMap((node) => (node.id ? [[node.id, node]] : [])));
  for (const nodeId of REQUIRED_COMPLIANCE_TRAVERSAL_NODES) {
    const node = nodesById.get(nodeId);
    if (!node) {
      diagnostics.push({
        path: "specification.traversal.nodes",
        message: `Compliance Rules cannot verify catalog discoverability; missing traversal node '${nodeId}'.`,
      });
      continue;
    }

    if (!node.evidence?.length) {
      diagnostics.push({
        path: `specification.traversal.nodes.${nodeId}.evidence`,
        message: `Compliance Rules evidence is absent for traversal node '${nodeId}'.`,
      });
    }
  }
}

function validateCrossCuttingEvidenceSections(
  sections: FrameworkSpecDocument["specification"]["sections"],
  diagnostics: Diagnostic[],
): void {
  const sectionIds = new Set(sections.map((section) => section.id));
  for (const sectionId of REQUIRED_COMPLIANCE_EVIDENCE_SECTIONS) {
    if (!sectionIds.has(sectionId)) {
      diagnostics.push({
        path: `specification.sections.${sectionId}`,
        message: `Compliance Rules missing synchronized cross-cutting evidence section '${sectionId}'.`,
      });
    }
  }
}
