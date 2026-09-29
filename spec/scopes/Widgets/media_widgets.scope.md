# Media widgets

This leaf follows the [leaf scope template](../template.scope.md). It groups media and
spatial widget aliases from the generic UI taxonomy.

## Identity

- id: mediaWidgets · type: MediaWidgets · status: draft

## Purpose

Media widgets cover media players, captions, camera previews, geographic maps,
custom graphics surfaces and graphics viewports that present rich visual, audio,
video, or spatial content with widget-level behavior.

## Attributes

Categories are defined in [`../scope.md`](../scope.md):

- `uses.src` — Uses — url — the source of the media.
- `uses.controls` — Uses — boolean — whether the widget shows playback controls.

## Child model

- captions — track — 0..n — a captions or subtitles track of the media.

## Accessibility

Media widgets provide captions, transcripts, alternatives, labels, and keyboard access
for playback, preview, geographic map, or spatial controls as appropriate.

## Validation notes

- Use drawing and capture controls for input capture; use this family for playback,
  preview, and geographic map presentation.
