# Display primitives

This leaf follows the [leaf scope template](../template.scope.md). It groups
non-composite rendering aliases from the generic UI taxonomy.

## Identity

- id: displayPrimitives · type: DisplayPrimitives · status: draft

## Purpose

Display primitives cover labels, text, images, icons, avatars, separators or
dividers, calculated output, highlighted text and geometric shapes that render
content without owning a complex interaction model.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.text` — Uses — string — the text a label, text, highlighted text or calculated output shows.
- `uses.src` — Uses — url — the source of an image, icon or avatar picture.
- `uses.alt` — Uses — string — the text alternative of an image, icon or avatar.
- `uses.decorative` — Uses — boolean — whether the primitive is decoration that assistive technology ignores.
- `uses.for` — Uses — reference — the element a label names.
- `uses.orientation` — Uses — enum(horizontal|vertical) — the direction of a separator.

## Accessibility

Display primitives expose text alternatives, labeling relationships, and decorative
semantics according to the selected primitive and its role in the UI.

## Validation notes

- Use this family for render-only primitives; use widgets when the rendered object
  owns composite behavior.
- A geometric shape is concrete geometry. It is not the Shape presentation definition.
