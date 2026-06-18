# Generator Structure

Structure it as a **compiler pipeline**, not as a template script.

```text
Framework Specification
        ↓
Parse / Load
        ↓
Validate
        ↓
Normalize
        ↓
Build Intermediate Model
        ↓
Map to Angular Model
        ↓
Generate TypeScript / HTML / SCSS
        ↓
Format / Test / Verify
```

## 1. High-level modules

| Module           | Responsibility                                              |
| ---------------- | ----------------------------------------------------------- |
| `spec-loader`    | Reads YAML/JSON/DSL framework spec                          |
| `spec-schema`    | Defines the implementation-agnostic model                   |
| `validator`      | Validates required sections, names, references, constraints |
| `normalizer`     | Converts shorthand into explicit canonical form             |
| `ir`             | Internal representation independent of Angular              |
| `angular-mapper` | Converts abstract UI concepts into Angular concepts         |
| `codegen`        | Generates `.ts`, `.html`, `.scss`, routes, providers        |
| `formatter`      | Runs Prettier / ESLint fixes                                |
| `verifier`       | Builds, type-checks, runs tests                             |

## 2. Recommended repository structure

```text
ui-framework-generator/
├─ src/
│  ├─ cli/
│  │  └─ main.ts
│  │
│  ├─ spec/
│  │  ├─ framework-spec.schema.ts
│  │  ├─ framework-spec.types.ts
│  │  └─ load-spec.ts
│  │
│  ├─ validation/
│  │  ├─ validate-spec.ts
│  │  └─ diagnostics.ts
│  │
│  ├─ ir/
│  │  ├─ ui-model.ts
│  │  ├─ normalize-spec.ts
│  │  └─ build-ir.ts
│  │
│  ├─ targets/
│  │  └─ angular/
│  │     ├─ angular-model.ts
│  │     ├─ map-to-angular.ts
│  │     ├─ emit-angular-project.ts
│  │     ├─ emit-component.ts
│  │     ├─ emit-routes.ts
│  │     ├─ emit-theme.ts
│  │     └─ templates/
│  │
│  ├─ writers/
│  │  ├─ file-writer.ts
│  │  └─ safe-write.ts
│  │
│  └─ verify/
│     ├─ run-build.ts
│     └─ run-tests.ts
│
├─ examples/
│  └─ sample-framework.yaml
│
├─ tests/
│  ├─ fixtures/
│  ├─ snapshots/
│  └─ generator.spec.ts
│
└─ package.json
```

## 3. Core design rule

Do **not** generate Angular directly from the raw framework spec.

Use an intermediate model:

```text
Framework Spec → UI IR → Angular Model → Files
```

That keeps the generator clean and allows future targets:

```text
same spec
   ├─ Angular
   ├─ React
   ├─ Vue
   └─ Web Components
```

## 4. Example mapping table

| Framework concept | Angular implementation                        |
| ----------------- | --------------------------------------------- |
| Application Shell | `AppComponent` + layout components            |
| Page              | standalone routed component                   |
| Region            | child layout component / `<ng-content>` slot  |
| Component         | standalone Angular component                  |
| Action            | button/menu item + event handler              |
| Form              | reactive form                                 |
| Field             | `FormControl`                                 |
| Validation rule   | Angular validator                             |
| Navigation item   | route config + menu model                     |
| Theme token       | SCSS variable / CSS custom property           |
| UI state          | signal/store/service                          |
| Dialog            | Angular Material dialog or custom abstraction |

## 5. Generator phases

### Phase 1 — Load spec

```ts
export function loadFrameworkSpec(path: string): FrameworkSpec {
  const raw = readFileSync(path, "utf-8");
  return parseYamlOrJson(raw);
}
```

### Phase 2 — Validate

Validation should fail early.

Check:

```text
- required sections exist
- all page IDs are unique
- navigation references valid pages
- component names are legal
- actions reference existing handlers
- forms have valid fields
- theme tokens are complete
```

### Phase 3 — Normalize

Example:

```yaml
page:
  title: Users
```

Becomes:

```ts
{
  id: "users",
  route: "/users",
  title: "Users",
  layout: "default",
  regions: [],
  actions: []
}
```

### Phase 4 — Build implementation-agnostic IR

Example:

```ts
export interface UiPage {
  id: string;
  route: string;
  title: string;
  layout: LayoutRef;
  regions: UiRegion[];
  actions: UiAction[];
}
```

### Phase 5 — Map IR to Angular model

```ts
export interface AngularComponentModel {
  className: string;
  selector: string;
  fileName: string;
  template: AngularTemplateModel;
  styles: AngularStyleModel;
  imports: string[];
  providers: string[];
}
```

### Phase 6 — Emit files

Generated output:

```text
generated-angular-app/
├─ src/app/
│  ├─ app.component.ts
│  ├─ app.routes.ts
│  ├─ pages/
│  │  └─ users/
│  │     ├─ users.page.ts
│  │     ├─ users.page.html
│  │     └─ users.page.scss
│  ├─ components/
│  ├─ layouts/
│  ├─ services/
│  └─ theme/
```

## 6. Important implementation principle

Separate these concerns:

```text
WHAT exists       → IR
HOW Angular sees it → Angular model
HOW files look    → templates/code emitters
WHERE files go    → writer
```

Do not mix them.

Bad:

```ts
generatePage(specPage) {
  return `
    @Component(...)
  `;
}
```

Better:

```ts
const uiPage = buildUiPage(specPage);
const angularPage = mapPageToAngular(uiPage);
emitAngularComponent(angularPage);
```

## 7. Best generator style

For TypeScript generators, I would use:

| Need                    | Recommendation                         |
| ----------------------- | -------------------------------------- |
| Schema validation       | `zod`                                  |
| Formatting              | `prettier`                             |
| File generation         | custom writer                          |
| Templates               | `handlebars`, `ejs`, or TypeScript AST |
| Type-safe code emission | `ts-morph`                             |
| CLI                     | `commander` or `yargs`                 |
| Tests                   | snapshot tests                         |

For a serious generator, prefer:

```text
ts-morph for TypeScript
templates for HTML/SCSS
```

## 8. Verification pipeline

Every generation should run:

```text
1. validate input spec
2. generate into temp folder
3. npm install / npm ci
4. ng build
5. run unit tests
6. compare snapshots
```

## 9. Minimal CLI shape

```bash
ui-gen generate \
  --spec framework.yaml \
  --target angular \
  --out ./generated-app
```

Optional:

```bash
ui-gen validate --spec framework.yaml
ui-gen preview --spec framework.yaml
ui-gen diff --spec framework.yaml --out ./existing-app
```

## 10. The central abstraction

The generator should not ask:

> How do I generate Angular?

It should ask:

> What abstract UI model is described by the framework spec, and how is that model projected into Angular?

That distinction is what keeps the system maintainable.
