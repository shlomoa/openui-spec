# Text images and numbers

[Content and data presentation](README.md) · [Catalog index](../../README.md)

Present readable content and structured collections. The entries below describe text images and numbers in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qlabel"></a> `QLabel` | Text or image label | **Purpose:** Identify a nearby control or present a short piece of content.<br><br>**Appearance:** Text or an image within an optionally framed area; alignment and wrapping are configurable.<br><br>**Contents:** Plain or formatted text, a number rendered as text, a still image, or an animation.<br><br>**Behavior:** Normally displays content without editing. Optional text interaction permits selection or links. A label mnemonic can move focus to its associated control; animation advances when its source is running. | [QLabel](https://doc.qt.io/qt-6/qlabel.html) |
| <a id="qlcdnumber"></a> `QLCDNumber` | Segmented number display | **Purpose:** Present a compact numeric readout such as a counter.<br><br>**Appearance:** Large segmented digits, optionally with a frame and different segment treatments.<br><br>**Contents:** A fixed number of digit positions, decimal points, and a limited set of symbols.<br><br>**Behavior:** Updates when the application supplies a value; users do not type into it. Decimal, hexadecimal, octal, and binary presentations are available. The configured digit capacity limits what fits. | [QLCDNumber](https://doc.qt.io/qt-6/qlcdnumber.html) |
| <a id="qtextbrowser"></a> `QTextBrowser` | Linked document viewer | **Purpose:** Read linked documents such as application help.<br><br>**Appearance:** A read-only document viewport with formatted text and scroll bars.<br><br>**Contents:** Text, images, lists, tables, and hyperlinks supported by Qt's rich-text display.<br><br>**Behavior:** Users scroll, select text, and follow links or anchors. Navigation history supports back, forward, and home actions supplied by the application. External-link handling is configurable. | [QTextBrowser](https://doc.qt.io/qt-6/qtextbrowser.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QLabel | Text or image label | [B05 Transfer and traverse focus](../../behaviors/governance/focus.md#b05); [B20 Follow links and document history](../../behaviors/navigation/content.md#b20); [B40 Select a text range](../../behaviors/entry/editing.md#b40) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qlabel) |
| QLCDNumber | Segmented number display | Appearance/layout/passive output only at this boundary; no additional response assigned | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qlcdnumber) |
| QTextBrowser | Linked document viewer | [B20 Follow links and document history](../../behaviors/navigation/content.md#b20); [B21 Scroll or pan a viewport](../../behaviors/navigation/viewport.md#b21); [B40 Select a text range](../../behaviors/entry/editing.md#b40) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qtextbrowser) |
