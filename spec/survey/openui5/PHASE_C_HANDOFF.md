# B10 — hand off to Phase C

Per `PLAN.md` §8 B10: Phase B's job ends here. This file is the handoff
manifest — it points Phase C at the finished B8-B9 dataset and the B6-B7
proposals, and records the final consistency check run before handing
off. It does not render any `*.survey.md` table or `_taxonomy_findings.md`
entry itself; per B10's own text, "Phase B itself does not write those
files."

## Phase B: complete

All ten steps (B1-B10) are done. Summary trail, each with its own
working document:

| Step | What it did | Output |
|---|---|---|
| B1 | Built the classification key (42 leaf objects, 7 categories) | `_classification_key.md` |
| B2 | First-pass match on `extends` chain | folded into `_raw/phaseB_classified_primary.json` |
| B3 | Second-pass match on description (two-tier, precision-fixed) | ″ |
| B4/B5 | Manual review queue (63 items) — confirm, reclassify, or set aside | ″, `PHASE_B_PROGRESS.md` §B4/B5 |
| B6 | Clustered the leftover pool into 11 candidate sub-categories | `B6_CLUSTERS.md` |
| B7 | Checked the top-level hierarchy against the 11 clusters | `B7_HIERARCHY_CHECK.md` |
| B8 | Grouped the 426-then-422 matched records by spec object/order | `B8_GROUPING.md` |
| B9 | Cross-library de-duplication check | `B9_DEDUP.md` |
| B10 | This handoff | `PHASE_C_HANDOFF.md` (this file) |

## Final dataset (post-B9)

| Status | Count |
|---|---|
| Matched to an existing spec object | 422 |
| Out of scope (non-UI infrastructure) | 279 |
| Leftover, clustered (11 proposals) | 257 |
| Leftover, not clustered | 263 |
| **Total primary records** | **1,221** |

**Updated by C1** (see [`C1_RECONCILIATION.md`](C1_RECONCILIATION.md)):
reconciling the §6 pilot data against this dataset caught 2 more
`sap.tnt` classes B2/B3 had missed (`InfoLabel`, `ToolHeaderUtilitySeparator`).
Matched is now **424**; leftover-not-clustered is now **261**. The
counts above are this document's original B10 snapshot, not the current
state — `_raw/phaseB_grouped.json` and `B8_GROUPING.md` carry the
current numbers.

## What Phase C needs, and where it is

**1. The seven `*.survey.md` files** (`Application.survey.md`,
`Behaviors.survey.md`, `Containers.survey.md`, `Controls.survey.md`,
`Pages.survey.md`, `Views.survey.md`, `Widgets.survey.md`), per `PLAN.md`
§4-§5. Source data: `_raw/phaseB_grouped.json` — 422 matched records,
already grouped by category → spec object, in the row order
`_classification_key.md` fixed. For each record, Phase C still needs to:

- Write the **Description** cell — paraphrased from the class's fuller
  JSDoc (Phase A's extraction is capped at ~260 characters, enough for
  classification, not enough to paraphrase responsibly without re-reading
  the source — see §5's "not copied verbatim" rule).
- Resolve the **Sources** cell — a GitHub permalink pinned to the survey's
  pinned commit SHA (§2) plus the official UI5 API reference page.
- For the handful of B9-flagged rows (the `sap.f.semantic.*`/
  `sap.m.semantic.*` family, `sap.ui.mdc.Table`/`.List` facades,
  `sap.ui.table.Table`'s Data-grid-vs-Table question — full list in
  `B9_DEDUP.md`), fold the B9 reasoning into that row's Description rather
  than re-deciding it from scratch.
- 10 of 42 leaf spec objects have zero matched rows (listed in
  `PHASE_B_PROGRESS.md`'s B8 section) — their `*.survey.md` "Direct
  objects" table (or sub-category subsection) is legitimately empty, not
  missing.

**2. `_taxonomy_findings.md`** — one entry per proposed sub-category
(name, one-line purpose, motivating objects with sources) plus any
proposed top-level restructuring, per §9. Source data:

- The 11 cluster proposals in `B6_CLUSTERS.md`, corrected by `B9_DEDUP.md`
  (Cards is 68 objects not 66, Value help is 21 not 19 — `B6_CLUSTERS.md`
  itself flags this at its top rather than being rewritten inline).
- The placement/reasoning for each cluster in `B7_HIERARCHY_CHECK.md`
  (which top-level category, and why, tied to that scope's own
  Purpose/Boundaries text) — including its finding that **no new
  top-level category and no restructuring of the existing seven-way split
  is warranted**, and the flagged-not-acted-on observation that 6 of 11
  clusters land in Widgets.
- Member lists for all 11 clusters (including the corrected Cards/Value
  help membership and the now-consistently-tagged `scheduling_planning_calendar`
  cluster, tagged same as the other 10 during B10's own consistency pass —
  see below) are in `_raw/phaseB_leftover_pool.json`'s `b6_cluster` field.

**3. Separately, not part of either output above:**
`TERMINOLOGY_PROPOSAL.md` (Standalone/Host-bound vocabulary) is still an
open proposal awaiting your decision on its three open questions — it
doesn't block B10 or Phase C, and isn't itself survey data.

## Consistency pass run before handoff

One gap closed as part of B10 itself (bookkeeping, not a new judgment
call): the 7-record Scheduling/Planning calendar cluster — flagged during
B5, before B6's `b6_cluster` tagging convention existed — was only
findable by a text search on its `b5_note`, unlike the other 10 clusters.
Tagged it `b6_cluster: "scheduling_planning_calendar"` for consistency, so
all 11 clusters are queryable the same way. No membership or placement
changed.

Full-dataset integrity check, run against the post-B9 files:

- 1,221 primary records total; matched + leftover + out_of_scope sums to
  1,221. ✓
- Every matched record carries a non-null `matched_object`. ✓
- The leftover set in `phaseB_classified_primary.json` and the pool in
  `phaseB_leftover_pool.json` contain exactly the same 520 classes. ✓
- `phaseB_grouped.json`'s total row count (422) matches the matched
  count. ✓
- All 11 `b6_cluster` tags now present and mutually exclusive; 250 + 7 =
  257 clustered, 263 untagged. ✓
- No duplicate class entries in the primary dataset (each of the 1,221
  source classes appears exactly once). ✓

## Next

Phase C (§9 of `PLAN.md`): render the two outputs above. Not part of
Phase B, and this document doesn't do it — it's the hand-off point.
