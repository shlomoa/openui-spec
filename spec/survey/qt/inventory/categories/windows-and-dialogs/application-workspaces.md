# Application workspaces

[Windows and dialogs](README.md) · [Catalog index](../../README.md)

Provide application workspaces and focused interaction windows. The entries below describe application workspaces in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qmainwindow"></a> `QMainWindow` | Application main window | **Purpose:** Provide the main workspace of a desktop application.<br><br>**Appearance:** A central content area surrounded by optional menus, toolbars, dock panels, and a status strip.<br><br>**Contents:** One central content container plus application navigation and supporting panels.<br><br>**Behavior:** The central content handles the main task. Configured toolbars and docks can move, hide, or float. Window resizing redistributes space; a multiple-document workspace can occupy the center. | [QMainWindow](https://doc.qt.io/qt-6/qmainwindow.html) |
| <a id="qdockwidget"></a> `QDockWidget` | Dockable panel | **Purpose:** Keep a utility panel near the main work while allowing flexible placement.<br><br>**Appearance:** A titled panel, docked beside central content or floating as a window; title controls depend on configuration.<br><br>**Contents:** A title bar and one content container, which can host many controls.<br><br>**Behavior:** Users may drag, dock, float, close, or rearrange the panel when enabled. Allowed docking areas and available actions can be restricted. The title bar changes with its docked or floating state. | [QDockWidget](https://doc.qt.io/qt-6/qdockwidget.html) |
| <a id="qmdiarea"></a> `QMdiArea` | Multiple-document workspace | **Purpose:** Manage several document windows inside one application region.<br><br>**Appearance:** A workspace with overlapping, tiled, or tabbed document presentations.<br><br>**Contents:** Internal document windows and, in tabbed mode, a document tab strip.<br><br>**Behavior:** Users activate different documents. The workspace supports cascading or tiling windows, switching the active document, and optional tabbed presentation. Each document keeps its own content and state. | [QMdiArea](https://doc.qt.io/qt-6/qmdiarea.html) |
| <a id="qmdisubwindow"></a> `QMdiSubWindow` | Internal document window | **Purpose:** Present one document inside a multiple-document workspace.<br><br>**Appearance:** An internal window with a title bar, content region, and style-dependent frame and window controls.<br><br>**Contents:** One document container, title, and window decorations.<br><br>**Behavior:** Users can activate, move, resize, minimize, maximize, or close it as permitted. Some modes collapse it to its title bar. Movement and resizing can show live content or an outline. | [QMdiSubWindow](https://doc.qt.io/qt-6/qmdisubwindow.html) |
| <a id="qsizegrip"></a> `QSizeGrip` | Window resize handle | **Purpose:** Offer an explicit target for resizing a window.<br><br>**Appearance:** A small corner grip, usually near the lower edge; visibility and markings vary by platform.<br><br>**Contents:** Only the resize affordance, often integrated into a status bar or dialog corner.<br><br>**Behavior:** Dragging resizes its containing window or subwindow within size constraints. Some platforms hide it when maximized or fullscreen, and some styles do not display it in ordinary windows. | [QSizeGrip](https://doc.qt.io/qt-6/qsizegrip.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QMainWindow | Application main window | [B27 Dock, float or rearrange panels](../../behaviors/geometry/placement.md#b27) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qmainwindow) |
| QDockWidget | Dockable panel | [B01 Show, hide and close a surface](../../behaviors/presence/disclosure.md#b01); [B25 Move or reorder within a surface](../../behaviors/geometry/movement.md#b25); [B27 Dock, float or rearrange panels](../../behaviors/geometry/placement.md#b27) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qdockwidget) |
| QMdiArea | Multiple-document workspace | [B18 Switch the current content region](../../behaviors/navigation/content.md#b18); [B37 Change a window presentation state](../../behaviors/geometry/placement.md#b37) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qmdiarea) |
| QMdiSubWindow | Internal document window | [B01 Show, hide and close a surface](../../behaviors/presence/disclosure.md#b01); [B03 Expand and collapse content](../../behaviors/presence/expansion.md#b03); [B24 Resize a target or adjacent panes](../../behaviors/geometry/sizing.md#b24); [B25 Move or reorder within a surface](../../behaviors/geometry/movement.md#b25); [B37 Change a window presentation state](../../behaviors/geometry/placement.md#b37) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qmdisubwindow) |
| QSizeGrip | Window resize handle | [B24 Resize a target or adjacent panes](../../behaviors/geometry/sizing.md#b24) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qsizegrip) |
