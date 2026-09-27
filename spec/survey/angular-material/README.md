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

| File                                                                | Content                                                            |
| ------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [SUMMARY.md](SUMMARY.md#baseline-and-scope)                         | Survey summary: baseline, steps, findings, decisions and reasoning |
| [PLAN.md](PLAN.md#part-1-file-folder-and-export-survey)             | The plan executed, with the status of each step                    |
| [category.md](category.md#categories)                               | Survey categories and component families, with counts              |
| [taxonomy_mapping.md](taxonomy_mapping.md#summary)                  | Component families mapped to OpenUI scopes                         |
| [architecture_proposal.md](architecture_proposal.md#recommendation) | Keep the eleven roots; rejected alternatives                       |
| [scopes_proposal.md](scopes_proposal.md#new-leaves)                 | New leaves AM-P01–P05 and existing-leaf amendments AM-E01–E13      |
| [openui_schema_proposal.md](openui_schema_proposal.md#decisions)    | Deferred reference, event and ownership decisions D01–D07          |
| [opens.md](opens.md#open-items)                                     | Open and unresolved questions                                      |
| [inventory/](inventory/README.md#coverage)                          | The complete survey data as produced by the survey                 |

## Inventory

The `inventory/` folder holds the survey data unchanged. Its main entry points are:

- [Survey index](inventory/README.md#coverage), [source baseline](inventory/BASELINE.md#fixed-release-and-source-identity) and
  [complete inventory](inventory/INVENTORY.md#scope-and-counting-rules).
- [Taxonomy](inventory/TAXONOMY.md#classification-policy) and ten category files such as
  [Data entry](inventory/Data-entry.survey.md#direct-objects).
- [Reusable capability survey](inventory/BEHAVIORS.survey.md#scope-and-evidence-method) and
  [behavior mapping](inventory/BEHAVIOR_MAPPING.md#representation-and-decision-rules).
- [Taxonomy crosswalk](inventory/TAXONOMY_MAPPING.md#mapping-rules),
  [scope extension proposal](inventory/SCOPE_EXTENSION_PROPOSAL.md#recommended-structure),
  [proposed evidence](inventory/PROPOSED_EVIDENCE.md#candidate-leaf-entries) and
  [draft scope leaves](inventory/SCOPE_EXTENSION_PROPOSAL.md#recommended-structure).
- [Final report](inventory/FINAL_REPORT.md#step-6-consolidated-markdown-collection), [behavior review](inventory/BEHAVIOR_REVIEW.md#resulting-proposal)
  and [proposal checks](inventory/PROPOSAL_CHECKS.md#results).
