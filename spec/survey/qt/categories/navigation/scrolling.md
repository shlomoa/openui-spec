# Scrolling

[Page navigation and scrolling](README.md) · [Catalog index](../../README.md)

Move between pages or through content within a region. The entries below describe scrolling in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qscrollarea"></a> `QScrollArea` | Scrollable container | **Purpose:** Make an oversized content region accessible within limited space.<br><br>**Appearance:** A viewport, optionally framed, with horizontal or vertical scroll bars according to policy.<br><br>**Contents:** One content widget, which can itself contain an image or a collection of nested controls.<br><br>**Behavior:** Scrolling changes the visible portion of the content. The content may retain its size or resize with the viewport. Scroll bars can appear as needed or follow an explicit visibility policy. | [QScrollArea](https://doc.qt.io/qt-6/qscrollarea.html) |
| <a id="qscrollbar"></a> `QScrollBar` | Scroll position control | **Purpose:** Show and change the current position within a larger document or region.<br><br>**Appearance:** A horizontal or vertical track with a thumb; arrows and other details vary by platform.<br><br>**Contents:** A movable thumb, track areas, and sometimes step buttons.<br><br>**Behavior:** Dragging jumps through the content; track clicks and keys move by steps or pages. Thumb position indicates location and its size can indicate the visible fraction. It does not itself contain the scrolled content. | [QScrollBar](https://doc.qt.io/qt-6/qscrollbar.html) |
| <a id="qscroller"></a> `QScroller` | Kinetic scrolling | **Purpose:** Provide momentum-based movement through scrollable content.<br><br>**Appearance:** No separate control; its visible result is smooth movement in an existing viewport.<br><br>**Contents:** No visual child content; it operates on the target's existing scrollable content.<br><br>**Behavior:** A configured flick or drag starts motion that continues and decelerates after release. Further input can interrupt it. Friction, overshoot, and other motion characteristics are configurable. | [QScroller](https://doc.qt.io/qt-6/qscroller.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QScrollArea | Scrollable container | [B21 Scroll or pan a viewport](../../behaviors/navigation/viewport.md#b21); [B23 Reveal a target in a viewport](../../behaviors/navigation/viewport.md#b23) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qscrollarea) |
| QScrollBar | Scroll position control | [B21 Scroll or pan a viewport](../../behaviors/navigation/viewport.md#b21) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qscrollbar) |
| QScroller | Kinetic scrolling | [B21 Scroll or pan a viewport](../../behaviors/navigation/viewport.md#b21); [B22 Continue and interrupt kinetic scrolling](../../behaviors/navigation/viewport.md#b22) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qscroller) |
