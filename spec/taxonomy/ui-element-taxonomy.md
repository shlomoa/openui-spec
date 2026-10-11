# Taxonomy of Abstract UI Element Types

An **abstract UI element type** describes an element by its purpose and behavior, independent of framework, platform, visual style, or implementation technology.

This document is one of the three [taxonomy documents](../scopes/scope.md#taxonomy-documents).
It owns the abstract element types in 15 categories, with their purpose and typical
concrete elements, the OpenUI term each type maps to, and the
[classification rules](#classification-rules) with their primary and secondary role
examples. The [generic UI taxonomy](generic-ui-taxonomy.md) owns the sections,
subcategories and entries that the OpenUI terms belong to, and the
[taxonomy mapping](../scopes/taxonomy_mapping.md) owns their scope objects. Term
definitions and aliases live in the [glossary](../scopes/scope.md#glossary), and object
contracts in the scope files; a type description MUST NOT contradict them.

There is no universally standardized “complete” taxonomy. The following model aims to cover the element types used across web, desktop, mobile, touch, TV, embedded, voice-assisted, and mixed-interface applications.

The **OpenUI term** column names the taxonomy entries each abstract type maps to; Status
indicator is the name of a scope object. The column follows the merge of this taxonomy into
the OpenUI taxonomy ([merge proposal, appendix A](https://github.com/shlomoa/openui-spec/blob/archive/spec-survey/spec/survey/ui_element_taxonomy_merge_proposal.done.md#appendix-a-where-each-abstract-type-went)).
Some types were added later to give a home to an OpenUI term that no other type reached.
"Not added" marks a type that OpenUI does not add; the reasons are in the merge proposal's
[Not added](https://github.com/shlomoa/openui-spec/blob/archive/spec-survey/spec/survey/ui_element_taxonomy_merge_proposal.done.md#not-added) and [Delete](https://github.com/shlomoa/openui-spec/blob/archive/spec-survey/spec/survey/ui_element_taxonomy_merge_proposal.done.md#3-delete) lists.

The **Example image** column shows an illustration from the `images/` folder of
the [generic UI taxonomy](generic-ui-taxonomy.md). A type that maps to an OpenUI term with an
image reuses that image; a type without one has its own drawing. "Not applicable" marks a
type that has no visual form, such as a label, a description or a live region.

```mermaid
mindmap
  root((Abstract UI elements))
    Input and editing
      Data entry
      Commands
      Value adjustment
      File and media input
    Selection
      Single selection
      Multiple selection
      Hierarchical selection
      Date and time selection
    Navigation
      Global navigation
      Local navigation
      Sequential navigation
      Contextual navigation
    Content and data
      Text
      Structured data
      Media
      Visualization
    Actions
      Immediate actions
      Menu actions
      Stateful actions
      Compound actions
    Feedback and status
      Progress
      Notifications
      Validation
      System status
    Containers and layout
      Grouping
      Regions
      Collections
      Disclosure
    Overlays
      Dialogs
      Popovers
      Menus
      Transient messages
    Utility and system
      Search
      Help
      Accessibility
      Drag and resize
```

## 1. Input and Editing Elements

Elements that allow users to enter, modify, upload, or manipulate information.

| Abstract type             | Purpose                                                      | Typical concrete elements                           | OpenUI term                                              | Example image                                                         |
| ------------------------- | ------------------------------------------------------------ | --------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------- |
| Text Input                | Enter short, unformatted text                                | Text field, search field, URL field                 | Text field                                               | ![Text Input example](images/text-field.svg)                          |
| Structured Text Input     | Enter text constrained to a format                           | Email, telephone, IP address, mask input            | Text field; Constraint validation                        | ![Structured Text Input example](images/text-field.svg)               |
| Numeric Input             | Enter a number                                               | Number field, stepper, spin box                     | Spin box                                                 | ![Numeric Input example](images/spin-box-stepper-input.svg)           |
| Password Input            | Enter concealed sensitive text                               | Password field, PIN field                           | Password field                                           | ![Password Input example](images/password-field.svg)                  |
| Multiline Text Input      | Enter longer textual content                                 | Text area, expanding editor                         | Text area                                                | ![Multiline Text Input example](images/text-area.svg)                 |
| Rich-Text Input           | Enter formatted content                                      | Rich-text editor, Markdown editor                   | Rich text editor                                         | ![Rich-Text Input example](images/rich-text-editor.svg)               |
| Code Input                | Enter or edit source code                                    | Code editor, query editor                           | Text area                                                | ![Code Input example](images/text-area.svg)                           |
| Autocomplete Input        | Enter text with suggestions                                  | Combobox, typeahead                                 | Suggestion-backed combo box; Combo box; Input assistance | ![Autocomplete Input example](images/suggestion-backed-combo-box.svg) |
| Tokenized Input           | Enter multiple discrete values                               | Chip input, recipient field, tag editor             | Token collection; Editable chip collection               | ![Tokenized Input example](images/token-collection.svg)               |
| Boolean Input             | Set a binary value                                           | Checkbox, switch, toggle                            | Checkbox; Switch; Toggle button                          | ![Boolean Input example](images/checkbox.svg)                         |
| Range Input               | Choose a value within a range                                | Slider, range slider, dial                          | Slider; Rotary value control                             | ![Range Input example](images/slider.svg)                             |
| Incremental Input         | Increase or decrease a value                                 | Stepper, spinner                                    | Step input                                               | ![Incremental Input example](images/spin-box-stepper-input.svg)       |
| Direct Manipulation Input | Change a value by manipulating its representation            | Drag handle, resize handle, rotation control        | Drag handle; Resize handle; Drag and drop                | ![Direct Manipulation Input example](images/drag-handle.svg)          |
| Drawing Input             | Provide freehand or geometric input                          | Canvas, signature pad, sketch area                  | Drawing area; Canvas                                     | ![Drawing Input example](images/canvas-drawing-area.svg)              |
| Color Input               | Select or enter a color                                      | Color picker, palette, eyedropper                   | Color picker                                             | ![Color Input example](images/color-picker.svg)                       |
| File Input                | Select files from storage                                    | File picker, upload field, drop zone, folder picker | File picker; File upload; Folder picker                  | ![File Input example](images/file-picker.svg)                         |
| Capture Input             | Capture information from a device                            | Camera capture, microphone recorder, scanner        | Microphone input; Camera preview                         | ![Capture Input example](images/microphone-input.svg)                 |
| Voice Input               | Enter content through speech                                 | Dictation button, voice prompt                      | Not added                                                | ![Voice Input example](images/voice-input.svg)                        |
| Form                      | Group related inputs into a submission or editing unit       | Registration form, settings form                    | Form                                                     | ![Form example](images/form.svg)                                      |
| Form Field                | Combine an input with its label, help, state, and validation | Labeled field, field wrapper                        | Form field                                               | ![Form Field example](images/form-field.svg)                          |
| Input Group               | Combine related inputs or input accessories                  | Address group, field with unit selector             | Form group; Form field                                   | ![Input Group example](images/form-group.svg)                         |
| Shortcut Input            | Record a key combination                                     | Keyboard shortcut field, hotkey editor              | Keyboard shortcut field                                  | ![Shortcut Input example](images/keyboard-shortcut-field.svg)         |
| Metadata-Driven Input     | Pick the editor from the data type of the value              | Smart field, generic value editor                   | Metadata-driven field                                    | ![Metadata-Driven Input example](images/metadata-driven-field.svg)    |

## 2. Selection Elements

Elements used to choose one or more options from a known or discoverable set.

| Abstract type             | Purpose                                 | Typical concrete elements             | OpenUI term                                                    | Example image                                                  |
| ------------------------- | --------------------------------------- | ------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| Binary Selection          | Choose between two states               | Checkbox, switch                      | Checkbox; Switch                                               | ![Binary Selection example](images/checkbox.svg)               |
| Exclusive Selection       | Select exactly one option               | Radio group, segmented control        | Radio button; Exclusive selection coordination; Selection mode | ![Exclusive Selection example](images/radio-button.svg)        |
| Optional Single Selection | Select zero or one option               | Dropdown, select, listbox             | Dropdown; List box; Selection mode                             | ![Optional Single Selection example](images/dropdown.svg)      |
| Multiple Selection        | Select zero or more options             | Checkbox group, multi-select          | Selection mode; Checkbox; Multi-select combo box               | ![Multiple Selection example](images/selection-mode.svg)       |
| Segmented Selection       | Select from a small visible set         | Segmented button, choice chips        | Toggle button; Exclusive selection coordination                | ![Segmented Selection example](images/toggle-button.svg)       |
| List Selection            | Select entries from a list              | Listbox, selectable list              | List box                                                       | ![List Selection example](images/list-box.svg)                 |
| Grid Selection            | Select cells or items in two dimensions | Data grid, image picker               | Data grid                                                      | ![Grid Selection example](images/table-data-grid.svg)          |
| Hierarchical Selection    | Select from nested options              | Tree view, cascading selector         | Tree view                                                      | ![Hierarchical Selection example](images/tree-view.svg)        |
| Transfer Selection        | Move selected items between sets        | Transfer list, dual listbox           | Not added                                                      | ![Transfer Selection example](images/transfer-list.svg)        |
| Ordered Selection         | Select and arrange items                | Reorderable list, ranking control     | List; Drag and drop                                            | ![Ordered Selection example](images/list.svg)                  |
| Date Selection            | Select a calendar date                  | Date picker, calendar, date field     | Date picker; Date field                                        | ![Date Selection example](images/date-picker.svg)              |
| Time Selection            | Select a time                           | Time picker, clock picker, time field | Time picker; Time field                                        | ![Time Selection example](images/time-picker.svg)              |
| Date-Time Selection       | Select a combined date and time         | Date-time picker                      | Date and time field                                            | ![Date-Time Selection example](images/date-and-time-field.svg) |
| Duration Selection        | Select a length of time                 | Duration field, interval picker       | Not added                                                      | ![Duration Selection example](images/duration-field.svg)       |
| Range Selection           | Select start and end values             | Date-range picker, dual-thumb slider  | Range slider; Date picker                                      | ![Range Selection example](images/range-slider.svg)            |
| Wheel Selection           | Select values by rotating columns       | Wheel picker, scroll picker           | Wheel picker                                                   | ![Wheel Selection example](images/wheel-picker.svg)            |
| Rating Selection          | Choose an ordinal evaluation            | Star rating, reaction scale           | Rating control                                                 | ![Rating Selection example](images/rating-control.svg)         |
| Spatial Selection         | Select a location or region             | Map picker, crop region               | Geographic map; Graphics viewport                              | ![Spatial Selection example](images/map.svg)                   |
| Font Selection            | Select a font                           | Font picker, font-family list         | Font picker; Font-family selector                              | ![Font Selection example](images/font-picker.svg)              |

## 3. Action and Command Elements

Elements through which users request operations.

| Abstract type       | Purpose                                         | Typical concrete elements          | OpenUI term                     | Example image                                            |
| ------------------- | ----------------------------------------------- | ---------------------------------- | ------------------------------- | -------------------------------------------------------- |
| Primary Action      | Invoke the main action in a context             | Primary button                     | Button                          | ![Primary Action example](images/button.svg)             |
| Secondary Action    | Invoke a supporting action                      | Secondary button                   | Button                          | ![Secondary Action example](images/button.svg)           |
| Tertiary Action     | Invoke a lower-emphasis action                  | Text button, link button           | Button                          | ![Tertiary Action example](images/button.svg)            |
| Icon Action         | Invoke an action using a compact symbol         | Icon button, tool button           | Icon button; Tool button        | ![Icon Action example](images/icon-button.svg)           |
| Destructive Action  | Perform a potentially damaging operation        | Delete button                      | Button                          | ![Destructive Action example](images/button.svg)         |
| Stateful Action     | Invoke and represent a persistent state         | Toggle button, favorite button     | Toggle button                   | ![Stateful Action example](images/toggle-button.svg)     |
| Repeating Action    | Repeat while activated                          | Press-and-hold control             | Not added                       | ![Repeating Action example](images/repeating-action.svg) |
| Split Action        | Offer a default action and related alternatives | Split button                       | Menu button                     | ![Split Action example](images/dropdown-menu.svg)        |
| Compound Action     | Present several related actions as one unit     | Button group, toolbar              | Toolbar                         | ![Compound Action example](images/toolbar.svg)           |
| Floating Action     | Expose a prominent contextual action            | Floating action button             | Button                          | ![Floating Action example](images/button.svg)            |
| Menu Action         | Invoke an action from a menu                    | Menu item, dropdown-menu item      | Menu item                       | ![Menu Action example](images/menu-item.svg)             |
| Contextual Action   | Act on a selected or focused object             | Context menu command, row action   | Context menu; Menu item         | ![Contextual Action example](images/context-menu.svg)    |
| Submission Action   | Commit entered data                             | Submit, save, apply                | Button                          | ![Submission Action example](images/button.svg)          |
| Cancellation Action | Abandon or reverse an operation                 | Cancel, dismiss                    | Button                          | ![Cancellation Action example](images/button.svg)        |
| Undoable Action     | Reverse a recent operation                      | Undo, redo                         | Button; Menu item; List         | ![Undoable Action example](images/toast-snackbar.svg)    |
| Shortcut Action     | Invoke a command through an alternate input     | Keyboard shortcut, gesture command | Modifier-key combination; Swipe | ![Shortcut Action example](images/shortcut-action.svg)   |
| Menu Bar            | Offer menus of commands in a bar                | Application menu bar               | Menubar                         | ![Menu Bar example](images/menubar.svg)                  |

## 4. Navigation Elements

Elements that move users between locations, views, sections, records, or states.

| Abstract type           | Purpose                                          | Typical concrete elements                           | OpenUI term                                     | Example image                                                   |
| ----------------------- | ------------------------------------------------ | --------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------- |
| Navigation Link         | Move to another destination                      | Hyperlink, navigation item                          | Link; Navigation item                           | ![Navigation Link example](images/link.svg)                     |
| Global Navigation       | Navigate among major application areas           | Navigation bar, app bar, navigation rail, shell bar | Navigation bar; Navigation Rail; Shell bar      | ![Global Navigation example](images/navigation-bar.svg)         |
| Local Navigation        | Navigate within the current area                 | Sidebar, local menu                                 | Navigation group                                | ![Local Navigation example](images/navigation-group.svg)        |
| Responsive Navigation   | Provide navigation adapted to limited space      | Hamburger button, navigation drawer                 | Hamburger button; Navigation Drawer             | ![Responsive Navigation example](images/hamburger-menu.svg)     |
| Tab Navigation          | Switch between peer views                        | Tabs, tab bar                                       | Tab Bar                                         | ![Tab Navigation example](images/tab-bar.svg)                   |
| Hierarchical Navigation | Move through nested structures                   | Tree navigation, nested menu, column browser        | Tree view; Column browser                       | ![Hierarchical Navigation example](images/tree-view.svg)        |
| Path Navigation         | Show and navigate the current hierarchy          | Breadcrumbs                                         | Breadcrumb                                      | ![Path Navigation example](images/breadcrumb.svg)               |
| Sequential Navigation   | Move forward or backward through ordered content | Previous/next controls                              | Pagination control; Carousel                    | ![Sequential Navigation example](images/pagination-control.svg) |
| Step Navigation         | Move through a multi-stage process               | Stepper, wizard navigation                          | Workflow stepper; Wizard                        | ![Step Navigation example](images/workflow-stepper.svg)         |
| Pagination              | Navigate among discrete result pages             | Paginator                                           | Pagination control                              | ![Pagination example](images/pagination-control.svg)            |
| Continuous Navigation   | Move through an unbounded collection             | Infinite scroll, load-more control                  | List                                            | Not applicable                                                  |
| Record Navigation       | Move between individual records                  | First, previous, next, last                         | Pagination control                              | ![Record Navigation example](images/pagination-control.svg)     |
| Index Navigation        | Jump to a named or alphabetic section            | Index, A–Z rail                                     | Not added                                       | ![Index Navigation example](images/index-navigation.svg)        |
| Anchor Navigation       | Jump within the current document or view         | Table of contents, anchor links                     | Link                                            | ![Anchor Navigation example](images/link.svg)                   |
| History Navigation      | Move through previously visited states           | Back, forward                                       | Routing; Route                                  | ![History Navigation example](images/routing.svg)               |
| Spatial Navigation      | Move focus based on direction                    | D-pad navigation, focus grid                        | Focus management; Special-key input             | ![Spatial Navigation example](images/focus-management.svg)      |
| View Switcher           | Change the presentation of the same content      | List/grid switcher                                  | Toggle button; Exclusive selection coordination | ![View Switcher example](images/toggle-button.svg)              |
| Destination Launcher    | Open a destination, tool, or application         | App launcher, shortcut tile                         | Tile                                            | ![Destination Launcher example](images/tile.svg)                |

## 5. Content and Data-Presentation Elements

Elements that communicate information without primarily accepting input.

| Abstract type     | Purpose                                               | Typical concrete elements                     | OpenUI term                 | Example image                                                  |
| ----------------- | ----------------------------------------------------- | --------------------------------------------- | --------------------------- | -------------------------------------------------------------- |
| Text Content      | Present textual information                           | Paragraph, heading, caption, highlighted text | Text; Highlighted text      | ![Text Content example](images/text.svg)                       |
| Label             | Identify another element or value                     | Field label, item label                       | Label                       | ![Label example](images/label.svg)                             |
| Value Display     | Present a discrete value                              | Read-only field, metric                       | Text; Calculated output     | ![Value Display example](images/text.svg)                      |
| Icon              | Communicate identity, state, or meaning symbolically  | Functional icon, status icon                  | Icon                        | ![Icon example](images/icon.svg)                               |
| Image             | Present raster or vector visual content               | Photo, illustration                           | Image                       | ![Image example](images/image.svg)                             |
| Avatar            | Represent a person, entity, or agent                  | User avatar, organization mark                | Avatar                      | ![Avatar example](images/avatar.svg)                           |
| Badge             | Display a compact status or count                     | Notification badge, status badge              | Badge                       | ![Badge example](images/badge.svg)                             |
| Tag               | Display classification or metadata                    | Tag, chip, label                              | Tag                         | ![Tag example](images/tag.svg)                                 |
| Key–Value Display | Present named attributes                              | Description list, property panel              | Description list            | ![Key–Value Display example](images/description-list.svg)      |
| List              | Present an ordered or unordered collection            | List, feed                                    | List                        | ![List example](images/list.svg)                               |
| Table             | Present aligned data records                          | Table, matrix                                 | Table                       | ![Table example](images/table-data-grid.svg)                   |
| Data Grid         | Present structured interactive tabular data           | Sortable grid, spreadsheet, tree grid         | Data grid; Tree grid        | ![Data Grid example](images/table-data-grid.svg)               |
| Card              | Present a bounded collection representing one subject | Product card, summary card                    | Card                        | ![Card example](images/card.svg)                               |
| Tile              | Present a compact selectable destination or item      | Dashboard tile                                | Tile                        | ![Tile example](images/tile.svg)                               |
| Tree              | Present hierarchical data                             | File tree, outline                            | Tree                        | ![Tree example](images/tree.svg)                               |
| Timeline          | Present events in chronological order                 | Activity timeline                             | List                        | ![Timeline example](images/timeline.svg)                       |
| Calendar View     | Present information organized by date                 | Month view, agenda                            | Planning calendar           | ![Calendar View example](images/planning-calendar.svg)         |
| Code Display      | Present source or machine-readable text               | Code block, diff viewer                       | Text                        | ![Code Display example](images/code-display.svg)               |
| Quote Display     | Present attributed or emphasized text                 | Blockquote, testimonial                       | Text                        | ![Quote Display example](images/quote-display.svg)             |
| Divider           | Express separation between regions                    | Separator, rule                               | Divider; Separator          | ![Divider example](images/separator-divider.svg)               |
| Placeholder       | Reserve or describe absent content                    | Skeleton, empty slot                          | Loader; Illustrated message | ![Placeholder example](images/loader-spinner.svg)              |
| Empty State       | Explain that content is unavailable or nonexistent    | No-results state                              | Illustrated message         | ![Empty State example](images/illustrated-message.svg)         |
| Thumbnail         | Provide a small preview                               | Image thumbnail, document preview             | Image                       | ![Thumbnail example](images/image.svg)                         |
| Preview           | Present a representation before opening or committing | File preview, print preview                   | Not added                   | ![Preview example](images/content-preview.svg)                 |
| Shape             | Draw a geometric shape                                | Ellipse, rectangle, line, path                | Geometric shape             | ![Shape example](images/geometric-shape.svg)                   |
| Custom Graphics   | Show content that the application draws itself        | Graphics API surface                          | Custom graphics surface     | ![Custom Graphics example](images/custom-graphics-surface.svg) |

## 6. Media Elements

Elements used to display or control time-based or immersive content.

| Abstract type     | Purpose                                             | Typical concrete elements         | OpenUI term                  | Example image                                                        |
| ----------------- | --------------------------------------------------- | --------------------------------- | ---------------------------- | -------------------------------------------------------------------- |
| Image Viewer      | Display and inspect images                          | Lightbox, zoomable viewer         | Image; Popover               | ![Image Viewer example](images/image.svg)                            |
| Gallery           | Present a navigable media collection                | Image gallery, carousel           | Carousel; Icon collection    | ![Gallery example](images/carousel.svg)                              |
| Audio Player      | Play and control audio                              | Podcast player                    | Media player                 | ![Audio Player example](images/media-player.svg)                     |
| Video Player      | Play and control video                              | Embedded video player             | Media player                 | ![Video Player example](images/media-player.svg)                     |
| Media Controller  | Control playback independently of the media surface | Playbar, transport controls       | Media player                 | ![Media Controller example](images/media-player.svg)                 |
| Timeline Scrubber | Navigate through time-based content                 | Seek bar                          | Media player                 | ![Timeline Scrubber example](images/media-player.svg)                |
| Volume Controller | Adjust sound level                                  | Volume slider, mute control       | Media player                 | ![Volume Controller example](images/media-player.svg)                |
| Caption Display   | Present synchronized text                           | Subtitles, closed captions        | Captions                     | ![Caption Display example](images/captions.svg)                      |
| Transcript        | Present a textual media representation              | Audio transcript                  | Text                         | Not applicable                                                       |
| Live Media View   | Present real-time media                             | Live stream, camera monitor       | Media player; Camera preview | ![Live Media View example](images/media-player.svg)                  |
| Immersive View    | Present panoramic or spatial content                | 360° viewer, AR view, VR viewport | Not added                    | ![Immersive View example](images/immersive-view.svg)                 |
| Audio Description | Describe the visual content of a video in speech    | Described-video track             | Audio description            | ![Audio Description example](images/narration-audio-description.svg) |

## 7. Data-Visualization Elements

Elements that encode values, relationships, or spatial information visually. In OpenUI these visualizations sit with the data they show, in the generic UI taxonomy's [Collections and data presentation](generic-ui-taxonomy.md#collections-and-data-presentation) subcategory, not in a category of their own ([merge decision 1](https://github.com/shlomoa/openui-spec/blob/archive/spec-survey/spec/survey/ui_element_taxonomy_merge_proposal.done.md#decisions)).

| Abstract type            | Purpose                                        | Typical concrete elements       | OpenUI term       | Example image                                                   |
| ------------------------ | ---------------------------------------------- | ------------------------------- | ----------------- | --------------------------------------------------------------- |
| Indicator                | Show a value using a compact visual encoding   | Sparkline, signal meter         | Chart; Meter      | Not applicable                                                  |
| Gauge                    | Show a value relative to a range               | Dial, meter                     | Meter             | ![Gauge example](images/meter.svg)                              |
| Progress Visualization   | Show completion quantitatively                 | Progress bar, progress ring     | Progress bar      | ![Progress Visualization example](images/progress-bar.svg)      |
| Comparison Chart         | Compare categorical values                     | Bar chart, dot plot             | Chart             | ![Comparison Chart example](images/chart.svg)                   |
| Trend Chart              | Show change over an ordered dimension          | Line chart, area chart          | Chart             | ![Trend Chart example](images/chart.svg)                        |
| Composition Chart        | Show parts of a whole                          | Pie chart, stacked chart        | Chart             | ![Composition Chart example](images/chart.svg)                  |
| Distribution Chart       | Show frequency or spread                       | Histogram, box plot             | Chart             | ![Distribution Chart example](images/chart.svg)                 |
| Relationship Chart       | Show correlation or association                | Scatter plot, bubble chart      | Chart             | ![Relationship Chart example](images/chart.svg)                 |
| Hierarchy Visualization  | Show nested quantitative relationships         | Treemap, sunburst               | Chart             | ![Hierarchy Visualization example](images/chart.svg)            |
| Network Visualization    | Show nodes and relationships                   | Graph, dependency diagram       | Chart             | ![Network Visualization example](images/chart.svg)              |
| Flow Visualization       | Show movement between stages                   | Sankey diagram                  | Chart             | ![Flow Visualization example](images/chart.svg)                 |
| Temporal Visualization   | Show events or intervals over time             | Timeline, Gantt chart           | Planning calendar | ![Temporal Visualization example](images/planning-calendar.svg) |
| Geographic Visualization | Show spatially located data                    | Map, choropleth                 | Geographic map    | ![Geographic Visualization example](images/map.svg)             |
| Diagram                  | Explain structure, process, or relationships   | Flowchart, architecture diagram | Image             | ![Diagram example](images/diagram.svg)                          |
| Legend                   | Explain visual encodings                       | Chart legend                    | Chart             | ![Legend example](images/chart-legend.svg)                      |
| Annotation               | Add explanatory information to a visualization | Marker, callout, reference line | Chart             | ![Annotation example](images/chart-annotation.svg)              |

## 8. Feedback, Status, and Messaging Elements

Elements that communicate system state, results, validation, or changes.

| Abstract type          | Purpose                                              | Typical concrete elements                           | OpenUI term                       | Example image                                                     |
| ---------------------- | ---------------------------------------------------- | --------------------------------------------------- | --------------------------------- | ----------------------------------------------------------------- |
| Status Indicator       | Communicate a persistent state                       | Online dot, health indicator                        | Status indicator                  | ![Status Indicator example](images/status-indicator.svg)          |
| Loading Indicator      | Indicate activity with unknown duration              | Spinner, loader                                     | Loader; Spinner                   | ![Loading Indicator example](images/loader-spinner.svg)           |
| Determinate Progress   | Show measurable completion                           | Progress bar                                        | Progress mode                     | ![Determinate Progress example](images/progress-mode.svg)         |
| Indeterminate Progress | Show ongoing activity without a known endpoint       | Indeterminate bar                                   | Progress mode                     | ![Indeterminate Progress example](images/progress-mode.svg)       |
| Skeleton               | Represent the structure of loading content           | Skeleton screen                                     | Loader                            | ![Skeleton example](images/loader-spinner.svg)                    |
| Inline Message         | Communicate information near relevant content        | Hint, inline alert                                  | Alert                             | ![Inline Message example](images/alert.svg)                       |
| Validation Message     | Explain valid or invalid input                       | Field error, success indicator                      | Form field; Constraint validation | ![Validation Message example](images/form-field.svg)              |
| Global Alert           | Communicate significant application-wide information | Alert banner                                        | Alert                             | ![Global Alert example](images/alert.svg)                         |
| Notification           | Communicate an event asynchronously                  | Notification item                                   | Notification                      | ![Notification example](images/notification.svg)                  |
| Toast                  | Present brief, non-blocking feedback                 | Snackbar, toast                                     | Toast; Snackbar                   | ![Toast example](images/toast-snackbar.svg)                       |
| Confirmation           | Confirm that an action succeeded                     | Success message                                     | Alert                             | ![Confirmation example](images/alert.svg)                         |
| Warning                | Communicate risk or a potentially undesirable state  | Warning banner                                      | Alert                             | ![Warning example](images/alert.svg)                              |
| Error                  | Communicate failure                                  | Error panel                                         | Alert                             | ![Error example](images/alert.svg)                                |
| Blocking Message       | Require acknowledgment or action                     | Blocking error dialog                               | Dialog                            | ![Blocking Message example](images/dialog.svg)                    |
| Status Summary         | Aggregate several statuses                           | Validation summary, system-health panel, status bar | List; Alert; Status bar           | ![Status Summary example](images/status-summary.svg)              |
| Counter                | Communicate a changing quantity                      | Unread count, character count                       | Badge                             | ![Counter example](images/badge.svg)                              |
| Connectivity Indicator | Communicate connection state                         | Offline indicator, sync status                      | Badge                             | ![Connectivity Indicator example](images/badge.svg)               |
| Spoken Message         | Present text or interface state as speech            | Read-aloud, screen narration                        | Narration                         | ![Spoken Message example](images/narration-audio-description.svg) |
| Launch Screen          | Show branding while the application starts           | Splash screen                                       | Startup screen                    | ![Launch Screen example](images/startup-screen.svg)               |

## 9. Container, Grouping, and Layout Elements

Elements that organize other elements or establish visual and semantic regions.

| Abstract type          | Purpose                                            | Typical concrete elements           | OpenUI term                                                                                      | Example image                                                 |
| ---------------------- | -------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| Generic Container      | Group related content without specialized behavior | Panel, box                          | Container; Panel                                                                                 | ![Generic Container example](images/container.svg)            |
| Semantic Region        | Define a meaningful application area               | Header, main, footer, scaffold      | Region; Scaffold                                                                                 | ![Semantic Region example](images/region.svg)                 |
| Section                | Group related content under a common subject       | Content section                     | Region                                                                                           | ![Section example](images/region.svg)                         |
| Field Group            | Group related form controls                        | Fieldset, checkable group box       | Form group; Labelled group; Checkable group                                                      | ![Field Group example](images/form-group.svg)                 |
| Action Group           | Group related commands                             | Toolbar, button group, tool bar row | Toolbar; Tool bar row; Tool action                                                               | ![Action Group example](images/toolbar.svg)                   |
| List Container         | Organize repeated items                            | List, collection                    | List                                                                                             | ![List Container example](images/list.svg)                    |
| Grid Container         | Arrange content in rows and columns                | Layout grid                         | Grid                                                                                             | ![Grid Container example](images/layout-grid.svg)             |
| Stack                  | Arrange elements along one axis                    | Vertical stack, horizontal stack    | Stack                                                                                            | ![Stack example](images/stack.svg)                            |
| Split Layout           | Divide space into resizable or fixed regions       | Split pane, splitter handle         | Splitter; Pane; Splitter handle                                                                  | ![Split Layout example](images/splitter.svg)                  |
| Sidebar Region         | Present supplementary or navigational content      | Sidebar, rail                       | Sidebar; Rail                                                                                    | ![Sidebar Region example](images/sidebar.svg)                 |
| Drawer                 | Hold content that enters from an edge              | Navigation drawer                   | Navigation Drawer                                                                                | ![Drawer example](images/navigation-drawer.svg)               |
| Scroll Container       | Provide a constrained scrollable region            | Scroll panel, scrollbar             | Scroll container; Scrollbar                                                                      | ![Scroll Container example](images/scroll-container.svg)      |
| Viewport               | Define the visible portion of larger content       | Canvas viewport                     | Scroll container; Graphics viewport; Viewport and focus control; Viewport scrolling; Scroll lock | ![Viewport example](images/scroll-container.svg)              |
| Responsive Container   | Adapt contents to available space                  | Adaptive panel                      | Responsive Reflow; Breakpoint                                                                    | ![Responsive Container example](images/responsive-reflow.svg) |
| Aspect-Ratio Container | Preserve a media or content proportion             | Video wrapper                       | Sizing                                                                                           | ![Aspect-Ratio Container example](images/sizing.svg)          |
| Safe-Area Container    | Avoid platform-reserved display regions            | Mobile safe-area wrapper            | Spacing                                                                                          | ![Safe-Area Container example](images/spacing.svg)            |
| Portal Region          | Render content outside its logical hierarchy       | Overlay host, portal outlet         | Not added                                                                                        | ![Portal Region example](images/portal-region.svg)            |
| Banner Region          | Greet the user at the top of a page                | Hero banner, welcome banner         | Hero banner                                                                                      | ![Banner Region example](images/hero-banner.svg)              |
| Window                 | Frame content with a title and window controls     | Application window, tool window     | Window                                                                                           | ![Window example](images/window.svg)                          |
| Page                   | Present one addressable screen of an application   | Object page, dashboard, shell page  | Object page; Dashboard; Shell page; Empty page                                                   | ![Page example](images/object-page.svg)                       |
| View                   | Present business objects or a workflow             | Detail view, report                 | View; Report                                                                                     | ![View example](images/screen-view.svg)                       |
| Bar                    | Arrange items along an edge-attached strip         | App bar, tab bar, status bar        | Bar                                                                                              | ![Bar example](images/bar.svg)                                |

## 10. Disclosure and Collection-Presentation Elements

Elements that control whether grouped content is visible or how a collection is traversed.

| Abstract type          | Purpose                                             | Typical concrete elements  | OpenUI term            | Example image                                                        |
| ---------------------- | --------------------------------------------------- | -------------------------- | ---------------------- | -------------------------------------------------------------------- |
| Disclosure Control     | Show or hide associated content                     | Expander, details control  | Disclosure             | ![Disclosure Control example](images/disclosure.svg)                 |
| Accordion              | Manage several expandable sections                  | Accordion                  | Accordion              | ![Accordion example](images/accordion.svg)                           |
| Collapsible Panel      | Reveal or conceal a content region                  | Expansion panel            | Collapsible            | ![Collapsible Panel example](images/collapsible.svg)                 |
| Tabbed Container       | Show one peer content panel at a time               | Tab panel, page stack      | Tab; Page stack        | ![Tabbed Container example](images/tab.svg)                          |
| Carousel               | Traverse a sequence within a bounded viewport       | Image carousel             | Carousel               | ![Carousel example](images/carousel.svg)                             |
| Tree Disclosure        | Expand or collapse hierarchical branches            | Tree node                  | Tree view              | ![Tree Disclosure example](images/tree-view.svg)                     |
| Truncation Control     | Reveal content omitted for compactness              | “Show more”                | Text                   | Not applicable                                                       |
| Virtualized Collection | Present part of a large collection efficiently      | Virtual list, virtual grid | Not added              | ![Virtualized Collection example](images/virtualized-collection.svg) |
| Filtered Collection    | Present items matching criteria                     | Filterable list            | List; Filter bar       | ![Filtered Collection example](images/list.svg)                      |
| Grouped Collection     | Divide items into named groups                      | Sectioned list             | List                   | ![Grouped Collection example](images/list.svg)                       |
| Master–Detail View     | Coordinate collection selection with detail content | Inbox layout               | Flexible column layout | ![Master–Detail View example](images/flexible-column-layout.svg)     |

## 11. Overlay and Transient Elements

Elements displayed above the normal content layer.

| Abstract type    | Purpose                                                          | Typical concrete elements            | OpenUI term                                               | Example image                                    |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------- | ------------------------------------------------ |
| Modal Dialog     | Require interaction before returning to the underlying interface | Confirmation dialog, progress dialog | Dialog; Progress dialog; Modal overlay; Modal interaction | ![Modal Dialog example](images/dialog.svg)       |
| Non-Modal Dialog | Present a movable or persistent auxiliary window                 | Tool dialog                          | Dialog                                                    | ![Non-Modal Dialog example](images/dialog.svg)   |
| Alert Dialog     | Require acknowledgment of an urgent message                      | Critical warning                     | Dialog                                                    | ![Alert Dialog example](images/dialog.svg)       |
| Sheet            | Present a task or choices from an edge                           | Bottom sheet, side sheet             | Sheet; Bottom Sheet                                       | ![Sheet example](images/sheet.svg)               |
| Popover          | Present contextual interactive content                           | Settings popover                     | Popover                                                   | ![Popover example](images/popover.svg)           |
| Tooltip          | Provide brief explanatory text                                   | Hover tooltip                        | Tooltip                                                   | ![Tooltip example](images/tooltip.svg)           |
| Menu             | Present a temporary list of commands or choices                  | Dropdown menu                        | Menu                                                      | ![Menu example](images/menu.svg)                 |
| Context Menu     | Present actions relevant to a target                             | Right-click menu                     | Context menu                                              | ![Context Menu example](images/context-menu.svg) |
| Dropdown Panel   | Present selectable or interactive content below an anchor        | Select panel                         | Popover                                                   | ![Dropdown Panel example](images/popover.svg)    |
| Lightbox         | Focus attention on media                                         | Image lightbox                       | Popover                                                   | ![Lightbox example](images/lightbox.svg)         |
| Inspector        | Present contextual properties or details                         | Object inspector                     | Side Sheet; Description list                              | ![Inspector example](images/side-sheet.svg)      |
| Coach Mark       | Explain an interface element in context                          | Product-tour callout                 | Popover                                                   | ![Coach Mark example](images/walkthrough.svg)    |
| Scrim            | Visually separate an overlay from underlying content             | Modal backdrop                       | Backdrop                                                  | ![Scrim example](images/backdrop.svg)            |

## 12. Search, Filtering, Sorting, and Query Elements

Elements used to locate, narrow, arrange, or formulate information.

| Abstract type      | Purpose                                      | Typical concrete elements      | OpenUI term           | Example image                                              |
| ------------------ | -------------------------------------------- | ------------------------------ | --------------------- | ---------------------------------------------------------- |
| Search Input       | Enter a free-text query                      | Search box                     | Search field          | ![Search Input example](images/search-field.svg)           |
| Search Suggestions | Propose queries or destinations              | Autocomplete suggestions       | Text completion       | ![Search Suggestions example](images/text-completion.svg)  |
| Search Scope       | Constrain where a search applies             | Scope selector                 | Search field          | ![Search Scope example](images/search-field.svg)           |
| Filter Control     | Include or exclude content by criteria       | Filter dropdown, filter chip   | Filter bar            | ![Filter Control example](images/filter-bar.svg)           |
| Faceted Filter     | Filter by multiple data dimensions           | Facet panel                    | Filter bar            | ![Faceted Filter example](images/filter-bar.svg)           |
| Active Filter      | Represent an applied constraint              | Filter tag                     | Filter bar            | ![Active Filter example](images/filter-bar.svg)            |
| Sort Control       | Set ordering criteria                        | Sort dropdown                  | Personalization panel | ![Sort Control example](images/personalization-panel.svg)  |
| Group Control      | Set collection grouping                      | Group-by selector              | Personalization panel | ![Group Control example](images/personalization-panel.svg) |
| Query Builder      | Construct compound logical criteria          | Rule builder                   | Not added             | ![Query Builder example](images/query-builder.svg)         |
| Saved Query        | Store and reapply query criteria             | Saved search                   | Not added             | ![Saved Query example](images/saved-query.svg)             |
| Results Summary    | Explain result quantity and applied criteria | Result count                   | Text                  | Not applicable                                             |
| Search Result      | Represent one matching item                  | Result card, result row        | List                  | ![Search Result example](images/list.svg)                  |
| Value Lookup       | Find and choose a valid value for a field    | Value help dialog, lookup list | Value help            | ![Value Lookup example](images/value-help.svg)             |

## 13. Help, Guidance, and Onboarding Elements

Elements that explain the interface or help users complete tasks.

| Abstract type        | Purpose                                             | Typical concrete elements | OpenUI term     | Example image                                          |
| -------------------- | --------------------------------------------------- | ------------------------- | --------------- | ------------------------------------------------------ |
| Helper Text          | Explain expected input or behavior                  | Field hint                | Form field      | ![Helper Text example](images/form-field.svg)          |
| Tooltip Help         | Provide brief contextual assistance                 | Informational tooltip     | Tooltip         | ![Tooltip Help example](images/tooltip.svg)            |
| Contextual Help      | Provide assistance relevant to the current location | Help panel                | Contextual help | ![Contextual Help example](images/contextual-help.svg) |
| Example              | Demonstrate an acceptable value or action           | Input example             | Text field      | Not applicable                                         |
| Instruction          | Explain how to perform a task                       | Instruction block         | Text            | Not applicable                                         |
| Walkthrough          | Guide users through a sequence                      | Product tour              | Not added       | ![Walkthrough example](images/walkthrough.svg)         |
| Coach Mark           | Draw attention to a particular control              | Feature callout           | Popover         | ![Coach Mark example](images/walkthrough.svg)          |
| Onboarding Checklist | Track introductory tasks                            | Getting-started checklist | List; Checkbox  | ![Onboarding Checklist example](images/list.svg)       |
| Documentation Link   | Lead to extended help                               | “Learn more” link         | Link            | ![Documentation Link example](images/link.svg)         |
| Glossary Definition  | Explain terminology                                 | Definition popover        | Popover         | ![Glossary Definition example](images/popover.svg)     |

## 14. Identity, Account, and Permission Elements

Elements representing users, roles, access, and authentication state. In OpenUI these are compound widgets built from existing elements, such as Avatar, Menu, Form and Badge; OpenUI adds no identity element ([merge decision 2](https://github.com/shlomoa/openui-spec/blob/archive/spec-survey/spec/survey/ui_element_taxonomy_merge_proposal.done.md#decisions)).

| Abstract type           | Purpose                                     | Typical concrete elements | OpenUI term                      | Example image                                                |
| ----------------------- | ------------------------------------------- | ------------------------- | -------------------------------- | ------------------------------------------------------------ |
| Identity Representation | Represent a person or account               | Avatar, profile chip      | Avatar                           | ![Identity Representation example](images/avatar.svg)        |
| Account Selector        | Switch among identities or tenants          | Account switcher          | Avatar; Menu                     | ![Account Selector example](images/avatar.svg)               |
| Authentication Input    | Collect authentication credentials          | Login form, OTP input     | Form; Text field; Password field | ![Authentication Input example](images/form.svg)             |
| Permission Request      | Ask for access to protected capabilities    | Permission prompt         | Not added                        | ![Permission Request example](images/permission-request.svg) |
| Role Indicator          | Communicate an assigned role                | Administrator badge       | Tag                              | ![Role Indicator example](images/tag.svg)                    |
| Presence Indicator      | Show availability or activity               | Online status             | Badge                            | ![Presence Indicator example](images/badge.svg)              |
| Participant List        | Present users involved in a context         | Member list               | List                             | ![Participant List example](images/list.svg)                 |
| Attribution             | Identify the creator or modifier of content | Byline, audit identity    | Text                             | Not applicable                                               |

## 15. Accessibility and Alternative-Interaction Elements

Accessibility and alternative interaction are properties of other elements, not elements. OpenUI adds none of these types as an element ([merge decision 3](https://github.com/shlomoa/openui-spec/blob/archive/spec-survey/spec/survey/ui_element_taxonomy_merge_proposal.done.md#decisions)).

| Abstract type         | Purpose                                                | Typical concrete elements       | OpenUI term | Example image                                         |
| --------------------- | ------------------------------------------------------ | ------------------------------- | ----------- | ----------------------------------------------------- |
| Focus Indicator       | Show the current keyboard or spatial-navigation target | Focus ring                      | Not added   | ![Focus Indicator example](images/focus-outline.svg)  |
| Skip Control          | Bypass repetitive interface regions                    | Skip-to-content link            | Not added   | ![Skip Control example](images/skip-control.svg)      |
| Accessibility Label   | Provide a nonvisual accessible name                    | ARIA label, semantic label      | Not added   | Not applicable                                        |
| Description           | Provide additional assistive context                   | Accessible description          | Not added   | Not applicable                                        |
| Live Region           | Announce dynamic changes                               | Status announcement             | Not added   | Not applicable                                        |
| Landmark              | Expose page regions to assistive technology            | Navigation, main, complementary | Not added   | Not applicable                                        |
| Keyboard Alternative  | Provide keyboard access to an operation                | Shortcut, access key            | Not added   | Not applicable                                        |
| Gesture Alternative   | Provide a non-gesture method for the same operation    | Visible previous/next buttons   | Not added   | Not applicable                                        |
| Caption or Transcript | Provide a text alternative to media                    | Closed captions, transcript     | Not added   | ![Caption or Transcript example](images/captions.svg) |
| Error Association     | Connect an invalid input with its explanation          | Described field error           | Not added   | Not applicable                                        |

## Classification Rules

Many concrete components belong to more than one abstract category. Classification SHOULD therefore be based on the element’s **primary purpose in its current context**.

Examples:

| Concrete element | Primary type                  | Possible secondary roles           |
| ---------------- | ----------------------------- | ---------------------------------- |
| Dropdown         | Single selection              | Disclosure, overlay                |
| Menu button      | Menu action container         | Overlay, navigation                |
| Tab Bar          | Tab navigation                | Selection, container               |
| Sidebar          | Layout region                 | Navigation, supplementary content  |
| Tag              | Metadata display              | Filter, selection                  |
| Badge            | Compact status display        | Counter, notification              |
| Icon             | Symbolic content              | Action when placed inside a button |
| Loader           | Indeterminate progress        | System status                      |
| Hamburger button | Responsive navigation trigger | Action, disclosure                 |
| Wheel Picker     | Single or compound selection  | Date/time or value input           |
| Carousel         | Collection presentation       | Sequential navigation              |
| Data Grid        | Structured data display       | Editing, selection, navigation     |
| Form             | Input grouping and submission | Validation, workflow               |

Hover states, touch targets, gestures, mouse events, and keyboard events are **not abstract UI element types**. The generic UI taxonomy places them in its [Interaction definitions](generic-ui-taxonomy.md#interaction-definitions) section, in four subcategories:

1. [Interaction states](generic-ui-taxonomy.md#interaction-states)
2. [Interaction areas and constraints](generic-ui-taxonomy.md#interaction-areas-and-constraints)
3. [Gestures](generic-ui-taxonomy.md#gestures)
4. [Input events](generic-ui-taxonomy.md#input-events)

Reusable behaviors that act on an element without being visible themselves are not abstract UI element types either; they are entries of the generic UI taxonomy's [Behaviors](generic-ui-taxonomy.md#behaviors) section.
