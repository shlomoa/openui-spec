# Repo inception

## How to regenerate the spec 

The spec is extracted from [UI5 openui5 github].

## Specification authoring priority

For this kind of spec, the most important sections to author are:

| Priority | Section                 |
| -------: | ----------------------- |
|        1 | UI Concept Model        |
|        2 | Component Model         |
|        3 | Layout System           |
|        4 | Interaction Model       |
|        5 | State Model             |
|        6 | Accessibility Model     |
|        7 | Theming / Design Tokens |
|        8 | Compliance Rules        |

## Repository structure (upstream OpenUI5 mapping)

**Note** It pertains to the original [OpenUI5](https://github.com/UI5/openui5) repository structure

Note: line ranges in this document use the format `file:start-end`.

This repository has two goals: (1) documenting a framework specification derived from OpenUI5, and (2) building an Angular TypeScript generator based on that specification. The table below maps the folders and files in the upstream OpenUI5 repository (`UI5/openui5`) that are most relevant to those goals.

| Folder / file reference                                    | Description of the content and relation to the project purpose                                                                                                                                                                                                                     |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/controllibraries.md:23-74`                           | Best single overview of a UI5 library package. It documents the canonical `src/` + `test/` layout, `.library`, `library.js`, theme assets, manual test pages, and QUnit tests, which makes it the main upstream source for the specification's repository and component structure. |
| `lib/jsdoc/schemas/sap-ui-library-api.json:1-80`           | JSON Schema for the generated `api.json` files. This is the strongest machine-readable input for the local framework specification because it defines the structure of library APIs, symbols, types, methods, and metadata.                                                        |
| `lib/jsdoc/schemas/sap-ui-library-api-index.json:1-74`     | Companion JSON Schema for the aggregated API index. It is useful when documenting how libraries, classes, interfaces, enums, and namespaces are organized across the whole framework instead of one package at a time.                                                             |
| `lib/jsdoc/jsdoc-config-template.json:1-24`                | Shows that OpenUI5 configures JSDoc to emit the `apijson` variant. This is important because it demonstrates the upstream documentation-to-JSON pipeline that the local spec can mirror at a higher abstraction level.                                                             |
| `lib/jsdoc/transformApiJson.js:1-52`                       | Core transformation step in the upstream documentation generator. It is a useful reference for the local generator architecture because it converts source documentation into structured JSON rather than generating framework code directly.                                      |
| `src/sap.ui.core/src/sap/ui/base/ManagedObject.js:271-288` | Declares the central UI5 metadata contract with `properties`, `aggregations`, `associations`, and `events`. These concepts map directly to the local specification's component, interaction, and data-binding sections.                                                            |
| `src/sap.ui.core/.dtsgenrc:1-52`                           | The closest upstream artifact to TypeScript generation. It maps OpenUI5 API metadata to TypeScript-friendly types and overrides, which is directly relevant to a future Angular TypeScript generator.                                                                              |
| `src/sap.m/src/sap/m/.library:1-74`                        | Representative library manifest. It records library identity, dependencies, documentation index files, release-note sources, and build-time metadata, so it is a strong reference for documenting package-level structure and relationships.                                       |
| `src/sap.ui.core/src/sap/ui/core/`                         | Contains the core runtime implementation for components, controls, MVC, and routing. This folder is the main upstream reference for application structure, page composition, and navigation concepts that the local spec needs to describe abstractly.                             |
| `src/sap.ui.core/src/sap/ui/model/`                        | Contains the binding and model implementations (`Model`, `Binding`, `JSONModel`, OData models, list/property bindings). This area is directly relevant to the local data-binding, state, and form sections.                                                                        |
| `docs/guidelines.md:1-49`                                  | Captures cross-cutting coding and API design conventions. It is useful background when documenting compliance rules and naming/behavior expectations in the local specification.                                                                                                   |

### Specification starting points - requires review

Surveying the upstream leads above shows that, for the framework specification itself, the best true starting point is the **public control metadata model**. The JSDoc/`api.json` pipeline is still important, but it is best treated as a machine-readable projection of that contract and as a downstream input for tooling and generator work.

1. discover the public surface from each library's `library.js`
2. read each public control's `metadata` declaration
3. interpret that metadata through `sap.ui.base.ManagedObjectMetadata` / `sap.ui.core.ElementMetadata`
4. use the JSDoc/`api.json` pipeline, designtime files (authoring-time semantics), and tests as supporting evidence

The table below summarizes which files should seed the specification effort, why they matter, and how to use them.

| File or file set                                                                                                                                                                | Why it matters                                                                                                                                                                                                                                                                                                        | How it should be used in the specification effort                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/controllibraries.md`                                                                                                                                                      | This document is the discovery guide for the whole control-library layout. It explicitly identifies `.library`, `library.js`, control implementation files, designtime files, and test folders, so it is the best entry point for locating the real specification sources.                                            | Use it first to map where specification-relevant artifacts live in the OpenUI5 monorepo and to keep the extraction process aligned with the official library structure.                     |
| `src/*/src/<library>/library.js` (for example `src/sap.m/src/sap/m/library.js`)                                                                                                 | This is the primary inventory of each library's public API surface: dependencies, types, interfaces, controls, elements, and library-level designtime hooks. It is the cleanest place to enumerate what belongs in the standard before drilling into individual components.                                           | Use it to build the catalog of libraries, component names, enums, and interfaces that the standard must cover, and to define the top-level scope of the specification.                      |
| `src/sap.ui.core/src/sap/ui/base/ManagedObjectMetadata.js`, `src/sap.ui.core/src/sap/ui/base/ManagedObject.js`, and `src/sap.ui.core/src/sap/ui/core/ElementMetadata.js`        | These files define the metadata grammar itself: properties, default properties, aggregations, associations, events, visibility, defaults, designtime hooks, and renderer linkage. They explain what a control metadata block means, which makes them the normative interpretation layer for all control declarations. | Use them to define the abstract schema of the standard JSON specification and to normalize UI5-specific metadata terms into implementation-independent concepts.                            |
| `src/*/src/<library>/<Control>.js` (for example `src/sap.m/src/sap/m/Button.js`)                                                                                                | Individual control files contain the concrete public contract for each component: interfaces, properties, associations, events, drag-and-drop flags, designtime references, and JSDoc semantics. This is where abstract framework concepts become concrete component requirements.                                    | Use these files to extract per-component specification entries, including inputs, outputs, composition rules, accessibility-relevant associations, and behavioral notes.                    |
| `lib/jsdoc/schemas/sap-ui-library-api.json`, `lib/jsdoc/schemas/sap-ui-library-api-index.json`, `lib/jsdoc/jsdoc-config-template.json`, and `lib/jsdoc/transformApiJson.js`     | These files define and produce the machine-readable `api.json` representation of the framework API. They are valuable because they can serialize the upstream contract in a form that is easier to transform, validate, and eventually feed into generators.                                                          | Use them as a secondary extraction and normalization layer after the runtime metadata model is understood, especially for automation, consistency checks, and generator-oriented workflows. |
| `src/*/src/<library>/designtime/*.designtime.js` and `src/*/src/<library>/designtime/library.designtime.js` (for example `src/sap.m/src/sap/m/designtime/Button.designtime.js`) | These files add authoring-time semantics such as palette grouping, rename/remove actions, and creation templates. They are not the primary runtime contract, but they capture extension and tooling behaviors that are useful for a standard concerned with design-time interoperability.                             | Use them as a secondary source for design-time and tooling sections of the standard, after the runtime metadata has already established the core component contract.                        |
| `src/*/test/<library>/qunit/*.qunit.js`, `src/*/test/<library>/visual/*.spec.js`, and test suite indexes                                                                        | Tests are the strongest executable evidence for intended behavior. They show which metadata-backed behaviors are actually verified and therefore help distinguish public contract from incidental implementation.                                                                                                     | Use them to derive compliance criteria, acceptance scenarios, and regression-oriented examples for the standard; they should validate the extracted spec, not define it from scratch.       |
| `src/*/src/<library>/.library`                                                                                                                                                  | This file does contain library metadata and documentation build references, but OpenUI5 explicitly treats it as build-time metadata rather than runtime API definition. That makes it useful context, but not the true foundation for a framework standard.                                                           | Use it only as supporting context for documentation/build metadata and to locate auxiliary resources such as doc indexes; do not treat it as the primary specification source.              |

**Conclusion:** the strongest basis for the framework standard is the combination of **`library.js` for scope discovery** and **control `metadata` interpreted through the core metadata classes for normative structure**. The JSDoc/`api.json` pipeline, designtime files, and tests are important supporting sources for extraction, tooling, and validation, but they should not replace the runtime metadata model as the conceptual starting point.

### Angular generator implication

No Angular-specific generator or `@angular/core` usage was found in the upstream OpenUI5 repository (`UI5/openui5`). The closest TypeScript-related assets are the `api.json`/JSDoc pipeline and the `.dtsgenrc` declaration-generation configuration. The Angular generator in this repository will therefore need to be designed from those API and typing inputs rather than adapted from an upstream Angular implementation.



## References

- [Angular Material Toolbar]
- [View Sets]
- [Angular Material Schematics]
- [Dashboard Schematic]
- [UI5 openui5 github]

[Angular Material Toolbar]: https://material.angular.dev/components/toolbar/
[View Sets]: https://www.django-rest-framework.org/api-guide/viewsets/
[Angular Material Schematics]: https://material.angular.dev/guide/schematics
[Dashboard Schematic]: https://material.angular.dev/guide/schematics#dashboard-schematic
[UI5 openui5 github]: https://github.com/UI5/openui5
