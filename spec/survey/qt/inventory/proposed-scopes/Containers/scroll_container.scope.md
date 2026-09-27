# Scroll container

Review draft for future canonical merge. Follow [the shared template](../../../../../scopes/template.scope.md) and [attribute categories](../../../../../scopes/scope.md). See [decisions](../../BEHAVIOR_DECISIONS.md), [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [evidence](../../PROPOSED_EVIDENCE.md).

## Identity

- id: scrollContainer · type: ScrollContainer · status: draft

## Purpose

A container that owns content viewed through a bounded viewport. Its scrolling capability can be supplied through the viewport-scrolling behavior.

## Attributes

- `[horizontalPolicy]` — Uses — Horizontal bar presentation: as-needed, always or never.
- `[verticalPolicy]` — Uses — Vertical bar presentation: as-needed, always or never.
- `[contentResizable]` — Uses — Whether content adapts to the viewport within its constraints.
- `[scrolling]` — Uses — Optional ID reference to the controlling ViewportScrolling behavior; absent means the host uses its supported native scrolling profile.

## Child model

- scrollContent — section — 1 — Owned content region containing any nested content.

## Accessibility

Keep overflowed meaningful content reachable by keyboard; focused content may request reveal without conflating reveal with focus assignment. Hidden bars must not remove every route to content.

## Validation notes

Bar presentation does not determine scrollability. D01/D03/D09 define target references and one-controller authority. The associated behavior must target this viewport. Bounds derive from the content and viewport, not duplicated UI ownership. Unsupported overflow handling must be declared.
