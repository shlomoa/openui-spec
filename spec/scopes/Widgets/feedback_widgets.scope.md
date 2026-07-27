# Feedback widgets

This leaf follows the [leaf scope template](../template.scope.md). It groups feedback
and message aliases from the generic UI taxonomy.

## Identity

- id: feedbackWidgets · type: FeedbackWidgets · status: draft

## Purpose

Feedback widgets cover tooltips, alerts, toasts, snackbars, notifications, and
narration or audio-description surfaces that communicate contextual or transient
information.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
message, severity, duration, announcement, and dismissal attributes from the selected
widget implementation.

## Child model

Feedback widgets do not define a fixed child model at this abstraction level.

## Accessibility

Feedback widgets choose live-region, focus, and dismissal behavior according to the
urgency and modality of the message.

## Validation notes

- Use status indicators for passive state display; use this family for message
  surfaces that appear, announce, or dismiss.
