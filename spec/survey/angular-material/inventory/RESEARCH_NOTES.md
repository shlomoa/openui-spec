# Research findings for Steps 3–5

## Coverage and method

The research covers 1,454 objects at the fixed release baseline. The archive was
read without executing upstream code. Every tracked file was retrieved and its
Git blob hash checked against the untruncated source-tree response. All 1,232 text
files were processed for content evidence; the one PNG was also visually inspected.

Research combines automated extraction of declarations, methods/accessors, test
suite identities, Sass mixins/functions, template elements, JSON fields, and build
targets with agent review of family overviews, implementation roles, and unusual
cases. Category rows summarize file-level responsibility and observed declarations.
They do not claim a manual line-by-line audit, complete public API enumeration,
runtime correctness, accessibility certification, or executed tests.

The source-bound descriptions are in the [category files](README.md). Abstract
names and ownership decisions are interpretations documented in [the taxonomy](TAXONOMY.md).

## Package and source reconciliation

The source build catalog and published package both identify 36 non-root runtime
entry points and 37 testing entry points, including the nested
`form-field/testing/control` entry. The package root is an additional runtime
entry. The 86 export declarations also include style and metadata exports.

The source root runtime entry is intentionally minimal and contains a private
API-extraction workaround. It does not export the entire component library.
The `testing/` source README explicitly says that folder is not an entry point.
The nested schematic manifest sets CommonJS interpretation rather than defining
another independently published package.

Sources: [entry-point build catalog](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/config.bzl),
[runtime root](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/index.ts),
[internal testing note](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/testing/README.md),
[schematics manifest](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/schematics/package.json).

## Confirmed missing targets: legacy Sass aliases

The versioned package declares both `./theming` and `./_theming` with the target
`./_theming.scss`. That root file is absent from the pinned Material source tree
and from the downloaded `material-22.1.7.tgz` archive. The downloaded archive's
SHA-512 integrity was recomputed and matched the registry value in the baseline.

Both declarations remain counted and classified, but must not be presented as
verified usable imports. No upstream fix or issue submission was attempted.
This observation is scoped to package 22.1.7; other releases were not investigated.

All other concrete declared targets exist in that archive. The wildcard theme
export matches the eight concrete packaged theme styles. Package-target existence
does not prove runtime or Sass import behavior.

Evidence: [versioned metadata](https://registry.npmjs.org/@angular%2fmaterial/22.1.7),
[published archive](https://registry.npmjs.org/@angular/material/-/material-22.1.7.tgz).

## Generated and historical artifacts

The source `prebuilt-themes/` folder has a build file rather than eight checked-in
CSS files. The build rules place compiled theme styles at the published paths;
their source presets live under `core/theming/prebuilt/`. These source files,
build rules, and published entries are distinct inventory objects.

Source overviews are the release documentation baseline. Some short README files
point to older documentation route shapes; their presence is recorded without
using those routes as evidence for current behavior. Deprecated declarations and
migration notes are identified as historical or compatibility content, rather
than recommendations to adopt those APIs.

Sources: [theme distribution rules](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/prebuilt-themes/BUILD.bazel),
[theme source presets](https://github.com/angular/components/tree/e950f29dcfbda93c13bff0d1a632465364488249/src/material/core/theming/prebuilt).

## Dependencies and research boundaries

CDK imports were observed for accessibility, bidirectional layout, coercion,
collections, overlays/portals, dialog, scrolling, menus' keyboard support, tables,
trees, stepper, text fields, testing, schematics, and private helpers. They remain
dependencies rather than Material inventory entries. Their internals were not
recursively surveyed. Repository examples, external date-adapter packages, and
the documentation application are likewise outside the agreed source root.

## Remaining uncertainty and final disposition

- Zero unassigned objects within the agreed file/folder/export scope.
- Two declared Sass aliases have confirmed missing targets; their intended
  compatibility behavior remains unresolved upstream.
- Symbol/member-level coverage and supported-import behavior require separate
  work if desired; file-level descriptions do not substitute for that review.
- The live site's exact modified build source remains unestablished, as recorded
  in [the baseline](BASELINE.md). Claims here use the pinned source.
- Steps 6–7 consolidated this collection and completed final verification; see
  the [final report](FINAL_REPORT.md). The findings above do not leave inventory
  objects unclassified or prevent completion of the survey.

The collection preserves the research from Steps 3–5 and the final checks from
Steps 6–7. No upstream fix, issue submission, or normative specification change
was part of this survey.
