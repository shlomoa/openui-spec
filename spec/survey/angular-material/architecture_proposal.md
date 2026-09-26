# Angular Material survey: architecture proposal

[Survey README](README.md) · Sources: [recommended structure](inventory/SCOPE_EXTENSION_PROPOSAL.md#recommended-structure), [structural decisions](inventory/BEHAVIOR_MAPPING.md#structural-decisions)

Status: review proposal only. The canonical tree is unchanged.

## Recommendation

Retain all eleven top-level scopes. The current roots adequately distinguish objects,
composition and cross-cutting mechanisms. All proposed additions are leaves under
existing roots; no new category or subcategory folder is proposed.

## Alternatives rejected

| Alternative                                                                                                  | Reason                                                                     |
| ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Promote survey categories (Shared foundations, Development tooling, Package and style distribution) to roots | Mixes implementation packaging with UI semantics.                          |
| Move Table, Tree or Icons to imitate the survey                                                              | Unnecessary path and identifier migrations.                                |
| New top-level Scrolling or Modal interaction roots                                                           | Current evidence fits Behaviors.                                           |
| Scrolling and Modal interaction subfolders under Behaviors                                                   | Deferred. A later regrouping needs path, index and traceability migration. |

## Folder-level clarifications

The survey proposes clarifying four folder scopes rather than restructuring them:

- **Presentation:** theme tokens, density, typography and ripple appearance are styling
  mechanisms; file distribution and theme names stay out of the scope tree.
- **Interaction:** focus, activation, selection and input modality are interaction
  state; ripple is visual feedback, not a behavior leaf.
- **Internationalization:** keep locale-sensitive date/time parsing and display separate
  from adapter services and value representation.
- **Layout:** tile sizing, spacing and responsive arrangement refine existing layout
  vocabulary.

See [folder-level clarifications](inventory/SCOPE_EXTENSION_PROPOSAL.md#folder-level-clarifications).
