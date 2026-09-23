# Phase A progress log

Tracks `PLAN.md` §7 (A1–A16) as libraries are worked through. Raw per-library
extraction output lives in `_raw/<library>.json` — one record per candidate
file, not yet mapped to spec objects (that's Phase B, §8). Snapshot commit:
`5165c20cff6de9d79604008a76c56322aa721bf5` (2026-09-21).

## A1 — snapshot

Reused the shallow clone from the Phase 0 pilot; same commit as above, so
every link across this survey stays consistent.

## A2 — exclusion filter

Reused unchanged from Phase 0 / §3 (`qunit`/`test`, `themes`, `designtime`,
`changeHandler`, `flexibility`, `rules`, `*.qunit.js`, `*.designtime.js`,
`*.support.js`, `library.js`, `*.fragment.js`, `-dbg.js`, `thirdparty/`).
One gap found and handled: `sap.ui.core/ui5lint.config.js` sits at the
library root outside the `src/sap/...` module tree — not a class file, not
excluded by the filter either. Treated as `other` rather than adding a new
filter rule for one file; watch for more of these (build/lint config files
at a library root) in the remaining libraries.

## A3 — `sap.ui.core` — done

| total | primary | renderer | enum | other | likely base (of primary) | class-level deprecated | experimental |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 658 | 236 | 17 | 46 | 359 | 4 | 30 | 0 |

Orientation check (its own `.library` description, since Google's AI
Overview isn't reachable through this session's search tool — see note
below): *"The SAPUI5 Core Runtime. Contains the UI5 jQuery plugins, the
Core and all its components, base classes for Controls, Components and the
Model View Controller classes."* That matches the count: only 36% of
candidates are primary classes, the rest (`other`, 55%) is infrastructure —
mixins, interfaces, exception types, internal utility modules (spot-checked
`_MetadataConverter.js`, `uniqueSort.js`, `mixedFetch.js`,
`ComponentSupport.js`, `Exception.js` — all correctly not classes with a
named `.extend()` call). Expect this library's B4 manual-review queue to be
proportionally larger than the others.

Spot-checked deprecated flags:
`sap.ui.core.Configuration`, `LocalBusyIndicator`, `Message`, `ScrollBar`,
`delegate.ScrollEnablement`, `message.MessageManager` — all genuinely
class-level `@deprecated` in their own doc block (not member-level noise).

## A4 — `sap.m` — done

| total | primary | renderer | enum | other | likely base (of primary) | class-level deprecated | experimental |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 613 | 373 | 177 | 13 | 50 | 13 | 41 | 1 |

Orientation check (`.library`): *"The main UI5 control library, with
responsive controls that can be used in touch devices as well as desktop
browsers."* Matches: 61% of candidates are primary classes, the highest
ratio expected across the in-scope libraries (§3) — this is the library
the Controls/Widgets/Containers category files will draw from most.
Renderer share (177/613 = 28.9%) matches the Phase 0 pilot's estimate
(≈28%) almost exactly.

Spot-checked deprecated flags — confirmed genuine, including one notable
find: `sap.m.ActionSheet` is deprecated as of version 1.149 ("Use
sap.m.Menu / sap.m.MenuItem instead") — a real, current fact worth carrying
into `Controls.survey.md`'s or `Widgets.survey.md`'s Description cell in
Phase C, not a false positive.

`likely_base_class` heuristic hits (13): `ComboBoxBase`, `InputBase`,
`ListBase`, `ListItemActionBase`, `ListItemBase`, `QuickViewBase`,
`SelectDialogBase`, `SliderTooltipBase`, `TreeItemBase`, `plugins.PluginBase`,
`table.columnmenu.ItemBase`, `table.columnmenu.MenuBase`,
`table.columnmenu.QuickActionBase` — all read as genuine non-instantiable
bases on inspection; still go through B4 confirmation per the plan rather
than being auto-excluded.

## Note on the AI Overview sub-step (§7 A3 template)

This session's search tool returns a list of result links, not a
synthesized "AI Overview" paragraph — so for A3/A4 the orientation check
used each library's own `.library` description file (in the source tree
already) instead, which is arguably a better source anyway: it's the
project's own primary-source summary, not a third-party AI paraphrase.
Recommend treating "check the library's `.library` description" as the
default for the remaining libraries, with a web search only as a fallback
when a library has no useful `.library` text.

## A5 — `sap.ui.codeeditor` — done, with a correction to §3's scale estimate

First pass on the 475 candidate files found only **1** primary class. Cause:
`sap.ui.codeeditor` is a thin OpenUI5 wrapper (`CodeEditor.js`) around the
vendored **Ace** code-editor library (ace.c9.io), whose ~646 bundled
mode/snippet/theme files live under
`src/sap/ui/codeeditor/js/ace/` — not inside a folder literally named
`thirdparty/`, so the A2 filter's `thirdparty/` rule didn't catch them.

**Fix applied:** added `/js/ace/` to the A2 exclusion filter and re-ran.
Corrected result:

| total | primary | renderer | enum | other |
| ---: | ---: | ---: | ---: | ---: |
| 2 | 1 | 0 | 0 | 1 |

The single primary class is `sap.ui.codeeditor.CodeEditor`
(`extends Control`); the one `other` is `aceWorkerProxy.js`, a real
UI5-authored helper module, not a class.

**This corrects §3's scale table**, which listed 475 candidate files for
`sap.ui.codeeditor` and rolled that into a ~2,709-file, ~800–1,200-object
estimate. The true contribution is 2 files / 1 object. `PLAN.md` §3 has
been updated with the corrected numbers.

## A6–A14 — remaining libraries — done

Checked each library's `other` bucket and top-level subfolder names for a
second vendored-library case like A5's — none found; every other library's
`other` bucket is legitimate OpenUI5-authored helper/utility code (spot-
checked `sap.ui.integration`'s 48 `other` files: formatters, card/adaptive-
card helpers, custom-element wrappers — not bulk vendored code). `sap.html`
came back 100% primary (93/93) — verified this is real, not a filter bug:
it's a library of one thin control per native HTML element (`A`, `Abbr`,
`Address`, …), all extending a shared `HTMLElementBase`, with no per-class
renderer or enum files.

| Library | total | primary | renderer | enum | other | likely base | class-level deprecated | experimental |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| A6 `sap.ui.mdc` | 279 | 138 | 15 | 53 | 73 | 6 | 8 | 0 |
| A7 `sap.ui.integration` | 165 | 96 | 20 | 1 | 48 | 1 | 0 | 0 |
| A8 `sap.f` | 161 | 114 | 33 | 4 | 10 | 4 | 3 | 0 |
| A9 `sap.ui.layout` | 68 | 44 | 20 | 1 | 3 | 1 | 4 | 0 |
| A10 `sap.ui.table` | 55 | 45 | 4 | 2 | 4 | 2 | 4 | 1 |
| A11 `sap.uxap` | 37 | 23 | 12 | 0 | 2 | 2 | 0 | 0 |
| A12 `sap.tnt` | 19 | 11 | 7 | 1 | 0 | 1 | 0 | 0 |
| A13 `sap.html` | 93 | 93 | 0 | 0 | 0 | 1 | 0 | 0 |
| A14 `sap.ui.unified` | 86 | 53 | 27 | 2 | 4 | 1 | 8 | 2 |

`sap.tnt` (A12) was re-run through the final pipeline (this time with the
`likely_base_class` flag and the class-scoped deprecated check) for
consistency with the rest of `_raw/` — its Phase 0 pilot survey tables
(`Controls.survey.md` etc.) are unaffected; only `_raw/sap.tnt.json` was
regenerated.

Spot-checked class-level `deprecated` flags across all nine — all read as
genuine (e.g. `sap.f.Avatar`, `sap.ui.unified.Shell`/`ShellHeadItem`,
`sap.ui.layout.form.GridLayout`/`ResponsiveLayout`, `sap.ui.table.ColumnMenu`
— each plausibly superseded by a newer control, consistent with real UI5
version history), not repeats of the earlier whole-file false-positive bug.

## Consolidated totals — A1–A14 complete (all twelve in-scope libraries)

| Library | total | primary | renderer | enum | other | likely base | deprecated | experimental |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| sap.ui.core | 658 | 236 | 17 | 46 | 359 | 4 | 30 | 0 |
| sap.m | 613 | 373 | 177 | 13 | 50 | 13 | 41 | 1 |
| sap.ui.codeeditor | 2 | 1 | 0 | 0 | 1 | 0 | 0 | 0 |
| sap.ui.mdc | 279 | 138 | 15 | 53 | 73 | 6 | 8 | 0 |
| sap.ui.integration | 165 | 96 | 20 | 1 | 48 | 1 | 0 | 0 |
| sap.f | 161 | 114 | 33 | 4 | 10 | 4 | 3 | 0 |
| sap.ui.layout | 68 | 44 | 20 | 1 | 3 | 1 | 4 | 0 |
| sap.ui.table | 55 | 45 | 4 | 2 | 4 | 2 | 4 | 1 |
| sap.uxap | 37 | 23 | 12 | 0 | 2 | 2 | 0 | 0 |
| sap.tnt | 19 | 11 | 7 | 1 | 0 | 1 | 0 | 0 |
| sap.html | 93 | 93 | 0 | 0 | 0 | 1 | 0 | 0 |
| sap.ui.unified | 86 | 53 | 27 | 2 | 4 | 1 | 8 | 2 |
| **Total** | **2,236** | **1,227** | **332** | **123** | **554** | **36** | **98** | **4** |

1,227 primary classes is the real, corrected scale of Phase B's
classification workload — down from the plan's original ~2,709-candidate /
~800–1,200-object estimate, mainly because of the A5 vendored-code
correction. The 36 `likely_base_class` hits still need individual B4
confirmation before being excluded from the survey tables (per §7/§8 — the
heuristic flags candidates, it doesn't decide on its own). The 98
class-level-deprecated classes should carry a "deprecated as of vX" note in
their Phase C Description cell rather than being dropped, per §11's open
items.

## A15 — consolidate — done

Merged all twelve `_raw/<library>.json` files into one dataset:

- [`_raw/consolidated_all.json`](_raw/consolidated_all.json) — every
  candidate record across all twelve libraries (2,236), tagged by library,
  plus the per-library summary counts and this pass's commit SHA as
  metadata. The full archive, including renderers/enums/other.
- [`_raw/consolidated_primary.json`](_raw/consolidated_primary.json) — just
  the 1,227 primary-class records (`is_primary: true`), the actual Phase B
  (§8) working input, so Phase B doesn't need to re-filter across twelve
  separate files.

Record counts verified to match `PHASE_A_PROGRESS.md`'s consolidated table
above exactly (2,236 total / 1,227 primary) before committing.

## A16 — formal spot-check — done

Ran a full-population check (not just ad hoc sampling) over all 1,227
primary records in `consolidated_primary.json`: 173 had a missing `desc`,
0 had a missing `extends`, and 1 (`sap.ui.model.odata.ODataAnnotations`)
had a garbage short `desc` (`'${version}'`). Manual source verification for
the anomalies found two real bugs in the A3–A15 extraction:

- **Bug A (serious):** the `.extend(` search matched the *first* occurrence
  anywhere in the file, including sample code inside JSDoc `@example`
  blocks. `sap/ui/base/Interface.js` and `sap/ui/core/EnabledPropagator.js`
  each had a fabricated record (`MyModule extends BaseObject`,
  `my.MyControl extends Control`) pulled from tutorial example code, not
  from a real class defined in that file.
- **Bug B:** the description builder discarded every JSDoc line starting
  with `@` as a pure tag, so files that put the description inline on the
  `@class <description>` line itself (e.g. `ODataAnnotations.js`) lost
  their description entirely.

Fix: filter `.extend(` matches that fall inside `/* ... */` comment spans,
and special-case `@class` lines to keep their trailing description text.
Re-ran extraction for all twelve libraries with the fix and regenerated
`_raw/<library>.json` and the two consolidated files (now delivered,
replacing the earlier versions):

| Library | total | primary | renderer | enum | other | no-desc |
|---|---|---|---|---|---|---|
| sap.ui.core | 658 | 231 | 17 | 47 | 363 | 11 |
| sap.m | 613 | 372 | 177 | 13 | 51 | 5 |
| sap.ui.codeeditor | 2 | 1 | 0 | 0 | 1 | 0 |
| sap.ui.mdc | 279 | 138 | 15 | 53 | 73 | 14 |
| sap.ui.integration | 165 | 96 | 20 | 1 | 48 | 23 |
| sap.f | 161 | 114 | 33 | 4 | 10 | 0 |
| sap.ui.layout | 68 | 44 | 20 | 1 | 3 | 0 |
| sap.ui.table | 55 | 45 | 4 | 2 | 4 | 1 |
| sap.uxap | 37 | 23 | 12 | 0 | 2 | 5 |
| sap.tnt | 19 | 11 | 7 | 1 | 0 | 0 |
| sap.html | 93 | 93 | 0 | 0 | 0 | 93 |
| sap.ui.unified | 86 | 53 | 27 | 2 | 4 | 2 |
| **Total** | **2,236** | **1,221** | **332** | **124** | **559** | **154** |

Primary count drops 1,227 → 1,221 (the 6 fabricated example-code records
are gone; `Interface.js`/`EnabledPropagator.js` correctly moved to
`is_other`). Remaining `is_primary` total rose slightly (554 → 559
`other`, offset elsewhere) because a few files whose only `.extend(` match
had been inside a comment now correctly show no class at all rather than
a fabricated one.

`sap.html`'s `no-desc: 93` (100% of its primary classes) was investigated
directly against source and is a genuine finding, not a bug: every
`sap.html.*` per-HTML-element wrapper class (`A.js`, `Tbody.js`,
`Caption.js`, `Kbd.js`, `Q.js`, etc.) defines its class via `.extend(...)`
with **no preceding JSDoc block at all** — there is no description to
extract. This is a real gap in the source, worth noting in that library's
Phase C write-up (each class only has its `metadata` — tag name, mapped
HTML properties — to describe it from).

The other libraries' residual no-desc counts (11–23 each) are the same
genuine pattern on a smaller scale: individual classes with no class-level
JSDoc description. These will need a source-derived one-line description
written by hand in Phase C rather than extracted mechanically.

Also verified: `ODataAnnotations.js` now correctly shows
`desc: "Implementation to access OData Annotations ${version}"` instead of
the fabricated fragment.

## Remaining

This closes A1–A16. All of Phase A is done. Phase B (§8) can start against
the corrected `_raw/consolidated_primary.json` (1,221 primary records).
