# Action controls

This leaf follows the [leaf scope template](../template.scope.md). It groups
command-oriented control aliases from the generic UI taxonomy without redefining
the shared glossary term for button.

## Identity

- id: actionControls · type: ActionControls · status: draft

## Purpose

Action controls cover controls that trigger commands or state transitions, including
button and icon button aliases when they are not modeled as a more specific widget.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family does not add a
fixed attribute contract beyond the concrete control chosen by an implementation.

## Child model

Action controls do not define a fixed child model at this abstraction level.

## Accessibility

Action controls expose an accessible name, activation behavior, disabled state, and
keyboard/pointer activation equivalent to the selected concrete platform control.

## Validation notes

- Use this family when the taxonomy term is a command surface rather than a
  navigation link, menu item, or composite widget.
