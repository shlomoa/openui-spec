# Visual effects

[Catalog index](../../README.md)

Modify the appearance of existing content. This category contains 4 entries.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qgraphicsblureffect"></a> `QGraphicsBlurEffect` | Blur treatment | **Purpose:** Soften an element's detail, for example to reduce its visual emphasis.<br><br>**Appearance:** The source appears blurred; greater radius produces a softer result.<br><br>**Contents:** The existing visual source; no separate controls or content.<br><br>**Behavior:** Changing the radius changes the blur. The application decides when to apply or animate it. Blur does not itself indicate that a control is disabled or prevent interaction. | [QGraphicsBlurEffect](https://doc.qt.io/qt-6/qgraphicsblureffect.html) |
| <a id="qgraphicscolorizeeffect"></a> `QGraphicsColorizeEffect` | Color tint treatment | **Purpose:** Tint existing content toward a selected color.<br><br>**Appearance:** The source keeps its form while its colors acquire a uniform tint.<br><br>**Contents:** The existing visual source, a target tint, and an effect strength.<br><br>**Behavior:** Changing strength blends between the unmodified and colorized appearance. The application defines any meaning, such as highlighting; the effect does not independently change the source's state. | [QGraphicsColorizeEffect](https://doc.qt.io/qt-6/qgraphicscolorizeeffect.html) |
| <a id="qgraphicsdropshadoweffect"></a> `QGraphicsDropShadowEffect` | Drop shadow treatment | **Purpose:** Separate an element visually from its background or suggest depth.<br><br>**Appearance:** An offset shadow following the source's shape, with configurable softness and color.<br><br>**Contents:** The original content and its generated shadow.<br><br>**Behavior:** Offset, blur, and color change the apparent depth and direction. The effect follows the source's appearance; it does not introduce a separate draggable or clickable object. | [QGraphicsDropShadowEffect](https://doc.qt.io/qt-6/qgraphicsdropshadoweffect.html) |
| <a id="qgraphicsopacityeffect"></a> `QGraphicsOpacityEffect` | Opacity treatment | **Purpose:** Make existing content partly transparent or support a fade.<br><br>**Appearance:** Underlying content shows through the source; full transparency makes it invisible.<br><br>**Contents:** The existing visual source and an optional mask controlling transparency across it.<br><br>**Behavior:** Opacity ranges from transparent to opaque. Fading requires the application to vary the value over time. Transparency changes rendering; hiding, disabling, or click-through behavior must be handled separately. | [QGraphicsOpacityEffect](https://doc.qt.io/qt-6/qgraphicsopacityeffect.html) |

## Related categories

- [Graphics surfaces and content](../graphics/README.md)
- [Status help and interaction feedback](../status-and-help/README.md)

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QGraphicsBlurEffect | Blur treatment | Appearance/layout/passive output only at this boundary; no additional response assigned | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qgraphicsblureffect) |
| QGraphicsColorizeEffect | Color tint treatment | Appearance/layout/passive output only at this boundary; no additional response assigned | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qgraphicscolorizeeffect) |
| QGraphicsDropShadowEffect | Drop shadow treatment | Appearance/layout/passive output only at this boundary; no additional response assigned | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qgraphicsdropshadoweffect) |
| QGraphicsOpacityEffect | Opacity treatment | Appearance/layout/passive output only at this boundary; no additional response assigned | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qgraphicsopacityeffect) |
