# Guided sequences

[Windows and dialogs](README.md) · [Catalog index](../../README.md)

Provide application workspaces and focused interaction windows. The entries below describe guided sequences in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qwizard"></a> `QWizard` | Guided multi-step dialog | **Purpose:** Guide users through a task composed of several steps.<br><br>**Appearance:** A dialog showing one page, with navigation buttons and optional titles, subtitles, or illustrations.<br><br>**Contents:** A sequence of pages and actions such as Back, Next, Finish, Cancel, or Help.<br><br>**Behavior:** Users advance or revisit steps. Completion checks can disable progression or reject invalid input. The application can branch to different steps according to earlier choices; final action completes the workflow. | [QWizard](https://doc.qt.io/qt-6/qwizard.html) |
| <a id="qwizardpage"></a> `QWizardPage` | Guided step page | **Purpose:** Represent one stage of a guided workflow.<br><br>**Appearance:** A page area within the wizard, with optional title, explanatory subtitle, and images.<br><br>**Contents:** The controls, instructions, and values relevant to that step.<br><br>**Behavior:** Completion and validation determine whether users can proceed. The page may initialize from earlier answers, reset on return, or select the next branch. Navigation buttons belong to the surrounding wizard. | [QWizardPage](https://doc.qt.io/qt-6/qwizardpage.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QWizard | Guided multi-step dialog | [B01 Show, hide and close a surface](../../behaviors/presence/disclosure.md#b01); [B04 Restrict interaction to a modal scope](../../behaviors/governance/modality.md#b04); [B06 Contain and restore modal focus](../../behaviors/governance/focus.md#b06); [B16 Constrain and validate input](../../behaviors/entry/values.md#b16); [B32 Accept, reject or finish an interaction](../../behaviors/commands/workflow.md#b32); [B33 Advance, revisit and branch a workflow](../../behaviors/commands/workflow.md#b33) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qwizard) |
| QWizardPage | Guided step page | [B16 Constrain and validate input](../../behaviors/entry/values.md#b16); [B33 Advance, revisit and branch a workflow](../../behaviors/commands/workflow.md#b33) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qwizardpage) |
