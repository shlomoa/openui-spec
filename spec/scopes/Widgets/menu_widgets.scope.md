# Menu widgets

This leaf follows the [leaf scope template](../template.scope.md). It groups menu
aliases from the generic UI taxonomy.

## Identity

- id: menuWidgets · type: MenuWidgets · status: draft

## Purpose

Menu widgets cover menus, dropdown menus, and context menus that present command or
choice lists in a menu pattern.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
open state, active item, orientation, trigger, and command attributes from the selected
menu implementation.

## Child model

Menu widgets do not define a fixed child model at this abstraction level.

## Accessibility

Menu widgets expose menu and menu-item semantics, focus management, keyboard commands,
and checked or disabled item state where applicable.

## Validation notes

- Use choice controls for simple value selection controls; use this family for
  application-menu patterns and context menus.
