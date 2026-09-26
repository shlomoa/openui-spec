# Content and location navigation

[Content navigation and viewports](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QStackedWidget`, `QTabWidget`, `QToolBox` (Qt references for this abstract response) | <a id="b18"></a> B18 Switch the current content region | Selects which content region is presented. A selector can be external, and selection need not perform application routing. **Taxonomy disposition:** P01/Tabs current-content capability; no independent new leaf. | [QStackedWidget](https://doc.qt.io/qt-6/qstackedwidget.html); [QTabWidget](https://doc.qt.io/qt-6/qtabwidget.html); [QToolBox](https://doc.qt.io/qt-6/qtoolbox.html) |
| `QColumnView`, `QFileDialog`, `QTreeView` (Qt references for this abstract response) | <a id="b19"></a> B19 Navigate a hierarchy or resource location | Changes the explored path or location. Opening a tree branch and selecting a node are related but distinct responses. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QColumnView](https://doc.qt.io/qt-6/qcolumnview.html); [QFileDialog](https://doc.qt.io/qt-6/qfiledialog.html); [QTreeView](https://doc.qt.io/qt-6/qtreeview.html) |
| `QTextBrowser`, `QLabel` (Qt references for this abstract response) | <a id="b20"></a> B20 Follow links and document history | Activates a reference or moves through document history according to the host's policy. External resources and application routes need explicit handling. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QTextBrowser](https://doc.qt.io/qt-6/qtextbrowser.html); [QLabel](https://doc.qt.io/qt-6/qlabel.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B18 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QStackedWidget`, `QTabWidget`, `QToolBox`; **O:** `QCalendarWidget`, `QMdiArea`, `QStackedLayout`; **A:** `QTabBar` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Selector/application changes current region.

**Preconditions:** Requested child exists and is eligible.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Another valid selection replaces it; removing current child invokes declared fallback.

**Observable output:** Current region/index change.

**Accessibility obligation:** Hidden regions leave ordinary focus traversal; relocate focus if it becomes hidden.

**Composition and conflict rule:** No route change or swipe binding implied; all-layer layout is not exclusive selection.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B19 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QColumnView`, `QFileDialog`; **O:** `QTreeView` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Choose hierarchy node, parent or resource location.

**Preconditions:** Destination exists and access policy permits navigation.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Navigate back/up/to another path; failure retains a valid location.

**Observable output:** Current path/location and displayed child content.

**Accessibility obligation:** Expose hierarchy and current location; keyboard browsing.

**Composition and conflict rule:** Expansion B03 and selection B10 are separate; resource access is not granted by navigation.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.

### B20 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QTextBrowser`; **O:** `QGraphicsTextItem`, `QLabel` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Activate link or history action.

**Preconditions:** Reference valid and host handling policy permits it.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Return through available history; external navigation may leave the surface.

**Observable output:** Destination or navigation-request outcome.

**Accessibility obligation:** Accessible link text, keyboard activation and clear external transitions.

**Composition and conflict rule:** Do not force local document links into application routing or execute unsafe content merely because it is linked.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
