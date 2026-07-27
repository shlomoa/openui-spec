# Text inputs

This leaf follows the [leaf scope template](../template.scope.md). It groups text-entry
control aliases from the generic UI taxonomy.

## Identity

- id: textInputs · type: TextInputs · status: draft

## Purpose

Text inputs cover single-line, multi-line, password, and search entry controls that
accept textual user input.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
input attributes from the selected native or framework text-entry control.

## Child model

Text inputs do not define a fixed child model at this abstraction level.

## Accessibility

Text inputs require an accessible label, expose editing state, and preserve expected
keyboard text-entry behavior for the selected platform control.

## Validation notes

- Map text field, text area, password field, and search field aliases here unless a
  more specialized scope defines the concrete contract.
