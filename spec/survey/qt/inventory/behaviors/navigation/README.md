# Content navigation and viewports

[Behavior index](../README.md) · [Hierarchy proposal](../../BEHAVIOR_TAXONOMY_PROPOSAL.md)

Change explored content or which portion is visible. Definitions and proposed contracts are complete; see the [contract index](../../BEHAVIOR_CONTRACTS.md) and [applicability matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

## Direct objects

All findings in this category have a primary home in a subcategory below.

## Content and location navigation

[Detailed definitions](content.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QStackedWidget`, `QTabWidget`, `QToolBox` | [B18 Switch the current content region](content.md#b18) | Shared behavior candidate; summarized at the linked primary definition. | [QStackedWidget](https://doc.qt.io/qt-6/qstackedwidget.html); [QTabWidget](https://doc.qt.io/qt-6/qtabwidget.html); [QToolBox](https://doc.qt.io/qt-6/qtoolbox.html) |
| `QColumnView`, `QFileDialog`, `QTreeView` | [B19 Navigate a hierarchy or resource location](content.md#b19) | Component action; summarized at the linked primary definition. | [QColumnView](https://doc.qt.io/qt-6/qcolumnview.html); [QFileDialog](https://doc.qt.io/qt-6/qfiledialog.html); [QTreeView](https://doc.qt.io/qt-6/qtreeview.html) |
| `QTextBrowser`, `QLabel` | [B20 Follow links and document history](content.md#b20) | Component action; summarized at the linked primary definition. | [QTextBrowser](https://doc.qt.io/qt-6/qtextbrowser.html); [QLabel](https://doc.qt.io/qt-6/qlabel.html) |

## Viewport movement

[Detailed definitions](viewport.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QScrollArea`, `QScrollBar`, `QGraphicsView` | [B21 Scroll or pan a viewport](viewport.md#b21) | New leaf candidate; summarized at the linked primary definition. | [QScrollArea](https://doc.qt.io/qt-6/qscrollarea.html); [QScrollBar](https://doc.qt.io/qt-6/qscrollbar.html); [QGraphicsView](https://doc.qt.io/qt-6/qgraphicsview.html) |
| `QScroller` | [B22 Continue and interrupt kinetic scrolling](viewport.md#b22) | Shared behavior candidate; summarized at the linked primary definition. | [QScroller](https://doc.qt.io/qt-6/qscroller.html) |
| `QScrollArea` | [B23 Reveal a target in a viewport](viewport.md#b23) | Shared notion; summarized at the linked primary definition. | [QScrollArea](https://doc.qt.io/qt-6/qscrollarea.html) |

## Collection ordering and filtering

[Detailed definitions](collections.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QTableView`, `QTreeView`, `QFileDialog`, `QFontComboBox` | [B38 Sort or filter a presented collection](collections.md#b38) | Component action; summarized at the linked primary definition. | [QTableView](https://doc.qt.io/qt-6/qtableview.html); [QTreeView](https://doc.qt.io/qt-6/qtreeview.html); [QFileDialog](https://doc.qt.io/qt-6/qfiledialog.html); [QFontComboBox](https://doc.qt.io/qt-6/qfontcombobox.html) |
