# Interactive sizing

[Geometry and workspace manipulation](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QSplitter`, `QSizeGrip`, `QHeaderView`, `QMdiSubWindow` (Qt references for this abstract response) | <a id="b24"></a> B24 Resize a target or adjacent panes | Changes dimensions within constraints. A handle is an affordance; resizing a pane, section or window does not make the handle the resized object. **Taxonomy disposition:** Reuse existing behavior leaf. | [QSplitter](https://doc.qt.io/qt-6/qsplitter.html); [QSizeGrip](https://doc.qt.io/qt-6/qsizegrip.html); [QHeaderView](https://doc.qt.io/qt-6/qheaderview.html); [QMdiSubWindow](https://doc.qt.io/qt-6/qmdisubwindow.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B24 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QSplitterHandle`; **O:** `QColumnView`, `QGraphicsWidget`, `QHeaderView`, `QMdiSubWindow`, `QSizeGrip`, `QSplitter`, `QTableView`, `QWidget` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Permitted resize input or requested size.

**Preconditions:** Target resizable, bounds coherent and geometry owner known.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Release commits supported live/deferred size; cancellation restores baseline only where supported.

**Observable output:** Effective size or pane proportions.

**Accessibility obligation:** Offer keyboard alternative to dragging and meaningful size feedback.

**Composition and conflict rule:** Automatic layout sizing is not user resizing; shared pane constraints may limit one target's change.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
