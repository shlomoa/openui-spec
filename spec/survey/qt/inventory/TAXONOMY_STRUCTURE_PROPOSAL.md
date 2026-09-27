# Proposed taxonomy categories and subcategories

Status: proposed extension for a future merge. This refines the [scope extension proposal](SCOPE_EXTENSION_PROPOSAL.md) into a taxonomy hierarchy. The [component crosswalk](TAXONOMY_MAPPING.md) remains the entry-by-entry mapping, and the [candidate evidence](PROPOSED_EVIDENCE.md) records its supporting examples and proposal decisions.

## Recommendation

Extend the existing [generic UI taxonomy](../../../../docs/generic-ui-taxonomy.md) within its current nine main sections. A replacement taxonomy tree or a new top-level Graphics category is not required by the Qt findings. Add subcategories for the concepts below and retain all existing entries, including entries for which the Qt survey has no example.

The taxonomy organizes concepts by primary purpose. The [scope tree](../../../scopes/scope.md) organizes specification contracts. They are linked views of the same vocabulary, not identical folder hierarchies: one taxonomy subcategory may map to several existing scope leaves. A new browsing category does not by itself authorize a new scope folder, type or contract.

## Proposed extension tree

This is a **delta tree**, showing proposed grouping headings and the existing anchors needed to understand them. It is not a complete replacement list. Unshown existing taxonomy entries and sections remain in place.

- **G**: proposed grouping/category heading; not a serializable object.
- **A**: proposed term or variant to add or clarify under an existing scope family.
- **P01–P06**: six proposed scope leaves; the behavior extension below completes their placement.
- **E**: existing term retained as an anchor. Existing terms nested below a G heading gain a browsing group, not a changed meaning or scope identity.

```text
Generic UI taxonomy
├── Input elements [existing section]
│   ├── Command activation [G]
│   │   ├── Button; Icon button [E]
│   │   └── Tool button; Explanatory command choice [A]
│   ├── Text and shortcut entry [G]
│   │   ├── Text field; Text area; Password field [E]
│   │   └── Rich text editor; Keyboard shortcut field [A]
│   ├── Value and resource selection [G]
│   │   ├── Checkbox; Radio button; Combo box; Slider; Spin box [E]
│   │   ├── Font-family selector; Rotary value control [A]
│   │   └── Color picker; File picker [E]; Font picker; Folder picker [A]
│   └── Temporal entry [G]
│       ├── Date picker; Time picker [E]
│       └── Date field; Time field; Combined date/time field [A]
├── Output elements [existing section]
│   ├── Document and numeric display [G]
│   │   ├── Text; Label; Image [E]
│   │   └── Linked document viewer; Segmented number display [A]
│   ├── Collections and data presentation [G]
│   │   ├── List; Table / Data grid [E]
│   │   └── Icon collection; Action-history list; Collection header [A]
│   ├── Graphics presentation [G]
│   │   ├── Scene viewports [G]: Graphics viewport [P04]
│   │   ├── Custom-rendered surfaces [G]: Custom graphics surface [A]
│   │   └── Geometric output [G]: Ellipse; Rectangle; Line; Polygon; Path [A]
│   └── Feedback and assistance [G]
│       ├── Status bar; Progress bar; Tooltip; Alert; Notification [E]
│       └── Startup feedback; Requested contextual help [A]
├── Navigational elements [existing section]
│   ├── Command menus [G]
│   │   ├── Menu; Dropdown Menu; Context menu [E]
│   │   └── Menubar [A]
│   ├── Hierarchy browsing [G]
│   │   ├── Tree view [E]
│   │   └── Cascading-column browser [A]
│   └── Content selection and position [G]
│       ├── Tab; Tab Bar; Scrollbar [E]
│       └── Vertical page selector [A]
├── Container elements [existing section]
│   ├── Grouping surfaces [G]
│   │   ├── Panel; Container [E]
│   │   └── Labelled group; Checkable group [A]
│   ├── Content viewports [G]
│   │   ├── Page stack [P01]
│   │   └── Scroll container [P02]
│   ├── Workspace surfaces [G]
│   │   ├── Window [E]
│   │   └── Main-window shell; Dockable panel; Internal document window;
│   │       Multiple-document workspace [A]
│   └── Focused tasks and guided sequences [G]
│       ├── Dialog [E]
│       ├── Message/decision dialog; Single-value prompt; Picker dialog;
│       │   Progress dialog; Suppressible-error dialog; Dialog action group [A]
│       └── Workflow stepper; Wizard; Guided step [A]
├── Layout and structural UI elements/objects [existing section]
│   ├── Pane structure [G]: Pane; Stack; Splitter [E]; Splitter handle [A]
│   └── Scene composition [G]
│       └── Graphics scene; Graphics group; Scene-hosted UI region [A]
├── UI layout mechanisms/definitions [existing section]
│   └── Arrangement patterns [G]
│       ├── Flow; Alignment; Anchoring; Spacing [E]
│       └── Label-field arrangement; Shared-region layered arrangement [A]
├── UI presentation and style definitions [existing section]
│   ├── Content treatments [G]
│   │   ├── Shadow / Elevation; Opacity [E]
│   │   └── Blur; Color tint [A]
│   └── State indicators [G]
│       ├── Visual states; Border [E]
│       └── Focus outline; Provisional-selection outline [A]
├── UI internationalization and localization definitions [existing section]
│   └── Existing language/locale/formatting groups [E; cross-references only]
└── UI interaction definitions [existing section]
    ├── Existing states, areas, gestures and input-event groups [E]
    └── Reusable interaction behaviors [G]
        ├── Entry assistance [G]: Text completion [P03]; see the complete outcome hierarchy below
        ├── Choice coordination [G]: Exclusive selection coordination [A]
        └── Content motion [G]: Kinetic scrolling [P06 refinement]
```

Command menus stay under Navigational elements to preserve the current taxonomy's placement; the name does not imply that all menu actions navigate. A future broad taxonomy review could move command menus alongside command activation, but the Qt extension does not require that reorganization.

## Category definitions and scope destinations

These are proposed grouping definitions. Canonical object meanings and aliases continue to belong in the spec glossary. The links identify scope destinations, not claims that every proposed variant already has a full contract.

| Proposed category/subcategory | Inclusion rule | Scope destination and treatment |
|---|---|---|
| Input / Command activation | Controls whose primary purpose is invoking a command. | [Action controls](../../../scopes/Controls/action_controls.scope.md); add variant descriptions. |
| Input / Text and shortcut entry | Entry of text or a recorded key sequence. | [Text inputs](../../../scopes/Controls/text_inputs.scope.md); shortcut capture differs from executing a shortcut. |
| Input / Value and resource selection | Choose a value, bounded quantity, font or resource. | [Choice controls](../../../scopes/Controls/choice_controls.scope.md), [Range control](../../../scopes/Controls/range_control.scope.md), [Picker control](../../../scopes/Controls/picker_control.scope.md); retain separate family contracts. |
| Input / Temporal entry | Edit or select date/time values, with an optional calendar. | [Date/time pickers](../../../scopes/Widgets/date_time_pickers.scope.md); enhance the calendar/range-oriented purpose. |
| Output / Document and numeric display | Present documents, labels or specialized numeric output. | [Display primitives](../../../scopes/Controls/display_primitives.scope.md), with [Link controls](../../../scopes/Controls/link_and_scroll_controls.scope.md) for interactive links. |
| Output / Collections and data presentation | Present repeated or structured records, including history records. | [List](../../../scopes/Widgets/list.scope.md), [Table](../../../scopes/Widgets/table.scope.md), [Data grid](../../../scopes/Widgets/data_grid.scope.md); headers are owned parts. |
| Output / Graphics presentation | Present spatial artwork or application-rendered imagery. | Browsing parent only; use the three subcategories below. Do not create a Graphics root scope. |
| Graphics presentation / Scene viewports | Display and explore scene content through a viewport. | [P04 Graphics viewport](proposed-scopes/Widgets/graphics_viewport.scope.md); optional pan/selection does not imply drawing input. |
| Graphics presentation / Custom-rendered surfaces | Present application-defined imagery without prescribing a scene model. | [Media widgets](../../../scopes/Widgets/media_widgets.scope.md) enhancement; keep native rendering APIs outside the abstract contract. |
| Graphics presentation / Geometric output | Concrete visual shapes and paths. | [Display primitives](../../../scopes/Controls/display_primitives.scope.md) enhancement; distinct from Presentation/Shape styling. |
| Output / Feedback and assistance | Communicate status, progress, startup information or help. | [Status indicator](../../../scopes/Controls/status_indicator.scope.md) and [Feedback widgets](../../../scopes/Widgets/feedback_widgets.scope.md); an interactive decision dialog belongs to focused tasks. |
| Navigation / Command menus | Collections of commands or choices using menu semantics. | [Menu widgets](../../../scopes/Widgets/menu_widgets.scope.md); a value dropdown remains a choice control. |
| Navigation / Hierarchy browsing | Explore parent/child information through trees or columns. | [Navigation widgets](../../../scopes/Widgets/navigation_widgets.scope.md); routes are optional, not inherent. |
| Navigation / Content selection and position | Select content or change the visible position within it. | [Tabs](../../../scopes/Containers/tabs.scope.md) and [Link/scroll controls](../../../scopes/Controls/link_and_scroll_controls.scope.md); associated content containers have their own homes. |
| Containers / Grouping surfaces | Hold related controls in a meaningful region. | [Surface containers](../../../scopes/Containers/surface_containers.scope.md); a checkable group controls enabled state, not necessarily visibility. |
| Containers / Content viewports | Control which part or alternative of contained content is visible. | [P01 Page stack](proposed-scopes/Containers/page_stack.scope.md) and [P02 Scroll container](proposed-scopes/Containers/scroll_container.scope.md); different contracts despite a shared browsing category. |
| Containers / Workspace surfaces | Organize application work areas and movable document/panel surfaces. | [Surface containers](../../../scopes/Containers/surface_containers.scope.md), composing [Tool bars](../../../scopes/Application/tool_bars.scope.md) and other existing objects. Docking/MDI are optional capabilities. |
| Containers / Focused tasks and guided sequences | Host a decision, limited input task or guided workflow. | [Dialog](../../../scopes/Widgets/dialog.scope.md) and [Stepper](../../../scopes/Widgets/stepper.scope.md); Stepper exists in the scope tree but lacks an explicit row in the current taxonomy mapping. |
| Structural objects / Pane structure | Define regions separated by adjustable boundaries. | [Structural containers](../../../scopes/Containers/structural_containers.scope.md) and [Splitters](../../../scopes/Containers/splitters.scope.md); handle is an owned affordance. |
| Structural objects / Scene composition | Organize graphical contents or treat them as a group. | [Structural containers](../../../scopes/Containers/structural_containers.scope.md); [Surface containers](../../../scopes/Containers/surface_containers.scope.md) for a scene-hosted UI region. Shared scenes require reference semantics before a contract is merged. |
| Layout / Arrangement patterns | Describe relationships that position or size elements. | [Layout](../../../scopes/Layout/scope.md), with [Grid](../../../scopes/Containers/grid.scope.md) for a concrete grid container; no new layout-class leaves. |
| Presentation / Content treatments | Change the appearance of existing content. | [Presentation](../../../scopes/Presentation/scope.md); effects are applied notions, not owned UI objects. |
| Presentation / State indicators | Make a state or provisional interaction result visible. | [Presentation](../../../scopes/Presentation/scope.md), cross-referencing [Interaction](../../../scopes/Interaction/scope.md) for the underlying state. |
| Interaction / Reusable interaction behaviors | Coordinate interaction over an existing target, without requiring an independent visible component. | Browsing parent; concrete behavior contracts use [Behaviors](../../../scopes/Behaviors/scope.md), while undeclared notions remain in Interaction. |
| Reusable behaviors / Entry assistance | Offer candidate completion during text entry. | [P03 Text completion](proposed-scopes/Behaviors/text_completion.scope.md); the associated input remains separately classified. |
| Reusable behaviors / Choice coordination | Coordinate exclusivity or related choices. | [Choice controls](../../../scopes/Controls/choice_controls.scope.md) enhancement; no new leaf solely for nonvisual grouping. |
| Reusable behaviors / Content motion | Continue or coordinate scrolling after a gesture. | [P06 Viewport scrolling](proposed-scopes/Behaviors/viewport_scrolling.scope.md), combining scrolling, kinetic continuation and target reveal; motion appearance remains separate. |

Modal restriction and focus management share [P05 Modal interaction](proposed-scopes/Behaviors/modal_interaction.scope.md), under Interaction governance in the complete behavior hierarchy.

## Fit of the Qt survey categories

The survey's nine categories remain useful for reading the research. They need not become new roots in the generic taxonomy or canonical scope tree.

| Survey category | Placement in the extended generic taxonomy |
|---|---|
| Commands | Input / Command activation; Navigation / Command menus; Output / Collections for action history. Toolbar keeps its existing Container taxonomy entry and Application scope. |
| Input and selection | Input entry/selection groups; Interaction / Entry assistance and Choice coordination for supporting behaviors. |
| Content and data presentation | Output document/collection groups; Navigation / Hierarchy browsing for tree/column browsing. |
| Page navigation and scrolling | Navigation content selection/position; Containers content viewports; Interaction content motion. |
| Containers and layout | Containers grouping surfaces; structural pane groups; Layout arrangement patterns. |
| Windows and dialogs | Containers workspace surfaces and focused tasks; picker content cross-references Input. |
| Status, help and interaction feedback | Output feedback/assistance; Presentation state indicators. System-tray presence remains the conditional host capability below. |
| Graphics surfaces and content | Output graphics presentation; structural scene composition; Layout for graphical arrangements. |
| Visual effects | Presentation content treatments. |

## When a new tree would be justified

**No replacement tree is proposed for the core taxonomy.** Graphics has a coherent browsing group, but its contents still divide meaningfully into output, composition, layout, input and behavior. Moving all of them into a new Graphics scope would conflate those roles and duplicate existing contracts.

The one unresolved boundary is integration with a host shell. If the specification later accepts desktop or other host-shell integration as a supported domain, introduce the following **optional taxonomy branch**, separate from the core UI-elements hierarchy:

```text
Host integration [conditional extension category; not part of this merge]
└── Application presence
    └── Notification-area presence
        ├── Identity icon [role; reuse display primitive]
        ├── Activation [capability; reuse interaction vocabulary]
        ├── Context actions [composition; reuse menu widgets]
        └── Notification delivery [capability; reuse feedback semantics]
```

This is a candidate extension view of the system-tray pattern, not a newly approved scope. If accepted, its contract should initially live under the existing `Application` scope, with a neutral host-presence leaf whose exact name and contract are decided then. The diagram does not propose one leaf per role or claim these services exist on every target. Other host integrations need their own evidence before this optional branch grows.

Keep system-tray presence in the crosswalk as Deferred until that domain decision is made. Do not map it to favicon: a page/site icon does not supply shell activation, menus or notification delivery.

## Classification and merge rules

1. Add grouping headings and accepted terms to the generic taxonomy while preserving existing entries and primary homes. This delta does not silently remove non-Qt coverage or reparent the entire taxonomy.
2. Add one primary classification for each new abstract concept; use cross-references for secondary roles. A picker dialog combines a picker and dialog; a page selector and its page stack are related but distinct objects.
3. In `taxonomy_mapping.md`, add rows for accepted terms, not for every browsing heading. Use Alias for variants, Existing object only when its concrete leaf exists, and Folder abstraction for shared notions. G headings do not add a new abstraction-level value.
4. Keep image and text primitives in their existing primary homes and cross-reference them from scene examples. Retain the published Viewable and Device-dependent columns when adding taxonomy rows; qualify runtime-dependent variants rather than inferring a dependency from Qt alone. Any example imagery is a separate documentation deliverable, not supplied by this proposal.
5. Apply the six candidate leaf contracts and other enhancements only through the [scope merge sequence](SCOPE_EXTENSION_PROPOSAL.md). Update parent scope indexes and each leaf's evidence entry, then regenerate and validate the catalog when the canonical merge is authorized.
6. Preserve the distinctions between linear Stack and Page stack, Shape styling and geometric output, drawing input and graphics output, numeric stepper and workflow Stepper, and visual grouping versus nonvisual choice coordination.

## Proposal checks

- The delta retains all nine existing main taxonomy sections; the optional host branch is explicitly conditional.
- Every proposed grouping has a definition and an existing or proposed scope destination above.
- All six leaf proposals have explicit taxonomy placements; no additional canonical leaves or top-level scopes are implied by G headings.
- All nine Qt survey categories have a destination summary; individual entries remain traceable through the complete crosswalk.
- Relative links and Markdown table structure are checked when this document is saved. The canonical taxonomy, scope tree and generated catalog remain unchanged.


## Completed behavior extension

The outcome hierarchy has eight categories and 21 subcategories, fully defined in [the behavior proposal](BEHAVIOR_TAXONOMY_PROPOSAL.md). It supersedes the abbreviated Entry assistance / Choice coordination / Content motion group in the component-focused delta tree above as the full behavior browsing structure.

- Presence and disclosure
- Interaction governance
- Selection coordination
- Entry and value change
- Content navigation and viewports
- Geometry and workspace manipulation
- Commands and task progression
- Feedback delivery and suppression

The nine main generic taxonomy sections remain intact. P05 Modal interaction and P06 Viewport scrolling join P01–P04, giving six proposed leaves. There is no new top-level Graphics or Behaviors root beyond the existing scope tree. All 40 response concepts, 40 configuration/state records and 15 appearance records have distinct counting units in [the reconciliation](CLASSIFICATION_RECONCILIATION.md).

The consolidated [taxonomy](GENERIC_UI_TAXONOMY_DRAFT.md) and [mapping](TAXONOMY_MAPPING_DRAFT.md) now include all 36 nonduplicate response additions as well as the prior 58 terms. [Merge handoff](MERGE_HANDOFF.md) records the remaining canonical integration activity.
