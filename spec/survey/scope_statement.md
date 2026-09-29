# Scope statement proposal

This proposal writes the normative scope section of the OpenUI specification: its purpose,
its audience, what is in scope, what is out of scope and what is deferred to a later
edition. It answers W2 task 10 in the [v1 publish plan](specui_v1_publish_plan.md#w2-scope).

- **Where it applies:** a new `## Scope` section in [`spec/README.md`](../README.md#openui-specification),
  which replaces the one-line **Purpose** and the two paragraphs under the title
  ([decision 1](#decisions)). The W4 16 outline then places it in the introduction part.
- **Inputs:** the plan directives Q8, Q9 and Q13; the [glossary](../scopes/scope.md#glossary)
  and the [top-level scopes](../scopes/scope.md#top-level-scopes); the approved
  [terminology](../scopes/terminology.md#not-added) and
  [UI element taxonomy merge](ui_element_taxonomy_merge_proposal.done.md#not-added) records
  and their Not added and Delete lists; [`scope_change.notdone.md`](scope_change.notdone.md#out-of-v1);
  the four survey summaries ([Angular Material](angular-material/SUMMARY.md#findings),
  [HTML](html5/SUMMARY.md#findings), [OpenUI5](openui5/SUMMARY.md#findings),
  [Qt](qt/SUMMARY.md#findings)); and [`docs/REQUIREMENTS.md`](../../docs/REQUIREMENTS.md#1-specification).
- **Status:** proposal for review; nothing is applied. After approval, W2 task 11
  classifies every catalog object and every survey concept against it.
- **Already decided (not open here):** Q8 (the Angular generator stays in this repository),
  Q9 (host-shell presence, docking and multiple-document workspaces are out of v1 and
  deferred) and Q13 (the Accessibility and Composition top-level scopes are deferred).

## 1. Proposed scope section

The text below is the proposed section, as it would read in `spec/README.md`.

### Purpose

OpenUI is a technology-independent specification for describing the user interface of a
web application. It defines which UI objects exist, what each one means, how they are
grouped, and the document format that describes a concrete UI with them. It defines
_what_ a compliant implementation provides, never _how_ it is built.

### Audience

- Application developers, who describe a UI with it.
- Designers and UX owners, who review a UI in its words.
- Framework maintainers, who map their components to it.
- Generator and tooling authors, who read, check or transform OpenUI documents.

All four use the same public contract.

### In scope

| #   | Part                         | What it covers                                                                                                                                                                                                                                                                                                                |
| --- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I1  | Vocabulary                   | The [glossary](../scopes/scope.md#glossary): one definition for each term, with its generic aliases.                                                                                                                                                                                                                          |
| I2  | Catalog of UI objects        | The eleven [top-level scopes](../scopes/scope.md#top-level-scopes) and their 50 leaf scopes, each with its contract. Seven hold objects (Application, Controls, Behaviors, Pages, Views, Containers, Widgets); four hold notions (Layout, Presentation, Internationalization, Interaction). Every catalog object is in scope. |
| I3  | Categorization               | The three [taxonomy documents](../scopes/scope.md#taxonomy-documents): the generic UI taxonomy, the UI element taxonomy and the taxonomy mapping.                                                                                                                                                                             |
| I4  | Document format              | The grammar (`EBNF.txt`), its JSON Schema projection and the generated catalog `openui.json`, including element references. The W5 language work for v1 is in scope too: typed attribute values, data-binding references, event payloads, i18n string references and the versioning policy.                                   |
| I5  | Accessibility of each object | The Accessibility section of every leaf contract. Accessibility is a property of every element, so it is in scope as part of each object (Q13).                                                                                                                                                                               |
| I6  | Evidence                     | The [evidence register](../scopes/evidence.md#scope-evidence-register), which traces each leaf scope to the surveyed sources.                                                                                                                                                                                                 |
| I7  | Examples                     | One worked example per scope in [`spec/examples/`](../examples/README.md). They are informative.                                                                                                                                                                                                                              |

### Out of scope

These are not UI description and will not be part of any edition.

| #   | Out of scope                                   | Examples                                                                                                   | Why                                                                                                                   | Evidence                                                                                                                                                            |
| --- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| O1  | How an implementation builds or renders the UI | Rendering technology, framework code, selectors, directives, generated identifiers                         | The spec defines what, not how.                                                                                       | [`docs/REQUIREMENTS.md`](../../docs/REQUIREMENTS.md#1-specification); [`spec/README.md`: types](../README.md#types---type-field)                                    |
| O2  | Generators and target-framework mappings       | The Angular generator and its feature mapping                                                              | They consume the spec; they are not part of it. The Angular generator stays in this repository (Q8).                  | [Plan W4 18](specui_v1_publish_plan.md#w4-specification-structure); [`GENERATION.md`](../../generators/angular/generator/docs/GENERATION.md#golden-source-boundary) |
| O3  | Browser and framework machinery                | HTML parsing, scheduling, storage, workers and communication; OpenUI5 infrastructure and tooling classes   | Implementation dependencies, not UI objects.                                                                          | [HTML architecture proposal](html5/architecture_proposal.md#recommendation); [OpenUI5 leftover review](openui5/opens.md#o3-261-unclustered-classes)                 |
| O4  | Platform prompts and services                  | Biometric prompt, permission request, speech entry                                                         | The browser or the operating system shows them, not the application.                                                  | [Terminology D1](../scopes/terminology.md#3-delete); [Merge: Not added](ui_element_taxonomy_merge_proposal.done.md#not-added)                                       |
| O5  | Implementation techniques                      | Rendering content outside its place in the tree (portal), rendering only the visible rows (virtualization) | They change how a UI is drawn, not what it is.                                                                        | [Merge D1, D2](ui_element_taxonomy_merge_proposal.done.md#3-delete)                                                                                                 |
| O6  | Document data that is not UI                   | Document metadata and resource declarations beyond `index.html` and `favicon.ico`; microdata               | Data about the document, not UI. Its visible parts are already in `Application/index_html` and `Application/favicon`. | [Terminology: Not added](../scopes/terminology.md#not-added) (A68, HTML P2)                                                                                         |

### Deferred to later editions

These are UI concerns that v1 leaves out. A later edition may add them, each through a new
approved proposal.

| #   | Deferred                                                               | Examples                                                                                                                    | Why                                                                                                    | Evidence                                                                                                              |
| --- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| F1  | Host-shell presence, docking and multiple-document workspaces          | Notification-area icon; Main window, Dockable panel and Multiple-document workspace (terminology A41–A43)                   | Decided: out of v1, deferred (Q9).                                                                     | [Plan W2 10](specui_v1_publish_plan.md#w2-scope); [`scope_change.notdone.md`](scope_change.notdone.md#out-of-v1)      |
| F2  | The Accessibility and Composition top-level scopes                     | HTML P6 and P7                                                                                                              | Decided: deferred (Q13). Accessibility stays in scope as a property of each object (I5).               | [Plan W2 10](specui_v1_publish_plan.md#w2-scope); [HTML scopes proposal](html5/scopes_proposal.md#proposed-additions) |
| F3  | Ruby annotation                                                        | HTML `ruby`, `rt`, `rp`                                                                                                     | Left out at this stage (2026-09-27): lower priority, and no surveyed framework offers it as a control. | [Terminology: Not added](../scopes/terminology.md#not-added)                                                          |
| F4  | UI patterns that no surveyed standard or framework offers as a control | Transfer selection, duration selection, index navigation, preview, immersive views, query builder, saved query, walkthrough | No evidence in the four surveyed sources yet; they need evidence first.                                | [Merge: Not added](ui_element_taxonomy_merge_proposal.done.md#not-added)                                              |

## 2. Where each survey concept goes

W2 task 11 classifies each catalog object and each survey concept one by one. This section
only states the rule it will use, so that the task can follow the approved scope:

- A catalog object (a top-level scope or a leaf scope) is in scope (I2). None is out.
- A survey concept that maps to a taxonomy entry, an approved term or a catalog object is
  in scope.
- A survey concept listed in an approved Delete or Not added row is out of scope (O1–O6)
  or deferred (F1–F4), as the row's reason says.
- Any other survey concept goes to the owner as an open item; it is not guessed.

## Decisions

For the project owner to approve:

| #   | Decision                           | Proposal                                                                                                                                                                                                                                     |
| --- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Where the scope section lives      | A `## Scope` section in `spec/README.md`, right after the title. It replaces the one-line Purpose and the two paragraphs under the title, so the purpose and audience are stated once. The W4 16 outline places it in the introduction part. |
| 2   | Purpose                            | The Purpose text of section 1.                                                                                                                                                                                                               |
| 3   | Audience                           | The four groups already named in `spec/README.md`: application developers, designers and UX owners, framework maintainers, generator and tooling authors.                                                                                    |
| 4   | In scope                           | I1–I7. In particular: the W5 language work is v1 scope (I4); examples are informative (I7); generators are not part of the spec (O2).                                                                                                        |
| 5   | Out of scope versus deferred       | Out of scope: not UI description, never part of an edition. Deferred: a UI concern that v1 leaves out and a later edition may add.                                                                                                           |
| 6   | Out-of-scope list                  | O1–O6. Browser machinery (O3) is out of scope, although the HTML survey calls it "deferred or external": it is an implementation dependency, not a UI concern.                                                                               |
| 7   | Deferred list, beyond Q9 and Q13   | F3 Ruby annotation and F4 the UI patterns without survey evidence are deferred, not out of scope.                                                                                                                                            |
| 8   | Classification rule for W2 task 11 | The rule of section 2.                                                                                                                                                                                                                       |

Not decisions: F1 (Q9), F2 (Q13) and the place of the generator (Q8) are already decided.
