# HTML Standard survey: summary

[Survey README](README.md) · [Plan](PLAN.md)

## Baseline and scope

- **Source:** HTML Living Standard, fixed at commit
  `cd8ac6f1bbf86dd0bd09ef75d27dacaebe7b4c1d` (published 2026-09-22) and surveyed
  2026-09-23. All links point to that commit snapshot, so later changes to the living
  standard do not alter the baseline. See [BASELINE.md](inventory/BASELINE.md).
- **Surveyed:** the published specification's pages, sections, elements, attributes,
  interfaces, members, events, named concepts and named algorithms.
- **Not surveyed:** WHATWG repository sources, third-party libraries, and the contents
  of external specifications. External specifications are recorded as
  [dependencies](inventory/DEPENDENCIES.md) only.

## Steps

1. Pinned the baseline and defined the object kinds to collect.
2. Inventoried every table-of-contents section and every explicit definition, and
   reconciled them against all eight index subsections.
3. Classified every object under one primary category, using HTML chapters as
   categories and second-level sections as subcategories.
4. Mapped all 151 existing OpenUI taxonomy entries to HTML primitives, routed all 118
   second-level sections to OpenUI scopes, and proposed scope-tree changes.

Abstract naming and semantic descriptions (plan steps 4–5) have not started. See
[PLAN.md](PLAN.md).

## Findings

- **Coverage:** 60 multipage source files, 1,234 sections, 7,427 definition
  occurrences (7,074 unique anchors and 353 without a standalone anchor), 118
  subcategories and 228 bibliography entries. See [category.md](category.md) and
  [COVERAGE.md](inventory/COVERAGE.md).
- **Taxonomy fit:** every one of the 151 OpenUI taxonomy entries has a recorded HTML
  correspondence. 50 are external dependencies (defined outside HTML, such as ARIA or
  CSS), 17 are direct primitives, and most of the rest are partial matches. 7 have no
  direct match and 5 are semantic mismatches. See
  [taxonomy_mapping.md](taxonomy_mapping.md).
- **UI relevance is concentrated:** chapter 4 (elements) and chapter 6 (user
  interaction) supply most UI-relevant evidence. Parsing, workers, worklets, storage
  and communication are browser implementation machinery, not UI taxonomy objects.
- **Contract gaps in current scopes:**
  - The Table child model enumerates rows but not cells, captions or header
    associations.
  - The Dialog evidence entry overstates its HTML basis: HTML has no `modal` content
    attribute.
  - The date/time picker contract (`start`, `end`, `dateChange`) is not established by
    native temporal inputs.
  - Behavior leaves model their targets as children, which conflicts with the
    template's owned-children rule.

## Decisions and reasoning

- **Keep the eleven top-level scopes and enrich in place.** Mirroring HTML chapters
  would mix controls with parsers and browser algorithms, and would turn a
  technology-neutral model into an HTML implementation catalog. See
  [architecture_proposal.md](architecture_proposal.md).
- **Add leaves only for distinct responsibilities.** HTML evidence identifies up to
  eight candidates (P1–P8), each gated on a review condition. See
  [scopes_proposal.md](scopes_proposal.md).
- **Keep the grammar unchanged; clarify the template in prose.** See
  [openui_schema_proposal.md](openui_schema_proposal.md).
- **Keep two axes apart:** the HTML correspondence strength and the canonical
  abstraction level are recorded separately. An alias does not become a new known
  type.
- **Record rather than guess:** unanchored definitions, untyped definitions and the
  treatment of obsolete features are recorded as open decisions, not resolved by
  inference. See [opens.md](opens.md).
