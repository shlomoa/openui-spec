# Changelog

This file records user-visible changes to the OpenUI specification and its
published packages.

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
