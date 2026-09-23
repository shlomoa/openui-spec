# Behavior proposal review and merge handoff

Status: Steps 9–11 completed as a document-level mapping, proposal and validation exercise. The [mapping](BEHAVIOR_MAPPING.md) covers all 40 researched observations and all 39 families. Canonical sources and generated output remain unchanged. Research completion does not mean that deferred contracts are approved or merge-ready.

## Resulting proposal

- Retain the existing 11 roots and flat Behaviors category. No new canonical category or subcategory folder is recommended; proposed Scrolling and ModalInteraction subfolders remain deferred, with reasons and migration implications in the mapping.
- Retain AM-P01 Form field and AM-P02 Token collection as object-family proposals.
- Add AM-P03 [Modal interaction](proposed-scopes/Behaviors/modal_interaction.scope.md), AM-P04 [Scrollable](proposed-scopes/Behaviors/scrollable.scope.md), and AM-P05 [Scroll lock](proposed-scopes/Behaviors/scroll_lock.scope.md).
- Retain the original nine existing-leaf amendments; add AM-E10 Collapsible, AM-E11 Dialog, AM-E12 Overlay containers and AM-E13 Expandable panels. All thirteen have full staged review copies. Only AM-E10 adds machine-bearing child entries to an existing leaf; other existing-leaf fields and child models are preserved.
- Keep four existing folder-level clarifications and stage the Behaviors parent index. Five new and thirteen amended leaves have one candidate evidence row each.

## Explicit conclusions for the requested capabilities

| Capability | Conclusion | Important limit |
| --- | --- | --- |
| Opening a dialog as modal | Host open/modal state activates AM-P03. The host owns the dialog and decides when closure is permitted. | Material ariaModal is an accessibility setting, not a direct equivalent of canonical Dialog modality. Do not copy it as the activation binding. |
| Internal overflow scrolling | AM-P04 can attach to an existing constrained content region, including dialog content, drawer content or an applicable tab body. | A scrollbar or scroll event is not the capability. Fitting content and dynamic-height layouts need not overflow. |
| Background scroll locking | AM-P05 targets the background page while the requesting feature is active. | It neither makes the host modal nor disables internal scrolling; arbitrary nested-region locking is outside current evidence. |
| Collapse/expand | Reuse Collapsible with proposed container/widget applicability and existing Expandable panels actions. | The host retains expanded state. Exclusivity, recursion and lazy content are separate host policies. |

## Ownership rules for composition

| Concern | Single owner | Delegation and excluded duplication |
| --- | --- | --- |
| Open/modal state and regions | Dialog, sheet or other explicit host | AM-P03 consumes derived active state; it does not create another writable open value or own title/content/actions. |
| Modal focus and background isolation | One modal-policy implementation for the active host | Either adapt the host's built-in policy or attach an implementation, never stack independent traps. Host provides semantic role/name. |
| Dismissal authorization and completed close/cancel events | Host lifecycle controller | AM-P03 emits a request with a reason; host accepts/rejects it. Rejection emits no completed cancellation/close. An accepted user cancellation and final close each use the existing host notification once. |
| Page scroll lock | Shared coordinator for the targeted background page | AM-P05 contributes a request. Release only that request; restore scrolling only when no request remains. Nested conflict/cleanup details still require D03/D04. |
| Content dimensions and ownership | Existing content/viewport host | AM-P04 permits scrolling of that region and reports position changes; no duplicated content child or competing geometry owner. |
| Expanded state | Panel or tree host | Existing expand/collapse actions and Collapsible target the same owner. No second expanded state or duplicate completion event. |
| Sorting/filtering/paging execution | Collection data owner | Host Behaves actions invoke execution. Sort/Paginator change notifications are requests/configuration inputs, not completed data transformations. |

These are proposed semantic rules for review, not claims that every framework composition already implements them. Defaults in new drafts are proposed decisions, not direct translations of all Material options.

## Concrete document-level scenarios

### C1: Modal dialog with scrollable content

Proposed composition: existing Dialog host; AM-P03 references that host; AM-P04 references its content region; optional AM-P05 references the background page. The host's open-and-modal condition supplies AM-P03 activation, and its selected background-lock policy supplies AM-P05 activation.

Trace: host opens → one modal policy places/contains focus → content can scroll while page locking is active → Escape generates one dismissal request → host authorizes or rejects. If rejected, open state and locking remain active. If accepted, the host emits its existing cancellation/closure notifications at the corresponding points, deactivates the composed policies, and releases/restores focus and page state through their respective owners.

**Review result:** responsibilities are distinct and no duplicate region or open-state field is proposed. Final binding/event encoding and nested cleanup remain D01–D04; runtime behavior is not verified. The current Dialog prose makes Escape unconditional, so AM-E11 explicitly stages the conditional-policy change rather than silently assuming it already exists.

### C2: Modal bottom sheet

Proposed composition: Sheet container retains bottom-edge placement and content; explicit modal policy uses AM-P03; page locking uses AM-P05 independently. The host may replace a prior sheet, but that replacement policy is not part of every Modal interaction instance.

Trace: replacement closes the prior host before releasing only its participation; the new host supplies its own activation. The page must not unlock or focus jump behind the active surface during a coordinated transition. No automatic conversion to Dialog regions is required; dialog semantics apply only when the host actually adopts them.

**Review result:** placement is separated from modality, and host replacement is not generalized to all dialogs. The handover timing, shared-lock conflict policy and restoration target require D03/D04. Do not treat the nested/replacement case as validated runtime behavior.

### C3: Overflowing component inside an otherwise scrolling page

Proposed composition: a constrained tab body or drawer-content viewport plus AM-P04. No modal policy or page lock is implied. A scrollbar can separately control the region; the pending Qt Scroll container can supply the owned viewport/content object after joint review.

Trace: content exceeds the region's available size → permitted-axis scrolling changes the region position → one scrollChange observation is exposed. If content fits, or the host selects a non-scrolling dynamic-height layout, no scrollbar or motion is required. Overlay repositioning, sticky headers, virtualization and background locking remain separate policies.

**Review result:** scroll capability, geometry, scrollbar control and scroll observation have distinct owners. Axis/payload normalization and disabled-region accessibility require D02; Qt ownership reconciliation is D07. No claim is made that toggling enabled alone can safely hide essential content.

### C4: Collapsible panel with a focused descendant

Proposed composition: existing Expandable panels host, its existing expand/collapse actions, and broadened Collapsible applicability to a container. The header refers to the content and the host owns expanded state.

Trace: an eligible trigger requests collapse → the host updates its state → focus is kept meaningful, including returning to an appropriate trigger if content becomes unavailable. The state transition and animation completion remain separate. Programmatic collapse policy need not be identical to disabled user activation.

**Review result:** no duplicate expanded state or invented universal event is introduced. AM-E10 adds targetContainer and targetWidget using the existing applicability-entry convention; D05 prevents treating those entries as permission to reparent the host's content. Accordion exclusivity and recursive tree collapse remain host-specific.

### Negative and boundary checks

- An ordinary menu or option popup does not acquire a modal focus trap merely because it overlays content.
- A side-mode drawer without explicit modal intent is not activated as AM-P03 solely because it opens. Backdrop configuration is evidence of part of the interaction, not proof of all isolation obligations.
- Slider-thumb dragging does not instantiate Drag and drop of UI objects; a divider does not instantiate Resizable.
- A sort-state event alone does not satisfy the existing Table sort action; its data owner must actually apply ordering.
- The documented optional table drag/drop integration reuses the existing behavior scope; it does not become a built-in Material table default.

## Deferred decisions and merge readiness

| Decision | Required resolution | Affected drafts / future action |
| --- | --- | --- |
| D01: Target references and activation bindings | Specify a neutral reference encoding, target validation and derived-state binding mechanism without copying DOM selectors or framework expressions. | AM-P03–05 are not executable or merge-ready until resolved. New behavior references do not yet replace existing applicability children. |
| D02: Event representation and observation policy | Define dismissal reasons, scroll position shape/units and physical/logical direction normalization; choose observation/coalescing rules without conflating requests and completion. | AM-P03/04 and AM-E11. Keep canonical close/cancel semantics explicit and emitted once by the host. |
| D03: Nested/replacement coordination | Define the active focus owner, lock participation, conflicting restoration preferences and handover timing. | AM-P03/05; C2 remains a conditional design scenario, not an implemented guarantee. |
| D04: Destruction, routing and invalid restore targets | Decide cleanup ownership when a host disappears and fallback focus/page restoration when the prior target or layout no longer exists. | AM-P03/05; do not retain locks or restore focus/position to stale targets. |
| D05: Applicability versus UI ownership | Resolve the existing behavior target-as-child convention against the general children-own-UI rule before broader migration. | AM-E10 follows the current convention additively; it does not silently authorize content reparenting. Canonical Drag and drop/Resizable remain unchanged. |
| D06: Object-family contracts | Choose Form field ownership/control associations and Token collection representation, modes and committed-change semantics. | AM-P01/02 remain grouped taxonomy drafts without concrete machine fields, not renderable contracts. |
| D07: Cross-survey and broader candidates | Reconcile Qt Scroll container and Text completion; gather adequate evidence before generalizing virtualization, autosizing or standalone focus coordination. | No duplicate ScrollContainer/TextCompletion definitions; deferred candidates remain explicit and do not become new leaves now. |

These open decisions do not block completing this research/proposal task. They block treating affected draft contracts as approved or implementation-ready. No user approval is inferred from executing Steps 9–11.

## Future merge checklist

1. Review AM-P01–05 and AM-E01–13 against the canonical fingerprints in [PROPOSAL_CHECKS.md](PROPOSAL_CHECKS.md). Accept/revise/reject each; resolve applicable D01–D07 before claiming concrete contract readiness.
2. Reconcile cross-survey duplicates, canonical glossary terms and generic taxonomy entries. Preserve existing semantic identities and paths; no root replacement or folder migration is currently proposed.
3. Copy only accepted review drafts, rewrite review-only links into canonical references, and update parent indexes. Add exactly one evidence row per accepted new leaf and update each existing leaf's row once.
4. Generate the catalog through the documented scope conversion flow, then check schema, known types, consumer impact and meaningful composition behavior. Parsing in this research pass is not a substitute for those checks.
5. Retain rejected/deferred decisions and the fixed source baseline for traceability. The original seven-step report and Step 8 checks remain historical evidence, not claims of runtime testing.

## Validation record

Coverage, Markdown, relative links, pinned-source path/anchor checks, parsing, identity/type collisions, existing-contract comparisons and canonical preservation are recorded in [PROPOSAL_CHECKS.md](PROPOSAL_CHECKS.md). No upstream tests, browser interaction checks, canonical generation or consumer execution were performed. This review is a document-level analysis with explicit remaining contract decisions.
