# OpenUI5 survey — Stage 1 plan

**Stage:** 1 of the "Complete OpenUI spec documentation" effort — **Survey**.
**Status:** plan only. No files under `scopes/` are touched by this stage.

## 1. Objective

Build a structured inventory of OpenUI5's UI vocabulary, organized under the
existing OpenUI spec categories (`scopes/`) where they genuinely fit, so a
later stage can extend [`scopes/evidence.md`](../../scopes/evidence.md) with
OpenUI5 as a second real-world framework example — alongside the current
Angular Material, HTML, WAI-ARIA APG, and MDN evidence base — and enrich the
affected `*.scope.md` files accordingly.

Mapping to the *existing* taxonomy is attempted, not assumed or forced.
OpenUI5 is a large, mature control library, and the current taxonomy is
comparatively young — it's expected, not a failure mode, that some OpenUI5
objects need new sub-categories, some need new top-level categories the
taxonomy doesn't have yet, and it's possible the survey turns up evidence
that the taxonomy's current top-level hierarchy itself should be
restructured. Finding and proposing those is as much a goal of this stage
as filing objects into categories that already exist — see §8 (Phase B) and
`_taxonomy_findings.md` in §4.

This stage only produces research files under `survey/openui5/`. It does not
edit `scopes/evidence.md`, any `scopes/**/*.scope.md` file, or
`scopes/taxonomy_mapping.md` — including for the new-category and
restructuring proposals above, which are written up as recommendations for
a later stage to review and decide on, not applied here.

## 2. Source snapshot

- Source: <https://github.com/UI5/openui5>, `src/` tree.
- Snapshot used for this plan's reconnaissance: commit
  `5165c20cff6de9d79604008a76c56322aa721bf5` (`master`, 2026-09-21).
- Reconnaissance method: `git clone --depth 1 --filter=blob:none --sparse`,
  `git sparse-checkout set src`, `git ls-tree -r --name-only HEAD -- src`.
  This lists every path in the tree (42,368 files under `src/`) without
  downloading file contents, so it is fast and repeatable — the same method
  the execution phase should use to build the working file list, re-run
  against whatever commit is current when execution starts.
- **Every survey table cites GitHub links pinned to the commit SHA used for
  that pass** (`.../blob/<sha>/src/...`), not `master`, so links stay valid
  even as the upstream repo moves.

## 3. Libraries in scope

Per your choice, this stage covers the actively maintained **core UI
libraries** only:

`sap.m`, `sap.f`, `sap.ui.core`, `sap.ui.layout`, `sap.ui.table`,
`sap.ui.unified`, `sap.tnt`, `sap.uxap`, `sap.ui.mdc`, `sap.html`,
`sap.ui.integration`, `sap.ui.codeeditor`.

Explicitly **out of scope** for this stage (candidates for a later, separate
pass if ever needed):

- Theme libraries (`themelib_*`) — CSS only, no UI objects.
- Tooling/test libraries — `sap.ui.dt`, `sap.ui.rta`, `sap.ui.testrecorder`,
  `sap.ui.support`, `sap.ui.documentation`, `sap.ui.fl`, `testsuite`.
- Deprecated legacy control sets — `sap.ui.commons`, `sap.ui.ux3`.
- Web Component wrappers — `sap.ui.webc.main`, `sap.ui.webc.fiori`.

Candidate source-file counts per in-scope library, after excluding
`qunit`/`test`, `themes`, `designtime`, `changeHandler`, `flexibility`,
`rules`, `*.qunit.js`, `*.designtime.js`, `*.support.js`, `library.js`,
`*.fragment.js`, `-dbg.js`, `thirdparty/`, and **`/js/ace/`** paths (these
are noise for a UI-vocabulary survey, not real object definitions —
`/js/ace/` was added after A5 found `sap.ui.codeeditor` vendors the Ace
code-editor library under that path, outside any folder literally named
`thirdparty/`; see `PHASE_A_PROGRESS.md`):

| Library | Candidate files |
| --- | ---: |
| sap.ui.core | 658 |
| sap.m | 613 |
| sap.ui.mdc | 279 |
| sap.ui.integration | 165 |
| sap.f | 161 |
| sap.ui.layout | 68 |
| sap.ui.table | 55 |
| sap.uxap | 37 |
| sap.tnt | 19 |
| sap.html | 93 |
| sap.ui.unified | 86 |
| sap.ui.codeeditor | 2 |
| **Total** | **2,236** |

(`sap.ui.codeeditor` originally showed 475 candidate files; 473 were the
vendored Ace editor, corrected after A5 — see `PHASE_A_PROGRESS.md`.) That
count still mixes real classes with `*Renderer.js` companion files and
enum/type modules. **Phase A (§7) is now complete for all twelve
libraries**: the true count of distinct primary classes is **1,227** (down
from this plan's original ~800–1,200 estimate range only because that
estimate still included the uncorrected `sap.ui.codeeditor` number) — see
the consolidated table in `PHASE_A_PROGRESS.md` for the per-library
breakdown, including renderer/enum/other splits and class-level-deprecated
counts.

## 4. Output location and file structure

Per your choice, survey output lives under `survey/openui5/`, mirroring the
top-level `scopes/` category folders:

```
spec/survey/openui5/
  PLAN.md                    (this file)
  Application.survey.md
  Controls.survey.md
  Behaviors.survey.md
  Pages.survey.md
  Views.survey.md
  Containers.survey.md
  Widgets.survey.md
  _taxonomy_findings.md      (proposed new sub-categories, proposed new
                               top-level categories, and — if the evidence
                               supports it — a proposed restructuring of the
                               top-level hierarchy; each proposal backed by
                               the OpenUI5 objects that motivate it. A
                               first-class output of this stage, not a
                               leftover/unmapped list.)
```

`Layout.survey.md`, `Presentation.survey.md`, `Internationalization.survey.md`,
and `Interaction.survey.md` are omitted by default — see §10.

## 5. Table schema

Every table in every `*.survey.md` file uses exactly the four columns you
specified:

| UI5 object | Abstract object | Description | Sources |
| --- | --- | --- | --- |
| `sap.m.Button` | [Action controls](../../scopes/Controls/action_controls.scope.md) | One-line, paraphrased purpose (not copied verbatim from the UI5 JSDoc). | [GitHub](https://github.com/UI5/openui5/blob/5165c20c.../src/sap.m/src/sap/m/Button.js) · [API ref](https://ui5.sap.com/#/api/sap.m.Button) |

- **UI5 object** — fully qualified class name (e.g. `sap.m.Button`).
- **Abstract object** — link to the mapped spec leaf under `scopes/`, using
  the same label `taxonomy_mapping.md` uses for it (e.g. "Action controls").
  Renderer files are not separate rows; note the renderer relationship in
  the Description instead if worth keeping.
- **Description** — paraphrased, not pasted, to avoid verbatim reuse of
  upstream doc comments.
- **Sources** — GitHub permalink pinned to the snapshot commit, plus the
  official UI5 API reference page.

Each category file has a "Direct objects" table for spec objects with no
further grouping, then one `##` subsection + table per sub-category —
mirroring the "Grouped leaf" / "Alias" rows already in
[`taxonomy_mapping.md`](../../scopes/taxonomy_mapping.md) (e.g. a "Choice
controls" subsection under `Controls.survey.md` collecting
`sap.m.CheckBox`, `sap.m.RadioButton`, `sap.m.Switch`, `sap.m.Select`,
`sap.m.ComboBox`, …). This is where OpenUI5 sub-categories that don't
already exist in the taxonomy will surface — flagged in §8, not invented on
the spot.

## 6. Phase 0 — proof-of-concept pilot (run this before the full sweep)

Phases A and B below rest on assumptions that haven't been tested yet: that
the exclusion filter (§3) actually isolates real classes cleanly, that
`.extend(` detection reliably finds primary class files, that a JSDoc-header
one-liner is actually usable as a Description, and that the
`taxonomy_mapping.md` lookup in Phase B can classify real OpenUI5 classes
without most of them falling into manual review. Validate all of that on a
small, cheap slice before committing to the full twelve-library, ~2,700-file
sweep — a bad assumption caught here costs minutes; caught after the full
run, it costs redoing most of the work.

1. **P1. Pick the pilot scope.** Two small slices, chosen to be cheap but not
   trivial:
   - The full **`sap.tnt`** library (19 candidate files, the smallest
     in-scope library) — small enough to run end to end at near-zero cost,
     and real production code, not a toy example.
   - A hand-picked **~10-class sample from `sap.m`**, one or two classes
     each from a few different target categories (e.g. `Button` → Action
     controls, `CheckBox` → Choice controls, `Input` → Text inputs,
     `Dialog` → Widgets/dialog, `List` → Widgets/list, `IconTabBar` →
     candidate unmapped) — `sap.tnt` alone only exercises
     navigation-flavored classes, so this second slice is what actually
     stress-tests classification *breadth* across categories.
2. **P2. Run Phase A on the pilot scope only.** Apply the full A3
   procedure (§7 — including its quick Google AI Overview orientation
   check) to just the ~29 pilot files from `sap.tnt` and `sap.m`, then
   extract class name, module path, `extends` target, JSDoc one-liner, and
   deprecation tags for each.
3. **P3. Run Phase B on the pilot extraction.** Work the pilot records
   through the full B1–B10 sequence (§8) — lookup key, `extends`-based
   match, description-based match, manual review for anything left,
   clustering leftovers, checking the hierarchy, grouping — and render the
   result as a real (small) slice of the affected `*.survey.md` files,
   using the exact table schema in §5. (The pilot predates B6/B7 —
   clustering and the hierarchy check — and its 20-class sample happened
   to map entirely onto existing objects, so it only exercised the "fits"
   path; see §8.)
4. **P4. Review checkpoint.** Before touching any of the other eleven
   libraries, check by hand: (a) did the filter correctly separate real
   classes from renderers/enums for every pilot file — spot-check the
   files, don't just trust the regex; (b) did most pilot classes resolve
   via `extends`-chain matching (B2), or did most fall through to manual
   review (B4) — a high fall-through rate means the B1 lookup key needs
   more work before it's worth scaling; (c) do the paraphrased Description
   cells read acceptably and avoid verbatim JSDoc copying; (d) do the
   GitHub and API-reference links actually resolve; (e) does the resulting
   `_unmapped.survey.md` slice look right, or is it catching things that
   should have matched an existing category.
5. **P5. Go / no-go.** If the pilot output holds up, proceed to the
   remaining eleven libraries using the same procedure unchanged (§7 A4–A14,
   then §8 for those records). If something's off, fix the filter, the
   extraction, or the B1 lookup key, and re-run just the pilot — iterating
   on ~29 files is cheap; iterating on 2,700 after the fact isn't.

**Result: done, GO.** The pilot ran on 2026-09-21 against
`sap.tnt` (full) + a 10-class `sap.m` sample. Full findings, the two process
fixes it produced (already folded into A3/B5 below), and the go/no-go
rationale are in [`PHASE0_PILOT_REPORT.md`](PHASE0_PILOT_REPORT.md). Its
output is the real (small) slices already in `Controls.survey.md`,
`Widgets.survey.md`, `Containers.survey.md`, and `Application.survey.md` —
those four files currently hold pilot data only, not a full survey.

## 7. Phase A — scripted inventory extraction (mechanical, no judgment calls)

Cheap, deterministic, and reusable across libraries — run this for the
**remaining eleven** in-scope libraries once the Phase 0 pilot (§6) passes
its review checkpoint. Steps A1–A2 already ran once during the pilot and
don't need repeating; A3–A14 repeat the same mechanical procedure once per
library (independently checkable, in any order); A15–A16 close the phase.
(`sap.tnt`, A12 below, was already done as part of the pilot — re-run it only
if the pilot changed the filter or extraction procedure.)

**Progress: A1–A14 done — all twelve libraries extracted, 2026-09-21/22.**
1,227 primary classes total (see the corrected count in §3 and the full
per-library table in `PHASE_A_PROGRESS.md`). Raw per-file records are in
`_raw/<library>.json` for all twelve libraries — not yet mapped to spec
objects; that happens in Phase B (§8). Two things worth knowing before
starting Phase B:

- A5 (`sap.ui.codeeditor`) found the library is 99% vendored Ace-editor
  code, not OpenUI5 objects — the A2 filter gained a `/js/ace/` rule as a
  result, and §3's scale table is corrected accordingly.
- A15 (consolidate) is done: `_raw/consolidated_all.json` and
  `_raw/consolidated_primary.json` now exist.
- A16 (formal spot-check) is done. A full-population check over all 1,227
  primary records found two extraction bugs: (a) the `.extend(` search
  matched sample code inside JSDoc `@example` blocks instead of the real
  class definition (fabricated 2 records, e.g. `Interface.js`), and (b) a
  description on the `@class <description>` line itself was discarded as a
  bare tag (lost ~20 real descriptions). Both fixed; all twelve `_raw/*.json`
  files and the two consolidated files were regenerated and redelivered.
  Corrected total: 1,221 primary records (was 1,227). 154 primary records
  still have no description — genuinely absent in source, not an extraction
  bug (confirmed directly: `sap.html`'s 93 per-element wrapper classes have
  no class-level JSDoc at all; the rest are scattered individual cases).
  See `PHASE_A_PROGRESS.md`'s A16 section for the full before/after table.
  Phase A (A1–A16) is complete.

**Update to the A3 template's orientation sub-step:** this session's search
tool returns result links, not a synthesized "AI Overview" paragraph, so
A3/A4 used each library's own `.library` description file in the source
tree instead — a better source in any case (primary, not third-party). Use
that first for the remaining libraries; fall back to a web search only if a
library's `.library` file has no useful description text.

1. **A1. Snapshot the source tree.** Shallow-clone `UI5/openui5`
   (`--depth 1 --filter=blob:none --sparse`, `sparse-checkout set src`),
   record the commit SHA (§2), and run `git ls-tree -r --name-only HEAD --
   src` to get the full file list without downloading blob contents.
2. **A2. Build the exclusion filter once.** A single regex covering
   `qunit`/`test`, `themes`, `designtime`, `changeHandler`, `flexibility`,
   `rules`, `*.qunit.js`, `*.designtime.js`, `*.support.js`, `library.js`,
   `*.fragment.js`, `-dbg.js`, `thirdparty/` — reused unchanged for every
   library below (carried over from the pilot; adjust here first if P4
   found gaps in it).
3. **A3. `sap.ui.core`** (658 candidate files) — first, search
   "<namespace> OpenUI5" (e.g. "sap.ui.core OpenUI5") and skim Google's AI
   Overview for a quick plain-language orientation on what the library
   covers. Background only — never cited as a table source; §5's Sources
   column stays GitHub + the UI5 API reference. Repeat this quick check for
   any internal sub-namespace grouping surfaced during extraction (e.g.
   `sap.ui.core.date`, `sap.ui.layout.form`, `sap.ui.mdc.field`) — it helps
   orient the filter split and the Phase B category call, nothing more.
   Then apply the filter, split into primary class files / `*Renderer.js`
   companions / enum-type modules / other (mixins, interfaces, delegates) —
   flag files whose class name ends in `Base` as likely non-instantiable
   base classes for a B4 manual confirm, per the Phase 0 finding (no
   reliable `abstract: true` metadata to catch these mechanically). Then
   for each primary class file extract: class name, module path, `extends`
   target, leading JSDoc line, and `@deprecated`/`@experimental` tags —
   scoped to the class-level JSDoc block immediately before the `.extend(`
   call, not the whole file (checking the whole file produced false
   positives on `Button`, `Dialog`, `IconTabBar`, `Input`, and
   `SideNavigation` during the Phase 0 pilot — see
   `PHASE0_PILOT_REPORT.md`).
4. **A4. `sap.m`** (613 candidate files) — same extraction procedure as A3
   (the ~10-class pilot sample from P1 is a subset of this; no need to
   redo those, just the rest of the library).
5. **A5. `sap.ui.codeeditor`** (475 candidate files) — same procedure.
6. **A6. `sap.ui.mdc`** (279 candidate files) — same procedure.
7. **A7. `sap.ui.integration`** (165 candidate files) — same procedure.
8. **A8. `sap.f`** (161 candidate files) — same procedure.
9. **A9. `sap.ui.layout`** (68 candidate files) — same procedure.
10. **A10. `sap.ui.table`** (55 candidate files) — same procedure.
11. **A11. `sap.uxap`** (37 candidate files) — same procedure.
12. **A12. `sap.tnt`** (19 candidate files) — already covered by the Phase 0
    pilot (§6 P2); re-run only if the pilot's review changed the filter or
    extraction procedure.
13. **A13. `sap.html`** (93 candidate files) — same procedure as A3.
14. **A14. `sap.ui.unified`** (86 candidate files) — same procedure.
15. **A15. Consolidate.** Merge the eleven remaining per-library raw
    inventories with the pilot's `sap.tnt` + `sap.m` sample output into one
    working dataset (CSV/JSON), plus a summary table per library: real
    classes vs. renderers vs. enum/type modules vs. "other".
16. **A16. Spot-check.** Sample a handful of extracted records per library
    against their actual source file to confirm the extraction (class name,
    `extends`, description) is accurate before Phase B builds on it.

Output of Phase A: the consolidated raw inventory plus per-library counts —
this is the artifact to review before scaling Phase B to the full set.

## 8. Phase B — category mapping (deferred decision point)

You noted that the direction here is easier to decide once the
categories/sub-categories from Phase A are visible — so Phase B is
deliberately **not** locked into an execution method by this plan (library-
by-library by hand, batched subagents, or a spot-check pilot are all still
open once §7 finishes; the Phase 0 pilot in §6 already exercises this
sequence once at small scale). What follows is the sequence of judgment
steps Phase B works through regardless of which execution method is chosen.

1. **B1. Build the classification key.** For each top-level category
   (Application, Controls, Behaviors, Pages, Views, Containers, Widgets),
   pull the full list of existing spec objects and their sub-category
   aliases from `taxonomy_mapping.md` and each `scopes/<Category>/scope.md`
   into one lookup table (spec object → description/keywords/aliases).
   Done once, reused for every record (built once during the Phase 0 pilot;
   revise it here only if P4 found it needs broadening).
2. **B2. First-pass match on base class.** For each Phase A primary-class
   record, try to match it via its `extends` chain first (e.g. a class
   extending `sap.m.ListItemBase` slots under the List family) — the
   strongest, cheapest signal, since related OpenUI5 classes usually share
   a base class.
3. **B3. Second-pass match on description.** For records `extends` alone
   didn't resolve, match the extracted JSDoc one-liner against the lookup
   table's descriptions and `taxonomy_mapping.md` Notes column.
4. **B4. Manual review queue.** Records still unmatched after B2/B3 go into
   a review queue; for each, read the class file's fuller JSDoc (not just
   the header line extracted in Phase A) to decide.
5. **B5. Resolve the review queue.** For each manually-reviewed class,
   judge the fit honestly against the spec object's actual Purpose text — a
   name or keyword match alone isn't enough. If it genuinely fits, file it
   there. If it doesn't, don't force it or invent an isolated one-off
   category name for just that one class — set it aside for the clustering
   pass in B6, where it can be grouped with functionally similar leftovers
   into a coherent proposal instead of a scattered list. Still-untested
   candidates from the class list already seen: `sap.m.Wizard`,
   `sap.m.FlexBox`, `sap.m.UploadCollection`, `sap.ui.mdc.Chart`,
   `sap.m.QuickView`, `sap.m.GenericTile`. (`sap.m.IconTabBar` was on this
   list in an earlier draft; the Phase 0 pilot tested it directly and found
   it maps cleanly to the existing Tabs "Tab Bar" alias — see
   `Containers.survey.md` and `PHASE0_PILOT_REPORT.md`.)
6. **B6. Cluster the leftovers into candidate categories.** Across *all*
   twelve libraries' set-aside classes together — not library by library, a
   pattern may only be visible once objects from several libraries are
   seen side by side — group by genuine functional similarity. For each
   cluster that's coherent and evidenced by more than one or two objects,
   propose a category: a name, a one-line purpose written in the style of
   an existing `scopes/<Category>/scope.md`, and the full list of OpenUI5
   objects that motivate it. Decide per cluster whether it reads as a new
   *sub-category* under an existing top-level scope (the common case) or
   doesn't fit under any existing top-level scope at all (less common, but
   expected — see B7). New categories and sub-categories are a normal,
   expected outcome of surveying a framework this large against a taxonomy
   this young, not an edge case to minimize.
7. **B7. Check whether the top-level hierarchy itself holds up.** For any
   B6 cluster that doesn't fit under an existing top-level scope
   (Application, Controls, Behaviors, Pages, Views, Containers, Widgets),
   don't force it into the nearest existing one just to avoid adding a
   category. Write it up as a proposed new top-level category or, if the
   evidence points that way, a proposed restructuring of the existing split
   (a category that should merge, split, or be renamed) — with the objects
   that motivate it and the reasoning. This stage proposes; it doesn't
   decide or edit `taxonomy_mapping.md` (§1) — that's for whoever reviews
   `_taxonomy_findings.md` later.
8. **B8. Group and order.** Group the records that *did* match an existing
   object (from B5) by spec object, then by sub-category, mirroring the
   Alias/Grouped-leaf structure already in `taxonomy_mapping.md`, in the
   same order each category's `scope.md` lists its objects.
9. **B9. Cross-library de-duplication check.** Where more than one in-scope
   library defines a similarly-named or similarly-purposed class (e.g. a
   date picker appearing in more than one library), decide whether both
   rows stay or one is noted as superseding the other.
10. **B10. Hand off to Phase C.** The grouped, de-duplicated dataset from
    B8–B9 is what Phase C (§9) renders into the `*.survey.md` tables; the
    category and hierarchy proposals from B6–B7 are what Phase C renders
    into `_taxonomy_findings.md`. Phase B itself does not write those
    files.

## 9. Phase C — write-up

Two outputs, both from Phase B's results:

- Render the B8–B9 matched dataset into the `*.survey.md` files per §4,
  using the table schema in §5. Each file opens with a one-line pointer
  back to its `scopes/<Category>/scope.md`, then the "Direct objects"
  table, then one subsection per sub-category, then nothing else — no
  narrative prose beyond what the table needs, matching how `evidence.md`
  and the `scope.md` files themselves stay terse.
- Render the B6–B7 category/hierarchy proposals into `_taxonomy_findings.md`
  — one entry per proposed sub-category or top-level category (name,
  one-line purpose, motivating objects with sources) and, separately, any
  proposed restructuring of the existing top-level split, with its
  rationale. This file is allowed the narrative prose the survey tables
  deliberately avoid — a proposal needs its reasoning stated, not just a
  table row.

Unlike Phase B (§8), the plan above doesn't enumerate a step-by-step
sequence. This is the sequence Phase C actually works through:

1. **C0. Proof-of-concept: is the cached extract enough?** Before
   committing to a Description-writing method across all 422 matched
   rows, test the three candidate methods (§11) against each other on a
   small sample:
   - Pick **10 distinct classes at random** from the 422 matched records
     in `_raw/phaseB_grouped.json`.
   - For each of the 10, produce a Description **independently** by all
     three methods:
     - *Method 1 (full fetch):* fetch the class's actual source file
       (pinned commit, §2) and paraphrase from the complete JSDoc.
     - *Method 2 (cached extract):* paraphrase from Phase A's cached
       ~260-character extract only, nothing else.
     - *Method 3 (flagged-only):* apply the real decision rule from
       §11's third option — full fetch if the class is one of the
       B9-flagged/B4–B5-borderline rows, cached extract otherwise. (For
       most of the 10 this will just reproduce Method 1 or Method 2's
       output; record which, and why, for each class rather than
       skipping it.)
   - Compare the three outputs per class on four axes: **accuracy**
     (does it correctly represent what the class does, with nothing
     invented beyond the source), **completeness** (does it capture the
     class's key purpose, or does the cached extract cut off mid-thought
     on something material), **robustness** (does quality hold across
     different kinds of classes — a bare wrapper vs. a complex widget —
     or does one method degrade badly on a particular kind), and
     **cleanliness** (well-formed prose vs. a dangling sentence/JSDoc
     artifact from the 260-character cutoff).
   - Result is a go/no-go call that resolves §11's open Description-fetch
     decision for C2–C8: is Method 2 good enough for all 422 rows, or
     does quality demand Method 1 (or Method 3's hybrid) instead?

   **Result: done.** Ran on a 10-class random sample
   (`random.seed(20260922)`); full comparison in
   [`C0_POC.md`](C0_POC.md). Method 2 (cached-only) failed on two
   independent, dataset-wide failure modes — truncation past ~260
   characters silently drops material content (deprecation reasons,
   usage caveats), and a `@link`-tag-stripping extraction bug produces
   dangling, ungrammatical text independent of length (≥10.2% of the 422
   matched records, conservative lower bound). Method 3 (flagged-only)
   doesn't fix either, since its flag criterion (B9/B4–B5 classification
   confidence) is orthogonal to description-quality risk.
   **Decision: Method 1 (full source fetch) for all 422 rows in C2–C8.**
2. **C1. Reconcile the Phase 0 pilot data.** `Application.survey.md`,
   `Controls.survey.md`, `Containers.survey.md`, and `Widgets.survey.md`
   already hold real (small) slices from the §6 pilot. Before rendering
   the full B8–B9 dataset into these four files, check each pilot row
   against `_raw/phaseB_grouped.json` so the full render doesn't
   duplicate a row the pilot already placed.

   **Result: done.** Full write-up in
   [`C1_RECONCILIATION.md`](C1_RECONCILIATION.md). 17 of the 20 pilot
   rows matched the post-B9 dataset exactly. 3 disagreed:
   `sap.tnt.InfoLabel` and `sap.tnt.ToolHeaderUtilitySeparator` were
   genuine B2/B3 gaps the pilot had already caught by hand — folded in
   (matched: 422 → **424**). `sap.tnt.ToolPage` was a real disagreement:
   the pilot placed it in Containers/Structural containers before B6/B7
   existed; B6/B7's later, cross-library-evidenced Shell bar/App shell
   cluster (under Application) supersedes that placement. C2–C8 must
   drop `ToolPage`'s pilot row from `Containers.survey.md`; it belongs
   with the Shell bar/App shell cluster's motivating objects in C9's
   `_taxonomy_findings.md` instead, not in the 424-row matched dataset.
3. **C2–C8. Render the seven `*.survey.md` files**, one per top-level
   category (Application, Behaviors, Containers, Controls, Pages, Views,
   Widgets), from `_raw/phaseB_grouped.json` — the 424 matched records
   B8 grouped, B9 de-duplicated, and C1 corrected. Each row needs a
   paraphrased Description and a resolved Sources cell (§5). Per C0's
   finding above: fetch each matched class's actual source file (pinned
   commit, §2; `raw.githubusercontent.com`, no auth needed) and
   paraphrase from the complete JSDoc — one fetch per class, not
   batchable down. Do not use the cached ~260-character extract alone.

   **Result: done.** All 424 matched rows rendered — 19 already covered
   by the §6 pilot content (reconfirmed at Method-1 quality, not
   re-derived), 405 newly fetched and paraphrased from source at the
   pinned commit, zero fetch failures. Every object now has its own
   `##` heading + table (the pilot's shared "Direct objects" heading in
   `Widgets.survey.md` was split into separate `## Dialog`/`## List`
   headings for consistency); rows within each table are sorted by
   library then class name, matching `B8_GROUPING.md`'s order.
   `sap.tnt.ToolPage`'s stale pilot row was dropped from
   `Containers.survey.md` per C1's finding above. Row counts per file,
   verified against `_raw/phaseB_grouped.json`: Application 8, Behaviors
   7, Containers 41, Controls 221, Pages 0 (placeholder notes for all 3
   leaf objects), Views 5, Widgets 142 — **424 total**. `Behaviors.survey.md`,
   `Pages.survey.md`, and `Views.survey.md` are new files; the other four
   extend the existing pilot files.
4. **C9. Render `_taxonomy_findings.md`** from `B6_CLUSTERS.md`,
   `B7_HIERARCHY_CHECK.md`, and `B9_DEDUP.md`'s corrections — one entry
   per proposed sub-category, plus the B7 finding that no top-level
   restructuring is warranted.

   **Result: done.** [`_taxonomy_findings.md`](_taxonomy_findings.md)
   renders all 11 B6/B7 clusters (257 records, corrected membership per
   B9), each with its target top-level placement, one-line purpose, the
   B7 placement rationale tied to the target scope's own Purpose text,
   and a motivating-objects table (class + GitHub/API source links).
   Leads with the overall B7 finding (no top-level restructuring
   needed) and its "6 of 11 clusters land under Widgets" growth
   observation; closes each entry with the sub-category vs. alias-level
   distinction B7 drew (10 new sub-categories; Metadata-driven field
   filed as a Text-inputs alias note instead). `sap.tnt.ToolPage` is
   rendered here as a motivating object for Shell bar/App shell, per
   C1's finding that it doesn't belong in `Containers.survey.md`. The
   261 still-unclustered leftover records are named (by library) as
   out of scope for this document, not silently dropped.
5. **C10. Final check.** Row counts in the rendered `*.survey.md` files
   match the B8–B9–C1 dataset (424 matched rows, none dropped or
   duplicated); links resolve; `_taxonomy_findings.md`'s cluster
   membership matches `_raw/phaseB_leftover_pool.json`'s `b6_cluster`
   tags.

   **Result: done.** Full write-up in
   [`C10_FINAL_CHECK.md`](C10_FINAL_CHECK.md). All checks passed: the
   424 rendered classes exactly match `_raw/phaseB_grouped.json` at both
   the file and the individual sub-category-heading level (zero missing,
   zero extra, zero duplicates); every `GitHub`/`API ref` link is
   internally consistent with Phase A's recorded file path, and a
   15-link random sample plus 3 targeted edge cases (generated
   web-component wrappers, `sap.tnt.ToolPage`) all resolved live (200
   OK); `_taxonomy_findings.md`'s 11 cluster counts match
   `_raw/phaseB_leftover_pool.json`'s current `b6_cluster` tags exactly
   (257 total) — one small completeness gap found and fixed (the
   257-record total wasn't stated explicitly in the document's own
   intro, only derivable from the per-cluster counts). Whole-dataset
   arithmetic checks out: 424 matched + 257 clustered-leftover + 261
   unclustered-leftover + 279 out-of-scope = 1,221. **Phase C is
   complete.**

## 10. Categories with no concrete objects

`Layout`, `Presentation`, `Internationalization`, and `Interaction` are
"Folder abstraction" categories in `taxonomy_mapping.md` — mechanism-level
vocabulary (flow, alignment, color, motion, locale, focus state, gestures),
not a catalog of concrete controls. OpenUI5's equivalents here are modules
and mechanisms, not classes — e.g. `sap/ui/core/Configuration`,
`sap/base/i18n/Localization`, `sap/ui/core/theming`, `sap/ui/core/Popup`
positioning. These four are left out of the default file list in §4; if
useful, they'd need a different table shape (module/mechanism instead of
UI5 object), which is a call for Phase B once the rest of the survey shows
whether it's worth the extra shape.

## 11. Open items / assumptions baked into this plan

- Commit SHA is pinned per survey pass (§2); re-pin if a pass is re-run
  later against a newer `master`.
- `*Renderer.js` and enum/type files are excluded from the object tables
  (§7) rather than footnoted — flag if you'd rather keep a trace of them.
- `@deprecated` OpenUI5 classes are included by default (OpenUI5 still ships
  and documents them); mark them in the Description rather than excluding,
  unless you'd rather drop them.
- Legacy (`sap.ui.commons`, `sap.ui.ux3`) and Web Component wrapper
  (`sap.ui.webc.*`) libraries stay out of scope unless you ask for a
  follow-up pass.
- New categories, sub-categories, and hierarchy-restructuring proposals in
  `_taxonomy_findings.md` (§8 B6–B7) are this stage's recommendations, not
  decisions — `taxonomy_mapping.md` and the `scopes/` tree stay untouched
  here regardless of what the survey finds.
- **Resolved.** How exhaustively to fetch full source for the 422
  matched rows' Description cells (§9 C2–C8) was resolved by C0's
  proof-of-concept — see `C0_POC.md`. Cached-extract-only (Method 2) and
  flagged-only (Method 3) both fail on real, dataset-wide description
  quality problems (truncation past ~260 characters; a `@link`-stripping
  extraction bug independent of length). **Decision: full source fetch
  (Method 1) for all 422 rows in C2–C8.**

## 12. Next step

Phase A (A1–A16), Phase B (B1–B10), and Phase C (C0–C10) are all
complete. C0 decided full source fetch (Method 1) for all matched rows'
Description cells; C1 reconciled the §6 pilot data, fixing 2 more B2/B3
gaps and resolving one real pilot-vs-pipeline disagreement (`ToolPage`);
C2–C8 rendered all 424 matched records into the seven `*.survey.md`
files; C9 rendered all 11 B6/B7 clusters (257 records) into
`_taxonomy_findings.md`, including `sap.tnt.ToolPage` as a motivating
object for the Shell bar/App shell cluster; C10 verified the whole
output (row counts, links, cluster membership, whole-dataset arithmetic)
with no errors found, one small completeness gap fixed. The survey's
mechanical/consistency work is done — every one of the 1,221 primary
OpenUI5 classes at the pinned commit is accounted for: 424 matched and
described, 257 clustered into 11 proposed taxonomy additions, 261
unclustered leftovers named for future spot-review, 279 out of scope.

**What's left is not mechanical, it's judgment:** the 11 sub-category
proposals in `_taxonomy_findings.md` are recommendations awaiting your
review/decision, not applied changes — nothing here has touched
`taxonomy_mapping.md` or any `scope.md`. `TERMINOLOGY_PROPOSAL.md`
(Standalone/Host-bound vocabulary) also remains open, independent of
Phase C. Next step is yours: review the findings and decide which
proposals (if any) to fold into the taxonomy, or ask for a fresh pass
over the 261 unclustered leftovers.
