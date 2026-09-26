# Qt Widgets UI Component Survey Plan

## Objective

Create an abstract UI component catalog using the
[Qt Widgets documentation](https://doc.qt.io/qt-6/qtwidgets-index.html)
as the reference catalog. Describe components in framework-independent terms,
while retaining their exact Qt names and links to official sources.

This is a survey of user-facing UI components, not a code or API-member survey.

## Scope

- Cover UI components exposed through the public Qt Widgets API, such as buttons,
  menus, tabs, dialogs, and tables.
- Include containers and layout concepts that affect visible composition or
  interaction.
- Include meaningful component variants, interaction states, and nested contents.
- Use examples and related documentation as supporting evidence, rather than
  treating their code as survey objects.
- Record the Qt documentation version when conducting the
  survey. Distinguish typical appearance from platform- or style-specific
  appearance.

## Component description requirements

Each component description must address:

1. **Purpose:** What does it do, and when is it useful?
2. **Appearance:** What does it typically look like, including recognizable
   states?
3. **Contents:** What text, icons, controls, data, or child components can it
   contain?
4. **Behavior:** How does it respond to interaction, selection, focus, expansion,
   editing, or other state changes?

Use a framework-independent abstract object name. Preserve exact Qt names for
traceability. Explain user-visible behavior rather than implementation mechanics.

## Activity plan

1. **Identify UI components.** Review the Qt Widgets overview and linked official
   component documentation. Build an inventory within the scope above and record
   the documentation version.
2. **Develop the category hierarchy.** Organize components by user-facing purpose.
   Start with input, selection, information display, navigation, containers and
   layout, dialogs and windows, and data presentation. Refine these provisional
   categories as the inventory is researched.
3. **Research and classify each component.** Describe its purpose, appearance,
   contents, and behavior, including meaningful variants and states. Assign one
   primary category or subcategory, and use cross-references for other relevant
   categories. Distinguish documented facts from inferred classifications.
4. **Write the category files.** Save the researched information as Markdown under
   `spec/survey/qt/`. Create one file per category and subcategory using
   the structure below. Maintain one canonical full description per component.
5. **Create the index.** Document scope, version, terminology,
   category navigation, and any unresolved coverage gaps.
6. **Validate the collection.** Reconcile the component inventory with the category
   files. Check descriptive completeness, consistent terminology, duplicate
   primary assignments, source links, internal navigation, and Markdown
   formatting. Record uncertain classifications and unresolved gaps explicitly.

## Markdown organization

The survey index will be `spec/survey/qt/README.md`.

Each category file contains:

- A short category definition and inclusion criteria.
- A table of components assigned directly to the category.
- A separate table for each immediate subcategory, with a link to that
  subcategory's detailed file.
- Relevant research notes, uncertainties, and cross-references.

Subcategory tables in parent files provide concise summaries and links to the
canonical descriptions. They do not duplicate full descriptions. Leaf categories
need only their direct-component table.

All component tables use exactly these four columns:

| Object name in Qt | Abstract object name | Object description | Links to the sources |
|---|---|---|---|
| Exact Qt component name | Framework-independent component name | **Purpose:** What it does. **Appearance:** How it looks. **Contents:** What it contains. **Behavior:** How it responds and changes state. | Direct links to official documentation supporting the description. |

## Completion criteria

- Every identified in-scope component has a primary category or an explicitly
  documented unresolved classification.
- Every canonical component description addresses all four descriptive aspects,
  noting where an aspect does not apply.
- Every component entry includes its Qt name, abstract name, description, and
  supporting source links.
- Each category has the required direct-component and applicable subcategory
  tables, with working navigation to detailed descriptions.
- The index records the scope, documentation version,
  and any outstanding gaps; incomplete coverage is not presented as complete.
- Markdown formatting and links have been checked.

## Intended outcome

A researched, abstract UI component catalog suitable for comparing or designing
interfaces across frameworks.

## Completion status

The original survey steps 1–6 are complete. Steps 7–14 are also complete as proposal work; canonical integration remains a separate activity. The [catalog index](README.md) links to the 9 category and 27 subcategory documents. All 94 entries include purpose, appearance, contents, and behavior. The [validation results](VALIDATION.md) record coverage and document checks.

## Follow-up: behavior extraction and category revision

Status: steps 7–14 complete as proposal work; canonical integration is separate. This is a targeted revision of
the existing research and proposal, preserving the completed component survey.

### Classification model

Distinguish four aspects without assuming that each requires a separate scope leaf:

- **Component:** the UI object or surface, such as a dialog, content container,
  or scrollbar.
- **Behavior:** what happens to a target through an action, interaction, or state
  transition, such as opening, modal interaction, or overflow scrolling.
- **Configuration and state:** settings and current conditions, such as modal
  mode, overflow policy, open/closed, and scroll position.
- **Appearance:** how the object or state is presented, such as a backdrop,
  frame, focus outline, or scrollbar styling.

Components retain their purpose, appearance, contents, and behavior summaries.
Reusable behavior definitions receive a primary home and are referenced by
applicable components. Configuration may enable a behavior; a state or visual
treatment alone is not automatically a behavior.

Also distinguish interaction triggers from the responses they initiate. Record
relationships as trigger/gesture or state condition → configured action/behavior
→ resulting state and feedback, with applicability and evidence. Swipe is a
gesture; hover is a state with entry/exit conditions. Neither specifies one
universal action. They can participate in different behaviors on different
targets, and a behavior can have multiple input paths.

### Required steps

7. **Audit the existing research for behaviors.** Review all 94 survey entries,
   including supporting concepts, and the 58 proposed taxonomy additions. Extract
   user-visible actions, transitions, constraints, and side effects across all
   categories, including gesture- and state-conditioned responses. Record each
   entry as reviewed, with findings or a justified no-additional-behavior result.
   Check the
   supporting public Qt documentation where the existing description does not
   establish a distinction. Record findings in `BEHAVIOR_INVENTORY.md`, with
   references back to the original component and source. Keep Qt API details as
   evidence rather than turning this into a method or property inventory.

8. **Separate mixed concepts.** Classify each extracted concept as component,
   behavior, configuration/state, or appearance; retain relationships between
   aspects rather than forcing a composite concept into one undifferentiated row.
   The following examples illustrate the general classification problem; they
   are neither an exhaustive list nor a limit on the audit:
   - Dialog: opening/closing, modal versus non-modal interaction, dismissal,
     focus entry/containment/restoration, and interaction blocking. Distinguish
     the opening action, modality configuration, open state, and optional
     backdrop; verify platform and modality-scope differences.
   - Overflow: content viewport, overflow policy, scrollability, scroll position,
     scroll input, scrollbar visibility, and kinetic scrolling. Distinguish
     scrolling from clipping; hiding a scrollbar does not necessarily disable
     scrolling, and overflow does not necessarily imply scrolling.
   - Swipe-related actions: separate the gesture from possible configured
     responses such as navigation, dismissal, revealing actions, or scrolling.
     Check direction, target, activation conditions, cancellation, conflicting
     gestures, and alternative input paths where supported; do not assume that
     every component supports swiping or that swiping always scrolls.
   - Hover-related actions: separate pointer-over state and entry/exit from
     responses such as a visual highlight, delayed help, or revealed controls.
     Distinguish presentation-only feedback from a behavior with an effect;
     record timing, exit/reversal, and keyboard or non-hover alternatives where
     applicable, without treating focus and hover as identical states.
   - Other candidates: resizing, collapsing, selection coordination, completion,
     dragging, docking, page switching, and workflow progression. Candidate
     status does not establish a new reusable behavior contract.

9. **Propose the behavior hierarchy.** Define categories and subcategories with
   inclusion rules and clear boundaries. Begin with visibility/lifecycle,
   interaction constraints and focus, viewport movement, selection and entry
   assistance, geometry manipulation, and workflow progression; refine or merge
   these provisional groups from the evidence. Reuse existing Behaviors and
   Interaction concepts. Explain which findings are shared notions, component
   actions, or candidates for independent behavior leaves. Record the result in
   `BEHAVIOR_TAXONOMY_PROPOSAL.md`; revise the broader structure proposal only
   where necessary.

10. **Describe behavior contracts and applicability.** For each retained behavior,
    document its purpose, eligible targets, trigger, preconditions, observable
    transition/effect, configuration and state dependencies, termination or
    reversal, relevant outputs, and accessibility expectations. Mark unsupported
    details and proposed neutral decisions explicitly. Build
    `COMPONENT_BEHAVIOR_MATRIX.md`, identifying whether behavior is intrinsic,
    optional/configured, externally supplied, or unsupported/unresolved for each
    relevant component. Record trigger-to-response relationships without turning
    each gesture/action combination into a duplicate behavior. Include
    interactions such as modality with focus and
    overflow scrolling with keyboard access. Avoid claiming every behavior can
    attach to every component.

11. **Recalculate primary assignments and counts.** Revise only affected category
    and subcategory assignments. Preserve source traceability for all 94 original
    entries and 99 Qt names, even when one surveyed component yields several
    abstract behaviors. Record splits, merges, aliases, reclassifications, and
    unchanged assignments. Count original survey entries, distinct abstract
    components, reusable behaviors, configuration/state notions, appearance
    notions, categories, and subcategories separately. Recalculate the proposed
    additions instead of retaining 58 as a target; do not count references or
    multiple uses of one behavior as new definitions.

12. **Revise the taxonomy and scope proposals together.** Update
    `TAXONOMY_MAPPING.md`, `TAXONOMY_STRUCTURE_PROPOSAL.md`,
    `SCOPE_EXTENSION_PROPOSAL.md`, `PROPOSED_EVIDENCE.md`,
    `GENERIC_UI_TAXONOMY_DRAFT.md`, `TAXONOMY_MAPPING_DRAFT.md`, and
    `TAXONOMY_MERGE_REVIEW.md`. Reassess all four existing draft leaves,
    especially Scroll container and Text completion. Keep content ownership in
    component contracts and reference reusable behavior where justified. Use
    the shared scope template for any revised or additional candidate leaf;
    distinguish behavior concepts from the template's Uses, Produces, and Behaves
    attribute categories. Record evidence per proposed contract and preserve
    existing canonical meanings. These remain proposals for the future merge.

13. **Update the research navigation and status.** Revise affected category files,
    `01_COMPONENT_INVENTORY.md`, `02_CATEGORY_HIERARCHY.md`, and `README.md` to link
    components to the behavior definitions and explain revised totals. Preserve
    the historical component-survey baseline. Update validation reports to
    distinguish the completed original survey from the revised classification
    and proposed integration work.

14. **Validate and prepare the merge handoff.** Reconcile every original entry
    against the revised mapping, verify one primary definition per abstract
    concept, and check component-to-behavior references and applicability.
    Verify audit coverage across every category rather than using the examples
    as the completion checklist. Check that discovered gesture- and state-driven
    responses distinguish triggers, behaviors, configuration, resulting state,
    and presentation. Record unsupported or unresolved relationships explicitly.
    Validate source support, draft scope structure, table fields, links, anchors,
    and recalculated totals. Record results and unresolved decisions in
    `BEHAVIOR_VALIDATION.md`. Update the future merge sequence; canonical scope
    changes and catalog generation are a subsequent integration activity.

### Follow-up document organization

Save the new inventory, taxonomy proposal, applicability matrix, and validation
report alongside this plan in `spec/survey/qt/`. Save behavior category and
subcategory descriptions under `behaviors/`, with an index, direct-object tables,
and subcategory tables following the existing category-document convention.

Behavior catalog tables retain the four survey fields: Object name in Qt,
Abstract object name, Object description, and Links to the sources. When a
behavior has no standalone Qt class, identify the supporting public component(s)
in the first field and explain that relationship; do not invent a Qt object name.
Use the description for the behavior contract and its visible manifestation or
nonvisual nature. The applicability matrix and classification ledger may use
columns appropriate to those relationships rather than duplicating catalog rows.

### Follow-up completion criteria

- All original survey entries remain traceable; extracted concepts have explicit
  classification and one primary definition or a documented unresolved decision.
- Every original entry has a recorded behavior-review outcome; completion is
  measured by systematic coverage, not by handling a fixed set of examples.
- Retained behaviors have sourced descriptions, component applicability, and
  separate trigger, configuration/state, and appearance relationships. Gesture
  or state names alone are not treated as complete behavior definitions.
- A justified behavior hierarchy exists, with reuse of existing scopes and a
  reason for each proposed new leaf.
- Components reference shared behaviors while retaining meaningful local
  descriptions and noting optional or application-provided capabilities.
- Counts are reconciled by concept kind, with a record of changes from the
  original survey and previous taxonomy drafts.
- All affected proposals, evidence, navigation, and validation reports agree;
  completing the revision is not presented as completing the canonical merge.

## Steps 7–9 results

- [Behavior inventory](BEHAVIOR_INVENTORY.md): reviewed all 94 original entries.
- [Proposed-term classification](BEHAVIOR_TERM_CLASSIFICATION.md): reviewed all 58 additions.
- [Interaction separation](INTERACTION_SEPARATION.md): triggers, responses, state and appearance with evidence limits.
- [Behavior hierarchy](BEHAVIOR_TAXONOMY_PROPOSAL.md): 40 response concepts in 8 categories and 21 subcategories.
- [Audit validation](BEHAVIOR_AUDIT_VALIDATION.md): historical audit coverage and document checks; final results are linked below.

## Steps 10–14 results

- Step 10: [40 contracts](BEHAVIOR_CONTRACTS.md), [applicability matrix](COMPONENT_BEHAVIOR_MATRIX.md), and [proposal decisions](BEHAVIOR_DECISIONS.md).
- Step 11: [classification and counts](CLASSIFICATION_RECONCILIATION.md), with all original entries preserved and concepts counted separately.
- Step 12: synchronized taxonomy/mapping drafts, [six scope drafts](SCOPE_EXTENSION_PROPOSAL.md), and [evidence](PROPOSED_EVIDENCE.md).
- Step 13: updated source-category behavior references, inventory/hierarchy navigation, README and report status.
- Step 14: [final validation](BEHAVIOR_VALIDATION.md) and [canonical merge handoff](MERGE_HANDOFF.md).
