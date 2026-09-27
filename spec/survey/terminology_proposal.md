# Consolidated terminology proposal

This proposal turns the terminology findings of the four UI surveys into concrete
changes to the OpenUI vocabulary. Each recommendation is one of four actions on a
specific term.

| Action               | Meaning                                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Change A to B**    | Same concept, new name. A is renamed to B; A may remain as an alias where noted.                                                                          |
| **Replace A with B** | A is removed and a different or more precise term B (or several terms) takes over its content.                                                            |
| **Delete A**         | A is removed with no successor, because it is not a UI object, is covered by other terms, or conflicts with OpenUI meanings.                              |
| **Add C**            | C is a new term, placed under the named scope with the named abstraction level. Adding a term does not create a new scope or known object type by itself. |

- **Where each change applies:** the [glossary](../README.md#glossary) or the canonical
  [taxonomy mapping](../scopes/taxonomy_mapping.md). For the taxonomy mapping, the
  taxonomy section and the scope are named.
- **Inputs:** each survey's README, SUMMARY and taxonomy and terminology files
  ([Angular Material](angular-material/README.md), [HTML Standard](html5/README.md),
  [OpenUI5](openui5/README.md), [Qt Widgets](qt/README.md)). Each survey's
  `taxonomy_mapping.md` lists the names that framework uses for every OpenUI scope.
- **Status:** proposal for review. Nothing is applied. It feeds terminology workstream
  W1, tasks 8 and 9, and plan questions Q5 and Q10 in the
  [v1 publish plan](specui_v1_publish_plan.md).
- **Naming rule used:** keep an existing OpenUI term; otherwise use the HTML or ARIA name;
  otherwise the name most surveyed frameworks use; otherwise a neutral descriptive
  name. Never use a framework class or brand. See
  [appendix A](#appendix-a-canonical-term-rule).

## Summary

| Action  | Count | Examples                                                                             |
| ------- | ----: | ------------------------------------------------------------------------------------ |
| Change  |     6 | Screen / View → View; Dropdown Menu → Menu button; Hamburger Menu → Hamburger button |
| Replace |    11 | Table / Data grid → Table + Data grid; Switch / Toggle → Switch + Toggle button      |
| Delete  |     2 | Biometric prompt; "widget instance" as an Element alias                              |
| Add     |    70 | Bar, Selection mode, Progress mode, Controlling element, Window (glossary), Meter    |

Four terms reviewed for change are kept, with sharper definitions: Stack, Toolbar,
Dropdown and Window. See [kept terms](#kept-with-a-sharper-definition).

## 1. Change

| #   | Change                                             | To                                             | Where                                                                             | Why                                                                                                                                                                                                                                                                                                        | Evidence                                                                                                                                                                           |
| --- | -------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C1  | Screen / View                                      | View                                           | Taxonomy mapping: Container elements, Views                                       | The glossary lists "screen" as an alias of **Page**, and the taxonomy note itself says Pages cover route-level screens. Keeping "Screen" here gives one word two owners.                                                                                                                                   | [Glossary: Page](../README.md#page); [taxonomy mapping](../scopes/taxonomy_mapping.md)                                                                                             |
| C2  | Map                                                | Geographic map                                 | Taxonomy mapping: Navigational elements, Media widgets                            | HTML image maps are a semantic mismatch, and Qt's graphics view is only a partial fit. The qualifier states the intended meaning.                                                                                                                                                                          | [HTML taxonomy mapping](html5/taxonomy_mapping.md); [Qt taxonomy mapping](qt/taxonomy_mapping.md)                                                                                  |
| C3  | Dropdown Menu                                      | Menu button, with Dropdown menu as its alias   | Taxonomy mapping: Navigational elements, Menu widgets                             | They name one pattern: a button that opens a menu of commands. WAI-ARIA calls the whole pattern "menu button", so under the naming rule it becomes the canonical name. The glossary Button entry already lists "menu button" as a variant and should point here. The menu itself stays **Menu**.           | [WAI-ARIA menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/); [HTML taxonomy mapping](html5/taxonomy_mapping.md); [Glossary: Button](../README.md#button) |
| C4  | Modal overlay (Overlay containers)                 | Modal overlay (Behaviors), same name, moved    | Taxonomy mapping: Container elements, moved to Behaviors                          | Modal overlay describes a behavior, so the existing name is kept and the entry moves to Behaviors. It is the canonical name for the behavior that Qt and Angular Material call Modal interaction (added as its alias, A56). The dimming layer is appearance and is added separately as **Backdrop** (A63). | [Qt P05](qt/scopes_proposal.md); [Angular Material AM-P03, AM-E12](angular-material/scopes_proposal.md); [HTML](html5/scopes_proposal.md)                                          |
| C5  | Hamburger Menu (Navigation widgets)                | Hamburger button, an alias of Tool button (A6) | Taxonomy mapping: Navigational elements, moved to Input elements, Action controls | It is a button, not a menu: a compact icon button, usually in an app bar or toolbar, that opens a Navigation Drawer. The drawer stays under Navigation widgets.                                                                                                                                            | [HTML taxonomy mapping](html5/taxonomy_mapping.md); [Qt](qt/scopes_proposal.md)                                                                                                    |
| C6  | "component" and "UI component" (aliases of Widget) | Aliases of Object                              | Glossary: Widget, moved to Object                                                 | In Angular a component is any UI building block with its own template, from a button to a page. That matches Object (any named contract), not Widget. The glossary already lists "component contract" as an Object alias. Widget keeps "reusable component" and "composite control".                       | [Angular Material taxonomy](angular-material/inventory/TAXONOMY.md#artifact-role-subcategories); [Glossary: Object](../README.md#object)                                           |

## 2. Replace

Several canonical taxonomy entries combine two names in one row ("A / B"). Where the two
names are the same concept they become separate aliases; where they differ they become
separate terms.

| #   | Replace                       | With                                                                                      | Where                                                              | Why                                                                                                                                                                                     | Evidence                                                                                                                                                     |
| --- | ----------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| R1  | Table / Data grid             | **Table** (Widgets/table) and **Data grid** (Widgets/data_grid), two entries              | Taxonomy mapping: Output elements                                  | One entry maps to two scopes that the glossary defines as different things: static tabular structure versus interactive grid behavior.                                                  | [Glossary: Data grid](../README.md#data-grid); [HTML taxonomy mapping](html5/taxonomy_mapping.md)                                                            |
| R2  | Loader / Spinner              | **Loader** and **Spinner**, two entries                                                   | Taxonomy mapping: Output elements, Status indicator                | Same rule as the other combined rows. Progress bar and Spinner stay distinct objects; whether either shows a known value is a separate term, **Progress mode** (A24).                   | [Taxonomy mapping](../scopes/taxonomy_mapping.md); Angular Material `progress-bar`, `progress-spinner` ([mapping](angular-material/taxonomy_mapping.md))     |
| R3  | Spin box / Stepper input      | **Spin box** and **Step input**, two aliases                                              | Taxonomy mapping: Input elements, Range control                    | The two names were one row only because the taxonomy lists them together. "Stepper input" is retired because Stepper is the workflow widget; OpenUI5 names the same control Step input. | [Qt QSpinBox, QDoubleSpinBox](qt/taxonomy_mapping.md); HTML `input[type=number]`; OpenUI5 `sap.m.StepInput` ([OpenUI5 mapping](openui5/taxonomy_mapping.md)) |
| R4  | Canvas / Drawing area         | **Canvas** and **Drawing area**, two aliases                                              | Taxonomy mapping: Input elements, Drawing and capture controls     | Two names for the same drawing surface. Separate aliases keep each searchable. Custom-rendered output is a different term (see A27).                                                    | [HTML `canvas`](html5/taxonomy_mapping.md); [Qt](qt/inventory/TAXONOMY_STRUCTURE_PROPOSAL.md#classification-and-merge-rules)                                 |
| R5  | Switch / Toggle               | **Switch** (stays in Choice controls) and **Toggle button** (alias under Action controls) | Taxonomy mapping: Input elements, Choice controls                  | A switch is an on/off control. A toggle button is a button that stays pressed, which the glossary already defines as a Button variant.                                                  | [Taxonomy mapping](../scopes/taxonomy_mapping.md); [Glossary: Button](../README.md#button)                                                                   |
| R6  | Toast / Snackbar              | **Toast** and **Snackbar**, two aliases                                                   | Taxonomy mapping: Output elements, Feedback widgets                | Same concept; Snackbar is Material's name for a toast.                                                                                                                                  | [Taxonomy mapping](../scopes/taxonomy_mapping.md); Angular Material `snack-bar`                                                                              |
| R7  | Separator / Divider           | **Separator** and **Divider**, two aliases                                                | Taxonomy mapping: Output elements, Display primitives              | Same concept.                                                                                                                                                                           | [Taxonomy mapping](../scopes/taxonomy_mapping.md)                                                                                                            |
| R8  | Shadow / Elevation            | **Shadow** and **Elevation**, two terms                                                   | Taxonomy mapping: Presentation and style definitions, Presentation | A shadow is a visual effect; elevation is a depth level that may be drawn as a shadow.                                                                                                  | [Taxonomy mapping](../scopes/taxonomy_mapping.md)                                                                                                            |
| R9  | Icons / Iconography           | **Iconography** only                                                                      | Taxonomy mapping: Presentation and style definitions, Presentation | Iconography is the icon system. A single icon is already the entry Icon under Display primitives, so "Icons" is a duplicate.                                                            | [Taxonomy mapping](../scopes/taxonomy_mapping.md)                                                                                                            |
| R10 | Active / Pressed state        | **Active state** and **Pressed state**, two terms                                         | Taxonomy mapping: Interaction definitions, Interaction             | Active is momentary, while the pointer or key is down. Pressed is the persistent on state of a toggle button.                                                                           | [Taxonomy mapping](../scopes/taxonomy_mapping.md); WAI-ARIA `aria-pressed`                                                                                   |
| R11 | Narration / Audio Description | **Narration** and **Audio description**, two aliases                                      | Taxonomy mapping: Output elements, Feedback widgets                | Narration is spoken output, such as speech synthesis. Audio description is a described-video track for blind users.                                                                     | [Taxonomy mapping](../scopes/taxonomy_mapping.md)                                                                                                            |

## 3. Delete

| #   | Delete                               | Where                                                          | Why                                                                                                                                                                                                                                                                    | Evidence                                                                                                                                                                                                      |
| --- | ------------------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | Biometric prompt                     | Taxonomy mapping: Input elements, Drawing and capture controls | Authentication is a platform prompt, not a UI object the document describes. No surveyed framework has one; HTML classes it as an external dependency.                                                                                                                 | [HTML taxonomy mapping](html5/taxonomy_mapping.md); no entry in the [Qt](qt/taxonomy_mapping.md), [Angular Material](angular-material/taxonomy_mapping.md) or [OpenUI5](openui5/taxonomy_mapping.md) mappings |
| D2  | "widget instance" (alias of Element) | Glossary: Element                                              | An element can be an instance of any object type (control, container, page), not only a widget, and in Qt "widget" means any UI object. The existing alias "object instance" says this correctly. "component instance" stays, since "component" now means Object (C6). | [Qt inventory](qt/inventory/01_COMPONENT_INVENTORY.md); [Glossary: Element](../README.md#element)                                                                                                             |

## Kept, with a sharper definition

These terms stay as they are. The surveys show their meaning needs to be stated more
precisely, which the related Add rows do.

| Term     | Scope                 | Keep because                                                                                                                                                                                                                                                                                                                          | Evidence                                                                                                            |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Stack    | Structural containers | Stack means a linear arrangement (a row or column), as the taxonomy mapping says. The survey found two other meanings: depth-layered stacking and one-visible-child stacking (Qt marks `QStackedWidget` "Stack (ambiguous)"). Those get their own terms, Layered arrangement (A55) and Page stack (A51), so Stack needs no qualifier. | [Qt taxonomy mapping](qt/inventory/TAXONOMY_MAPPING.md); [Qt merge review](qt/inventory/TAXONOMY_MERGE_REVIEW.md)   |
| Toolbar  | Tool bars             | A toolbar is a bar of commands. Its shape is shared with other bars (navigation bar, tab bar, status bar, menubar, filter bar), so the shared concept is added as **Bar** (A50); each bar keeps its purpose-based name and scope.                                                                                                     | [Taxonomy mapping](../scopes/taxonomy_mapping.md); [Angular Material AM-E08](angular-material/scopes_proposal.md)   |
| Dropdown | Choice controls       | Dropdown is a presentation: a collapsed choice that opens a list. It can allow one choice or several, so it must not be renamed to a single-choice term. Selection cardinality is added separately as **Selection mode** (A11).                                                                                                       | HTML `select` with `multiple`; OpenUI5 `sap.m.Select`, `sap.m.MultiComboBox`; Angular Material `select`             |
| Window   | Surface containers    | The survey issue was ambiguity with HTML's browser `Window` object, not the name. A glossary definition (A5) fixes that.                                                                                                                                                                                                              | [HTML taxonomy mapping](html5/taxonomy_mapping.md); [Qt QMainWindow, QDockWidget, QMdiArea](qt/taxonomy_mapping.md) |

## 4. Add

The Level column uses the taxonomy mapping's abstraction levels: Existing object, Alias,
Grouped leaf and Folder abstraction. Twelve terms name a scope that does not exist yet;
their Level reads "Needs a new scope". They can be added only if that scope is created,
and the [structure change proposal](structure_change_proposal.md) creates none.

### 4.1 Glossary terms

| #   | Add                 | Definition                                                                                                                                                                                                                                                               | Evidence                                                                                                  |
| --- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| A1  | Owner               | The element that owns content and its lifecycle, such as a Dialog that owns its title, content and actions and decides when it opens and closes.                                                                                                                         | WAI-ARIA `aria-owns`; HTML form owner; [Angular Material D01](angular-material/openui_schema_proposal.md) |
| A2  | Controlled element  | The element another element acts on, named by id reference and not owned, such as the table a Filter bar filters.                                                                                                                                                        | WAI-ARIA `aria-controls`; [Qt D01](qt/openui_schema_proposal.md)                                          |
| A3  | Controlling element | An element that only makes sense acting on a controlled element it references. Its Purpose states how it acts, for example filters, configures or supplies a value to. Examples: Filter bar, Personalization panel, Value help.                                          | WAI-ARIA `aria-controls`; [OpenUI5 scopes proposal](openui5/scopes_proposal.md)                           |
| A4  | Trigger             | An input or condition (gesture, key, pointer, hover, timer) that starts a behavior. Behaviors are classified by outcome, not trigger.                                                                                                                                    | [Qt D07](qt/openui_schema_proposal.md)                                                                    |
| A5  | Window              | A framed UI surface with its own title and window controls (for example move, resize, minimize, close). In a web UI it is drawn by the application; it is not the browser `Window` object. Main window, dockable panel and multiple-document workspace are its variants. | [HTML taxonomy mapping](html5/taxonomy_mapping.md); [Qt](qt/taxonomy_mapping.md)                          |

### 4.2 Input elements

| #   | Add                         | Scope               | Level             | Evidence                                                                                                                                                                 |
| --- | --------------------------- | ------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A6  | Tool button                 | Action controls     | Alias             | [Qt](qt/inventory/TAXONOMY_STRUCTURE_PROPOSAL.md#proposed-extension-tree)                                                                                                |
| A7  | Rich text editor            | Text inputs         | Alias             | [Qt](qt/scopes_proposal.md)                                                                                                                                              |
| A8  | Keyboard shortcut field     | Text inputs         | Alias             | [Qt](qt/scopes_proposal.md)                                                                                                                                              |
| A9  | Metadata-driven field       | Text inputs         | Alias             | [OpenUI5](openui5/scopes_proposal.md)                                                                                                                                    |
| A10 | Suggestion-backed combo box | Choice controls     | Alias             | [Angular Material](angular-material/scopes_proposal.md)                                                                                                                  |
| A11 | Selection mode              | Choice controls     | Grouped leaf      | Single or multiple choice, independent of presentation (dropdown, list box, combo box). HTML `select` `multiple`; OpenUI5 [`MultiComboBox`](openui5/taxonomy_mapping.md) |
| A12 | Multi-select combo box      | Choice controls     | Alias             | OpenUI5 [`sap.m.MultiComboBox`](openui5/taxonomy_mapping.md)                                                                                                             |
| A13 | Font-family selector        | Choice controls     | Alias             | [Qt](qt/scopes_proposal.md)                                                                                                                                              |
| A14 | Range slider                | Range control       | Alias             | [Angular Material AM-E02](angular-material/scopes_proposal.md)                                                                                                           |
| A15 | Rotary value control        | Range control       | Alias             | [Qt](qt/scopes_proposal.md)                                                                                                                                              |
| A16 | Date field                  | Date/Time pickers   | Alias             | [Qt](qt/scopes_proposal.md); [Angular Material AM-E03](angular-material/scopes_proposal.md)                                                                              |
| A17 | Time field                  | Date/Time pickers   | Alias             | [Qt](qt/scopes_proposal.md); [Angular Material AM-E03](angular-material/scopes_proposal.md)                                                                              |
| A18 | Font picker                 | Picker control      | Alias             | [Qt](qt/scopes_proposal.md)                                                                                                                                              |
| A19 | Folder picker               | Picker control      | Alias             | [Qt](qt/scopes_proposal.md)                                                                                                                                              |
| A20 | Token collection            | Widgets (new scope) | Needs a new scope | [Angular Material AM-P02](angular-material/scopes_proposal.md)                                                                                                           |
| A21 | Editable chip collection    | Token collection    | Alias             | [Angular Material](angular-material/scopes_proposal.md)                                                                                                                  |
| A22 | File upload                 | Widgets             | Grouped leaf      | [OpenUI5](openui5/scopes_proposal.md)                                                                                                                                    |

### 4.3 Output elements

| #   | Add                     | Scope               | Level             | Evidence                                                                                                                                                                                                                                                                     |
| --- | ----------------------- | ------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A23 | Meter                   | Status indicator    | Alias             | [HTML](html5/scopes_proposal.md)                                                                                                                                                                                                                                             |
| A24 | Progress mode           | Status indicator    | Grouped leaf      | Determinate (known value) or indeterminate (ongoing activity); applies to both Progress bar and Spinner. [HTML](html5/taxonomy_mapping.md) (`progress` with or without a value); [Angular Material AM-E06](angular-material/scopes_proposal.md); [Qt](qt/scopes_proposal.md) |
| A25 | Calculated output       | Display primitives  | Alias             | [HTML](html5/scopes_proposal.md)                                                                                                                                                                                                                                             |
| A26 | Geometric shape         | Display primitives  | Alias             | [Qt](qt/scopes_proposal.md) (ellipse, rectangle, line, polygon, path)                                                                                                                                                                                                        |
| A27 | Custom graphics surface | Media widgets       | Alias             | [Qt](qt/scopes_proposal.md)                                                                                                                                                                                                                                                  |
| A28 | Graphics viewport       | Widgets (new scope) | Needs a new scope | [Qt P04](qt/scopes_proposal.md)                                                                                                                                                                                                                                              |
| A29 | Description list        | List                | Alias             | [HTML](html5/scopes_proposal.md)                                                                                                                                                                                                                                             |
| A30 | Icon collection         | List                | Alias             | [Qt](qt/scopes_proposal.md)                                                                                                                                                                                                                                                  |
| A31 | Contextual help         | Feedback widgets    | Alias             | [Qt](qt/scopes_proposal.md)                                                                                                                                                                                                                                                  |
| A32 | Startup screen          | Feedback widgets    | Alias             | [Qt](qt/scopes_proposal.md)                                                                                                                                                                                                                                                  |
| A33 | Tile                    | Surface containers  | Alias of Card     | [OpenUI5](openui5/scopes_proposal.md)                                                                                                                                                                                                                                        |

### 4.4 Navigational elements

| #   | Add                   | Scope              | Level        | Evidence                              |
| --- | --------------------- | ------------------ | ------------ | ------------------------------------- |
| A34 | Menubar               | Menu widgets       | Alias        | [Qt](qt/scopes_proposal.md)           |
| A35 | Column browser        | Navigation widgets | Alias        | [Qt](qt/scopes_proposal.md)           |
| A36 | Filter bar            | Widgets            | Grouped leaf | [OpenUI5](openui5/scopes_proposal.md) |
| A37 | Value help            | Widgets            | Grouped leaf | [OpenUI5](openui5/scopes_proposal.md) |
| A38 | Personalization panel | Widgets            | Grouped leaf | [OpenUI5](openui5/scopes_proposal.md) |

### 4.5 Container elements

| #   | Add                         | Scope                  | Level             | Evidence                                                                             |
| --- | --------------------------- | ---------------------- | ----------------- | ------------------------------------------------------------------------------------ |
| A39 | Labelled group              | Surface containers     | Alias             | [Qt](qt/scopes_proposal.md)                                                          |
| A40 | Checkable group             | Surface containers     | Alias             | [Qt](qt/scopes_proposal.md)                                                          |
| A41 | Main window                 | Surface containers     | Alias             | [Qt](qt/scopes_proposal.md)                                                          |
| A42 | Dockable panel              | Surface containers     | Alias             | [Qt](qt/scopes_proposal.md) (optional runtime capability)                            |
| A43 | Multiple-document workspace | Surface containers     | Alias             | [Qt](qt/scopes_proposal.md) (optional runtime capability)                            |
| A44 | Form field                  | Containers (new scope) | Needs a new scope | [Angular Material AM-P01](angular-material/scopes_proposal.md)                       |
| A45 | Form group                  | Containers (new scope) | Needs a new scope | [HTML P3](html5/scopes_proposal.md)                                                  |
| A46 | Disclosure                  | Expandable panels      | Alias             | [HTML](html5/scopes_proposal.md)                                                     |
| A47 | Progress dialog             | Dialog                 | Alias             | [Qt](qt/scopes_proposal.md)                                                          |
| A48 | Workflow stepper            | Stepper                | Existing object   | [Angular Material](angular-material/scopes_proposal.md); [Qt](qt/scopes_proposal.md) |
| A49 | Wizard                      | Stepper                | Alias             | [Qt](qt/scopes_proposal.md)                                                          |

### 4.6 Layout and structural elements

| #   | Add                    | Scope                  | Level              | Evidence                                                                                                                                                                                                                                             |
| --- | ---------------------- | ---------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A50 | Bar                    | Structural containers  | Grouped leaf       | An edge-attached strip that arranges items along one axis. Toolbar, Navigation bar, Tab Bar, Status bar, Menubar and Filter bar are bars with a specific purpose; a Sidebar is a panel, not a bar. [Taxonomy mapping](../scopes/taxonomy_mapping.md) |
| A51 | Page stack             | Containers (new scope) | Needs a new scope  | [Qt P01](qt/scopes_proposal.md)                                                                                                                                                                                                                      |
| A52 | Scroll container       | Containers (new scope) | Needs a new scope  | [Qt P02](qt/scopes_proposal.md)                                                                                                                                                                                                                      |
| A53 | Splitter handle        | Splitters              | Alias              | [Qt](qt/scopes_proposal.md)                                                                                                                                                                                                                          |
| A54 | Flexible column layout | Containers             | Grouped leaf       | [OpenUI5](openui5/scopes_proposal.md)                                                                                                                                                                                                                |
| A55 | Layered arrangement    | Layout                 | Folder abstraction | [Qt](qt/inventory/TAXONOMY_STRUCTURE_PROPOSAL.md#proposed-extension-tree)                                                                                                                                                                            |

### 4.7 Behaviors

| #   | Add                              | Scope                                  | Level             | Evidence                                                                                                                           |
| --- | -------------------------------- | -------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| A56 | Modal interaction                | Behaviors (alias of Modal overlay, C4) | Alias             | [Qt P05](qt/scopes_proposal.md); [Angular Material AM-P03](angular-material/scopes_proposal.md) (their name for the same behavior) |
| A57 | Viewport scrolling               | Behaviors (new scope)                  | Needs a new scope | [Qt P06](qt/scopes_proposal.md); alias **Scrollable** from [Angular Material AM-P04](angular-material/scopes_proposal.md)          |
| A58 | Scroll lock                      | Behaviors (new scope)                  | Needs a new scope | [Angular Material AM-P05](angular-material/scopes_proposal.md)                                                                     |
| A59 | Text completion                  | Behaviors (new scope)                  | Needs a new scope | [Qt P03](qt/scopes_proposal.md)                                                                                                    |
| A60 | Exclusive selection coordination | Choice controls                        | Alias             | [Qt D04](qt/openui_schema_proposal.md)                                                                                             |
| A61 | Constraint validation            | Behaviors (new scope)                  | Needs a new scope | [HTML P4](html5/scopes_proposal.md)                                                                                                |
| A62 | Focus management                 | Behaviors (new scope)                  | Needs a new scope | [HTML P5](html5/scopes_proposal.md)                                                                                                |

### 4.8 Presentation, Application, Pages and Widgets

| #   | Add               | Scope                   | Level              | Evidence                                                                  |
| --- | ----------------- | ----------------------- | ------------------ | ------------------------------------------------------------------------- |
| A63 | Backdrop          | Presentation            | Folder abstraction | [Angular Material AM-E12](angular-material/scopes_proposal.md)            |
| A64 | Blur              | Presentation            | Folder abstraction | [Qt](qt/taxonomy_mapping.md)                                              |
| A65 | Color tint        | Presentation            | Folder abstraction | [Qt](qt/taxonomy_mapping.md)                                              |
| A66 | Focus outline     | Presentation            | Folder abstraction | [Qt](qt/inventory/TAXONOMY_STRUCTURE_PROPOSAL.md#proposed-extension-tree) |
| A67 | Shell bar         | Application             | Grouped leaf       | [OpenUI5](openui5/scopes_proposal.md)                                     |
| A68 | Document metadata | Application (new scope) | Needs a new scope  | [HTML P1](html5/scopes_proposal.md)                                       |
| A69 | Object page       | Pages                   | Grouped leaf       | [OpenUI5](openui5/scopes_proposal.md)                                     |
| A70 | Planning calendar | Widgets                 | Grouped leaf       | [OpenUI5](openui5/scopes_proposal.md)                                     |

### Not added

- **Standalone** (OpenUI5 terminology proposal): it is the default, so it needs no label. Controlling element (A3) covers the exception.
- **Merge disposition** and **correspondence** labels stay survey vocabulary; they
  describe proposals, not the specification.
- **Notification-area presence** (Qt) waits on plan question Q9 (host integration).
- **Accessibility** and **Composition** folders (HTML P6, P7) wait on plan question Q13.
- **Resource declaration** (HTML P2) may merge into Document metadata.
- **Cards** (OpenUI5) is already covered by the existing Card alias; its placement is a
  structure decision, not a new term.

## Appendix A: Canonical-term rule

Approved (plan question Q5). Applied in order:

1. Keep an existing OpenUI term (glossary or taxonomy mapping).
2. Otherwise use the HTML or WAI-ARIA name. HTML is the only surveyed source that is a
   standard.
3. Otherwise use the term most surveyed frameworks share.
4. Otherwise use a neutral name for the purpose or outcome, as the Qt behavior labels do.

Framework class names, selectors and brands never become canonical terms; they stay as
aliases. The glossary should also note these conflicting framework meanings, which need
no term change: **Page** (OpenUI5 `sap.m.Page` is a container), **Control** (OpenUI5
`sap.ui.core.Control` is a generic base class), **Element** (HTML element) and **Grid**
(layout grid versus data grid).

## Decisions needed

| #   | Decision                                              | Status                                                                                                                                                                                               | Plan item            |
| --- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| 1   | Canonical-term rule (appendix A)                      | Approved                                                                                                                                                                                             | Q5, W1 task 8        |
| 2   | Glossary additions A1–A5                              | Approved                                                                                                                                                                                             | Q10, W1 task 8       |
| 3   | Term changes: C1–C6, R1–R11, D1–D2 and the kept terms | Partly decided. Approved: R1–R4, D1, keep Window. Revised, needs approval: C3–C6, R5–R11, D2, keep Stack, Toolbar and Dropdown. Open: C1, C2.                                                        | W1 task 9            |
| 4   | Added terms A6–A70                                    | Open. Twelve of them need a new scope, which the [structure change proposal](structure_change_proposal.md) does not add; they must be dropped, made aliases of existing scopes, or given new scopes. | W0 task 6, W1 task 8 |
