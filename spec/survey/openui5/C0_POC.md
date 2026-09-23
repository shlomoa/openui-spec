# C0 — proof-of-concept: is the cached extract enough?

Per `PLAN.md` §9 C0. Tests the three Description-writing methods from §11
against each other on a 10-class random sample, to resolve whether the
cached ~260-character extract is good enough for the full 422-row Phase C
render, or whether it needs full-source fetching instead.

## Methodology

**Sample:** 10 distinct classes drawn at random (`random.seed(20260922)`,
`random.sample`) from the 422 matched records in
`_raw/phaseB_grouped.json`. No stratification — a genuine random draw,
including whatever population skew that implies (see "sap.html cluster"
below).

**The three methods, run independently on each of the 10:**
- **Method 1 (full fetch):** fetched the actual source file from GitHub
  at the pinned commit (`5165c20cff6de9d79604008a76c56322aa721bf5`, §2)
  and paraphrased from the complete JSDoc block.
- **Method 2 (cached extract):** paraphrased using *only* Phase A's
  cached description field (capped at ~260 characters) — nothing else,
  as if the full source were unavailable.
- **Method 3 (flagged-only):** apply §11's real decision rule — full
  fetch only if the class is B9-flagged (any class touched by B9's
  duplicate-name investigation) or B4/B5-borderline (`match_method ==
  "B5_review"`), cached extract otherwise. That population is 126 of the
  422 matched records (30%). 2 of the 10 sampled classes fall in it.

**Scoring axes:** accuracy (nothing invented beyond the source),
completeness (does it capture what's materially important, or does
truncation silently drop something), robustness (does quality hold
across a bare wrapper vs. a complex widget vs. a deprecated class), and
cleanliness (well-formed prose vs. a truncation/extraction artifact).

## Results

| # | Class | Flagged (M3)? | Cached length | M1 (full fetch) | M2 (cached only) |
|---|---|---|---|---|---|
| 1 | `sap.html.Q` | no | 0 (empty) | "Wraps the native `<q>` (inline quotation) element; exposes a `cite` property mapped to the tag's `cite` attribute." | *(nothing to paraphrase — cached desc is empty)* |
| 2 | `sap.html.Header` | no | 0 (empty) | "Wraps the native `<header>` element; no properties beyond the base native-wrapper contract." | *(empty)* |
| 3 | `sap.html.S` | no | 0 (empty) | "Wraps the native `<s>` (strikethrough) element; no properties beyond the base native-wrapper contract." | *(empty)* |
| 4 | `sap.m.semantic.MultiSelectAction` | no | 155 | "A toggle button representing OpenUI5's multi-select semantic action, meant for a `SemanticPage`'s footer aggregations; extends `SemanticToggleButton`." | "A semantic action button with default properties, eligible for aggregation content of **[dangling — source says "a ." with the link target stripped]**." |
| 5 | `sap.m.IconTabBar` | no | 260 (capped) | "A collection of tabs with associated content, used as a content filter (one shared area, filtered by the selected tab), a normal tab bar (independent content per tab), or a combination of both." | "A collection of tabs with associated content, for navigation or filtering; different types exist based on content **[cuts off before naming any of them — "Filter" is the last word extracted]**." |
| 6 | `sap.f.semantic.PositiveAction` | **yes** | 144 | "A semantic-specific button for a `SemanticPage`'s `positiveAction` footer aggregation; default text is 'Accept'." | "A semantic-specific button, eligible for the `positiveAction` aggregation of **[dangling — "of the to be placed", link target stripped]**." |
| 7 | `sap.ui.core.LocalBusyIndicator` | no | 260 (capped) | "Deprecated (since 1.14.2) variant of `BusyIndicator` that blocks only its own control instead of the whole screen; deprecated because it's no longer needed by the current busy-indication implementation." | "A special, deprecated version of `BusyIndicator` that blocks only its corresponding control with a local animation overlay **[cuts off before the deprecation reason — the @deprecated block is past character 260]**." |
| 8 | `sap.f.semantic.SemanticButton` | **yes** | 103 | "Abstract base class for `sap.f`'s semantic action buttons (`AddAction`, `CloseAction`, etc.), extending `sap.m.semantic.SemanticButton` for `DynamicPage`/`ObjectPage`-style footers; not instantiated directly." | "A base class for the available semantic actions, such as **[dangling — "such as , , etc.", both link targets stripped]**." |
| 9 | `sap.m.DatePicker` | no | 260 (capped) | "Lets users select a localized date (0001-01-01 to 9999-12-31) via touch, mouse, or keyboard; consists of a date input field and a calendar popup. Also notes a runtime dependency on `sap.ui.unified` (lazy-loaded on first open, with a documented CSP/latency caveat)." | "Lets users select a localized date via touch, mouse, or keyboard input; consists of two parts: the date input **[cuts off mid-word — "fie" — the second part's name and everything after is gone]**." |
| 10 | `sap.ui.table.AnalyticalColumnMenu` | no | 96 | "A column menu for the analytical column type; deprecated as of 1.117 in favor of `sap.ui.table.Column`'s `headerMenu` association." | "A column menu used by the analytical column. **[complete as far as it goes, but no deprecation reason — that's past character 96, outside the extracted text entirely]**." |

**M3 (flagged-only) column, for completeness:** for rows 6 and 8
(flagged), M3 = M1's output above. For the other 8 (not flagged),
**M3 = M2's output** — meaning M3 reproduces every defect listed above
except rows 6 and 8's. That includes all three empty `sap.html`
descriptions, the `IconTabBar` truncation, the `DatePicker` mid-word cut,
and — notably — `LocalBusyIndicator`'s missing deprecation reason, even
though it's a deprecated class or than a flagged one.

## Scoring

| Axis | Method 1 (full fetch) | Method 2 (cached only) | Method 3 (flagged-only) |
|---|---|---|---|
| Accuracy | High on all 10 — every claim traces to real JSDoc text. | High where text exists, but 3/10 outputs would have to either state a **grammatically broken claim verbatim** (rows 4, 6, 8's dangling references) or silently drop the clause — either way it's a real accuracy/faithfulness compromise, not just a style issue. | Same as M2 on 8/10 rows. |
| Completeness | High on all 10 — captures usage modes (`IconTabBar`), the second date-picker component (`DatePicker`), deprecation reasons (`LocalBusyIndicator`, `AnalyticalColumnMenu`), and the wrapped HTML tag (`sap.html.*`). | **Zero information** on the 3 `sap.html` rows (nothing to paraphrase at all); silently incomplete on 3 more (`IconTabBar`, `DatePicker`, `LocalBusyIndicator` all truncate mid-thought right at the 260-character cap). Complete only on the 2 short, non-truncated, non-`@link` rows (`AnalyticalColumnMenu`'s base text, `sap.m.semantic.MultiSelectAction`'s non-link portion). | Same as M2 on 8/10 rows — including the 3 empty `sap.html` rows and the `LocalBusyIndicator` deprecation-reason gap. |
| Robustness | Holds evenly across every kind of class in the sample: trivial wrapper, mid-size widget, deprecated legacy class, abstract base class. | **Degrades badly and predictably** on two specific, generalizable class shapes: (a) any class whose full JSDoc exceeds ~260 characters (truncates, often losing the most decision-relevant content — deprecation reasons and usage caveats tend to sit later in the docblock), and (b) any class with an empty or near-empty extracted description (the entire `sap.html` Native family, ~92 records / 22% of the matched set). | Inherits M2's robustness failures on both (a) and (b), since neither is what M3's flag criterion (B9 duplicate-name ambiguity, B4/B5 classification confidence) was designed to catch. |
| Cleanliness | Clean prose throughout — no extraction artifacts. | **3 of 10 (30%)** contain a dangling, ungrammatical clause from a stripped `@link` tag whose linked text was dropped without substitution (`"of a ."`, `"of the to be placed"`, `"such as , , etc."`). This is **not a length problem** — two of the three (`PositiveAction` at 144 chars, `SemanticButton` at 103 chars) are well under the 260-character cap; the defect is in how Phase A's extraction handled `@link` tags, independent of truncation. A dataset-wide check (conservative pattern match: a double space, or a bare article/preposition immediately before a comma/period) finds this artifact in **at least 43 of 422 matched records (10.2%)** — a lower bound, since the heuristic under-detects. | Same defect on the same 8/10 non-flagged rows, since the `@link`-stripping bug is orthogonal to M3's flag criterion too. |

## Verdict

**The cached extract alone is not sufficient**, on two independent,
generalizable failure modes found in this 10-class sample and confirmed
at the dataset level:

1. **Truncation** silently drops material content once a class's real
   JSDoc exceeds ~260 characters — most damagingly, deprecation reasons
   and usage caveats, which tend to appear later in a docblock than the
   opening description. 3 of 10 sampled classes hit the cap and lost
   real content this way.
2. **`@link`-tag stripping** produces grammatically broken, dangling
   text independent of length — found in 3 of 10 sampled classes (2 of
   them well under the length cap), and in at least 43 of 422 (10.2%,
   conservative lower bound) dataset-wide.

**Method 3 (flagged-only) does not fix either problem.** Its flagging
criterion — B9's cross-library duplicate-name ambiguity and B4/B5's
low-confidence classification calls — is about *which spec object a
class belongs to*, not *whether its cached description text is usable*.
Those are different, uncorrelated questions: in this sample, both
failure modes hit non-flagged rows (`sap.html.*`, `IconTabBar`,
`DatePicker`, `LocalBusyIndicator`) while the 2 flagged rows happened to
be short enough that only the `@link`-stripping defect applied. Adopting
Method 3 as specified would still leave the `sap.html` family
completely undescribed and would still lose `LocalBusyIndicator`'s
deprecation reason.

**Recommendation: Method 1 (full source fetch for all 422 rows).** The
10 fetches in this test (`raw.githubusercontent.com` at the pinned
commit, no auth needed) completed quickly with no rate-limit or access
issues, so scaling to 422 looks mechanically straightforward — one fetch
per file, no batching needed since matched records map 1:1 to files
(confirmed in `PHASE_C_HANDOFF.md`). This is a recommendation, not a
decision: if there's a cost or time constraint I'm not accounting for,
Method 3 could still work as a *fallback-population* selector if its
criterion were redefined around actual quality-risk signals instead —
e.g. flag any class with `desc` length ≥ ~240 characters (truncation
risk) or containing the `@link`-stripping artifact pattern above — which
would target the two failure modes directly, unlike its current
B9/B4-B5-based definition.

## Next

Your call: adopt Method 1 for C2–C8, adopt a redefined risk-based Method
3, or accept Method 2's gaps as an acceptable tradeoff. Once decided,
C1 (pilot reconciliation) is next.
