# AGENTS.md - AI Coding Assistant Guide

This file is the repository-wide source of truth for AI coding assistants (Copilot, Claude,
Gemini, Cursor, and similar tools) working in this repository.

## Instruction source of truth

- General operating rules are maintained in the external SSOT:
  <https://github.com/shlomoa/shlomoa/blob/main/.github/copilot-instructions.md>.
- Repository-specific AI guidance lives in this file.
- Agent-specific files, such as `.github/copilot-instructions.md`, `CLAUDE.md`, and `GEMINI.md`,
  should only contain bootstrap instructions or agent-specific deltas, then reference this file.
- Do not duplicate common rules across agent files. If a rule applies to more than one agent, update
  this file or the external general-instructions SSOT instead.
- The custom agents in `.github/agents/` hold role-specific rules only and follow this file.

## Repository purpose

OpenUI Spec is a technology-independent specification for describing web UI frameworks, the Python
and TypeScript packages that parse, model and validate OpenUI documents, and an Angular TypeScript
generator that applies the specification to an existing Angular workspace.

## Key repository sources

- `README.md` - Package overview and documentation links.
- [`CONTRIBUTING.md`](CONTRIBUTING.md#repository-map) - Repository map, local setup, validation
  commands and the spec tools.
- [`RELEASING.md`](RELEASING.md) - Version rules and the release process.
- `docs/REQUIREMENTS.md` - Solution requirements as the owner perceives them.
- `spec/README.md` - Specification entry point: the numbered outline (parts 1–6, Annexes A–C),
  conformance and the BCP 14 keywords, and the document model and language.
- `spec/scopes/scope.md` - The glossary, the scope tree and the owner of each taxonomy fact.
- `spec/scopes/` - Human-authored scope contracts; `spec/taxonomy/` - the taxonomy documents.
- `spec/openui.json` - Generated catalog built from `spec/scopes/`.
- `spec/conformance/` - The conformance suite every validator passes.
- The [survey archive](https://github.com/shlomoa/openui-spec/tree/archive/spec-survey/spec/survey) on the `archive/spec-survey` branch - The framework surveys, the
  v1 publish plan with the owner's directives, and the change records (`*.done.md` applied,
  `*.notdone.md` not applied). It is read-only history, no longer part of `main`.
- `generators/angular/generator/docs/GENERATION.md` - Angular generator architecture,
  implementation details, code-generation flow, and validation strategy.
- [`tests/TEST_PLAN.md`](tests/TEST_PLAN.md#root-test-suite-plan) - Spec-contract test-suite
  strategy and test-module matrix.

## Repository-specific rules

- Use the terms of [`spec/README.md` § 4.1](spec/README.md#41-specification-artifacts) and the
  [glossary](spec/scopes/scope.md#glossary). Do not define new terms; ask the owner when none fits.
- Treat `spec/` as the specification source of truth. Keep generated artifacts such as
  `spec/openui.json` aligned with the documented generation flow when the spec changes.
- Every specification change bumps the spec version before merge; follow
  [`RELEASING.md` § Schema and catalog version changes](RELEASING.md#schema-and-catalog-version-changes).
- Generate examples and fixtures; never write them by hand
  ([`CONTRIBUTING.md` § Examples and fixtures](CONTRIBUTING.md#examples-and-fixtures)).
- Keep common AI-agent guidance in `AGENTS.md`; keep agent-specific files thin and referential.
- Before broad repository restructuring, provide an explicitly enumerated multi-step implementation
  plan.
- Use a repository-local Python virtual environment for Python package installation and validation;
  do not install Python packages into the global environment.
- Preserve cross-platform behavior for Windows, Linux, and macOS. Avoid hardcoded OS-specific roots
  or temporary paths.

## Validation

- Run the commands of
  [`CONTRIBUTING.md` § Repository validation](CONTRIBUTING.md#repository-validation) that the
  change affects; documentation-only changes need at least pre-commit, the link check and
  `mkdocs build --strict`.
- Generator changes should follow the pipeline and validation strategy in
  `generators/angular/generator/docs/GENERATION.md`.
