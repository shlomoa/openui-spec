# Terminology proposal: Standalone / Host-bound

**Status: approved (2026-09-23).** The two term definitions below are
adopted as-is. Decided prose-only, not a formal `template.scope.md`
Identity field (see "Open question — resolved" below). The
ready-to-paste `spec/README.md` glossary diff is held for now, not
applied yet — next step is yours to say when.

A proposal, not yet applied anywhere. It came out of Phase B's B6/B7 work
(clustering the OpenUI5 survey's leftover objects), specifically the flag
that 6 of 11 new clusters landed under Widgets — the largest existing
category got larger. Investigating *why* found a real, recurring
distinction the taxonomy doesn't currently name: some widgets are usable on
their own, and some are only ever meaningful attached to another widget.
This document proposes two terms for that distinction, checks them against
independent UI toolkits (not just the libraries this survey covers), shows
them applied to the actual B6 clusters, and stages the exact glossary text
for `spec/README.md` — without touching that file, pending review.

## The terms

**Standalone** — a UI object that is meaningful and usable on its own,
without requiring a reference to an existing object of another type. Most
OpenUI objects are standalone (List, Table, Dialog, Chart, and — per B6 —
Cards, File upload, Tile, Scheduling/Planning calendar).

**Host-bound** — a UI object that only has meaning when associated with an
existing object of another type; it does not display or operate
independently. The term only claims that a host reference exists — not
what kind. That was a deliberate correction mid-discussion: an earlier
draft tried "Dependent," which invites exactly the wrong question ("dependent
how?") without answering it. Host-bound is a claim about *whether* a
reference is required, nothing more.

**What kind of reference** — recorded in the host-bound object's own
Purpose text, not in a new formal category, using one of three relationship
words:

- **targets** — a reference with no more specific relationship implied.
- **controls** — the object adjusts the host's state or structure (a
  Personalization panel controls which columns a Table shows).
- **supplies** — the object provides a value, or candidate values, to the
  host (Value help supplies a value to a Field).

Three is deliberately small. The goal is a shared, recognizable word for
the common cases, not a taxonomy of every possible relationship — that
would repeat the "Dependent" mistake at one level down.

## Why these hold up outside this survey

The concept — an object that references and acts on another object it
doesn't own or contain — recurs across toolkits with no shared lineage,
which is the actual bar for "a term usable by Qt, Angular Material, React,
OpenUI5, etc.," not whether any one framework's specific API matches:

- **Qt** — `QLabel::setBuddy()`: a label references the control it labels
  without containing it. Signal/slot connections between unrelated objects
  are the general mechanism.
- **Angular Material** — `matAutocomplete` is attached to an `<input>` by
  reference (`[matAutocomplete]`), not containment; the autocomplete panel
  supplies values to the input.
- **React** — controlled-component patterns and callback props: a
  configuration/selection component reads and writes another component's
  state via a reference, not a DOM/tree relationship.
- **OpenUI5** — association properties (e.g. a control referencing another
  control by id, distinct from `aggregation` which is containment).
- **WAI-ARIA** — `aria-controls` ("identifies the element whose contents or
  presence are controlled by the current element") is the closest existing
  standard name for the `controls` relationship word above.
- **HTML Living Standard** — the Popover API's `popovertarget` and the
  Invoker Commands API's `command`/`commandfor` are the native mechanism
  for "this control shows/hides/toggles that other element by reference";
  `<input list>` → `<datalist>` is a small built-in precedent for
  `supplies` specifically.

None of these are the vocabulary itself — Qt has no `aria-controls`, HTML
has no `QLabel::setBuddy()` — they're independent evidence the same
relationship keeps getting invented, which is why it's worth one shared
name rather than five toolkit-specific ones.

## Applied to the B6 clusters

| Cluster | Tag | Relationship word (if host-bound) |
|---|---|---|
| Cards | Standalone | — |
| Shell bar / App shell | Standalone | — |
| File upload | Standalone | — |
| Tile | Standalone | — |
| Semantic / Object page | Standalone | — |
| Flexible column layout | Standalone | — |
| Scheduling / Planning calendar | Standalone | — |
| Filter bar | **Host-bound** | controls (a Table/Chart/List's visible data) |
| Personalization (P13n) panels | **Host-bound** | controls (a Table/Chart's columns, sort, filter, group) |
| Value help | **Host-bound** | supplies (a value to a Field) |
| Metadata-driven field | n/a | not a host relationship — reconsidered in B7 as an alias of Controls/Text inputs, not its own object |

3 of 11 clusters are host-bound. That's a real, small minority — consistent
with the original flag being about Widgets' overall size, not about most of
its new entries being this kind of thing.

## Open question — resolved

**Resolved: prose-only.** Should Standalone/Host-bound be a *formal* field (a fourth key on
`template.scope.md`'s Identity bullet, alongside `id`/`type`/`status`), or
stay prose-only in each object's Purpose? A formal field is machine-bearing
— it touches the leaf template, and whatever converts scope files into the
catalog. Prose-only costs nothing to adopt. I'd default to prose-only
unless there's a concrete reason the catalog needs to query this
programmatically (e.g. a generator wanting to render host-bound objects
differently) — that's a decision for whoever owns the converter, not
something to assume here.

## Where this is meant to land

This file: a working proposal in `spec/survey/openui5/`, alongside
`B6_CLUSTERS.md` and `B7_HIERARCHY_CHECK.md` — it documents the reasoning
and stays here whether or not it's adopted.

If adopted, the canonical home is `spec/README.md`'s glossary — every leaf
`scope.md` already points there for shared vocabulary by convention
("link here instead of redefining"). Below is the exact text, formatted to
match the existing glossary entries, ready to paste — **not applied to
`spec/README.md` by this document**.

---

### Ready-to-paste glossary entries (for `spec/README.md`)

Insert alphabetically into "Core specification terms": `Host-bound` between
`Grammar` and `Known object type`; `Standalone` between `Scope` and `View`.

```
#### Host-bound

**Aliases:** dependent object, attached object, companion widget.

A host-bound object is a UI object that only has meaning when associated
with an existing object of another type — it does not display or operate
independently. The relationship is not encoded in this term alone: each
host-bound object's Purpose states which type of object it targets and how,
typically using one of a small set of relationship words — targets (a
general, unspecified reference), controls (the host-bound object adjusts
the host's state or structure), or supplies (the host-bound object provides
a value or candidate values to the host). Host-bound is the counterpart to
Standalone, not a measure of structural complexity: a host-bound object can
be as simple as a single control or as elaborate as a multi-part panel.
```

```
#### Standalone

**Aliases:** independent object, self-contained object, freestanding
widget.

A standalone object is a UI object that is meaningful and usable on its
own, without requiring a reference to an existing object of another type.
Most OpenUI objects are standalone. Standalone is the counterpart to
Host-bound; the distinction concerns whether an object requires a host to
be meaningful, not how visually or structurally complex the object is.
```

Optional addition to "External references used for vocabulary alignment"
(same section that already cites WAI-ARIA Authoring Practices patterns for
Button/Table/Dialog/etc.):

```
- [WAI-ARIA `aria-controls`](https://www.w3.org/TR/wai-aria-1.2/#aria-controls)
- [HTML Living Standard: Popover attributes](https://html.spec.whatwg.org/multipage/popover.html)
```

## Next

Resolved: (1) terms approved as written; (2) prose-only, no formal Identity
field; (3) the `spec/README.md` glossary diff is held — not applied by
this document. When you're ready to land it, the exact text is above under
"Ready-to-paste glossary entries", unchanged from the original proposal.
None of this blocked B8 — it was always independent of grouping the
matched records, and Phase B/C are complete regardless.
