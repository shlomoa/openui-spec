# Angular Material Survey Plan

## Objective

Survey [Angular Material](https://material.angular.dev/components/categories)
and classify each in-scope library, folder, and file into a category or
subcategory. Save the researched information in Markdown files, one per category,
with traceable sources and technology-independent object names.

## Agreed scope

The accepted POC, fixed baseline, and instruction to execute Steps 3–5 establish
an upstream Angular Material survey. Include every tracked file and folder under
`src/material/` at the recorded commit and every published export declaration of
`@angular/material` 22.1.7. CDK dependencies remain contextual references rather
than Material objects. The [inventory](INVENTORY.md) records counting rules,
source hashes, and explicit exclusions.

## Progress

- Step 1 completed: [POC report](POC_REPORT.md).
- Step 2 completed: [source baseline](BASELINE.md).
- Step 3 completed: [complete inventory](INVENTORY.md).
- Step 4 completed: [category hierarchy](TAXONOMY.md).
- Step 5 completed: [research findings](RESEARCH_NOTES.md) and the category files
  linked from the [survey index](README.md).
- Step 6 completed: [consolidated collection](README.md).
- Step 7 completed: [final verification report](FINAL_REPORT.md).
- Steps 1–7 are complete for the agreed file/folder/export scope.
  The two upstream export-target discrepancies remain documented findings.
- The [taxonomy crosswalk](TAXONOMY_MAPPING.md) and
  [scope extension proposal](SCOPE_EXTENSION_PROPOSAL.md) record the subsequent
  object-oriented mapping. They do not establish complete behavior coverage.
- Step 8 completed: [reusable capability inventory](BEHAVIORS.survey.md) and
  [research checks](BEHAVIOR_RESEARCH_CHECKS.md), covering all 39 family subcategories.
- Step 9 completed: [behavior capability mapping](BEHAVIOR_MAPPING.md), including
  all 40 observations, 39 family dispositions and structural alternatives.
- Step 10 completed: [revised scope extension proposal](SCOPE_EXTENSION_PROPOSAL.md),
  five new leaf candidates and thirteen existing-leaf review drafts.
- Step 11 completed: [composition review and handoff](BEHAVIOR_REVIEW.md) and
  [proposal checks](PROPOSAL_CHECKS.md). Deferred contract decisions remain explicit;
  completion is not approval or a canonical merge.

## Execution plan

1. **Run a bounded proof of concept (POC).**
   - Resolve the scope decision above and record a documentation version and
     source commit for the sample before researching it.
   - Use one component family, provisionally Button, with at most 12 inventory
     objects: its package/library entry, component folder, one nested folder,
     and up to nine representative files. Include implementation, styling,
     testing, and documentation where available. Record exact selected paths
     and selection rationale before surveying; do not recursively expand into
     dependencies or the rest of the package.
   - If the agreed scope is local repository objects, choose an equivalently
     small sample mapped to that component family and record the exact paths.
   - Exercise the full workflow on this sample: inventory, category definitions,
     primary assignments, abstract names, descriptions, source links, Markdown
     output, and coverage validation.
   - Produce at least one category file with both a direct-object table and a
     populated subcategory table, using the required four columns. Choose
     meaningful assignments; document a sample adjustment if necessary rather
     than inventing a category to satisfy the layout.
   - Save all pilot outputs under `spec/survey/angular-material/` in `openui-spec`.
     Mark category files and the index as partial pilot results. Record the
     sample inventory, evidence, effort, uncertainties, and verdict in
     `POC_REPORT.md`; retain successful entries for the full survey.
   - Pass only when every sampled object has one primary assignment, every row
     has all four fields and verified supporting links, source versions are
     traceable, and both table levels are demonstrated. Record any unresolved
     issue; none may block classification or verification of the sample.
   - Measure research time and manual effort, identify scaling risks, and state
     which object types remain untested. A successful sample demonstrates the
     workflow, not full-catalog completeness or universal applicability.
   - Review the evidence and record a go/revise verdict. If the POC fails, revise
     the method and repeat only the bounded sample. Begin the full survey after
     the POC passes and the user accepts its findings and any plan revisions.

2. **Establish the source baseline.**
   - Start with the [Angular Material component catalog](https://material.angular.dev/components/categories).
   - Inspect the [official Angular Material source tree](https://github.com/angular/components/tree/main/src/material).
   - Record the research date, package version, and source commit.
   - Identify any differences between the documentation version and source
     baseline rather than silently combining releases.

3. **Build a complete inventory.**
   - Enumerate every library, folder, and file within the agreed scope.
   - Preserve exact package names and source paths.
   - Identify public components and APIs, internal implementation, styling,
     testing, documentation, and build tooling.
   - Record exclusions explicitly so coverage can be checked.

4. **Define the category hierarchy.**
   - Use official categories where available.
   - Add clearly labeled survey categories for objects outside the component
     catalog.
   - Define each category and subcategory before assigning objects.
   - Assign each object one primary category or subcategory; cross-reference
     additional relationships without duplicating its authoritative entry.
   - Mark uncertain assignments and explain the uncertainty instead of forcing
     a classification.

5. **Research and describe each object.**
   - Preserve its Angular Material symbol, package name, or source path.
   - Assign a technology-independent abstract object name.
   - Describe its purpose and distinguish public functionality from implementation
     support.
   - Link to official overview and API documentation where applicable, and to
     source files pinned to the recorded commit.
   - Distinguish documented facts from survey interpretations.

6. **Write the Markdown collection.**
   - Store all survey results in the `openui-spec` repository under
     `spec/survey/angular-material/`, beside this plan. This includes category
     files, the index, inventory, research notes, and validation reports.
   - Create `README.md` containing the scope, baseline, category index,
     classification rules, coverage summary, and unresolved questions.
   - Create one Markdown file per category using the structure below.
   - Retain researched information and assignment rationale in the relevant
     category file; use links for shared definitions.

7. **Validate completeness and consistency.**
   - Reconcile the inventory against all category tables.
   - Ensure every in-scope object is classified or explicitly marked unresolved.
   - Check source links, duplicate primary assignments, naming consistency, and
     the required four-column table structure.
   - Check that abstract names describe concepts independently of Angular
     Material naming.
   - Run configured Markdown formatting checks, if present.
   - Document remaining gaps and limitations in `README.md`.

8. **Inventory reusable behaviors across the surveyed families.**
   - Reuse the fixed source baseline and inventory. Read the canonical
     `Behaviors/scope.md`, existing behavior leaves, `scope.md`,
     `template.scope.md`, `taxonomy_mapping.md`, and `evidence.md` alongside the
     object-oriented crosswalk before extracting capability candidates.
   - Begin with Dialog, Bottom sheet, Sidenav, Expansion, and overflowing content
     in Dialog, Tabs, and Table as a bounded calibration sample. Confirm that the
     method distinguishes an object, its reusable behavior, its configuration,
     interaction events, and styling before applying it to every family.
   - Inspect the relevant documentation, public configuration, implementation,
     and tests for each candidate; do not infer a behavior solely from a name,
     scrollbar appearance, or CSS declaration. Record observed behavior separately
     from the proposed technology-independent interpretation.
   - Explicitly investigate modal opening and closing, focus placement,
     containment and restoration, dismissal, background interaction blocking,
     overflow scrolling, scroll locking, and collapse/expand behavior. Look for
     additional candidates such as selection, sorting, paging and text completion
     where the source evidence supports them; do not assume every candidate needs
     a standalone behavior leaf.
   - Distinguish scrolling inside overflowing content from preventing background
     scrolling while a surface is open, and from overlay responses to ancestor
     scrolling such as repositioning or dismissal.
   - Keep CDK dependencies contextual. Cite their exact baseline when needed to
     explain a Material capability; record inaccessible or insufficient evidence
     as unresolved rather than silently expanding the survey into all of CDK.
   - Create `BEHAVIORS.survey.md` with definitions, direct objects, and capability
     subcategory tables using the four required research columns. Preserve exact
     source identities and links to the original inventory entries. These are
     secondary capability relationships, not duplicate primary classifications.

9. **Map capabilities and identify required taxonomy extensions.**
   - Create `BEHAVIOR_MAPPING.md` linking each researched capability to its host
     families, existing canonical destination, evidence, and disposition: reuse,
     enhance, propose a new leaf, propose a new category or subcategory, retain
     as host-specific configuration, or unresolved. Identify composite capabilities
     and their constituent behavior relationships without duplicating authoritative
     definitions.
   - Evaluate destinations in this order: reuse an existing scope, enhance its
     definition, add a leaf under an existing category, introduce a subcategory
     for a coherent group of related capabilities, or propose a new top-level
     category when the concept falls outside the existing roots. Do not force an
     evidenced capability into an unsuitable existing category.
   - For each proposed category or subcategory, record its definition, supporting
     evidence, parent or top-level placement, boundaries with adjacent scopes,
     affected mappings, and migration implications. Distinguish a survey-only
     research grouping from a proposed canonical taxonomy extension. Step 9
     identifies and justifies the gap; Step 10 drafts the corresponding structure.
   - Link Expansion to the existing Collapsible behavior where appropriate;
     inspect its current target coverage before claiming it applies to every
     container or widget. Check the existing Resizable and Drag and drop leaves
     when matching evidenced capabilities.
   - Distinguish a reusable object under `Behaviors/` from a host attribute in the
     `Behaves` category, a `Uses` configuration value, a `Produces` event, and an
     Interaction or Layout folder-level notion. A similar verb does not make
     those representations interchangeable.
   - For modality, reconcile the existing Dialog open/modal configuration and
     Overlay containers description with a possible reusable Modal interaction
     behavior. Separate the opening action from the ongoing modal interaction
     policy; document applicability to dialogs, sheets, and other supported hosts.
   - For overflow, distinguish a possible Scrollable behavior from the scrollbar
     control, a viewport-owning container, sizing/overflow policy, and wheel/scroll
     events. Reconcile the pending Qt Scroll container proposal without treating
     it as an approved canonical object.
   - Record one review disposition for every surveyed family, including families
     with no reusable behavior found and infrastructure-only families. Link to
     evidence or explain the boundary; family review is not a claim of exhaustive
     public-symbol or runtime behavior coverage.

10. **Propose behavior scopes and taxonomy structure extensions.**
    - Prefer reuse or enhancement of existing behavior leaves. Propose a new leaf
      only when its reusable capability and ownership boundary are evidenced and
      are not already expressed adequately by an existing contract.
    - Draft any justified new category or subcategory identified in Step 9,
      including its parent scope description, proposed children, and before/after
      tree. Retain existing roots where adequate; propose a revised tree when the
      evidence requires it, documenting alternatives and the impact of moves or
      renames on paths, identifiers, mappings, and consumers.
    - Evaluate Modal interaction and Scrollable as candidates, not predetermined
      additions. Document accepted-for-proposal, deferred, and rejected candidates
      with reasons and alternative representations.
    - Describe candidate host applicability, state and configuration, activation
      and dismissal, emitted events, accessibility obligations, and interactions
      with other behaviors. Explicitly resolve or defer overlapping ownership of
      focus, scroll locking, open state, and close/cancel notifications.
    - Stage new or amended drafts under `proposed-scopes/`, mirroring their
      proposed canonical destinations. Use `Behaviors/` for capabilities assigned
      there; include a `scope.md` for each proposed category or subcategory folder
      and follow the leaf template for leaf files. Distinguish external framework
      examples from proposed neutral design decisions. Do not invent machine
      fields or child ownership merely to make a draft appear complete.
    - Update `TAXONOMY_MAPPING.md`, `SCOPE_EXTENSION_PROPOSAL.md`, and
      `PROPOSED_EVIDENCE.md` to incorporate the behavior mappings, candidate tree
      changes, unresolved contract decisions, and cross-survey dependencies.
      Reassess the earlier two-leaf proposal and its completeness claims.
    - Keep canonical scope files, the canonical mapping and evidence register,
      glossary, and generated catalog unchanged. Record a future merge sequence
      with one evidence entry per accepted leaf and preserved existing contracts.

11. **Validate behavior coverage and publish the revised handoff.**
    - Reconcile the family review checklist, capability research, mapping rows,
      candidate drafts and evidence entries. Every candidate needs a traceable
      disposition; every proposed addition or enhancement needs supporting
      evidence and an explicit boundary with existing objects and behaviors.
      For proposed categories and subcategories, verify parent/child consistency,
      distinct definitions, affected crosswalks, and documented migration impacts.
    - Verify that modality, internal overflow scrolling, background scroll
      locking, and collapse/expand each have explicit conclusions, including
      documented uncertainty where source evidence is insufficient.
    - Check examples of a modal dialog, a modal sheet, an overflowing component,
      and a collapsible panel against the proposed composition rules. Identify
      contradictory state ownership, duplicate events, inappropriate focus rules,
      or unsupported host applicability. Label this as a document-level review;
      do not claim runtime validation unless corresponding tests are executed.
    - Validate Markdown, source and relative links, candidate identity/type
      collisions, scope-template parsing, and preservation of canonical files.
      Parsing alone does not prove an executable behavior contract.
    - Save conclusions, coverage limits and unresolved decisions in
      `BEHAVIOR_REVIEW.md`; update `PROPOSAL_CHECKS.md`, `README.md`, and this plan.
      Preserve the original seven-step report as the file/folder/export audit,
      and distinguish its completion from the behavior review's status.
    - Mark Steps 8–11 complete only after all family dispositions and candidate
      decisions are recorded and validated. Any unresolved contract remains
      explicitly deferred and must not be presented as merge-ready.

## Category file structure

Each category file contains:

- A category definition and any relevant scope notes.
- A **Direct objects** section with a table of objects assigned directly to the
  category.
- A heading and separate object table for each subcategory.
- Research notes, classification rationale, and unresolved assignments.

If a category has no direct objects, retain the table header and explain that
all its objects belong to subcategories. Do not insert a fictitious object row.

Every object table contains exactly these four fields:

| Object name in Angular Material | Abstract object name | Object description | Links to the sources |
| --- | --- | --- | --- |
| Exact symbol, package, or source path | Framework-independent concept | Purpose, object type, and relevant behavior | Official documentation and source links |

The row above describes the required content and is a template, not a researched
survey entry. Put object type, uncertainty, and necessary qualification in the
description or accompanying notes rather than adding columns.

## Deliverables and completion criteria

- `POC_REPORT.md` records the bounded sample, validation evidence, measured effort,
  limitations, and the go/revise decision before the full survey begins.

- `README.md` provides the agreed scope, reproducible baseline, category index,
  coverage summary, and explicit gaps.
- Each category has a Markdown file with its direct-object table and subcategory
  tables, all using the four required columns.
- Every inventoried library, folder, and file has one primary entry or a documented
  unresolved disposition.
- Every researched entry includes supporting source links.
- Validation results and remaining limitations are recorded.

The original Steps 1–7 are complete for the agreed file/folder/export scope.
The final report records verification evidence, research boundaries, and the two
upstream package findings. Steps 8–11 are complete as capability research, mapping,
proposal drafting and document-level validation. Deferred contract decisions are
listed in BEHAVIOR_REVIEW.md and are not presented as merge-ready.

Additional deliverables for Steps 8–11:

- `BEHAVIORS.survey.md` records evidenced capabilities using the four-column
  research format and preserves existing primary object classifications.
- `BEHAVIOR_MAPPING.md` records capability-to-scope relationships and a review
  disposition for every surveyed family.
- Candidate behavior drafts and the updated taxonomy proposal/evidence documents
  distinguish reusable behaviors from object contracts and supporting mechanisms.
- `BEHAVIOR_REVIEW.md` records validation, explicit conclusions for the requested
  examples, unresolved decisions, and the revised future merge handoff.

Survey classifications and behavior candidates remain interpretations and proposals
rather than normative OpenUI changes. All eleven steps have been executed within
their research/proposal scope; canonical integration remains a future reviewed merge.
