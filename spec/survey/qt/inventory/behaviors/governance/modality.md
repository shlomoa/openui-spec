# Modal interaction scope

[Interaction governance](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QDialog` (Qt references for this abstract response) | <a id="b04"></a> B04 Restrict interaction to a modal scope | While active, restricts interaction outside the permitted window or application scope. Modality is a configured constraint, not a painted backdrop or a blocked execution thread. **Taxonomy disposition:** P05 modal interaction; B06 is a focus policy within the same contract. | [QDialog](https://doc.qt.io/qt-6/qdialog.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B04 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **O:** `QColorDialog`, `QDialog`, `QErrorMessage`, `QFileDialog`, `QFontDialog`, `QInputDialog`, `QMessageBox`, `QProgressDialog`, `QWizard` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Activate/deactivate modal policy with surface presence.

**Preconditions:** Target and restriction boundary resolve; adapter can enforce the requested scope.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Deactivation or target removal releases restriction; nested scopes unwind in reverse activation order.

**Observable output:** Active restriction and activation/deactivation outcome.

**Accessibility obligation:** Apply B06 for a web modal pattern; label the modal and retain an exit route.

**Composition and conflict rule:** Fail visibly on unsupported modality; no silent downgrade or contradictory second authority for the same target.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
