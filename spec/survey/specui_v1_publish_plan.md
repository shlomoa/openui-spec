# openui-spec v1 — Publish first edition: plan

## Goal and definition of done

Publish openui-spec **v1.0.0** as the first stable edition: one vocabulary, one categorization, one document structure and one UI-description language that downstream work (angular-django2, django-angular3) can build on without expecting breaking churn.

*Directive (Q3, decided):* release as `0.x.0` / `0.x.y` versions until the spec is validated in downstream tools and packages; no release candidate before then. Every `1.0.0-rc.1` and `1.0.0` target in this plan waits on that validation.

The edition is done when all of these hold:

1. **Terminology** — every normative term is defined once in the glossary, with a cross-framework alias table (HTML/ARIA, openui5, Qt, Angular Material). No other doc redefines a term.
2. **Scope** — a normative in-scope / out-of-scope statement exists and every catalog object falls inside it.
3. **Categorization** — one taxonomy, specified by three spec documents with one owner for each fact: the generic UI taxonomy (sections, subcategories and entries), the UI element taxonomy (abstract element types and the classification rules) and the taxonomy mapping (the link from each entry to its scope object). The taxonomy and the scope tree are linked views of one vocabulary.
4. **Structure** — the spec document is split into numbered normative and informative parts. Generator-specific content moves out of the spec.
5. **Language** — the UI-description grammar (EBNF + JSON Schema) is frozen at 1.0, including binding, event and data-reference rules.
6. **Survey traceability** — every leaf scope cites the survey rows that justify it (evidence register).
7. **Utilities** — Python and TypeScript packages parse, model and validate v1.0 documents with identical results on a shared conformance suite.
8. **Validation** — CI runs format, lint, spec-content lint and conformance tests on Linux and Windows.
9. **Visibility** — a published web page shows the v1.0 spec: taxonomy browser, per-object pages and live rendered examples.

## Current state (2026-09-29, v0.4.0)

Re-checked on 2026-09-29, after execution step 3 and the `0.4.0` release (milestones M1 and M2). Earlier snapshots: `main` at `1c90f5c` (2026-09-26) and `b97f3f8` (2026-09-23).

| Area | What exists | Gap for v1.0 |
| --- | --- | --- |
| Survey | `spec/survey/` with 4 sources: `angular-material/`, `html5/` (WHATWG HTML), `openui5/`, `qt/`. The consolidated change files are applied and named `*.done.md`; content not yet applied is in `*.notdone.md`. `spec/survey/` is excluded from pre-commit, markdownlint and mkdocs | Each `*.notdone.md` item is assigned to a task (W1 9.13; W6 25) or is out of v1 by Q9 |
| Terminology | Glossary in [`spec/scopes/scope.md`](../scopes/scope.md#glossary); the approved decisions in [`terminology.md`](../scopes/terminology.md#summary) are applied and verified (2026-09-29), except A41–A43, which are out of v1 (Q9) | No alias table across the 4 sources (W1 9.9) |
| Scope | One-line purpose in `spec/README.md` | No explicit in / out list (W2). Decided: host-shell presence, docking and multiple-document workspaces are out of v1 (Q9); the Accessibility and Composition top-level scopes are deferred (Q13). The surveys also defer browser internals, storage and workers |
| Categorization | 11 top-level scopes. The taxonomy is specified by three spec documents, with one owner for each fact ([Taxonomy documents](../scopes/scope.md#taxonomy-documents)): `spec/taxonomy/generic-ui-taxonomy.md` (with its generated HTML and an image for every entry with a visual form), `spec/taxonomy/ui-element-taxonomy.md` (237 abstract types, each with its OpenUI term) and [`spec/scopes/taxonomy_mapping.md`](../scopes/taxonomy_mapping.md#taxonomy-mapping). Nine sections plus Behaviors and 21 subcategories, with classification rules; a test keeps the generic taxonomy and the mapping equal | Give each leaf scope one primary category (W3 14.12); rename or move scope folders (W3 15) |
| Structure | `spec/README.md` mixes glossary pointer, artifact roles, format, grammar, incremental generation | No normative / informative split; generator content inside the spec (the generator itself stays in this repository, Q8) |
| Language | `EBNF.txt` declared authoritative; JSON Schema is a projection; `spec/bin/check_grammar_consistency` enforces EBNF ↔ schema ↔ README ↔ catalog in pre-commit. Same-document element references (quoted ids in Uses attrs); behaviors reference their controlled element with `[target]` | Still `string \| null` values and `[x]` / `(x)` keys; no data-binding, event-payload or i18n rules |
| Catalog | 50 leaf `*.scope.md` files, including the new `Behaviors/input_assistance`, `viewport_and_focus_control` and `modal_overlay`; every leaf has an evidence row; `spec/openui.json` regenerated | Four approved terms missing from their Purposes (W1 9.13); many leaves still have no Attributes or Child model (W6 25); examples not yet generated for the new additions (W1 9.10–9.12) |
| Utilities | Python: `openui_spec`, `compare_openui_spec`, TatSu parser, and the `spec/bin` tools `to_json`, `check_grammar_consistency`, `lint_spec`, `check_links`, `render_taxonomy_html`. TS: `OpenUiJson`, `ng-openui-spec` CLI (ajv) | No shared conformance suite; no object model beyond the JSON tree |
| Validation | pre-commit (prettier, markdownlint, ruff, yamllint, check-json, grammar / catalog consistency, spec-content lint with all three rules, internal link check, taxonomy HTML check); unittest; npm tests; CI on Ubuntu + Windows | No conformance tests (W8) |
| Visibility | `generated-examples` Angular app with screenshots; Read the Docs via mkdocs | No single published page for the spec itself |

## Workstreams

Ten workstreams in three layers: consolidate the foundations (W1–W5), write the spec (W6), then document, tool and validate it (W7–W9).

| # | Workstream | Question it answers | Main deliverable |
| --- | --- | --- | --- |
| W0 | [x] Survey consolidation | What do HTML, openui5, Qt and Angular Material call and group each UI artifact, and which proposed scopes are accepted? | Approved change files in `spec/survey/` (terminology, category, taxonomy mapping, scope, architecture, structure, schema) |
| W1 | [ ] Terminology | Which word does OpenUI use, and what does it mean? | Glossary v1 + cross-framework alias table |
| W2 | [ ] Scope | What is the spec, what is in, what is out? | Normative scope statement (in / out / deferred) |
| W3 | [ ] UI categorization | What is the single most natural way to group UI artifacts? | One taxonomy in three spec documents (generic UI taxonomy, UI element taxonomy, taxonomy mapping), one owner for each fact |
| W4 | [ ] Specification structure | How is the spec document organized? | Numbered outline with normative/informative parts; file layout |
| W5 | [ ] UI description language | How does an author describe a UI? | Grammar v1.0 (EBNF + JSON Schema), binding/event/i18n rules, versioning policy |
| W6 | [ ] Draft first spec | — | v1.0.0-rc.1 spec text + regenerated catalog (*directive, Q3:* released as `0.x.0` until downstream validation) |
| W7 | [ ] Documentation | — | Updated README, REQUIREMENTS, CONTRIBUTING, AGENTS/CLAUDE, CHANGELOG, Read the Docs site |
| W8 | [ ] Spec utilities | Can tools parse, model and validate v1.0? | Python + TS parse/model/validate APIs passing one conformance suite |
| W9 | [x] Validation | Is every change checked the same way everywhere? | Format + lint + spec-content lint + tests in CI on Linux and Windows |

```mermaid
flowchart LR
  W0[W0 Survey] --> W1[W1 Terminology]
  W0 --> W2[W2 Scope]
  W0 --> W3[W3 Categorization]
  W1 --> W2
  W1 --> W3
  W3 -- "9.9, 9.10, 9.13" --> W1
  W2 -- "14.12, 15" --> W3
  W3 -- "16" --> W4[W4 Structure]
  W1 --> W5[W5 Language]
  W8 -- "32 fixtures, for 23" --> W5
  W4 -- "24" --> W6[W6 Draft spec]
  W1 -- "25" --> W6
  W5 --> W6
  W6 --> W7[W7 Docs]
  W5 --> W8[W8 Utilities]
  W6 -- "35" --> W8
  W8 --> W7
  W9[W9 Validation, done]
```

W9 is done: it ran first, and its checks now run on every change. An arrow without a label holds for the whole workstream; a labelled arrow holds only for the named tasks of the workstream it points to:

- W1 waits on W3 for 9.9, 9.10 and 9.13, which use the merged taxonomy (W3 14.1–14.5, 14.9, 14.13).
- W3 waits on W2 only for 14.12 and 15 (14.12 needs W2 11).
- W4 waits on W3 only for 16; 17 needs 16, and 18 needs nothing.
- W5 waits on W8 for 23, which is validated against the fixtures of 32; the fixture structure of 32 needs nothing.
- W6 waits on W4 only for 24, and on W1 for 25 (the alias table, 9.9); 25 and 26 also need W5.
- W8 waits on W6 only for 35 (the joint release); the finished suite of 32, and 33–34, need W5 23.
- W7 waits on W8 because task 31 notifies downstream after W8 task 35.

## Tasks

Each task ends with a validation step and a visual demo, per the project rules. One task = one GitHub issue = one PR, approved step by step.

### W9 Validation (first, runs throughout)

1. [x] Consolidate validation infrastructure.
   - 1.1 [x] Create a `spec/bin` folder.
   - 1.2 [x] Move `spec/to_json` into `spec/bin`.
   - 1.3 [x] Move tooling tools into `spec/bin`; create a tool for each tool in tooling just like `to_json`. Result: `spec/bin/check_grammar_consistency/`; the guides `editing.md` and `comparison.md` stay in `spec/tooling/`.
   - 1.4 [x] Update code, tests, and documents.
2. [x] Add a spec-content linter (`spec/bin/lint_spec.py`) wired into pre-commit; implement its framework first, then enable terminology-dependent rules after W1 task 7. *Validate:* unit tests with passing and failing fixtures. *Demo:* HTML lint report page (`--html`).
   - 2.1 [x] every leaf `*.scope.md` has the `template.scope.md` sections, in order; a leaf may omit only the sections the template marks "Omit the whole section" (`template-sections`).
   - 2.2 [x] every leaf has exactly one row in `evidence.md` (`evidence-row`).
   - 2.3 [x] glossary terms are defined once in `spec/scopes/scope.md#glossary`, and no other spec document (outside `spec/survey/`) redefines one in glossary form (`glossary-single-definition`).
   - 2.4 [x] `openui.json` is up to date with the prose; enforced by `check_grammar_consistency`.
   - 2.5 [x] Linter framework, run by the `openui-spec-lint` pre-commit hook, with the `--html` report and unit tests.
3. [x] Check links and file references in the documentation. *Validate:* zero broken internal links.
   - 3.1 [x] Add a Markdown link checker to pre-commit (`spec/bin/check_links.py`).
   - 3.2 [x] Remove the plain-text references in `AGENTS.md` to `docs/TEST_PLAN.md` and `generators/angular/generator/docs/TDD.md`, which do not exist; the link checker checks links only, so it cannot catch them (execution order step 1).

   Implemented in [PR #159](https://github.com/shlomoa/openui-spec/pull/159) and, for 3.2, [PR #160](https://github.com/shlomoa/openui-spec/pull/160): tools run as `python -m spec.bin.<tool>`; the link checker fixed 9 broken internal links.

### W0 Survey consolidation

*Directive:* the four surveyed sources are Angular Material, HTML (the WHATWG Living Standard, `spec/survey/html5/`), OpenUI5 and Qt Widgets. The survey results live in `spec/survey/` (on `main` since commit 215f2e7), and so do this plan and the consolidated change records. A change record moves next to the spec once it is applied, as [`terminology.md`](../scopes/terminology.md#summary) did.

4. [x] Choose a directory structure and content for all surveys.
   References in markdown files must point to an existing file in inventory folder (once created and content moved) and section.

   - 4.1 [x] inventory: a folder to include all the surveyed data
     - 4.1.1 [x] Move all surveyed data files into this folder
   - 4.2 [x] taxonomy_mapping.md: content with references
   - 4.3 [x] category.md: content with references
   - 4.4 [x] README.md: summary and TOC
   - 4.5 [x] PLAN.md: The plan executed
   - 4.6 [x] SUMMARY.md a summary of the survey, the steps, findings, decisions, reasoning, etc.
   - 4.7 [x] architecture_proposal.md: contains a change proposal for the entire solution or part of it \[optional\]
   - 4.8 [x] scopes_proposal.md: scopes tree architectural and content change \[optional\]
   - 4.9 [x] openui_schema_proposal.md: proposal for schema change \[optional\]
   - 4.10 [x] opens.md: open and unresolved questions / issues / directions with references \[optional\]

   Applies to all four surveys (`angular-material/`, `html5/`, `openui5/`, `qt/`). Each survey's original data moved unchanged into its `inventory/` folder, with relative links rewritten; `html5/inventory/inventory/` keeps the chapter files. `openui5/` has no `openui_schema_proposal.md` because that survey proposes no schema change. A `scopes` folder for a consolidated specification was dropped (decided 2026-09-27): the consolidated outputs live in `spec/survey/`, and applying them is W1 and W3 work.

   **Consolidated proposals (2026-09-27):** [`terminology.md`](../scopes/terminology.md#summary) (all decisions approved), [`schema_change.md`](schema_change.done.md#schema-change-proposal) (not needed) and [`structure_change.md`](structure_change.done.md#add) (two new Behaviors scopes). [`category.md`](category.done.md#summary) (2026-09-27) consolidates the four survey `category.md` files and is approved in full. [`taxonomy_mapping_change.md`](taxonomy_mapping_change.done.md#summary) (2026-09-27) consolidates the four survey `taxonomy_mapping.md` files and is approved in full. [`architecture_change.md`](architecture_change.done.md#summary) (2026-09-27) consolidates the four `architecture_proposal.md` files and is approved in full.

5. [x] Decide whether to build a cross-source matrix (`matrix.csv`: concept × HTML, WAI-ARIA, openui5, Qt, Angular Material). Decided 2026-09-27: not built. Its name, category and scope columns would repeat the approved [`terminology.md`](../scopes/terminology.md#summary), [`category.md`](category.done.md#summary) and [`taxonomy_mapping_change.md`](taxonomy_mapping_change.done.md#summary); the per-framework names come from the four survey mappings in the alias table (W1 task 9.9); properties and events are read from the survey inventories in W6 task 25.
6. [x] Reconcile the scope-extension proposals (Angular Material `proposed-scopes/`, Qt P01–P06, HTML P1–P8) into one accept / defer / reject list, de-duplicating overlaps such as `modal_interaction` and `collapsible`. *Demo:* the tables of [`structure_change.md`](structure_change.done.md#add) and [`scope_change.md`](scope_change.done.md#summary).
   - 6.1 [x] Decide which proposed scopes enter v1.0 (2026-09-27, 2026-09-29): `Behaviors/input_assistance`, `Behaviors/viewport_and_focus_control` and `Behaviors/modal_overlay`. Applied in W1 tasks 9.4 and 9.5.

   Three new scopes are accepted: two in [`structure_change.md`](structure_change.done.md#add) and `Behaviors/modal_overlay` (task 6.1); every other proposed scope was remapped to an existing scope or dropped, as recorded in [`terminology.md`](../scopes/terminology.md#49-terms-that-need-a-new-scope). The changes the surveys ask for in existing scopes are in [`scope_change.md`](scope_change.done.md#summary) (approved).

### W1 Terminology

7. [x] Create a separate local terminology / vocabulary / glossary section in `scope.md` files for terms local to the current scope level:
   - 7.1 [x] Move all terminology / glossary / vocabulary definitions from `spec/README.md`, `spec/scopes/evidence.md`, `spec/scopes/taxonomy_mapping.md`, and `spec/scopes/template.scope.md` into `spec/scopes/scope.md`.
   - 7.2 [x] Add appropriate references from the former locations to the moved content.

   Implemented in [PR #161](https://github.com/shlomoa/openui-spec/pull/161): the glossary is in [`spec/scopes/scope.md`](../scopes/scope.md#glossary), and the former locations link to it.
8. [ ] Pick the canonical-term rule (e.g. W3C/ARIA name first, then majority across frameworks) and record it as a decision.
   - 8.1 [x] Collect all the terms from existing scopes and surveyed UI frameworks.
   - 8.2 [x] Create a canonical list of terms.
   - 8.3 [ ] Add an alias table (canonical term → openui5 / Qt / Angular Material / ARIA names). Built in task 9.9, with the final names. *Directive (2026-09-29):* the alias table is not a separate document; it is four columns of `spec/scopes/taxonomy_mapping.md` (HTML / WAI-ARIA, OpenUI5, Qt, Angular Material), one row per taxonomy entry.
   - 8.4 [x] Catalog any conflict / duplicate / wrong aliased term.
   - 8.5 [x] Decide the canonical-term rule (2026-09-27) and apply it: keep the existing OpenUI term; otherwise the HTML or WAI-ARIA name; otherwise the name most surveyed frameworks share; otherwise a neutral descriptive name. Applied in the glossary and the taxonomy mapping (W1 9.1–9.3).

   The canonical-term rule and every term decision are in [`terminology.md`](../scopes/terminology.md#appendix-a-canonical-term-rule) (approved).
9. [ ] Review and resolve conflicts in terminology, then apply the result. The review is [`terminology.md`](../scopes/terminology.md#summary) (approved in full, including the terms not added).

   Apply the approved terminology. These are specification changes, so they follow [`RELEASING.md`](../../RELEASING.md#schema-and-catalog-version-changes). Do task 7 first, so the glossary changes land in their final location.
   - 9.1 [x] Glossary: add A1–A5 (Owner, Controlled element, Controlling element, Trigger, Window); apply C6 (move "component" and "UI component" from the Widget aliases to the Object aliases) and D2 (remove "widget instance" from the Element aliases); add the conflicting-meaning notes for Page, Control, Element and Grid ([appendix A](../scopes/terminology.md#appendix-a-canonical-term-rule)). Owner, Controlled element and Controlling element replace the proposed Standalone entry, which is not added.
   - 9.2 [x] Taxonomy mapping: apply C1–C5, R1–R11 and D1 in `spec/scopes/taxonomy_mapping.md`, and add A6–A76 with their scope and abstraction level. Apply [`taxonomy_mapping_change.md`](taxonomy_mapping_change.done.md#summary) in the same pass.
   - 9.3 [x] Generic taxonomy: make the same renames and additions in `spec/generic-ui-taxonomy.md`, which the taxonomy mapping is based on. Its HTML rendering, `spec/generic-ui-taxonomy.html`, is generated from it for ease of use (`python -m spec.bin.render_taxonomy_html`; a pre-commit check keeps it up to date).
   - 9.4 [x] New scopes: create `Behaviors/input_assistance.scope.md` and `Behaviors/viewport_and_focus_control.scope.md` from `template.scope.md`, list them in `Behaviors/scope.md`, and add one row each to `spec/scopes/evidence.md`.
   - 9.5 [x] Decide whether Modal overlay, moved to Behaviors by C4, needs its own scope file or is covered by an existing leaf. Decided 2026-09-29: its own scope, `Behaviors/modal_overlay`, with Modal interaction as its alias.
   - 9.6 [x] Scope contracts: apply [`scope_change.md`](scope_change.done.md#summary) in the same pass: the Purpose texts, the behavior target references and the Validation notes rules. Apply [`architecture_change.md`](architecture_change.done.md#summary) with it: the Behaviors folder description, the Boundaries rules of the folder scopes and the tree rules in `spec/scopes/scope.md`.
   - 9.7 [x] Bump `SCHEMA_VERSION` and the package versions to the next `0.x.0` (directive Q3), regenerate `spec/openui.json` and the fixtures with the new version, and update `CHANGELOG.md`. `spec/openui.json` and the generator fixtures already follow each scope change, because pre-commit and the tests enforce it. The examples are tasks 9.10–9.12. Released as `0.4.0` (2026-09-29).
   - 9.8 [ ] Validate: pre-commit, unit tests, `mkdocs build --strict` and the npm tests.
   - 9.9 [ ] Build the alias table (task 8.3) from the survey `taxonomy_mapping.md` files, using the final names: add the HTML / WAI-ARIA, OpenUI5, Qt and Angular Material columns to `spec/scopes/taxonomy_mapping.md` and fill them for every entry ("—" where a source has no name). The names sit on the entry's own row, so they need no term-existence check; extend `tests/test_taxonomy_mapping.py` to check that every row has the four columns. *Directive (2026-09-29):* move only framework-specific names (OpenUI5, Qt, Angular Material) out of the glossary Aliases lines into these columns. HTML, WAI-ARIA and CSS names are standard names, not framework names, and stay as glossary aliases (for example "CSS grid", "ARIA grid", "HTML table" and "`aria-controls` target"). Move the HTML and WAI-ARIA names still in mapping notes (for example HTML `output` and `menuitem`) into the HTML / WAI-ARIA column. A framework name spelled like an OpenUI term but meaning something else is not an alias; it stays in the glossary (task 14.9).
   - 9.10 [ ] Generate the examples for every new addition with the [Spec JSON File Generator](../../.github/agents/spec-json-file-generator.agent.md) agent, using the Add rows of the consolidated files as its input: [`terminology.md`](../scopes/terminology.md#4-add), [`taxonomy_mapping_change.md`](taxonomy_mapping_change.done.md#4-add) and the approved rows of [`ui_element_taxonomy_merge_proposal.md`](ui_element_taxonomy_merge_proposal.done.md#4-add). Each row gives the term, its scope and its level; the evidence it links to gives the attribute values and the child composition. The output: for each Alias and Grouped leaf addition, including the merge additions (Menu item, Date and time field, Captions), a node in its scope's example, with an id derived from the term (for example `highlightedText`) and the scope's catalog type. Glossary-only terms (terminology A1–A5) get no example. The three new Behaviors scopes (`input_assistance`, `viewport_and_focus_control`, `modal_overlay`) already have their leaf examples, their entries in `Behaviors/scope.example.json` and the index rows in `spec/examples/README.md` (tasks 9.4, 9.5).
   - 9.11 [ ] Regenerate the existing examples that the scope changes affect, with the same agent, so that each example meets the new Validation notes ([`scope_change.md`](scope_change.done.md#4-add), A1–A9).
     - 9.11.1 [x] Behavior targets (pulled forward, 2026-09-29): the Collapsible, Resizable and Drag and drop examples and the Behaviors folder example now reference their controlled element with `[target]` and own no children ([`scope_change.md`](scope_change.done.md#2-replace), R1). The attributes their Validation notes do not authorize are removed. `tests/test_spec_examples_format.py` checks that every behavior node in every example has a `[target]` that names another element of the same document, and no children.
   - 9.12 [ ] Validate: add a test that reads the same Add rows and checks that each addition with a scope is shown in that scope's example (a node whose id matches the term), then run the examples tests (EBNF, catalog type literals, one example per leaf and per folder). *Demo:* the new examples in the `generated-examples` app, with screenshots.
   - 9.13 [ ] Add the approved terms that are missing from their scope Purposes: Menu item and Captions ([`ui_element_taxonomy_merge_proposal.notdone.md`](ui_element_taxonomy_merge_proposal.notdone.md#scope-purposes-new-content)), Tree and Tree grid ([`taxonomy_mapping_change.notdone.md`](taxonomy_mapping_change.notdone.md#scope-purposes-new-content)); regenerate `spec/openui.json`.

### W2 Scope

10. [ ] Write the normative scope section: purpose, audience, in scope, out of scope, deferred to later editions. *Directive (Q9, decided 2026-09-29):* host-shell presence (such as a notification-area icon), docking and multiple-document workspaces are out of v1 and deferred to a later edition; Main window, Dockable panel and Multiple-document workspace (terminology A41–A43) stay out of the taxonomy and the glossary. *Directive (Q13, decided 2026-09-29):* the Accessibility and Composition top-level scopes (HTML P6, P7) are deferred: accessibility is a property of every element, not an element, and content projection is not a requirement.
11. [ ] Classify every catalog object and every survey concept as in / out / deferred. *Validate:* no catalog object is out of scope. *Demo:* scope map page.
12. [ ] *Lowest priority:* `docs/REQUIREMENTS.md` does not affect the spec. Split `docs/REQUIREMENTS.md` so spec requirements and generator requirements are separate. *Directive:* `docs/REQUIREMENTS.md` lists the requirements for the solution as the user and owner perceive them, not requirements for the spec; spec content (artifact roles, vocabulary, catalog rules) belongs in `spec/` and is only linked from it.

### W3 UI categorization

13. [x] Choose the primary axis and define the category set with inclusion rules.

   Result: [`category.md`](category.done.md#summary) (approved 2026-09-27): keep the 11-scope contract tree and the purpose taxonomy as linked views of one vocabulary and extend them in place, with no new tree; keep the nine sections, add a Behaviors section and 21 subcategories with inclusion rules and member lists. Applied in W1 task 9.3 and W3 task 14.4.
14. [ ] Re-map all 50 leaf scopes and all taxonomy entries to it; keep `spec/generic-ui-taxonomy.md` and `spec/ui-element-taxonomy.md` as parts of the specification (decided 2026-09-29; this reverses the 2026-09-27 decision to merge, then retire, `spec/ui-element-taxonomy.md`). *Directive (2026-09-29):* both documents are part of the spec, not views of it; they are structured correctly and stay so, and each fact they hold has one owner among the taxonomy documents, the glossary and the scope files (task 14.9):
    - 14.1 [x] Merge proposal: write [`spec/survey/ui_element_taxonomy_merge_proposal.md`](ui_element_taxonomy_merge_proposal.done.md#summary) with the same mechanism as [`terminology.md`](../scopes/terminology.md#appendix-a-canonical-term-rule). For each of the 222 abstract types (221 distinct names) that matches no taxonomy entry or approved term (91 already match), record Change, Replace, Delete or Add with section, subcategory, scope, abstraction level, evidence and source URL, or list it under "Not added" with the reason. The ten Accessibility types are not added: none is a UI element, whatever Q13 decides ([decision 3](ui_element_taxonomy_merge_proposal.done.md#decisions)). Depends on the decisions of task 13.
    - 14.2 [x] Approve the merge proposal, decision by decision ([decisions](ui_element_taxonomy_merge_proposal.done.md#decisions), 2026-09-28).
    - 14.3 [x] Classification rules: write the rules the approved changes already define into `spec/scopes/taxonomy_mapping.md` ([merge proposal section 5](ui_element_taxonomy_merge_proposal.done.md#5-classification-rules)): each subcategory's Holds text from [`category.md`](category.done.md#4-add) as its inclusion rule, one subcategory per entry, and secondary roles in the notes. Done in the same pass as 14.4.
    - 14.4 [x] Apply the category changes: the heading changes, the Behaviors section and the subcategories of [`category.md`](category.done.md#summary) in `spec/scopes/taxonomy_mapping.md` and `spec/generic-ui-taxonomy.md`. Done in the same pass as W1 tasks 9.2 and 9.3.
    - 14.5 [x] Apply the approved merge additions from 14.1 in the same pass.
    - 14.6 [x] Record the reversal: remove the "Retirement of the UI element taxonomy" sections from [`category.notdone.md`](category.notdone.md#category-change-not-done) and [`ui_element_taxonomy_merge_proposal.notdone.md`](ui_element_taxonomy_merge_proposal.notdone.md#ui-element-taxonomy-merge-not-done); remove "is being merged into it and retired" from `spec/README.md` and "(retiring)" from the `mkdocs.yml` navigation. *Directive (Q4 sub-question, revised 2026-09-29):* keep `spec/ui-element-taxonomy.md`; its content was merged into the taxonomy (14.1–14.5), and the file stays as a part of the specification. Result: both sections removed and the reversal recorded in the two `*.notdone.md` files; the README and the navigation name it a part of the specification.
    - 14.8 [x] Move the taxonomy documents to `spec/taxonomy/`: `generic-ui-taxonomy.md`, `generic-ui-taxonomy.html`, `ui-element-taxonomy.md` and `images/`. They are spec documents that specify the taxonomy, not scope registers, so they get their own folder next to `spec/scopes/`. Update every link and path: the spec README and scopes index, the survey records, `mkdocs.yml`, the `render_taxonomy_html` tool and its pre-commit hook, and the tests. Result: moved with `git mv`; links and paths updated in the spec README, `spec/scopes/scope.md` (so `spec/openui.json` was regenerated), the taxonomy mapping, the evidence register, CONTRIBUTING, the survey records, `mkdocs.yml`, the tool, its hook and the tests.
    - 14.9 [x] Record which document owns each fact, in the introduction of each taxonomy document and in `spec/scopes/scope.md`, and link the documents to each other:
      - `spec/taxonomy/generic-ui-taxonomy.md`: the sections and their purpose, the subcategories and their inclusion rule (Holds), the entries and where each belongs, and how the user meets each entry (description, viewable, device-dependent, image);
      - `spec/taxonomy/ui-element-taxonomy.md`: the abstract element types in 15 categories, their purpose and typical concrete elements, the OpenUI term each type maps to (14.10), and the classification rules with their primary and secondary role examples;
      - `spec/scopes/taxonomy_mapping.md`: for each entry, its scope object, abstraction level and scope-specific notes; its section and subcategory headings mirror the generic UI taxonomy, and a test keeps them equal;
      - the glossary keeps term definitions and generic aliases: synonyms such as "hyperlink" or "push button", and standard HTML, WAI-ARIA and CSS names such as "CSS grid" or "HTML table";
      - a framework name that means the same as an OpenUI term (such as `QPushButton` or `QDockWidget`) lives only in the alias columns of the taxonomy mapping (task 9.9); glossary-only terms that are not taxonomy entries, such as Owner and Element, get no framework aliases;
      - a framework name spelled like an OpenUI term but meaning something else lives in that term's glossary entry, in a note headed "Same name, different meaning:" (decided 2026-09-29), for example OpenUI5 `sap.m.Page`, which is a container, under Page;
      - the scope files keep object contracts; a taxonomy description may not contradict the glossary or a scope file.
      - Result: the owner table is in [`spec/scopes/scope.md`](../scopes/scope.md#taxonomy-documents), and each taxonomy document's introduction states what it owns and links the others. The Holds lines and the entry-placement rules moved from the taxonomy mapping into the generic UI taxonomy; `tests/test_taxonomy_mapping.py` checks that the mapping headings mirror the generic taxonomy. No framework name sits in a glossary Aliases line to move; the move of framework names into the alias columns stays with task 9.9.
    - 14.9.1 [x] Rename the glossary notes headed "Framework meanings differ:" (under Control, Element and Page in `spec/scopes/scope.md`) to "Same name, different meaning:", each written as: the framework, its name, what it is there, then what OpenUI means. Done 2026-09-29.
    - 14.10 [x] Refresh `spec/taxonomy/ui-element-taxonomy.md` and add its new content, keeping its structure (15 categories of abstract types):
      - add an "OpenUI term" column filled from [appendix A of the merge proposal](ui_element_taxonomy_merge_proposal.done.md#appendix-a-where-each-abstract-type-went) (for example Comparison Chart → Chart, Voice Input → not added);
      - replace the retired names it still uses: Hamburger menu / Hamburger Menu (now Hamburger button), Dropdown Menu as the classification example (now Menu button) and the section name "UI interaction definitions" (now Interaction definitions);
      - give a home to the approved terms that no abstract type reaches yet (about 60 of the 169 element and behavior terms, for example Hero banner, Shell bar, Object page, Wizard, Tree grid, Column browser, Keyboard shortcut field, Value help, Input assistance, Modal overlay, Startup screen), as new abstract types or as examples of existing ones, or state why a term is left out;
      - state the approved decisions in the category introductions without removing the types: category 7's visualizations sit with the data they show in Collections and data presentation (merge decision 1); category 14's identity types are compound widgets of existing elements (decision 2); category 15's accessibility types are properties of other elements, not elements (decision 3, Q13);
      - add a test that every term in the "OpenUI term" column exists in `spec/scopes/taxonomy_mapping.md`.
      - Result: the 222 types keep their 15 categories and gain the "OpenUI term" column from appendix A ("Not added" for the 23 types OpenUI does not add, with a link to the reasons). All 60 unreached terms now have a home: 40 as OpenUI terms of existing types and 20 in 15 new types (for example Shortcut Input, Font Selection, Menu Bar, Window, Page, View, Bar, Value Lookup), so every one of the 169 element and behavior terms is reached. The retired names are replaced (the interaction section name in 14.13), categories 7, 14 and 15 state decisions 1–3 in their introductions, and `tests/test_taxonomy_mapping.py` checks that every OpenUI term is an entry or a spec object of the taxonomy mapping.
    - 14.11 [x] Refresh `spec/taxonomy/generic-ui-taxonomy.md`: align the entry descriptions with the glossary and the scope Purposes: View as the [glossary View](../scopes/scope.md#view) does (it still says "a complete application page or state", which is a Page); Window as the [glossary Window](../scopes/scope.md#window) does (it still says "a top-level application or document area" that the user maximizes, and multiple-document workspaces are out of v1, Q9); Tab, which describes a tab selector while its spec object is the Tabs container; Date picker ("commonly through a calendar", while the Purpose makes the calendar optional); Report ("for reading, printing or export", while the Purpose is filtering, sorting, grouping and paging); draw the images of the 85 entries marked "None yet", in the style of `spec/taxonomy/images/`; regenerate `generic-ui-taxonomy.html`.
      - Result: the View, Window, Tab, Date picker and Report descriptions follow the glossary and the scope Purposes; all 85 entries marked "None yet" have an SVG image in `spec/taxonomy/images/`, in the style of the existing ones; the HTML is regenerated, and `tests/test_taxonomy_mapping.py` checks that every entry has an existing image or "Not applicable".
    - 14.13 [x] Remove the duplicates and contradictions between the taxonomy documents and the rest of the spec, following the owners of 14.9 (found 2026-09-29):
      - duplicated between the generic UI taxonomy and the taxonomy mapping: the entry list and placement (244 entries), the subcategory rules (Holds lines only in the mapping; the generic taxonomy has them for none of the 21 subcategories, and paraphrases the old ones), the section introductions (only in the generic taxonomy) and the classification rules (in the mapping and in the UI element taxonomy); mapping notes that restate the entry description keep only scope-specific information;
      - nine entry names are spelled differently in the two documents (for example "Currency and measurement formatting" and "Currency/measurement formatting"; "Pointer enter / leave" and "Pointer enter/leave"); use one spelling;
      - the UI element taxonomy names the interaction companion groups "Interaction target properties" and "Input events and commands", where the generic taxonomy says "Interaction areas and constraints" and "Input events";
      - `tests/test_taxonomy_mapping.py` checks entries in one direction only, ignores placement, and still allows the retired combined row "table/data grid"; make it check both directions, the exact names and the section and subcategory of each entry.
      - Result: the subcategory rules and the placement rules are only in the generic UI taxonomy (14.9) and the classification rules only in the UI element taxonomy; the mapping notes keep only scope-specific information ("—" where none is left); the nine entry names use the generic taxonomy's spelling; the UI element taxonomy names the four Interaction definitions subcategories as the generic taxonomy does and links them; `tests/test_taxonomy_mapping.py` compares the (section, subcategory, entry) lists of the two documents exactly, in both directions, and no longer allows "table/data grid".
    - 14.12 [ ] Give each of the 50 leaf scopes one primary section and subcategory in `spec/scopes/taxonomy_mapping.md`, from the taxonomy entries that link to it; other subcategories its entries fall in are secondary roles. Depends on W2 task 11 (only in-scope leaves are mapped).
    - 14.7 [x] Validate: pre-commit, link check, `mkdocs build --strict` and unit tests; every taxonomy entry belongs to exactly one section and at most one subcategory. Result (2026-09-29): all pass; `tests/test_taxonomy_mapping.py` now checks the section and subcategory rule for every entry of both documents.
15. [ ] Rename or move scope folders to match. *Validate:* every object has exactly one primary category; catalog regenerates. *Demo:* interactive taxonomy tree with per-framework overlay.

### W4 Specification structure

16. [ ] Define the v1.0 outline; the three taxonomy documents are part of it (section 5). For example: 1 Introduction & scope · 2 Conformance · 3 Terminology · 4 Document model & language · 5 Categories & objects · 6 Catalog · Annex A Grammar · Annex B Survey mapping · Annex C Examples.
17. [ ] Define RFC 2119 keyword use (MUST/SHOULD/MAY) and mark normative vs. informative sections.
18. [ ] Move incremental-generation and generator content out of `spec/README.md` into the generator docs. *Directive (Q8, decided 2026-09-29):* the Angular generator stays in openui-spec for v1.0, in `generators/angular/`, as [`docs/REQUIREMENTS.md`](../../docs/REQUIREMENTS.md#2-angular-typescript-generator) states.

### W5 UI description language

19. [ ] Decide attribute value typing (string/null only vs. typed values). *Directive (Q6, decided):* introduce typed values in a W5 grammar revision; this task defines which types, and task 23 adds them to the grammar.
20. [ ] Replace the Angular-flavoured `[x]` / `(x)` key syntax with a framework-neutral one for Uses / Produces / Behaves. *Directive (Q7, decided 2026-09-29):* attribute keys and values change into typed attributes, as planned; this task designs the new key syntax together with the value types of task 19, and task 23 converts the grammar. Until then, keys and values stay strings, and no other task waits on this one.
21. [ ] Define data-binding references, event payloads and i18n string references. Same-document element references already exist (0.3.0); extend, don't replace.
22. [ ] Define versioning and compatibility policy (SemVer for the spec; how documents declare the version).
23. [ ] Update `EBNF.txt` (authoritative) and regenerate the JSON Schema projection; `spec/bin/check_grammar_consistency` already enforces agreement. *Validate:* both accept/reject the same conformance fixtures. *Demo:* live playground page — paste JSON, see validation and rendered tree.

### W6 Draft first spec

24. [ ] Rewrite the spec per W4 outline, using W1–W5 outputs.
25. [ ] Enrich each leaf scope (Attributes, Child model) from the survey inventories and the alias table (W1 task 9.9); add evidence rows. Include the contract items the change files deferred to this task: the chart kind, legend and annotation of Chart, the message severity of Feedback widgets and repeat-while-pressed of Action controls ([`ui_element_taxonomy_merge_proposal.notdone.md`](ui_element_taxonomy_merge_proposal.notdone.md#chart-contract)); the attribute names of the new capabilities ([`scope_change.notdone.md`](scope_change.notdone.md#deferred)); and the Qt "Enhance" rows ([`taxonomy_mapping_change.notdone.md`](taxonomy_mapping_change.notdone.md#deferred)).
26. [ ] Regenerate `openui.json`, bump to `1.0.0-rc.1`, migrate all examples and fixtures. *Directive (Q3):* bump to the next `0.x.0` instead; `1.0.0-rc.1` waits on downstream validation.
27. [ ] Review period, then coordinate the M5 `1.0.0` release with W8 task 35. *Directive (Q3):* `1.0.0` waits on downstream validation; until then each release is `0.x.0` / `0.x.y`. *Validate:* full CI + conformance suite. *Demo:* published spec site with a rendered example per object (reuse `generated-examples`).

### W7 Documentation

28. [ ] Update README, REQUIREMENTS (*lowest priority*, as task 12), CONTRIBUTING, RELEASING, AGENTS.md / CLAUDE.md / GEMINI.md, `.github/copilot-instructions.md`, agent files under `.github/agents/`.
29. [ ] Write CHANGELOG `1.0.0` with a 0.3 → 1.0 migration guide. *Directive (Q3):* written for the `1.0.0` release, after downstream validation.
30. [ ] Publish to Read the Docs. *Demo:* the site itself.
31. [ ] After W6 task 27 and W8 task 35, notify downstream: angular-django2 (#98/#103 TS parser) and django-angular3.

### W8 Spec utilities

32. [ ] Create a shared conformance suite (`spec/conformance/`: valid + invalid documents with expected diagnostics); create its fixture structure early and finalize the suite after W5 task 23 freezes the grammar and schema.
33. [ ] After W5 task 23 and task 32, Python: parse (EBNF + JSON) → typed object model → validate (grammar, catalog membership, scope contract).
34. [ ] After W5 task 23 and task 32, TypeScript: same API surface in `@shlomoa/openui-spec`.
35. [ ] Both packages pass the same suite; publish `1.0.0` to PyPI and npm as part of the M5 release. *Directive (Q3):* publish `0.x.0` versions until downstream validation clears `1.0.0`. *Demo:* the W5 playground uses the TS validator.

## Milestones

Five GitHub milestones, each ending with a tagged release and a visible web page. No dates yet — set them once the open questions are answered.

| Milestone | Release | Tasks | Exit criterion | Visual demo |
| --- | --- | --- | --- | --- |
| [x] M1 Guard rails | `0.4.0` | 1–3 | CI green on Linux and Windows with spec-content lint | Lint report page |
| [x] M2 Survey consolidated | `0.4.0` | 4–6 | All consolidated change files approved | The change files in `spec/survey/` |
| [ ] M3 Foundations agreed | Next `0.x.0` | 7–18 | Glossary, scope, taxonomy and outline approved | Glossary + taxonomy tree pages |
| [ ] M4 Language frozen | Next `0.x.0` | 19–23, 32–34 | Grammar 1.0 + conformance suite merged | Validation playground |
| [ ] M5 v1.0.0 published | `1.0.0` | 24–31, 35 | Packages at 1.0.0 on PyPI + npm; docs live | Published spec site with rendered examples |

*Directive (Q3):* M5's `1.0.0` release waits on downstream validation; until then each milestone ships a `0.x.0` release.

M1 and M2 are complete: their tasks are done and their exit criteria hold. They were released as `0.4.0` (tag `v0.4.0`, 2026-09-29), together with the step 3 changes. Milestones carry no fixed version number: each release takes the next free `0.x.0` (directive Q3), and only M5 has a fixed number, `1.0.0`. M4 can start as soon as the terminology is applied (W1 9.1–9.6, execution step 3, done); it does not need the taxonomy or the rest of task 9.

## Execution order

The execution stack, top first. A step starts when the steps it depends on are done; steps with the same number can run in parallel. The order puts decisions before edits, and collects every change to the glossary, the taxonomy mapping and the generic taxonomy into one application pass and one release.

| # | Step | Plan tasks | Depends on | Status |
| --- | --- | --- | --- | --- |
| 1 | [x] Guard rails: tooling folder, spec-content lint framework, link checker | W9 1, 2.2, 2.4, 2.5, 3.1 | — | Done |
| 1 | [x] Remove stale file references from `AGENTS.md` | W9 3.2 | — | Done |
| 1 | [x] Category decisions in [`category.md`](category.done.md#summary) | W3 13 | — | Done |
| 1 | [x] Matrix decision (not built) | W0 5 | — | Done |
| 1 | [x] Scope reconciliation | W0 6 | — | Done |
| 2 | [x] UI element taxonomy merge proposal and its approval | W3 14.1, 14.2 | Step 1 category decisions (target subcategories) | Done |
| 2 | [x] Move the glossary to its final location | W1 7 | — | Done |
| 3 | [x] Apply terminology, categories and merge in one pass: glossary, taxonomy mapping, generic taxonomy, classification rules, three new Behaviors scopes, scope contracts | W1 9.1–9.6; W3 14.3–14.5 | Step 2 | Done |
| 3 | [x] Implement and enable the scope-template and glossary lint rules | W9 2.1, 2.3 | W1 7 | Done |
| 4 | [ ] Add the missing terms to their scope Purposes; generate the examples for the new additions from the consolidated data; validate; release the next `0.x.0` | W1 9.13, 9.10–9.12, 9.8, in this order | Step 3 | Open |
| 4 | [x] Keep the taxonomy documents as parts of the spec and align them: record the reversal, move them to `spec/taxonomy/`, record one owner for each fact, remove the duplicates and contradictions, refresh and extend the UI element taxonomy, refresh the generic taxonomy; validate all of W3 14 | W3 14.6, 14.8, 14.9, 14.13, 14.10, 14.11, 14.7, in this order | Step 3 | Done — PR #164 |
| 4 | [ ] Move incremental-generation and generator content out of `spec/README.md` | W4 18 | — | Open |
| 5 | [ ] Alias table from the survey mappings, with the final names | W1 9.9 (8.3) | Step 4 taxonomy row (W3 14.9 decides which names go in the alias columns; 14.13 sets the final entry names) | Open |
| 5 | [ ] Language decisions and grammar (M4 may start here) | W5 19 and 20 (together), 21, 22 and W8 32 fixture structure (independent of each other); then W5 23 | Step 3; W5 23 needs 19–22 | Open |
| 6 | [ ] Scope statement and in / out classification | W2 10, then 11; W2 12 (lowest priority) | Step 3 | Open |
| 6 | [ ] Enrich each leaf scope from the survey inventories and the alias table | W6 25 | W1 9.9 (step 5); W5 19–23 (step 5) | Open |
| 7 | [ ] Map leaf scopes to the categories; rename or move scope folders | W3 14.12, then 15 | Step 4 taxonomy row; W2 11 (step 6) | Open |
| 8 | [ ] Specification outline and normative split | W4 16, then 17 | Step 7 | Open |
| 9 | [ ] Draft the spec per the outline | W6 24 | Step 8 | Open |
| 9 | [ ] Conformance suite and Python / TypeScript utilities | W8 32 (finish the suite), 33, 34 | W5 23 | Open |
| 10 | [ ] Regenerate, migrate all examples and fixtures, `1.0.0-rc.1` | W6 26 | W6 24, 25; W5 23 | Open |
| 11 | [ ] Review and release `1.0.0`; packages; documentation; notify downstream | W6 27; W8 35; W7 28–31 | Step 10; step 9 utilities | Open |

Rows marked In progress are taken by a sub-agent; other agents take other rows.

*Directive (Q3):* the `1.0.0-rc.1` of step 10 and the `1.0.0` of step 11 wait on downstream validation; until then each release is `0.x.0` / `0.x.y`.

Priority: step 3 is the first specification change and unblocks the language work (step 5), so the decisions and proposals feeding it (steps 1–2) come first. The categorization of scope folders (step 7) waits on the scope statement, as the workstream graph requires.

## Open questions

Only the questions still open are listed. Answered questions became directives where they apply; decisions already applied are recorded as completed tasks (W0 6.1, W1 8.5 and 9.1, W3 13); decisions not yet applied are directives on the tasks they affect (Q3, the Q4 sub-question, Q6, Q7 on W5 task 20, Q8 on W4 task 18, Q9 and Q13 on W2 task 10). A question blocks only the workstream task that depends on its decision; unrelated work may proceed.

None.

## Sources

- [shlomoa/openui-spec](https://github.com/shlomoa/openui-spec) — `main` at `1c90f5c` (v0.3.1), re-checked 2026-09-26: `CHANGELOG.md`, `spec/EBNF.txt`, `spec/README.md`, `spec/scopes/`, `spec/bin/check_grammar_consistency/`, `.pre-commit-config.yaml`, `.github/workflows/build.yml`, `spec/survey/**` (proposal and README files).
- First draft based on `main` at `b97f3f8` (v0.2.0), 2026-09-23.
