# <Object title>

Source-of-truth template for every leaf `*.scope.md` (a scope with no child
objects). Copy this file, rename it to `<object_name>.scope.md`, and fill in each
section. The sections below are the **formal structure**: the converter in
`../bin/to_json/` parses them into a scope node plus its `<scopeId>Instance`, as
[part 6 of the specification](../README.md#6-catalog) states, with the
[section grammar](../README.md#64-section-grammar).
Use the [spec glossary](scope.md#glossary) for canonical vocabulary and
aliases. Leaf prose MAY specialize a glossary term for the object contract, but
MUST NOT create a competing definition for a shared term.

Three sections are **machine-bearing** and follow fixed line patterns: Identity,
Attributes and Child model. The rest is free prose. The machine-bearing sections
are the only place that lists ids, keys, types, categories and multiplicity. Prose
MAY _reference_ a name to add new information, but MUST NOT list the set again.
The [attribute categories](../README.md#45-attributes-and-their-categories) are
defined once in the specification and are linked, never copied.

## Identity

A single bullet of fixed `key: value` fields separated by `·` (middot). All three
keys are REQUIRED, in this order:

- id: `<camelCaseId>` · type: `<instanceType>` · status: `<draft|review|stable>`

Where:

- `id` — the scope id (camelCase). The scope `type` (PascalCase), the instance id
  (`<id>Instance`), `title` (this file's H1), `purpose` (the Purpose body), and
  `scopeDocument` (this file's path) are **derived**, not authored.
- `type` — the exact semantic-category literal the scope materializes (e.g.
  `dialog`, `input`, `table`, or a PascalCase category). This becomes the
  `<scopeId>Instance` node `type` and therefore a literal member of the generated
  catalog's [known-type set](scope.md#known-object-type); do not use a
  framework selector, implementation identifier, or alias.
- `status` — the scope's lifecycle status, serialized verbatim.

## Purpose

One or two sentences stating what the object is and the implementation-independent
concept it represents. Free prose; not parsed.

## Attributes

One bullet per attribute. Fixed pattern, `—` (em dash) separated:

- `` `uses.<name>` — Uses — <value type> — <free prose description> ``
- `` `produces.<name>` — Produces — <free prose description> ``
- `` `behaves.<name>` — Behaves — <free prose description> ``

Where `<key>` carries its category in its own syntax — Uses `uses.name`, Produces
`produces.name`, Behaves `behaves.name` — and `<Category>` is the matching word
`Uses`, `Produces`, or `Behaves`. A Uses attribute declares one
[value type](../README.md#46-value-types), for example `boolean`, `enum(ltr|rtl|auto)`
or `reference(Route)`; a Produces or Behaves attribute declares none. The converter
reads the **key**, **category** and **value type**; the description is prose. The
emitted instance attr carries the key with the value type as its value, or `null`
for Produces and Behaves. List only attributes supported by approved source
material. Omit the whole section if the object has no attributes.

## Child model

One bullet per owned child type. Fixed pattern, `—` (em dash) separated:

- `<childId> — <childType> — <multiplicity> — <free prose description>`

Where `<childId>` is camelCase, `<childType>` is a valid `type`, and
`<multiplicity>` is one of `1`, `0..1`, `0..n`, `1..n`. The converter reads
`childId`, `childType`, and `multiplicity`; it emits one child node (`id`, `type`)
per bullet under the instance, in listed order. Multiplicity is recorded for
validation but is not serialized into the grammar. Omit the whole
section if the object owns no children.

Use the child `id` to distinguish the owned role or instance. Use an exact
semantic-category literal for `childType`; the emitted literal becomes part of
the generated catalog's known-type set.

## Accessibility

Role, label, focus, and keyboard expectations for interactive scopes, stated
technology-independently. Free prose; not parsed. It MAY reference attribute or child
names defined above to attach behavior, but MUST NOT list them again.

## Validation notes

Constraints on `id`, `type`, `attrs`, and `children` specific to this scope, beyond
the base `openui.schema.json` grammar. Free prose; not parsed. It MUST NOT restate the
keys, types, or regions the machine-bearing sections already own.
