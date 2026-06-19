# 07. Layout System

**Purpose:** Describe the abstract layout and composition requirements.

**Derived from traversal nodes:** `aggregation-model`, `renderer-dnd-model`

## Specification

- Layout is expressed as ordered or named composition regions exposed through aggregations.
- Responsive behavior must preserve component composition semantics when layout density, theme, or viewport changes.
- Container components may expose drag-and-drop semantics only when declared in metadata.
- Layout containers define how child components are spatially arranged; the arrangement strategy (e.g., grid, flow, split, fixed) is conveyed through typed properties, not through renderer internals.
- Spacing, sizing, and alignment behavior is part of the layout contract when it is declared as public properties on container components.
- Breakpoint-sensitive behavior is expressed through public properties or layout-mode indicators that allow implementations to adapt arrangement without changing the composition tree.
- A layout container's aggregations define which children participate in the arrangement; children not placed into the container's aggregation are not part of the layout flow.

## Non-goals

- The layout system does not prescribe specific CSS, flexbox, grid, or other rendering technology for spatial arrangement.
- The layout system does not define pixel-level breakpoint values; it defines the abstraction through which implementations expose breakpoint awareness.
- The layout system does not require every control to have layout-aware behavior; only container components that declare spatial arrangement properties participate in the layout contract.
- The layout system does not mandate a single global grid; different containers may employ different arrangement strategies simultaneously.

## Tags

- `aggregation-based-layout` — layout structure is modeled through aggregations that define composition regions and child ordering.
- `responsive-layout-contract` — responsive behavior is part of the public component contract when declared through properties or layout-mode indicators.
- `container-arrangement-strategy` — layout containers specify an arrangement strategy (grid, flow, split, fixed) as a typed public property.
- `spacing-and-sizing-properties` — spacing, gap, column count, and sizing constraints are declared as typed public properties on layout containers.
- `breakpoint-awareness` — breakpoint-sensitive layout changes are expressed through public properties that allow implementations to adapt without altering composition.
- `drag-and-drop-layout` — drag-and-drop behavior in layout containers is declared in metadata and is only normative when explicitly exposed.

## Formal definitions

- **Layout container** — a control that arranges its aggregated children according to a spatial strategy declared in public metadata, such as grid, flow, split, or fixed positioning.
- **Composition region** — a named aggregation on a layout container that defines a spatial slot where child components are placed and arranged.
- **Arrangement strategy** — a typed property on a layout container that specifies how children within an aggregation are positioned relative to each other (e.g., columns, rows, wrapping flow).
- **Spacing property** — a public property on a layout container that specifies gaps, margins, or padding between arranged children, independent of a specific rendering technology.
- **Breakpoint** — a declared threshold (e.g., viewport width category) at which a layout container changes its arrangement strategy or the distribution of children across composition regions.
- **Layout density** — a property or mode indicator that adjusts the compactness of spacing and sizing within a layout container without changing the component composition tree.
- **Drag-and-drop layout declaration** — an explicit metadata entry on a container component that enables reordering or repositioning of aggregated children through user interaction.

## Usage and implementation guidance

- Define layout containers as controls with aggregations that represent spatial regions and typed properties that express the arrangement strategy.
- Expose spacing, sizing, and column/row configuration as public properties so application code and generators can configure layout without overriding styles.
- Use breakpoint-aware properties (such as `columnsS`, `columnsM`, `columnsL`, `columnsXL` or a single `breakpoints` property) to let containers adapt their arrangement based on the presentation context.
- Reserve drag-and-drop declarations for containers that explicitly support reordering; never infer drag behavior from composition metadata alone.
- When normalizing layout components into `/openui.json`, preserve aggregation multiplicity, arrangement strategy property names, and spacing property types so generators can reconstruct the layout contract without inspecting renderer code.
- Implementations should ensure that responsive adaptations preserve the logical reading order and accessibility semantics of the composition tree.

## Examples

### Example 1 — grid layout container

```json
{
  "component": "sample.layout.Grid",
  "kind": "control",
  "metadata": {
    "properties": {
      "columns": { "type": "int", "defaultValue": 12 },
      "gap": { "type": "sap.ui.core.CSSSize", "defaultValue": "1rem" },
      "columnsS": { "type": "int", "defaultValue": 1 },
      "columnsM": { "type": "int", "defaultValue": 2 },
      "columnsL": { "type": "int", "defaultValue": 3 },
      "columnsXL": { "type": "int", "defaultValue": 4 }
    },
    "aggregations": {
      "items": { "type": "sap.ui.core.Control", "multiple": true }
    }
  }
}
```

This grid layout container declares a column-based arrangement strategy through typed properties and exposes breakpoint-aware column counts (`columnsS` through `columnsXL`) as part of the public contract.

### Example 2 — responsive split layout

```json
{
  "component": "sample.layout.SplitContainer",
  "kind": "control",
  "metadata": {
    "properties": {
      "orientation": { "type": "sample.layout.Orientation", "defaultValue": "Horizontal" },
      "primarySize": { "type": "sap.ui.core.CSSSize", "defaultValue": "50%" },
      "breakpoint": { "type": "int", "defaultValue": 768 },
      "collapseBelow": { "type": "boolean", "defaultValue": true }
    },
    "aggregations": {
      "primaryContent": { "type": "sap.ui.core.Control", "multiple": false },
      "secondaryContent": { "type": "sap.ui.core.Control", "multiple": false }
    }
  }
}
```

The split container uses named aggregations for its two regions and declares responsive collapse behavior through the `breakpoint` and `collapseBelow` properties.

### Example 3 — flow layout with spacing

```json
{
  "component": "sample.layout.FlowContainer",
  "kind": "control",
  "metadata": {
    "properties": {
      "wrap": { "type": "boolean", "defaultValue": true },
      "gap": { "type": "sap.ui.core.CSSSize", "defaultValue": "0.5rem" },
      "alignItems": { "type": "sample.layout.Alignment", "defaultValue": "Start" },
      "justifyContent": { "type": "sample.layout.Justification", "defaultValue": "Start" }
    },
    "aggregations": {
      "items": { "type": "sap.ui.core.Control", "multiple": true }
    }
  }
}
```

The flow container specifies wrapping behavior, spacing, and alignment as typed public properties, allowing generators to emit appropriate responsive layouts without relying on renderer-specific code.

### Example 4 — drag-and-drop layout declaration

```json
{
  "component": "sample.layout.DragGrid",
  "kind": "control",
  "metadata": {
    "properties": {
      "columns": { "type": "int", "defaultValue": 3 },
      "gap": { "type": "sap.ui.core.CSSSize", "defaultValue": "1rem" }
    },
    "aggregations": {
      "items": { "type": "sap.ui.core.Control", "multiple": true }
    },
    "dnd": {
      "draggable": false,
      "droppable": true
    }
  }
}
```

This container explicitly declares itself as a drop target through the `dnd` metadata entry. Child items may individually declare `draggable: true` in their own metadata. Drag-and-drop behavior is only normative because it is declared in public metadata.

### Example 5 — page-level layout composition

```json
{
  "component": "sample.layout.DynamicPage",
  "kind": "control",
  "metadata": {
    "properties": {
      "headerExpanded": { "type": "boolean", "defaultValue": true },
      "fitContent": { "type": "boolean", "defaultValue": false }
    },
    "aggregations": {
      "header": { "type": "sap.ui.core.Control", "multiple": false },
      "content": { "type": "sap.ui.core.Control", "multiple": true },
      "footer": { "type": "sap.ui.core.Control", "multiple": false }
    }
  }
}
```

A page-level layout uses named aggregations (header, content, footer) to define spatial regions. The `headerExpanded` and `fitContent` properties control layout behavior declaratively without prescribing DOM structure.

## JSON Mapping

- `specification.sections[6]` in `/openui.json`
