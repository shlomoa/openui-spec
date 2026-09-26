# B7 — does the top-level hierarchy hold up?

Checks each B6 cluster against the seven existing top-level scopes'
Purpose/Boundaries text, per §8 B7 of `PLAN.md`. This stage proposes; it
does not edit `taxonomy_mapping.md`.

## Finding

**No new top-level category is needed, and no restructuring of the
existing seven-way split (Application, Behaviors, Containers, Controls,
Pages, Views, Widgets) is warranted.** All 11 B6 clusters land inside an
existing top level as a new sub-category (or, in one case, an alias-level
note) once checked against that scope's own Purpose/Boundaries text — the
existing split is abstract enough by design ("implementation-independent
concepts," per several of the top-level scopes' own wording) that even
OpenUI5's SAP-specific widget vocabulary fits inside it. This is a real
result, not a non-finding: the top-level hierarchy was a legitimate thing
to doubt going in, and it held up under a stress test from a much larger
and more specific framework than the taxonomy was likely written against.

Per-cluster placement, with the reasoning tied to the target scope's own
words (not just a name match):

| Cluster | Target top level | Why |
|---|---|---|
| Shell bar / App shell | **Application** | Application's own Purpose: "top-level bootstrap scope... implementation-independent concepts and assets." A global header bar and the root app container are exactly that, parallel to the existing Tool bars object ("application-level command surfaces"). |
| Semantic / Object page | **Pages** | Pages' Purpose is literally "predefined page-level specification scopes" — this cluster is a predefined page layout (header + sections + footer convention), the same kind of thing as the existing Dashboard object, just a different layout. |
| Flexible column layout | **Containers** | Containers' Purpose: "layout structures that arrange child content in a specific layout or presentation pattern" — matches close to verbatim. Distinct enough from Splitters (a movable divider mechanism) to be its own leaf, not a Splitters variant. |
| Tile | **Containers** (Surface containers) | `GenericTile` already auto-matched Surface containers' existing "Card" alias in B2/B3. Rather than open a third near-duplicate bucket for "self-contained preview surface" (Surface containers' Card alias, a new Widgets Cards category, and a separate Tile category), Tile is filed as a named variant alongside Card under Surface containers. Its content sub-types (News/Numeric/Feed) are internal composition, not separate objects. |
| Cards | **Widgets** | Structurally a reusable component usable across pages/views — Widgets' own Purpose, verbatim. Large (66 objects, a whole library) but Widgets' `scope.md` already separates "Common widgets" from "More complex widgets" internally, so a big, complex new entry is consistent with how the category is already organized, not a sign it needs to split. Kept distinct from the Tile/Card family above — it's a materially different, richer content model (manifest-driven, typed content, actions, filters), not the same object at a different size. |
| Filter bar | **Widgets** | Reusable component attached to a data view, same footing as the existing Menu widgets sub-category. |
| Value help | **Widgets** | Reusable component, close cousin of the existing Dialog object but with a distinct condition/fixed-list/table content model. |
| Personalization (P13n) panels | **Widgets** | Reusable components (panels + column menus) attached to Table/Chart/FilterBar. Cross-library evidence (sap.m, sap.ui.mdc, sap.ui.table independently built the same pattern) makes this one of the strongest-evidenced clusters. |
| File upload | **Widgets** | Reusable composite component (queue + progress + item list), already anticipated in `PLAN.md` §8 B5's untested-candidates list. |
| Scheduling / Planning calendar | **Widgets** | Reusable component, peer of the existing Date/Time pickers object rather than a variant of it — the object being displayed is fundamentally different (appointments across resources/time, not a single date value). |
| Metadata-driven field | **Controls** (alias-level, not a new sub-category) | Reconsidered from B6's "borderline" flag: its rendered *output* is a Controls-family primitive (mostly text-input-shaped), and what's different is behavior (the edit type is derived from metadata) rather than a structurally new kind of object. Recording it as a variant/alias note on the existing Text inputs object, not a new sub-category — the one cluster that resolved to *less* structure than initially proposed. |

## Observation, not a restructuring case

6 of 11 clusters land under Widgets, which already held the most existing
objects (11) of any top-level scope. Worth flagging for whoever reviews
this: Widgets is getting large. It is **not**, on the evidence gathered
here, a case for splitting Widgets into two top-level categories — nothing
about the *kind* of thing a widget is changes between "Dialog" and
"Cards" — but it's the one place where continued growth (Phase B hasn't
even reached the 263 unclustered leftovers or done a second clustering
pass) could eventually tip into a real B7 case. Noting it now rather than
waiting for it to become one.

## Objects proposed, not decided

Every placement above is a proposal for whoever reviews
`_taxonomy_findings.md` (Phase C's output, not yet written) — this file
doesn't touch `taxonomy_mapping.md` or any `scope.md`, per §8 B7's own
scope boundary.

## Next

B8 — group the *matched* records (426 of them, from B2–B6) by spec object
and sub-category, mirroring `taxonomy_mapping.md`'s existing
Alias/Grouped-leaf ordering. This is the last step before Phase C can
render the `*.survey.md` tables.
