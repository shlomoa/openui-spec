# Entry and value change

[Behavior index](../README.md) · [Hierarchy proposal](../../BEHAVIOR_TAXONOMY_PROPOSAL.md)

Capture, assist or constrain user-authored values. Definitions and proposed contracts are complete; see the [contract index](../../BEHAVIOR_CONTRACTS.md) and [applicability matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

## Direct objects

All findings in this category have a primary home in a subcategory below.

## Text editing and shortcut capture

[Detailed definitions](editing.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QLineEdit`, `QPlainTextEdit`, `QTextEdit`, `QGraphicsTextItem` | [B12 Edit text and transfer clipboard content](editing.md#b12) | Component action; summarized at the linked primary definition. | [QLineEdit](https://doc.qt.io/qt-6/qlineedit.html); [QPlainTextEdit](https://doc.qt.io/qt-6/qplaintextedit.html); [QTextEdit](https://doc.qt.io/qt-6/qtextedit.html); [QGraphicsTextItem](https://doc.qt.io/qt-6/qgraphicstextitem.html) |
| `QKeySequenceEdit` | [B13 Capture a shortcut sequence](editing.md#b13) | Component action; summarized at the linked primary definition. | [QKeySequenceEdit](https://doc.qt.io/qt-6/qkeysequenceedit.html) |
| `QLineEdit`, `QTextEdit`, `QLabel`, `QTextBrowser` | [B40 Select a text range](editing.md#b40) | Component action; summarized at the linked primary definition. | [QLineEdit](https://doc.qt.io/qt-6/qlineedit.html); [QTextEdit](https://doc.qt.io/qt-6/qtextedit.html); [QLabel](https://doc.qt.io/qt-6/qlabel.html); [QTextBrowser](https://doc.qt.io/qt-6/qtextbrowser.html) |

## Entry assistance

[Detailed definitions](assistance.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QCompleter` | [B14 Offer and accept text completion](assistance.md#b14) | Existing draft candidate; summarized at the linked primary definition. | [QCompleter](https://doc.qt.io/qt-6/qcompleter.html) |

## Value adjustment, validation and preview

[Detailed definitions](values.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QSpinBox`, `QDoubleSpinBox`, `QSlider`, `QDial`, `QDateTimeEdit` | [B15 Adjust a bounded value](values.md#b15) | Component action; summarized at the linked primary definition. | [QSpinBox](https://doc.qt.io/qt-6/qspinbox.html); [QDoubleSpinBox](https://doc.qt.io/qt-6/qdoublespinbox.html); [QSlider](https://doc.qt.io/qt-6/qslider.html); [QDial](https://doc.qt.io/qt-6/qdial.html); [QDateTimeEdit](https://doc.qt.io/qt-6/qdatetimeedit.html) |
| `QLineEdit`, `QSpinBox`, `QDateTimeEdit`, `QWizardPage` | [B16 Constrain and validate input](values.md#b16) | Shared notion; summarized at the linked primary definition. | [QLineEdit](https://doc.qt.io/qt-6/qlineedit.html); [QSpinBox](https://doc.qt.io/qt-6/qspinbox.html); [QDateTimeEdit](https://doc.qt.io/qt-6/qdatetimeedit.html); [QWizardPage](https://doc.qt.io/qt-6/qwizardpage.html) |
| `QColorDialog`, `QFontDialog` | [B17 Preview a value before completion](values.md#b17) | Component action; summarized at the linked primary definition. | [QColorDialog](https://doc.qt.io/qt-6/qcolordialog.html); [QFontDialog](https://doc.qt.io/qt-6/qfontdialog.html) |
