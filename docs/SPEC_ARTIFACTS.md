# OpenUI specification artifacts: grammar vs. catalog

This note explains the difference between `spec/openui.schema.json` and root
`openui.json`. They are easy to confuse — both are JSON about OpenUI — but they
sit at **different levels of abstraction**.

For the authoritative input/context/output contract, see
[REQUIREMENTS.md](REQUIREMENTS.md) §1. This note is the explanatory companion; it
does not redefine the contract.

## TL;DR

- `spec/openui.schema.json` is the **grammar**: a JSON Schema that validates the
  *shape* of any OpenUI document.
- `openui.json` is a **document written in that grammar** whose *content* is the
  specification's object **catalog**.

`openui.json` is to `openui.schema.json` as an XML file is to its XSD, or a
`package.json` to its JSON Schema.

## `spec/openui.schema.json` — the grammar (meta-level)

A standard [JSON Schema](https://json-schema.org/) (draft 2020-12). It defines the
shape every OpenUI document must have, and nothing about content:

- the root object requires `version` + `id` + `type`; `id` must be the literal
  `"root"`;
- a recursive `element`: each node requires `id` + `type`, optionally `attrs` +
  `children`;
- `id` rules (camelCase `^[a-z][A-Za-z0-9]*$`), `type` rules (html enum |
  kebab-case | PascalCase), `attrs` as a `string | null` map, with
  `additionalProperties: false` everywhere.

It is **generic and content-blind**. It has no idea what `Charts`, `Dashboard`, or
`Application` are — it only knows that `"Charts"` is a syntactically legal
PascalCase `type`.

**Purpose:** validate that any OpenUI JSON is well-formed.

## `openui.json` — the spec catalog (an *instance* of the grammar)

A concrete document that **conforms to** `openui.schema.json`. Its *content* is the
authoritative catalog of the specification's scopes:
`Scopes → Application / Controls / Behaviors / Pages / Views / Containers /
Widgets → …`, each node carrying `attrs.scopeDocument` pointers into the prose
`spec/**` files.

**Purpose:** be the machine-readable vocabulary of *what objects the spec defines*,
and the trace links to their prose.

> `openui.json` is **generated** from the `spec/scopes/**` prose, which is the
> source of truth. It is canonical as the
> machine-readable form, but it is a derived artifact, not hand-authored.

## The relationship

```text
openui.schema.json   ← grammar / meta-schema (validates shape)
        ▲ validates
openui.json          ← the spec's catalog of available objects (vocabulary)
```

| | `openui.schema.json` | `openui.json` |
| --- | --- | --- |
| Kind | JSON **Schema** (grammar) | JSON **document** (instance) |
| Level | meta / type-level | content / catalog-level |
| Knows about | shapes, id/type/attrs rules | `Charts`, `Dashboard`, `Forms`… |
| Changes when | the *format* changes | the *spec's objects* change |
| Validates | every OpenUI doc, incl. `openui.json` | nothing (it is data) |

## Where `input.json` fits

A generator `input.json` (a concrete UI, e.g. a dashboard with three charts)
conforms to the **same grammar** as `openui.json`. The two are distinguished by
*role*, not by *shape*:

```text
openui.schema.json   ← grammar
        ▲ validates both
   ┌────┴─────┐
openui.json   input.json
(catalog of    (one concrete app
 what exists)   built from the catalog)
```

- `openui.json` = "here is the **vocabulary** of objects you may use" (the
  catalog).
- `input.json` = "here is the **app** I want, using that vocabulary."
- `openui.schema.json` = "here is the **syntax** both must obey."

The grammar alone cannot tell whether `input.json` uses a *real* object in a
*legal place* — that check is against the **catalog**, not the schema.
