# Status and activity

[Status help and interaction feedback](README.md) · [Catalog index](../../README.md)

Communicate state, explain controls, and make interaction targets visible. The entries below describe status and activity in terms of purpose, appearance, contents, and behavior.

## Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| <a id="qprogressbar"></a> `QProgressBar` | Progress indicator | **Purpose:** Show how far an operation has advanced or that work is still underway.<br><br>**Appearance:** A horizontal or vertical bar, with fill or a busy animation and optional progress text.<br><br>**Contents:** A progress track, filled portion, and optional percentage or value label.<br><br>**Behavior:** Updates from application-reported progress. With an unknown total it can show indeterminate activity. It is a display rather than an input control; it does not include cancellation. | [QProgressBar](https://doc.qt.io/qt-6/qprogressbar.html) |
| <a id="qstatusbar"></a> `QStatusBar` | Status strip | **Purpose:** Keep application state and short feedback visible near the workspace edge.<br><br>**Appearance:** A horizontal strip, usually at the bottom of a main window.<br><br>**Contents:** Temporary messages, normal or permanent status widgets, and optionally a resize grip.<br><br>**Behavior:** Temporary text may replace normal indicators and disappear after a timeout. Permanent indicators remain visible. Embedded controls, such as buttons or progress indicators, retain their own behavior. | [QStatusBar](https://doc.qt.io/qt-6/qstatusbar.html) |
| <a id="qsplashscreen"></a> `QSplashScreen` | Startup splash | **Purpose:** Indicate that an application is starting.<br><br>**Appearance:** An image-based temporary window, commonly centered, with optional overlaid messages.<br><br>**Contents:** A splash image and optional startup status text.<br><br>**Behavior:** Appears during initialization and can be dismissed when the main window is ready. Users can normally hide it by clicking while the application processes input. Messages can change as startup progresses. | [QSplashScreen](https://doc.qt.io/qt-6/qsplashscreen.html) |
| <a id="qsystemtrayicon"></a> `QSystemTrayIcon` | System tray presence | **Purpose:** Keep an application reachable and communicate background status through the desktop.<br><br>**Appearance:** A small icon in the system tray or notification area, with platform-dependent notification presentation.<br><br>**Contents:** An icon, optional tooltip and context menu, and notification messages where supported.<br><br>**Behavior:** Activation can trigger an application-defined action, and the menu exposes commands. Availability, notification delivery, and supported input gestures depend on the desktop environment. | [QSystemTrayIcon](https://doc.qt.io/qt-6/qsystemtrayicon.html) |

## Behavior relationships

These source descriptions retain the original research grouping. The linked contracts are the primary response definitions; I/O/A/U applicability and configuration limits are in the matrix.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| QProgressBar | Progress indicator | Appearance/layout/passive output only at this boundary; no additional response assigned | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qprogressbar) |
| QStatusBar | Status strip | [B02 Disclose and retire transient content](../../behaviors/presence/disclosure.md#b02); [B35 Present contextual or host feedback](../../behaviors/feedback/delivery.md#b35) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qstatusbar) |
| QSplashScreen | Startup splash | [B01 Show, hide and close a surface](../../behaviors/presence/disclosure.md#b01); [B35 Present contextual or host feedback](../../behaviors/feedback/delivery.md#b35) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qsplashscreen) |
| QSystemTrayIcon | System tray presence | [B02 Disclose and retire transient content](../../behaviors/presence/disclosure.md#b02); [B29 Activate a command](../../behaviors/commands/activation.md#b29); [B35 Present contextual or host feedback](../../behaviors/feedback/delivery.md#b35) | [Qualified mapping](../../COMPONENT_BEHAVIOR_MATRIX.md#matrix-qsystemtrayicon) |
