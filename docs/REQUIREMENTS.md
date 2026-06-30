# Requirements

This project's goal is to create a technology-independent specification for Web
UI frameworks, and an Angular TypeScript generator that applies a UI description
authored against that specification to an existing Angular workspace.

## 1. Specification

The OpenUI specification is a technology-independent contract for Web UI
frameworks. It is defined by three artifacts at different levels of abstraction:

- **Grammar** — `spec/openui.schema.json`, a JSON Schema defining the _shape_
  every OpenUI document must satisfy (the `id` / `type` / `attrs` / `children`
  structure and the id/type naming rules). It is content-blind: it validates
  form, not vocabulary.
- **Prose (source of truth)** — the `*.scope.md` files under `spec/scopes/`,
  hand-authored and authoritative. They define each object's purpose, attributes,
  and child model. Content is kept unique through cross-referencing rather than
  duplication.
- **Catalog** — root `openui.json`, the canonical machine-readable vocabulary of
  OpenUI objects (scopes such as `Application`, `Grid`, `Charts`), **generated
  from the prose**. It conforms to the grammar and carries each object's contract
  for tooling to consume; each scope node links back to its prose through
  `attrs.scopeDocument`.

The specification defines _what_ a compliant Web UI must provide; it never
prescribes _how_ it is implemented.

## 2. Angular TypeScript Generator

The generator is a tool that materializes an OpenUI UI description into an
existing Angular workspace.

- **Inputs:**
  - `input.json` — a concrete UI to build (for example, a dashboard showing three
    charts), authored against the specification. It must be a well-formed OpenUI
    document per the grammar, and it must conform to the catalog: every `type` is
    a real catalog object, used in a legal place.
  - The OpenUI specification (`openui.json` + `openui.schema.json`) — the rules
    against which `input.json` is validated and interpreted.
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
  `generators/angular/docs/GENERATOR_STRUCTURE.md`.

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
