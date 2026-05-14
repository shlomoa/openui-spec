# 19. Performance Requirements

**Purpose:** Describe performance-oriented expectations that follow from the public model.

**Derived from traversal nodes:** `library-catalog-root`, `api-json-projection`

## Specification

- Public library catalogs should allow eager discovery of available components without eager loading every implementation detail.
- Machine-readable API projections should be derivable from the same public contract used by runtime metadata.
- Visual assets and behavior should support lazy or conditional loading when the public contract permits it.

## JSON Mapping

- `specification.sections[18]` in `/openui.json`
