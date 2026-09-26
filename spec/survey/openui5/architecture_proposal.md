# OpenUI5 survey: architecture proposal

[Survey README](README.md) · Sources: [overall finding](inventory/_taxonomy_findings.md#overall-finding-no-top-level-restructuring-needed), [B7_HIERARCHY_CHECK.md](inventory/B7_HIERARCHY_CHECK.md), [TERMINOLOGY_PROPOSAL.md](inventory/TERMINOLOGY_PROPOSAL.md)

Status: proposal for review. The canonical tree and glossary are unchanged.

## No top-level restructuring

No new top-level category is needed, and the existing seven-way split for concrete
objects (Application, Behaviors, Containers, Controls, Pages, Views, Widgets) should
stay. All 11 clusters fit inside an existing top-level scope once checked against that
scope's own Purpose and Boundaries text. OpenUI5's SAP-specific, Fiori-flavored
vocabulary fitting a taxonomy that was not written against it is a real stress test
that the hierarchy passed.

**Watch item:** 6 of the 11 clusters land under Widgets, already the largest scope.
This is not a case for splitting Widgets today, but continued growth could create one.

## Standalone / Host-bound terminology

The survey proposes two glossary terms for a distinction the taxonomy does not yet name:

- **Standalone:** meaningful and usable on its own, without a reference to an existing
  object of another type. Most objects are standalone.
- **Host-bound:** only meaningful when associated with an existing object of another
  type. The kind of reference is stated in the object's Purpose prose using
  **targets**, **controls** or **supplies**.

Status:

- Approved on 2026-09-23 as prose-only vocabulary, not as a formal template field.
- The ready-to-paste glossary text is held in the
  [terminology proposal](inventory/TERMINOLOGY_PROPOSAL.md#ready-to-paste-glossary-entries-for-specreadmemd).
- Applying it is plan question Q10, deferred to workstream W1.

The Angular Material survey asks that this terminology not be adopted silently as a
canonical abstraction level. See the
[Angular Material reconciliation](../angular-material/inventory/SCOPE_EXTENSION_PROPOSAL.md#cross-survey-reconciliation).
