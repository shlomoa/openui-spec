# Interaction governance

[Behavior index](../README.md) · [Hierarchy proposal](../../BEHAVIOR_TAXONOMY_PROPOSAL.md)

Constrain eligible interaction and keyboard focus. Definitions and proposed contracts are complete; see the [contract index](../../BEHAVIOR_CONTRACTS.md) and [applicability matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

## Direct objects

All findings in this category have a primary home in a subcategory below.

## Modal interaction scope

[Detailed definitions](modality.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QDialog` | [B04 Restrict interaction to a modal scope](modality.md#b04) | New leaf candidate; summarized at the linked primary definition. | [QDialog](https://doc.qt.io/qt-6/qdialog.html) |

## Focus movement and containment

[Detailed definitions](focus.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QWidget`, `QLabel`, `QGroupBox`, `QGraphicsWidget` | [B05 Transfer and traverse focus](focus.md#b05) | Interaction notion; summarized at the linked primary definition. | [QWidget](https://doc.qt.io/qt-6/qwidget.html); [QLabel](https://doc.qt.io/qt-6/qlabel.html); [QGroupBox](https://doc.qt.io/qt-6/qgroupbox.html); [QGraphicsWidget](https://doc.qt.io/qt-6/qgraphicswidget.html) |
| `QDialog` | [B06 Contain and restore modal focus](focus.md#b06) | New leaf candidate; summarized at the linked primary definition. | [QDialog](https://doc.qt.io/qt-6/qdialog.html); [WAI-ARIA dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) |

## Availability and editing restrictions

[Detailed definitions](availability.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QWidget`, `QGroupBox`, `QLineEdit` | [B07 Enforce interaction availability](availability.md#b07) | Shared notion; summarized at the linked primary definition. | [QWidget](https://doc.qt.io/qt-6/qwidget.html); [QGroupBox](https://doc.qt.io/qt-6/qgroupbox.html); [QLineEdit](https://doc.qt.io/qt-6/qlineedit.html) |
