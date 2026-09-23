# Viewport movement

[Content navigation and viewports](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QScrollArea`, `QScrollBar`, `QGraphicsView` (Qt references for this abstract response) | <a id="b21"></a> B21 Scroll or pan a viewport | Changes which part of content is visible. Scroll controls provide input; clipping and scrollbar policy do not by themselves establish a scrolling behavior. **Taxonomy disposition:** P06 viewport scrolling; kinetic and reveal-target are refinements. | [QScrollArea](https://doc.qt.io/qt-6/qscrollarea.html); [QScrollBar](https://doc.qt.io/qt-6/qscrollbar.html); [QGraphicsView](https://doc.qt.io/qt-6/qgraphicsview.html) |
| `QScroller` (Qt references for this abstract response) | <a id="b22"></a> B22 Continue and interrupt kinetic scrolling | Continues motion after suitable input and decelerates or stops it. Treat as a possible refinement of scrolling rather than automatically a separate leaf. **Taxonomy disposition:** P06 viewport scrolling; kinetic and reveal-target are refinements. | [QScroller](https://doc.qt.io/qt-6/qscroller.html) |
| `QScrollArea` (Qt references for this abstract response) | <a id="b23"></a> B23 Reveal a target in a viewport | Moves the visible region enough to expose a target where possible. It is distinct from changing keyboard focus and can be a scrolling action. **Taxonomy disposition:** P06 viewport scrolling; kinetic and reveal-target are refinements. | [QScrollArea](https://doc.qt.io/qt-6/qscrollarea.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B21 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QPlainTextEdit`, `QScrollArea`, `QScrollBar`, `QScroller`, `QTextBrowser`, `QTextEdit`; **O:** `QColumnView`, `QGraphicsView`, `QListView`, `QTableView` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Scroll control, keyboard, pointer/pan or application position request.

**Preconditions:** Viewport has a valid content extent and supports requested axes.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Motion reaches bounds, requested position or stop; reverse motion changes position.

**Observable output:** Effective viewport position change.

**Accessibility obligation:** Provide keyboard access and keep meaningful content reachable even with hidden bars.

**Composition and conflict rule:** One scroll controller per target; bar visibility and content ownership are separate; axes/units follow P06.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B22 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QScroller` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Configured release with momentum or kinetic request.

**Preconditions:** P06 scrolling eligible; kinetic mode and motion limits defined.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** New input, explicit stop, deactivation or bounds interrupt/finish motion.

**Observable output:** Position/motion-state change.

**Accessibility obligation:** Respect reduced-motion policy and provide non-gesture alternatives.

**Composition and conflict rule:** Refinement of P06; momentum does not require a QSwipeGesture event or permit background scrolling through active modality.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B23 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QScrollArea` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Request to reveal a contained target.

**Preconditions:** Target is within the viewport content and position is resolvable.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Nearest reachable viewport position finishes reveal; subsequent scroll can move it away.

**Observable output:** Position and reachable/limited reveal outcome.

**Accessibility obligation:** Reveal should not steal focus; focus movement may separately request reveal.

**Composition and conflict rule:** Refinement of P06; out-of-content references are rejected, not scrolled into another viewport.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
