# Availability and editing restrictions

[Interaction governance](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QWidget`, `QGroupBox`, `QLineEdit` (Qt references for this abstract response) | <a id="b07"></a> B07 Enforce interaction availability | Applies enabled or read-only restrictions. Disabled, read-only and hidden remain different states with different permitted interactions. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QWidget](https://doc.qt.io/qt-6/qwidget.html); [QGroupBox](https://doc.qt.io/qt-6/qgroupbox.html); [QLineEdit](https://doc.qt.io/qt-6/qlineedit.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B07 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **O:** `QGroupBox`, `QLineEdit`, `QPlainTextEdit`, `QTextEdit`, `QToolBox`, `QWidget` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Availability policy or checked-group state changes.

**Preconditions:** Owner controls the target's interaction availability.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Re-enable or release read-only restriction; retain data unless an explicit action changes it.

**Observable output:** Effective availability change.

**Accessibility obligation:** Expose disabled/read-only semantics and preserve allowed reading/navigation.

**Composition and conflict rule:** Read-only may allow selection/copy; disabled, hidden and visually dimmed are different.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
