# Visual grouping

[Containers and layout](README.md) · [Catalog index](../../README.md)

Group components and determine their spatial arrangement. The entries below describe visual grouping in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qframe"></a> `QFrame` | Bordered panel or separator | **Purpose:** Visually group content or separate adjacent regions.<br><br>**Appearance:** An optional box or panel border, or a horizontal or vertical separator line; borders can appear plain, raised, or sunken.<br><br>**Contents:** An empty region or nested content, surrounded by the configured frame.<br><br>**Behavior:** Provides visual structure without its own command or selection behavior. Its border follows the frame style and size; contained controls retain their own interactions. | [QFrame](https://doc.qt.io/qt-6/qframe.html) |
| <a id="qgroupbox"></a> `QGroupBox` | Labeled group | **Purpose:** Give related controls a shared title and visible boundary.<br><br>**Appearance:** A titled frame, optionally flattened or equipped with a checkbox in the title.<br><br>**Contents:** A title and nested controls arranged by a separate layout.<br><br>**Behavior:** Its mnemonic can focus a child. When checkable, unchecking normally disables its children. It groups visually but does not itself enforce one-choice selection among arbitrary buttons. | [QGroupBox](https://doc.qt.io/qt-6/qgroupbox.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QFrame | Bordered panel or separator | Appearance/layout/passive output only at this boundary; no additional response assigned | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qframe) |
| QGroupBox | Labeled group | [B05 Transfer and traverse focus](../../behaviors/governance/focus.md#b05); [B07 Enforce interaction availability](../../behaviors/governance/availability.md#b07); [B08 Change a checked or chosen value](../../behaviors/selection/choice.md#b08) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qgroupbox) |
