# 03. Design Principles

**Purpose:** Capture the principles used to normalize OpenUI5 concepts into a reusable framework specification.

**Derived from traversal nodes:** `metadata-grammar-root`, `api-json-projection`

## Specification

- Prefer public metadata over private implementation details.
- Separate scope discovery (`library.js`) from semantic interpretation (metadata grammar).
- Define what implementations must provide without prescribing a specific rendering technology.

## JSON Mapping

- `specification.sections[2]` in `/openui.json`
