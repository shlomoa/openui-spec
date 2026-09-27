# Containers and layout

[Catalog index](../../README.md)

Group components and determine their spatial arrangement. This category contains 10 entries.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qwidget"></a> `QWidget` | Generic UI surface | **Purpose:** Provide a general UI region that can stand alone or host other components.<br><br>**Appearance:** A rectangular surface whose painting and decoration are application-defined; as a top-level window it can have desktop window decorations.<br><br>**Contents:** Optional child controls, layouts, or custom-drawn content.<br><br>**Behavior:** Can be shown, hidden, resized, enabled, or disabled. Pointer and keyboard behavior depends on its configuration and contents. It supplies no specific task workflow by itself. | [QWidget](https://doc.qt.io/qt-6/qwidget.html) |

## Visual grouping

[Read the full descriptions](visual-grouping.md).

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QFrame` | [Bordered panel or separator](visual-grouping.md#qframe) | Frames content or visually separates regions. | [QFrame](https://doc.qt.io/qt-6/qframe.html) |
| `QGroupBox` | [Labeled group](visual-grouping.md#qgroupbox) | Groups related controls under a title. | [QGroupBox](https://doc.qt.io/qt-6/qgroupbox.html) |

## Adjustable panes

[Read the full descriptions](adjustable-panes.md).

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QSplitter` | [Resizable pane group](adjustable-panes.md#qsplitter) | Divides a region into adjustable panes. | [QSplitter](https://doc.qt.io/qt-6/qsplitter.html) |
| `QSplitterHandle` | [Pane divider handle](adjustable-panes.md#qsplitterhandle) | Lets users resize adjacent panes. | [QSplitterHandle](https://doc.qt.io/qt-6/qsplitterhandle.html) |

## Arrangement and spacing

[Read the full descriptions](arrangement-and-spacing.md).

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QBoxLayout`, `QHBoxLayout`, `QVBoxLayout` | [Linear arrangement](arrangement-and-spacing.md#qboxlayout) | Arranges child components in a row or column. | [QBoxLayout](https://doc.qt.io/qt-6/qboxlayout.html); [QHBoxLayout](https://doc.qt.io/qt-6/qhboxlayout.html); [QVBoxLayout](https://doc.qt.io/qt-6/qvboxlayout.html) |
| `QGridLayout` | [Grid arrangement](arrangement-and-spacing.md#qgridlayout) | Places child components in rows and columns. | [QGridLayout](https://doc.qt.io/qt-6/qgridlayout.html) |
| `QFormLayout` | [Label and field arrangement](arrangement-and-spacing.md#qformlayout) | Pairs field labels with their input controls. | [QFormLayout](https://doc.qt.io/qt-6/qformlayout.html) |
| `QStackedLayout` | [Layered page arrangement](arrangement-and-spacing.md#qstackedlayout) | Places pages in a shared region with configurable visibility. | [QStackedLayout](https://doc.qt.io/qt-6/qstackedlayout.html) |
| `QSpacerItem` | [Layout space](arrangement-and-spacing.md#qspaceritem) | Reserves blank space between or around components. | [QSpacerItem](https://doc.qt.io/qt-6/qspaceritem.html) |

## Related categories

- [Page navigation and scrolling](../navigation/README.md)
- [Graphics surfaces and content](../graphics/README.md)

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QWidget | Generic UI surface | [B01 Show, hide and close a surface](../../behaviors/presence/disclosure.md#b01); [B05 Transfer and traverse focus](../../behaviors/governance/focus.md#b05); [B07 Enforce interaction availability](../../behaviors/governance/availability.md#b07); [B24 Resize a target or adjacent panes](../../behaviors/geometry/sizing.md#b24) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qwidget) |
