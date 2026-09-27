# Entry assistance

[Entry and value change](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QCompleter` (Qt references for this abstract response) | <a id="b14"></a> B14 Offer and accept text completion | Offers matching candidates to an associated input and permits accepting one or continuing entry. Popup and inline presentations express the same assistance concept. **Taxonomy disposition:** P03 text completion. | [QCompleter](https://doc.qt.io/qt-6/qcompleter.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B14 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QCompleter`; **O:** `QComboBox` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Entry changes, candidate navigation or acceptance.

**Preconditions:** Editable target and candidate source resolve.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Dismissal leaves typed value; acceptance replaces agreed text range; source changes invalidate stale candidates.

**Observable output:** Candidate acceptance and resulting text change.

**Accessibility obligation:** Keep editing keys; expose suggestions/current option; provide keyboard dismissal and selection.

**Composition and conflict rule:** Accepting completion does not submit; popup and inline modes require appropriate accessible patterns.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
