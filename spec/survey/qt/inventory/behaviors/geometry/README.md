# Geometry and workspace manipulation

[Behavior index](../README.md) · [Hierarchy proposal](../../BEHAVIOR_TAXONOMY_PROPOSAL.md)

Change size, placement or grouping through supported actions. Definitions and proposed contracts are complete; see the [contract index](../../BEHAVIOR_CONTRACTS.md) and [applicability matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

## Direct objects

All findings in this category have a primary home in a subcategory below.

## Interactive sizing

[Detailed definitions](sizing.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QSplitter`, `QSizeGrip`, `QHeaderView`, `QMdiSubWindow` | [B24 Resize a target or adjacent panes](sizing.md#b24) | Reuse Resizable; summarized at the linked primary definition. | [QSplitter](https://doc.qt.io/qt-6/qsplitter.html); [QSizeGrip](https://doc.qt.io/qt-6/qsizegrip.html); [QHeaderView](https://doc.qt.io/qt-6/qheaderview.html); [QMdiSubWindow](https://doc.qt.io/qt-6/qmdisubwindow.html) |

## Movement and transfer

[Detailed definitions](movement.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QTabBar`, `QHeaderView`, `QGraphicsItemGroup`, `QMdiSubWindow` | [B25 Move or reorder within a surface](movement.md#b25) | Shared notion; summarized at the linked primary definition. | [QTabBar](https://doc.qt.io/qt-6/qtabbar.html); [QHeaderView](https://doc.qt.io/qt-6/qheaderview.html); [QGraphicsItemGroup](https://doc.qt.io/qt-6/qgraphicsitemgroup.html); [QMdiSubWindow](https://doc.qt.io/qt-6/qmdisubwindow.html) |
| `QListView`, `QTableView`, `QTreeView` | [B26 Transfer or move by drag and drop](movement.md#b26) | Reuse Drag and drop; summarized at the linked primary definition. | [QListView](https://doc.qt.io/qt-6/qlistview.html); [QTableView](https://doc.qt.io/qt-6/qtableview.html); [QTreeView](https://doc.qt.io/qt-6/qtreeview.html) |

## Workspace placement and graphical transforms

[Detailed definitions](placement.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QDockWidget`, `QToolBar`, `QMainWindow` | [B27 Dock, float or rearrange panels](placement.md#b27) | Component action; summarized at the linked primary definition. | [QDockWidget](https://doc.qt.io/qt-6/qdockwidget.html); [QToolBar](https://doc.qt.io/qt-6/qtoolbar.html); [QMainWindow](https://doc.qt.io/qt-6/qmainwindow.html) |
| `QGraphicsView`, `QGraphicsItemGroup` | [B28 Transform graphical content](placement.md#b28) | Component action; summarized at the linked primary definition. | [QGraphicsView](https://doc.qt.io/qt-6/qgraphicsview.html); [QGraphicsItemGroup](https://doc.qt.io/qt-6/qgraphicsitemgroup.html) |
| `QMdiSubWindow`, `QMdiArea` | [B37 Change a window presentation state](placement.md#b37) | Component action; summarized at the linked primary definition. | [QMdiSubWindow](https://doc.qt.io/qt-6/qmdisubwindow.html); [QMdiArea](https://doc.qt.io/qt-6/qmdiarea.html) |
| `QGraphicsItemGroup`, `QGraphicsScene` | [B39 Group or ungroup graphical contents](placement.md#b39) | Component action; summarized at the linked primary definition. | [QGraphicsItemGroup](https://doc.qt.io/qt-6/qgraphicsitemgroup.html); [QGraphicsScene](https://doc.qt.io/qt-6/qgraphicsscene.html) |
