# 06. Application Structure

**Purpose:** Describe the required structure of applications built on the framework.

**Derived from traversal nodes:** `library-catalog-root`, `library-component-catalog`

## Specification

- Applications compose pages, dialogs, forms, lists, and navigation containers from library-published components.
- The framework must support a navigable shell-level structure and page hierarchy built from public components.
- Library dependencies must be explicit so application structure can be resolved without reading component internals.

## JSON Mapping

- `specification.sections[5]` in `/openui.json`
