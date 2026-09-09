# Status indicator

This leaf follows the [leaf scope template](../template.scope.md). It covers status
and feedback aliases from the generic UI taxonomy.

## Identity

- id: statusIndicator · type: StatusIndicator · status: draft

## Purpose

A status indicator covers status bars, tags, badges, progress bars, loaders, and
spinners that communicate state without requiring user activation.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This object inherits concrete
status text, value, severity, and visibility attributes from the selected indicator.

## Child model

A status indicator does not define a fixed child model at this abstraction level.

## Accessibility

A status indicator exposes advisory state, live-region behavior when appropriate, and
meaningful text alternatives for non-text visual feedback.

## Validation notes

- Use this object for passive status feedback; use feedback widgets for transient
  messages such as alerts, toasts, or notifications.
