# Changelog

This file records user-visible changes to the OpenUI specification and its
published packages.

## [0.11.1] - 2026-10-01

### Schema-backed validation

- The Python and TypeScript OpenUI JSON packages now validate the grammar with
  the bundled `openui.schema.json`. JSON decoding continues to report malformed
  JSON and duplicate members; all other grammar diagnostics are mapped from
  schema results.

## [0.11.0] - 2026-09-29

### Scope contracts

- Expandable panels: in an accordion, at most one panel MUST be expanded at a
  time; expanding one panel collapses the others. The new `uses.multi`
  (boolean) says whether more than one panel may be expanded; in an accordion it
  is `false`.
- Dashboard, Empty page and Report no longer say that their content needs an
  owner decision. A dashboard's cards, metrics, charts and actions and a
  report's tables, grids and charts are existing objects composed as children.
  The Empty page owns no children, as its Purpose states.
- Undeclared attributes and children beyond a Child model stay allowed: a
  contract is not an allowlist (glossary, Object; spec part 4.6).
- Spec part 4.8: the npm and PyPI packages take the spec's version; a change
  to a package alone takes a patch release, `0.x.y` (owner decision,
  2026-09-29).

### Worked examples and fixtures

- Attributes that a contract declares under another name are renamed:
  - Action controls: `text` and `produces.click` (and `produces.loadMore`)
    become `uses.label` and `produces.activate`.
  - Chart: `uses.chartType` becomes `uses.kind` (`bar` is `comparison`) and
    `uses.ariaLabel` becomes `uses.title`.
  - Data grid: `uses.sortable` becomes `behaves.sort`.
  - Link and scroll controls: `uses.target` becomes `uses.href`.
  - List: `uses.filter` and `uses.sort` become `behaves.filter` and
    `behaves.sort`; Table: `uses.sort` becomes `behaves.sort`.
  - Status indicator: `uses.state` `loading` becomes `uses.mode`
    `indeterminate`.
  - Stepper: `produces.stepChange` and `produces.completed` become
    `produces.selectionChange` and `produces.complete`.
  - Structural containers: `uses.label` becomes `uses.ariaLabel`; Surface
    containers: `uses.label` becomes `uses.title`.
- Required children that were missing are added: the `summary` of Expandable
  panels, the pane `section` of Splitters and the content `section` of a
  Dialog.
- No attribute or child is removed.

### Tools

- `python -m spec.bin.migrate` also renames these attributes and adds missing
  required children in worked examples (`*.example.json`).
  `tests/test_example_contracts.py` checks every example and input fixture: a
  declared attribute has its declared type, element references resolve to the
  declared type, and required children are present.
- The Angular generator reads the label and result of a dialog action from
  `uses.label` and `produces.activate`.

### Upgrading to 0.11.0

1. Upgrade the Python or npm package to `0.11.0` and set concrete document
   `version` fields to `0.11.0`.
2. Rename the attributes listed above in your documents and add missing
   required children. For a worked example (`*.example.json`),
   `python -m spec.bin.migrate <file or folder>` does both.
3. For the Angular generator, give each dialog action `uses.label` and
   `produces.activate` instead of `text` and `produces.click`.

## [0.10.0] - 2026-09-29

### Leaf scope contracts

- 33 leaf scopes gained typed Attributes or a Child model, taken from the four
  survey inventories (HTML, Angular Material, OpenUI5, Qt) and the alias table.
  For example: label, value, bounds and selection mode of the Controls
  families; open state, anchor and placement of overlays; the selected tab;
  row selection and column resizing of Data grid; the options of Choice
  controls, the panes and handles of Splitters and the caption and header rows
  of Table.
- Chart has a kind (comparison, trend, composition, distribution,
  relationship, hierarchy, network or flow), a data series, a title, a legend
  and annotations. Feedback widgets and Status indicator have a severity
  (none, information, success, warning or error). Action controls have a
  pressed state and repeat while pressed (`uses.autoRepeat`).
- The Behaviors scopes have attribute names beyond `uses.target`, such as the
  trigger and expanded state of Collapsible, the drop effect of Drag and drop,
  the suggestions and pattern of Input assistance, the initial focus and
  dismissal of Modal overlay and the scroll and focus actions of Viewport and
  focus control.
- Leaves with no supported attributes or children leave the section out, as
  the leaf template allows.

### Evidence

- Every evidence row cites the survey rows that justify its leaf.

### Worked examples

- The Overlay containers example and the Containers example contain the
  `helpButton` that their `uses.anchor` reference names.

### Upgrading to 0.10.0

1. Upgrade the Python or npm package to `0.10.0` and set concrete document
   `version` fields to `0.10.0`.
2. Check the values of the newly declared attributes: a literal value must fit
   its declared type, and a literal element reference must name an element of
   the same document.

## [0.9.0] - 2026-09-29

### Specification text

- `spec/README.md` follows the numbered outline: 1 Introduction and scope,
  2 Conformance, 3 Terminology, 4 Document model and language, 5 Categories
  and objects, 6 Catalog, and Annexes A–C. Every section heading is numbered,
  so the section anchors changed (for example `#value-types` is now
  `#46-value-types`). No file moved.
- Part 2 names what conforms: a concrete UI document, the catalog and a
  validator.
- Each rule is written once. The attribute categories, the object
  serialization rules and the scope and instance representation are no longer
  repeated in `spec/scopes/scope.md`; it links parts 4 and 6 instead. The
  README links the folder convention of `spec/scopes/scope.md`, and its object
  table leaves the descriptions to the folder `scope.md` files.
- Stale text is removed: the Angular `[name]` / `(name)` note (the Angular
  mapping is now in the generator's `GENERATION.md`), the sentence that
  attribute names follow the target framework's naming, the note that contract
  validation is not specified yet, and the Angular-flavoured app.json example
  (the worked examples of Annex C replace it).
- Requirements in normative parts are written with BCP 14 keywords in capitals:
  the README, the conformance suite, the scopes index and glossary, the leaf
  template and the taxonomy documents.

### Upgrading to 0.9.0

1. Upgrade the Python or npm package to `0.9.0` and set concrete document
   `version` fields to `0.9.0`.
2. Update links to `spec/README.md` sections to the numbered anchors, for
   example `#specification-artifacts-grammar-vs-catalog` to
   `#41-specification-artifacts`, and links to
   `spec/scopes/scope.md#attribute-categories` to
   `spec/README.md#45-attributes-and-their-categories`.

## [0.8.0] - 2026-09-29

### Scope

- `spec/README.md` has a new Scope section. It defines out of scope (not
  addressed) and deferred (a later edition may address it), and lists what is
  in scope, out of scope and deferred. Every catalog object is in scope.
- Generators, browser and framework machinery, platform prompts,
  implementation techniques, data that is not UI and immersive views are out of
  scope. Host-shell presence, docking, multiple-document workspaces, the
  Accessibility and Composition top-level scopes, ruby annotation, duration
  selection and index navigation are deferred.

### Specification structure

- `spec/README.md` has a numbered Outline: six parts (introduction and scope,
  conformance, terminology, document model and language, categories and
  objects, catalog) and three annexes (grammar, survey mapping, examples). The
  documentation site navigation follows it. No file moved.
- A new Conformance section defines the requirement keywords by BCP 14
  (RFC 2119, RFC 8174): they apply only in capitals and only in normative parts.
  It marks each part normative or informative; the survey mapping, the examples
  and the tooling are informative.
- Generator content moved out of `spec/README.md`. The Incremental generation
  section (its scenarios and algorithm) and the list of how generators use the
  grammar, the schema and the catalog are now in
  `generators/angular/generator/docs/GENERATION.md#incremental-generation`.

### Categorization

- The taxonomy mapping has a new section, Primary categories of the leaf
  scopes. Each leaf scope with taxonomy entries has one primary section and
  subcategory, chosen by three stated rules, and lists its secondary roles.
  favicon.ico, index.html and Native have no taxonomy entry and are not placed.
- No scope folder or leaf moved: the taxonomy and the scope tree stay linked
  views, and every scope id, type and path is unchanged.
- New interactive taxonomy tree, `spec/taxonomy/taxonomy-tree.html`, generated
  from the taxonomy mapping by `python -m spec.bin.render_taxonomy_tree`. The
  four alias columns are a per-source name overlay. A pre-commit check keeps it
  up to date.

### Documentation

- `docs/REQUIREMENTS.md` now states only what the solution needs from the
  specification and links to it, instead of repeating spec rules.

### Upgrading to 0.8.0

1. Upgrade the Python or npm package to `0.8.0` and set concrete document
   `version` fields to `0.8.0`.
2. Change links to `spec/README.md#incremental-generation` to
   `generators/angular/generator/docs/GENERATION.md#incremental-generation`.

## [0.7.0] - 2026-09-29

### Scope Purposes

- The Purposes now name four approved terms: Menu item (Menu widgets),
  Captions (Media widgets), Tree (List) and Tree grid (Data grid).

### Alias table

- The taxonomy mapping has four new columns: HTML / WAI-ARIA, OpenUI5, Qt and
  Angular Material. They give the names each source uses for every entry, or
  "—" where a source has none. The HTML and WAI-ARIA names that sat in the
  mapping notes moved into them.
- Every OpenUI5 class of the survey is matched to one taxonomy entry, or listed
  as fitting none with the reason.

### Examples

- Every Alias and Grouped leaf addition of the terminology, the taxonomy
  mapping change and the UI element taxonomy merge has a node in its scope's
  example. The node id comes from the term (for example `highlightedText`),
  and its type is the scope's catalog type. The nodes carry no new attributes:
  attribute names for the new capabilities wait on a later release.
- In the Input assistance, Viewport and focus control and Modal overlay
  examples, the nodes `emailCompletion`, `messageLogScrolling` and
  `confirmDeleteModality` are renamed `textCompletion`, `viewportScrolling`
  and `modalInteraction`.
- The Date/time pickers example binds a range with `uses.start`, `uses.end`
  and `produces.dateChange`. It no longer uses single-value binding,
  value-format or Angular-only attributes, as its Validation notes require.
- The Dialog example handles a cancellation request with `produces.cancel`,
  apart from `produces.close`.

### Example tests

- A new test checks that every Alias and Grouped leaf addition is shown in its
  scope's example, and that the `generated-examples` app shows each such node
  as written.
- The taxonomy mapping test checks that every row has the four alias columns.

### Generated examples app

- The app shows each new example node on the Examples tab of its component,
  as a Material card with the node's JSON as its source. New Controls,
  Widgets, Containers and Behaviors components hold the nodes that no existing
  component covers. New screenshots are `example-11-*-examples.png`.

### Upgrading to 0.7.0

1. Upgrade the Python or npm package to `0.7.0` and set concrete document
   `version` fields to `0.7.0`.
2. If you reference the renamed example node ids, use the new ids.

## [0.6.0] - 2026-09-29

### Typed attributes

- Attribute keys carry their category in a framework-neutral form:
  `uses.name`, `produces.name` and `behaves.name` replace `[name]` and
  `(name)`. A key without a prefix still carries no category.
- Attribute values are typed: a string, number, `true`, `false`, `null`, or a
  list of these. A literal string stays quoted inside the string
  (`"\"Orders\""`); an unquoted string stays a binding or target-language
  expression. `null` still means present without a value.
- Every Uses attribute declares a value type in its scope's Attributes line:
  `string`, `boolean`, `integer`, `number`, `url`, `enum(a|b)`, `reference`,
  `reference(Type)` or `list(type)`. The catalog carries the type as the
  attribute's value.
- Element references keep their quoted-id form and are now typed, so tools
  resolve them and check the referenced type.
- The spec README has a Versioning section: a document declares the spec
  version it is written for, and a tool accepts only the version it implements.
- The decisions and their sources are in
  `spec/survey/language_change.done.md`.

### Conformance suite and utilities

- New shared conformance suite in `spec/conformance/`: valid documents,
  invalid documents and the diagnostics a tool must report for each, in four
  stages (grammar, document, catalog, contract).
- New Python API `bin.openui_document` and TypeScript API in
  `@shlomoa/openui-spec`: `parse`, `validate`, `validate_text` /
  `validateText` and `Catalog`, with a typed `Document`, `Element` and
  `Attribute` model. Both pass the suite with identical diagnostics, and
  `OpenUiJson.validate()` and both CLIs use them.
- New tool `python -m spec.bin.migrate` converts 0.5 documents to the typed
  form. The worked examples and generator fixtures were regenerated with it.
- New demo page `spec/playground.html`: paste a document, see its diagnostics
  and element tree.

### Upgrading to 0.6.0

1. Upgrade the Python or npm package to `0.6.0`.
2. Run `python -m spec.bin.migrate <folder or file>` on your documents, then
   set their `version` fields to `0.6.0`.
3. Code that reads `[name]` or `(name)` keys reads `uses.name`,
   `produces.name` or `behaves.name` instead, and accepts non-string values.

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
[0.6.0]: https://github.com/shlomoa/openui-spec/compare/v0.5.0...v0.6.0
[0.7.0]: https://github.com/shlomoa/openui-spec/compare/v0.6.0...v0.7.0
[0.8.0]: https://github.com/shlomoa/openui-spec/compare/v0.7.0...v0.8.0
[0.9.0]: https://github.com/shlomoa/openui-spec/compare/v0.8.0...v0.9.0
[0.10.0]: https://github.com/shlomoa/openui-spec/compare/v0.9.0...v0.10.0
[0.11.0]: https://github.com/shlomoa/openui-spec/compare/v0.10.0...v0.11.0
[0.11.1]: https://github.com/shlomoa/openui-spec/compare/v0.11.0...v0.11.1
