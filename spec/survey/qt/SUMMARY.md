# Qt Widgets survey: summary

[Survey README](README.md) · [Plan](PLAN.md)

## Baseline and scope

- **Source:** public Qt Widgets API documentation, Qt 6.11.2, accessed through Qt's
  rolling `qt-6` documentation URLs.
- **Surveyed:** user-facing UI components, including containers and layout concepts,
  meaningful variants, interaction states and nested contents.
- **Not surveyed:** code and API members. Example code is supporting evidence only.
- **Appearance:** varies by theme and platform, so descriptions cover recognizable
  structure rather than exact colors or sizes.

## Steps

1. Inventoried the components and grouped them by user-facing purpose.
2. Described every entry by purpose, appearance, contents and behavior, with one
   primary location per entry.
3. Mapped every entry to OpenUI scopes and proposed scope extensions.
4. Audited every entry for behaviors and separated them from triggers, states and
   appearance.
5. Derived 40 response contracts, and applicability for each component and contract.
6. Revised the scope and taxonomy proposals together, validated them and prepared a
   merge handoff.

See [PLAN.md](PLAN.md).

## Findings

- **Coverage:** 94 entries and 99 Qt names in 9 categories and 27 subcategories. All
  376 descriptive aspects (94 × 4) are populated. See [category.md](category.md).
- **Taxonomy fit:** all 94 entries map to 29 existing OpenUI scopes:
  - 71 enhance an existing leaf and 10 reuse one unchanged.
  - 4 are owned parts, 4 are folder notions and 4 motivate new leaves.
  - 1 (system-tray presence) is deferred.

  See [taxonomy_mapping.md](taxonomy_mapping.md).

- **Behaviors:** 40 response concepts in 8 categories and 21 subcategories, each with a
  contract. Applicability across the 94 × 40 matrix has 3,760 classified cells.
- **Taxonomy growth:** the consolidated taxonomy and mapping drafts have 245 rows each:
  151 existing, 58 earlier additions and 36 new response terms.
- **New leaves:** six gaps survive review: Page stack, Scroll container, Text
  completion, Graphics viewport, Modal interaction and Viewport scrolling. See
  [scopes_proposal.md](scopes_proposal.md).

## Decisions and reasoning

- **No replacement taxonomy tree and no Graphics top-level scope.** Graphics content
  still divides into output, composition, layout, input and behavior; one Graphics scope
  would conflate those roles. See [architecture_proposal.md](architecture_proposal.md).
- **The taxonomy and the scope tree are linked views of one vocabulary.** The taxonomy
  groups concepts by primary purpose, and the scope tree organizes contracts. One
  taxonomy subcategory may map to several scope leaves.
- **Ownership stays in components.** Behaviors reference their targets by id instead of
  owning them (decision D01). See
  [openui_schema_proposal.md](openui_schema_proposal.md).
- **Classify behaviors by outcome.** Swipes, hover, key and pointer input and timers
  are trigger vocabulary mapped to explicit outcomes (D07).
- **Host-shell presence is deferred.** MDI and docking are optional runtime
  capabilities. See [opens.md](opens.md).
