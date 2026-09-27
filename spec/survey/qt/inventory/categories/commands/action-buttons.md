# Action buttons

[Commands](README.md) · [Catalog index](../../README.md)

Invoke actions and expose command collections. The entries below describe action buttons in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qpushbutton"></a> `QPushButton` | Push button | **Purpose:** Invoke an action such as Save, Apply, or Close.<br><br>**Appearance:** Usually a rectangular button with visible pressed, focused, disabled, and sometimes default-action states.<br><br>**Contents:** A short label and optional icon; a popup menu can be attached.<br><br>**Behavior:** Activates through pointer or keyboard input. A default dialog button can respond to Enter. Optional toggle mode retains a checked state; repeat mode repeats while held. | [QPushButton](https://doc.qt.io/qt-6/qpushbutton.html); [Button states](https://doc.qt.io/qt-6/qabstractbutton.html) |
| <a id="qtoolbutton"></a> `QToolButton` | Tool button | **Purpose:** Provide compact access to a tool, command, or related options.<br><br>**Appearance:** Usually a small icon button; may show text, an arrow, or a border on hover.<br><br>**Contents:** An icon or arrow, optional label, and optionally a menu.<br><br>**Behavior:** Activates a command or selects a tool. Can remain checked. Menu variants open immediately, after holding, or through a separate arrow area; disabled and hover states communicate availability. | [QToolButton](https://doc.qt.io/qt-6/qtoolbutton.html) |
| <a id="qcommandlinkbutton"></a> `QCommandLinkButton` | Command choice button | **Purpose:** Offer an explained action, often a choice of next step in a dialog.<br><br>**Appearance:** A broad button with prominent action text, smaller supporting text, and typically an arrow icon.<br><br>**Contents:** An action label, explanatory description, and icon.<br><br>**Behavior:** Activates like a push button. The application can immediately follow the chosen path; the explanatory text helps distinguish alternatives before activation. | [QCommandLinkButton](https://doc.qt.io/qt-6/qcommandlinkbutton.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QPushButton | Push button | [B08 Change a checked or chosen value](../../behaviors/selection/choice.md#b08); [B29 Activate a command](../../behaviors/commands/activation.md#b29); [B30 Repeat activation while held](../../behaviors/commands/activation.md#b30) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qpushbutton) |
| QToolButton | Tool button | [B02 Disclose and retire transient content](../../behaviors/presence/disclosure.md#b02); [B08 Change a checked or chosen value](../../behaviors/selection/choice.md#b08); [B29 Activate a command](../../behaviors/commands/activation.md#b29) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qtoolbutton) |
| QCommandLinkButton | Command choice button | [B29 Activate a command](../../behaviors/commands/activation.md#b29) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qcommandlinkbutton) |
