# Spec-to-generator alignment

## Alignment gaps

- CLI option naming still collapses `input.json` and catalog/spec roles
- Validation “against `spec/**/*.md`” is too broad; docs should identify which Markdown sections are machine-validated.

## Recommended next cleanup order

1. Align the generator CLI naming with the artifact roles (`--input`, `--catalog`, and optionally `--schema`).
2. Clarify which `spec/**/*.md` sections are machine-validated.
