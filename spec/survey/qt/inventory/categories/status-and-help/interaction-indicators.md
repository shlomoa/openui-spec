# Interaction indicators

[Status help and interaction feedback](README.md) · [Catalog index](../../README.md)

Communicate state, explain controls, and make interaction targets visible. The entries below describe interaction indicators in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qfocusframe"></a> `QFocusFrame` | Focus outline | **Purpose:** Make the current keyboard target visually identifiable.<br><br>**Appearance:** A style-dependent outline around a control, potentially extending beyond its normal painted area.<br><br>**Contents:** The focus decoration only; the control's contents remain separate.<br><br>**Behavior:** When attached, it follows the target's position and size. The style or application determines when it appears. It communicates focus rather than supplying an independent action. | [QFocusFrame](https://doc.qt.io/qt-6/qfocusframe.html) |
| <a id="qrubberband"></a> `QRubberBand` | Selection or boundary outline | **Purpose:** Preview a selection area or a proposed boundary during interaction.<br><br>**Appearance:** A rectangular or line-shaped outline or translucent band, depending on style.<br><br>**Contents:** No independent content; it marks an area over existing content.<br><br>**Behavior:** The application moves and resizes it during a drag, then usually hides it on release. It only shows the boundary; selecting objects or committing a new size is handled separately. | [QRubberBand](https://doc.qt.io/qt-6/qrubberband.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QFocusFrame | Focus outline | Appearance/layout/passive output only at this boundary; no additional response assigned | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qfocusframe) |
| QRubberBand | Selection or boundary outline | Appearance/layout/passive output only at this boundary; no additional response assigned | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qrubberband) |
