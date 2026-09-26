# OpenUI5 survey: plan executed

[Survey README](README.md) · [Full plan](inventory/PLAN.md)

The survey ran as a pilot followed by three phases. The full plan, including the library
list, exclusion filter and table schema, is in the [original plan](inventory/PLAN.md).

| Phase | Steps  | Goal                                                                                                        | Status   | Result                                                                                                                                                                                                                                                                                                                 |
| ----- | ------ | ----------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pilot | P1–P5  | Test the exclusion filter, class detection, descriptions and matching on `sap.tnt` plus ten `sap.m` classes | Complete | [Pilot report](inventory/PHASE0_PILOT_REPORT.md)                                                                                                                                                                                                                                                                       |
| A     | A1–A16 | Scripted, per-library inventory extraction (no judgment calls)                                              | Complete | [Phase A log](inventory/PHASE_A_PROGRESS.md), `inventory/_raw/<library>.json`                                                                                                                                                                                                                                          |
| B     | B1–B10 | Match classes to spec objects, cluster leftovers, check the hierarchy, de-duplicate                         | Complete | [Phase B log](inventory/PHASE_B_PROGRESS.md), [classification key](inventory/_classification_key.md), [clusters](inventory/B6_CLUSTERS.md), [hierarchy check](inventory/B7_HIERARCHY_CHECK.md), [grouping](inventory/B8_GROUPING.md), [de-duplication](inventory/B9_DEDUP.md), [handoff](inventory/PHASE_C_HANDOFF.md) |
| C     | C0–C10 | Write up the seven category files and the taxonomy findings                                                 | Complete | [Description method POC](inventory/C0_POC.md), [pilot reconciliation](inventory/C1_RECONCILIATION.md), [rendering summary](inventory/C2_C8_SUMMARY.md), [findings](inventory/_taxonomy_findings.md), [final check](inventory/C10_FINAL_CHECK.md)                                                                       |

## Libraries

- **In scope:** `sap.m`, `sap.f`, `sap.ui.core`, `sap.ui.layout`, `sap.ui.table`,
  `sap.ui.unified`, `sap.tnt`, `sap.uxap`, `sap.ui.mdc`, `sap.html`,
  `sap.ui.integration` and `sap.ui.codeeditor`.
- **Out of scope:**
  - Theme libraries.
  - Tooling and test libraries.
  - The deprecated `sap.ui.commons` and `sap.ui.ux3`.
  - The `sap.ui.webc.*` Web Component wrappers.

Out-of-scope libraries are candidates for a later, separate pass.

## Key execution decision

Step C0 compared three ways of writing descriptions. Descriptions are written from a
**full source fetch** for every matched class. The shorter cached extract truncates
text and strips `@link` references. See [C0_POC.md](inventory/C0_POC.md).
