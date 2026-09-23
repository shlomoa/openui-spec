# Behavior taxonomy and final proposal disposition

Status: hierarchy, contracts and applicability complete for the proposal. Canonical taxonomy/scopes/catalog remain unchanged; the consolidated review drafts are synchronized.

## Proposed hierarchy

Keep the existing top-level Behaviors, Interaction, Layout and Presentation scope boundaries. Add a **Reusable behaviors** browsing group to the generic taxonomy's Interaction section; maintain cross-references from component categories. The research tree below includes component actions and shared notions as well as reusable candidates, so not every branch or entry becomes a canonical Behaviors folder or leaf.

```text
Behavior research
  Presence and disclosure
    Surface presence and transient disclosure: B01, B02
    Expansion and collapse: B03
  Interaction governance
    Modal interaction scope: B04
    Focus movement and containment: B05, B06
    Availability and editing restrictions: B07
  Selection coordination
    Choice state and exclusivity: B08, B09
    Collection and spatial selection: B10, B11
  Entry and value change
    Text editing and shortcut capture: B12, B13, B40
    Entry assistance: B14
    Value adjustment, validation and preview: B15, B16, B17
  Content navigation and viewports
    Content and location navigation: B18, B19, B20
    Viewport movement: B21, B22, B23
    Collection ordering and filtering: B38
  Geometry and workspace manipulation
    Interactive sizing: B24
    Movement and transfer: B25, B26
    Workspace placement and graphical transforms: B27, B28, B37, B39
  Commands and task progression
    Command activation: B29, B30
    Action history: B31
    Task completion and progression: B32, B33, B34
  Feedback delivery and suppression
    Message and help delivery: B35
    Repeated-message suppression: B36
```

The [category index](behaviors/README.md) defines inclusion by outcome, not by Qt inheritance or input device. Each of the 40 concepts has one primary home across 8 categories and 21 subcategories. Cross-references do not create additional concepts. The [reconciliation](CLASSIFICATION_RECONCILIATION.md) records the final counts and their distinct units.

## Primary assignment and boundaries

| Category | Inclusion | Keep separate |
|---|---|---|
| Presence and disclosure | Showing, retiring, expanding or collapsing content. | Visible/open state, geometry and the component being exposed. |
| Interaction governance | Which interaction is allowed and where focus may move. | Dimmed appearance, disabled styling, event-loop blocking and a generic event name. |
| Selection coordination | Changes to values or selected sets. | Current item, focus, selection highlight and command execution. |
| Entry and value change | Capturing, editing, assisting and checking input. | Stored value, format, allowed range and input-field appearance. |
| Content navigation and viewports | Changing explored content, position, order or eligible records. | Scrollbar component, clipping rule, sort arrow, route definitions and gesture recognition. |
| Geometry and workspace manipulation | User/application actions that change placement, size or grouping. | Automatic Layout constraint resolution; static scene composition; native backend APIs. |
| Commands and task progression | Invoking actions, traversing history and finishing/progressing tasks. | The button surface, trigger event, result data and cancellation actually completing. |
| Feedback delivery and suppression | Showing contextual messages or preventing repeats. | Passive data rendering and appearance-only updates. Timed visibility reuses disclosure. |


## Final proposal disposition

See [all 40 mappings](BEHAVIOR_SCOPE_MAPPING.md). P05 combines B04/B06; P06 combines B21/B22/B23; P03 supplies B14. Reuse Collapsible, Resizable and Drag and drop. Keep exclusivity, spatial selection and content switching in their chosen existing/proposed components. Other actions enrich component or folder contracts.

No separate Swipe, Hover, focus-frame, rubber-band, layout-reflow, kinetic-only or focus-only leaf is proposed. The eight research categories do not become eight new canonical folders.

## Completed handoff

[Contracts](BEHAVIOR_CONTRACTS.md), [matrix](COMPONENT_BEHAVIOR_MATRIX.md), [decisions](BEHAVIOR_DECISIONS.md), [reconciled counts](CLASSIFICATION_RECONCILIATION.md), and [validation](BEHAVIOR_VALIDATION.md) complete steps 10–14. [MERGE_HANDOFF.md](MERGE_HANDOFF.md) records the separate canonical integration sequence.
