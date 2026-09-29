# Downstream migration

This record prepares W6 task 26.1 of the
[v1 publish plan](specui_v1_publish_plan.md#w6-draft-first-spec): the downstream validation
of the next `0.x.0` release. For each downstream project it records how the project uses
openui-spec today, what it depends on, and what it needs to move to the current spec. It
also lists the spec issues the downstream code shows. The handover itself waits for
`0.11.0` (task 26).

- **Where it applies:** [shlomoa/angular-django2](https://github.com/shlomoa/angular-django2)
  (issues [#98](https://github.com/shlomoa/angular-django2/issues/98) and
  [#103](https://github.com/shlomoa/angular-django2/issues/103), the TypeScript parser) and
  [shlomoa/django-angular3](https://github.com/shlomoa/django-angular3).
- **Inputs:** angular-django2 at
  [`39965f7`](https://github.com/shlomoa/angular-django2/tree/39965f7183a777ca022b413d1b9bc9d8743606e8)
  (2026-09-26) and django-angular3 at
  [`460785b`](https://github.com/shlomoa/django-angular3/tree/460785b20946a5ff06e7fa5f241c038f5565c556)
  (2026-09-24), read-only; issues #98 and #103 (both closed); openui-spec `0.10.0`: the
  [document model and language](../README.md#4-document-model-and-language), the
  [conformance suite](../conformance/README.md#conformance-suite), the
  [changelog](../../CHANGELOG.md#changelog), [`bin/openui_document.py`](../../bin/openui_document.py),
  [`src/document.ts`](../../src/document.ts) and [`spec/bin/migrate.py`](../bin/migrate.py); the
  published package versions on npm and PyPI.
- **Method:** the downstream OpenUI documents were copied to a scratch folder outside both
  repositories, migrated with `python -m spec.bin.migrate` and validated with
  `bin.openui_document` at `0.10.0`. Nothing was changed in the downstream repositories.
- **Status:** preparation done (2026-09-29). Task 26.1 stays open until both projects report
  their results on `0.11.0`.

## Summary

| Project         | Consumes                                                                    | Pinned    | OpenUI documents                                                                                       | Spec parts it depends on                                                                                                       |
| --------------- | --------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| angular-django2 | npm `@shlomoa/openui-spec`: `OpenUiJson`, `OpenUiDocument`, `OpenUiElement` | `^0.3.1`  | None as files. Inline documents in 7 test files, 2 JSON examples in the docs; all declare `0.3.1`      | `[x]` / `(x)` keys, string-only values, unquoted literals, quoted element references, 20 type literals, the validator messages |
| django-angular3 | PyPI `openui-spec`: `bin.openui_spec.OpenUiJson`, `bin.compare_openui_spec` | `==0.2.0` | 6 JSON files (2 with attributes), inline documents in 4 test files and the README; all declare `0.2.0` | `[x]` / `(x)` keys, quoted literals, element references, 15 type literals, the validator messages, the comparison output       |

Neither project vendors `openui.json`, the JSON Schema or the EBNF, and neither generates
code from them. Neither runs the conformance suite: both call the upstream validator.

Both projects need code changes, not only a document migration. The main change in both is
the [typed attribute form](../../CHANGELOG.md#upgrading-to-060) of `0.6.0`. angular-django2
also writes string literals without the inner quotes. The `0.3.1` examples already quoted
them, `0.6.0` made it a rule ([4.5](../README.md#45-attributes-and-their-categories)), and
`spec.bin.migrate` does not add them.

## What changed since the pinned versions

The changelog entries from `0.3.1` to `0.10.0` and whether they reach each project:

| Version | Change (its "Upgrading to" steps)                                                              | angular-django2                           | django-angular3                                            |
| ------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------- |
| 0.3.0   | `Route`, `NavItem`, `NavGroup`, `ToolBar`, `ToolBarRow`, `ToolAction`; quoted element ids      | Adopted                                   | Uses `Route`, `ToolAction`; not yet on `0.3.x`             |
| 0.3.1   | Table example follows its contract                                                             | Adopted                                   | No `Table`                                                 |
| 0.4.0   | `container`, `page`, `view`, `widget` removed; behaviors reference a target                    | Not used                                  | Not used                                                   |
| 0.5.0   | Taxonomy documents moved to `spec/taxonomy/`                                                   | No links                                  | No links                                                   |
| 0.6.0   | `uses.x` / `produces.x` / `behaves.x` keys; typed values; version policy; four-stage validator | **Breaking**: keys, value types, messages | **Breaking**: keys, messages                               |
| 0.7.0   | Example node ids renamed                                                                       | Not used                                  | Not used                                                   |
| 0.8.0   | Incremental generation moved to the generator docs                                             | No links                                  | No links                                                   |
| 0.9.0   | Numbered README anchors                                                                        | No links                                  | README links `#specification-artifacts-grammar-vs-catalog` |
| 0.10.0  | Typed Attributes on 33 leaves                                                                  | **Breaking** once literals are quoted     | Contract errors on references                              |

Every version also asks for the new document `version`: the validator accepts only the
spec version it implements ([4.8](../README.md#48-versioning)).

## angular-django2

### How angular-django2 consumes openui-spec

- **Package:** `@shlomoa/openui-spec` `^0.3.1` in
  [`package.json` line 70](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/package.json#L70)
  and
  [`projects/angular-django2/package.json` line 64](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django2/package.json#L64);
  the lock file resolves
  [`0.3.1`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/package-lock.json#L4040-L4043).
  A caret range on a `0.x` version does not reach `0.4.0` or later.
- **Validator:**
  [`schematics/utility/openui.ts`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django2/schematics/utility/openui.ts#L1-L53)
  calls `OpenUiJson.parse` (or `new OpenUiJson`) and `validate()`, and maps
  `OpenUiValidationError` and `OpenUiJsonError` to `SchematicsException`.
- **Document version:**
  [`SYNTHETIC_OPENUI_VERSION`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django2/schematics/utility/ast-compiler.ts#L27-L42)
  is read from the installed package's `package.json`, with `0.3.1` as the fallback. It is
  the version of every synthetic document (legacy CLI options) and of the test documents.
- **Documents:** no document files. The schematics read a workspace document given by
  `--document` and `--nodeId`. The repository's documents are inline TypeScript objects in
  7 test files, built with
  [`createOpenUiDocument`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django-validation/unit/schematics/schematics.helpers.ts#L49-L56)
  (root type `html`, version `SYNTHETIC_OPENUI_VERSION`), for example the
  [application integration test](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django-validation/unit/integration/openui-application.integration.spec.ts#L22-L115).
  The docs hold two JSON examples that declare `0.3.1`:
  [`docs/TUTORIAL.md`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/docs/TUTORIAL.md#L125-L160)
  and
  [`docs/cli/reactive-form.md`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/docs/cli/reactive-form.md#L51-L85).
- **Its own record:** the
  [mapping document](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/docs/ngdj-openui-spec-mapping.md#L71-L81)
  and the
  [implementation plan](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/docs/openui-spec-implementation-plan.md#L49-L74)
  name the attributes it reads beyond the `0.3.1` catalog as "angular-django2 extensions".

### What angular-django2 depends on

| Spec part                                                         | Use today                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Attribute keys](../README.md#45-attributes-and-their-categories) | 56 `[x]` / `(x)` key constants in 8 schematic files, for example [`application/ast.ts`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django2/schematics/application/ast.ts#L44-L60) and [lines 146–168](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django2/schematics/application/ast.ts#L146-L168), [`form-field/ast.ts`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django2/schematics/form-field/ast.ts#L38-L55) and [`reactive-form/ast.ts`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django2/schematics/reactive-form/ast.ts#L59-L65). 113 more key uses in the tests, 15 in the docs. [`assertAstAttributes`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django2/schematics/utility/ast-compiler.ts#L195-L207) rejects every key a compiler does not list. |
| [Value types](../README.md#46-value-types)                        | String-only: [`readAstString`, `readAstBoolean` and `readAstNumber`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django2/schematics/utility/ast-compiler.ts#L209-L257) read `"true"`, `"false"` and decimal strings; synthetic attributes are [stringified](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django2/schematics/utility/ast-compiler.ts#L325-L337). Literals are written **unquoted** (`"[label]": "Email"`, `"[dir]": "rtl"`, `"[path]": "profile"`), so under the spec they are expressions.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [Element references](../README.md#47-element-references)          | Quoted ids, decoded with `JSON.parse` in [`readElementReference`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django2/schematics/application/ast.ts#L386-L407); [`routesFromAst`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django2/schematics/application/ast.ts#L274-L316) checks `[target]`, `[redirectTo]`, `[defaultRoute]` and `NavItem` `[route]` by hand.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [Types](../README.md#44-types)                                    | 20 literals: `html`, `link`, `Application`, `Routing`, `Route`, `Navigation`, `NavItem`, `NavGroup`, `ToolBar`, `ToolBarRow`, `ToolAction`, `Presentation`, `DashboardPage`, `EmptyPage`, `SurfaceContainers`, `OverlayContainers`, `Form`, `ActionControls`, `TextInputs`, `RangeControl`. All are still known types in `0.10.0`; none was renamed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Catalog                                                           | Not read directly; only through the validator.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Validator                                                         | `OpenUiJson.parse` / `validate()`; the tests match the old messages, for example [`duplicate object id: duplicate`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django-validation/unit/schematics/schematics.openui.spec.ts#L35-L37) and [`unknown OpenUI object type: report`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django-validation/unit/schematics/schematics.openui.spec.ts#L62-L64). `0.10.0` reports `/children/1/id: document/duplicate-id: duplicate object id: duplicate`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Conformance suite                                                 | Not used.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

The attributes it reads, against the `0.10.0` catalog contracts:

| Type                                                                                             | Declared in `0.10.0` and read                                                                                      | Read but not declared                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `html`, `link`, `Routing`, `Route`, `Navigation`, `NavItem`, `NavGroup`, `ToolBar`, `ToolAction` | All; for example `Route` `uses.target` is `reference`, `Routing` `uses.defaultRoute` is `reference(Route)`         | None                                                                                                                                                                                                                            |
| `Form`                                                                                           | `(submit)` becomes `behaves.submit`                                                                                | `title`, `action`, `slot`                                                                                                                                                                                                       |
| `ActionControls`                                                                                 | `uses.label` (`string`)                                                                                            | None                                                                                                                                                                                                                            |
| `TextInputs`                                                                                     | `label`, `value`, `placeholder`, `type` (`enum(text\|password\|search\|email\|tel\|url)`), `maxLength`, `required` | `name`, `hint`, `autocomplete`, `email`, `minLength`, `min`, `max`, `pattern`, `appearance`, `subscriptSizing`, `slot`                                                                                                          |
| `RangeControl`                                                                                   | `label`, `value`, `min`, `max` (`number`)                                                                          | `type`, `name`, `hint`, `placeholder`, `required`, `pattern`, `appearance`, `subscriptSizing`, `slot` and others                                                                                                                |
| `SurfaceContainers`                                                                              | `uses.title` (`string`)                                                                                            | `slot`                                                                                                                                                                                                                          |
| `OverlayContainers`                                                                              | None                                                                                                               | `label`, `slot`                                                                                                                                                                                                                 |
| `DashboardPage`, `EmptyPage`                                                                     | None (no Attributes section)                                                                                       | `title`, `route`, `icon`, `access`, `authGuard`                                                                                                                                                                                 |
| `Presentation`                                                                                   | None                                                                                                               | `theme`, `typography`, `animations`                                                                                                                                                                                             |
| Any (for example `Table`)                                                                        | —                                                                                                                  | `data`, with the value `<apiPath>#<ApiService>` ([`data-service/ast.ts`](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django2/schematics/data-service/ast.ts#L25)) |

The two documents of the docs, migrated and validated at `0.10.0`, report no diagnostic.
They pass only because their literals are unquoted, so the validator reads them as
expressions and does not check them. With the literals quoted, `docs/TUTORIAL.md` reports
`contract/wrong-value-type` on `uses.type`: `textarea` is not in the `TextInputs` enum
(`0.10.0` expresses it as `uses.multiline`).

### The TypeScript parser (#98, #103)

Both issues are closed. They asked angular-django2 to use the canonical TypeScript parser and
validator of openui-spec (openui-spec#135) and to wire it into the schematics before any tree
change. At `0.3.1` that package offered only `OpenUiJson` and the JSON types, so
angular-django2 built its own layer on top:

- a resolver over the JSON tree: `walk`, `findById`, `findByType`, `resolveAstNode`
  ([`ast-compiler.ts` lines 77–167](https://github.com/shlomoa/angular-django2/blob/39965f7183a777ca022b413d1b9bc9d8743606e8/projects/angular-django2/schematics/utility/ast-compiler.ts#L77-L167));
- value readers for strings, booleans and numbers, all written as strings;
- a reference reader that decodes the quoted id, and hand-written checks that each reference
  resolves;
- `assertAstAttributes`, which rejects keys a schematic does not support.

The `0.10.0` package adds the document API of [`src/document.ts`](../../src/document.ts)
(`parse`, `validate`, `validateText`, `Catalog`, `defaultCatalog`, and the `Document`,
`Element`, `Attribute` and `Diagnostic` model). It replaces part of that layer and changes
the rest:

| angular-django2 today                              | With the document API                                                                                                                                | Effect                                                                                                  |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `OpenUiJson.parse` + `validate()`, message strings | `parse(text)` throws `OpenUiParseError` on grammar faults; `validate(document)` returns `Diagnostic` objects with a `code` and a JSON Pointer `path` | Replaces; errors can name the node without parsing text                                                 |
| `walk`, `findById`, `findByType`                   | `Document.elements()`, `Element.walk()`; a map by `Element.id`                                                                                       | Replaces                                                                                                |
| `readAstString`, `readAstBoolean`, `readAstNumber` | `Element.attribute(key)`, `Attribute.literal` (decoded quoted string, or the JSON number or boolean), `Attribute.isExpression`                       | Replaces; the contract stage checks the declared types                                                  |
| `readElementReference` and the reference checks    | The contract stage reports `contract/unresolved-reference` and `contract/wrong-reference-type` for `Route`, `NavItem` and `Routing` references       | Replaces the existence checks; `Route` `uses.target` is untyped `reference`, so "is a page" stays local |
| `assertAstAttributes`                              | No equivalent: the spec allows attributes a contract does not declare                                                                                | Stays                                                                                                   |
| `resolveAstNode` (`--nodeId`, expected types)      | No equivalent                                                                                                                                        | Stays                                                                                                   |
| `SYNTHETIC_OPENUI_VERSION` from `package.json`     | `defaultCatalog().version`, the spec version the package implements                                                                                  | Changes: package and spec versions are separate ([4.8](../README.md#48-versioning))                     |
| In-memory synthetic documents                      | `OpenUiJson(document).validate()` still works; `validateValue` exists in `src/document.ts` but is not exported from the package entry point          | Changes little                                                                                          |

The minimal upgrade keeps `OpenUiJson`: its `validate()` now runs the same four stages. The
`OpenUiElement.attrs` type widens to `string | number | boolean | null` or a list of these,
so `readAstString` no longer type-checks against `0.6.0` or later.

### Migration of angular-django2

In order, for `0.10.0` now and `0.11.0` after W6 26:

1. Set `@shlomoa/openui-spec` to the exact release in both `package.json` files and the lock
   file. The package must be on npm first (see [what 26.1 still needs](#what-261-still-needs)).
2. Rename the 56 key constants: `[x]` to `uses.x`, `(activate)` to `produces.activate`,
   `(submit)` to `behaves.submit` (the `Form` contract declares it as Behaves).
3. Read typed values: `true` / `false` and JSON numbers; decode quoted literals; decide what an
   unquoted string (an expression) means for each attribute. Stop stringifying synthetic
   attributes; write literals quoted.
4. Change the documents: the inline test documents (113 key uses in 7 files) and the two
   JSON examples in the docs, by hand, because `spec.bin.migrate` reads JSON files only.
   Quote every string literal; `spec.bin.migrate` converts keys, booleans and numbers but
   does not add quotes. Replace `"[type]": "textarea"` with `"uses.multiline": true`.
5. Take the spec version from `defaultCatalog().version` and set it on every document.
6. Update the tests that match validator messages to the new `path: code: message` lines, or
   match the diagnostic codes.
7. Optionally move to the document API as in the table above, and drop the reference checks
   the contract stage now makes.
8. Update the mapping document and the implementation plan: the `0.10.0` catalog declares
   several attributes that were extensions at `0.3.1` (`ActionControls` `uses.label`,
   `SurfaceContainers` `uses.title`, the `TextInputs` and `RangeControl` basics).

Validate with the project's schematic and integration tests, and with
`npx ng-openui-spec validate --input <document>` on each document. The conformance suite is
for tools that implement the validator; angular-django2 calls it, so it does not need to run
the suite unless it keeps its own parser.

## django-angular3

### How django-angular3 consumes openui-spec

- **Package:** `openui-spec==0.2.0` in
  [`pyproject.toml` line 33](https://github.com/shlomoa/django-angular3/blob/460785b20946a5ff06e7fa5f241c038f5565c556/pyproject.toml#L33),
  also written into scaffolded projects by
  [`tests/test_cli_scaffold.py` line 446](https://github.com/shlomoa/django-angular3/blob/460785b20946a5ff06e7fa5f241c038f5565c556/tests/test_cli_scaffold.py#L446).
- **Validator:**
  [`validation.py`](https://github.com/shlomoa/django-angular3/blob/460785b20946a5ff06e7fa5f241c038f5565c556/django_angular3/validation.py#L79-L123)
  calls `bin.openui_spec.OpenUiJson(...).validate()` and `OpenUiJson.load`, returns the error
  lines, and adds its own check that the document `version` equals the installed package
  version (`importlib.metadata.version("openui-spec")`).
- **Comparison:**
  [`external_comparisons.py`](https://github.com/shlomoa/django-angular3/blob/460785b20946a5ff06e7fa5f241c038f5565c556/django_angular3/external_comparisons.py#L53-L106)
  validates two documents and turns `bin.compare_openui_spec.compare` output into change
  records; [`build_app`](https://github.com/shlomoa/django-angular3/blob/460785b20946a5ff06e7fa5f241c038f5565c556/django_angular3/management/commands/build_app.py#L62-L80)
  loads the project's `app.openui.json`.
- **Generation:** it calls angular-django2 schematics with CLI options only
  ([`angular.py`](https://github.com/shlomoa/django-angular3/blob/460785b20946a5ff06e7fa5f241c038f5565c556/django_angular3/angular.py#L215-L240)),
  never with `--document`. Its OpenUI documents do not reach angular-django2 today.
- **Documents:** 6 JSON files, all version `0.2.0`, root type `Application`:
  [the example CRM app](https://github.com/shlomoa/django-angular3/blob/460785b20946a5ff06e7fa5f241c038f5565c556/django_angular3/examples/01_simple_crm/app.openui.json),
  [the artifact fixture](https://github.com/shlomoa/django-angular3/blob/460785b20946a5ff06e7fa5f241c038f5565c556/tests/fixtures/artifacts/openui/example.openui.json)
  and four scenario fixtures in
  [`tests/fixtures/scenarios/shared/`](https://github.com/shlomoa/django-angular3/tree/460785b20946a5ff06e7fa5f241c038f5565c556/tests/fixtures/scenarios/shared).
  Only the first two have attributes. More inline documents are in `test_validation.py`,
  `test_cli.py`, `test_build_app.py`, `test_cli_scaffold.py` and the
  [README](https://github.com/shlomoa/django-angular3/blob/460785b20946a5ff06e7fa5f241c038f5565c556/README.md#L270-L290).

### What django-angular3 depends on

| Spec part                                                         | Use today                                                                                                                                                                                                                                                                                                                |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Attribute keys](../README.md#45-attributes-and-their-categories) | `[path]`, `[target]`, `[defaultRoute]`, `[label]`, `[required]`, `(submit)`, `(click)` and the plain keys `title` and `text`. `0.10.0` rejects every bracket key with `grammar/invalid-key`.                                                                                                                             |
| [Value types](../README.md#46-value-types)                        | Quoted literals, as the spec requires (`"\"customers\""`), `"true"` as a string, handler expressions (`createUser(form.value)`).                                                                                                                                                                                         |
| [Element references](../README.md#47-element-references)          | `[target]` and `[defaultRoute]` hold quoted ids. The fixture's `[defaultRoute]` names `dashboard`, which is no element ([line 10](https://github.com/shlomoa/django-angular3/blob/460785b20946a5ff06e7fa5f241c038f5565c556/tests/fixtures/artifacts/openui/example.openui.json#L10)).                                    |
| [Types](../README.md#44-types)                                    | `Application`, `Routing`, `Route`, `DashboardPage`, `Grid`, `section`, `input`, `ToolAction`, and in the tests `List`, `Chart`, `Form`, `Report`, `PickerControl`, `RangeControl`, `StatusIndicator`. All are known in `0.10.0`. The README example uses `FormView`, which no version defines.                           |
| Validator                                                         | Error lines of `OpenUiJson.validate()`; [`test_validation.py`](https://github.com/shlomoa/django-angular3/blob/460785b20946a5ff06e7fa5f241c038f5565c556/tests/test_validation.py#L16-L93) matches the `0.2.0` messages (`$.version: ... does not match`, `unknown OpenUI object type: X`) and the package version check. |
| Comparison                                                        | `compare()` output: `remove`, `add`, `change`, each with a `path`. Unchanged since `0.2.0`.                                                                                                                                                                                                                              |
| Conformance suite                                                 | Not used.                                                                                                                                                                                                                                                                                                                |

Migrated with `spec.bin.migrate` and set to `0.10.0`, five of the six files validate. The
artifact fixture reports `contract/unresolved-reference` on `uses.defaultRoute`. The
migrated fixture also shows modelling gaps the validator does not report, because the
attributes are undeclared: `Grid` with `produces.submit` (a form is `Form` with
`behaves.submit`), `input` with `uses.label` and `uses.required` (declared on `TextInputs`)
and `ToolAction` with `produces.click` (declared: `produces.activate`).

### Migration of django-angular3

In order, for `0.10.0` now and `0.11.0` after W6 26:

1. Pin `openui-spec==0.11.0`. The PyPI release must exist first. Its dependencies are
   unchanged since `0.2.0` (`jsonschema==4.26.0`, `TatSu==5.24.0`).
2. Run `python -m spec.bin.migrate` on the 6 JSON files. It is not in the PyPI wheel, so run
   it from an openui-spec checkout at the release tag. It converts the keys and the
   `"true"` value. It does not change `version`: set it by hand in the files, the inline test
   documents and the README.
3. Fix what the migration cannot: `uses.defaultRoute` to `"\"dashboardRoute\""`;
   `inviteUserForm` to type `Form` with `behaves.submit`; `emailField` to `TextInputs`;
   `produces.click` to `produces.activate`; `FormView` in the README to `Form`.
4. In `validation.py`, drop the own version check (the validator now reports
   `document/unsupported-version`) or compare with the catalog version, not the package
   version. Consider `bin.openui_document.validate_value` for structured diagnostics.
5. Update the tests that match `0.2.0` messages to the new `path: code: message` lines.
6. Change the README link `#specification-artifacts-grammar-vs-catalog` to
   [`#41-specification-artifacts`](../README.md#41-specification-artifacts).
7. Check the comparison: after the key change a diff between a `0.2.0` and a `0.11.0`
   document shows every attribute as removed and added. Migrate the "previous" and the
   "current" documents together.

Validate with the project's tests and with `openui_spec validate --input <document>` on each
file. As for angular-django2, the conformance suite is not needed while the project calls the
upstream validator.

## Candidate spec issues

The downstream code shows these points in the spec. Task 26.1 confirms or rejects each one
with the downstream owners; nothing here changes the spec.

| #   | Issue                                                                                                                                                                                                                                                          | Spec part                                                                                  | Shown by                                                           |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| D1  | An unquoted literal is silently an expression. angular-django2 writes its literals unquoted; the two projects write the same `Route` path in two forms. No validator stage reports it, and `spec.bin.migrate` cannot fix it.                                   | [4.5](../README.md#45-attributes-and-their-categories), [4.6](../README.md#46-value-types) | angular-django2 readers and docs; django-angular3 fixtures         |
| D2  | Undeclared attributes are allowed only by implication ("a value of an attribute the contract does not declare is not type-checked"). No rule says a concrete document may carry extension attributes, or how to mark them. angular-django2 reads more than 20. | [4.6](../README.md#46-value-types), [5.5](../README.md#55-object-contracts)                | angular-django2 mapping document §1.3                              |
| D3  | Pages declare no attributes: `DashboardPage` and `EmptyPage` have no title or route. angular-django2 reads `title`, `route`, `icon` and `access`, and its route path has two sources (`DashboardPage[route]` and `Route[path]`).                               | [5.5](../README.md#55-object-contracts); the Pages scopes                                  | angular-django2 `page/ast.ts`, mapping §1.4                        |
| D4  | `Form` declares no title and no submit target (`action`, the endpoint). Is the endpoint data that is not UI ([1.2](../README.md#12-scope)), or part of the form contract?                                                                                      | [1.2](../README.md#12-scope); the Form scope                                               | angular-django2 `reactive-form`                                    |
| D5  | A reference to external code is neither a literal nor an expression: `(submit)` holds `<artifact>#<Symbol>.<method>` and `[data]` holds `<apiPath>#<ApiService>`. The spec says Behaves values are target-language expressions.                                | [4.5](../README.md#45-attributes-and-their-categories)                                     | angular-django2 `reactive-form`, `data-service`                    |
| D6  | The `TextInputs` contract has no validation attributes (`minLength`, `pattern`, `email`, `min`, `max`), no field `name`, `hint` or `autocomplete`. Several are HTML attributes.                                                                                | the Controls scopes                                                                        | angular-django2 `form-field/ast.ts`                                |
| D7  | A numeric text field: angular-django2 maps `type=number` to `RangeControl`, which models a range, not a number input.                                                                                                                                          | the Controls scopes                                                                        | angular-django2 `form-field/ast.ts`                                |
| D8  | `Route` `uses.target` is untyped `reference`; both projects expect it to name a page or content element.                                                                                                                                                       | [4.7](../README.md#47-element-references)                                                  | angular-django2 mapping §1.4                                       |
| D9  | Composition slots (`[slot]`: header, content, footer) are an extension; content projection is deferred with the Composition scope.                                                                                                                             | [1.2 Deferred](../README.md#deferred)                                                      | angular-django2 `embed-component/compose.ts`                       |
| D10 | Both projects equate the document version with the package version. 4.8 says they are separate, but every "Upgrading to" step sets both to the same number, and the Python package offers no documented way to read the implemented spec version.              | [4.8](../README.md#48-versioning)                                                          | angular-django2 `ast-compiler.ts`; django-angular3 `validation.py` |

## Tooling and release observations

These are not spec issues, but the handover depends on them:

- **Published versions:** npm and PyPI have `0.4.0`, `0.7.0` and `0.8.0`, but not `0.5.0`,
  `0.6.0`, `0.9.0` or `0.10.0` (checked 2026-09-29). The downstream projects can build on
  `0.11.0` only once it is published to both.
- **Migration tool:** `spec/bin/migrate.py` and the conformance cases are not in the PyPI
  wheel (checked on `0.8.0`), and not in the npm package. The
  [0.6.0 upgrade step](../../CHANGELOG.md#upgrading-to-060) tells users to run it; they
  need a checkout.
- **Migration scope:** `spec.bin.migrate` does not set `version`, does not quote literals
  (D1) and maps an undeclared `(x)` to `produces.x`.
- **TypeScript entry point:** `validateValue` and `fromValue` are not exported, so in-memory
  documents go through `OpenUiJson`.
- **Python package names:** the wheel installs the top-level packages `bin` and `spec`,
  which downstream code imports as `bin.openui_spec`.

## What 26.1 still needs

1. W6 26 releases `0.11.0` and publishes it to npm and PyPI.
2. Re-check this record against the `0.11.0` changelog entry and its "Upgrading to" steps.
3. Hand `0.11.0` and this record to both projects. #98 and #103 are closed, so the owner
   decides where angular-django2 tracks the work (a new issue or a reopened one).
4. Each project migrates, runs its tests and reports its result.
5. Record the results and the confirmed spec issues (D1–D10) in the plan: each is fixed or
   becomes a task.

## Sources

- angular-django2 at
  [`39965f7`](https://github.com/shlomoa/angular-django2/tree/39965f7183a777ca022b413d1b9bc9d8743606e8),
  issues [#98](https://github.com/shlomoa/angular-django2/issues/98) and
  [#103](https://github.com/shlomoa/angular-django2/issues/103), read 2026-09-29.
- django-angular3 at
  [`460785b`](https://github.com/shlomoa/django-angular3/tree/460785b20946a5ff06e7fa5f241c038f5565c556),
  read 2026-09-29.
- openui-spec `main` at `82ba467` (`0.10.0`).
