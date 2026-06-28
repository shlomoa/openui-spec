# <Object title>

Source-of-truth template for every leaf `*.scope.md` (a scope with no child
objects). Copy this file, rename it to `<object_name>.scope.md`, and fill in each
section. The sections below are the **formal structure**: the converter in `../to_json/` parses them deterministically into a scope node plus
its `<scopeId>Instance` (see the section EBNF in [`../README.md`](../README.md)).

Three sections are **machine-bearing** and follow fixed line patterns — Identity,
Attributes, Child model. The rest is free prose. Do not re-list machine fields in
the prose sections: the machine-bearing sections are the sole enumerators of ids,
keys, types, categories, and multiplicity. Prose may _reference_ a name to add new
information, but must never restate the set; the shared category definitions
live in [`scope.md`](scope.md) and are referenced by link, never copied.

## Identity

A single bullet of fixed `key: value` fields separated by `·` (middot). All three
keys are required, in this order:

- id: `<camelCaseId>` · type: `<instanceType>` · status: `<draft|review|stable>`

Where:

- `id` — the scope id (camelCase). The scope `type` (PascalCase), the instance id
  (`<id>Instance`), `title` (this file's H1), `purpose` (the Purpose body), and
  `scopeDocument` (this file's path) are **derived**, not authored.
- `type` — the concrete primitive the scope materializes (e.g. `dialog`, `input`,
  `table`) or a PascalCase virtual type. This becomes the `<scopeId>Instance` node
  `type`.
- `status` — the scope's lifecycle status, serialized verbatim.

## Purpose

One or two sentences stating what the object is and the implementation-independent
concept it represents. Free prose; not parsed.

## Attributes

One bullet per attribute. Fixed pattern, `—` (em dash) separated:

- `` `<key>` — <Category> — <free prose description> ``

Where `<key>` carries its category in its own syntax — Uses `[name]`, Produces
`(name)`, Behaves `(name)` — and `<Category>` is the matching word `Uses`,
`Produces`, or `Behaves`. The converter reads the **key** and **category** only;
the description (and any value-type note) is prose. The emitted instance
attr carries just the key with value `null`. List only attributes supported by
approved source material. Omit the whole section if the object has no attributes.

## Child model

One bullet per owned child type. Fixed pattern, `—` (em dash) separated:

- `<childId> — <childType> — <multiplicity> — <free prose description>`

Where `<childId>` is camelCase, `<childType>` is a valid `type`, and
`<multiplicity>` is one of `1`, `0..1`, `0..n`, `1..n`. The converter reads
`childId`, `childType`, and `multiplicity`; it emits one child node (`id`, `type`)
per bullet under the instance, in listed order. Multiplicity is recorded for
validation but is not serialized into the grammar. Omit the whole
section if the object owns no children.

## Accessibility

Role, label, focus, and keyboard expectations for interactive scopes, stated
technology-independently. Free prose; not parsed. May reference attribute or child
names defined above to attach behavior, but must not re-enumerate them.

## Validation notes

Constraints on `id`, `type`, `attrs`, and `children` specific to this scope, beyond
the base `openui.schema.json` grammar. Free prose; not parsed. Must not restate the
keys, types, or regions the machine-bearing sections already own.
