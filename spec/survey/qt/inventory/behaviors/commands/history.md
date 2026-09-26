# Action history

[Commands and task progression](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QUndoView`, `QLineEdit`, `QTextEdit` (Qt references for this abstract response) | <a id="b31"></a> B31 Undo or redo recorded changes | Moves through an available edit/action history. History entries, current position and the domain changes are not interchangeable with ordinary item selection. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QUndoView](https://doc.qt.io/qt-6/qundoview.html); [QLineEdit](https://doc.qt.io/qt-6/qlineedit.html); [QTextEdit](https://doc.qt.io/qt-6/qtextedit.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B31 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QUndoView`; **O:** `QLineEdit`, `QPlainTextEdit`, `QTextEdit` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Undo/redo/history-position command.

**Preconditions:** Recorded history supports requested traversal.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Target position reached or unavailable; opposite traversal only while history permits.

**Observable output:** History position and affected data changes.

**Accessibility obligation:** Expose action names and availability; keyboard invocation.

**Composition and conflict rule:** Normal list selection does not undo; a new edit can discard redo history.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
