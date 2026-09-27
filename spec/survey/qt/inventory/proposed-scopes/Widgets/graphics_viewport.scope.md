# Graphics viewport

Review draft for future canonical merge. Follow [the shared template](../../../../../scopes/template.scope.md) and [attribute categories](../../../../../scopes/scope.md). See [decisions](../../BEHAVIOR_DECISIONS.md), [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [evidence](../../PROPOSED_EVIDENCE.md).

## Identity

- id: graphicsViewport · type: GraphicsViewport · status: draft

## Purpose

A widget that presents borrowed scene content and optionally supports panning or region selection.

## Attributes

- `[scene]` — Uses — Opaque application resource reference to borrowed scene data, resolved by the adapter under D06.
- `[dragMode]` — Uses — none, pan or region-selection; the adapter must support the selected mode.
- `[scrolling]` — Uses — Optional ID reference to the controlling ViewportScrolling behavior for viewport motion.

## Accessibility

Provide equivalent access to significant scene information and keyboard alternatives for enabled pan/selection operations. Name the viewport and expose meaningful selected objects.

## Validation notes

Borrowing a scene neither duplicates nor reparents its objects. Unresolvable/unsupported scene resources produce an explicit capability failure. B11/B28 describe selection/transforms; geometry editing is not built in. D09 arbitrates mutually exclusive drag modes and attached scrolling. No generator support is implied.
