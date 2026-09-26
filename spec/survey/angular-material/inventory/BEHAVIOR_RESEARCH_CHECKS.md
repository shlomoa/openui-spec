# Step 8 behavior research checks

Checked on 2026-09-22. This record validates the Step 8 research artifact; it does not execute the canonical mapping, proposal or consolidated review planned in Steps 9–11.

## Results

| Check | Result |
| --- | --- |
| Calibration | Six families reviewed first: Dialog, Bottom sheet, Sidenav, Expansion, Tabs and Table. The survey records the distinctions and a viable-method verdict. |
| Family research | 39 of 39 family subcategories have research outcomes; direct package artifacts are explicitly accounted for separately. |
| Capability inventory | 40 observations, B01–B40, each appearing once: two direct directive objects and 38 observations in eight research subcategories. These are not 40 approved Behavior leaves. |
| Research format | All ten tables in BEHAVIORS.survey.md have exactly the four required columns, including the family research log. |
| Primary ownership | Every cited Material source file exists in the original inventory and its corresponding category document. Primary file/folder/export classifications are unchanged. |
| Fixed source evidence | 125 distinct Material files are cited. All 1,232 cached UTF-8 Material files matched their fixed-tree Git blob hashes; the non-text image was not reread for this behavior pass. |
| CDK boundary | 7 explicitly listed contextual files were read from the existing same-commit source archive. Their SHA-256 fingerprints are recorded in the survey; they were not added to the Material inventory or separately compared to a CDK Git tree. |
| Source links | 184 unique pinned source URLs, including line anchors, resolve to files and valid line numbers in the local fixed-baseline evidence. No new live HTTP check is claimed. |
| Relative links | 156 relative-link occurrences resolve in the intended repository location; referenced Markdown heading anchors exist. |
| Markdown | The four delivered Markdown documents pass the configured markdownlint-cli2 0.23.3 rules. |
| Preservation | SHA-256 snapshots match for 84 protected documents: canonical scopes/catalog/taxonomy inputs plus prior survey/proposal artifacts other than the intended PLAN.md and README.md status edits. |
| Scope boundary | No canonical files, behavior mapping document, scope drafts or generated catalog were changed by Step 8. Steps 9–11 remain pending. |

## Evidence qualifications

- Source inspection and upstream test expectations are research evidence. No Angular Material/CDK tests or browser behavior checks were run.
- The sample established the method, not complete contracts or universal applicability. Default policies can be overridden.
- Registration as scrollable is not a geometric overflow test. Dialog overflow has documented role plus directive/style evidence; runtime scrolling was not demonstrated.
- B39 retains documentation-only table drag/drop integration evidence; B40 describes a contextual CDK strategy without asserting a Material default. Dependency boundaries are explicit.
- Focus option spelling and mode-versus-backdrop nuances are recorded in the survey instead of silently resolving them into canonical rules.
- Future mapping must distinguish host behavior, configuration, events, cross-cutting notions and reusable scope objects. The candidate inventory does not decide new categories or subcategories.

## Handoff

Read [BEHAVIORS.survey.md](BEHAVIORS.survey.md), then execute Step 9 from the [plan](PLAN.md) when requested. Preserve the original [final report](FINAL_REPORT.md) as the completed file/folder/export audit. The earlier [scope extension proposal](SCOPE_EXTENSION_PROPOSAL.md) still requires the behavior-focused reconciliation planned for Step 10.
