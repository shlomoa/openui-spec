# Drawing and capture controls

This leaf follows the [leaf scope template](../template.scope.md). It groups direct
capture and drawing aliases from the generic UI taxonomy.

## Identity

- id: drawingAndCapture · type: DrawingAndCapture · status: draft

## Purpose

Drawing and capture controls cover canvas or drawing areas, microphone input, and
biometric prompts that collect non-text user input.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
capture permissions, accepted media, and value attributes from the selected control.

## Child model

Drawing and capture controls do not define a fixed child model at this abstraction
level.

## Accessibility

Drawing and capture controls provide accessible instructions, alternatives, and
status feedback for permissions, recording, drawing, or biometric verification.

## Validation notes

- Use this family for user input capture; use media widgets for playback or preview
  surfaces.
