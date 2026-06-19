# Angular Material generator

This package contains the initial Angular Material generator for `openui.json`.

```bash
npm install
npm run build
node dist/src/cli/main.js generate --spec ../../openui.json --out /tmp/openui-angular-app
```

The generator follows the documented pipeline: load the specification, validate it,
build an implementation-independent UI model, map that model to Angular concepts,
and emit an Angular standalone application skeleton using Angular Material.
