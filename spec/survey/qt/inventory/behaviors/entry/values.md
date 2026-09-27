# Value adjustment, validation and preview

[Entry and value change](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QSpinBox`, `QDoubleSpinBox`, `QSlider`, `QDial`, `QDateTimeEdit` (Qt references for this abstract response) | <a id="b15"></a> B15 Adjust a bounded value | Changes numeric or temporal values by typing, stepping or dragging within the selected control's rules. Bounds, precision and wrapping configure the action. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QSpinBox](https://doc.qt.io/qt-6/qspinbox.html); [QDoubleSpinBox](https://doc.qt.io/qt-6/qdoublespinbox.html); [QSlider](https://doc.qt.io/qt-6/qslider.html); [QDial](https://doc.qt.io/qt-6/qdial.html); [QDateTimeEdit](https://doc.qt.io/qt-6/qdatetimeedit.html) |
| `QLineEdit`, `QSpinBox`, `QDateTimeEdit`, `QWizardPage` (Qt references for this abstract response) | <a id="b16"></a> B16 Constrain and validate input | Checks or restricts accepted input or progression. A format, range or validator is configuration; checking or rejecting a change is the response. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QLineEdit](https://doc.qt.io/qt-6/qlineedit.html); [QSpinBox](https://doc.qt.io/qt-6/qspinbox.html); [QDateTimeEdit](https://doc.qt.io/qt-6/qdatetimeedit.html); [QWizardPage](https://doc.qt.io/qt-6/qwizardpage.html) |
| `QColorDialog`, `QFontDialog` (Qt references for this abstract response) | <a id="b17"></a> B17 Preview a value before completion | Exposes tentative changes while a value is being chosen. Applying or reverting changes to other content requires application policy; cancel does not inherently roll back all side effects. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QColorDialog](https://doc.qt.io/qt-6/qcolordialog.html); [QFontDialog](https://doc.qt.io/qt-6/qfontdialog.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B15 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QDateEdit`, `QDateTimeEdit`, `QDial`, `QDoubleSpinBox`, `QSlider`, `QSpinBox`, `QTimeEdit`; **O:** `QInputDialog` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Step/drag/wheel/type adjustment.

**Preconditions:** Value domain and bounds valid; control eligible for input.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Release completes continuous input; reverse adjustment changes value; cancellation rollback is host-specific.

**Observable output:** Changed value, with tracking/commit timing.

**Accessibility obligation:** Expose value/range and keyboard alternatives; localize presentation without changing stored semantics.

**Composition and conflict rule:** Slider movement is not object relocation; temporal domain differs from numeric range.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B16 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **O:** `QCalendarWidget`, `QComboBox`, `QDateEdit`, `QDateTimeEdit`, `QDoubleSpinBox`, `QInputDialog`, `QLineEdit`, `QSpinBox`, `QTimeEdit`, `QWizard`, `QWizardPage` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Input change or commit/progression attempt.

**Preconditions:** Constraint/validator and validation timing defined.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Valid correction clears the invalid result; retry does not bypass constraints.

**Observable output:** Accepted/rejected value or validation result.

**Accessibility obligation:** Describe errors and correction without relying only on color; retain input for correction.

**Composition and conflict rule:** Do not infer business/server validation from an input mask; asynchronous rules need explicit host policy.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B17 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **A:** `QColorDialog`, `QFontDialog` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Tentative picker value changes.

**Preconditions:** A preview target and commit policy exist.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Accept commits; cancel reverts only if the application captured and can restore a baseline.

**Observable output:** Tentative value, accepted value or cancellation intent.

**Accessibility obligation:** Identify preview versus committed state and allow non-pointer choice.

**Composition and conflict rule:** No automatic rollback of external side effects; live application is A in the matrix.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
