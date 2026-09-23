# Classification key (Phase B, step B1)

Lookup table for matching Phase A primary-class records (OpenUI5 classes) to
existing spec objects. Built once from `taxonomy_mapping.md` and each
`scopes/<Category>/scope.md` / `scopes/<Category>/<object>.scope.md`, for the
seven top-level categories that hold concrete UI objects: Application,
Controls, Behaviors, Pages, Views, Containers, Widgets. (Interaction,
Internationalization, Layout, Presentation are mechanism/token-level "Folder
abstraction" categories in `taxonomy_mapping.md`, not concrete UI object
targets — no OpenUI5 *class* should match those.)

Columns:
- **Spec object** — the leaf scope id and title (link into `scopes/`).
- **Purpose** — one-line summary from the scope's own Purpose section.
- **Taxonomy aliases** — the taxonomy entries `taxonomy_mapping.md` maps here
  (B3 keyword source: match a class's description against these words).
- **Disambiguation** — the scope's own Validation-notes / Boundaries steer on
  when *not* to use it, i.e. the sibling to check instead (use verbatim in B4
  manual review).

## Application

| Spec object | Purpose | Taxonomy aliases | Disambiguation |
|---|---|---|---|
| [Routing](../../scopes/Application/routing.scope.md) (`routing`) | Resolves navigation intents/locations to application content. | — | Route config, not the nav UI itself. |
| [Navigation](../../scopes/Application/navigation.scope.md) (`navigation`) | User-facing structures for moving between routes/pages/views. | Navigation bar (Existing object) | App-level nav landmark; reusable nav *widgets* (drawer, rail, breadcrumb, tree, pagination, carousel) go to Widgets/navigation_widgets instead. |
| [Tool bars](../../scopes/Application/tool_bars.scope.md) (`toolBars`) | Application-level command surfaces for frequent actions. | Toolbar (Existing object) | Application-level surface, distinct from a generic Containers surface. |
| [favicon.ico](../../scopes/Application/favicon.scope.md) (`favicon`) | Application icon asset for browser/shell identity. | — | Static asset, not a UI class — unlikely to match any OpenUI5 class. |
| [index.html](../../scopes/Application/index_html.scope.md) (`indexHtml`) | Application host document / bootstrap metadata. | — | Static asset, not a UI class — unlikely to match any OpenUI5 class. |

## Behaviors

| Spec object | Purpose | Taxonomy aliases | Disambiguation |
|---|---|---|---|
| [Drag and drop](../../scopes/Behaviors/drag_and_drop.scope.md) (`dragAndDrop`) | Moves elements via drag/drop. | Drag handle (Existing object, as affordance); Drag and drop (Existing object, Interaction) | A *behavior*/mixin applied to other objects, not a standalone visible control — matches OpenUI5 drag-drop config classes (e.g. `sap.ui.core.dnd.*`), not draggable controls themselves. |
| [Resizable](../../scopes/Behaviors/resizable.scope.md) (`resizable`) | Lets user resize elements. | Resize handle (Existing object, as affordance) | Behavior/mixin, not a visible control on its own. |
| [Collapsible](../../scopes/Behaviors/collapsible.scope.md) (`collapsible`) | Lets user collapse/expand elements. | — | Behavior/mixin; a concrete collapsible *panel* control is Containers/expandable_panels instead. |

## Containers

| Spec object | Purpose | Taxonomy aliases | Disambiguation |
|---|---|---|---|
| [Grid](../../scopes/Containers/grid.scope.md) (`grid`) | Layout container arranging children in rows/columns. | Grid (Existing object) | Layout grid, not a Widgets/data_grid (interactive tabular data). |
| [Expandable panels](../../scopes/Containers/expandable_panels.scope.md) (`expandablePanels`) | Container that expands/collapses to show/hide content. | Accordion (Existing object) | Concrete collapsible container; the Behaviors/collapsible scope is the abstract behavior. |
| [Tabs](../../scopes/Containers/tabs.scope.md) (`tabs`) | Tabbed container switching between views/content regions. | Tab (Existing object); Tab Bar (Alias) | — |
| [Surface containers](../../scopes/Containers/surface_containers.scope.md) (`surfaceContainers`) | Windows, screens, views, panels, cards, toolbar surfaces as visual regions. | Window (Grouped leaf); Panel (Alias); Card (Alias) | Use Pages/Views for route-level or workflow-level surfaces instead; this family is for reusable visual containers. |
| [Sheet containers](../../scopes/Containers/sheet_containers.scope.md) (`sheetContainers`) | Sidebars, sheets, side sheets, bottom sheets — edge/layered supplemental surfaces. | Sidebar (Grouped leaf); Sheet, Side Sheet, Bottom Sheet (Alias) | Use Widgets/dialog for modal dialog semantics instead. |
| [Overlay containers](../../scopes/Containers/overlay_containers.scope.md) (`overlayContainers`) | Popovers and modal overlays layered above the current surface. | Popover (Grouped leaf); Modal overlay (Alias) | Use Widgets/dialog when the overlay has title/content/actions dialog semantics. |
| [Structural containers](../../scopes/Containers/structural_containers.scope.md) (`structuralContainers`) | Panes, rails, stacks, scaffolds, regions organizing content. | Pane (Grouped leaf); Rail, Stack, Scaffold, Region (Alias) | Use Layout (mechanism-level: flow/alignment/sizing/breakpoints) instead when it's not a concrete container; navigation rail maps to Widgets/navigation_widgets, not here. |
| [Splitters](../../scopes/Containers/splitters.scope.md) (`splitters`) | Movable dividers between panes/regions. | Splitter (Grouped leaf) | Use Behaviors/resizable for generic resize behavior; this is specifically a visible structural divider control. |

## Controls

| Spec object | Purpose | Taxonomy aliases | Disambiguation |
|---|---|---|---|
| [Native](../../scopes/Controls/native.scope.md) (`native`) | Standard browser/framework presentation/input capability, no custom control needed. | — | Fallback only — a class wrapping a bare native HTML element with little added behavior. |
| [Action controls](../../scopes/Controls/action_controls.scope.md) (`actionControls`) | Controls triggering commands/state transitions (buttons, icon buttons). | Button (Grouped leaf); Icon button (Alias) | Command surface, not a nav link, menu item, or composite widget. |
| [Text inputs](../../scopes/Controls/text_inputs.scope.md) (`textInputs`) | Single/multi-line, password, search text-entry controls. | Text field (Grouped leaf); Text area, Password field, Search field (Alias) | — |
| [Choice controls](../../scopes/Controls/choice_controls.scope.md) (`choiceControls`) | Checkbox, radio, switch/toggle, dropdown, list box, combo box selection controls. | Checkbox (Grouped leaf); Radio button, Switch/Toggle, Dropdown, List box, Combo box (Alias) | Selectable *input* controls; use Widgets/menu_widgets when the primary behavior is command selection from an app menu. |
| [Picker control](../../scopes/Controls/picker_control.scope.md) (`pickerControl`) | Wheel picker, color picker, file picker — specialized selection affordances. | Wheel picker (Grouped leaf); Color picker, File picker (Alias) | Date/time picking maps to Widgets/date_time_pickers instead. |
| [Range control](../../scopes/Controls/range_control.scope.md) (`rangeControl`) | Slider, spin box/stepper input, rating control — bounded/discrete value controls. | Slider (Grouped leaf); Spin box/Stepper input, Rating control (Alias) | Use Controls/status_indicator instead when the value is display-only (progress/loading), not user-settable. |
| [Drawing and capture controls](../../scopes/Controls/drawing_and_capture.scope.md) (`drawingAndCapture`) | Canvas/drawing area, microphone input, biometric prompt — non-text input capture. | Canvas/Drawing area (Grouped leaf); Microphone input, Biometric prompt (Alias) | Input *capture*; use Widgets/media_widgets for playback/preview surfaces instead. |
| [Display primitives](../../scopes/Controls/display_primitives.scope.md) (`displayPrimitives`) | Labels, text, images, icons, avatars, separators — render-only. | Label (Grouped leaf); Text, Image, Icon, Avatar, Separator/Divider (Alias) | Render-only, no composite behavior; use Widgets when the object owns composite behavior. |
| [Status indicator](../../scopes/Controls/status_indicator.scope.md) (`statusIndicator`) | Status bar, tag, badge, progress bar, loader/spinner — passive state feedback. | Status bar (Grouped leaf); Tag, Badge, Progress bar, Loader/Spinner (Alias) | Passive/no user activation; use Widgets/feedback_widgets instead for transient messages (alert/toast/notification). |
| [Link and scroll controls](../../scopes/Controls/link_and_scroll_controls.scope.md) (`linkAndScrollControls`) | Links, scrollbars as primitive controls. | Link (Grouped leaf); Scrollbar (Alias) | Use Application/navigation for route-oriented groups of links instead of a single primitive link. |

## Pages

| Spec object | Purpose | Taxonomy aliases | Disambiguation |
|---|---|---|---|
| [Dashboard](../../scopes/Pages/dashboard.scope.md) (`dashboard`) | Predefined page layout for overview metrics/summary content. | — | — |
| [Shell page](../../scopes/Pages/shell_page.scope.md) (`shellPage`) | Page with no content, connects routing and navigation. | — | Has routing/navigation; contrast with Empty page which has neither. |
| [Empty page](../../scopes/Pages/empty_page.scope.md) (`emptyPage`) | Page with no content and no routing/navigation. | — | — |

## Views

| Spec object | Purpose | Taxonomy aliases | Disambiguation |
|---|---|---|---|
| [Report](../../scopes/Views/report.scope.md) (`report`) | Read-only data view: filter, sort, group, paginate. | Screen/View (Existing object, general) | Read-only; contrast with Form. |
| [Form](../../scopes/Views/form.scope.md) (`form`) | Read-write data view: validate, submit, dirty-state. | Form (Existing object) | Read-write; contrast with Report. |

## Widgets

| Spec object | Purpose | Taxonomy aliases | Disambiguation |
|---|---|---|---|
| [Chart](../../scopes/Widgets/chart.scope.md) (`chart`) | Visual data representation (bar/line/pie, etc.). | — | — |
| [Table](../../scopes/Widgets/table.scope.md) (`table`) | Tabular data presentation: columns, rows, sort/filter/paginate. | Table/Data grid (Existing object, tabular data branch) | Use Data grid instead for interactive grid behavior (cell focus, editing, keyboard grid nav). |
| [Data grid](../../scopes/Widgets/data_grid.scope.md) (`dataGrid`) | Interactive tabular-data widget: focus, selection, editing, keyboard grid nav. | Table/Data grid (Existing object, interactive-grid branch) | Use Table instead for standard (non-interactive) tabular data. |
| [List](../../scopes/Widgets/list.scope.md) (`list`) | Ordered/unordered item collection with sort/filter/paginate. | List (Existing object) | — |
| [Feedback widgets](../../scopes/Widgets/feedback_widgets.scope.md) (`feedbackWidgets`) | Tooltip, alert, toast/snackbar, notification, narration/audio-description. | Tooltip (Grouped leaf); Alert, Toast/Snackbar, Notification, Narration/Audio Description (Alias) | Transient/announced messages; use Controls/status_indicator for passive state display instead. |
| [Media widgets](../../scopes/Widgets/media_widgets.scope.md) (`mediaWidgets`) | Media player, camera preview, map — playback/preview/spatial content. | Media player (Grouped leaf); Camera preview (Alias); Map (Alias) | Playback/preview surfaces; use Controls/drawing_and_capture for input capture instead. |
| [Navigation widgets](../../scopes/Widgets/navigation_widgets.scope.md) (`navigationWidgets`) | Nav drawer/rail, hamburger menu, breadcrumb, tree view, pagination control, carousel. | Navigation Drawer (Grouped leaf); Navigation Rail, Hamburger Menu, Breadcrumb, Tree view, Pagination control, Carousel (Alias) | Reusable nav *widgets*; use Application/navigation for app-level route structures instead. |
| [Menu widgets](../../scopes/Widgets/menu_widgets.scope.md) (`menuWidgets`) | Menu, dropdown menu, context menu — command/choice lists in a menu pattern. | Menu (Grouped leaf); Dropdown Menu, Context menu (Alias) | Application-menu pattern; use Controls/choice_controls for simple value-selection controls instead. |
| [Date/Time pickers](../../scopes/Widgets/date_time_pickers.scope.md) (`dateTimePickers`) | Calendar-based date/time/date-range selection. | Date picker (Existing object); Time picker (Alias) | Calendar semantics specifically; other pickers (color/file/wheel) go to Controls/picker_control. |
| [Stepper](../../scopes/Widgets/stepper.scope.md) (`stepper`) | Guides user through an ordered multi-step process. | — | — |
| [Dialog](../../scopes/Widgets/dialog.scope.md) (`dialog`) | Modal/non-modal surface with title, content, actions. | Dialog (Existing object) | Has title→content→actions structure; a generic overlay without that structure is Containers/overlay_containers instead. |

## Notes for B2/B3 (base-class + description matching)

- **B2 (`extends` chain):** OpenUI5 families with a shared base class are the
  strongest signal — e.g. anything extending `sap.m.ListItemBase` → Widgets/list;
  `sap.m.InputBase` descendants → Controls/text_inputs (unless it's clearly a
  picker/range/choice control, which extend `InputBase` too — check description);
  `sap.ui.core.Control` alone is too generic to resolve by base class — fall
  through to B3.
- **B3 (description keywords):** match the extracted one-line class
  description against the "Taxonomy aliases" column above and the object's
  Purpose text — not the object's title alone (e.g. a class described as
  "displays a numeric value with severity" is Status indicator even if its
  class name doesn't contain "status").
- Classes whose only OpenUI5-specific behavior is theming, layout data,
  or renderer plumbing (not a `sap.ui.core.Control`/`Element` with real
  metadata) are candidates for `is_other`/exclusion, not for forcing into a
  spec object — flag for B4 review rather than guessing.
