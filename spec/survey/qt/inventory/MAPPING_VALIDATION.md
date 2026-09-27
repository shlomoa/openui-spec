# Mapping validation

Historical phase report: these checks describe the earlier phase named here. The current complete proposal results and counts are in [BEHAVIOR_VALIDATION.md](BEHAVIOR_VALIDATION.md) and [reconciliation](CLASSIFICATION_RECONCILIATION.md).

Status: document and proposal checks completed. Canonical merge and generator validation are future work.

- All 94 canonical survey entries are mapped exactly once, retaining all 99 distinct Qt names.
- All existing primary destinations resolve to actual scope files; partial matches, owned parts, folder notions and the host-shell gap are explicit.
- Four review drafts use the shared leaf section structure and fixed Identity, Attributes and Child model line patterns. Proposed identifiers are unique and do not collide with existing scope identities.
- Candidate evidence is grouped by existing scope anchor, plus one row per proposed new leaf; it is explicitly separate from approved canonical evidence.
- Markdown table column counts, relative file links, explicit survey anchors and trailing whitespace were checked.
- Changes are confined to survey documentation and review drafts. The canonical taxonomy, scope tree and generated catalog are unchanged.
- No runtime, generator, accessibility-conformance or full repository test result is claimed. Recheck the package against current canonical sources when merging.

See [mapping](TAXONOMY_MAPPING.md), [proposal](SCOPE_EXTENSION_PROPOSAL.md), and [evidence](PROPOSED_EVIDENCE.md).
