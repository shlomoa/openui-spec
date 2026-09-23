# Survey baseline and scope

- Survey date: 2026-09-23 (Asia/Jerusalem).
- Specification publication date shown by the source: 22 September 2026.
- Commit: `cd8ac6f1bbf86dd0bd09ef75d27dacaebe7b4c1d`.
- Fixed source: [HTML Standard snapshot](https://html.spec.whatwg.org/commit-snapshots/cd8ac6f1bbf86dd0bd09ef75d27dacaebe7b4c1d/).
- Navigation seed: [multipage HTML Standard](https://html.spec.whatwg.org/multipage/).
- Downloaded single-page snapshot SHA-256: `93469c66da6a16b882a0387010c1b28b562f0538067129a79f4d17998b0672f0`.

The multipage table of contents identifies the same commit as the downloaded snapshot. All enumerated TOC anchors are checked against that fixed snapshot. Inventory links use the snapshot so future changes to the living standard do not silently change the research baseline.

## Scope

The survey concerns the published specification, not the WHATWG repository's implementation folders or third-party libraries. Pages are the multipage content files; sections are TOC entries; object candidates are explicit definition occurrences and indexed references. Coverage includes elements, attributes, interfaces, members, events, named concepts, and named algorithms. Source definition-type metadata is retained where available; untyped definitions are not guessed to be algorithms solely from their names.

All TOC sections and explicit `dfn` occurrences are inventoried. This deliberately includes candidates requiring later semantic review, rather than dropping them during extraction. Named algorithm definitions are included; individual unnamed algorithm steps, local variables, and arbitrary prose phrases are not independent objects. Index targets not represented by a standalone definition are retained as section/context references or external dependencies.

Abstract names and researched descriptions belong to steps 4–5 and remain explicitly pending. Inventory descriptions report source location, definition kind, and research status; they are not completed semantic descriptions. The four requested table columns are retained throughout the inventory.

## Dependencies and scope decisions

External specifications are recorded in [DEPENDENCIES.md](DEPENDENCIES.md) and the external entries of [INDEX_RECONCILIATION.md](INDEX_RECONCILIATION.md); their contents are not recursively surveyed. See [EXCLUSIONS.md](EXCLUSIONS.md) for exclusions, unanchored definitions, and the unresolved detailed-research treatment of obsolete features after removal of plan step 1.4.

## Update procedure

Use this commit for subsequent research. A later survey refresh should explicitly select a new snapshot, rebuild the TOC/definition/index inventory, compare additions and removals by anchor, and review changed definitions before carrying forward research status.
