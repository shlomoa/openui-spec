# Action controls

This leaf follows the [leaf scope template](../template.scope.md). It groups
command-oriented control aliases from the generic UI taxonomy without redefining
the shared glossary term for button.

## Identity

- id: actionControls · type: ActionControls · status: draft

## Purpose

Action controls cover controls that trigger commands or state transitions, including
buttons, icon buttons, tool buttons, hamburger buttons and toggle buttons when they
are not modeled as a more specific widget.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.label` — Uses — string — visible text and accessible name of the command.
- `uses.icon` — Uses — string — optional technology-independent icon token.
- `uses.disabled` — Uses — boolean — whether the control is unavailable.
- `uses.pressed` — Uses — boolean — the pressed state of a toggle button.
- `uses.autoRepeat` — Uses — boolean — whether activation repeats while the control is held down.
- `produces.activate` — Produces — emitted when the control is activated, and again at each repeat while it is held down.

## Accessibility

Action controls expose an accessible name, activation behavior, disabled state, and
keyboard/pointer activation equivalent to the selected concrete platform control.

## Validation notes

- Use this family when the taxonomy term is a command surface rather than a
  navigation link, menu item, or composite widget.
- Repeat while pressed is off unless `uses.autoRepeat` is true, and is not used for a
  destructive command. Releasing the control, disabling it or losing the pointer stops
  the repetition.
- A control without `uses.pressed` is a command button, not a toggle button.
