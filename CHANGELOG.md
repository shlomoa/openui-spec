# Changelog

This file records user-visible changes to the OpenUI specification and its
published packages.

## [0.5.0] - 2026-09-29

### Taxonomy documents

- The taxonomy documents stay part of the spec. They moved to a new
  `spec/taxonomy/` folder: the generic UI taxonomy, its generated HTML, the UI
  element taxonomy and the `images/` folder.
- Each taxonomy fact has one owner. The owner table is in
  `spec/scopes/scope.md#taxonomy-documents`, and each taxonomy document says
  what it owns. The subcategory Holds rules and the entry-placement rules moved
  from the taxonomy mapping into the generic UI taxonomy.
- Removed duplicates and contradictions. Nine entry names now have one
  spelling in all documents. Mapping notes keep only scope-specific facts. The
  UI element taxonomy uses the generic taxonomy's names for the interaction
  groups. The View, Window, Tab, Date picker and Report descriptions now follow
  the glossary and the scope Purposes.
- The UI element taxonomy has a new "OpenUI term" column. The 60 approved
  terms that no abstract type reached now have a home: 40 on existing types and
  20 in 15 new abstract types.
- Added images for all 85 generic taxonomy entries that had none.

### Glossary

- The notes under Control, Element and Page are now headed "Same name,
  different meaning:". Each names the framework, its name, what it is there,
  then what OpenUI means. The meanings are unchanged.

### Tests

- The taxonomy tests are stricter. They compare the section, subcategory and
  exact name of every entry in the generic taxonomy and the mapping, in both
  directions. They check that each entry sits in one section and at most one
  subcategory, has an image or "Not applicable", and that every OpenUI term of
  the UI element taxonomy is in the mapping.

### Upgrading to 0.5.0

1. Upgrade the Python or npm package to `0.5.0` and set concrete document
   `version` fields to `0.5.0`.
2. Change links to `spec/generic-ui-taxonomy.md`,
   `spec/generic-ui-taxonomy.html`, `spec/ui-element-taxonomy.md` or
   `spec/images/` to the same files under `spec/taxonomy/`.

## [0.4.0] - 2026-09-29

### New Behaviors

- Added three Behaviors: Input assistance (text completion and constraint
  validation for any input control), Modal overlay (blocks interaction outside
  a referenced surface until its task completes or is dismissed), and Viewport
  and focus control (viewport scrolling, scroll lock, and focus management).
- Added the Controlled element and Controlling element glossary terms:
  a controlled element is named by an id reference and acted on without being
  owned by the element that acts on it.

### Behaviors contract restructuring (breaking)

- Drag and drop, Collapsible, and Resizable no longer own
  `targetPage`/`targetView`/`targetContainer`/`targetWidget` children. Each now
  declares a single `[target]` — Uses — attribute that references its
  [controlled element](spec/scopes/scope.md#controlled-element) by id, and
  none of the six Behaviors (including the three new ones above) declares a
  Child model.

### Specification documentation

- Applied the terminology changes approved in `spec/scopes/terminology.md`
  (moved from `spec/survey/`) to the glossary, the taxonomy mapping, and scope
  descriptions across Containers and Behaviors. No known object type or
  attribute was renamed; only vocabulary, aliases, and purpose text changed.
- Moved the generic UI taxonomy and its illustrations from `docs/` to `spec/`
  so the taxonomy is part of the published spec site, and restructured it into
  the approved sections and subcategories. `docs/ui-element-taxonomy.md` is
  removed; its content is superseded by the taxonomy mapping and the moved
  generic UI taxonomy.
- Moved the spec glossary from `spec/README.md` into a new Glossary section of
  `spec/scopes/scope.md`, together with the taxonomy abstraction levels from
  `spec/scopes/taxonomy_mapping.md` and the evidence source kinds from
  `spec/scopes/evidence.md`. Definitions are unchanged; the former locations
  now link to `spec/scopes/scope.md#glossary`, and links to
  `spec/README.md#glossary` and `spec/README.md#known-object-type` now point at
  `spec/scopes/scope.md`. The regenerated `spec/openui.json` differs only in the
  glossary link inside the `scopes` node `purpose` text; no object, type,
  attribute, or child changed.

### Validation tooling

- Moved the scope converter to `spec/bin/to_json/` (`python -m spec.bin.to_json`)
  and the grammar consistency check to `spec/bin/check_grammar_consistency/`
  (`python -m spec.bin.check_grammar_consistency`). The `spec/tooling/` folder
  now holds only the tooling guides.
- Added the `spec/bin/lint_spec.py` spec-content linter, run by pre-commit. It
  checks that every leaf scope has exactly one `evidence.md` row and can write an
  HTML report with `--html`. It also checks that every leaf scope has the
  `template.scope.md` sections in order (`template-sections`), and that glossary
  terms are defined once, only in `spec/scopes/scope.md#glossary`
  (`glossary-single-definition`).
- Added the `spec/bin/check_links.py` Markdown internal link checker, run by
  pre-commit, and fixed the broken internal links it found.
- The `openui-grammar-consistency` pre-commit hook now also runs when only scope
  sources or its tool code change.
- Fixed the `glossary-single-definition` lint rule to sort scanned Markdown
  paths by their POSIX-relative path instead of raw `Path` objects, which
  compare case-insensitively on Windows and case-sensitively on POSIX; finding
  order (and pass/fail on ties) no longer depends on the host OS.

### Upgrading to 0.4.0

1. Upgrade the Python or npm package to `0.4.0` and set concrete document
   `version` fields to `0.4.0`.
2. Replace any Drag and drop, Collapsible, or Resizable target-page, -view,
   -container, or -widget children with a single `[target]` Uses attribute
   naming the controlled element by id.
3. Adopt Input assistance, Modal overlay, or Viewport and focus control where
   applicable; each is attached the same way, with a `[target]` Uses attribute.

## [0.3.1] - 2026-09-25

### Fixed

- Aligned the Table worked example with its `table` contract: it now uses only
  the documented sorting, filtering, and pagination behaviors with `tr` row
  children.
- Added a contract test that prevents the Table worked example from drifting
  outside the table scope.

### Upgrading to 0.3.1

1. Upgrade the Python or npm package to `0.3.1` and set concrete document
   `version` fields to `0.3.1`.
2. Replace unsupported Table column, pagination, and empty-state children with
   the documented table behaviors and `tr` rows.

## [0.3.0] - 2026-09-24

### Added

- Defined generated contracts for application routes, navigation items and groups,
  toolbar rows, and toolbar actions.
- Defined route, navigation, and application-title ownership; same-document
  element references; and the `ToolBar` concrete type literal.
- Added application examples for the new contracts and updated the catalog to
  include their typed instances.

### Upgrading to 0.3.0

1. Upgrade the Python or npm package to `0.3.0` and set concrete document
   `version` fields to `0.3.0`.
2. Use `Route`, `NavItem`, `NavGroup`, `ToolBar`, `ToolBarRow`, and
   `ToolAction` exact type literals when adopting the new application routing,
   navigation, and command-surface contracts.
3. Represent same-document route and navigation relationships with quoted
   element-id values in the documented Uses attributes. The base validator does
   not resolve these references; target consumers must enforce the documented
   contract constraints.

## [0.2.0] - 2026-09-14

### Breaking changes

- Concrete OpenUI documents must use exact, case-sensitive `type` literals from
  the canonical `spec/openui.json` catalog at the root and for every descendant.
  Grammar-valid aliases, framework selectors, implementation identifiers,
  example-only pseudo-types, and names derived from catalog node IDs are no
  longer accepted as substitutes by the Angular generator.
- Catalog-backed Angular generator validation now requires the input document
  version to match the canonical catalog version, `0.2.0`.
- Generator diagnostics use the canonical “unknown OpenUI object type”
  terminology.

The catalog still contains the same 82 literal type values as the catalog
bundled with `v0.1.1`; this release changes how that vocabulary is interpreted
and enforced rather than adding or removing catalog types.

### Changed

- Defined a known object type as an exact catalog literal. An object's `type`
  identifies its semantic category, while `id`, `attrs`, and known-type
  `children` describe each concrete instance.
- Migrated all worked examples and Angular generator input fixtures to known
  semantic types and version `0.2.0`.
- Removed Angular generator compatibility aliases, pseudo-root exceptions,
  implicit native-type allowances, and ID-derived type names.
- Updated Angular manifestation classification to use known `widget` and `page`
  types. Dialog extraction now identifies composed regions through stable IDs
  and known semantic child types instead of pseudo-types.
- Aligned the `openui-spec` Python package, `@shlomoa/openui-spec` npm package,
  Angular generator package, canonical catalog, examples, fixtures, and
  lockfiles on version `0.2.0`.
- Aligned Read the Docs source-edit links with the repository's `main` branch
  and `spec/` documentation directory.

### Upgrade guidance

1. Upgrade the Python or npm package to `0.2.0` and set concrete document
   `version` fields to `0.2.0`.
2. Validate every `type` against the literal values in the bundled canonical
   catalog. Replace aliases, selectors, pseudo-types, and ID-derived names with
   the closest known semantic type.
3. Preserve instance distinctions in `id`, configuration in `attrs`, and
   composition in known-type `children`; keep target-framework selectors and
   class names as implementation details.
4. Run `openui_spec validate --input <document>` for the Python package or
   `ng-openui-spec validate --input <document>` for the npm package before
   regenerating downstream applications.

[0.2.0]: https://github.com/shlomoa/openui-spec/compare/v0.1.1...v0.2.0
[0.3.0]: https://github.com/shlomoa/openui-spec/compare/v0.2.0...v0.3.0
[0.3.1]: https://github.com/shlomoa/openui-spec/compare/v0.3.0...v0.3.1
[0.4.0]: https://github.com/shlomoa/openui-spec/compare/v0.3.1...v0.4.0
[0.5.0]: https://github.com/shlomoa/openui-spec/compare/v0.4.0...v0.5.0
