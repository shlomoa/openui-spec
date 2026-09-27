# POC validation evidence

Historical record of an earlier survey stage. See the [final report](FINAL_REPORT.md)
for completed coverage and current validation results.

- Completed (UTC): 2026-09-22 06:51:05.
- Measured interval since baseline timestamp: 6.44 minutes; includes permission waits.
- Object count: 12; unique primary assignments: 12.
- Inventory reconciliation: exact match between report inventory and category rows.
- Table schema: four nonempty cells in each object row.
- Source checks: 12 unique references, all HTTP 200 with nonempty responses.
  GitHub file references were checked through raw content at the identical commit
  and path; directory references through GitHub's contents API at that commit.
- Documentation basis: release-pinned source overview. Live-site version unverified.
- Local Markdown links, document titles, and whitespace: checked on pilot outputs.
- Configured markdownlint rules were inspected. No local markdownlint executable
  was available; the configured linter was not run. Targeted structural checks
  are recorded here rather than claiming a lint pass.
- Upstream unit tests and application behavior: not executed; this is a research
  artifact validation, not a component implementation certification.

## Verified source references

- [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/_button-theme.scss): HTTP 200 using the corresponding raw file, directory API, or registry URL.
- [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/BUILD.bazel): HTTP 200 using the corresponding raw file, directory API, or registry URL.
- [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button-module.ts): HTTP 200 using the corresponding raw file, directory API, or registry URL.
- [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.html): HTTP 200 using the corresponding raw file, directory API, or registry URL.
- [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.md): HTTP 200 using the corresponding raw file, directory API, or registry URL.
- [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.spec.ts): HTTP 200 using the corresponding raw file, directory API, or registry URL.
- [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/button.ts): HTTP 200 using the corresponding raw file, directory API, or registry URL.
- [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/index.ts): HTTP 200 using the corresponding raw file, directory API, or registry URL.
- [Source](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/testing/button-harness.ts): HTTP 200 using the corresponding raw file, directory API, or registry URL.
- [Source](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button): HTTP 200 using the corresponding raw file, directory API, or registry URL.
- [Source](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/button/testing): HTTP 200 using the corresponding raw file, directory API, or registry URL.
- [Source](https://registry.npmjs.org/@angular%2fmaterial/22.1.7): HTTP 200 using the corresponding raw file, directory API, or registry URL.
