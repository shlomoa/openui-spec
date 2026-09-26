# Collection headers

[Content and data presentation](README.md) · [Catalog index](../../README.md)

Present readable content and structured collections. The entries below describe collection headers in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qheaderview"></a> `QHeaderView` | Table or tree header | **Purpose:** Label and organize the sections of a table or tree.<br><br>**Appearance:** A horizontal header row or vertical header column, sometimes with a sort arrow.<br><br>**Contents:** Section labels, optional icons, and an optional sorting indicator.<br><br>**Behavior:** Sections may be clickable, movable, resizable, or fixed. Configured actions can select or sort data; the sort arrow communicates direction but does not by itself guarantee that sorting is enabled. | [QHeaderView](https://doc.qt.io/qt-6/qheaderview.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QHeaderView | Table or tree header | [B24 Resize a target or adjacent panes](../../behaviors/geometry/sizing.md#b24); [B25 Move or reorder within a surface](../../behaviors/geometry/movement.md#b25); [B29 Activate a command](../../behaviors/commands/activation.md#b29); [B38 Sort or filter a presented collection](../../behaviors/navigation/collections.md#b38) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qheaderview) |
