# B6 — leftover clustering (working draft)

Working output of Phase B step B6: clusters proposed from the leftover pool,
pooled across all twelve libraries. This is a draft input to B7 (does the
top-level hierarchy hold up?) and Phase C's `_taxonomy_findings.md` — not
itself an edit to `taxonomy_mapping.md`.

Starting point: 764 leftover records after B5. Pooling and clustering found
55 more that actually fit an *existing* spec object (a B2/B3 gap, not a new
category — e.g. `sap.f.GridContainer` → Grid, the whole `sap.html.*`
per-element family → Native) and 108 more that are non-UI framework
infrastructure (out of scope, same reasoning as B2's out-of-scope set) —
both counted back into Phase B's matched/out-of-scope totals, not into B6.
That leaves **516 leftover**, of which **253 cluster into 11 coherent,
well-evidenced groups** below. The remaining **270** (details in the
`_raw/phaseB_leftover_pool.json` `b6_cluster: null` entries) didn't cluster
at this pass — mostly `sap.ui.core` infrastructure (113: models, bindings,
routing, debug/support tooling — almost certainly out-of-scope on
individual review, just not confirmed one-by-one) plus scattered
single/double objects across other libraries with no clear sibling. Flagged
for Phase C spot-review rather than forced into a cluster now.

Each proposal below gives a name, a one-line purpose (scope.md style), the
evidence (object count, libraries), and a placement lean for B7 to confirm
or revise — B7 is the step that decides whether that lean holds up against
the existing top-level split, not this one.

**Updated after B9** (see [`B9_DEDUP.md`](B9_DEDUP.md)): `sap.f.Card` /
`sap.ui.integration.widgets.Card` and `sap.ui.mdc.valuehelp.Popover` /
`.Dialog` had matched an *existing* object by keyword before B6 ever
pooled leftovers, so they were missing from Cards and Value help below
despite being those clusters' own flagship classes. B9 moved all 4 in.
**Cards is 66 → 68 objects, Value help is 19 → 21** — the counts and
class lists in those two sections below are the original B6 figures, not
yet corrected inline; treat `B9_DEDUP.md` as authoritative for the
current membership.

## Cards

**66 objects** — sap.ui.integration (58), sap.f (8).

A declarative, manifest-driven widget ("Card") that renders one of several
typed content views (list, table, analytical, object, timeline, calendar,
web page, adaptive/MS Adaptive Card, component) inside a common
header/footer/filter/action shell, with an accompanying settings editor for
authoring the card's manifest.

Representative objects: `BaseContent`, `ListContent`, `TableContent`,
`ObjectContent`, `AnalyticalContent`, `TimelineContent`, `Header`,
`NumericHeader`, `Footer`, `CardActions`, `editor.Editor` +11 typed field
editors, `CardBase`, `cards.loading.*` placeholders (8).

Lean: this is large and self-contained enough to be its own sub-category —
tentatively under **Widgets** (peer of Dialog/Table), but its size (an
entire library) is worth B7 checking against a new top-level category
instead of forcing it under Widgets.

## Shell bar / App shell

**20 objects** — sap.f (11), sap.ui.unified (6), sap.m (2), sap.tnt (1).

The application-level global header bar (branding, search, notifications,
user menu, "CoPilot" assistant slot) and the root shell/app container it's
mounted in.

Representative objects: `ShellBar`, `ShellBarItem`, `ShellBarBranding`,
`UserMenu`, `shellBar.CoPilot`, `sap.ui.unified.Shell`/`ShellHeader`,
`sap.m.App`, `sap.m.Shell`, `sap.tnt.ToolPage`.

Lean: **Application** — sub-category alongside routing/navigation/tool
bars; this is squarely "application-level bootstrap chrome," which is
Application's existing Purpose almost verbatim.

## Filter bar

**22 objects** — sap.ui.mdc (15), sap.ui.integration (4), sap.m (3).

A dedicated toolbar-like surface for entering and adjusting a set of data
filters together (as opposed to one filter control in isolation), often
paired with a Value help dialog for individual filter values.

Representative objects: `sap.ui.mdc.FilterBar`, `filterbar.FilterBarBase`,
`cards.filters.FilterBar`, `sap.m.FacetFilter`.

Lean: **Widgets**, new sub-category (peer of Menu widgets).

## Value help

**19 objects** — sap.ui.mdc only.

A dialog/popover assistant for finding and selecting one or more values —
richer than a single choice control: supports conditions, fixed lists, and
table/list content as the selection surface.

Representative objects: `ValueHelp`, `valuehelp.base.Container`,
`valuehelp.content.FixedList`, `valuehelp.content.MDCTable`,
`valuehelp.base.DefineConditionPanel`.

Lean: **Widgets**, new sub-category — close cousin of Dialog, but the
condition/fixed-list/table content model is distinct enough not to just be
"a Dialog."

## Personalization (P13n) panels

**47 objects** — sap.m (36), sap.ui.mdc (7), sap.ui.table (5, column-menu
side).

Panels and column-menus that let a user adjust which columns/filters/
sort/grouping a Table, Chart, or FilterBar shows, plus named "variant"
save/switch. A cross-cutting pattern that attaches to several other
widgets rather than standing alone.

Representative objects: `sap.m.P13nColumnsPanel`, `p13n.FilterPanel`,
`p13n.SortPanel`, `table.columnmenu.MenuBase` +14 column-menu action
types, `VariantManagement`, `mdc.p13n.panels.AdaptFiltersPanel`.

Lean: **Widgets**, new sub-category — genuinely cross-library (three
libraries independently built the same pattern), strong evidence.

## Metadata-driven field

**9 objects** — sap.ui.mdc only.

An input control whose rendered edit type (plain text, token/tag entry,
multi-value list) is derived from bound metadata rather than fixed at
design time.

Representative objects: `Field`, `MultiValueField`, `field.FieldInput`,
`field.TokenDisplay`.

Lean: borderline — could be recorded as a variant/alias of **Controls /
Text inputs** rather than a wholly new object, since its rendered *output*
is usually a text-input-family control; the metadata-driven *behavior* is
what's new. Flagging for B7 rather than pre-deciding.

## File upload

**15 objects** — sap.m (12), sap.ui.unified (3).

A widget for selecting, queuing, and uploading one or more files, with
per-item progress and status, distinct from a plain file-picker control.

Representative objects: `sap.m.UploadCollection`, `upload.UploadSet`,
`upload.Uploader`, `sap.ui.unified.FileUploader`.

Lean: **Widgets**, new sub-category. (This was already anticipated in
`PLAN.md`'s §8 B5 untested-candidates list as `sap.m.UploadCollection`.)

## Tile

**13 objects** — sap.m only.

A compact, fixed-size content-preview surface (KPI number, news snippet,
link) used for dashboard/launchpad-style navigation — distinct from a
generic Card in that it's always a uniform grid cell with a defined content
sub-type.

Representative objects: `sap.m.Tile`, `StandardTile`, `ActionTile`,
`SlideTile`, `TileContent`, `NumericContent`, `NewsContent`.

Lean: `GenericTile` (a sibling class) already auto-matched to Containers /
Surface containers' "Card" alias — leaning toward filing this whole family
there as a named Tile variant rather than a new category, but flagging for
B7 since the content-type richness (Numeric/News/Feed) resembles the Cards
cluster more than a plain surface container.

## Semantic / Object page

**30 objects** — sap.m (9), sap.f (10), sap.uxap (11).

A predefined page-layout convention layered on top of a generic page:
collapsible header with title and actions, an anchor-bar of sections/
subsections, a share menu, and a footer — distinct from Pages' existing
Dashboard/Shell page/Empty page, none of which model this header+sections
structure.

Representative objects: `sap.uxap.ObjectPageLayout`, `ObjectPageSection`,
`ObjectPageHeader`, `sap.f.DynamicPage`, `sap.m.semantic.SemanticPage`,
`semantic.ShareMenu`.

Lean: **Pages**, new sub-category — sits naturally alongside Dashboard as
another predefined page layout.

## Flexible column layout

**5 objects** — sap.f only.

A responsive layout that shows one, two, or three columns side by side for
a list → detail → detail navigation pattern, collapsing to a single column
on narrow screens.

Representative objects: `sap.f.FlexibleColumnLayout`,
`FlexibleColumnLayoutData(ForDesktop/ForTablet)`.

Lean: small (5 objects, one library) but a genuinely distinct, well-known
layout pattern with no existing-object fit — Containers (peer of Splitters,
which is a related but different mechanism) or Pages. Flagging for B7.

## Scheduling / Planning calendar

**7 objects** — sap.m (3), sap.f (3), sap.ui.integration (1). *(Flagged
during B5, not this pass — included here for completeness since it's a B6-
style cluster.)*

Displays rows of appointments/resources across a time range — a
resourcing/scheduling board, functionally distinct from Date/Time pickers'
single-value date selection even though both are calendar-based.

Representative objects: `sap.m.PlanningCalendar`, `SinglePlanningCalendar`,
`sap.f.CalendarInCard`, `sap.ui.integration.cards.CalendarContent`.

Lean: **Widgets**, new sub-category, peer of Date/Time pickers rather than
folded into it.

## Not clustered (263 records)

No forced placement. Breakdown: `sap.ui.core` 113 (framework/model/
binding/routing/debug infrastructure — very likely mostly out-of-scope on
individual review, just not confirmed one-by-one here), `sap.m` 64,
`sap.ui.layout` 30 (mostly non-visual layout-data/mechanism classes,
Layout's own excluded category), `sap.f` 26, `sap.ui.unified` 19,
`sap.ui.mdc` 12, others ≤2 each. Full list in
`_raw/phaseB_leftover_pool.json`.
