# Qt Widgets survey

Survey of the [Qt Widgets](https://doc.qt.io/qt-6/qtwidgets-index.html) module as a
reference source for the OpenUI specification. It covers user-facing UI components,
not code or API members. The reference documentation is Qt 6.11.2.

**Status:** complete. The component survey (steps 1–6) and the behavior extraction and
proposal revision (steps 7–14) are finished. Canonical integration is a separate
activity: nothing here changes the canonical scope tree, taxonomy mapping, evidence
register or generated catalog.

## Contents

| File                                                                | Content                                                                      |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [SUMMARY.md](SUMMARY.md#baseline-and-scope)                         | Survey summary: baseline, steps, findings, decisions and reasoning           |
| [PLAN.md](PLAN.md#part-1-component-survey)                          | The plan executed, with the status of each step                              |
| [category.md](category.md#categories)                               | Survey categories and subcategories, with counts                             |
| [taxonomy_mapping.md](taxonomy_mapping.md#summary)                  | All 94 Qt entries mapped to OpenUI scopes                                    |
| [architecture_proposal.md](architecture_proposal.md#recommendation) | Taxonomy and scope tree as linked views; conditional host-integration branch |
| [scopes_proposal.md](scopes_proposal.md#new-leaves)                 | New leaves P01–P06 and existing-leaf enhancements                            |
| [openui_schema_proposal.md](openui_schema_proposal.md#decisions)    | Behavior reference, unit and lifecycle decisions D01–D09                     |
| [opens.md](opens.md#open-items)                                     | Open and unresolved questions                                                |
| [inventory/](inventory/README.md#browse-the-catalog)                | The complete survey data as produced by the survey                           |

## Inventory

The `inventory/` folder holds the survey data unchanged. Its main entry points are:

- [Catalog index](inventory/README.md#browse-the-catalog), [component inventory](inventory/01_COMPONENT_INVENTORY.md#step-1-result)
  and [category hierarchy](inventory/02_CATEGORY_HIERARCHY.md#step-2-result).
- [Component descriptions by category](inventory/README.md#browse-the-catalog) and
  [behavior contracts by category](inventory/behaviors/README.md#completed-proposal).
- [Behavior contracts](inventory/BEHAVIOR_CONTRACTS.md#contract-index),
  [applicability matrix](inventory/COMPONENT_BEHAVIOR_MATRIX.md#codes-and-interpretation) (also as
  `COMPONENT_BEHAVIOR_MATRIX.json`) and
  [decisions](inventory/BEHAVIOR_DECISIONS.md#remaining-acceptance-and-implementation-boundaries).
- [Taxonomy crosswalk](inventory/TAXONOMY_MAPPING.md#inputs-and-interpretation),
  [scope extension proposal](inventory/SCOPE_EXTENSION_PROPOSAL.md#proposed-scope-tree),
  [proposed evidence](inventory/PROPOSED_EVIDENCE.md#existing-scope-anchors) and
  [draft scope leaves](inventory/SCOPE_EXTENSION_PROPOSAL.md#proposed-scope-tree).
- [Validation](inventory/BEHAVIOR_VALIDATION.md#final-proposal-validation--steps-1014) and
  [merge handoff](inventory/MERGE_HANDOFF.md#accepted-work-candidate-set).
