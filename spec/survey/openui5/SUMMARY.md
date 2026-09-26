# OpenUI5 survey: summary

[Survey README](README.md) · [Plan](PLAN.md)

## Baseline and scope

- **Source:** `github.com/UI5/openui5`, `src/` tree, commit
  `5165c20cff6de9d79604008a76c56322aa721bf5` (2026-09-21). Every table links to GitHub at
  that commit and to the official UI5 API reference.
- **Surveyed:** twelve core UI libraries, excluding tests, themes, design-time and
  flexibility files and vendored third-party code. See [PLAN.md](PLAN.md).
- **Goal:** add OpenUI5 as a second real-world framework to the OpenUI evidence base.
  Mapping to the existing taxonomy was attempted, not forced; finding gaps was an
  explicit goal.

## Steps

1. Piloted the pipeline on a small slice.
2. Extracted every candidate class by script.
3. Matched classes to the 42 OpenUI spec objects by base class, then by description,
   with manual review of 63 uncertain matches.
4. Clustered the unmatched classes and checked each cluster against the top-level
   hierarchy.
5. Described every matched class from its full source and verified counts, links and
   cluster membership.

## Findings

| Outcome                                        |   Classes |
| ---------------------------------------------- | --------: |
| Matched to an existing spec object             |       424 |
| Clustered into 11 proposed subcategories       |       257 |
| Unclustered leftovers, named for future review |       261 |
| Out of scope (non-UI infrastructure)           |       279 |
| **Total primary classes**                      | **1,221** |

- **Taxonomy fit:** the 424 matched classes land on 31 of the 42 spec objects. Native (95)
  and Action controls (61) are the largest; the Pages objects have no matches. See
  [taxonomy_mapping.md](taxonomy_mapping.md) and [category.md](category.md).
- **Gaps:** 11 clusters: 9 new subcategories, 1 named variant (Tile) and 1 alias-level
  note (Metadata-driven field). See [scopes_proposal.md](scopes_proposal.md).
- **Hierarchy:** the existing seven-way split of concrete-object scopes held. No new
  top-level category is needed.
- **Terminology:** 3 of the 11 clusters (Filter bar, Personalization panels, Value help)
  only have meaning attached to another object. This led to the Standalone / Host-bound
  terminology proposal.

## Decisions and reasoning

- **Place clusters by purpose, not by name.** Each cluster was checked against the target
  scope's own Purpose and Boundaries text (step B7). See
  [architecture_proposal.md](architecture_proposal.md).
- **Do not force placement.** Leftovers with no cluster stay unclassified rather than
  being filed into the nearest object.
- **Keep Widgets whole for now.** Six clusters land in Widgets. That is flagged as a
  growth risk, not a reason to split today.
- **Terminology is approved but not yet applied.** Standalone / Host-bound was approved
  on 2026-09-23 as prose-only vocabulary. Applying it to the glossary is plan question
  Q10, deferred to terminology workstream W1.
