# C10 — final consistency check

Per `PLAN.md` §9 C10: verifies the full Phase C output (the seven
`*.survey.md` files plus `_taxonomy_findings.md`) against the B8–B9–C1
dataset before closing out Phase C.

## Checks run

**1. Row counts and class-set equality, per file and per sub-category
heading.** Extracted every rendered UI5 class from the 7 live
`*.survey.md` files on disk and compared against `_raw/phaseB_grouped.json`
(the authoritative 424-row matched dataset), both at the file level and
the individual heading level (e.g. Controls' Action controls table
specifically, not just the Controls file as a whole).

- 424 unique classes rendered, 424 expected — **exact match, zero
  missing, zero extra, zero duplicates** (a class appearing in two files
  or two headings would show up as a mismatch; none did).
- Per-file counts confirmed: Application 8, Behaviors 7, Containers 41,
  Controls 221, Pages 0, Views 5, Widgets 142.
- Per-heading placement (all 31 sub-category tables across the 7 files)
  matched `_raw/phaseB_grouped.json` exactly — every class sits under the
  same spec-object heading the dataset assigns it, not just the same
  file.
- `sap.tnt.ToolPage` confirmed **absent** from `Containers.survey.md`
  (per C1's finding).

**2. Links resolve.** Checked every `[GitHub](...)` / `[API ref](...)`
pair against the exact `file` path Phase A recorded for that class:

- Internal consistency: 0 problems across Application, Behaviors,
  Containers, Controls, Views, and Widgets — every link's path and class
  name match the dataset exactly.
- Live check: sampled 15 random `GitHub` links plus 3 targeted ones
  (`sap.tnt.ToolPage`, two `gen/ui5/webcomponents/dist/*` generated-wrapper
  files — the least "normal" file paths in the set) and fetched each via
  HTTP HEAD at the pinned commit. **18/18 returned 200 OK.**

**3. `_taxonomy_findings.md` cluster membership matches
`_raw/phaseB_leftover_pool.json`'s `b6_cluster` tags.** Recomputed all 11
clusters' membership and per-library breakdown directly from the current
JSON and compared against the document's stated counts.

- All 11 clusters' `**N objects**` figures matched exactly: Shell bar 20,
  Flexible column layout 5, Tile 13, Metadata-driven field 9, Semantic/
  Object page 30, Cards 68, Filter bar 22, Value help 21, Personalization
  panels 47, File upload 15, Scheduling/Planning calendar 7 — summing to
  **257**, matching the leftover pool's clustered-record count exactly.
- Found and fixed one gap: the document's intro paragraph never stated
  the 257-record total explicitly (only per-cluster counts, which summed
  to it silently). Added a one-clause note so the total is stated, not
  just derivable. No cluster membership or count itself was wrong.

**4. Whole-dataset arithmetic.** `_raw/phaseB_classified_primary.json`
(1,221 primary records):

| Status | Count |
|---|---|
| Matched (rendered in the 7 survey files) | 424 |
| Leftover, clustered (rendered in `_taxonomy_findings.md`) | 257 |
| Leftover, not clustered (named by library, not rendered — future spot-review) | 261 |
| Out of scope | 279 |
| **Total** | **1,221** |

424 + 257 + 261 + 279 = 1,221. ✓ The leftover pool's 518 records
(257 + 261) exactly match the primary dataset's 518 `leftover`-status
records, class for class — no drift between the two files.

## Result

**All checks pass.** One small completeness fix applied (the missing
257-total statement in `_taxonomy_findings.md`'s intro); no data,
placement, or link errors found. Phase C is complete: C0 (POC) → C1
(pilot reconciliation) → C2–C8 (seven survey files, 424 rows) → C9
(taxonomy findings, 11 clusters / 257 rows) → C10 (this check).

## Not covered by this check (explicitly out of scope)

- The 261 unclustered leftover records — never proposed as anything, so
  nothing to verify them against.
- `TERMINOLOGY_PROPOSAL.md` — an entirely separate, still-open proposal,
  unrelated to Phase C's dataset.
- Whether any of the 11 B6/B7 cluster placements or the Description-cell
  prose in the survey tables is *correct* in a taxonomic-judgment sense —
  that's a review question for you, not a consistency check.
