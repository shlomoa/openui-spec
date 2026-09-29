# Status indicator

This leaf follows the [leaf scope template](../template.scope.md). It covers status
and feedback aliases from the generic UI taxonomy.

## Identity

- id: statusIndicator · type: StatusIndicator · status: draft

## Purpose

A status indicator covers status bars, tags, badges, meters, progress bars,
loaders and spinners that communicate state without requiring user activation.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.label` — Uses — string — the visible status text or accessible name.
- `uses.value` — Uses — number — the measured value or the progress made.
- `uses.min` — Uses — number — the lower bound of a meter or progress bar.
- `uses.max` — Uses — number — the upper bound of a meter or progress bar.
- `uses.mode` — Uses — enum(determinate|indeterminate) — the progress mode.
- `uses.severity` — Uses — enum(none|information|success|warning|error) — the kind of status shown.

## Accessibility

A status indicator exposes advisory state, live-region behavior when appropriate, and
meaningful text alternatives for non-text visual feedback.

## Validation notes

- Use this object for passive status feedback; use feedback widgets for transient
  messages such as alerts, toasts, or notifications.
- Progress is determinate or indeterminate (progress mode, `uses.mode`); indeterminate progress has no `uses.value`. A meter shows a measured value, not task progress; a badge or tag shows status attached to another element.
