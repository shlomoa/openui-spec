# Angular Material source baseline

Status: Step 2 completed on 2026-09-22. This is the authoritative baseline for
subsequent survey work. The Step 1 sample remains valid. Steps 3–7 have since
completed against this unchanged baseline; see the [final report](FINAL_REPORT.md).
The user's instruction to proceed to Step 2 accepted progression from the
POC, without implying that all later classifications are approved.

## Fixed release and source identity

- Research date: 2026-09-22; final remote verification at 06:55:04 UTC.
- Package: `@angular/material` version `22.1.7`.
- Release tag: `v22.1.7`.
- Survey source commit: `e950f29dcfbda93c13bff0d1a632465364488249`.
- Source commit committer timestamp: 2026-09-16 09:28:04 UTC.
- Source root: `src/material/` in the official `angular/components` repository.
- Source-root Git tree: `53696d1f44e31eb811c303ba190b296d32399058`.
- Published package metadata gitHead: `b713ca4a0ed7bd7eaa7a13f3013bac24f9c1f823`.
- Published archive integrity (registry-provided, not locally recomputed):
  `sha512-mpe0lL6eDlN5AuXY7CP29SfKey7nVuHp4YhQijaq9orRFwsP3fSGrMU9BJjIRDOLWc8Zg9v/oa85E1CjNebXGg==`.

Retain the POC release and commit so existing source links and later inventory
refer to one stable dataset. Do not automatically switch to `main`, `latest`, or a
newer release during the survey. Any baseline change requires an explicit record
and revalidation of existing findings.

Sources: [release](https://github.com/angular/components/releases/tag/v22.1.7),
[tag resolution](https://api.github.com/repos/angular/components/commits/v22.1.7),
[published package metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7),
[pinned source root](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material).

## Release tag versus published package

The npm gitHead differs from the release-tag commit. GitHub's comparison reports
one commit ahead and one behind, with a merge-base comparison listing root
`CHANGELOG.md` and `package.json` changes. That comparison alone does not prove
that the surveyed source is identical.

The stronger check is direct: querying `src/` at each commit returns the same
`src/material` tree SHA, `53696d1f44e31eb811c303ba190b296d32399058`.
Therefore the tracked Material subtree, including its nested source documentation,
is identical at these two commits. The survey keeps the release-tag commit for
links and records npm gitHead separately. This does not claim byte-for-byte
identity of the published archive with repository files or equivalence of other
subtrees.

The source package manifest contains `0.0.0-PLACEHOLDER`. It must not be reported
as the released package version; use the versioned registry metadata instead.

Evidence: [commit comparison](https://api.github.com/repos/angular/components/compare/e950f29dcfbda93c13bff0d1a632465364488249...b713ca4a0ed7bd7eaa7a13f3013bac24f9c1f823),
[release src directory](https://api.github.com/repos/angular/components/contents/src?ref=e950f29dcfbda93c13bff0d1a632465364488249),
[published gitHead src directory](https://api.github.com/repos/angular/components/contents/src?ref=b713ca4a0ed7bd7eaa7a13f3013bac24f9c1f823),
[source manifest](https://raw.githubusercontent.com/angular/components/e950f29dcfbda93c13bff0d1a632465364488249/src/material/package.json).

## Documentation baseline and differences

The starting point is the [official component catalog](https://material.angular.dev/components/categories).
The HTML response is an application shell; the web text reader returned no body
content. Source and deployment metadata supply the version evidence instead.

Observed deployment metadata on the research date:

- [Version selector data](https://material.angular.dev/assets/versions.json)
  labels the production site `22.1.7 (latest)`.
- The catalog HTML references [main-YWKC3QTV.js](https://material.angular.dev/main-YWKC3QTV.js).
- That bundle embeds `22.1.7+sha-377256d-with-local-changes` as the Material version.
  Its version-selector code extracts the version before the build metadata.

Thus the live site's advertised package version matches 22.1.7, but its build
identifier is not the survey commit and explicitly includes local changes. The
exact live documentation source commit and nature of those changes were not
established. Do not infer that the live rendered content equals the release source.
The deployment asset URL may change or disappear after redeployment; the values
above record the observation, not a permanent deployment guarantee.

Use overview Markdown and API declarations from the pinned `src/material/` tree
for authoritative descriptions. The [release Button overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.md)
illustrates the policy. Live overview/API pages remain useful navigation links;
any claim available only there must be marked as live-only and kept separate from
release-pinned facts. No content-level difference is asserted without comparison.

This resolves the pilot's previously unknown live-site version at the advertised
version level; the pilot reports remain historical records of Step 1 checks.

## Source-root inspection and next-step boundary

The pinned Material root was retrieved successfully and contains 45 direct entries.
It includes component families such as Button and Table, shared `core`, `testing`,
`schematics`, `prebuilt-themes`, and root packaging/build files. This inspection
establishes the source location; it is not the complete recursive inventory.

For Step 3, use this fixed `src/material/` subtree as the Material source baseline
and the versioned package exports as evidence for library entry identities.
Explicitly record inventory exclusions and reconcile source objects with published
entries there. Angular CDK, Angular framework internals, examples outside the root,
and documentation-site implementation are contextual sources, not silently added
Material inventory objects. Broader source roots or separate adapter packages must
be recorded as a scope addition before inventorying them.

Evidence: [root directory response](https://api.github.com/repos/angular/components/contents/src/material?ref=e950f29dcfbda93c13bff0d1a632465364488249).

## Validation and completion

- Release tag resolved to the recorded commit.
- Versioned registry metadata returned the expected package name and version.
- Material source-root existence and package manifest were verified.
- Both commit identities were checked against the Material subtree Git hash.
- Live catalog, version selector metadata, and referenced JavaScript bundle were
  fetched successfully; their version differences are documented above.
- Existing POC source links retain the same release commit.
- Local document links and whitespace were checked after writing.
- The Markdown linter was unavailable in the pilot environment; no lint pass or
  runtime test result is claimed for this documentation-only step.

This document records Step 2. Later steps completed the inventory, category
research, and final verification against this unchanged baseline.
