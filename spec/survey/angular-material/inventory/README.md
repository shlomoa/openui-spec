# Angular Material survey

Status: Steps 1–7 completed for the file/folder/export survey; Steps 8–11 completed for capability research, mapping and an unmerged scope proposal. Deferred contract decisions remain documented.
See the [final report](FINAL_REPORT.md) for verification evidence and limitations.

The survey covers every tracked file and folder under the fixed `src/material/`
root and all published export declarations for `@angular/material` 22.1.7.
The [source baseline](BASELINE.md) defines the commit and documentation policy.

## Coverage

- **1,454 objects**: 1,233 files, 135 folders including the source root, and 86
  published export declarations.
- **10 category files**, with one primary row per object and exactly the four
  requested fields in every object table.
- All source files matched the pinned Git blob hashes. The published archive
  matched its registry integrity value.
- Two legacy Sass exports point to an absent file; see [research findings](RESEARCH_NOTES.md).

These are file/folder/export-level research results. Symbol lists are summaries,
not exhaustive API contracts, and no upstream behavior tests were executed.

## Classification and source policy

Each object has one primary category. Family-specific support files stay with
their family; shared facilities are assigned once. Direct objects and family/role
subcategories use the same four-field table format. The [taxonomy](TAXONOMY.md)
defines the 10 survey categories and 39 family subcategories.

Descriptions use the release-pinned source and documentation. Live API pages are
navigation aids; an HTTP response does not establish their exact content version.
The package version, commit, and documentation differences are recorded in the
[baseline](BASELINE.md).

## Known gaps and limitations

- The published `./theming` and `./_theming` aliases target a missing
  `./_theming.scss` file. They are classified declarations, not verified usable
  imports. No source object is unassigned because of this upstream discrepancy.
- The source scope excludes CDK internals, sibling adapter packages, external
  examples, and the documentation application; see [inventory exclusions](INVENTORY.md).
- This is a file/folder/export survey, not a complete symbol/member audit,
  runtime compatibility test, or accessibility certification.
- The live documentation build contains local-change metadata. Its exact modified
  source remains unknown; release-pinned evidence supports the survey claims.

The original survey and the behavior research/proposal extension are complete.
Package-defect fixes, broader source roots and a canonical merge remain outside
this completed work.

## Category index

- [Actions and triggers](Actions-and-triggers.survey.md): 62 objects.
- [Data entry](Data-entry.survey.md): 398 objects.
- [Navigation and workflow](Navigation-and-workflow.survey.md): 177 objects.
- [Layout and containers](Layout-and-containers.survey.md): 111 objects.
- [Data presentation](Data-presentation.survey.md): 153 objects.
- [Feedback and overlays](Feedback-and-overlays.survey.md): 179 objects.
- [Icons and graphics](Icons-and-graphics.survey.md): 25 objects.
- [Shared foundations](Shared-foundations.survey.md): 206 objects.
- [Development tooling](Development-tooling.survey.md): 121 objects.
- [Package and style distribution](Package-and-style-distribution.survey.md): 22 objects.

## Research and planning documents

- [Final verification report](FINAL_REPORT.md).
- [Plan and progress](PLAN.md).
- [Source baseline](BASELINE.md).
- [Complete inventory and exclusions](INVENTORY.md).
- [Category hierarchy and assignment rules](TAXONOMY.md).
- [Research findings and unresolved issues](RESEARCH_NOTES.md).
- [Steps 3–5 verification record](RESEARCH_CHECKS.md).
- [Historical POC report](POC_REPORT.md).
- [Historical POC validation](VALIDATION.md).

The POC's 12 objects are retained in the expanded category results. Its report and
validation remain historical records; they do not describe current total coverage.
Abstract names and category decisions are survey interpretations, not changes to
the normative OpenUI specification.

## Proposed taxonomy integration

A separate, unmerged proposal maps this survey to the current canonical scopes:

- [Taxonomy crosswalk](TAXONOMY_MAPPING.md): all categories, families and artifact roles, including implementation-only evidence.
- [Scope extension proposal](SCOPE_EXTENSION_PROPOSAL.md): five candidate new leaves, thirteen existing-leaf review copies, four folder clarifications and a future merge sequence.
- [Candidate evidence register](PROPOSED_EVIDENCE.md): pending source-to-scope decisions.
- [Proposal checks](PROPOSAL_CHECKS.md): coverage, draft parsing, links and canonical-source fingerprints.

The proposal retains the existing eleven top-level scopes. It does not change the canonical tree or generated catalog.

## Reusable capability inventory

[BEHAVIORS.survey.md](BEHAVIORS.survey.md) completes Step 8 with a calibrated,
source-based review of all 39 family subcategories and direct package artifacts.
It records 40 capability observations, including contextual integrations, and
separates modal interaction, internal scrolling, background scroll locking,
scroll-driven overlay response and disclosure. These secondary relationships do
not change the primary inventory or adopt new taxonomy categories.

[Research checks](BEHAVIOR_RESEARCH_CHECKS.md) record evidence and limitations.
Tests were read, not executed. Step 8 checks are a historical research snapshot;
current mapping/proposal validation is recorded below.

## Completed behavior mapping and proposal

- [Behavior mapping](BEHAVIOR_MAPPING.md): all 40 observations and 39 families, including explicit reuse, enhancements, new leaves, deferred candidates and structural decisions.
- [Behavior review](BEHAVIOR_REVIEW.md): modal dialog, modal sheet, overflowing content and collapsible-panel compositions; ownership rules and deferred merge decisions.
- New behavior candidates: [Modal interaction](proposed-scopes/Behaviors/modal_interaction.scope.md), [Scrollable](proposed-scopes/Behaviors/scrollable.scope.md), and [Scroll lock](proposed-scopes/Behaviors/scroll_lock.scope.md).
- [Updated validation](PROPOSAL_CHECKS.md): all 18 leaf review copies plus the Behaviors parent index, mapping/evidence coverage and preservation of canonical sources.

The proposal retains 11 existing roots and introduces no canonical category or
subcategory folder. Potential behavior subcategories were evaluated and deferred.
Research completion does not make the pending reference, event, coordination or
object-family contracts executable or approved for merge.
