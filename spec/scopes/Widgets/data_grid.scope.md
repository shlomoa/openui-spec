# Data grid

This leaf follows the [leaf scope template](../template.scope.md). It separates the
interactive data-grid taxonomy alias from standard tabular data presentation.

## Identity

- id: dataGrid · type: DataGrid · status: draft

## Purpose

A data grid is an interactive tabular-data widget that may support cell focus,
selection, editing, sorting, filtering, pagination, or keyboard grid navigation.
A tree grid is a data grid whose rows can expand and collapse.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.selection` — Uses — enum(none|single|multiple) — the row selection mode.
- `uses.editable` — Uses — boolean — whether cells can be edited.
- `uses.resizableColumns` — Uses — boolean — whether the user can resize columns.
- `uses.reorderableColumns` — Uses — boolean — whether the user can reorder columns.
- `behaves.sort` — Behaves — orders rows by a chosen column.
- `behaves.filter` — Behaves — narrows the visible rows by a predicate.
- `behaves.paginate` — Behaves — splits rows into navigable pages.
- `produces.selectionChange` — Produces — emitted when the selected rows change.

## Child model

- header — thead — 0..1 — the header rows, with column labels and sort indicators.
- row — tr — 0..n — a row of cells.

## Accessibility

Data grids expose row and cell relationships, keyboard navigation, focus management,
and selection or editing state when those capabilities are present.

## Validation notes

- Use the Table widget (`table.scope.md`) for standard tabular data; use this widget for
  interactive grid behavior.
- The header belongs to its grid; it is not a separate widget.
