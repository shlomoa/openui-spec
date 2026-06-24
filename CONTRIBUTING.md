# Contributing

For repository structure, requirements, local validation, and other developer docs, see the [developer hub](docs/README.md).

## Angular Material generator

The initial Angular Material generator lives in `generators/angular`. It is a TypeScript npm package that reads `openui.json`, validates the required specification sections, normalizes the specification into an implementation-independent UI model, and emits a standalone Angular Material application skeleton.

Use it locally from the package directory:

```bash
cd generators/angular
npm ci
npm run build
npm test
node dist/src/cli/main.js validate --spec ../../openui.json
node dist/src/cli/main.js generate --spec ../../openui.json --out /tmp/openui-angular-app
```

The direct `node dist/src/cli/main.js` commands require `npm run build` to complete successfully first so the `dist` output exists. Re-run the build after changing generator source files.

The generated app includes Angular routing, a Material shell and navigation, global theme styles, and per-section pages for the specification areas currently mapped by the generator. Keep generator changes aligned with the compiler-style pipeline documented in `docs/GENERATOR_STRUCTURE.md`: load, validate, normalize, build the UI model, map to Angular, emit files, and verify.

---

## Local validation

Use a repository-local Python virtual environment for validation tooling.

```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install pre-commit==4.6.0
.\.venv\Scripts\python -m unittest discover -s tests -p 'test_*.py'
.\.venv\Scripts\pre-commit run --all-files
```

On macOS or Linux, use the equivalent `.venv/bin/python` and `.venv/bin/pre-commit` paths.

---
