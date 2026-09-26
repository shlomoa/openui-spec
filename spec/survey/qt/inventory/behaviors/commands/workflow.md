# Task completion and progression

[Commands and task progression](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QDialog`, `QMessageBox`, `QInputDialog` (Qt references for this abstract response) | <a id="b32"></a> B32 Accept, reject or finish an interaction | Completes a task with a result or dismissal policy. Closing the surface alone does not imply successful submission or persistence. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QDialog](https://doc.qt.io/qt-6/qdialog.html); [QMessageBox](https://doc.qt.io/qt-6/qmessagebox.html); [QInputDialog](https://doc.qt.io/qt-6/qinputdialog.html) |
| `QWizard`, `QWizardPage` (Qt references for this abstract response) | <a id="b33"></a> B33 Advance, revisit and branch a workflow | Chooses the next or previous step subject to completion and validation rules. A disabled Next button is a state consequence, not the workflow definition. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QWizard](https://doc.qt.io/qt-6/qwizard.html); [QWizardPage](https://doc.qt.io/qt-6/qwizardpage.html) |
| `QProgressDialog` (Qt references for this abstract response) | <a id="b34"></a> B34 Request cancellation of work | Reports a request to stop a running operation. The application controls whether and when work actually stops. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QProgressDialog](https://doc.qt.io/qt-6/qprogressdialog.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B32 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QColorDialog`, `QDialog`, `QErrorMessage`, `QFileDialog`, `QFontDialog`, `QInputDialog`, `QMessageBox`, `QWizard`; **A:** `QDialogButtonBox` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Accept/reject/finish/dismiss action.

**Preconditions:** Task completion policy allows response.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Completion retires interaction; reopening is a new interaction unless host restores state.

**Observable output:** Result/response and completion outcome.

**Accessibility obligation:** Clear response labels, appropriate default and dismissal; focus handoff.

**Composition and conflict rule:** Acceptance is not persistence success; cancellation is not automatic rollback; B34 controls work cancellation intent.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B33 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QWizard`, `QWizardPage` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Next/Back/Finish or branch decision.

**Preconditions:** Step exists and progression validation permits requested transition.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Back revisits according to reset policy; cancel ends workflow; Finish completes.

**Observable output:** Current step, validation outcome and completion intent.

**Accessibility obligation:** Announce current step and errors; keyboard navigation and appropriate focus.

**Composition and conflict rule:** Branching must terminate or allow deliberate loops; stepper is not numeric stepping or automatic routing.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B34 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **O:** `QProgressDialog` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Cancel control activation.

**Preconditions:** Cancelable operation reference exists.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Request ends immediately as an intent; operation terminates only when application confirms.

**Observable output:** Cancellation request; completion/status separately supplied.

**Accessibility obligation:** Expose requested versus stopped state without falsely reporting completion.

**Composition and conflict rule:** Repeated requests should follow application policy; hiding progress UI does not stop work.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
