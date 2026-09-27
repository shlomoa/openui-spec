# Contextual help

[Status help and interaction feedback](README.md) · [Catalog index](../../README.md)

Communicate state, explain controls, and make interaction targets visible. The entries below describe contextual help in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qtooltip"></a> `QToolTip` | Tooltip | **Purpose:** Give a brief explanation of a control or content item.<br><br>**Appearance:** A small transient text popup near its target, styled by the application theme.<br><br>**Contents:** Short plain or formatted text; rich text may wrap.<br><br>**Behavior:** Typically appears after hovering or when the application requests it, then disappears when no longer relevant or after a timeout. It explains the target without becoming a persistent panel. | [QToolTip](https://doc.qt.io/qt-6/qtooltip.html) |
| <a id="qwhatsthis"></a> `QWhatsThis` | Contextual help popup | **Purpose:** Provide more detailed contextual guidance for a specific control.<br><br>**Appearance:** A temporary help popup associated with the target.<br><br>**Contents:** Plain or rich explanatory text and, when supplied, images or links.<br><br>**Behavior:** Users request help through a help mode or typically Shift+F1 on a focused control. Choosing a target shows its explanation; another action or Escape dismisses help or leaves the mode. | [QWhatsThis](https://doc.qt.io/qt-6/qwhatsthis.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QToolTip | Tooltip | [B02 Disclose and retire transient content](../../behaviors/presence/disclosure.md#b02); [B35 Present contextual or host feedback](../../behaviors/feedback/delivery.md#b35) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qtooltip) |
| QWhatsThis | Contextual help popup | [B02 Disclose and retire transient content](../../behaviors/presence/disclosure.md#b02); [B35 Present contextual or host feedback](../../behaviors/feedback/delivery.md#b35) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qwhatsthis) |
