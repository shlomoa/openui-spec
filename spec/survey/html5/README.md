# HTML Standard survey

Survey of the [HTML Living Standard](https://html.spec.whatwg.org/multipage/) as a
reference source for the OpenUI specification. The baseline is WHATWG commit
`cd8ac6f1bbf86dd0bd09ef75d27dacaebe7b4c1d`, published 2026-09-22 and surveyed
2026-09-23.

**Status:** inventory and structural classification complete (plan steps 1–3), and the
taxonomy mapping and scope-tree proposal complete. Abstract naming, semantic research
and final validation (steps 4–7) are pending. Nothing here changes the canonical scope
tree, taxonomy mapping, evidence register or generated catalog.

## Contents

| File                                                                           | Content                                                                     |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| [SUMMARY.md](SUMMARY.md#baseline-and-scope)                                    | Survey summary: baseline, steps, findings, decisions and reasoning          |
| [PLAN.md](PLAN.md#steps)                                                       | The plan executed, with the status of each step                             |
| [category.md](category.md#categories)                                          | Survey categories (HTML chapters) and subcategories, with counts            |
| [taxonomy_mapping.md](taxonomy_mapping.md#summary)                             | All 151 OpenUI taxonomy entries mapped to HTML primitives and OpenUI scopes |
| [architecture_proposal.md](architecture_proposal.md#recommendation)            | Tree-shape alternatives and conditional new top-level folders               |
| [scopes_proposal.md](scopes_proposal.md#proposed-additions)                    | Existing-leaf enrichments and proposed additions P1–P8                      |
| [openui_schema_proposal.md](openui_schema_proposal.md#template-clarifications) | Template, attribute and child-model clarifications raised by HTML           |
| [opens.md](opens.md#open-items)                                                | Open and unresolved questions                                               |
| [inventory/](inventory/README.md#html-standard-survey)                         | The complete survey data as produced by the survey                          |

## Inventory

The `inventory/` folder holds the survey data unchanged. Its main entry points are:

- [Baseline and scope](inventory/BASELINE.md#scope) and [coverage checklist](inventory/COVERAGE.md#source-page-checklist).
- [Category map](inventory/CATEGORIES.md#introduction) and one [chapter inventory file](category.md#categories)
  per category.
- [Index reconciliation](inventory/INDEX_RECONCILIATION.md#elements) and
  [external dependencies](inventory/DEPENDENCIES.md#external-dependencies).
- [Exclusions and open decisions](inventory/EXCLUSIONS.md#explicit-exclusions-from-object-level-research).
- [Taxonomy crosswalk](inventory/TAXONOMY_MAPPING.md#sources-and-interpretation),
  [source-section crosswalk](inventory/SURVEY_SCOPE_CROSSWALK.md#1-introduction) and
  [scope-tree proposal](inventory/SCOPE_TREE_PROPOSAL.md#recommendation).
