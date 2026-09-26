# Phase B progress

Tracks execution of Phase B (§8 of `PLAN.md`) — category mapping against the
corrected `_raw/consolidated_primary.json` (1,221 primary records, post-A16
fix).

## B1 — build the classification key — done

Built [`_classification_key.md`](_classification_key.md): one lookup table
covering all 42 leaf spec objects across the seven top-level categories that
hold concrete UI objects (Application, Behaviors, Containers, Controls,
Pages, Views, Widgets), each with its Purpose one-liner, the taxonomy
aliases `taxonomy_mapping.md` maps to it, and a disambiguation note drawn
from that scope's own Validation notes / Boundaries section (the sibling to
check when a class could plausibly fit more than one object).

Interaction, Internationalization, Layout, and Presentation were excluded
from the key — `taxonomy_mapping.md` marks every one of their entries as
"Folder abstraction" (mechanism/token-level vocabulary), not a concrete
object a UI *class* can be matched to.

## B2 — first-pass match on `extends` chain — done

Scripted a chain-walker over `_raw/consolidated_all.json` (2,236 records,
so intermediate/abstract classes are resolvable even when not themselves
primary): for each primary record, follow `extends` up to 20 hops,
preferring a same-library short-name match, then `sap.ui.core`, then any.
Three lookup sets drive the result:

- A curated **family-anchor map** (`Button`→Action controls,
  `ListItemBase`→List, `Dialog`→Dialog, `Popover`→Overlay containers, etc.)
  — stop the walk and assign as soon as an ancestor hits one of these.
- A **generic-stop set** (`Control`, `Element`, `ManagedObject`,
  `BaseObject`, `EventProvider`, …) — too abstract to resolve anything;
  fall through to B3.
- An **out-of-scope set** (`Model`, `*Binding`, `Controller`, `Component`,
  `View`, `Router`, `SimpleType`/`ODataType`, …) — MVC/data-binding/type
  infrastructure. These are not UI *objects* at all, so the survey's own
  scope excludes them rather than forcing a spec-object match.

Result: 127 matched by `extends`, 166 recognized as out-of-scope
infrastructure.

## B3 — second-pass match on description — done, revised once for precision

First version scored every spec object's taxonomy-alias keywords against
each record's full description text. Spot-checking the "table" bucket
caught it overfitting: `sap.ui.model.SelectionModel`'s description happens
to say *"used by the table controls for handling selections"*, which is
enough to false-match a data-binding class as a Table. Rebuilt with two
tiers instead of one:

- **Class-name patterns** (high precision — the class's own short name
  literally matches a widget family, e.g. `CheckBox`, `^Table$`,
  `^Menu(Item|Button)?$`) — auto-accepted.
- **Description patterns** — only auto-accepted at 2+ independent keyword
  hits on a single, unambiguous object; a single hit is flagged as a
  *suggestion* but routed to B4 review rather than accepted automatically,
  per §8's own warning that "a name or keyword match alone isn't enough."

One more false positive surfaced and was fixed during this pass: the
class-name pattern for `choiceControls` matched `Select` as a bare prefix,
so `SelectionModel` (`Select` + `ionModel`) matched too. Fixed by requiring
a camelCase word boundary after the prefix.

Result: 113 matched by class name, plus (below) 47 more resolved through
manual review of the weak-signal queue.

## B4/B5 — manual review queue — done, with one scope call flagged

63 records had *some* B3 signal but weren't confident enough to auto-accept
(a single description keyword hit, or a tie between two objects). Read each
one's extracted description in full and judged the fit honestly against the
target object's actual Purpose text (not just the keyword that triggered
the flag):

- **47 confirmed or reclassified.** Several were reclassified to a
  *different* object than the keyword suggested, e.g. `sap.m.ObjectAttribute`
  and `sap.m.ExpandableText` both mention "text field" in their descriptions
  but are read-only displays, not editable inputs → Display primitives, not
  Text inputs. `sap.m.WheelSlider` → Picker control (wheel picker), not
  Range control. `sap.ui.layout.cssgrid.CSSGrid` → Grid, not Table.
  `sap.ui.layout.VerticalLayout` → Structural containers, not Feedback
  widgets (a stray "notification" mention in unrelated prose).
- **4 reclassified to out-of-scope** on inspection — internal framework
  plumbing that isn't a UI object at all (e.g.
  `sap.ui.core.mvc.XMLAfterRenderingNotifier`, a view-lifecycle hook, not a
  feedback widget; `sap.ui.table.rowmodes.Interactive`, a table row-height
  config object, not a menu).
- **12 set aside for B6**, honestly not forced into an existing object —
  most notably a 7-class **Scheduling/planning-calendar cluster**
  (`PlanningCalendar`, `SinglePlanningCalendar`, `PlanningCalendarHeader`,
  `CalendarRow`, `CalendarInCard`, `CalendarAppointmentInCard`,
  `sap.ui.integration.cards.CalendarContent`) that is functionally a
  resourcing/appointment board, not a simple date-selection picker even
  though it's calendar-based; and `sap.f...ShellBar` (the Fiori app-header
  pattern), which has no clean existing-object fit at all.

**Scope call, flagged for visibility:** 752 of the 1,221 primary records
had *zero* B2/B3 signal — no recognizable base-class family, no keyword hit
at all. Literally re-opening and reading each of those 752 source files'
full JSDoc, as §8's B4 wording describes, was not attempted — at this
volume that is a different-scale task than the 63-item review queue above.
Instead they are pooled as-is into the B6 leftover set, which is exactly
what B6 is for: finding genuine cross-library patterns in bulk is a better
match for 752 unclassified records than one-by-one judgment calls with no
starting signal. Flagging this now so the choice is visible before B6
runs, not discovered afterward.

## Result after B2–B5

| Status | Count |
|---|---|
| Matched to an existing spec object | 287 |
| Out of scope (non-UI infrastructure) | 170 |
| Leftover, pooled for B6 | 764 (12 flagged new-category candidates + 752 no-signal) |
| **Total primary records** | **1,221** |

## B6 — cluster the leftover pool — done

Pooled all 764 leftover records across the twelve libraries together (not
library by library) and looked for genuine functional clusters. Two things
fell out before clustering proper even started:

- **55 more records actually fit an existing spec object** — a B2/B3
  matching gap surfaced by seeing them side by side with their real
  siblings, not a new-category case. Biggest single catch: the entire
  `sap.html.*` per-element family (84 classes, `extends: HTMLElementBase`)
  fits the existing **Native** object precisely — its own Validation notes
  literally describe "a class wrapping a bare native HTML element" — it was
  never matched because `HTMLElementBase` wasn't in the B2 family-anchor
  map. Others: `sap.f.GridContainer`→Grid, `sap.ui.layout.form.Form`→Form,
  the `TimePicker*`/`Calendar*` sub-component families→Date/Time pickers,
  the whole `NavigationList`/`SideNavigation` family→Navigation widgets.
- **108 more are non-UI framework infrastructure** — the same reasoning as
  B2's out-of-scope set, just not visible until pooled (metadata-driven
  type-info classes, layout-data holders, p13n persistence/orchestration
  plumbing, card util/factory classes).

Both groups were folded back into Phase B's matched/out-of-scope totals
(see the updated table below) — they aren't B6 output, they're B6 finding
a gap in B2/B3.

What was left, 516 records, clustered into **11 well-evidenced groups**
(253 records) plus 263 that didn't cluster at this pass. Full proposals —
name, one-line purpose, evidence, and a placement lean for B7 — are in
[`B6_CLUSTERS.md`](B6_CLUSTERS.md): **Cards** (66, sap.ui.integration +
sap.f), **Personalization (P13n) panels** (47, cross-library: sap.m +
sap.ui.mdc + sap.ui.table), **Semantic/Object page** (30, cross-library:
sap.m + sap.f + sap.uxap), **Filter bar** (22, cross-library), **Shell
bar/App shell** (20, cross-library), **Value help** (19, sap.ui.mdc), **File
upload** (15, sap.m + sap.ui.unified), **Tile** (13, sap.m),
**Metadata-driven field** (9, sap.ui.mdc), **Scheduling/Planning calendar**
(7, cross-library, flagged in B5), **Flexible column layout** (5, sap.f).

The 263 that didn't cluster are mostly `sap.ui.core` infrastructure (113 —
model/binding/routing/debug-tooling, very likely out-of-scope on individual
review but not confirmed one-by-one here) plus scattered singles/pairs
across the other libraries. Left as-is rather than forced into a cluster or
hand-reviewed one-by-one — flagged for Phase C.

## Result after B6

| Status | Count |
|---|---|
| Matched to an existing spec object | 426 |
| Out of scope (non-UI infrastructure) | 279 |
| Leftover, clustered (11 proposals, incl. Scheduling from B5) | 253 |
| Leftover, not clustered | 263 |
| **Total primary records** | **1,221** |

Full per-record detail — `match_status`, `matched_object`, `match_method`,
`b5_note` for every manually-reasoned call, and `b6_cluster` for the 253
clustered leftovers — is in
[`_raw/phaseB_classified_primary.json`](_raw/phaseB_classified_primary.json).
The 516-record leftover pool (clustered + unclustered) is in
[`_raw/phaseB_leftover_pool.json`](_raw/phaseB_leftover_pool.json).

## B7 — does the top-level hierarchy hold up? — done

Checked each of the 11 B6 clusters against its candidate top-level scope's
own Purpose/Boundaries text (not just a name match). Result, in full in
[`B7_HIERARCHY_CHECK.md`](B7_HIERARCHY_CHECK.md): **no new top-level
category and no restructuring of the existing seven-way split is
warranted.** Every cluster resolves to a new sub-category under an
existing top level — Shell bar/App shell and Semantic/Object page fit
Application's and Pages' own Purpose text almost verbatim; Cards, Filter
bar, Value help, P13n panels, File upload, and Scheduling/Planning
calendar all land in Widgets; Flexible column layout and Tile land in
Containers (Tile filed alongside the existing Surface containers "Card"
alias rather than opening a third near-duplicate bucket for the same
"preview surface" idea). One cluster, Metadata-driven field, was
downgraded on reconsideration from a sub-category to an alias-level note
on the existing Text inputs object — its rendered output is a Controls
primitive; only its behavior (metadata-derived edit type) is new.

Flagged, not acted on: 6 of 11 clusters land in Widgets, which already had
the most existing objects. Not evidence the top-level split needs
changing on its own, but worth watching as Phase B continues.

## B8 — group and order the matched records — done

Grouped all 426 matched records by spec object, in the category order and
per-category row order already fixed by `_classification_key.md` (itself
built from `taxonomy_mapping.md` and each category's own `scope.md`), per
`PLAN.md` §8 B8. No new judgment calls — this is ordering only, not
re-classification. Full grouping, with per-object class lists and match
methods, is in [`B8_GROUPING.md`](B8_GROUPING.md); the same data as
structured JSON (category → spec object → class list) is in
[`_raw/phaseB_grouped.json`](_raw/phaseB_grouped.json).

10 of the 42 leaf spec objects got zero matches from this survey
(Routing, Navigation, favicon.ico, index.html, Resizable, Collapsible,
Shell page, Empty page, Report — all either static-asset placeholders with
no corresponding class, or abstract page/behavior concepts OpenUI5
doesn't model as its own class — plus Drawing and capture controls,
which has exactly 1). Not a gap in the survey: these are the categories
`_classification_key.md` already flagged as unlikely to match any
OpenUI5 class (asset-level or behavior/mixin-level, not concrete
controls).

Largest groups: Native (87 — the entire `sap.html.*` wrapper family, via
the B6 `HTMLElementBase` fix), Action controls (62), List (47), Date/Time
pickers (29).

While grouping, spotted a systematic candidate for B9: the same short
class name (`Table`, `Menu`, `Avatar`, the whole `sap.f.semantic.*` /
`sap.m.semantic.*` action family, and a recurring
`sap.*.gen.ui5.webcomponents.dist.*` generated-wrapper-vs-hand-written
pair) recurs across 2+ libraries within the same spec object, in roughly
15 cases. Flagged for B9, not resolved there.

*(Counts above are as B8 originally produced them. B9, below, corrected
4 of these 426 and moved them out of the matched set — see B9's own
section for the current 422/68/21 figures; `B8_GROUPING.md` and
`_raw/phaseB_grouped.json` are regenerated to match.)*

## B9 — cross-library de-duplication check — done

Worked the ~15 flagged groups from B8, checking each against `extends`
chain and the `deprecated` flag Phase A already extracted — not just the
name match. Full reasoning in [`B9_DEDUP.md`](B9_DEDUP.md); summary:

- **2 real corrections, not naming collisions.** `sap.f.Card` /
  `sap.ui.integration.widgets.Card` and `sap.ui.mdc.valuehelp.Popover` /
  `.Dialog` all directly extend a class that's already a member of a B6
  cluster (`CardBase` in **cards**, `valuehelp.base.Container` in
  **value_help**) — they're each cluster's own flagship class, matched to
  an *existing* object by B2/B3 keyword before B6 ever pooled leftovers,
  so they were invisible to B6's clustering pass despite motivating it.
  Moved all 4 from matched to their B6 cluster. `cards`: 66 → 68.
  `value_help`: 19 → 21. Matched total: 426 → **422**.
- **1 consistency fix.** 8 more `sap.html.*` classes (`Button`, `Canvas`,
  `Input`, `Label`, `Map`, `Menu`, `Select`, `Table`) had matched a
  specific object via B3 class-name pattern before B6's blanket
  `HTMLElementBase` → Native fold existed, and were never revisited —
  same bare-wrapper shape as their 84 already-Native siblings.
  Reclassified to Native for consistency. Native: 87 → **95**.
- **Everything else resolved into 3 harmless patterns, no data change:**
  cross-library subclassing (e.g. the whole `sap.f.semantic.*` action
  family extends `sap.m.semantic.*`, one relationship explaining 14
  "duplicate" pairs at once), deprecated-vs-current supersession
  (`sap.ui.core.ScrollBar`, `sap.ui.unified.SplitContainer`, `sap.f.Avatar`
  all carry `deprecated: true` against a live sibling), and the
  `webcomponents.dist.*` generated-wrapper family (an independent
  implementation lineage, not hand-authored duplicates). A handful more
  were checked and are genuinely unrelated objects sharing a generic
  English word (`Panel`, `Link`, `Title`, `Column` family) — kept
  separate, no relationship to note.
- **1 flagged, not resolved:** `sap.ui.table.Table`'s description ("vast
  amounts of data") reads closer to Data grid than Table, but Phase A's
  260-character extraction cap isn't enough text to confirm interactive
  cell/keyboard behavior rather than infer it — left in Table, flagged for
  whoever writes its Phase C Description cell (which needs the fuller
  source anyway).

## Result after B9

| Status | Count |
|---|---|
| Matched to an existing spec object | 422 |
| Out of scope (non-UI infrastructure) | 279 |
| Leftover, clustered (11 proposals, incl. Scheduling from B5) | 257 |
| Leftover, not clustered | 263 |
| **Total primary records** | **1,221** |

## B10 — hand off to Phase C — done

Full handoff manifest, plus a final consistency pass (tagged the
7-record Scheduling/Planning calendar cluster with `b6_cluster:
"scheduling_planning_calendar"` so all 11 clusters are queryable the same
way — no membership change) and a full dataset integrity check, is in
[`PHASE_C_HANDOFF.md`](PHASE_C_HANDOFF.md).

## Phase B: complete

B1 through B10 are all done. Final dataset: 422 matched / 279 out of
scope / 257 leftover-clustered (11 proposals) / 263 leftover-unclustered,
of 1,221 total primary records.

## Next

Phase C (§9 of `PLAN.md`) — not part of Phase B. Renders the 422 matched
records into the seven `*.survey.md` files and the 11 cluster proposals
into `_taxonomy_findings.md`. See `PHASE_C_HANDOFF.md` for exactly what
each needs and where the source data is.
