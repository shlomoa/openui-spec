# Angular Material survey taxonomy

Status: Step 4 complete for the agreed file/folder/export scope.

## Classification policy

The top-level categories below are survey-defined interpretations. They are not
claimed to be official Angular Material navigation categories or normative OpenUI
terms. Upstream component/family identities are preserved as subcategory names,
using their release source directories and overview documents as evidence.

The live catalog is a navigation source, not a fixed-version taxonomy snapshot.
Historical site groupings from older major versions were not imported into this
release survey. Explicit survey categories also cover shared infrastructure,
tooling, and packaging, which are not rendered components.

Primary ownership follows the source family. Runtime behavior, styles, tests,
documentation, and build files remain with that family. Shared core files receive
one primary assignment in Shared foundations, even when used by many families.
Published export declarations follow their family; package-wide and stylesheet
exports belong to Package and style distribution.

Direct tables contain family-root folders and non-testing export declarations;
the distribution category also contains package-root source files. Subcategory
tables contain the remaining objects, grouped by artifact role. A source file
appears exactly once in the full set of category tables.

## Category definitions and family ownership

### Actions and triggers

Controls that initiate actions or retain a pressed selection state.

[Category file](Actions-and-triggers.survey.md): 62 objects.

- `button`: Action control. Performs an action through a native button or navigation through a styled anchor; supports several visual appearances.
- `button-toggle`: Toggle action. Represents a pressed or unpressed option, with grouped exclusive or multiple selection.

### Data entry

Controls for entering, choosing, and validating values.

[Category file](Data-entry.survey.md): 398 objects.

- `autocomplete`: Suggested text input. Adds selectable suggestions to a text input using an attached options panel.
- `checkbox`: Multiple-choice toggle. Captures checked, unchecked, or indeterminate state with an associated label.
- `chips`: Token collection. Displays compact tokens for information, selection, filtering, or data entry, with container-specific interaction modes.
- `datepicker`: Calendar date input. Combines typed date entry with calendar selection and date or date-range controls.
- `form-field`: Labeled field container. Wraps a value control with shared label, hint, error, prefix, suffix, and field presentation.
- `input`: Text entry adapter. Integrates native input and textarea elements with a labeled field container.
- `radio`: Exclusive-choice control. Selects one option from a named set of choices.
- `select`: Option selector. Chooses values from an option panel and integrates with field and forms infrastructure.
- `slide-toggle`: Binary switch. Captures an on or off value using a switch interaction without a checkbox-style indeterminate state.
- `slider`: Range value selector. Selects numeric values within configured limits using pointer or keyboard interaction.
- `timepicker`: Time input. Sets the time portion of a date through typed input or a menu of predefined times.

### Navigation and workflow

Navigation surfaces, view selection, and staged user workflows.

[Category file](Navigation-and-workflow.survey.md): 177 objects.

- `menu`: Command menu. Opens a panel of options through a trigger, including nested menus.
- `sidenav`: Side content panel. Arranges collapsible side content beside a main content area; navigation is one possible use.
- `stepper`: Staged workflow. Divides a workflow into selectable steps with step headers and progression behavior.
- `tabs`: Tabbed view selector. Selects one content view through a tab header and supports tab-based navigation.
- `toolbar`: Header action container. Groups application titles and actions in one or more header rows.

### Layout and containers

Content grouping, separation, disclosure, and spatial arrangement.

[Category file](Layout-and-containers.survey.md): 111 objects.

- `card`: Content card. Groups content about one subject with optional title, media, and action sections.
- `divider`: Visual separator. Separates content using a horizontal or vertical line.
- `expansion`: Disclosure panel. Pairs a summary header with content that can be expanded or collapsed.
- `grid-list`: Tiled layout. Arranges tiles in a grid with configured columns, sizes, and spacing.

### Data presentation

Item collections, hierarchies, and tabular presentation with paging and sorting controls.

[Category file](Data-presentation.survey.md): 153 objects.

- `list`: Item list. Presents items in list, navigation, action, and selection variants.
- `paginator`: Page navigator. Controls the current page and page size for a larger collection.
- `sort`: Sort controller. Maintains sort state and exposes interactive sort headers; consumers apply the resulting ordering.
- `table`: Data table. Renders rows and columns over the underlying table infrastructure, with separate data-source support.
- `tree`: Hierarchy view. Presents parent-child data through tree nodes and expansion controls.

### Feedback and overlays

Status, progress, transient messages, contextual help, and overlay interaction surfaces.

[Category file](Feedback-and-overlays.survey.md): 179 objects.

- `badge`: Status annotation. Adds a small text or numeric status marker near a host element.
- `bottom-sheet`: Bottom overlay panel. Opens an interaction panel at the lower edge of the viewport.
- `dialog`: Modal interaction window. Opens component or template content in a dialog with configurable lifecycle and interaction behavior.
- `progress-bar`: Linear progress indicator. Communicates activity through a horizontal indicator with determinate, indeterminate, buffer, and query modes.
- `progress-spinner`: Circular progress indicator. Communicates known or ongoing activity through a circular indicator.
- `snack-bar`: Transient notification. Displays a temporary notification using message text or custom content.
- `tooltip`: Contextual text hint. Shows a short label associated with a host element during relevant user interactions.

### Icons and graphics

Vector icon display and icon resource management.

[Category file](Icons-and-graphics.survey.md): 25 objects.

- `icon`: Vector icon. Displays icon-font or SVG graphics, with registry support for named icon resources.

### Shared foundations

Reusable behavior, date abstractions, options, interaction effects, theme infrastructure, and internal test utilities.

[Category file](Shared-foundations.survey.md): 206 objects.

- `core`: Shared control foundation. Provides behavior, date, option, selection, ripple, style, and theme facilities shared by component families.
- `testing`: Internal test support. Shares Material-specific test helpers; its README explicitly states this is not a published entry point.

### Development tooling

Installation, application scaffolding, theme generation, and upgrade transformations.

[Category file](Development-tooling.survey.md): 121 objects.

- `schematics`: Project transformation tools. Installs dependencies and configuration, creates starter components and themes, and supports version migrations.

### Package and style distribution

Package-wide exports, compilation metadata, and published style assets.

[Category file](Package-and-style-distribution.survey.md): 22 objects.

- `prebuilt-themes`: Packaged theme styles. Places generated theme CSS at the published package paths through build copy rules.
- Package root: manifests, exports, root styles, compiler configuration, and release assembly.

## Artifact-role subcategories

- Published entries: declarations from the versioned npm export map.
- Folders: tracked source containers, including generator placeholder paths.
- Runtime declarations: components, directives, services, contracts, and helpers.
- Internal support: base and private infrastructure serving a family.
- Integration modules: import/export groupings used to integrate controls.
- Export surfaces: source barrels; an export here does not prove public package accessibility.
- Content templates: internal rendered-view definitions.
- Styles and tokens: Sass presentation, theme adapters, token definitions, and presets.
- Test drivers: harnesses, harness filters, and test host components.
- Test fixtures: reusable test data, separate from runtime assets.
- Behavior tests: test suites and compilation test stylesheets.
- Documentation: release overviews, pointers, provenance, and migration notes.
- Configuration: manifests, schemas, and compiler or generator settings.
- Project transformations: installation, generation, migration, and transformation helpers.
- Generation templates: files instantiated into a consumer application.
- Documentation assets: supporting images and diagrams.
- Build tooling: package, compilation, asset, test, and documentation build definitions.

Role headings are organizational facets, not additional inventory objects.

## Cross-category decisions

- Buttons on anchors keep navigation semantics; their implementation remains in
  Actions and triggers. Toggle buttons also represent selection.
- Chips span display, filtering, selection, and entry; their primary family
  ownership is Data entry, with those other uses retained in descriptions.
- Lists include navigation and selection variants but remain Data presentation.
- Paginator and Sort control data presentation rather than application routing.
- Sidenav may contain arbitrary side content; Navigation and workflow reflects
  its common coordination role, not a restriction on allowed content.
- Stepper is a staged workflow; Tabs select views. Both remain Navigation and workflow.
- Dialog and Bottom sheet support actions as well as feedback; their overlay
  lifecycle places them in Feedback and overlays.
- Core ripple, option, and theme facilities remain Shared foundations; family
  uses are relationships rather than duplicate classifications.

No object is left without a primary assignment. These interpretations can be
revised without changing the source inventory. The two broken legacy theme
export targets are evidence gaps in the package contract, not taxonomy gaps.
