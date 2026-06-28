# Initial Spec Population Follow-up Plan

This document tracks only open decisions, partially completed work, and ongoing maintenance items that can still change the spec contract. Completed tasks are intentionally omitted.

## 1. Expand scope details only from approved source material

Status: **Partially complete; waiting for approved behavioral details**.

Follow-up rule:

- Do not invent deep behavior just to make files longer.
- Add details only when supported by `spec/README.md`, requirements, source
  evidence, tests, or an explicit project decision.

Candidate enrichment areas:

1. Attribute examples using the current `attrs` categories:
   - Uses/input keys such as `[value]`.
   - Produces/output keys such as `(selectionChange)`.
   - Behaves/action keys such as `(click)`.
2. Accessibility expectations for interactive widgets and behaviors.
3. Child model expectations for containers, pages, widgets, and views.
4. Validation notes for allowed `id`, `type`, `attrs`, and `children` shapes.

Acceptance criteria for each enriched scope:

- The file remains technology-independent.
- Angular Material references are clearly marked as reference patterns only.
- `openui.json` is updated when new scope nodes or `scopeDocument` links are
  added.
- Focused tests are updated when the public contract changes.
