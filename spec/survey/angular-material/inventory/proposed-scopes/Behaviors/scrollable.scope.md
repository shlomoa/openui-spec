# Scrollable

Review draft only, pending the decision in the [extension proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md). Follows the [leaf template](../../../../../scopes/template.scope.md) and [scope rules](../../../../../scopes/scope.md); shared meanings remain in the [spec glossary](../../../../../README.md#glossary). New keys below are explicit candidate neutral design decisions, not already approved framework-derived contracts.

## Identity

- id: scrollable · type: Scrollable · status: draft

## Purpose

A reusable capability permits overflow content to be reached by scrolling an existing bounded content region. The host continues to own the viewport geometry and nested content.

## Attributes

- `[target]` — Uses — Reference to the existing content region whose viewport can scroll.
- `[axis]` — Uses — Allowed scrolling direction: horizontal, vertical or both; default both. This policy does not force overflow.
- `[enabled]` — Uses — Boolean enabling this attached capability; default true. It does not destroy content or independently define clipping and layout.
- `(scrollChange)` — Produces — Reports a change in the target viewport position; this is observation, not a second position controller.

## Accessibility

Meaningful overflow content remains reachable without requiring pointer-only scrollbar dragging. Preserve access to focused content and avoid adding duplicate focus stops solely for the behavior. A host must not hide essential content when disabling this capability unless another accessible access path or fitting layout is supplied.

## Validation notes

AM-P04 draws on B09–B11. The host owns its size, constraints and content; an unconstrained or fitting region need not scroll. Axis names use physical horizontal/vertical directions, while platform offset normalization remains pending. Scrollbar visibility is a separate control/presentation policy, and disabling observation is not the same as disabling scrolling. This behavior neither blocks page scrolling nor changes overlay attachment, sticky positioning or virtual rendering. It may target the proposed Qt Scroll container after joint review, but does not adopt that draft or create a second owned content child. Position payload, units and nested-scrolling policy remain deferred contract decisions.

No Child model is declared: the behavior references existing UI objects and does not reparent or duplicate their content. The reference encoding, binding rules and event representation remain pending under the explicit decisions in the [behavior review](../../BEHAVIOR_REVIEW.md). Template parsing is not implementation readiness.
