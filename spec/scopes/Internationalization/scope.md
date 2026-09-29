# Internationalization

Internationalization defines language, locale, writing-system, formatting, sorting,
search, font, glyph, and localized input-validation notions used throughout OpenUI.

## Objects

This scope is a folder-level abstraction for internationalization and localization
vocabulary from [`taxonomy_mapping.md`](../taxonomy_mapping.md). Concrete UI objects
consume these notions through attributes or implementation-specific localization
pipelines.

## Boundaries

The Internationalization scope describes technology-independent localization concepts;
it does not require a translation file format, message extraction tool, ICU runtime,
font stack, or locale-data provider.

Locale-sensitive parsing and display of dates, times and numbers belong here. The
services that implement them and the stored value representation do not.

Internationalization objects follow the shared [scope folder and attribute category rules](../scope.md).
