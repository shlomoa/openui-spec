# Proposed Angular Material scope extensions

Status: review proposal only. Canonical scope files, taxonomy mapping, evidence register, glossary and generated catalog are unchanged. The requested output is a documented future merge proposal; source-document instructions are used as formatting and evidence conventions, not as authorization to merge.

## Recommended structure

Retain all 11 top-level scopes. Propose five new leaves: the two existing object-family candidates plus three behavior candidates. Stage thirteen existing-leaf amendments and four folder-level clarifications. All 18 leaf review copies remain unmerged; no new canonical category or subcategory folder is proposed. The survey research groupings do not become canonical roots.

```text
spec/scopes/
  Application/             existing, retained
  Controls/                existing, targeted clarifications
  Behaviors/
    scope.md               proposed index update
    modal_interaction.scope.md  AM-P03 new
    scrollable.scope.md     AM-P04 new
    scroll_lock.scope.md    AM-P05 new
    collapsible.scope.md   AM-E10 amended
    ...                    existing leaves retained
  Pages/                   existing, retained
  Views/                   existing, retained
  Containers/
    scope.md               add a link to the accepted new leaf
    form_field.scope.md    AM-P01 proposed
    ...                    existing leaves retained
  Widgets/
    scope.md               add a link to the accepted new leaf
    token_collection.scope.md  AM-P02 proposed
    ...                    existing leaves retained
  Layout/                  existing folder-level clarification
  Presentation/            existing folder-level clarification
  Internationalization/    existing folder-level clarification
  Interaction/             existing folder-level clarification
```

A replacement taxonomy tree is not required by this evidence. The current roots distinguish objects, composition and cross-cutting mechanisms adequately. Promoting Shared foundations, Development tooling or Package distribution would mix implementation packaging with UI semantics. Moving Table, Tree or Icons solely to imitate the survey would introduce unnecessary path and identifier migrations.

## Proposed object-family leaves

| Decision | Candidate draft and destination | Gap in the current tree | Boundary and alternative |
| --- | --- | --- | --- |
| AM-P01 | [Form field](proposed-scopes/Containers/form_field.scope.md) → `Containers/form_field.scope.md` | A reusable relationship between a value control, its label and supporting feedback has no dedicated mapping. | Text inputs owns value entry; Form view owns a broader workflow; Surface containers is generic. A distinct container leaf captures this relationship. If rejected, keep an explicit Surface containers alias with the same relationship documented. |
| AM-P02 | [Token collection](proposed-scopes/Widgets/token_collection.scope.md) → `Widgets/token_collection.scope.md` | Coordinated token entry/removal and collection interaction are not fully expressed by the passive Tag alias or a plain List. | Existing Tag and Choice controls remain valid for simple passive and selection-only cases. Prefer the new widget for collection coordination; otherwise compose existing List, Text inputs and Choice controls and explicitly document the remaining gap. |

These are proposed family-level definitions, consistent with current grouped leaves. They contain candidate identities, purposes, accessibility obligations and validation boundaries. Their Attributes and Child model sections deliberately declare no machine fields: there is not yet an approved neutral value schema or child-type union. Parsing an empty family contract proves template compatibility, not that a generator can render a complete field or token editor.

Before a concrete contract is added, AM-P01 needs an owned-versus-referenced control decision, permitted control types, and label/help/error associations. AM-P02 needs item identity/value representation, display/selection/entry modes, add/remove request versus committed-change events, ordering and selection constraints. Do not invent a universal `Control` child type or copy Angular selectors, providers, slots or events into the canonical catalog.

## Proposed enhancements to existing leaves

The following wording is staged for review. Preserve each existing identity, type and machine-bearing field. Citations and authorization boundaries are in the [candidate evidence register](PROPOSED_EVIDENCE.md).

| Decision and existing scope | Change | Proposed prose amendment | Contract boundary |
| --- | --- | --- | --- |
| AM-E01: [Controls/choice_controls.scope.md](../../../scopes/Controls/choice_controls.scope.md) | Add autocomplete-backed choice and retained toggle-group variants. Preserve the difference between text entry, option selection and command activation. | Add to Purpose/Validation notes: “A choice may be presented through an attached suggestion list or a retained toggle group. When composed with text input, selection and free text remain distinct capabilities; command menus retain menu semantics.” | No new attributes. Coordinate with the Qt completion behavior proposal before introducing an independent completion leaf. |
| AM-E02: [Controls/range_control.scope.md](../../../scopes/Controls/range_control.scope.md) | Clarify one-value and two-thumb interval selection within Range control. | Add to Purpose/Validation notes: “Range controls include single-value and bounded-interval variants. An interval variant exposes distinguishable endpoints and defines ordering and crossing behavior.” | Bounds, steps, endpoint representation and accessible endpoint labels need a neutral contract decision before machine fields are added. |
| AM-E03: [Widgets/date_time_pickers.scope.md](../../../scopes/Widgets/date_time_pickers.scope.md) | Remove the assumption that every temporal picker requires a calendar. | Replace Purpose with: “A control for entering or selecting a date, a time, or a date range, using presentation appropriate to the temporal value.” Qualify calendar keyboard guidance with “When a calendar is present”. | Preserve current range bindings and event. Choose single-time value format, timezone policy and event semantics separately; do not copy Material date-object storage. Overlaps the Qt temporal proposal. |
| AM-E04: [Widgets/navigation_widgets.scope.md](../../../scopes/Widgets/navigation_widgets.scope.md) | Clarify hierarchical data and result paging without requiring route navigation. | Add to Purpose/Validation notes: “Tree views may expose hierarchical data without navigating routes. Pagination may select a window of local or remote results; route changes are optional integration behavior.” | Keep existing identity/type. Do not move Tree view into a new Data presentation root; coordinate the Qt hierarchical-data clarification. |
| AM-E05: [Containers/sheet_containers.scope.md](../../../scopes/Containers/sheet_containers.scope.md) | Separate edge placement, navigation content and modality. | Add to Validation notes: “A side or bottom sheet may contain arbitrary content. Navigation semantics depend on that content, while modal interaction requires explicit focus and background-interaction policy independently of its edge placement.” | Compose proposed Modal interaction for explicitly modal sheets; use Dialog only where dialog semantics apply. Preserve route navigation separately; no new Drawer or BottomSheet leaf. |
| AM-E06: [Controls/status_indicator.scope.md](../../../scopes/Controls/status_indicator.scope.md) | Distinguish attached status from determinate and indeterminate progress. | Add to Validation notes: “Attached status must be associated meaningfully with its subject. Determinate progress conveys a value within a range; indeterminate progress conveys ongoing activity without an invented numeric completion value.” | No universal live-region behavior or mandatory announcement frequency. Coordinate the Qt progress clarification. |
| AM-E07: [Widgets/table.scope.md](../../../scopes/Widgets/table.scope.md) | Explain sort state and sort-header affordances without claiming data is automatically reordered. | Add to Validation notes: “A sort header indicates the active ordering and requests a change through table sorting behavior. Applying that order to a local or remote data source is an integration responsibility.” | Retain the existing sort behavior key and row contract. Data grid is reserved for the corresponding interactive contract; no SortHeader leaf. |
| AM-E08: [Containers/surface_containers.scope.md](../../../scopes/Containers/surface_containers.scope.md) | Clarify card composition and reusable toolbar surfaces. | Add to Purpose/Validation notes: “A card may group heading, supporting media, content and actions about one subject. A reusable toolbar surface belongs here when it is not the application-level command-placement contract.” | Optional regions are descriptive examples, not required child types. Retain Application Tool bars for its existing row/action contract; do not duplicate pending OpenUI5 card proposals. |
| AM-E09: [Widgets/list.scope.md](../../../scopes/Widgets/list.scope.md) | Clarify display, selection and link-list variants. | Add to Validation notes: “A plain list presents items; a selection list composes Choice controls, and a navigation list composes link or navigation semantics. List appearance alone does not establish a listbox or routing contract.” | Keep existing list item type and behaviors. Do not add selection keys to every list or require grid semantics. |

## Behavior extensions and amended contracts

The [capability mapping](BEHAVIOR_MAPPING.md) assigns all B01–B40 observations and all 39 families. The earlier two-leaf proposal covered object families but did not establish behavior coverage; these changes supersede that completeness assumption while retaining AM-P01/02.

| Decision | Review draft | Proposed boundary | Merge status |
| --- | --- | --- | --- |
| AM-P03 | [Behaviors/modal_interaction.scope.md](proposed-scopes/Behaviors/modal_interaction.scope.md) | Reusable modal policy; host owns lifecycle and authorization, behavior reports dismissal requests. | Accepted for proposal; neutral keys and composition semantics require acceptance. |
| AM-P04 | [Behaviors/scrollable.scope.md](proposed-scopes/Behaviors/scrollable.scope.md) | Scroll an existing constrained content region without owning its content or locking the page. | Accepted for proposal; neutral keys and composition semantics require acceptance. |
| AM-P05 | [Behaviors/scroll_lock.scope.md](proposed-scopes/Behaviors/scroll_lock.scope.md) | Suspend background page scrolling independently of internal scrolling or modality. | Accepted for proposal; neutral keys and composition semantics require acceptance. |
| AM-E10 | [Behaviors/collapsible.scope.md](proposed-scopes/Behaviors/collapsible.scope.md) | Add container/widget applicability; preserve host state ownership. Target encoding remains a wider review issue. | Existing-leaf amendment; update its single canonical evidence row after acceptance. |
| AM-E11 | [Widgets/dialog.scope.md](proposed-scopes/Widgets/dialog.scope.md) | Preserve all fields/regions; make modal focus and host-authorized dismissal explicit. Conditional Escape prose is an intentional proposed semantic clarification. | Existing-leaf amendment; update its single canonical evidence row after acceptance. |
| AM-E12 | [Containers/overlay_containers.scope.md](proposed-scopes/Containers/overlay_containers.scope.md) | Separate attachment/repositioning, clipping, modality, scroll locking and backdrop appearance. | Existing-leaf amendment; update its single canonical evidence row after acceptance. |
| AM-E13 | [Containers/expandable_panels.scope.md](proposed-scopes/Containers/expandable_panels.scope.md) | Keep expanded state and expand/collapse execution on one host; reference broader Collapsible applicability. | Existing-leaf amendment; update its single canonical evidence row after acceptance. |

The [Behaviors parent review copy](proposed-scopes/Behaviors/scope.md) indexes the three additions. The existing nine object-leaf amendments also have full review copies:

- AM-E01: [Controls/choice_controls.scope.md](proposed-scopes/Controls/choice_controls.scope.md).
- AM-E02: [Controls/range_control.scope.md](proposed-scopes/Controls/range_control.scope.md).
- AM-E03: [Widgets/date_time_pickers.scope.md](proposed-scopes/Widgets/date_time_pickers.scope.md).
- AM-E04: [Widgets/navigation_widgets.scope.md](proposed-scopes/Widgets/navigation_widgets.scope.md).
- AM-E05: [Containers/sheet_containers.scope.md](proposed-scopes/Containers/sheet_containers.scope.md).
- AM-E06: [Controls/status_indicator.scope.md](proposed-scopes/Controls/status_indicator.scope.md).
- AM-E07: [Widgets/table.scope.md](proposed-scopes/Widgets/table.scope.md).
- AM-E08: [Containers/surface_containers.scope.md](proposed-scopes/Containers/surface_containers.scope.md).
- AM-E09: [Widgets/list.scope.md](proposed-scopes/Widgets/list.scope.md).

Before this proposal, Behaviors contains Drag and drop, Resizable and Collapsible. After a future accepted merge it would contain those three plus Modal interaction, Scrollable and Scroll lock, with broader Collapsible applicability. Existing roots, identifiers and paths are retained. New exact type literals would enter the generated catalog only through accepted scope generation.

The [structural decision table](BEHAVIOR_MAPPING.md#structural-decisions) explicitly evaluates new categories/subcategories: Scrolling and ModalInteraction subfolders are deferred, and corresponding new top-level roots are rejected for this proposal. Current evidence fits Behaviors; no replacement tree is required. A later folder regrouping would need path/index/traceability migration while preserving semantic identities.

| Candidate canonical taxonomy entry | Proposed destination | Abstraction level on acceptance | Boundary |
| --- | --- | --- | --- |
| Modal interaction | `Behaviors/modal_interaction.scope.md` | Existing object after merge | Reusable policy rather than the Dialog host itself. |
| Scrollable | `Behaviors/scrollable.scope.md` | Existing object after merge | Viewport scrolling capability rather than scrollbar or owning container. |
| Scroll lock | `Behaviors/scroll_lock.scope.md` | Existing object after merge | Page-background policy rather than internal overflow. |

The entries above are proposed new behavior objects; “Existing object after merge” describes the future canonical mapping classification, not current existence. No new taxonomy abstraction-level name is introduced.

The drafts propose a reference-based target model for new behaviors without owned children. Existing behavior applicability entries remain unchanged except AM-E10's additive targets. Do not assume these two representations are already interoperable. Explicit reference, event, nesting and lifecycle decisions in [BEHAVIOR_REVIEW.md](BEHAVIOR_REVIEW.md) remain outstanding; the proposal is reviewable, not a merge-ready executable contract.

## Folder-level clarifications

| Existing scope | Proposed clarification | Reference evidence |
| --- | --- | --- |
| [Presentation/scope.md](../../../scopes/Presentation/scope.md) | Theme tokens, density, typography, ripple appearance and prebuilt themes are styling mechanisms. Keep file distribution and theme names out of the scope tree. | [core overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/core/core.md) |
| [Interaction/scope.md](../../../scopes/Interaction/scope.md) | Focus, activation, selection and input modality describe interaction state; ripple appearance is its visual feedback, not a new behavior leaf. | [core overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/core/core.md) |
| [Internationalization/scope.md](../../../scopes/Internationalization/scope.md) | Separate locale-sensitive date/time parsing and display from adapter services and the value representation. Framework providers remain implementation evidence. | [timepicker overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/timepicker/timepicker.md) |
| [Layout/scope.md](../../../scopes/Layout/scope.md) | Tile sizing, spacing and responsive arrangement refine existing layout vocabulary; the Grid container owns content while Layout describes its arrangement. | [grid-list overview](https://github.com/angular/components/blob/e950f29dcfbda93c13bff0d1a632465364488249/src/material/grid-list/grid-list.md) |

## Candidate canonical mapping additions

The [complete crosswalk](TAXONOMY_MAPPING.md) preserves existing mappings. On acceptance, add the object entries below and the behavior entries in the behavior extension section to `docs/generic-ui-taxonomy.md` and the canonical mapping together. Existing aliases need only notes or additional narrower terms, not duplicate leaves. Existing glossary definitions remain authoritative; add a concise definition only for an accepted new term.

| Taxonomy entry | Spec object after acceptance | Abstraction level | Notes |
| --- | --- | --- | --- |
| Form-field wrapper | `Containers/form_field.scope.md` | Grouped leaf | Reusable labeled control container; distinct from the contained value control and the whole Form view. |
| Token collection | `Widgets/token_collection.scope.md` | Grouped leaf | Coordinated compact-value collection with mode-specific interaction. |
| Editable chip collection | `Widgets/token_collection.scope.md` | Alias | Data-entry/removal variant; framework chip class names stay in evidence. |
| Suggestion-backed combo box | `Controls/choice_controls.scope.md` | Alias | Composes text entry where editable; does not require a new Autocomplete object. |
| Range slider | `Controls/range_control.scope.md` | Alias | Two-endpoint variant; neutral value and event representation remains a separate decision. |
| Workflow stepper | `Widgets/stepper.scope.md` | Alias | Refers to the already existing workflow object; distinct from numeric stepper input. |

## Cross-survey reconciliation

The [Qt extension proposal](../../qt/inventory/SCOPE_EXTENSION_PROPOSAL.md) is pending evidence, not approved taxonomy. Its temporal picker, range, progress and hierarchical-data changes overlap AM-E02/03/04/06; consolidate one amendment and one evidence row per canonical leaf. Its Text completion behavior remains a pending joint-review candidate; do not duplicate its type or silently adopt inline/string-only completion. Its Scroll container owns viewport/content, while AM-P04 references an existing viewport host; reconcile ownership and scrollbar policy before accepting either contract.

The [OpenUI5 terminology proposal](../../openui5/inventory/TERMINOLOGY_PROPOSAL.md) is also pending. Do not silently adopt its standalone/host-bound terminology as a canonical abstraction level. In particular, reconcile any pending card family with the current canonical Card → Surface containers mapping before splitting it. Check all pending proposals for duplicate field/token meanings and identifier collisions at merge time.

## Future merge sequence

1. Review AM-P01–05 and AM-E01–13 separately, together with the deferred contract decisions in BEHAVIOR_REVIEW.md. Accept, revise or reject each; this package records no approval. Recheck the [baseline fingerprints](PROPOSAL_CHECKS.md) and rebase the proposal if the canonical sources changed.
2. Reconcile overlapping survey proposals, confirm the generic terms and destination parents, and decide whether family-level definitions are sufficient. If concrete machine fields are required, approve technology-neutral keys, types, child ownership and multiplicities before writing them.
3. Copy only accepted leaf drafts into the canonical tree. Update parent `scope.md` indexes, the generic taxonomy and glossary as needed, and `scopes/taxonomy_mapping.md` together. No root rename or existing identity migration is proposed.
4. Merge accepted prose amendments. Update the existing evidence row for each modified leaf; add exactly one row for each new leaf. Record the actual accepted decision and retain framework citations as reference patterns. Folder-level rationale remains separate from the one-row-per-leaf register.
5. Run the documented scope-to-catalog generation flow and repository contract checks. Generate `spec/openui.json` from accepted scope sources; never copy this review tree into generation inputs or hand-edit the catalog. Review known-type changes and consumer effects explicitly.
6. Validate Markdown, relative links, scope identities, mapping coverage, composition ownership and evidence uniqueness. Resolve deferred contract decisions before treating the affected draft as executable or merge-ready. Review the resulting diff and preserve the survey record and rejected alternatives for future traceability.

## Acceptance criteria and limits

- Every one of the ten categories, thirty-nine families, direct package objects and seventeen artifact roles has a disposition.
- Every accepted new or changed leaf has one canonical evidence row, and each new term has a canonical mapping entry.
- Existing identity/type and attribute contracts remain stable unless an additional migration is reviewed.
- Generated output and consumers are checked only after a canonical merge is authorized. This proposal does not certify rendering, runtime behavior or accessibility compliance.
