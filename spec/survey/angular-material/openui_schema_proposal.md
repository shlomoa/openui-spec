# Angular Material survey: OpenUI schema proposal

[Survey README](README.md) · Source: [deferred decisions](inventory/BEHAVIOR_REVIEW.md#deferred-decisions-and-merge-readiness)

Status: decisions required, not proposed solutions. **No grammar or schema change is
made.** The survey identifies what the language workstream (plan W5) must decide before
the affected drafts become executable.

| Id  | Decision needed                                                                                                                                  | Affects                | Related plan item                     |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------------------------------------- |
| D01 | A neutral encoding for target references and activation bindings, with target validation, without copying DOM selectors or framework expressions | AM-P03–P05             | W5 task 21; Qt D01                    |
| D02 | Event representation: dismissal reasons, scroll-position shape and units, and direction normalization; request versus completion                 | AM-P03, AM-P04, AM-E11 | W5 task 21; Qt D03                    |
| D03 | Coordination of nested or replacement surfaces: focus owner, lock participation and handover                                                     | AM-P03, AM-P05         | —                                     |
| D04 | Cleanup when a host disappears, and fallback when a restore target no longer exists                                                              | AM-P03, AM-P05         | —                                     |
| D05 | Applicability versus ownership: behavior targets as children versus the rule that children own UI                                                | AM-E10                 | W5; HTML survey behavior child models |
| D06 | Object-family contracts: Form field control ownership and Token collection value, mode and event semantics                                       | AM-P01, AM-P02         | Q6 typed values                       |
| D07 | Reconcile Qt Scroll container and Text completion; gather evidence before generalizing virtualization or autosizing                              | AM-P04, AM-E01         | Plan task 6                           |

Until these are decided, AM-P01 and AM-P02 declare no machine fields. The survey
explicitly forbids inventing a universal `Control` child type or copying Angular
selectors, providers, slots or events into the catalog.
