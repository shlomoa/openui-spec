# Navigation widgets

This leaf follows the [leaf scope template](../template.scope.md). It groups navigation
widget aliases from the generic UI taxonomy.

## Identity

- id: navigationWidgets · type: NavigationWidgets · status: draft

## Purpose

Navigation widgets cover navigation bars, drawers, rails, hamburger menus,
breadcrumbs, tree views, pagination controls, and carousels when they are modeled as
reusable widgets.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
current item, orientation, route, expansion, and paging attributes from the selected
navigation widget implementation.

## Child model

Navigation widgets do not define a fixed child model at this abstraction level.

## Accessibility

Navigation widgets expose landmarks, labels, current item state, hierarchy, focus, and
keyboard navigation appropriate to the selected pattern.

## Validation notes

- Use Application navigation for application-level route structures; use this family
  for reusable navigation components.
