# Media widgets

This leaf follows the [leaf scope template](../template.scope.md). It groups media and
spatial widget aliases from the generic UI taxonomy.

## Identity

- id: mediaWidgets · type: MediaWidgets · status: draft

## Purpose

Media widgets cover media players, camera previews, and map surfaces that present
rich visual, audio, video, or spatial content with widget-level behavior.

## Attributes

Categories are defined in [`../scope.md`](../scope.md). This family inherits concrete
source, playback, preview, viewport, and permission attributes from the selected media
widget implementation.

## Child model

Media widgets do not define a fixed child model at this abstraction level.

## Accessibility

Media widgets provide captions, transcripts, alternatives, labels, and keyboard access
for playback, preview, map, or spatial controls as appropriate.

## Validation notes

- Use drawing and capture controls for input capture; use this family for playback,
  preview, and map presentation.
