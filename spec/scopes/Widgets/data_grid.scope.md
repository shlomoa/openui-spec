# Data grid

This leaf follows the [leaf scope template](../template.scope.md). It separates the
interactive data-grid taxonomy alias from the static table control family.

## Identity

- id: dataGrid · type: DataGrid · status: draft

## Purpose

A data grid is an interactive tabular-data widget that may support cell focus,
selection, editing, sorting, filtering, pagination, or keyboard grid navigation.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
row, column, selection, sorting, filtering, and editing attributes from the selected
grid implementation.

## Child model

Data grids do not define a fixed child model at this abstraction level.

## Accessibility

Data grids expose row and cell relationships, keyboard navigation, focus management,
and selection or editing state when those capabilities are present.

## Validation notes

- Use the Controls/Table family for static tabular data; use this widget for
  interactive grid behavior.
