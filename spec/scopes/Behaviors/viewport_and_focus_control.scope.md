# Viewport and focus control

This leaf follows the [leaf scope template](../template.scope.md). It is a [Behaviors object](scope.md#objects) that groups the
behaviors a control applies to something outside itself.

## Identity

- id: viewportAndFocusControl · type: ViewportAndFocusControl · status: draft

## Purpose

Reusable behaviors a control applies to something outside itself: viewport
scrolling (moving the visible part of a viewport, with optional momentum and a
reveal action that brings an element into view without moving focus), scroll lock
(stopping the page background from scrolling while a feature asks for it, then
restoring the position) and focus management (moving focus to a chosen element and
restoring it afterwards).

## Attributes

- `[target]` — Uses — element reference to the viewport, page or element the behavior acts on (the [controlled element](../scope.md#controlled-element)).

## Accessibility

- Content reached by scrolling stays reachable by keyboard, without pointer-only
  scrollbar dragging, and momentum motion respects reduced-motion preferences.
- Scroll lock does not move or trap focus and does not hide background content from
  assistive technology.
- Moving focus is announced as focus normally is, and focus returns to a meaningful
  element afterwards.

## Validation notes

- The behavior acts on its target and does not own it; it declares no Child model.
- Focus management here is outside the modal case, which Modal overlay covers.
- Other attributes, such as axes, positions or restore options, need an explicit
  owner decision before they are added.
