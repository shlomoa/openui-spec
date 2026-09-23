# Token collection

Review draft only; not part of the canonical catalog. Follows the [leaf template](../../../../scopes/template.scope.md) and [scope rules](../../../../scopes/scope.md). Shared terms retain the [spec glossary](../../../../README.md#glossary) meanings. See the [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md) before any merge.

## Identity

- id: tokenCollection · type: TokenCollection · status: draft

## Purpose

A reusable widget coordinates a collection of compact labeled values and their mode-specific interaction, including selection or token entry and removal when supported. It represents collection behavior beyond the appearance of an individual tag.

## Attributes

No machine-bearing attributes are proposed at this grouped-family stage. A concrete contract requires an accepted neutral representation; external framework bindings alone do not authorize keys.

## Child model

No fixed machine-bearing child model is proposed at this grouped-family stage. This does not prohibit composition; ownership, role types and multiplicities must be decided before materializing a concrete contract.

## Accessibility

Expose the collection purpose and the applicable item state. Interactive modes need coherent keyboard navigation and predictable focus after insertion or removal. Name removal actions with the affected item; avoid imposing interactive focus or listbox/grid roles on a passive collection. Choose semantics according to the accepted interaction mode.

## Validation notes

Passive tags can remain Status indicator aliases; selection-only options can remain Choice controls. A removal request does not imply that data has already been deleted. Do not infer item identity from its visible label or equate a visual token with a design-system style token. Item representation, ownership, modes and committed-change events require a separate contract decision.

This draft is a proposed taxonomy definition, not a renderable implementation contract. Its accessibility text records design obligations for review rather than verified framework or implementation conformance. When copied into the canonical tree, replace review-only introductory links with canonical template, scope and accepted evidence links.

The behavior mapping retains this object as the collection owner. Selection, token-entry and removal notifications remain distinguishable; no separate Token behavior is proposed.
