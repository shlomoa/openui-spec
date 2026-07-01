# Requirements

This project's goal is to create a technology-independent specification for Web
UI frameworks, and an Angular TypeScript generator that applies a UI description
authored against that specification to an existing Angular workspace.

## 1. Specification

The OpenUI specification is a technology-independent contract for Web UI
frameworks. The roles of `input.json`, `spec/openui.schema.json`, and root
`openui.json` are defined once in
[`spec/README.md` § Specification artifacts: grammar vs. catalog](../spec/README.md#specification-artifacts-grammar-vs-catalog).

The hand-authored prose under `spec/scopes/` is the specification source of truth
for each object's purpose, attributes, and child model. The generated catalog
links back to that prose through `attrs.scopeDocument`; content is kept unique
through cross-referencing rather than duplication.

The specification defines _what_ a compliant Web UI must provide; it never
prescribes _how_ it is implemented.

## 2. Angular TypeScript Generator

The generator is a tool that materializes an OpenUI UI description into an
existing Angular workspace.

- **Inputs:**
  - `input.json` — the concrete UI/app document to build, using the role defined
    in the spec artifact contract.
  - `spec/openui.schema.json` and root `openui.json` — the grammar and catalog
    used to validate and interpret `input.json`, as defined in the spec artifact
    contract.
- **Context:** an existing Angular workspace, which the generator reads to
  determine where and how to emit (its conventions, structure, and
  configuration).
- **Output:** a change to that workspace — added folders, added files, and
  modified files — implementing the `input.json` description.

Implementation constraints:

- The generator is hand-written TypeScript, published as an npm package. It is
  _not_ generated from `openui.json`, and it is not a generator-generating
  program; `openui.json` is data the generator consumes at runtime.
- Implemented in folder `generators/angular/generator`.
- Follows the structure and implementation details documented in
  `generators/angular/generator/docs/GENERATION.md`.

## 3. Generated examples application

A committed, runnable Angular application that demonstrates the generator's
output. It is the project's worked end-to-end artifact and exists for three
reasons:

- **Visibility** — renders what the generator emits, so the specification and its
  Angular materialization can be seen and reviewed rather than only read as JSON.
- **Debuggability** — a concrete, buildable, testable output the generator can be
  exercised and verified against, making regressions and coverage gaps
  observable.
- **Documentation** — published component documentation (API / Examples /
  Styling), kept consistent with the specification prose under `spec/`.

- Lives in folder `generators/angular/generated-examples`.
- Must build, lint, and test as part of repository validation.
