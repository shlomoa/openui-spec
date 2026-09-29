# Language change proposal

This proposal answers the language decisions of the
[v1 publish plan](specui_v1_publish_plan.md#w5-ui-description-language), workstream W5:

- task 19: which attribute value types OpenUI has (directive Q6: typed values);
- task 20: the key syntax that replaces the Angular-flavoured `[x]` / `(x)` keys, designed
  with the value types (directive Q7, decided 2026-09-29: keys and values change into
  typed attributes);
- task 21: data-binding references, event payloads and i18n string references, extending
  the 0.3.0 same-document element references;
- task 22: the versioning and compatibility policy.

Each recommendation is one of four actions on a rule of the current language.

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
  (`spec/bin/to_json`), the worked examples, the generator fixtures and the
  [conformance suite](../conformance/README.md#conformance-suite).
- **Inputs:** the language issues of the four surveys:
  [Angular Material D01–D07](angular-material/openui_schema_proposal.md#decisions),
  [HTML Standard](html5/openui_schema_proposal.md#issues-for-the-language-workstream),
  [OpenUI5](openui5/opens.md#o4-the-four-folder-abstraction-scopes) (bindings and models are framework
  infrastructure, out of the catalog) and [Qt Widgets D01–D09](qt/openui_schema_proposal.md#decisions),
  with [Qt Q5](qt/opens.md#q5-serialization-of-values); the approved
  [scope change](scope_change.done.md#4-add) (A4, A7, A8 and "Not added"); and the current
  spec, measured below.
- **Status:** proposal for the owner, 2026-09-29. Nothing is applied. W5 task 23 converts the
  grammar from the approved rows; W8 tasks 32 (finish), 33 and 34 build on them.
- **Naming rule used:** the approved
  [canonical-term rule](../scopes/terminology.md#appendix-a-canonical-term-rule). No
  framework syntax or class name becomes an OpenUI key or value form.

## Summary

| Action  | Count | Examples                                                                                                       |
| ------- | ----: | -------------------------------------------------------------------------------------------------------------- |
| Change  |     7 | Attribute values: strings or null → typed JSON values; the leaf Attributes line gains a type                   |
| Replace |     4 | `[x]` / `(x)` keys → plain names with the category in the contract; target-language expressions → typed values |
| Delete  |     0 | Not needed.                                                                                                    |
| Add     |    12 | Value types; data bindings; event payloads; message references; reference checks; the version policy           |

The [Decisions](#decisions) table lists the 16 decisions the owner approves. Rows C, R and A
follow from them; each row names its decision.

## Current state

What the spec has today, counted on 2026-09-29 (base branch at version 0.5.0):

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

Three findings shape the proposal. All four sources type their values, and the common set
is small: text, true or false, whole and decimal numbers, a choice from a list, a URL, a date
or time, and a list. Two of the four keep the category out of the key at the place of use
(OpenUI5 XML views, Qt `.ui` files); only Angular templates mark it in the key, and HTML
marks only events. Every source that binds data or translates text uses a named path or key,
not code.

## 1. Change

| #   | Rule                                                                      | Change                                                                      | To                                                                                                                                                                                                                                               | Decision | Evidence                                                                                                                                             |
| --- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| C1  | Attribute value form ([`EBNF.txt`](../EBNF.txt), JSON Schema, README)     | "Values are strings or null."                                               | A value is a JSON string, number, `true`, `false`, `null`, a list of values, a data binding (A2) or a message reference (A6).                                                                                                                    | 1, 8, 10 | HTML [string-only values](html5/openui_schema_proposal.md#issues-for-the-language-workstream); Qt D03, D05                                           |
| C2  | Attribute key form (EBNF, JSON Schema)                                    | `attr_key = string`: any string.                                            | A camelCase name, `[a-z][A-Za-z0-9]*`, the same pattern as an element id.                                                                                                                                                                        | 5        | All 58 declared names and every key in the examples already fit                                                                                      |
| C3  | Leaf Attributes line ([template](../scopes/template.scope.md#attributes)) | ``- `[name]` — Uses — description``                                         | ``- `name` — Uses — type — description``, for example ``- `open` — Uses — boolean — whether the dialog is shown.`` The type is from A1; Produces gives the payload type (A4); Behaves gives `boolean` or `handler` (A5).                         | 1, 6     | The 16 attributes whose type sits in prose today                                                                                                     |
| C4  | Catalog instance attributes (`spec/openui.json`)                          | `"[open]": null`                                                            | `"open": "Uses boolean"`: the category and the type, so a validator reads the contract from the catalog.                                                                                                                                         | 6        | [Field mapping](../README.md#field-mapping)                                                                                                          |
| C5  | Element reference encoding ([README](../README.md#element-references))    | A quoted string literal inside a string: `"[route]": "\"dashboardRoute\""`. | The id as a plain string: `"route": "dashboardRoute"`. The contract type `reference(Route)` says it is a reference and which types it may name. The meaning is unchanged: same document, globally unique id, resolved across the whole document. | 9        | Qt [D01](qt/openui_schema_proposal.md#decisions); Angular Material [D01](angular-material/openui_schema_proposal.md#decisions); OpenUI5 associations |
| C6  | Glossary [Attribute](../scopes/scope.md#attribute)                        | "OpenUI distinguishes Uses attributes (`[name]`) … string-or-null values"   | "An attribute has a name, a category (Uses, Produces or Behaves) and a typed value. The object's contract declares the category and the type."                                                                                                   | 5, 6     | —                                                                                                                                                    |
| C7  | Version syntax (EBNF `version_value`)                                     | `MAJOR.MINOR.PATCH` only.                                                   | `MAJOR.MINOR.PATCH` with an optional SemVer pre-release suffix, for example `1.0.0-rc.1`.                                                                                                                                                        | 14       | The plan names `1.0.0-rc.1` (W6 26); [SemVer](https://semver.org/spec/v2.0.0.html#spec-item-9)                                                       |

## 2. Replace

| #   | Replace                                                                                                                                                                     | With                                                                                                                                          | Decision | Why                                                                                                                                                  |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| R1  | The `[x]` / `(x)` key syntax that marks the category ([attributes](../README.md#attributes---attrs-field), [attribute categories](../scopes/scope.md#attribute-categories)) | Plain names. The category is declared once, in the scope contract, and carried to the catalog (C4).                                           | 5        | Framework-neutral; one source for the category, which the key and the category word now both state; OpenUI5 and Qt keep the category out of the key. |
| R2  | "Values … may be literals, binding expressions, JavaScript code snippets, or function calls, depending on the target framework."                                            | Values are data, never code: literals of the declared type, data bindings (A2), handler names (A4, A5) and message references (A6).           | 1, 8, 10 | A document must mean the same in every target; 51 bare expressions and 41 handler calls in the examples only work in one template language.          |
| R3  | Handler calls as Produces values, for example `"(submit)": "onSubmit(form.value)"`                                                                                          | A handler name, `"submit": "saveOrder"`. The contract declares the payload the handler receives (A4).                                         | 7        | OpenUI5 XML views name the handler; Qt connects a signal to a slot; the payload is declared by the source in all four.                               |
| R4  | The Angular Material note in the [attribute categories](../scopes/scope.md#attribute-categories): "`[name]` represents a Uses/input binding …"                              | A note that a generator maps each category to its target: an Angular generator emits `[name]` for Uses and `(name)` for Produces and Behaves. | 5        | The Angular form stays where it belongs, in the generator.                                                                                           |

## 3. Delete

Not needed.

## 4. Add

| #   | Add                                                                                                                                                                                                                                                                                                                                                                                                      | Where                                                                                                           | Decision | Evidence                                                                                                                                                                                                                                                                          |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | **Value types.** `string`; `boolean`; `integer` (a JSON number without a fraction); `number`; `enum(a\|b\|c)` (one of the listed strings); `url` (a URI reference, RFC 3986); `date`, `time` and `datetime` (ISO 8601 text: `2026-09-29`, `14:30` or `14:30:00`, and an RFC 3339 date-time with `Z` or an offset); `reference` or `reference(Type\|Type)` (C5); `list(type)` (a JSON list of that type). | Spec README, Spec format; template                                                                              | 1, 2, 3  | The common set of the four sources (table above); HTML [string-only values](html5/openui_schema_proposal.md#issues-for-the-language-workstream); Qt D03 (a number), D05 (a list), D06 (a URL); scope change [A8](scope_change.done.md#4-add) (date and time format and time zone) |
| A2  | **Data binding.** A Uses value may be `{"bind": "order.customer.name"}`: a path of camelCase names joined by dots, resolved in the application's data, which the document does not define. No operators, calls, filters or formatters.                                                                                                                                                                   | Spec README; EBNF (`binding_value`)                                                                             | 8        | OpenUI5 binding paths; Angular property binding; Angular Material [D01](angular-material/openui_schema_proposal.md#decisions) (no framework expressions)                                                                                                                          |
| A3  | **Two-way binding.** When a contract declares a Uses attribute `name` and a Produces attribute `nameChange` of the same type, a binding on `name` also receives each new value. No other attribute is two-way.                                                                                                                                                                                           | Spec README                                                                                                     | 8        | Angular `[(x)]` as `x` and `xChange`; OpenUI5 two-way binding; Qt properties with a notify signal                                                                                                                                                                                 |
| A4  | **Event payloads.** A Produces attribute declares its payload type in its Attributes line (`event` with no payload, or `event(type)` with a type from A1). Its value in a document is a handler name (camelCase). The handler receives exactly the payload. Request and completion are separate events.                                                                                                  | Template; Spec README                                                                                           | 7        | Qt [D08](qt/openui_schema_proposal.md#decisions); Angular Material [D02](angular-material/openui_schema_proposal.md#decisions); scope change [A7](scope_change.done.md#4-add)                                                                                                     |
| A5  | **Behaves values.** A Behaves attribute is `boolean` (turns the object's own behavior on or off, for example `"sort": true`) or `handler` (names application logic the behavior calls, for example a filter predicate). Its Attributes line says which.                                                                                                                                                  | Template; Spec README                                                                                           | 7        | The 14 Behaves attributes (`sort`, `filter`, `paginate`, `validate`, `submit`, `expand`, `collapse`, `group`)                                                                                                                                                                     |
| A6  | **Message references (i18n).** A `string` value may be `{"i18n": "orders.title"}`: a key of camelCase names joined by dots, resolved in the application's message catalog for the current locale. An optional `"args"` object fills named placeholders with literals or bindings. OpenUI does not define the catalog format.                                                                             | Spec README; EBNF (`message_value`); [Internationalization](../scopes/Internationalization/scope.md#boundaries) | 10       | OpenUI5 resource model; Qt `tr()`; Angular `$localize`; HTML has none; Internationalization boundaries (no file format, no ICU runtime)                                                                                                                                           |
| A7  | **Reference checks.** A validator resolves every `reference` value: the id must exist in the document (`document/unresolved-reference`) and its element's type must be one the contract lists (`contract/wrong-reference-type`).                                                                                                                                                                         | Spec README, Element references; conformance suite                                                              | 9        | Qt [D01](qt/openui_schema_proposal.md#decisions) ("reject missing, wrong-kind … references")                                                                                                                                                                                      |
| A8  | **Contract checks.** A validator checks each attribute of a known type against the catalog: the name is declared (`contract/unknown-attribute`) and the value has the declared type (`contract/wrong-value-type`).                                                                                                                                                                                       | Spec README; conformance suite                                                                                  | 6        | Today no tool checks per-type attributes ([Where input.json fits](../README.md#where-inputjson-fits))                                                                                                                                                                             |
| A9  | **Version policy.** The spec follows SemVer 2.0.0. From `1.0.0`: MAJOR for a change that makes a valid document invalid or changes its meaning; MINOR for additions; PATCH for changes with no machine-readable effect. Before `1.0.0` (directive Q3): every spec change is a new MINOR, and a MINOR may break; its CHANGELOG entry says so.                                                             | Spec README, new "Versioning" section; [RELEASING](../../RELEASING.md#schema-and-catalog-version-changes)       | 11       | [SemVer](https://semver.org/spec/v2.0.0.html); Angular Material package SemVer                                                                                                                                                                                                    |
| A10 | **Document version.** The root `version` is the spec version the document is written for. A tool made for spec X.Y accepts a document with the same MAJOR and a MINOR up to Y; before `1.0.0`, the same MAJOR.MINOR only. PATCH is ignored. Otherwise it reports `document/unsupported-version`. Worked examples, fixtures and the conformance suite carry the current version.                          | Spec README; conformance suite                                                                                  | 12       | Qt `.ui` files declare their format version; every document already has a root `version`                                                                                                                                                                                          |
| A11 | **Deprecation.** The leaf status gains `deprecated`. A deprecated scope or attribute stays valid until the next MAJOR, and the CHANGELOG names its successor.                                                                                                                                                                                                                                            | Template (`status`); Spec README                                                                                | 13       | OpenUI5 [O8 deprecated classes](openui5/opens.md#o8-deprecated-and-experimental-classes); Angular `ng update` migrations                                                                                                                                                          |
| A12 | **Migration tool.** `python -m spec.bin.migrate` converts a 0.5 document: `[x]` and `(x)` keys to plain names, quoted literals to typed values, `"\"id\""` references to ids. Bare expressions and handler calls it cannot convert are reported, not guessed. Task 23 runs it on the examples and fixtures.                                                                                              | `spec/bin/`                                                                                                     | 16       | 471 example values to convert; downstream documents (angular-django2, django-angular3)                                                                                                                                                                                            |

### Not added

- **Target-language expressions and code** in values (R2). A generator may still accept them
  in its own input format; they are not OpenUI.
- **Object and record values**, CSS lengths and colors: no leaf declares one; Layout and
  Presentation define them when a leaf needs them (W6 task 25).
- **Rich text values:** scope change [A4](scope_change.done.md#4-add) requires a representation
  decision first; no leaf has a rich text value attribute.
- **A resource-reference kind** (Qt [D06](qt/openui_schema_proposal.md#decisions)): `url` covers it.
- **Binding indexes, filters, formatters and expressions** (OpenUI5 formatters, Angular pipes):
  a binding is a path only.
- **General cycle detection** for references: a scope that forbids a cycle, such as a redirect
  chain, says so in its Validation notes.
- **Event bubbling and propagation:** an event belongs to the element that produces it.
- **A message catalog format:** out of scope by the
  [Internationalization boundaries](../scopes/Internationalization/scope.md#boundaries).
- **Diagnostic severities** (warning, error): the conformance suite compares errors only; a
  tool may warn about deprecated items.

## Worked example

The date range example of the [spec README](../README.md#example-main-page-with-a-date-range-input),
today and with the proposal (`DateTimePicker` declares `start` and `end` as `date`, and
`dateChange` as `event(date)`):

```json
{
  "id": "dateRangeInput",
  "type": "DateTimePicker",
  "attrs": {
    "start": { "bind": "campaign.start" },
    "end": { "bind": "campaign.end" },
    "dateChange": "onCampaignChange"
  },
  "children": [
    {
      "id": "startDateInput",
      "type": "input",
      "attrs": { "placeholder": { "i18n": "campaign.startDate" } }
    }
  ]
}
```

Today the same node needs `"[formGroup]": "\"campaignTwo\""`, `"placeholder": "\"Start date\""`
and Angular Material directive keys such as `"matStartDate": null`.

## Decisions

One row per decision. The recommendation is the proposal above; the owner approves it or
picks another option.

| #   | Task | Decision                                        | Options                                                                                                                                                                                          | Recommendation                                               |
| --- | ---- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| 1   | 19   | Which value types                               | (a) the A1 set; (b) the A1 set without `url` and the temporal types, which stay `string`; (c) JSON types only (string, number, boolean, list)                                                    | (a): each type is in at least three of the four sources      |
| 2   | 19   | Temporal format and time zone (scope change A8) | (a) ISO 8601 date and time, RFC 3339 date-time with `Z` or an offset; (b) leave temporal values as `string` until W6 task 25                                                                     | (a)                                                          |
| 3   | 19   | What `null` means                               | (a) the attribute is not set, and the contract's default applies; (b) keep `null` as "present without a value" (an HTML boolean attribute), as 4 examples use it                                 | (a): `boolean` takes over (b)                                |
| 4   | 19   | Where a numeric range or an enum list lives     | (a) in the type, in the Attributes line (`enum(single\|multiple)`); (b) in Validation notes prose                                                                                                | (a) for enum; ranges stay prose                              |
| 5   | 20   | Key syntax                                      | (a) plain camelCase names; the category is in the contract (R1); (b) neutral prefixes: `label`, `on:activate`, `do:sort`; (c) three members `uses`, `produces`, `behaves` instead of one `attrs` | (a): one source for the category; OpenUI5 and Qt do the same |
| 6   | 20   | Where the type is declared                      | (a) in the leaf Attributes line and in the catalog instance (C3, C4); (b) in the Attributes line only, read by tools from the prose                                                              | (a): tools read the catalog, not prose                       |
| 7   | 21   | Event handlers and payloads                     | (a) a handler name; the contract declares the payload (A4, A5); (b) keep target-language calls                                                                                                   | (a)                                                          |
| 8   | 21   | Data binding form                               | (a) `{"bind": "path"}` on Uses values, with two-way by the `name` / `nameChange` pair (A2, A3); (b) a string prefix, such as `"=order.name"`; (c) no binding in v1                               | (a): an object cannot be mistaken for text                   |
| 9   | 21   | Element reference encoding                      | (a) the plain id, typed `reference(Type)` by the contract (C5); (b) keep the quoted literal; (c) `{"ref": "id"}`                                                                                 | (a): the meaning stays; the double quoting goes              |
| 10  | 21   | Message references                              | (a) `{"i18n": "key", "args": {…}}` on `string` values (A6); (b) key only, no arguments                                                                                                           | (a)                                                          |
| 11  | 22   | Spec version classes                            | (a) SemVer 2.0.0 as in A9; (b) calendar versions                                                                                                                                                 | (a)                                                          |
| 12  | 22   | Which document versions a tool accepts          | (a) A10: same MAJOR, MINOR up to the tool's (same MAJOR.MINOR before 1.0); (b) the exact version only                                                                                            | (a)                                                          |
| 13  | 22   | Deprecation                                     | (a) a `deprecated` status, valid until the next MAJOR (A11); (b) no deprecation; remove in the next MAJOR                                                                                        | (a)                                                          |
| 14  | 22   | Pre-release versions in documents               | (a) allow a SemVer pre-release suffix (C7); (b) not before the Q3 validation clears `1.0.0-rc.1`                                                                                                 | (b): Q3 defers every release candidate; C7 waits             |
| 15  | 22   | Package and spec versions                       | (a) the Python and npm packages share the spec's MAJOR.MINOR; PATCH may differ for tool-only fixes; (b) keep them separate contracts, as RELEASING says                                          | (a): they are equal today (0.5.0)                            |
| 16  | 23   | Migration                                       | (a) a migration tool (A12); (b) convert the examples by hand in task 23                                                                                                                          | (a): 471 values, and downstream documents need it too        |

When a row is approved, task 23 applies C1–C7, R1–R4 and A1–A12 as far as the approved options
reach, adds the new diagnostic codes to the
[conformance suite](../conformance/diagnostics.schema.json), and bumps the version as
[RELEASING](../../RELEASING.md#schema-and-catalog-version-changes) requires.
