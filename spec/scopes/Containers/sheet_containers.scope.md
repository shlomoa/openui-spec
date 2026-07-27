# Sheet containers

This leaf follows the [leaf scope template](../template.scope.md). It groups sheet and
side-surface aliases from the generic UI taxonomy.

## Identity

- id: sheetContainers · type: SheetContainers · status: draft

## Purpose

Sheet containers cover sidebars, sheets, side sheets, and bottom sheets that reveal
supplemental content from an edge or layered surface.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
open state, side, modality, breakpoint, and dismissal attributes from the selected
sheet implementation.

## Child model

Sheet containers do not define a fixed child model at this abstraction level.

## Accessibility

Sheet containers expose labels, focus behavior, modality, and dismissal semantics
consistent with their persistence and relationship to surrounding content.

## Validation notes

- Use Dialog for modal dialog semantics; use this family for edge-attached sheet
  surfaces.
