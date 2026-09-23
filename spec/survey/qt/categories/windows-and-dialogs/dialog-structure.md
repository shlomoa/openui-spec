# Dialog structure

[Windows and dialogs](README.md) · [Catalog index](../../README.md)

Provide application workspaces and focused interaction windows. The entries below describe dialog structure in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qdialog"></a> `QDialog` | Dialog window | **Purpose:** Host a focused task or brief interaction in a separate window.<br><br>**Appearance:** A window with application-defined content and optional action buttons and resize grip.<br><br>**Contents:** Fields, messages, choices, or other controls needed for the task.<br><br>**Behavior:** May be modal, restricting interaction with other windows, or modeless. Accept and cancel actions finish the interaction. Default-button and Escape behavior can provide keyboard completion or dismissal. | [QDialog](https://doc.qt.io/qt-6/qdialog.html) |
| <a id="qdialogbuttonbox"></a> `QDialogButtonBox` | Dialog action group | **Purpose:** Present dialog actions in a familiar order.<br><br>**Appearance:** A horizontal or vertical group of buttons with platform-appropriate ordering and spacing.<br><br>**Contents:** Standard or custom buttons for accepting, cancelling, applying, resetting, or requesting help.<br><br>**Behavior:** Each button activates its assigned role. The containing dialog determines the result, such as closing or applying changes. Button order follows platform conventions rather than the order in which the application describes them. | [QDialogButtonBox](https://doc.qt.io/qt-6/qdialogbuttonbox.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QDialog | Dialog window | [B01 Show, hide and close a surface](../../behaviors/presence/disclosure.md#b01); [B04 Restrict interaction to a modal scope](../../behaviors/governance/modality.md#b04); [B06 Contain and restore modal focus](../../behaviors/governance/focus.md#b06); [B32 Accept, reject or finish an interaction](../../behaviors/commands/workflow.md#b32) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qdialog) |
| QDialogButtonBox | Dialog action group | [B29 Activate a command](../../behaviors/commands/activation.md#b29); [B32 Accept, reject or finish an interaction](../../behaviors/commands/workflow.md#b32) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qdialogbuttonbox) |
