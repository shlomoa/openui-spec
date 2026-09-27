# Configuration, state and appearance ledger

This normalized proposal vocabulary is counted separately from behavior definitions. Each record groups related values or policy; it is not a new scope object, property enumeration or exhaustive catalog of every style token. The original audit retains per-component details.

## Configuration/state records

| ID | Record | Meaning | Related responses |
|---|---|---|---|
| C01 | Presence | Visible/open/closed state | [B01 Show, hide and close a surface](behaviors/presence/disclosure.md#b01); [B02 Disclose and retire transient content](behaviors/presence/disclosure.md#b02) |
| C02 | Modal boundary | Target and restriction region | [B04 Restrict interaction to a modal scope](behaviors/governance/modality.md#b04); [B06 Contain and restore modal focus](behaviors/governance/focus.md#b06) |
| C03 | Modal activation | Active restriction and nesting order | [B04 Restrict interaction to a modal scope](behaviors/governance/modality.md#b04); [B06 Contain and restore modal focus](behaviors/governance/focus.md#b06) |
| C04 | Focus targets | Current, initial and return destinations | [B05 Transfer and traverse focus](behaviors/governance/focus.md#b05); [B06 Contain and restore modal focus](behaviors/governance/focus.md#b06) |
| C05 | Availability | Enabled and read-only restrictions | [B07 Enforce interaction availability](behaviors/governance/availability.md#b07); [B12 Edit text and transfer clipboard content](behaviors/entry/editing.md#b12) |
| C06 | Checked state | Unchecked, checked or partial value | [B08 Change a checked or chosen value](behaviors/selection/choice.md#b08) |
| C07 | Exclusivity | Membership and one-choice policy | [B09 Coordinate exclusive choices](behaviors/selection/choice.md#b09) |
| C08 | Item selection | Selected item set and selection mode | [B10 Select collection or scene items](behaviors/selection/collections.md#b10); [B11 Select by a spatial region](behaviors/selection/collections.md#b11) |
| C09 | Text range | Selected or completion-replacement text range | [B12 Edit text and transfer clipboard content](behaviors/entry/editing.md#b12); [B14 Offer and accept text completion](behaviors/entry/assistance.md#b14); [B40 Select a text range](behaviors/entry/editing.md#b40) |
| C10 | Editable content | Current text/document value | [B12 Edit text and transfer clipboard content](behaviors/entry/editing.md#b12) |
| C11 | Shortcut capture | Sequence, length limit and finishing policy | [B13 Capture a shortcut sequence](behaviors/entry/editing.md#b13) |
| C12 | Completion candidates | Ordered candidate strings and match policy | [B14 Offer and accept text completion](behaviors/entry/assistance.md#b14) |
| C13 | Completion presentation | Popup or inline mode | [B14 Offer and accept text completion](behaviors/entry/assistance.md#b14) |
| C14 | Value domain | Numeric/temporal value, bounds, precision and step | [B15 Adjust a bounded value](behaviors/entry/values.md#b15); [B16 Constrain and validate input](behaviors/entry/values.md#b16) |
| C15 | Value tracking | Continuous/release/commit timing and wrapping policy | [B15 Adjust a bounded value](behaviors/entry/values.md#b15) |
| C16 | Validation state | Constraints, validity and checking timing | [B16 Constrain and validate input](behaviors/entry/values.md#b16) |
| C17 | Preview state | Tentative value, baseline and commit policy | [B17 Preview a value before completion](behaviors/entry/values.md#b17) |
| C18 | Current region | Current content child/index and eligible pages | [B18 Switch the current content region](behaviors/navigation/content.md#b18) |
| C19 | Location | Explored path and access policy | [B19 Navigate a hierarchy or resource location](behaviors/navigation/content.md#b19) |
| C20 | Link handling | Destination and local/external navigation policy | [B20 Follow links and document history](behaviors/navigation/content.md#b20) |
| C21 | Viewport geometry | Content extent, available axes and scroll range | [B21 Scroll or pan a viewport](behaviors/navigation/viewport.md#b21); [B23 Reveal a target in a viewport](behaviors/navigation/viewport.md#b23) |
| C22 | Scroll position | Effective viewport position | [B21 Scroll or pan a viewport](behaviors/navigation/viewport.md#b21); [B22 Continue and interrupt kinetic scrolling](behaviors/navigation/viewport.md#b22); [B23 Reveal a target in a viewport](behaviors/navigation/viewport.md#b23) |
| C23 | Motion policy | Kinetic enabled, velocity and stopping conditions | [B22 Continue and interrupt kinetic scrolling](behaviors/navigation/viewport.md#b22) |
| C24 | Bar visibility | As-needed, always or never presentation policy | [B21 Scroll or pan a viewport](behaviors/navigation/viewport.md#b21) |
| C25 | Target geometry | Size/position constraints and current dimensions | [B24 Resize a target or adjacent panes](behaviors/geometry/sizing.md#b24); [B25 Move or reorder within a surface](behaviors/geometry/movement.md#b25) |
| C26 | Drop policy | Permitted source/target actions and transfer state | [B26 Transfer or move by drag and drop](behaviors/geometry/movement.md#b26) |
| C27 | Dock placement | Allowed areas and attached/floating state | [B27 Dock, float or rearrange panels](behaviors/geometry/placement.md#b27) |
| C28 | Transform | Coordinate space, scale and rotation | [B28 Transform graphical content](behaviors/geometry/placement.md#b28) |
| C29 | Command eligibility | Enabled/default action and current activation | [B29 Activate a command](behaviors/commands/activation.md#b29) |
| C30 | Repeat policy | Delay, interval and held state | [B30 Repeat activation while held](behaviors/commands/activation.md#b30) |
| C31 | History state | Available actions and current history position | [B31 Undo or redo recorded changes](behaviors/commands/history.md#b31) |
| C32 | Task result | Accepted/rejected/completed outcome | [B32 Accept, reject or finish an interaction](behaviors/commands/workflow.md#b32) |
| C33 | Workflow state | Current step, completion, reset and branching policy | [B33 Advance, revisit and branch a workflow](behaviors/commands/workflow.md#b33) |
| C34 | Cancellation state | Requested versus acknowledged termination | [B34 Request cancellation of work](behaviors/commands/workflow.md#b34) |
| C35 | Message state | Content, timeout and delivery capability | [B02 Disclose and retire transient content](behaviors/presence/disclosure.md#b02); [B35 Present contextual or host feedback](behaviors/feedback/delivery.md#b35) |
| C36 | Suppression policy | Message identity, preference and lifetime | [B36 Suppress repeated messages](behaviors/feedback/suppression.md#b36) |
| C37 | Window state | Active, minimized, maximized or restored presentation | [B37 Change a window presentation state](behaviors/geometry/placement.md#b37) |
| C38 | Collection order | Sort/filter criterion and visible records | [B38 Sort or filter a presented collection](behaviors/navigation/collections.md#b38) |
| C39 | Group membership | Owned member set and grouping policy | [B39 Group or ungroup graphical contents](behaviors/geometry/placement.md#b39) |
| C40 | Visual treatment parameters | Blur/tint/shadow/opacity settings; no independent action implied | Appearance-only configuration |

## Appearance records

| ID | Record | Source example | Separation |
|---|---|---|---|
| V01 | Frame and border | [QFrame](categories/containers-and-layout/visual-grouping.md#qframe) | Depicts or treats content; does not itself establish an action. |
| V02 | Focus outline | [QFocusFrame](categories/status-and-help/interaction-indicators.md#qfocusframe) | Depicts or treats content; does not itself establish an action. |
| V03 | Provisional boundary | [QRubberBand](categories/status-and-help/interaction-indicators.md#qrubberband) | Depicts or treats content; does not itself establish an action. |
| V04 | Checked or partial indicator | [QCheckBox](categories/input-and-selection/choices.md#qcheckbox) | Depicts or treats content; does not itself establish an action. |
| V05 | Selection highlight | [QListView](categories/content-and-data/collections-and-hierarchies.md#qlistview) | Depicts or treats content; does not itself establish an action. |
| V06 | Hover highlight | [QToolButton](categories/commands/action-buttons.md#qtoolbutton) | Depicts or treats content; does not itself establish an action. |
| V07 | Unavailable styling | [QGroupBox](categories/containers-and-layout/visual-grouping.md#qgroupbox) | Depicts or treats content; does not itself establish an action. |
| V08 | Caret and text selection | [QLineEdit](categories/input-and-selection/text-and-shortcuts.md#qlineedit) | Depicts or treats content; does not itself establish an action. |
| V09 | Scrollbar track and thumb | [QScrollBar](categories/navigation/scrolling.md#qscrollbar) | Depicts or treats content; does not itself establish an action. |
| V10 | Sort indicator | [QHeaderView](categories/content-and-data/collection-headers.md#qheaderview) | Depicts or treats content; does not itself establish an action. |
| V11 | Progress fill or activity indication | [QProgressBar](categories/status-and-help/status-and-activity.md#qprogressbar) | Depicts or treats content; does not itself establish an action. |
| V12 | Blur | [QGraphicsBlurEffect](categories/appearance/README.md#qgraphicsblureffect) | Depicts or treats content; does not itself establish an action. |
| V13 | Color tint | [QGraphicsColorizeEffect](categories/appearance/README.md#qgraphicscolorizeeffect) | Depicts or treats content; does not itself establish an action. |
| V14 | Shadow | [QGraphicsDropShadowEffect](categories/appearance/README.md#qgraphicsdropshadoweffect) | Depicts or treats content; does not itself establish an action. |
| V15 | Opacity | [QGraphicsOpacityEffect](categories/appearance/README.md#qgraphicsopacityeffect) | Depicts or treats content; does not itself establish an action. |

Triggers remain Interaction vocabulary: activation, press/release, key input, pointer entry/exit/move, gesture recognition, timer, value change and application request. They are not counted as additional components or response definitions.
