# Behaviors

Behaviors define reusable interaction capabilities that can be applied to any element, which a behavior references as its controlled element and does not own.

## Objects

- [Drag and drop](drag_and_drop.scope.md): Moves elements within a page, view, container, or widget by dragging and dropping them.
- [Resizable](resizable.scope.md): Lets the user change the size of an element within a page or view.
- [Collapsible](collapsible.scope.md): Lets the user collapse and expand elements within a page or view.
- [Input assistance](input_assistance.scope.md): Helps or checks what the user enters in any input control: text completion and constraint validation.
- [Modal overlay](modal_overlay.scope.md): Makes a referenced surface modal, blocking interaction outside it until its task is completed or dismissed.
- [Viewport and focus control](viewport_and_focus_control.scope.md): Behaviors a control applies to something outside itself: viewport scrolling, scroll lock, and focus management.

## Boundaries

The Behaviors scope describes user-facing interaction capabilities. It does not require a specific event system, gesture library, browser API, animation model, or framework directive.

Behavior objects follow the shared [scope folder and attribute category rules](../scope.md).
