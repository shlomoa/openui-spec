# Movement and transfer

[Geometry and workspace manipulation](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QTabBar`, `QHeaderView`, `QGraphicsItemGroup`, `QMdiSubWindow` (Qt references for this abstract response) | <a id="b25"></a> B25 Move or reorder within a surface | Changes position or order when enabled. Ordinary dragging or reordering is not necessarily a data-transfer drag-and-drop operation. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QTabBar](https://doc.qt.io/qt-6/qtabbar.html); [QHeaderView](https://doc.qt.io/qt-6/qheaderview.html); [QGraphicsItemGroup](https://doc.qt.io/qt-6/qgraphicsitemgroup.html); [QMdiSubWindow](https://doc.qt.io/qt-6/qmdisubwindow.html) |
| `QListView`, `QTableView`, `QTreeView` (Qt references for this abstract response) | <a id="b26"></a> B26 Transfer or move by drag and drop | Accepts a drop outcome supported by source and target. Reuse the existing movement scope; copying or data-transfer semantics require additional evidence/contract decisions. **Taxonomy disposition:** Reuse existing behavior leaf. | [QListView](https://doc.qt.io/qt-6/qlistview.html); [QTableView](https://doc.qt.io/qt-6/qtableview.html); [QTreeView](https://doc.qt.io/qt-6/qtreeview.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B25 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **O:** `QDockWidget`, `QGraphicsEllipseItem`, `QGraphicsItemGroup`, `QGraphicsLineItem`, `QGraphicsPathItem`, `QGraphicsPixmapItem`, `QGraphicsPolygonItem`, `QGraphicsRectItem`, `QGraphicsSimpleTextItem`, `QGraphicsTextItem`, `QHeaderView`, `QListView`, `QMdiSubWindow`, `QTabBar`, `QTabWidget` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Move/reorder request or permitted drag.

**Preconditions:** Target movable; destination/order permitted.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Release commits position/order; cancellation is declared by host.

**Observable output:** Position/order change.

**Accessibility obligation:** Provide non-drag reordering and retain sensible focus.

**Composition and conflict rule:** Not every drag is drag-and-drop; resolve conflicts with text selection, pan and resize.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B26 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **O:** `QListView`, `QTableView`, `QTreeView` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Drag begins, target accepts and drop occurs.

**Preconditions:** Source, target, transferable/movable content and supported action agree.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Cancel or rejected drop preserves source; accepted drop applies only agreed action.

**Observable output:** Accepted/rejected/canceled transfer outcome.

**Accessibility obligation:** Alternative to dragging; announce target and result.

**Composition and conflict rule:** Existing scope covers movement; copy and external transfer require adapter support and must not be inferred.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
