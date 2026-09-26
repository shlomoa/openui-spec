# Angular Material survey

Survey of [`@angular/material`](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material)
22.1.7 (commit `e950f29dcfbda93c13bff0d1a632465364488249`) as a reference source for the
OpenUI specification. It covers every tracked file and folder under `src/material/` and
every published export declaration.

**Status:** complete. The file, folder and export survey (steps 1–7), and the capability
research, mapping and scope proposal (steps 8–11), are finished. Deferred contract
decisions remain documented. Nothing here changes the canonical scope tree, taxonomy
mapping, evidence register, glossary or generated catalog.

## Contents

| File                                                   | Content                                                            |
| ------------------------------------------------------ | ------------------------------------------------------------------ |
| [SUMMARY.md](SUMMARY.md)                               | Survey summary: baseline, steps, findings, decisions and reasoning |
| [PLAN.md](PLAN.md)                                     | The plan executed, with the status of each step                    |
| [category.md](category.md)                             | Survey categories and component families, with counts              |
| [taxonomy_mapping.md](taxonomy_mapping.md)             | Component families mapped to OpenUI scopes                         |
| [architecture_proposal.md](architecture_proposal.md)   | Keep the eleven roots; rejected alternatives                       |
| [scopes_proposal.md](scopes_proposal.md)               | New leaves AM-P01–P05 and existing-leaf amendments AM-E01–E13      |
| [openui_schema_proposal.md](openui_schema_proposal.md) | Deferred reference, event and ownership decisions D01–D07          |
| [opens.md](opens.md)                                   | Open and unresolved questions                                      |
| [inventory/](inventory/README.md)                      | The complete survey data as produced by the survey                 |

## Inventory

The `inventory/` folder holds the survey data unchanged. Its main entry points are:

- [Survey index](inventory/README.md), [source baseline](inventory/BASELINE.md) and
  [complete inventory](inventory/INVENTORY.md).
- [Taxonomy](inventory/TAXONOMY.md) and ten category files such as
  [Data entry](inventory/Data-entry.survey.md).
- [Reusable capability survey](inventory/BEHAVIORS.survey.md) and
  [behavior mapping](inventory/BEHAVIOR_MAPPING.md).
- [Taxonomy crosswalk](inventory/TAXONOMY_MAPPING.md),
  [scope extension proposal](inventory/SCOPE_EXTENSION_PROPOSAL.md),
  [proposed evidence](inventory/PROPOSED_EVIDENCE.md) and
  [draft scope leaves](inventory/proposed-scopes/).
- [Final report](inventory/FINAL_REPORT.md), [behavior review](inventory/BEHAVIOR_REVIEW.md)
  and [proposal checks](inventory/PROPOSAL_CHECKS.md).
