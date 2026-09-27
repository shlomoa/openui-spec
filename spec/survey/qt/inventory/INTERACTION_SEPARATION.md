# Interaction separation — step 8 findings

This document separates triggers, responses, configuration/state and presentation. Examples illustrate the audit method; coverage is established by all 94 original entries and 58 proposed terms, not by this example list.

## Relationship model

**Target + trigger or state condition + applicable policy → action/constraint → resulting state/output → visual or other feedback.** A constraint may remain active rather than occur as a single event. A programmatic request or timer can trigger behavior; behavior is not limited to pointer interaction.

Current state is not an action; changing that state can be one. A gesture specifies input, not its meaning. Appearance can change without introducing a reusable behavior. Application-provided response must remain distinguished from a component's configured capability.

| Situation | Component or context | Trigger/condition | Response | Configuration/state | Presentation | Finding |
|---|---|---|---|---|---|---|
| Open modally | Dialog and affected interaction scope | Open request | Show surface; enforce input restriction (B01/B04). | Modal scope and open state. | Dialog frame; backdrop only if provided. | Qt distinguishes window/application restriction; modality is not synchronous execution. Focus obligations are separate. |
| Modal focus | Web modal interaction | Open, traverse, close | Enter, contain and return focus (B05/B06). | Focus target and return policy. | Focus indication. | WAI-ARIA pattern is web evidence, not a claim that every Qt dialog implements the same contract. |
| Overflow | Content viewport plus controls | User scrolling or target-reveal request | Move the viewport (B21/B23). | Content extent, offset and bar policy. | Clip edge, track/thumb. | Excess content alone does not prove scrollability; hidden bars do not prove scrolling is disabled. |
| Flick continuation | Scrollable target | Configured motion and release | Continue/decelerate/interrupt motion (B22). | Velocity, range and motion settings. | Moving contents. | Keep momentum separate from trigger recognition; it is not a synonym for Swipe. |
| Swipe to another item | Application-subscribed gesture target | Recognized completed swipe with direction | Application-defined next/previous content action (B18). | Gesture acceptance, direction and current content. | Changed content/optional transition. | Qt's gesture guide illustrates image navigation. It does not make tab switching a default on every component. |
| Swipe to dismiss or reveal actions | Potential application target | Swipe under an application rule | Possible dismissal/disclosure (B01/B02). | Direction, thresholds, conflicts and permitted action. | Revealed controls or retired content. | Illustrative candidate only; not established as a built-in behavior of the 94 surveyed entries. |
| Hover highlight | Pointer-sensitive control | Pointer enters/leaves target | No additional semantic response required. | Hover state; styling rules. | Border/color change. | Presentation-only response is not automatically a new behavior leaf. |
| Hover-related help | Control with help text | Relevant tooltip request/condition | Disclose and retire help (B02/B35). | Target, duration, visibility. | Tooltip content. | Hover state differs from help action; focus/non-hover alternatives require explicit design. |
| Hover reveals actionable controls | Application-defined target | Hover entry/exit under policy | Potential disclosure (B02). | Delay, exit conditions and permission. | Extra controls. | No universal reveal-on-hover behavior was established by the survey; keep application-defined. |
| Checkable group | Labelled group and children | Group toggle | Change checked value and enforce child availability (B08/B07). | Checked/enabled state. | Check indicator/disabled styling. | Does not establish collapse, exclusive selection, or hidden content. |
| Slider drag | Value control | Handle drag | Adjust value (B15). | Range, tracking and current value. | Thumb position. | Drag is not always move/reorder or drag-and-drop. |
| Splitter drag | Adjacent panes and divider | Handle drag | Resize panes (B24). | Size constraints and update mode. | Live content or temporary outline. | The divider is an affordance, and the outline is feedback. |
| Region drag | Configured scene viewport | Drag defining a selection area | Select eligible targets (B11). | Selection mode and selected set. | Rubber band. | QRubberBand alone is only a drawn boundary. |
| Sort header | Collection and header | Configured activation | Reorder records (B38) if connected/enabled. | Sort policy and direction. | Arrow. | The arrow is not proof that sorting occurs. |
| Progress cancellation | Operation dialog and application work | Cancel action | Request cancellation (B34). | Request/result and operation status. | Progress message/dialog. | The application must stop the operation; UI dismissal is not proof of stopping. |
| Transparent target | Existing visual content | Opacity change | Rendering update only in this evidence. | Opacity value. | Faded content. | No implicit hiding, disabling or pointer pass-through. |

## Supplemental source checks

The existing researched catalog supplies the primary examples for the inventory. These targeted checks address gaps in that material. Public event/gesture pages are supporting evidence only; they add no new surveyed UI components or API-member inventory.

| Source | Verified distinction | Limit |
|---|---|---|
| [QDialog](https://doc.qt.io/qt-6/qdialog.html#details) | Modal restriction, modeless use and completion results. | Native input restriction is not a complete web focus/accessibility contract. |
| [QAbstractScrollArea](https://doc.qt.io/qt-6/qabstractscrollarea.html#details), [QScrollArea](https://doc.qt.io/qt-6/qscrollarea.html#ensureWidgetVisible) | Viewport/bar policy and exposing a target by scrolling. | Not every container automatically scrolls. |
| [QScroller](https://doc.qt.io/qt-6/qscroller.html#details) | Kinetic continuation, stopping and configured input. | Does not establish a universal swipe response. |
| [Qt gesture overview](https://doc.qt.io/qt-6/gestures-overview.html), [QSwipeGesture](https://doc.qt.io/qt-6/qswipegesture.html#details) | Recognized gestures can be accepted/ignored; application handling chooses the action. Directional swipe example changes images. | Dismissal/reveal actions remain illustrative, not verified built-in capabilities of the surveyed components. |
| [QHoverEvent](https://doc.qt.io/qt-6/qhoverevent.html#details), [QToolTip](https://doc.qt.io/qt-6/qtooltip.html#details) | Pointer conditions differ from displaying/retiring explanatory content. | No assertion that hover equals focus or provides a non-pointer alternative automatically. |
| [QAbstractItemView](https://doc.qt.io/qt-6/qabstractitemview.html#selectionMode-prop), [QGraphicsItem](https://doc.qt.io/qt-6/qgraphicsitem.html#GraphicsItemFlag-enum) | Selection, editing, movement and transfer are configurable capabilities. | Rendering a primitive does not supply geometry-editing tools. |
| [WAI-ARIA modal-dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Focus entry, contained traversal and appropriate return on close. | External web design pattern; proposed neutral requirements need approval in the future evidence merge. |

## Contract questions resolved by the proposal

1. Define eligible modality targets and nested-scope behavior; decide whether focus containment is part of modality or separately reusable.
2. Define scrolling target references, clipping/visibility policy, kinetic refinement and conflicts among gestures or nested scroll regions.
3. Preserve configuration-dependent selection/editing and application-defined gesture actions in the applicability matrix; no blanket capability from inheritance or a source name.
4. Select semantics for tentative/live changes and cancellation, including whether an application commits or rolls back side effects.
5. Validate accessibility alternatives for the selected interaction patterns during contract work. Do not claim native Qt evidence establishes web conformance.

D01–D09 in [the decision register](BEHAVIOR_DECISIONS.md) resolve these questions at proposal level. [Contracts](BEHAVIOR_CONTRACTS.md) and [applicability](COMPONENT_BEHAVIOR_MATRIX.md) record the resulting obligations and limits; target conformance remains future implementation work.
