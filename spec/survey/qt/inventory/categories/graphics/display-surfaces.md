# Display surfaces

[Graphics surfaces and content](README.md) · [Catalog index](../../README.md)

Present visual scenes, graphical elements, and their composition. The entries below describe display surfaces in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qgraphicsview"></a> `QGraphicsView` | Interactive graphics viewport | **Purpose:** Display and explore a scene of graphical objects.<br><br>**Appearance:** A viewport, optionally framed and scrollable, showing all or part of a scene.<br><br>**Contents:** The scene's shapes, images, text, and graphical controls.<br><br>**Behavior:** Forwards interaction to scene items. Configured drag modes can pan or select. The application can add zoom and rotation controls; these transformations are supported but no universal zoom toolbar is built in. | [QGraphicsView](https://doc.qt.io/qt-6/qgraphicsview.html) |
| <a id="qrhiwidget"></a> `QRhiWidget` | Custom graphics surface | **Purpose:** Present application-defined graphics, including 3D content, within a regular UI.<br><br>**Appearance:** A rectangular rendered surface whose imagery is supplied by the application.<br><br>**Contents:** Custom rendered content; no predefined scene, camera controls, or editing handles.<br><br>**Behavior:** Content can redraw and adapt to the surface size. Any rotation, zoom, selection, animation, or other interaction must be provided by the application; the surface does not define those behaviors. | [QRhiWidget](https://doc.qt.io/qt-6/qrhiwidget.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QGraphicsView | Interactive graphics viewport | [B10 Select collection or scene items](../../behaviors/selection/collections.md#b10); [B11 Select by a spatial region](../../behaviors/selection/collections.md#b11); [B21 Scroll or pan a viewport](../../behaviors/navigation/viewport.md#b21); [B28 Transform graphical content](../../behaviors/geometry/placement.md#b28) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qgraphicsview) |
| QRhiWidget | Custom graphics surface | Appearance/layout/passive output only at this boundary; no additional response assigned | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qrhiwidget) |
