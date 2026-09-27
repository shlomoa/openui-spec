# Message and help delivery

[Feedback delivery and suppression](README.md) · [Behavior index](../README.md)

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QStatusBar`, `QWhatsThis`, `QSystemTrayIcon` (Qt references for this abstract response) | <a id="b35"></a> B35 Present contextual or host feedback | Presents a message or requested explanation through the selected surface. Host notification delivery depends on capability; embedded controls retain their own interactions. **Taxonomy disposition:** Existing host/folder enrichment; no independent leaf. | [QStatusBar](https://doc.qt.io/qt-6/qstatusbar.html); [QWhatsThis](https://doc.qt.io/qt-6/qwhatsthis.html); [QSystemTrayIcon](https://doc.qt.io/qt-6/qsystemtrayicon.html) |

Trigger names, current states and visual indicators are not additional behavior objects. Sources support reference patterns; the proposed contracts below add explicit neutral decisions and applicability limits.

### B35 proposed contract

**Purpose and effect:** use the primary definition in the table above.

**Eligible targets:** **I:** `QStatusBar`, `QToolTip`, `QWhatsThis`; **O:** `QSplashScreen`; **U:** `QSystemTrayIcon` Codes and component-specific limits: [matrix](../../COMPONENT_BEHAVIOR_MATRIX.md).

**Trigger:** Application message or explicit help request.

**Preconditions:** Content and delivery capability available.

**Configuration and state:** the linked [per-target audit](../../BEHAVIOR_INVENTORY.md) records the actual policy/value inputs. The [normalized vocabulary](../../CONFIGURATION_STATE_APPEARANCE.md) separates them from the response; no configuration name alone enables a capability.

**Termination or reversal:** Dismissal/expiry/replacement ends presentation; host may reject delivery.

**Observable output:** Presentation/delivery outcome where observable.

**Accessibility obligation:** Appropriate non-disruptive announcements; focus only for interactive help.

**Composition and conflict rule:** Passive progress repaint is not a new behavior; host delivery remains U until capability is confirmed.

**Evidence and status:** Qt examples are linked in the definition above. Neutral contract choices follow [D01–D09](../../BEHAVIOR_DECISIONS.md); accessibility statements are proposed obligations, not a claim of Qt or generator conformance.
