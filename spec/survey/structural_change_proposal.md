# Structural change proposal

Changes to the scope tree under [`spec/scopes/`](../scopes/scope.md): new scope leaves
under the existing top-level scopes. The top-level scopes are unchanged. Names follow the
[terminology proposal](terminology_proposal.md). Where several surveys propose the same
responsibility, they are consolidated into one leaf.

## Add

| #   | Add leaf                                     | Responsibility                                                                                                 | Consolidates                                                                                    |
| --- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| S1  | `Behaviors/modal_overlay.scope.md`           | Restrict interaction to an active surface and manage its focus.                                                | [Qt P05](qt/scopes_proposal.md), [Angular Material AM-P03](angular-material/scopes_proposal.md) |
| S2  | `Behaviors/viewport_scrolling.scope.md`      | Scroll a referenced viewport, with optional kinetic motion and target reveal.                                  | [Qt P06](qt/scopes_proposal.md), [Angular Material AM-P04](angular-material/scopes_proposal.md) |
| S3  | `Behaviors/scroll_lock.scope.md`             | Suspend background page scrolling.                                                                             | [Angular Material AM-P05](angular-material/scopes_proposal.md)                                  |
| S4  | `Behaviors/text_completion.scope.md`         | Offer and accept completions for a referenced text input.                                                      | [Qt P03](qt/scopes_proposal.md)                                                                 |
| S5  | `Behaviors/focus_management.scope.md`        | Move and restore focus outside modal use.                                                                      | [HTML P5](html5/scopes_proposal.md)                                                             |
| S6  | `Behaviors/constraint_validation.scope.md`   | Check and report input constraints across controls and forms.                                                  | [HTML P4](html5/scopes_proposal.md)                                                             |
| S7  | `Containers/page_stack.scope.md`             | Own alternative content regions and show one at a time.                                                        | [Qt P01](qt/scopes_proposal.md)                                                                 |
| S8  | `Containers/scroll_container.scope.md`       | Own content and its viewport and scrollbars; scrolling itself uses S2.                                         | [Qt P02](qt/scopes_proposal.md)                                                                 |
| S9  | `Containers/form_field.scope.md`             | Relate one value control to its label, hint and error.                                                         | [Angular Material AM-P01](angular-material/scopes_proposal.md)                                  |
| S10 | `Containers/form_group.scope.md`             | Group related form controls under one caption, with group-level state.                                         | [HTML P3](html5/scopes_proposal.md)                                                             |
| S11 | `Containers/flexible_column_layout.scope.md` | Show one, two or three columns side by side for a list → detail → detail pattern, collapsing on small screens. | [OpenUI5](openui5/scopes_proposal.md)                                                           |
| S12 | `Application/shell_bar.scope.md`             | The application-level global header bar.                                                                       | [OpenUI5](openui5/scopes_proposal.md)                                                           |
| S13 | `Application/document_metadata.scope.md`     | Host-document title, metadata and resource declarations.                                                       | [HTML P1, P2](html5/scopes_proposal.md)                                                         |
| S14 | `Pages/object_page.scope.md`                 | A page layout with a collapsible header (title and actions) and an anchor bar of sections.                     | [OpenUI5](openui5/scopes_proposal.md)                                                           |
| S15 | `Widgets/graphics_viewport.scope.md`         | Present and navigate borrowed scene data.                                                                      | [Qt P04](qt/scopes_proposal.md)                                                                 |
| S16 | `Widgets/token_collection.scope.md`          | Enter, show and remove a collection of compact values.                                                         | [Angular Material AM-P02](angular-material/scopes_proposal.md)                                  |
| S17 | `Widgets/filter_bar.scope.md`                | Filter the data of a referenced table, chart or list.                                                          | [OpenUI5](openui5/scopes_proposal.md)                                                           |
| S18 | `Widgets/value_help.scope.md`                | Help the user find and supply a value to a referenced field.                                                   | [OpenUI5](openui5/scopes_proposal.md)                                                           |
| S19 | `Widgets/personalization_panel.scope.md`     | Adjust a referenced table or chart's columns, sorting, filtering and grouping.                                 | [OpenUI5](openui5/scopes_proposal.md)                                                           |
| S20 | `Widgets/file_upload.scope.md`               | Select files and track their upload.                                                                           | [OpenUI5](openui5/scopes_proposal.md)                                                           |
| S21 | `Widgets/planning_calendar.scope.md`         | Show and schedule appointments over time.                                                                      | [OpenUI5](openui5/scopes_proposal.md)                                                           |

Each new leaf also needs an entry in its parent `scope.md` index and one row in the
[evidence register](../scopes/evidence.md).

## Not proposed

- **New top-level scopes:** Accessibility and Composition (HTML P6, P7) wait on plan
  question Q13; a host-integration branch (Qt) waits on Q9.
- **Behaviors subfolders** for scrolling and modality: deferred by the Angular Material
  survey.
- **Controls/tabular_content** (HTML P8): only if owned cells in Table prove
  insufficient.
- **Cards** (OpenUI5): stays under Surface containers, where the canonical mapping
  already places Card; Tile is a Card variant.
- **Metadata-driven field** (OpenUI5): an alias of Text inputs, not a leaf.
- **Moves, renames and deletions of existing leaves:** none.
