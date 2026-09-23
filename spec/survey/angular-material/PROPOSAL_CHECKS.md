# Combined proposal validation

Checked on 2026-09-22 after Steps 9–11. This supersedes the earlier two-leaf proposal check summary. The original [survey final report](FINAL_REPORT.md) and [Step 8 research checks](BEHAVIOR_RESEARCH_CHECKS.md) remain historical records of their respective source reviews.

## Results

| Check | Result |
| --- | --- |
| Original taxonomy coverage | All 10 categories, 39 family subcategories, direct package artifacts and 17 artifact roles remain accounted for; original primary classifications are preserved. |
| Capability decisions | B01–B40 each have exactly one authoritative crosswalk row. All 39 families have exactly one consolidated disposition row; direct package evidence is addressed separately. |
| Proposed tree | Five new leaves, thirteen amended leaves, one Behaviors parent index draft. No new canonical category/subcategory folders, root moves or identifier renames. |
| Scope parsing | All 18 leaf review copies parse through the repository converter. Candidate scope/instance identifiers are unique within the review set. |
| Existing contracts | All thirteen existing identities/types and attribute sets are preserved. Twelve child models are unchanged; AM-E10 preserves page/view entries and adds only container/widget applicability. |
| New behavior fields | Three behavior drafts have exactly their declared Uses/Produces keys, no owned children and no extra generated fields. Neutral reference/event/coordination decisions remain deferred. |
| New type collisions | The five new scope identifiers and instance types are absent from canonical leaves; identifiers/instance identifiers are absent from the generated catalog. No matching new identifiers were found in other survey leaf drafts. |
| Candidate evidence | 18 unique leaf destinations exactly match the 18 staged leaf review copies; existing-leaf amendments update one row each. |
| Parent structure | Existing Behaviors parent indexes the three proposed additions and amended Collapsible; no new subcategory requires a new parent definition. |
| Source observations | The Step 8 research tables are unchanged. Capability mapping and candidate semantics remain separate from observed source claims. |
| Composition review | Four explicit document scenarios plus negative cases check ownership, applicability, duplicated events and focus/scroll boundaries. D01–D07 retain unresolved contract and nesting decisions. |
| Links | 665 relative-link occurrences resolve in the staged repository view, including heading anchors; 187 unique pinned source paths/line URLs resolve against the existing fixed evidence. |
| Preservation | SHA-256 fingerprints match all 64 protected canonical and historical baseline/report documents. |
| Markdown | All 28 delivered Markdown documents pass the configured markdownlint-cli2 0.23.3 rules. |
| Runtime/generation | No canonical catalog generation, upstream tests, browser tests or consumer execution was performed. This is a proposal/document validation pass. |

## Baseline fingerprints

Recheck canonical working-tree content before a future merge. Fingerprints identify the source revision used for these proposals; they do not establish approval or committed status.

| Source | SHA-256 |
| --- | --- |
| [scope.md](../../scopes/scope.md) | `382e240c6a33eb4c77648f7f901295a5761c9096fb64d8f378dc906654d413ff` |
| [template.scope.md](../../scopes/template.scope.md) | `5648c3614930f068409bf91279404a308573fb8f7e4e99fac5f4b0af456485e3` |
| [taxonomy_mapping.md](../../scopes/taxonomy_mapping.md) | `d3019bc31ccd6d8f5fd43ffc5cb3fe185fd96e7bebb37c6f824eeacaa5aee8b9` |
| [evidence.md](../../scopes/evidence.md) | `3c5189f1ccaf4de31d7a602cc933244eb46d7fe18affe90bdb3dca82d3cf8930` |

## Practical limits

Passing template parsing validates deterministic syntax, not reference resolution, complete event schemas, rendering or accessible runtime behavior. The existing behavior target-as-child model also remains a semantic review issue. The [behavior review](BEHAVIOR_REVIEW.md#deferred-decisions-and-merge-readiness) explicitly marks the affected drafts as not merge-ready until the applicable decisions are resolved.

Source URL checks reused the fixed Material tree and bounded CDK archive context from Step 8; no new live network validation is claimed. Pending Qt proposals were inspected as comparison material, not adopted or counted as approved canonical scope.
