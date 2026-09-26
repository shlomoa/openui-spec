# HTML Standard survey: scopes proposal

[Survey README](README.md) · Source: [SCOPE_TREE_PROPOSAL.md](inventory/SCOPE_TREE_PROPOSAL.md)

Status: proposal for review, 2026-09-23. Paths are relative to `spec/scopes/`.
Proposed paths are not existing files.

## Enrich or clarify existing contracts first

| Existing scope                                                                                                                                  | Proposed treatment                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [Controls/native.scope.md](../../scopes/Controls/native.scope.md)                                                                               | Keep id `native` and type `input`; narrow the purpose to the input contract it carries. Map semantic control families separately.              |
| Action controls, Text inputs, Choice controls, Picker control, Range control                                                                    | Enrich with shared, evidenced concepts only; document variant constraints in validation prose.                                                 |
| [Display primitives](../../scopes/Controls/display_primitives.scope.md) and [Status indicator](../../scopes/Controls/status_indicator.scope.md) | Add aliases for calculated output (`output`) and scalar measurement (`meter`); keep them distinct from task progress and range input.          |
| [Table](../../scopes/Widgets/table.scope.md) and [Data grid](../../scopes/Widgets/data_grid.scope.md)                                           | Complete the table's structural model (cells, captions, header associations); distinguish it from interactive grid behavior.                   |
| [List](../../scopes/Widgets/list.scope.md)                                                                                                      | Resolve ordered, unordered and description-list representation while preserving existing `ul` instances.                                       |
| [Expandable panels](../../scopes/Containers/expandable_panels.scope.md)                                                                         | Enrich disclosure state and the summary/content relationship.                                                                                  |
| [Dialog](../../scopes/Widgets/dialog.scope.md)                                                                                                  | Keep `[modal]` only as an explicit OpenUI abstraction; correct the evidence claim that all fields come from HTML; review cancel wording.       |
| [Date/time pickers](../../scopes/Widgets/date_time_pickers.scope.md)                                                                            | Distinguish native temporal inputs from calendar and range widget behavior.                                                                    |
| [Overlay containers](../../scopes/Containers/overlay_containers.scope.md)                                                                       | Specify visibility, dismissal and modality independently.                                                                                      |
| Behaviors child models                                                                                                                          | Decide whether behavior targets are references or owned children before enriching. See [openui_schema_proposal.md](openui_schema_proposal.md). |

## Proposed additions

| Id  | Candidate location                           | Responsibility                                               | Merge condition                                                               |
| --- | -------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| P1  | `Application/document_metadata.scope.md`     | Host title, metadata and base-resource context               | Keep `index_html` as the host root; decide owned metadata structure first.    |
| P2  | `Application/resource_declarations.scope.md` | Declarative resource references and loading hints            | Keep favicon as the icon specialization; may merge into P1.                   |
| P3  | `Containers/form_group.scope.md`             | A named group of form controls with group-level state        | Must not duplicate the Form view or imply every container is form-associated. |
| P4  | `Behaviors/constraint_validation.scope.md`   | Reusable constraint checking and reporting                   | Form view keeps business submission and dirty state.                          |
| P5  | `Behaviors/focus_management.scope.md`        | Reusable focus movement and restoration policy               | Needs explicit owner/target reference rules.                                  |
| P6  | `Accessibility/scope.md`                     | Shared accessibility notions (new top-level folder)          | Conditional on a scope decision (plan Q13).                                   |
| P7  | `Composition/scope.md`                       | Reusable content and insertion points (new top-level folder) | Conditional; only if content projection is a requirement (plan Q13).          |
| P8  | `Controls/tabular_content.scope.md`          | Row, cell, caption and header primitives                     | Only if owned children in Table prove insufficient.                           |

Embedded browsing, microdata, capture and authentication, platform messaging, storage,
workers and parser infrastructure remain deferred or external.

## Overlaps with other surveys

- **P5 Focus management** overlaps the modal-focus parts of Qt P05 and Angular Material
  AM-P03 (Modal interaction).
- **Table enrichment** overlaps Angular Material AM-E07 and the Qt table/data-grid
  enhancement.
- **Date/time picker** clarification overlaps Angular Material AM-E03 and the Qt
  temporal enhancement.

Reconciliation into one accept, defer or reject list is plan task 6.

## Merge sequence

The survey proposes six merge stages, M1–M6: freeze inputs, review evidence, select
the smallest change, author scopes and traceability together, regenerate the catalog,
then validate. See [future merge sequence](inventory/SCOPE_TREE_PROPOSAL.md#future-merge-sequence)
and [acceptance criteria](inventory/SCOPE_TREE_PROPOSAL.md#acceptance-criteria-for-the-eventual-merge).
