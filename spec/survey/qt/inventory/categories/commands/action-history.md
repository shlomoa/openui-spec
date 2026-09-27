# Action history

[Commands](README.md) · [Catalog index](../../README.md)

Invoke actions and expose command collections. The entries below describe action history in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qundoview"></a> `QUndoView` | Undo history list | **Purpose:** Let users return to earlier or later states in an editing history.<br><br>**Appearance:** A list of operation names with the current position selected.<br><br>**Contents:** Recorded action labels, an initial-state entry, and an optional marker for the saved state.<br><br>**Behavior:** Selecting a different history position undoes or redoes the intervening actions. The list follows the active document history when multiple histories are supported. | [QUndoView](https://doc.qt.io/qt-6/qundoview.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QUndoView | Undo history list | [B10 Select collection or scene items](../../behaviors/selection/collections.md#b10); [B31 Undo or redo recorded changes](../../behaviors/commands/history.md#b31) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qundoview) |
