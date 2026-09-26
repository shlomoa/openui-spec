# Angular Material survey: summary

[Survey README](README.md) · [Plan](PLAN.md)

## Baseline and scope

- **Source:** `@angular/material` 22.1.7 at commit
  `e950f29dcfbda93c13bff0d1a632465364488249`. Descriptions use the release-pinned source
  and documentation; live API pages are navigation aids only. See
  [BASELINE.md](inventory/BASELINE.md).
- **Surveyed:** every tracked file and folder under `src/material/`, plus all published
  export declarations.
- **Not surveyed:** CDK internals, sibling adapter packages, external examples and the
  documentation application. This is a file, folder and export survey, not a complete
  symbol or member audit.

## Steps

1. Pinned the release and inventoried every object.
2. Classified each object once, into 10 categories and 39 component families.
3. Described every object and verified hashes, links and counts.
4. Mapped the families to OpenUI scopes.
5. Researched reusable capabilities (behaviors) across all families, mapped them, and
   revised the scope proposal.
6. Reviewed composition scenarios and recorded deferred decisions.

See [PLAN.md](PLAN.md).

## Findings

- **Coverage:** 1,454 objects: 1,233 files, 135 folders and 86 export declarations. The
  final audit found zero missing, unexpected or duplicate objects. All 1,233 file
  hashes match their pinned Git blobs. See [category.md](category.md).
- **Upstream defect:** the `./theming` and `./_theming` export declarations point to a
  missing `./_theming.scss` file in the published package. See
  [opens.md](opens.md).
- **Taxonomy fit:** 37 of 39 families map to 29 OpenUI scopes. `testing` and
  `schematics` are implementation evidence only. See
  [taxonomy_mapping.md](taxonomy_mapping.md).
- **Capabilities:** 40 capability observations (B01–B40) are assigned across all 39
  families. Behaviors currently holds Drag and drop, Resizable and Collapsible; the
  evidence adds modal interaction, scrolling and scroll locking.

## Decisions and reasoning

- **Retain all eleven top-level scopes; no replacement tree.** Promoting Shared
  foundations, Development tooling or Package distribution would mix packaging with UI
  semantics. See [architecture_proposal.md](architecture_proposal.md).
- **Five new leaves, thirteen amendments and four folder clarifications.** See
  [scopes_proposal.md](scopes_proposal.md).
- **Survey categories stay research groupings.** They do not become canonical roots,
  and Angular selectors, providers, slots and events are not copied into the catalog.
- **Do not invent machine fields yet.** The new object-family leaves declare no
  attributes or children until neutral value and ownership decisions exist. See
  [openui_schema_proposal.md](openui_schema_proposal.md).
- **Reconcile across surveys.** The proposal records overlaps with Qt and OpenUI5 and
  asks for one amendment and one evidence row per canonical leaf.
