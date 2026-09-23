# Angular Material survey final report

Status: **Steps 6–7 completed; all seven survey steps complete.**

Final verification date: 2026-09-22T08:23:30+00:00.
Baseline: `@angular/material` 22.1.7 at commit
`e950f29dcfbda93c13bff0d1a632465364488249`.

The collection is complete for the agreed file/folder/export scope. The two
upstream Sass export-target discrepancies are documented findings, not hidden
omissions or unclassified objects. No upstream correction or normative OpenUI
change is implied by completing this survey.

## Step 6: consolidated Markdown collection

- [Index](README.md): scope, baseline policy, category links, counts, rules, and
  limitations in one entry point.
- [Inventory](INVENTORY.md): every scoped object, exact identity, kind, and source
  hash, with explicit exclusions.
- [Taxonomy](TAXONOMY.md): 10 categories, 39 family subcategories, role definitions,
  and rationale for cross-category choices.
- Ten category files: direct-object and subcategory tables with the required four
  fields. No source object is described in more than one primary row.
- [Research findings](RESEARCH_NOTES.md): package anomalies and research boundaries.
- [Plan](PLAN.md): all seven steps marked complete with result links.
- Earlier POC and research-check reports retain their historical results and now
  link here for current status.

Consolidation corrected a corrupted dash in the earlier verification report,
singular folder-count wording, and stale pending-step descriptions. The fixed
release, object identities, and category ownership did not change.

## Step 7: completeness and source checks

The final audit read the saved Markdown tables independently of the earlier row
generation data, then reconciled them against freshly fetched pinned Git tree and
versioned package metadata.

- Source tree: untruncated; 1,233 file blobs and 134 nested folders.
- Root-inclusive folders: 135.
- Published export declarations: 86.
- Total expected objects: **1,454**.
- Total unique primary rows: **1,454**.
- Missing objects, unexpected objects, and duplicate primary assignments: **zero**.
- Category summary counts and inventory hashes agree with the source evidence.
- All **421 object tables** use exactly the four required columns; every row has
  an object name, abstract name, description, and supporting source links.
- All **1,233 source-file contents** were rehashed and match their pinned Git blob
  identities. Folder links resolve to the corresponding tree entries.
- The published archive's recomputed SHA-512 integrity matches the registry value.
  Every concrete exported target exists except the two documented Sass aliases.
- **1,368 unique pinned source references** were checked against the verified
  commit and tree paths. Each source object links to its own file or folder;
  every export row links to the versioned package metadata.
- **52 other remote references** returned HTTP 200 with nonempty bodies; the
  individual checks are listed below. No unresolved HTTP failure remained.
- Local Markdown links resolve within the completed collection.
- Abstract-name screening found no Angular/Material/CDK-specific branding in the
  abstract-name column. Reviewed family/role terminology and cross-category
  rationale remain explicitly interpretive rather than normative vocabulary.
- Markdown formatting: markdownlint-cli2 0.23.3, using the unchanged repository
  configuration, passed for the complete 20-document survey collection.
- Scoped whitespace and UTF-8 checks passed after consolidation.

Path/hash checks provide source verification without issuing 1,368 redundant
GitHub page requests. HTTP 200 checks for the client-rendered documentation site
establish reachability, not rendered-route correctness or release equivalence.
The live pages are not the evidence for release-specific behavior claims.

## Documented limitations and acceptance decision

The `./theming` and `./_theming` export declarations both point to the missing
`./_theming.scss` target in the integrity-verified published package. They remain
visible in the [package category](Package-and-style-distribution.survey.md).
Their intended upstream compatibility behavior remains unresolved.

Research depth is artifact responsibility and selected declarations. Symbol/member
completeness, manual line-by-line review, upstream test execution, import execution,
accessibility certification, and dependencies outside the agreed source root are
not claimed. Source version pinning addresses the live documentation's modified
build uncertainty; it does not explain that deployment's local changes.

The earlier repository-wide lint attempt reported issues outside this survey.
Those documents were not changed; this final formatting result is scoped to the
20 survey documents. Runtime and generator tests were not applicable to these
documentation-only changes.

**Decision:** the collection satisfies the agreed survey deliverables and final
verification criteria with the above explicitly recorded upstream findings and
scope limits. No remaining action is required to finish Steps 6–7.

## Remote reference checks

Checked at 2026-09-22T08:18:49+00:00. Each result below had a nonempty response body.

- [Reference](https://api.github.com/repos/angular/components/commits/v22.1.7): HTTP 200.
- [Reference](https://api.github.com/repos/angular/components/compare/e950f29dcfbda93c13bff0d1a632465364488249...b713ca4a0ed7bd7eaa7a13f3013bac24f9c1f823): HTTP 200.
- [Reference](https://api.github.com/repos/angular/components/contents/src/material?ref=e950f29dcfbda93c13bff0d1a632465364488249): HTTP 200.
- [Reference](https://api.github.com/repos/angular/components/contents/src?ref=b713ca4a0ed7bd7eaa7a13f3013bac24f9c1f823): HTTP 200.
- [Reference](https://api.github.com/repos/angular/components/contents/src?ref=e950f29dcfbda93c13bff0d1a632465364488249): HTTP 200.
- [Reference](https://api.github.com/repos/angular/components/git/trees/53696d1f44e31eb811c303ba190b296d32399058?recursive=1): HTTP 200.
- [Reference](https://codeload.github.com/angular/components/tar.gz/e950f29dcfbda93c13bff0d1a632465364488249): HTTP 200.
- [Reference](https://github.com/angular/components/releases/tag/v22.1.7): HTTP 200.
- [Reference](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material): HTTP 200.
- [Reference](https://github.com/angular/components/tree/main/src/material): HTTP 200.
- [Reference](https://material.angular.dev/assets/versions.json): HTTP 200.
- [Reference](https://material.angular.dev/components/autocomplete/api): HTTP 200.
- [Reference](https://material.angular.dev/components/badge/api): HTTP 200.
- [Reference](https://material.angular.dev/components/bottom-sheet/api): HTTP 200.
- [Reference](https://material.angular.dev/components/button-toggle/api): HTTP 200.
- [Reference](https://material.angular.dev/components/button/api): HTTP 200.
- [Reference](https://material.angular.dev/components/card/api): HTTP 200.
- [Reference](https://material.angular.dev/components/categories): HTTP 200.
- [Reference](https://material.angular.dev/components/checkbox/api): HTTP 200.
- [Reference](https://material.angular.dev/components/chips/api): HTTP 200.
- [Reference](https://material.angular.dev/components/core/api): HTTP 200.
- [Reference](https://material.angular.dev/components/datepicker/api): HTTP 200.
- [Reference](https://material.angular.dev/components/dialog/api): HTTP 200.
- [Reference](https://material.angular.dev/components/divider/api): HTTP 200.
- [Reference](https://material.angular.dev/components/expansion/api): HTTP 200.
- [Reference](https://material.angular.dev/components/form-field/api): HTTP 200.
- [Reference](https://material.angular.dev/components/grid-list/api): HTTP 200.
- [Reference](https://material.angular.dev/components/icon/api): HTTP 200.
- [Reference](https://material.angular.dev/components/input/api): HTTP 200.
- [Reference](https://material.angular.dev/components/list/api): HTTP 200.
- [Reference](https://material.angular.dev/components/menu/api): HTTP 200.
- [Reference](https://material.angular.dev/components/paginator/api): HTTP 200.
- [Reference](https://material.angular.dev/components/progress-bar/api): HTTP 200.
- [Reference](https://material.angular.dev/components/progress-spinner/api): HTTP 200.
- [Reference](https://material.angular.dev/components/radio/api): HTTP 200.
- [Reference](https://material.angular.dev/components/select/api): HTTP 200.
- [Reference](https://material.angular.dev/components/sidenav/api): HTTP 200.
- [Reference](https://material.angular.dev/components/slide-toggle/api): HTTP 200.
- [Reference](https://material.angular.dev/components/slider/api): HTTP 200.
- [Reference](https://material.angular.dev/components/snack-bar/api): HTTP 200.
- [Reference](https://material.angular.dev/components/sort/api): HTTP 200.
- [Reference](https://material.angular.dev/components/stepper/api): HTTP 200.
- [Reference](https://material.angular.dev/components/table/api): HTTP 200.
- [Reference](https://material.angular.dev/components/tabs/api): HTTP 200.
- [Reference](https://material.angular.dev/components/timepicker/api): HTTP 200.
- [Reference](https://material.angular.dev/components/toolbar/api): HTTP 200.
- [Reference](https://material.angular.dev/components/tooltip/api): HTTP 200.
- [Reference](https://material.angular.dev/components/tree/api): HTTP 200.
- [Reference](https://material.angular.dev/main-YWKC3QTV.js): HTTP 200.
- [Reference](https://raw.githubusercontent.com/angular/components/e950f29dcfbda93c13bff0d1a632465364488249/src/material/package.json): HTTP 200.
- [Reference](https://registry.npmjs.org/@angular%2fmaterial/22.1.7): HTTP 200.
- [Reference](https://registry.npmjs.org/@angular/material/-/material-22.1.7.tgz): HTTP 200.
