# C2–C8 — render the seven `*.survey.md` files

Per `PLAN.md` §9 C2–C8: render `_raw/phaseB_grouped.json`'s 424 matched
records into the seven category survey files, per C0's decision (full
source fetch, no cached-extract shortcuts) and C1's corrections.

## What was done

- Fetched the real source file for every one of the 405 matched classes
  not already covered by the §6 pilot (19 rows), at the pinned commit
  `5165c20cff6de9d79604008a76c56322aa721bf5` — zero fetch failures.
- Every spec object gets its own `## <Title>` heading + table, uniformly
  across all 7 files (a convention decision to resolve the pilot's
  inconsistent "Direct objects" shared-heading pattern) — the pre-existing
  `Widgets.survey.md` "Direct objects" table (Dialog + List) was split
  into separate `## Dialog` / `## List` headings accordingly.
- Rows within each table are sorted by library then class name, matching
  `B8_GROUPING.md`'s established order.
- Per C1: `sap.tnt.InfoLabel` and `sap.tnt.ToolHeaderUtilitySeparator` are
  included (the two B2/B3 gaps C1 fixed); `sap.tnt.ToolPage`'s stale pilot
  row is **dropped** from `Containers.survey.md` — it belongs to the Shell
  bar/App shell cluster and will appear in C9's `_taxonomy_findings.md`
  instead.
- `Behaviors.survey.md`, `Pages.survey.md`, and `Views.survey.md` are new
  files (no pilot precedent existed for them). `Pages.survey.md` has 0
  matched rows across all 3 leaf objects — documented as a placeholder
  note per object, not a missing file.

## Row counts (verified against `_raw/phaseB_grouped.json`)

| File | Rows |
|---|---|
| Application.survey.md | 8 |
| Behaviors.survey.md | 7 |
| Containers.survey.md | 41 |
| Controls.survey.md | 221 |
| Pages.survey.md | 0 |
| Views.survey.md | 5 |
| Widgets.survey.md | 142 |
| **Total** | **424** |

## Known minor inconsistency (not corrected, flagging for visibility)

The §6 pilot rows carry a parenthetical alias annotation in the Abstract
object cell for some rows (e.g. `sap.m.RadioButton` → "(Radio button)",
`sap.tnt.InfoLabel` → "(Tag)") to disambiguate which taxonomy alias a row
represents, for headings that gather several aliases. The 405 newly
rendered rows don't carry this annotation — the Description text conveys
the same distinction in prose instead. I left the pilot's existing
annotations in place rather than stripping them, and didn't attempt to
backfill annotations onto the new rows (would require re-deriving alias
assignments without a clear source of truth). Not a correctness issue,
just a minor formatting inconsistency you may want to resolve later.

## Next

C9 — render `_taxonomy_findings.md` from `B6_CLUSTERS.md`,
`B7_HIERARCHY_CHECK.md`, and `B9_DEDUP.md`'s corrections (including
`sap.tnt.ToolPage` as a motivating object). Not started.
