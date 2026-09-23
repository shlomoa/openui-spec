# Angular Material POC report

Historical record of an earlier survey stage. See the [final report](FINAL_REPORT.md)
for completed coverage and current validation results.

## Verdict

**GO for the surveyed workflow, subject to review before expansion.** The bounded
sample can be inventoried, classified, described using abstract concepts, and
saved in the required Markdown structure with reproducible source links. This
proves viability for the sample; it does not establish full-catalog coverage or
that the same taxonomy will suit every component.

## Sample selection and inventory

Selected one Button family before detailed source reading: one library entry,
one family folder, one testing folder, and nine representative files. No sample
expansion or dependency recursion was needed. The preliminary directory listing
identified paths; it did not count every listed file as a surveyed object.

The exact inventory is:

1. `@angular/material/button`: verifies the published library entry level.
2. `src/material/button/`: verifies the family folder level.
3. `src/material/button/testing/`: verifies a nested support folder.
4. `src/material/button/index.ts`: verifies public export structure.
5. `src/material/button/button-module.ts`: verifies integration and dependencies.
6. `src/material/button/button.ts`: verifies component implementation.
7. `src/material/button/button.html`: verifies rendering structure.
8. `src/material/button/_button-theme.scss`: verifies styling and theme support.
9. `src/material/button/button.md`: verifies release-aligned usage documentation.
10. `src/material/button/button.spec.ts`: verifies behavior-test classification.
11. `src/material/button/testing/button-harness.ts`: verifies reusable test support.
12. `src/material/button/BUILD.bazel`: verifies build tooling classification.

Package metadata, release resolution, and directory listings are baseline evidence,
not additional surveyed objects. Findings and source links live in the single
[category file](Actions-and-triggers.survey.md); this inventory is a coverage list,
not a second set of authoritative descriptions.

## Method and findings

1. Resolved the release tag and commit from the official GitHub API, enumerated
   the Button directory, and selected the bounded sample.
2. Retrieved all nine selected files at that commit and inspected their roles.
   For the long test file, inspected test names separately after the initial
   combined output was truncated; no claim of exhaustive test-body review is made.
3. Checked the published package version and `./button` export independently.
4. Assigned primary categories and abstract names, then wrote the category file,
   index, this report, and validation evidence in the requested repository folder.
5. Checked inventory reconciliation, required fields, source references, and local
   links. See [validation evidence](VALIDATION.md) for executed checks.

The framework-independent vocabulary works for files as well as public controls
when descriptions explicitly identify supporting artifacts. Shared button and
anchor implementation requires preserving the distinction between actions and
navigation. File paths and public symbols must not silently become interchangeable
inventory units. A folder row must not imply recursive coverage.

## Pass criteria

- Sample is at most 12 objects: 12 selected.
- Each sampled object has one primary classification: 12 category rows.
- Every object row supplies the four required fields and supporting source links.
- Direct and subcategory tables are both populated: two direct rows, ten
  subcategory rows across six subcategories.
- Version is reproducible: package 22.1.7 and a fixed release commit; documentation
  is taken from the same commit.
- No unresolved classification or verification issue blocks the sample.
- Evidence and remaining limits are documented. No runtime tests are claimed.

## Effort and scaling risks

Timing begins at the first recorded baseline timestamp, 2026-09-22 06:44:39 UTC;
validation evidence records the end timestamp and elapsed minutes. It excludes
initial instruction review and release lookup before that timestamp and includes
writing, verification, and permission waits. This is a measured lower bound for
end-to-end pilot effort, not a per-object benchmark.

Manual analytical effort covered nine file-role assessments, three structural
object assessments, six subcategory definitions, and 12 abstract-name assignments.
Directory and file retrieval was batched; classification and evidence review were
performed by the agent. No human research-time measurement was taken.

Scaling risks include source/doc version drift, very large files, shared support
code with multiple consumers, ambiguous abstract names, and link-check volume.
A full survey should enumerate paths first, keep one fixed version, and reconcile
coverage in bounded batches. The pilot cannot justify a total-duration estimate
without measuring representative families and shared infrastructure.

## Untested areas and next gate

Other component families, complete Button-family coverage, core infrastructure,
CDK internals, schematics, cross-family relationships, exhaustive APIs, and runtime
behavior are untested. Existing OpenUI specification semantics were not changed.
Review the taxonomy and inventory granularity before accepting the POC and moving
to Step 2. The full survey has not begun.
