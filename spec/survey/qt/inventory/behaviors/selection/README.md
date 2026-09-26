# Selection coordination

[Behavior index](../README.md) · [Hierarchy proposal](../../BEHAVIOR_TAXONOMY_PROPOSAL.md)

Change selected values or sets without conflating them with activation. Definitions and proposed contracts are complete; see the [contract index](../../BEHAVIOR_CONTRACTS.md) and [applicability matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

## Direct objects

All findings in this category have a primary home in a subcategory below.

## Choice state and exclusivity

[Detailed definitions](choice.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QCheckBox`, `QComboBox`, `QCalendarWidget` | [B08 Change a checked or chosen value](choice.md#b08) | Component action; summarized at the linked primary definition. | [QCheckBox](https://doc.qt.io/qt-6/qcheckbox.html); [QComboBox](https://doc.qt.io/qt-6/qcombobox.html); [QCalendarWidget](https://doc.qt.io/qt-6/qcalendarwidget.html) |
| `QRadioButton`, `QButtonGroup` | [B09 Coordinate exclusive choices](choice.md#b09) | Shared behavior candidate; summarized at the linked primary definition. | [QRadioButton](https://doc.qt.io/qt-6/qradiobutton.html); [QButtonGroup](https://doc.qt.io/qt-6/qbuttongroup.html) |

## Collection and spatial selection

[Detailed definitions](collections.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QListView`, `QTableView`, `QGraphicsScene` | [B10 Select collection or scene items](collections.md#b10) | Shared notion; summarized at the linked primary definition. | [QListView](https://doc.qt.io/qt-6/qlistview.html); [QTableView](https://doc.qt.io/qt-6/qtableview.html); [QGraphicsScene](https://doc.qt.io/qt-6/qgraphicsscene.html) |
| `QGraphicsView` | [B11 Select by a spatial region](collections.md#b11) | Shared behavior candidate; summarized at the linked primary definition. | [QGraphicsView](https://doc.qt.io/qt-6/qgraphicsview.html) |
