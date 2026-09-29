# Chart

This leaf follows the [leaf scope template](../template.scope.md). Its purpose is
drawn from the `spec/README.md` scope rule; a framework chart component (e.g.
Angular Material) is cited only as a reference pattern, recorded
technology-independently.

## Identity

- id: chart · type: Chart · status: draft

## Purpose

A visual representation of data — such as a bar, line, or pie chart — that
summarizes a data series for the user.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.kind` — Uses — enum(comparison|trend|composition|distribution|relationship|hierarchy|network|flow) — the kind of chart.
- `uses.series` — Uses — list(number) — the data series the chart shows.
- `uses.title` — Uses — string — the chart title, which also labels it.
- `uses.legend` — Uses — boolean — whether the chart shows a legend.

## Child model

- annotation — annotation — 0..n — a marker or reference line drawn on the chart.

## Accessibility

- Exposes an accessible role and a textual alternative describing the data the
  chart conveys.
- Labelled by its title so assistive technology can announce the chart's subject.

## Validation notes

- `id` is a camelCase identifier and `type` is a valid type per
  `openui.schema.json`.
- A bar chart is a comparison chart, a line chart is a trend chart and a pie chart
  is a composition chart.
