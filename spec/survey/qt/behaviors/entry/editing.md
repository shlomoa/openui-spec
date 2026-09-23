# Text editing and shortcut capture

[Entry and value change](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QLineEdit`, `QPlainTextEdit`, `QTextEdit`, `QGraphicsTextItem` (Qt references for this abstract response) | <a id="b12"></a> B12 Edit text and transfer clipboard content | Changes text through supported editing and clipboard operations. Read-only state limits mutation; rich formatting and document structure vary by host. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QLineEdit](https://doc.qt.io/qt-6/qlineedit.html); [QPlainTextEdit](https://doc.qt.io/qt-6/qplaintextedit.html); [QTextEdit](https://doc.qt.io/qt-6/qtextedit.html); [QGraphicsTextItem](https://doc.qt.io/qt-6/qgraphicstextitem.html) |
| `QKeySequenceEdit` (Qt references for this abstract response) | <a id="b13"></a> B13 Capture a shortcut sequence | Records a sequence while the field is active and ends capture according to its completion rules. It does not register or execute that shortcut. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QKeySequenceEdit](https://doc.qt.io/qt-6/qkeysequenceedit.html) |
| `QLineEdit`, `QTextEdit`, `QLabel`, `QTextBrowser` (Qt references for this abstract response) | <a id="b40"></a> B40 Select a text range | Changes the selected text range for reading or supported clipboard/edit operations. Text selection does not require editable content and is distinct from selecting collection rows or graphical items. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QLineEdit](https://doc.qt.io/qt-6/qlineedit.html); [QTextEdit](https://doc.qt.io/qt-6/qtextedit.html); [QLabel](https://doc.qt.io/qt-6/qlabel.html); [QTextBrowser](https://doc.qt.io/qt-6/qtextbrowser.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B12 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QLineEdit`, `QPlainTextEdit`, `QTextEdit`; **O:** `QComboBox`, `QGraphicsTextItem`, `QInputDialog`, `QListView`, `QTableView`, `QTreeView` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Permitted text/clipboard editing operation.

**Preconditions:** Editable target and valid insertion/selection; clipboard capability where used.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Undo if supported, or later edit; do not promise undo for every mutation.

**Observable output:** Text/document mutation and edit completion where supported.

**Accessibility obligation:** Preserve platform editing keys, labels and input-method support.

**Composition and conflict rule:** Read-only blocks mutation but may allow copy/selection; data sanitization and rich-text storage are host decisions.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B13 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QKeySequenceEdit` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Focused key input followed by completion condition.

**Preconditions:** Capture target active; configured sequence/finishing rules.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Complete or clear capture; cancellation policy supplied by host.

**Observable output:** Recorded sequence and capture completion.

**Accessibility obligation:** Explain recording mode; allow leaving the field without trapping keyboard use.

**Composition and conflict rule:** Capture is not shortcut registration; finishing keys must not accidentally invoke the recorded command.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B40 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QLineEdit`, `QPlainTextEdit`, `QTextEdit`; **O:** `QGraphicsTextItem`, `QLabel`, `QTextBrowser` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Permitted text selection input/request.

**Preconditions:** Text selection allowed on target.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Replace or clear range; focus change behavior is host-specific.

**Observable output:** Selected text range change.

**Accessibility obligation:** Keyboard selection and understandable focus/selection distinction.

**Composition and conflict rule:** Read-only can remain selectable; password presentation may restrict exposure; not collection-item selection.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
