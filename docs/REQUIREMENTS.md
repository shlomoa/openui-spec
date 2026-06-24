# Requirements

This project goals is to create a specification for a Web UI framework and an Angular TypeScript generator that produces a skeleton Angular app from that specification.

## 1. Specification

The specification is a json file providing abstraction of a web UI component. It will be used as the single source of truth for the generator and will be documented in a cascade of .md files.

## 2. Angular TypeScript Generator

The generator is a tool that takes the specification as input, and an existing Angular project as context, and implements the specification to produce a skeleton Angular app as output.

- Implemented in TypeScript and as an npmjs package.
- Use folder generators/angular for implementation.
- Generator implementation should follow the structure and implementation details documented in docs/GENERATOR_STRUCTURE.md.
