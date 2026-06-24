# Initial Spec Population Plan

This plan implements the immediate actions identified after reviewing `spec/README.md`:

1. create actual section/scope files,
2. add a real current index,
3. restore and formalize the `Dashboard Schematic` target,
4. populate `openui.json`, and
5. add concrete schema and validation rules matching the JSON format.

## 1. Confirm and freeze the intended spec shape

1. Re-read the current `spec/README.md`, `docs/REQUIREMENTS.md`, `README.md`, `mkdocs.yml`, and `openui.json`.
2. Treat the current `spec/README.md` model as the initial contract unless the project owner decides otherwise:
   - hierarchical `scopes/` folder,
   - PascalCase folders for non-leaf scopes,
   - `scope.md` for folder scopes,
   - `<object_name>.scope.md` for leaf scopes,
   - JSON document with `version`, `id`, `type`, `attrs`, and `children`.
3. Document the current implementation boundary:
   - this pass creates the first real spec scaffold,
   - it does not attempt to define every future OpenUI concept,
   - Angular Material references are examples/reference implementation notes, not the technology-independent standard.
4. Acceptance criteria:
   - no README promises files that do not exist,
   - every spec link resolves,
   - `mkdocs build --strict` passes.

## 2. Create the actual section/scope files

1. Create the `spec/scopes/` tree described by `spec/README.md`.

   ```text
   spec/
   ├─ README.md
   └─ scopes/
      ├─ scope.md
      ├─ Application/
      │  └─ scope.md
      ├─ Controls/
      │  ├─ scope.md
      │  ├─ native.scope.md
      │  └─ dialog.scope.md
      ├─ PredefinedPages/
      │  ├─ scope.md
      │  ├─ dashboard.scope.md
      │  ├─ shell_page.scope.md
      │  └─ empty_page.scope.md
      └─ Views/
         ├─ scope.md
         ├─ reports.scope.md
         └─ forms.scope.md
   ```

2. Each `scope.md` should include:
   - title,
   - purpose,
   - status,
   - child scopes,
   - related JSON path in `openui.json`,
   - implementation independence note.
3. Each leaf `*.scope.md` should include:
   - title,
   - purpose,
   - required behavior,
   - allowed attributes/properties,
   - child model expectations,
   - accessibility expectations,
   - validation notes,
   - examples, if available.
4. Keep content intentionally small and correct. Avoid inventing deep behavior that is not yet agreed.
5. Acceptance criteria:
   - every scope mentioned in `spec/README.md` has a corresponding file,
   - every file has a stable heading and purpose section,
   - `mkdocs.yml` can include these files without missing-reference warnings.

## 3. Add a real current index to `spec/README.md`

1. Replace the informal “Spec folder structure” prose with a concrete index table.
2. Use these table columns:

   | Scope | File | Type | Status | Purpose |
   | ----- | ---- | ---- | ------ | ------- |

3. Keep a separate “Planned / future scopes” section only if needed. Do not mix planned scopes into the current index unless the files exist.
4. Add direct links to all created scope files.
5. Add a short “How the prose spec maps to `openui.json`” section.
6. Example mapping:

   ```text
   spec/scopes/Application/scope.md
     ↔ openui.json children[type="Application"]

   spec/scopes/PredefinedPages/dashboard.scope.md
     ↔ openui.json children[type="PredefinedPages"].children[type="Dashboard"]
   ```

7. Update `mkdocs.yml` nav to match the real files.
8. Suggested nav:

   ```yaml
   nav:
     - Overview: README.md
     - Scopes:
         - Scope Model: scopes/scope.md
         - Application: scopes/Application/scope.md
         - Controls: scopes/Controls/scope.md
         - Native Controls: scopes/Controls/native.scope.md
         - Dialog: scopes/Controls/dialog.scope.md
         - Predefined Pages: scopes/PredefinedPages/scope.md
         - Dashboard: scopes/PredefinedPages/dashboard.scope.md
         - Shell Page: scopes/PredefinedPages/shell_page.scope.md
         - Empty Page: scopes/PredefinedPages/empty_page.scope.md
         - Views: scopes/Views/scope.md
         - Reports: scopes/Views/reports.scope.md
         - Forms: scopes/Views/forms.scope.md
   ```

9. Acceptance criteria:
   - README index lists only existing files,
   - `mkdocs.yml` nav lists only existing files,
   - `mkdocs build --strict` passes.

## 4. Restore and formalize the `Dashboard Schematic` target

1. Keep the Angular Material dashboard schematic as a reference implementation link, not as a normative dependency.
2. In `spec/README.md`, keep this link explicit:

   ```markdown
   [Dashboard Schematic](https://material.angular.dev/guide/schematics#dashboard-schematic)
   ```

3. In `spec/scopes/PredefinedPages/dashboard.scope.md`, add a “Reference implementation pattern” section.
4. The section should state that Angular Material’s dashboard schematic is an example and summarize the useful pattern:
   - card grid,
   - summary tiles,
   - responsive layout,
   - dashboard-oriented component skeleton.
5. Clarify that OpenUI-compatible implementations may use any technology.
6. Do not use an unresolved reference-style link like `[Dashboard Schematic]` without defining it.
7. Acceptance criteria:
   - the dashboard page contains an explicit Angular Material docs URL,
   - the link is described as reference material only,
   - no Markdown dangling reference remains.

## 5. Populate `openui.json`

1. Decide the minimal canonical JSON document shape matching the README EBNF.
2. Initial recommended shape:

   ```json
   {
     "version": "0.1.0",
     "id": "openui",
     "type": "OpenUiSpecification",
     "attrs": {
       "name": "OpenUI",
       "description": "Technology-independent Web UI framework specification"
     },
     "children": []
   }
   ```

3. Populate `children` with scope nodes that match the prose files.
4. Recommended first semantic tree:

   ```text
   OpenUiSpecification
   └─ Scopes
      ├─ Application
      ├─ Controls
      │  ├─ Native
      │  └─ Dialog
      ├─ PredefinedPages
      │  ├─ Dashboard
      │  ├─ ShellPage
      │  └─ EmptyPage
      └─ Views
         ├─ Reports
         └─ Forms
   ```

5. Ensure all `id` values follow the current README rule:
   - camelCase,
   - alphanumeric only,
   - starts with lowercase letter.
6. Suggested IDs:
   - `openui`,
   - `scopes`,
   - `application`,
   - `controls`,
   - `native`,
   - `dialog`,
   - `predefinedPages`,
   - `dashboard`,
   - `shellPage`,
   - `emptyPage`,
   - `views`,
   - `reports`,
   - `forms`.
7. Keep `type` values aligned with the current README rule:
   - PascalCase aliases are allowed,
   - kebab-case tags are allowed,
   - HTML tags are allowed.
8. Suggested types:
   - `OpenUiSpecification`,
   - `Scopes`,
   - `Application`,
   - `Controls`,
   - `NativeControls`,
   - `Dialog`,
   - `PredefinedPages`,
   - `Dashboard`,
   - `ShellPage`,
   - `EmptyPage`,
   - `Views`,
   - `Reports`,
   - `Forms`.
9. Add traceability attributes where useful:

   ```json
   "attrs": {
     "scopeDocument": "scopes/PredefinedPages/dashboard.scope.md",
     "status": "draft"
   }
   ```

10. Acceptance criteria:
    - `openui.json` is non-empty,
    - it is valid JSON,
    - it matches the README’s syntax rules,
    - every scope file has a matching JSON node,
    - every JSON node with `scopeDocument` points to an existing file.

## 6. Add concrete schema and validation rules

1. Add a JSON Schema file at `spec/openui.schema.json`.
2. The schema should validate:
   - top-level object,
   - optional `version`,
   - required `id`,
   - required `type`,
   - optional `attrs`,
   - optional recursive `children`,
   - `id` regex: `^[a-z][A-Za-z0-9]*$`,
   - `type` regex allowing kebab-case and PascalCase,
   - `attrs` object values as string or null,
   - `children` array recursively containing UI elements,
   - no additional loose fields outside the allowed set.
3. Add a prose field table to `spec/README.md`.
4. Suggested columns:

   | Field | Required | Applies to | Type | Rule |
   | ----- | -------- | ---------- | ---- | ---- |

5. Add explicit validation rules:
   - IDs must be globally unique, or scoped uniqueness must be documented clearly,
   - top-level `version` must be SemVer if present,
   - only the top-level object may have `version`,
   - `attrs` values are currently string or null only,
   - `children` may recurse,
   - no unknown top-level element fields,
   - `scopeDocument` values must resolve when present.
6. Add Python validation tests reflecting the current contract.
7. Recommended file:

   ```text
   tests/test_openui_spec_contract.py
   ```

8. Tests should cover:
   - `openui.json` exists and is valid JSON,
   - `spec/openui.schema.json` exists and is valid JSON,
   - `openui.json` validates against the schema,
   - all IDs match the documented regex,
   - all IDs are unique if global uniqueness is chosen,
   - all `scopeDocument` paths exist,
   - all Markdown files under `spec/` are reachable from either `spec/README.md` or `mkdocs.yml`,
   - all `mkdocs.yml` nav entries resolve.
9. Dependency decision:
   - If using JSON Schema validation, add `jsonschema` to a repository-local validation dependency file, or implement only lightweight validation in Python.
   - Since the repo uses `.venv`, all Python validation must run through `.venv`.
10. Acceptance criteria:
    - schema validates `openui.json`,
    - tests pass through `.venv`,
    - no stale tests assert deleted numbered spec sections,
    - no test depends on non-existing files.

## 7. Update docs and developer guidance

1. Update `docs/README.md` so it no longer references missing provenance files or removed spec sections.
2. Update `docs/REQUIREMENTS.md` only if needed to reflect:
   - `openui.json` is the canonical machine-readable spec,
   - `spec/` is the synchronized prose view,
   - schema validation is part of spec maintenance.
3. Update `CONTRIBUTING.md` if it contains validation instructions that need the new spec/schema test.
4. Acceptance criteria:
   - developer docs point to existing files only,
   - new validation flow is discoverable,
   - no OpenUI5-specific notes are reintroduced unless intentionally retained as repository/package identity.

## 8. Validation sequence

1. Run Python tests through `.venv`:

   ```powershell
   ./.venv/Scripts/python -m pytest
   ```

2. Run pre-commit hooks through `.venv`:

   ```powershell
   ./.venv/Scripts/pre-commit run --all-files
   ```

3. Run strict MkDocs build through `.venv`:

   ```powershell
   ./.venv/Scripts/python -m mkdocs build --strict
   ```

4. Run Git whitespace check:

   ```powershell
   git diff --check
   ```

5. Acceptance criteria:
   - all relevant tests pass,
   - MkDocs strict build passes,
   - pre-commit passes,
   - no missing nav files,
   - no dangling Markdown links introduced.

## 9. Final review checklist

1. Confirm file existence:
   - `spec/README.md`,
   - `spec/openui.schema.json`,
   - `spec/scopes/scope.md`,
   - all declared scope files,
   - populated `openui.json`.
2. Confirm consistency:
   - every scope in README index exists,
   - every scope file appears in MkDocs nav,
   - every scope file is represented in `openui.json`,
   - every `openui.json` `scopeDocument` path exists,
   - Dashboard schematic link is explicit and correct.
3. Confirm obsolete tests removed:
   - old numbered section tests deleted,
   - replacement tests validate the current spec contract.
4. Summarize:
   - files added,
   - files edited,
   - tests removed,
   - validation commands run,
   - any remaining intentional TODOs.
