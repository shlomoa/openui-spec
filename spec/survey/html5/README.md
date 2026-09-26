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

| File                                                   | Content                                                                     |
| ------------------------------------------------------ | --------------------------------------------------------------------------- |
| [SUMMARY.md](SUMMARY.md)                               | Survey summary: baseline, steps, findings, decisions and reasoning          |
| [PLAN.md](PLAN.md)                                     | The plan executed, with the status of each step                             |
| [category.md](category.md)                             | Survey categories (HTML chapters) and subcategories, with counts            |
| [taxonomy_mapping.md](taxonomy_mapping.md)             | All 151 OpenUI taxonomy entries mapped to HTML primitives and OpenUI scopes |
| [architecture_proposal.md](architecture_proposal.md)   | Tree-shape alternatives and conditional new top-level folders               |
| [scopes_proposal.md](scopes_proposal.md)               | Existing-leaf enrichments and proposed additions P1–P8                      |
| [openui_schema_proposal.md](openui_schema_proposal.md) | Template, attribute and child-model clarifications raised by HTML           |
| [opens.md](opens.md)                                   | Open and unresolved questions                                               |
| [inventory/](inventory/README.md)                      | The complete survey data as produced by the survey                          |

## Inventory

The `inventory/` folder holds the survey data unchanged. Its main entry points are:

- [Baseline and scope](inventory/BASELINE.md) and [coverage checklist](inventory/COVERAGE.md).
- [Category map](inventory/CATEGORIES.md) and one [chapter inventory file](inventory/inventory/)
  per category.
- [Index reconciliation](inventory/INDEX_RECONCILIATION.md) and
  [external dependencies](inventory/DEPENDENCIES.md).
- [Exclusions and open decisions](inventory/EXCLUSIONS.md).
- [Taxonomy crosswalk](inventory/TAXONOMY_MAPPING.md),
  [source-section crosswalk](inventory/SURVEY_SCOPE_CROSSWALK.md) and
  [scope-tree proposal](inventory/SCOPE_TREE_PROPOSAL.md).
