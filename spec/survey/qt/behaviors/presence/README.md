# Presence and disclosure

[Behavior index](../README.md) · [Hierarchy proposal](../../BEHAVIOR_TAXONOMY_PROPOSAL.md)

Control whether and how much content is exposed. Definitions and proposed contracts are complete; see the [contract index](../../BEHAVIOR_CONTRACTS.md) and [applicability matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

## Direct objects

All findings in this category have a primary home in a subcategory below.

## Surface presence and transient disclosure

[Detailed definitions](disclosure.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QWidget`, `QDialog`, `QSplashScreen` | [B01 Show, hide and close a surface](disclosure.md#b01) | Component action; summarized at the linked primary definition. | [QWidget](https://doc.qt.io/qt-6/qwidget.html); [QDialog](https://doc.qt.io/qt-6/qdialog.html); [QSplashScreen](https://doc.qt.io/qt-6/qsplashscreen.html) |
| `QMenu`, `QComboBox`, `QToolTip`, `QStatusBar` | [B02 Disclose and retire transient content](disclosure.md#b02) | Shared notion; summarized at the linked primary definition. | [QMenu](https://doc.qt.io/qt-6/qmenu.html); [QComboBox](https://doc.qt.io/qt-6/qcombobox.html); [QToolTip](https://doc.qt.io/qt-6/qtooltip.html); [QStatusBar](https://doc.qt.io/qt-6/qstatusbar.html) |

## Expansion and collapse

[Detailed definitions](expansion.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QTreeView`, `QSplitter` | [B03 Expand and collapse content](expansion.md#b03) | Reuse Collapsible; summarized at the linked primary definition. | [QTreeView](https://doc.qt.io/qt-6/qtreeview.html); [QSplitter](https://doc.qt.io/qt-6/qsplitter.html) |
