# Dialog

This leaf follows the [leaf scope template](../template.scope.md). Its contract is
drawn from the native HTML `dialog` element and the `spec/README.md` scope rule,
recorded technology-independently.

## Identity

- id: dialog · type: dialog · status: draft

## Purpose

A modal or non-modal interaction surface that overlays the page with a title,
content, and actions.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

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
- Sets `aria-modal` while modal; focus moves into the dialog and is trapped until
  it closes.
- `Escape` dismisses the dialog, emitting `(cancel)`.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Children follow the ordered title → content → actions sequence.
