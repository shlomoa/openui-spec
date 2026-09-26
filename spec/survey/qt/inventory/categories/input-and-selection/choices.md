# Choices

[Input and selection](README.md) · [Catalog index](../../README.md)

Enter values or choose among alternatives. The entries below describe choices in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qcheckbox"></a> `QCheckBox` | Checkbox | **Purpose:** Turn an option on or off, or express an intermediate choice.<br><br>**Appearance:** A small square indicator beside a label; checked, unchecked, disabled, and optional partial states.<br><br>**Contents:** A label, optional icon, and state indicator.<br><br>**Behavior:** Pointer or keyboard activation changes the state. Choices are usually independent. An optional third state can represent an indeterminate value or no-change choice, as defined by the application. | [QCheckBox](https://doc.qt.io/qt-6/qcheckbox.html) |
| <a id="qradiobutton"></a> `QRadioButton` | Radio option | **Purpose:** Choose one alternative from a related set.<br><br>**Appearance:** A circular indicator with a filled center for the selected option, next to a label.<br><br>**Contents:** Option text, optional icon, and selected-state indicator.<br><br>**Behavior:** Selecting a different option clears the previous one in the exclusive group. Groups must be coordinated appropriately; an initial selection depends on application setup. | [QRadioButton](https://doc.qt.io/qt-6/qradiobutton.html) |
| <a id="qcombobox"></a> `QComboBox` | Dropdown selector | **Purpose:** Choose a value from a compact list, optionally allowing typed input.<br><br>**Appearance:** A current-value field with a dropdown indicator and an expanded popup list.<br><br>**Contents:** Text and optional icons; the editable variant contains a text editor.<br><br>**Behavior:** Opening the popup allows a new selection. Editable variants accept text and may offer completion or validation. Whether new text is added to the list depends on configuration. | [QComboBox](https://doc.qt.io/qt-6/qcombobox.html) |
| <a id="qfontcombobox"></a> `QFontComboBox` | Font family selector | **Purpose:** Choose a font family while previewing its character.<br><br>**Appearance:** A dropdown whose family names are usually drawn in the represented font.<br><br>**Contents:** Available family names and, when needed, a sample beside a name.<br><br>**Behavior:** Selecting an entry changes the chosen family. The list can be filtered by writing system or font characteristics. Size, weight, and other formatting normally use separate controls. | [QFontComboBox](https://doc.qt.io/qt-6/qfontcombobox.html) |
| <a id="qbuttongroup"></a> `QButtonGroup` | Related button choices | **Purpose:** Coordinate a set of related button choices.<br><br>**Appearance:** No visual surface; the buttons retain their own appearance and placement.<br><br>**Contents:** A logical collection of checkable buttons, such as radio options or toggles.<br><br>**Behavior:** An exclusive group permits only one checked member; selecting another clears the previous selection. A nonexclusive group allows independent states. The grouping itself does not draw a border or arrange the buttons. | [QButtonGroup](https://doc.qt.io/qt-6/qbuttongroup.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QCheckBox | Checkbox | [B08 Change a checked or chosen value](../../behaviors/selection/choice.md#b08) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qcheckbox) |
| QRadioButton | Radio option | [B08 Change a checked or chosen value](../../behaviors/selection/choice.md#b08); [B09 Coordinate exclusive choices](../../behaviors/selection/choice.md#b09) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qradiobutton) |
| QComboBox | Dropdown selector | [B02 Disclose and retire transient content](../../behaviors/presence/disclosure.md#b02); [B08 Change a checked or chosen value](../../behaviors/selection/choice.md#b08); [B12 Edit text and transfer clipboard content](../../behaviors/entry/editing.md#b12); [B14 Offer and accept text completion](../../behaviors/entry/assistance.md#b14); [B16 Constrain and validate input](../../behaviors/entry/values.md#b16) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qcombobox) |
| QFontComboBox | Font family selector | [B02 Disclose and retire transient content](../../behaviors/presence/disclosure.md#b02); [B08 Change a checked or chosen value](../../behaviors/selection/choice.md#b08); [B38 Sort or filter a presented collection](../../behaviors/navigation/collections.md#b38) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qfontcombobox) |
| QButtonGroup | Related button choices | [B08 Change a checked or chosen value](../../behaviors/selection/choice.md#b08); [B09 Coordinate exclusive choices](../../behaviors/selection/choice.md#b09) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qbuttongroup) |
