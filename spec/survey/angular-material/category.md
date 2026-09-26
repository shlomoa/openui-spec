# Angular Material survey: categories

[Survey README](README.md) · [Taxonomy mapping](taxonomy_mapping.md)

The survey classifies all 1,454 objects of `@angular/material` 22.1.7 (1,233 files, 135 folders and 86 export declarations) into 10 survey-defined categories and 39 component-family subcategories. Each object has exactly one primary category. The categories are survey interpretations, not official Angular Material groupings or OpenUI terms. The authoritative definitions are in [TAXONOMY.md](inventory/TAXONOMY.md).

## Categories

| Category                                                                             | Definition                                                                                                             | Objects | Families |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ------: | -------: |
| [Actions and triggers](inventory/Actions-and-triggers.survey.md)                     | Controls that initiate actions or retain a pressed selection state.                                                    |      62 |        2 |
| [Data entry](inventory/Data-entry.survey.md)                                         | Controls for entering, choosing, and validating values.                                                                |     398 |       11 |
| [Navigation and workflow](inventory/Navigation-and-workflow.survey.md)               | Navigation surfaces, view selection, and staged user workflows.                                                        |     177 |        5 |
| [Layout and containers](inventory/Layout-and-containers.survey.md)                   | Content grouping, separation, disclosure, and spatial arrangement.                                                     |     111 |        4 |
| [Data presentation](inventory/Data-presentation.survey.md)                           | Item collections, hierarchies, and tabular presentation with paging and sorting controls.                              |     153 |        5 |
| [Feedback and overlays](inventory/Feedback-and-overlays.survey.md)                   | Status, progress, transient messages, contextual help, and overlay interaction surfaces.                               |     179 |        7 |
| [Icons and graphics](inventory/Icons-and-graphics.survey.md)                         | Vector icon display and icon resource management.                                                                      |      25 |        1 |
| [Shared foundations](inventory/Shared-foundations.survey.md)                         | Reusable behavior, date abstractions, options, interaction effects, theme infrastructure, and internal test utilities. |     206 |        2 |
| [Development tooling](inventory/Development-tooling.survey.md)                       | Installation, application scaffolding, theme generation, and upgrade transformations.                                  |     121 |        1 |
| [Package and style distribution](inventory/Package-and-style-distribution.survey.md) | Package-wide exports, compilation metadata, and published style assets.                                                |      22 |        1 |

Within each family, objects are further grouped by artifact role (17 roles such as runtime, styles, tests and documentation); see [artifact-role subcategories](inventory/TAXONOMY.md#artifact-role-subcategories).

## Subcategories

- **Actions and triggers:** `button`, `button-toggle`.
- **Data entry:** `autocomplete`, `checkbox`, `chips`, `datepicker`, `form-field`, `input`, `radio`, `select`, `slide-toggle`, `slider`, `timepicker`.
- **Navigation and workflow:** `menu`, `sidenav`, `stepper`, `tabs`, `toolbar`.
- **Layout and containers:** `card`, `divider`, `expansion`, `grid-list`.
- **Data presentation:** `list`, `paginator`, `sort`, `table`, `tree`.
- **Feedback and overlays:** `badge`, `bottom-sheet`, `dialog`, `progress-bar`, `progress-spinner`, `snack-bar`, `tooltip`.
- **Icons and graphics:** `icon`.
- **Shared foundations:** `core`, `testing`.
- **Development tooling:** `schematics`.
- **Package and style distribution:** `prebuilt-themes`.
