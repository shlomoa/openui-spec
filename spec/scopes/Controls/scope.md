# Controls

Controls define reusable interaction and rendering primitives that can appear in applications, pages, views, containers, and widgets.

## Objects

- [Native](native.scope.md): A standard platform input, identified by its `[type]`, used where no more specific control family applies.
- [Action controls](action_controls.scope.md): Controls that trigger commands or state transitions, such as buttons, icon buttons, tool buttons, hamburger buttons, and toggle buttons.
- [Text inputs](text_inputs.scope.md): Single-line, multi-line, password, search, rich text, keyboard shortcut, and metadata-driven entry controls for textual input.
- [Choice controls](choice_controls.scope.md): Checkboxes, radio buttons, switches, dropdowns, list boxes, and combo boxes that let users select one or more values.
- [Picker control](picker_control.scope.md): Specialized selection affordances such as wheel, color, file, folder, and font pickers.
- [Range control](range_control.scope.md): Sliders, range sliders, rotary value controls, spin boxes, step inputs, and rating controls for a value within a range.
- [Drawing and capture controls](drawing_and_capture.scope.md): Canvases or drawing areas and microphone input that collect non-text user input.
- [Display primitives](display_primitives.scope.md): Labels, text, images, icons, avatars, separators, calculated output, highlighted text, and geometric shapes that render content.
- [Status indicator](status_indicator.scope.md): Status bars, tags, badges, meters, progress bars, loaders, and spinners that communicate state without user activation.
- [Link and scroll controls](link_and_scroll_controls.scope.md): Links and scrollbars modeled as primitive controls.

## Boundaries

The Controls scope describes the public control concepts. It does not require a specific HTML, CSS, JavaScript, browser, or framework implementation.

Control objects follow the shared [scope folder and attribute category rules](../scope.md).
