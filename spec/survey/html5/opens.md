# HTML Standard survey: open questions

[Survey README](README.md#contents) · Source: [EXCLUSIONS.md](inventory/EXCLUSIONS.md#explicit-exclusions-from-object-level-research)

Status: open items of the survey itself. Nothing is approved at survey level. Where a
consolidated file has since settled an item, the outcome is linked. Counts come from the
18 chapter files in `inventory/inventory/` (8,661 rows) and from
[EXCLUSIONS.md](inventory/EXCLUSIONS.md#open-semantic-decisions).

## Open items

| #                                               | Open item                                       | Consolidated outcome                                                                       |
| ----------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [H1](#h1-abstract-names-and-descriptions)       | All 8,661 inventory rows read "Pending step 4"  | Open at survey level; the consolidated files do not depend on it                           |
| [H2](#h2-obsolete-features)                     | 348 definitions of obsolete features            | Open at survey level; not placed in any OpenUI category                                    |
| [H3](#h3-untyped-definitions)                   | 4,750 definitions without a type                | Open at survey level                                                                       |
| [H4](#h4-definitions-without-anchors)           | 353 definitions without their own anchor        | Open at survey level                                                                       |
| [H5](#h5-accessibility-and-composition-folders) | Accessibility and Composition top-level folders | Not added; deferred (Q13)                                                                  |
| [H6](#h6-behavior-target-representation)        | Behavior targets: references or owned children  | Settled: references                                                                        |
| [H7](#h7-table-model-depth)                     | Table cells or a tabular primitive family       | Settled: cells in Table                                                                    |
| [H8](#h8-sources-beyond-html)                   | Sources beyond HTML                             | Settled for the consolidated files                                                         |
| [H9](#h9-element-coverage)                      | Do all HTML elements have an OpenUI term?       | Checked: all UI elements do; `mark` added as Highlighted text, ruby left out at this stage |

## H1 Abstract names and descriptions

Plan steps 4–7 of the survey (abstract names, semantic descriptions) were not run, so
every one of the 8,661 inventory rows reads "Pending step 4". The consolidated files name
OpenUI concepts through the taxonomy mapping (all 151 entries have an HTML
correspondence) and the element check in H9; they do not need the survey's own abstract
names.

## H2 Obsolete features

Chapter 16 has 348 definition occurrences in its sections 16.1 Obsolete but conforming
features, 16.2 Non-conforming features and 16.3 Requirements for implementations
([16-obsolete-scope-review.md](inventory/inventory/16-obsolete-scope-review.md#section-coverage)).
Step 1.4, which would research them, was removed. The consolidated
[category](../category.done.md#html-standard) does not place chapter 16.

## H3 Untyped definitions

4,750 definition occurrences have no definition-type label, so algorithms, concepts and
internal bookkeeping are not separated. By chapter:

| Chapter                 | Untyped | Chapter              | Untyped |
| ----------------------- | ------: | -------------------- | ------: |
| 1 Introduction          |       3 | 10 Web workers       |      32 |
| 2 Common infrastructure |   1,877 | 11 Worklets          |      17 |
| 3 Documents             |     115 | 12 Web storage       |       6 |
| 4 HTML elements         |     841 | 13 HTML syntax       |     330 |
| 5 Microdata             |     141 | 14 XML syntax        |       8 |
| 6 User interaction      |     232 | 15 Rendering         |      49 |
| 7 Page loading          |     678 | 16 Obsolete features |      16 |
| 8 Web application APIs  |     343 | 17 IANA              |       8 |
| 9 Communication         |      32 | Supporting material  |      22 |

## H4 Definitions without anchors

353 definition occurrences have no anchor of their own and link to their enclosing
section. Some are examples or repeated occurrences. The full list is in
[EXCLUSIONS.md](inventory/EXCLUSIONS.md#definitions-without-standalone-anchors). By category:

| Category              | Count | Category                    | Count |
| --------------------- | ----: | --------------------------- | ----: |
| HTML elements         |   165 | Page loading and navigation |     9 |
| HTML syntax           |   112 | IANA considerations         |     8 |
| Common infrastructure |    23 | User interaction            |     7 |
| Web application APIs  |    15 | Documents                   |     6 |
| Communication         |     4 | Microdata                   |     2 |
| Introduction          |     1 | Obsolete features           |     1 |

## H5 Accessibility and Composition folders

The survey's proposals P6 and P7 would add two top-level scopes. Consolidated outcome: not
added ([terminology: Not added](../../scopes/terminology.md#not-added),
[architecture change: Not added](../architecture_change.done.md#not-added)); both are deferred by
plan question Q13 (decided 2026-09-29: deferred).

## H6 Behavior target representation

Consolidated outcome: behaviors reference their controlled element by id and do not own it
([scope change R1](../scope_change.done.md#2-replace), [architecture change C1](../architecture_change.done.md#1-change)).

## H7 Table model depth

Consolidated outcome: Table gets cells, a caption and header associations in its own
contract ([scope change C10](../scope_change.done.md#1-change)); the tabular primitive family P8
is not added ([scope change: Not added](../scope_change.done.md#not-added)).

## H8 Sources beyond HTML

The survey needs sources beyond HTML for accessibility patterns, gestures, layout and
composite widgets before a merge. The consolidated files use WAI-ARIA 1.2 and the Qt,
Angular Material and OpenUI5 surveys for these; see the Source URL columns of
[terminology](../../scopes/terminology.md#summary) and [category](../category.done.md#summary).

## H9 Element coverage

Every HTML element and input state was checked against the approved OpenUI terms: the 105 elements with their own section in chapter 4, plus the `h1`–`h6` and `sub`/`sup` groups
and the 21 input states.

| HTML elements                                                                                                                                                                                                         | OpenUI term                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `html`, `head`, `title`, `base`, `link`, `meta`, `style`, `script`, `noscript`                                                                                                                                        | Not UI; `Application/index_html` holds the document                                                                                       |
| `body`, `article`, `section`, `header`, `footer`, `main`, `address`                                                                                                                                                   | Region (Structural containers)                                                                                                            |
| `nav`                                                                                                                                                                                                                 | Navigation bar (Application navigation)                                                                                                   |
| `aside`                                                                                                                                                                                                               | Sidebar (Sheet containers)                                                                                                                |
| `search`                                                                                                                                                                                                              | Search, filtering and sorting (region around a search field)                                                                              |
| `h1`–`h6`, `hgroup`, `p`, `pre`, `blockquote`, `em`, `strong`, `small`, `s`, `cite`, `q`, `dfn`, `abbr`, `data`, `time`, `code`, `var`, `samp`, `kbd`, `sub`, `sup`, `i`, `b`, `u`, `span`, `br`, `wbr`, `ins`, `del` | Text (Display primitives)                                                                                                                 |
| `bdi`, `bdo`                                                                                                                                                                                                          | Bidirectional text (Internationalization)                                                                                                 |
| `hr`                                                                                                                                                                                                                  | Separator (Display primitives)                                                                                                            |
| `ol`, `ul`, `li`                                                                                                                                                                                                      | List                                                                                                                                      |
| `dl`, `dt`, `dd`                                                                                                                                                                                                      | Description list                                                                                                                          |
| `menu`                                                                                                                                                                                                                | List of commands; not the Menu widget (see the note on Menu in [taxonomy mapping change C3](../taxonomy_mapping_change.done.md#1-change)) |
| `figure`, `figcaption`, `picture`, `source`, `img`, `map`, `area`                                                                                                                                                     | Image and Label (Display primitives); image-map areas are Links                                                                           |
| `div`                                                                                                                                                                                                                 | Container                                                                                                                                 |
| `a`                                                                                                                                                                                                                   | Link                                                                                                                                      |
| `iframe`, `embed`, `object`                                                                                                                                                                                           | Media widgets (embedded content)                                                                                                          |
| `video`, `audio`, `track`                                                                                                                                                                                             | Media player (Media widgets)                                                                                                              |
| `table`, `caption`, `colgroup`, `col`, `tbody`, `thead`, `tfoot`, `tr`, `td`, `th`                                                                                                                                    | Table                                                                                                                                     |
| `form`                                                                                                                                                                                                                | Form                                                                                                                                      |
| `label`                                                                                                                                                                                                               | Label                                                                                                                                     |
| `button`, and input states Submit Button, Image Button, Reset Button, Button                                                                                                                                          | Button (Action controls)                                                                                                                  |
| `input` states Text, Telephone, URL, Email                                                                                                                                                                            | Text field (Text inputs); formats checked by Constraint validation                                                                        |
| `input` state Password                                                                                                                                                                                                | Password field                                                                                                                            |
| `input` states Date, Month, Week, Time, Local Date and Time                                                                                                                                                           | Date/Time pickers                                                                                                                         |
| `input` state Number                                                                                                                                                                                                  | Spin box (Range control)                                                                                                                  |
| `input` state Range                                                                                                                                                                                                   | Slider                                                                                                                                    |
| `input` state Color                                                                                                                                                                                                   | Color picker                                                                                                                              |
| `input` states Checkbox, Radio Button                                                                                                                                                                                 | Checkbox, Radio button                                                                                                                    |
| `input` state File Upload                                                                                                                                                                                             | File picker                                                                                                                               |
| `input` state Hidden                                                                                                                                                                                                  | Not UI                                                                                                                                    |
| `select`, `option`, `optgroup`, `selectedcontent`                                                                                                                                                                     | Dropdown or List box (Choice controls)                                                                                                    |
| `datalist`                                                                                                                                                                                                            | Text completion (Input assistance)                                                                                                        |
| `textarea`                                                                                                                                                                                                            | Text area                                                                                                                                 |
| `output`                                                                                                                                                                                                              | Calculated output                                                                                                                         |
| `progress`                                                                                                                                                                                                            | Progress bar                                                                                                                              |
| `meter`                                                                                                                                                                                                               | Meter                                                                                                                                     |
| `fieldset`, `legend`                                                                                                                                                                                                  | Form group and Labelled group                                                                                                             |
| `details`, `summary`                                                                                                                                                                                                  | Disclosure (Expandable panels)                                                                                                            |
| `dialog`                                                                                                                                                                                                              | Dialog                                                                                                                                    |
| `canvas`                                                                                                                                                                                                              | Canvas (Drawing and capture controls)                                                                                                     |
| `template`, `slot`                                                                                                                                                                                                    | Composition; deferred (Q13)                                                                                                               |
| `ruby`, `rt`, `rp`                                                                                                                                                                                                    | Not added at this stage ([terminology: Not added](../../scopes/terminology.md#not-added))                                                 |
| `mark`                                                                                                                                                                                                                | Highlighted text (Display primitives), [terminology A73](../../scopes/terminology.md#43-output-elements)                                  |

Finding: with Highlighted text (terminology A73) added for `mark`, the approved vocabulary
covers every HTML UI element; ruby annotations are left out at this stage.
