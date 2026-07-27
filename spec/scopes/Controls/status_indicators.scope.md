# Status indicators

This leaf follows the [leaf scope template](../template.scope.md). It groups status
and feedback aliases from the generic UI taxonomy.

## Identity

- id: statusIndicators · type: StatusIndicators · status: draft

## Purpose

Status indicators cover status bars, tags, badges, progress bars, loaders, and
spinners that communicate state without requiring user activation.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
status text, value, severity, and visibility attributes from the selected indicator.

## Child model

Status indicators do not define a fixed child model at this abstraction level.

## Accessibility

Status indicators expose advisory state, live-region behavior when appropriate, and
meaningful text alternatives for non-text visual feedback.

## Validation notes

- Use this family for passive status feedback; use feedback widgets for transient
  messages such as alerts, toasts, or notifications.
