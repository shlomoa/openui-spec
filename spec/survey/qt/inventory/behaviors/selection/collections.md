# Collection and spatial selection

[Selection coordination](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QListView`, `QTableView`, `QGraphicsScene` (Qt references for this abstract response) | <a id="b10"></a> B10 Select collection or scene items | Changes the selected set according to configured selection rules. Current item, keyboard focus and selection are distinct. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QListView](https://doc.qt.io/qt-6/qlistview.html); [QTableView](https://doc.qt.io/qt-6/qtableview.html); [QGraphicsScene](https://doc.qt.io/qt-6/qgraphicsscene.html) |
| `QGraphicsView` (Qt references for this abstract response) | <a id="b11"></a> B11 Select by a spatial region | Applies a region to determine selected objects when selection mode and selectable targets allow it. The rubber-band outline alone does not select anything. **Taxonomy disposition:** P04 selection capability; no independent new leaf. | [QGraphicsView](https://doc.qt.io/qt-6/qgraphicsview.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B10 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QUndoView`; **O:** `QColumnView`, `QGraphicsEllipseItem`, `QGraphicsItemGroup`, `QGraphicsLineItem`, `QGraphicsPathItem`, `QGraphicsPixmapItem`, `QGraphicsPolygonItem`, `QGraphicsRectItem`, `QGraphicsScene`, `QGraphicsSimpleTextItem`, `QGraphicsTextItem`, `QGraphicsView`, `QListView`, `QTableView`, `QTreeView` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Configured item selection input or request.

**Preconditions:** Selectable items exist and selection mode permits operation.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Deselect/replace selection under mode policy; item removal prunes invalid references.

**Observable output:** Selected item set change.

**Accessibility obligation:** Expose selected versus current/focused item; permit keyboard access.

**Composition and conflict rule:** Range, multiple and single selection have different rules; activation B29 is separate.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B11 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **O:** `QGraphicsView` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Selection-region input/update/commit.

**Preconditions:** Scene selection enabled, coordinate space known and items selectable.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Cancel discards tentative region; commit updates selected set; later selection replaces/extends per policy.

**Observable output:** Selection result, optionally provisional region.

**Accessibility obligation:** Offer non-drag selection alternatives and expose selected items.

**Composition and conflict rule:** A painted rubber band is not a selector; resolve conflicts with pan and item drag before activation.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
