# Qt Widgets UI Component Catalog

This catalog describes **94 UI components and supporting concepts** across **9 categories and 27 subcategories**, with **99 Qt names** linking the concepts to official documentation.

Every full description explains **what the component does, how it looks, what it contains, and how it behaves**. Abstract names are framework-independent; Qt names identify the reference implementations.

## Browse the catalog

- [Commands](categories/commands/README.md) — 7 entries.
  - [Action buttons](categories/commands/action-buttons.md)
  - [Command collections](categories/commands/command-collections.md)
  - [Action history](categories/commands/action-history.md)
- [Input and selection](categories/input-and-selection/README.md) — 18 entries.
  - [Text and shortcuts](categories/input-and-selection/text-and-shortcuts.md)
  - [Choices](categories/input-and-selection/choices.md)
  - [Numeric values](categories/input-and-selection/numeric-values.md)
  - [Dates and times](categories/input-and-selection/dates-and-times.md)
- [Content and data presentation](categories/content-and-data/README.md) — 8 entries.
  - [Text images and numbers](categories/content-and-data/text-images-and-numbers.md)
  - [Collections and hierarchies](categories/content-and-data/collections-and-hierarchies.md)
  - [Collection headers](categories/content-and-data/collection-headers.md)
- [Page navigation and scrolling](categories/navigation/README.md) — 7 entries.
  - [Page switching](categories/navigation/page-switching.md)
  - [Scrolling](categories/navigation/scrolling.md)
- [Containers and layout](categories/containers-and-layout/README.md) — 10 entries.
  - [Visual grouping](categories/containers-and-layout/visual-grouping.md)
  - [Adjustable panes](categories/containers-and-layout/adjustable-panes.md)
  - [Arrangement and spacing](categories/containers-and-layout/arrangement-and-spacing.md)
- [Windows and dialogs](categories/windows-and-dialogs/README.md) — 16 entries.
  - [Application workspaces](categories/windows-and-dialogs/application-workspaces.md)
  - [Dialog structure](categories/windows-and-dialogs/dialog-structure.md)
  - [Messages and operation progress](categories/windows-and-dialogs/messages-and-operation-progress.md)
  - [Value and resource pickers](categories/windows-and-dialogs/value-and-resource-pickers.md)
  - [Guided sequences](categories/windows-and-dialogs/guided-sequences.md)
- [Status help and interaction feedback](categories/status-and-help/README.md) — 8 entries.
  - [Status and activity](categories/status-and-help/status-and-activity.md)
  - [Contextual help](categories/status-and-help/contextual-help.md)
  - [Interaction indicators](categories/status-and-help/interaction-indicators.md)
- [Graphics surfaces and content](categories/graphics/README.md) — 16 entries.
  - [Display surfaces](categories/graphics/display-surfaces.md)
  - [Scene composition](categories/graphics/scene-composition.md)
  - [Shapes and paths](categories/graphics/shapes-and-paths.md)
  - [Images and text](categories/graphics/images-and-text.md)
- [Visual effects](categories/appearance/README.md) — 4 entries.


## How to read the descriptions

- **Purpose** explains the task a component serves.
- **Appearance** describes its recognizable form and visible states.
- **Contents** identifies the text, imagery, data, or child controls it can hold.
- **Behavior** describes interaction, state changes, and important configurable variants.

Each object table has four columns: Object name in Qt, Abstract object name, Object description, and Links to the sources. Parent-category tables summarize subcategory entries and link to their full descriptions. Each component has one primary location for its full description.

A **container** holds other components. A **layout** determines their arrangement and usually has no independent visible surface. A **supporting concept**, such as completion or kinetic scrolling, changes an existing interaction. A **visual effect** changes the appearance of existing content.

Phrases such as “optional,” “when enabled,” and “the application can” identify configurable capabilities rather than universal defaults. Controls may also have focused, disabled, selected, or read-only states where applicable; these states are different and should not be treated as interchangeable.

## Reference conventions

The reference documentation is **Qt 6.11.2**, accessed through Qt's rolling `qt-6` documentation URLs. The category hierarchy and abstract names are the survey's organization of the concepts.

Appearance varies by theme and platform. Native dialogs, window decorations, menus, tray icons, and notifications can differ from Qt-drawn controls. These descriptions explain their recognizable structure rather than prescribing exact colors or dimensions. The [Qt widget gallery](https://doc.qt.io/qt-6/gallery.html) illustrates that variation.

The [Qt Widgets overview](https://doc.qt.io/qt-6/qtwidgets-index.html) and [module catalog](https://doc.qt.io/qt-6/qtwidgets-module.html) provide reference context. Each component row links to its specific documentation; shared behavior sources are linked where needed.

## Survey documents

- [Original component inventory](01_COMPONENT_INVENTORY.md)
- [Category hierarchy and assignment decisions](02_CATEGORY_HIERARCHY.md)
- [Validation results](VALIDATION.md)
- [Survey plan](PLAN.md)

The original component survey is complete. The catalog retains all 94 inventory entries, with no unresolved category assignments or missing descriptive aspects.

## Mapping into OpenUI Spec

The survey is complete; its integration into the canonical scope tree is proposed separately.

- [Complete taxonomy crosswalk](TAXONOMY_MAPPING.md)
- [Proposed scope extensions and merge sequence](SCOPE_EXTENSION_PROPOSAL.md)
- [Candidate evidence register](PROPOSED_EVIDENCE.md)
- [Mapping validation](MAPPING_VALIDATION.md)

- [Proposed taxonomy categories and subcategories](TAXONOMY_STRUCTURE_PROPOSAL.md)

- [Consolidated taxonomy review draft](GENERIC_UI_TAXONOMY_DRAFT.md)
- [Consolidated mapping review draft](TAXONOMY_MAPPING_DRAFT.md)
- [Taxonomy merge review and reconciliation](TAXONOMY_MERGE_REVIEW.md)


## Completed behavior revision

Steps 7–14 are complete. All 94 source entries and 58 prior proposed terms are reconciled. Forty response contracts are organized in eight categories and 21 subcategories; the taxonomy drafts contain 245 rows each. The canonical scope merge is separate.

- [Behavior index](behaviors/README.md) and [contracts](BEHAVIOR_CONTRACTS.md)
- [Applicability matrix](COMPONENT_BEHAVIOR_MATRIX.md)
- [Configuration/state and appearance](CONFIGURATION_STATE_APPEARANCE.md)
- [Classification reconciliation](CLASSIFICATION_RECONCILIATION.md)
- [Decisions](BEHAVIOR_DECISIONS.md) and [scope mapping](BEHAVIOR_SCOPE_MAPPING.md)
- [Evidence](PROPOSED_EVIDENCE.md) and [six proposed scopes](SCOPE_EXTENSION_PROPOSAL.md)
- [Final validation](BEHAVIOR_VALIDATION.md) and [merge handoff](MERGE_HANDOFF.md)

The earlier [audit](BEHAVIOR_INVENTORY.md), [58-term ledger](BEHAVIOR_TERM_CLASSIFICATION.md), and [interaction separation](INTERACTION_SEPARATION.md) retain the source reasoning.
