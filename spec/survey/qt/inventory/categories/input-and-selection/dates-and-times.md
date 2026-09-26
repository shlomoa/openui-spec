# Dates and times

[Input and selection](README.md) · [Catalog index](../../README.md)

Enter values or choose among alternatives. The entries below describe dates and times in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qdateedit"></a> `QDateEdit` | Date field | **Purpose:** Enter a calendar date.<br><br>**Appearance:** A compact field divided into date sections, with step controls or an optional calendar popup.<br><br>**Contents:** Day, month, and year in the configured display order.<br><br>**Behavior:** Users type or step through date sections; an enabled popup supports calendar selection. The allowed date range restricts choices. Display format controls which sections are shown and their order. | [QDateEdit](https://doc.qt.io/qt-6/qdateedit.html); [Date-field behavior](https://doc.qt.io/qt-6/qdatetimeedit.html) |
| <a id="qtimeedit"></a> `QTimeEdit` | Time field | **Purpose:** Enter a time of day.<br><br>**Appearance:** A compact field divided into time sections with step controls.<br><br>**Contents:** Hours, minutes, and optional seconds or AM/PM text according to the format.<br><br>**Behavior:** Typing and stepping adjust the selected section within the allowed time range. The displayed format can use a 12-hour or 24-hour convention. | [QTimeEdit](https://doc.qt.io/qt-6/qtimeedit.html); [Time-field behavior](https://doc.qt.io/qt-6/qdatetimeedit.html) |
| <a id="qdatetimeedit"></a> `QDateTimeEdit` | Date and time field | **Purpose:** Enter a combined date and time.<br><br>**Appearance:** A field with separately editable date and time sections and step controls.<br><br>**Contents:** Configured date and time fields, with an optional calendar popup for the date.<br><br>**Behavior:** Users move between sections, type, or step values. Bounds constrain the combined value. Calendar selection can update the date; value changes may be applied during typing or after editing. | [QDateTimeEdit](https://doc.qt.io/qt-6/qdatetimeedit.html) |
| <a id="qcalendarwidget"></a> `QCalendarWidget` | Calendar date picker | **Purpose:** Select a day while seeing its monthly context.<br><br>**Appearance:** A month grid with a selected-day highlight and optional grid lines and week numbers.<br><br>**Contents:** Day cells, weekday headings, month and year navigation, and optional date-specific formatting.<br><br>**Behavior:** Users navigate months and choose a date by pointer or keyboard. Minimum and maximum dates limit selection; a display-only configuration can disable user selection. Locale affects the week's starting day. | [QCalendarWidget](https://doc.qt.io/qt-6/qcalendarwidget.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QDateEdit | Date field | [B15 Adjust a bounded value](../../behaviors/entry/values.md#b15); [B16 Constrain and validate input](../../behaviors/entry/values.md#b16) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qdateedit) |
| QTimeEdit | Time field | [B15 Adjust a bounded value](../../behaviors/entry/values.md#b15); [B16 Constrain and validate input](../../behaviors/entry/values.md#b16) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qtimeedit) |
| QDateTimeEdit | Date and time field | [B15 Adjust a bounded value](../../behaviors/entry/values.md#b15); [B16 Constrain and validate input](../../behaviors/entry/values.md#b16) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qdatetimeedit) |
| QCalendarWidget | Calendar date picker | [B08 Change a checked or chosen value](../../behaviors/selection/choice.md#b08); [B16 Constrain and validate input](../../behaviors/entry/values.md#b16); [B18 Switch the current content region](../../behaviors/navigation/content.md#b18) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qcalendarwidget) |
