# Language change

This record holds the approved language decisions of the
[v1 publish plan](specui_v1_publish_plan.md#w5-ui-description-language), workstream W5:

- task 19: which attribute value types OpenUI has (directive Q6: typed values);
- task 20: the key syntax that replaces the Angular-flavoured `[x]` / `(x)` keys, designed
  with the value types (directive Q7, decided 2026-09-29: keys and values change into
  typed attributes);
- task 21: data-binding references, event payloads and i18n string references, extending
  the 0.3.0 same-document element references;
- task 22: the versioning and compatibility policy.

Each change is one of four actions on a rule of the language.

| Action               | Meaning                                                       |
| -------------------- | ------------------------------------------------------------- |
| **Change A to B**    | The same rule; its form or wording changes from A to B.       |
| **Replace A with B** | Rule A is removed and a different rule B takes over its role. |
| **Delete A**         | Rule A is removed with no successor.                          |
| **Add C**            | C is a new rule.                                              |

- **Where each change applies:** the document format ([`EBNF.txt`](../EBNF.txt) and its
  JSON Schema projection), the [Spec format](../README.md#spec-format) section of the spec
  README, the [glossary](../scopes/scope.md#glossary) and the
  [attribute categories](../scopes/scope.md#attribute-categories), the
  [leaf template](../scopes/template.scope.md#attributes), the scope converter
  (`spec/bin/to_json`), the catalog, the worked examples, the generator fixtures, the tools and
  the [conformance suite](../conformance/README.md#conformance-suite).
- **Inputs:** the language issues of the four surveys:
  [Angular Material D01–D07](angular-material/openui_schema_proposal.md#decisions),
  [HTML Standard](html5/openui_schema_proposal.md#issues-for-the-language-workstream),
  [OpenUI5](openui5/opens.md#o4-the-four-folder-abstraction-scopes) (bindings and models are
  framework infrastructure, out of the catalog) and
  [Qt Widgets D01–D09](qt/openui_schema_proposal.md#decisions), with
  [Qt Q5](qt/opens.md#q5-serialization-of-values); the approved
  [scope change](scope_change.done.md#4-add) (A4, A7, A8 and "Not added"); and the current
  spec, measured below.
- **Status:** approved (2026-09-29). Every decision is answered by the owner or by the spec
  itself ([Decisions](#decisions)); nothing is open. It is applied by W5 task 23, which
  converts the grammar, the schema, the catalog, the examples, the fixtures and the tools.
- **Guiding rule:** extend the current language; do not replace what the spec already
  defines. The key keeps carrying its category, literals stay quoted, and element references
  keep their 0.3.0 form.

## Summary

| Action  | Count | Examples                                                                                           |
| ------- | ----: | -------------------------------------------------------------------------------------------------- |
| Change  |     6 | Attribute values: strings or null → typed JSON values; the leaf Attributes line gains a value type |
| Replace |     2 | `[x]` / `(x)` keys → `uses.x`, `produces.x`, `behaves.x`; the Angular note → a generator note      |
| Delete  |     0 | Not needed.                                                                                        |
| Add     |     6 | The value types; how a value fits its type; the version policy; the migration tool                 |

## Current state

What the spec has today, counted on 2026-09-29 (version 0.5.0):

| Fact                                                                                                                                                                                                                                                                                                                                | Source                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| The grammar allows only strings and `null` as attribute values, and any string as a key.                                                                                                                                                                                                                                            | [`EBNF.txt`](../EBNF.txt), `attr_value = string \| null`                                                                            |
| 23 leaf scopes declare 58 attributes: 39 Uses, 5 Produces and 14 Behaves. The key bracket must agree with the category word, so the category is stated twice.                                                                                                                                                                       | [Leaf scope source format](../README.md#field-mapping); the scope files                                                             |
| The value type of an attribute lives only in prose: 6 Uses attributes say "boolean", 10 say "reference". Nothing checks it.                                                                                                                                                                                                         | For example [Dialog](../scopes/Widgets/dialog.scope.md#attributes)                                                                  |
| The 62 worked examples hold 471 attribute values. Under `[x]` keys: 230 quoted string literals (`"\"Dashboard\""`), 41 `true` / `false`, 31 numbers and 51 bare expressions (`isSaving`, `form.dirty`), all written as strings. Under `(x)` keys: 41 handler calls (`onSubmit(form.value)`). 77 plain keys (73 literals, 4 `null`). | `spec/examples/**/*.example.json`                                                                                                   |
| An element reference is a quoted string literal whose decoded value is an id, for example `"[route]": "\"dashboardRoute\""`. No validator resolves or type-checks it.                                                                                                                                                               | [Element references](../README.md#element-references)                                                                               |
| Values "may be literals, binding expressions, JavaScript code snippets, or function calls, depending on the target framework".                                                                                                                                                                                                      | [attributes](../README.md#attributes---attrs-field)                                                                                 |
| A document declares `version` (MAJOR.MINOR.PATCH) at its root. Every spec change bumps `SCHEMA_VERSION`; no rule says which document versions a tool accepts.                                                                                                                                                                       | [Canonical root document](../README.md#canonical-root-document); [RELEASING](../../RELEASING.md#schema-and-catalog-version-changes) |

## What the four sources do

| Concern                  | HTML Standard                                                                                                | OpenUI5                                                                                                                     | Qt Widgets                                                                                               | Angular Material                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Value types              | Attribute strings with typed microsyntaxes: boolean, enumerated, integer, floating-point, date and time, URL | Typed properties declared in control metadata: `string`, `int`, `float`, `boolean`, enumerations, `sap.ui.core.URI`, arrays | Typed `Q_PROPERTY`: `bool`, `int`, `double`, `QString`, enumerations, `QDate`, `QUrl`, `QStringList`     | Typed inputs, with `booleanAttribute` and `numberAttribute` transforms for template strings |
| Where the category lives | In the attribute's definition; event handler attributes are named `on…`                                      | In control metadata (properties, aggregations, associations, events); an XML view uses the plain name                       | In the class (property or signal); a `.ui` file sets properties by name and lists connections separately | In the component (`input()` or `output()`); templates mark it with `[x]` and `(x)`          |
| References by id         | `for`, `form`, `list`, `popovertarget` and `aria-controls` name another element by id                        | Associations reference another control by id, without owning it                                                             | Buddy and other object references by name                                                                | Template reference variables                                                                |
| Data binding             | None                                                                                                         | Binding paths such as `{/path}` or `{model>path}`, one-way or two-way                                                       | Property bindings in Qt Quick; none in Widgets `.ui` files                                               | Property binding `[x]`, two-way `[(x)]` as the pair `x` and `xChange`                       |
| Event payloads           | An `Event` object per event type                                                                             | Events declare named, typed parameters                                                                                      | Signals declare typed arguments                                                                          | `output<T>()` declares the payload type                                                     |
| Translated text          | `lang` and `dir` only; no message catalog                                                                    | Resource model: `{i18n>key}`                                                                                                | `tr()` and `.ts` translation files                                                                       | `i18n` markers and `$localize`                                                              |
| Versioning               | A living standard with no versions                                                                           | Library versions; `sap.ui.version`                                                                                          | `.ui` files declare `<ui version="4.0">`                                                                 | Package SemVer with `ng update` migrations                                                  |

Sources: [HTML common microsyntaxes](https://html.spec.whatwg.org/#common-microsyntaxes),
[HTML event handler content attributes](https://html.spec.whatwg.org/#event-handler-content-attributes);
[OpenUI5 ManagedObject](https://sdk.openui5.org/api/sap.ui.base.ManagedObject),
[OpenUI5 ResourceModel](https://sdk.openui5.org/api/sap.ui.model.resource.ResourceModel);
[Qt property system](https://doc.qt.io/qt-6/properties.html),
[Qt signals and slots](https://doc.qt.io/qt-6/signalsandslots.html),
[Qt Designer UI file format](https://doc.qt.io/qt-6/designer-ui-file-format.html);
[Angular inputs](https://angular.dev/guide/components/inputs),
[Angular outputs](https://angular.dev/guide/components/outputs),
[Angular i18n](https://angular.dev/guide/i18n); [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).
The survey inventories hold the per-component evidence:
[Angular Material](angular-material/README.md#contents), [HTML](html5/README.md#contents),
[OpenUI5](openui5/README.md#contents) and [Qt](qt/README.md#contents).

All four sources type their values, and the common set is small: text, true or false, whole
and decimal numbers, a choice from a list, a URL and a list. OpenUI adopts that set (Q6) and
keeps its own rules for everything the spec already defines: the key marks the category
(now in a neutral form, Q7), a literal string is quoted, an unquoted string is a binding or
target-language expression, and an element reference is a quoted id.

## 1. Change

| #   | Rule                                                                            | Change                                                                    | To                                                                                                                                                                                                                                                               | Decision |
| --- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| C1  | Attribute value form ([`EBNF.txt`](../EBNF.txt), JSON Schema, README)           | "Values are strings or null."                                             | A value is a JSON string, number, `true`, `false`, `null`, or a list of these. A string keeps its current meaning: quoted inside the string it is a literal (`"\"Details\""`); unquoted it is a binding or target-language expression (`orders`, `!isExpanded`). | 1, 3, 8  |
| C2  | Attribute key form (EBNF, JSON Schema)                                          | `attr_key = string`: any string.                                          | `uses.<name>`, `produces.<name>` or `behaves.<name>`, or a plain `<name>` that carries no category (for example a native HTML attribute or catalog metadata such as `title`). `<name>` is camelCase, `[a-z][A-Za-z0-9]*`.                                        | 5        |
| C3  | Leaf Attributes line ([template](../scopes/template.scope.md#attributes))       | ``- `[name]` — Uses — description``                                       | ``- `uses.name` — Uses — <type> — description`` for a Uses attribute, for example ``- `uses.open` — Uses — boolean — whether the dialog is shown.`` A Produces or Behaves line has no type: ``- `produces.close` — Produces — description``.                     | 4, 6, 7  |
| C4  | Catalog instance attributes (`spec/openui.json`)                                | `"[open]": null`                                                          | `"uses.open": "boolean"`: a Uses attribute carries its declared type; a Produces or Behaves attribute stays `null`. The converter writes it from the Attributes line.                                                                                            | 6        |
| C5  | Element references ([README](../README.md#element-references))                  | A reference is a Uses attribute whose static value is a quoted id.        | The same form (`"uses.route": "\"dashboardRoute\""`), now typed `reference` or `reference(Route)` in the Attributes line, so a tool knows which attributes are references and which types they may name.                                                         | 9        |
| C6  | Glossary [Attribute](../scopes/scope.md#attribute) and the attribute categories | "OpenUI distinguishes Uses attributes (`[name]`) … string-or-null values" | "OpenUI distinguishes Uses attributes (`uses.name`), Produces attributes (`produces.name`) and Behaves attributes (`behaves.name`) … A Uses attribute declares its value type."                                                                                  | 5, 6     |

## 2. Replace

| #   | Replace                                                                                                                                                                                                 | With                                                                                                                                          | Decision | Why                                                                                                  |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| R1  | The `[x]` / `(x)` key syntax ([attributes](../README.md#attributes---attrs-field), [attribute categories](../scopes/scope.md#attribute-categories), [template](../scopes/template.scope.md#attributes)) | `uses.x`, `produces.x` and `behaves.x`. The key still carries its category, and all categories stay inside `attrs`.                           | 5        | Framework-neutral (Q7). `(x)` stood for both Produces and Behaves; the new form names each category. |
| R2  | The Angular Material note in the [attribute categories](../scopes/scope.md#attribute-categories): "`[name]` represents a Uses/input binding …"                                                          | A note that a generator maps each category to its target: an Angular generator emits `[name]` for Uses and `(name)` for Produces and Behaves. | 5        | The Angular form stays where it belongs, in the generator.                                           |

## 3. Delete

Not needed.

## 4. Add

| #   | Add                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Where                                                                     | Decision   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------- |
| A1  | **Value types.** `string`; `boolean`; `integer`; `number`; `url` (a URI reference, RFC 3986); `enum(a\|b\|c)` (one of the listed words); `reference` or `reference(Type\|Type)` (an element reference, C5); `list(type)` (a list of values of one of the other types).                                                                                                                                                                                              | Spec README; template; the section grammar of the README                  | 1, 4       |
| A2  | **How a value fits its type.** `null` means the attribute is present without a value. A literal is written in its JSON form: `true` or `false` for `boolean`, a number for `integer` (without a fraction) and `number`, a list for `list(type)`, and a quoted string for `string`, `url`, `enum` and `reference`. Any unquoted string is a binding or target-language expression, allowed for every type; OpenUI does not evaluate it.                              | Spec README                                                               | 1, 3, 8, 9 |
| A3  | **Produces and Behaves values** are target-language expressions (unquoted strings) or `null`. They declare no value type.                                                                                                                                                                                                                                                                                                                                           | Spec README; template                                                     | 7          |
| A4  | **Version policy.** The spec version follows Semantic Versioning (MAJOR.MINOR.PATCH). Every specification change is a new version and may break documents (RELEASING: every spec change forces a version bump). A document declares the spec version it is written for in its root `version`; a tool accepts only the spec version it implements. There is no deprecation period and no pre-release version in documents. Package versions stay separate contracts. | Spec README, new "Versioning" section                                     | 11–15      |
| A5  | **New diagnostic codes** for the conformance suite: `grammar/invalid-key` (a key outside C2), `document/unsupported-version` (A4), `contract/wrong-value-type` (A2) and `contract/unresolved-reference` and `contract/wrong-reference-type` (C5).                                                                                                                                                                                                                   | [Conformance suite](../conformance/README.md#conformance-suite) (W8 32.2) | 5, 9, 12   |
| A6  | **Migration tool.** `python -m spec.bin.migrate` converts a 0.5 document mechanically: `[x]` → `uses.x`; `(x)` → `behaves.x` when the element's type declares `x` as Behaves, otherwise `produces.x`; the strings `"true"`, `"false"` and unquoted numbers of a Uses attribute become JSON literals unless the attribute is declared `string`, `url`, `enum` or `reference`. The examples and the fixtures are regenerated with it, not edited by hand.             | `spec/bin/`                                                               | 16         |

### Not added

- **Temporal types** (`date`, `time`, `datetime`): approved scope change
  [A8](scope_change.done.md#4-add) requires the locale, value format and time zone first; the
  Date/time pickers example adds no single-value binding attribute; locale belongs to
  internationalization, which is postponed. A date is a `string` until then.
- **Message references (i18n):** postponed by the owner; not part of this change.
- **A handler-name model for events:** Produces and Behaves values stay target-language
  expressions, as [spec/README.md](../README.md#attributes---attrs-field) says.
- **Binding objects** such as `{"bind": "path"}`: a binding stays an unquoted string.
- **A new element-reference encoding:** the 0.3.0 quoted form stays (task 21: extend, don't
  replace).
- **Deprecation periods and pre-release versions in documents:** every spec change is breaking
  (owner's directive), and release candidates wait on downstream validation (Q3).
- **Object and record values**, CSS lengths and colors, rich text (scope change
  [A4](scope_change.done.md#4-add)) and a resource-reference kind (Qt
  [D06](qt/openui_schema_proposal.md#decisions); `url` covers it).

## Decisions

Answered on 2026-09-29 by the owner or by the spec itself. Nothing is open.

| #   | Task | Decision                               | Outcome                                                                                                                  | Source                                                                                                                                                                                |
| --- | ---- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 19   | Which value types                      | The set of A1.                                                                                                           | Directives Q6 and Q7 (typed attributes, as planned)                                                                                                                                   |
| 2   | 19   | Temporal format and time zone          | Not needed now; no temporal type.                                                                                        | Scope change [A8](scope_change.done.md#4-add); the Date/time pickers example is range-only; internationalization is postponed                                                         |
| 3   | 19   | What `null` means                      | Present without a value.                                                                                                 | [spec/README.md](../README.md#attributes---attrs-field): "An attribute with no value appears as having `null` value"; the Spec JSON File Generator: "valueless attributes use `null`" |
| 4   | 19   | Where an enum list lives               | In the machine-bearing Attributes line, as `enum(a\|b)`.                                                                 | [spec/README.md](../README.md#field-mapping) and the template: machine-bearing sections are the sole enumerators of ids, keys, types and categories                                   |
| 5   | 20   | Key syntax                             | The key keeps its category, in the neutral form `uses.x`, `produces.x`, `behaves.x`; all categories stay inside `attrs`. | Template: "`<key>` carries its category in its own syntax"; README: "The category is represented by the attribute key syntax"; plan question Q7                                       |
| 6   | 20   | Where the type is declared             | In the machine-bearing Attributes line; the converter carries it into the catalog.                                       | Owner; README [field mapping](../README.md#field-mapping)                                                                                                                             |
| 7   | 21   | Event and behavior values              | Target-language expressions; no handler-name model.                                                                      | [spec/README.md](../README.md#attributes---attrs-field)                                                                                                                               |
| 8   | 21   | Data binding                           | The existing rule: a literal is quoted inside the string, a binding or expression is unquoted. No binding object.        | Owner; the worked examples                                                                                                                                                            |
| 9   | 21   | Element references                     | The quoted-literal form stays; `reference(Type)` typing is added on top.                                                 | [spec/README.md](../README.md#element-references); task 21 ("extend, don't replace")                                                                                                  |
| 10  | 21   | Message references (i18n)              | Postponed; not part of this change.                                                                                      | Owner                                                                                                                                                                                 |
| 11  | 22   | Version scheme                         | Semantic Versioning.                                                                                                     | README: "Required semantic version string"; [RELEASING](../../RELEASING.md#2-select-and-set-the-package-version)                                                                      |
| 12  | 22   | Which document versions a tool accepts | Only the spec version it implements.                                                                                     | Owner's directive: every spec change is breaking; [RELEASING](../../RELEASING.md#schema-and-catalog-version-changes): every spec change forces a version bump                         |
| 13  | 22   | Deprecation                            | No deprecation period.                                                                                                   | The same directive                                                                                                                                                                    |
| 14  | 22   | Pre-release versions in documents      | None before downstream validation.                                                                                       | Plan directive Q3                                                                                                                                                                     |
| 15  | 22   | Package and spec versions              | Separate contracts.                                                                                                      | [RELEASING](../../RELEASING.md#schema-and-catalog-version-changes): "The package version and the OpenUI schema/catalog version are separate contracts"                                |
| 16  | 23   | Migration                              | Generated by a migration tool, not converted by hand.                                                                    | Owner's rule that examples are not written by hand; the Spec JSON File Generator rules                                                                                                |
