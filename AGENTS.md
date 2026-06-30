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

## Repository purpose

OpenUI Spec is a technology-independent specification for describing web UI frameworks, plus an
Angular TypeScript generator that applies the specification to an existing Angular workspace.

## Key repository sources

- `docs/README.md` - Developer documentation hub and entry point for repository structure,
  validation, and implementation docs.
- `docs/REQUIREMENTS.md` - Project requirements and goals.
- `spec/README.md` - Specification entry point, including how to read the spec and the section index.
- `spec/scopes/` - Human-authored specification scope sources.
- `openui.json` - Generated canonical machine-readable specification built from `spec/scopes/`.
- `generators/angular/generator/` - Angular TypeScript generator implementation.
- `generators/angular/docs/GENERATOR_STRUCTURE.md` - Angular generator architecture and
  implementation details.
- `docs/TEST_PLAN.md` - Test suites and validation strategy.

## Repository-specific rules

- Treat `spec/` as the specification source of truth. Keep generated artifacts such as
  `openui.json` aligned with the documented generation flow when the spec changes.
- Keep common AI-agent guidance in `AGENTS.md`; keep agent-specific files thin and referential.
- Before broad repository restructuring, provide an explicitly enumerated multi-step implementation
  plan.
- Use a repository-local Python virtual environment for Python package installation and validation;
  do not install Python packages into the global environment.
- Preserve cross-platform behavior for Windows, Linux, and macOS. Avoid hardcoded OS-specific roots
  or temporary paths.

## Validation

- Documentation-only changes should be checked for formatting and link consistency when practical.
- Python/spec validation uses the repository-local virtual environment documented in
  `CONTRIBUTING.md`.
- Generator changes should follow the pipeline in
  `generators/angular/docs/GENERATOR_STRUCTURE.md` and the validation plan in
  `docs/TEST_PLAN.md`.
