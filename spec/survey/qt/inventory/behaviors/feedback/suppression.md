# Repeated-message suppression

[Feedback delivery and suppression](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QErrorMessage` (Qt references for this abstract response) | <a id="b36"></a> B36 Suppress repeated messages | Prevents subsequent matching messages under the selected policy. The remembered preference and persistence lifetime are separate decisions. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QErrorMessage](https://doc.qt.io/qt-6/qerrormessage.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B36 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QErrorMessage` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Change repeat-message preference then receive matching message.

**Preconditions:** Message identity/matching scope and suppression policy defined.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Reset preference restores eligibility; process/session lifetime declared.

**Observable output:** Suppressed/displayed decision and preference change.

**Accessibility obligation:** Keep a discoverable way to restore messages; describe scope of preference.

**Composition and conflict rule:** No cross-restart persistence implied by the Qt example; do not suppress unrelated messages by a vague match.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
