# Navigation widgets

This leaf follows the [leaf scope template](../template.scope.md). It groups navigation
widget aliases from the generic UI taxonomy.

## Identity

- id: navigationWidgets · type: NavigationWidgets · status: draft

## Purpose

Navigation widgets cover navigation drawers, navigation rails, breadcrumbs, tree
views, column browsers, pagination controls and carousels when they are modeled as
reusable widgets. A tree or pager does not require route navigation.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.ariaLabel` — Uses — string — accessible name of the navigation widget.
- `uses.orientation` — Uses — enum(horizontal|vertical) — the direction of a rail, breadcrumb trail or carousel.
- `uses.selected` — Uses — string — the key of the current item, node or page.
- `uses.pageSize` — Uses — integer — the number of items on one page of a pager.
- `uses.total` — Uses — integer — the total number of items a pager pages through.
- `produces.selectionChange` — Produces — emitted when the current item or node changes.
- `produces.pageChange` — Produces — emitted when a pager or carousel shows another page.

## Accessibility

Navigation widgets expose landmarks, labels, current item state, hierarchy, focus, and
keyboard navigation appropriate to the selected pattern.

## Validation notes

- Use Application navigation for application-level route structures; use this family
  for reusable navigation components.
