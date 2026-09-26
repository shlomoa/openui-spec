# HTML Standard survey: architecture proposal

[Survey README](README.md) · Source: [SCOPE_TREE_PROPOSAL.md](inventory/SCOPE_TREE_PROPOSAL.md#tree-shape-and-restructuring-alternatives)

Status: proposal for review. The canonical scope tree is unchanged.

## Recommendation

Keep the eleven existing top-level scopes (Application, Controls, Behaviors, Pages,
Views, Containers, Widgets, Layout, Presentation, Internationalization and Interaction)
and their current identities. Do not mirror HTML chapters under `spec/scopes/`: browser
parsing, scheduling, storage and worker machinery are implementation dependencies, not
UI taxonomy objects.

## Alternatives considered

| Option                              | Description                                                                                                                                           | Verdict                                                                                                                      |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Enrich in place                     | Keep every leaf path, scope id, instance id and instance type. Add supported fields and children, or clarify prose and evidence.                      | **Recommended first.** Minimal migration; shows whether new leaves are needed.                                               |
| Split broad families selectively    | Introduce a family folder with distinct child contracts where variants diverge. Candidates: Choice controls, Display primitives, Drawing and capture. | Only after an explicit old-to-new path and id/type migration map. A folder plus a same-named leaf can produce colliding ids. |
| Replace the tree with HTML chapters | Reorganize scopes to follow the HTML specification.                                                                                                   | **Rejected.** Mixes UI with browser internals and fragments Interaction and Presentation.                                    |

## Conditional new top-level folders

Two cross-cutting notion folders are proposed, each conditional on a scope decision:

- **Accessibility** (P6): shared naming, association, semantic-role and accessible-content
  notions referenced by leaf Accessibility prose.
- **Composition** (P7): reusable content, named insertion points and fallback content.
  Add only if content reuse or projection is a specification requirement.

Whether these enter the specification is plan question Q13, deferred to scope workstream
W2. Details are in [scopes_proposal.md](scopes_proposal.md).
