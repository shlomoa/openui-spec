# Qt Widgets survey: categories

[Survey README](README.md#contents) · [Taxonomy mapping](taxonomy_mapping.md#summary)

The survey organizes Qt Widgets components by user-facing purpose: 9 categories and 27 subcategories. Each component has one primary location for its full description (purpose, appearance, contents and behavior). The authoritative hierarchy and assignment decisions are in [02_CATEGORY_HIERARCHY.md](inventory/02_CATEGORY_HIERARCHY.md#step-2-result).

## Categories

| Category                                                                                              | Definition                                                                 | Entries | Subcategories |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------: | ------------: |
| [Commands](inventory/categories/commands/README.md#direct-objects)                                    | Invoke actions and expose command collections.                             |       7 |             3 |
| [Input and selection](inventory/categories/input-and-selection/README.md#direct-objects)              | Enter values or choose among alternatives.                                 |      18 |             4 |
| [Content and data presentation](inventory/categories/content-and-data/README.md#direct-objects)       | Present readable content and structured collections.                       |       8 |             3 |
| [Page navigation and scrolling](inventory/categories/navigation/README.md#direct-objects)             | Move between pages or through content within a region.                     |       7 |             2 |
| [Containers and layout](inventory/categories/containers-and-layout/README.md#direct-objects)          | Group components and determine their spatial arrangement.                  |      10 |             4 |
| [Windows and dialogs](inventory/categories/windows-and-dialogs/README.md#direct-objects)              | Provide application workspaces and focused interaction windows.            |      16 |             5 |
| [Status help and interaction feedback](inventory/categories/status-and-help/README.md#direct-objects) | Communicate state, explain controls, and make interaction targets visible. |       8 |             3 |
| [Graphics surfaces and content](inventory/categories/graphics/README.md#direct-objects)               | Present visual scenes, graphical elements, and their composition.          |      16 |             4 |
| [Visual effects](inventory/categories/appearance/README.md#direct-objects)                            | Modify the appearance of existing content.                                 |       4 |             1 |

Totals: 94 entries (components and supporting concepts) and 99 Qt names, against Qt 6.11.2 documentation. The follow-up behavior hierarchy (40 response concepts in 8 categories and 21 subcategories) is indexed in [behaviors/README.md](inventory/behaviors/README.md#completed-proposal).

## Subcategories

- **Commands:** Action buttons; Command collections; Action history.
- **Input and selection:** Text and shortcuts; Choices; Numeric values; Dates and times.
- **Content and data presentation:** Text images and numbers; Collections and hierarchies; Collection headers.
- **Page navigation and scrolling:** Page switching; Scrolling.
- **Containers and layout:** Visual grouping; Adjustable panes; Arrangement and spacing; Behavior relationships.
- **Windows and dialogs:** Application workspaces; Dialog structure; Messages and operation progress; Value and resource pickers; Guided sequences.
- **Status help and interaction feedback:** Status and activity; Contextual help; Interaction indicators.
- **Graphics surfaces and content:** Display surfaces; Scene composition; Shapes and paths; Images and text.
- **Visual effects:** Behavior relationships.
