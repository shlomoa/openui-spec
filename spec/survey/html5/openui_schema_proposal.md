# HTML Standard survey: OpenUI schema proposal

[Survey README](README.md) · Source: [template and evidence-register proposals](inventory/SCOPE_TREE_PROPOSAL.md#template-and-evidence-register-proposals)

Status: proposal for review. **No change to the grammar (`EBNF.txt`), the JSON Schema or
the scope converter is proposed.** The survey proposes clarifying the leaf template in
prose.

## Template clarifications

- The Identity `type` is the chosen semantic category. It is not a copy of an HTML tag
  or interface name, and not a taxonomy alias.
- Attributes distinguish author configuration (Uses), produced events (Produces) and
  abstract actions (Behaves). A DOM method is evidence for behavior, not a child object.
  A read-only platform property is not automatically an input.
- Variant-specific attribute applicability belongs in validation prose unless a schema
  change is explicitly proposed. Prose does not imply that constraints, value types or
  multiplicity are enforced.
- The Child model enumerates owned content only. Form association, focus targets,
  event payloads, browser collections and dependency references need separate
  ownership decisions.

## Issues for the language workstream

These do not change the schema today, but the grammar work (plan workstream W5) must
decide them:

| Issue                                                  | Evidence                                                                               | Related plan item                            |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------- |
| Behavior targets modeled as children versus references | Behavior leaves list targets as children while the template says children are owned.   | W5 task 21; Qt D01; Angular Material D01/D05 |
| `[modal]` has no HTML counterpart                      | HTML opens modals with `showModal()`; there is no `modal` attribute.                   | Evidence register correction                 |
| String-only attribute values                           | Checkedness, selected options, text value and file selection are distinct value kinds. | Q6: typed values in a later W5 revision      |

## Evidence register

Keep one row per leaf. Make the Source and Citation cells contain precise snapshot
links, and make the Authorizes cell distinguish HTML facts, approved OpenUI
abstractions and framework examples.
