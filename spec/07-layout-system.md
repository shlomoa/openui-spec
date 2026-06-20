# 07. Layout System

**Purpose:** Describe the abstract layout and composition requirements.

**Derived from traversal nodes:** `aggregation-model`, `renderer-dnd-model`

## Specification

- Layout is expressed as ordered or named composition regions exposed through aggregations; a region's name and the multiplicity of its backing aggregation define where content is placed and how many children it accepts.
- Composition regions are owned content: their lifecycle and ordering belong to the container, and the document order of children in an ordered region is the normative visual order before any responsive adaptation.
- Responsive behavior must preserve component composition semantics when layout density, theme, or viewport changes: regions may reflow, stack, wrap, or hide, but the identity, ownership, and relative order of their content must remain resolvable from metadata.
- Breakpoints define named viewport ranges at which a layout may adapt; an implementation may change region arrangement at a breakpoint but must not invent, remove, or reparent owned content as a side effect of crossing one.
- Density is a layout-wide modifier that scales spacing and control sizing without changing composition; the same regions and the same children apply at every supported density.
- Spacing between and within regions is drawn from a consistent, theme-driven spacing scale rather than ad-hoc values, so layouts stay aligned across components, densities, and themes.
- Container components may expose drag-and-drop semantics only when declared in metadata; drag-and-drop may reorder or move owned content between regions but must operate within the declared aggregation contract and multiplicity.

## Non-goals

- The layout system does not prescribe a specific CSS technique, grid engine, DOM structure, or runtime framework; grid, flexbox, and absolute strategies are all permissible implementations of the same abstract regions.
- The layout system does not define a fixed set of breakpoints, density levels, or spacing values; it requires that they exist as a consistent, theme-driven scale, not that they take specific pixel measurements.
- The layout system does not introduce a new composition mechanism: regions are aggregations from the component model, and the layout section only constrains how those aggregations are arranged and adapted.
- The layout system does not make drag-and-drop a default capability; reordering and cross-region moves are available only where a container explicitly declares them in metadata.

## Tags

- `composition-region` — layout is expressed as ordered or named regions, each backed by an aggregation whose name and multiplicity define placement and capacity.
- `ordered-content` — children of an ordered region have a normative document order that defines their visual order before responsive adaptation.
- `responsive-behavior` — region arrangement may reflow, stack, wrap, or hide across breakpoints, density, and theme changes while preserving composition semantics.
- `breakpoint-model` — named viewport ranges at which a layout may adapt its arrangement without changing owned content.
- `layout-density` — a layout-wide modifier that scales spacing and sizing without changing which regions or children apply.
- `spacing-scale` — spacing between and within regions is drawn from a consistent, theme-driven scale rather than ad-hoc values.
- `container-dnd` — drag-and-drop reordering or cross-region moves are available only when a container declares them in metadata and stay within the aggregation contract.

## Formal definitions

- **Layout** — the arrangement of a container's composition regions and their content across the available space, including its responsive, density, and spacing behavior.
- **Composition region** — a named or ordered placement target within a container, backed by an aggregation, into which owned child content is placed.
- **Ordered region** — a region whose backing aggregation is a `0..n` collection in which document order is the normative visual order before responsive adaptation.
- **Named region** — a region addressed by a stable name (such as `header`, `content`, or `footer`), typically backed by a `0..1` or `0..n` aggregation, into which content is placed by name.
- **Breakpoint** — a named viewport range that bounds a responsive adaptation; crossing a breakpoint may change arrangement but not owned content.
- **Density** — a layout-wide modifier that scales spacing and control sizing uniformly without changing the set of regions or their children.
- **Spacing scale** — the consistent, theme-driven set of spacing steps used between and within regions instead of ad-hoc values.
- **Responsive behavior** — the rules by which regions reflow, stack, wrap, or hide as viewport, density, or theme change while preserving composition semantics.
- **Drag-and-drop region** — a region whose container declares drag-and-drop in metadata, allowing children to be reordered or moved within the declared aggregation contract.

## Usage and implementation guidance

- Model every layout as a set of aggregation-backed regions before choosing a rendering technique; name the regions that carry meaning (such as `header`, `content`, `aside`, `footer`) and reserve ordered `0..n` aggregations for collections whose sequence matters.
- Treat document order within an ordered region as the source of truth: derive the visual order from the aggregation, and let responsive rules change arrangement without re-sorting or reparenting the underlying children.
- Express responsive adaptation as breakpoint-driven arrangement changes (reflow, stacking, wrapping, or hiding) that leave the region set and its owned content intact, so the composition tree stays resolvable from metadata at every viewport.
- Apply density and theming as layout-wide modifiers sourced from the spacing scale and design tokens, rather than hard-coding per-component spacing, so density and theme changes preserve alignment and composition.
- Declare drag-and-drop only where reordering or cross-region moves are part of the contract, and constrain it to the target aggregation's child type and multiplicity so a drop can never violate the component model.
- When normalizing a layout into `/openui.json`, preserve each region's aggregation name, child type, multiplicity, and any drag-and-drop declaration so tooling can reconstruct the layout contract without inspecting renderer code.

## Examples

### Example 1 — ordered and named composition regions

```json
{
  "component": "sample.layout.Page",
  "metadata": {
    "defaultAggregation": "content",
    "aggregations": {
      "header": {
        "type": "sap.ui.core.Control",
        "multiple": false,
        "visibility": "public"
      },
      "content": {
        "type": "sap.ui.core.Control",
        "multiple": true,
        "visibility": "public"
      },
      "footer": {
        "type": "sap.ui.core.Control",
        "multiple": false,
        "visibility": "public"
      }
    }
  }
}
```

A page declares its layout as named composition regions: `header` and `footer` are `0..1` single-content regions, while `content` is an ordered `0..n` region whose document order is the normative visual order of its children.

### Example 2 — responsive grid across breakpoints

```json
{
  "component": "sample.layout.Grid",
  "metadata": {
    "defaultAggregation": "items",
    "properties": {
      "columns": { "type": "int", "defaultValue": 12, "visibility": "public" }
    },
    "aggregations": {
      "items": {
        "type": "sample.layout.GridItem",
        "multiple": true,
        "visibility": "public"
      }
    }
  },
  "responsive": {
    "breakpoints": {
      "compact": { "maxWidth": "599px", "columns": 1 },
      "medium": { "minWidth": "600px", "columns": 6 },
      "expanded": { "minWidth": "1024px", "columns": 12 }
    }
  }
}
```

A grid keeps the same ordered `items` aggregation at every breakpoint and only changes how many columns the row spans across, so reflow preserves the identity and order of the owned grid items.

### Example 3 — density and spacing scale

```json
{
  "component": "sample.layout.Form",
  "metadata": {
    "properties": {
      "density": {
        "type": "sample.layout.Density",
        "defaultValue": "cozy",
        "visibility": "public"
      }
    }
  },
  "spacing": {
    "scale": ["0", "0.25rem", "0.5rem", "1rem", "1.5rem", "2rem"],
    "density": {
      "cozy": { "rowGap": "1rem", "controlHeight": "3rem" },
      "compact": { "rowGap": "0.5rem", "controlHeight": "2rem" }
    }
  }
}
```

A form exposes `density` as a layout-wide modifier that selects spacing and control sizing from a shared spacing scale; the same regions and children apply at every density, only their spacing changes.

### Example 4 — container drag-and-drop region

```json
{
  "component": "sample.layout.Board",
  "metadata": {
    "defaultAggregation": "columns",
    "aggregations": {
      "columns": {
        "type": "sample.layout.BoardColumn",
        "multiple": true,
        "visibility": "public",
        "dnd": { "draggable": true, "droppable": true, "layout": "Horizontal" }
      }
    }
  }
}
```

A board declares drag-and-drop on its ordered `columns` aggregation, so columns may be reordered within the declared `0..n` contract; the drag-and-drop capability is part of the metadata and never moves content outside the aggregation's child type or multiplicity.

## JSON Mapping

- `specification.sections[6]` in `/openui.json`
