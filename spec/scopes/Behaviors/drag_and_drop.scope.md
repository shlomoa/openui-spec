# Drag and drop

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the `spec/README.md` scope rule, recorded technology-independently.

## Identity

- id: dragAndDrop · type: DragAndDrop · status: draft

## Purpose

A behavior that moves elements within a page, view, container, or widget by
dragging and dropping them.

## Child model

The behavior applies to the scopes it can move elements within:

- targetPage — page — 0..n — a page the behavior applies to.
- targetView — view — 0..n — a view the behavior applies to.
- targetContainer — container — 0..n — a container the behavior applies to.
- targetWidget — widget — 0..n — a widget the behavior applies to.

## Accessibility

- Provides a keyboard-operable alternative to pointer-based dragging.
- Announces drag start, valid targets, and drop outcome to assistive technology.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Only applicability is authorized by current evidence; drag/drop attribute keys
  require an explicit owner decision before they are added.
