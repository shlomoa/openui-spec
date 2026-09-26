# Qt Widgets survey: taxonomy mapping

[Survey README](README.md) · [Categories](category.md) · [Scopes proposal](scopes_proposal.md)

This file normalizes the Qt survey's [taxonomy crosswalk](inventory/TAXONOMY_MAPPING.md). Each row is one Qt survey entry mapped to its best existing OpenUI scope anchor. The response-behavior mapping is in [BEHAVIOR_SCOPE_MAPPING.md](inventory/BEHAVIOR_SCOPE_MAPPING.md), and the consolidated 245-row review drafts are [GENERIC_UI_TAXONOMY_DRAFT.md](inventory/GENERIC_UI_TAXONOMY_DRAFT.md) and [TAXONOMY_MAPPING_DRAFT.md](inventory/TAXONOMY_MAPPING_DRAFT.md).

The _Merge disposition_ column keeps the survey's labels: Reuse, Enhance, Owned part, Folder notion, New leaf and Deferred. An existing destination does not mean its current contract already covers every Qt capability. The New leaf rows name the proposed leaves P01–P06; see [scopes_proposal.md](scopes_proposal.md).

Scope paths are relative to `spec/scopes/`. The mapping records survey proposals only; the canonical scope tree, [taxonomy mapping](../../scopes/taxonomy_mapping.md) and generated catalog are unchanged.

## Summary

94 source entries map to 29 OpenUI scopes. Merge disposition totals: Enhance 71, Reuse 10, Owned part 4, Folder notion 4, New leaf 4, Deferred 1.

| OpenUI scope                                                                                          | Primary entries | All mentions |
| ----------------------------------------------------------------------------------------------------- | --------------: | -----------: |
| [Application/scope.md](../../scopes/Application/scope.md)                                             |               1 |            1 |
| [Application/tool_bars.scope.md](../../scopes/Application/tool_bars.scope.md)                         |               1 |            1 |
| [Behaviors/resizable.scope.md](../../scopes/Behaviors/resizable.scope.md)                             |               1 |            1 |
| [Behaviors/scope.md](../../scopes/Behaviors/scope.md)                                                 |               1 |            1 |
| [Containers/grid.scope.md](../../scopes/Containers/grid.scope.md)                                     |               2 |            2 |
| [Containers/splitters.scope.md](../../scopes/Containers/splitters.scope.md)                           |               2 |            2 |
| [Containers/structural_containers.scope.md](../../scopes/Containers/structural_containers.scope.md)   |               4 |            4 |
| [Containers/surface_containers.scope.md](../../scopes/Containers/surface_containers.scope.md)         |               8 |            8 |
| [Containers/tabs.scope.md](../../scopes/Containers/tabs.scope.md)                                     |               3 |            3 |
| [Controls/action_controls.scope.md](../../scopes/Controls/action_controls.scope.md)                   |               3 |            3 |
| [Controls/choice_controls.scope.md](../../scopes/Controls/choice_controls.scope.md)                   |               5 |            5 |
| [Controls/display_primitives.scope.md](../../scopes/Controls/display_primitives.scope.md)             |              11 |           11 |
| [Controls/link_and_scroll_controls.scope.md](../../scopes/Controls/link_and_scroll_controls.scope.md) |               1 |            1 |
| [Controls/picker_control.scope.md](../../scopes/Controls/picker_control.scope.md)                     |               3 |            3 |
| [Controls/range_control.scope.md](../../scopes/Controls/range_control.scope.md)                       |               4 |            4 |
| [Controls/status_indicator.scope.md](../../scopes/Controls/status_indicator.scope.md)                 |               2 |            2 |
| [Controls/text_inputs.scope.md](../../scopes/Controls/text_inputs.scope.md)                           |               4 |            4 |
| [Interaction/scope.md](../../scopes/Interaction/scope.md)                                             |               1 |            1 |
| [Layout/scope.md](../../scopes/Layout/scope.md)                                                       |               6 |            6 |
| [Presentation/scope.md](../../scopes/Presentation/scope.md)                                           |               6 |            6 |
| [Widgets/data_grid.scope.md](../../scopes/Widgets/data_grid.scope.md)                                 |               2 |            2 |
| [Widgets/date_time_pickers.scope.md](../../scopes/Widgets/date_time_pickers.scope.md)                 |               4 |            4 |
| [Widgets/dialog.scope.md](../../scopes/Widgets/dialog.scope.md)                                       |               6 |            6 |
| [Widgets/feedback_widgets.scope.md](../../scopes/Widgets/feedback_widgets.scope.md)                   |               3 |            3 |
| [Widgets/list.scope.md](../../scopes/Widgets/list.scope.md)                                           |               2 |            2 |
| [Widgets/media_widgets.scope.md](../../scopes/Widgets/media_widgets.scope.md)                         |               2 |            2 |
| [Widgets/menu_widgets.scope.md](../../scopes/Widgets/menu_widgets.scope.md)                           |               2 |            2 |
| [Widgets/navigation_widgets.scope.md](../../scopes/Widgets/navigation_widgets.scope.md)               |               2 |            2 |
| [Widgets/stepper.scope.md](../../scopes/Widgets/stepper.scope.md)                                     |               2 |            2 |

## Entries by primary OpenUI scope

The first scope listed is the primary destination used for grouping; further scopes are secondary destinations named by the source row.

### Application/scope.md

| Source entry    | Abstract concept     | Other OpenUI scopes | Merge disposition | Source row                                                       |
| --------------- | -------------------- | ------------------- | ----------------- | ---------------------------------------------------------------- |
| QSystemTrayIcon | System tray presence | —                   | Deferred          | [Status and help](inventory/TAXONOMY_MAPPING.md#status-and-help) |

### Application/tool_bars.scope.md

| Source entry | Abstract concept | Other OpenUI scopes | Merge disposition | Source row                                         |
| ------------ | ---------------- | ------------------- | ----------------- | -------------------------------------------------- |
| QToolBar     | Toolbar          | —                   | Reuse             | [Commands](inventory/TAXONOMY_MAPPING.md#commands) |

### Behaviors/resizable.scope.md

| Source entry | Abstract concept     | Other OpenUI scopes | Merge disposition | Source row                                                               |
| ------------ | -------------------- | ------------------- | ----------------- | ------------------------------------------------------------------------ |
| QSizeGrip    | Window resize handle | —                   | Reuse             | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs) |

### Behaviors/scope.md

| Source entry | Abstract concept | Other OpenUI scopes | Merge disposition | Source row                                                               |
| ------------ | ---------------- | ------------------- | ----------------- | ------------------------------------------------------------------------ |
| QCompleter   | Text completion  | —                   | New leaf          | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |

### Containers/grid.scope.md

| Source entry        | Abstract concept          | Other OpenUI scopes | Merge disposition | Source row                                                                   |
| ------------------- | ------------------------- | ------------------- | ----------------- | ---------------------------------------------------------------------------- |
| QGraphicsGridLayout | Graphics grid arrangement | —                   | Reuse             | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics)                           |
| QGridLayout         | Grid arrangement          | —                   | Reuse             | [Containers and layout](inventory/TAXONOMY_MAPPING.md#containers-and-layout) |

### Containers/splitters.scope.md

| Source entry    | Abstract concept     | Other OpenUI scopes | Merge disposition | Source row                                                                   |
| --------------- | -------------------- | ------------------- | ----------------- | ---------------------------------------------------------------------------- |
| QSplitter       | Resizable pane group | —                   | Reuse             | [Containers and layout](inventory/TAXONOMY_MAPPING.md#containers-and-layout) |
| QSplitterHandle | Pane divider handle  | —                   | Owned part        | [Containers and layout](inventory/TAXONOMY_MAPPING.md#containers-and-layout) |

### Containers/structural_containers.scope.md

| Source entry       | Abstract concept       | Other OpenUI scopes | Merge disposition | Source row                                             |
| ------------------ | ---------------------- | ------------------- | ----------------- | ------------------------------------------------------ |
| QGraphicsItemGroup | Grouped graphics       | —                   | Enhance           | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics)     |
| QGraphicsScene     | Graphics content scene | —                   | Enhance           | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics)     |
| QScrollArea        | Scrollable container   | —                   | New leaf          | [Navigation](inventory/TAXONOMY_MAPPING.md#navigation) |
| QStackedWidget     | Page stack             | —                   | New leaf          | [Navigation](inventory/TAXONOMY_MAPPING.md#navigation) |

### Containers/surface_containers.scope.md

| Source entry    | Abstract concept            | Other OpenUI scopes | Merge disposition | Source row                                                                   |
| --------------- | --------------------------- | ------------------- | ----------------- | ---------------------------------------------------------------------------- |
| QDockWidget     | Dockable panel              | —                   | Enhance           | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs)     |
| QFrame          | Bordered panel or separator | —                   | Enhance           | [Containers and layout](inventory/TAXONOMY_MAPPING.md#containers-and-layout) |
| QGraphicsWidget | Graphics scene UI container | —                   | Enhance           | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics)                           |
| QGroupBox       | Labeled group               | —                   | Enhance           | [Containers and layout](inventory/TAXONOMY_MAPPING.md#containers-and-layout) |
| QMainWindow     | Application main window     | —                   | Enhance           | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs)     |
| QMdiArea        | Multiple-document workspace | —                   | Enhance           | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs)     |
| QMdiSubWindow   | Internal document window    | —                   | Enhance           | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs)     |
| QWidget         | Generic UI surface          | —                   | Enhance           | [Containers and layout](inventory/TAXONOMY_MAPPING.md#containers-and-layout) |

### Containers/tabs.scope.md

| Source entry | Abstract concept          | Other OpenUI scopes | Merge disposition | Source row                                             |
| ------------ | ------------------------- | ------------------- | ----------------- | ------------------------------------------------------ |
| QTabBar      | Tab strip                 | —                   | Enhance           | [Navigation](inventory/TAXONOMY_MAPPING.md#navigation) |
| QTabWidget   | Tabbed container          | —                   | Enhance           | [Navigation](inventory/TAXONOMY_MAPPING.md#navigation) |
| QToolBox     | Vertical tabbed container | —                   | Enhance           | [Navigation](inventory/TAXONOMY_MAPPING.md#navigation) |

### Controls/action_controls.scope.md

| Source entry       | Abstract concept      | Other OpenUI scopes | Merge disposition | Source row                                         |
| ------------------ | --------------------- | ------------------- | ----------------- | -------------------------------------------------- |
| QCommandLinkButton | Command choice button | —                   | Reuse             | [Commands](inventory/TAXONOMY_MAPPING.md#commands) |
| QPushButton        | Push button           | —                   | Reuse             | [Commands](inventory/TAXONOMY_MAPPING.md#commands) |
| QToolButton        | Tool button           | —                   | Reuse             | [Commands](inventory/TAXONOMY_MAPPING.md#commands) |

### Controls/choice_controls.scope.md

| Source entry  | Abstract concept       | Other OpenUI scopes | Merge disposition | Source row                                                               |
| ------------- | ---------------------- | ------------------- | ----------------- | ------------------------------------------------------------------------ |
| QButtonGroup  | Related button choices | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |
| QCheckBox     | Checkbox               | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |
| QComboBox     | Dropdown selector      | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |
| QFontComboBox | Font family selector   | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |
| QRadioButton  | Radio option           | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |

### Controls/display_primitives.scope.md

| Source entry            | Abstract concept         | Other OpenUI scopes | Merge disposition | Source row                                                         |
| ----------------------- | ------------------------ | ------------------- | ----------------- | ------------------------------------------------------------------ |
| QGraphicsEllipseItem    | Ellipse or circle        | —                   | Enhance           | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics)                 |
| QGraphicsLineItem       | Line                     | —                   | Enhance           | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics)                 |
| QGraphicsPathItem       | Custom path              | —                   | Enhance           | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics)                 |
| QGraphicsPixmapItem     | Raster image             | —                   | Enhance           | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics)                 |
| QGraphicsPolygonItem    | Polygon                  | —                   | Enhance           | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics)                 |
| QGraphicsRectItem       | Rectangle                | —                   | Enhance           | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics)                 |
| QGraphicsSimpleTextItem | Simple graphics label    | —                   | Enhance           | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics)                 |
| QGraphicsTextItem       | Rich graphics text       | —                   | Enhance           | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics)                 |
| QLabel                  | Text or image label      | —                   | Enhance           | [Content and data](inventory/TAXONOMY_MAPPING.md#content-and-data) |
| QLCDNumber              | Segmented number display | —                   | Enhance           | [Content and data](inventory/TAXONOMY_MAPPING.md#content-and-data) |
| QTextBrowser            | Linked document viewer   | —                   | Enhance           | [Content and data](inventory/TAXONOMY_MAPPING.md#content-and-data) |

### Controls/link_and_scroll_controls.scope.md

| Source entry | Abstract concept        | Other OpenUI scopes | Merge disposition | Source row                                             |
| ------------ | ----------------------- | ------------------- | ----------------- | ------------------------------------------------------ |
| QScrollBar   | Scroll position control | —                   | Reuse             | [Navigation](inventory/TAXONOMY_MAPPING.md#navigation) |

### Controls/picker_control.scope.md

| Source entry | Abstract concept      | Other OpenUI scopes | Merge disposition | Source row                                                               |
| ------------ | --------------------- | ------------------- | ----------------- | ------------------------------------------------------------------------ |
| QColorDialog | Color picker dialog   | —                   | Enhance           | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs) |
| QFileDialog  | File or folder picker | —                   | Enhance           | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs) |
| QFontDialog  | Font picker dialog    | —                   | Enhance           | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs) |

### Controls/range_control.scope.md

| Source entry   | Abstract concept     | Other OpenUI scopes | Merge disposition | Source row                                                               |
| -------------- | -------------------- | ------------------- | ----------------- | ------------------------------------------------------------------------ |
| QDial          | Rotary value control | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |
| QDoubleSpinBox | Decimal stepper      | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |
| QSlider        | Linear value slider  | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |
| QSpinBox       | Integer stepper      | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |

### Controls/status_indicator.scope.md

| Source entry | Abstract concept   | Other OpenUI scopes | Merge disposition | Source row                                                       |
| ------------ | ------------------ | ------------------- | ----------------- | ---------------------------------------------------------------- |
| QProgressBar | Progress indicator | —                   | Enhance           | [Status and help](inventory/TAXONOMY_MAPPING.md#status-and-help) |
| QStatusBar   | Status strip       | —                   | Enhance           | [Status and help](inventory/TAXONOMY_MAPPING.md#status-and-help) |

### Controls/text_inputs.scope.md

| Source entry     | Abstract concept        | Other OpenUI scopes | Merge disposition | Source row                                                               |
| ---------------- | ----------------------- | ------------------- | ----------------- | ------------------------------------------------------------------------ |
| QKeySequenceEdit | Keyboard shortcut field | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |
| QLineEdit        | Single-line text field  | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |
| QPlainTextEdit   | Plain text editor       | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |
| QTextEdit        | Rich text editor        | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |

### Interaction/scope.md

| Source entry | Abstract concept  | Other OpenUI scopes | Merge disposition | Source row                                             |
| ------------ | ----------------- | ------------------- | ----------------- | ------------------------------------------------------ |
| QScroller    | Kinetic scrolling | —                   | Enhance           | [Navigation](inventory/TAXONOMY_MAPPING.md#navigation) |

### Layout/scope.md

| Source entry                         | Abstract concept            | Other OpenUI scopes | Merge disposition | Source row                                                                   |
| ------------------------------------ | --------------------------- | ------------------- | ----------------- | ---------------------------------------------------------------------------- |
| QBoxLayout, QHBoxLayout, QVBoxLayout | Linear arrangement          | —                   | Folder notion     | [Containers and layout](inventory/TAXONOMY_MAPPING.md#containers-and-layout) |
| QFormLayout                          | Label and field arrangement | —                   | Enhance           | [Containers and layout](inventory/TAXONOMY_MAPPING.md#containers-and-layout) |
| QGraphicsAnchorLayout                | Anchored arrangement        | —                   | Folder notion     | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics)                           |
| QGraphicsLinearLayout                | Graphics linear arrangement | —                   | Folder notion     | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics)                           |
| QSpacerItem                          | Layout space                | —                   | Folder notion     | [Containers and layout](inventory/TAXONOMY_MAPPING.md#containers-and-layout) |
| QStackedLayout                       | Layered page arrangement    | —                   | Enhance           | [Containers and layout](inventory/TAXONOMY_MAPPING.md#containers-and-layout) |

### Presentation/scope.md

| Source entry              | Abstract concept              | Other OpenUI scopes | Merge disposition | Source row                                                       |
| ------------------------- | ----------------------------- | ------------------- | ----------------- | ---------------------------------------------------------------- |
| QFocusFrame               | Focus outline                 | —                   | Enhance           | [Status and help](inventory/TAXONOMY_MAPPING.md#status-and-help) |
| QGraphicsBlurEffect       | Blur treatment                | —                   | Enhance           | [Appearance](inventory/TAXONOMY_MAPPING.md#appearance)           |
| QGraphicsColorizeEffect   | Color tint treatment          | —                   | Enhance           | [Appearance](inventory/TAXONOMY_MAPPING.md#appearance)           |
| QGraphicsDropShadowEffect | Drop shadow treatment         | —                   | Enhance           | [Appearance](inventory/TAXONOMY_MAPPING.md#appearance)           |
| QGraphicsOpacityEffect    | Opacity treatment             | —                   | Enhance           | [Appearance](inventory/TAXONOMY_MAPPING.md#appearance)           |
| QRubberBand               | Selection or boundary outline | —                   | Enhance           | [Status and help](inventory/TAXONOMY_MAPPING.md#status-and-help) |

### Widgets/data_grid.scope.md

| Source entry             | Abstract concept     | Other OpenUI scopes | Merge disposition | Source row                                                         |
| ------------------------ | -------------------- | ------------------- | ----------------- | ------------------------------------------------------------------ |
| QHeaderView              | Table or tree header | —                   | Owned part        | [Content and data](inventory/TAXONOMY_MAPPING.md#content-and-data) |
| QTableView, QTableWidget | Data table           | —                   | Reuse             | [Content and data](inventory/TAXONOMY_MAPPING.md#content-and-data) |

### Widgets/date_time_pickers.scope.md

| Source entry    | Abstract concept     | Other OpenUI scopes | Merge disposition | Source row                                                               |
| --------------- | -------------------- | ------------------- | ----------------- | ------------------------------------------------------------------------ |
| QCalendarWidget | Calendar date picker | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |
| QDateEdit       | Date field           | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |
| QDateTimeEdit   | Date and time field  | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |
| QTimeEdit       | Time field           | —                   | Enhance           | [Input and selection](inventory/TAXONOMY_MAPPING.md#input-and-selection) |

### Widgets/dialog.scope.md

| Source entry     | Abstract concept            | Other OpenUI scopes | Merge disposition | Source row                                                               |
| ---------------- | --------------------------- | ------------------- | ----------------- | ------------------------------------------------------------------------ |
| QDialog          | Dialog window               | —                   | Enhance           | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs) |
| QDialogButtonBox | Dialog action group         | —                   | Owned part        | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs) |
| QErrorMessage    | Suppressible error dialog   | —                   | Enhance           | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs) |
| QInputDialog     | Single-value prompt         | —                   | Enhance           | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs) |
| QMessageBox      | Message and decision dialog | —                   | Enhance           | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs) |
| QProgressDialog  | Operation progress dialog   | —                   | Enhance           | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs) |

### Widgets/feedback_widgets.scope.md

| Source entry  | Abstract concept      | Other OpenUI scopes | Merge disposition | Source row                                                       |
| ------------- | --------------------- | ------------------- | ----------------- | ---------------------------------------------------------------- |
| QSplashScreen | Startup splash        | —                   | Enhance           | [Status and help](inventory/TAXONOMY_MAPPING.md#status-and-help) |
| QToolTip      | Tooltip               | —                   | Enhance           | [Status and help](inventory/TAXONOMY_MAPPING.md#status-and-help) |
| QWhatsThis    | Contextual help popup | —                   | Enhance           | [Status and help](inventory/TAXONOMY_MAPPING.md#status-and-help) |

### Widgets/list.scope.md

| Source entry           | Abstract concept        | Other OpenUI scopes | Merge disposition | Source row                                                         |
| ---------------------- | ----------------------- | ------------------- | ----------------- | ------------------------------------------------------------------ |
| QListView, QListWidget | List or icon collection | —                   | Enhance           | [Content and data](inventory/TAXONOMY_MAPPING.md#content-and-data) |
| QUndoView              | Undo history list       | —                   | Enhance           | [Commands](inventory/TAXONOMY_MAPPING.md#commands)                 |

### Widgets/media_widgets.scope.md

| Source entry  | Abstract concept              | Other OpenUI scopes | Merge disposition | Source row                                         |
| ------------- | ----------------------------- | ------------------- | ----------------- | -------------------------------------------------- |
| QGraphicsView | Interactive graphics viewport | —                   | New leaf          | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics) |
| QRhiWidget    | Custom graphics surface       | —                   | Enhance           | [Graphics](inventory/TAXONOMY_MAPPING.md#graphics) |

### Widgets/menu_widgets.scope.md

| Source entry | Abstract concept | Other OpenUI scopes | Merge disposition | Source row                                         |
| ------------ | ---------------- | ------------------- | ----------------- | -------------------------------------------------- |
| QMenu        | Popup menu       | —                   | Enhance           | [Commands](inventory/TAXONOMY_MAPPING.md#commands) |
| QMenuBar     | Menu bar         | —                   | Enhance           | [Commands](inventory/TAXONOMY_MAPPING.md#commands) |

### Widgets/navigation_widgets.scope.md

| Source entry           | Abstract concept         | Other OpenUI scopes | Merge disposition | Source row                                                         |
| ---------------------- | ------------------------ | ------------------- | ----------------- | ------------------------------------------------------------------ |
| QColumnView            | Cascading column browser | —                   | Enhance           | [Content and data](inventory/TAXONOMY_MAPPING.md#content-and-data) |
| QTreeView, QTreeWidget | Hierarchical tree        | —                   | Enhance           | [Content and data](inventory/TAXONOMY_MAPPING.md#content-and-data) |

### Widgets/stepper.scope.md

| Source entry | Abstract concept         | Other OpenUI scopes | Merge disposition | Source row                                                               |
| ------------ | ------------------------ | ------------------- | ----------------- | ------------------------------------------------------------------------ |
| QWizard      | Guided multi-step dialog | —                   | Enhance           | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs) |
| QWizardPage  | Guided step page         | —                   | Owned part        | [Windows and dialogs](inventory/TAXONOMY_MAPPING.md#windows-and-dialogs) |
