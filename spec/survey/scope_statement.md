# Scope statement

This record gives the source of every item in the normative
[scope section](../README.md#scope) of the specification: what is in scope, what is out of
scope and what is deferred to a later edition. It answers W2 task 10 in the
[v1 publish plan](specui_v1_publish_plan.md#w2-scope).

- **Where it applies:** the [`## Scope`](../README.md#scope) section at the top of
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
