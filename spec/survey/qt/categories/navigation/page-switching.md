# Page switching

[Page navigation and scrolling](README.md) · [Catalog index](../../README.md)

Move between pages or through content within a region. The entries below describe page switching in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qtabbar"></a> `QTabBar` | Tab strip | **Purpose:** Choose among named pages or views.<br><br>**Appearance:** A row or column of tabs with a visibly active tab.<br><br>**Contents:** Tab labels, optional icons, tooltips, close buttons, or other tab controls.<br><br>**Behavior:** Selecting a tab changes the current choice; the surrounding application connects it to content. Tabs can be disabled, and optional dragging reorders them. Overflow may use scrolling controls or shortened labels. | [QTabBar](https://doc.qt.io/qt-6/qtabbar.html) |
| <a id="qtabwidget"></a> `QTabWidget` | Tabbed container | **Purpose:** Combine named navigation with a set of content pages.<br><br>**Appearance:** A tab strip along an edge of a framed page area.<br><br>**Contents:** Tabs with text or icons and one content container per tab.<br><br>**Behavior:** Selecting a tab displays its page and hides the others. Pages can contain arbitrary controls. Optional closable or movable tabs expose requests and rearrangement; the application determines what closing means. | [QTabWidget](https://doc.qt.io/qt-6/qtabwidget.html) |
| <a id="qtoolbox"></a> `QToolBox` | Vertical tabbed container | **Purpose:** Switch among vertically listed groups of controls.<br><br>**Appearance:** A column of labeled tabs with the active page immediately beneath its tab.<br><br>**Contents:** Tab text, optional icons and help text, and a content page for each tab.<br><br>**Behavior:** Selecting an enabled tab changes the displayed page. One page is current at a time. Individual pages can be disabled. Selecting another tab replaces the previously displayed page. | [QToolBox](https://doc.qt.io/qt-6/qtoolbox.html) |
| <a id="qstackedwidget"></a> `QStackedWidget` | Page stack | **Purpose:** Reuse one region for alternative content pages.<br><br>**Appearance:** The appearance of the currently selected page, without a built-in tab strip or page selector.<br><br>**Contents:** Multiple page containers, each with its own controls or content.<br><br>**Behavior:** The application chooses which page is visible, often in response to an external list, button, or dropdown. Other pages remain hidden until selected. | [QStackedWidget](https://doc.qt.io/qt-6/qstackedwidget.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QTabBar | Tab strip | [B08 Change a checked or chosen value](../../behaviors/selection/choice.md#b08); [B18 Switch the current content region](../../behaviors/navigation/content.md#b18); [B25 Move or reorder within a surface](../../behaviors/geometry/movement.md#b25) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qtabbar) |
| QTabWidget | Tabbed container | [B01 Show, hide and close a surface](../../behaviors/presence/disclosure.md#b01); [B18 Switch the current content region](../../behaviors/navigation/content.md#b18); [B25 Move or reorder within a surface](../../behaviors/geometry/movement.md#b25) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qtabwidget) |
| QToolBox | Vertical tabbed container | [B07 Enforce interaction availability](../../behaviors/governance/availability.md#b07); [B18 Switch the current content region](../../behaviors/navigation/content.md#b18) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qtoolbox) |
| QStackedWidget | Page stack | [B18 Switch the current content region](../../behaviors/navigation/content.md#b18) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qstackedwidget) |
