# Feedback widgets

This leaf follows the [leaf scope template](../template.scope.md). It groups feedback
and message aliases from the generic UI taxonomy.

## Identity

- id: feedbackWidgets · type: FeedbackWidgets · status: draft

## Purpose

Feedback widgets cover tooltips, contextual help, alerts, toasts, snackbars,
notifications, startup screens, illustrated messages and narration or
audio-description surfaces that communicate contextual or transient information.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.message` — Uses — string — the text of the message.
- `uses.severity` — Uses — enum(none|information|success|warning|error) — the message severity.
- `uses.duration` — Uses — integer — how long a transient message stays, in milliseconds.
- `uses.anchor` — Uses — reference — the element a tooltip or contextual help describes.
- `produces.close` — Produces — emitted when the message is dismissed or its time runs out.

## Accessibility

Feedback widgets choose live-region, focus, and dismissal behavior according to the
urgency and modality of the message.

## Validation notes

- Use status indicators for passive state display; use this family for message
  surfaces that appear, announce, or dismiss.
- Contextual help is requested and can be interactive; a tooltip is passive.
- Confirmation, warning and error are the severity of one message, not separate widgets.
