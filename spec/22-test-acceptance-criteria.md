# 22. Test & Acceptance Criteria

**Purpose:** Describe how the specification should be verified.

**Derived from traversal nodes:** `compliance-tests`, `api-json-projection`, `reference-component-button`

## Specification

- Every public metadata contract must be verifiable by automated tests that exercise properties, aggregations, associations, events, default values, visibility, and rendering-facing semantics.
- Acceptance criteria must be traceable to the specification section, tag, formal definition, example, or reference model that introduced the behavior.
- Acceptance criteria must define observable pass/fail conditions for unit behavior, generated API shape, visual states, accessibility semantics, keyboard and pointer interaction, data binding, navigation, internationalization, security, performance, and responsive or theme-sensitive presentation.
- Machine-readable projections such as `api.json` must remain consistent with runtime metadata, documentation, generated examples, and recorded evidence artifacts.
- Conformance suites must separate normative failures from implementation notes, optional capabilities, and documented non-goals so optional features do not become accidental requirements.
- Test fixtures must be deterministic, minimal, and reusable across generators so the same contract can validate source metadata, normalized `/openui.json`, generated code, and runtime output.
- Evidence for a passing implementation must include automated test results and, where behavior is visual or assistive-technology-facing, a stable artifact such as a screenshot, accessibility-tree assertion, or rendered DOM snapshot.

## Non-goals

- The test and acceptance criteria do not prescribe a specific test runner, browser automation framework, visual-diff service, or continuous-integration provider.
- The section does not require implementations to expose private renderer internals or non-public metadata solely to make tests easier to write.
- The section does not turn examples, implementation notes, or optional capabilities into mandatory conformance points unless another section marks them normative.
- The section does not replace accessibility, security, internationalization, performance, or compliance rules; it defines how their observable requirements are verified.

## Tags

- `acceptance-criterion` — a testable rule with explicit setup, action, expected result, and traceability to a normative specification source.
- `conformance-suite` — the collection of automated checks that decides whether an implementation satisfies the specification contract.
- `metadata-projection-test` — a check that compares source runtime metadata with normalized `/openui.json` and generated API projections.
- `runtime-behavior-test` — a check that exercises observable behavior such as events, state transitions, validation, navigation, or data binding.
- `visual-accessibility-evidence` — a stable artifact or assertion that proves visual, responsive, theme, keyboard, and assistive-technology-facing behavior.
- `traceability-matrix` — a mapping from specification requirements and tags to tests and evidence artifacts that cover them.

## Formal definitions

- **Acceptance criterion** — a verifiable statement that names a normative requirement, defines the setup and action, and states the observable condition for passing.
- **Conformance suite** — the implementation-independent group of tests and evidence checks used to decide whether a library, generator, or application output complies with the specification.
- **Test fixture** — a minimal representative metadata entry, application structure, generated component, or rendered page used as the input to one or more acceptance criteria.
- **Metadata projection** — the normalized machine-readable representation, such as `/openui.json` or `api.json`, produced from runtime metadata and used by generators and documentation.
- **Evidence artifact** — durable output from a validation run, such as a test report, screenshot, DOM snapshot, accessibility assertion, or generated source excerpt.
- **Traceability matrix** — a table or structured object that links each requirement, tag, formal definition, and example to the tests and evidence that verify it.

## Usage and implementation guidance

- Write acceptance criteria in implementation-independent language: identify the contract under test, the observable action or projection, and the pass/fail assertion without depending on private renderer state.
- Maintain a traceability matrix from `/openui.json` section IDs and tag names to test IDs so reviewers can identify which requirements are covered and which remain unverified.
- Validate metadata projections before generated output: schema and projection tests should fail fast when properties, aggregations, associations, events, default values, or visibility are missing or renamed.
- Cover runtime behavior with focused fixtures that exercise enabled and disabled states, value changes, validation feedback, navigation transitions, binding updates, keyboard activation, pointer activation, and responsive reflow.
- Record visual and accessibility evidence only for observable outcomes whose correctness cannot be fully represented by metadata, such as focus order, accessible naming, density, theme tokens, and breakpoint-specific layout.
- Treat optional capabilities as conditional criteria: if a component declares `dnd`, `renderer`, `designtime`, overlay, or routing metadata, test the declared behavior; if it does not, assert that consumers do not depend on it.
- Keep generated examples and documentation synchronized with the same fixtures that drive tests so examples demonstrate behavior that the conformance suite can verify.
- Store enough evidence with each run to reproduce a failure, including the fixture identifier, spec section, generated artifact path, assertion name, and expected versus actual result.

## Implementation notes

- Extractors should emit stable identifiers for requirements, tags, fixtures, and evidence artifacts so downstream generators can keep their tests linked to the source specification.
- Generators should create host-framework tests from metadata projections instead of hand-coding assumptions about component names, event payloads, or default values.
- Visual and accessibility checks should run against deterministic fixtures with controlled data, viewport, density, locale, and theme settings.
- Compliance reports should distinguish failed normative criteria from skipped optional criteria and should include links to generated examples or screenshots when applicable.

## Examples

The following examples show how acceptance criteria can exercise specification additions in a concrete, implementation-independent way.

### Example 1 — UI concept model acceptance test

Given a normalized specification entry for a library that publishes `Page`, `Dialog`, and `Form` controls together with `FormContainer` and `FormElement` elements:

- verify that the published symbols are classified as controls or elements in the library catalog;
- verify that `content`, `header`, `footer`, `beginButton`, and similar owned child regions are represented as aggregations with declared multiplicity and child types;
- verify that semantic references such as `ariaLabelledBy`, `ariaDescribedBy`, and form labels are represented as associations instead of owned aggregations;
- verify that higher-level concepts such as dialogs and forms are described as specialized controls and elements composed through metadata, not as renderer-specific primitives.

### Example 2 — application structure acceptance test

Given a normalized application entry that declares its library dependencies and a root `Shell` control hosting `Page` and `SplitContainer` containers:

- verify that every component referenced by the application structure resolves to a public control or element published by a declared library dependency;
- verify that the shell exposes global navigation and owned pages through aggregations such as `navigation`, `header`, and `pages`;
- verify that non-owning references such as `currentPage` are represented as associations instead of owned aggregations;
- verify that the page hierarchy, including nested `subPages` and split-container master and detail pages, is resolvable from public metadata without reading component internals.

### Example 3 — layout system acceptance test

Given a normalized specification entry for a `Page`, `Grid`, `Form`, and `Board` layout contract:

- verify that named regions such as `header`, `content`, and `footer` are represented as aggregations with declared multiplicity and child types;
- verify that ordered `0..n` regions preserve their declared document order as the normative visual order before responsive adaptation;
- verify that responsive breakpoints change region arrangement without adding, removing, or reparenting owned content;
- verify that density and spacing values are drawn from a shared, theme-driven scale instead of ad-hoc per-component measurements;
- verify that drag-and-drop is present only where a container declares `dnd` metadata and stays within the target aggregation's child type and multiplicity.

### Example 4 — component model acceptance test

Given a normalized specification entry for a `Button`, `Panel`, `Input`, and `Card` component contract:

- verify that each component exposes a stable identity through a `component` identifier and owning `library`;
- verify that properties declare a `type` and, where applicable, a `defaultValue` and `bindable` flag;
- verify that aggregations declare a child `type` and a multiplicity through `multiple: true` (`0..n`) or `multiple: false` (`0..1`);
- verify that associations such as `ariaLabelledBy` and `ariaDescribedBy` remain non-owning references instead of aggregations;
- verify that events such as `change` and `liveChange` declare typed `parameters`;
- verify that `renderer`, `designtime`, and `dnd` metadata remain optional capability hints and do not replace the property, aggregation, association, and event contract.

### Example 5 — traceability matrix for acceptance coverage

```json
{
  "specSection": "22-test-acceptance-criteria",
  "criteria": [
    {
      "id": "AC-METADATA-PROJECTION",
      "covers": [
        "08-component-model#property-contract",
        "08-component-model#aggregation-contract",
        "08-component-model#association-contract",
        "08-component-model#event-contract"
      ],
      "fixture": "reference-component-button",
      "evidence": [
        "tests/component-metadata.spec.ts",
        "openui.json#/specification/referenceModels/referenceComponent"
      ]
    },
    {
      "id": "AC-ACCESSIBLE-VISUAL-STATE",
      "covers": [
        "15-accessibility-model#accessible-name",
        "16-theming-design-tokens#theme-token-consumption"
      ],
      "fixture": "generated-accessible-field",
      "evidence": [
        "screenshots/accessible-field.png",
        "tests/accessibility-tree.spec.ts"
      ]
    }
  ]
}
```

A traceability matrix records which tests and evidence cover each normative tag or requirement. A criterion passes only when every referenced fixture can be generated, executed, and linked back to the specification source.

### Example 6 — metadata projection consistency criterion

```json
{
  "id": "AC-BUTTON-PROJECTION",
  "given": "runtime metadata for sap.m.Button",
  "when": "the extractor writes /openui.json and api.json",
  "then": [
    "publicProperties includes text, type, width, enabled, icon, and ariaHasPopup",
    "publicAssociations includes ariaDescribedBy and ariaLabelledBy",
    "publicEvents includes press and deprecated aliases remain marked separately",
    "generated API signatures use the same names, types, defaults, and event parameters"
  ]
}
```

Projection criteria compare the source metadata, normalized `/openui.json`, and generated API output. A mismatch in names, default values, visibility, multiplicity, association ownership, or event payloads is a normative failure because consumers would receive different contracts from different artifacts.

### Example 7 — visual and accessibility evidence criterion

```json
{
  "id": "AC-FORM-A11Y-VISUAL",
  "fixture": "generated-order-form",
  "viewport": "600x800",
  "theme": "default-light",
  "locale": "en",
  "assertions": [
    "the required input has an accessible name from its visible label",
    "the validation message is associated with the input description",
    "keyboard tab order follows the form element order",
    "the submit action remains disabled while the form is invalid",
    "the screenshot matches the approved layout density and value-state presentation"
  ]
}
```

Visual and accessibility criteria combine DOM assertions, accessibility-tree checks, keyboard traversal, and screenshot evidence. The fixture must control viewport, theme, density, data, and locale so failures identify a contract change rather than environment drift.

## JSON Mapping

- `specification.sections[21]` in `/openui.json`
