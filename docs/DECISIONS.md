# Design decisions

A transient file for recording open and decided design decisions. do not reference it anywhere.

Open decisions for the OpenUI catalog and generator. Each records the question,
the options compared, and the current recommendation. Status stays **Open** until
chosen; once decided, fold the outcome into the relevant spec/doc and mark it
**Decided**.

Context: [REQUIREMENTS.md](REQUIREMENTS.md) §1–§2,
[SPEC_ARTIFACTS.md](SPEC_ARTIFACTS.md), and the serialization rule in
[spec/scopes/scope.md](../spec/scopes/scope.md).

DEC-2 (decided) gates DEC-1: a machine-readable per-object contract is the
precondition for per-object containment encoding (DEC-1 B/C/D), and the
`<scopeId>Instance` convention provides it — so DEC-1's richer options are on the
table. **DEC-3–DEC-7** are the decisions raised by the `scope*.md` →
`openui.json` conversion.

---

## DEC-1 — How the catalog encodes "legal place" (containment)

**Status:** Open. **Recommendation:** C, converging to D.

Given a parent type and a candidate child type, is that nesting allowed? The
options differ in granularity and where the rule lives.

> The dialog pilot authors the child model per-object (each leaf lists its own
> children), which takes the category-only option A off the table — the open
> choice is now **C vs. D**.

| Criterion                                   | A · Category     | B · Per-object | C · Hybrid                         | D · Slots/aggregations         |
| ------------------------------------------- | ---------------- | -------------- | ---------------------------------- | ------------------------------ |
| Rule keyed on                               | the 7 categories | each object    | category default + object override | named typed regions per object |
| Expressiveness                              | coarse           | object-precise | object-precise where needed        | per-region typing              |
| "Dialog _actions_ accepts only Button"      | ❌               | ❌             | ❌                                 | ✅                             |
| "Dashboard allows Chart but not Form"       | ❌               | ✅             | ✅                                 | ✅                             |
| Authoring cost / new object                 | ~none            | one rule each  | none unless special                | highest                        |
| DRY                                         | best             | worst          | good                               | moderate                       |
| Validator complexity                        | trivial          | trivial        | small                              | higher                         |
| Requires DEC-2 = Decided?                   | **No**           | **Yes**        | **Yes**                            | **Yes**                        |
| Fit with `<scopeId>Instance` + aggregations | weak             | ok             | ok                                 | **strongest**                  |

**Why C→D:** category defaults give near-zero-authoring coverage; per-object
overrides handle the few objects that need precision; promote objects whose
regions need distinct typing (Dialog, Grid, Tabs) to aggregation slots as the
contract work lands. Start coarse, tighten only where reality forces it.

---

## DEC-2 — Authority between catalog and prose for object contracts

**Status:** Decided 2026-06-28 — **Option 2 (prose-authoritative)**. Earlier
recommendation was 3→1; not taken.

Already settled by [spec/scopes/scope.md](../spec/scopes/scope.md): the catalog
**does** carry a machine-readable contract — each scope node is metadata-only and
a single `<scopeId>Instance` child holds the attributes (Uses/Produces/Behaves)
and typed child model. Open question: the prose `.scope.md` leaf template carries
the _same_ Attributes + Child-model sections, so **which is authoritative, and
what derives from what?**

| Criterion                                  | 1 · Catalog-authoritative     | 2 · Prose-authoritative     | 3 · Dual + cross-validated | 4 · Status quo |
| ------------------------------------------ | ----------------------------- | --------------------------- | -------------------------- | -------------- |
| SSOT for contract                          | `openui.json`                 | `.scope.md`                 | none (two copies)          | none           |
| Authoring                                  | edit JSON                     | write Markdown              | write both                 | uncoordinated  |
| Tooling needed                             | catalog→prose gen / validator | Markdown→JSON parser (hard) | consistency validator      | none           |
| Enables L2/L3 validation                   | ✅                            | ✅                          | ✅                         | ⚠️ unenforced  |
| DRY                                        | ✅                            | ✅                          | ❌ duplicated              | ❌             |
| Fit with instance-node convention          | **strongest**                 | weak (inverts it)           | medium                     | n/a            |
| Fit with "`openui.json` is canonical SSOT" | ✅                            | ❌                          | ⚠️                         | ⚠️             |
| Migration effort                           | medium                        | high                        | low–medium                 | none           |

**Decision:** The `scope*.md` files are the single source of truth. Their content
must be unique — use cross-referencing (the shared leaf template plus links)
rather than duplication. `openui.json` becomes a **generated artifact** built from
the `scope*.md` files; it is no longer hand-authored.

**Consequences:**

- A `scope*.md` → `openui.json` generator is required, and the leaf scope sections
  (Attributes, Child model, …) must be structured enough to parse
  deterministically. This is option 2's main cost; the "unique content +
  referencing" rule is what keeps the parse tractable.
- Statements that call `openui.json` _the_ source of truth must be reworded to
  "generated, canonical machine-readable form," with the prose as authoritative.
  Affects [README.md](../README.md), [REQUIREMENTS.md](REQUIREMENTS.md) §1, and the
  GENERATOR_STRUCTURE.md golden-source boundary.
- DEC-1 is unblocked: containment is authored in each leaf's _Child model_ section
  and serialized into `openui.json`.

> Note: [scope.md](../spec/scopes/scope.md) "the template is the source of truth
> for leaf structure" refers to the prose _section layout_, not contract
> authority — it does not pre-decide DEC-2.

---

## DEC-3 — Template shape: front-matter vs. EBNF-parsed prose

**Status:** Decided 2026-06-28 — **Option B (EBNF-parsed prose)**. Earlier
recommendation was C; not taken.

The leaf `template.scope.md` must parse deterministically into a scope node plus
its `<scopeId>Instance`. Where do the machine fields (instance `type`, child
`id` / `type` / multiplicity, `status`) live?

- **A** — YAML front-matter for machine fields; prose sections for humans only.
- **B** — Parse the prose sections themselves via the formal EBNF (todo 1.3).
- **C** — Hybrid: front-matter for the hard machine fields, plus a fixed
  micro-syntax inside section bodies (Attributes, Child model) that the EBNF
  covers.

**Decision:** No front-matter. The prose sections _are_ the formal structure,
parsed via the EBNF (todo 1.3); every machine field lives inside a section body
under a fixed, EBNF-governed micro-syntax.

**Consequences:**

- `template.scope.md` sections become formally structured, not free prose: each
  follows fixed line patterns the EBNF defines. Authors fill patterns rather than
  writing arbitrary sentences in machine-bearing sections.
- Every machine field needs a home in some section — including those with no
  section today: the instance **`type`** and the scope **`status`**. The template
  must add lines/sections for them (no front-matter to fall back on).
- Child-model and Attributes lines must encode their full machine content (child
  `id` / `type` / multiplicity; attribute key + category) in the fixed syntax.
- Parsing English is more fragile than front-matter, so the EBNF must constrain
  these sections tightly enough to be deterministic — that constraint is the work
  of todo task 1.1.

---

## DEC-4 — Attribute value-types and descriptions

**Status:** Decided 2026-06-28 — **Option A (prose-only)**.

Prose carries `[open]` _(boolean: whether shown)_ — richer than `openui.json`
`attrs`, which are `string | null` per the grammar. Where do value-type and
description go?

- **A** — Prose-only; the instance node keeps just the key (value `null` or a
  sample).
- **B** — Serialize type/description into the instance node, in a place the
  grammar allows (e.g. a parallel metadata structure).

**Decision:** Value-types and descriptions stay in the prose only. The generated
instance node carries just the attribute **key** by category (Uses `[name]`,
Produces `(name)`, Behaves `(name)`) with value `null` or a sample; the grammar
is untouched. Revisit B only if a target needs machine-readable attribute types.

---

## DEC-5 — Reference mechanism for unique content (DEC-2 rule)

**Status:** Decided 2026-06-28 — **Option A (Markdown links)**.

DEC-2 requires unique content via referencing. How does a leaf reuse shared
definitions, and how does the converter resolve them?

- **A** — Plain Markdown links to a shared section (human-resolved; converter
  ignores), e.g. the existing `[../scope.md]` category reference.
- **B** — An include/transclusion directive the converter expands.
- **C** — A shared definitions file the converter reads; leaves cite by key.

**Decision:** Leaves reference shared definitions with plain Markdown links (e.g.
`[../scope.md]`); the converter does not expand them — shared content stays
human-resolved and is never duplicated into each leaf. Add a keyed definitions
file (C) only if real duplication appears; avoid custom include syntax (B).

---

## DEC-6 — Parent-scope conversion and tree assembly

**Status:** Withdrawn 2026-06-28 — not a fork, just converter implementation
detail.

Default behavior the converter will simply implement (no decision needed): it
walks `spec/scopes/**`; a non-leaf `scope.md` → metadata-only scope node whose
children are its child scopes; root document fields are `id: "root"`,
`type: "html"`, and `version` from `SCHEMA_VERSION`; children are emitted in a
deterministic (lexical) order.

---

## DEC-7 — `openui.json`: committed vs. built on demand

**Status:** Decided 2026-06-28 — **Option A (committed + CI regen-and-diff)**.

Is the generated `openui.json` checked in or gitignored?

- **A** — Committed; CI regenerates and fails on diff (lockfile model). Matches the
  existing test that reads `openui.json`.
- **B** — Gitignored; built on demand by CI and consumers.

**Decision:** `openui.json` stays committed. CI regenerates it from the prose and
fails on any diff (lockfile model), keeping diffs reviewable, current tests
working, and drift a CI failure.
