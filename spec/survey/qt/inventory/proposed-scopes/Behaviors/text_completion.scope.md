# Text completion

Review draft for future canonical merge. Follow [the shared template](../../../../../scopes/template.scope.md) and [attribute categories](../../../../../scopes/scope.md). See [decisions](../../BEHAVIOR_DECISIONS.md), [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [evidence](../../PROPOSED_EVIDENCE.md).

## Identity

- id: textCompletion · type: TextCompletion · status: draft

## Purpose

A behavior that assists text entry by offering candidates and accepting a selected completion.

## Attributes

- `[target]` — Uses — ID reference to an eligible text-entry target.
- `[candidates]` — Uses — Ordered candidate strings supplied by the application.
- `[mode]` — Uses — Popup or inline suggestion presentation.
- `[caseSensitive]` — Uses — Whether matching distinguishes case.
- `(completionAccepted)` — Produces — Accepted candidate and resulting target text are available to the host.

## Accessibility

Support keyboard candidate selection and dismissal while preserving text editing. Expose suggestions and current option appropriately for the selected presentation pattern.

## Validation notes

D01/D05 define reference resolution and replacement-range agreement. Dismissal preserves the typed value; acceptance does not submit or navigate. Candidates are data, not owned UI children. Stale source results must not replace a later input value. The proposed output is semantic, not a claim of a Qt signal signature.
