# Drawing and capture controls

This leaf follows the [leaf scope template](../template.scope.md). It groups direct
capture and drawing aliases from the generic UI taxonomy.

## Identity

- id: drawingAndCapture · type: DrawingAndCapture · status: draft

## Purpose

Drawing and capture controls cover canvases or drawing areas and microphone input
that collect non-text user input.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.label` — Uses — string — accessible name of the drawing area or capture control.
- `uses.width` — Uses — integer — width of a drawing area, in CSS pixels.
- `uses.height` — Uses — integer — height of a drawing area, in CSS pixels.

## Accessibility

Drawing and capture controls provide accessible instructions, alternatives, and
status feedback for permissions, recording, or drawing.

## Validation notes

- Use this family for user input capture; use media widgets for playback or preview
  surfaces.
