# Commands and task progression

[Behavior index](../README.md) · [Hierarchy proposal](../../BEHAVIOR_TAXONOMY_PROPOSAL.md)

Invoke actions and progress or finish tasks. Definitions and proposed contracts are complete; see the [contract index](../../BEHAVIOR_CONTRACTS.md) and [applicability matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

## Direct objects

All findings in this category have a primary home in a subcategory below.

## Command activation

[Detailed definitions](activation.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QPushButton`, `QToolButton`, `QMenu`, `QDialogButtonBox` | [B29 Activate a command](activation.md#b29) | Component action; summarized at the linked primary definition. | [QPushButton](https://doc.qt.io/qt-6/qpushbutton.html); [QToolButton](https://doc.qt.io/qt-6/qtoolbutton.html); [QMenu](https://doc.qt.io/qt-6/qmenu.html); [QDialogButtonBox](https://doc.qt.io/qt-6/qdialogbuttonbox.html) |
| `QPushButton` | [B30 Repeat activation while held](activation.md#b30) | Shared notion; summarized at the linked primary definition. | [QPushButton](https://doc.qt.io/qt-6/qpushbutton.html) |

## Action history

[Detailed definitions](history.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QUndoView`, `QLineEdit`, `QTextEdit` | [B31 Undo or redo recorded changes](history.md#b31) | Component action; summarized at the linked primary definition. | [QUndoView](https://doc.qt.io/qt-6/qundoview.html); [QLineEdit](https://doc.qt.io/qt-6/qlineedit.html); [QTextEdit](https://doc.qt.io/qt-6/qtextedit.html) |

## Task completion and progression

[Detailed definitions](workflow.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QDialog`, `QMessageBox`, `QInputDialog` | [B32 Accept, reject or finish an interaction](workflow.md#b32) | Component action; summarized at the linked primary definition. | [QDialog](https://doc.qt.io/qt-6/qdialog.html); [QMessageBox](https://doc.qt.io/qt-6/qmessagebox.html); [QInputDialog](https://doc.qt.io/qt-6/qinputdialog.html) |
| `QWizard`, `QWizardPage` | [B33 Advance, revisit and branch a workflow](workflow.md#b33) | Component action; summarized at the linked primary definition. | [QWizard](https://doc.qt.io/qt-6/qwizard.html); [QWizardPage](https://doc.qt.io/qt-6/qwizardpage.html) |
| `QProgressDialog` | [B34 Request cancellation of work](workflow.md#b34) | Component action; summarized at the linked primary definition. | [QProgressDialog](https://doc.qt.io/qt-6/qprogressdialog.html) |
