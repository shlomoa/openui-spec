# Scope statement

This record gives the source of every item in the normative
[scope section](../README.md#12-scope) of the specification: what is in scope, what is out of
scope and what is deferred to a later edition. It answers W2 task 10 in the
[v1 publish plan](specui_v1_publish_plan.md#w2-scope). Its [classification](#classification)
answers W2 task 11.

- **Where it applies:** the [`## Scope`](../README.md#12-scope) section at the top of
  `spec/README.md`, right after the Purpose and the audience, which it reuses unchanged. The
  W4 16 outline places the section in part 1, "Introduction & scope".
- **Inputs:** the plan's [goal and definition of done](specui_v1_publish_plan.md#goal-and-definition-of-done)
  and its directives Q8, Q9 and Q13; [`docs/REQUIREMENTS.md`](../../docs/REQUIREMENTS.md#2-angular-typescript-generator);
  the approved [terminology](../scopes/terminology.md#not-added) and
  [UI element taxonomy merge](ui_element_taxonomy_merge_proposal.done.md#not-added) records;
  [`scope_change.notdone.md`](scope_change.notdone.md#out-of-v1); the
  [HTML survey summary](html5/SUMMARY.md#findings) and the
  [OpenUI5 leftover review](openui5/opens.md#o3-261-unclustered-classes).
- **Status:** approved by the project owner (2026-09-29) and applied to `spec/README.md`.
  The classification applies these items and adds no new decision.

## Definitions

Stated once, in the scope section:

- **Out of scope:** the specification does not address it.
- **Deferred:** a later edition may address it.

## In scope

| Item                | Source                                                                                                                                                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Terminology         | Definition of done 1                                                                                                                                                                                                                                                      |
| Catalog             | Definition of done 2: every catalog object falls inside the scope                                                                                                                                                                                                         |
| Categorization      | Definition of done 3                                                                                                                                                                                                                                                      |
| Language            | Definition of done 5                                                                                                                                                                                                                                                      |
| Survey traceability | Definition of done 6                                                                                                                                                                                                                                                      |
| Utilities           | Definition of done 7                                                                                                                                                                                                                                                      |
| Compositions        | [Merge proposal: Not added](ui_element_taxonomy_merge_proposal.done.md#not-added): Transfer Selection (two list boxes and buttons), Preview (an Image, a Media player or a Dialog), Walkthrough (Popovers) and Query Builder (Value help) are built from existing objects |

Definition of done items 4 (structure), 8 (validation) and 9 (visibility) describe how the
edition is written, checked and published, not what the specification covers; they are
plan tasks W4, W9 and W6–W7.

## Out of scope

| Item                            | Examples                                                                                  | Source                                                                                                                                                                                  |
| ------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Generators                      | The Angular generator                                                                     | [`docs/REQUIREMENTS.md` §2](../../docs/REQUIREMENTS.md#2-angular-typescript-generator); directive Q8 and task W4 18 in the [plan](specui_v1_publish_plan.md#w4-specification-structure) |
| Browser and framework machinery | HTML parsing, scheduling, storage, workers, communication; OpenUI5 infrastructure classes | Owner decision, 2026-09-29; [HTML survey summary](html5/SUMMARY.md#findings); [OpenUI5 leftover review](openui5/opens.md#o3-261-unclustered-classes)                                    |
| Platform prompts                | Biometric prompt, Permission Request, Voice Input                                         | [Terminology D1](../scopes/terminology.md#3-delete); [Merge proposal: Not added](ui_element_taxonomy_merge_proposal.done.md#not-added)                                                  |
| Implementation techniques       | Portal Region, Virtualized Collection                                                     | [Merge proposal D1, D2](ui_element_taxonomy_merge_proposal.done.md#3-delete)                                                                                                            |
| Data that is not UI             | Document metadata (A68), resource declarations (HTML P2), Saved Query                     | [Terminology: Not added](../scopes/terminology.md#not-added); [Merge proposal: Not added](ui_element_taxonomy_merge_proposal.done.md#not-added) (Saved Query is application data)       |
| Immersive views                 | Panoramic, AR and VR views                                                                | Owner decision, 2026-09-29; [Merge proposal: Not added](ui_element_taxonomy_merge_proposal.done.md#not-added)                                                                           |

## Deferred

| Item                                                          | Examples                                                                                               | Source                                                                                                                                |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Host-shell presence, docking and multiple-document workspaces | Notification-area icon; Main window, Dockable panel, Multiple-document workspace (terminology A41–A43) | Directive Q9 on [plan task W2 10](specui_v1_publish_plan.md#w2-scope); [`scope_change.notdone.md`](scope_change.notdone.md#out-of-v1) |
| Accessibility and Composition top-level scopes                | HTML P6, P7                                                                                            | Directive Q13 on [plan task W2 10](specui_v1_publish_plan.md#w2-scope); [Terminology: Not added](../scopes/terminology.md#not-added)  |
| Ruby annotation                                               | HTML `ruby`, `rt`, `rp`                                                                                | [Terminology: Not added](../scopes/terminology.md#not-added) ("left out at this stage")                                               |
| Duration selection, index navigation                          | A duration control; an A to Z rail                                                                     | Owner decision, 2026-09-29; [Merge proposal: Not added](ui_element_taxonomy_merge_proposal.done.md#not-added)                         |

## Classification

W2 task 11 classifies every catalog object and every survey concept as **In**, **Out**
(out of scope) or **Deferred**, by the items above. It is also the scope map of the
catalog. No catalog object is out of scope; `tests/test_scope_statement.py` checks that
the catalog table lists every scope document once, as In.

### Catalog objects

| Catalog object                                                                                | Kind            | Top-level scope | Classification |
| --------------------------------------------------------------------------------------------- | --------------- | --------------- | -------------- |
| [Application](../scopes/Application/scope.md)                                                 | Top-level scope | —               | In             |
| [favicon.ico](../scopes/Application/favicon.scope.md#purpose)                                 | Leaf scope      | Application     | In             |
| [index.html](../scopes/Application/index_html.scope.md#purpose)                               | Leaf scope      | Application     | In             |
| [Navigation group](../scopes/Application/nav_group.scope.md#purpose)                          | Leaf scope      | Application     | In             |
| [Navigation item](../scopes/Application/nav_item.scope.md#purpose)                            | Leaf scope      | Application     | In             |
| [Navigation](../scopes/Application/navigation.scope.md#purpose)                               | Leaf scope      | Application     | In             |
| [Route](../scopes/Application/route.scope.md#purpose)                                         | Leaf scope      | Application     | In             |
| [Routing](../scopes/Application/routing.scope.md#purpose)                                     | Leaf scope      | Application     | In             |
| [Tool action](../scopes/Application/tool_action.scope.md#purpose)                             | Leaf scope      | Application     | In             |
| [Tool bar row](../scopes/Application/tool_bar_row.scope.md#purpose)                           | Leaf scope      | Application     | In             |
| [Tool bars](../scopes/Application/tool_bars.scope.md#purpose)                                 | Leaf scope      | Application     | In             |
| [Controls](../scopes/Controls/scope.md)                                                       | Top-level scope | —               | In             |
| [Action controls](../scopes/Controls/action_controls.scope.md#purpose)                        | Leaf scope      | Controls        | In             |
| [Choice controls](../scopes/Controls/choice_controls.scope.md#purpose)                        | Leaf scope      | Controls        | In             |
| [Display primitives](../scopes/Controls/display_primitives.scope.md#purpose)                  | Leaf scope      | Controls        | In             |
| [Drawing and capture controls](../scopes/Controls/drawing_and_capture.scope.md#purpose)       | Leaf scope      | Controls        | In             |
| [Link and scroll controls](../scopes/Controls/link_and_scroll_controls.scope.md#purpose)      | Leaf scope      | Controls        | In             |
| [Native](../scopes/Controls/native.scope.md#purpose)                                          | Leaf scope      | Controls        | In             |
| [Picker control](../scopes/Controls/picker_control.scope.md#purpose)                          | Leaf scope      | Controls        | In             |
| [Range control](../scopes/Controls/range_control.scope.md#purpose)                            | Leaf scope      | Controls        | In             |
| [Status indicator](../scopes/Controls/status_indicator.scope.md#purpose)                      | Leaf scope      | Controls        | In             |
| [Text inputs](../scopes/Controls/text_inputs.scope.md#purpose)                                | Leaf scope      | Controls        | In             |
| [Behaviors](../scopes/Behaviors/scope.md)                                                     | Top-level scope | —               | In             |
| [Collapsible](../scopes/Behaviors/collapsible.scope.md#purpose)                               | Leaf scope      | Behaviors       | In             |
| [Drag and drop](../scopes/Behaviors/drag_and_drop.scope.md#purpose)                           | Leaf scope      | Behaviors       | In             |
| [Input assistance](../scopes/Behaviors/input_assistance.scope.md#purpose)                     | Leaf scope      | Behaviors       | In             |
| [Modal overlay](../scopes/Behaviors/modal_overlay.scope.md#purpose)                           | Leaf scope      | Behaviors       | In             |
| [Resizable](../scopes/Behaviors/resizable.scope.md#purpose)                                   | Leaf scope      | Behaviors       | In             |
| [Viewport and focus control](../scopes/Behaviors/viewport_and_focus_control.scope.md#purpose) | Leaf scope      | Behaviors       | In             |
| [Pages](../scopes/Pages/scope.md)                                                             | Top-level scope | —               | In             |
| [Dashboard](../scopes/Pages/dashboard.scope.md#purpose)                                       | Leaf scope      | Pages           | In             |
| [Empty page](../scopes/Pages/empty_page.scope.md#purpose)                                     | Leaf scope      | Pages           | In             |
| [Shell page](../scopes/Pages/shell_page.scope.md#purpose)                                     | Leaf scope      | Pages           | In             |
| [Views](../scopes/Views/scope.md)                                                             | Top-level scope | —               | In             |
| [Form](../scopes/Views/form.scope.md#purpose)                                                 | Leaf scope      | Views           | In             |
| [Report](../scopes/Views/report.scope.md#purpose)                                             | Leaf scope      | Views           | In             |
| [Containers](../scopes/Containers/scope.md)                                                   | Top-level scope | —               | In             |
| [Expandable panels](../scopes/Containers/expandable_panels.scope.md#purpose)                  | Leaf scope      | Containers      | In             |
| [Grid](../scopes/Containers/grid.scope.md#purpose)                                            | Leaf scope      | Containers      | In             |
| [Overlay containers](../scopes/Containers/overlay_containers.scope.md#purpose)                | Leaf scope      | Containers      | In             |
| [Sheet containers](../scopes/Containers/sheet_containers.scope.md#purpose)                    | Leaf scope      | Containers      | In             |
| [Splitters](../scopes/Containers/splitters.scope.md#purpose)                                  | Leaf scope      | Containers      | In             |
| [Structural containers](../scopes/Containers/structural_containers.scope.md#purpose)          | Leaf scope      | Containers      | In             |
| [Surface containers](../scopes/Containers/surface_containers.scope.md#purpose)                | Leaf scope      | Containers      | In             |
| [Tabs](../scopes/Containers/tabs.scope.md#purpose)                                            | Leaf scope      | Containers      | In             |
| [Widgets](../scopes/Widgets/scope.md)                                                         | Top-level scope | —               | In             |
| [Chart](../scopes/Widgets/chart.scope.md#purpose)                                             | Leaf scope      | Widgets         | In             |
| [Data grid](../scopes/Widgets/data_grid.scope.md#purpose)                                     | Leaf scope      | Widgets         | In             |
| [Date/Time pickers](../scopes/Widgets/date_time_pickers.scope.md#purpose)                     | Leaf scope      | Widgets         | In             |
| [Dialog](../scopes/Widgets/dialog.scope.md#purpose)                                           | Leaf scope      | Widgets         | In             |
| [Feedback widgets](../scopes/Widgets/feedback_widgets.scope.md#purpose)                       | Leaf scope      | Widgets         | In             |
| [List](../scopes/Widgets/list.scope.md#purpose)                                               | Leaf scope      | Widgets         | In             |
| [Media widgets](../scopes/Widgets/media_widgets.scope.md#purpose)                             | Leaf scope      | Widgets         | In             |
| [Menu widgets](../scopes/Widgets/menu_widgets.scope.md#purpose)                               | Leaf scope      | Widgets         | In             |
| [Navigation widgets](../scopes/Widgets/navigation_widgets.scope.md#purpose)                   | Leaf scope      | Widgets         | In             |
| [Stepper](../scopes/Widgets/stepper.scope.md#purpose)                                         | Leaf scope      | Widgets         | In             |
| [Table](../scopes/Widgets/table.scope.md#purpose)                                             | Leaf scope      | Widgets         | In             |
| [Layout](../scopes/Layout/scope.md)                                                           | Top-level scope | —               | In             |
| [Presentation](../scopes/Presentation/scope.md)                                               | Top-level scope | —               | In             |
| [Internationalization](../scopes/Internationalization/scope.md)                               | Top-level scope | —               | In             |
| [Interaction](../scopes/Interaction/scope.md)                                                 | Top-level scope | —               | In             |

### Taxonomy entries

Every entry of the [taxonomy mapping](../scopes/taxonomy_mapping.md#input-elements) and the
[generic UI taxonomy](../taxonomy/generic-ui-taxonomy.md) is **In**: each names its scope
object, and every scope object is in scope.

### Terminology records

The rows of the approved [terminology](../scopes/terminology.md#summary):

| Rows                                                               | Classification | Reason                                                                                                                 |
| ------------------------------------------------------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| C1–C6, R1–R11, the kept terms (Stack, Toolbar, Dropdown, Window)   | In             | Applied to the glossary, the taxonomy and the scope files.                                                             |
| D1 Biometric prompt                                                | Out            | Platform prompts.                                                                                                      |
| D2 "widget instance"                                               | In             | Only the alias is removed; the concept is Element.                                                                     |
| A1–A40, A44–A67, A69–A76                                           | In             | Applied (A71 and A72 are the Input assistance and Viewport and focus control scopes).                                  |
| A41–A43 Main window, Dockable panel, Multiple-document workspace   | Deferred       | Directive Q9.                                                                                                          |
| Not added: A68 Document metadata, Resource declaration (HTML P2)   | Out            | Data that is not UI.                                                                                                   |
| Not added: Standalone, merge disposition and correspondence labels | Out            | Survey vocabulary, not UI concepts: Standalone is the default and needs no label; the other labels describe proposals. |
| Not added: Notification-area presence                              | Deferred       | Directive Q9.                                                                                                          |
| Not added: Accessibility and Composition folders (HTML P6, P7)     | Deferred       | Directive Q13.                                                                                                         |
| Not added: Ruby annotation                                         | Deferred       | "Left out at this stage".                                                                                              |
| Not added: Cards (OpenUI5)                                         | In             | Covered by the existing Card alias.                                                                                    |

### UI element taxonomy abstract types

The 222 rows of the [UI element taxonomy](../taxonomy/ui-element-taxonomy.md), as the
[merge proposal](ui_element_taxonomy_merge_proposal.done.md#appendix-a-where-each-abstract-type-went) placed them:

| Rows                                                                            | Classification | Reason                                                                                                         |
| ------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------- |
| 91 already covered, 67 Change, 37 Replace, 3 Add, and the second Coach Mark row | In             | Each reaches an OpenUI term.                                                                                   |
| D1 Portal Region, D2 Virtualized Collection                                     | Out            | Implementation techniques.                                                                                     |
| Not added: the ten Accessibility and alternative-interaction types              | In             | Each is a property or a part that an existing term covers; accessibility is a property of every element (Q13). |
| Not added: Transfer Selection, Preview, Walkthrough, Query Builder              | In             | Compositions of existing objects.                                                                              |
| Not added: Repeating Action                                                     | In             | A capability of Action controls; its attribute is W6 task 25.                                                  |
| Not added: Voice Input, Permission Request                                      | Out            | Platform prompts.                                                                                              |
| Not added: Saved Query                                                          | Out            | Data that is not UI (application data).                                                                        |
| Not added: Immersive View                                                       | Out            | Immersive views.                                                                                               |
| Not added: Duration Selection, Index Navigation                                 | Deferred       | Owner decision, 2026-09-29.                                                                                    |

### Scope-extension proposals

Reconciled in plan task W0 6:

| Proposals                                                                          | Classification | Reason                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Angular Material AM-P01–P05, AM-E01–E13                                            | In             | Each has an outcome in the terminology, [scope change](scope_change.done.md#summary) or [structure change](structure_change.done.md#add) ([survey opens A2](angular-material/opens.md#a2-proposal-acceptance)). |
| Qt P01–P06                                                                         | In             | Two new Behaviors scopes and four terms of existing scopes ([survey opens Q3](qt/opens.md#q3-the-six-proposed-leaves)).                                                                                         |
| Qt "Enhance" rows (71)                                                             | In             | Richer contracts of existing scopes, W6 task 25 ([`taxonomy_mapping_change.notdone.md`](taxonomy_mapping_change.notdone.md#deferred)), except the Q9 rows below.                                                |
| HTML P3, P4, P5, P8                                                                | In             | Form group (A45), Constraint validation (A61), Focus management (A62); P8 as cells in the Table contract ([survey opens H7](html5/opens.md#h7-table-model-depth)).                                              |
| HTML P1, P2                                                                        | Out            | Data that is not UI.                                                                                                                                                                                            |
| HTML P6, P7                                                                        | Deferred       | Directive Q13.                                                                                                                                                                                                  |
| OpenUI5 clusters (11)                                                              | In             | Each became an approved term or the existing Card alias ([survey opens O1](openui5/opens.md#o1-cluster-placements)).                                                                                            |
| Docking and multiple-document workspaces as runtime capabilities; scope change C18 | Deferred       | Directive Q9 ([`scope_change.notdone.md`](scope_change.notdone.md#out-of-v1)).                                                                                                                                  |

### Survey inventories

| Survey concepts                                                                                                                                   | Classification | Reason                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Angular Material: 37 of 39 families                                                                                                               | In             | They map to 29 OpenUI scopes ([survey summary](angular-material/SUMMARY.md#findings)).                                                                                                      |
| Angular Material: `testing` and `schematics` families; the upstream theming-export defect                                                         | Out            | Tooling and a package defect, not UI ([survey summary](angular-material/SUMMARY.md#findings); [opens A4](angular-material/opens.md#a4-upstream-theming-exports)).                           |
| HTML chapters 4 HTML elements, 6 User interaction and 15 Rendering                                                                                | In             | The chapters that hold UI objects ([category: HTML Standard](category.done.md#html-standard)); every UI element has an OpenUI term ([survey opens H9](html5/opens.md#h9-element-coverage)). |
| HTML `input` state Hidden                                                                                                                         | Out            | Not UI ([survey opens H9](html5/opens.md#h9-element-coverage)).                                                                                                                             |
| HTML `ruby`, `rt`, `rp`                                                                                                                           | Deferred       | Ruby annotation.                                                                                                                                                                            |
| HTML chapters 1–3, 5, 7–14, 16, 17 and the supporting material                                                                                    | Out            | They hold no UI objects ([category: HTML Standard](category.done.md#html-standard)); parsing, scheduling, storage, workers and communication are browser machinery.                         |
| OpenUI5: 424 matched classes, 257 clustered classes; of the 261 leftovers, 102 matching, 45 parts, 9 behaviors, 17 mechanisms and 10 base classes | In             | They reach an OpenUI term; a base class through its subclasses ([survey opens O3](openui5/opens.md#o3-261-unclustered-classes)).                                                            |
| OpenUI5: 6 leftover classes of accessibility or composition                                                                                       | Deferred       | Directive Q13.                                                                                                                                                                              |
| OpenUI5: 279 non-UI infrastructure classes and 72 leftover classes of infrastructure or tooling                                                   | Out            | Browser and framework machinery ([survey summary](openui5/SUMMARY.md#findings)).                                                                                                            |
| Qt: 89 of 94 entries                                                                                                                              | In             | They map to existing OpenUI scopes ([survey mapping](qt/taxonomy_mapping.md#summary)).                                                                                                      |
| Qt: `QSystemTrayIcon`, `QMainWindow`, `QDockWidget`, `QMdiArea`, `QMdiSubWindow`                                                                  | Deferred       | Directive Q9: host-shell presence, a main window, docking and multiple-document workspaces.                                                                                                 |
| Qt: adapter capability handling                                                                                                                   | Out            | A generator concern ([survey opens Q7](qt/opens.md#q7-adapter-capability-handling)).                                                                                                        |

Libraries that a survey did not cover, such as the OpenUI5 legacy and Web Component
libraries ([survey opens O7](openui5/opens.md#o7-libraries-not-surveyed)), hold no survey
concepts and are not classified.

## Decisions

Decided by the project owner on 2026-09-29:

| #   | Decision                                                | Outcome                                                                                                             |
| --- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 1   | Meaning of out of scope and deferred                    | Out of scope: not addressed. Deferred: may be addressed some time in the future. Stated once, in the scope section. |
| 2   | Browser and framework machinery                         | Out of scope.                                                                                                       |
| 3   | Duration selection, index navigation                    | Deferred.                                                                                                           |
| 4   | Immersive views                                         | Out of scope.                                                                                                       |
| 5   | Transfer Selection, Preview, Walkthrough, Query Builder | In scope, as compositions of existing objects (merge proposal, Not added).                                          |

Nothing is open. The location, the Purpose, the audience and the other items were already
answered by the sources above.
