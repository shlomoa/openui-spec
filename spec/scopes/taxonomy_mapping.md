# Taxonomy mapping

This document maps each entry of the [generic UI taxonomy](../taxonomy/generic-ui-taxonomy.md)
to its canonical scope object under `spec/scopes/`. It is one of the three
[taxonomy documents](scope.md#taxonomy-documents). For each entry it owns the scope
object, the abstraction level and the scope-specific notes; for each leaf scope, its
primary section and subcategory. Its section and subcategory
headings and its entries mirror the generic UI taxonomy, which owns the sections, the
subcategories with their inclusion rules (Holds) and the placement of each entry; a test
keeps the two equal. The [UI element taxonomy](../taxonomy/ui-element-taxonomy.md) owns
the classification rules. Term definitions live in the [glossary](scope.md#glossary), and
object contracts in each linked scope file.

The abstraction levels used in the tables below are defined in the
[glossary](scope.md#abstraction-levels). Each row names one spec object. A note holds
only scope-specific information, such as the entry's secondary roles or the object a
related term maps to; it does not repeat the entry description. "—" means no note.
The [last section](#primary-categories-of-the-leaf-scopes) gives each leaf scope its
primary section and subcategory.

## Input elements

### Command activation

| Taxonomy entry   | Spec object                                          | Abstraction level | Notes                                    |
| ---------------- | ---------------------------------------------------- | ----------------- | ---------------------------------------- |
| Button           | [Action controls](Controls/action_controls.scope.md) | Grouped leaf      | Glossary term [Button](scope.md#button). |
| Icon button      | [Action controls](Controls/action_controls.scope.md) | Alias             | —                                        |
| Tool button      | [Action controls](Controls/action_controls.scope.md) | Alias             | —                                        |
| Hamburger button | [Action controls](Controls/action_controls.scope.md) | Alias             | Alias of Tool button.                    |
| Toggle button    | [Action controls](Controls/action_controls.scope.md) | Alias             | —                                        |

### Text and shortcut entry

| Taxonomy entry          | Spec object                                  | Abstraction level | Notes |
| ----------------------- | -------------------------------------------- | ----------------- | ----- |
| Text field              | [Text inputs](Controls/text_inputs.scope.md) | Grouped leaf      | —     |
| Text area               | [Text inputs](Controls/text_inputs.scope.md) | Alias             | —     |
| Password field          | [Text inputs](Controls/text_inputs.scope.md) | Alias             | —     |
| Rich text editor        | [Text inputs](Controls/text_inputs.scope.md) | Alias             | —     |
| Keyboard shortcut field | [Text inputs](Controls/text_inputs.scope.md) | Alias             | —     |
| Metadata-driven field   | [Text inputs](Controls/text_inputs.scope.md) | Alias             | —     |

### Value and resource selection

| Taxonomy entry              | Spec object                                          | Abstraction level | Notes                                                       |
| --------------------------- | ---------------------------------------------------- | ----------------- | ----------------------------------------------------------- |
| Checkbox                    | [Choice controls](Controls/choice_controls.scope.md) | Grouped leaf      | —                                                           |
| Radio button                | [Choice controls](Controls/choice_controls.scope.md) | Alias             | —                                                           |
| Switch                      | [Choice controls](Controls/choice_controls.scope.md) | Alias             | —                                                           |
| Dropdown                    | [Choice controls](Controls/choice_controls.scope.md) | Alias             | Menus map to [Menu widgets](Widgets/menu_widgets.scope.md). |
| List box                    | [Choice controls](Controls/choice_controls.scope.md) | Alias             | —                                                           |
| Combo box                   | [Choice controls](Controls/choice_controls.scope.md) | Alias             | —                                                           |
| Suggestion-backed combo box | [Choice controls](Controls/choice_controls.scope.md) | Alias             | —                                                           |
| Multi-select combo box      | [Choice controls](Controls/choice_controls.scope.md) | Alias             | —                                                           |
| Selection mode              | [Choice controls](Controls/choice_controls.scope.md) | Grouped leaf      | —                                                           |
| Font-family selector        | [Choice controls](Controls/choice_controls.scope.md) | Alias             | —                                                           |
| Slider                      | [Range control](Controls/range_control.scope.md)     | Grouped leaf      | —                                                           |
| Range slider                | [Range control](Controls/range_control.scope.md)     | Alias             | —                                                           |
| Rotary value control        | [Range control](Controls/range_control.scope.md)     | Alias             | —                                                           |
| Spin box                    | [Range control](Controls/range_control.scope.md)     | Alias             | —                                                           |
| Step input                  | [Range control](Controls/range_control.scope.md)     | Alias             | —                                                           |
| Rating control              | [Range control](Controls/range_control.scope.md)     | Alias             | —                                                           |
| Wheel picker                | [Picker control](Controls/picker_control.scope.md)   | Grouped leaf      | —                                                           |
| Color picker                | [Picker control](Controls/picker_control.scope.md)   | Alias             | —                                                           |
| File picker                 | [Picker control](Controls/picker_control.scope.md)   | Alias             | —                                                           |
| Font picker                 | [Picker control](Controls/picker_control.scope.md)   | Alias             | —                                                           |
| Folder picker               | [Picker control](Controls/picker_control.scope.md)   | Alias             | —                                                           |
| Token collection            | [List](Widgets/list.scope.md)                        | Alias             | —                                                           |
| Editable chip collection    | [List](Widgets/list.scope.md)                        | Alias             | —                                                           |
| File upload                 | [Widgets](Widgets/scope.md)                          | Grouped leaf      | —                                                           |

### Temporal entry

| Taxonomy entry      | Spec object                                             | Abstraction level | Notes |
| ------------------- | ------------------------------------------------------- | ----------------- | ----- |
| Date picker         | [Date/Time pickers](Widgets/date_time_pickers.scope.md) | Existing object   | —     |
| Time picker         | [Date/Time pickers](Widgets/date_time_pickers.scope.md) | Alias             | —     |
| Date field          | [Date/Time pickers](Widgets/date_time_pickers.scope.md) | Alias             | —     |
| Time field          | [Date/Time pickers](Widgets/date_time_pickers.scope.md) | Alias             | —     |
| Date and time field | [Date/Time pickers](Widgets/date_time_pickers.scope.md) | Alias             | —     |

### Drawing and capture

| Taxonomy entry   | Spec object                                                           | Abstraction level | Notes |
| ---------------- | --------------------------------------------------------------------- | ----------------- | ----- |
| Canvas           | [Drawing and capture controls](Controls/drawing_and_capture.scope.md) | Alias             | —     |
| Drawing area     | [Drawing and capture controls](Controls/drawing_and_capture.scope.md) | Alias             | —     |
| Microphone input | [Drawing and capture controls](Controls/drawing_and_capture.scope.md) | Alias             | —     |

### Manipulation handles

| Taxonomy entry | Spec object                                       | Abstraction level | Notes                                                   |
| -------------- | ------------------------------------------------- | ----------------- | ------------------------------------------------------- |
| Drag handle    | [Drag and drop](Behaviors/drag_and_drop.scope.md) | Alias             | Handle is an affordance for the drag-and-drop behavior. |
| Resize handle  | [Resizable](Behaviors/resizable.scope.md)         | Alias             | Handle is an affordance for the resizable behavior.     |

## Output elements

### Document and numeric display

| Taxonomy entry    | Spec object                                                | Abstraction level | Notes                       |
| ----------------- | ---------------------------------------------------------- | ----------------- | --------------------------- |
| Label             | [Display primitives](Controls/display_primitives.scope.md) | Grouped leaf      | —                           |
| Text              | [Display primitives](Controls/display_primitives.scope.md) | Alias             | —                           |
| Image             | [Display primitives](Controls/display_primitives.scope.md) | Alias             | —                           |
| Icon              | [Display primitives](Controls/display_primitives.scope.md) | Alias             | —                           |
| Avatar            | [Display primitives](Controls/display_primitives.scope.md) | Alias             | —                           |
| Separator         | [Display primitives](Controls/display_primitives.scope.md) | Alias             | —                           |
| Divider           | [Display primitives](Controls/display_primitives.scope.md) | Alias             | —                           |
| Calculated output | [Display primitives](Controls/display_primitives.scope.md) | Alias             | HTML `output`.              |
| Highlighted text  | [Display primitives](Controls/display_primitives.scope.md) | Alias             | Alias of Text; HTML `mark`. |

### Graphics presentation

| Taxonomy entry          | Spec object                                                | Abstraction level | Notes |
| ----------------------- | ---------------------------------------------------------- | ----------------- | ----- |
| Geometric shape         | [Display primitives](Controls/display_primitives.scope.md) | Alias             | —     |
| Custom graphics surface | [Media widgets](Widgets/media_widgets.scope.md)            | Alias             | —     |
| Graphics viewport       | [Media widgets](Widgets/media_widgets.scope.md)            | Alias             | —     |

### Collections and data presentation

| Taxonomy entry    | Spec object                                     | Abstraction level | Notes      |
| ----------------- | ----------------------------------------------- | ----------------- | ---------- |
| List              | [List](Widgets/list.scope.md)                   | Existing object   | —          |
| Table             | [Table](Widgets/table.scope.md)                 | Existing object   | —          |
| Data grid         | [Data grid](Widgets/data_grid.scope.md)         | Existing object   | —          |
| Description list  | [List](Widgets/list.scope.md)                   | Alias             | HTML `dl`. |
| Icon collection   | [List](Widgets/list.scope.md)                   | Alias             | —          |
| Planning calendar | [Widgets](Widgets/scope.md)                     | Grouped leaf      | —          |
| Tree              | [List](Widgets/list.scope.md)                   | Alias             | —          |
| Tree grid         | [Data grid](Widgets/data_grid.scope.md)         | Alias             | —          |
| Chart             | [Chart](Widgets/chart.scope.md)                 | Existing object   | —          |
| Geographic map    | [Media widgets](Widgets/media_widgets.scope.md) | Alias             | —          |

### Media playback

| Taxonomy entry | Spec object                                     | Abstraction level | Notes                       |
| -------------- | ----------------------------------------------- | ----------------- | --------------------------- |
| Media player   | [Media widgets](Widgets/media_widgets.scope.md) | Grouped leaf      | —                           |
| Camera preview | [Media widgets](Widgets/media_widgets.scope.md) | Alias             | —                           |
| Captions       | [Media widgets](Widgets/media_widgets.scope.md) | Alias             | HTML track kind `captions`. |

### Feedback and assistance

| Taxonomy entry      | Spec object                                            | Abstraction level | Notes                                |
| ------------------- | ------------------------------------------------------ | ----------------- | ------------------------------------ |
| Status bar          | [Status indicator](Controls/status_indicator.scope.md) | Grouped leaf      | —                                    |
| Tag                 | [Status indicator](Controls/status_indicator.scope.md) | Alias             | —                                    |
| Badge               | [Status indicator](Controls/status_indicator.scope.md) | Alias             | —                                    |
| Progress bar        | [Status indicator](Controls/status_indicator.scope.md) | Alias             | —                                    |
| Loader              | [Status indicator](Controls/status_indicator.scope.md) | Alias             | —                                    |
| Spinner             | [Status indicator](Controls/status_indicator.scope.md) | Alias             | —                                    |
| Meter               | [Status indicator](Controls/status_indicator.scope.md) | Alias             | HTML `meter`.                        |
| Progress mode       | [Status indicator](Controls/status_indicator.scope.md) | Grouped leaf      | Applies to Progress bar and Spinner. |
| Tooltip             | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Grouped leaf      | —                                    |
| Alert               | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | —                                    |
| Toast               | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | —                                    |
| Snackbar            | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | —                                    |
| Notification        | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | —                                    |
| Narration           | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | —                                    |
| Audio description   | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | —                                    |
| Contextual help     | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | —                                    |
| Startup screen      | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | —                                    |
| Illustrated message | [Feedback widgets](Widgets/feedback_widgets.scope.md)  | Alias             | —                                    |

## Navigational elements

### Command menus

| Taxonomy entry | Spec object                                   | Abstraction level | Notes                                                                                  |
| -------------- | --------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------- |
| Menu           | [Menu widgets](Widgets/menu_widgets.scope.md) | Grouped leaf      | Not the HTML `menu` element, which is a plain list of commands without popup behavior. |
| Menu button    | [Menu widgets](Widgets/menu_widgets.scope.md) | Alias             | Also called dropdown menu.                                                             |
| Context menu   | [Menu widgets](Widgets/menu_widgets.scope.md) | Alias             | —                                                                                      |
| Menubar        | [Menu widgets](Widgets/menu_widgets.scope.md) | Alias             | —                                                                                      |
| Menu item      | [Menu widgets](Widgets/menu_widgets.scope.md) | Alias             | WAI-ARIA `menuitem`.                                                                   |

### Hierarchy browsing

| Taxonomy entry | Spec object                                               | Abstraction level | Notes |
| -------------- | --------------------------------------------------------- | ----------------- | ----- |
| Tree view      | [Navigation widgets](Widgets/navigation_widgets.scope.md) | Alias             | —     |
| Breadcrumb     | [Navigation widgets](Widgets/navigation_widgets.scope.md) | Alias             | —     |
| Column browser | [Navigation widgets](Widgets/navigation_widgets.scope.md) | Alias             | —     |

### Content selection and position

| Taxonomy entry     | Spec object                                                            | Abstraction level | Notes                                                                  |
| ------------------ | ---------------------------------------------------------------------- | ----------------- | ---------------------------------------------------------------------- |
| Tab                | [Tabs](Containers/tabs.scope.md)                                       | Existing object   | The spec object is the tabbed container; a tab is one of its children. |
| Tab Bar            | [Tabs](Containers/tabs.scope.md)                                       | Alias             | —                                                                      |
| Scrollbar          | [Link and scroll controls](Controls/link_and_scroll_controls.scope.md) | Alias             | —                                                                      |
| Pagination control | [Navigation widgets](Widgets/navigation_widgets.scope.md)              | Alias             | —                                                                      |
| Carousel           | [Navigation widgets](Widgets/navigation_widgets.scope.md)              | Alias             | —                                                                      |

### Application navigation

| Taxonomy entry    | Spec object                                                            | Abstraction level | Notes |
| ----------------- | ---------------------------------------------------------------------- | ----------------- | ----- |
| Navigation bar    | [Application navigation](Application/navigation.scope.md)              | Existing object   | —     |
| Navigation Drawer | [Navigation widgets](Widgets/navigation_widgets.scope.md)              | Grouped leaf      | —     |
| Navigation Rail   | [Navigation widgets](Widgets/navigation_widgets.scope.md)              | Alias             | —     |
| Link              | [Link and scroll controls](Controls/link_and_scroll_controls.scope.md) | Grouped leaf      | —     |
| Navigation item   | [Navigation item](Application/nav_item.scope.md)                       | Existing object   | —     |
| Navigation group  | [Navigation group](Application/nav_group.scope.md)                     | Existing object   | —     |
| Route             | [Route](Application/route.scope.md)                                    | Existing object   | —     |
| Routing           | [Routing](Application/routing.scope.md)                                | Existing object   | —     |

### Search, filtering and sorting

| Taxonomy entry        | Spec object                                  | Abstraction level | Notes                                                |
| --------------------- | -------------------------------------------- | ----------------- | ---------------------------------------------------- |
| Search field          | [Text inputs](Controls/text_inputs.scope.md) | Alias             | —                                                    |
| Filter bar            | [Widgets](Widgets/scope.md)                  | Grouped leaf      | [Controlling element](scope.md#controlling-element). |
| Value help            | [Widgets](Widgets/scope.md)                  | Grouped leaf      | [Controlling element](scope.md#controlling-element). |
| Personalization panel | [Widgets](Widgets/scope.md)                  | Grouped leaf      | [Controlling element](scope.md#controlling-element). |

## Container elements

### Grouping surfaces

| Taxonomy entry  | Spec object                                                  | Abstraction level | Notes                         |
| --------------- | ------------------------------------------------------------ | ----------------- | ----------------------------- |
| Panel           | [Surface containers](Containers/surface_containers.scope.md) | Alias             | —                             |
| Container       | [Containers](Containers/scope.md)                            | Existing object   | —                             |
| Card            | [Surface containers](Containers/surface_containers.scope.md) | Alias             | —                             |
| Tile            | [Surface containers](Containers/surface_containers.scope.md) | Alias             | Alias of Card.                |
| Labelled group  | [Surface containers](Containers/surface_containers.scope.md) | Alias             | HTML `fieldset` and `legend`. |
| Checkable group | [Surface containers](Containers/surface_containers.scope.md) | Alias             | —                             |
| Accordion       | [Expandable panels](Containers/expandable_panels.scope.md)   | Existing object   | —                             |
| Disclosure      | [Expandable panels](Containers/expandable_panels.scope.md)   | Alias             | HTML `details`.               |
| Hero banner     | [Surface containers](Containers/surface_containers.scope.md) | Alias             | —                             |

### Workspace surfaces

| Taxonomy entry | Spec object                                                  | Abstraction level | Notes                                    |
| -------------- | ------------------------------------------------------------ | ----------------- | ---------------------------------------- |
| Window         | [Surface containers](Containers/surface_containers.scope.md) | Grouped leaf      | Glossary term [Window](scope.md#window). |
| View           | [Views](Views/scope.md)                                      | Existing object   | Pages cover route-level screens.         |
| Toolbar        | [Tool bars](Application/tool_bars.scope.md)                  | Existing object   | —                                        |
| Shell bar      | [Application](Application/scope.md)                          | Grouped leaf      | —                                        |
| Object page    | [Pages](Pages/scope.md)                                      | Grouped leaf      | —                                        |
| Report         | [Report](Views/report.scope.md)                              | Existing object   | —                                        |
| Dashboard      | [Dashboard](Pages/dashboard.scope.md)                        | Existing object   | —                                        |
| Shell page     | [Shell page](Pages/shell_page.scope.md)                      | Existing object   | —                                        |
| Empty page     | [Empty page](Pages/empty_page.scope.md)                      | Existing object   | —                                        |
| Tool action    | [Tool action](Application/tool_action.scope.md)              | Existing object   | —                                        |
| Tool bar row   | [Tool bar row](Application/tool_bar_row.scope.md)            | Existing object   | —                                        |

### Overlays and sheets

| Taxonomy entry | Spec object                                                  | Abstraction level | Notes |
| -------------- | ------------------------------------------------------------ | ----------------- | ----- |
| Popover        | [Overlay containers](Containers/overlay_containers.scope.md) | Grouped leaf      | —     |
| Sidebar        | [Sheet containers](Containers/sheet_containers.scope.md)     | Grouped leaf      | —     |
| Sheet          | [Sheet containers](Containers/sheet_containers.scope.md)     | Alias             | —     |
| Side Sheet     | [Sheet containers](Containers/sheet_containers.scope.md)     | Alias             | —     |
| Bottom Sheet   | [Sheet containers](Containers/sheet_containers.scope.md)     | Alias             | —     |

### Forms

| Taxonomy entry | Spec object                 | Abstraction level | Notes |
| -------------- | --------------------------- | ----------------- | ----- |
| Form           | [Form](Views/form.scope.md) | Existing object   | —     |
| Form field     | [Form](Views/form.scope.md) | Alias             | —     |
| Form group     | [Form](Views/form.scope.md) | Alias             | —     |

### Focused tasks and guided sequences

| Taxonomy entry   | Spec object                         | Abstraction level | Notes |
| ---------------- | ----------------------------------- | ----------------- | ----- |
| Dialog           | [Dialog](Widgets/dialog.scope.md)   | Existing object   | —     |
| Progress dialog  | [Dialog](Widgets/dialog.scope.md)   | Alias             | —     |
| Workflow stepper | [Stepper](Widgets/stepper.scope.md) | Existing object   | —     |
| Wizard           | [Stepper](Widgets/stepper.scope.md) | Alias             | —     |

## Layout and structural elements

| Taxonomy entry         | Spec object                                                        | Abstraction level | Notes                                                      |
| ---------------------- | ------------------------------------------------------------------ | ----------------- | ---------------------------------------------------------- |
| Grid                   | [Grid](Containers/grid.scope.md)                                   | Existing object   | Data grid maps to [Data grid](Widgets/data_grid.scope.md). |
| Pane                   | [Structural containers](Containers/structural_containers.scope.md) | Grouped leaf      | —                                                          |
| Rail                   | [Structural containers](Containers/structural_containers.scope.md) | Alias             | Navigation rail maps to Navigation widgets.                |
| Stack                  | [Structural containers](Containers/structural_containers.scope.md) | Alias             | —                                                          |
| Scaffold               | [Structural containers](Containers/structural_containers.scope.md) | Alias             | —                                                          |
| Region                 | [Structural containers](Containers/structural_containers.scope.md) | Alias             | —                                                          |
| Splitter               | [Splitters](Containers/splitters.scope.md)                         | Grouped leaf      | —                                                          |
| Bar                    | [Structural containers](Containers/structural_containers.scope.md) | Grouped leaf      | —                                                          |
| Page stack             | [Tabs](Containers/tabs.scope.md)                                   | Alias             | Tabs whose tab bar is optional.                            |
| Scroll container       | [Structural containers](Containers/structural_containers.scope.md) | Alias             | —                                                          |
| Splitter handle        | [Splitters](Containers/splitters.scope.md)                         | Alias             | —                                                          |
| Flexible column layout | [Containers](Containers/scope.md)                                  | Grouped leaf      | —                                                          |

## Layout mechanisms and definitions

### Layout rules and relationships

| Taxonomy entry      | Spec object               | Abstraction level  | Notes |
| ------------------- | ------------------------- | ------------------ | ----- |
| Containment         | [Layout](Layout/scope.md) | Folder abstraction | —     |
| Flow                | [Layout](Layout/scope.md) | Folder abstraction | —     |
| Alignment           | [Layout](Layout/scope.md) | Folder abstraction | —     |
| Anchoring           | [Layout](Layout/scope.md) | Folder abstraction | —     |
| Sizing              | [Layout](Layout/scope.md) | Folder abstraction | —     |
| Spacing             | [Layout](Layout/scope.md) | Folder abstraction | —     |
| Wrapping            | [Layout](Layout/scope.md) | Folder abstraction | —     |
| Responsive Reflow   | [Layout](Layout/scope.md) | Folder abstraction | —     |
| Breakpoint          | [Layout](Layout/scope.md) | Folder abstraction | —     |
| Layered arrangement | [Layout](Layout/scope.md) | Folder abstraction | —     |

## Presentation and style definitions

### Visual appearance and presentation rules

| Taxonomy entry | Spec object                           | Abstraction level  | Notes                                     |
| -------------- | ------------------------------------- | ------------------ | ----------------------------------------- |
| Color          | [Presentation](Presentation/scope.md) | Folder abstraction | —                                         |
| Typography     | [Presentation](Presentation/scope.md) | Folder abstraction | —                                         |
| Shape          | [Presentation](Presentation/scope.md) | Folder abstraction | —                                         |
| Border         | [Presentation](Presentation/scope.md) | Folder abstraction | —                                         |
| Shadow         | [Presentation](Presentation/scope.md) | Folder abstraction | —                                         |
| Elevation      | [Presentation](Presentation/scope.md) | Folder abstraction | —                                         |
| Opacity        | [Presentation](Presentation/scope.md) | Folder abstraction | —                                         |
| Iconography    | [Presentation](Presentation/scope.md) | Folder abstraction | Concrete icons map to Display primitives. |
| Spacing tokens | [Presentation](Presentation/scope.md) | Folder abstraction | —                                         |
| Visual states  | [Presentation](Presentation/scope.md) | Folder abstraction | Concrete events map to Interaction.       |
| Theme          | [Presentation](Presentation/scope.md) | Folder abstraction | —                                         |
| Motion         | [Presentation](Presentation/scope.md) | Folder abstraction | —                                         |
| Visibility     | [Presentation](Presentation/scope.md) | Folder abstraction | —                                         |
| Backdrop       | [Presentation](Presentation/scope.md) | Folder abstraction | —                                         |
| Blur           | [Presentation](Presentation/scope.md) | Folder abstraction | —                                         |
| Color tint     | [Presentation](Presentation/scope.md) | Folder abstraction | —                                         |
| Focus outline  | [Presentation](Presentation/scope.md) | Folder abstraction | Focus itself is an Interaction state.     |

## Internationalization and localization definitions

### Language, locale, and writing-system rules

| Taxonomy entry                           | Spec object                                           | Abstraction level  | Notes |
| ---------------------------------------- | ----------------------------------------------------- | ------------------ | ----- |
| Language support                         | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |
| Internationalization (i18n)              | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |
| Localization (l10n)                      | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |
| Locale                                   | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |
| Translation                              | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |
| Pluralization and grammatical variation  | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |
| Text direction and writing mode          | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |
| RTL layout adaptation                    | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |
| Bidirectional text                       | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |
| Directional mirroring                    | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |
| Date, time, and calendar formatting      | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |
| Number, percentage, and digit formatting | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |
| Currency and measurement formatting      | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |
| Locale-aware sorting and search          | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |
| Font, glyph, and text-metrics support    | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |
| Localized input and validation           | [Internationalization](Internationalization/scope.md) | Folder abstraction | —     |

## Interaction definitions

### Interaction states

| Taxonomy entry | Spec object                         | Abstraction level  | Notes |
| -------------- | ----------------------------------- | ------------------ | ----- |
| Hover state    | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Focus state    | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Active state   | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Pressed state  | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Selected state | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Disabled state | [Interaction](Interaction/scope.md) | Folder abstraction | —     |

### Interaction areas and constraints

| Taxonomy entry      | Spec object                         | Abstraction level  | Notes |
| ------------------- | ----------------------------------- | ------------------ | ----- |
| Touch target        | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Pointer hit area    | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Minimum target size | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Target spacing      | [Interaction](Interaction/scope.md) | Folder abstraction | —     |

### Gestures

| Taxonomy entry  | Spec object                         | Abstraction level  | Notes                               |
| --------------- | ----------------------------------- | ------------------ | ----------------------------------- |
| Tap             | [Interaction](Interaction/scope.md) | Folder abstraction | —                                   |
| Double-tap      | [Interaction](Interaction/scope.md) | Folder abstraction | —                                   |
| Long-press      | [Interaction](Interaction/scope.md) | Folder abstraction | —                                   |
| Swipe           | [Interaction](Interaction/scope.md) | Folder abstraction | —                                   |
| Pinch           | [Interaction](Interaction/scope.md) | Folder abstraction | —                                   |
| Rotate          | [Interaction](Interaction/scope.md) | Folder abstraction | —                                   |
| Pull to refresh | [Interaction](Interaction/scope.md) | Folder abstraction | The refresh request is its outcome. |

### Input events

| Taxonomy entry                 | Spec object                         | Abstraction level  | Notes |
| ------------------------------ | ----------------------------------- | ------------------ | ----- |
| Pointer / mouse button press   | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Pointer / mouse button release | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Click                          | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Pointer move                   | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Pointer enter / leave          | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Wheel / scroll event           | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Touch start / move / end       | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Key down                       | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Key up                         | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Modifier-key combination       | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Standard character-key input   | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Special-key input              | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Focus event                    | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Input event                    | [Interaction](Interaction/scope.md) | Folder abstraction | —     |
| Change event                   | [Interaction](Interaction/scope.md) | Folder abstraction | —     |

## Behaviors

| Taxonomy entry                   | Spec object                                                                 | Abstraction level | Notes                                                          |
| -------------------------------- | --------------------------------------------------------------------------- | ----------------- | -------------------------------------------------------------- |
| Drag and drop                    | [Drag and drop](Behaviors/drag_and_drop.scope.md)                           | Existing object   | —                                                              |
| Collapsible                      | [Collapsible](Behaviors/collapsible.scope.md)                               | Existing object   | —                                                              |
| Modal overlay                    | [Modal overlay](Behaviors/modal_overlay.scope.md)                           | Existing object   | Dialog semantics use Dialog.                                   |
| Modal interaction                | [Modal overlay](Behaviors/modal_overlay.scope.md)                           | Alias             | Alias of Modal overlay; Qt and Angular Material use this name. |
| Input assistance                 | [Input assistance](Behaviors/input_assistance.scope.md)                     | Existing object   | —                                                              |
| Text completion                  | [Input assistance](Behaviors/input_assistance.scope.md)                     | Alias             | —                                                              |
| Constraint validation            | [Input assistance](Behaviors/input_assistance.scope.md)                     | Alias             | Form-wide validation stays with Form.                          |
| Viewport and focus control       | [Viewport and focus control](Behaviors/viewport_and_focus_control.scope.md) | Existing object   | —                                                              |
| Viewport scrolling               | [Viewport and focus control](Behaviors/viewport_and_focus_control.scope.md) | Alias             | —                                                              |
| Scroll lock                      | [Viewport and focus control](Behaviors/viewport_and_focus_control.scope.md) | Alias             | —                                                              |
| Focus management                 | [Viewport and focus control](Behaviors/viewport_and_focus_control.scope.md) | Alias             | The modal case is Modal overlay.                               |
| Exclusive selection coordination | [Choice controls](Controls/choice_controls.scope.md)                        | Alias             | Keeps its Choice controls scope.                               |

## Primary categories of the leaf scopes

Each leaf scope has one primary section and at most one primary subcategory, taken from
the taxonomy entries above that link to it. The other places its entries fall in are its
secondary roles. The primary place is chosen by these rules, in order:

1. The place of the entry whose abstraction level is Existing object: that entry is the
   leaf's own object.
2. For a leaf of the Behaviors folder, the Behaviors section: reusable behaviors are
   entries of Behaviors, as the
   [generic UI taxonomy](../taxonomy/generic-ui-taxonomy.md#generic-ui-taxonomy) states.
3. Otherwise, the place that holds most of the leaf's entries. A tie goes to the place of
   its Grouped leaf entry.

favicon.ico, index.html and Native have no taxonomy entry, so they are not placed: they
are content or a marker for a standard platform capability, not UI elements
([taxonomy mapping change: Not added](../survey/taxonomy_mapping_change.done.md#not-added)).
Placing a leaf in a section does not move its scope file: the taxonomy and the scope tree
are linked views of one vocabulary.

| Leaf scope                                                                  | Primary section                | Primary subcategory                | Secondary roles                                                                                      |
| --------------------------------------------------------------------------- | ------------------------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [favicon.ico](Application/favicon.scope.md)                                 | Not placed                     | —                                  | —                                                                                                    |
| [index.html](Application/index_html.scope.md)                               | Not placed                     | —                                  | —                                                                                                    |
| [Navigation group](Application/nav_group.scope.md)                          | Navigational elements          | Application navigation             | —                                                                                                    |
| [Navigation item](Application/nav_item.scope.md)                            | Navigational elements          | Application navigation             | —                                                                                                    |
| [Navigation](Application/navigation.scope.md)                               | Navigational elements          | Application navigation             | —                                                                                                    |
| [Route](Application/route.scope.md)                                         | Navigational elements          | Application navigation             | —                                                                                                    |
| [Routing](Application/routing.scope.md)                                     | Navigational elements          | Application navigation             | —                                                                                                    |
| [Tool action](Application/tool_action.scope.md)                             | Container elements             | Workspace surfaces                 | —                                                                                                    |
| [Tool bar row](Application/tool_bar_row.scope.md)                           | Container elements             | Workspace surfaces                 | —                                                                                                    |
| [Tool bars](Application/tool_bars.scope.md)                                 | Container elements             | Workspace surfaces                 | —                                                                                                    |
| [Collapsible](Behaviors/collapsible.scope.md)                               | Behaviors                      | —                                  | —                                                                                                    |
| [Drag and drop](Behaviors/drag_and_drop.scope.md)                           | Behaviors                      | —                                  | Input elements: Manipulation handles                                                                 |
| [Input assistance](Behaviors/input_assistance.scope.md)                     | Behaviors                      | —                                  | —                                                                                                    |
| [Modal overlay](Behaviors/modal_overlay.scope.md)                           | Behaviors                      | —                                  | —                                                                                                    |
| [Resizable](Behaviors/resizable.scope.md)                                   | Behaviors                      | —                                  | Input elements: Manipulation handles                                                                 |
| [Viewport and focus control](Behaviors/viewport_and_focus_control.scope.md) | Behaviors                      | —                                  | —                                                                                                    |
| [Expandable panels](Containers/expandable_panels.scope.md)                  | Container elements             | Grouping surfaces                  | —                                                                                                    |
| [Grid](Containers/grid.scope.md)                                            | Layout and structural elements | —                                  | —                                                                                                    |
| [Overlay containers](Containers/overlay_containers.scope.md)                | Container elements             | Overlays and sheets                | —                                                                                                    |
| [Sheet containers](Containers/sheet_containers.scope.md)                    | Container elements             | Overlays and sheets                | —                                                                                                    |
| [Splitters](Containers/splitters.scope.md)                                  | Layout and structural elements | —                                  | —                                                                                                    |
| [Structural containers](Containers/structural_containers.scope.md)          | Layout and structural elements | —                                  | —                                                                                                    |
| [Surface containers](Containers/surface_containers.scope.md)                | Container elements             | Grouping surfaces                  | Container elements: Workspace surfaces                                                               |
| [Tabs](Containers/tabs.scope.md)                                            | Navigational elements          | Content selection and position     | Layout and structural elements                                                                       |
| [Action controls](Controls/action_controls.scope.md)                        | Input elements                 | Command activation                 | —                                                                                                    |
| [Choice controls](Controls/choice_controls.scope.md)                        | Input elements                 | Value and resource selection       | Behaviors                                                                                            |
| [Display primitives](Controls/display_primitives.scope.md)                  | Output elements                | Document and numeric display       | Output elements: Graphics presentation                                                               |
| [Drawing and capture controls](Controls/drawing_and_capture.scope.md)       | Input elements                 | Drawing and capture                | —                                                                                                    |
| [Link and scroll controls](Controls/link_and_scroll_controls.scope.md)      | Navigational elements          | Application navigation             | Navigational elements: Content selection and position                                                |
| [Native](Controls/native.scope.md)                                          | Not placed                     | —                                  | —                                                                                                    |
| [Picker control](Controls/picker_control.scope.md)                          | Input elements                 | Value and resource selection       | —                                                                                                    |
| [Range control](Controls/range_control.scope.md)                            | Input elements                 | Value and resource selection       | —                                                                                                    |
| [Status indicator](Controls/status_indicator.scope.md)                      | Output elements                | Feedback and assistance            | —                                                                                                    |
| [Text inputs](Controls/text_inputs.scope.md)                                | Input elements                 | Text and shortcut entry            | Navigational elements: Search, filtering and sorting                                                 |
| [Dashboard](Pages/dashboard.scope.md)                                       | Container elements             | Workspace surfaces                 | —                                                                                                    |
| [Empty page](Pages/empty_page.scope.md)                                     | Container elements             | Workspace surfaces                 | —                                                                                                    |
| [Shell page](Pages/shell_page.scope.md)                                     | Container elements             | Workspace surfaces                 | —                                                                                                    |
| [Form](Views/form.scope.md)                                                 | Container elements             | Forms                              | —                                                                                                    |
| [Report](Views/report.scope.md)                                             | Container elements             | Workspace surfaces                 | —                                                                                                    |
| [Chart](Widgets/chart.scope.md)                                             | Output elements                | Collections and data presentation  | —                                                                                                    |
| [Data grid](Widgets/data_grid.scope.md)                                     | Output elements                | Collections and data presentation  | —                                                                                                    |
| [Date/Time pickers](Widgets/date_time_pickers.scope.md)                     | Input elements                 | Temporal entry                     | —                                                                                                    |
| [Dialog](Widgets/dialog.scope.md)                                           | Container elements             | Focused tasks and guided sequences | —                                                                                                    |
| [Feedback widgets](Widgets/feedback_widgets.scope.md)                       | Output elements                | Feedback and assistance            | —                                                                                                    |
| [List](Widgets/list.scope.md)                                               | Output elements                | Collections and data presentation  | Input elements: Value and resource selection                                                         |
| [Media widgets](Widgets/media_widgets.scope.md)                             | Output elements                | Media playback                     | Output elements: Graphics presentation; Output elements: Collections and data presentation           |
| [Menu widgets](Widgets/menu_widgets.scope.md)                               | Navigational elements          | Command menus                      | —                                                                                                    |
| [Navigation widgets](Widgets/navigation_widgets.scope.md)                   | Navigational elements          | Hierarchy browsing                 | Navigational elements: Content selection and position; Navigational elements: Application navigation |
| [Stepper](Widgets/stepper.scope.md)                                         | Container elements             | Focused tasks and guided sequences | —                                                                                                    |
| [Table](Widgets/table.scope.md)                                             | Output elements                | Collections and data presentation  | —                                                                                                    |
