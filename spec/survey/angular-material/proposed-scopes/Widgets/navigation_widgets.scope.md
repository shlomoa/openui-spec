# Navigation widgets

Review copy for AM-E04, pending acceptance. See [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md). Existing identity and machine fields are preserved except changes explicitly identified in the proposal.

This leaf follows the [leaf scope template](../../../../scopes/template.scope.md). It groups navigation
widget aliases from the generic UI taxonomy.

## Identity

- id: navigationWidgets · type: NavigationWidgets · status: draft

## Purpose

Navigation widgets cover navigation bars, drawers, rails, hamburger menus,
breadcrumbs, tree views, pagination controls, and carousels when they are modeled as
reusable widgets.

## Attributes

Categories are defined in [`../scope.md`](../../../../scopes/scope.md). This family inherits concrete
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

Tree views may expose hierarchical data without navigating routes. Pagination may select a window of local or remote results; route changes are optional integration behavior.

Keep existing identity/type. Do not move Tree view into a new Data presentation root; coordinate the Qt hierarchical-data clarification.
