# B9 — cross-library de-duplication check

Per `PLAN.md` §8 B9: "Where more than one in-scope library defines a
similarly-named or similarly-purposed class... decide whether both rows
stay or one is noted as superseding the other." Starting point was the
~15-group candidate list flagged at the end of the original B8 pass (same
short class name recurring across 2+ libraries within one spec object).
Each group below was checked against its classes' actual `extends` chain,
`deprecated` flag, and extracted description — not just the name match —
the same evidence-before-verdict standard B4/B5 used.

Two real corrections came out of this (not naming collisions — genuine
misclassifications the name collision surfaced); everything else resolved
into three recurring, harmless patterns plus one flag for Phase C.

## Corrections applied

### 1. `sap.html.*` consistency fix (8 records)

B6 folded the entire 84-class `sap.html.*` family into **Native** via a
`HTMLElementBase`-based refinement (see `PHASE_B_PROGRESS.md`'s B6
section). Checking the flagged duplicate list against the full `sap.html`
matched set turned up 8 more `sap.html.*` classes that had *already*
matched something else during B3 (class-name pattern, before B6 ran) and
so were invisible to B6's leftover-pool-only refinement:

| Class | Was | Now |
|---|---|---|
| `sap.html.Button` | Action controls | Native |
| `sap.html.Canvas` | Drawing and capture controls | Native |
| `sap.html.Input` | Text inputs | Native |
| `sap.html.Label` | Display primitives | Native |
| `sap.html.Map` | Media widgets | Native |
| `sap.html.Menu` | Menu widgets | Native |
| `sap.html.Select` | Choice controls | Native |
| `sap.html.Table` | Table | Native |

Every one of these has the same shape as its 84 already-Native siblings:
`extends: HTMLElementBase`, empty extracted description (bare wrappers
carry no JSDoc body worth extracting) — a `sap.html.Table` is a wrapper
around the native `<table>` element, not the same "Table" concept as
`sap.m.Table`'s sortable/filterable responsive control. Reclassified to
Native for consistency with Native's own Purpose ("no custom control
needed") and Validation notes ("a class wrapping a bare native HTML
element with little added behavior"). Native goes from 87 to 95.

### 2. Cards and Value help: flagship classes were never in their own cluster (4 records)

A real gap in the B6→B8 pipeline, not a naming collision. B6 only pooled
records that were still `leftover` at the time; a class already `matched`
by B2/B3 was excluded from the leftover pool even if it belonged with the
cluster B6 later built around its own base class:

- **`sap.f.Card`** and **`sap.ui.integration.widgets.Card`** both `extends
  CardBase` — and `sap.f.CardBase` is already a member of B6's **cards**
  cluster (66 objects: `BaseContent`, `Header`, `editor.Editor`, etc.).
  These two are the cluster's own flagship, publicly-instantiable classes
  — they matched Containers/Surface containers' existing "Card" alias via
  B2/B3 class-name keyword before B6 ever pooled leftovers, so they were
  never candidates for B6's clustering pass despite motivating it.
- **`sap.ui.mdc.valuehelp.Popover`** and **`sap.ui.mdc.valuehelp.Dialog`**
  both `extends Container` — and `sap.ui.mdc.valuehelp.base.Container` is
  already a member of B6's **value_help** cluster (19 objects). Same
  pattern: matched Containers/Overlay containers and Widgets/Dialog by
  class-name ("Popover", "Dialog") before B6 pooled the family they
  belong to.

Moved all 4 from `matched` to `leftover`, tagged with their cluster
(`cards` → 68 objects, `value_help` → 21 objects). This is a B7-relevant
correction too: it strengthens (doesn't change) B7's finding that Cards
and Value help are their own Widgets sub-categories, since their own
public API classes now sit inside the evidence base instead of being
counted as "this already fits an existing object."

**Net effect on B8's matched total: 426 → 422** (Native's count is
unchanged by the Card/Value-help move — those left Containers/Widgets,
not Native — see the updated `B8_GROUPING.md` and `PHASE_B_PROGRESS.md`).

## Patterns that explain the rest (no data change)

Checking each remaining flagged group's `extends` field and `deprecated`
flag surfaced three recurring, legitimate shapes behind almost every
"same name in two libraries" case — worth recording so Phase C doesn't
re-litigate them one by one:

**Cross-library subclassing** (the specialized library's class directly
`extends` the generic one, aliased with an `M`/library prefix — e.g.
`sap.f.semantic.SemanticButton extends MSemanticButton`, i.e. it
subclasses `sap.m.semantic.SemanticButton`). Confirmed for:
- The entire `sap.f.semantic.*` / `sap.m.semantic.*` action family (14
  pairs: `AddAction`, `DeleteAction`, `EditAction`, `FavoriteAction`,
  `FlagAction`, `MainAction`, `MessagesIndicator`, `NegativeAction`,
  `PositiveAction`, `PrintAction`, `SemanticButton`,
  `SemanticToggleButton`, `SendEmailAction`, `SendMessageAction`,
  `ShareInJamAction`) — `sap.f.semantic.*` extends `sap.m.semantic.*`
  throughout, confirmed on every pair spot-checked. Not 14 accidental
  collisions; one systematic relationship (`sap.f`'s DynamicPage/
  ObjectPage context reusing and extending `sap.m`'s SemanticPage
  vocabulary). Both rows stay — they're genuinely different classes with
  different page contexts — but Phase C's Description cells can note the
  relationship once rather than 14 times.
- `sap.ui.integration.controls.ComboBox extends MComboBox` (=
  `sap.m.ComboBox`).
- `sap.ui.integration.controls.ObjectStatus extends MObjectStatus` (=
  `sap.m.ObjectStatus`).
- `sap.m.p13n.MessageStrip extends MessageStrip` (= `sap.m.MessageStrip`;
  its own description confirms it's "an accessibility enhancement" of the
  base control, not an independent one).
- `sap.m.upload.Column extends mColumn` (= `sap.m.Column`) — an
  owned-part variant for the File upload widget's item list.

**Deprecated-vs-current supersession** (checked the `deprecated` flag
Phase A already extracted, per record):
- `sap.ui.core.ScrollBar` — **deprecated: true**. `sap.m.ScrollBar` —
  not deprecated, near-identical description. `sap.m.ScrollBar`
  supersedes it.
- `sap.ui.unified.SplitContainer` — **deprecated: true, experimental:
  true**. `sap.m.SplitContainer` — not deprecated. `sap.m.SplitContainer`
  supersedes it.
- `sap.f.Avatar` — **deprecated: true** (and itself `extends MAvatar`,
  i.e. already a subclass of `sap.m.Avatar`). `sap.m.Avatar` supersedes
  it doubly: structurally (subclass) and by deprecation.

None of these needed removing from the matched dataset — Phase A already
kept the `deprecated` flag on every record for exactly this kind of call;
Phase C's Description cells should just note the current/deprecated
relationship rather than presenting both as equally live.

**Independent parallel implementation, not a duplicate** (`extends
WebComponentBaseClass`, an unrelated lineage from the classic
control-framework classes): the `sap.f.gen.ui5.webcomponents.dist.*` /
`sap.f.gen.ui5.webcomponents_fiori.dist.*` wrapper family (`Avatar`,
`Label`, `Menu`, `MenuItem`, `ListItem`, `SearchField` seen in the flagged
list, part of a larger generated-wrapper set) — UI5's separate Web
Components-based control surface, auto-generated bindings, not
hand-authored variants of the `sap.m`/`sap.f` controls they happen to
share a short name with. Both rows stay; noted as one pattern, not
per-object.

## Checked and kept distinct (name collision only, no relationship)

A few flagged pairs turned out to be unrelated objects that happen to
share a generic English word as their short name — checked individually
against their actual Purpose, not folded into either pattern above:

- **`sap.m.Panel`** (generic collapsible content container) vs.
  **`sap.ui.mdc.link.Panel`** (shows `items`/`additionalContent` for a
  Link's quick-view popover) — different `extends`, different purpose,
  coincidental name only.
- **`sap.m.Link`** (generic hyperlink control) vs. **`sap.ui.mdc.Link`**
  (a `fieldInfo`-driven navigation/quick-view element, `extends
  FieldInfoBase`) — same story.
- **`sap.m.Title`** (a rendered heading control) vs. **`sap.ui.core.Title`**
  (a non-visual title-metadata element used as an aggregation property on
  other controls, e.g. a form section's title) — different kind of object
  entirely, not a visual/legacy split.
- **`sap.m.MenuItemGroup`** vs. **`sap.ui.unified.MenuItemGroup`** — near-
  identical description, neither `deprecated`, no `extends` relationship
  found between them. Genuinely two independent definitions of the same
  idea in two libraries of different vintage; kept both since the
  deprecation evidence that resolved ScrollBar/SplitContainer/Avatar isn't
  present here — flagged for Phase C rather than guessed.
- **`sap.ui.mdc.list.DragDropConfig`** vs. **`sap.ui.mdc.table.DragDropConfig`**
  — each is the drag-drop configuration owned by its respective host
  widget (List vs. Table), not two implementations of one thing, same
  shape as the Column family below.
- **Column family** (`sap.m.Column`, `sap.m.upload.Column`,
  `sap.ui.mdc.table.Column`, `sap.ui.table.Column`) — each is the
  column-definition child type of a *different* Table implementation.
  Not duplicates; genuinely owned parts, one per host, the way
  `QHeaderView` was recorded as an "owned part" of its table in the Qt
  survey's own `TAXONOMY_MAPPING.md` precedent.

## Flagged, not resolved — for Phase C

**`sap.ui.table.Table`** (currently filed under **Table**, alongside
`sap.m.Table` and the `sap.ui.mdc.Table` facade). Its extracted
description — "a comprehensive set of features for displaying and dealing
with **vast amounts of data**... supports desktop PCs and tablet devices"
— reads closer to Widgets/Data grid's own disambiguation line
("interactive tabular-data widget: focus, selection, editing, keyboard
grid nav") than to Table's ("standard tabular data presentation"). Not
reclassified here: Phase A's extraction caps each description at 260
characters, and that's not enough text to confirm cell-focus/editing/
keyboard-grid-nav behavior directly rather than infer it. Whoever writes
this row's Phase C Description cell will need to read the fuller source
file anyway (per §5's "paraphrased, not pasted" rule) — that's the right
moment to confirm or reject this one, not a name-collision guess made
here without the fuller text.

**`sap.ui.mdc.Table`** and **`sap.ui.mdc.List`** — both explicitly
metadata-driven facades that delegate to the "real" controls
(`sap.ui.mdc.Table`'s own description names `ResponsiveTable` and
`GridTable` as what it wraps; `sap.ui.mdc.List`'s names `sap.f.GridList`
and `sap.m.List`). Kept as their own rows — they're the actual class
application code instantiates in the `sap.ui.mdc` metadata-driven
pattern, not redundant with what they wrap — but Phase C's Description
cells should say so explicitly (facade over X/Y), the same note-once
treatment as the semantic-action family above.

## Result

- Matched dataset: 426 → **422** (4 moved into B6 clusters).
- B6 `cards` cluster: 66 → **68**.
- B6 `value_help` cluster: 19 → **21**.
- Native: 87 → **95** (8 `sap.html.*` reclassified in, 0 out).
- No other counts change — every other flagged group resolved to "both
  rows stay," with a relationship noted, not a removal.

`_raw/phaseB_classified_primary.json` and `_raw/phaseB_leftover_pool.json`
are updated in place (each corrected/moved record carries a `b9_note`
explaining the change); `B8_GROUPING.md` and `PHASE_B_PROGRESS.md` are
regenerated/updated to match.

## Next

B10 — hand off to Phase C. The grouped, de-duplicated dataset from B8-B9
(422 matched records, `_raw/phaseB_grouped.json`) is what Phase C renders
into the `*.survey.md` tables; the B6-B7 category/hierarchy proposals
(11 clusters, now 250 + 7 Scheduling = 257 leftover-clustered records)
are what Phase C renders into `_taxonomy_findings.md`. Phase B itself
doesn't write those files, per `PLAN.md` §8 B10.
