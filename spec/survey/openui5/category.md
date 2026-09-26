# OpenUI5 survey: categories

[Survey README](README.md) · [Taxonomy mapping](taxonomy_mapping.md)

The OpenUI5 survey does not define its own categories. It classifies OpenUI5 classes directly under the seven OpenUI top-level scopes that hold concrete UI objects: Application, Behaviors, Containers, Controls, Pages, Views and Widgets. The four folder-abstraction scopes (Interaction, Internationalization, Layout, Presentation) have no class-level matches. The matching key is [\_classification_key.md](inventory/_classification_key.md).

## Categories

| Category                                       | Spec objects in the key | Objects with matches | Matched classes |
| ---------------------------------------------- | ----------------------: | -------------------: | --------------: |
| [Application](inventory/Application.survey.md) |                       5 |                    1 |               8 |
| [Behaviors](inventory/Behaviors.survey.md)     |                       3 |                    1 |               7 |
| [Containers](inventory/Containers.survey.md)   |                       8 |                    8 |              41 |
| [Controls](inventory/Controls.survey.md)       |                      10 |                    9 |             221 |
| [Pages](inventory/Pages.survey.md)             |                       3 |                    0 |               0 |
| [Views](inventory/Views.survey.md)             |                       2 |                    1 |               5 |
| [Widgets](inventory/Widgets.survey.md)         |                      11 |                   11 |             142 |

Totals: 1,221 primary classes from 12 core libraries at commit `5165c20`. 424 are matched to 31 of the 42 spec objects, 257 are clustered into 11 proposed subcategories, 261 are unclustered leftovers and 279 are out of scope (non-UI infrastructure).

## Subcategories

- **Application:** Routing (0); Navigation (0); Tool bars (8); favicon.ico (0); index.html (0).
- **Behaviors:** Drag and drop (7); Resizable (0); Collapsible (0).
- **Containers:** Grid (3); Expandable panels (2); Tabs (7); Surface containers (2); Sheet containers (1); Overlay containers (13); Structural containers (4); Splitters (9).
- **Controls:** Native (95); Action controls (61); Text inputs (7); Choice controls (20); Picker control (3); Range control (8); Drawing and capture controls (0); Display primitives (17); Status indicator (6); Link and scroll controls (4).
- **Pages:** Dashboard (0); Shell page (0); Empty page (0).
- **Views:** Report (0); Form (5).
- **Widgets:** Chart (1); Table (13); Data grid (2); List (47); Feedback widgets (12); Media widgets (2); Navigation widgets (13); Menu widgets (15); Date/Time pickers (29); Stepper (3); Dialog (5).
