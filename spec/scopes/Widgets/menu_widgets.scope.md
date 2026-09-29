# Menu widgets

This leaf follows the [leaf scope template](../template.scope.md). It groups menu
aliases from the generic UI taxonomy.

## Identity

- id: menuWidgets · type: MenuWidgets · status: draft

## Purpose

Menu widgets cover menus, menu items, menu buttons, menubars and context menus,
including nested menus that present command or choice lists in a menu pattern.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.label` — Uses — string — the text of a menu button, or the accessible name of the menu.
- `uses.open` — Uses — boolean — whether the menu is shown.
- `uses.anchor` — Uses — reference — the element that opens the menu (its [trigger](../scope.md#trigger)).
- `uses.orientation` — Uses — enum(horizontal|vertical) — the direction of the menu items; a menubar is horizontal.
- `produces.select` — Produces — emitted when a menu item is chosen.

## Child model

- item — menuitem — 0..n — a command or choice in the menu.
- submenu — MenuWidgets — 0..n — a nested menu.

## Accessibility

Menu widgets expose menu and menu-item semantics, focus management, keyboard commands,
and checked or disabled item state where applicable.

## Validation notes

- Use choice controls for simple value selection controls; use this family for
  application-menu patterns and context menus.
