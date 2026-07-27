# Display primitives

This leaf follows the [leaf scope template](../template.scope.md). It groups
non-composite rendering aliases from the generic UI taxonomy.

## Identity

- id: displayPrimitives · type: DisplayPrimitives · status: draft

## Purpose

Display primitives cover labels, text, images, icons, avatars, and separators or
dividers that render content without owning a complex interaction model.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
content, source, alternative text, and decorative-state attributes from the selected
primitive.

## Child model

Display primitives do not define a fixed child model at this abstraction level.

## Accessibility

Display primitives expose text alternatives, labeling relationships, and decorative
semantics according to the selected primitive and its role in the UI.

## Validation notes

- Use this family for render-only primitives; use widgets when the rendered object
  owns composite behavior.
