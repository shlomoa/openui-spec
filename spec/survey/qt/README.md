# Qt Widgets survey

Survey of the [Qt Widgets](https://doc.qt.io/qt-6/qtwidgets-index.html) module as a
reference source for the OpenUI specification. It covers user-facing UI components,
not code or API members. The reference documentation is Qt 6.11.2.

**Status:** complete. The component survey (steps 1–6) and the behavior extraction and
proposal revision (steps 7–14) are finished. Canonical integration is a separate
activity: nothing here changes the canonical scope tree, taxonomy mapping, evidence
register or generated catalog.

## Contents

| File                                                   | Content                                                                      |
| ------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [SUMMARY.md](SUMMARY.md)                               | Survey summary: baseline, steps, findings, decisions and reasoning           |
| [PLAN.md](PLAN.md)                                     | The plan executed, with the status of each step                              |
| [category.md](category.md)                             | Survey categories and subcategories, with counts                             |
| [taxonomy_mapping.md](taxonomy_mapping.md)             | All 94 Qt entries mapped to OpenUI scopes                                    |
| [architecture_proposal.md](architecture_proposal.md)   | Taxonomy and scope tree as linked views; conditional host-integration branch |
| [scopes_proposal.md](scopes_proposal.md)               | New leaves P01–P06 and existing-leaf enhancements                            |
| [openui_schema_proposal.md](openui_schema_proposal.md) | Behavior reference, unit and lifecycle decisions D01–D09                     |
| [opens.md](opens.md)                                   | Open and unresolved questions                                                |
| [inventory/](inventory/README.md)                      | The complete survey data as produced by the survey                           |

## Inventory

The `inventory/` folder holds the survey data unchanged. Its main entry points are:

- [Catalog index](inventory/README.md), [component inventory](inventory/01_COMPONENT_INVENTORY.md)
  and [category hierarchy](inventory/02_CATEGORY_HIERARCHY.md).
- [Component descriptions by category](inventory/categories/) and
  [behavior contracts by category](inventory/behaviors/README.md).
- [Behavior contracts](inventory/BEHAVIOR_CONTRACTS.md),
  [applicability matrix](inventory/COMPONENT_BEHAVIOR_MATRIX.md) (also as
  [JSON](inventory/COMPONENT_BEHAVIOR_MATRIX.json)) and
  [decisions](inventory/BEHAVIOR_DECISIONS.md).
- [Taxonomy crosswalk](inventory/TAXONOMY_MAPPING.md),
  [scope extension proposal](inventory/SCOPE_EXTENSION_PROPOSAL.md),
  [proposed evidence](inventory/PROPOSED_EVIDENCE.md) and
  [draft scope leaves](inventory/proposed-scopes/).
- [Validation](inventory/BEHAVIOR_VALIDATION.md) and
  [merge handoff](inventory/MERGE_HANDOFF.md).
