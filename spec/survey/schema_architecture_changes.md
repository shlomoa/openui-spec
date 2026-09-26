# Survey recommendations: schema format and architectural structure

This report consolidates the recommendations from the four UI surveys for two areas:
changes to the OpenUI document **schema format**, and changes to the specification's
**architectural structure** (top-level scopes, folders and leaves).

- **Sources:** the per-survey proposals for [Angular Material](angular-material/README.md),
  [HTML Standard](html5/README.md), [OpenUI5](openui5/README.md) and
  [Qt Widgets](qt/README.md). Each recommendation links to the survey file it comes from.
- **Status:** every item is a survey proposal, not an approved decision. The grammar
  ([`EBNF.txt`](../EBNF.txt)), the [JSON Schema](../openui.schema.json), the
  [scope tree](../scopes/scope.md) and the generated catalog are unchanged.
- **Plan links:** the related tasks and questions are in the
  [v1 publish plan](specui_v1_publish_plan.md). Schema items feed workstream W5 (UI
  description language). Structure items feed W2 (scope) and W3 (categorization).

## Summary

1. **No survey asks for a change to the grammar's shape.** The surveys ask for richer
   attribute values and reference rules within the existing `id` / `type` / `attrs` /
   `children` model.
2. **Behavior targets should be references, not owned children.** Three surveys
   (HTML, Qt, Angular Material) raise this independently. It is the main schema decision.
3. **Typed attribute values are needed.** The draft leaves already use booleans,
   normalized numbers, enumerations, lists and id references, all currently encoded as
   strings.
4. **Keep the eleven top-level scopes and extend in place.** All four surveys reject a
   replacement tree.
5. **New content goes in as leaves under existing roots.** The surveys propose 29
   candidate leaves, subcategories and variants. Several overlap across surveys (modal
   interaction, scrolling, completion, form fields and cards) and need one reconciled
   contract each.
6. **Two conditional top-level additions** (Accessibility and Composition) and one
   conditional branch (host integration) wait on scope decisions.

## Part 1: Schema format changes

### Current format

- An OpenUI document is a tree of elements with `id`, `type`, optional `attrs` and
  optional `children`, defined by [`EBNF.txt`](../EBNF.txt) and projected into
  [`openui.schema.json`](../openui.schema.json).
- `attrs` values are `string | null`.
- Attribute keys use `[name]` for Uses (configuration) and `(name)` for Produces
  (events) and Behaves (actions).
- `children` are owned content. Since 0.3.0, same-document element references are
  written as quoted element ids in Uses attributes.

### Consolidated recommendations

| #   | Recommendation                                                                                                                                                                                                                                                      | HTML                                           | Qt                                            | Angular Material                                       | OpenUI5 | Plan item                 |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------- | ------------------------------------------------------ | ------- | ------------------------- |
| S1  | **Behavior targets are id references under `attrs`, not owned children.** A behavior neither owns nor duplicates its targets. Today, behavior leaves list their targets as children, which conflicts with the template rule that children are owned.                | [Yes](html5/openui_schema_proposal.md)         | [D01](qt/openui_schema_proposal.md)           | [D01, D05](angular-material/openui_schema_proposal.md) | —       | W5 task 21                |
| S2  | **Validate references.** Reject missing, wrong-kind and cyclic references; one controlling policy per target and capability.                                                                                                                                        | —                                              | [D01, D09](qt/openui_schema_proposal.md)      | [D01](angular-material/openui_schema_proposal.md)      | —       | W5 task 21, W8 validators |
| S3  | **Typed attribute values.** The drafts need booleans (`active`, `restoreFocus`), normalized numbers (scroll position 0–1), enumerations (dismissal reason), ordered lists (completion candidates), element references and opaque resource references.               | [Value kinds](html5/openui_schema_proposal.md) | [D03, D05, D06](qt/openui_schema_proposal.md) | [D02, D06](angular-material/openui_schema_proposal.md) | —       | Q6, W5 task 19            |
| S4  | **Define event payloads.** Separate a request (for example "dismissal requested") from its completion; define dismissal reasons, scroll units and direction normalization. HTML notes that a cancel event does not guarantee closure.                               | [Dialog cancel](html5/scopes_proposal.md)      | [D08](qt/openui_schema_proposal.md)           | [D02](angular-material/openui_schema_proposal.md)      | —       | W5 task 21                |
| S5  | **Define lifecycle and nesting rules** for modal and overlay behaviors: focus save and restore, reverse-order deactivation, cleanup when a host disappears, fallback when a restore target is gone.                                                                 | —                                              | [D02](qt/openui_schema_proposal.md)           | [D03, D04](angular-material/openui_schema_proposal.md) | —       | W5 (prose contract)       |
| S6  | **Keep the Uses / Produces / Behaves distinction.** Every draft leaf still uses the `[name]` / `(name)` key syntax. No survey proposes a different key syntax.                                                                                                      | [Yes](html5/openui_schema_proposal.md)         | [Drafts](qt/scopes_proposal.md)               | [Drafts](angular-material/scopes_proposal.md)          | —       | Q7, W5 task 20            |
| S7  | **Clarify the leaf template in prose.** Identity `type` is a semantic category, not an HTML tag or alias. A DOM method is behavior evidence, not a child. Variant-specific applicability belongs in validation prose. The Child model lists owned content only.     | [Template](html5/openui_schema_proposal.md)    | —                                             | —                                                      | —       | W4, W6 task 25            |
| S8  | **Tighten the evidence register format.** Keep one row per leaf; use precise, pinned source links; make the Authorizes cell distinguish platform facts, approved OpenUI abstractions and framework examples.                                                        | [Evidence](html5/openui_schema_proposal.md)    | [Evidence](qt/scopes_proposal.md#evidence)    | [Merge sequence](angular-material/scopes_proposal.md)  | —       | W9 task 2.2, W6 task 25   |
| S9  | **Do not copy framework constructs into the catalog.** No DOM selectors, framework expressions, Angular selectors, providers or slots; no universal `Control` child type; no machine fields on new family leaves until neutral value and ownership decisions exist. | [Yes](html5/openui_schema_proposal.md)         | [D01](qt/openui_schema_proposal.md)           | [Yes](angular-material/openui_schema_proposal.md)      | —       | W5                        |

OpenUI5 proposes no schema change. Its subcategory proposals come with no attributes or
child models. See [openui5/README.md](openui5/README.md).

### Divergences to resolve

| Topic                        | Divergence                                                                                                                                                                                                                                                                    | Sources                                                                                                                                                                                  |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Modal interaction attributes | Qt: `[target]`, `[boundary]`, `[active]`, `[initialFocus]`, `[returnFocus]`, `(activate)`, `(deactivate)`, `(activeChanged)`. Angular Material: `[target]`, `[active]`, `[initialFocus]`, `[restoreFocus]`, `[dismissOnEscape]`, `[dismissOnBackdrop]`, `(dismissRequested)`. | [Qt draft](qt/inventory/proposed-scopes/Behaviors/modal_interaction.scope.md), [Angular Material draft](angular-material/inventory/proposed-scopes/Behaviors/modal_interaction.scope.md) |
| Who owns lifecycle           | Qt's behavior activates and deactivates itself. Angular Material's host owns the open state; the behavior only reports dismissal requests.                                                                                                                                    | [Qt D02](qt/openui_schema_proposal.md), [Angular Material D01](angular-material/openui_schema_proposal.md)                                                                               |
| Scroll ownership             | Qt's Scroll container owns content and viewport. Angular Material's Scrollable references an existing viewport host.                                                                                                                                                          | [Qt](qt/scopes_proposal.md), [Angular Material](angular-material/scopes_proposal.md)                                                                                                     |
| `[modal]` on Dialog          | HTML has no `modal` attribute (modality comes from `showModal()`). Keep `[modal]` only as an explicit OpenUI abstraction and correct the evidence claim.                                                                                                                      | [HTML](html5/scopes_proposal.md)                                                                                                                                                         |

### Recommended order of schema decisions

1. **S1 and S2:** choose the reference encoding and its validation. This extends the
   0.3.0 element references and unblocks every new behavior leaf.
2. **S3:** choose the typed value kinds (plan Q6, already decided for a later W5
   revision). References from step 1 become one of the value kinds.
3. **S4 and S5:** define event payloads and lifecycle rules, then reconcile the modal
   attribute sets.
4. **S6:** confirm or replace the key syntax (plan Q7). The survey evidence supports
   keeping it.
5. **S7 to S9:** apply the template and evidence-register clarifications in the W6 rewrite.

## Part 2: Architectural structure changes

### Consensus: keep the eleven roots and extend in place

All four surveys recommend keeping the eleven top-level scopes (Application, Behaviors,
Containers, Controls, Pages, Views, Widgets, Layout, Presentation, Internationalization
and Interaction). They add new content as leaves or subcategories under existing roots.

| Survey           | Recommendation                                                                                                                 | Source                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| HTML             | Enrich in place first; split broad families only with a migration map; do not mirror HTML chapters.                            | [architecture_proposal.md](html5/architecture_proposal.md)            |
| Qt               | Extend the generic taxonomy within its nine sections; treat the taxonomy and the scope tree as linked views of one vocabulary. | [architecture_proposal.md](qt/architecture_proposal.md)               |
| Angular Material | Retain all eleven roots; no new category or subcategory folder.                                                                | [architecture_proposal.md](angular-material/architecture_proposal.md) |
| OpenUI5          | No new top-level category; the seven concrete-object scopes held under a framework the taxonomy was not written against.       | [architecture_proposal.md](openui5/architecture_proposal.md)          |

### Rejected alternatives

| Alternative                                                             | Rejected by      | Reason                                                                         |
| ----------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------ |
| Replace the scope tree with HTML chapters                               | HTML             | Mixes UI with parsers, workers and browser algorithms.                         |
| New top-level Graphics scope                                            | Qt               | Graphics content divides into output, composition, layout, input and behavior. |
| Promote Shared foundations, Development tooling or Package distribution | Angular Material | Mixes implementation packaging with UI semantics.                              |
| Move Table, Tree or Icons to imitate a framework's grouping             | Angular Material | Unnecessary path and identifier migrations.                                    |
| New top-level Scrolling or Modal interaction roots                      | Angular Material | The evidence fits Behaviors.                                                   |
| Split Widgets                                                           | OpenUI5          | Not justified yet; flagged as a watch item.                                    |

### Conditional structural additions

These need a scope decision before any leaf is written:

| Addition                                                                           | Proposed by      | Condition                                                                          | Plan item  |
| ---------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------- | ---------- |
| `Accessibility/` top-level folder (P6) for shared accessibility notions            | HTML             | Accessibility notions are declared in scope; needs sources beyond HTML.            | Q13, W2    |
| `Composition/` top-level folder (P7) for reusable content and insertion points     | HTML             | Content reuse or projection is a specification requirement.                        | Q13, W2    |
| Host integration → Application presence branch, under `Application`                | Qt               | Desktop or host-shell integration is accepted as a supported domain.               | Q9, W2     |
| `Scrolling` and `ModalInteraction` subfolders under `Behaviors`                    | Angular Material | Deferred; needs a path, index and traceability migration.                          | W3         |
| Selective family splits (Choice controls, Display primitives, Drawing and capture) | HTML             | Divergent variants cannot be described in one leaf; requires an old-to-new id map. | W3 task 15 |

### New leaves and subcategories under existing roots

Consolidated from all four surveys. Rows that name more than one survey are overlaps that
need one reconciled contract.

| Root        | Candidate                                                                                                   | Proposed by                                                    | Notes                                                                                |
| ----------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Application | Document metadata                                                                                           | HTML P1                                                        | Under the existing `index_html` host.                                                |
| Application | Resource declarations                                                                                       | HTML P2                                                        | May merge into P1; favicon stays separate.                                           |
| Application | Shell bar / App shell (subcategory)                                                                         | OpenUI5                                                        | Relates to Qt's conditional host-integration branch.                                 |
| Behaviors   | **Modal interaction**                                                                                       | Qt P05, Angular Material AM-P03, related HTML P5               | Overlap: attribute sets and lifecycle ownership differ (see Part 1).                 |
| Behaviors   | **Viewport scrolling / Scrollable**                                                                         | Qt P06, Angular Material AM-P04                                | Overlap: reconcile with Scroll container ownership.                                  |
| Behaviors   | Scroll lock                                                                                                 | Angular Material AM-P05                                        | Qt has no separate scroll-lock leaf.                                                 |
| Behaviors   | **Text completion**                                                                                         | Qt P03; related Angular Material AM-E01 and OpenUI5 Value help | Overlap: completion versus suggestion-backed choice versus value help.               |
| Behaviors   | Constraint validation                                                                                       | HTML P4                                                        | Form view keeps business submission state.                                           |
| Behaviors   | Focus management                                                                                            | HTML P5                                                        | Overlaps the focus parts of modal interaction.                                       |
| Containers  | Page stack                                                                                                  | Qt P01                                                         | Distinct from linear Stack and from Tabs.                                            |
| Containers  | **Scroll container**                                                                                        | Qt P02                                                         | See Viewport scrolling.                                                              |
| Containers  | **Form field**                                                                                              | Angular Material AM-P01; related HTML P3 Form group            | Related but distinct: one labeled control versus a named group of controls.          |
| Containers  | Flexible column layout (subcategory)                                                                        | OpenUI5                                                        | —                                                                                    |
| Containers  | Tile (named variant of Surface containers)                                                                  | OpenUI5                                                        | Not a new subcategory.                                                               |
| Controls    | Tabular content                                                                                             | HTML P8                                                        | Only if owned cells in Table are insufficient.                                       |
| Controls    | Metadata-driven field (alias of Text inputs)                                                                | OpenUI5                                                        | Alias-level note only.                                                               |
| Pages       | Semantic / Object page (subcategory)                                                                        | OpenUI5                                                        | —                                                                                    |
| Widgets     | Graphics viewport                                                                                           | Qt P04                                                         | Borrows scene data by reference.                                                     |
| Widgets     | Token collection                                                                                            | Angular Material AM-P02                                        | No machine fields until decision D06.                                                |
| Widgets     | **Cards** (subcategory)                                                                                     | OpenUI5; related Angular Material AM-E08                       | Overlap: reconcile with the canonical Card → Surface containers mapping.             |
| Widgets     | Filter bar, Value help, Personalization panels, File upload, Scheduling / Planning calendar (subcategories) | OpenUI5                                                        | File upload relates to the Picker control enhancements from Qt and Angular Material. |

### Existing leaves that several surveys want to amend

Enriching these is preferred over adding leaves. Each needs one merged amendment and one
evidence row.

| Existing leaf                 | HTML          | Qt  | Angular Material | Topic                                                        |
| ----------------------------- | ------------- | --- | ---------------- | ------------------------------------------------------------ |
| Widgets/date_time_pickers     | Yes           | Yes | AM-E03           | A temporal picker need not include a calendar.               |
| Widgets/table (and data_grid) | Yes           | Yes | AM-E07           | Cell, header and caption structure; sort state.              |
| Widgets/dialog                | Yes           | Yes | AM-E11           | Modality, focus and dismissal semantics.                     |
| Containers/overlay_containers | Yes           | —   | AM-E12           | Separate visibility, dismissal, modality and scroll locking. |
| Containers/expandable_panels  | Yes           | —   | AM-E13           | Disclosure state and its host.                               |
| Controls/range_control        | Yes           | Yes | AM-E02           | Single-value and interval variants.                          |
| Controls/status_indicator     | Yes (`meter`) | Yes | AM-E06           | Determinate versus indeterminate progress; measurement.      |
| Controls/choice_controls      | Yes           | Yes | AM-E01           | Suggestion-backed choice and group coordination.             |
| Widgets/list                  | Yes           | Yes | AM-E09           | Ordered, description, selection and link-list variants.      |
| Widgets/navigation_widgets    | —             | Yes | AM-E04           | Hierarchical data without route navigation.                  |
| Containers/surface_containers | —             | Yes | AM-E08           | Cards, toolbars, docking and MDI.                            |

Per-survey detail: [HTML](html5/scopes_proposal.md), [Qt](qt/scopes_proposal.md),
[Angular Material](angular-material/scopes_proposal.md).

### Folder-scope clarifications

Angular Material and Qt both propose clarifying the four folder-abstraction scopes
rather than restructuring them:

- **Presentation** owns styling mechanisms such as theme tokens, density, typography and
  visual effects. File distribution and theme names stay out.
- **Interaction** owns focus, activation, selection, hover and input-modality state.
  Pointer hover stays distinct from focus.
- **Layout** owns flow, wrapping, spacing and responsive arrangement. Containers own
  content.
- **Internationalization** cross-references value formatting and input instead of
  duplicating them.

Sources: [Angular Material](angular-material/architecture_proposal.md#folder-level-clarifications),
[Qt folder boundaries](qt/inventory/SCOPE_EXTENSION_PROPOSAL.md#folder-boundaries-and-compatibility).

## Decisions needed

| Decision                                               | Blocks                                      | Plan item      |
| ------------------------------------------------------ | ------------------------------------------- | -------------- |
| Reference encoding and validation for behavior targets | All new behavior leaves; S1, S2             | W5 task 21     |
| Typed value kinds                                      | S3; most draft attributes                   | Q6, W5 task 19 |
| Attribute key syntax                                   | S6                                          | Q7, W5 task 20 |
| Accessibility and Composition as top-level folders     | HTML P6, P7                                 | Q13            |
| Host-shell integration in scope                        | Qt host branch; OpenUI5 Shell bar placement | Q9             |
| One accept, defer or reject list for all proposals     | Every new leaf and amendment above          | W0 task 6      |
