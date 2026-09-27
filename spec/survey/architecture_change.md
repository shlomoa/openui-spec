# Consolidated architecture change proposal

This proposal turns the architecture findings of the four UI surveys into concrete changes
to the structure of the scope tree under [`spec/scopes/`](../scopes/scope.md#top-level-scopes):
its top-level scopes, its folders and the rules that govern them. It uses the approved
[terminology](terminology.md#summary), [categories](category.md#summary),
[taxonomy mapping change](taxonomy_mapping_change.md#summary),
[scope change](scope_change.md#summary) and [structure change](structure_change.md#add).
Each recommendation is one of four actions on a specific part of the tree.

| Action               | Meaning                                                                     |
| -------------------- | --------------------------------------------------------------------------- |
| **Change A to B**    | The same folder or rule; its text changes from A to B.                      |
| **Replace A with B** | Folder or rule A is removed and B takes over its role.                      |
| **Delete A**         | Folder or rule A is removed with no successor.                              |
| **Add C**            | C is a new rule in a folder's `scope.md`. It adds no folder, scope or type. |

- **Where each change applies:** the top-level [`scope.md`](../scopes/scope.md#folder-and-file-convention)
  and the `scope.md` of the named top-level folder.
- **Inputs:** the architecture proposal of each survey:
  [Angular Material](angular-material/architecture_proposal.md#recommendation),
  [HTML Standard](html5/architecture_proposal.md#recommendation),
  [OpenUI5](openui5/architecture_proposal.md#no-top-level-restructuring) and
  [Qt Widgets](qt/architecture_proposal.md#recommendation).
- **Status:** approved (2026-09-27), not yet applied: C1 and A1–A6. It is applied with
  terminology step
  9 in the [v1 publish plan](specui_v1_publish_plan.md#w1-terminology).
- **Naming rule used:** the approved [canonical-term rule](terminology.md#appendix-a-canonical-term-rule).
- **Already decided:** the new scopes and the taxonomy groupings are settled elsewhere and
  listed once in [section 0](#0-already-decided).

## Summary

| Action  | Count | Examples                                                                                                             |
| ------- | ----: | -------------------------------------------------------------------------------------------------------------------- |
| Change  |     1 | Behaviors apply to any element they reference, not only to pages, views, containers and widgets                      |
| Replace |     0 | Not needed.                                                                                                          |
| Delete  |     0 | Not needed.                                                                                                          |
| Add     |     6 | Boundary rules for Presentation, Interaction, Internationalization and Layout; linked views; family-folder migration |

All four surveys keep the eleven top-level scopes and propose no new root. See
[Kept](#kept).

## 0. Already decided

| Survey proposal                                                                      | Decided in                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New leaves under existing roots (Angular Material, Qt, HTML)                         | Two new Behaviors scopes in the [structure change](structure_change.md#add); every other proposed leaf became a term of an existing scope ([terminology: Terms that need a new scope](terminology.md#49-terms-that-need-a-new-scope)) |
| Qt taxonomy extension and its Reusable behaviors browsing group                      | The Behaviors section and 21 subcategories in [category](category.md#4-add)                                                                                                                                                           |
| Survey categories kept as research groupings, not roots (Angular Material, Qt, HTML) | [Category: Kept](category.md#kept)                                                                                                                                                                                                    |
| HTML "enrich in place first"                                                         | The approved changes to existing scopes in [scope change](scope_change.md#1-change)                                                                                                                                                   |
| OpenUI5 clusters placed inside existing roots                                        | Approved terms in [terminology](terminology.md#42-input-elements)                                                                                                                                                                     |

## 1. Change

| #   | Change                                                                                                             | To                                                                                                                                                               | Where                                                                   | Why                                                                                                                                                                                  | Evidence                                                                                                                                        | Source URL                                                                       |
| --- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| C1  | "Behaviors define reusable interaction capabilities that can be applied to pages, views, containers, and widgets." | "Behaviors define reusable interaction capabilities that can be applied to any element, which a behavior references as its controlled element and does not own." | [Behaviors](../scopes/Behaviors/scope.md#behaviors): folder description | The approved scope change R1 replaces the target children of Behaviors leaves with a reference to the controlled element (terminology A2). The folder description must say the same. | [Scope change: Replace](scope_change.md#2-replace); [HTML scopes proposal](html5/scopes_proposal.md#enrich-or-clarify-existing-contracts-first) | [WAI-ARIA 1.2: aria-controls](https://www.w3.org/TR/wai-aria-1.2/#aria-controls) |

## 2. Replace

Not needed.

## 3. Delete

Not needed.

## Kept

| Kept                                                                                                                                                         | Why                                                                                                                                                                                                                                                                        | Evidence                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The eleven top-level scopes: Application, Controls, Behaviors, Pages, Views, Containers, Widgets, Layout, Presentation, Internationalization and Interaction | All four surveys keep them. Every surveyed object fits an existing root; OpenUI5 calls its Fiori vocabulary a stress test the tree passed.                                                                                                                                 | [Angular Material](angular-material/architecture_proposal.md#recommendation); [HTML](html5/architecture_proposal.md#recommendation); [OpenUI5](openui5/architecture_proposal.md#no-top-level-restructuring); [Qt](qt/architecture_proposal.md#recommendation) |
| Scope ids, instance ids, instance types and leaf paths                                                                                                       | Moving Table, Tree or Icons to imitate a framework would force path and id migrations for no gain.                                                                                                                                                                         | [Angular Material: alternatives rejected](angular-material/architecture_proposal.md#alternatives-rejected); [HTML: alternatives considered](html5/architecture_proposal.md#alternatives-considered)                                                           |
| Widgets as one folder                                                                                                                                        | OpenUI5 notes that most of its clusters land in Widgets, already the largest scope. With the approved terms, Widgets gains five grouped leaves (File upload, Filter bar, Value help, Personalization panel, Planning calendar). That is growth, not yet a reason to split. | [OpenUI5 watch item](openui5/architecture_proposal.md#no-top-level-restructuring)                                                                                                                                                                             |
| Behaviors without subfolders                                                                                                                                 | Angular Material deferred Scrolling and Modal interaction subfolders. The approved answer is two leaf scopes, Input assistance and Viewport and focus control, directly under Behaviors.                                                                                   | [Angular Material: alternatives rejected](angular-material/architecture_proposal.md#alternatives-rejected); [Structure change](structure_change.md#add)                                                                                                       |

## 4. Add

Rules added to the Boundaries section of the named `scope.md`.

| #   | Add                                                                                                                                                                                                                                     | Where                                                                                                        | Why                                                                                                                                                                  | Evidence                                                                                                                                                                                               | Source URL  |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| A1  | "Theme tokens, density, typography and the appearance of interaction feedback, such as a ripple, are presentation. How themes are packaged and named is outside the scope tree."                                                        | [Presentation](../scopes/Presentation/scope.md#boundaries)                                                   | Angular Material: keep styling mechanisms apart from file distribution.                                                                                              | [Angular Material: folder-level clarifications](angular-material/architecture_proposal.md#folder-level-clarifications)                                                                                 | Not needed. |
| A2  | "Focus, activation, selection and input modality are interaction state. Visual feedback of an interaction is presentation, not a behavior."                                                                                             | [Interaction](../scopes/Interaction/scope.md#boundaries)                                                     | Angular Material: ripple is not a behavior leaf.                                                                                                                     | [Angular Material: folder-level clarifications](angular-material/architecture_proposal.md#folder-level-clarifications)                                                                                 | Not needed. |
| A3  | "Locale-sensitive parsing and display of dates, times and numbers belong here. The services that implement them and the stored value representation do not."                                                                            | [Internationalization](../scopes/Internationalization/scope.md#boundaries)                                   | Angular Material; OpenUI5 provides the same concerns as modules (locale data, number and currency formats), not UI objects.                                          | [Angular Material: folder-level clarifications](angular-material/architecture_proposal.md#folder-level-clarifications); [OpenUI5 open item O4](openui5/opens.md#o4-the-four-folder-abstraction-scopes) | Not needed. |
| A4  | "Sizing, spacing and responsive arrangement of items, including tiles, refine the existing layout vocabulary. Layout data attached to an element describes its placement; it is not an element."                                        | [Layout](../scopes/Layout/scope.md#boundaries)                                                               | Angular Material: tile sizing and spacing; OpenUI5: layout data classes are layout mechanisms, not UI objects.                                                       | [Angular Material: folder-level clarifications](angular-material/architecture_proposal.md#folder-level-clarifications); [OpenUI5 open item O3](openui5/opens.md#o3-261-unclustered-classes)            | Not needed. |
| A5  | "The taxonomy and the scope tree are linked views of one vocabulary. The taxonomy groups terms by purpose; the scope tree organizes contracts. A new taxonomy section or subcategory does not create a scope folder, type or contract." | [Top-level `scope.md`](../scopes/scope.md#scopes): introduction, after the paragraph on the taxonomy mapping | Qt; approved as a kept principle in category. Stating it in the tree itself keeps later taxonomy work from creating folders by accident.                             | [Qt](qt/architecture_proposal.md#recommendation); [Category: Kept](category.md#kept)                                                                                                                   | Not needed. |
| A6  | "A broad grouped leaf may become a family folder with its own child contracts only with an explicit map from old to new paths, ids and types. A folder and a leaf with the same name must not produce the same id."                     | [Top-level `scope.md`](../scopes/scope.md#folder-and-file-convention)                                        | HTML: splitting Choice controls, Display primitives or Drawing and capture later is possible only with a migration map; a folder plus a same-named leaf can collide. | [HTML: alternatives considered](html5/architecture_proposal.md#alternatives-considered)                                                                                                                | Not needed. |

### Not added

- **Accessibility and Composition top-level folders** (HTML P6, P7): not added in the
  approved [terminology](terminology.md#not-added). Whether they belong in the project stays
  with plan question Q13.
- **A Host integration branch under Application** (Qt): host-shell presence stays with plan
  question Q9. Until then, system-tray presence must not be mapped to favicon.
- **Family folders for Choice controls, Display primitives or Drawing and capture**
  (HTML): no survey needs the split now. A6 states the condition for a later one.
- **New roots for Graphics, Scrolling or Modal interaction** (Qt, Angular Material): the
  evidence fits existing roots and the approved Behaviors scopes.
- **A tree that mirrors HTML chapters or framework categories:** it would mix UI with
  browser internals, packaging and tooling.
