# Initial Spec Population Follow-up Plan

This document tracks only open decisions, partially completed work, and ongoing
maintenance items that can still change the spec contract. Completed tasks are
intentionally omitted.

## 1. Reconcile the prose README with the concrete scope index

Status: **Open decision**.

Current state:

- `spec/README.md` remains the prose entry point and format definition.
- `spec/scopes/scope.md` is the concrete scope index.
- `mkdocs.yml` includes the scopes index and all current scope files.
- `tests/test_spec_readme_spec.py` validates the current prose-first README and
  the exact Markdown file set.

Remaining decision:

- Keep `spec/README.md` as prose and treat `spec/scopes/scope.md` as the detailed
  index, or
- replace the README “Spec folder structure” prose with a generated-style table.

If the README changes to a table:

1. Link every current scope file from the README.
2. Exclude future/planned scopes unless corresponding files exist.
3. Document how `spec/scopes/**` maps to `openui.json` `attrs.scopeDocument`.
4. Update `tests/test_spec_readme_spec.py` to validate the chosen README style.

Acceptance criteria:

- `spec/README.md`, `spec/scopes/scope.md`, `mkdocs.yml`, and `openui.json` do
  not disagree about current scopes.
- `mkdocs build --strict` passes.
- `tests/test_spec_readme_spec.py` matches the chosen README contract.

## 2. Expand scope details only from approved source material

Status: **Partially complete; waiting for approved behavioral details**.

Current state:

- Every current scope file exists and is represented in `openui.json`.
- Shared folder, object-shape, and `attrs` category rules live in
  `spec/scopes/scope.md`.
- Leaf files are intentionally concise and should stay that way until behavior
  is approved.

Follow-up rule:

- Do not invent deep behavior just to make files longer.
- Add details only when supported by `spec/README.md`, requirements, source
  evidence, tests, or an explicit project decision.

Candidate enrichment areas:

1. Attribute examples using the current `attrs` categories:
   - Uses/input keys such as `[value]`.
   - Produces/output keys such as `(selectionChange)`.
   - Behaves/action keys such as `(click)`.
2. Accessibility expectations for interactive widgets and behaviors.
3. Child model expectations for containers, pages, widgets, and views.
4. Validation notes for allowed `id`, `type`, `attrs`, and `children` shapes.

Acceptance criteria for each enriched scope:

- The file remains technology-independent.
- Angular Material references are clearly marked as reference patterns only.
- `openui.json` is updated when new scope nodes or `scopeDocument` links are
  added.
- Focused tests are updated when the public contract changes.

## 3. Keep generator-facing documentation synchronized

Status: **Partially complete; ongoing while the Angular generator evolves**.

Current state:

- `docs/GENERATOR_STRUCTURE.md` now describes the Angular generator as consuming
  the native OpenUI JSON shape through a validation → IR → Angular model → emit
  pipeline.
- The Angular generator source is still evolving, so package-layout docs can
  become stale quickly.

Follow-up checks when generator or docs change:

1. Keep `docs/GENERATOR_STRUCTURE.md` aligned with the actual
   `generators/angular/src` module layout.
2. Ensure generator docs identify `openui.json` as the canonical
   machine-readable input and `spec/` as the synchronized prose source.
3. Keep generator tests and fixtures aligned with the current native OpenUI
   contract.
4. Avoid reintroducing transitional adapter language or stale numbered-section
   assumptions unless they are clearly marked as historical context.

Acceptance criteria:

- Generator docs mention the native OpenUI input contract.
- Generator docs list only existing source files or describe omitted helpers at a
  directory level.
- Angular generator tests pass when generator input/output contracts change.

## 4. Keep developer docs and validation instructions current

Status: **Ongoing maintenance**.

Current state:

- Python spec tests, MkDocs strict build, markdown/YAML linting, and Angular
  generator tests are the relevant validation gates.
- Repository-specific instructions require Python work to use the local `.venv`.

Follow-up checks when docs change:

1. Ensure `docs/README.md`, `docs/REQUIREMENTS.md`, and `CONTRIBUTING.md` point
   only to existing files and current validation commands.
2. Mention `openui.json` as the canonical machine-readable spec where relevant.
3. Mention `spec/` as the synchronized prose view where relevant.
4. Keep validation commands repository-local and `.venv` based for Python work.

Acceptance criteria:

- Developer docs point only to existing files.
- Validation commands are discoverable and current.
- No stale OpenUI5/provenance assumptions are reintroduced unless intentional.

## 5. Validation checklist for future changes

Status: **Reference checklist; run as applicable**.

Run the relevant subset first, then the full sequence before final review:

```powershell
./.venv/Scripts/pre-commit run --all-files
./.venv/Scripts/python -m mkdocs build --strict
./.venv/Scripts/python -m pytest
Push-Location generators/angular; npm test; Pop-Location
git diff --check
```

Acceptance criteria:

- Pre-commit passes.
- MkDocs strict build passes.
- Python tests pass.
- Angular generator tests pass when generator input/output contracts are touched.
- `git diff --check` reports no whitespace issues.
