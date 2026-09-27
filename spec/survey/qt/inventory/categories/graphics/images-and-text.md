# Images and text

[Graphics surfaces and content](README.md) · [Catalog index](../../README.md)

Present visual scenes, graphical elements, and their composition. The entries below describe images and text in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qgraphicspixmapitem"></a> `QGraphicsPixmapItem` | Raster image | **Purpose:** Place a raster image in graphical content.<br><br>**Appearance:** A bitmap image, possibly with transparent areas and transformed size or orientation.<br><br>**Contents:** One image and its placement within the item.<br><br>**Behavior:** Participates in scene transformations and optional selection or movement. Scaling can favor speed or smoother display. Hit detection can consider transparency; no image-editing tools are built in. | [QGraphicsPixmapItem](https://doc.qt.io/qt-6/qgraphicspixmapitem.html); [Shared graphics interaction](https://doc.qt.io/qt-6/qgraphicsitem.html) |
| <a id="qgraphicssimpletextitem"></a> `QGraphicsSimpleTextItem` | Simple graphics label | **Purpose:** Label objects or locations within a graphical scene.<br><br>**Appearance:** Simple text with a chosen font, fill, and optional outline.<br><br>**Contents:** A plain text string; it does not contain a rich-text document.<br><br>**Behavior:** The application changes the label and style. It can participate in optional item selection and movement, but does not supply an interactive text editor. | [QGraphicsSimpleTextItem](https://doc.qt.io/qt-6/qgraphicssimpletextitem.html); [Shared graphics interaction](https://doc.qt.io/qt-6/qgraphicsitem.html) |
| <a id="qgraphicstextitem"></a> `QGraphicsTextItem` | Rich graphics text | **Purpose:** Show formatted text or an editable text region inside a scene.<br><br>**Appearance:** Text laid out with configured width, font, and document formatting.<br><br>**Contents:** Plain or rich text, including supported document content and links.<br><br>**Behavior:** Normally presents text; configured interaction can enable selection, links, or editing with a caret. Width affects wrapping. Movement and other scene interactions depend on the item's setup. | [QGraphicsTextItem](https://doc.qt.io/qt-6/qgraphicstextitem.html); [Shared graphics interaction](https://doc.qt.io/qt-6/qgraphicsitem.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QGraphicsPixmapItem | Raster image | [B10 Select collection or scene items](../../behaviors/selection/collections.md#b10); [B25 Move or reorder within a surface](../../behaviors/geometry/movement.md#b25); [B28 Transform graphical content](../../behaviors/geometry/placement.md#b28) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qgraphicspixmapitem) |
| QGraphicsSimpleTextItem | Simple graphics label | [B10 Select collection or scene items](../../behaviors/selection/collections.md#b10); [B25 Move or reorder within a surface](../../behaviors/geometry/movement.md#b25); [B28 Transform graphical content](../../behaviors/geometry/placement.md#b28) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qgraphicssimpletextitem) |
| QGraphicsTextItem | Rich graphics text | [B10 Select collection or scene items](../../behaviors/selection/collections.md#b10); [B12 Edit text and transfer clipboard content](../../behaviors/entry/editing.md#b12); [B20 Follow links and document history](../../behaviors/navigation/content.md#b20); [B25 Move or reorder within a surface](../../behaviors/geometry/movement.md#b25); [B40 Select a text range](../../behaviors/entry/editing.md#b40) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qgraphicstextitem) |
