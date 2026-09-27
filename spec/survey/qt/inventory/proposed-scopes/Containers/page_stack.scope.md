# Page stack

Review draft for future canonical merge. Follow [the shared template](../../../../../scopes/template.scope.md) and [attribute categories](../../../../../scopes/scope.md). See [decisions](../../BEHAVIOR_DECISIONS.md), [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [evidence](../../PROPOSED_EVIDENCE.md).

## Identity

- id: pageStack · type: PageStack · status: draft

## Purpose

A content container that presents one current region from a set of alternatives without requiring an integrated selector.

## Attributes

- `[currentIndex]` — Uses — Zero-based selected child position; -1 only when empty.
- `(currentChanged)` — Produces — The current content region changed.

## Child model

- pageContent — section — 0..n — Alternative owned content regions.

## Accessibility

Inactive regions leave ordinary focus navigation. If switching removes the focused target, move focus to a meaningful active target. Associate any external selector with its content.

## Validation notes

A nonempty stack has one active child. Reject invalid selection; when removing the current child, select the next surviving child at that position or the previous last child, and use the empty state when none remains. B18 defines switching. All-layer composition is different. The existing Stack vocabulary includes depth-axis arrangement; active-content semantics distinguish this object.
