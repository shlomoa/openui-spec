# Repository Structure

**Note** It pertains to the original [OpenUI5](https://github.com/UI5/openui5) repository structure

Note: line ranges in this document use the format `file:start-end`.

The project purpose in `AGENTS.md:5-9` describes OpenUI5 as an enterprise-grade JavaScript UI framework and a monorepo of library packages under `src/`. The table below maps the folders and files that are most relevant to that purpose.

| Folder / file reference | Description of the content and relation to the project purpose |
| --- | --- |
| `AGENTS.md:5-13` | Establishes the repository-level working model for contributors by calling out the package layout under `src/` and the matching QUnit test layout used across libraries. |
| `README.md:9-16` | Summarizes what OpenUI5 delivers: enterprise-ready web applications, UI controls, and data binding. This explains why the repository is centered on reusable framework libraries instead of a single application. |
| `README.md:41-43` | Points contributors to the development setup and control-library documentation, making it the entry point for understanding how to work inside the monorepo. |
| `package.json:6-17` | Defines the root npm scripts used to start the testsuite, build the SDK, and lint the monorepo. These scripts show that the repository is managed from the root as one workspace-based project. |
| `package.json:115-117` | Declares the workspace pattern `src/*`, which is the key structural rule that turns the repository into a multi-package monorepo. |
| `src/` | Contains the framework packages themselves: library packages such as `sap.ui.core`, `sap.m`, `sap.f`, `sap.ui.documentation`, the theme libraries, and the `testsuite` application. This is the main implementation area for the framework. |
| `src/sap.ui.core/` | Representative library-package root. It shows the standard package layout used across the monorepo: package metadata at the package root plus separate `src` and `test` trees for implementation and verification. |
| `src/sap.ui.core/package.json:1-17` | Shows how an individual framework library is published as its own npm package (`@openui5/sap.ui.core`) while still living inside the shared monorepo. |
| `docs/developing.md:8-31` | Documents the standard contributor workflow: install dependencies, run `npm start`, and open the testsuite. This explains how the repository is meant to be developed locally. |
| `docs/developing.md:64-99` | Documents the SDK build and serve flow, showing how the monorepo is used to produce the OpenUI5 Demo Kit and documentation artifacts. |
| `docs/controllibraries.md:23-75` | Gives the canonical library file structure, including sources, themes, manual test pages, and QUnit tests. This is the clearest specification of how each library package inside `src/` is organized. |
| `src/testsuite/package.json:17-23` | Defines the scripts for the dedicated testsuite application that serves and builds the combined framework for local testing and SDK generation. |
| `src/testsuite/package.json:24-49` | Lists the library and theme package dependencies consumed by the testsuite application, showing how the separate monorepo packages are assembled into one runnable test environment. |
| `lib/` | Contains shared tooling used by the monorepo, including builder, server, theming, and test support code. This is the implementation area for repository-level infrastructure rather than framework APIs. |
| `lib/test/karma.conf.js:7-25` | Maps library names to their QUnit testsuite pages, showing how automated tests are organized per library package. |
| `lib/test/karma.conf.js:93-161` | Configures Karma to serve the testsuite workspace and run library-specific tests, which ties the repository structure directly to automated verification. |
| `docs/guidelines.md:1-30` | Captures the main development conventions and tools used across all packages, which is important context for anyone navigating or extending the repository structure. |

## Specification starting points

Surveying the OpenUI5 leads above shows that the best true starting point for a standard specification is the **public control metadata model**:

1. discover the public surface from each library's `library.js`
2. read each public control's `metadata` declaration
3. interpret that metadata through `sap.ui.base.ManagedObjectMetadata` / `sap.ui.core.ElementMetadata`
4. use designtime files and tests only as supporting evidence

The table below summarizes which files should seed the specification effort, why they matter, and how to use them.

| File or file set | Why it is required | How it should be used in the specification effort |
| --- | --- | --- |
| `docs/controllibraries.md` | This document is the discovery guide for the whole control-library layout. It explicitly identifies `.library`, `library.js`, control implementation files, designtime files, and test folders, so it is the best entry point for locating the real specification sources. | Use it first to map where specification-relevant artifacts live in the OpenUI5 monorepo and to keep the extraction process aligned with the official library structure. |
| `src/*/src/<library>/library.js` (for example `src/sap.m/src/sap/m/library.js`) | This is the primary inventory of each library's public API surface: dependencies, types, interfaces, controls, elements, and library-level designtime hooks. It is the cleanest place to enumerate what belongs in the standard before drilling into individual components. | Use it to build the catalog of libraries, component names, enums, and interfaces that the standard must cover, and to define the top-level scope of the specification. |
| `src/sap.ui.core/src/sap/ui/base/ManagedObjectMetadata.js`, `src/sap.ui.core/src/sap/ui/base/ManagedObject.js`, and `src/sap.ui.core/src/sap/ui/core/ElementMetadata.js` | These files define the metadata grammar itself: properties, default properties, aggregations, associations, events, visibility, defaults, designtime hooks, and renderer linkage. They explain what a control metadata block means, which makes them the normative interpretation layer for all control declarations. | Use them to define the abstract schema of the standard JSON specification and to normalize UI5-specific metadata terms into implementation-independent concepts. |
| `src/*/src/<library>/<Control>.js` (for example `src/sap.m/src/sap/m/Button.js`) | Individual control files contain the concrete public contract for each component: interfaces, properties, associations, events, drag-and-drop flags, designtime references, and JSDoc semantics. This is where abstract framework concepts become concrete component requirements. | Use these files to extract per-component specification entries, including inputs, outputs, composition rules, accessibility-relevant associations, and behavioral notes. |
| `src/*/src/<library>/designtime/*.designtime.js` and `src/*/src/<library>/designtime/library.designtime.js` (for example `src/sap.m/src/sap/m/designtime/Button.designtime.js`) | These files add authoring-time semantics such as palette grouping, rename/remove actions, and creation templates. They are not the primary runtime contract, but they capture extension and tooling behaviors that are useful for a standard concerned with design-time interoperability. | Use them as a secondary source for design-time and tooling sections of the standard, after the runtime metadata has already established the core component contract. |
| `src/*/test/<library>/qunit/*.qunit.js`, `src/*/test/<library>/visual/*.spec.js`, and test suite indexes | Tests are the strongest executable evidence for intended behavior. They show which metadata-backed behaviors are actually verified and therefore help distinguish public contract from incidental implementation. | Use them to derive compliance criteria, acceptance scenarios, and regression-oriented examples for the standard; they should validate the extracted spec, not define it from scratch. |
| `src/*/src/<library>/.library` | This file does contain library metadata and documentation build references, but OpenUI5 explicitly treats it as build-time metadata rather than runtime API definition. That makes it useful context, but not the true foundation for a framework standard. | Use it only as supporting context for documentation/build metadata and to locate auxiliary resources such as doc indexes; do not treat it as the primary specification source. |

**Conclusion:** the strongest basis for a standard specification is the combination of **`library.js` for scope discovery** and **control `metadata` interpreted through the core metadata classes for normative structure**. The other leads are supporting sources that help validate, enrich, or organize that core model.
