# Choice state and exclusivity

[Selection coordination](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QCheckBox`, `QComboBox`, `QCalendarWidget` (Qt references for this abstract response) | <a id="b08"></a> B08 Change a checked or chosen value | Updates a choice, with binary, partial or single-value semantics determined by its control. The displayed indicator is feedback, not the selection action. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QCheckBox](https://doc.qt.io/qt-6/qcheckbox.html); [QComboBox](https://doc.qt.io/qt-6/qcombobox.html); [QCalendarWidget](https://doc.qt.io/qt-6/qcalendarwidget.html) |
| `QRadioButton`, `QButtonGroup` (Qt references for this abstract response) | <a id="b09"></a> B09 Coordinate exclusive choices | Selecting one member clears another according to group policy. The group is logical and does not imply a border or layout. **Taxonomy disposition:** Choice controls coordination capability; no independent new leaf. | [QRadioButton](https://doc.qt.io/qt-6/qradiobutton.html); [QButtonGroup](https://doc.qt.io/qt-6/qbuttongroup.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B08 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QCheckBox`, `QColorDialog`, `QComboBox`, `QFileDialog`, `QFontComboBox`, `QFontDialog`, `QRadioButton`, `QTabBar`; **O:** `QButtonGroup`, `QCalendarWidget`, `QGroupBox`, `QInputDialog`, `QMenu`, `QPushButton`, `QToolButton` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Value-choice activation or accepted programmatic update.

**Preconditions:** Target is enabled and proposed value is allowed.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Further choice changes value; cancellation rollback only if explicitly provided.

**Observable output:** Chosen/checked value change.

**Accessibility obligation:** Expose current choice including any partial state with an accessible name.

**Composition and conflict rule:** B09 may coordinate other values; a command or submit is not implied.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B09 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **O:** `QButtonGroup`, `QRadioButton` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** An eligible member becomes selected.

**Preconditions:** Membership and exclusivity policy are defined.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Selecting another changes the selected member; clearing the last choice depends on declared policy.

**Observable output:** Group choice and affected-member changes.

**Accessibility obligation:** Expose group context and selected state; support keyboard choice.

**Composition and conflict rule:** One controller owns exclusivity; visual GroupBox does not supply this rule.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
