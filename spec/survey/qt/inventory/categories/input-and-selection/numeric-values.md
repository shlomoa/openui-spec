# Numeric values

[Input and selection](README.md) · [Catalog index](../../README.md)

Enter values or choose among alternatives. The entries below describe numeric values in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qspinbox"></a> `QSpinBox` | Integer stepper | **Purpose:** Enter a whole-number quantity precisely.<br><br>**Appearance:** A numeric field with increase and decrease controls.<br><br>**Contents:** An integer, optional prefix or suffix such as a unit, and optional special text for a boundary value.<br><br>**Behavior:** Users type or step with buttons and keyboard. A minimum, maximum, and step size constrain changes. Optional wrapping moves from one end of the range to the other. | [QSpinBox](https://doc.qt.io/qt-6/qspinbox.html) |
| <a id="qdoublespinbox"></a> `QDoubleSpinBox` | Decimal stepper | **Purpose:** Enter a quantity with fractional precision.<br><br>**Appearance:** A numeric field with decimal digits and step controls.<br><br>**Contents:** A decimal value, optional unit or currency text, and optional special-value text.<br><br>**Behavior:** Supports typing and stepping within a configured range. Values are rounded to the displayed precision. Step size and optional wrapping control adjustment at the range boundaries. | [QDoubleSpinBox](https://doc.qt.io/qt-6/qdoublespinbox.html) |
| <a id="qslider"></a> `QSlider` | Linear value slider | **Purpose:** Adjust a bounded value quickly by position.<br><br>**Appearance:** A horizontal or vertical track with a movable handle and optional tick marks.<br><br>**Contents:** A handle, track, and optional scale ticks; a numeric label is not automatically included.<br><br>**Behavior:** Dragging, keyboard input, or the wheel changes an integer value. Updates may occur during dragging or on release. Fine selection becomes harder when the range is large relative to the track. | [QSlider](https://doc.qt.io/qt-6/qslider.html) |
| <a id="qdial"></a> `QDial` | Rotary value control | **Purpose:** Adjust a bounded or cyclic value using a rotary control.<br><br>**Appearance:** A circular knob with a position indicator and optional notches.<br><br>**Contents:** A dial face, indicator, and optional scale marks.<br><br>**Behavior:** Dragging, keyboard input, or the wheel changes the value. Wrapping can allow continuous movement across the endpoint; otherwise the value stops at the limits. Updates during dragging are configurable. | [QDial](https://doc.qt.io/qt-6/qdial.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QSpinBox | Integer stepper | [B15 Adjust a bounded value](../../behaviors/entry/values.md#b15); [B16 Constrain and validate input](../../behaviors/entry/values.md#b16) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qspinbox) |
| QDoubleSpinBox | Decimal stepper | [B15 Adjust a bounded value](../../behaviors/entry/values.md#b15); [B16 Constrain and validate input](../../behaviors/entry/values.md#b16) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qdoublespinbox) |
| QSlider | Linear value slider | [B15 Adjust a bounded value](../../behaviors/entry/values.md#b15) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qslider) |
| QDial | Rotary value control | [B15 Adjust a bounded value](../../behaviors/entry/values.md#b15) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qdial) |
