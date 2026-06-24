# 13. Navigation Model

**Purpose:** Describe the navigation structures the framework must support.

## Specification

- The framework must support navigable page containers, dialogs, and shell-level composition primitives.
- Navigation state must be expressible as public component state and events rather than hidden renderer behavior.
- Route-aware or deep-linkable components should be discoverable from the public component catalog.
- Navigable containers must own their pages through a public aggregation and expose the active page as public state addressable by id or reference.
- Navigation transitions and overlay dismissal must carry typed parameters — such as the source page, target page, route name, and arguments — so consumers can react without inspecting renderer internals.

## Non-goals

- The navigation model does not define a specific router implementation, URL syntax, or browser history API; it constrains the public navigation contract, not the routing engine.
- The navigation model does not prescribe transition animations, DOM structure, or CSS used to realize a navigation.
- The navigation model does not require every container to expose deep-linkable routes; routing is layered onto the navigable-container contract only when an application needs addressable state.

## Tags

- `navigable-container` — navigable page containers own an ordered set of pages and move between them through public navigation methods and events.
- `navigation-events` — navigation transitions are reported through public events such as `navigate` and `afterNavigate` rather than hidden renderer behavior.
- `overlay-navigation` — dialogs and popovers provide transient modal or contextual surfaces whose open and close state is part of the public contract.
- `shell-composition` — shell-level primitives compose application chrome such as header, side navigation, and content area around navigable containers.
- `route-deep-linking` — route-aware components map URL patterns to navigation targets so application state is deep-linkable and discoverable in the public component catalog.

## Formal definitions

- **Navigation container** — a component that owns an ordered set of pages through a public aggregation and exposes public operations and events to move between them.
- **Page** — a navigable content unit held in a navigation container's aggregation and addressed by id or reference.
- **Navigation event** — a public event a container emits before or after a transition, such as `navigate` or `afterNavigate`, carrying the source and target page as typed parameters.
- **Overlay** — a transient navigation surface such as a dialog or popover whose visibility is controlled by public open and close operations and an open state property.
- **Shell** — a top-level composition primitive that arranges application chrome and hosts navigable containers and routed content.
- **Route** — a pattern that binds a URL fragment to a navigation target so a navigation state is addressable and deep-linkable.
- **Target** — the page, view, or component a route resolves to when its pattern matches.

## Usage and implementation guidance

- Model multi-page flows with a navigable container that exposes its pages as a public aggregation and its current page as public state, rather than swapping DOM behind a private renderer.
- Expose navigation as public methods (such as `to` and `back`) and public events (such as `navigate` and `afterNavigate`) so applications and generators can both observe and drive transitions.
- Represent dialogs and popovers as overlay components with public open and close operations and an open state property, and report dismissal through public events such as `afterClose`.
- Compose shell-level chrome with a shell or tool-page primitive that hosts a side navigation, a header, and a routed content area built from navigable containers.
- Bind deep-linkable navigation to routes by mapping URL patterns to targets, and keep route-aware components discoverable in the public component catalog.
- Preserve typed navigation parameters — source page, target page, route name, and arguments — when normalizing metadata into `/openui.json` so tooling can reconstruct the navigation contract.

## Examples

### Example 1 — navigable page container

```json
{
  "component": "sample.library.NavContainer",
  "metadata": {
    "defaultAggregation": "pages",
    "aggregations": {
      "pages": {
        "type": "sample.library.Page",
        "multiple": true,
        "visibility": "public"
      }
    },
    "associations": {
      "currentPage": { "type": "sample.library.Page", "multiple": false }
    }
  }
}
```

A navigation container owns its pages through a `0..n` public aggregation and identifies the active page through a `currentPage` association, so the navigation state is expressed as public metadata rather than hidden renderer behavior.

### Example 2 — navigation events with typed parameters

```json
{
  "component": "sample.library.NavContainer",
  "metadata": {
    "events": {
      "navigate": {
        "parameters": {
          "from": { "type": "sample.library.Page" },
          "to": { "type": "sample.library.Page" },
          "direction": { "type": "string" }
        }
      },
      "afterNavigate": {
        "parameters": {
          "from": { "type": "sample.library.Page" },
          "to": { "type": "sample.library.Page" }
        }
      }
    }
  }
}
```

The container reports each transition through public `navigate` and `afterNavigate` events whose typed `from`, `to`, and `direction` parameters let consumers react to navigation without inspecting renderer internals.

### Example 3 — overlay navigation

```json
{
  "component": "sample.library.Dialog",
  "metadata": {
    "properties": {
      "open": { "type": "boolean", "defaultValue": false },
      "title": { "type": "string", "defaultValue": "" }
    },
    "aggregations": {
      "content": { "type": "sap.ui.core.Control", "multiple": true }
    },
    "events": {
      "afterOpen": { "parameters": {} },
      "afterClose": {
        "parameters": { "origin": { "type": "sap.ui.core.Control" } }
      }
    }
  }
}
```

A dialog is a transient overlay whose visibility is public `open` state; its `afterOpen` and `afterClose` events expose open and dismissal transitions, with `afterClose` reporting the control that triggered the close.

### Example 4 — shell composition and route-aware deep-linking

```json
{
  "component": "sample.library.ToolPage",
  "metadata": {
    "aggregations": {
      "header": { "type": "sample.library.Shell", "multiple": false },
      "sideContent": {
        "type": "sample.library.SideNavigation",
        "multiple": false
      },
      "mainContents": {
        "type": "sample.library.NavContainer",
        "multiple": true
      }
    }
  },
  "routing": {
    "routes": [
      { "name": "orders", "pattern": "orders", "target": "ordersPage" },
      { "name": "order", "pattern": "orders/{orderId}", "target": "orderPage" }
    ],
    "targets": {
      "ordersPage": { "viewName": "Orders" },
      "orderPage": { "viewName": "Order" }
    }
  }
}
```

A shell-level tool page composes a header, side navigation, and one or more navigable containers, while its routing configuration maps URL patterns such as `orders/{orderId}` to targets so the navigation state stays deep-linkable and catalog-discoverable.
