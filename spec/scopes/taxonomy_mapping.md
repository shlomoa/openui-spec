# Taxonomy mapping

This document maps the abstract vocabulary in `docs/generic-ui-taxonomy.md` to the
canonical scope objects under `spec/scopes/`. It keeps taxonomy aliases explicit while
leaving detailed definitions in the [glossary](../README.md#glossary) and concrete
contracts in each linked scope file.

Abstraction levels:

- **Existing object** — the taxonomy entry already has a concrete scope object.
- **Alias** — the taxonomy entry is a synonym, variant, or narrower term for a linked
  scope object.
- **Grouped leaf** — the taxonomy entry belongs to a new family-level leaf scope.
- **Folder abstraction** — the taxonomy entry is a cross-cutting notion represented by
  a folder-level scope instead of a concrete UI object leaf.

## Input elements

| Taxonomy entry           | Spec object                                                           | Abstraction level | Notes                                                       |
| ------------------------ | --------------------------------------------------------------------- | ----------------- | ----------------------------------------------------------- |
| Button                   | [Action controls](Controls/action_controls.scope.md)                  | Grouped leaf      | Command control alias; detailed term stays in the glossary. |
| Icon button              | [Action controls](Controls/action_controls.scope.md)                  | Alias             | Icon-only command control variant.                          |
| Text field               | [Text inputs](Controls/text_inputs.scope.md)                          | Grouped leaf      | Single-line text-entry variant.                             |
| Text area                | [Text inputs](Controls/text_inputs.scope.md)                          | Alias             | Multi-line text-entry variant.                              |
| Password field           | [Text inputs](Controls/text_inputs.scope.md)                          | Alias             | Text entry with protected presentation.                     |
| Checkbox                 | [Choice controls](Controls/choice_controls.scope.md)                  | Grouped leaf      | Binary or tri-state selection control.                      |
| Radio button             | [Choice controls](Controls/choice_controls.scope.md)                  | Alias             | Single-choice option in a group.                            |
| Switch / Toggle          | [Choice controls](Controls/choice_controls.scope.md)                  | Alias             | On/off selection variant.                                   |
| Dropdown                 | [Choice controls](Controls/choice_controls.scope.md)                  | Alias             | Select-style choice control; menus map to menu widgets.     |
| List box                 | [Choice controls](Controls/choice_controls.scope.md)                  | Alias             | Selectable option-list control.                             |
| Combo box                | [Choice controls](Controls/choice_controls.scope.md)                  | Alias             | Editable or select-only popup choice control.               |
| Date picker              | [Date/Time pickers](Widgets/date_time_pickers.scope.md)               | Existing object   | Calendar-oriented picker widget.                            |
| Time picker              | [Date/Time pickers](Widgets/date_time_pickers.scope.md)               | Alias             | Time-selection variant of date/time picker.                 |
| Wheel picker             | [Picker controls](Controls/picker_controls.scope.md)                  | Grouped leaf      | Picker interaction variant.                                 |
| Color picker             | [Picker controls](Controls/picker_controls.scope.md)                  | Alias             | Specialized value picker.                                   |
| File picker              | [Picker controls](Controls/picker_controls.scope.md)                  | Alias             | File-source picker.                                         |
| Slider                   | [Range controls](Controls/range_controls.scope.md)                    | Grouped leaf      | Continuous or discrete range control.                       |
| Spin box / Stepper input | [Range controls](Controls/range_controls.scope.md)                    | Alias             | Discrete value increment/decrement control.                 |
| Rating control           | [Range controls](Controls/range_controls.scope.md)                    | Alias             | Bounded rating value control.                               |
| Drag handle              | [Drag and drop](Behaviors/drag_and_drop.scope.md)                     | Existing object   | Handle is an affordance for the drag-and-drop behavior.     |
| Resize handle            | [Resizable](Behaviors/resizable.scope.md)                             | Existing object   | Handle is an affordance for the resizable behavior.         |
| Canvas / Drawing area    | [Drawing and capture controls](Controls/drawing_and_capture.scope.md) | Grouped leaf      | Direct drawing input surface.                               |
| Microphone input         | [Drawing and capture controls](Controls/drawing_and_capture.scope.md) | Alias             | Audio-capture input.                                        |
| Biometric prompt         | [Drawing and capture controls](Controls/drawing_and_capture.scope.md) | Alias             | Identity-verification input prompt.                         |

## Output elements

| Taxonomy entry                | Spec object                                                                | Abstraction level | Notes                                                                  |
| ----------------------------- | -------------------------------------------------------------------------- | ----------------- | ---------------------------------------------------------------------- |
| Status bar                    | [Status indicators](Controls/status_indicators.scope.md)                   | Grouped leaf      | Passive state feedback.                                                |
| Label                         | [Display primitives](Controls/display_primitives.scope.md)                 | Grouped leaf      | Textual caption or labelling primitive.                                |
| Text                          | [Display primitives](Controls/display_primitives.scope.md)                 | Alias             | Rendered text primitive.                                               |
| Image                         | [Display primitives](Controls/display_primitives.scope.md)                 | Alias             | Static visual content primitive.                                       |
| Icon                          | [Display primitives](Controls/display_primitives.scope.md)                 | Alias             | Symbolic visual primitive.                                             |
| Avatar                        | [Display primitives](Controls/display_primitives.scope.md)                 | Alias             | Identity image or initials primitive.                                  |
| Tag                           | [Status indicators](Controls/status_indicators.scope.md)                   | Alias             | Compact classification/status indicator.                               |
| Badge                         | [Status indicators](Controls/status_indicators.scope.md)                   | Alias             | Compact count or state indicator.                                      |
| Tooltip                       | [Feedback widgets](Widgets/feedback_widgets.scope.md)                      | Grouped leaf      | Contextual helper message.                                             |
| Alert                         | [Feedback widgets](Widgets/feedback_widgets.scope.md)                      | Alias             | Urgent message feedback.                                               |
| Toast / Snackbar              | [Feedback widgets](Widgets/feedback_widgets.scope.md)                      | Alias             | Transient message feedback.                                            |
| Progress bar                  | [Status indicators](Controls/status_indicators.scope.md)                   | Alias             | Passive progress state.                                                |
| Loader / Spinner              | [Status indicators](Controls/status_indicators.scope.md)                   | Alias             | Indeterminate loading feedback.                                        |
| Separator / Divider           | [Display primitives](Controls/display_primitives.scope.md)                 | Alias             | Visual or semantic divider.                                            |
| Table / Data grid             | [Tables](Widgets/tables.scope.md); [Data grid](Widgets/data_grid.scope.md) | Existing object   | Static tables map to table scopes; interactive grids map to data grid. |
| List                          | [Lists](Widgets/lists.scope.md)                                            | Existing object   | Reusable list widget.                                                  |
| Media player                  | [Media widgets](Widgets/media_widgets.scope.md)                            | Grouped leaf      | Playback widget.                                                       |
| Camera preview                | [Media widgets](Widgets/media_widgets.scope.md)                            | Alias             | Preview surface for camera input.                                      |
| Notification                  | [Feedback widgets](Widgets/feedback_widgets.scope.md)                      | Alias             | System or application feedback message.                                |
| Narration / Audio Description | [Feedback widgets](Widgets/feedback_widgets.scope.md)                      | Alias             | Non-visual feedback or descriptive output.                             |

## Navigational elements

| Taxonomy entry     | Spec object                                                            | Abstraction level | Notes                                        |
| ------------------ | ---------------------------------------------------------------------- | ----------------- | -------------------------------------------- |
| Navigation bar     | [Application navigation](Application/navigation.scope.md)              | Existing object   | Application-level navigation structure.      |
| Navigation Drawer  | [Navigation widgets](Widgets/navigation_widgets.scope.md)              | Grouped leaf      | Reusable navigation component variant.       |
| Navigation Rail    | [Navigation widgets](Widgets/navigation_widgets.scope.md)              | Alias             | Rail-style navigation variant.               |
| Hamburger Menu     | [Navigation widgets](Widgets/navigation_widgets.scope.md)              | Alias             | Menu-trigger navigation affordance.          |
| Tab                | [Tabs](Containers/tabs.scope.md)                                       | Existing object   | Tab child in a tabbed container.             |
| Tab Bar            | [Tabs](Containers/tabs.scope.md)                                       | Alias             | Tab-list/tab-bar presentation variant.       |
| Menu               | [Menu widgets](Widgets/menu_widgets.scope.md)                          | Grouped leaf      | Command or choice menu.                      |
| Dropdown Menu      | [Menu widgets](Widgets/menu_widgets.scope.md)                          | Alias             | Triggered menu variant.                      |
| Context menu       | [Menu widgets](Widgets/menu_widgets.scope.md)                          | Alias             | Contextual command menu variant.             |
| Breadcrumb         | [Navigation widgets](Widgets/navigation_widgets.scope.md)              | Alias             | Hierarchical location navigation.            |
| Link               | [Link and scroll controls](Controls/link_and_scroll_controls.scope.md) | Grouped leaf      | Primitive resource reference.                |
| Search field       | [Text inputs](Controls/text_inputs.scope.md)                           | Alias             | Text-entry control specialized for search.   |
| Scrollbar          | [Link and scroll controls](Controls/link_and_scroll_controls.scope.md) | Alias             | Viewport-position control.                   |
| Tree view          | [Navigation widgets](Widgets/navigation_widgets.scope.md)              | Alias             | Hierarchical navigation or selection widget. |
| Pagination control | [Navigation widgets](Widgets/navigation_widgets.scope.md)              | Alias             | Page-set navigation widget.                  |
| Carousel           | [Navigation widgets](Widgets/navigation_widgets.scope.md)              | Alias             | Sequential slide/navigation widget.          |
| Map                | [Media widgets](Widgets/media_widgets.scope.md)                        | Alias             | Spatial content widget.                      |

## Container elements

| Taxonomy entry | Spec object                                                  | Abstraction level | Notes                                                                 |
| -------------- | ------------------------------------------------------------ | ----------------- | --------------------------------------------------------------------- |
| Window         | [Surface containers](Containers/surface_containers.scope.md) | Grouped leaf      | Top-level or sub-window surface.                                      |
| Screen / View  | [Views](Views/scope.md)                                      | Existing object   | User-facing workflow representation; Pages cover route-level screens. |
| Panel          | [Surface containers](Containers/surface_containers.scope.md) | Alias             | Generic content surface.                                              |
| Container      | [Containers](Containers/scope.md)                            | Existing object   | Generic arrangement scope.                                            |
| Card           | [Surface containers](Containers/surface_containers.scope.md) | Alias             | Self-contained content surface.                                       |
| Form           | [Forms](Views/forms.scope.md)                                | Existing object   | Read-write data view.                                                 |
| Toolbar        | [Tool bars](Application/tool_bars.scope.md)                  | Existing object   | Application-level command surface.                                    |
| Sidebar        | [Sheet containers](Containers/sheet_containers.scope.md)     | Grouped leaf      | Side-attached supplemental surface.                                   |
| Sheet          | [Sheet containers](Containers/sheet_containers.scope.md)     | Alias             | Layered sheet surface.                                                |
| Side Sheet     | [Sheet containers](Containers/sheet_containers.scope.md)     | Alias             | Side-attached sheet variant.                                          |
| Bottom Sheet   | [Sheet containers](Containers/sheet_containers.scope.md)     | Alias             | Bottom-attached sheet variant.                                        |
| Accordion      | [Expandable panels](Containers/expandable_panels.scope.md)   | Existing object   | Expand/collapse panel set alias.                                      |
| Popover        | [Overlay containers](Containers/overlay_containers.scope.md) | Grouped leaf      | Anchored overlay surface.                                             |
| Dialog         | [Dialog](Widgets/dialog.scope.md)                            | Existing object   | Modal or non-modal dialog widget.                                     |
| Modal overlay  | [Overlay containers](Containers/overlay_containers.scope.md) | Alias             | Modal overlay surface; dialog semantics use Dialog.                   |

## Layout and structural elements

| Taxonomy entry | Spec object                                                        | Abstraction level | Notes                                                                     |
| -------------- | ------------------------------------------------------------------ | ----------------- | ------------------------------------------------------------------------- |
| Grid           | [Grid](Containers/grid.scope.md)                                   | Existing object   | Layout grid container; data grid maps to Data grid.                       |
| Pane           | [Structural containers](Containers/structural_containers.scope.md) | Grouped leaf      | Structural region inside a surface.                                       |
| Rail           | [Structural containers](Containers/structural_containers.scope.md) | Alias             | Persistent structural region; navigation rail maps to Navigation widgets. |
| Stack          | [Structural containers](Containers/structural_containers.scope.md) | Alias             | Linear arrangement container.                                             |
| Scaffold       | [Structural containers](Containers/structural_containers.scope.md) | Alias             | Page/application structural frame.                                        |
| Region         | [Structural containers](Containers/structural_containers.scope.md) | Alias             | Named or meaningful content region.                                       |
| Splitter       | [Splitters](Containers/splitters.scope.md)                         | Grouped leaf      | Movable divider between panes.                                            |

## Layout mechanisms and definitions

| Taxonomy entry    | Spec object               | Abstraction level  | Notes                              |
| ----------------- | ------------------------- | ------------------ | ---------------------------------- |
| Containment       | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Flow              | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Alignment         | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Anchoring         | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Sizing            | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Spacing           | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Wrapping          | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Responsive Reflow | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Breakpoint        | [Layout](Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |

## Presentation and style definitions

| Taxonomy entry      | Spec object                           | Abstraction level  | Notes                                                                    |
| ------------------- | ------------------------------------- | ------------------ | ------------------------------------------------------------------------ |
| Color               | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Typography          | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Shape               | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Border              | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Shadow / Elevation  | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Opacity             | [Presentation](Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Icons / Iconography | [Presentation](Presentation/scope.md) | Folder abstraction | Icon-system vocabulary; concrete icon output maps to Display primitives. |
| Spacing tokens      | [Presentation](Presentation/scope.md) | Folder abstraction | Design-token vocabulary.                                                 |
| Visual states       | [Presentation](Presentation/scope.md) | Folder abstraction | State styling vocabulary; concrete events map to Interaction.            |
| Theme               | [Presentation](Presentation/scope.md) | Folder abstraction | Visual system vocabulary.                                                |
| Motion              | [Presentation](Presentation/scope.md) | Folder abstraction | Animation and transition vocabulary.                                     |
| Visibility          | [Presentation](Presentation/scope.md) | Folder abstraction | Visibility and display-state vocabulary.                                 |

## Internationalization and localization definitions

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

| Taxonomy entry               | Spec object                                       | Abstraction level  | Notes                                |
| ---------------------------- | ------------------------------------------------- | ------------------ | ------------------------------------ |
| Hover state                  | [Interaction](Interaction/scope.md)               | Folder abstraction | Interaction state vocabulary.        |
| Focus state                  | [Interaction](Interaction/scope.md)               | Folder abstraction | Interaction state vocabulary.        |
| Active / Pressed state       | [Interaction](Interaction/scope.md)               | Folder abstraction | Interaction state vocabulary.        |
| Selected state               | [Interaction](Interaction/scope.md)               | Folder abstraction | Interaction state vocabulary.        |
| Disabled state               | [Interaction](Interaction/scope.md)               | Folder abstraction | Interaction state vocabulary.        |
| Touch target                 | [Interaction](Interaction/scope.md)               | Folder abstraction | Target-size vocabulary.              |
| Pointer hit area             | [Interaction](Interaction/scope.md)               | Folder abstraction | Target-size vocabulary.              |
| Minimum target size          | [Interaction](Interaction/scope.md)               | Folder abstraction | Target-size vocabulary.              |
| Target spacing               | [Interaction](Interaction/scope.md)               | Folder abstraction | Target-size vocabulary.              |
| Tap                          | [Interaction](Interaction/scope.md)               | Folder abstraction | Gesture vocabulary.                  |
| Double-tap                   | [Interaction](Interaction/scope.md)               | Folder abstraction | Gesture vocabulary.                  |
| Long-press                   | [Interaction](Interaction/scope.md)               | Folder abstraction | Gesture vocabulary.                  |
| Swipe                        | [Interaction](Interaction/scope.md)               | Folder abstraction | Gesture vocabulary.                  |
| Pinch                        | [Interaction](Interaction/scope.md)               | Folder abstraction | Gesture vocabulary.                  |
| Rotate                       | [Interaction](Interaction/scope.md)               | Folder abstraction | Gesture vocabulary.                  |
| Drag and drop                | [Drag and drop](Behaviors/drag_and_drop.scope.md) | Existing object    | Reusable behavior object.            |
| Pointer/mouse button press   | [Interaction](Interaction/scope.md)               | Folder abstraction | Pointer event vocabulary.            |
| Pointer/mouse button release | [Interaction](Interaction/scope.md)               | Folder abstraction | Pointer event vocabulary.            |
| Click                        | [Interaction](Interaction/scope.md)               | Folder abstraction | Activation event vocabulary.         |
| Pointer move                 | [Interaction](Interaction/scope.md)               | Folder abstraction | Pointer event vocabulary.            |
| Pointer enter/leave          | [Interaction](Interaction/scope.md)               | Folder abstraction | Pointer event vocabulary.            |
| Wheel/scroll event           | [Interaction](Interaction/scope.md)               | Folder abstraction | Pointer and scroll event vocabulary. |
| Touch start/move/end         | [Interaction](Interaction/scope.md)               | Folder abstraction | Touch event vocabulary.              |
| Key down                     | [Interaction](Interaction/scope.md)               | Folder abstraction | Keyboard event vocabulary.           |
| Key up                       | [Interaction](Interaction/scope.md)               | Folder abstraction | Keyboard event vocabulary.           |
| Modifier-key combination     | [Interaction](Interaction/scope.md)               | Folder abstraction | Keyboard shortcut vocabulary.        |
| Standard character-key input | [Interaction](Interaction/scope.md)               | Folder abstraction | Keyboard text-entry vocabulary.      |
| Special-key input            | [Interaction](Interaction/scope.md)               | Folder abstraction | Keyboard command vocabulary.         |
| Focus event                  | [Interaction](Interaction/scope.md)               | Folder abstraction | Focus event vocabulary.              |
| Input event                  | [Interaction](Interaction/scope.md)               | Folder abstraction | Input event vocabulary.              |
| Change event                 | [Interaction](Interaction/scope.md)               | Folder abstraction | Change event vocabulary.             |
