# Choice controls

This leaf follows the [leaf scope template](../template.scope.md). It groups
selection-oriented control aliases from the generic UI taxonomy.

## Identity

- id: choiceControls · type: ChoiceControls · status: draft

## Purpose

Choice controls cover checkboxes, radio buttons, switches, dropdowns, list boxes
and combo boxes, including suggestion-backed, multi-select and font-family
variants, that let users select one or more values.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.label` — Uses — string — visible text and accessible name of the control or group.
- `uses.value` — Uses — string — the selected value; with multiple selection, a binding to the selected values.
- `uses.checked` — Uses — boolean — whether a checkbox, radio button or switch is on.
- `uses.indeterminate` — Uses — boolean — whether a checkbox shows the partial (mixed) state.
- `uses.selection` — Uses — enum(single|multiple) — the selection mode: one value or several.
- `uses.required` — Uses — boolean — whether the user must make a choice.
- `uses.disabled` — Uses — boolean — whether the control is unavailable.
- `produces.selectionChange` — Produces — emitted when the selected value or the checked state changes.

## Child model

- option — option — 0..n — a value offered by a dropdown, list box or combo box.

## Accessibility

Choice controls expose selection state, grouping when relevant, and keyboard behavior
consistent with the chosen single-select, multi-select, or on/off interaction.

## Validation notes

- Use this family for selectable input controls; use menu widgets when the primary
  behavior is command selection from an application menu.
- The selection mode (`uses.selection`) is single or multiple. Exclusive selection coordination needs no visible wrapper element.
