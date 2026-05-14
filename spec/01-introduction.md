# 01. Introduction

**Purpose:** Define the scope of the OpenUI specification as an implementation-independent contract derived from OpenUI5 public metadata and library declarations.

**Derived from traversal nodes:** `openui-root`, `library-catalog-root`, `metadata-grammar-root`

## Specification

- The master specification is `/openui.json` and is the single source of truth for generators and documentation.
- The scope is the public UI framework contract: libraries, public symbols, component metadata, interaction semantics, and supporting compliance evidence.
- Build-time-only artifacts such as `.library` files may inform documentation but do not define the runtime contract by themselves.

## JSON Mapping

- `specification.sections[0]` in `/openui.json`
