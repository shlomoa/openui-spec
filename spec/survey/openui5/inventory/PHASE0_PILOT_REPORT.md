# Phase 0 pilot — results (P1–P5)

Executed against `PLAN.md` §6. Snapshot commit
`5165c20cff6de9d79604008a76c56322aa721bf5` (2026-09-21).

## What ran

- **P1 scope:** full `sap.tnt` library (19 candidate files) + a 10-class
  hand-picked `sap.m` sample (`Button`, `CheckBox`, `RadioButton`, `Input`,
  `TextArea`, `Dialog`, `List`, `IconTabBar`, `Toolbar`, `Link`) — 29 files
  total, fetched directly from the shallow clone.
- **P2 (Phase A on the pilot):** exclusion filter + primary/renderer/enum
  split, then class name, module path, `extends` target, JSDoc-derived
  description, and deprecation flags extracted per file.
- **P3 (Phase B on the pilot):** each primary class matched against
  `taxonomy_mapping.md` via `extends`-chain first, then description: results
  rendered into real slices of `Controls.survey.md`, `Widgets.survey.md`,
  `Containers.survey.md`, and `Application.survey.md` (20 objects total).

## P2 extraction results

| | count |
| --- | ---: |
| Candidate files (pilot) | 29 |
| Primary classes | 21 |
| Renderer companions | 7 |
| Enum/type modules | 1 (`IllustratedMessageType`) |

The primary/renderer/enum split matched manual inspection exactly for all
29 files — the mechanical filter (A2/A3) works as designed.

**Finding — fixed during the pilot:** the first extraction pass flagged
`sap.m.Button`, `Dialog`, `IconTabBar`, `Input`, and `sap.tnt.SideNavigation`
as `@deprecated`, which is wrong — none of these classes are deprecated.
The bug was checking for `@deprecated` anywhere in the whole file, which
also matches deprecated *members* (a property, event, or aggregation) of an
otherwise-current class. Fixed by scoping the check to only the class-level
JSDoc block immediately preceding the `.extend(` call — re-run produced 0
false positives across all 21 primary classes. **This fix needs to land in
the real A3 procedure (§7) before the full run**, or the deprecation column
will be unreliable across all twelve libraries.

**Finding — needs a rule, not yet fixed:** `sap.tnt.NavigationListItemBase`
is a primary class by the `.extend(` test, but it's an abstract base class
never instantiated directly (only `NavigationListItem` and
`NavigationListGroup` extend it). OpenUI5 doesn't reliably mark this in
metadata — no `abstract: true` flag was present. It was excluded from the
survey tables by manual judgment (§8 B4/B5), not mechanically. **Recommend**
adding a `*Base`-suffix heuristic to flag likely candidates for the A3
primary/other split, still followed by a manual confirm in B4 — this won't
be airtight, so don't make it fully automatic.

## P3 mapping results

20 of 21 primary classes mapped to an existing spec object; the one
exclusion was the abstract base class above. **Zero classes needed
`_unmapped.survey.md`** — no unmapped-candidate file was created for this
pilot.

**Finding — corrects the plan's speculative list:** `PLAN.md` §8 (B5) listed
`sap.m.IconTabBar` as a likely unmapped candidate. Tested directly: it maps
cleanly to the existing **Tabs** scope's "Tab Bar" alias
(`taxonomy_mapping.md`'s Navigational elements table). That guess was wrong
— worth removing from the speculative list so it doesn't bias the B5 manual
review queue later. The rest of that list (`Wizard`, `FlexBox`,
`UploadCollection`, `mdc.Chart`, `QuickView`, `GenericTile`) is still
untested.

**Finding — `extends`-chain matching (B2) is family-dependent, not
uniformly strong:** it resolved `sap.tnt`'s Navigation* family cleanly
(`NavigationListGroup`/`NavigationListItem` both extend
`NavigationListItemBase`) and `sap.m`'s text-entry family
(`Input`/`TextArea` both extend `InputBase`), but was no help at all for
`sap.m`'s `Button`/`CheckBox`/`RadioButton`/`Link` — all four extend
`Control` directly with no shared, more specific base class. For those,
only B3 (description matching) resolved the category. **Recommend**
budgeting real time for B3 across most of the `Controls` category
specifically, rather than assuming B2 will do most of the work there.

**Finding — one genuinely ambiguous case:** `sap.tnt.NavigationListMenuItem`
plausibly fits both Navigation widgets (it's a list item) and Menu widgets
(it opens a menu). Filed under Navigation widgets with a note in
`Widgets.survey.md`, not a blocker for now.

**Finding — a taxonomy-scope question, not a Stage 1 problem:**
`sap.m.Toolbar` and `sap.tnt.ToolHeader` are both general-purpose reusable
controls (usable inside any Bar, Page footer, or Dialog — not exclusively
"application-level"), yet the taxonomy only offers `Application/tool_bars`
as a toolbar target. Filed there per current taxonomy, with a note in
`Application.survey.md`. Worth a look whenever the taxonomy itself gets
revisited — out of scope for this survey stage.

## P4 review checkpoint — summary

| Check | Result |
| --- | --- |
| (a) Filter cleanly separates classes/renderers/enums | Pass — matched manual inspection on all 29 files |
| (b) `extends`-chain resolves most classes, or most fall to manual review | Mixed by family — strong for composite/widget families, weak for flat `Control`-extending primitives (see finding above) |
| (c) Descriptions read acceptably, avoid verbatim JSDoc | Pass, after stripping HTML tags and `{@link}` refs from the extracted JSDoc; still hand-paraphrased for the final table cells, as §5 requires |
| (d) GitHub / API-ref links resolve | Not re-verified live in this pass — links are built from the pinned commit SHA and the standard `ui5.sap.com/#/api/<namespace>` pattern used elsewhere in the spec; spot-check a few before the full run |
| (e) Unmapped list is reasonable | N/A this pilot — nothing was unmapped; one speculative unmapped guess (`IconTabBar`) was disproven |

## P5 go / no-go

**Go**, with two process fixes to carry into the real Phase A/B run (§7–§8)
before scaling to the other eleven libraries:

1. Scope the `@deprecated`/`@experimental` check to the class-level JSDoc
   block only, not the whole file.
2. Add a `*Base`-suffix heuristic (still confirmed manually in B4) to catch
   likely non-instantiable base classes before they reach the survey
   tables.

No change to the library list, output structure, or table schema (§3–§5) —
those held up as planned.
