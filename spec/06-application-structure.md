# 06. Application Structure

**Purpose:** Describe the required structure of applications built on the framework.

**Derived from traversal nodes:** `library-catalog-root`, `library-component-catalog`

## Specification

- Applications compose pages, dialogs, forms, lists, and navigation containers from library-published components rather than from framework-private primitives.
- The framework must support a navigable shell-level structure and a page hierarchy built entirely from public components discoverable through the library catalog.
- A shell is the top-level application container that hosts global navigation and a content area into which pages and nested containers are placed.
- Page hierarchy is expressed through public composition metadata so that parent pages, nested pages, and embedded containers can be resolved without reading component internals.
- Library dependencies must be explicit so that the application structure can be resolved by reading the dependency declaration and the public component catalog alone.
- Every component referenced by the application structure must resolve to a public control or element published by a declared library dependency.

## Non-goals

- The application structure does not prescribe a specific routing engine, URL scheme, history strategy, or renderer for the shell and its pages.
- The application structure does not require a fixed number of regions, navigation levels, or page depth; those are determined by the composed components and their public metadata.
- The application structure does not infer the application graph from private wiring, build configuration, or runtime-only behavior that is absent from the public component catalog and explicit dependency declaration.

## Tags

- `library-composed-application` — applications are assembled from controls and elements published by declared library dependencies, not from framework-private primitives.
- `shell-level-structure` — a top-level shell container hosts global navigation and a content area that frames the application's page hierarchy.
- `page-hierarchy` — pages and nested containers form a parent-child hierarchy expressed through public composition metadata.
- `explicit-library-dependencies` — every library that contributes components to the application structure is declared explicitly so the structure resolves without source inspection.
- `public-component-resolution` — every structural node references a public control or element resolvable from a declared dependency's catalog.

## Formal definitions

- **Application** — a composition of library-published controls and elements arranged into a navigable shell and page hierarchy that resolves entirely from public metadata and explicit library dependencies.
- **Shell** — the top-level application container responsible for hosting global navigation and a content area into which pages and nested containers are placed.
- **Page** — a navigable structural unit, modeled as a public control, that frames primary content and may contain nested pages, regions, and containers.
- **Navigation container** — a public component, such as a shell, split container, or tabbed container, whose aggregations hold the pages or views between which the application navigates.
- **Library dependency** — an explicit declaration that an application or library relies on another library, making that library's public component catalog available for structural composition.

## Usage and implementation guidance

- Resolve the application structure by reading the explicit library dependency declaration first, then enumerating the public controls and elements those libraries publish, and only then composing the shell and pages from that catalog.
- Model the shell as a navigation container whose aggregations hold pages and nested containers, and express each region (such as navigation, header, and content) through named aggregations rather than renderer-specific DOM assumptions.
- Build the page hierarchy from controls and elements connected through aggregations, reserving associations for non-owning references such as the currently selected page or an initial page.
- Keep library dependencies explicit and minimal so that tooling, validators, and generators can reconstruct the full application graph from the dependency declaration plus the public component catalog without reverse-engineering runtime code.
- When normalizing the structure into `/openui.json`, preserve dependency names, container aggregations, child types, multiplicity, and the semantic role of each region so the navigable hierarchy can be rebuilt deterministically.

## Implementation notes

- Implementations should publish navigation containers, shells, and pages through stable library catalogs so applications, validators, and generators can resolve the structure without source inspection.
- Applications should declare their library dependencies explicitly and reference a single root component so the full application graph can be reconstructed from the dependency declaration plus public metadata.
- Extraction and generator pipelines should rebuild the shell and page hierarchy from container aggregations while treating references such as the current or initial page as non-owning associations.

## Examples

### Example 1 — explicit library dependencies for an application

```json
{
  "application": {
    "name": "sample.app",
    "dependencies": ["sample.library", "sample.layout"],
    "rootComponent": "sample.app.Shell"
  }
}
```

The application declares its library dependencies explicitly and names a single root component, so the structure can be resolved from the dependency catalog without inspecting component internals.

### Example 2 — shell-level structure with global navigation

```json
{
  "component": "sample.app.Shell",
  "metadata": {
    "aggregations": {
      "navigation": { "type": "sample.library.NavList", "multiple": false },
      "header": { "type": "sample.library.Control", "multiple": false },
      "pages": { "type": "sample.library.Page", "multiple": true }
    },
    "associations": {
      "currentPage": { "type": "sample.library.Page", "multiple": false }
    }
  }
}
```

The shell models global navigation, an optional header, and a set of owned pages through named aggregations, while the currently displayed page is a non-owning association.

### Example 3 — page hierarchy with nested containers

```json
{
  "components": [
    {
      "name": "sample.library.Page",
      "kind": "control",
      "aggregations": {
        "content": { "type": "sample.library.Control", "multiple": true },
        "subPages": { "type": "sample.library.Page", "multiple": true }
      }
    },
    {
      "name": "sample.layout.SplitContainer",
      "kind": "control",
      "aggregations": {
        "masterPages": { "type": "sample.library.Page", "multiple": true },
        "detailPages": { "type": "sample.library.Page", "multiple": true }
      }
    }
  ]
}
```

Pages own their content and may own nested pages, and a split container holds master and detail pages, so the navigable page hierarchy is expressed entirely through public aggregations.

### Example 4 — resolved application structure tree

```json
{
  "structure": {
    "root": "sample.app.Shell",
    "navigation": "sample.library.NavList",
    "pages": [
      {
        "component": "sample.library.Page",
        "id": "orders",
        "subPages": [
          { "component": "sample.library.Page", "id": "order-detail" }
        ]
      },
      {
        "component": "sample.layout.SplitContainer",
        "id": "customers",
        "masterPages": [
          { "component": "sample.library.Page", "id": "customer-list" }
        ],
        "detailPages": [
          { "component": "sample.library.Page", "id": "customer-detail" }
        ]
      }
    ]
  }
}
```

This resolved tree shows how the shell, navigation, pages, and nested containers combine into a single navigable hierarchy in which every node references a public component from a declared library dependency.

## JSON Mapping

- `specification.sections[5]` in `/openui.json`
