# OpenUI5 survey

Survey of [OpenUI5](https://github.com/UI5/openui5) as a reference source for the
OpenUI specification. It covers the `src/` tree of the twelve actively maintained core UI
libraries at commit `5165c20cff6de9d79604008a76c56322aa721bf5` (2026-09-21).

**Status:** complete. The pilot and Phases A, B and C are finished, and all 1,221 primary
classes are accounted for. What remains is judgment: reviewing the 11 proposed
subcategories and the Standalone / Host-bound terminology. Nothing here changes the
canonical scope tree, taxonomy mapping, evidence register or generated catalog.

## Contents

| File                                                 | Content                                                            |
| ---------------------------------------------------- | ------------------------------------------------------------------ |
| [SUMMARY.md](SUMMARY.md)                             | Survey summary: baseline, steps, findings, decisions and reasoning |
| [PLAN.md](PLAN.md)                                   | The plan executed, with the status of each phase                   |
| [category.md](category.md)                           | Classification under the OpenUI top-level scopes, with counts      |
| [taxonomy_mapping.md](taxonomy_mapping.md)           | All 424 matched classes mapped to OpenUI scopes                    |
| [architecture_proposal.md](architecture_proposal.md) | No top-level restructuring; Standalone / Host-bound terminology    |
| [scopes_proposal.md](scopes_proposal.md)             | 11 proposed subcategories from 257 unmatched classes               |
| [opens.md](opens.md)                                 | Open and unresolved questions                                      |
| [inventory/](inventory/PLAN.md)                      | The complete survey data as produced by the survey                 |

No schema change is proposed, so there is no `openui_schema_proposal.md`.

## Inventory

The `inventory/` folder holds the survey data unchanged. Its main entry points are:

- [Survey plan](inventory/PLAN.md), [pilot report](inventory/PHASE0_PILOT_REPORT.md) and
  progress logs for [Phase A](inventory/PHASE_A_PROGRESS.md) and
  [Phase B](inventory/PHASE_B_PROGRESS.md).
- [Classification key](inventory/_classification_key.md) and seven category files such
  as [Controls](inventory/Controls.survey.md).
- [Taxonomy findings](inventory/_taxonomy_findings.md) and
  [terminology proposal](inventory/TERMINOLOGY_PROPOSAL.md).
- [Final check](inventory/C10_FINAL_CHECK.md).
- Raw data in [inventory/\_raw/](inventory/_raw/): per-library extractions and the
  classified, grouped and leftover datasets.
