# Releasing openui-spec

This document is the single source of truth for releasing the `openui-spec`
Python package and the `@shlomoa/openui-spec` npm package. Follow every stage in
order. Do not publish from a dirty or unverified working tree. Release notes are
maintained in [`CHANGELOG.md`](CHANGELOG.md) and reused for the GitHub release.

---

## Assumptions

- You have the tools of [CONTRIBUTING § Local setup](CONTRIBUTING.md#local-setup),
  Git, and write access to `shlomoa/openui-spec` on GitHub.
- PyPI Trusted Publishing is configured for this repository's
  [`.github/workflows/publish-pypi.yml`](.github/workflows/publish-pypi.yml)
  workflow and its `pypi` GitHub environment. The workflow uses OIDC; do not add
  a PyPI API token to the repository or workflow.
- An `NPM_TOKEN` secret is configured in the repository's GitHub Actions secrets
  with publishing permissions for the `@shlomoa` scope on the npm registry
  (<https://registry.npmjs.org>).

---

## Prerequisites

Set up the repository-local virtual environment as
[CONTRIBUTING § Local setup](CONTRIBUTING.md#local-setup) describes, then add the
build tool:

Windows (PowerShell):

```powershell
.\.venv\Scripts\python -m pip install build
```

Linux or macOS (Bash):

```bash
./.venv/bin/python -m pip install build
```

---

## 1. Prepare the release on the pull request branch

The version bump is part of the change, not a later step. A change that needs a
release carries its version bump, its regenerated artifacts and its
[`CHANGELOG.md`](CHANGELOG.md) entry on its own branch, before it is merged. Start
the branch from a current `main`:

```bash
git checkout main
git pull --ff-only origin main
git status --short
```

The last command must produce no output.

---

## 2. Select and set the package version

The spec version follows [Semantic Versioning](spec/README.md#48-versioning), with no
pre-release suffix. Until the specification is validated in downstream tools and
packages, every release is a `0.x.0` or `0.x.y` version, and there is no release
candidate (directive Q3 of the
[v1 publish plan](spec/survey/specui_v1_publish_plan.md#goal-and-definition-of-done)):

The npm and PyPI packages take the spec's version (owner decision, 2026-09-29):

| Change                                                 | Version                                                 |
| ------------------------------------------------------ | ------------------------------------------------------- |
| Any specification change                               | the next free minor, `0.x.0`, for the spec and packages |
| A package change that changes no specification content | the next patch, `0.x.y`, for the packages only          |
| `1.0.0-rc.1` and `1.0.0`                               | only after downstream validation                        |

"Next free" is counted against `main` at merge time. If `main` releases the version
your branch took, merge `main` into the branch and take the next one.

Set the package version in `[project].version` of [`pyproject.toml`](pyproject.toml),
in `version` of [`package.json`](package.json) and of
`generators/angular/generator/package.json`, and in their lockfiles. Add the release
entry, with its compare link, to [`CHANGELOG.md`](CHANGELOG.md). The publication
workflows do not publish the Angular generator as a separate package.

### Schema and catalog version changes

**Every spec change forces a version bump.** A change to the
specification prose under `spec/scopes/`, the grammar, the schema, or the catalog
contracts cannot be merged under an unchanged version:

- **Mandatory version bump**: Update [`SCHEMA_VERSION`](SCHEMA_VERSION) to the
  version of stage 2, the same as the packages.
- **Catalog alignment**: Regenerate [`spec/openui.json`](spec/openui.json) with
  `python -m spec.bin.to_json --spec-dir spec --output spec/openui.json`, so that its
  root `version` matches `SCHEMA_VERSION`.
- **Documents**: Set the new `version` in every worked example under
  `spec/examples/`, every conformance document under `spec/conformance/`, every
  generator fixture under `generators/angular/generator/tests/fixtures/` and every
  test document. Their content is generated, not edited by hand
  ([CONTRIBUTING § Examples and fixtures](CONTRIBUTING.md#examples-and-fixtures)).

The repository tests check the catalog's version against `SCHEMA_VERSION` and
that every example, conformance document and fixture declares it.

---

## 3. Run complete release validation

Run every command of
[CONTRIBUTING § Repository validation](CONTRIBUTING.md#repository-validation) on
the branch. They mirror the build workflow.

Do not merge until every command succeeds and the CI checks of the pull request
pass. Commit any validation fixes, then repeat this stage.

---

## 4. Merge

Merge the pull request into `main`. Then run the remaining stages from a clean,
current `main`:

```bash
git checkout main
git pull --ff-only origin main
git status --short
```

The last command must produce no output.

---

## 5. Build and inspect the distribution

Build the release artifacts locally with the repository-local virtual
environment:

Windows (PowerShell):

```powershell
.\.venv\Scripts\python -m build
npm run build
npm test
npm pack --dry-run
```

Linux or macOS (Bash):

```bash
./.venv/bin/python -m build
npm run build
npm test
npm pack --dry-run
```

Inspect the output in `dist/`. It must contain an sdist and a wheel for version
`X.Y.Z`. Inspect the dry-run output of `npm pack` to confirm only the expected
files are bundled. The publish workflow builds these artifacts again in GitHub
Actions; local artifacts are for verification and must not be committed.

---

## 6. Tag the release

Create an annotated tag on the merged release commit of `main`, using the `vX.Y.Z`
convention, and push the tag:

```bash
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin vX.Y.Z
```

Confirm the tag identifies the intended release commit before publishing a
GitHub release.

---

## 7. Create the GitHub release

1. Go to <https://github.com/shlomoa/openui-spec/releases/new>.
2. Select the `vX.Y.Z` tag.
3. Set the release title to `vX.Y.Z`.
4. Use the matching [`CHANGELOG.md`](CHANGELOG.md) entry for the notable
   changes, breaking changes, schema/catalog compatibility, and upgrade
   guidance.
5. Publish the GitHub release.

Publishing the GitHub release does not publish either package automatically.
Dispatch both publication workflows against the release tag:

```bash
gh workflow run publish-pypi.yml --ref vX.Y.Z
gh workflow run publish-npm.yml --ref vX.Y.Z -f npm-tag=latest
```

The workflows perform these independent releases:

- [`publish-pypi.yml`](.github/workflows/publish-pypi.yml) rebuilds the sdist and
  wheel and publishes them to PyPI through Trusted Publishing.
- [`publish-npm.yml`](.github/workflows/publish-npm.yml) installs dependencies,
  builds, tests, and publishes `@shlomoa/openui-spec` to npm under the selected
  distribution tag.

Always select the immutable release tag as the workflow ref; do not publish a
moving branch revision.

---

## Post-release verification

- Monitor the **Publish PyPI package** and **Publish npm package** workflows in
  GitHub Actions until both succeed.
- Verify the PyPI release appears at <https://pypi.org/project/openui-spec/>.
- In a fresh virtual environment, install the released version and run:

  ```bash
  compare_openui_spec --help
  openui_spec --help
  ```

- Verify the npm release appears at <https://www.npmjs.com/package/@shlomoa/openui-spec>.
- In a separate shell or terminal, verify the released npm package:

  ```bash
  npx @shlomoa/openui-spec --help
  ```

---

## Recovering from a failed release

| Problem                                                       | Action                                                                                                        |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Release tag is pushed but the GitHub release is not published | Delete the remote tag only if no release consumed it, correct the commit, and create a new tag.               |
| Publish workflow fails before upload                          | Correct the failure, validate again, then publish a new GitHub release from the corrected tag.                |
| Incorrect version reaches PyPI                                | Do not delete the PyPI release. Yank it if appropriate and publish a corrected patch release.                 |
| Incorrect version reaches npm                                 | Do not unpublish if avoidable. Deprecate the version (`npm deprecate`) and publish a corrected patch release. |
