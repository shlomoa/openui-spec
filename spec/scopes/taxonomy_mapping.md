# Taxonomy mapping

This document maps the abstract vocabulary in `docs/generic-ui-taxonomy.md` to the
canonical scope objects under `spec/scopes/`. It keeps taxonomy aliases explicit while
leaving detailed definitions in the [glossary](scope.md#glossary) and concrete
contracts in each linked scope file.

The abstraction levels used in the tables below are defined in the
[glossary](scope.md#abstraction-levels).

## Classification rules

- Each taxonomy entry belongs to exactly one section and at most one subcategory, chosen by
  its primary purpose in its current context. The Holds line of each subcategory is its
  inclusion rule.
- An element may also have secondary roles. They go in the entry's note, not in a second
  row: each row names one spec object.
- Interaction details, such as hover states, touch targets, gestures and input events, are
  not UI elements; they are entries of [Interaction definitions](#interaction-definitions).
  Reusable behaviors that act on an element without being visible themselves are entries of
  [Behaviors](#behaviors).

## Input elements

### Command activation

Holds: Controls whose main purpose is to run a command.

| Taxonomy entry   | Spec object                                          | Abstraction level | Notes                                                       |
| ---------------- | ---------------------------------------------------- | ----------------- | ----------------------------------------------------------- |
| Button           | [Action controls](Controls/action_controls.scope.md) | Grouped leaf      | Command control alias; detailed term stays in the glossary. |
| Icon button      | [Action controls](Controls/action_controls.scope.md) | Alias             | Icon-only command control variant.                          |
| Tool button      | [Action controls](Controls/action_controls.scope.md) | Alias             | Compact command button, usually in a toolbar or bar.        |
| Hamburger button | [Action controls](Controls/action_controls.scope.md) | Alias             | Alias of Tool button; opens navigation or a menu.           |
| Toggle button    | [Action controls](Controls/action_controls.scope.md) | Alias             | Button that stays pressed or released.                      |

### Text and shortcut entry

Holds: Entry of text or of a recorded key sequence.

| Taxonomy entry          | Spec object                                  | Abstraction level | Notes                                             |
| ----------------------- | -------------------------------------------- | ----------------- | ------------------------------------------------- |
| Text field              | [Text inputs](Controls/text_inputs.scope.md) | Grouped leaf      | Single-line text-entry variant.                   |
| Text area               | [Text inputs](Controls/text_inputs.scope.md) | Alias             | Multi-line text-entry variant.                    |
| Password field          | [Text inputs](Controls/text_inputs.scope.md) | Alias             | Text entry with protected presentation.           |
| Rich text editor        | [Text inputs](Controls/text_inputs.scope.md) | Alias             | Text entry with formatting.                       |
| Keyboard shortcut field | [Text inputs](Controls/text_inputs.scope.md) | Alias             | Records a key sequence.                           |
| Metadata-driven field   | [Text inputs](Controls/text_inputs.scope.md) | Alias             | Field whose editor follows the value's data type. |

### Value and resource selection

Holds: Choosing a value, a quantity in a range, or a resource such as a file, font or color.

| Taxonomy entry              | Spec object                                          | Abstraction level | Notes                                                   |
| --------------------------- | ---------------------------------------------------- | ----------------- | ------------------------------------------------------- |
| Checkbox                    | [Choice controls](Controls/choice_controls.scope.md) | Grouped leaf      | Binary or tri-state selection control.                  |
| Radio button                | [Choice controls](Controls/choice_controls.scope.md) | Alias             | Single-choice option in a group.                        |
| Switch                      | [Choice controls](Controls/choice_controls.scope.md) | Alias             | On/off selection control.                               |
| Dropdown                    | [Choice controls](Controls/choice_controls.scope.md) | Alias             | Select-style choice control; menus map to menu widgets. |
| List box                    | [Choice controls](Controls/choice_controls.scope.md) | Alias             | Selectable option-list control.                         |
| Combo box                   | [Choice controls](Controls/choice_controls.scope.md) | Alias             | Editable or select-only popup choice control.           |
| Suggestion-backed combo box | [Choice controls](Controls/choice_controls.scope.md) | Alias             | Combo box whose list is suggested for the typed text.   |
| Multi-select combo box      | [Choice controls](Controls/choice_controls.scope.md) | Alias             | Combo box that allows several choices.                  |
| Selection mode              | [Choice controls](Controls/choice_controls.scope.md) | Grouped leaf      | Single or multiple choice, independent of presentation. |
| Font-family selector        | [Choice controls](Controls/choice_controls.scope.md) | Alias             | Dropdown of font families.                              |
| Slider                      | [Range control](Controls/range_control.scope.md)     | Grouped leaf      | Continuous or discrete range control.                   |
| Range slider                | [Range control](Controls/range_control.scope.md)     | Alias             | Slider with two handles for a range.                    |
| Rotary value control        | [Range control](Controls/range_control.scope.md)     | Alias             | Dial-style range control.                               |
| Spin box                    | [Range control](Controls/range_control.scope.md)     | Alias             | Numeric entry with increment and decrement actions.     |
| Step input                  | [Range control](Controls/range_control.scope.md)     | Alias             | Numeric entry changed one step at a time.               |
| Rating control              | [Range control](Controls/range_control.scope.md)     | Alias             | Bounded rating value control.                           |
| Wheel picker                | [Picker control](Controls/picker_control.scope.md)   | Grouped leaf      | Picker interaction variant.                             |
| Color picker                | [Picker control](Controls/picker_control.scope.md)   | Alias             | Specialized value picker.                               |
| File picker                 | [Picker control](Controls/picker_control.scope.md)   | Alias             | File-source picker.                                     |
| Font picker                 | [Picker control](Controls/picker_control.scope.md)   | Alias             | Picks a font, with its style and size.                  |
| Folder picker               | [Picker control](Controls/picker_control.scope.md)   | Alias             | Picks a folder.                                         |
| Token collection            | [List](Widgets/list.scope.md)                        | Alias             | Compact removable items with an entry field.            |
| Editable chip collection    | [List](Widgets/list.scope.md)                        | Alias             | Chips connected to an input field.                      |
| File upload                 | [Widgets](Widgets/scope.md)                          | Grouped leaf      | File choice with upload progress.                       |

### Temporal entry

Holds: Editing or choosing a date or time, with an optional calendar.

| Taxonomy entry      | Spec object                                             | Abstraction level | Notes                                       |
| ------------------- | ------------------------------------------------------- | ----------------- | ------------------------------------------- |
| Date picker         | [Date/Time pickers](Widgets/date_time_pickers.scope.md) | Existing object   | Calendar-oriented picker widget.            |
| Time picker         | [Date/Time pickers](Widgets/date_time_pickers.scope.md) | Alias             | Time-selection variant of date/time picker. |
| Date field          | [Date/Time pickers](Widgets/date_time_pickers.scope.md) | Alias             | Typed date entry; the calendar is optional. |
| Time field          | [Date/Time pickers](Widgets/date_time_pickers.scope.md) | Alias             | Typed time entry.                           |
| Date and time field | [Date/Time pickers](Widgets/date_time_pickers.scope.md) | Alias             | Edits a date and a time together.           |

### Drawing and capture

Holds: Input that is not text or a value: drawing, or capturing sound.

| Taxonomy entry   | Spec object                                                           | Abstraction level | Notes                                         |
| ---------------- | --------------------------------------------------------------------- | ----------------- | --------------------------------------------- |
| Canvas           | [Drawing and capture controls](Controls/drawing_and_capture.scope.md) | Alias             | Surface the application and the user draw on. |
| Drawing area     | [Drawing and capture controls](Controls/drawing_and_capture.scope.md) | Alias             | Direct drawing input surface.                 |
| Microphone input | [Drawing and capture controls](Controls/drawing_and_capture.scope.md) | Alias             | Audio-capture input.                          |

### Manipulation handles

Holds: Visible handles the user drags to move or resize an element. The behavior itself is in the Behaviors section.

| Taxonomy entry | Spec object                                       | Abstraction level | Notes                                                   |
| -------------- | ------------------------------------------------- | ----------------- | ------------------------------------------------------- |
| Drag handle    | [Drag and drop](Behaviors/drag_and_drop.scope.md) | Alias             | Handle is an affordance for the drag-and-drop behavior. |
| Resize handle  | [Resizable](Behaviors/resizable.scope.md)         | Alias             | Handle is an affordance for the resizable behavior.     |

## Output elements

### Document and numeric display

Holds: Text, labels, images and calculated values shown without their own interaction.

| Taxonomy entry    | Spec object                                                | Abstraction level | Notes                                                 |
| ----------------- | ---------------------------------------------------------- | ----------------- | ----------------------------------------------------- |
| Label             | [Display primitives](Controls/display_primitives.scope.md) | Grouped leaf      | Textual caption or labelling primitive.               |
| Text              | [Display primitives](Controls/display_primitives.scope.md) | Alias             | Rendered text primitive.                              |
| Image             | [Display primitives](Controls/display_primitives.scope.md) | Alias             | Static visual content primitive.                      |
| Icon              | [Display primitives](Controls/display_primitives.scope.md) | Alias             | Symbolic visual primitive.                            |
| Avatar            | [Display primitives](Controls/display_primitives.scope.md) | Alias             | Identity image or initials primitive.                 |
| Separator         | [Display primitives](Controls/display_primitives.scope.md) | Alias             | Semantic or visual separator.                         |
| Divider           | [Display primitives](Controls/display_primitives.scope.md) | Alias             | Visible line between groups.                          |
| Calculated output | [Display primitives](Controls/display_primitives.scope.md) | Alias             | Result of a calculation (HTML `output`).              |
| Highlighted text  | [Display primitives](Controls/display_primitives.scope.md) | Alias             | Alias of Text: text marked as relevant (HTML `mark`). |

### Graphics presentation

Holds: Shapes, application-drawn imagery and views onto a graphics scene.

| Taxonomy entry          | Spec object                                                | Abstraction level | Notes                                                            |
| ----------------------- | ---------------------------------------------------------- | ----------------- | ---------------------------------------------------------------- |
| Geometric shape         | [Display primitives](Controls/display_primitives.scope.md) | Alias             | Ellipse, rectangle, line, polygon or path.                       |
| Custom graphics surface | [Media widgets](Widgets/media_widgets.scope.md)            | Alias             | Surface drawn by application code.                               |
| Graphics viewport       | [Media widgets](Widgets/media_widgets.scope.md)            | Alias             | View onto a graphics scene, with pan, zoom and region selection. |

### Collections and data presentation

Holds: Repeated or structured records and their visualizations: lists, tables, grids, trees, schedules, charts and geographic maps.

| Taxonomy entry    | Spec object                                     | Abstraction level | Notes                                                  |
| ----------------- | ----------------------------------------------- | ----------------- | ------------------------------------------------------ |
| List              | [List](Widgets/list.scope.md)                   | Existing object   | Reusable list widget.                                  |
| Table             | [Table](Widgets/table.scope.md)                 | Existing object   | Tabular data with header cells.                        |
| Data grid         | [Data grid](Widgets/data_grid.scope.md)         | Existing object   | Interactive grid of cells.                             |
| Description list  | [List](Widgets/list.scope.md)                   | Alias             | Term and description pairs (HTML `dl`).                |
| Icon collection   | [List](Widgets/list.scope.md)                   | Alias             | List shown as a grid of icons.                         |
| Planning calendar | [Widgets](Widgets/scope.md)                     | Grouped leaf      | People or resources with their appointments over time. |
| Tree              | [List](Widgets/list.scope.md)                   | Alias             | Hierarchical list.                                     |
| Tree grid         | [Data grid](Widgets/data_grid.scope.md)         | Alias             | Data grid whose rows form a hierarchy.                 |
| Chart             | [Chart](Widgets/chart.scope.md)                 | Existing object   | Data drawn as a chart.                                 |
| Geographic map    | [Media widgets](Widgets/media_widgets.scope.md) | Alias             | Spatial data on a map.                                 |

### Media playback

Holds: Audio, video and camera content.

| Taxonomy entry | Spec object                                     | Abstraction level | Notes                                                              |
| -------------- | ----------------------------------------------- | ----------------- | ------------------------------------------------------------------ |
| Media player   | [Media widgets](Widgets/media_widgets.scope.md) | Grouped leaf      | Playback widget.                                                   |
| Camera preview | [Media widgets](Widgets/media_widgets.scope.md) | Alias             | Preview surface for camera input.                                  |
| Captions       | [Media widgets](Widgets/media_widgets.scope.md) | Alias             | Synchronized text for audio or video (HTML track kind `captions`). |

### Feedback and assistance

Holds: Status, progress, messages and help.

| Taxonomy entry      | Spec object                                            | Abstraction level | Notes                                                              |
| ------------------- | ------------------------------------------------------ | ----------------- | ------------------------------------------------------------------ |
| Status bar          | [Status indicator](Controls/status_indicator.scope.md) | Grouped leaf      | Passive state feedback.                                            |
| Tag                 | [Status indicator](Controls/status_indicator.scope.md) | Alias             | Compact classification/status indicator.                           |
| Badge               | [Status indicator](Controls/status_indicator.scope.md) | Alias             | Compact count or state indicator.                                  |
| Progress bar        | [Status indicator](Controls/status_indicator.scope.md) | Alias             | Passive progress state.                                            |
| Loader              | [Status indicator](Controls/status_indicator.scope.md) | Alias             | Indeterminate loading feedback.                                    |
| Spinner             | [Status indicator](Controls/status_indicator.scope.md) | Alias             | Rotating activity indicator.                                       |
| Meter               | [Status indicator](Controls/status_indicator.scope.md) | Alias             | Measured value within a known range (HTML `meter`).                |
| Progress mode       | [Status indicator](Controls/status_indicator.scope.md) | Grouped leaf      | Determinate or indeterminate; applies to Progress bar and Spinner. |
| Tooltip             | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Grouped leaf      | Contextual helper message.                                         |
| Alert               | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | Urgent message feedback.                                           |
| Toast               | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | Transient message feedback.                                        |
| Snackbar            | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | Transient message with an optional action.                         |
| Notification        | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | System or application feedback message.                            |
| Narration           | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | Non-visual feedback or descriptive output.                         |
| Audio description   | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | Spoken description of visual content.                              |
| Contextual help     | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | Help for the element the user points at.                           |
| Startup screen      | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | Screen shown while an application starts.                          |
| Illustrated message | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | Empty or success state with an illustration.                       |

## Navigational elements

### Command menus

Holds: Lists of commands or choices with menu semantics.

| Taxonomy entry | Spec object                                   | Abstraction level | Notes                                                                                                          |
| -------------- | --------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| Menu           | [Menu widgets](Widgets/menu_widgets.scope.md) | Grouped leaf      | Command or choice menu. Not the HTML `menu` element, which is a plain list of commands without popup behavior. |
| Menu button    | [Menu widgets](Widgets/menu_widgets.scope.md) | Alias             | Button that opens a menu; also called dropdown menu.                                                           |
| Context menu   | [Menu widgets](Widgets/menu_widgets.scope.md) | Alias             | Contextual command menu variant.                                                                               |
| Menubar        | [Menu widgets](Widgets/menu_widgets.scope.md) | Alias             | Bar of menus.                                                                                                  |
| Menu item      | [Menu widgets](Widgets/menu_widgets.scope.md) | Alias             | One command or choice in a menu (WAI-ARIA `menuitem`).                                                         |

### Hierarchy browsing

Holds: Exploring parent and child items in a tree, columns or a path.

| Taxonomy entry | Spec object                                               | Abstraction level | Notes                                        |
| -------------- | --------------------------------------------------------- | ----------------- | -------------------------------------------- |
| Tree view      | [Navigation widgets](Widgets/navigation_widgets.scope.md) | Alias             | Hierarchical navigation or selection widget. |
| Breadcrumb     | [Navigation widgets](Widgets/navigation_widgets.scope.md) | Alias             | Hierarchical location navigation.            |
| Column browser | [Navigation widgets](Widgets/navigation_widgets.scope.md) | Alias             | Hierarchy shown as columns.                  |

### Content selection and position

Holds: Choosing which content is shown, or where in it the user is.

| Taxonomy entry     | Spec object                                                            | Abstraction level | Notes                                  |
| ------------------ | ---------------------------------------------------------------------- | ----------------- | -------------------------------------- |
| Tab                | [Tabs](Containers/tabs.scope.md)                                       | Existing object   | Tab child in a tabbed container.       |
| Tab Bar            | [Tabs](Containers/tabs.scope.md)                                       | Alias             | Tab-list/tab-bar presentation variant. |
| Scrollbar          | [Link and scroll controls](Controls/link_and_scroll_controls.scope.md) | Alias             | Viewport-position control.             |
| Pagination control | [Navigation widgets](Widgets/navigation_widgets.scope.md)              | Alias             | Page-set navigation widget.            |
| Carousel           | [Navigation widgets](Widgets/navigation_widgets.scope.md)              | Alias             | Sequential slide/navigation widget.    |

### Application navigation

Holds: Moving between the destinations of an application or to a linked resource.

| Taxonomy entry    | Spec object                                                            | Abstraction level | Notes                                      |
| ----------------- | ---------------------------------------------------------------------- | ----------------- | ------------------------------------------ |
| Navigation bar    | [Application navigation](Application/navigation.scope.md)              | Existing object   | Application-level navigation structure.    |
| Navigation Drawer | [Navigation widgets](Widgets/navigation_widgets.scope.md)              | Grouped leaf      | Reusable navigation component variant.     |
| Navigation Rail   | [Navigation widgets](Widgets/navigation_widgets.scope.md)              | Alias             | Rail-style navigation variant.             |
| Link              | [Link and scroll controls](Controls/link_and_scroll_controls.scope.md) | Grouped leaf      | Primitive resource reference.              |
| Navigation item   | [Navigation item](Application/nav_item.scope.md)                       | Existing object   | One destination in application navigation. |
| Navigation group  | [Navigation group](Application/nav_group.scope.md)                     | Existing object   | Labelled group of navigation items.        |
| Route             | [Route](Application/route.scope.md)                                    | Existing object   | Address mapped to the page it shows.       |
| Routing           | [Routing](Application/routing.scope.md)                                | Existing object   | The application's set of routes.           |

### Search, filtering and sorting

Holds: Finding, narrowing and ordering content.

| Taxonomy entry        | Spec object                                  | Abstraction level | Notes                                                           |
| --------------------- | -------------------------------------------- | ----------------- | --------------------------------------------------------------- |
| Search field          | [Text inputs](Controls/text_inputs.scope.md) | Alias             | Text-entry control specialized for search.                      |
| Filter bar            | [Widgets](Widgets/scope.md)                  | Grouped leaf      | Controlling element: filter fields for a referenced collection. |
| Value help            | [Widgets](Widgets/scope.md)                  | Grouped leaf      | Controlling element: helps find a valid value for a field.      |
| Personalization panel | [Widgets](Widgets/scope.md)                  | Grouped leaf      | Controlling element: configures a referenced collection.        |

## Container elements

### Grouping surfaces

Holds: Regions that hold related content or controls, including ones the user can expand.

| Taxonomy entry  | Spec object                                                  | Abstraction level | Notes                                                    |
| --------------- | ------------------------------------------------------------ | ----------------- | -------------------------------------------------------- |
| Panel           | [Surface containers](Containers/surface_containers.scope.md) | Alias             | Generic content surface.                                 |
| Container       | [Containers](Containers/scope.md)                            | Existing object   | Generic arrangement scope.                               |
| Card            | [Surface containers](Containers/surface_containers.scope.md) | Alias             | Self-contained content surface.                          |
| Tile            | [Surface containers](Containers/surface_containers.scope.md) | Alias             | Alias of Card: compact card, often of fixed size.        |
| Labelled group  | [Surface containers](Containers/surface_containers.scope.md) | Alias             | Group with a title (HTML `fieldset` and `legend`).       |
| Checkable group | [Surface containers](Containers/surface_containers.scope.md) | Alias             | Labelled group with a checkbox that enables its content. |
| Accordion       | [Expandable panels](Containers/expandable_panels.scope.md)   | Existing object   | Expand/collapse panel set alias.                         |
| Disclosure      | [Expandable panels](Containers/expandable_panels.scope.md)   | Alias             | Single expandable section (HTML `details`).              |
| Hero banner     | [Surface containers](Containers/surface_containers.scope.md) | Alias             | Full-width greeting banner at the top of a page.         |

### Workspace surfaces

Holds: Application work areas: windows, views, pages and the bars and panels that frame them.

| Taxonomy entry              | Spec object                                                  | Abstraction level | Notes                                                                                                         |
| --------------------------- | ------------------------------------------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------- |
| Window                      | [Surface containers](Containers/surface_containers.scope.md) | Grouped leaf      | Top-level or sub-window surface; see the glossary term Window. Not the HTML `Window` browsing-context object. |
| View                        | [Views](Views/scope.md)                                      | Existing object   | User-facing workflow representation; Pages cover route-level screens.                                         |
| Toolbar                     | [Tool bars](Application/tool_bars.scope.md)                  | Existing object   | Application-level command surface.                                                                            |
| Main window                 | [Surface containers](Containers/surface_containers.scope.md) | Alias             | Window with menus, toolbars, status bar and a central area.                                                   |
| Dockable panel              | [Surface containers](Containers/surface_containers.scope.md) | Alias             | Panel the user can dock or float.                                                                             |
| Multiple-document workspace | [Surface containers](Containers/surface_containers.scope.md) | Alias             | Area holding several document windows.                                                                        |
| Shell bar                   | [Application](Application/scope.md)                          | Grouped leaf      | Top application bar.                                                                                          |
| Object page                 | [Pages](Pages/scope.md)                                      | Grouped leaf      | Page showing one business object.                                                                             |
| Report                      | [Report](Views/report.scope.md)                              | Existing object   | Read-only data view.                                                                                          |
| Dashboard                   | [Dashboard](Pages/dashboard.scope.md)                        | Existing object   | Page of summary widgets.                                                                                      |
| Shell page                  | [Shell page](Pages/shell_page.scope.md)                      | Existing object   | Page frame with shared regions.                                                                               |
| Empty page                  | [Empty page](Pages/empty_page.scope.md)                      | Existing object   | Page with no content yet.                                                                                     |
| Tool action                 | [Tool action](Application/tool_action.scope.md)              | Existing object   | One command in a tool bar row.                                                                                |
| Tool bar row                | [Tool bar row](Application/tool_bar_row.scope.md)            | Existing object   | One row of a tool bar.                                                                                        |

### Overlays and sheets

Holds: Surfaces layered above the current content or attached to its edge.

| Taxonomy entry | Spec object                                                  | Abstraction level | Notes                               |
| -------------- | ------------------------------------------------------------ | ----------------- | ----------------------------------- |
| Popover        | [Overlay containers](Containers/overlay_containers.scope.md) | Grouped leaf      | Anchored overlay surface.           |
| Sidebar        | [Sheet containers](Containers/sheet_containers.scope.md)     | Grouped leaf      | Side-attached supplemental surface. |
| Sheet          | [Sheet containers](Containers/sheet_containers.scope.md)     | Alias             | Layered sheet surface.              |
| Side Sheet     | [Sheet containers](Containers/sheet_containers.scope.md)     | Alias             | Side-attached sheet variant.        |
| Bottom Sheet   | [Sheet containers](Containers/sheet_containers.scope.md)     | Alias             | Bottom-attached sheet variant.      |

### Forms

Holds: A form and the fields and field groups it holds.

| Taxonomy entry | Spec object                 | Abstraction level | Notes                                           |
| -------------- | --------------------------- | ----------------- | ----------------------------------------------- |
| Form           | [Form](Views/form.scope.md) | Existing object   | Read-write data view.                           |
| Form field     | [Form](Views/form.scope.md) | Alias             | Label, input, help and error text of one value. |
| Form group     | [Form](Views/form.scope.md) | Alias             | Titled group of form fields.                    |

### Focused tasks and guided sequences

Holds: A decision, a short task or a sequence of steps that takes the user's attention.

| Taxonomy entry   | Spec object                         | Abstraction level | Notes                                            |
| ---------------- | ----------------------------------- | ----------------- | ------------------------------------------------ |
| Dialog           | [Dialog](Widgets/dialog.scope.md)   | Existing object   | Modal or non-modal dialog widget.                |
| Progress dialog  | [Dialog](Widgets/dialog.scope.md)   | Alias             | Dialog showing the progress of a long operation. |
| Workflow stepper | [Stepper](Widgets/stepper.scope.md) | Existing object   | Steps of a task shown in sequence.               |
| Wizard           | [Stepper](Widgets/stepper.scope.md) | Alias             | Guided task, one page at a time.                 |

## Layout and structural elements

| Taxonomy entry         | Spec object                                                        | Abstraction level | Notes                                                                     |
| ---------------------- | ------------------------------------------------------------------ | ----------------- | ------------------------------------------------------------------------- |
| Grid                   | [Grid](Containers/grid.scope.md)                                   | Existing object   | Layout grid container; data grid maps to Data grid.                       |
| Pane                   | [Structural containers](Containers/structural_containers.scope.md) | Grouped leaf      | Structural region inside a surface.                                       |
| Rail                   | [Structural containers](Containers/structural_containers.scope.md) | Alias             | Persistent structural region; navigation rail maps to Navigation widgets. |
| Stack                  | [Structural containers](Containers/structural_containers.scope.md) | Alias             | Linear arrangement container.                                             |
| Scaffold               | [Structural containers](Containers/structural_containers.scope.md) | Alias             | Page/application structural frame.                                        |
| Region                 | [Structural containers](Containers/structural_containers.scope.md) | Alias             | Named or meaningful content region.                                       |
| Splitter               | [Splitters](Containers/splitters.scope.md)                         | Grouped leaf      | Movable divider between panes.                                            |
| Bar                    | [Structural containers](Containers/structural_containers.scope.md) | Grouped leaf      | Edge-attached strip arranging items along one axis.                       |
| Page stack             | [Tabs](Containers/tabs.scope.md)                                   | Alias             | Tabs whose tab bar is optional; one page is visible at a time.            |
| Scroll container       | [Structural containers](Containers/structural_containers.scope.md) | Alias             | Scrollable region.                                                        |
| Splitter handle        | [Splitters](Containers/splitters.scope.md)                         | Alias             | The draggable part of a splitter.                                         |
| Flexible column layout | [Containers](Containers/scope.md)                                  | Grouped leaf      | One to three columns for a list, its detail and further detail.           |

## Layout mechanisms and definitions

### Layout rules and relationships

Holds: Rules and relationships that decide how elements occupy and respond to space.

| Taxonomy entry      | Spec object               | Abstraction level  | Notes                                          |
| ------------------- | ------------------------- | ------------------ | ---------------------------------------------- |
| Containment         | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary.             |
| Flow                | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary.             |
| Alignment           | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary.             |
| Anchoring           | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary.             |
| Sizing              | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary.             |
| Spacing             | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary.             |
| Wrapping            | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary.             |
| Responsive Reflow   | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary.             |
| Breakpoint          | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary.             |
| Layered arrangement | [Layout](Layout/scope.md) | Folder abstraction | Children placed on top of each other in depth. |

## Presentation and style definitions

### Visual appearance and presentation rules

Holds: Visual and auditory rules that communicate hierarchy, identity, meaning, state and change.

| Taxonomy entry | Spec object                           | Abstraction level  | Notes                                                                    |
| -------------- | ------------------------------------- | ------------------ | ------------------------------------------------------------------------ |
| Color          | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Typography     | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Shape          | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Border         | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Shadow         | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Elevation      | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Opacity        | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Iconography    | [Presentation](Presentation/scope.md) | Folder abstraction | Icon-system vocabulary; concrete icon output maps to Display primitives. |
| Spacing tokens | [Presentation](Presentation/scope.md) | Folder abstraction | Design-token vocabulary.                                                 |
| Visual states  | [Presentation](Presentation/scope.md) | Folder abstraction | State styling vocabulary; concrete events map to Interaction.            |
| Theme          | [Presentation](Presentation/scope.md) | Folder abstraction | Visual system vocabulary.                                                |
| Motion         | [Presentation](Presentation/scope.md) | Folder abstraction | Animation and transition vocabulary.                                     |
| Visibility     | [Presentation](Presentation/scope.md) | Folder abstraction | Visibility and display-state vocabulary.                                 |
| Backdrop       | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Blur           | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-effect vocabulary.                                                |
| Color tint     | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-effect vocabulary.                                                |
| Focus outline  | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-token vocabulary; focus itself is an Interaction state.           |

## Internationalization and localization definitions

### Language, locale, and writing-system rules

Holds: Rules for language, translation, writing direction, cultural formatting and localized input.

| Taxonomy entry                          | Spec object                                           | Abstraction level  | Notes                                         |
| --------------------------------------- | ----------------------------------------------------- | ------------------ | --------------------------------------------- |
| Language support                        | [Internationalization](Internationalization/scope.md) | Folder abstraction | Locale and language vocabulary.               |
| Internationalization (i18n)             | [Internationalization](Internationalization/scope.md) | Folder abstraction | Authoring for multiple locales.               |
| Localization (l10n)                     | [Internationalization](Internationalization/scope.md) | Folder abstraction | Locale-specific adaptation.                   |
| Locale                                  | [Internationalization](Internationalization/scope.md) | Folder abstraction | Locale identity and data vocabulary.          |
| Translation                             | [Internationalization](Internationalization/scope.md) | Folder abstraction | Message translation vocabulary.               |
| Pluralization and grammatical variation | [Internationalization](Internationalization/scope.md) | Folder abstraction | Grammar-aware message vocabulary.             |
| Text direction and writing mode         | [Internationalization](Internationalization/scope.md) | Folder abstraction | Direction and script vocabulary.              |
| RTL layout adaptation                   | [Internationalization](Internationalization/scope.md) | Folder abstraction | Right-to-left layout adaptation.              |
| Bidirectional text                      | [Internationalization](Internationalization/scope.md) | Folder abstraction | Mixed-direction text vocabulary.              |
| Directional mirroring                   | [Internationalization](Internationalization/scope.md) | Folder abstraction | Mirrored icon/layout vocabulary.              |
| Date/time/calendar formatting           | [Internationalization](Internationalization/scope.md) | Folder abstraction | Locale-aware date and calendar vocabulary.    |
| Number/percentage/digit formatting      | [Internationalization](Internationalization/scope.md) | Folder abstraction | Locale-aware number vocabulary.               |
| Currency/measurement formatting         | [Internationalization](Internationalization/scope.md) | Folder abstraction | Locale-aware unit vocabulary.                 |
| Locale-aware sorting and search         | [Internationalization](Internationalization/scope.md) | Folder abstraction | Collation and search vocabulary.              |
| Font/glyph/text-metrics support         | [Internationalization](Internationalization/scope.md) | Folder abstraction | Font and glyph fallback vocabulary.           |
| Localized input and validation          | [Internationalization](Internationalization/scope.md) | Folder abstraction | Locale-aware input and validation vocabulary. |

## Interaction definitions

### Interaction states

Holds: Conditions that show an element's availability, focus, activation or selection.

| Taxonomy entry | Spec object                         | Abstraction level  | Notes                         |
| -------------- | ----------------------------------- | ------------------ | ----------------------------- |
| Hover state    | [Interaction](Interaction/scope.md) | Folder abstraction | Interaction state vocabulary. |
| Focus state    | [Interaction](Interaction/scope.md) | Folder abstraction | Interaction state vocabulary. |
| Active state   | [Interaction](Interaction/scope.md) | Folder abstraction | Interaction state vocabulary. |
| Pressed state  | [Interaction](Interaction/scope.md) | Folder abstraction | Interaction state vocabulary. |
| Selected state | [Interaction](Interaction/scope.md) | Folder abstraction | Interaction state vocabulary. |
| Disabled state | [Interaction](Interaction/scope.md) | Folder abstraction | Interaction state vocabulary. |

### Interaction areas and constraints

Holds: Hit regions and the rules for targeting an element reliably.

| Taxonomy entry      | Spec object                         | Abstraction level  | Notes                   |
| ------------------- | ----------------------------------- | ------------------ | ----------------------- |
| Touch target        | [Interaction](Interaction/scope.md) | Folder abstraction | Target-size vocabulary. |
| Pointer hit area    | [Interaction](Interaction/scope.md) | Folder abstraction | Target-size vocabulary. |
| Minimum target size | [Interaction](Interaction/scope.md) | Folder abstraction | Target-size vocabulary. |
| Target spacing      | [Interaction](Interaction/scope.md) | Folder abstraction | Target-size vocabulary. |

### Gestures

Holds: Movements or contact patterns interpreted as higher-level interactions.

| Taxonomy entry  | Spec object                         | Abstraction level  | Notes                                                   |
| --------------- | ----------------------------------- | ------------------ | ------------------------------------------------------- |
| Tap             | [Interaction](Interaction/scope.md) | Folder abstraction | Gesture vocabulary.                                     |
| Double-tap      | [Interaction](Interaction/scope.md) | Folder abstraction | Gesture vocabulary.                                     |
| Long-press      | [Interaction](Interaction/scope.md) | Folder abstraction | Gesture vocabulary.                                     |
| Swipe           | [Interaction](Interaction/scope.md) | Folder abstraction | Gesture vocabulary.                                     |
| Pinch           | [Interaction](Interaction/scope.md) | Folder abstraction | Gesture vocabulary.                                     |
| Rotate          | [Interaction](Interaction/scope.md) | Folder abstraction | Gesture vocabulary.                                     |
| Pull to refresh | [Interaction](Interaction/scope.md) | Folder abstraction | Gesture vocabulary; the refresh request is its outcome. |

### Input events

Holds: Low-level pointer, touch, keyboard, focus and value events.

| Taxonomy entry               | Spec object                         | Abstraction level  | Notes                                |
| ---------------------------- | ----------------------------------- | ------------------ | ------------------------------------ |
| Pointer/mouse button press   | [Interaction](Interaction/scope.md) | Folder abstraction | Pointer event vocabulary.            |
| Pointer/mouse button release | [Interaction](Interaction/scope.md) | Folder abstraction | Pointer event vocabulary.            |
| Click                        | [Interaction](Interaction/scope.md) | Folder abstraction | Activation event vocabulary.         |
| Pointer move                 | [Interaction](Interaction/scope.md) | Folder abstraction | Pointer event vocabulary.            |
| Pointer enter/leave          | [Interaction](Interaction/scope.md) | Folder abstraction | Pointer event vocabulary.            |
| Wheel/scroll event           | [Interaction](Interaction/scope.md) | Folder abstraction | Pointer and scroll event vocabulary. |
| Touch start/move/end         | [Interaction](Interaction/scope.md) | Folder abstraction | Touch event vocabulary.              |
| Key down                     | [Interaction](Interaction/scope.md) | Folder abstraction | Keyboard event vocabulary.           |
| Key up                       | [Interaction](Interaction/scope.md) | Folder abstraction | Keyboard event vocabulary.           |
| Modifier-key combination     | [Interaction](Interaction/scope.md) | Folder abstraction | Keyboard shortcut vocabulary.        |
| Standard character-key input | [Interaction](Interaction/scope.md) | Folder abstraction | Keyboard text-entry vocabulary.      |
| Special-key input            | [Interaction](Interaction/scope.md) | Folder abstraction | Keyboard command vocabulary.         |
| Focus event                  | [Interaction](Interaction/scope.md) | Folder abstraction | Focus event vocabulary.              |
| Input event                  | [Interaction](Interaction/scope.md) | Folder abstraction | Input event vocabulary.              |
| Change event                 | [Interaction](Interaction/scope.md) | Folder abstraction | Change event vocabulary.             |

## Behaviors

Holds: Reusable behaviors that act on an existing element without being a visible element themselves.

| Taxonomy entry                   | Spec object                                                                 | Abstraction level | Notes                                                                                  |
| -------------------------------- | --------------------------------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------- |
| Drag and drop                    | [Drag and drop](Behaviors/drag_and_drop.scope.md)                           | Existing object   | Reusable behavior object.                                                              |
| Collapsible                      | [Collapsible](Behaviors/collapsible.scope.md)                               | Existing object   | Reusable behavior object.                                                              |
| Modal overlay                    | [Overlay containers](Containers/overlay_containers.scope.md)                | Alias             | Modal behavior; dialog semantics use Dialog. Its scope is decided by plan task W1 9.5. |
| Modal interaction                | [Overlay containers](Containers/overlay_containers.scope.md)                | Alias             | Alias of Modal overlay, the name Qt and Angular Material use.                          |
| Input assistance                 | [Input assistance](Behaviors/input_assistance.scope.md)                     | Existing object   | Reusable behaviors that help or check what the user enters.                            |
| Text completion                  | [Input assistance](Behaviors/input_assistance.scope.md)                     | Alias             | Offers and accepts suggestions while the user types.                                   |
| Constraint validation            | [Input assistance](Behaviors/input_assistance.scope.md)                     | Alias             | Checks a value against declared rules; form-wide validation stays with Form.           |
| Viewport and focus control       | [Viewport and focus control](Behaviors/viewport_and_focus_control.scope.md) | Existing object   | Reusable behaviors a control applies to something outside itself.                      |
| Viewport scrolling               | [Viewport and focus control](Behaviors/viewport_and_focus_control.scope.md) | Alias             | Moves the visible part of a referenced viewport.                                       |
| Scroll lock                      | [Viewport and focus control](Behaviors/viewport_and_focus_control.scope.md) | Alias             | Stops background scrolling while a feature asks for it.                                |
| Focus management                 | [Viewport and focus control](Behaviors/viewport_and_focus_control.scope.md) | Alias             | Moves focus and restores it, outside the modal case.                                   |
| Exclusive selection coordination | [Choice controls](Controls/choice_controls.scope.md)                        | Alias             | Keeps its Choice controls scope.                                                       |
