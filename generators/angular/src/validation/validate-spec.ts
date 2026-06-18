import type { FrameworkSpecDocument } from "../spec/framework-spec.types.js";
import { type Diagnostic, SpecValidationError } from "./diagnostics.js";

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

  if (diagnostics.length > 0) {
    throw new SpecValidationError(diagnostics);
  }
}
