# Qt Widgets UI Component Inventory

## Step 1 result

This inventory identifies the UI components and composition concepts to research in the Qt Widgets survey. It uses user-facing concepts as its unit of study and preserves Qt names only to connect each concept to its documentation.

- Documentation label observed: Qt 6.11.2; navigation label: Qt 6.11.
- Documentation edition: the rolling `qt-6` website. This records the edition observed during research, not the locally installed Qt version or an immutable documentation snapshot.
- Status: All survey steps complete. This file retains the identification summaries; the [catalog index](README.md) leads to the full descriptions.
- Functional categories and subcategories are defined in the [Step 2 hierarchy](02_CATEGORY_HIERARCHY.md). The sections below retain the original inventory groupings.
- Storage: this document, the [survey plan](PLAN.md), and the catalog are in `spec/survey/qt/` in the openui-spec repository.

## Discovery sources

The [Qt Widgets overview](https://doc.qt.io/qt-6/qtwidgets-index.html) establishes the module boundary. The [module catalog](https://doc.qt.io/qt-6/qtwidgets-module.html) provides the discovery checklist. The [widget classes guide](https://doc.qt.io/qt-6/widget-classes.html) was used as a cross-check.

The [widget gallery](https://doc.qt.io/qt-6/gallery.html), [layout guide](https://doc.qt.io/qt-6/layout.html), [dialog guide](https://doc.qt.io/qt-6/dialogs.html), and [graphics view guide](https://doc.qt.io/qt-6/graphicsview.html) provide context for later research. Appearance depends on platform and theme; a gallery example does not define one universal appearance.

Every inventory row links directly to the relevant official component documentation. Linked class pages were opened to check availability. This discovery pass does not claim a complete review of every page's interaction details.

## Inclusion rules

- Include visible controls, content displays, containers, windows, dialogs, visible interaction affordances, and concrete graphical elements.
- Include composition concepts that determine visible arrangement, even when they do not draw a control of their own.
- Keep effects and shared interaction concepts separately identified; they are not additional standalone widgets.
- Combine Qt classes when their distinction is primarily how an application supplies content rather than a distinct user-facing component.
- Keep visible parts such as a pane divider or a header identifiable even when they normally belong to a larger component.
- Abstract names and inclusion decisions are survey interpretations. They are not claims that Qt uses this taxonomy.

## Inventory totals

- **68 component entries**, representing 71 Qt names.
- **11 composition entries**, representing 13 Qt names.
- **8 graphical element entries**, representing 8 Qt names.
- **7 supporting UI concept entries**, representing 7 Qt names.
- **94 entries in total**, mapping to **99 distinct Qt names**.

All 99 mapped Qt names occur in the module discovery catalog.

## Components

Controls, windows, displays, containers, and visible affordances. The generic UI surface and custom graphics surface have application-defined contents; their eventual descriptions must not imply a standard built-in design.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QPushButton` | Push button | Invokes an action. | [QPushButton](https://doc.qt.io/qt-6/qpushbutton.html) |
| `QToolButton` | Tool button | Offers compact access to a command or options. | [QToolButton](https://doc.qt.io/qt-6/qtoolbutton.html) |
| `QCommandLinkButton` | Command choice button | Presents a command with explanatory text. | [QCommandLinkButton](https://doc.qt.io/qt-6/qcommandlinkbutton.html) |
| `QCheckBox` | Checkbox | Toggles a choice, optionally with an intermediate state. | [QCheckBox](https://doc.qt.io/qt-6/qcheckbox.html) |
| `QRadioButton` | Radio option | Chooses an alternative within a set. | [QRadioButton](https://doc.qt.io/qt-6/qradiobutton.html) |
| `QComboBox` | Dropdown selector | Combines a current choice with a popup list. | [QComboBox](https://doc.qt.io/qt-6/qcombobox.html) |
| `QFontComboBox` | Font family selector | Offers available font families. | [QFontComboBox](https://doc.qt.io/qt-6/qfontcombobox.html) |
| `QLineEdit` | Single-line text field | Accepts or displays one line of text. | [QLineEdit](https://doc.qt.io/qt-6/qlineedit.html) |
| `QPlainTextEdit` | Plain text editor | Displays and edits multiple lines without rich formatting. | [QPlainTextEdit](https://doc.qt.io/qt-6/qplaintextedit.html) |
| `QTextEdit` | Rich text editor | Displays and edits formatted text. | [QTextEdit](https://doc.qt.io/qt-6/qtextedit.html) |
| `QTextBrowser` | Linked document viewer | Displays rich text with link navigation. | [QTextBrowser](https://doc.qt.io/qt-6/qtextbrowser.html) |
| `QKeySequenceEdit` | Keyboard shortcut field | Captures a keyboard shortcut. | [QKeySequenceEdit](https://doc.qt.io/qt-6/qkeysequenceedit.html) |
| `QSpinBox` | Integer stepper | Edits whole numbers through typing or stepping. | [QSpinBox](https://doc.qt.io/qt-6/qspinbox.html) |
| `QDoubleSpinBox` | Decimal stepper | Edits fractional numbers through typing or stepping. | [QDoubleSpinBox](https://doc.qt.io/qt-6/qdoublespinbox.html) |
| `QSlider` | Linear value slider | Adjusts a bounded value along a track. | [QSlider](https://doc.qt.io/qt-6/qslider.html) |
| `QDial` | Rotary value control | Adjusts a value using a circular control. | [QDial](https://doc.qt.io/qt-6/qdial.html) |
| `QDateEdit` | Date field | Edits a calendar date. | [QDateEdit](https://doc.qt.io/qt-6/qdateedit.html) |
| `QTimeEdit` | Time field | Edits a time of day. | [QTimeEdit](https://doc.qt.io/qt-6/qtimeedit.html) |
| `QDateTimeEdit` | Date and time field | Edits a combined date and time. | [QDateTimeEdit](https://doc.qt.io/qt-6/qdatetimeedit.html) |
| `QCalendarWidget` | Calendar date picker | Selects dates from a monthly calendar. | [QCalendarWidget](https://doc.qt.io/qt-6/qcalendarwidget.html) |
| `QLabel` | Text or image label | Displays explanatory text or an image. | [QLabel](https://doc.qt.io/qt-6/qlabel.html) |
| `QLCDNumber` | Segmented number display | Presents a number using segmented digits. | [QLCDNumber](https://doc.qt.io/qt-6/qlcdnumber.html) |
| `QProgressBar` | Progress indicator | Shows operation progress or ongoing activity. | [QProgressBar](https://doc.qt.io/qt-6/qprogressbar.html) |
| `QWidget` | Generic UI surface | Provides a general-purpose visible region or container. | [QWidget](https://doc.qt.io/qt-6/qwidget.html) |
| `QFrame` | Bordered panel or separator | Frames content or visually separates regions. | [QFrame](https://doc.qt.io/qt-6/qframe.html) |
| `QGroupBox` | Labeled group | Groups related controls under a title. | [QGroupBox](https://doc.qt.io/qt-6/qgroupbox.html) |
| `QScrollArea` | Scrollable container | Reveals content larger than the available region. | [QScrollArea](https://doc.qt.io/qt-6/qscrollarea.html) |
| `QScrollBar` | Scroll position control | Changes the visible portion of scrollable content. | [QScrollBar](https://doc.qt.io/qt-6/qscrollbar.html) |
| `QSplitter` | Resizable pane group | Divides a region into adjustable panes. | [QSplitter](https://doc.qt.io/qt-6/qsplitter.html) |
| `QSplitterHandle` | Pane divider handle | Lets users resize adjacent panes. | [QSplitterHandle](https://doc.qt.io/qt-6/qsplitterhandle.html) |
| `QStackedWidget` | Page stack | Holds pages and presents the selected page. | [QStackedWidget](https://doc.qt.io/qt-6/qstackedwidget.html) |
| `QTabWidget` | Tabbed container | Pairs page content with selectable tabs. | [QTabWidget](https://doc.qt.io/qt-6/qtabwidget.html) |
| `QTabBar` | Tab strip | Presents tabs for switching between choices. | [QTabBar](https://doc.qt.io/qt-6/qtabbar.html) |
| `QToolBox` | Vertical tabbed container | Shows a page selected through vertically arranged tabs. | [QToolBox](https://doc.qt.io/qt-6/qtoolbox.html) |
| `QMainWindow` | Application main window | Combines central content with surrounding application controls. | [QMainWindow](https://doc.qt.io/qt-6/qmainwindow.html) |
| `QDockWidget` | Dockable panel | Hosts content in a docked or floating panel. | [QDockWidget](https://doc.qt.io/qt-6/qdockwidget.html) |
| `QMdiArea` | Multiple-document workspace | Contains multiple internal document windows. | [QMdiArea](https://doc.qt.io/qt-6/qmdiarea.html) |
| `QMdiSubWindow` | Internal document window | Presents a document within a multiple-document workspace. | [QMdiSubWindow](https://doc.qt.io/qt-6/qmdisubwindow.html) |
| `QMenu` | Popup menu | Presents commands or choices in a popup. | [QMenu](https://doc.qt.io/qt-6/qmenu.html) |
| `QMenuBar` | Menu bar | Provides access to application menus. | [QMenuBar](https://doc.qt.io/qt-6/qmenubar.html) |
| `QToolBar` | Toolbar | Groups frequently used commands and controls. | [QToolBar](https://doc.qt.io/qt-6/qtoolbar.html) |
| `QStatusBar` | Status strip | Presents application status and supporting indicators. | [QStatusBar](https://doc.qt.io/qt-6/qstatusbar.html) |
| `QSystemTrayIcon` | System tray presence | Represents an application in the desktop notification area. | [QSystemTrayIcon](https://doc.qt.io/qt-6/qsystemtrayicon.html) |
| `QSplashScreen` | Startup splash | Presents an image and optional startup messages. | [QSplashScreen](https://doc.qt.io/qt-6/qsplashscreen.html) |
| `QSizeGrip` | Window resize handle | Provides a handle for resizing a window. | [QSizeGrip](https://doc.qt.io/qt-6/qsizegrip.html) |
| `QDialog` | Dialog window | Hosts a focused interaction in a separate window. | [QDialog](https://doc.qt.io/qt-6/qdialog.html) |
| `QDialogButtonBox` | Dialog action group | Arranges dialog actions according to platform conventions. | [QDialogButtonBox](https://doc.qt.io/qt-6/qdialogbuttonbox.html) |
| `QMessageBox` | Message and decision dialog | Presents information or requests a decision. | [QMessageBox](https://doc.qt.io/qt-6/qmessagebox.html) |
| `QErrorMessage` | Suppressible error dialog | Shows error messages that users can suppress. | [QErrorMessage](https://doc.qt.io/qt-6/qerrormessage.html) |
| `QInputDialog` | Single-value prompt | Requests one value through a small dialog. | [QInputDialog](https://doc.qt.io/qt-6/qinputdialog.html) |
| `QFileDialog` | File or folder picker | Selects a file or directory. | [QFileDialog](https://doc.qt.io/qt-6/qfiledialog.html) |
| `QColorDialog` | Color picker dialog | Lets users choose a color. | [QColorDialog](https://doc.qt.io/qt-6/qcolordialog.html) |
| `QFontDialog` | Font picker dialog | Lets users choose font settings. | [QFontDialog](https://doc.qt.io/qt-6/qfontdialog.html) |
| `QProgressDialog` | Operation progress dialog | Presents progress and optional cancellation. | [QProgressDialog](https://doc.qt.io/qt-6/qprogressdialog.html) |
| `QWizard` | Guided multi-step dialog | Leads users through a sequence of pages. | [QWizard](https://doc.qt.io/qt-6/qwizard.html) |
| `QWizardPage` | Guided step page | Contains the content of one guided step. | [QWizardPage](https://doc.qt.io/qt-6/qwizardpage.html) |
| `QListView`, `QListWidget` | List or icon collection | Presents a collection as list entries or icons. | [QListView](https://doc.qt.io/qt-6/qlistview.html); [QListWidget](https://doc.qt.io/qt-6/qlistwidget.html) |
| `QTableView`, `QTableWidget` | Data table | Presents records in rows and columns. | [QTableView](https://doc.qt.io/qt-6/qtableview.html); [QTableWidget](https://doc.qt.io/qt-6/qtablewidget.html) |
| `QTreeView`, `QTreeWidget` | Hierarchical tree | Presents expandable parent and child entries. | [QTreeView](https://doc.qt.io/qt-6/qtreeview.html); [QTreeWidget](https://doc.qt.io/qt-6/qtreewidget.html) |
| `QColumnView` | Cascading column browser | Navigates a hierarchy through adjacent columns. | [QColumnView](https://doc.qt.io/qt-6/qcolumnview.html) |
| `QHeaderView` | Table or tree header | Labels sections of a data view. | [QHeaderView](https://doc.qt.io/qt-6/qheaderview.html) |
| `QUndoView` | Undo history list | Presents actions for navigating editing history. | [QUndoView](https://doc.qt.io/qt-6/qundoview.html) |
| `QToolTip` | Tooltip | Provides brief contextual information in a popup. | [QToolTip](https://doc.qt.io/qt-6/qtooltip.html) |
| `QWhatsThis` | Contextual help popup | Explains a control through on-demand help. | [QWhatsThis](https://doc.qt.io/qt-6/qwhatsthis.html) |
| `QFocusFrame` | Focus outline | Marks the control receiving keyboard input. | [QFocusFrame](https://doc.qt.io/qt-6/qfocusframe.html) |
| `QRubberBand` | Selection or boundary outline | Indicates a proposed selection region or boundary. | [QRubberBand](https://doc.qt.io/qt-6/qrubberband.html) |
| `QGraphicsView` | Interactive graphics viewport | Displays a scene of graphical content. | [QGraphicsView](https://doc.qt.io/qt-6/qgraphicsview.html) |
| `QRhiWidget` | Custom graphics surface | Displays application-defined rendered graphics; no standard visual contents. | [QRhiWidget](https://doc.qt.io/qt-6/qrhiwidget.html) |

## Composition concepts

Arrangements, spacing, scene contents, and grouping. A layout or scene does not independently appear as a separate interactive control; its visible result is expressed through its contents.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QBoxLayout`, `QHBoxLayout`, `QVBoxLayout` | Linear arrangement | Arranges child components in a row or column. | [QBoxLayout](https://doc.qt.io/qt-6/qboxlayout.html); [QHBoxLayout](https://doc.qt.io/qt-6/qhboxlayout.html); [QVBoxLayout](https://doc.qt.io/qt-6/qvboxlayout.html) |
| `QGridLayout` | Grid arrangement | Places child components in rows and columns. | [QGridLayout](https://doc.qt.io/qt-6/qgridlayout.html) |
| `QFormLayout` | Label and field arrangement | Pairs field labels with their input controls. | [QFormLayout](https://doc.qt.io/qt-6/qformlayout.html) |
| `QStackedLayout` | Layered page arrangement | Places pages in a shared region with configurable visibility. | [QStackedLayout](https://doc.qt.io/qt-6/qstackedlayout.html) |
| `QSpacerItem` | Layout space | Reserves blank space between or around components. | [QSpacerItem](https://doc.qt.io/qt-6/qspaceritem.html) |
| `QGraphicsAnchorLayout` | Anchored arrangement | Relates edges of graphical widgets to arrange them. | [QGraphicsAnchorLayout](https://doc.qt.io/qt-6/qgraphicsanchorlayout.html) |
| `QGraphicsGridLayout` | Graphics grid arrangement | Arranges graphical widgets in a grid. | [QGraphicsGridLayout](https://doc.qt.io/qt-6/qgraphicsgridlayout.html) |
| `QGraphicsLinearLayout` | Graphics linear arrangement | Arranges graphical widgets along one direction. | [QGraphicsLinearLayout](https://doc.qt.io/qt-6/qgraphicslinearlayout.html) |
| `QGraphicsScene` | Graphics content scene | Contains the graphical objects presented by a viewport. | [QGraphicsScene](https://doc.qt.io/qt-6/qgraphicsscene.html) |
| `QGraphicsWidget` | Graphics scene UI container | Hosts widget-like content within a graphics scene. | [QGraphicsWidget](https://doc.qt.io/qt-6/qgraphicswidget.html) |
| `QGraphicsItemGroup` | Grouped graphics | Treats several graphical objects as a combined group. | [QGraphicsItemGroup](https://doc.qt.io/qt-6/qgraphicsitemgroup.html) |

## Graphical elements

Concrete content primitives for a graphics viewport. Selection, movement, and editing must be described as capabilities enabled by the application where applicable, not universal default behavior.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QGraphicsEllipseItem` | Ellipse or circle | Presents an elliptical shape in a scene. | [QGraphicsEllipseItem](https://doc.qt.io/qt-6/qgraphicsellipseitem.html) |
| `QGraphicsRectItem` | Rectangle | Presents a rectangular shape in a scene. | [QGraphicsRectItem](https://doc.qt.io/qt-6/qgraphicsrectitem.html) |
| `QGraphicsLineItem` | Line | Presents a line segment in a scene. | [QGraphicsLineItem](https://doc.qt.io/qt-6/qgraphicslineitem.html) |
| `QGraphicsPolygonItem` | Polygon | Presents a shape defined by connected vertices. | [QGraphicsPolygonItem](https://doc.qt.io/qt-6/qgraphicspolygonitem.html) |
| `QGraphicsPathItem` | Custom path | Presents a custom curved or segmented shape. | [QGraphicsPathItem](https://doc.qt.io/qt-6/qgraphicspathitem.html) |
| `QGraphicsPixmapItem` | Raster image | Presents a bitmap image within a scene. | [QGraphicsPixmapItem](https://doc.qt.io/qt-6/qgraphicspixmapitem.html) |
| `QGraphicsSimpleTextItem` | Simple graphics label | Presents a simple text label within a scene. | [QGraphicsSimpleTextItem](https://doc.qt.io/qt-6/qgraphicssimpletextitem.html) |
| `QGraphicsTextItem` | Rich graphics text | Presents formatted text within a scene. | [QGraphicsTextItem](https://doc.qt.io/qt-6/qgraphicstextitem.html) |

## Supporting UI concepts

Shared concepts for component descriptions. Their primary categories are assigned in the [Step 2 hierarchy](02_CATEGORY_HIERARCHY.md). Text completion and button coordination do not imply an independently visible container.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QCompleter` | Text completion | Supplies suggestions through a popup or inline completion. | [QCompleter](https://doc.qt.io/qt-6/qcompleter.html) |
| `QButtonGroup` | Related button choices | Coordinates choices without drawing a visible container. | [QButtonGroup](https://doc.qt.io/qt-6/qbuttongroup.html) |
| `QScroller` | Kinetic scrolling | Continues scrolling with motion-like behavior after an input gesture. | [QScroller](https://doc.qt.io/qt-6/qscroller.html) |
| `QGraphicsBlurEffect` | Blur treatment | Softens the appearance of visible content. | [QGraphicsBlurEffect](https://doc.qt.io/qt-6/qgraphicsblureffect.html) |
| `QGraphicsColorizeEffect` | Color tint treatment | Tints visible content toward a chosen color. | [QGraphicsColorizeEffect](https://doc.qt.io/qt-6/qgraphicscolorizeeffect.html) |
| `QGraphicsDropShadowEffect` | Drop shadow treatment | Adds a shadow behind visible content. | [QGraphicsDropShadowEffect](https://doc.qt.io/qt-6/qgraphicsdropshadoweffect.html) |
| `QGraphicsOpacityEffect` | Opacity treatment | Makes visible content more transparent. | [QGraphicsOpacityEffect](https://doc.qt.io/qt-6/qgraphicsopacityeffect.html) |

## Validation and next-step handoff

The discovery inventory was reconciled against the module catalog: 99 unique mapped names are present, no mapped name is repeated in another row, and all 94 rows contain the required four fields and direct official links.

This step establishes a researched starting inventory. Final component granularity may change as variants and overlapping concepts are examined; any additions or merges should be recorded rather than silently changing the counts.

Step 2 has assigned functional categories and subcategories to all entries, including the seven supporting concepts. See the [category hierarchy](02_CATEGORY_HIERARCHY.md). Full descriptions of purpose, appearance, contents, and behavior are available through the [catalog index](README.md).

## Completed behavior revision

The 94-entry / 99-name inventory and nine-category / 27-subcategory source organization are retained as the research baseline. Primary response definitions now live in [the behavior hierarchy](BEHAVIOR_TAXONOMY_PROPOSAL.md). [Reconciliation](CLASSIFICATION_RECONCILIATION.md) separates component, part, composition, layout, behavior-support and appearance counts; [the matrix](COMPONENT_BEHAVIOR_MATRIX.md) records each entry’s qualified relationships. Original supporting-concept placement is source navigation, not a second primary behavior definition.
