# Collection ordering and filtering

[Content navigation and viewports](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QTableView`, `QTreeView`, `QFileDialog`, `QFontComboBox` (Qt references for this abstract response) | <a id="b38"></a> B38 Sort or filter a presented collection | Changes ordering or the visible eligible records when supported and configured. A header arrow or filter value alone does not execute the change. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QTableView](https://doc.qt.io/qt-6/qtableview.html); [QTreeView](https://doc.qt.io/qt-6/qtreeview.html); [QFileDialog](https://doc.qt.io/qt-6/qfiledialog.html); [QFontComboBox](https://doc.qt.io/qt-6/qfontcombobox.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B38 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **O:** `QFileDialog`, `QFontComboBox`, `QTableView`, `QTreeView`; **A:** `QHeaderView` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Sort/filter action or eligible-record policy change.

**Preconditions:** Collection supports operation and column/predicate is valid.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Change/clear sort or filter; preserve/reconcile selection by item identity.

**Observable output:** Order/visible-record changes and applied criterion.

**Accessibility obligation:** Expose applied order/filter and result changes; keep focus meaningful.

**Composition and conflict rule:** Arrow/filter field is not proof of execution; application/model data operations may be required.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
