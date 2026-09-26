# Modal interaction

Review draft only, pending the decision in the [extension proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md). Follows the [leaf template](../../../../../scopes/template.scope.md) and [scope rules](../../../../../scopes/scope.md); shared meanings remain in the [spec glossary](../../../../../README.md#glossary). New keys below are explicit candidate neutral design decisions, not already approved framework-derived contracts.

## Identity

- id: modalInteraction · type: ModalInteraction · status: draft

## Purpose

A reusable interaction policy coordinates focus and background interaction while an existing host is explicitly active as a modal surface. It delegates lifecycle state and the decision to close to that host.

## Attributes

- `[target]` — Uses — Reference to the existing modal-capable host; no content ownership is transferred.
- `[active]` — Uses — Boolean derived from the host being open in modal mode; the behavior does not maintain a competing open state.
- `[initialFocus]` — Uses — Optional reference to a suitable focus target inside the host; if absent, use the first suitable focusable descendant or a focusable host fallback.
- `[restoreFocus]` — Uses — Boolean controlling restoration to the previously focused element after deactivation; default true. The host supplies a fallback if that element is no longer available.
- `[dismissOnEscape]` — Uses — Boolean allowing an Escape interaction to request dismissal; default true. Host authorization still determines whether closing occurs.
- `[dismissOnBackdrop]` — Uses — Boolean allowing a backdrop interaction to request dismissal when the host supplies one; default true.
- `(dismissRequested)` — Produces — Reports a permitted user dismissal request with its reason; it does not report or perform completed closure.

## Accessibility

The host provides its semantic role and accessible name. While active, focus remains within the active modal surface and unrelated background content is unavailable for interaction. Deactivation releases isolation and restores focus when configured and still appropriate. A backdrop or an ARIA property alone is insufficient. Nested surfaces require one coordinated focus owner; no trap applies to an ordinary non-modal popup.

## Validation notes

AM-P03 draws on B03–B06/B08. Resolve the target to a host that explicitly supports modal operation. Feed activation from host state in one direction; do not create a second writable open/modal value. The host processes a dismissal request through its close policy and emits existing cancel/close notifications at their defined lifecycle points, at most once. Rejected requests leave the host and behavior active. Programmatic closure need not emit a user-dismissal request. Page scroll locking is a separate optional composition with AM-P05; scrollable surface content remains independent. Defaults above are proposed design decisions and require acceptance. Nested-owner precedence, destroyed focus targets and close-veto ordering remain explicit merge decisions, not promises of general conformance.

No Child model is declared: the behavior references existing UI objects and does not reparent or duplicate their content. The reference encoding, binding rules and event representation remain pending under the explicit decisions in the [behavior review](../../BEHAVIOR_REVIEW.md). Template parsing is not implementation readiness.
