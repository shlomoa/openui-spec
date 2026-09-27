# Taxonomy findings — OpenUI5 survey

Per `PLAN.md` §9 C9: renders the B6–B7 category/hierarchy proposals into
one place. Source data: `B6_CLUSTERS.md` (11 clustering proposals,
corrected by `B9_DEDUP.md`), `B7_HIERARCHY_CHECK.md` (placement of each
cluster against the existing seven-way top-level split), and
`_raw/phaseB_leftover_pool.json`'s `b6_cluster` tags (current, corrected
membership) — 11 clusters, **257 records** total. Unlike the
`*.survey.md` files, this document keeps the narrative reasoning — a
proposal needs its "why," not just a table row.

None of this has been applied to `taxonomy_mapping.md` or any `scope.md`
— every placement below is a proposal for review, per §9's own scope
boundary (Phase C renders findings; it doesn't edit the taxonomy).

## Overall finding: no top-level restructuring needed

**No new top-level category is needed, and no restructuring of the
existing seven-way split (Application, Behaviors, Containers, Controls,
Pages, Views, Widgets) is warranted.** All 11 B6 clusters land inside an
existing top level as a new sub-category — or, in one case, an
alias-level note on an existing sub-category — once checked against that
top level's own Purpose/Boundaries text (B7's method, not a name match).
This is a real result, not a non-finding: OpenUI5's SAP-specific,
Fiori-flavored widget vocabulary (ShellBar, ObjectPageLayout, P13n panels,
Cards) fitting cleanly inside a taxonomy that wasn't written against it is
a genuine stress test the hierarchy passed.

**Observation, not a restructuring case:** 6 of the 11 clusters (Cards,
Filter bar, Value help, Personalization panels, File upload, Scheduling/
Planning calendar) land under **Widgets**, which already held the most
existing objects (11) of any top-level scope before this pass. Nothing
about the *kind* of thing a widget is changes between "Dialog" and
"Cards," so this isn't a case for splitting Widgets today — but it's the
one place where continued growth (261 records are still unclustered,
never mind a second clustering pass) could eventually tip into a real
case. Flagging it now rather than waiting for it to become one.

**261 records remain unclustered** (`b6_cluster: null` in
`_raw/phaseB_leftover_pool.json`) — no forced placement, per B6's own
rule. Breakdown: `sap.ui.core` ~113 (framework/model/binding/routing/debug
infrastructure — very likely mostly out-of-scope on individual review,
just not confirmed one-by-one), `sap.m` ~64, `sap.ui.layout` ~30 (mostly
non-visual layout-data/mechanism classes, Layout's own excluded
category), `sap.f` ~26, `sap.ui.unified` ~19, `sap.ui.mdc` ~12, others
≤2 each. Not part of this findings document — spot-review candidates
for a future pass, not proposals.

## Application → Shell bar / App shell (new sub-category)

**20 objects** — sap.f (11), sap.ui.unified (6), sap.m (2), sap.tnt (1).

*The application-level global header bar (branding, search, notifications,
user menu, "CoPilot" assistant slot) and the root shell/app container it's
mounted in.*

**Placement:** Application's own Purpose is "top-level bootstrap
scope… implementation-independent concepts and assets." A global header
bar and the root app container are exactly that — parallel to
Application's existing Tool bars object ("application-level command
surfaces"). Proposed as a new sub-category alongside Routing, Navigation,
and Tool bars.

**Motivating objects:**

| Object | Role | Source |
|---|---|---|
| `sap.f.ShellBar` | the global header bar itself — branding, search, notifications, user menu | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.f/src/sap/f/ShellBar.js) · [API ref](https://ui5.sap.com/#/api/sap.f.ShellBar) |
| `sap.f.shellBar.CoPilot` | the ShellBar's AI-assistant slot | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.f/src/sap/f/shellBar/CoPilot.js) · [API ref](https://ui5.sap.com/#/api/sap.f.shellBar.CoPilot) |
| `sap.ui.unified.Shell` | an older, `sap.ui.unified`-generation root shell/header container | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.unified/src/sap/ui/unified/Shell.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.unified.Shell) |
| `sap.m.App` | root application container hosting the app's page/navigation stack | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/App.js) · [API ref](https://ui5.sap.com/#/api/sap.m.App) |
| `sap.m.Shell` | wraps an App/SplitApp to add a device-frame-aware root shell | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/Shell.js) · [API ref](https://ui5.sap.com/#/api/sap.m.Shell) |
| `sap.tnt.ToolPage` | app-shell layout (header + collapsible side nav + content) — pilot-vs-pipeline note below | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.tnt/src/sap/tnt/ToolPage.js) · [API ref](https://ui5.sap.com/#/api/sap.tnt.ToolPage) |

**Note on `sap.tnt.ToolPage`:** the §6 pilot slice (predating B6/B7)
placed this class under Containers/Structural containers, reasoning about
it in isolation as a generic scaffold. C1's reconciliation (see
`C1_RECONCILIATION.md`) found that this later, cross-library-evidenced
Shell bar/App shell cluster — built after seeing `ShellBar`,
`sap.ui.unified.Shell`, `sap.m.App`, and `sap.m.Shell` side by side —
supersedes that placement: `ToolPage` combines the same
header+nav+content shell pattern as its cluster-mates. It was dropped from
`Containers.survey.md` accordingly and appears only here, per `PLAN.md`
§9's C1 action item.

## Containers → Flexible column layout (new sub-category)

**5 objects** — sap.f (5).

*A responsive layout that shows one, two, or three columns side by side
for a list → detail → detail navigation pattern, collapsing to a single
column on narrow screens.*

**Placement:** Containers' Purpose — "layout structures that arrange
child content in a specific layout or presentation pattern" — matches
close to verbatim. Distinct enough from the existing Splitters object (a
movable-divider mechanism, user-resizable at runtime) to be its own leaf
rather than a Splitters variant: this is a fixed navigation-depth pattern
with its own collapse behavior, not a generic resizable pane.

**Motivating objects:**

| Object | Role | Source |
|---|---|---|
| `sap.f.FlexibleColumnLayout` | the layout control itself | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.f/src/sap/f/FlexibleColumnLayout.js) · [API ref](https://ui5.sap.com/#/api/sap.f.FlexibleColumnLayout) |
| `sap.f.FlexibleColumnLayoutData` | per-child layout data controlling a column's width/visibility across states | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.f/src/sap/f/FlexibleColumnLayoutData.js) · [API ref](https://ui5.sap.com/#/api/sap.f.FlexibleColumnLayoutData) |

## Containers (Surface containers alias) → Tile (named variant, not a new sub-category)

**13 objects** — sap.m (13).

*A compact, fixed-size content-preview surface (KPI number, news snippet,
link) used for dashboard/launchpad-style navigation — always a uniform
grid cell with a defined content sub-type.*

**Placement:** `sap.m.GenericTile` (a sibling class, already in the
matched dataset) auto-matched Surface containers' existing "Card" alias
during B2/B3. Rather than open a third near-duplicate bucket for
"self-contained preview surface" — Surface containers' existing Card
alias, a new Widgets Cards sub-category, and a separate Tile
sub-category — B7 files this whole family as a named Tile variant
alongside Card under Surface containers. Its content sub-types
(Numeric/News/Feed) are internal composition, not separate taxonomy
objects. Kept distinct from the Widgets/Cards cluster below: Tile is a
uniform grid cell with a bounded set of content types, not Cards' richer,
manifest-driven, arbitrarily-typed content model.

**Motivating objects:**

| Object | Role | Source |
|---|---|---|
| `sap.m.Tile` | abstract base for the Tile family | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/Tile.js) · [API ref](https://ui5.sap.com/#/api/sap.m.Tile) |
| `sap.m.StandardTile` | the classic launchpad tile | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/StandardTile.js) · [API ref](https://ui5.sap.com/#/api/sap.m.StandardTile) |
| `sap.m.ActionTile` | tile variant styled for a triggerable action | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/ActionTile.js) · [API ref](https://ui5.sap.com/#/api/sap.m.ActionTile) |
| `sap.m.SlideTile` | cycles through several TileContent instances | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/SlideTile.js) · [API ref](https://ui5.sap.com/#/api/sap.m.SlideTile) |
| `sap.m.TileContent` | one content slot inside a tile | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/TileContent.js) · [API ref](https://ui5.sap.com/#/api/sap.m.TileContent) |
| `sap.m.NumericContent` | KPI-number content sub-type | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/NumericContent.js) · [API ref](https://ui5.sap.com/#/api/sap.m.NumericContent) |
| `sap.m.NewsContent` | news-snippet content sub-type | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/NewsContent.js) · [API ref](https://ui5.sap.com/#/api/sap.m.NewsContent) |
## Controls (Text inputs alias) → Metadata-driven field (alias-level note, not a new sub-category)

**9 objects** — sap.ui.mdc (9).

*An input control whose rendered edit type (plain text, token/tag entry,
multi-value list) is derived from bound metadata rather than fixed at
design time.*

**Placement:** the one cluster B7 resolved to *less* structure than B6's
initial "new sub-category" lean. B6 flagged it as borderline; B7
reconsidered and filed it as a variant/alias note on the existing Text
inputs object instead — its rendered *output* is a Controls-family
primitive (mostly text-input-shaped), and what's different is behavior
(the edit type is derived from metadata at runtime), not a structurally
new kind of object.

**Motivating objects:**

| Object | Role | Source |
|---|---|---|
| `sap.ui.mdc.Field` | the metadata-driven field control itself | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/Field.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.Field) |
| `sap.ui.mdc.MultiValueField` | metadata-driven multi-value/token variant | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/MultiValueField.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.MultiValueField) |
| `sap.ui.mdc.field.FieldInput` | the text-input-shaped edit control Field renders for simple types | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/field/FieldInput.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.field.FieldInput) |
| `sap.ui.mdc.field.TokenDisplay` | read-only token rendering for multi-value display | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/field/TokenDisplay.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.field.TokenDisplay) |
## Pages → Semantic / Object page (new sub-category)

**30 objects** — sap.m (10), sap.f (10), sap.uxap (10).

*A predefined page-layout convention layered on top of a generic page:
collapsible header with title and actions, an anchor-bar of sections/
subsections, a share menu, and a footer.*

**Placement:** Pages' Purpose is literally "predefined page-level
specification scopes" — this cluster is a predefined page layout, the
same kind of thing as the existing Dashboard object, just a different
layout convention (header+sections+footer rather than overview-metrics).
Distinct from Pages' existing Dashboard/Shell page/Empty page objects,
none of which model this header+sections structure. Genuinely cross-library
(three independent libraries — `sap.m`, `sap.f`, `sap.uxap` — built
close variants of the same pattern at different points in the framework's
history).

**Motivating objects:**

| Object | Role | Source |
|---|---|---|
| `sap.uxap.ObjectPageLayout` | the original, most complete implementation of the pattern | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.uxap/src/sap/uxap/ObjectPageLayout.js) · [API ref](https://ui5.sap.com/#/api/sap.uxap.ObjectPageLayout) |
| `sap.uxap.ObjectPageSection` | one collapsible section of the anchor-bar structure | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.uxap/src/sap/uxap/ObjectPageSection.js) · [API ref](https://ui5.sap.com/#/api/sap.uxap.ObjectPageSection) |
| `sap.uxap.ObjectPageHeader` | the collapsible header with title/actions | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.uxap/src/sap/uxap/ObjectPageHeader.js) · [API ref](https://ui5.sap.com/#/api/sap.uxap.ObjectPageHeader) |
| `sap.f.DynamicPage` | a lighter-weight, non-uxap reimplementation of the same header+content convention | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.f/src/sap/f/DynamicPage.js) · [API ref](https://ui5.sap.com/#/api/sap.f.DynamicPage) |
| `sap.m.semantic.SemanticPage` | the earliest, `sap.m`-generation version of the pattern | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/semantic/SemanticPage.js) · [API ref](https://ui5.sap.com/#/api/sap.m.semantic.SemanticPage) |
| `sap.m.semantic.ShareMenu` | the share-menu part of the convention | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/semantic/ShareMenu.js) · [API ref](https://ui5.sap.com/#/api/sap.m.semantic.ShareMenu) |
## Widgets → Cards (new sub-category)

**68 objects** — sap.ui.integration (52), sap.f (16).

*A declarative, manifest-driven widget ("Card") that renders one of
several typed content views (list, table, analytical, object, timeline,
calendar, web page, adaptive/MS Adaptive Card, component) inside a common
header/footer/filter/action shell, with an accompanying settings editor
for authoring the card's manifest.*

**Placement:** structurally a reusable component usable across pages/views
— Widgets' own Purpose, verbatim. Large (a whole library's worth of
objects) but Widgets' `scope.md` already separates "Common widgets" from
"More complex widgets" internally, so a big, complex new entry is
consistent with how the category is already organized, not a sign it
needs to split. Kept distinct from the Containers/Tile family above: Cards
has a materially different, richer content model (manifest-driven, typed
content, actions, filters, an authoring editor), not the same object at a
different size.

**On the flagship classes:** `sap.f.Card` and `sap.ui.integration.widgets.Card`
are this cluster's own publicly-instantiable root classes. B2/B3 matched
them to Containers/Surface containers' existing "Card" alias by class-name
keyword *before* B6 ever pooled the leftover classes (`BaseContent`,
`Header`, `editor.Editor`, etc.) that motivate this cluster — so despite
motivating the cluster, they were initially invisible to it. B9 caught
this gap and moved both in (see `B9_DEDUP.md` §"Cards and Value help").

**Motivating objects:**

| Object | Role | Source |
|---|---|---|
| `sap.f.Card` | flagship, publicly-instantiable Card class (sap.f) | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.f/src/sap/f/Card.js) · [API ref](https://ui5.sap.com/#/api/sap.f.Card) |
| `sap.ui.integration.widgets.Card` | flagship, publicly-instantiable Card class (sap.ui.integration) | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.integration/src/sap/ui/integration/widgets/Card.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.integration.widgets.Card) |
| `sap.ui.integration.cards.BaseContent` | abstract base for every typed content view | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.integration/src/sap/ui/integration/cards/BaseContent.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.integration.cards.BaseContent) |
| `sap.ui.integration.cards.ListContent` | list-typed content view | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.integration/src/sap/ui/integration/cards/ListContent.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.integration.cards.ListContent) |
| `sap.ui.integration.cards.Header` | the card's common header | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.integration/src/sap/ui/integration/cards/Header.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.integration.cards.Header) |
| `sap.ui.integration.editor.Editor` | settings editor for authoring a card's manifest | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.integration/src/sap/ui/integration/editor/Editor.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.integration.editor.Editor) |

## Widgets → Filter bar (new sub-category)

**22 objects** — sap.ui.mdc (15), sap.ui.integration (4), sap.m (3).

*A dedicated toolbar-like surface for entering and adjusting a set of
data filters together (as opposed to one filter control in isolation),
often paired with a Value help dialog for individual filter values.*

**Placement:** reusable component attached to a data view, same footing
as the existing Menu widgets sub-category.

**Motivating objects:**

| Object | Role | Source |
|---|---|---|
| `sap.ui.mdc.FilterBar` | the metadata-driven filter bar control | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/FilterBar.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.FilterBar) |
| `sap.ui.mdc.filterbar.FilterBarBase` | shared base behind the mdc filter-bar variants | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/filterbar/FilterBarBase.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.filterbar.FilterBarBase) |
| `sap.ui.integration.cards.filters.FilterBar` | the filter bar used inside a Card's filter slot | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.integration/src/sap/ui/integration/cards/filters/FilterBar.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.integration.cards.filters.FilterBar) |
| `sap.m.FacetFilter` | the earlier, `sap.m`-generation faceted-filter bar | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/FacetFilter.js) · [API ref](https://ui5.sap.com/#/api/sap.m.FacetFilter) |

## Widgets → Value help (new sub-category)

**21 objects** — sap.ui.mdc (21).

*A dialog/popover assistant for finding and selecting one or more
values — richer than a single choice control: supports conditions, fixed
lists, and table/list content as the selection surface.*

**Placement:** reusable component, close cousin of the existing Dialog
object, but its condition/fixed-list/table content model is distinct
enough not to be filed as just "a Dialog."

**On the flagship classes:** `sap.ui.mdc.valuehelp.Popover` and
`.Dialog` are this cluster's own publicly-instantiable presentation
classes — the same B2/B3-matched-before-B6-pooled-the-family gap as
Cards above (they matched Containers/Overlay containers and
Widgets/Dialog by class-name keyword before this cluster existed). B9
moved both in.

**Motivating objects:**

| Object | Role | Source |
|---|---|---|
| `sap.ui.mdc.ValueHelp` | the top-level value-help controller an app attaches to a field | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/ValueHelp.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.ValueHelp) |
| `sap.ui.mdc.valuehelp.base.Container` | shared base for the two presentation surfaces | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/valuehelp/base/Container.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.valuehelp.base.Container) |
| `sap.ui.mdc.valuehelp.Popover` | flagship popover presentation (non-modal) | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/valuehelp/Popover.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.valuehelp.Popover) |
| `sap.ui.mdc.valuehelp.Dialog` | flagship dialog presentation (modal, richer content) | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/valuehelp/Dialog.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.valuehelp.Dialog) |
| `sap.ui.mdc.valuehelp.content.FixedList` | fixed-list selection content | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/valuehelp/content/FixedList.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.valuehelp.content.FixedList) |
| `sap.ui.mdc.valuehelp.content.MDCTable` | table-based selection content | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/valuehelp/content/MDCTable.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.valuehelp.content.MDCTable) |
| `sap.ui.mdc.valuehelp.base.DefineConditionPanel` | condition-builder content for range/comparison filters | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/valuehelp/base/DefineConditionPanel.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.valuehelp.base.DefineConditionPanel) |

## Widgets → Personalization (P13n) panels (new sub-category)

**47 objects** — sap.m (35), sap.ui.mdc (7), sap.ui.table (5).

*Panels and column-menus that let a user adjust which columns/filters/
sort/grouping a Table, Chart, or FilterBar shows, plus named "variant"
save/switch — a cross-cutting pattern that attaches to several other
widgets rather than standing alone.*

**Placement:** reusable components (panels + column menus), same footing
as Filter bar and Value help above. One of the strongest-evidenced
clusters: three independent libraries (`sap.m`, `sap.ui.mdc`,
`sap.ui.table`) built the same personalization pattern separately.

**Motivating objects:**

| Object | Role | Source |
|---|---|---|
| `sap.m.P13nColumnsPanel` | column visibility/order panel (older `sap.m` generation) | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/P13nColumnsPanel.js) · [API ref](https://ui5.sap.com/#/api/sap.m.P13nColumnsPanel) |
| `sap.m.p13n.SortPanel` | sort panel (newer `sap.m.p13n` generation) | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/p13n/SortPanel.js) · [API ref](https://ui5.sap.com/#/api/sap.m.p13n.SortPanel) |
| `sap.m.table.columnmenu.MenuBase` | base for the column-header menu that hosts these panels | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/table/columnmenu/MenuBase.js) · [API ref](https://ui5.sap.com/#/api/sap.m.table.columnmenu.MenuBase) |
| `sap.m.VariantManagement` | named-variant save/switch UI | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/VariantManagement.js) · [API ref](https://ui5.sap.com/#/api/sap.m.VariantManagement) |
| `sap.ui.mdc.p13n.panels.AdaptFiltersPanel` | the `sap.ui.mdc`-generation filter-adaptation panel | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.mdc/src/sap/ui/mdc/p13n/panels/AdaptFiltersPanel.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.mdc.p13n.panels.AdaptFiltersPanel) |

## Widgets → File upload (new sub-category)

**15 objects** — sap.m (12), sap.ui.unified (3).

*A widget for selecting, queuing, and uploading one or more files, with
per-item progress and status, distinct from a plain file-picker control.*

**Placement:** reusable composite component (queue + progress + item
list), already anticipated in `PLAN.md` §8 B5's untested-candidates list
as `sap.m.UploadCollection`.

**Motivating objects:**

| Object | Role | Source |
|---|---|---|
| `sap.m.UploadCollection` | the earlier, `sap.m`-generation upload widget | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/UploadCollection.js) · [API ref](https://ui5.sap.com/#/api/sap.m.UploadCollection) |
| `sap.m.upload.UploadSet` | the current-generation upload widget | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/upload/UploadSet.js) · [API ref](https://ui5.sap.com/#/api/sap.m.upload.UploadSet) |
| `sap.m.upload.Uploader` | low-level upload transport used by UploadSet | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/upload/Uploader.js) · [API ref](https://ui5.sap.com/#/api/sap.m.upload.Uploader) |
| `sap.ui.unified.FileUploader` | the underlying native file-input wrapper both widgets build on | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.unified/src/sap/ui/unified/FileUploader.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.unified.FileUploader) |

## Widgets → Scheduling / Planning calendar (new sub-category)

**7 objects** — sap.m (3), sap.f (2), sap.ui.integration (1), sap.ui.unified (1).
*(Flagged during B5, not B6 — included here for completeness since it's
the same kind of cluster.)*

*Displays rows of appointments/resources across a time range — a
resourcing/scheduling board, functionally distinct from Date/Time
pickers' single-value date selection even though both are
calendar-based.*

**Placement:** reusable component, peer of the existing Date/Time pickers
object rather than a variant of it — the object being displayed is
fundamentally different (appointments across resources/time, not a
single date value).

**Motivating objects:**

| Object | Role | Source |
|---|---|---|
| `sap.m.PlanningCalendar` | the primary resourcing/scheduling board control | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/PlanningCalendar.js) · [API ref](https://ui5.sap.com/#/api/sap.m.PlanningCalendar) |
| `sap.m.SinglePlanningCalendar` | single-resource variant | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.m/src/sap/m/SinglePlanningCalendar.js) · [API ref](https://ui5.sap.com/#/api/sap.m.SinglePlanningCalendar) |
| `sap.f.CalendarInCard` | planning calendar rendered inside a Card | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.f/src/sap/f/CalendarInCard.js) · [API ref](https://ui5.sap.com/#/api/sap.f.CalendarInCard) |
| `sap.ui.integration.cards.CalendarContent` | the Card content-type that hosts it | [GitHub](https://github.com/UI5/openui5/blob/5165c20cff6de9d79604008a76c56322aa721bf5/src/sap.ui.integration/src/sap/ui/integration/cards/CalendarContent.js) · [API ref](https://ui5.sap.com/#/api/sap.ui.integration.cards.CalendarContent) |
