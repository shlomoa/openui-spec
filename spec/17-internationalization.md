# 17. Internationalization

**Purpose:** Describe locale and translation requirements.

**Derived from traversal nodes:** `library-catalog-root`, `reference-component-button`

## Specification

- Libraries must provide translatable message resources for public UI text.
- Locale-aware rendering must support right-to-left and left-to-right presentation where applicable.
- Public text-bearing components must expose text direction and translatable labels through explicit metadata.

## JSON Mapping

- `specification.sections[16]` in `/openui.json`
