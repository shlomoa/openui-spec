# Proposed Qt-informed scope extensions

Status: steps 1–14 complete as a proposal package. The canonical scope tree and generated catalog are unchanged. The package supplies component contracts, response contracts, applicability, counts and evidence for a future merge.

## Proposed scope tree

Keep existing top-level scopes. Six proposed leaves have complete review contracts:

```text
spec/scopes/
  Containers/
    page_stack.scope.md
    scroll_container.scope.md
  Behaviors/
    text_completion.scope.md
    modal_interaction.scope.md
    viewport_scrolling.scope.md
  Widgets/
    graphics_viewport.scope.md
```

| Proposal | Review contract | Primary responsibility | Behavior relationship |
|---|---|---|---|
| P01 | [Page stack](proposed-scopes/Containers/page_stack.scope.md) | Own alternative content; select one current region. | [B18 Switch the current content region](behaviors/navigation/content.md#b18) |
| P02 | [Scroll container](proposed-scopes/Containers/scroll_container.scope.md) | Own content and viewport/bar presentation. | [B21 Scroll or pan a viewport](behaviors/navigation/viewport.md#b21) |
| P03 | [Text completion](proposed-scopes/Behaviors/text_completion.scope.md) | Assist entry on a referenced target. | [B14 Offer and accept text completion](behaviors/entry/assistance.md#b14) |
| P04 | [Graphics viewport](proposed-scopes/Widgets/graphics_viewport.scope.md) | Present borrowed scene data. | [B11 Select by a spatial region](behaviors/selection/collections.md#b11); [B28 Transform graphical content](behaviors/geometry/placement.md#b28) |
| P05 | [Modal interaction](proposed-scopes/Behaviors/modal_interaction.scope.md) | Restrict interaction and manage modal focus. | [B04 Restrict interaction to a modal scope](behaviors/governance/modality.md#b04); [B06 Contain and restore modal focus](behaviors/governance/focus.md#b06) |
| P06 | [Viewport scrolling](proposed-scopes/Behaviors/viewport_scrolling.scope.md) | Control viewport position and optional motion refinements. | [B21 Scroll or pan a viewport](behaviors/navigation/viewport.md#b21); [B22 Continue and interrupt kinetic scrolling](behaviors/navigation/viewport.md#b22); [B23 Reveal a target in a viewport](behaviors/navigation/viewport.md#b23) |

## Reuse and composition decisions

Reuse existing Collapsible, Resizable and Drag and drop leaves. Keep exclusivity in Choice controls, region selection in Graphics viewport, and content switching in Page stack/Tabs. A behavior reference is not a new owned child. Kinetic motion and target reveal refine viewport scrolling; modal focus is part of modality. No new Swipe or Hover leaf is proposed.

The [decision register](BEHAVIOR_DECISIONS.md) defines references, units, lifecycle, conflict rules and unsupported-capability handling. The [40 contracts](BEHAVIOR_CONTRACTS.md) give triggers, preconditions, effects, termination, outputs and accessibility. The [94-by-40 matrix](COMPONENT_BEHAVIOR_MATRIX.md) qualifies applicability. [Evidence](PROPOSED_EVIDENCE.md) separates observed framework patterns from proposed neutral choices.

## Enhance existing leaves before splitting more families


Each row is a proposed change, not a statement that the current scope already declares these attributes. Existing-family enrichment remains prose-based in this proposal; exact machine keys are enumerated only in the six draft leaves. Behavioral contracts are supplied separately. Preserve current identifiers and instance types unless a separately reviewed migration is necessary.

| Existing scope | Proposed enhancement | Boundary and merge condition |
|---|---|---|
| [Action controls](../../scopes/Controls/action_controls.scope.md) | Add descriptive examples of tool buttons and explanatory command choices. | Keep button activation semantics; menus remain composed menu widgets. No new leaf needed. |
| [Text inputs](../../scopes/Controls/text_inputs.scope.md) | Add rich-document and shortcut-capture variants and host relationship to completion. | Shortcut capture records combinations; execution/registration belongs to application interaction. Rich-document content is not restricted to a plain string without a representation decision. |
| [Choice controls](../../scopes/Controls/choice_controls.scope.md) | Add font-family selector and exclusive-group coordination descriptions. | Group coordination is nonvisual; do not require a visible wrapper or create a leaf solely for QButtonGroup. |
| [Range control](../../scopes/Controls/range_control.scope.md) | Add decimal stepper and rotary-value aliases; describe bounds, step, wrapping as capabilities. | Numeric stepper remains distinct from workflow Stepper. Do not require wrapping for all ranges. |
| [Date/time pickers](../../scopes/Widgets/date_time_pickers.scope.md) | Broaden calendar-based purpose to date, time and combined temporal entry; propose a single-value variant alongside the current range bindings. | Preserve existing range users; time-only input must not require a calendar or an invented date. Resolve locale, value format and timezone treatment before binding keys. |
| [Picker control](../../scopes/Controls/picker_control.scope.md) | Add font picker and file/folder choice variants, with optional dialog composition. | Choice of resource is not permission to access or upload it. Platform capabilities remain explicit. |
| [Display primitives](../../scopes/Controls/display_primitives.scope.md) | Add segmented-number, formatted text, ellipse, rectangle, line, polygon and path output aliases. | Styling Shape is not concrete geometry. Keep editing/selection optional and define geometry representation only after neutral contract review. Linked documents compose link behavior rather than imply routing. |
| [Status indicator](../../scopes/Controls/status_indicator.scope.md) | Distinguish determinate/indeterminate progress and status-strip content roles. | A rich strip may own regions; an individual indicator need not. Cancellation belongs to its enclosing workflow/control. |
| [List](../../scopes/Widgets/list.scope.md) | Document icon collection and history-list variants. | Ordinary item selection must not implicitly undo application actions. History position and activation semantics need a dedicated extension decision before machine fields. |
| [Table](../../scopes/Widgets/table.scope.md), [Data grid](../../scopes/Widgets/data_grid.scope.md) | Record header role, section labels, sort indicators and configurable section resizing/reordering. | Header ownership follows the table/tree. Choose Table versus Data grid by interaction, not Qt class name. Avoid adding an independent header scope solely for QHeaderView. |
| [Navigation widgets](../../scopes/Widgets/navigation_widgets.scope.md) | Add cascading-column browser variant and clarify hierarchical data selection. | A tree is not necessarily route navigation; do not force route attributes for non-navigation data trees. |
| [Menu widgets](../../scopes/Widgets/menu_widgets.scope.md) | Add menubar alias/presentation and nested menu composition. | Keep command and choice semantics; do not equate a menu with a dropdown value field. |
| [Tabs](../../scopes/Containers/tabs.scope.md) | Clarify tab strip, attached content, vertical selector and ownership. | One active page differs from independently expandable panels; strip-only use references content rather than duplicating it. |
| [Surface containers](../../scopes/Containers/surface_containers.scope.md) | Add labelled/checkable groups, main-window composition, dockable/floating panels and internal-document windows. | Describe visible behavior, not native window APIs. A checkable group enables/disables contents; it does not necessarily collapse. MDI and docking remain optional runtime capabilities. |
| [Structural containers](../../scopes/Containers/structural_containers.scope.md) | Add scene/group composition notes; distinguish generic stacking from P01 active-content semantics. | Shared scene references must not duplicate owned trees. Transformable grouping is not a new top-level rendering-engine scope. |
| [Splitters](../../scopes/Containers/splitters.scope.md) | Document splitter handle as an owned affordance with target panes. | Reuse resizing semantics; preserve keyboard alternatives to dragging. |
| [Dialog](../../scopes/Widgets/dialog.scope.md) | Compose message, suppressible error, one-value prompt, picker, progress and action-group patterns in existing title/content/actions regions. | Do not duplicate a leaf per dialog variant. Distinguish dismissal, rejection, cancellation request and operation completion before adding events. |
| [Stepper](../../scopes/Widgets/stepper.scope.md) | Add completion gating, optional branching and dialog-hosted sequence notes. | A step is an owned workflow region, not necessarily a route-level Page. Ordered existing workflows remain valid. |
| [Feedback widgets](../../scopes/Widgets/feedback_widgets.scope.md) | Add startup surface and on-demand contextual help examples. | Interactive help differs from passive tooltip; avoid promising native system notifications. |
| [Media widgets](../../scopes/Widgets/media_widgets.scope.md) | Add custom-rendered output surface description, referring scene exploration to P04. | No implied built-in camera, scene model, 3D interaction or graphics-backend contract. |


## Folder boundaries and compatibility

Layout retains automatic flow, wrapping, anchoring and spacing. Presentation retains effects, focus/selection indicators and styling. Interaction retains events, gestures, hover/focus states and shared notions. Behaviors holds accepted reusable contracts; a behavior action does not necessarily become a leaf. Internationalization cross-references value formatting and input rather than receiving a duplicate subtree.

The generic taxonomy's Stack includes a depth axis, while the existing mapping describes it more narrowly as linear. Preserve canonical wording in review copies and resolve that glossary/mapping discrepancy when merging; Page stack is distinguished by exclusive current-content semantics.

Host-shell presence remains deferred. Temporal and rich-document payload formats are existing-family serialization questions; this proposal does not impose new universal formats. Runtime adapters must declare support for scene resources, native floating windows and modal scope enforcement.

## Future canonical merge

Follow [MERGE_HANDOFF.md](MERGE_HANDOFF.md): accept neutral decisions/evidence, add accepted leaves and parent indexes, merge existing-family prose and taxonomy aliases, regenerate the catalog, and run repository/consumer checks. Draft identities must not be mistaken for supported generator types before that work. All proposal-stage work is complete; canonical acceptance is a distinct activity.
