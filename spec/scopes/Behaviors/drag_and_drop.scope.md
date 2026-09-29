# Drag and drop

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: dragAndDrop · type: DragAndDrop · status: draft

## Purpose

A behavior that moves elements within a page, view, container, or widget by
dragging and dropping them.

## Attributes

- `uses.target` — Uses — reference — element reference to the page, view, container or widget whose elements the behavior moves (the [controlled element](../scope.md#controlled-element)).

## Accessibility

- Provides a keyboard-operable alternative to pointer-based dragging.
- Announces drag start, valid targets, and drop outcome to assistive technology.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- The behavior acts on its target and does not own it; it declares no Child model.
- Only the target reference is authorized by current evidence; drag/drop attribute keys
  require an explicit owner decision before they are added.
