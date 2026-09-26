# Messages and operation progress

[Windows and dialogs](README.md) · [Catalog index](../../README.md)

Provide application workspaces and focused interaction windows. The entries below describe messages and operation progress in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qmessagebox"></a> `QMessageBox` | Message and decision dialog | **Purpose:** Explain a situation and optionally request a decision.<br><br>**Appearance:** A compact dialog with a message, optional severity icon, and response buttons.<br><br>**Contents:** Primary text, supporting explanation, optional expandable details, and standard or custom actions.<br><br>**Behavior:** Users choose a response or dismiss the message when allowed. Default and escape responses depend on the configured buttons. The application interprets the chosen action, such as saving or discarding changes. | [QMessageBox](https://doc.qt.io/qt-6/qmessagebox.html) |
| <a id="qerrormessage"></a> `QErrorMessage` | Suppressible error dialog | **Purpose:** Show errors while allowing repeated messages to be suppressed.<br><br>**Appearance:** An error dialog containing explanatory text, an acknowledgement action, and a show-again checkbox.<br><br>**Contents:** The current error message and its repeat-display choice.<br><br>**Behavior:** Acknowledging advances to any queued message. Disabling repeat display suppresses the corresponding message or message type for that dialog's handling. Persistence across application restarts is not implied. | [QErrorMessage](https://doc.qt.io/qt-6/qerrormessage.html) |
| <a id="qprogressdialog"></a> `QProgressDialog` | Operation progress dialog | **Purpose:** Show progress for a longer operation and optionally let users cancel it.<br><br>**Appearance:** A dialog with a progress bar, description, and optional cancel button.<br><br>**Contents:** Operation text, progress information, and a cancellation action when available.<br><br>**Behavior:** May appear only when the operation is estimated to last long enough. It can close and reset at completion. Cancellation requests must be handled by the application to stop the underlying work. | [QProgressDialog](https://doc.qt.io/qt-6/qprogressdialog.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QMessageBox | Message and decision dialog | [B01 Show, hide and close a surface](../../behaviors/presence/disclosure.md#b01); [B04 Restrict interaction to a modal scope](../../behaviors/governance/modality.md#b04); [B06 Contain and restore modal focus](../../behaviors/governance/focus.md#b06); [B32 Accept, reject or finish an interaction](../../behaviors/commands/workflow.md#b32) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qmessagebox) |
| QErrorMessage | Suppressible error dialog | [B01 Show, hide and close a surface](../../behaviors/presence/disclosure.md#b01); [B04 Restrict interaction to a modal scope](../../behaviors/governance/modality.md#b04); [B06 Contain and restore modal focus](../../behaviors/governance/focus.md#b06); [B32 Accept, reject or finish an interaction](../../behaviors/commands/workflow.md#b32); [B36 Suppress repeated messages](../../behaviors/feedback/suppression.md#b36) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qerrormessage) |
| QProgressDialog | Operation progress dialog | [B01 Show, hide and close a surface](../../behaviors/presence/disclosure.md#b01); [B04 Restrict interaction to a modal scope](../../behaviors/governance/modality.md#b04); [B06 Contain and restore modal focus](../../behaviors/governance/focus.md#b06); [B34 Request cancellation of work](../../behaviors/commands/workflow.md#b34) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qprogressdialog) |
