# Adjustable panes

[Containers and layout](README.md) · [Catalog index](../../README.md)

Group components and determine their spatial arrangement. The entries below describe adjustable panes in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qsplitter"></a> `QSplitter` | Resizable pane group | **Purpose:** Let users redistribute space between neighboring panes.<br><br>**Appearance:** Horizontal or vertical panes separated by draggable divider handles.<br><br>**Contents:** Two or more child regions and the handles between them.<br><br>**Behavior:** Dragging adjusts pane sizes within applicable constraints. Resizing can update continuously or at release. Pane collapse can be allowed or prevented; hiding one pane gives its space to the others. | [QSplitter](https://doc.qt.io/qt-6/qsplitter.html) |
| <a id="qsplitterhandle"></a> `QSplitterHandle` | Pane divider handle | **Purpose:** Provide the grab target for adjusting adjacent panes.<br><br>**Appearance:** A narrow divider with a style-dependent grip and resize cursor.<br><br>**Contents:** Normally just the divider surface; custom versions may add controls.<br><br>**Behavior:** Dragging moves the division within the parent splitter's permitted range. The splitter determines whether content resizes immediately or follows an outline until release. | [QSplitterHandle](https://doc.qt.io/qt-6/qsplitterhandle.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QSplitter | Resizable pane group | [B03 Expand and collapse content](../../behaviors/presence/expansion.md#b03); [B24 Resize a target or adjacent panes](../../behaviors/geometry/sizing.md#b24) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qsplitter) |
| QSplitterHandle | Pane divider handle | [B24 Resize a target or adjacent panes](../../behaviors/geometry/sizing.md#b24) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qsplitterhandle) |
