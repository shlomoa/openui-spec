# Scroll lock

Review draft only, pending the decision in the [extension proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md). Follows the [leaf template](../../../../../scopes/template.scope.md) and [scope rules](../../../../../scopes/scope.md); shared meanings remain in the [spec glossary](../../../../../README.md#glossary). New keys below are explicit candidate neutral design decisions, not already approved framework-derived contracts.

## Identity

- id: scrollLock · type: ScrollLock · status: draft

## Purpose

A reusable policy temporarily suspends page-background viewport scrolling while an associated feature requests a lock. It leaves the active surface and its internal content scrolling under their own owners.

## Attributes

- `[target]` — Uses — Reference to the page whose background viewport is to be locked; arbitrary nested-region locking is not proposed from the current evidence.
- `[active]` — Uses — Boolean derived from the requesting feature state; default false. Activation requests a lock and deactivation releases that request.
- `[restorePosition]` — Uses — Boolean requesting preservation and restoration of the prior page scroll position when the final lock releases; default true.

## Accessibility

Locking background scroll must not make the active interaction surface or its meaningful overflow unreachable. Scroll locking does not itself move focus, trap it, hide background content from assistive technology, or establish modality.

## Validation notes

AM-P05 draws on B13 and the bounded contextual block strategy. One page-level coordinator owns the physical lock; multiple requests must not restore scrolling while another active request remains. A request releases only its own participation. The first effective request records the restoration state and the final release applies it if still valid. These coordination rules are proposed neutral obligations, not a claim that the inspected CDK implementation implements every nested case. Host dismissal and internal Scrollable regions have separate owners. Restoration on route/layout replacement and lifecycle cleanup on host destruction remain explicit merge decisions. No extra close/cancel/scroll event or native CSS class is introduced.

No Child model is declared: the behavior references existing UI objects and does not reparent or duplicate their content. The reference encoding, binding rules and event representation remain pending under the explicit decisions in the [behavior review](../../BEHAVIOR_REVIEW.md). Template parsing is not implementation readiness.
