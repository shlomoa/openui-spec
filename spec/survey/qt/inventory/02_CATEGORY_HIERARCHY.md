# Qt Widgets UI Component Category Hierarchy

## Step 2 result

The [component inventory](01_COMPONENT_INVENTORY.md) is organized into **9 categories and 27 subcategories**. Every one of its **94 entries** has exactly one primary home. The entries retain their **99 Qt names**, abstract names, identification summaries, and official source links.

This hierarchy follows the purpose experienced by the user. It is a survey taxonomy, not Qt's class hierarchy. This file retains the assignment summaries. Full descriptions of purpose, appearance, contents, and behavior are available through the [catalog index](README.md).

## Category navigation

- [Commands](#commands) — 7 entries, 3 subcategories.
- [Input and selection](#input-and-selection) — 18 entries, 4 subcategories.
- [Content and data presentation](#content-and-data) — 8 entries, 3 subcategories.
- [Page navigation and scrolling](#navigation) — 7 entries, 2 subcategories.
- [Containers and layout](#containers-and-layout) — 10 entries, 3 subcategories.
- [Windows and dialogs](#windows-and-dialogs) — 16 entries, 5 subcategories.
- [Status help and interaction feedback](#status-and-help) — 8 entries, 3 subcategories.
- [Graphics surfaces and content](#graphics) — 16 entries, 4 subcategories.
- [Visual effects](#appearance) — 4 entries, direct entries.

## Assignment principles

- Give each entry a primary home based on its main purpose. Cross-references explain other uses.
- Keep composite components together. For example, a font picker dialog belongs with dialogs, while the font dropdown belongs with input controls.
- Treat behavior and appearance concepts as clearly identified supporting entries. Their descriptions must explain the effect on a component or group.
- Keep the combined Qt names from Step 1 together. Differences in how content is supplied do not require duplicate user-facing concepts.
- Assign generic objects directly to a category when a narrower subcategory adds little value.
- Keep variants and constituent parts in the detailed descriptions of their owning components unless the inventory already identifies them separately.

## Supporting concept placement

- **Text completion** → Input and selection / Text and shortcuts. A shared aid for entering text.
- **Related button choices** → Input and selection / Choices. Coordination of choices; the visible group container is described separately.
- **Kinetic scrolling** → Page navigation and scrolling / Scrolling. A shared scrolling behavior.
- **Blur, color tint, drop shadow, and opacity** → Visual effects. Shared appearance treatments.

These seven entries remain traceable in the catalog and count toward the existing 94 entries. They are not represented as additional standalone widgets.

<a id="commands"></a>

## Commands

Invoke actions and expose command collections.

Related categories: [Input and selection](#input-and-selection) covers choosing values; [Windows and dialogs](#windows-and-dialogs) owns dialog action groups.

### Direct objects

All entries in this category are assigned to the subcategories below.

### Action buttons

Offer a single command or a compact set of options.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QPushButton` | Push button | Invokes an action. | [QPushButton](https://doc.qt.io/qt-6/qpushbutton.html) |
| `QToolButton` | Tool button | Offers compact access to a command or options. | [QToolButton](https://doc.qt.io/qt-6/qtoolbutton.html) |
| `QCommandLinkButton` | Command choice button | Presents a command with explanatory text. | [QCommandLinkButton](https://doc.qt.io/qt-6/qcommandlinkbutton.html) |

### Command collections

Organize access to related commands.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QMenu` | Popup menu | Presents commands or choices in a popup. | [QMenu](https://doc.qt.io/qt-6/qmenu.html) |
| `QMenuBar` | Menu bar | Provides access to application menus. | [QMenuBar](https://doc.qt.io/qt-6/qmenubar.html) |
| `QToolBar` | Toolbar | Groups frequently used commands and controls. | [QToolBar](https://doc.qt.io/qt-6/qtoolbar.html) |

### Action history

Navigate previously performed actions.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QUndoView` | Undo history list | Presents actions for navigating editing history. | [QUndoView](https://doc.qt.io/qt-6/qundoview.html) |

<a id="input-and-selection"></a>

## Input and selection

Enter values or choose among alternatives.

Related categories: [Containers and layout](#containers-and-layout) provides form arrangement and visual groups; [Windows and dialogs](#windows-and-dialogs) owns complete picker dialogs.

### Direct objects

All entries in this category are assigned to the subcategories below.

### Text and shortcuts

Enter text or a keyboard shortcut, with completion where supported.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QLineEdit` | Single-line text field | Accepts or displays one line of text. | [QLineEdit](https://doc.qt.io/qt-6/qlineedit.html) |
| `QPlainTextEdit` | Plain text editor | Displays and edits multiple lines without rich formatting. | [QPlainTextEdit](https://doc.qt.io/qt-6/qplaintextedit.html) |
| `QTextEdit` | Rich text editor | Displays and edits formatted text. | [QTextEdit](https://doc.qt.io/qt-6/qtextedit.html) |
| `QKeySequenceEdit` | Keyboard shortcut field | Captures a keyboard shortcut. | [QKeySequenceEdit](https://doc.qt.io/qt-6/qkeysequenceedit.html) |
| `QCompleter` | Text completion | Supplies suggestions through a popup or inline completion. | [QCompleter](https://doc.qt.io/qt-6/qcompleter.html) |

### Choices

Choose individual options or coordinated alternatives.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QCheckBox` | Checkbox | Toggles a choice, optionally with an intermediate state. | [QCheckBox](https://doc.qt.io/qt-6/qcheckbox.html) |
| `QRadioButton` | Radio option | Chooses an alternative within a set. | [QRadioButton](https://doc.qt.io/qt-6/qradiobutton.html) |
| `QComboBox` | Dropdown selector | Combines a current choice with a popup list. | [QComboBox](https://doc.qt.io/qt-6/qcombobox.html) |
| `QFontComboBox` | Font family selector | Offers available font families. | [QFontComboBox](https://doc.qt.io/qt-6/qfontcombobox.html) |
| `QButtonGroup` | Related button choices | Coordinates choices without drawing a visible container. | [QButtonGroup](https://doc.qt.io/qt-6/qbuttongroup.html) |

### Numeric values

Adjust bounded numeric values.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QSpinBox` | Integer stepper | Edits whole numbers through typing or stepping. | [QSpinBox](https://doc.qt.io/qt-6/qspinbox.html) |
| `QDoubleSpinBox` | Decimal stepper | Edits fractional numbers through typing or stepping. | [QDoubleSpinBox](https://doc.qt.io/qt-6/qdoublespinbox.html) |
| `QSlider` | Linear value slider | Adjusts a bounded value along a track. | [QSlider](https://doc.qt.io/qt-6/qslider.html) |
| `QDial` | Rotary value control | Adjusts a value using a circular control. | [QDial](https://doc.qt.io/qt-6/qdial.html) |

### Dates and times

Enter or select calendar and clock values.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QDateEdit` | Date field | Edits a calendar date. | [QDateEdit](https://doc.qt.io/qt-6/qdateedit.html) |
| `QTimeEdit` | Time field | Edits a time of day. | [QTimeEdit](https://doc.qt.io/qt-6/qtimeedit.html) |
| `QDateTimeEdit` | Date and time field | Edits a combined date and time. | [QDateTimeEdit](https://doc.qt.io/qt-6/qdatetimeedit.html) |
| `QCalendarWidget` | Calendar date picker | Selects dates from a monthly calendar. | [QCalendarWidget](https://doc.qt.io/qt-6/qcalendarwidget.html) |

<a id="content-and-data"></a>

## Content and data presentation

Present readable content and structured collections.

Related categories: [Input and selection](#input-and-selection) owns text editors; [Graphics surfaces and content](#graphics) owns text and images placed in a scene. Editable collection cells will be described within their collection.

### Direct objects

All entries in this category are assigned to the subcategories below.

### Text images and numbers

Display individual content items or linked documents.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QLabel` | Text or image label | Displays explanatory text or an image. | [QLabel](https://doc.qt.io/qt-6/qlabel.html) |
| `QLCDNumber` | Segmented number display | Presents a number using segmented digits. | [QLCDNumber](https://doc.qt.io/qt-6/qlcdnumber.html) |
| `QTextBrowser` | Linked document viewer | Displays rich text with link navigation. | [QTextBrowser](https://doc.qt.io/qt-6/qtextbrowser.html) |

### Collections and hierarchies

Browse records as lists, tables, trees, or cascading columns.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QListView`, `QListWidget` | List or icon collection | Presents a collection as list entries or icons. | [QListView](https://doc.qt.io/qt-6/qlistview.html); [QListWidget](https://doc.qt.io/qt-6/qlistwidget.html) |
| `QTableView`, `QTableWidget` | Data table | Presents records in rows and columns. | [QTableView](https://doc.qt.io/qt-6/qtableview.html); [QTableWidget](https://doc.qt.io/qt-6/qtablewidget.html) |
| `QTreeView`, `QTreeWidget` | Hierarchical tree | Presents expandable parent and child entries. | [QTreeView](https://doc.qt.io/qt-6/qtreeview.html); [QTreeWidget](https://doc.qt.io/qt-6/qtreewidget.html) |
| `QColumnView` | Cascading column browser | Navigates a hierarchy through adjacent columns. | [QColumnView](https://doc.qt.io/qt-6/qcolumnview.html) |

### Collection headers

Identify sections of structured data.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QHeaderView` | Table or tree header | Labels sections of a data view. | [QHeaderView](https://doc.qt.io/qt-6/qheaderview.html) |

<a id="navigation"></a>

## Page navigation and scrolling

Move between pages or through content within a region.

Related categories: [Containers and layout](#containers-and-layout) owns the layered page arrangement; [Windows and dialogs](#windows-and-dialogs) owns guided multi-step dialogs.

### Direct objects

All entries in this category are assigned to the subcategories below.

### Page switching

Present and select among alternative pages.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QTabBar` | Tab strip | Presents tabs for switching between choices. | [QTabBar](https://doc.qt.io/qt-6/qtabbar.html) |
| `QTabWidget` | Tabbed container | Pairs page content with selectable tabs. | [QTabWidget](https://doc.qt.io/qt-6/qtabwidget.html) |
| `QToolBox` | Vertical tabbed container | Shows a page selected through vertically arranged tabs. | [QToolBox](https://doc.qt.io/qt-6/qtoolbox.html) |
| `QStackedWidget` | Page stack | Holds pages and presents the selected page. | [QStackedWidget](https://doc.qt.io/qt-6/qstackedwidget.html) |

### Scrolling

Reveal content outside the current viewport.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QScrollArea` | Scrollable container | Reveals content larger than the available region. | [QScrollArea](https://doc.qt.io/qt-6/qscrollarea.html) |
| `QScrollBar` | Scroll position control | Changes the visible portion of scrollable content. | [QScrollBar](https://doc.qt.io/qt-6/qscrollbar.html) |
| `QScroller` | Kinetic scrolling | Continues scrolling with motion-like behavior after an input gesture. | [QScroller](https://doc.qt.io/qt-6/qscroller.html) |

<a id="containers-and-layout"></a>

## Containers and layout

Group components and determine their spatial arrangement.

Related categories: [Page navigation and scrolling](#navigation) owns page stacks and tabbed or scrollable containers; [Graphics surfaces and content](#graphics) owns arrangements specific to graphical scenes.

### Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QWidget` | Generic UI surface | Provides a general-purpose visible region or container. | [QWidget](https://doc.qt.io/qt-6/qwidget.html) |

### Visual grouping

Frame related content and distinguish regions.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QFrame` | Bordered panel or separator | Frames content or visually separates regions. | [QFrame](https://doc.qt.io/qt-6/qframe.html) |
| `QGroupBox` | Labeled group | Groups related controls under a title. | [QGroupBox](https://doc.qt.io/qt-6/qgroupbox.html) |

### Adjustable panes

Divide available space into user-resizable regions.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QSplitter` | Resizable pane group | Divides a region into adjustable panes. | [QSplitter](https://doc.qt.io/qt-6/qsplitter.html) |
| `QSplitterHandle` | Pane divider handle | Lets users resize adjacent panes. | [QSplitterHandle](https://doc.qt.io/qt-6/qsplitterhandle.html) |

### Arrangement and spacing

Position child components and allocate space.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QBoxLayout`, `QHBoxLayout`, `QVBoxLayout` | Linear arrangement | Arranges child components in a row or column. | [QBoxLayout](https://doc.qt.io/qt-6/qboxlayout.html); [QHBoxLayout](https://doc.qt.io/qt-6/qhboxlayout.html); [QVBoxLayout](https://doc.qt.io/qt-6/qvboxlayout.html) |
| `QGridLayout` | Grid arrangement | Places child components in rows and columns. | [QGridLayout](https://doc.qt.io/qt-6/qgridlayout.html) |
| `QFormLayout` | Label and field arrangement | Pairs field labels with their input controls. | [QFormLayout](https://doc.qt.io/qt-6/qformlayout.html) |
| `QStackedLayout` | Layered page arrangement | Places pages in a shared region with configurable visibility. | [QStackedLayout](https://doc.qt.io/qt-6/qstackedlayout.html) |
| `QSpacerItem` | Layout space | Reserves blank space between or around components. | [QSpacerItem](https://doc.qt.io/qt-6/qspaceritem.html) |

<a id="windows-and-dialogs"></a>

## Windows and dialogs

Provide application workspaces and focused interaction windows.

Related categories: [Status help and interaction feedback](#status-and-help) owns embedded progress indicators and status messages; [Input and selection](#input-and-selection) owns controls that can appear inside picker dialogs.

### Direct objects

All entries in this category are assigned to the subcategories below.

### Application workspaces

Host application content, panels, and document windows.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QMainWindow` | Application main window | Combines central content with surrounding application controls. | [QMainWindow](https://doc.qt.io/qt-6/qmainwindow.html) |
| `QDockWidget` | Dockable panel | Hosts content in a docked or floating panel. | [QDockWidget](https://doc.qt.io/qt-6/qdockwidget.html) |
| `QMdiArea` | Multiple-document workspace | Contains multiple internal document windows. | [QMdiArea](https://doc.qt.io/qt-6/qmdiarea.html) |
| `QMdiSubWindow` | Internal document window | Presents a document within a multiple-document workspace. | [QMdiSubWindow](https://doc.qt.io/qt-6/qmdisubwindow.html) |
| `QSizeGrip` | Window resize handle | Provides a handle for resizing a window. | [QSizeGrip](https://doc.qt.io/qt-6/qsizegrip.html) |

### Dialog structure

Provide the dialog container and its action area.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QDialog` | Dialog window | Hosts a focused interaction in a separate window. | [QDialog](https://doc.qt.io/qt-6/qdialog.html) |
| `QDialogButtonBox` | Dialog action group | Arranges dialog actions according to platform conventions. | [QDialogButtonBox](https://doc.qt.io/qt-6/qdialogbuttonbox.html) |

### Messages and operation progress

Present decisions, errors, and progress in dialogs.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QMessageBox` | Message and decision dialog | Presents information or requests a decision. | [QMessageBox](https://doc.qt.io/qt-6/qmessagebox.html) |
| `QErrorMessage` | Suppressible error dialog | Shows error messages that users can suppress. | [QErrorMessage](https://doc.qt.io/qt-6/qerrormessage.html) |
| `QProgressDialog` | Operation progress dialog | Presents progress and optional cancellation. | [QProgressDialog](https://doc.qt.io/qt-6/qprogressdialog.html) |

### Value and resource pickers

Collect a value or select a resource in a dialog.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QInputDialog` | Single-value prompt | Requests one value through a small dialog. | [QInputDialog](https://doc.qt.io/qt-6/qinputdialog.html) |
| `QFileDialog` | File or folder picker | Selects a file or directory. | [QFileDialog](https://doc.qt.io/qt-6/qfiledialog.html) |
| `QColorDialog` | Color picker dialog | Lets users choose a color. | [QColorDialog](https://doc.qt.io/qt-6/qcolordialog.html) |
| `QFontDialog` | Font picker dialog | Lets users choose font settings. | [QFontDialog](https://doc.qt.io/qt-6/qfontdialog.html) |

### Guided sequences

Lead users through related steps.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QWizard` | Guided multi-step dialog | Leads users through a sequence of pages. | [QWizard](https://doc.qt.io/qt-6/qwizard.html) |
| `QWizardPage` | Guided step page | Contains the content of one guided step. | [QWizardPage](https://doc.qt.io/qt-6/qwizardpage.html) |

<a id="status-and-help"></a>

## Status help and interaction feedback

Communicate state, explain controls, and make interaction targets visible.

Related categories: [Windows and dialogs](#windows-and-dialogs) owns message and progress dialogs. Focus and selection indicators may be referenced by input, collection, and graphics descriptions.

### Direct objects

All entries in this category are assigned to the subcategories below.

### Status and activity

Present ongoing activity or application presence.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QProgressBar` | Progress indicator | Shows operation progress or ongoing activity. | [QProgressBar](https://doc.qt.io/qt-6/qprogressbar.html) |
| `QStatusBar` | Status strip | Presents application status and supporting indicators. | [QStatusBar](https://doc.qt.io/qt-6/qstatusbar.html) |
| `QSplashScreen` | Startup splash | Presents an image and optional startup messages. | [QSplashScreen](https://doc.qt.io/qt-6/qsplashscreen.html) |
| `QSystemTrayIcon` | System tray presence | Represents an application in the desktop notification area. | [QSystemTrayIcon](https://doc.qt.io/qt-6/qsystemtrayicon.html) |

### Contextual help

Explain nearby controls or content.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QToolTip` | Tooltip | Provides brief contextual information in a popup. | [QToolTip](https://doc.qt.io/qt-6/qtooltip.html) |
| `QWhatsThis` | Contextual help popup | Explains a control through on-demand help. | [QWhatsThis](https://doc.qt.io/qt-6/qwhatsthis.html) |

### Interaction indicators

Identify focus, selection, or a boundary.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QFocusFrame` | Focus outline | Marks the control receiving keyboard input. | [QFocusFrame](https://doc.qt.io/qt-6/qfocusframe.html) |
| `QRubberBand` | Selection or boundary outline | Indicates a proposed selection region or boundary. | [QRubberBand](https://doc.qt.io/qt-6/qrubberband.html) |

<a id="graphics"></a>

## Graphics surfaces and content

Present visual scenes, graphical elements, and their composition.

Related categories: [Containers and layout](#containers-and-layout) owns ordinary component arrangement; [Content and data presentation](#content-and-data) owns ordinary labels and document viewers; [Visual effects](#appearance) owns appearance treatments.

### Direct objects

All entries in this category are assigned to the subcategories below.

### Display surfaces

Provide a viewport or application-defined drawing surface.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QGraphicsView` | Interactive graphics viewport | Displays a scene of graphical content. | [QGraphicsView](https://doc.qt.io/qt-6/qgraphicsview.html) |
| `QRhiWidget` | Custom graphics surface | Displays application-defined rendered graphics; no standard visual contents. | [QRhiWidget](https://doc.qt.io/qt-6/qrhiwidget.html) |

### Scene composition

Collect and arrange graphical content.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QGraphicsScene` | Graphics content scene | Contains the graphical objects presented by a viewport. | [QGraphicsScene](https://doc.qt.io/qt-6/qgraphicsscene.html) |
| `QGraphicsWidget` | Graphics scene UI container | Hosts widget-like content within a graphics scene. | [QGraphicsWidget](https://doc.qt.io/qt-6/qgraphicswidget.html) |
| `QGraphicsItemGroup` | Grouped graphics | Treats several graphical objects as a combined group. | [QGraphicsItemGroup](https://doc.qt.io/qt-6/qgraphicsitemgroup.html) |
| `QGraphicsAnchorLayout` | Anchored arrangement | Relates edges of graphical widgets to arrange them. | [QGraphicsAnchorLayout](https://doc.qt.io/qt-6/qgraphicsanchorlayout.html) |
| `QGraphicsGridLayout` | Graphics grid arrangement | Arranges graphical widgets in a grid. | [QGraphicsGridLayout](https://doc.qt.io/qt-6/qgraphicsgridlayout.html) |
| `QGraphicsLinearLayout` | Graphics linear arrangement | Arranges graphical widgets along one direction. | [QGraphicsLinearLayout](https://doc.qt.io/qt-6/qgraphicslinearlayout.html) |

### Shapes and paths

Represent geometric content.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QGraphicsEllipseItem` | Ellipse or circle | Presents an elliptical shape in a scene. | [QGraphicsEllipseItem](https://doc.qt.io/qt-6/qgraphicsellipseitem.html) |
| `QGraphicsRectItem` | Rectangle | Presents a rectangular shape in a scene. | [QGraphicsRectItem](https://doc.qt.io/qt-6/qgraphicsrectitem.html) |
| `QGraphicsLineItem` | Line | Presents a line segment in a scene. | [QGraphicsLineItem](https://doc.qt.io/qt-6/qgraphicslineitem.html) |
| `QGraphicsPolygonItem` | Polygon | Presents a shape defined by connected vertices. | [QGraphicsPolygonItem](https://doc.qt.io/qt-6/qgraphicspolygonitem.html) |
| `QGraphicsPathItem` | Custom path | Presents a custom curved or segmented shape. | [QGraphicsPathItem](https://doc.qt.io/qt-6/qgraphicspathitem.html) |

### Images and text

Place image or text content within a scene.

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QGraphicsPixmapItem` | Raster image | Presents a bitmap image within a scene. | [QGraphicsPixmapItem](https://doc.qt.io/qt-6/qgraphicspixmapitem.html) |
| `QGraphicsSimpleTextItem` | Simple graphics label | Presents a simple text label within a scene. | [QGraphicsSimpleTextItem](https://doc.qt.io/qt-6/qgraphicssimpletextitem.html) |
| `QGraphicsTextItem` | Rich graphics text | Presents formatted text within a scene. | [QGraphicsTextItem](https://doc.qt.io/qt-6/qgraphicstextitem.html) |

<a id="appearance"></a>

## Visual effects

Modify the appearance of existing content.

Effects are applied to existing content. Component descriptions may link here when discussing appearance, without counting the same effect as another component.

### Direct objects

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| `QGraphicsBlurEffect` | Blur treatment | Softens the appearance of visible content. | [QGraphicsBlurEffect](https://doc.qt.io/qt-6/qgraphicsblureffect.html) |
| `QGraphicsColorizeEffect` | Color tint treatment | Tints visible content toward a chosen color. | [QGraphicsColorizeEffect](https://doc.qt.io/qt-6/qgraphicscolorizeeffect.html) |
| `QGraphicsDropShadowEffect` | Drop shadow treatment | Adds a shadow behind visible content. | [QGraphicsDropShadowEffect](https://doc.qt.io/qt-6/qgraphicsdropshadoweffect.html) |
| `QGraphicsOpacityEffect` | Opacity treatment | Makes visible content more transparent. | [QGraphicsOpacityEffect](https://doc.qt.io/qt-6/qgraphicsopacityeffect.html) |

## Decisions for overlapping concepts

- **Tabbed containers, vertical tabs, and page stacks:** Primary home is page navigation because they organize which content page is presented. Layout descriptions can reference them for containment.
- **Layered page arrangement:** Primary home is layout because the concept controls the placement and visibility of pages. It links to page navigation without becoming a second page-stack entry.
- **Scroll bars:** Primary home is scrolling, reflecting their role in moving through content. Numeric sliders remain with numeric input.
- **Undo history:** Primary home is commands because the history enables movement through performed actions, although its presentation resembles a list.
- **Message and progress dialogs:** Primary home is windows and dialogs. Embedded progress bars and status strips remain with status and feedback.
- **Text editors and document viewers:** Editors belong with input; the linked document viewer belongs with content presentation. Their optional interaction modes are covered in the full descriptions.
- **Focus and selection outlines:** Primary home is interaction feedback. They can appear alongside many kinds of components.
- **Graphics layouts:** Primary home is scene composition. Ordinary layouts remain under containers and layout, with cross-references between analogous arrangements.
- **Generic UI surface:** Assigned directly to containers and layout. Application-defined contents are described without implying a standard arrangement.

## Category document structure

Each category and subcategory now has its own Markdown document, accessible through the [catalog index](README.md). Category documents contain direct-object tables where applicable and summary tables linking to each immediate subcategory. Each component has one canonical full description.

All object tables retain the four requested fields: Object name in Qt, Abstract object name, Object description, and Links to the sources. A category without directly assigned objects will state that its entries are in its subcategories.

## Validation

- Assigned all 94 inventory entries exactly once.
- Preserved all 99 Qt names, including combined entries.
- Found no missing entries, unrecognized entries, or duplicate primary assignments.
- Kept all identification summaries and official source links unchanged.
- Checked the four-column tables, category navigation, and inventory link.

All survey steps are complete. See the [catalog](README.md) and [validation results](VALIDATION.md).


## Completed behavior revision

The 94-entry / 99-name inventory and nine-category / 27-subcategory source organization are retained as the research baseline. Primary response definitions now live in [the behavior hierarchy](BEHAVIOR_TAXONOMY_PROPOSAL.md). [Reconciliation](CLASSIFICATION_RECONCILIATION.md) separates component, part, composition, layout, behavior-support and appearance counts; [the matrix](COMPONENT_BEHAVIOR_MATRIX.md) records each entry’s qualified relationships. Original supporting-concept placement is source navigation, not a second primary behavior definition.
