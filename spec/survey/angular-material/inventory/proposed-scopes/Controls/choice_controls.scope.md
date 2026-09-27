# Choice controls

Review copy for AM-E01, pending acceptance. See [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md). Existing identity and machine fields are preserved except changes explicitly identified in the proposal.

This leaf follows the [leaf scope template](../../../../../scopes/template.scope.md). It groups
selection-oriented control aliases from the generic UI taxonomy.

## Identity

- id: choiceControls · type: ChoiceControls · status: draft

## Purpose

Choice controls cover checkboxes, radio buttons, switches, toggles, dropdowns,
list boxes, and combo boxes that let users select one or more values.

## Attributes

Categories are defined in [`../scope.md`](../../../../../scopes/scope.md). This family inherits concrete
selection state and option attributes from the selected control implementation.

## Child model

Choice controls do not define a fixed child model at this abstraction level.

## Accessibility

Choice controls expose selection state, grouping when relevant, and keyboard behavior
consistent with the chosen single-select, multi-select, or on/off interaction.

## Validation notes

- Use this family for selectable input controls; use menu widgets when the primary
  behavior is command selection from an application menu.

A choice may be presented through an attached suggestion list or a retained toggle group. When composed with text input, selection and free text remain distinct capabilities; command menus retain menu semantics.

No new attributes. Coordinate with the Qt completion behavior proposal before introducing an independent completion leaf.
