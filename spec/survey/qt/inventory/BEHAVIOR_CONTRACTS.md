# Behavior contracts — step 10

These are proposed technology-neutral contracts for all 40 audited response concepts. They are not assertions that every Qt host implements every rule. The [matrix](COMPONENT_BEHAVIOR_MATRIX.md) qualifies supported examples; native evidence, web accessibility obligations and proposed design choices remain distinct in [decisions](BEHAVIOR_DECISIONS.md).

Each primary definition remains in its behavior category file. The contract extends that definition with eligible target evidence, triggers, preconditions, termination, outputs, accessibility and conflicts. Observable outputs below are semantic results, not proposed API signal names; only the six scope drafts enumerate machine-bearing keys.

## Contract index

| Concept | Primary definition and contract | Scope treatment |
|---|---|---|
| B01 | [B01 Show, hide and close a surface](behaviors/presence/disclosure.md#b01) | Existing component/folder enrichment |
| B02 | [B02 Disclose and retire transient content](behaviors/presence/disclosure.md#b02) | Existing component/folder enrichment |
| B03 | [B03 Expand and collapse content](behaviors/presence/expansion.md#b03) | Reuse existing leaf |
| B04 | [B04 Restrict interaction to a modal scope](behaviors/governance/modality.md#b04) | P05 modal interaction |
| B05 | [B05 Transfer and traverse focus](behaviors/governance/focus.md#b05) | Existing component/folder enrichment |
| B06 | [B06 Contain and restore modal focus](behaviors/governance/focus.md#b06) | P05 modal interaction |
| B07 | [B07 Enforce interaction availability](behaviors/governance/availability.md#b07) | Existing component/folder enrichment |
| B08 | [B08 Change a checked or chosen value](behaviors/selection/choice.md#b08) | Existing component/folder enrichment |
| B09 | [B09 Coordinate exclusive choices](behaviors/selection/choice.md#b09) | Existing component/folder enrichment |
| B10 | [B10 Select collection or scene items](behaviors/selection/collections.md#b10) | Existing component/folder enrichment |
| B11 | [B11 Select by a spatial region](behaviors/selection/collections.md#b11) | Existing component/folder enrichment |
| B12 | [B12 Edit text and transfer clipboard content](behaviors/entry/editing.md#b12) | Existing component/folder enrichment |
| B13 | [B13 Capture a shortcut sequence](behaviors/entry/editing.md#b13) | Existing component/folder enrichment |
| B14 | [B14 Offer and accept text completion](behaviors/entry/assistance.md#b14) | P03 text completion |
| B15 | [B15 Adjust a bounded value](behaviors/entry/values.md#b15) | Existing component/folder enrichment |
| B16 | [B16 Constrain and validate input](behaviors/entry/values.md#b16) | Existing component/folder enrichment |
| B17 | [B17 Preview a value before completion](behaviors/entry/values.md#b17) | Existing component/folder enrichment |
| B18 | [B18 Switch the current content region](behaviors/navigation/content.md#b18) | Existing component/folder enrichment |
| B19 | [B19 Navigate a hierarchy or resource location](behaviors/navigation/content.md#b19) | Existing component/folder enrichment |
| B20 | [B20 Follow links and document history](behaviors/navigation/content.md#b20) | Existing component/folder enrichment |
| B21 | [B21 Scroll or pan a viewport](behaviors/navigation/viewport.md#b21) | P06 viewport scrolling |
| B22 | [B22 Continue and interrupt kinetic scrolling](behaviors/navigation/viewport.md#b22) | P06 viewport scrolling |
| B23 | [B23 Reveal a target in a viewport](behaviors/navigation/viewport.md#b23) | P06 viewport scrolling |
| B24 | [B24 Resize a target or adjacent panes](behaviors/geometry/sizing.md#b24) | Reuse existing leaf |
| B25 | [B25 Move or reorder within a surface](behaviors/geometry/movement.md#b25) | Existing component/folder enrichment |
| B26 | [B26 Transfer or move by drag and drop](behaviors/geometry/movement.md#b26) | Reuse existing leaf |
| B27 | [B27 Dock, float or rearrange panels](behaviors/geometry/placement.md#b27) | Existing component/folder enrichment |
| B28 | [B28 Transform graphical content](behaviors/geometry/placement.md#b28) | Existing component/folder enrichment |
| B29 | [B29 Activate a command](behaviors/commands/activation.md#b29) | Existing component/folder enrichment |
| B30 | [B30 Repeat activation while held](behaviors/commands/activation.md#b30) | Existing component/folder enrichment |
| B31 | [B31 Undo or redo recorded changes](behaviors/commands/history.md#b31) | Existing component/folder enrichment |
| B32 | [B32 Accept, reject or finish an interaction](behaviors/commands/workflow.md#b32) | Existing component/folder enrichment |
| B33 | [B33 Advance, revisit and branch a workflow](behaviors/commands/workflow.md#b33) | Existing component/folder enrichment |
| B34 | [B34 Request cancellation of work](behaviors/commands/workflow.md#b34) | Existing component/folder enrichment |
| B35 | [B35 Present contextual or host feedback](behaviors/feedback/delivery.md#b35) | Existing component/folder enrichment |
| B36 | [B36 Suppress repeated messages](behaviors/feedback/suppression.md#b36) | Existing component/folder enrichment |
| B37 | [B37 Change a window presentation state](behaviors/geometry/placement.md#b37) | Existing component/folder enrichment |
| B38 | [B38 Sort or filter a presented collection](behaviors/navigation/collections.md#b38) | Existing component/folder enrichment |
| B39 | [B39 Group or ungroup graphical contents](behaviors/geometry/placement.md#b39) | Existing component/folder enrichment |
| B40 | [B40 Select a text range](behaviors/entry/editing.md#b40) | Existing component/folder enrichment |
