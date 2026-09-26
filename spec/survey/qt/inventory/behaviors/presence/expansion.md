# Expansion and collapse

[Presence and disclosure](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QTreeView`, `QSplitter` (Qt references for this abstract response) | <a id="b03"></a> B03 Expand and collapse content | Changes how much associated content is exposed. Branch collapse and pane collapse are variants, not proof that every checkable group collapses. **Taxonomy disposition:** Reuse existing behavior leaf. | [QTreeView](https://doc.qt.io/qt-6/qtreeview.html); [QSplitter](https://doc.qt.io/qt-6/qsplitter.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B03 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **O:** `QMdiSubWindow`, `QSplitter`, `QTreeView` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Expand/collapse request.

**Preconditions:** Associated region exists and permits expansion change.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Inverse request restores exposure; retained content is not deleted.

**Observable output:** Expanded/collapsed state change.

**Accessibility obligation:** Associate trigger and region; expose state and keyboard operation.

**Composition and conflict rule:** Do not substitute disabled state for collapse; selection of a different page is B18.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
