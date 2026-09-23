# Dialog

Review copy for AM-E11, pending acceptance. See [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md). Existing identity and machine fields are preserved except changes explicitly identified in the proposal.

This leaf follows the [leaf scope template](../../../../scopes/template.scope.md). Its contract is
drawn from the native HTML `dialog` element and the `spec/README.md` scope rule,
recorded technology-independently.

## Identity

- id: dialog · type: dialog · status: draft

## Purpose

A modal or non-modal interaction surface that overlays the page with a title,
content, and actions.

## Attributes

Categories are defined in [`../scope.md`](../../../../scopes/scope.md):

- `[open]` — Uses — boolean: whether the dialog is shown.
- `[modal]` — Uses — boolean: modal vs non-modal.
- `(close)` — Produces — emitted when the dialog closes.
- `(cancel)` — Produces — emitted when the dialog is dismissed (e.g. via Escape).

## Child model

A dialog owns three ordered regions:

- dialogTitle — header — 0..1 — title region.
- dialogContent — section — 1 — content region.
- dialogActions — footer — 0..1 — actions region.

## Accessibility

- Exposes the `dialog` role, or `alertdialog` for confirmations.
- Labelled by its title via `aria-labelledby` and described by its content via
  `aria-describedby`.
- Sets `aria-modal` while modal; focus moves into the dialog and is contained while modal interaction is active.
- `Escape` normally requests dismissal. When the host permits dismissal, it emits `(cancel)` according to the existing contract; a rejected request is not a completed cancellation.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Children follow the ordered title → content → actions sequence.

The dialog owns open/modal state, title/content/actions and completed lifecycle notifications. If Modal interaction is attached, its active state derives from the host and its dismissal request routes once to host authorization. Do not install a second independent focus trap or duplicate cancel/close notifications. Scroll lock targets the page background; Scrollable may target the dialog content. The proposed conditional Escape wording changes the current unconditional prose and requires explicit acceptance; the existing fields and regions remain unchanged.
