# Form field

Review draft only; not part of the canonical catalog. Follows the [leaf template](../../../../scopes/template.scope.md) and [scope rules](../../../../scopes/scope.md). Shared terms retain the [spec glossary](../../../../README.md#glossary) meanings. See the [proposal](../../SCOPE_EXTENSION_PROPOSAL.md) and [candidate evidence](../../PROPOSED_EVIDENCE.md) before any merge.

## Identity

- id: formField · type: FormField · status: draft

## Purpose

A reusable container associates a value-entry or value-selection control with its label and supporting help or validation feedback. It describes field composition independently of the control that owns the value and the view that owns a complete form workflow.

## Attributes

No machine-bearing attributes are proposed at this grouped-family stage. A concrete contract requires an accepted neutral representation; external framework bindings alone do not authorize keys.

## Child model

No fixed machine-bearing child model is proposed at this grouped-family stage. This does not prohibit composition; ownership, role types and multiplicities must be decided before materializing a concrete contract.

## Accessibility

Associate the visible label and applicable help/error descriptions with the actual value control. Required and invalid state must be understandable beyond color alone. The wrapper must not create a duplicate focus stop; interactive supporting actions need their own meaningful names and appropriate keyboard operation.

## Validation notes

Keep value ownership with the contained or referenced control. Prefix and suffix content may be decorative or interactive and must not replace the control label. Do not assume a text input, Material floating label, fixed hint count or a framework-specific field-control interface. Concrete ownership, supported control types and association fields remain unresolved until a separate contract decision.

This draft is a proposed taxonomy definition, not a renderable implementation contract. Its accessibility text records design obligations for review rather than verified framework or implementation conformance. When copied into the canonical tree, replace review-only introductory links with canonical template, scope and accepted evidence links.

The behavior mapping retains this object as the composition owner. Field feedback/focus coordination does not create a second input value owner or an independent validation engine.
