# OpenUI5 survey: scopes proposal

[Survey README](README.md) · Source: [\_taxonomy_findings.md](inventory/_taxonomy_findings.md)

Status: proposals for review. None has been applied to the scope tree or the taxonomy
mapping. Cluster membership is in `inventory/_raw/phaseB_leftover_pool.json` (the
`b6_cluster` field).

The 257 unmatched but related classes form 11 clusters:

| Cluster                                                                                                                                            | Placement                       | Kind             | Classes | Standalone / Host-bound |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------------- | ------: | ----------------------- |
| [Shell bar / App shell](inventory/_taxonomy_findings.md#application--shell-bar--app-shell-new-sub-category)                                        | Application                     | New subcategory  |      20 | Standalone              |
| [Flexible column layout](inventory/_taxonomy_findings.md#containers--flexible-column-layout-new-sub-category)                                      | Containers                      | New subcategory  |       5 | Standalone              |
| [Tile](inventory/_taxonomy_findings.md#containers-surface-containers-alias--tile-named-variant-not-a-new-sub-category)                             | Containers (Surface containers) | Named variant    |      13 | Standalone              |
| [Metadata-driven field](inventory/_taxonomy_findings.md#controls-text-inputs-alias--metadata-driven-field-alias-level-note-not-a-new-sub-category) | Controls (Text inputs)          | Alias-level note |       9 | n/a                     |
| [Semantic / Object page](inventory/_taxonomy_findings.md#pages--semantic--object-page-new-sub-category)                                            | Pages                           | New subcategory  |      30 | Standalone              |
| [Cards](inventory/_taxonomy_findings.md#widgets--cards-new-sub-category)                                                                           | Widgets                         | New subcategory  |      68 | Standalone              |
| [Filter bar](inventory/_taxonomy_findings.md#widgets--filter-bar-new-sub-category)                                                                 | Widgets                         | New subcategory  |      22 | Host-bound (controls)   |
| [Value help](inventory/_taxonomy_findings.md#widgets--value-help-new-sub-category)                                                                 | Widgets                         | New subcategory  |      21 | Host-bound (supplies)   |
| [Personalization (P13n) panels](inventory/_taxonomy_findings.md#widgets--personalization-p13n-panels-new-sub-category)                             | Widgets                         | New subcategory  |      47 | Host-bound (controls)   |
| [File upload](inventory/_taxonomy_findings.md#widgets--file-upload-new-sub-category)                                                               | Widgets                         | New subcategory  |      15 | Standalone              |
| [Scheduling / Planning calendar](inventory/_taxonomy_findings.md#widgets--scheduling--planning-calendar-new-sub-category)                          | Widgets                         | New subcategory  |       7 | Standalone              |

The survey proposes subcategories, not leaf contracts. It supplies no scope drafts,
attributes or child models; these would be written during the specification work.

## Overlaps with other surveys

- **Cards** must be reconciled with the canonical Card → Surface containers mapping and
  with Angular Material AM-E08 (card composition).
- **File upload** relates to the Qt and Angular Material file-picker enhancements to
  Picker control.
- **Value help** relates to Qt P03 Text completion and Angular Material AM-E01
  (suggestion-backed choice).
- **Shell bar / App shell** relates to the Qt conditional host-integration branch.

Reconciliation into one accept, defer or reject list is plan task 6.
