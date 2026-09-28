# Qt Widgets survey: open questions

[Survey README](README.md#contents) · Sources: [BEHAVIOR_DECISIONS.md](inventory/BEHAVIOR_DECISIONS.md#remaining-acceptance-and-implementation-boundaries), [SCOPE_EXTENSION_PROPOSAL.md](inventory/SCOPE_EXTENSION_PROPOSAL.md#folder-boundaries-and-compatibility)

Status: open items of the survey itself. Nothing is approved at survey level. Where a
consolidated file has since settled an item, the outcome is linked.

## Open items

| #                                       | Open item                                      | Consolidated outcome                                                           |
| --------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------ |
| [Q1](#q1-host-shell-presence)           | Host-shell presence (`QSystemTrayIcon`)        | Not added; host integration stays with plan question Q9                        |
| [Q2](#q2-mdi-and-docking)               | Multiple-document workspaces and docking       | Terms added; runtime capability waits on Q9                                    |
| [Q3](#q3-the-six-proposed-leaves)       | The six proposed leaves P01–P06                | Settled: two became new Behaviors scopes, four became terms of existing scopes |
| [Q4](#q4-overlap-with-angular-material) | Overlap with Angular Material                  | Settled: one term and one scope per concept                                    |
| [Q5](#q5-serialization-of-values)       | Serialization of temporal and rich-text values | Deferred to the language workstream W5                                         |
| [Q6](#q6-stack-wording)                 | Stack defined with a depth axis                | Settled: Stack stays linear; the generic taxonomy drops "or depth"             |
| [Q7](#q7-adapter-capability-handling)   | Adapter capability handling                    | Open; a generator concern (W8)                                                 |
| [Q8](#q8-survey-decisions-d01d09)       | The survey's own decisions D01–D09             | Five settled, four wait on W5 or W6                                            |

## Q1 Host-shell presence

`QSystemTrayIcon` is the survey's only entry with the merge disposition Deferred
([taxonomy mapping](taxonomy_mapping.md#applicationscopemd)). Notification delivery and
native floating windows are deferred with it. Consolidated outcome: Notification-area
presence is not added ([terminology: Not added](../terminology.md#not-added)) and there is no
Host integration branch ([architecture change: Not added](../architecture_change.md#not-added));
host integration stays with plan question Q9.

## Q2 MDI and docking

Classes: `QMdiArea`, `QMdiSubWindow`, `QDockWidget`. Consolidated outcome: Dockable panel
(A42) and Multiple-document workspace (A43) are approved terms of Surface containers
([terminology: Container elements](../terminology.md#45-container-elements)). Whether they
are optional runtime capabilities waits on Q9 ([scope change: Not added](../scope_change.md#not-added)).

## Q3 The six proposed leaves

| Leaf                   | Consolidated outcome                                                                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P01 Page stack         | Alias of Tabs ([terminology A51](../terminology.md#46-layout-and-structural-elements))                                                                    |
| P02 Scroll container   | Alias of Structural containers ([terminology A52](../terminology.md#46-layout-and-structural-elements))                                                   |
| P03 Text completion    | Term of the new Input assistance scope ([terminology A59, A71](../terminology.md#47-behaviors); [structure change](../structure_change.md#add))           |
| P04 Graphics viewport  | Alias of Media widgets ([terminology A28](../terminology.md#43-output-elements))                                                                          |
| P05 Modal interaction  | Alias of Modal overlay, moved to Behaviors ([terminology A56, C4](../terminology.md#47-behaviors))                                                        |
| P06 Viewport scrolling | Term of the new Viewport and focus control scope ([terminology A57, A72](../terminology.md#47-behaviors); [structure change](../structure_change.md#add)) |

Evidence approval, generator support and accessibility conformance of the two new scopes
are part of applying them (plan W1 step 9.4).

## Q4 Overlap with Angular Material

| Qt                                                   | Angular Material                      | Consolidated outcome                                                                                        |
| ---------------------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| P05 Modal interaction                                | AM-P03 Modal interaction              | One term, Modal overlay, with Modal interaction as its alias                                                |
| P02 Scroll container, P06 Viewport scrolling         | AM-P04 Scrollable, AM-P05 Scroll lock | Scroll container in Structural containers; Viewport scrolling and Scroll lock in Viewport and focus control |
| P03 Text completion                                  | AM-E01 suggestion-backed choice       | Text completion in Input assistance; Suggestion-backed combo box in Choice controls                         |
| Temporal, range, progress and hierarchy enhancements | AM-E02, E03, E04, E06                 | One change per scope in [scope change](../scope_change.md#1-change): C3, C9, C12, C8                        |

## Q5 Serialization of values

Temporal values and rich-text content have no universal format. Consolidated outcome:
typed values come in a later W5 grammar revision (plan Q6), and the approved
[scope change](../scope_change.md#4-add) records the preconditions: A4 (rich text needs a
representation decision) and A8 (locale, value format and time zone first).

## Q6 Stack wording

The [generic UI taxonomy](../../../docs/generic-ui-taxonomy.md#layout-and-structural-elements)
defines Stack as "a structure that arranges child elements sequentially along a
horizontal, vertical, or depth axis", while the canonical taxonomy mapping calls it a
"Linear arrangement container". Consolidated outcome: Stack is kept as a linear
arrangement, and depth-layered stacking is the new term Layered arrangement
([terminology: Kept](../terminology.md#kept-with-a-sharper-definition), A55). The generic taxonomy sentence drops "or depth" when the terminology is applied (plan W1
step 9.3), as recorded in the Stack row of [terminology: Kept](../terminology.md#kept-with-a-sharper-definition).

## Q7 Adapter capability handling

Capabilities an adapter must declare: scene resources (Graphics viewport), floating windows
(Q2) and modal enforcement (Modal overlay). Unsupported behavior is rejected rather than
silently downgraded ([schema proposal](openui_schema_proposal.md#decisions)). Open: this is a
generator and adapter concern (plan W8), not specification vocabulary.

## Q8 Survey decisions D01–D09

| Id  | Decision                                                          | Consolidated outcome                                                                                                                |
| --- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| D01 | Behavior targets are id references, not owned children            | Settled: [scope change R1](../scope_change.md#2-replace); the encoding is W5 task 21                                                |
| D02 | Modal restriction and modal focus in one leaf                     | Settled: Modal overlay behavior ([terminology C4, A56](../terminology.md#1-change))                                                 |
| D03 | Scroll position as a normalized fraction per axis                 | Open: needs typed values (plan Q6, W5)                                                                                              |
| D04 | Reuse existing behavior leaves, add only P05 and P06              | Superseded: the two new scopes are Input assistance and Viewport and focus control ([structure change](../structure_change.md#add)) |
| D05 | Text completion references an input; ordered string candidates    | Settled as a term (A59); the value shape waits on W5                                                                                |
| D06 | Graphics viewport borrows scene data by resource reference        | Open: needs a resource-reference value kind (W5)                                                                                    |
| D07 | Triggers are vocabulary mapped to outcomes                        | Settled: glossary term Trigger ([terminology A4](../terminology.md#41-glossary-terms))                                              |
| D08 | Live preview is application-supplied; cancellation reports intent | Open: event semantics (W5 task 21); see [scope change A7](../scope_change.md#4-add)                                                 |
| D09 | One controlling policy per target and capability                  | Open: a validation rule for W6 task 25                                                                                              |
