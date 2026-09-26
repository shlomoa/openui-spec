# Taxonomy mapping — consolidated review draft

Review copy: existing rows and abstraction levels are preserved, with links relocated. The proposed rows at the end are conditional on the [merge review](TAXONOMY_MERGE_REVIEW.md). References to new leaves point to review drafts, not nonexistent canonical files.

This document maps the abstract vocabulary in `docs/generic-ui-taxonomy.md` to the
canonical scope objects under `spec/scopes/`. It keeps taxonomy aliases explicit while
leaving detailed definitions in the [glossary](../../../README.md#glossary) and concrete
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
| Button                   | [Action controls](../../../scopes/Controls/action_controls.scope.md)                  | Grouped leaf      | Command control alias; detailed term stays in the glossary. |
| Icon button              | [Action controls](../../../scopes/Controls/action_controls.scope.md)                  | Alias             | Icon-only command control variant.                          |
| Text field               | [Text inputs](../../../scopes/Controls/text_inputs.scope.md)                          | Grouped leaf      | Single-line text-entry variant.                             |
| Text area                | [Text inputs](../../../scopes/Controls/text_inputs.scope.md)                          | Alias             | Multi-line text-entry variant.                              |
| Password field           | [Text inputs](../../../scopes/Controls/text_inputs.scope.md)                          | Alias             | Text entry with protected presentation.                     |
| Checkbox                 | [Choice controls](../../../scopes/Controls/choice_controls.scope.md)                  | Grouped leaf      | Binary or tri-state selection control.                      |
| Radio button             | [Choice controls](../../../scopes/Controls/choice_controls.scope.md)                  | Alias             | Single-choice option in a group.                            |
| Switch / Toggle          | [Choice controls](../../../scopes/Controls/choice_controls.scope.md)                  | Alias             | On/off selection variant.                                   |
| Dropdown                 | [Choice controls](../../../scopes/Controls/choice_controls.scope.md)                  | Alias             | Select-style choice control; menus map to menu widgets.     |
| List box                 | [Choice controls](../../../scopes/Controls/choice_controls.scope.md)                  | Alias             | Selectable option-list control.                             |
| Combo box                | [Choice controls](../../../scopes/Controls/choice_controls.scope.md)                  | Alias             | Editable or select-only popup choice control.               |
| Date picker              | [Date/Time pickers](../../../scopes/Widgets/date_time_pickers.scope.md)               | Existing object   | Calendar-oriented picker widget.                            |
| Time picker              | [Date/Time pickers](../../../scopes/Widgets/date_time_pickers.scope.md)               | Alias             | Time-selection variant of date/time picker.                 |
| Wheel picker             | [Picker control](../../../scopes/Controls/picker_control.scope.md)                    | Grouped leaf      | Picker interaction variant.                                 |
| Color picker             | [Picker control](../../../scopes/Controls/picker_control.scope.md)                    | Alias             | Specialized value picker.                                   |
| File picker              | [Picker control](../../../scopes/Controls/picker_control.scope.md)                    | Alias             | File-source picker.                                         |
| Slider                   | [Range control](../../../scopes/Controls/range_control.scope.md)                      | Grouped leaf      | Continuous or discrete range control.                       |
| Spin box / Stepper input | [Range control](../../../scopes/Controls/range_control.scope.md)                      | Alias             | Discrete value increment/decrement control.                 |
| Rating control           | [Range control](../../../scopes/Controls/range_control.scope.md)                      | Alias             | Bounded rating value control.                               |
| Drag handle              | [Drag and drop](../../../scopes/Behaviors/drag_and_drop.scope.md)                     | Existing object   | Handle is an affordance for the drag-and-drop behavior.     |
| Resize handle            | [Resizable](../../../scopes/Behaviors/resizable.scope.md)                             | Existing object   | Handle is an affordance for the resizable behavior.         |
| Canvas / Drawing area    | [Drawing and capture controls](../../../scopes/Controls/drawing_and_capture.scope.md) | Grouped leaf      | Direct drawing input surface.                               |
| Microphone input         | [Drawing and capture controls](../../../scopes/Controls/drawing_and_capture.scope.md) | Alias             | Audio-capture input.                                        |
| Biometric prompt         | [Drawing and capture controls](../../../scopes/Controls/drawing_and_capture.scope.md) | Alias             | Identity-verification input prompt.                         |

## Output elements

| Taxonomy entry                | Spec object                                                              | Abstraction level | Notes                                                                 |
| ----------------------------- | ------------------------------------------------------------------------ | ----------------- | --------------------------------------------------------------------- |
| Status bar                    | [Status indicator](../../../scopes/Controls/status_indicator.scope.md)                   | Grouped leaf      | Passive state feedback.                                               |
| Label                         | [Display primitives](../../../scopes/Controls/display_primitives.scope.md)               | Grouped leaf      | Textual caption or labelling primitive.                               |
| Text                          | [Display primitives](../../../scopes/Controls/display_primitives.scope.md)               | Alias             | Rendered text primitive.                                              |
| Image                         | [Display primitives](../../../scopes/Controls/display_primitives.scope.md)               | Alias             | Static visual content primitive.                                      |
| Icon                          | [Display primitives](../../../scopes/Controls/display_primitives.scope.md)               | Alias             | Symbolic visual primitive.                                            |
| Avatar                        | [Display primitives](../../../scopes/Controls/display_primitives.scope.md)               | Alias             | Identity image or initials primitive.                                 |
| Tag                           | [Status indicator](../../../scopes/Controls/status_indicator.scope.md)                   | Alias             | Compact classification/status indicator.                              |
| Badge                         | [Status indicator](../../../scopes/Controls/status_indicator.scope.md)                   | Alias             | Compact count or state indicator.                                     |
| Tooltip                       | [Feedback widgets](../../../scopes/Widgets/feedback_widgets.scope.md)                    | Grouped leaf      | Contextual helper message.                                            |
| Alert                         | [Feedback widgets](../../../scopes/Widgets/feedback_widgets.scope.md)                    | Alias             | Urgent message feedback.                                              |
| Toast / Snackbar              | [Feedback widgets](../../../scopes/Widgets/feedback_widgets.scope.md)                    | Alias             | Transient message feedback.                                           |
| Progress bar                  | [Status indicator](../../../scopes/Controls/status_indicator.scope.md)                   | Alias             | Passive progress state.                                               |
| Loader / Spinner              | [Status indicator](../../../scopes/Controls/status_indicator.scope.md)                   | Alias             | Indeterminate loading feedback.                                       |
| Separator / Divider           | [Display primitives](../../../scopes/Controls/display_primitives.scope.md)               | Alias             | Visual or semantic divider.                                           |
| Table / Data grid             | [Table](../../../scopes/Widgets/table.scope.md); [Data grid](../../../scopes/Widgets/data_grid.scope.md) | Existing object   | Tabular data maps to table scope; interactive grids map to data grid. |
| List                          | [List](../../../scopes/Widgets/list.scope.md)                                            | Existing object   | Reusable list widget.                                                 |
| Media player                  | [Media widgets](../../../scopes/Widgets/media_widgets.scope.md)                          | Grouped leaf      | Playback widget.                                                      |
| Camera preview                | [Media widgets](../../../scopes/Widgets/media_widgets.scope.md)                          | Alias             | Preview surface for camera input.                                     |
| Notification                  | [Feedback widgets](../../../scopes/Widgets/feedback_widgets.scope.md)                    | Alias             | System or application feedback message.                               |
| Narration / Audio Description | [Feedback widgets](../../../scopes/Widgets/feedback_widgets.scope.md)                    | Alias             | Non-visual feedback or descriptive output.                            |

## Navigational elements

| Taxonomy entry     | Spec object                                                            | Abstraction level | Notes                                        |
| ------------------ | ---------------------------------------------------------------------- | ----------------- | -------------------------------------------- |
| Navigation bar     | [Application navigation](../../../scopes/Application/navigation.scope.md)              | Existing object   | Application-level navigation structure.      |
| Navigation Drawer  | [Navigation widgets](../../../scopes/Widgets/navigation_widgets.scope.md)              | Grouped leaf      | Reusable navigation component variant.       |
| Navigation Rail    | [Navigation widgets](../../../scopes/Widgets/navigation_widgets.scope.md)              | Alias             | Rail-style navigation variant.               |
| Hamburger Menu     | [Navigation widgets](../../../scopes/Widgets/navigation_widgets.scope.md)              | Alias             | Menu-trigger navigation affordance.          |
| Tab                | [Tabs](../../../scopes/Containers/tabs.scope.md)                                       | Existing object   | Tab child in a tabbed container.             |
| Tab Bar            | [Tabs](../../../scopes/Containers/tabs.scope.md)                                       | Alias             | Tab-list/tab-bar presentation variant.       |
| Menu               | [Menu widgets](../../../scopes/Widgets/menu_widgets.scope.md)                          | Grouped leaf      | Command or choice menu.                      |
| Dropdown Menu      | [Menu widgets](../../../scopes/Widgets/menu_widgets.scope.md)                          | Alias             | Triggered menu variant.                      |
| Context menu       | [Menu widgets](../../../scopes/Widgets/menu_widgets.scope.md)                          | Alias             | Contextual command menu variant.             |
| Breadcrumb         | [Navigation widgets](../../../scopes/Widgets/navigation_widgets.scope.md)              | Alias             | Hierarchical location navigation.            |
| Link               | [Link and scroll controls](../../../scopes/Controls/link_and_scroll_controls.scope.md) | Grouped leaf      | Primitive resource reference.                |
| Search field       | [Text inputs](../../../scopes/Controls/text_inputs.scope.md)                           | Alias             | Text-entry control specialized for search.   |
| Scrollbar          | [Link and scroll controls](../../../scopes/Controls/link_and_scroll_controls.scope.md) | Alias             | Viewport-position control.                   |
| Tree view          | [Navigation widgets](../../../scopes/Widgets/navigation_widgets.scope.md)              | Alias             | Hierarchical navigation or selection widget. |
| Pagination control | [Navigation widgets](../../../scopes/Widgets/navigation_widgets.scope.md)              | Alias             | Page-set navigation widget.                  |
| Carousel           | [Navigation widgets](../../../scopes/Widgets/navigation_widgets.scope.md)              | Alias             | Sequential slide/navigation widget.          |
| Map                | [Media widgets](../../../scopes/Widgets/media_widgets.scope.md)                        | Alias             | Spatial content widget.                      |

## Container elements

| Taxonomy entry | Spec object                                                  | Abstraction level | Notes                                                                 |
| -------------- | ------------------------------------------------------------ | ----------------- | --------------------------------------------------------------------- |
| Window         | [Surface containers](../../../scopes/Containers/surface_containers.scope.md) | Grouped leaf      | Top-level or sub-window surface.                                      |
| Screen / View  | [Views](../../../scopes/Views/scope.md)                                      | Existing object   | User-facing workflow representation; Pages cover route-level screens. |
| Panel          | [Surface containers](../../../scopes/Containers/surface_containers.scope.md) | Alias             | Generic content surface.                                              |
| Container      | [Containers](../../../scopes/Containers/scope.md)                            | Existing object   | Generic arrangement scope.                                            |
| Card           | [Surface containers](../../../scopes/Containers/surface_containers.scope.md) | Alias             | Self-contained content surface.                                       |
| Form           | [Form](../../../scopes/Views/form.scope.md)                                  | Existing object   | Read-write data view.                                                 |
| Toolbar        | [Tool bars](../../../scopes/Application/tool_bars.scope.md)                  | Existing object   | Application-level command surface.                                    |
| Sidebar        | [Sheet containers](../../../scopes/Containers/sheet_containers.scope.md)     | Grouped leaf      | Side-attached supplemental surface.                                   |
| Sheet          | [Sheet containers](../../../scopes/Containers/sheet_containers.scope.md)     | Alias             | Layered sheet surface.                                                |
| Side Sheet     | [Sheet containers](../../../scopes/Containers/sheet_containers.scope.md)     | Alias             | Side-attached sheet variant.                                          |
| Bottom Sheet   | [Sheet containers](../../../scopes/Containers/sheet_containers.scope.md)     | Alias             | Bottom-attached sheet variant.                                        |
| Accordion      | [Expandable panels](../../../scopes/Containers/expandable_panels.scope.md)   | Existing object   | Expand/collapse panel set alias.                                      |
| Popover        | [Overlay containers](../../../scopes/Containers/overlay_containers.scope.md) | Grouped leaf      | Anchored overlay surface.                                             |
| Dialog         | [Dialog](../../../scopes/Widgets/dialog.scope.md)                            | Existing object   | Modal or non-modal dialog widget.                                     |
| Modal overlay  | [Overlay containers](../../../scopes/Containers/overlay_containers.scope.md) | Alias             | Modal overlay surface; dialog semantics use Dialog.                   |

## Layout and structural elements

| Taxonomy entry | Spec object                                                        | Abstraction level | Notes                                                                     |
| -------------- | ------------------------------------------------------------------ | ----------------- | ------------------------------------------------------------------------- |
| Grid           | [Grid](../../../scopes/Containers/grid.scope.md)                                   | Existing object   | Layout grid container; data grid maps to Data grid.                       |
| Pane           | [Structural containers](../../../scopes/Containers/structural_containers.scope.md) | Grouped leaf      | Structural region inside a surface.                                       |
| Rail           | [Structural containers](../../../scopes/Containers/structural_containers.scope.md) | Alias             | Persistent structural region; navigation rail maps to Navigation widgets. |
| Stack          | [Structural containers](../../../scopes/Containers/structural_containers.scope.md) | Alias             | Linear arrangement container.                                             |
| Scaffold       | [Structural containers](../../../scopes/Containers/structural_containers.scope.md) | Alias             | Page/application structural frame.                                        |
| Region         | [Structural containers](../../../scopes/Containers/structural_containers.scope.md) | Alias             | Named or meaningful content region.                                       |
| Splitter       | [Splitters](../../../scopes/Containers/splitters.scope.md)                         | Grouped leaf      | Movable divider between panes.                                            |

## Layout mechanisms and definitions

| Taxonomy entry    | Spec object               | Abstraction level  | Notes                              |
| ----------------- | ------------------------- | ------------------ | ---------------------------------- |
| Containment       | [Layout](../../../scopes/Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Flow              | [Layout](../../../scopes/Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Alignment         | [Layout](../../../scopes/Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Anchoring         | [Layout](../../../scopes/Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Sizing            | [Layout](../../../scopes/Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Spacing           | [Layout](../../../scopes/Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Wrapping          | [Layout](../../../scopes/Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Responsive Reflow | [Layout](../../../scopes/Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |
| Breakpoint        | [Layout](../../../scopes/Layout/scope.md) | Folder abstraction | Mechanism-level layout vocabulary. |

## Presentation and style definitions

| Taxonomy entry      | Spec object                           | Abstraction level  | Notes                                                                    |
| ------------------- | ------------------------------------- | ------------------ | ------------------------------------------------------------------------ |
| Color               | [Presentation](../../../scopes/Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Typography          | [Presentation](../../../scopes/Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Shape               | [Presentation](../../../scopes/Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Border              | [Presentation](../../../scopes/Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Shadow / Elevation  | [Presentation](../../../scopes/Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Opacity             | [Presentation](../../../scopes/Presentation/scope.md) | Folder abstraction | Visual-token vocabulary.                                                 |
| Icons / Iconography | [Presentation](../../../scopes/Presentation/scope.md) | Folder abstraction | Icon-system vocabulary; concrete icon output maps to Display primitives. |
| Spacing tokens      | [Presentation](../../../scopes/Presentation/scope.md) | Folder abstraction | Design-token vocabulary.                                                 |
| Visual states       | [Presentation](../../../scopes/Presentation/scope.md) | Folder abstraction | State styling vocabulary; concrete events map to Interaction.            |
| Theme               | [Presentation](../../../scopes/Presentation/scope.md) | Folder abstraction | Visual system vocabulary.                                                |
| Motion              | [Presentation](../../../scopes/Presentation/scope.md) | Folder abstraction | Animation and transition vocabulary.                                     |
| Visibility          | [Presentation](../../../scopes/Presentation/scope.md) | Folder abstraction | Visibility and display-state vocabulary.                                 |

## Internationalization and localization definitions

| Taxonomy entry                          | Spec object                                           | Abstraction level  | Notes                                         |
| --------------------------------------- | ----------------------------------------------------- | ------------------ | --------------------------------------------- |
| Language support                        | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Locale and language vocabulary.               |
| Internationalization (i18n)             | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Authoring for multiple locales.               |
| Localization (l10n)                     | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Locale-specific adaptation.                   |
| Locale                                  | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Locale identity and data vocabulary.          |
| Translation                             | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Message translation vocabulary.               |
| Pluralization and grammatical variation | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Grammar-aware message vocabulary.             |
| Text direction and writing mode         | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Direction and script vocabulary.              |
| RTL layout adaptation                   | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Right-to-left layout adaptation.              |
| Bidirectional text                      | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Mixed-direction text vocabulary.              |
| Directional mirroring                   | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Mirrored icon/layout vocabulary.              |
| Date/time/calendar formatting           | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Locale-aware date and calendar vocabulary.    |
| Number/percentage/digit formatting      | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Locale-aware number vocabulary.               |
| Currency/measurement formatting         | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Locale-aware unit vocabulary.                 |
| Locale-aware sorting and search         | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Collation and search vocabulary.              |
| Font/glyph/text-metrics support         | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Font and glyph fallback vocabulary.           |
| Localized input and validation          | [Internationalization](../../../scopes/Internationalization/scope.md) | Folder abstraction | Locale-aware input and validation vocabulary. |

## Interaction definitions

| Taxonomy entry               | Spec object                                       | Abstraction level  | Notes                                |
| ---------------------------- | ------------------------------------------------- | ------------------ | ------------------------------------ |
| Hover state                  | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Interaction state vocabulary.        |
| Focus state                  | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Interaction state vocabulary.        |
| Active / Pressed state       | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Interaction state vocabulary.        |
| Selected state               | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Interaction state vocabulary.        |
| Disabled state               | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Interaction state vocabulary.        |
| Touch target                 | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Target-size vocabulary.              |
| Pointer hit area             | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Target-size vocabulary.              |
| Minimum target size          | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Target-size vocabulary.              |
| Target spacing               | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Target-size vocabulary.              |
| Tap                          | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Gesture vocabulary.                  |
| Double-tap                   | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Gesture vocabulary.                  |
| Long-press                   | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Gesture vocabulary.                  |
| Swipe                        | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Gesture vocabulary.                  |
| Pinch                        | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Gesture vocabulary.                  |
| Rotate                       | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Gesture vocabulary.                  |
| Drag and drop                | [Drag and drop](../../../scopes/Behaviors/drag_and_drop.scope.md) | Existing object    | Reusable behavior object.            |
| Pointer/mouse button press   | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Pointer event vocabulary.            |
| Pointer/mouse button release | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Pointer event vocabulary.            |
| Click                        | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Activation event vocabulary.         |
| Pointer move                 | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Pointer event vocabulary.            |
| Pointer enter/leave          | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Pointer event vocabulary.            |
| Wheel/scroll event           | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Pointer and scroll event vocabulary. |
| Touch start/move/end         | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Touch event vocabulary.              |
| Key down                     | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Keyboard event vocabulary.           |
| Key up                       | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Keyboard event vocabulary.           |
| Modifier-key combination     | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Keyboard shortcut vocabulary.        |
| Standard character-key input | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Keyboard text-entry vocabulary.      |
| Special-key input            | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Keyboard command vocabulary.         |
| Focus event                  | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Focus event vocabulary.              |
| Input event                  | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Input event vocabulary.              |
| Change event                 | [Interaction](../../../scopes/Interaction/scope.md)               | Folder abstraction | Change event vocabulary.             |

## Proposed Qt-informed taxonomy additions

The following rows correspond one-to-one to additions in the [taxonomy draft](GENERIC_UI_TAXONOMY_DRAFT.md). For the proposed new leaves, Existing object describes the **post-merge state only**; until acceptance they remain proposed. Browsing headings do not receive object rows. Owned parts and compositional variants use Alias with an explicit role note.

### Input elements

| Taxonomy entry | Spec object | Abstraction level | Notes |
|---|---|---|---|
| Tool button | [Controls/action_controls.scope.md](../../../scopes/Controls/action_controls.scope.md) | Alias | Command activation. Activates a compact command; an optional menu offers related choices. [Qt reference](categories/commands/action-buttons.md#qtoolbutton). |
| Explanatory command choice | [Controls/action_controls.scope.md](../../../scopes/Controls/action_controls.scope.md) | Alias | Command activation. Presents a command with explanatory text to help the user choose an action. [Qt reference](categories/commands/action-buttons.md#qcommandlinkbutton). |
| Rich text editor | [Controls/text_inputs.scope.md](../../../scopes/Controls/text_inputs.scope.md) | Alias | Text and shortcut entry. Edits formatted paragraphs, lists, tables and images; formatting controls may be supplied separately. [Qt reference](categories/input-and-selection/text-and-shortcuts.md#qtextedit). |
| Keyboard shortcut field | [Controls/text_inputs.scope.md](../../../scopes/Controls/text_inputs.scope.md) | Alias | Text and shortcut entry. Records pressed key combinations and shows the resulting shortcut; capture does not activate or register it. [Qt reference](categories/input-and-selection/text-and-shortcuts.md#qkeysequenceedit). |
| Font-family selector | [Controls/choice_controls.scope.md](../../../scopes/Controls/choice_controls.scope.md) | Alias | Value and resource selection. Chooses a family from the fonts available to the application. [Qt reference](categories/input-and-selection/choices.md#qfontcombobox). |
| Rotary value control | [Controls/range_control.scope.md](../../../scopes/Controls/range_control.scope.md) | Alias | Value and resource selection. Adjusts a bounded value through a circular control, using pointer or keyboard interaction. [Qt reference](categories/input-and-selection/numeric-values.md#qdial). |
| Font picker | [Controls/picker_control.scope.md](../../../scopes/Controls/picker_control.scope.md) | Alias | Value and resource selection. Chooses font family, style and size, usually with a preview; it may be hosted in a dialog. [Qt reference](categories/windows-and-dialogs/value-and-resource-pickers.md#qfontdialog). |
| Folder picker | [Controls/picker_control.scope.md](../../../scopes/Controls/picker_control.scope.md) | Alias | Value and resource selection. Chooses a directory from a supported filesystem or storage provider. [Qt reference](categories/windows-and-dialogs/value-and-resource-pickers.md#qfiledialog). |
| Date field | [Widgets/date_time_pickers.scope.md](../../../scopes/Widgets/date_time_pickers.scope.md) | Alias | Temporal entry. Edits date sections directly, optionally with a calendar popup. [Qt reference](categories/input-and-selection/dates-and-times.md#qdateedit). |
| Time field | [Widgets/date_time_pickers.scope.md](../../../scopes/Widgets/date_time_pickers.scope.md) | Alias | Temporal entry. Edits a time through displayed sections without requiring a calendar date. [Qt reference](categories/input-and-selection/dates-and-times.md#qtimeedit). |
| Combined date/time field | [Widgets/date_time_pickers.scope.md](../../../scopes/Widgets/date_time_pickers.scope.md) | Alias | Temporal entry. Edits date and time sections in one control, with locale-sensitive presentation. [Qt reference](categories/input-and-selection/dates-and-times.md#qdatetimeedit). |

### Output elements

| Taxonomy entry | Spec object | Abstraction level | Notes |
|---|---|---|---|
| Linked document viewer | [Controls/display_primitives.scope.md](../../../scopes/Controls/display_primitives.scope.md) | Alias | Document and numeric display. Reads formatted content and follows links; local document history need not be application routing. [Qt reference](categories/content-and-data/text-images-and-numbers.md#qtextbrowser). |
| Segmented number display | [Controls/display_primitives.scope.md](../../../scopes/Controls/display_primitives.scope.md) | Alias | Document and numeric display. Displays values using segmented digit shapes without providing value-entry controls. [Qt reference](categories/content-and-data/text-images-and-numbers.md#qlcdnumber). |
| Icon collection | [Widgets/list.scope.md](../../../scopes/Widgets/list.scope.md) | Alias | Collections and data presentation. Presents collection items as icons with labels; selection and item actions depend on the instance. [Qt reference](categories/content-and-data/collections-and-hierarchies.md#qlistview). |
| Action-history list | [Widgets/list.scope.md](../../../scopes/Widgets/list.scope.md) | Alias | Collections and data presentation. Shows recorded actions and lets the user move to an application-supported history position. [Qt reference](categories/commands/action-history.md#qundoview). |
| Collection header | [Widgets/data_grid.scope.md](../../../scopes/Widgets/data_grid.scope.md) | Alias | Collections and data presentation. Labels table or tree sections, optionally supporting sorting, resizing and reordering; it belongs to the collection. Owned role, not an independent new scope. [Qt reference](categories/content-and-data/collection-headers.md#qheaderview). |
| Graphics viewport | [Widgets/graphics_viewport.scope.md](proposed-scopes/Widgets/graphics_viewport.scope.md) | Existing object | Pending new leaf; this level applies only after acceptance. Graphics presentation / Scene viewports. Shows scene content through a viewport; configured interaction may pan or select content. [Qt reference](categories/graphics/display-surfaces.md#qgraphicsview). |
| Custom graphics surface | [Widgets/media_widgets.scope.md](../../../scopes/Widgets/media_widgets.scope.md) | Alias | Graphics presentation / Custom-rendered surfaces. Displays application-rendered imagery; it supplies no universal camera, editing or selection controls. [Qt reference](categories/graphics/display-surfaces.md#qrhiwidget). |
| Ellipse | [Controls/display_primitives.scope.md](../../../scopes/Controls/display_primitives.scope.md) | Alias | Graphics presentation / Geometric output. Displays an elliptical or circular shape in graphical content. [Qt reference](categories/graphics/shapes-and-paths.md#qgraphicsellipseitem). |
| Rectangle | [Controls/display_primitives.scope.md](../../../scopes/Controls/display_primitives.scope.md) | Alias | Graphics presentation / Geometric output. Displays a rectangular shape in graphical content. [Qt reference](categories/graphics/shapes-and-paths.md#qgraphicsrectitem). |
| Line | [Controls/display_primitives.scope.md](../../../scopes/Controls/display_primitives.scope.md) | Alias | Graphics presentation / Geometric output. Displays a line segment between positions in graphical content. [Qt reference](categories/graphics/shapes-and-paths.md#qgraphicslineitem). |
| Polygon | [Controls/display_primitives.scope.md](../../../scopes/Controls/display_primitives.scope.md) | Alias | Graphics presentation / Geometric output. Displays a shape defined by connected vertices. [Qt reference](categories/graphics/shapes-and-paths.md#qgraphicspolygonitem). |
| Path | [Controls/display_primitives.scope.md](../../../scopes/Controls/display_primitives.scope.md) | Alias | Graphics presentation / Geometric output. Displays a custom shape made from segments and curves. [Qt reference](categories/graphics/shapes-and-paths.md#qgraphicspathitem). |
| Startup feedback | [Widgets/feedback_widgets.scope.md](../../../scopes/Widgets/feedback_widgets.scope.md) | Alias | Feedback and assistance. Displays startup imagery and optional progress messages while an application starts. [Qt reference](categories/status-and-help/status-and-activity.md#qsplashscreen). |
| Requested contextual help | [Widgets/feedback_widgets.scope.md](../../../scopes/Widgets/feedback_widgets.scope.md) | Alias | Feedback and assistance. Shows an explanation requested for a control; actionable links require accessible interaction. [Qt reference](categories/status-and-help/contextual-help.md#qwhatsthis). |

### Navigational elements

| Taxonomy entry | Spec object | Abstraction level | Notes |
|---|---|---|---|
| Menubar | [Widgets/menu_widgets.scope.md](../../../scopes/Widgets/menu_widgets.scope.md) | Alias | Command menus. Shows a persistent set of menus through which users select commands or choices. [Qt reference](categories/commands/command-collections.md#qmenubar). |
| Cascading-column browser | [Widgets/navigation_widgets.scope.md](../../../scopes/Widgets/navigation_widgets.scope.md) | Alias | Hierarchy browsing. Explores a hierarchy through adjacent columns representing successive levels. [Qt reference](categories/content-and-data/collections-and-hierarchies.md#qcolumnview). |
| Vertical page selector | [Containers/tabs.scope.md](../../../scopes/Containers/tabs.scope.md) | Alias | Content selection and position. Selects one content page through vertically arranged tabs; it is not an independently expanding panel set. [Qt reference](categories/navigation/page-switching.md#qtoolbox). |

### Container elements

| Taxonomy entry | Spec object | Abstraction level | Notes |
|---|---|---|---|
| Labelled group | [Containers/surface_containers.scope.md](../../../scopes/Containers/surface_containers.scope.md) | Alias | Grouping surfaces. Groups related controls under a visible title. [Qt reference](categories/containers-and-layout/visual-grouping.md#qgroupbox). |
| Checkable group | [Containers/surface_containers.scope.md](../../../scopes/Containers/surface_containers.scope.md) | Alias | Grouping surfaces. Adds a group-level choice that enables or disables associated controls without necessarily hiding them. [Qt reference](categories/containers-and-layout/visual-grouping.md#qgroupbox). |
| Page stack | [Containers/page_stack.scope.md](proposed-scopes/Containers/page_stack.scope.md) | Existing object | Pending new leaf; this level applies only after acceptance. Content viewports. Keeps alternative content regions in one location and shows the current region; its selector may be external. [Qt reference](categories/navigation/page-switching.md#qstackedwidget). |
| Scroll container | [Containers/scroll_container.scope.md](proposed-scopes/Containers/scroll_container.scope.md) | Existing object | Pending new leaf; this level applies only after acceptance. Content viewports. Reveals overflowed content through a viewport, with configurable scroll-bar visibility. [Qt reference](categories/navigation/scrolling.md#qscrollarea). |
| Main-window shell | [Containers/surface_containers.scope.md](../../../scopes/Containers/surface_containers.scope.md) | Alias | Workspace surfaces. Combines central work content with surrounding command, status and optional dock regions. [Qt reference](categories/windows-and-dialogs/application-workspaces.md#qmainwindow). |
| Dockable panel | [Containers/surface_containers.scope.md](../../../scopes/Containers/surface_containers.scope.md) | Alias | Workspace surfaces. Holds content that can be attached to a workspace edge or presented as a floating surface. [Qt reference](categories/windows-and-dialogs/application-workspaces.md#qdockwidget). |
| Internal document window | [Containers/surface_containers.scope.md](../../../scopes/Containers/surface_containers.scope.md) | Alias | Workspace surfaces. Presents a document in a movable or resizable internal workspace surface. [Qt reference](categories/windows-and-dialogs/application-workspaces.md#qmdisubwindow). |
| Multiple-document workspace | [Containers/surface_containers.scope.md](../../../scopes/Containers/surface_containers.scope.md) | Alias | Workspace surfaces. Hosts and activates multiple document windows inside one work area. [Qt reference](categories/windows-and-dialogs/application-workspaces.md#qmdiarea). |
| Message/decision dialog | [Widgets/dialog.scope.md](../../../scopes/Widgets/dialog.scope.md) | Alias | Focused tasks and guided sequences. Presents information or a decision with a small set of explicit responses. [Qt reference](categories/windows-and-dialogs/messages-and-operation-progress.md#qmessagebox). |
| Single-value prompt | [Widgets/dialog.scope.md](../../../scopes/Widgets/dialog.scope.md) | Alias | Focused tasks and guided sequences. Requests one value through an input control and dialog actions. [Qt reference](categories/windows-and-dialogs/value-and-resource-pickers.md#qinputdialog). |
| Picker dialog | [Widgets/dialog.scope.md](../../../scopes/Widgets/dialog.scope.md) | Alias | Focused tasks and guided sequences. Hosts a specialized picker within a focused dialog task; resource access depends on the chosen picker. Compose the appropriate Picker control inside Dialog. [Qt reference](categories/windows-and-dialogs/value-and-resource-pickers.md#qfiledialog). |
| Progress dialog | [Widgets/dialog.scope.md](../../../scopes/Widgets/dialog.scope.md) | Alias | Focused tasks and guided sequences. Shows operation progress and optionally offers cancellation; requesting cancellation is not proof that the operation has stopped. [Qt reference](categories/windows-and-dialogs/messages-and-operation-progress.md#qprogressdialog). |
| Suppressible-error dialog | [Widgets/dialog.scope.md](../../../scopes/Widgets/dialog.scope.md) | Alias | Focused tasks and guided sequences. Presents an error and lets the user suppress repeated messages according to application policy. [Qt reference](categories/windows-and-dialogs/messages-and-operation-progress.md#qerrormessage). |
| Dialog action group | [Widgets/dialog.scope.md](../../../scopes/Widgets/dialog.scope.md) | Alias | Focused tasks and guided sequences. Arranges actions by semantic role and platform conventions within the owning dialog. Owned role, not an independent new scope. [Qt reference](categories/windows-and-dialogs/dialog-structure.md#qdialogbuttonbox). |
| Workflow stepper | [Widgets/stepper.scope.md](../../../scopes/Widgets/stepper.scope.md) | Existing object | Focused tasks and guided sequences. Guides users through steps with progression and completion rules; it is distinct from a numeric stepper. [Qt reference](categories/windows-and-dialogs/guided-sequences.md#qwizard). |
| Wizard | [Widgets/stepper.scope.md](../../../scopes/Widgets/stepper.scope.md) | Alias | Focused tasks and guided sequences. Hosts a guided workflow, often in a dialog, with previous, next and completion actions. [Qt reference](categories/windows-and-dialogs/guided-sequences.md#qwizard). |
| Guided step | [Widgets/stepper.scope.md](../../../scopes/Widgets/stepper.scope.md) | Alias | Focused tasks and guided sequences. Contains one workflow step's content and participation in progression rules; it is not inherently a route-level page. Owned role, not an independent new scope. [Qt reference](categories/windows-and-dialogs/guided-sequences.md#qwizardpage). |

### Layout and structural UI elements/objects

| Taxonomy entry | Spec object | Abstraction level | Notes |
|---|---|---|---|
| Splitter handle | [Containers/splitters.scope.md](../../../scopes/Containers/splitters.scope.md) | Alias | Pane structure. Provides the visible affordance for resizing adjacent panes of its owning splitter. Owned role, not an independent new scope. [Qt reference](categories/containers-and-layout/adjustable-panes.md#qsplitterhandle). |
| Graphics scene | [Containers/structural_containers.scope.md](../../../scopes/Containers/structural_containers.scope.md) | Alias | Scene composition. Organizes graphical contents and their interaction; one or more viewports may display it. [Qt reference](categories/graphics/scene-composition.md#qgraphicsscene). |
| Graphics group | [Containers/structural_containers.scope.md](../../../scopes/Containers/structural_containers.scope.md) | Alias | Scene composition. Groups graphical contents for combined transforms or configured manipulation; it has no automatic frame. [Qt reference](categories/graphics/scene-composition.md#qgraphicsitemgroup). |
| Scene-hosted UI region | [Containers/surface_containers.scope.md](../../../scopes/Containers/surface_containers.scope.md) | Alias | Scene composition. Hosts controls or nested arrangement within graphical content. [Qt reference](categories/graphics/scene-composition.md#qgraphicswidget). |

### UI layout mechanisms/definitions

| Taxonomy entry | Spec object | Abstraction level | Notes |
|---|---|---|---|
| Label-field arrangement | [Layout/scope.md](../../../scopes/Layout/scope.md) | Folder abstraction | Arrangement patterns. Aligns labels with input fields and adapts the arrangement to available space. [Qt reference](categories/containers-and-layout/arrangement-and-spacing.md#qformlayout). |
| Shared-region layered arrangement | [Layout/scope.md](../../../scopes/Layout/scope.md) | Folder abstraction | Arrangement patterns. Places content layers in a shared region, showing one or several according to the selected mode. [Qt reference](categories/containers-and-layout/arrangement-and-spacing.md#qstackedlayout). |

### UI presentation and style definitions

| Taxonomy entry | Spec object | Abstraction level | Notes |
|---|---|---|---|
| Blur | [Presentation/scope.md](../../../scopes/Presentation/scope.md) | Folder abstraction | Content treatments. Softens existing rendered content without adding a new component. [Qt reference](categories/appearance/README.md#qgraphicsblureffect). |
| Color tint | [Presentation/scope.md](../../../scopes/Presentation/scope.md) | Folder abstraction | Content treatments. Applies a color treatment to existing rendered content. [Qt reference](categories/appearance/README.md#qgraphicscolorizeeffect). |
| Focus outline | [Presentation/scope.md](../../../scopes/Presentation/scope.md) | Folder abstraction | State indicators. Marks the focused target visually; focus ownership remains an interaction state. [Qt reference](categories/status-and-help/interaction-indicators.md#qfocusframe). |
| Provisional-selection outline | [Presentation/scope.md](../../../scopes/Presentation/scope.md) | Folder abstraction | State indicators. Shows a proposed selection area or boundary during an interaction. [Qt reference](categories/status-and-help/interaction-indicators.md#qrubberband). |

### UI interaction definitions

| Taxonomy entry | Spec object | Abstraction level | Notes |
|---|---|---|---|
| Text completion | [Behaviors/text_completion.scope.md](proposed-scopes/Behaviors/text_completion.scope.md) | Existing object | Pending new leaf; this level applies only after acceptance. Reusable interaction behaviors / Entry assistance. Offers candidate text inline or in a popup for an associated input; the user accepts a suggestion or keeps typing. [Qt reference](categories/input-and-selection/text-and-shortcuts.md#qcompleter). |
| Exclusive selection coordination | [choice_controls.scope.md](../../../scopes/Controls/choice_controls.scope.md) | Alias | Reusable coordination capability in Choice controls; [B09 Coordinate exclusive choices](behaviors/selection/choice.md#b09). |
| Kinetic scrolling | [viewport_scrolling.scope.md](proposed-scopes/Behaviors/viewport_scrolling.scope.md) | Alias | Refinement of proposed P06; [B22 Continue and interrupt kinetic scrolling](behaviors/navigation/viewport.md#b22). |

## Behavior outcomes — synchronized additions

Levels refer to the intended accepted destination. Existing object for a new leaf is conditional on its canonical merge. Other host actions are aliases/capabilities of their scope anchor, not independently generated types. The complete qualified mapping is in [behavior scope mapping](BEHAVIOR_SCOPE_MAPPING.md).

| Taxonomy entry | Spec object | Abstraction level | Notes |
|---|---|---|---|
| Show, hide and close a surface | [surface_containers.scope.md](../../../scopes/Containers/surface_containers.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B01 Show, hide and close a surface](behaviors/presence/disclosure.md#b01). |
| Disclose and retire transient content | [feedback_widgets.scope.md](../../../scopes/Widgets/feedback_widgets.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B02 Disclose and retire transient content](behaviors/presence/disclosure.md#b02). |
| Expand and collapse content | [collapsible.scope.md](../../../scopes/Behaviors/collapsible.scope.md) | Existing object | Reuse existing behavior leaf; [B03 Expand and collapse content](behaviors/presence/expansion.md#b03). |
| Restrict interaction to a modal scope | [modal_interaction.scope.md](proposed-scopes/Behaviors/modal_interaction.scope.md) | Existing object | P05 modal interaction; B06 is a focus policy within the same contract; [B04 Restrict interaction to a modal scope](behaviors/governance/modality.md#b04). |
| Transfer and traverse focus | [scope.md](../../../scopes/Interaction/scope.md) | Folder abstraction | Existing host/folder enrichment; no independent leaf; [B05 Transfer and traverse focus](behaviors/governance/focus.md#b05). |
| Contain and restore modal focus | [modal_interaction.scope.md](proposed-scopes/Behaviors/modal_interaction.scope.md) | Alias | P05 modal interaction; B06 is a focus policy within the same contract; [B06 Contain and restore modal focus](behaviors/governance/focus.md#b06). |
| Enforce interaction availability | [scope.md](../../../scopes/Interaction/scope.md) | Folder abstraction | Existing host/folder enrichment; no independent leaf; [B07 Enforce interaction availability](behaviors/governance/availability.md#b07). |
| Change a checked or chosen value | [choice_controls.scope.md](../../../scopes/Controls/choice_controls.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B08 Change a checked or chosen value](behaviors/selection/choice.md#b08). |
| Select collection or scene items | [list.scope.md](../../../scopes/Widgets/list.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B10 Select collection or scene items](behaviors/selection/collections.md#b10). |
| Select by a spatial region | [graphics_viewport.scope.md](proposed-scopes/Widgets/graphics_viewport.scope.md) | Alias | P04 selection capability; no independent new leaf; [B11 Select by a spatial region](behaviors/selection/collections.md#b11). |
| Edit text and transfer clipboard content | [text_inputs.scope.md](../../../scopes/Controls/text_inputs.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B12 Edit text and transfer clipboard content](behaviors/entry/editing.md#b12). |
| Capture a shortcut sequence | [text_inputs.scope.md](../../../scopes/Controls/text_inputs.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B13 Capture a shortcut sequence](behaviors/entry/editing.md#b13). |
| Adjust a bounded value | [range_control.scope.md](../../../scopes/Controls/range_control.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B15 Adjust a bounded value](behaviors/entry/values.md#b15). |
| Constrain and validate input | [scope.md](../../../scopes/Interaction/scope.md) | Folder abstraction | Existing host/folder enrichment; no independent leaf; [B16 Constrain and validate input](behaviors/entry/values.md#b16). |
| Preview a value before completion | [picker_control.scope.md](../../../scopes/Controls/picker_control.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B17 Preview a value before completion](behaviors/entry/values.md#b17). |
| Switch the current content region | [page_stack.scope.md](proposed-scopes/Containers/page_stack.scope.md) | Alias | P01/Tabs current-content capability; no independent new leaf; [B18 Switch the current content region](behaviors/navigation/content.md#b18). |
| Navigate a hierarchy or resource location | [navigation_widgets.scope.md](../../../scopes/Widgets/navigation_widgets.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B19 Navigate a hierarchy or resource location](behaviors/navigation/content.md#b19). |
| Follow links and document history | [link_and_scroll_controls.scope.md](../../../scopes/Controls/link_and_scroll_controls.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B20 Follow links and document history](behaviors/navigation/content.md#b20). |
| Scroll or pan a viewport | [viewport_scrolling.scope.md](proposed-scopes/Behaviors/viewport_scrolling.scope.md) | Existing object | P06 viewport scrolling; kinetic and reveal-target are refinements; [B21 Scroll or pan a viewport](behaviors/navigation/viewport.md#b21). |
| Reveal a target in a viewport | [viewport_scrolling.scope.md](proposed-scopes/Behaviors/viewport_scrolling.scope.md) | Alias | P06 viewport scrolling; kinetic and reveal-target are refinements; [B23 Reveal a target in a viewport](behaviors/navigation/viewport.md#b23). |
| Resize a target or adjacent panes | [resizable.scope.md](../../../scopes/Behaviors/resizable.scope.md) | Existing object | Reuse existing behavior leaf; [B24 Resize a target or adjacent panes](behaviors/geometry/sizing.md#b24). |
| Move or reorder within a surface | [scope.md](../../../scopes/Interaction/scope.md) | Folder abstraction | Existing host/folder enrichment; no independent leaf; [B25 Move or reorder within a surface](behaviors/geometry/movement.md#b25). |
| Dock, float or rearrange panels | [surface_containers.scope.md](../../../scopes/Containers/surface_containers.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B27 Dock, float or rearrange panels](behaviors/geometry/placement.md#b27). |
| Transform graphical content | [structural_containers.scope.md](../../../scopes/Containers/structural_containers.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B28 Transform graphical content](behaviors/geometry/placement.md#b28). |
| Activate a command | [action_controls.scope.md](../../../scopes/Controls/action_controls.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B29 Activate a command](behaviors/commands/activation.md#b29). |
| Repeat activation while held | [action_controls.scope.md](../../../scopes/Controls/action_controls.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B30 Repeat activation while held](behaviors/commands/activation.md#b30). |
| Undo or redo recorded changes | [list.scope.md](../../../scopes/Widgets/list.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B31 Undo or redo recorded changes](behaviors/commands/history.md#b31). |
| Accept, reject or finish an interaction | [dialog.scope.md](../../../scopes/Widgets/dialog.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B32 Accept, reject or finish an interaction](behaviors/commands/workflow.md#b32). |
| Advance, revisit and branch a workflow | [stepper.scope.md](../../../scopes/Widgets/stepper.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B33 Advance, revisit and branch a workflow](behaviors/commands/workflow.md#b33). |
| Request cancellation of work | [dialog.scope.md](../../../scopes/Widgets/dialog.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B34 Request cancellation of work](behaviors/commands/workflow.md#b34). |
| Present contextual or host feedback | [feedback_widgets.scope.md](../../../scopes/Widgets/feedback_widgets.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B35 Present contextual or host feedback](behaviors/feedback/delivery.md#b35). |
| Suppress repeated messages | [feedback_widgets.scope.md](../../../scopes/Widgets/feedback_widgets.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B36 Suppress repeated messages](behaviors/feedback/suppression.md#b36). |
| Change a window presentation state | [surface_containers.scope.md](../../../scopes/Containers/surface_containers.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B37 Change a window presentation state](behaviors/geometry/placement.md#b37). |
| Sort or filter a presented collection | [data_grid.scope.md](../../../scopes/Widgets/data_grid.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B38 Sort or filter a presented collection](behaviors/navigation/collections.md#b38). |
| Group or ungroup graphical contents | [structural_containers.scope.md](../../../scopes/Containers/structural_containers.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B39 Group or ungroup graphical contents](behaviors/geometry/placement.md#b39). |
| Select a text range | [text_inputs.scope.md](../../../scopes/Controls/text_inputs.scope.md) | Alias | Existing host/folder enrichment; no independent leaf; [B40 Select a text range](behaviors/entry/editing.md#b40). |
