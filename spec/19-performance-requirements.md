# 19. Performance Requirements

**Purpose:** Describe performance-oriented expectations that follow from the public model.

## Specification

- Public library catalogs must allow eager discovery of available components without eagerly loading every implementation detail, so applications can resolve what exists before paying the cost of loading how it works.
- Machine-readable API projections must be derivable from the same public contract used by runtime metadata, so tooling consumes a generated projection instead of re-deriving the contract at runtime.
- Visual assets and behavior must support lazy or conditional loading when the public contract permits it, so components defer loading work that a given view does not require.
- Components that own large or unbounded collections through aggregations must support virtualization, so only the items needed for the current viewport are materialized.
- Immutable public projections, such as the API projection and catalog metadata, must be cacheable by a stable identity so repeated reads avoid recomputation and refetching.
- Performance-relevant behavior must be expressed through the public contract, such as a busy-indicator delay or a lazy-loading flag, rather than hidden renderer timing that applications cannot observe or control.
- Performance expectations must be stated as observable, measurable budgets, such as a maximum number of initially materialized rows, rather than as renderer-specific implementation details.

## Non-goals

- The performance model does not mandate specific latency numbers, frame budgets, or hardware baselines; it defines which performance behaviors are observable through the public contract, not absolute thresholds.
- The performance model does not prescribe a bundler, module format, caching server, or network protocol; lazy loading and caching are expressed as contract capabilities, not transport choices.
- The performance model does not replace the data-binding, component, or feedback sections; it reuses their aggregation, metadata, and busy-state contracts rather than defining new ones.
- The performance model does not require every component to be lazy or virtualized; only components whose public contract permits deferred loading or owns large collections participate.

## Tags

- `eager-discovery-lazy-detail` — public catalogs expose what components exist for eager discovery while deferring the loading of each component's implementation detail.
- `api-projection-cacheable` — the machine-readable API projection is derived from the public contract and is cacheable by a stable identity instead of recomputed at runtime.
- `lazy-conditional-loading` — visual assets and behavior load lazily or conditionally when the public contract permits, so a view defers work it does not need.
- `aggregation-virtualization` — components that own large or unbounded aggregations materialize only the items required for the current viewport.
- `projection-caching` — immutable public projections such as catalog metadata and the API projection are cached by stable identity to avoid recomputation and refetching.
- `observable-performance-state` — performance-relevant behavior such as a busy-indicator delay or lazy-loading flag is part of the public contract rather than hidden renderer timing.

## Formal definitions

- **Performance budget** — an observable, measurable limit on a performance-relevant quantity, such as the maximum number of rows materialized before virtualization engages.
- **Eager discovery** — resolving which components, types, and interfaces a library catalog publishes without loading each component's full implementation.
- **Lazy loading** — deferring the loading of a component's assets or behavior until a view actually requires them, as permitted by the public contract.
- **Conditional loading** — loading assets or behavior only when a declared public condition, such as a property value or active route, is satisfied.
- **Virtualization** — materializing only the subset of a large or unbounded aggregation that the current viewport needs while preserving the declared child type and ordering.
- **API projection** — a machine-readable serialization of the public contract derived from runtime metadata, intended to be cached and consumed by tooling.
- **Projection cache** — a store keyed by the stable identity of an immutable projection so repeated reads reuse the result instead of recomputing or refetching it.

## Usage and implementation guidance

- Resolve the public catalog to discover available components before loading implementations, so eager discovery stays independent of how much detail each component eventually loads.
- Derive the machine-readable API projection from the public contract once and cache it by a stable identity, so tooling reads a generated artifact instead of re-deriving the contract at runtime.
- Mark assets and behavior as lazily or conditionally loaded in the public contract, and defer their loading until a view needs them, while keeping the declared component identity and types intact.
- Virtualize components that own large or unbounded aggregations so only the items in the current viewport are materialized, and express the materialization budget as observable public state.
- Preserve performance-relevant contract members such as the busy-indicator delay, lazy-loading flags, and virtualization budgets in `/openui.json` so generators and tests can reconstruct the performance contract.

## Examples

### Example 1 — eager discovery with lazy detail

```json
{
  "catalog": "sample.library",
  "components": [
    { "name": "sample.library.OrderTable", "type": "control", "lazy": true },
    { "name": "sample.library.OrderForm", "type": "control", "lazy": true }
  ],
  "detail": {
    "load": "on-demand",
    "by": "name"
  }
}
```

The catalog lists component identity and type so applications can discover what exists eagerly, while each component's full metadata is loaded `on-demand` by `name`. Eager discovery therefore stays cheap and independent of how much implementation detail each component eventually loads.

### Example 2 — cacheable API projection

```json
{
  "projection": "api-json",
  "derivedFrom": "public-contract",
  "version": "1.4.0",
  "cache": {
    "key": "sample.library@1.4.0",
    "immutable": true
  },
  "symbols": [
    {
      "name": "sample.library.OrderTable",
      "kind": "control",
      "properties": ["rows", "growing", "growingThreshold"]
    }
  ]
}
```

The API projection is derived from the same public contract as runtime metadata and is tagged with a stable `version`. Because the projection is `immutable` for a given version, it is cached by the `key` `sample.library@1.4.0` and reused instead of recomputed or refetched.

### Example 3 — aggregation virtualization budget

```json
{
  "component": "sample.library.OrderTable",
  "metadata": {
    "properties": {
      "growing": { "type": "boolean", "defaultValue": true },
      "growingThreshold": { "type": "int", "defaultValue": 20 }
    },
    "aggregations": {
      "items": {
        "type": "sample.library.OrderRow",
        "multiple": true,
        "virtualized": true
      }
    }
  }
}
```

The table owns an unbounded `items` aggregation that is `virtualized`, and the `growingThreshold` declares a public materialization budget of 20 rows. Only the rows needed for the current viewport are materialized, and the budget is observable public state rather than hidden renderer behavior.

### Example 4 — generator output lazy route and virtual scroll

```typescript
// Lazy-loaded route: the orders feature is loaded only when its route activates.
export const routes: Routes = [
  {
    path: "orders",
    loadComponent: () =>
      import("./orders/orders-page").then((m) => m.OrdersPage),
  },
];

@Component({
  selector: "sample-orders-page",
  imports: [ScrollingModule, MatListModule],
  template: `
    <cdk-virtual-scroll-viewport itemSize="48" class="orders-viewport">
      <mat-list>
        <mat-list-item *cdkVirtualFor="let order of orders()">
          {{ order.id }} — {{ order.customer }}
        </mat-list-item>
      </mat-list>
    </cdk-virtual-scroll-viewport>
  `,
})
export class OrdersPage {
  // The virtual viewport materializes only the rows visible in the viewport,
  // honoring the virtualization budget declared in the component contract.
  readonly orders = input<readonly OrderRow[]>([]);
}
```

A generator maps the performance contract onto host-framework primitives: the lazy-loading flag becomes a lazily loaded route so the feature loads only when activated, and the virtualized aggregation becomes a virtual-scroll viewport that materializes only the visible rows while preserving the declared child type.
