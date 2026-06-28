# Charts

This leaf follows the [leaf scope template](../template.scope.md). Its purpose is
drawn from the `spec/README.md` scope rule; a framework chart component (e.g.
Angular Material) is cited only as a reference pattern, recorded
technology-independently.

## Identity

- id: charts · type: Chart · status: draft

## Purpose

A visual representation of data — such as a bar, line, or pie chart — that
summarizes a data series for the user.

## Accessibility

- Exposes an accessible role and a textual alternative describing the data the
  chart conveys.
- Labelled by its title so assistive technology can announce the chart's subject.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- Only the Purpose is authorized by current evidence; attribute and child
  contracts require an explicit owner decision before they are added.
