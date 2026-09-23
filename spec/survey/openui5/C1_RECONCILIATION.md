# C1 — reconcile the Phase 0 pilot data

Per `PLAN.md` §9 C1: check every row already in `Application.survey.md`,
`Controls.survey.md`, `Containers.survey.md`, and `Widgets.survey.md`
(the §6 pilot slice) against the post-B9 dataset
(`_raw/phaseB_grouped.json`), so the C2–C8 full render doesn't duplicate
a row the pilot already placed — and so any place the pilot and the
full B1–B9 pipeline disagree gets resolved before rendering, not after.

## Method

Cross-checked all 20 pilot rows' UI5 class names against
`_raw/phaseB_classified_primary.json` (the authoritative post-B9
classification for all 1,221 primary records): does the class exist
there, is its `match_status` `matched`, and does its `matched_object`
agree with the spec object the pilot assigned it to.

## Result: 17 of 20 agree exactly

`sap.m.Toolbar`, `sap.tnt.ToolHeader`, `sap.m.Button`, `sap.m.Input`,
`sap.m.TextArea`, `sap.tnt.SideNavigationSearchField`, `sap.m.CheckBox`,
`sap.m.RadioButton`, `sap.m.Link`, `sap.m.IconTabBar`, `sap.m.Dialog`,
`sap.m.List`, `sap.tnt.NavigationList`, `sap.tnt.NavigationListGroup`,
`sap.tnt.NavigationListItem`, `sap.tnt.NavigationListMenuItem`, and
`sap.tnt.SideNavigation` all match their pilot placement exactly. C2–C8
should treat these 17 rows as already rendered — skip re-deriving their
classification (their Description/Sources cells should still be
regenerated at Method-1 quality per C0, since the pilot predates that
formal decision, though a spot-read of the existing text suggests it
was already written from full-source paraphrase, not a mechanical
snippet).

Worth resolving explicitly, not left as a loose end for C2–C8: the
pilot flagged `sap.tnt.NavigationListMenuItem` as "ambiguous... plausibly
also fits Menu widgets." The full pipeline's B2 `extends`-chain match
(it extends the same `NavigationListItem` family) placed it in
Navigation widgets with no B4/B5 review flag — i.e. the larger evidence
base resolved the pilot's own open question. No further action; noting
it so the ambiguity isn't silently reopened.

## 3 disagreements found, and resolved

| Class | Pilot said | Full pipeline said (pre-C1) | Resolution |
|---|---|---|---|
| `sap.tnt.InfoLabel` | Status indicator (Tag) | **leftover, unclustered** | Pilot was right — genuine B2/B3 gap. Fixed. |
| `sap.tnt.ToolHeaderUtilitySeparator` | Display primitives (Separator/Divider) | **leftover, unclustered** | Pilot was right — genuine B2/B3 gap. Fixed. |
| `sap.tnt.ToolPage` | Containers/Structural containers (Scaffold) | **leftover, B6 `shell_bar` cluster** | Full pipeline supersedes — see below. |

**`InfoLabel` and `ToolHeaderUtilitySeparator`:** both are small
`sap.tnt` classes (the whole library has only 11 primary classes) that
never got a B2 family-anchor or B3 keyword hit, so they sat untouched
in the 263-record unclustered leftover pool — the same kind of gap B6
found and fixed for the 84-class `sap.html.*` family and B9 found and
fixed for Card/Value help. Checked each against its target object's own
Purpose/alias text (Status indicator's taxonomy aliases literally
include "Tag"; Display primitives' include "Separator/Divider") — both
fit cleanly. Reclassified `matched`, folded into the dataset (`matched`:
422 → **424**; unclustered leftover: 263 → **261**).

**`ToolPage`:** a real disagreement, not a gap. The pilot (§6, run
before B6 existed) judged it in isolation as a generic app-shell layout
— Structural containers. B6/B7, run later against the full
cross-library picture, placed `sap.tnt.ToolPage` as a named member of
the **Shell bar / App shell** cluster (`B6_CLUSTERS.md`), alongside
`sap.f.ShellBar`, `sap.ui.unified.Shell`, `sap.m.App`, and `sap.m.Shell`
— and B7 placed that whole cluster under **Application**, not
Containers, reasoning tied to Application's own Purpose text
("application-level bootstrap chrome"). The pilot's own
`Application.survey.md` note already flagged uncertainty here ("not
strictly application-level only... an open taxonomy-scope question"),
so this isn't the pilot digging in against later evidence — it's
exactly the kind of call a 2-object pilot slice couldn't have made with
the cross-library context B6/B7 later had. **B6/B7's placement stands;
the pilot's Containers/Structural-containers placement for `ToolPage` is
superseded.**

## Action items for C2–C10

- **`Controls.survey.md`:** when C2–C8 renders the full Controls file,
  include `sap.tnt.InfoLabel` (Status indicator) and
  `sap.tnt.ToolHeaderUtilitySeparator` (Display primitives) — they're
  now in the 424-matched dataset like any other row.
- **`Containers.survey.md`:** when rendered, `sap.tnt.ToolPage` does
  **not** appear under Structural containers — drop the pilot's row for
  it entirely from this file.
- **`Application.survey.md` / `_taxonomy_findings.md`:** `sap.tnt.ToolPage`
  belongs with the Shell bar/App shell cluster's other motivating
  objects when C9 renders that cluster's entry in
  `_taxonomy_findings.md` ("motivating objects with sources," per §9) —
  it's a B6-cluster proposal object, not part of the 424-row matched
  dataset C2–C8 renders directly.
- No other pilot rows need special handling; the remaining 17 carry
  straight through.

## Updated dataset state

| Status | Before C1 | After C1 |
|---|---|---|
| Matched | 422 | **424** |
| Out of scope | 279 | 279 |
| Leftover, clustered | 257 | 257 |
| Leftover, not clustered | 263 | **261** |
| **Total** | **1,221** | **1,221** |

`_raw/phaseB_classified_primary.json`, `_raw/phaseB_leftover_pool.json`,
`_raw/phaseB_grouped.json`, and `B8_GROUPING.md` are all regenerated to
match (each of the 2 fixed records carries a `c1_note` explaining the
change).

## Next

C2–C8 — render the seven `*.survey.md` files from the (now 424-row)
`_raw/phaseB_grouped.json`, full source fetch per C0's decision. Not
started.
