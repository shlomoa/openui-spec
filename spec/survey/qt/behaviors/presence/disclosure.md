# Surface presence and transient disclosure

[Presence and disclosure](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QWidget`, `QDialog`, `QSplashScreen` (Qt references for this abstract response) | <a id="b01"></a> B01 Show, hide and close a surface | Changes the presence of a surface. A close request can have lifecycle meaning beyond hiding; dialog result is separate. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QWidget](https://doc.qt.io/qt-6/qwidget.html); [QDialog](https://doc.qt.io/qt-6/qdialog.html); [QSplashScreen](https://doc.qt.io/qt-6/qsplashscreen.html) |
| `QMenu`, `QComboBox`, `QToolTip`, `QStatusBar` (Qt references for this abstract response) | <a id="b02"></a> B02 Disclose and retire transient content | Reveals temporary choices or help and removes them on dismissal, timeout or loss of relevance. Timing and dismissal rules belong to the selected pattern. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QMenu](https://doc.qt.io/qt-6/qmenu.html); [QComboBox](https://doc.qt.io/qt-6/qcombobox.html); [QToolTip](https://doc.qt.io/qt-6/qtooltip.html); [QStatusBar](https://doc.qt.io/qt-6/qstatusbar.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B01 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QColorDialog`, `QDialog`, `QErrorMessage`, `QFileDialog`, `QFontDialog`, `QInputDialog`, `QMessageBox`, `QProgressDialog`, `QWizard`; **O:** `QDockWidget`, `QMdiSubWindow`, `QSplashScreen`, `QWidget`; **A:** `QTabWidget` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Show/hide/close request or configured dismissal.

**Preconditions:** Target exists; close policy permits the requested transition.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Hide/close ends presence; reopen is a separate action, not undo of data changes.

**Observable output:** Presence change and, if supported, close intent/outcome.

**Accessibility obligation:** Move focus away from retired content to a meaningful available target.

**Composition and conflict rule:** A close request may be refused; task result is B32, modality is B04, transparency is appearance.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B02 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QComboBox`, `QFontComboBox`, `QMenu`, `QMenuBar`, `QStatusBar`, `QToolTip`, `QWhatsThis`; **O:** `QSystemTrayIcon`, `QToolBar`, `QToolButton` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Configured open/help trigger, relevance condition or timeout.

**Preconditions:** Disclosure content exists and target is eligible.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Dismissal, expiry or loss of relevance retires it; reopening re-evaluates policy.

**Observable output:** Disclosure visibility and dismissal reason when provided.

**Accessibility obligation:** For author-controlled hover/focus content, provide applicable dismissal, hoverability and persistence; do not assume hover equals focus.

**Composition and conflict rule:** Nested menus/help need target-specific timing; visual highlight alone is not disclosure.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
