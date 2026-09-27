# Modal interaction

Review draft for future canonical merge. Follow [the shared template](../../../../../scopes/template.scope.md) and [attribute categories](../../../../../scopes/scope.md). See [decisions](../../BEHAVIOR_DECISIONS.md), [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [evidence](../../PROPOSED_EVIDENCE.md).

## Identity

- id: modalInteraction · type: ModalInteraction · status: draft

## Purpose

A behavior that restricts interaction to an active target within a defined boundary and manages focus for that modal interaction.

## Attributes

- `[target]` — Uses — ID reference to the modal surface.
- `[boundary]` — Uses — ID reference to the interaction-region root containing the target; outside-target interaction inside this boundary is restricted.
- `[active]` — Uses — Whether the modal restriction is active; target presence must agree.
- `[initialFocus]` — Uses — Optional eligible target ID for focus entry; otherwise choose a suitable element based on content.
- `[returnFocus]` — Uses — Optional eligible target ID for return; otherwise use the invoker or workflow fallback.
- `(activate)` — Behaves — Activate restriction and enter target focus under the declared boundary.
- `(deactivate)` — Behaves — Release restriction and restore an eligible focus destination.
- `(activeChanged)` — Produces — Effective modal activation changed.

## Accessibility

Provide an accessible modal name, contained keyboard traversal and an available dismissal/completion route. Initial focus follows content needs; return focus uses a meaningful fallback if the invoker no longer exists.

## Validation notes

D01/D02/D09 apply. Reject missing targets, a boundary not containing the target, unsupported enforcement or conflicting authorities. Nested interactions unwind in reverse activation order. A disabled ancestor cannot be used to simulate modality if it also disables the target. Backdrop rendering is optional appearance, not enforcement. B04 and B06 are parts of this single contract. Native scope enforcement and web focus obligations require adapter validation.
