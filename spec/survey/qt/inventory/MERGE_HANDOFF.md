# Canonical merge handoff

Status: research, contracts, applicability, reconciliation and proposal synchronization (steps 1–14) are complete. This handoff does not claim that canonical scopes or generated types have been merged.

## Accepted-work candidate set

- Six new leaves: Page stack, Scroll container, Text completion, Graphics viewport, Modal interaction and Viewport scrolling.
- Forty outcome contracts with one primary home each; three existing behavior leaves reused and component/folder capabilities enriched through [the response mapping](BEHAVIOR_SCOPE_MAPPING.md).
- A 94-entry applicability matrix with 40 response columns represented compactly; 58 prior additions plus 36 nonduplicate outcome terms in the consolidated taxonomy.
- D01–D09 proposed neutral decisions, one evidence row per new leaf and existing-leaf evidence retained for enrichment.

## Integration sequence

1. Review and accept the proposed semantics/evidence, including reference resolution, modal boundaries, normalized scrolling and adapter failure handling. Host integration remains deferred; adopting the core package does not adopt it implicitly.
2. Copy accepted leaves from `proposed-scopes/` to their corresponding `spec/scopes/` destinations. Adjust links, add them to each parent's `scope.md`, and check IDs/types against the then-current canonical tree.
3. Update existing family prose/attributes only where authorized by the accepted contracts and evidence. Preserve old instance types and distinguish input configuration, output and Behaves actions. Amend the canonical evidence register once per affected leaf; add one row per accepted new leaf.
4. Merge accepted taxonomy rows into their matching sections and glossary aliases. Preserve the original entries and resolve Stack wording consistently. Remap review-file links to canonical paths; keep research links where useful.
5. Generate `spec/openui.json` using the repository's documented converter flow. Check metadata/instance separation, exact known types, owned child models and reference validation. No generated catalog file should be hand-edited.
6. Run repository scope/catalog and documentation checks in the local environment, then consumer/generator validation for the accepted capabilities. Define adapter handling for unsupported modality, scene resources, gestures and host notifications before claiming support.

## Review decisions and constraints

The draft parser check validates structure, not runtime behavior. Proposed ID/resource references and normalized values are prose contracts, not newly enforced base-schema rules. Web focus and hover/focus obligations do not imply automatic Qt or generator conformance. [Validation](BEHAVIOR_VALIDATION.md) states exactly what was checked.
