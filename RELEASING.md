# Releasing openui-spec

This document is the single source of truth for releasing the `openui-spec`
Python package. Follow every stage in order. Do not publish from a dirty or
unverified working tree.

---

## Assumptions

- You have Python 3.12 or later, Git, Node.js 22, and npm installed.
- You have write access to `shlomoa/openui-spec` on GitHub.
- Your local `main` is up to date with `origin/main`.
- PyPI Trusted Publishing is configured for this repository's
  [`.github/workflows/publish.yml`](.github/workflows/publish.yml) workflow and
  its `pypi` GitHub environment. The workflow uses OIDC; do not add a PyPI API
  token to the repository or workflow.

---

## Prerequisites

Create a repository-local Python environment and install the validation and
build tools.

Windows (PowerShell):

```powershell
py -m venv .venv
.\.venv\Scripts\python -m pip install pre-commit==4.6.0 -r requirements-test.txt -r requirements-docs.txt build
```

Linux or macOS (Bash):

```bash
python3 -m venv .venv
./.venv/bin/python -m pip install pre-commit==4.6.0 -r requirements-test.txt -r requirements-docs.txt build
```

---

## 1. Verify the release commit

Start from a clean, current `main` branch:

```bash
git checkout main
git pull --ff-only origin main
git status --short
```

The final command must produce no output. If it reports changes, commit or
stash them before proceeding.

---

## 2. Select and set the package version

Choose a [PEP 440](https://peps.python.org/pep-0440/)-compliant version. Use
Semantic Versioning-compatible final releases where applicable.

| Release type      | Example    |
| ----------------- | ---------- |
| Alpha pre-release | `0.2.0a1`  |
| Beta pre-release  | `0.2.0b1`  |
| Release candidate | `0.2.0rc1` |
| Final release     | `0.2.0`    |
| Patch release     | `0.2.1`    |

Update `[project].version` in [`pyproject.toml`](pyproject.toml), then commit
that release change with its completed release notes and other intended
changes:

```bash
git add pyproject.toml
git commit -m "chore: release X.Y.Z"
```

### Schema and catalog version changes

The package version and the OpenUI schema/catalog version are separate
contracts. Update [`SCHEMA_VERSION`](SCHEMA_VERSION) only when intentionally
releasing a new OpenUI schema/catalog version. In that case, also update the
root `version` of [`spec/openui.json`](spec/openui.json), regenerate the catalog
from `spec/scopes/` when scope prose changed, and update affected examples and
fixtures. The repository contract tests validate the catalog's version against
`SCHEMA_VERSION`.

---

## 3. Run complete release validation

Run every command below from the repository root. These checks mirror the
repository's build workflow across Python, documentation, the Angular generator,
and the generated Angular example application.

Windows (PowerShell):

```powershell
.\.venv\Scripts\pre-commit run --all-files
git diff --check
.\.venv\Scripts\python -m unittest discover -s tests -p 'test_*.py'
.\.venv\Scripts\python -m unittest discover -s spec\tests -p 'test_*.py'
.\.venv\Scripts\python -m mkdocs build --strict
Push-Location generators\angular\generator
npm ci
npm run build
npm test
Pop-Location
Push-Location generators\angular\generated-examples
npm ci
npm run format:check
npm run lint
npm test
npm run build
Pop-Location
```

Linux or macOS (Bash):

```bash
./.venv/bin/pre-commit run --all-files
git diff --check
./.venv/bin/python -m unittest discover -s tests -p 'test_*.py'
./.venv/bin/python -m unittest discover -s spec/tests -p 'test_*.py'
./.venv/bin/python -m mkdocs build --strict
(
  cd generators/angular/generator
  npm ci
  npm run build
  npm test
)
(
  cd generators/angular/generated-examples
  npm ci
  npm run format:check
  npm run lint
  npm test
  npm run build
)
```

Do not tag a release until every command succeeds. Commit any validation fixes,
then repeat this stage.

---

## 4. Build and inspect the distribution

Build the release artifacts locally with the repository-local virtual
environment:

Windows (PowerShell):

```powershell
.\.venv\Scripts\python -m build
```

Linux or macOS (Bash):

```bash
./.venv/bin/python -m build
```

Inspect the output in `dist/`. It must contain an sdist and a wheel for version
`X.Y.Z`. The publish workflow builds these artifacts again in GitHub Actions;
local artifacts are for verification and must not be committed.

---

## 5. Tag and push the release

Create an annotated tag using the `vX.Y.Z` convention, then push the release
commit and tag:

```bash
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin main
git push origin vX.Y.Z
```

Confirm the tag identifies the intended release commit before publishing a
GitHub release.

---

## 6. Create the GitHub release

1. Go to <https://github.com/shlomoa/openui-spec/releases/new>.
2. Select the `vX.Y.Z` tag.
3. Set the release title to `vX.Y.Z`.
4. Summarize notable changes, breaking changes, schema/catalog compatibility,
   and upgrade guidance.
5. Publish the GitHub release.

Publishing triggers `publish.yml`, which rebuilds the sdist and wheel and
publishes them to PyPI through Trusted Publishing. Do not use
`workflow_dispatch` for a normal release: it publishes the currently checked out
revision without the GitHub-release review point.

---

## Post-release verification

- Monitor the **Publish** workflow in GitHub Actions until it succeeds.
- Verify the release appears at <https://pypi.org/project/openui-spec/>.
- In a fresh virtual environment, install the released version and run:

  ```bash
  openui-compare --help
  openui-json --help
  ```

- If a new package development version is required on `main`, open a follow-up
  change that updates `pyproject.toml` to the next planned pre-release version.

---

## Recovering from a failed release

| Problem                                                       | Action                                                                                          |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Release tag is pushed but the GitHub release is not published | Delete the remote tag only if no release consumed it, correct the commit, and create a new tag. |
| Publish workflow fails before upload                          | Correct the failure, validate again, then publish a new GitHub release from the corrected tag.  |
| Incorrect version reaches PyPI                                | Do not delete the PyPI release. Yank it if appropriate and publish a corrected patch release.   |
