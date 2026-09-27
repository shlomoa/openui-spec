# Workspace placement and graphical transforms

[Geometry and workspace manipulation](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QDockWidget`, `QToolBar`, `QMainWindow` (Qt references for this abstract response) | <a id="b27"></a> B27 Dock, float or rearrange panels | Changes attachment and workspace placement where supported. Docked/floating state and permitted areas constrain the action. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QDockWidget](https://doc.qt.io/qt-6/qdockwidget.html); [QToolBar](https://doc.qt.io/qt-6/qtoolbar.html); [QMainWindow](https://doc.qt.io/qt-6/qmainwindow.html) |
| `QGraphicsView`, `QGraphicsItemGroup` (Qt references for this abstract response) | <a id="b28"></a> B28 Transform graphical content | Changes the content's scale, rotation or grouped transform through application-provided actions. A rendered shape has no automatic geometry-editing tools. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QGraphicsView](https://doc.qt.io/qt-6/qgraphicsview.html); [QGraphicsItemGroup](https://doc.qt.io/qt-6/qgraphicsitemgroup.html) |
| `QMdiSubWindow`, `QMdiArea` (Qt references for this abstract response) | <a id="b37"></a> B37 Change a window presentation state | Activates, minimizes, maximizes, restores or arranges document surfaces where supported. This is not automatic behavior of an arbitrary content container. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QMdiSubWindow](https://doc.qt.io/qt-6/qmdisubwindow.html); [QMdiArea](https://doc.qt.io/qt-6/qmdiarea.html) |
| `QGraphicsItemGroup`, `QGraphicsScene` (Qt references for this abstract response) | <a id="b39"></a> B39 Group or ungroup graphical contents | Changes which items are manipulated as a compound unit through application commands. This differs from the static existence of a scene/group. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QGraphicsItemGroup](https://doc.qt.io/qt-6/qgraphicsitemgroup.html); [QGraphicsScene](https://doc.qt.io/qt-6/qgraphicsscene.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B27 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **O:** `QDockWidget`, `QToolBar`; **A:** `QMainWindow` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Dock/float/rearrange request.

**Preconditions:** Allowed regions and native/emulated capabilities permit placement.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Inverse placement restores docking where possible; reject invalid destination.

**Observable output:** Docked/floating state and region change.

**Accessibility obligation:** Provide commands alternative to drag and maintain access to panel content.

**Composition and conflict rule:** This does not promise an OS window on every platform; active-modal restrictions still apply.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B28 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **A:** `QGraphicsEllipseItem`, `QGraphicsItemGroup`, `QGraphicsLineItem`, `QGraphicsPathItem`, `QGraphicsPixmapItem`, `QGraphicsPolygonItem`, `QGraphicsRectItem`, `QGraphicsSimpleTextItem`, `QGraphicsView`, `QGraphicsWidget` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Application transform action or configured gesture mapping.

**Preconditions:** Target transformable with defined coordinate space and valid transform.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Inverse transform or explicit reset where available.

**Observable output:** Transform change.

**Accessibility obligation:** Provide equivalent controls and accessible access to significant graphical information.

**Composition and conflict rule:** No built-in vertex/path/camera editing inferred; avoid applying the same transform twice through group and child.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B37 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **O:** `QMdiArea`, `QMdiSubWindow` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Window activation, minimize/maximize/restore/tile command.

**Preconditions:** Target workspace/window supports requested state.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Restore or later command changes state; close is lifecycle not restore.

**Observable output:** Active window and presentation-state change.

**Accessibility obligation:** Keyboard window management and accessible active-state indication.

**Composition and conflict rule:** Internal workspace actions do not imply OS window management capability.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B39 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **A:** `QGraphicsItemGroup`, `QGraphicsScene` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Application group/ungroup command.

**Preconditions:** Members exist, share a compatible context and ownership policy allows it.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Ungroup restores independent manipulation under chosen transform policy.

**Observable output:** Membership/grouping change.

**Accessibility obligation:** Provide commands and accessible group identity; keep member access where needed.

**Composition and conflict rule:** Static grouping is composition; do not duplicate shared contents or introduce cyclic ownership.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
