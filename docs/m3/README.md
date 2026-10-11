# Material 3 content for OpenUI

A scrape of the Material 3 (M3) web sources, mapped to the OpenUI vocabulary. It is research
material for the owner: nothing under `spec/` is changed, so no term is added and the spec
version is not bumped. The OpenUI side of every mapping is a candidate, and the owner decides
which become aliases or terms (repository rule: do not define new terms; ask the owner when
none fits).

| File                                   | What it holds                                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------------ |
| [m3-terminology.md](m3-terminology.md) | All 67 terms of the M3 glossary with a candidate OpenUI alias, description, sources, image |
| [m3-components.md](m3-components.md)   | All 20 Material Web component pages, 41 custom elements, mapped to the scope tree          |
| [SCRAP_INDEX.md](SCRAP_INDEX.md)       | A lookup of the scrape: snapshots, facts, glossary index, per-component API index          |
| [`data/`](data/)                       | The scraped data and the curated mappings, as JSON                                         |
| [`tools/`](tools/)                     | The scripts that produced the data and the reports                                         |

## What the scrape found

**Terminology.** Of the 67 glossary terms, 23 match an OpenUI term exactly, 5 are aliases,
1 is a narrower and 1 a broader case. OpenUI already uses most M3 component names (Snackbar,
Bottom Sheet, Side Sheet, Navigation Rail, Navigation Drawer, Divider): 21 of the 30 component
terms match exactly and 5 more are aliases (App bar, Toolbar, FAB, Extended FAB, Data table).
The rest:

- **12 related terms** overlap an OpenUI notion without a matching term: Adaptive design,
  Condition, Banner, Chip, Image list, Customization, Style, Material Theming and the
  scheme and token terms.
- **14 gaps**, in three groups: the color vocabulary (Baseline scheme, Dynamic color, Extended
  color, Key color, Source color, Tonal palette, Tone, User-generated schemes, HCT, Contrast),
  design tokens (Context, Types) and extended reality (Orbiter, Spatial; XR is out of scope).
  OpenUI names Color and Theme as folder abstractions under Presentation and goes no deeper.
- **4 homonyms**: Element, Role (two entries) and Mode mean something else in M3. The
  terminology document already asks the glossary to note such clashes (Appendix A), as it
  does for Page, Control, Element and Grid.
- **7 out of scope**: documentation and product terms (Design guidelines, Design specs, DSP,
  Libraries, Material Components, Material Design, XR).

**Components.** Of the 41 elements, 22 match an OpenUI object or term exactly, 10 are aliases
(the button emphasis variants, the FAB and the icon button variants), 2 are narrower (primary
and secondary tabs) and 7 are related (chips, ripple, select option). The attributes the
Material Web API has and the OpenUI scope files lack are named in each row; the main ones:

- button emphasis (elevated, filled, tonal, outlined, text) and `soft-disabled`;
- FAB `variant`, `size`, `lowered` and the extended and branded forms;
- divider inset; slider tick marks and value label; linear-progress buffer;
- text-field prefix and suffix, supporting and error text, character counter and icons;
- primary versus secondary tabs.

Material Web is in maintenance mode, so its set will not grow. The glossary names components
it has no page for: Banner, Bottom sheet, Data table, Date picker, Time picker, Navigation
rail, Snackbar, Tooltip and the app bars are on its roadmap as not built; Card and the
navigation bar and drawer exist only as experimental `labs/` code.

## Candidates for the owner

These come from the mapping; none is applied.

1. A **Chip** alias, or a decision that chips stay a composite of Token collection, Toggle
   button and Tag.
2. A **State layer** term in Presentation for the ripple and the hover and pressed overlays
   (Presentation already names the ripple as presentation, without a term).
3. **Design token** terms in Presentation (token, role, types), if tokens enter the spec; the
   Presentation scope currently leaves the token format out.
4. A decision on the **color vocabulary** (scheme, tone, contrast) and on **adaptive design**
   (condition), or leaving them to the design system.
5. Glossary notes for the homonyms **Element**, **Role** and **Mode**.
6. Extended reality terms stay out of v1, in line with the host-integration decision (Q9).

## Method and limits

- The glossary page is rendered by JavaScript, so it was read through headless Chromium.
  All 67 terms were extracted from the DOM and cross-checked against the rendered text.
  Each term has an anchor (a UUID); one was tested: `…/glossary#<uuid>` scrolls to the term.
- Material Web was cloned at commit `47adb65` (2026-10-07, version 2.5.0). Descriptions come
  from the component pages and their API tables. Every image link points at that commit, and
  all 42 image URLs were fetched and returned HTTP 200.
- The glossary has no images. Where a Material Web component documents the term, its example
  image is shown and its source is named in the row.
- The glossary's "Learn more" pages and the m3.material.io design articles were not read; their
  URLs are recorded. The `docs/theming` and `labs/` folders were not scraped.
- Glossary text is quoted unchanged. Material Web is Apache-2.0 licensed; the licence terms of
  the m3.material.io text were not checked. Check them before any of it moves into `spec/`.
- The mapping is judgment, written against the scope files as they are on this branch.

## Refresh

From the repository root, with Node (Playwright and a Chromium) and Python 3:

```bash
git clone --depth 1 https://github.com/material-components/material-web <checkout>
node docs/m3/tools/scrape_glossary.js docs/m3/data/glossary.json
python docs/m3/tools/parse_components.py <checkout> docs/m3/data/components.json
python docs/m3/tools/build_reports.py <checkout>
```

Set `PLAYWRIGHT_CHROMIUM` to a Chromium executable if Playwright has no browser of its own.
The reports are generated: edit the curated JSON in `data/` and rebuild.
