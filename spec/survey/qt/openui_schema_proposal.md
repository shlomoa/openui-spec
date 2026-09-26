# Qt Widgets survey: OpenUI schema proposal

[Survey README](README.md) · Source: [BEHAVIOR_DECISIONS.md](inventory/BEHAVIOR_DECISIONS.md)

Status: proposed neutral decisions. **No base-schema change is claimed.** The references
and normalized values below are prose contracts until the language workstream (plan
W5) chooses converter and schema support.

| Id  | Decision                                                                                                                                                               | Schema impact                                                                                                    |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| D01 | Components own their content. Behavior targets are id references stored under `attrs`, resolved within the document. Reject missing, wrong-kind and cyclic references. | Needs a reference encoding and validation (plan W5 task 21). Extends the 0.3.0 same-document element references. |
| D02 | Modal restriction and modal focus combine into one leaf (P05); activation saves focus, and deactivation restores it in reverse nesting order.                          | Lifecycle semantics only.                                                                                        |
| D03 | Scroll position is a normalized fraction (0–1) per axis; the adapter converts to platform coordinates.                                                                 | Needs a typed numeric value (plan Q6).                                                                           |
| D04 | Reuse the existing behavior leaves; add only P05 and P06.                                                                                                              | None.                                                                                                            |
| D05 | Text completion references an input by id; candidates are ordered strings; acceptance does not submit.                                                                 | Needs a reference encoding and list values.                                                                      |
| D06 | Graphics viewport borrows scene data through an opaque resource reference.                                                                                             | Needs a resource-reference value kind.                                                                           |
| D07 | Swipes, hover, key/pointer input and timers are trigger vocabulary, mapped to explicit outcomes.                                                                       | Vocabulary rule; no schema field.                                                                                |
| D08 | Live preview is application-supplied; cancellation reports intent.                                                                                                     | Event semantics (plan W5 task 21).                                                                               |
| D09 | One controlling policy per target and capability; conflicting authority is rejected.                                                                                   | Validation rule.                                                                                                 |

The draft parser check validates structure, not runtime behavior. See the
[merge handoff](inventory/MERGE_HANDOFF.md#review-decisions-and-constraints).
