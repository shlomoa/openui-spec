# Presentation

Presentation defines visual styling notions used by controls, containers, widgets,
pages, and views, including color, typography, shape, border, shadow, elevation, opacity,
iconography, spacing tokens, visual states, theme, motion, visibility, backdrop, blur,
color tint and focus outline.

## Objects

This scope is a folder-level abstraction for presentation vocabulary from
[`taxonomy_mapping.md`](../taxonomy_mapping.md). Concrete visual primitives remain in
[Controls](../Controls/scope.md) and concrete containers remain in
[Containers](../Containers/scope.md).

## Boundaries

The Presentation scope describes technology-independent visual tokens and states; it
does not require CSS variables, a design-token format, animation library, or component
library theme system.

Theme tokens, density, typography and the appearance of interaction feedback, such as a
ripple, are presentation. How themes are packaged and named is outside the scope tree.

Presentation objects follow the shared [scope folder and attribute category rules](../scope.md).
