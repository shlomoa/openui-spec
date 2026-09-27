# Command collections

[Commands](README.md) · [Catalog index](../../README.md)

Invoke actions and expose command collections. The entries below describe command collections in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qmenu"></a> `QMenu` | Popup menu | **Purpose:** Present commands or choices near the place where they are needed.<br><br>**Appearance:** A popup list, commonly vertical, with highlighted and disabled entries.<br><br>**Contents:** Action labels, optional icons and shortcuts, checkable entries, separators, submenus, and possibly embedded controls.<br><br>**Behavior:** Opens from a menu bar, button, or context action. Users navigate and activate an entry or dismiss the menu. Submenus expose further choices; checkable actions display their state. | [QMenu](https://doc.qt.io/qt-6/qmenu.html) |
| <a id="qmenubar"></a> `QMenuBar` | Menu bar | **Purpose:** Provide a stable entry point to application command groups.<br><br>**Appearance:** A horizontal row of menu titles, either inside the window or in the desktop's global menu area.<br><br>**Contents:** Menu titles and associated popup menus; applications may also add direct actions.<br><br>**Behavior:** Pointer or keyboard activation opens a menu. Placement, shortcuts, and menu merging follow platform conventions, so the same application can look different across desktops. | [QMenuBar](https://doc.qt.io/qt-6/qmenubar.html) |
| <a id="qtoolbar"></a> `QToolBar` | Toolbar | **Purpose:** Keep frequent commands and small controls readily accessible.<br><br>**Appearance:** A horizontal or vertical strip, potentially with a drag handle and overflow button.<br><br>**Contents:** Tool buttons, separators, and embedded controls such as dropdowns or numeric fields.<br><br>**Behavior:** Buttons invoke commands. Where permitted, the bar moves between docking areas or floats. An overflow menu exposes actions that do not fit in the available space. | [QToolBar](https://doc.qt.io/qt-6/qtoolbar.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QMenu | Popup menu | [B02 Disclose and retire transient content](../../behaviors/presence/disclosure.md#b02); [B08 Change a checked or chosen value](../../behaviors/selection/choice.md#b08); [B29 Activate a command](../../behaviors/commands/activation.md#b29) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qmenu) |
| QMenuBar | Menu bar | [B02 Disclose and retire transient content](../../behaviors/presence/disclosure.md#b02); [B29 Activate a command](../../behaviors/commands/activation.md#b29) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qmenubar) |
| QToolBar | Toolbar | [B02 Disclose and retire transient content](../../behaviors/presence/disclosure.md#b02); [B27 Dock, float or rearrange panels](../../behaviors/geometry/placement.md#b27); [B29 Activate a command](../../behaviors/commands/activation.md#b29) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qtoolbar) |
