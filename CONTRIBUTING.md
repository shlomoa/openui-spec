# Contributing

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

The generated app includes Angular routing, a Material shell and navigation, global theme styles, and per-section pages for the specification areas currently mapped by the generator. Keep generator changes aligned with the compiler-style pipeline documented in `generators/angular/GENERATOR_STRUCTURE.md`: load, validate, normalize, build the UI model, map to Angular, emit files, and verify.
