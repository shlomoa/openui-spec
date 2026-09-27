# Structure change proposal

## Add

| Scope                                           | Purpose                                                                                                                             | Terms it holds                                                                                                               | Decision                                       |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `Behaviors/input_assistance.scope.md`           | Reusable behaviors that help or check what the user enters, and can attach to any input control.                                    | A59 Text completion, A61 Constraint validation ([terminology proposal](terminology_proposal.md#47-behaviors))                | Chosen by the project owner (option 2 for A59) |
| `Behaviors/viewport_and_focus_control.scope.md` | Reusable behaviors a control applies to something outside itself: moving a viewport, locking background scrolling and moving focus. | A57 Viewport scrolling, A58 Scroll lock, A62 Focus management ([terminology proposal](terminology_proposal.md#47-behaviors)) | Chosen by the project owner                    |

Each new scope also needs an entry in [`Behaviors/scope.md`](../scopes/Behaviors/scope.md#objects) and its own row in the [evidence register](../scopes/evidence.md#scope-evidence-register).
