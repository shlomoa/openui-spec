# Repository Structure

**Note** It pertains to the original [OpenUI5](https://github.com/UI5/openui5) repository structure

Note: line ranges in this document use the format `file:start-end`.

This repository has two goals: (1) documenting a framework specification derived from OpenUI5, and (2) building an Angular TypeScript generator based on that specification. The table below maps the folders and files in the upstream OpenUI5 repository (`UI5/openui5`) that are most relevant to those goals.

| Folder / file reference | Description of the content and relation to the project purpose |
| --- | --- |
| `docs/controllibraries.md:23-74` | Best single overview of a UI5 library package. It documents the canonical `src/` + `test/` layout, `.library`, `library.js`, theme assets, manual test pages, and QUnit tests, which makes it the main upstream source for the specification's repository and component structure. |
| `lib/jsdoc/schemas/sap-ui-library-api.json:1-80` | JSON Schema for the generated `api.json` files. This is the strongest machine-readable input for the local framework specification because it defines the structure of library APIs, symbols, types, methods, and metadata. |
| `lib/jsdoc/schemas/sap-ui-library-api-index.json:1-74` | Companion JSON Schema for the aggregated API index. It is useful when documenting how libraries, classes, interfaces, enums, and namespaces are organized across the whole framework instead of one package at a time. |
| `lib/jsdoc/jsdoc-config-template.json:1-24` | Shows that OpenUI5 configures JSDoc to emit the `apijson` variant. This is important because it demonstrates the upstream documentation-to-JSON pipeline that the local spec can mirror at a higher abstraction level. |
| `lib/jsdoc/transformApiJson.js:1-52` | Core transformation step in the upstream documentation generator. It is a useful reference for the local generator architecture because it converts source documentation into structured JSON rather than generating framework code directly. |
| `src/sap.ui.core/src/sap/ui/base/ManagedObject.js:271-288` | Declares the central UI5 metadata contract with `properties`, `aggregations`, `associations`, and `events`. These concepts map directly to the local specification's component, interaction, and data-binding sections. |
| `src/sap.ui.core/.dtsgenrc:1-52` | The closest upstream artifact to TypeScript generation. It maps OpenUI5 API metadata to TypeScript-friendly types and overrides, which is directly relevant to a future Angular TypeScript generator. |
| `src/sap.m/src/sap/m/.library:1-74` | Representative library manifest. It records library identity, dependencies, documentation index files, release-note sources, and build-time metadata, so it is a strong reference for documenting package-level structure and relationships. |
| `src/sap.ui.core/src/sap/ui/core/` | Contains the core runtime implementation for components, controls, MVC, and routing. This folder is the main upstream reference for application structure, page composition, and navigation concepts that the local spec needs to describe abstractly. |
| `src/sap.ui.core/src/sap/ui/model/` | Contains the binding and model implementations (`Model`, `Binding`, `JSONModel`, OData models, list/property bindings). This area is directly relevant to the local data-binding, state, and form sections. |
| `docs/guidelines.md:1-49` | Captures cross-cutting coding and API design conventions. It is useful background when documenting compliance rules and naming/behavior expectations in the local specification. |

## Angular generator implication

No Angular-specific generator or `@angular/core` usage was found in the upstream OpenUI5 repository (`UI5/openui5`). The closest TypeScript-related assets are the `api.json`/JSDoc pipeline and the `.dtsgenrc` declaration-generation configuration. The Angular generator in this repository will therefore need to be designed from those API and typing inputs rather than adapted from an upstream Angular implementation.
