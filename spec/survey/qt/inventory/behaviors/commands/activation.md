# Command activation

[Commands and task progression](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QPushButton`, `QToolButton`, `QMenu`, `QDialogButtonBox` (Qt references for this abstract response) | <a id="b29"></a> B29 Activate a command | Invokes an associated action through supported input. Command activation is not equivalent to checking, dismissing or committing unless explicitly connected. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QPushButton](https://doc.qt.io/qt-6/qpushbutton.html); [QToolButton](https://doc.qt.io/qt-6/qtoolbutton.html); [QMenu](https://doc.qt.io/qt-6/qmenu.html); [QDialogButtonBox](https://doc.qt.io/qt-6/qdialogbuttonbox.html) |
| `QPushButton` (Qt references for this abstract response) | <a id="b30"></a> B30 Repeat activation while held | Repeats activation according to enabled repeat policy. Holding is the trigger condition; repetition is the response over time. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QPushButton](https://doc.qt.io/qt-6/qpushbutton.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B29 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QCommandLinkButton`, `QDialogButtonBox`, `QMenu`, `QPushButton`, `QToolButton`; **O:** `QHeaderView`, `QListView`, `QMenuBar`, `QToolBar`; **A:** `QSystemTrayIcon` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Supported activation input or command request.

**Preconditions:** Action eligible and enabled.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Action completes or delegates asynchronous work; repetition is separate.

**Observable output:** Activation intent and application-defined result.

**Accessibility obligation:** Accessible action name; keyboard and assistive activation; no pointer-only requirement.

**Composition and conflict rule:** Activation does not inherently save, submit, toggle or close; host wiring defines the consequence.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B30 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **O:** `QPushButton` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Eligible activation held beyond configured delay.

**Preconditions:** Repeat enabled on repeat-capable action.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Release, disable or loss of capture stops repetition.

**Observable output:** Repeated activation intents.

**Accessibility obligation:** Make repeat rate usable and offer discrete activation.

**Composition and conflict rule:** Do not repeat destructive command by default; this contract does not infer that every action is repeatable.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
