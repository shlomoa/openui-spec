# Angular Material survey: open questions

[Survey README](README.md#contents) · Sources: [BEHAVIOR_REVIEW.md](inventory/BEHAVIOR_REVIEW.md#deferred-decisions-and-merge-readiness), [RESEARCH_NOTES.md](inventory/RESEARCH_NOTES.md#coverage-and-method)

Status: open items of the survey itself. Nothing is approved at survey level. Where a
consolidated file has since settled an item, the outcome is linked.

## Open items

| #                                            | Open item                               | Consolidated outcome                               |
| -------------------------------------------- | --------------------------------------- | -------------------------------------------------- |
| [A1](#a1-deferred-contract-decisions-d01d07) | Deferred contract decisions D01–D07     | Three settled, four wait on W5 or W6               |
| [A2](#a2-proposal-acceptance)                | Acceptance of AM-P01–P05 and AM-E01–E13 | Settled: every proposal has a consolidated outcome |
| [A3](#a3-cross-survey-overlap)               | Overlap with Qt and OpenUI5             | Settled                                            |
| [A4](#a4-upstream-theming-exports)           | Theming exports point to a missing file | Open upstream; outside the specification           |
| [A5](#a5-live-documentation-build)           | Source of the live documentation build  | Open; the survey uses release-pinned sources       |
| [A6](#a6-research-depth)                     | Research depth                          | Open; limits of the survey                         |

## A1 Deferred contract decisions D01–D07

| Id  | Decision                                                                            | Affects                | Consolidated outcome                                                                                                                      |
| --- | ----------------------------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| D01 | Neutral encoding for target references and activation bindings                      | AM-P03–P05             | Settled in principle: targets are references by id ([scope change R1](../scope_change.done.md#2-replace)); the encoding is W5 task 21          |
| D02 | Event representation: dismissal reasons, scroll position, request versus completion | AM-P03, AM-P04, AM-E11 | Open: W5 task 21; [scope change A7](../scope_change.done.md#4-add) separates the ways a dialog closes                                          |
| D03 | Nested or replacement surfaces: focus owner, lock participation, handover           | AM-P03, AM-P05         | Open: contract of Modal overlay and Viewport and focus control (W6 task 25)                                                               |
| D04 | Cleanup when a host disappears; fallback when a restore target is gone              | AM-P03, AM-P05         | Open: same as D03                                                                                                                         |
| D05 | Behavior targets as children versus the rule that children own UI                   | AM-E10                 | Settled: [scope change R1](../scope_change.done.md#2-replace)                                                                                  |
| D06 | Form field ownership; Token collection value, mode and events                       | AM-P01, AM-P02         | Terms settled (Form field A44, Token collection A20); machine fields wait on W5 ([scope change: Not added](../scope_change.done.md#not-added)) |
| D07 | Reconcile Qt Scroll container and Text completion                                   | AM-P04, AM-E01         | Settled: [terminology A52, A59](../../scopes/terminology.md#47-behaviors); evidence for virtualization and autosizing is still open                 |

## A2 Proposal acceptance

| Proposal                  | Consolidated outcome                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| AM-P01 Form field         | Form field, alias of Form ([terminology A44](../../scopes/terminology.md#45-container-elements))        |
| AM-P02 Token collection   | Token collection, alias of List ([terminology A20](../../scopes/terminology.md#42-input-elements))      |
| AM-P03 Modal interaction  | Alias of Modal overlay in Behaviors ([terminology A56](../../scopes/terminology.md#47-behaviors))       |
| AM-P04 Scrollable         | Alias of Viewport scrolling ([terminology A57](../../scopes/terminology.md#47-behaviors))               |
| AM-P05 Scroll lock        | Scroll lock in Viewport and focus control ([terminology A58](../../scopes/terminology.md#47-behaviors)) |
| AM-E01 Choice controls    | [Scope change](../scope_change.done.md#1-change) C2 and A3                                         |
| AM-E02 Range control      | Scope change C3 and A2                                                                        |
| AM-E03 Date/time pickers  | Scope change C9 and A8                                                                        |
| AM-E04 Navigation widgets | Scope change C12                                                                              |
| AM-E05 Sheet containers   | Scope change C17                                                                              |
| AM-E06 Status indicator   | Scope change C8 and A1                                                                        |
| AM-E07 Table              | Scope change C10                                                                              |
| AM-E08 Surface containers | Scope change C18                                                                              |
| AM-E09 List               | Scope change C11                                                                              |
| AM-E10 Collapsible        | Scope change R1                                                                               |
| AM-E11 Dialog             | Scope change C23 and A7                                                                       |
| AM-E12 Overlay containers | Scope change C16                                                                              |
| AM-E13 Expandable panels  | Scope change C22                                                                              |

## A3 Cross-survey overlap

Qt (modal, scrolling, completion, temporal, range, progress): see
[Qt Q4](../qt/opens.md#q4-overlap-with-angular-material). OpenUI5 Cards: covered by the
existing Card alias ([terminology: Not added](../../scopes/terminology.md#not-added)); card composition
is in [scope change C18](../scope_change.done.md#1-change).

## A4 Upstream theming exports

The package exports `./theming` and `./_theming` point to `./_theming.scss`, which is
missing from the published package ([Package category](inventory/Package-and-style-distribution.survey.md#direct-objects)).
The intended upstream behavior is unknown. It does not affect the specification.

## A5 Live documentation build

The live documentation site carries local-change metadata and its exact source is unknown.
The survey's claims rest on release-pinned sources
([BASELINE.md](inventory/BASELINE.md#fixed-release-and-source-identity)).

## A6 Research depth

Not claimed: complete symbol and member coverage, running the upstream tests, and
accessibility certification ([final report](inventory/FINAL_REPORT.md#documented-limitations-and-acceptance-decision)).
