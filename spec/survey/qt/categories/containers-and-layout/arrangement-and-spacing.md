# Arrangement and spacing

[Containers and layout](README.md) · [Catalog index](../../README.md)

Group components and determine their spatial arrangement. The entries below describe arrangement and spacing in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qboxlayout"></a> `QBoxLayout`, `QHBoxLayout`, `QVBoxLayout` | Linear arrangement | **Purpose:** Arrange components in a single row or column.<br><br>**Appearance:** No drawn container; visible as aligned components with margins and gaps.<br><br>**Contents:** An ordered sequence of controls, nested arrangements, fixed spaces, and stretchable spaces.<br><br>**Behavior:** Redistributes space as the containing region changes size, respecting size limits and stretch proportions. Direction determines the order. Horizontal and vertical variants represent the same arrangement concept. | [QBoxLayout](https://doc.qt.io/qt-6/qboxlayout.html); [QHBoxLayout](https://doc.qt.io/qt-6/qhboxlayout.html); [QVBoxLayout](https://doc.qt.io/qt-6/qvboxlayout.html) |
| <a id="qgridlayout"></a> `QGridLayout` | Grid arrangement | **Purpose:** Align content across rows and columns.<br><br>**Appearance:** An implied grid; no grid lines are drawn by the layout itself.<br><br>**Contents:** Controls or nested arrangements assigned to cells, with optional row or column spans and spacing.<br><br>**Behavior:** Recalculates placement as available space or contents change. Row and column minimums and stretch determine sizes; equal cell sizes are not automatic. | [QGridLayout](https://doc.qt.io/qt-6/qgridlayout.html) |
| <a id="qformlayout"></a> `QFormLayout` | Label and field arrangement | **Purpose:** Pair descriptive labels with fields in a readable form.<br><br>**Appearance:** Typically a two-column label-and-field arrangement, with alignment influenced by platform style.<br><br>**Contents:** Labels, input controls, nested field arrangements, and optionally full-width rows.<br><br>**Behavior:** Adapts to available width according to configured growth and wrapping rules. Labels can sit beside or above their fields. Label mnemonics can focus the corresponding input when associated. | [QFormLayout](https://doc.qt.io/qt-6/qformlayout.html) |
| <a id="qstackedlayout"></a> `QStackedLayout` | Layered page arrangement | **Purpose:** Arrange alternative pages or overlays within one shared region.<br><br>**Appearance:** No independent decoration; the selected page or layered contents determine the appearance.<br><br>**Contents:** Multiple overlapping page containers.<br><br>**Behavior:** Normally shows only the current page. An alternative mode keeps pages visible with the current page raised, enabling overlays. It provides no built-in selector; another control or the application changes the current page. | [QStackedLayout](https://doc.qt.io/qt-6/qstackedlayout.html) |
| <a id="qspaceritem"></a> `QSpacerItem` | Layout space | **Purpose:** Reserve breathing room or absorb unused layout space.<br><br>**Appearance:** Blank space with no border, label, or focus indicator.<br><br>**Contents:** No visible child content.<br><br>**Behavior:** Its space can remain fixed or expand according to its sizing rules and surrounding layout. It does not accept user interaction; its effect is visible in the positions of neighboring components. | [QSpacerItem](https://doc.qt.io/qt-6/qspaceritem.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QBoxLayout | Linear arrangement | Appearance/layout/passive output only at this boundary; no additional response assigned | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qboxlayout) |
| QGridLayout | Grid arrangement | Appearance/layout/passive output only at this boundary; no additional response assigned | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qgridlayout) |
| QFormLayout | Label and field arrangement | [B05 Transfer and traverse focus](../../behaviors/governance/focus.md#b05) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qformlayout) |
| QStackedLayout | Layered page arrangement | [B18 Switch the current content region](../../behaviors/navigation/content.md#b18) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qstackedlayout) |
| QSpacerItem | Layout space | Appearance/layout/passive output only at this boundary; no additional response assigned | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qspaceritem) |
