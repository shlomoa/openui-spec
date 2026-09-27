# Focus movement and containment

[Interaction governance](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QWidget`, `QLabel`, `QGroupBox`, `QGraphicsWidget` (Qt references for this abstract response) | <a id="b05"></a> B05 Transfer and traverse focus | Changes the keyboard interaction target through traversal, an associated label or an explicit request. A focus outline only depicts the result. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QWidget](https://doc.qt.io/qt-6/qwidget.html); [QLabel](https://doc.qt.io/qt-6/qlabel.html); [QGroupBox](https://doc.qt.io/qt-6/qgroupbox.html); [QGraphicsWidget](https://doc.qt.io/qt-6/qgraphicswidget.html) |
| `QDialog` (Qt references for this abstract response) | <a id="b06"></a> B06 Contain and restore modal focus | A proposed web interaction obligation: constrain traversal while modal, then return focus to an appropriate target. Review as a part of modal interaction before considering a separate leaf; Qt modality alone does not prove web focus compliance. **Taxonomy disposition:** P05 modal interaction; B06 is a focus policy within the same contract. | [QDialog](https://doc.qt.io/qt-6/qdialog.html); [WAI-ARIA dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B05 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **O:** `QGraphicsScene`, `QGraphicsWidget`, `QGroupBox`, `QLabel`, `QWidget`; **A:** `QFormLayout` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Traversal, mnemonic or explicit focus request.

**Preconditions:** Destination exists, is available and focusable under current policy.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Next focus transfer replaces the target; failed request preserves a valid focus target.

**Observable output:** Focus target change.

**Accessibility obligation:** Preserve meaningful order and visible focus; do not equate selection with focus.

**Composition and conflict rule:** B04/B06 constrain eligible destinations; hidden or disabled destinations must not become an input trap.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B06 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **U:** `QColorDialog`, `QDialog`, `QErrorMessage`, `QFileDialog`, `QFontDialog`, `QInputDialog`, `QMessageBox`, `QProgressDialog`, `QWizard` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Modal activation, traversal and deactivation.

**Preconditions:** B04 active; initial/return target policy has valid fallbacks.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** On close return to invoker if valid, otherwise an appropriate workflow target; nested scope returns within outer modal.

**Observable output:** Focus entry, traversal or return outcome.

**Accessibility obligation:** Keep traversal within active modal; content-based initial focus; no background interaction.

**Composition and conflict rule:** Part of P05, not a separate leaf; native modality evidence alone does not prove this web obligation.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
