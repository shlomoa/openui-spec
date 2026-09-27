# Feedback delivery and suppression

[Behavior index](../README.md) · [Hierarchy proposal](../../BEHAVIOR_TAXONOMY_PROPOSAL.md)

Present or suppress messages rather than merely style them. Definitions and proposed contracts are complete; see the [contract index](../../BEHAVIOR_CONTRACTS.md) and [applicability matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

## Direct objects

All findings in this category have a primary home in a subcategory below.

## Message and help delivery

[Detailed definitions](delivery.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QStatusBar`, `QWhatsThis`, `QSystemTrayIcon` | [B35 Present contextual or host feedback](delivery.md#b35) | Component action; summarized at the linked primary definition. | [QStatusBar](https://doc.qt.io/qt-6/qstatusbar.html); [QWhatsThis](https://doc.qt.io/qt-6/qwhatsthis.html); [QSystemTrayIcon](https://doc.qt.io/qt-6/qsystemtrayicon.html) |

## Repeated-message suppression

[Detailed definitions](suppression.md)

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QErrorMessage` | [B36 Suppress repeated messages](suppression.md#b36) | Component action; summarized at the linked primary definition. | [QErrorMessage](https://doc.qt.io/qt-6/qerrormessage.html) |
