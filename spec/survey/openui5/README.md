# OpenUI5 survey

Survey of [OpenUI5](https://github.com/UI5/openui5) as a reference source for the
OpenUI specification. It covers the `src/` tree of the twelve actively maintained core UI
libraries at commit `5165c20cff6de9d79604008a76c56322aa721bf5` (2026-09-21).

**Status:** complete. The pilot and Phases A, B and C are finished, and all 1,221 primary
classes are accounted for. What remains is judgment: reviewing the 11 proposed
subcategories and the Standalone / Controlling element terminology. Nothing here changes the
canonical scope tree, taxonomy mapping, evidence register or generated catalog.

## Contents

| File                                                                            | Content                                                                                                |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [SUMMARY.md](SUMMARY.md#baseline-and-scope)                                     | Survey summary: baseline, steps, findings, decisions and reasoning                                     |
| [PLAN.md](PLAN.md#libraries)                                                    | The plan executed, with the status of each phase                                                       |
| [category.md](category.md#categories)                                           | Classification under the OpenUI top-level scopes, with counts                                          |
| [taxonomy_mapping.md](taxonomy_mapping.md#summary)                              | All 424 matched classes, and 150 more proposed by the review of the leftovers, mapped to OpenUI scopes |
| [architecture_proposal.md](architecture_proposal.md#no-top-level-restructuring) | No top-level restructuring                                                                             |
| [scopes_proposal.md](scopes_proposal.md#overlaps-with-other-surveys)            | 11 proposed subcategories from 257 unmatched classes                                                   |
| [opens.md](opens.md#open-items)                                                 | Open and unresolved questions                                                                          |
| [inventory/](inventory/PLAN.md#1-objective)                                     | The complete survey data as produced by the survey                                                     |

No schema change is proposed, so there is no `openui_schema_proposal.md`.

## Inventory

The `inventory/` folder holds the survey data unchanged. Its main entry points are:

- [Survey plan](inventory/PLAN.md#1-objective), [pilot report](inventory/PHASE0_PILOT_REPORT.md#what-ran) and
  progress logs for [Phase A](inventory/PHASE_A_PROGRESS.md#a1--snapshot) and
  [Phase B](inventory/PHASE_B_PROGRESS.md#b1--build-the-classification-key--done).
- [Classification key](inventory/_classification_key.md#application) and seven category files such
  as [Controls](inventory/Controls.survey.md#native).
- [Taxonomy findings](inventory/_taxonomy_findings.md#overall-finding-no-top-level-restructuring-needed) and
  [terminology proposal](inventory/TERMINOLOGY_PROPOSAL.md#the-terms).
- [Final check](inventory/C10_FINAL_CHECK.md#checks-run).
- Raw data in `inventory/_raw/` (see [Phase A](inventory/PLAN.md#7-phase-a--scripted-inventory-extraction-mechanical-no-judgment-calls)): per-library extractions and the
  classified, grouped and leftover datasets.
