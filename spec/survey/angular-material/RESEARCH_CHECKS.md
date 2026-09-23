# Verification during Steps 3–5

Historical record of an earlier survey stage. See the [final report](FINAL_REPORT.md)
for completed coverage and current validation results.

Checked at 2026-09-22T07:32:13+00:00.

## Executed checks

- Recursive Git tree: `truncated` is false; 1,233 blobs and 134 nested trees.
- Downloaded source archive: all 1,233 file Git blob hashes match the tree.
- Text research inputs: 1,232 UTF-8 files; one PNG examined separately and visually.
- Published archive: recomputed SHA-512 integrity matches versioned registry metadata.
- Export reconciliation: all 86 declarations included. Two legacy Sass aliases have
  missing targets; all other concrete targets exist. The stylesheet wildcard matches
  the eight concrete theme files.
- Category rows: 1,454; unique primary identities: 1,454; unassigned identities: zero.
- Inventory/category reconciliation: exact identity-set match.
- Object table shape: four nonempty fields per row, with source references.
- Pinned source URLs: 1368 unique references checked against the
  verified source-tree paths and commit. This is source-path verification, not
  1,368 separate HTTP requests.
- Draft whitespace check: passed.

## Limits

These checks support the requested inventory, classification, and research work.
They do not close Step 7's final acceptance gate. Upstream tests, generated-app
behavior, complete API compatibility, and live-documentation link availability
were not tested. The missing theme targets are reported findings, not silently
treated as passing exports.

## Markdown and local-link checks

- markdownlint-cli2 0.23.3 with markdownlint 0.41.1: the 15 new or expanded
  research drafts passed with zero issues using the repository configuration.
- Inventory identities, source references, table cells, and whitespace checks passed.
- Local Markdown links resolve within the complete survey collection.
- The final staged collection, including plan and index updates, passed with zero
  Markdown lint issues. Saved files were checked for byte-identical copying.

## Saved collection result

The saved collection passed markdownlint-cli2 0.23.3: 19 files, zero issues.
Saved-file reconciliation again confirmed 1,454 unique object rows, four populated
fields per row, and working local document links. The scoped Git whitespace check
also passed.

An earlier run from the repository root expanded through the configuration's
repository-wide glob and reported 980 issues across 48 files in the broader
collection. Those unrelated documents were not changed. Running from this survey
folder verified the intended 19-file scope without changing repository lint rules.
