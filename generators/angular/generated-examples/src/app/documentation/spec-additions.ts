/**
 * The nodes the spec examples show for the approved terms (plan W1 9.10), as
 * written in their `spec/examples` documents. Each node becomes one example on
 * the Examples tab of the component it belongs to.
 */
export type SpecAdditionPreview =
  | 'addition-tool-button'
  | 'addition-form-field'
  | 'addition-form-group'
  | 'addition-meter'
  | 'addition-progress-mode'
  | 'addition-contextual-help'
  | 'addition-startup-screen'
  | 'addition-progress-dialog'
  | 'addition-illustrated-message'
  | 'addition-tree-grid'
  | 'addition-menubar'
  | 'addition-column-browser'
  | 'addition-wizard'
  | 'addition-page-stack'
  | 'addition-menu-item'
  | 'addition-shell-bar'
  | 'addition-object-page'
  | 'addition-rich-text-editor'
  | 'addition-keyboard-shortcut-field'
  | 'addition-metadata-driven-field'
  | 'addition-suggestion-backed-combo-box'
  | 'addition-selection-mode'
  | 'addition-multi-select-combo-box'
  | 'addition-font-family-selector'
  | 'addition-range-slider'
  | 'addition-rotary-value-control'
  | 'addition-font-picker'
  | 'addition-folder-picker'
  | 'addition-calculated-output'
  | 'addition-geometric-shape'
  | 'addition-highlighted-text'
  | 'addition-exclusive-selection-coordination'
  | 'addition-date-field'
  | 'addition-time-field'
  | 'addition-token-collection'
  | 'addition-editable-chip-collection'
  | 'addition-file-upload'
  | 'addition-custom-graphics-surface'
  | 'addition-graphics-viewport'
  | 'addition-description-list'
  | 'addition-icon-collection'
  | 'addition-filter-bar'
  | 'addition-value-help'
  | 'addition-personalization-panel'
  | 'addition-planning-calendar'
  | 'addition-tree'
  | 'addition-date-and-time-field'
  | 'addition-captions'
  | 'addition-tile'
  | 'addition-labelled-group'
  | 'addition-checkable-group'
  | 'addition-disclosure'
  | 'addition-bar'
  | 'addition-scroll-container'
  | 'addition-splitter-handle'
  | 'addition-flexible-column-layout'
  | 'addition-hero-banner'
  | 'addition-modal-interaction'
  | 'addition-viewport-scrolling'
  | 'addition-scroll-lock'
  | 'addition-text-completion'
  | 'addition-constraint-validation'
  | 'addition-focus-management';

export interface SpecAddition {
  readonly item: string;
  readonly term: string;
  readonly preview: SpecAdditionPreview;
  readonly source: string;
  readonly node: SpecNode;
}

export interface SpecNode {
  readonly id: string;
  readonly type: string;
  readonly attrs?: Readonly<Record<string, string | null>>;
  readonly children?: readonly SpecNode[];
}

export const SPEC_ADDITIONS: readonly SpecAddition[] = [
  {
    item: 'action',
    term: 'Tool button',
    preview: 'addition-tool-button',
    source: 'spec/examples/Controls/action_controls.example.json',
    node: { id: 'toolButton', type: 'ActionControls' },
  },
  {
    item: 'form',
    term: 'Form field',
    preview: 'addition-form-field',
    source: 'spec/examples/Views/form.example.json',
    node: { id: 'formField', type: 'Form' },
  },
  {
    item: 'form',
    term: 'Form group',
    preview: 'addition-form-group',
    source: 'spec/examples/Views/form.example.json',
    node: { id: 'formGroup', type: 'Form' },
  },
  {
    item: 'feedback',
    term: 'Meter',
    preview: 'addition-meter',
    source: 'spec/examples/Controls/status_indicator.example.json',
    node: { id: 'meter', type: 'StatusIndicator' },
  },
  {
    item: 'feedback',
    term: 'Progress mode',
    preview: 'addition-progress-mode',
    source: 'spec/examples/Controls/status_indicator.example.json',
    node: { id: 'progressMode', type: 'StatusIndicator' },
  },
  {
    item: 'feedback',
    term: 'Contextual help',
    preview: 'addition-contextual-help',
    source: 'spec/examples/Widgets/feedback_widgets.example.json',
    node: { id: 'contextualHelp', type: 'FeedbackWidgets' },
  },
  {
    item: 'feedback',
    term: 'Startup screen',
    preview: 'addition-startup-screen',
    source: 'spec/examples/Widgets/feedback_widgets.example.json',
    node: { id: 'startupScreen', type: 'FeedbackWidgets' },
  },
  {
    item: 'feedback',
    term: 'Progress dialog',
    preview: 'addition-progress-dialog',
    source: 'spec/examples/Widgets/dialog.example.json',
    node: {
      id: 'progressDialog',
      type: 'Dialog',
      children: [
        {
          id: 'progressDialogContent',
          type: 'section',
          children: [{ id: 'progressDialogIndicator', type: 'StatusIndicator' }],
        },
      ],
    },
  },
  {
    item: 'feedback',
    term: 'Illustrated message',
    preview: 'addition-illustrated-message',
    source: 'spec/examples/Widgets/feedback_widgets.example.json',
    node: { id: 'illustratedMessage', type: 'FeedbackWidgets' },
  },
  {
    item: 'table',
    term: 'Tree grid',
    preview: 'addition-tree-grid',
    source: 'spec/examples/Widgets/data_grid.example.json',
    node: { id: 'treeGrid', type: 'DataGrid' },
  },
  {
    item: 'navigation-container',
    term: 'Menubar',
    preview: 'addition-menubar',
    source: 'spec/examples/Widgets/menu_widgets.example.json',
    node: { id: 'menubar', type: 'MenuWidgets' },
  },
  {
    item: 'navigation-container',
    term: 'Column browser',
    preview: 'addition-column-browser',
    source: 'spec/examples/Widgets/navigation_widgets.example.json',
    node: { id: 'columnBrowser', type: 'NavigationWidgets' },
  },
  {
    item: 'navigation-container',
    term: 'Wizard',
    preview: 'addition-wizard',
    source: 'spec/examples/Widgets/stepper.example.json',
    node: { id: 'wizard', type: 'Stepper', children: [{ id: 'wizardStep', type: 'step' }] },
  },
  {
    item: 'navigation-container',
    term: 'Page stack',
    preview: 'addition-page-stack',
    source: 'spec/examples/Containers/tabs.example.json',
    node: { id: 'pageStack', type: 'Tabs', children: [{ id: 'pageStackPage', type: 'tab' }] },
  },
  {
    item: 'navigation-container',
    term: 'Menu item',
    preview: 'addition-menu-item',
    source: 'spec/examples/Widgets/menu_widgets.example.json',
    node: { id: 'menuItem', type: 'MenuWidgets' },
  },
  {
    item: 'shell',
    term: 'Shell bar',
    preview: 'addition-shell-bar',
    source: 'spec/examples/Application/scope.example.json',
    node: { id: 'shellBar', type: 'Application' },
  },
  {
    item: 'page',
    term: 'Object page',
    preview: 'addition-object-page',
    source: 'spec/examples/Pages/scope.example.json',
    node: { id: 'objectPage', type: 'Pages' },
  },
  {
    item: 'controls',
    term: 'Rich text editor',
    preview: 'addition-rich-text-editor',
    source: 'spec/examples/Controls/text_inputs.example.json',
    node: { id: 'richTextEditor', type: 'TextInputs' },
  },
  {
    item: 'controls',
    term: 'Keyboard shortcut field',
    preview: 'addition-keyboard-shortcut-field',
    source: 'spec/examples/Controls/text_inputs.example.json',
    node: { id: 'keyboardShortcutField', type: 'TextInputs' },
  },
  {
    item: 'controls',
    term: 'Metadata-driven field',
    preview: 'addition-metadata-driven-field',
    source: 'spec/examples/Controls/text_inputs.example.json',
    node: { id: 'metadataDrivenField', type: 'TextInputs' },
  },
  {
    item: 'controls',
    term: 'Suggestion-backed combo box',
    preview: 'addition-suggestion-backed-combo-box',
    source: 'spec/examples/Controls/choice_controls.example.json',
    node: { id: 'suggestionBackedComboBox', type: 'ChoiceControls' },
  },
  {
    item: 'controls',
    term: 'Selection mode',
    preview: 'addition-selection-mode',
    source: 'spec/examples/Controls/choice_controls.example.json',
    node: { id: 'selectionMode', type: 'ChoiceControls' },
  },
  {
    item: 'controls',
    term: 'Multi-select combo box',
    preview: 'addition-multi-select-combo-box',
    source: 'spec/examples/Controls/choice_controls.example.json',
    node: { id: 'multiSelectComboBox', type: 'ChoiceControls' },
  },
  {
    item: 'controls',
    term: 'Font-family selector',
    preview: 'addition-font-family-selector',
    source: 'spec/examples/Controls/choice_controls.example.json',
    node: { id: 'fontFamilySelector', type: 'ChoiceControls' },
  },
  {
    item: 'controls',
    term: 'Range slider',
    preview: 'addition-range-slider',
    source: 'spec/examples/Controls/range_control.example.json',
    node: { id: 'rangeSlider', type: 'RangeControl' },
  },
  {
    item: 'controls',
    term: 'Rotary value control',
    preview: 'addition-rotary-value-control',
    source: 'spec/examples/Controls/range_control.example.json',
    node: { id: 'rotaryValueControl', type: 'RangeControl' },
  },
  {
    item: 'controls',
    term: 'Font picker',
    preview: 'addition-font-picker',
    source: 'spec/examples/Controls/picker_control.example.json',
    node: { id: 'fontPicker', type: 'PickerControl' },
  },
  {
    item: 'controls',
    term: 'Folder picker',
    preview: 'addition-folder-picker',
    source: 'spec/examples/Controls/picker_control.example.json',
    node: { id: 'folderPicker', type: 'PickerControl' },
  },
  {
    item: 'controls',
    term: 'Calculated output',
    preview: 'addition-calculated-output',
    source: 'spec/examples/Controls/display_primitives.example.json',
    node: { id: 'calculatedOutput', type: 'DisplayPrimitives' },
  },
  {
    item: 'controls',
    term: 'Geometric shape',
    preview: 'addition-geometric-shape',
    source: 'spec/examples/Controls/display_primitives.example.json',
    node: { id: 'geometricShape', type: 'DisplayPrimitives' },
  },
  {
    item: 'controls',
    term: 'Highlighted text',
    preview: 'addition-highlighted-text',
    source: 'spec/examples/Controls/display_primitives.example.json',
    node: { id: 'highlightedText', type: 'DisplayPrimitives' },
  },
  {
    item: 'controls',
    term: 'Exclusive selection coordination',
    preview: 'addition-exclusive-selection-coordination',
    source: 'spec/examples/Controls/choice_controls.example.json',
    node: { id: 'exclusiveSelectionCoordination', type: 'ChoiceControls' },
  },
  {
    item: 'widgets',
    term: 'Date field',
    preview: 'addition-date-field',
    source: 'spec/examples/Widgets/date_time_pickers.example.json',
    node: { id: 'dateField', type: 'DateTimePicker' },
  },
  {
    item: 'widgets',
    term: 'Time field',
    preview: 'addition-time-field',
    source: 'spec/examples/Widgets/date_time_pickers.example.json',
    node: { id: 'timeField', type: 'DateTimePicker' },
  },
  {
    item: 'widgets',
    term: 'Token collection',
    preview: 'addition-token-collection',
    source: 'spec/examples/Widgets/list.example.json',
    node: { id: 'tokenCollection', type: 'List' },
  },
  {
    item: 'widgets',
    term: 'Editable chip collection',
    preview: 'addition-editable-chip-collection',
    source: 'spec/examples/Widgets/list.example.json',
    node: { id: 'editableChipCollection', type: 'List' },
  },
  {
    item: 'widgets',
    term: 'File upload',
    preview: 'addition-file-upload',
    source: 'spec/examples/Widgets/scope.example.json',
    node: { id: 'fileUpload', type: 'Widgets' },
  },
  {
    item: 'widgets',
    term: 'Custom graphics surface',
    preview: 'addition-custom-graphics-surface',
    source: 'spec/examples/Widgets/media_widgets.example.json',
    node: { id: 'customGraphicsSurface', type: 'MediaWidgets' },
  },
  {
    item: 'widgets',
    term: 'Graphics viewport',
    preview: 'addition-graphics-viewport',
    source: 'spec/examples/Widgets/media_widgets.example.json',
    node: { id: 'graphicsViewport', type: 'MediaWidgets' },
  },
  {
    item: 'widgets',
    term: 'Description list',
    preview: 'addition-description-list',
    source: 'spec/examples/Widgets/list.example.json',
    node: { id: 'descriptionList', type: 'List' },
  },
  {
    item: 'widgets',
    term: 'Icon collection',
    preview: 'addition-icon-collection',
    source: 'spec/examples/Widgets/list.example.json',
    node: { id: 'iconCollection', type: 'List' },
  },
  {
    item: 'widgets',
    term: 'Filter bar',
    preview: 'addition-filter-bar',
    source: 'spec/examples/Widgets/scope.example.json',
    node: { id: 'filterBar', type: 'Widgets' },
  },
  {
    item: 'widgets',
    term: 'Value help',
    preview: 'addition-value-help',
    source: 'spec/examples/Widgets/scope.example.json',
    node: { id: 'valueHelp', type: 'Widgets' },
  },
  {
    item: 'widgets',
    term: 'Personalization panel',
    preview: 'addition-personalization-panel',
    source: 'spec/examples/Widgets/scope.example.json',
    node: { id: 'personalizationPanel', type: 'Widgets' },
  },
  {
    item: 'widgets',
    term: 'Planning calendar',
    preview: 'addition-planning-calendar',
    source: 'spec/examples/Widgets/scope.example.json',
    node: { id: 'planningCalendar', type: 'Widgets' },
  },
  {
    item: 'widgets',
    term: 'Tree',
    preview: 'addition-tree',
    source: 'spec/examples/Widgets/list.example.json',
    node: { id: 'tree', type: 'List' },
  },
  {
    item: 'widgets',
    term: 'Date and time field',
    preview: 'addition-date-and-time-field',
    source: 'spec/examples/Widgets/date_time_pickers.example.json',
    node: { id: 'dateAndTimeField', type: 'DateTimePicker' },
  },
  {
    item: 'widgets',
    term: 'Captions',
    preview: 'addition-captions',
    source: 'spec/examples/Widgets/media_widgets.example.json',
    node: { id: 'captions', type: 'MediaWidgets' },
  },
  {
    item: 'containers',
    term: 'Tile',
    preview: 'addition-tile',
    source: 'spec/examples/Containers/surface_containers.example.json',
    node: { id: 'tile', type: 'SurfaceContainers' },
  },
  {
    item: 'containers',
    term: 'Labelled group',
    preview: 'addition-labelled-group',
    source: 'spec/examples/Containers/surface_containers.example.json',
    node: { id: 'labelledGroup', type: 'SurfaceContainers' },
  },
  {
    item: 'containers',
    term: 'Checkable group',
    preview: 'addition-checkable-group',
    source: 'spec/examples/Containers/surface_containers.example.json',
    node: { id: 'checkableGroup', type: 'SurfaceContainers' },
  },
  {
    item: 'containers',
    term: 'Disclosure',
    preview: 'addition-disclosure',
    source: 'spec/examples/Containers/expandable_panels.example.json',
    node: {
      id: 'disclosure',
      type: 'ExpandablePanels',
      children: [{ id: 'disclosureSummary', type: 'summary' }],
    },
  },
  {
    item: 'containers',
    term: 'Bar',
    preview: 'addition-bar',
    source: 'spec/examples/Containers/structural_containers.example.json',
    node: { id: 'bar', type: 'StructuralContainers' },
  },
  {
    item: 'containers',
    term: 'Scroll container',
    preview: 'addition-scroll-container',
    source: 'spec/examples/Containers/structural_containers.example.json',
    node: { id: 'scrollContainer', type: 'StructuralContainers' },
  },
  {
    item: 'containers',
    term: 'Splitter handle',
    preview: 'addition-splitter-handle',
    source: 'spec/examples/Containers/splitters.example.json',
    node: {
      id: 'splitterHandle',
      type: 'Splitters',
      children: [{ id: 'splitterHandlePane', type: 'section' }],
    },
  },
  {
    item: 'containers',
    term: 'Flexible column layout',
    preview: 'addition-flexible-column-layout',
    source: 'spec/examples/Containers/scope.example.json',
    node: { id: 'flexibleColumnLayout', type: 'Containers' },
  },
  {
    item: 'containers',
    term: 'Hero banner',
    preview: 'addition-hero-banner',
    source: 'spec/examples/Containers/surface_containers.example.json',
    node: { id: 'heroBanner', type: 'SurfaceContainers' },
  },
  {
    item: 'behaviors',
    term: 'Modal interaction',
    preview: 'addition-modal-interaction',
    source: 'spec/examples/Behaviors/modal_overlay.example.json',
    node: {
      id: 'modalInteraction',
      type: 'ModalOverlay',
      attrs: { 'uses.target': '"confirmDeleteDialog"' },
    },
  },
  {
    item: 'behaviors',
    term: 'Viewport scrolling',
    preview: 'addition-viewport-scrolling',
    source: 'spec/examples/Behaviors/viewport_and_focus_control.example.json',
    node: {
      id: 'viewportScrolling',
      type: 'ViewportAndFocusControl',
      attrs: { 'uses.target': '"messageLog"' },
    },
  },
  {
    item: 'behaviors',
    term: 'Scroll lock',
    preview: 'addition-scroll-lock',
    source: 'spec/examples/Behaviors/viewport_and_focus_control.example.json',
    node: {
      id: 'scrollLock',
      type: 'ViewportAndFocusControl',
      attrs: { 'uses.target': '"messageLog"' },
    },
  },
  {
    item: 'behaviors',
    term: 'Text completion',
    preview: 'addition-text-completion',
    source: 'spec/examples/Behaviors/input_assistance.example.json',
    node: {
      id: 'textCompletion',
      type: 'InputAssistance',
      attrs: { 'uses.target': '"emailField"' },
    },
  },
  {
    item: 'behaviors',
    term: 'Constraint validation',
    preview: 'addition-constraint-validation',
    source: 'spec/examples/Behaviors/input_assistance.example.json',
    node: {
      id: 'constraintValidation',
      type: 'InputAssistance',
      attrs: { 'uses.target': '"emailField"' },
    },
  },
  {
    item: 'behaviors',
    term: 'Focus management',
    preview: 'addition-focus-management',
    source: 'spec/examples/Behaviors/viewport_and_focus_control.example.json',
    node: {
      id: 'focusManagement',
      type: 'ViewportAndFocusControl',
      attrs: { 'uses.target': '"messageLog"' },
    },
  },
];
